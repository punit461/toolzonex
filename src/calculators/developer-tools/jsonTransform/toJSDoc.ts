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
      return '*';
  }
}

function typeStringFor(node: ShapeNode, typeName: string, out: string[]): string {
  let base: string;
  if (node.kind === 'object') {
    base = typeName;
    out.push(typedefFor(node, typeName, out));
  } else if (node.kind === 'array') {
    const item = node.children?.[0];
    const itemType = item ? typeStringFor(item, `${typeName}Item`, out) : '*';
    base = `${itemType}[]`;
  } else {
    base = scalarType(node.kind);
  }
  if (node.nullable && node.kind !== 'null') {
    base = `?${base}`;
  }
  return base;
}

function typedefFor(node: ShapeNode, typeName: string, out: string[]): string {
  const lines: string[] = ['/**', ` * @typedef {Object} ${typeName}`];
  for (const child of node.children ?? []) {
    const childTypeName = `${typeName}${toPascalCase(child.name)}`;
    const type = typeStringFor(child, childTypeName, out);
    const propName = child.optional ? `[${child.name}]` : child.name;
    lines.push(` * @property {${type}} ${propName}`);
  }
  lines.push(' */');
  return lines.join('\n');
}

export function emitJSDoc(root: ShapeNode, rootName: string = 'Root'): string {
  const out: string[] = [];
  const rootDef =
    root.kind === 'object'
      ? typedefFor(root, rootName, out)
      : `/**\n * @typedef {${typeStringFor(root, `${rootName}Value`, out)}} ${rootName}\n */`;
  return [...out, rootDef].join('\n\n');
}
