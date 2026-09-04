export interface CssRule {
  selector: string;
  declarations: { property: string; value: string }[];
}

function stripComments(css: string): string {
  return css.replace(/\/\*[\s\S]*?\*\//g, '');
}

export function parseCss(css: string): CssRule[] {
  const cleaned = stripComments(css);
  const rules: CssRule[] = [];
  let i = 0;
  const len = cleaned.length;

  while (i < len) {
    while (i < len && /\s/.test(cleaned[i])) i++;
    if (i >= len) break;

    const selectorStart = i;
    let depth = 0;
    while (i < len && !(cleaned[i] === '{' && depth === 0)) {
      if (cleaned[i] === '{') depth++;
      if (cleaned[i] === '}') depth--;
      i++;
    }
    if (i >= len) break;
    const selectorRaw = cleaned.slice(selectorStart, i).trim();
    i++;

    if (selectorRaw.startsWith('@')) {
      let atDepth = 1;
      const bodyStart = i;
      while (i < len && atDepth > 0) {
        if (cleaned[i] === '{') atDepth++;
        if (cleaned[i] === '}') atDepth--;
        i++;
      }
      const atBody = cleaned.slice(bodyStart, i - 1);
      const nested = parseCss(atBody);
      if (nested.length > 0) {
        for (const n of nested) {
          rules.push({ selector: `${selectorRaw} { ${n.selector} }`, declarations: n.declarations });
        }
      } else {
        rules.push({ selector: selectorRaw, declarations: [] });
      }
      continue;
    }

    const bodyStart = i;
    let braceDepth = 1;
    while (i < len && braceDepth > 0) {
      if (cleaned[i] === '{') braceDepth++;
      if (cleaned[i] === '}') braceDepth--;
      if (braceDepth === 0) break;
      i++;
    }
    const body = cleaned.slice(bodyStart, i);
    i++;

    const declarations = body
      .split(';')
      .map((d) => d.trim())
      .filter(Boolean)
      .map((decl) => {
        const idx = decl.indexOf(':');
        if (idx === -1) return null;
        return {
          property: decl.slice(0, idx).trim(),
          value: decl.slice(idx + 1).trim(),
        };
      })
      .filter((d): d is { property: string; value: string } => d !== null);

    const selectors = selectorRaw.split(',').map((s) => s.trim()).filter(Boolean);
    for (const selector of selectors) {
      rules.push({ selector, declarations });
    }
  }

  return rules;
}

function kebabToCamel(prop: string): string {
  if (prop.startsWith('--')) return prop;
  return prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

function selectorToIdentifier(selector: string, fallback: string): string {
  const cleaned = selector
    .replace(/^[.#]/, '')
    .replace(/[^a-zA-Z0-9_\s-]/g, ' ')
    .trim();
  if (!cleaned) return fallback;
  const parts = cleaned.split(/[\s-]+/).filter(Boolean);
  const identifier = parts
    .map((p, idx) => (idx === 0 ? p.charAt(0).toLowerCase() + p.slice(1) : p.charAt(0).toUpperCase() + p.slice(1)))
    .join('');
  return /^[a-zA-Z_]/.test(identifier) ? identifier : `_${identifier}`;
}

function selectorToPascal(selector: string, fallback: string): string {
  const camel = selectorToIdentifier(selector, fallback);
  return camel.charAt(0).toUpperCase() + camel.slice(1);
}

export function cssToJsObjects(css: string): string {
  const rules = parseCss(css).filter((r) => r.declarations.length > 0);
  if (rules.length === 0) return '';

  return rules
    .map((rule, idx) => {
      const name = selectorToIdentifier(rule.selector, `style${idx + 1}`);
      const lines = rule.declarations.map(
        (d) => `  ${kebabToCamel(d.property)}: '${d.value.replace(/'/g, "\\'")}',`
      );
      return `// ${rule.selector}\nconst ${name} = {\n${lines.join('\n')}\n};`;
    })
    .join('\n\n');
}

export function cssToTemplateLiteral(css: string): string {
  const rules = parseCss(css).filter((r) => r.declarations.length > 0);
  if (rules.length === 0) return '';

  return rules
    .map((rule, idx) => {
      const name = selectorToPascal(rule.selector, `Styled${idx + 1}`);
      const lines = rule.declarations.map((d) => `  ${d.property}: ${d.value};`);
      return `const Styled${name} = styled.div\`\n${lines.join('\n')}\n\`;`;
    })
    .join('\n\n');
}

const SPACING_SCALE: Record<string, string> = {
  '0px': '0',
  '0': '0',
  '1px': 'px',
  '2px': '0.5',
  '4px': '1',
  '6px': '1.5',
  '8px': '2',
  '10px': '2.5',
  '12px': '3',
  '14px': '3.5',
  '16px': '4',
  '20px': '5',
  '24px': '6',
  '28px': '7',
  '32px': '8',
  '36px': '9',
  '40px': '10',
  '44px': '11',
  '48px': '12',
  '56px': '14',
  '64px': '16',
  '80px': '20',
  '96px': '24',
};

const TAILWIND_COLORS: Record<string, string> = {
  '#000000': 'black',
  '#ffffff': 'white',
  transparent: 'transparent',
  '#ef4444': 'red-500',
  '#f97316': 'orange-500',
  '#f59e0b': 'amber-500',
  '#eab308': 'yellow-500',
  '#84cc16': 'lime-500',
  '#22c55e': 'green-500',
  '#10b981': 'emerald-500',
  '#14b8a6': 'teal-500',
  '#06b6d4': 'cyan-500',
  '#0ea5e9': 'sky-500',
  '#3b82f6': 'blue-500',
  '#6366f1': 'indigo-500',
  '#8b5cf6': 'violet-500',
  '#a855f7': 'purple-500',
  '#d946ef': 'fuchsia-500',
  '#ec4899': 'pink-500',
  '#f43f5e': 'rose-500',
  '#6b7280': 'gray-500',
  '#71717a': 'zinc-500',
  '#737373': 'neutral-500',
  '#78716c': 'stone-500',
  '#64748b': 'slate-500',
};

function hexToRgb(hex: string): [number, number, number] | null {
  const m = hex.replace('#', '');
  const full = m.length === 3 ? m.split('').map((c) => c + c).join('') : m;
  if (full.length !== 6) return null;
  const num = parseInt(full, 16);
  if (Number.isNaN(num)) return null;
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function colorNameToHex(value: string): string | null {
  const named: Record<string, string> = {
    black: '#000000',
    white: '#ffffff',
    red: '#ff0000',
    blue: '#0000ff',
    green: '#008000',
  };
  const v = value.trim().toLowerCase();
  if (v.startsWith('#')) return v;
  if (named[v]) return named[v];
  return null;
}

function nearestTailwindColor(value: string): string | null {
  const hex = colorNameToHex(value);
  if (!hex) return null;
  if (hex === '#000000') return 'black';
  if (hex === '#ffffff') return 'white';
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  let best: string | null = null;
  let bestDist = Infinity;
  for (const [swatchHex, name] of Object.entries(TAILWIND_COLORS)) {
    const swatchRgb = hexToRgb(swatchHex);
    if (!swatchRgb) continue;
    const dist =
      (rgb[0] - swatchRgb[0]) ** 2 + (rgb[1] - swatchRgb[1]) ** 2 + (rgb[2] - swatchRgb[2]) ** 2;
    if (dist < bestDist) {
      bestDist = dist;
      best = name;
    }
  }
  return best;
}

const DISPLAY_MAP: Record<string, string> = {
  flex: 'flex',
  block: 'block',
  none: 'hidden',
  grid: 'grid',
  inline: 'inline',
  'inline-block': 'inline-block',
  'inline-flex': 'inline-flex',
  contents: 'contents',
};

const POSITION_MAP: Record<string, string> = {
  relative: 'relative',
  absolute: 'absolute',
  fixed: 'fixed',
  sticky: 'sticky',
  static: 'static',
};

const TEXT_ALIGN_MAP: Record<string, string> = {
  center: 'text-center',
  left: 'text-left',
  right: 'text-right',
  justify: 'text-justify',
};

const FONT_WEIGHT_MAP: Record<string, string> = {
  bold: 'font-bold',
  '700': 'font-bold',
  normal: 'font-normal',
  '400': 'font-normal',
  '500': 'font-medium',
  '600': 'font-semibold',
  '800': 'font-extrabold',
  '900': 'font-black',
  '300': 'font-light',
  '200': 'font-extralight',
  '100': 'font-thin',
};

const FLEX_DIRECTION_MAP: Record<string, string> = {
  row: 'flex-row',
  column: 'flex-col',
  'row-reverse': 'flex-row-reverse',
  'column-reverse': 'flex-col-reverse',
};

const JUSTIFY_CONTENT_MAP: Record<string, string> = {
  center: 'justify-center',
  'flex-start': 'justify-start',
  'flex-end': 'justify-end',
  'space-between': 'justify-between',
  'space-around': 'justify-around',
  'space-evenly': 'justify-evenly',
};

const ALIGN_ITEMS_MAP: Record<string, string> = {
  center: 'items-center',
  'flex-start': 'items-start',
  'flex-end': 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
};

const BORDER_RADIUS_MAP: Record<string, string> = {
  '2px': 'rounded-sm',
  '4px': 'rounded',
  '6px': 'rounded-md',
  '8px': 'rounded-lg',
  '12px': 'rounded-xl',
  '16px': 'rounded-2xl',
  '24px': 'rounded-3xl',
  '9999px': 'rounded-full',
  '50%': 'rounded-full',
};

const SPACING_PROPERTY_PREFIX: Record<string, string> = {
  margin: 'm',
  'margin-top': 'mt',
  'margin-right': 'mr',
  'margin-bottom': 'mb',
  'margin-left': 'ml',
  padding: 'p',
  'padding-top': 'pt',
  'padding-right': 'pr',
  'padding-bottom': 'pb',
  'padding-left': 'pl',
  gap: 'gap',
  'row-gap': 'gap-y',
  'column-gap': 'gap-x',
};

export function cssToTailwind(css: string): { output: string; unmapped: string[] } {
  const rules = parseCss(css).filter((r) => r.declarations.length > 0);
  const outputBlocks: string[] = [];
  const unmapped: string[] = [];

  for (const rule of rules) {
    const classes: string[] = [];

    for (const { property, value } of rule.declarations) {
      const prop = property.toLowerCase();
      const val = value.trim();
      const declStr = `${property}: ${value}`;
      let matched = false;

      if (prop === 'display' && DISPLAY_MAP[val]) {
        classes.push(DISPLAY_MAP[val]);
        matched = true;
      } else if (prop === 'position' && POSITION_MAP[val]) {
        classes.push(POSITION_MAP[val]);
        matched = true;
      } else if (prop === 'text-align' && TEXT_ALIGN_MAP[val]) {
        classes.push(TEXT_ALIGN_MAP[val]);
        matched = true;
      } else if (prop === 'font-weight' && FONT_WEIGHT_MAP[val]) {
        classes.push(FONT_WEIGHT_MAP[val]);
        matched = true;
      } else if (prop === 'flex-direction' && FLEX_DIRECTION_MAP[val]) {
        classes.push(FLEX_DIRECTION_MAP[val]);
        matched = true;
      } else if (prop === 'justify-content' && JUSTIFY_CONTENT_MAP[val]) {
        classes.push(JUSTIFY_CONTENT_MAP[val]);
        matched = true;
      } else if (prop === 'align-items' && ALIGN_ITEMS_MAP[val]) {
        classes.push(ALIGN_ITEMS_MAP[val]);
        matched = true;
      } else if (prop === 'border-radius' && BORDER_RADIUS_MAP[val]) {
        classes.push(BORDER_RADIUS_MAP[val]);
        matched = true;
      } else if (SPACING_PROPERTY_PREFIX[prop] && SPACING_SCALE[val] !== undefined) {
        classes.push(`${SPACING_PROPERTY_PREFIX[prop]}-${SPACING_SCALE[val]}`);
        matched = true;
      } else if ((prop === 'background-color' || prop === 'background') && nearestTailwindColor(val)) {
        classes.push(`bg-${nearestTailwindColor(val)}`);
        matched = true;
      } else if (prop === 'color' && nearestTailwindColor(val)) {
        classes.push(`text-${nearestTailwindColor(val)}`);
        matched = true;
      } else if (prop === 'border-color' && nearestTailwindColor(val)) {
        classes.push(`border-${nearestTailwindColor(val)}`);
        matched = true;
      }

      if (!matched) {
        unmapped.push(declStr);
      }
    }

    if (classes.length > 0) {
      outputBlocks.push(`/* ${rule.selector} */\n<div className="${classes.join(' ')}">`);
    }
  }

  return { output: outputBlocks.join('\n\n'), unmapped };
}
