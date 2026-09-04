import type { ShapeKind, ShapeNode } from './inferShape';

type JsonSchemaValue = Record<string, unknown>;

function schemaTypeFor(kind: ShapeKind): string {
  switch (kind) {
    case 'string':
      return 'string';
    case 'integer':
      return 'integer';
    case 'number':
      return 'number';
    case 'boolean':
      return 'boolean';
    case 'null':
      return 'null';
    case 'array':
      return 'array';
    default:
      return 'object';
  }
}

function schemaForNode(node: ShapeNode): JsonSchemaValue {
  if (node.kind === 'unknown') {
    return {};
  }

  let typeValue: string | string[] = schemaTypeFor(node.kind);
  if (node.nullable && node.kind !== 'null') {
    typeValue = [typeValue as string, 'null'];
  }

  if (node.kind === 'object') {
    const properties: Record<string, unknown> = {};
    const required: string[] = [];
    for (const child of node.children ?? []) {
      properties[child.name] = schemaForNode(child);
      if (!child.optional) required.push(child.name);
    }
    const schema: JsonSchemaValue = { type: typeValue, properties };
    if (required.length) schema.required = required;
    return schema;
  }

  if (node.kind === 'array') {
    const item = node.children?.[0];
    return { type: typeValue, items: item ? schemaForNode(item) : {} };
  }

  return { type: typeValue };
}

export function emitJsonSchema(root: ShapeNode, rootName: string = 'Root'): string {
  const schema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: rootName,
    ...schemaForNode(root),
  };
  return JSON.stringify(schema, null, 2);
}
