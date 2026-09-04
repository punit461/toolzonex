import type { ShapeKind, ShapeNode } from './inferShape';

interface BigQueryField {
  name: string;
  type: string;
  mode: 'NULLABLE' | 'REQUIRED' | 'REPEATED';
  fields?: BigQueryField[];
}

function scalarType(kind: ShapeKind): string {
  switch (kind) {
    case 'string':
      return 'STRING';
    case 'integer':
      return 'INTEGER';
    case 'number':
      return 'FLOAT';
    case 'boolean':
      return 'BOOLEAN';
    default:
      return 'STRING';
  }
}

function fieldFor(node: ShapeNode): BigQueryField {
  if (node.kind === 'array') {
    const item = node.children?.[0];
    const itemField = item ? fieldFor(item) : undefined;
    return {
      name: node.name,
      type: itemField ? itemField.type : 'STRING',
      mode: 'REPEATED',
      ...(itemField?.fields ? { fields: itemField.fields } : {}),
    };
  }

  if (node.kind === 'object') {
    return {
      name: node.name,
      type: 'RECORD',
      mode: node.optional || node.nullable ? 'NULLABLE' : 'REQUIRED',
      fields: (node.children ?? []).map(fieldFor),
    };
  }

  return {
    name: node.name,
    type: scalarType(node.kind),
    mode: node.optional || node.nullable ? 'NULLABLE' : 'REQUIRED',
  };
}

export function emitBigQuerySchema(root: ShapeNode, rootName: string = 'root'): string {
  if (root.kind !== 'object') {
    return JSON.stringify([fieldFor({ ...root, name: root.name || rootName })], null, 2);
  }
  const fields = (root.children ?? []).map(fieldFor);
  return JSON.stringify(fields, null, 2);
}
