import type { ShapeKind, ShapeNode } from './inferShape';

function toPascalCase(name: string): string {
  const cleaned = name.replace(/[^a-zA-Z0-9]+/g, ' ').trim();
  if (!cleaned) return 'Value';
  return cleaned
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join('');
}

function fieldName(name: string): string {
  const safe = name.replace(/[^A-Za-z0-9_]/g, '_');
  return /^[A-Za-z_]/.test(safe) ? safe : `_${safe}`;
}

function scalarType(kind: ShapeKind, usesJson: { value: boolean }): string {
  switch (kind) {
    case 'string':
      return 'String';
    case 'integer':
      return 'Int';
    case 'number':
      return 'Float';
    case 'boolean':
      return 'Boolean';
    default:
      usesJson.value = true;
      return 'JSON';
  }
}

function typeFor(node: ShapeNode, typeName: string, out: string[], usesJson: { value: boolean }): string {
  let base: string;
  if (node.kind === 'object') {
    base = typeName;
    out.push(typeDefFor(node, typeName, out, usesJson));
  } else if (node.kind === 'array') {
    const item = node.children?.[0];
    const itemType = item ? typeFor(item, `${typeName}Item`, out, usesJson) : 'JSON';
    base = `[${itemType}]`;
  } else {
    base = scalarType(node.kind, usesJson);
  }

  if (!node.optional && !node.nullable) {
    base = `${base}!`;
  }
  return base;
}

function typeDefFor(node: ShapeNode, typeName: string, out: string[], usesJson: { value: boolean }): string {
  const lines = [`type ${typeName} {`];
  for (const child of node.children ?? []) {
    const childTypeName = `${typeName}${toPascalCase(child.name)}`;
    const type = typeFor(child, childTypeName, out, usesJson);
    lines.push(`  ${fieldName(child.name)}: ${type}`);
  }
  lines.push('}');
  return lines.join('\n');
}

export function emitGraphQL(root: ShapeNode, rootName: string = 'Root'): string {
  const out: string[] = [];
  const usesJson = { value: false };

  let body: string;
  if (root.kind !== 'object') {
    const type = typeFor(root, rootName, out, usesJson);
    body = [...out, `type ${rootName} {\n  value: ${type}\n}`].join('\n\n');
  } else {
    const rootDef = typeDefFor(root, rootName, out, usesJson);
    body = [...out, rootDef].join('\n\n');
  }

  return usesJson.value ? `scalar JSON\n\n${body}` : body;
}
