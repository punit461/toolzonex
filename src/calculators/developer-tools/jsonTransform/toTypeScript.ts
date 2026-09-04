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
      return 'unknown';
  }
}

function propertyKey(name: string): string {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(name) ? name : `"${name}"`;
}

function typeFor(node: ShapeNode, typeName: string, out: string[]): string {
  let base: string;
  if (node.kind === 'object') {
    base = typeName;
    out.push(interfaceFor(node, typeName, out));
  } else if (node.kind === 'array') {
    const item = node.children?.[0];
    const itemType = item ? typeFor(item, `${typeName}Item`, out) : 'unknown';
    base = itemType.includes(' ') ? `(${itemType})[]` : `${itemType}[]`;
  } else {
    base = scalarType(node.kind);
  }
  if (node.nullable && node.kind !== 'null') {
    base = `${base} | null`;
  }
  return base;
}

function interfaceFor(node: ShapeNode, typeName: string, out: string[]): string {
  const lines: string[] = [`interface ${typeName} {`];
  for (const child of node.children ?? []) {
    const childTypeName = `${typeName}${toPascalCase(child.name)}`;
    const type = typeFor(child, childTypeName, out);
    lines.push(`  ${propertyKey(child.name)}${child.optional ? '?' : ''}: ${type};`);
  }
  lines.push('}');
  return lines.join('\n');
}

export function emitTypeScript(root: ShapeNode, rootName: string = 'Root'): string {
  const out: string[] = [];
  if (root.kind !== 'object') {
    const type = typeFor(root, rootName, out);
    return [...out, `type ${rootName} = ${type};`].join('\n\n');
  }
  const rootDef = interfaceFor(root, rootName, out);
  return [...out, rootDef].join('\n\n');
}
