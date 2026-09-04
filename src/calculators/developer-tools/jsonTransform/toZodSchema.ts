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
      return 'z.string()';
    case 'integer':
      return 'z.number().int()';
    case 'number':
      return 'z.number()';
    case 'boolean':
      return 'z.boolean()';
    case 'null':
      return 'z.null()';
    default:
      return 'z.unknown()';
  }
}

function exprFor(node: ShapeNode, typeName: string, out: string[]): string {
  let expr: string;
  if (node.kind === 'object') {
    expr = `${typeName}Schema`;
    out.push(schemaFor(node, typeName, out));
  } else if (node.kind === 'array') {
    const item = node.children?.[0];
    const itemExpr = item ? exprFor(item, `${typeName}Item`, out) : 'z.unknown()';
    expr = `z.array(${itemExpr})`;
  } else {
    expr = scalarExpr(node.kind);
  }
  if (node.nullable && node.kind !== 'null') {
    expr = `${expr}.nullable()`;
  }
  if (node.optional) {
    expr = `${expr}.optional()`;
  }
  return expr;
}

function schemaFor(node: ShapeNode, typeName: string, out: string[]): string {
  const fields = (node.children ?? []).map((child) => {
    const childTypeName = `${typeName}${toPascalCase(child.name)}`;
    const expr = exprFor(child, childTypeName, out);
    return `  ${propertyKey(child.name)}: ${expr},`;
  });
  return `const ${typeName}Schema = z.object({\n${fields.join('\n')}\n});`;
}

export function emitZodSchema(root: ShapeNode, rootName: string = 'Root'): string {
  const out: string[] = [];
  if (root.kind !== 'object') {
    const expr = exprFor(root, rootName, out);
    return [...out, `const ${rootName}Schema = ${expr};`].join('\n\n');
  }
  const rootDef = schemaFor(root, rootName, out);
  return [...out, rootDef].join('\n\n');
}
