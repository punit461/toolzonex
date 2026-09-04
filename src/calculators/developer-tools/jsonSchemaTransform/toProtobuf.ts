import type { ShapeKind, ShapeNode } from '../jsonTransform/inferShape';

function toPascalCase(name: string): string {
  const cleaned = name.replace(/[^a-zA-Z0-9]+/g, ' ').trim();
  if (!cleaned) return 'Value';
  return cleaned
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join('');
}

function toSnakeCase(name: string): string {
  const cleaned = name
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .toLowerCase()
    .replace(/^_+|_+$/g, '');
  return cleaned || 'field';
}

function scalarType(kind: ShapeKind): string {
  switch (kind) {
    case 'string':
      return 'string';
    case 'integer':
      return 'int64';
    case 'number':
      return 'double';
    case 'boolean':
      return 'bool';
    default:
      return 'string';
  }
}

function indentBlock(text: string, spaces: string): string {
  return text
    .split('\n')
    .map((line) => (line ? spaces + line : line))
    .join('\n');
}

function fieldTypeFor(node: ShapeNode, typeName: string, nestedDefs: string[]): string {
  if (node.kind === 'object') {
    nestedDefs.push(messageFor(node, typeName));
    return typeName;
  }
  return scalarType(node.kind);
}

function messageFor(node: ShapeNode, typeName: string): string {
  const nestedDefs: string[] = [];
  const fieldLines: string[] = [];
  let fieldNumber = 1;

  for (const child of node.children ?? []) {
    const childTypeName = `${typeName}${toPascalCase(child.name)}`;
    const fieldLabel = toSnakeCase(child.name);

    if (child.kind === 'array') {
      const item = child.children?.[0];
      const itemType = item ? fieldTypeFor(item, `${childTypeName}Item`, nestedDefs) : 'string';
      fieldLines.push(`  repeated ${itemType} ${fieldLabel} = ${fieldNumber};`);
    } else {
      const type = fieldTypeFor(child, childTypeName, nestedDefs);
      fieldLines.push(`  ${type} ${fieldLabel} = ${fieldNumber};`);
    }
    fieldNumber += 1;
  }

  const lines = [`message ${typeName} {`];
  for (const def of nestedDefs) {
    lines.push(indentBlock(def, '  '));
    lines.push('');
  }
  lines.push(...fieldLines);
  lines.push('}');
  return lines.join('\n');
}

export function emitProtobuf(root: ShapeNode, rootName: string = 'Root'): string {
  const header = 'syntax = "proto3";\n\n';
  if (root.kind !== 'object') {
    const nestedDefs: string[] = [];
    const type = root.kind === 'array'
      ? `repeated ${(() => {
          const item = root.children?.[0];
          return item ? fieldTypeFor(item, `${rootName}Item`, nestedDefs) : 'string';
        })()}`
      : scalarType(root.kind);
    const lines = [`message ${rootName} {`];
    for (const def of nestedDefs) {
      lines.push(indentBlock(def, '  '));
      lines.push('');
    }
    lines.push(`  ${type} value = 1;`);
    lines.push('}');
    return header + lines.join('\n') + '\n';
  }
  return header + messageFor(root, rootName) + '\n';
}
