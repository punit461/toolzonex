export interface FlowTransformResult {
  output: string;
  error?: string;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
type FlowNode = { type: string; [key: string]: any };

const PARSE_PLUGINS = [
  'flow',
  'jsx',
  'classProperties',
  'classPrivateProperties',
  'classPrivateMethods',
  'objectRestSpread',
  'optionalChaining',
  'nullishCoalescingOperator',
  'dynamicImport',
] as const;

function stripFlowPragma(code: string): string {
  return code.replace(/^\s*\/\/\s*@(no)?flow\b.*\r?\n?/, '');
}

export async function flowToPlainJavaScript(source: string): Promise<FlowTransformResult> {
  try {
    const [{ parse }, traverseModule, generateModule] = await Promise.all([
      import('@babel/parser'),
      import('@babel/traverse'),
      import('@babel/generator'),
    ]);
    const traverse = traverseModule.default;
    const generate = generateModule.default;

    const ast = parse(source, { sourceType: 'module', plugins: PARSE_PLUGINS as unknown as any });

    traverse(ast, {
      Flow(path: any) {
        if (path.node.type === 'TypeCastExpression') return;
        path.remove();
      },
      TypeCastExpression(path: any) {
        path.replaceWith(path.node.expression);
      },
      ImportDeclaration(path: any) {
        if (path.node.importKind === 'type' || path.node.importKind === 'typeof') {
          path.remove();
          return;
        }
        path.node.specifiers = path.node.specifiers.filter(
          (s: any) => s.importKind !== 'type' && s.importKind !== 'typeof',
        );
      },
      ExportNamedDeclaration(path: any) {
        if (path.node.exportKind === 'type') path.remove();
      },
      ExportAllDeclaration(path: any) {
        if (path.node.exportKind === 'type') path.remove();
      },
      Function(path: any) {
        if (path.node.returnType) path.node.returnType = null;
        if (path.node.typeParameters) path.node.typeParameters = null;
        path.node.params.forEach((p: any) => {
          const target = p.type === 'AssignmentPattern' ? p.left : p;
          if (target?.typeAnnotation) target.typeAnnotation = null;
          if (target?.optional) target.optional = false;
        });
      },
      Class(path: any) {
        if (path.node.superTypeParameters) path.node.superTypeParameters = null;
        if (path.node.typeParameters) path.node.typeParameters = null;
        if (path.node.implements) path.node.implements = null;
      },
      ClassProperty(path: any) {
        if (path.node.declare) {
          path.remove();
          return;
        }
        if (path.node.typeAnnotation) path.node.typeAnnotation = null;
        if (path.node.variance) path.node.variance = null;
      },
    });

    const { code } = generate(ast, {}, source);
    return { output: stripFlowPragma(code) };
  } catch (e) {
    return { output: '', error: e instanceof Error ? e.message : 'Failed to strip Flow types from source.' };
  }
}

function unwrapAnnotation(node: FlowNode | null | undefined): FlowNode | null {
  if (!node) return null;
  return node.type === 'TypeAnnotation' ? (node.typeAnnotation as FlowNode) : node;
}

function printTypeParams(typeParameters: FlowNode | null | undefined): string {
  if (!typeParameters || !typeParameters.params?.length) return '';
  const names = (typeParameters.params as FlowNode[]).map((p) => p.name as string);
  return `<${names.join(', ')}>`;
}

function printTypeArgs(typeParameters: FlowNode | null | undefined): string {
  if (!typeParameters || !typeParameters.params?.length) return '';
  const args = (typeParameters.params as FlowNode[]).map((p) => printFlowType(p));
  return `<${args.join(', ')}>`;
}

function printFunctionType(node: FlowNode): string {
  const params = (node.params as FlowNode[]).map((p, i) => {
    const name = (p.name as string) ?? `arg${i}`;
    const optional = p.optional ? '?' : '';
    return `${name}${optional}: ${printFlowType(unwrapAnnotation(p.typeAnnotation) ?? p.typeAnnotation)}`;
  });
  if (node.rest) {
    const rest = node.rest as FlowNode;
    const name = (rest.name as string) ?? 'rest';
    params.push(`...${name}: ${printFlowType(unwrapAnnotation(rest.typeAnnotation) ?? rest.typeAnnotation)}[]`);
  }
  const returnType = printFlowType(unwrapAnnotation(node.returnType) ?? node.returnType);
  return `(${params.join(', ')}) => ${returnType}`;
}

function printObjectType(node: FlowNode): string {
  const props = ((node.properties as FlowNode[]) ?? []).map((prop) => {
    if (prop.type === 'ObjectTypeSpreadProperty') {
      return `  // ...${printFlowType(prop.argument as FlowNode)} (spread properties are approximated, not expanded)`;
    }
    const key = ((prop.key as FlowNode).name ?? (prop.key as FlowNode).value) as string;
    const optional = prop.optional ? '?' : '';
    if (prop.method || (prop.value as FlowNode).type === 'FunctionTypeAnnotation') {
      const fn = prop.value as FlowNode;
      const params = ((fn.params as FlowNode[]) ?? []).map((p, i) => {
        const name = (p.name as string) ?? `arg${i}`;
        return `${name}: ${printFlowType(unwrapAnnotation(p.typeAnnotation) ?? p.typeAnnotation)}`;
      });
      const returnType = printFlowType(unwrapAnnotation(fn.returnType) ?? fn.returnType);
      return `  ${key}${optional}(${params.join(', ')}): ${returnType};`;
    }
    return `  ${key}${optional}: ${printFlowType(prop.value as FlowNode)};`;
  });
  const indexers = ((node.indexers as FlowNode[]) ?? []).map((idx) => {
    const keyName = (idx.id as FlowNode | null)?.name ?? 'key';
    const keyType = printFlowType(idx.key as FlowNode);
    const valueType = printFlowType(idx.value as FlowNode);
    return `  [${keyName}: ${keyType}]: ${valueType};`;
  });
  const allMembers = [...indexers, ...props];
  if (allMembers.length === 0) return '{}';
  return `{\n${allMembers.join('\n')}\n}`;
}

function printFlowType(node: FlowNode | null | undefined): string {
  if (!node) return 'unknown';
  switch (node.type) {
    case 'StringTypeAnnotation':
      return 'string';
    case 'NumberTypeAnnotation':
      return 'number';
    case 'BooleanTypeAnnotation':
      return 'boolean';
    case 'VoidTypeAnnotation':
      return 'void';
    case 'NullLiteralTypeAnnotation':
      return 'null';
    case 'AnyTypeAnnotation':
      return 'any';
    case 'MixedTypeAnnotation':
      return 'unknown';
    case 'EmptyTypeAnnotation':
      return 'never';
    case 'ThisTypeAnnotation':
      return 'this';
    case 'SymbolTypeAnnotation':
      return 'symbol';
    case 'NumberLiteralTypeAnnotation':
      return String(node.value);
    case 'BooleanLiteralTypeAnnotation':
      return String(node.value);
    case 'StringLiteralTypeAnnotation':
      return JSON.stringify(node.value);
    case 'NullableTypeAnnotation':
      return `${printFlowType(unwrapAnnotation(node.typeAnnotation) ?? (node.typeAnnotation as FlowNode))} | null | undefined`;
    case 'ArrayTypeAnnotation':
      return `${printFlowType(node.elementType as FlowNode)}[]`;
    case 'TupleTypeAnnotation':
      return `[${((node.types as FlowNode[]) ?? []).map((t) => printFlowType(t)).join(', ')}]`;
    case 'UnionTypeAnnotation':
      return ((node.types as FlowNode[]) ?? []).map((t) => printFlowType(t)).join(' | ');
    case 'IntersectionTypeAnnotation':
      return ((node.types as FlowNode[]) ?? []).map((t) => printFlowType(t)).join(' & ');
    case 'ObjectTypeAnnotation':
      return printObjectType(node);
    case 'FunctionTypeAnnotation':
      return printFunctionType(node);
    case 'GenericTypeAnnotation': {
      const id = node.id as FlowNode;
      const name = (id.name as string) ?? (id.qualification ? `${(id.qualification as FlowNode).name}.${id.id?.name}` : 'unknown');
      if (name === 'Array' && node.typeParameters) {
        return `${printTypeArgs(node.typeParameters as FlowNode).slice(1, -1)}[]`;
      }
      return `${name}${printTypeArgs(node.typeParameters as FlowNode)}`;
    }
    case 'TypeofTypeAnnotation':
      return `typeof ${printFlowType(node.argument as FlowNode)}`;
    default:
      return 'any';
  }
}

function printTopLevelDeclaration(node: FlowNode, exported: boolean): string | null {
  const prefix = exported ? 'export ' : '';
  switch (node.type) {
    case 'TypeAlias':
      return `${prefix}type ${node.id.name}${printTypeParams(node.typeParameters as FlowNode)} = ${printFlowType(node.right as FlowNode)};`;
    case 'OpaqueType':
      return `${prefix}type ${node.id.name}${printTypeParams(node.typeParameters as FlowNode)} = ${printFlowType((node.supertype ?? node.impltype) as FlowNode)};`;
    case 'InterfaceDeclaration': {
      const extendsClauses = ((node.extends as FlowNode[]) ?? []).map(
        (e) => `${(e.id as FlowNode).name}${printTypeArgs(e.typeParameters as FlowNode)}`,
      );
      const extendsStr = extendsClauses.length ? ` extends ${extendsClauses.join(', ')}` : '';
      return `${prefix}interface ${node.id.name}${printTypeParams(node.typeParameters as FlowNode)}${extendsStr} ${printObjectType(node.body as FlowNode)}`;
    }
    case 'FunctionDeclaration': {
      if (!node.id) return null;
      const params = ((node.params as FlowNode[]) ?? []).map((p, i) => {
        const name = (p.name as string) ?? `arg${i}`;
        const optional = p.optional ? '?' : '';
        return `${name}${optional}: ${printFlowType(unwrapAnnotation(p.typeAnnotation) ?? p.typeAnnotation)}`;
      });
      const returnType = printFlowType(unwrapAnnotation(node.returnType) ?? node.returnType);
      return `${prefix}declare function ${node.id.name}${printTypeParams(node.typeParameters as FlowNode)}(${params.join(', ')}): ${returnType};`;
    }
    case 'DeclareFunction': {
      const fnType = unwrapAnnotation((node.id as FlowNode).typeAnnotation) ?? (node.id as FlowNode).typeAnnotation;
      return `${prefix}declare function ${(node.id as FlowNode).name}(${((fnType as FlowNode).params as FlowNode[]).map((p, i) => {
        const name = (p.name as string) ?? `arg${i}`;
        return `${name}: ${printFlowType(unwrapAnnotation(p.typeAnnotation) ?? p.typeAnnotation)}`;
      }).join(', ')}): ${printFlowType(unwrapAnnotation((fnType as FlowNode).returnType) ?? (fnType as FlowNode).returnType)};`;
    }
    case 'DeclareVariable':
      return `${prefix}declare const ${(node.id as FlowNode).name}: ${printFlowType(unwrapAnnotation((node.id as FlowNode).typeAnnotation) ?? (node.id as FlowNode).typeAnnotation)};`;
    case 'DeclareTypeAlias':
      return `${prefix}type ${node.id.name}${printTypeParams(node.typeParameters as FlowNode)} = ${printFlowType(node.right as FlowNode)};`;
    case 'ExportNamedDeclaration':
      return node.declaration ? printTopLevelDeclaration(node.declaration as FlowNode, true) : null;
    case 'ExportDefaultDeclaration':
      return node.declaration ? printTopLevelDeclaration(node.declaration as FlowNode, false) : null;
    default:
      return null;
  }
}

export async function flowToTypeScriptDeclaration(source: string): Promise<FlowTransformResult> {
  try {
    const { parse } = await import('@babel/parser');
    const ast = parse(source, { sourceType: 'module', plugins: PARSE_PLUGINS as unknown as any });
    const declarations: string[] = [];
    for (const stmt of ast.program.body as unknown as FlowNode[]) {
      const printed = printTopLevelDeclaration(stmt, false);
      if (printed) declarations.push(printed);
    }
    if (declarations.length === 0) {
      return { output: '', error: 'No convertible type alias, interface, or function declaration was found in this Flow source.' };
    }
    return { output: declarations.join('\n\n') };
  } catch (e) {
    return { output: '', error: e instanceof Error ? e.message : 'Failed to parse Flow source.' };
  }
}

export async function flowToTypeScript(source: string): Promise<FlowTransformResult> {
  const [jsResult, declResult] = await Promise.all([
    flowToPlainJavaScript(source),
    flowToTypeScriptDeclaration(source),
  ]);

  if (jsResult.error) {
    return { output: '', error: jsResult.error };
  }

  const declBlock = declResult.error
    ? `// Type declarations could not be generated: ${declResult.error}`
    : declResult.output;

  const output = [
    '// --- Type declarations (best-effort, generated separately from the implementation below) ---',
    declBlock,
    '',
    '// --- Implementation (Flow types stripped) ---',
    jsResult.output,
  ].join('\n');

  return { output };
}
