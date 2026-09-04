import type { ShapeKind, ShapeNode } from '../jsonTransform/inferShape';

function toPascalCase(name: string): string {
  const cleaned = name.replace(/[^a-zA-Z0-9]+/g, ' ').trim();
  if (!cleaned) return 'Value';
  return cleaned
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join('');
}

function scalarType(kind: ShapeKind): string {
  switch (kind) {
    case 'string':
      return 'string';
    case 'integer':
      return 'integer';
    case 'number':
      return 'number';
    case 'boolean':
      return 'boolean';
    default:
      return 'string';
  }
}

function scalarSchema(node: ShapeNode): Record<string, unknown> {
  const schema: Record<string, unknown> = { type: scalarType(node.kind) };
  if (node.nullable) schema.nullable = true;
  return schema;
}

function schemaFor(node: ShapeNode, typeName: string, defs: Record<string, unknown>): Record<string, unknown> {
  if (node.kind === 'object') {
    if (!defs[typeName]) {
      const properties: Record<string, unknown> = {};
      const required: string[] = [];
      for (const child of node.children ?? []) {
        const childTypeName = `${typeName}${toPascalCase(child.name)}`;
        properties[child.name] = schemaFor(child, childTypeName, defs);
        if (!child.optional) required.push(child.name);
      }
      const def: Record<string, unknown> = { type: 'object', properties };
      if (required.length) def.required = required;
      if (node.nullable) def.nullable = true;
      defs[typeName] = def;
    }
    return { $ref: `#/components/schemas/${typeName}` };
  }

  if (node.kind === 'array') {
    const item = node.children?.[0];
    const itemSchema = item ? schemaFor(item, `${typeName}Item`, defs) : {};
    const schema: Record<string, unknown> = { type: 'array', items: itemSchema };
    if (node.nullable) schema.nullable = true;
    return schema;
  }

  return scalarSchema(node);
}

export function emitOpenApi(root: ShapeNode, rootName: string = 'Root'): string {
  const defs: Record<string, unknown> = {};

  if (root.kind === 'object') {
    schemaFor(root, rootName, defs);
  } else if (root.kind === 'array') {
    defs[rootName] = schemaFor(root, rootName, defs);
  } else {
    defs[rootName] = scalarSchema(root);
  }

  return JSON.stringify({ components: { schemas: defs } }, null, 2);
}
