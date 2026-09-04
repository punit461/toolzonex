import type { ShapeNode } from './inferShape';

const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}([T ]\d{2}:\d{2}(:\d{2}(\.\d+)?)?(Z|[+-]\d{2}:?\d{2})?)?$/;

function looksLikeIsoDate(value: unknown): boolean {
  return typeof value === 'string' && ISO_DATE_RE.test(value);
}

function toSnakeCase(name: string): string {
  const cleaned = name
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .toLowerCase()
    .replace(/^_+|_+$/g, '');
  return cleaned || 'field';
}

function columnTypeFor(node: ShapeNode): string {
  switch (node.kind) {
    case 'string':
      return looksLikeIsoDate(node.sampleValue) ? 'DATETIME' : 'VARCHAR(255)';
    case 'integer':
      return 'BIGINT';
    case 'number':
      return 'DOUBLE';
    case 'boolean':
      return 'BOOLEAN';
    default:
      return 'TEXT';
  }
}

interface TableSpec {
  name: string;
  lines: string[];
}

function tableFor(node: ShapeNode, tableName: string, parentTableName: string | undefined, tables: TableSpec[]): void {
  const lines: string[] = ['  id INT PRIMARY KEY AUTO_INCREMENT,'];

  if (parentTableName) {
    lines.push(`  ${toSnakeCase(parentTableName)}_id INT NOT NULL, -- foreign key referencing ${toSnakeCase(parentTableName)}.id`);
  }

  for (const child of node.children ?? []) {
    const columnName = toSnakeCase(child.name);

    if (child.kind === 'object') {
      const childTable = `${tableName}_${columnName}`;
      lines.push(`  -- ${columnName}: see table \`${childTable}\` (one-to-one, FK \`${childTable}.${toSnakeCase(tableName)}_id\`)`);
      tableFor(child, childTable, tableName, tables);
      continue;
    }

    if (child.kind === 'array') {
      const item = child.children?.[0];
      if (item && item.kind === 'object') {
        const childTable = `${tableName}_${columnName}`;
        lines.push(`  -- ${columnName}: see table \`${childTable}\` (one-to-many, FK \`${childTable}.${toSnakeCase(tableName)}_id\`)`);
        tableFor(item, childTable, tableName, tables);
      } else {
        lines.push(`  -- ${columnName}: array of ${item ? item.kind : 'unknown'} values would need a separate join table (\`${tableName}_${columnName}\`)`);
      }
      continue;
    }

    const nullability = child.nullable || child.optional ? 'NULL' : 'NOT NULL';
    lines.push(`  ${columnName} ${columnTypeFor(child)} ${nullability},`);
  }

  let lastCommaIndex = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].endsWith(',')) lastCommaIndex = i;
  }
  const cleaned = lines.map((line, i) => (i === lastCommaIndex ? line.replace(/,$/, '') : line));

  tables.push({ name: tableName, lines: cleaned });
}

export function emitMySQL(root: ShapeNode, rootName: string = 'root'): string {
  const tableName = toSnakeCase(rootName);
  const tables: TableSpec[] = [];

  if (root.kind === 'object') {
    tableFor(root, tableName, undefined, tables);
  } else {
    tables.push({
      name: tableName,
      lines: ['  id INT PRIMARY KEY AUTO_INCREMENT,', `  value ${columnTypeFor(root)} ${root.nullable || root.optional ? 'NULL' : 'NOT NULL'}`],
    });
  }

  return tables
    .map((table) => `CREATE TABLE ${table.name} (\n${table.lines.join('\n')}\n);`)
    .join('\n\n');
}
