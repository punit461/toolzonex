import type { ShapeKind, ShapeNode } from './inferShape';

function toPascalCase(name: string): string {
  const cleaned = name.replace(/[^a-zA-Z0-9]+/g, ' ').trim();
  if (!cleaned) return 'Value';
  return cleaned
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join('');
}

function toSnakeCase(name: string): string {
  const converted = name
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .toLowerCase()
    .replace(/^_+|_+$/g, '');
  return converted || 'value';
}

function scalarType(kind: ShapeKind): string {
  switch (kind) {
    case 'string':
      return 'String';
    case 'integer':
      return 'i64';
    case 'number':
      return 'f64';
    case 'boolean':
      return 'bool';
    default:
      return 'serde_json::Value';
  }
}

function typeFor(node: ShapeNode, typeName: string, out: string[]): string {
  let base: string;
  if (node.kind === 'object') {
    base = typeName;
    out.push(structFor(node, typeName, out));
  } else if (node.kind === 'array') {
    const item = node.children?.[0];
    const itemType = item ? typeFor(item, `${typeName}Item`, out) : 'serde_json::Value';
    base = `Vec<${itemType}>`;
  } else {
    base = scalarType(node.kind);
  }
  if (node.nullable || node.optional) {
    base = `Option<${base}>`;
  }
  return base;
}

function structFor(node: ShapeNode, typeName: string, out: string[]): string {
  const lines: string[] = ['#[derive(Debug, Serialize, Deserialize)]', `pub struct ${typeName} {`];
  for (const child of node.children ?? []) {
    const fieldName = toSnakeCase(child.name);
    const childTypeName = `${typeName}${toPascalCase(child.name)}`;
    const type = typeFor(child, childTypeName, out);
    if (fieldName !== child.name) {
      lines.push(`    #[serde(rename = "${child.name}")]`);
    }
    lines.push(`    pub ${fieldName}: ${type},`);
  }
  lines.push('}');
  return lines.join('\n');
}

export function emitRustSerde(root: ShapeNode, rootName: string = 'Root'): string {
  const out: string[] = [];
  const rootDef =
    root.kind === 'object' ? structFor(root, rootName, out) : `pub type ${rootName} = ${typeFor(root, `${rootName}Value`, out)};`;
  return [...out, rootDef].join('\n\n');
}
