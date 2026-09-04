import type { ShapeKind, ShapeNode } from '../jsonTransform/inferShape';

type JsonSchemaLike = Record<string, unknown>;

function isSchemaObject(value: unknown): value is JsonSchemaLike {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function typeListOf(schema: JsonSchemaLike): string[] {
  const type = schema.type;
  if (typeof type === 'string') return [type];
  if (Array.isArray(type)) return type.filter((t): t is string => typeof t === 'string');
  return [];
}

function primitiveKindFor(type: string | undefined): ShapeKind {
  switch (type) {
    case 'string':
      return 'string';
    case 'integer':
      return 'integer';
    case 'number':
      return 'number';
    case 'boolean':
      return 'boolean';
    default:
      return 'unknown';
  }
}

function schemaToShape(schema: unknown, name: string, required: boolean): ShapeNode {
  if (!isSchemaObject(schema)) {
    return { name, kind: 'unknown', optional: !required, nullable: false };
  }

  const types = typeListOf(schema);
  const nullable = types.includes('null');
  const primaryType = types.find((t) => t !== 'null');
  const optional = !required;

  const isObjectSchema = primaryType === 'object' || (!primaryType && isSchemaObject(schema.properties));
  if (isObjectSchema) {
    const requiredList = Array.isArray(schema.required)
      ? schema.required.filter((r): r is string => typeof r === 'string')
      : [];
    const properties = isSchemaObject(schema.properties) ? schema.properties : {};
    const children = Object.keys(properties).map((key) =>
      schemaToShape(properties[key], key, requiredList.includes(key))
    );
    return { name, kind: 'object', optional, nullable, children };
  }

  const isArraySchema = primaryType === 'array' || (!primaryType && schema.items !== undefined);
  if (isArraySchema) {
    const itemSchema = schema.items !== undefined ? schema.items : {};
    const item = schemaToShape(itemSchema, 'item', true);
    return { name, kind: 'array', optional, nullable, children: [item] };
  }

  return { name, kind: primitiveKindFor(primaryType), optional, nullable };
}

export function parseJsonSchema(text: string): { root: ShapeNode; error?: string } {
  try {
    const parsed = JSON.parse(text);
    if (!isSchemaObject(parsed)) {
      return {
        root: { name: 'root', kind: 'unknown', optional: false, nullable: false },
        error: 'A JSON Schema document must be a JSON object.',
      };
    }
    const root = schemaToShape(parsed, 'root', true);
    return { root };
  } catch (e) {
    return {
      root: { name: 'root', kind: 'unknown', optional: false, nullable: false },
      error: e instanceof Error ? e.message : 'Invalid JSON',
    };
  }
}
