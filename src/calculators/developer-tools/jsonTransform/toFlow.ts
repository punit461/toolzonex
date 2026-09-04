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
    case 'number':
      return 'number';
    case 'boolean':
      return 'boolean';
    case 'null':
      return 'null';
    default:
      return 'mixed';
  }
}

function propertyKey(name: string): string {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(name) ? name : `"${name}"`;
}

function typeFor(node: ShapeNode, typeName: string, out: string[]): string {
  let base: string;
  if (node.kind === 'object') {
    base = typeName;
    out.push(typeFor_object(node, typeName, out));
  } else if (node.kind === 'array') {
    const item = node.children?.[0];
    const itemType = item ? typeFor(item, `${typeName}Item`, out) : 'mixed';
    base = itemType.includes(' ') ? `Array<${itemType}>` : `${itemType}[]`;
  } else {
    base = scalarType(node.kind);
  }
  // Flow denotes a nullable type with a leading `?`, distinct from the
  // trailing `?` on the property key which marks it optional/void-able.
  if (node.nullable && node.kind !== 'null') {
    base = `?${base}`;
  }
  return base;
}

function typeFor_object(node: ShapeNode, typeName: string, out: string[]): string {
  const lines: string[] = [`type ${typeName} = {|`];
  for (const child of node.children ?? []) {
    const childTypeName = `${typeName}${toPascalCase(child.name)}`;
    const type = typeFor(child, childTypeName, out);
    lines.push(`  ${propertyKey(child.name)}${child.optional ? '?' : ''}: ${type},`);
  }
  lines.push('|};');
  return lines.join('\n');
}

export function emitFlow(root: ShapeNode, rootName: string = 'Root'): string {
  const out: string[] = [];
  if (root.kind !== 'object') {
    const type = typeFor(root, rootName, out);
    return [...out, `export type ${rootName} = ${type};`].join('\n\n');
  }
  const rootDef = typeFor_object(root, rootName, out).replace(
    `type ${rootName} = {|`,
    `export type ${rootName} = {|`
  );
  return [...out, rootDef].join('\n\n');
}
