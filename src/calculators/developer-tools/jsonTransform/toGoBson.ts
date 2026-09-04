import type { ShapeKind, ShapeNode } from './inferShape';

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
      return 'int';
    case 'number':
      return 'float64';
    case 'boolean':
      return 'bool';
    default:
      return 'interface{}';
  }
}

function typeFor(node: ShapeNode, typeName: string, out: string[]): string {
  if (node.kind === 'array') {
    const item = node.children?.[0];
    const itemType = item ? typeFor(item, `${typeName}Item`, out) : 'interface{}';
    return `[]${itemType}`;
  }

  let base: string;
  if (node.kind === 'object') {
    base = typeName;
    out.push(structFor(node, typeName, out));
  } else {
    base = scalarType(node.kind);
  }

  if ((node.nullable || node.optional) && node.kind !== 'null' && node.kind !== 'unknown') {
    base = `*${base}`;
  }
  return base;
}

function structFor(node: ShapeNode, typeName: string, out: string[]): string {
  const lines: string[] = [`type ${typeName} struct {`];
  for (const child of node.children ?? []) {
    const childTypeName = `${typeName}${toPascalCase(child.name)}`;
    const type = typeFor(child, childTypeName, out);
    lines.push(`\t${toPascalCase(child.name)} ${type} \`json:"${child.name}" bson:"${child.name}"\``);
  }
  lines.push('}');
  return lines.join('\n');
}

export function emitGoBson(root: ShapeNode, rootName: string = 'Root'): string {
  const out: string[] = [];
  if (root.kind !== 'object') {
    const type = typeFor(root, rootName, out);
    return [...out, `type ${rootName} ${type}`].join('\n\n');
  }
  const rootDef = structFor(root, rootName, out);
  return [...out, rootDef].join('\n\n');
}
