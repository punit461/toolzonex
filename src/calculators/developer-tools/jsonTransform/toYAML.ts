import type { ShapeNode } from './inferShape';

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function yamlKey(key: string): string {
  return /^[A-Za-z0-9_-]+$/.test(key) ? key : JSON.stringify(key);
}

const RESERVED_SCALARS = /^(true|false|null|~|yes|no)$/i;
const NUMBER_LIKE = /^[-+]?(\d+\.?\d*|\.\d+)$/;

function yamlScalarString(value: string): string {
  if (value === '') return "''";
  if (
    RESERVED_SCALARS.test(value) ||
    NUMBER_LIKE.test(value) ||
    /^[\s]|[\s]$/.test(value) ||
    /[:#\-[\]{}?&*!|>'"%@`,]/.test(value)
  ) {
    return JSON.stringify(value);
  }
  return value;
}

function scalarText(value: unknown): string {
  if (value === null || value === undefined) return 'null';
  if (typeof value === 'string') return yamlScalarString(value);
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  return JSON.stringify(String(value));
}

function dumpObject(obj: Record<string, unknown>, indent: number, out: string[]): void {
  const pad = '  '.repeat(indent);
  const entries = Object.entries(obj);
  if (entries.length === 0) {
    out.push(`${pad}{}`);
    return;
  }
  for (const [key, value] of entries) {
    const k = yamlKey(key);
    if (isPlainObject(value) && Object.keys(value).length > 0) {
      out.push(`${pad}${k}:`);
      dumpObject(value, indent + 1, out);
    } else if (Array.isArray(value) && value.length > 0) {
      out.push(`${pad}${k}:`);
      dumpArray(value, indent, out);
    } else if (Array.isArray(value)) {
      out.push(`${pad}${k}: []`);
    } else if (isPlainObject(value)) {
      out.push(`${pad}${k}: {}`);
    } else {
      out.push(`${pad}${k}: ${scalarText(value)}`);
    }
  }
}

function dumpArray(arr: unknown[], indent: number, out: string[]): void {
  const pad = '  '.repeat(indent);
  for (const item of arr) {
    if (isPlainObject(item) && Object.keys(item).length > 0) {
      const entries = Object.entries(item);
      entries.forEach(([key, value], i) => {
        const k = yamlKey(key);
        const prefix = i === 0 ? `${pad}- ` : `${pad}  `;
        if (isPlainObject(value) && Object.keys(value).length > 0) {
          out.push(`${prefix}${k}:`);
          dumpObject(value, indent + 2, out);
        } else if (Array.isArray(value) && value.length > 0) {
          out.push(`${prefix}${k}:`);
          dumpArray(value, indent + 2, out);
        } else {
          out.push(`${prefix}${k}: ${scalarText(value)}`);
        }
      });
    } else if (Array.isArray(item) && item.length > 0) {
      out.push(`${pad}-`);
      dumpArray(item, indent + 1, out);
    } else {
      out.push(`${pad}- ${scalarText(item)}`);
    }
  }
}

export function emitYAML(root: ShapeNode, rootName: string = 'root'): string {
  const value = root.sampleValue;
  if (value === undefined) {
    return '# No sample values available to populate this document.\n';
  }
  const out: string[] = [];
  if (isPlainObject(value) && Object.keys(value).length > 0) {
    dumpObject(value, 0, out);
  } else if (Array.isArray(value) && value.length > 0) {
    dumpArray(value, 0, out);
  } else {
    out.push(`${yamlKey(rootName)}: ${isPlainObject(value) ? '{}' : Array.isArray(value) ? '[]' : scalarText(value)}`);
  }
  return out.join('\n') + '\n';
}
