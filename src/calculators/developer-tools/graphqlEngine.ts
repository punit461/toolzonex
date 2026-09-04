import type {
  DefinitionNode,
  DocumentNode,
  FieldDefinitionNode,
  InputValueDefinitionNode,
  TypeNode,
} from 'graphql';
import type {
  GraphQLArgument,
  GraphQLEnumType,
  GraphQLField,
  GraphQLInputField,
  GraphQLInputObjectType,
  GraphQLInterfaceType,
  GraphQLNamedType,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLType,
  GraphQLUnionType,
} from 'graphql';

export interface GraphqlTransformResult {
  output: string;
  error?: string;
}

function toErrorResult(err: unknown): GraphqlTransformResult {
  const message = err instanceof Error ? err.message : String(err);
  return { output: '', error: message };
}

function isUserType(name: string): boolean {
  return !name.startsWith('__');
}

function capitalize(name: string): string {
  return name.length ? name[0].toUpperCase() + name.slice(1) : name;
}

export async function schemaToIntrospectionJson(sdl: string): Promise<GraphqlTransformResult> {
  try {
    const { buildSchema, graphqlSync, getIntrospectionQuery } = await import('graphql');
    const schema = buildSchema(sdl);
    const result = graphqlSync({ schema, source: getIntrospectionQuery() });
    if (result.errors && result.errors.length) {
      return { output: '', error: result.errors.map((e) => e.message).join('; ') };
    }
    return { output: JSON.stringify(result.data, null, 2) };
  } catch (err) {
    return toErrorResult(err);
  }
}

function typeNodeToString(node: TypeNode): string {
  if (node.kind === 'NonNullType') return `${typeNodeToString(node.type)}!`;
  if (node.kind === 'ListType') return `[${typeNodeToString(node.type)}]`;
  return node.name.value;
}

function fieldDefToJson(field: FieldDefinitionNode) {
  return { name: field.name.value, type: typeNodeToString(field.type) };
}

function inputValueDefToJson(field: InputValueDefinitionNode) {
  return { name: field.name.value, type: typeNodeToString(field.type) };
}

function definitionToJson(def: DefinitionNode): Record<string, unknown> {
  switch (def.kind) {
    case 'ObjectTypeDefinition':
    case 'InterfaceTypeDefinition':
      return {
        kind: def.kind,
        name: def.name.value,
        interfaces: (def.interfaces ?? []).map((i) => i.name.value),
        fields: (def.fields ?? []).map(fieldDefToJson),
      };
    case 'InputObjectTypeDefinition':
      return {
        kind: def.kind,
        name: def.name.value,
        fields: (def.fields ?? []).map(inputValueDefToJson),
      };
    case 'EnumTypeDefinition':
      return {
        kind: def.kind,
        name: def.name.value,
        values: (def.values ?? []).map((v) => v.name.value),
      };
    case 'UnionTypeDefinition':
      return {
        kind: def.kind,
        name: def.name.value,
        types: (def.types ?? []).map((t) => t.name.value),
      };
    case 'ScalarTypeDefinition':
      return { kind: def.kind, name: def.name.value };
    case 'SchemaDefinition':
      return {
        kind: def.kind,
        operationTypes: def.operationTypes.map((o) => ({ operation: o.operation, type: o.type.name.value })),
      };
    default: {
      const name = 'name' in def ? (def as { name?: { value: string } }).name?.value : undefined;
      return { kind: def.kind, name };
    }
  }
}

export async function schemaToAst(sdl: string): Promise<GraphqlTransformResult> {
  try {
    const { parse } = await import('graphql');
    const doc: DocumentNode = parse(sdl);
    const json = { kind: 'Document', definitions: doc.definitions.map(definitionToJson) };
    return { output: JSON.stringify(json, null, 2) };
  } catch (err) {
    return toErrorResult(err);
  }
}

function scalarToTs(name: string, customScalars: Set<string>): string {
  switch (name) {
    case 'String':
    case 'ID':
      return 'string';
    case 'Int':
    case 'Float':
      return 'number';
    case 'Boolean':
      return 'boolean';
    default:
      customScalars.add(name);
      return 'any';
  }
}

function wrapListElem(inner: string): string {
  return inner.includes('|') ? `(${inner})[]` : `${inner}[]`;
}

function tsNamedType(
  type: GraphQLNamedType,
  helpers: { isScalarType: (t: unknown) => boolean },
  customScalars: Set<string>,
): string {
  if (helpers.isScalarType(type)) return scalarToTs(type.name, customScalars);
  return type.name;
}

function buildTsTypeString(
  type: GraphQLType,
  helpers: {
    isNonNullType: (t: unknown) => boolean;
    isListType: (t: unknown) => boolean;
    isScalarType: (t: unknown) => boolean;
  },
  customScalars: Set<string>,
): string {
  if (helpers.isNonNullType(type)) {
    return buildTsTypeStringNonNull((type as { ofType: GraphQLType }).ofType, helpers, customScalars);
  }
  return `${buildTsTypeStringNonNull(type, helpers, customScalars)} | null`;
}

function buildTsTypeStringNonNull(
  type: GraphQLType,
  helpers: {
    isNonNullType: (t: unknown) => boolean;
    isListType: (t: unknown) => boolean;
    isScalarType: (t: unknown) => boolean;
  },
  customScalars: Set<string>,
): string {
  if (helpers.isListType(type)) {
    const inner = buildTsTypeString((type as { ofType: GraphQLType }).ofType, helpers, customScalars);
    return wrapListElem(inner);
  }
  return tsNamedType(type as GraphQLNamedType, helpers, customScalars);
}

async function emitTypeScriptLike(sdl: string, addMongoId: boolean): Promise<GraphqlTransformResult> {
  try {
    const {
      buildSchema,
      isObjectType,
      isInterfaceType,
      isInputObjectType,
      isEnumType,
      isScalarType,
      isListType,
      isNonNullType,
    } = await import('graphql');
    const schema: GraphQLSchema = buildSchema(sdl);
    const typeMap = schema.getTypeMap();
    const helpers = { isNonNullType, isListType, isScalarType };
    const customScalars = new Set<string>();
    const blocks: string[] = [];

    for (const name of Object.keys(typeMap)) {
      if (!isUserType(name)) continue;
      const type = typeMap[name];

      if (isEnumType(type)) {
        const values = (type as GraphQLEnumType).getValues().map((v) => `'${v.name}'`);
        blocks.push(`export type ${name} = ${values.join(' | ')};`);
        continue;
      }

      if (isObjectType(type) || isInterfaceType(type)) {
        const fields = (type as GraphQLObjectType | GraphQLInterfaceType).getFields();
        const lines = Object.values(fields).map((f: GraphQLField<unknown, unknown>) => {
          const optional = !isNonNullType(f.type);
          const tsType = buildTsTypeString(f.type, helpers, customScalars);
          return `  ${f.name}${optional ? '?' : ''}: ${tsType};`;
        });
        if (addMongoId) {
          lines.push('  // Approximation of graphql-codegen-typescript-mongodb: adds _id for types backed by a MongoDB collection.');
          lines.push('  _id?: string;');
        }
        blocks.push(`export interface ${name} {\n${lines.join('\n')}\n}`);
        continue;
      }

      if (isInputObjectType(type)) {
        const fields = (type as GraphQLInputObjectType).getFields();
        const lines = Object.values(fields).map((f: GraphQLInputField) => {
          const optional = !isNonNullType(f.type);
          const tsType = buildTsTypeString(f.type, helpers, customScalars);
          return `  ${f.name}${optional ? '?' : ''}: ${tsType};`;
        });
        if (addMongoId) {
          lines.push('  // Approximation of graphql-codegen-typescript-mongodb: adds _id for types backed by a MongoDB collection.');
          lines.push('  _id?: string;');
        }
        blocks.push(`export interface ${name} {\n${lines.join('\n')}\n}`);
      }
    }

    let header = '';
    if (addMongoId) {
      header += '// NOTE: This is a best-effort approximation of Apollo\'s graphql-codegen-typescript-mongodb plugin.\n';
      header += '// It adds an optional "_id: string" to every generated type; the real plugin would only add it to\n';
      header += '// types actually backed by a MongoDB collection, and would type it as ObjectID rather than string.\n\n';
    }
    if (customScalars.size) {
      header += [...customScalars].map((s) => `// Custom scalar "${s}" mapped to "any" — refine manually if needed.`).join('\n') + '\n\n';
    }

    return { output: header + blocks.join('\n\n') };
  } catch (err) {
    return toErrorResult(err);
  }
}

export async function schemaToTypeScript(sdl: string): Promise<GraphqlTransformResult> {
  return emitTypeScriptLike(sdl, false);
}

export async function schemaToTypeScriptMongodb(sdl: string): Promise<GraphqlTransformResult> {
  return emitTypeScriptLike(sdl, true);
}

function scalarToFlow(name: string, customScalars: Set<string>): string {
  switch (name) {
    case 'String':
    case 'ID':
      return 'string';
    case 'Int':
    case 'Float':
      return 'number';
    case 'Boolean':
      return 'boolean';
    default:
      customScalars.add(name);
      return 'any';
  }
}

function buildFlowTypeString(
  type: GraphQLType,
  helpers: {
    isNonNullType: (t: unknown) => boolean;
    isListType: (t: unknown) => boolean;
    isScalarType: (t: unknown) => boolean;
  },
  customScalars: Set<string>,
): string {
  if (helpers.isNonNullType(type)) {
    return buildFlowTypeStringNonNull((type as { ofType: GraphQLType }).ofType, helpers, customScalars);
  }
  return `?${buildFlowTypeStringNonNull(type, helpers, customScalars)}`;
}

function buildFlowTypeStringNonNull(
  type: GraphQLType,
  helpers: {
    isNonNullType: (t: unknown) => boolean;
    isListType: (t: unknown) => boolean;
    isScalarType: (t: unknown) => boolean;
  },
  customScalars: Set<string>,
): string {
  if (helpers.isListType(type)) {
    return `Array<${buildFlowTypeString((type as { ofType: GraphQLType }).ofType, helpers, customScalars)}>`;
  }
  const named = type as GraphQLNamedType;
  if (helpers.isScalarType(type)) return scalarToFlow(named.name, customScalars);
  return named.name;
}

export async function schemaToFlow(sdl: string): Promise<GraphqlTransformResult> {
  try {
    const {
      buildSchema,
      isObjectType,
      isInterfaceType,
      isInputObjectType,
      isEnumType,
      isScalarType,
      isListType,
      isNonNullType,
    } = await import('graphql');
    const schema: GraphQLSchema = buildSchema(sdl);
    const typeMap = schema.getTypeMap();
    const helpers = { isNonNullType, isListType, isScalarType };
    const customScalars = new Set<string>();
    const blocks: string[] = [];

    for (const name of Object.keys(typeMap)) {
      if (!isUserType(name)) continue;
      const type = typeMap[name];

      if (isEnumType(type)) {
        const values = (type as GraphQLEnumType).getValues().map((v) => `'${v.name}'`);
        blocks.push(`export type ${name} = ${values.join(' | ')};`);
        continue;
      }

      if (isObjectType(type) || isInterfaceType(type)) {
        const fields = (type as GraphQLObjectType | GraphQLInterfaceType).getFields();
        const lines = Object.values(fields).map((f: GraphQLField<unknown, unknown>) => {
          const optional = !isNonNullType(f.type);
          const flowType = buildFlowTypeString(f.type, helpers, customScalars);
          return `  ${f.name}${optional ? '?' : ''}: ${flowType},`;
        });
        blocks.push(`export type ${name} = {|\n${lines.join('\n')}\n|};`);
        continue;
      }

      if (isInputObjectType(type)) {
        const fields = (type as GraphQLInputObjectType).getFields();
        const lines = Object.values(fields).map((f: GraphQLInputField) => {
          const optional = !isNonNullType(f.type);
          const flowType = buildFlowTypeString(f.type, helpers, customScalars);
          return `  ${f.name}${optional ? '?' : ''}: ${flowType},`;
        });
        blocks.push(`export type ${name} = {|\n${lines.join('\n')}\n|};`);
      }
    }

    let header = '';
    if (customScalars.size) {
      header = [...customScalars].map((s) => `// Custom scalar "${s}" mapped to "any" — refine manually if needed.`).join('\n') + '\n\n';
    }

    return { output: header + blocks.join('\n\n') };
  } catch (err) {
    return toErrorResult(err);
  }
}

function scalarToJava(name: string): string {
  switch (name) {
    case 'String':
    case 'ID':
      return 'String';
    case 'Int':
      return 'Integer';
    case 'Float':
      return 'Double';
    case 'Boolean':
      return 'Boolean';
    default:
      return 'Object';
  }
}

function buildJavaTypeString(
  type: GraphQLType,
  helpers: { isListType: (t: unknown) => boolean; isNonNullType: (t: unknown) => boolean; isScalarType: (t: unknown) => boolean },
  usesList: { value: boolean },
): string {
  if (helpers.isNonNullType(type)) {
    return buildJavaTypeString((type as { ofType: GraphQLType }).ofType, helpers, usesList);
  }
  if (helpers.isListType(type)) {
    usesList.value = true;
    return `List<${buildJavaTypeString((type as { ofType: GraphQLType }).ofType, helpers, usesList)}>`;
  }
  const named = type as GraphQLNamedType;
  if (helpers.isScalarType(type)) return scalarToJava(named.name);
  return named.name;
}

export async function schemaToJava(sdl: string): Promise<GraphqlTransformResult> {
  try {
    const {
      buildSchema,
      isObjectType,
      isInterfaceType,
      isInputObjectType,
      isEnumType,
      isScalarType,
      isListType,
      isNonNullType,
    } = await import('graphql');
    const schema: GraphQLSchema = buildSchema(sdl);
    const typeMap = schema.getTypeMap();
    const helpers = { isListType, isNonNullType, isScalarType };
    const usesList = { value: false };
    const blocks: string[] = [];

    for (const name of Object.keys(typeMap)) {
      if (!isUserType(name)) continue;
      const type = typeMap[name];

      if (isEnumType(type)) {
        const values = (type as GraphQLEnumType).getValues().map((v) => v.name);
        blocks.push(`public enum ${name} {\n  ${values.join(',\n  ')}\n}`);
        continue;
      }

      if (isObjectType(type) || isInterfaceType(type) || isInputObjectType(type)) {
        const fields = (type as GraphQLObjectType | GraphQLInterfaceType | GraphQLInputObjectType).getFields();
        const entries = Object.values(fields) as Array<GraphQLField<unknown, unknown> | GraphQLInputField>;
        const privateFields = entries.map((f) => `  private ${buildJavaTypeString(f.type, helpers, usesList)} ${f.name};`);
        const accessors = entries.flatMap((f) => {
          const javaType = buildJavaTypeString(f.type, helpers, usesList);
          const cap = capitalize(f.name);
          return [
            `  public ${javaType} get${cap}() {\n    return ${f.name};\n  }`,
            `  public void set${cap}(${javaType} ${f.name}) {\n    this.${f.name} = ${f.name};\n  }`,
          ];
        });
        blocks.push(`public class ${name} {\n${privateFields.join('\n')}\n\n${accessors.join('\n\n')}\n}`);
      }
    }

    const header = usesList.value ? 'import java.util.List;\n\n' : '';
    return { output: header + blocks.join('\n\n') };
  } catch (err) {
    return toErrorResult(err);
  }
}

export async function schemaToResolversSignature(sdl: string): Promise<GraphqlTransformResult> {
  try {
    const { buildSchema } = await import('graphql');
    const schema: GraphQLSchema = buildSchema(sdl);
    const roots: Array<[string, GraphQLObjectType | null | undefined]> = [
      ['Query', schema.getQueryType()],
      ['Mutation', schema.getMutationType()],
      ['Subscription', schema.getSubscriptionType()],
    ];

    const sections: string[] = [];
    for (const [rootName, rootType] of roots) {
      if (!rootType) continue;
      const fields = rootType.getFields();
      const lines: string[] = [];
      for (const field of Object.values(fields) as Array<GraphQLField<unknown, unknown>>) {
        if (field.args.length) {
          const argsList = field.args.map((a: GraphQLArgument) => `${a.name}: ${String(a.type)}`).join(', ');
          lines.push(`    // args: { ${argsList} }`);
        }
        lines.push(`    ${field.name}: (parent, args, context, info) => ${String(field.type)},`);
      }
      sections.push(`  ${rootName}: {\n${lines.join('\n')}\n  },`);
    }

    if (!sections.length) {
      return { output: '', error: 'Schema has no Query, Mutation, or Subscription root type.' };
    }

    return { output: `export const resolvers = {\n${sections.join('\n')}\n};` };
  } catch (err) {
    return toErrorResult(err);
  }
}

export async function schemaToFragmentMatcher(sdl: string): Promise<GraphqlTransformResult> {
  try {
    const { buildSchema, isInterfaceType, isUnionType } = await import('graphql');
    const schema: GraphQLSchema = buildSchema(sdl);
    const typeMap = schema.getTypeMap();
    const types: Array<{ kind: string; name: string; possibleTypes: { name: string }[] }> = [];

    for (const name of Object.keys(typeMap)) {
      if (!isUserType(name)) continue;
      const type = typeMap[name];
      if (isInterfaceType(type) || isUnionType(type)) {
        const possible = schema.getPossibleTypes(type as GraphQLInterfaceType | GraphQLUnionType);
        types.push({
          kind: isUnionType(type) ? 'UNION' : 'INTERFACE',
          name,
          possibleTypes: possible.map((p) => ({ name: p.name })),
        });
      }
    }

    const shape = { __schema: { types } };
    return { output: JSON.stringify(shape, null, 2) };
  } catch (err) {
    return toErrorResult(err);
  }
}

export async function schemaToComponents(operation: string): Promise<GraphqlTransformResult> {
  try {
    const { parse } = await import('graphql');
    const doc: DocumentNode = parse(operation);
    const opDef = doc.definitions.find((d) => d.kind === 'OperationDefinition');
    if (!opDef || opDef.kind !== 'OperationDefinition') {
      return { output: '', error: 'No GraphQL operation (query/mutation/subscription) found in the input.' };
    }

    const topFields = opDef.selectionSet.selections
      .filter((s) => s.kind === 'Field')
      .map((s) => (s as { alias?: { value: string }; name: { value: string } }).alias?.value ?? (s as { name: { value: string } }).name.value);

    if (!topFields.length) {
      return { output: '', error: 'The operation has no top-level selected fields.' };
    }

    const componentName = `${capitalize(topFields[0])}View`;
    const dataInterfaceName = `${capitalize(topFields[0])}QueryData`;
    const propLines = topFields.map((f) => `  ${f}?: any;`).join('\n');
    const jsxLines = topFields.map((f) => `      <div>{data?.${f}}</div>`).join('\n');
    const operationText = operation.trim();

    const output = `// SCAFFOLD ONLY — this is a best-effort starting point, not complete or runnable code.
// It assumes Apollo Client conventions; wire up real UI, pick your GraphQL client if not
// Apollo, and add proper loading/error handling before shipping this.
import { gql, useQuery } from '@apollo/client';

const QUERY = gql\`
${operationText}
\`;

interface ${dataInterfaceName} {
${propLines}
}

export function ${componentName}() {
  const { data, loading, error } = useQuery<${dataInterfaceName}>(QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
${jsxLines}
    </div>
  );
}
`;

    return { output };
  } catch (err) {
    return toErrorResult(err);
  }
}
