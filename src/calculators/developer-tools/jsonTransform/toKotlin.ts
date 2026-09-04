import type { ShapeKind, ShapeNode } from './inferShape';

function toPascalCase(name: string): string {
  const cleaned = name.replace(/[^a-zA-Z0-9]+/g, ' ').trim();
  if (!cleaned) return 'Value';
  return cleaned
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join('');
}

function toCamelCase(name: string): string {
  const pascal = toPascalCase(name);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

function scalarType(kind: ShapeKind): string {
  switch (kind) {
    case 'string':
      return 'String';
    case 'integer':
      return 'Int';
    case 'number':
      return 'Double';
    case 'boolean':
      return 'Boolean';
    default:
      return 'Any';
  }
}

function typeFor(node: ShapeNode, typeName: string, out: string[]): string {
  let base: string;
  if (node.kind === 'object') {
    base = typeName;
    out.push(dataClassFor(node, typeName, out));
  } else if (node.kind === 'array') {
    const item = node.children?.[0];
    const itemType = item ? typeFor(item, `${typeName}Item`, out) : 'Any';
    base = `List<${itemType}>`;
  } else {
    base = scalarType(node.kind);
  }
  if (node.nullable || node.optional) {
    base = `${base}?`;
  }
  return base;
}

function dataClassFor(node: ShapeNode, typeName: string, out: string[]): string {
  const fields = (node.children ?? []).map((child) => {
    const childTypeName = `${typeName}${toPascalCase(child.name)}`;
    const type = typeFor(child, childTypeName, out);
    const defaultValue = child.optional || child.nullable ? ' = null' : '';
    return `    val ${toCamelCase(child.name)}: ${type}${defaultValue}`;
  });
  if (fields.length === 0) return `data class ${typeName}(\n)`;
  return `data class ${typeName}(\n${fields.join(',\n')}\n)`;
}

export function emitKotlin(root: ShapeNode, rootName: string = 'Root'): string {
  const out: string[] = [];
  const rootDef =
    root.kind === 'object' ? dataClassFor(root, rootName, out) : `typealias ${rootName} = ${typeFor(root, `${rootName}Value`, out)}`;
  return [...out, rootDef].join('\n\n');
}
