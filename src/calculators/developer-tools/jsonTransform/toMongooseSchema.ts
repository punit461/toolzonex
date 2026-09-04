import type { ShapeNode } from './inferShape';

function propertyKey(name: string): string {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(name) ? name : `"${name}"`;
}

const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}([T ]\d{2}:\d{2}(:\d{2}(\.\d+)?)?(Z|[+-]\d{2}:?\d{2})?)?$/;

function looksLikeIsoDate(value: unknown): boolean {
  return typeof value === 'string' && ISO_DATE_RE.test(value);
}

function scalarType(node: ShapeNode): string {
  switch (node.kind) {
    case 'string':
      return looksLikeIsoDate(node.sampleValue) ? 'Date' : 'String';
    case 'integer':
    case 'number':
      return 'Number';
    case 'boolean':
      return 'Boolean';
    default:
      return 'mongoose.Schema.Types.Mixed';
  }
}

function indent(text: string, spaces: string): string {
  return text
    .split('\n')
    .map((line) => (line ? spaces + line : line))
    .join('\n');
}

function fieldDefFor(node: ShapeNode): string {
  if (node.kind === 'object') {
    return objectLiteralFor(node);
  }
  if (node.kind === 'array') {
    const item = node.children?.[0];
    const itemDef = item ? fieldDefFor(item) : 'mongoose.Schema.Types.Mixed';
    return `[${itemDef}]`;
  }

  const lines = [`{ type: ${scalarType(node)}`];
  if (!node.optional && !node.nullable) lines.push(', required: true');
  lines.push(' }');
  return lines.join('');
}

function objectLiteralFor(node: ShapeNode): string {
  const fields = (node.children ?? []).map((child) => {
    return `${propertyKey(child.name)}: ${fieldDefFor(child)},`;
  });
  return `{\n${indent(fields.join('\n'), '  ')}\n}`;
}

function lowerFirst(name: string): string {
  return name ? name.charAt(0).toLowerCase() + name.slice(1) : name;
}

export function emitMongooseSchema(root: ShapeNode, rootName: string = 'Root'): string {
  const varName = `${lowerFirst(rootName)}Schema`;
  if (root.kind !== 'object') {
    return `const ${varName} = new mongoose.Schema(${fieldDefFor(root)});`;
  }
  const fields = (root.children ?? []).map((child) => `${propertyKey(child.name)}: ${fieldDefFor(child)},`);
  return `const ${varName} = new mongoose.Schema({\n${indent(fields.join('\n'), '  ')}\n});`;
}
