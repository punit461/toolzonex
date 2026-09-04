import type { ShapeKind, ShapeNode } from './inferShape';

function propertyKey(name: string): string {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(name) ? name : `"${name}"`;
}

function scalarExpr(kind: ShapeKind): string {
  switch (kind) {
    case 'string':
      return 'string';
    case 'integer':
    case 'number':
      return 'number';
    case 'boolean':
      return 'boolean';
    default:
      return 'unknown';
  }
}

function indent(text: string, spaces: string): string {
  return text
    .split('\n')
    .map((line) => (line ? spaces + line : line))
    .join('\n');
}

function exprFor(node: ShapeNode): string {
  let expr: string;
  if (node.kind === 'object') {
    expr = shapeFor(node);
  } else if (node.kind === 'array') {
    const item = node.children?.[0];
    const itemExpr = item ? exprFor(item) : 'unknown';
    expr = `arrayOf(${itemExpr})`;
  } else if (node.kind === 'null') {
    expr = 'maybe(unknown)';
    return node.optional ? `optional(${expr})` : expr;
  } else {
    expr = scalarExpr(node.kind);
  }

  if (node.nullable) {
    expr = `maybe(${expr})`;
  }
  if (node.optional) {
    expr = `optional(${expr})`;
  }
  return expr;
}

function shapeFor(node: ShapeNode): string {
  const fields = (node.children ?? []).map((child) => `${propertyKey(child.name)}: ${exprFor(child)},`);
  return `shape({\n${indent(fields.join('\n'), '  ')}\n})`;
}

export function emitSarcastic(root: ShapeNode, rootName: string = 'Root'): string {
  if (root.kind !== 'object') {
    return `const ${rootName} = ${exprFor(root)};`;
  }
  return `const ${rootName} = ${shapeFor(root)};`;
}
