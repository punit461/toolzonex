export type ShapeKind = 'string' | 'number' | 'integer' | 'boolean' | 'null' | 'array' | 'object' | 'unknown';

export interface ShapeNode {
  name: string;
  kind: ShapeKind;
  optional: boolean;
  nullable: boolean;
  children?: ShapeNode[];
  sampleValue?: unknown;
}

function kindOf(value: unknown): ShapeKind {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  switch (typeof value) {
    case 'string':
      return 'string';
    case 'boolean':
      return 'boolean';
    case 'number':
      return Number.isInteger(value) ? 'integer' : 'number';
    case 'object':
      return 'object';
    default:
      return 'unknown';
  }
}

function leafNode(name: string, value: unknown): ShapeNode {
  const kind = kindOf(value);
  if (kind === 'null') {
    return { name, kind: 'null', optional: false, nullable: true, sampleValue: null };
  }
  return { name, kind, optional: false, nullable: false, sampleValue: value };
}

export function inferShape(sample: unknown, name: string = 'root'): ShapeNode {
  const kind = kindOf(sample);

  if (kind === 'array') {
    const arr = sample as unknown[];
    if (arr.length === 0) {
      return {
        name,
        kind: 'array',
        optional: false,
        nullable: false,
        children: [{ name: 'item', kind: 'unknown', optional: false, nullable: false }],
      };
    }
    const itemShapes = arr.map((v) => inferShape(v, 'item'));
    const merged = mergeShapes(itemShapes, 'item');
    return { name, kind: 'array', optional: false, nullable: false, children: [merged], sampleValue: sample };
  }

  if (kind === 'object') {
    const obj = sample as Record<string, unknown>;
    const children = Object.keys(obj).map((key) => inferShape(obj[key], key));
    return { name, kind: 'object', optional: false, nullable: false, children, sampleValue: sample };
  }

  return leafNode(name, sample);
}

/** Merges shapes that occupy the same conceptual slot (array elements, or the same key across merged object samples). */
function mergeShapes(nodes: ShapeNode[], name: string): ShapeNode {
  if (nodes.length === 0) {
    return { name, kind: 'unknown', optional: false, nullable: false };
  }

  let nullable = false;
  const nonNull: ShapeNode[] = [];
  for (const node of nodes) {
    if (node.kind === 'null') nullable = true;
    else nonNull.push(node);
  }

  if (nonNull.length === 0) {
    return { name, kind: 'null', optional: false, nullable: true };
  }

  const kinds = new Set(nonNull.map((n) => n.kind));
  let kind: ShapeKind;
  if (kinds.size === 1) {
    kind = nonNull[0].kind;
  } else if (kinds.size === 2 && kinds.has('integer') && kinds.has('number')) {
    kind = 'number';
  } else {
    kind = 'unknown';
  }

  const sampleValue = nonNull.find((n) => n.sampleValue !== undefined)?.sampleValue;

  if (kind === 'object') {
    const keys: string[] = [];
    const seen = new Set<string>();
    for (const n of nonNull) {
      for (const child of n.children ?? []) {
        if (!seen.has(child.name)) {
          seen.add(child.name);
          keys.push(child.name);
        }
      }
    }

    const children = keys.map((key) => {
      const matches: ShapeNode[] = [];
      let presentInAll = true;
      for (const n of nonNull) {
        const child = (n.children ?? []).find((c) => c.name === key);
        if (child) matches.push(child);
        else presentInAll = false;
      }
      const merged = mergeShapes(matches, key);
      merged.optional = merged.optional || !presentInAll;
      return merged;
    });

    return { name, kind, optional: false, nullable, children, sampleValue };
  }

  if (kind === 'array') {
    const items: ShapeNode[] = [];
    for (const n of nonNull) {
      for (const child of n.children ?? []) items.push(child);
    }
    const mergedItem = items.length
      ? mergeShapes(items, 'item')
      : { name: 'item', kind: 'unknown' as ShapeKind, optional: false, nullable: false };
    return { name, kind, optional: false, nullable, children: [mergedItem], sampleValue };
  }

  return { name, kind, optional: false, nullable, sampleValue };
}

export function parseJsonSample(text: string): { root: ShapeNode; error?: string } {
  try {
    const parsed = JSON.parse(text);
    return { root: inferShape(parsed, 'root') };
  } catch (e) {
    return {
      root: { name: 'root', kind: 'unknown', optional: false, nullable: false },
      error: e instanceof Error ? e.message : 'Invalid JSON',
    };
  }
}
