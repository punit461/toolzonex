import type { ShapeNode } from './inferShape';

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function tomlKey(key: string): string {
  return /^[A-Za-z0-9_-]+$/.test(key) ? key : JSON.stringify(key);
}

function formatScalar(value: unknown): string {
  if (value === null || value === undefined) return '""';
  if (typeof value === 'string') return JSON.stringify(value);
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  return JSON.stringify(String(value));
}

function formatArray(arr: unknown[]): string {
  const items = arr.map((item) => {
    if (Array.isArray(item)) return formatArray(item);
    if (isPlainObject(item)) return formatInlineTable(item);
    return formatScalar(item);
  });
  return `[${items.join(', ')}]`;
}

function formatInlineTable(obj: Record<string, unknown>): string {
  const entries = Object.entries(obj).map(([k, v]) => {
    if (Array.isArray(v)) return `${tomlKey(k)} = ${formatArray(v)}`;
    if (isPlainObject(v)) return `${tomlKey(k)} = ${formatInlineTable(v)}`;
    return `${tomlKey(k)} = ${formatScalar(v)}`;
  });
  return `{ ${entries.join(', ')} }`;
}

function renderSection(obj: Record<string, unknown>, path: string[], out: string[], skipHeader = false): void {
  const scalars: string[] = [];
  const objectChildren: Array<[string, Record<string, unknown>]> = [];
  const tableArrayChildren: Array<[string, Array<Record<string, unknown>>]> = [];

  for (const [key, value] of Object.entries(obj)) {
    if (value === null || value === undefined) {
      scalars.push(`${tomlKey(key)} = "" # was null in source`);
    } else if (Array.isArray(value)) {
      if (value.length > 0 && value.every((item) => isPlainObject(item))) {
        tableArrayChildren.push([key, value as Array<Record<string, unknown>>]);
      } else {
        scalars.push(`${tomlKey(key)} = ${formatArray(value)}`);
      }
    } else if (isPlainObject(value)) {
      objectChildren.push([key, value]);
    } else {
      scalars.push(`${tomlKey(key)} = ${formatScalar(value)}`);
    }
  }

  if (!skipHeader && path.length > 0) {
    out.push(`[${path.map(tomlKey).join('.')}]`);
  }
  out.push(...scalars);

  for (const [key, value] of objectChildren) {
    out.push('');
    renderSection(value, [...path, key], out);
  }

  for (const [key, items] of tableArrayChildren) {
    for (const item of items) {
      out.push('');
      out.push(`[[${[...path, key].map(tomlKey).join('.')}]]`);
      renderSection(item, [...path, key], out, true);
    }
  }
}

export function emitTOML(root: ShapeNode, rootName: string = 'root'): string {
  const value = root.sampleValue;
  if (value === undefined) {
    return '# No sample values available to populate this document.';
  }
  if (isPlainObject(value)) {
    const out: string[] = [];
    renderSection(value, [], out);
    return out.join('\n').trim() + '\n';
  }
  if (Array.isArray(value)) {
    return `${tomlKey(rootName)} = ${formatArray(value)}\n`;
  }
  return `${tomlKey(rootName)} = ${formatScalar(value)}\n`;
}
