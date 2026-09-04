import type { ShapeKind, ShapeNode } from './inferShape';

function propertyKey(name: string): string {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(name) ? name : `"${name}"`;
}

function scalarExpr(kind: ShapeKind): string {
  switch (kind) {
    case 'string':
      return 'PropTypes.string';
    case 'integer':
    case 'number':
      return 'PropTypes.number';
    case 'boolean':
      return 'PropTypes.bool';
    default:
      return 'PropTypes.any';
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
    const itemExpr = item ? exprFor(item) : 'PropTypes.any';
    expr = `PropTypes.arrayOf(${itemExpr})`;
  } else {
    expr = scalarExpr(node.kind);
  }

  if (!node.optional) {
    expr = `${expr}.isRequired`;
  }
  return expr;
}

function shapeFor(node: ShapeNode): string {
  const fields = (node.children ?? []).map((child) => `${propertyKey(child.name)}: ${exprFor(child)},`);
  return `PropTypes.shape({\n${indent(fields.join('\n'), '  ')}\n})`;
}

export function emitReactPropTypes(root: ShapeNode, rootName: string = 'Root'): string {
  if (root.kind !== 'object') {
    return `${rootName}.propTypes = {\n${indent(`value: ${exprFor(root)},`, '  ')}\n};`;
  }
  const fields = (root.children ?? []).map((child) => `${propertyKey(child.name)}: ${exprFor(child)},`);
  return `${rootName}.propTypes = {\n${indent(fields.join('\n'), '  ')}\n};`;
}
