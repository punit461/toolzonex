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

function scalarType(kind: ShapeKind, boxed: boolean): string {
  switch (kind) {
    case 'string':
      return 'String';
    case 'integer':
      return boxed ? 'Integer' : 'int';
    case 'number':
      return boxed ? 'Double' : 'double';
    case 'boolean':
      return boxed ? 'Boolean' : 'boolean';
    default:
      return 'Object';
  }
}

function typeFor(node: ShapeNode, typeName: string, out: string[], usesList: { used: boolean }): string {
  if (node.kind === 'object') {
    out.push(classFor(node, typeName, out, usesList));
    return typeName;
  }
  if (node.kind === 'array') {
    usesList.used = true;
    const item = node.children?.[0];
    const itemType = item ? typeFor(item, `${typeName}Item`, out, usesList) : 'Object';
    return `List<${itemType}>`;
  }
  return scalarType(node.kind, node.nullable || node.optional);
}

function classFor(node: ShapeNode, typeName: string, out: string[], usesList: { used: boolean }): string {
  const fields = (node.children ?? []).map((child) => {
    const childTypeName = `${typeName}${toPascalCase(child.name)}`;
    const type = typeFor(child, childTypeName, out, usesList);
    return { name: toCamelCase(child.name), type };
  });

  const lines: string[] = [`public class ${typeName} {`];
  for (const f of fields) lines.push(`    private ${f.type} ${f.name};`);
  lines.push('');
  for (const f of fields) {
    const cap = f.name.charAt(0).toUpperCase() + f.name.slice(1);
    lines.push(`    public ${f.type} get${cap}() {`);
    lines.push(`        return ${f.name};`);
    lines.push('    }');
    lines.push('');
    lines.push(`    public void set${cap}(${f.type} ${f.name}) {`);
    lines.push(`        this.${f.name} = ${f.name};`);
    lines.push('    }');
    lines.push('');
  }
  if (lines[lines.length - 1] === '') lines.pop();
  lines.push('}');
  return lines.join('\n');
}

export function emitJava(root: ShapeNode, rootName: string = 'Root'): string {
  const out: string[] = [];
  const usesList = { used: false };
  const rootDef =
    root.kind === 'object'
      ? classFor(root, rootName, out, usesList)
      : `public class ${rootName} {\n    private ${typeFor(root, `${rootName}Value`, out, usesList)} value;\n}`;
  const header = usesList.used ? '// Requires: import java.util.List;\n\n' : '';
  return header + [...out, rootDef].join('\n\n');
}
