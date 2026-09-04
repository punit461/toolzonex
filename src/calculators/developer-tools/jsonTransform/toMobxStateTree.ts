import type { ShapeKind, ShapeNode } from './inferShape';

function toPascalCase(name: string): string {
  const cleaned = name.replace(/[^a-zA-Z0-9]+/g, ' ').trim();
  if (!cleaned) return 'Value';
  return cleaned
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join('');
}

function propertyKey(name: string): string {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(name) ? name : `"${name}"`;
}

function scalarExpr(kind: ShapeKind): string {
  switch (kind) {
    case 'string':
      return 'types.string';
    case 'integer':
    case 'number':
      return 'types.number';
    case 'boolean':
      return 'types.boolean';
    case 'null':
      return 'types.null';
    default:
      return 'types.frozen()';
  }
}

function exprFor(node: ShapeNode, typeName: string, out: string[]): string {
  let expr: string;
  if (node.kind === 'object') {
    expr = `${typeName}Model`;
    out.push(modelFor(node, typeName, out));
  } else if (node.kind === 'array') {
    const item = node.children?.[0];
    const itemExpr = item ? exprFor(item, `${typeName}Item`, out) : 'types.frozen()';
    expr = `types.array(${itemExpr})`;
  } else {
    expr = scalarExpr(node.kind);
  }

  if (node.nullable && node.kind !== 'null') {
    expr = `types.maybeNull(${expr})`;
  }
  if (node.optional) {
    expr = `types.maybe(${expr})`;
  }
  return expr;
}

function modelFor(node: ShapeNode, typeName: string, out: string[]): string {
  const fields = (node.children ?? []).map((child) => {
    const childTypeName = `${typeName}${toPascalCase(child.name)}`;
    const expr = exprFor(child, childTypeName, out);
    return `  ${propertyKey(child.name)}: ${expr},`;
  });
  return `const ${typeName}Model = types.model("${typeName}", {\n${fields.join('\n')}\n});`;
}

export function emitMobxStateTree(root: ShapeNode, rootName: string = 'Root'): string {
  const out: string[] = [];
  if (root.kind !== 'object') {
    const expr = exprFor(root, rootName, out);
    return [...out, `const ${rootName}Model = ${expr};`].join('\n\n');
  }
  const rootDef = modelFor(root, rootName, out);
  return [...out, rootDef].join('\n\n');
}
