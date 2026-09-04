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
      return 't.string';
    case 'integer':
    case 'number':
      return 't.number';
    case 'boolean':
      return 't.boolean';
    case 'null':
      return 't.null';
    default:
      return 't.unknown';
  }
}

function exprFor(node: ShapeNode, typeName: string, out: string[]): string {
  let expr: string;
  if (node.kind === 'object') {
    expr = typeName;
    out.push(codecFor(node, typeName, out));
  } else if (node.kind === 'array') {
    const item = node.children?.[0];
    const itemExpr = item ? exprFor(item, `${typeName}Item`, out) : 't.unknown';
    expr = `t.array(${itemExpr})`;
  } else {
    expr = scalarExpr(node.kind);
  }
  if (node.nullable && node.kind !== 'null') {
    expr = `t.union([${expr}, t.null])`;
  }
  return expr;
}

function codecFor(node: ShapeNode, typeName: string, out: string[]): string {
  const requiredFields: string[] = [];
  const optionalFields: string[] = [];
  for (const child of node.children ?? []) {
    const childTypeName = `${typeName}${toPascalCase(child.name)}`;
    const expr = exprFor(child, childTypeName, out);
    const line = `    ${propertyKey(child.name)}: ${expr},`;
    if (child.optional) optionalFields.push(line);
    else requiredFields.push(line);
  }

  if (requiredFields.length && optionalFields.length) {
    return (
      `const ${typeName} = t.intersection([\n` +
      `  t.type({\n${requiredFields.join('\n')}\n  }),\n` +
      `  t.partial({\n${optionalFields.join('\n')}\n  }),\n` +
      `]);`
    );
  }
  if (optionalFields.length) {
    return `const ${typeName} = t.partial({\n${optionalFields.join('\n')}\n});`;
  }
  return `const ${typeName} = t.type({\n${requiredFields.join('\n')}\n});`;
}

export function emitIoTs(root: ShapeNode, rootName: string = 'Root'): string {
  const out: string[] = [];
  if (root.kind !== 'object') {
    const expr = exprFor(root, rootName, out);
    return [...out, `const ${rootName} = ${expr};`].join('\n\n');
  }
  const rootDef = codecFor(root, rootName, out);
  return [...out, rootDef].join('\n\n');
}
