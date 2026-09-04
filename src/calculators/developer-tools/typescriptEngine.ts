import type { ShapeKind, ShapeNode } from './jsonTransform/inferShape';
import type ts from 'typescript';

export interface TsTransformResult {
  output: string;
  error?: string;
}

type TsModule = typeof ts;
type TsTypeNode = ts.TypeNode;
type TsInterfaceDeclaration = ts.InterfaceDeclaration;
type TsTypeAliasDeclaration = ts.TypeAliasDeclaration;
type TsSourceFile = ts.SourceFile;

function findTopLevelTypeDecls(
  tsMod: TsModule,
  sourceFile: TsSourceFile,
): (TsInterfaceDeclaration | TsTypeAliasDeclaration)[] {
  const decls: (TsInterfaceDeclaration | TsTypeAliasDeclaration)[] = [];
  sourceFile.statements.forEach((stmt) => {
    if (tsMod.isInterfaceDeclaration(stmt) || tsMod.isTypeAliasDeclaration(stmt)) {
      decls.push(stmt);
    }
  });
  return decls;
}

/**
 * When a file declares several top-level interfaces/type aliases, the one the user actually wants
 * converted is the one at the top of the reference graph (e.g. `User` referencing `Address`), not
 * necessarily the one written first in the file (types are often declared bottom-up). Falls back to
 * the first declaration if every declaration references, or is referenced by, another.
 */
function pickRootDeclaration(
  tsMod: TsModule,
  decls: (TsInterfaceDeclaration | TsTypeAliasDeclaration)[],
  declByName: Map<string, TsInterfaceDeclaration | TsTypeAliasDeclaration>,
): TsInterfaceDeclaration | TsTypeAliasDeclaration {
  const referenced = new Set<string>();
  const visit = (node: ts.Node) => {
    if (tsMod.isTypeReferenceNode(node)) {
      const refName = node.typeName.getText();
      if (declByName.has(refName)) referenced.add(refName);
    }
    tsMod.forEachChild(node, visit);
  };
  for (const decl of decls) {
    if (tsMod.isInterfaceDeclaration(decl)) {
      decl.members.forEach((m) => visit(m));
    } else {
      visit(decl.type);
    }
  }
  return decls.find((d) => !referenced.has(d.name.text)) ?? decls[0];
}

function shapeFromTypeNode(
  tsMod: TsModule,
  node: TsTypeNode,
  name: string,
  declByName: Map<string, TsInterfaceDeclaration | TsTypeAliasDeclaration>,
  seen: Set<string>,
): ShapeNode {
  if (tsMod.isTypeReferenceNode(node)) {
    const refName = node.typeName.getText();
    if (refName === 'Array' && node.typeArguments && node.typeArguments.length === 1) {
      const item = shapeFromTypeNode(tsMod, node.typeArguments[0], 'item', declByName, seen);
      return { name, kind: 'array', optional: false, nullable: false, children: [item] };
    }
    const target = declByName.get(refName);
    if (target && !seen.has(refName)) {
      const nextSeen = new Set(seen);
      nextSeen.add(refName);
      return shapeFromDeclaration(tsMod, target, name, declByName, nextSeen);
    }
    return { name, kind: 'unknown', optional: false, nullable: false };
  }

  if (tsMod.isArrayTypeNode(node)) {
    const item = shapeFromTypeNode(tsMod, node.elementType, 'item', declByName, seen);
    return { name, kind: 'array', optional: false, nullable: false, children: [item] };
  }

  if (tsMod.isTypeLiteralNode(node)) {
    const children = node.members
      .filter((m): m is ts.PropertySignature => tsMod.isPropertySignature(m))
      .map((m) => propertySignatureToShape(tsMod, m, declByName, seen));
    return { name, kind: 'object', optional: false, nullable: false, children };
  }

  if (tsMod.isUnionTypeNode(node)) {
    const nullMember = node.types.find(
      (t) => t.kind === tsMod.SyntaxKind.NullKeyword,
    );
    const nonNullMembers = node.types.filter((t) => t.kind !== tsMod.SyntaxKind.NullKeyword);
    if (nullMember && nonNullMembers.length === 1) {
      const inner = shapeFromTypeNode(tsMod, nonNullMembers[0], name, declByName, seen);
      return { ...inner, nullable: true };
    }
    return { name, kind: 'unknown', optional: false, nullable: false };
  }

  switch (node.kind) {
    case tsMod.SyntaxKind.StringKeyword:
      return { name, kind: 'string', optional: false, nullable: false };
    case tsMod.SyntaxKind.NumberKeyword:
      return { name, kind: 'number', optional: false, nullable: false };
    case tsMod.SyntaxKind.BooleanKeyword:
      return { name, kind: 'boolean', optional: false, nullable: false };
    case tsMod.SyntaxKind.NullKeyword:
      return { name, kind: 'null', optional: false, nullable: true };
    case tsMod.SyntaxKind.UndefinedKeyword:
      return { name, kind: 'unknown', optional: true, nullable: false };
    default:
      return { name, kind: 'unknown', optional: false, nullable: false };
  }
}

function propertySignatureToShape(
  tsMod: TsModule,
  member: ts.PropertySignature,
  declByName: Map<string, TsInterfaceDeclaration | TsTypeAliasDeclaration>,
  seen: Set<string>,
): ShapeNode {
  const name = member.name.getText();
  const optional = !!member.questionToken;
  if (!member.type) {
    return { name, kind: 'unknown', optional, nullable: false };
  }
  const shape = shapeFromTypeNode(tsMod, member.type, name, declByName, seen);
  return { ...shape, name, optional: shape.optional || optional };
}

function shapeFromDeclaration(
  tsMod: TsModule,
  decl: TsInterfaceDeclaration | TsTypeAliasDeclaration,
  name: string,
  declByName: Map<string, TsInterfaceDeclaration | TsTypeAliasDeclaration>,
  seen: Set<string>,
): ShapeNode {
  if (tsMod.isInterfaceDeclaration(decl)) {
    const children = decl.members
      .filter((m): m is ts.PropertySignature => tsMod.isPropertySignature(m))
      .map((m) => propertySignatureToShape(tsMod, m, declByName, seen));
    return { name, kind: 'object', optional: false, nullable: false, children };
  }
  return shapeFromTypeNode(tsMod, decl.type, name, declByName, seen);
}

export async function tsToShape(source: string): Promise<{ root: ShapeNode; error?: string }> {
  const fallback: ShapeNode = { name: 'root', kind: 'unknown', optional: false, nullable: false };
  try {
    const tsMod = await import('typescript');
    const sourceFile = tsMod.createSourceFile('input.ts', source, tsMod.ScriptTarget.Latest, true);
    const decls = findTopLevelTypeDecls(tsMod, sourceFile);
    if (decls.length === 0) {
      return { root: fallback, error: 'No top-level interface or type alias found in the input.' };
    }
    const declByName = new Map<string, TsInterfaceDeclaration | TsTypeAliasDeclaration>();
    for (const d of decls) declByName.set(d.name.text, d);

    const rootDecl = pickRootDeclaration(tsMod, decls, declByName);
    const root = shapeFromDeclaration(tsMod, rootDecl, rootDecl.name.text, declByName, new Set([rootDecl.name.text]));
    return { root };
  } catch (e) {
    return { root: fallback, error: e instanceof Error ? e.message : 'Failed to parse TypeScript source.' };
  }
}

export async function tsToPlainJavaScript(source: string): Promise<TsTransformResult> {
  try {
    const tsMod = await import('typescript');
    const result = tsMod.transpileModule(source, {
      compilerOptions: { target: tsMod.ScriptTarget.ES2020, module: tsMod.ModuleKind.ESNext },
    });
    return { output: result.outputText };
  } catch (e) {
    return { output: '', error: e instanceof Error ? e.message : 'Failed to transpile TypeScript source.' };
  }
}

export async function tsToDeclaration(source: string): Promise<TsTransformResult> {
  try {
    const tsMod = await import('typescript');
    const fileName = 'input.ts';
    const options: ts.CompilerOptions = {
      declaration: true,
      emitDeclarationOnly: true,
      target: tsMod.ScriptTarget.Latest,
      module: tsMod.ModuleKind.ESNext,
      strict: false,
    };

    let declOutput = '';
    const host = tsMod.createCompilerHost(options);
    const originalGetSourceFile = host.getSourceFile.bind(host);
    const originalReadFile = host.readFile.bind(host);
    const originalFileExists = host.fileExists.bind(host);

    host.readFile = (fn) => (fn === fileName ? source : originalReadFile(fn));
    host.fileExists = (fn) => (fn === fileName ? true : originalFileExists(fn));
    host.getSourceFile = (fn, languageVersionOrOptions, onError, shouldCreateNewSourceFile) => {
      if (fn === fileName) {
        return tsMod.createSourceFile(fn, source, tsMod.ScriptTarget.Latest, true);
      }
      return originalGetSourceFile(fn, languageVersionOrOptions, onError, shouldCreateNewSourceFile);
    };
    host.writeFile = (fn, contents) => {
      if (fn.endsWith('.d.ts')) declOutput += contents;
    };

    const program = tsMod.createProgram([fileName], options, host);
    const emitResult = program.emit();

    if (!declOutput.trim()) {
      const diagnostics = [
        ...program.getSyntacticDiagnostics(),
        ...emitResult.diagnostics,
      ];
      if (diagnostics.length) {
        const message = tsMod.flattenDiagnosticMessageText(diagnostics[0].messageText, '\n');
        return { output: '', error: message };
      }
      return { output: '', error: 'No declaration output was produced for this input.' };
    }

    return { output: declOutput };
  } catch (e) {
    return { output: '', error: e instanceof Error ? e.message : 'Failed to emit TypeScript declarations.' };
  }
}

function literalDefaultType(tsMod: TsModule, expr: ts.Expression): string | undefined {
  if (tsMod.isNumericLiteral(expr)) return 'number';
  if (tsMod.isStringLiteral(expr) || tsMod.isNoSubstitutionTemplateLiteral(expr)) return 'string';
  if (expr.kind === tsMod.SyntaxKind.TrueKeyword || expr.kind === tsMod.SyntaxKind.FalseKeyword) return 'boolean';
  return undefined;
}

function literalInitializerType(tsMod: TsModule, expr: ts.Expression): string | undefined {
  if (tsMod.isNumericLiteral(expr)) return 'number';
  if (tsMod.isStringLiteral(expr) || tsMod.isNoSubstitutionTemplateLiteral(expr)) return 'string';
  if (expr.kind === tsMod.SyntaxKind.TrueKeyword || expr.kind === tsMod.SyntaxKind.FalseKeyword) return 'boolean';
  if (tsMod.isArrayLiteralExpression(expr)) return 'unknown[]';
  return undefined;
}

export async function javascriptToTypeScript(source: string): Promise<TsTransformResult> {
  try {
    const tsMod = await import('typescript');
    const sourceFile = tsMod.createSourceFile('input.ts', source, tsMod.ScriptTarget.Latest, true, tsMod.ScriptKind.JS);

    const annotateParam = (param: ts.ParameterDeclaration): ts.ParameterDeclaration => {
      if (param.type || !tsMod.isIdentifier(param.name)) return param;
      if (param.initializer) {
        const inferred = literalDefaultType(tsMod, param.initializer);
        if (inferred) {
          return tsMod.factory.updateParameterDeclaration(
            param,
            param.modifiers,
            param.dotDotDotToken,
            param.name,
            param.questionToken,
            tsMod.factory.createTypeReferenceNode(inferred),
            param.initializer,
          );
        }
        return param;
      }
      return tsMod.factory.updateParameterDeclaration(
        param,
        param.modifiers,
        param.dotDotDotToken,
        param.name,
        param.questionToken,
        tsMod.factory.createTypeReferenceNode('any'),
        param.initializer,
      );
    };

    const annotateVariableDecl = (decl: ts.VariableDeclaration): ts.VariableDeclaration => {
      if (decl.type || !decl.initializer || !tsMod.isIdentifier(decl.name)) return decl;
      const inferred = literalInitializerType(tsMod, decl.initializer);
      if (!inferred) return decl;
      return tsMod.factory.updateVariableDeclaration(
        decl,
        decl.name,
        decl.exclamationToken,
        tsMod.factory.createTypeReferenceNode(inferred),
        decl.initializer,
      );
    };

    const transformerFactory = (context: ts.TransformationContext) => {
      const visit = (node: ts.Node): ts.Node => {
        const visited = tsMod.visitEachChild(node, visit, context);

        if (tsMod.isFunctionDeclaration(visited) || tsMod.isArrowFunction(visited) || tsMod.isFunctionExpression(visited)) {
          const params = visited.parameters.map(annotateParam);
          if (tsMod.isFunctionDeclaration(visited)) {
            return tsMod.factory.updateFunctionDeclaration(
              visited,
              visited.modifiers,
              visited.asteriskToken,
              visited.name,
              visited.typeParameters,
              params,
              visited.type,
              visited.body,
            );
          }
          if (tsMod.isArrowFunction(visited)) {
            return tsMod.factory.updateArrowFunction(
              visited,
              visited.modifiers,
              visited.typeParameters,
              params,
              visited.type,
              visited.equalsGreaterThanToken,
              visited.body,
            );
          }
          return tsMod.factory.updateFunctionExpression(
            visited,
            visited.modifiers,
            visited.asteriskToken,
            visited.name,
            visited.typeParameters,
            params,
            visited.type,
            visited.body,
          );
        }

        if (tsMod.isVariableDeclarationList(visited)) {
          return tsMod.factory.updateVariableDeclarationList(
            visited,
            visited.declarations.map(annotateVariableDecl),
          );
        }

        return visited;
      };
      return (rootNode: ts.SourceFile) => tsMod.visitNode(rootNode, visit) as ts.SourceFile;
    };

    const result = tsMod.transform(sourceFile, [transformerFactory]);
    const transformedSource = result.transformed[0];
    const printer = tsMod.createPrinter({ newLine: tsMod.NewLineKind.LineFeed });
    const output = printer.printFile(transformedSource);
    result.dispose();
    return { output };
  } catch (e) {
    return { output: '', error: e instanceof Error ? e.message : 'Failed to convert JavaScript to TypeScript.' };
  }
}

export type { ShapeKind };
