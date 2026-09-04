export interface DomTransformResult {
  output: string;
  error?: string;
}

const ATTR_MAP: Record<string, string> = {
  'class': 'className',
  'for': 'htmlFor',
  'fill-rule': 'fillRule',
  'clip-rule': 'clipRule',
  'clip-path': 'clipPath',
  'stroke-width': 'strokeWidth',
  'stroke-linecap': 'strokeLinecap',
  'stroke-linejoin': 'strokeLinejoin',
  'stroke-dasharray': 'strokeDasharray',
  'stroke-dashoffset': 'strokeDashoffset',
  'stroke-miterlimit': 'strokeMiterlimit',
  'stroke-opacity': 'strokeOpacity',
  'fill-opacity': 'fillOpacity',
  'font-family': 'fontFamily',
  'font-size': 'fontSize',
  'font-weight': 'fontWeight',
  'font-style': 'fontStyle',
  'text-anchor': 'textAnchor',
  'text-decoration': 'textDecoration',
  'letter-spacing': 'letterSpacing',
  'word-spacing': 'wordSpacing',
  'xlink:href': 'xlinkHref',
  'xlink:title': 'xlinkTitle',
  'xml:space': 'xmlSpace',
  'xml:lang': 'xmlLang',
  'stop-color': 'stopColor',
  'stop-opacity': 'stopOpacity',
  'flood-color': 'floodColor',
  'flood-opacity': 'floodOpacity',
  'color-interpolation': 'colorInterpolation',
  'color-interpolation-filters': 'colorInterpolationFilters',
  'dominant-baseline': 'dominantBaseline',
  'alignment-baseline': 'alignmentBaseline',
  'baseline-shift': 'baselineShift',
  'pointer-events': 'pointerEvents',
  'shape-rendering': 'shapeRendering',
  'text-rendering': 'textRendering',
  'vector-effect': 'vectorEffect',
  'accent-height': 'accentHeight',
  'horiz-adv-x': 'horizAdvX',
  'viewBox': 'viewBox',
  'preserveAspectRatio': 'preserveAspectRatio',
  'tabindex': 'tabIndex',
  'readonly': 'readOnly',
  'maxlength': 'maxLength',
  'colspan': 'colSpan',
  'rowspan': 'rowSpan',
  'contenteditable': 'contentEditable',
  'crossorigin': 'crossOrigin',
  'srcset': 'srcSet',
  'autofocus': 'autoFocus',
  'autoplay': 'autoPlay',
  'autocomplete': 'autoComplete',
  'novalidate': 'noValidate',
  'frameborder': 'frameBorder',
  'allowfullscreen': 'allowFullScreen',
  'spellcheck': 'spellCheck',
  'enctype': 'encType',
  'accesskey': 'accessKey',
  'usemap': 'useMap',
  'cellpadding': 'cellPadding',
  'cellspacing': 'cellSpacing',
};

const VOID_ELEMENTS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr',
]);

const NUMERIC_ATTRS = new Set(['tabindex', 'colspan', 'rowspan', 'cols', 'rows', 'size', 'maxlength', 'width', 'height']);

function kebabToCamel(name: string): string {
  return name.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
}

function mapJsxAttrName(name: string): string {
  if (ATTR_MAP[name]) return ATTR_MAP[name];
  if (name.startsWith('data-') || name.startsWith('aria-')) return name;
  if (name.includes('-')) return kebabToCamel(name);
  return name;
}

function styleStringToObjectLiteral(styleValue: string): string {
  const entries = styleValue
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((decl) => {
      const idx = decl.indexOf(':');
      if (idx === -1) return null;
      const prop = decl.slice(0, idx).trim();
      const value = decl.slice(idx + 1).trim();
      const jsProp = prop.startsWith('--') ? prop : kebabToCamel(prop);
      return `${prop.startsWith('--') ? `'${jsProp}'` : jsProp}: '${value.replace(/'/g, "\\'")}'`;
    })
    .filter((s): s is string => s !== null);
  return `{{ ${entries.join(', ')} }}`;
}

function formatAttrValue(name: string, value: string): string {
  if (NUMERIC_ATTRS.has(name.toLowerCase()) && /^-?\d+(\.\d+)?$/.test(value)) {
    return `{${value}}`;
  }
  return `"${value.replace(/"/g, '&quot;')}"`;
}

function escapeJsxText(text: string): string {
  return text.replace(/\{/g, "{'{'}").replace(/\}/g, "{'}'}");
}

function isSelfClosingEmpty(el: Element): boolean {
  return el.childNodes.length === 0;
}

function walkForJsx(el: Element, depth: number, htmlMode: boolean): string {
  const indent = '  '.repeat(depth);
  const tag = el.tagName;
  const attrs: string[] = [];

  for (const attr of Array.from(el.attributes)) {
    const rawName = attr.name;
    if (rawName === 'style') {
      attrs.push(`style={${styleStringToObjectLiteral(attr.value)}}`);
      continue;
    }
    const jsxName = mapJsxAttrName(rawName);
    attrs.push(`${jsxName}=${formatAttrValue(rawName, attr.value)}`);
  }

  const attrStr = attrs.length ? ' ' + attrs.join(' ') : '';
  const isVoid = htmlMode && VOID_ELEMENTS.has(tag.toLowerCase());

  if (isVoid || isSelfClosingEmpty(el)) {
    return `${indent}<${tag}${attrStr} />`;
  }

  const childLines: string[] = [];
  for (const child of Array.from(el.childNodes)) {
    if (child.nodeType === 1) {
      childLines.push(walkForJsx(child as Element, depth + 1, htmlMode));
    } else if (child.nodeType === 3) {
      const text = child.textContent || '';
      if (text.trim()) {
        childLines.push(`${'  '.repeat(depth + 1)}${escapeJsxText(text.trim())}`);
      }
    } else if (child.nodeType === 8) {
      childLines.push(`${'  '.repeat(depth + 1)}{/* ${child.textContent} */}`);
    }
  }

  if (childLines.length === 0) {
    return `${indent}<${tag}${attrStr} />`;
  }

  return `${indent}<${tag}${attrStr}>\n${childLines.join('\n')}\n${indent}</${tag}>`;
}

function parseXmlLike(markup: string, mimeType: 'image/svg+xml' | 'text/html'): Document {
  const parser = new DOMParser();
  const doc = parser.parseFromString(markup, mimeType);
  const parseError = doc.querySelector('parsererror');
  if (parseError) {
    throw new Error(parseError.textContent?.trim() || 'Failed to parse markup.');
  }
  return doc;
}

export function svgToJsx(svgMarkup: string, componentName = 'Icon'): DomTransformResult {
  try {
    if (!svgMarkup.trim()) return { output: '', error: 'Please paste some SVG markup.' };
    const doc = parseXmlLike(svgMarkup, 'image/svg+xml');
    const svgEl = doc.documentElement;
    if (!svgEl || svgEl.tagName.toLowerCase() !== 'svg') {
      return { output: '', error: 'Input does not contain a root <svg> element.' };
    }
    const body = walkForJsx(svgEl, 1, false).replace(/^\s*<svg/, '<svg').trimStart();
    const attrs: string[] = [];
    for (const attr of Array.from(svgEl.attributes)) {
      const jsxName = mapJsxAttrName(attr.name);
      attrs.push(`${jsxName}=${formatAttrValue(attr.name, attr.value)}`);
    }
    const childLines: string[] = [];
    for (const child of Array.from(svgEl.childNodes)) {
      if (child.nodeType === 1) childLines.push(walkForJsx(child as Element, 2, false));
    }
    const inner = childLines.length ? `\n${childLines.join('\n')}\n  ` : '';
    const openTag = `<svg {...props}${attrs.length ? ' ' + attrs.join(' ') : ''}>`;
    const output = `const ${componentName} = (props) => (\n  ${openTag}${inner}</svg>\n);\n\nexport default ${componentName};\n`;
    return { output };
  } catch (e) {
    return { output: '', error: e instanceof Error ? e.message : 'Failed to parse SVG.' };
  }
}

const RN_SVG_TAG_MAP: Record<string, string> = {
  svg: 'Svg',
  path: 'Path',
  circle: 'Circle',
  rect: 'Rect',
  g: 'G',
  line: 'Line',
  polygon: 'Polygon',
  polyline: 'Polyline',
  ellipse: 'Ellipse',
  defs: 'Defs',
  lineargradient: 'LinearGradient',
  radialgradient: 'RadialGradient',
  stop: 'Stop',
  text: 'SvgText',
  tspan: 'TSpan',
  clippath: 'ClipPath',
  mask: 'Mask',
  symbol: 'Symbol',
  use: 'Use',
  image: 'SvgImage',
  filter: 'Filter',
  fecolormatrix: 'FeColorMatrix',
  fegaussianblur: 'FeGaussianBlur',
};

function walkForReactNative(el: Element, depth: number, usedTags: Set<string>): string {
  const indent = '  '.repeat(depth);
  const rnTag = RN_SVG_TAG_MAP[el.tagName.toLowerCase()] || el.tagName;
  usedTags.add(rnTag);

  const attrs: string[] = [];
  for (const attr of Array.from(el.attributes)) {
    const jsxName = mapJsxAttrName(attr.name);
    attrs.push(`${jsxName}=${formatAttrValue(attr.name, attr.value)}`);
  }
  const attrStr = attrs.length ? ' ' + attrs.join(' ') : '';

  const childLines: string[] = [];
  for (const child of Array.from(el.childNodes)) {
    if (child.nodeType === 1) {
      childLines.push(walkForReactNative(child as Element, depth + 1, usedTags));
    }
  }

  if (childLines.length === 0) {
    return `${indent}<${rnTag}${attrStr} />`;
  }
  return `${indent}<${rnTag}${attrStr}>\n${childLines.join('\n')}\n${indent}</${rnTag}>`;
}

export function svgToReactNative(svgMarkup: string, componentName = 'Icon'): DomTransformResult {
  try {
    if (!svgMarkup.trim()) return { output: '', error: 'Please paste some SVG markup.' };
    const doc = parseXmlLike(svgMarkup, 'image/svg+xml');
    const svgEl = doc.documentElement;
    if (!svgEl || svgEl.tagName.toLowerCase() !== 'svg') {
      return { output: '', error: 'Input does not contain a root <svg> element.' };
    }
    const usedTags = new Set<string>();
    const bodyLines = walkForReactNative(svgEl, 1, usedTags).split('\n');
    bodyLines[0] = bodyLines[0].replace(/^\s*<Svg/, '<Svg {...props}');
    const importList = Array.from(usedTags).sort().join(', ');
    const output = `// Requires: npm install react-native-svg\n// import { ${importList} } from 'react-native-svg';\n\nconst ${componentName} = (props) => (\n${bodyLines.join('\n')}\n);\n\nexport default ${componentName};\n`;
    return { output };
  } catch (e) {
    return { output: '', error: e instanceof Error ? e.message : 'Failed to parse SVG.' };
  }
}

export function htmlToJsx(htmlMarkup: string): DomTransformResult {
  try {
    if (!htmlMarkup.trim()) return { output: '', error: 'Please paste some HTML markup.' };
    const doc = parseXmlLike(htmlMarkup, 'text/html');
    const nodes = Array.from(doc.body.childNodes).filter(
      (n) => n.nodeType === 1 || (n.nodeType === 3 && (n.textContent || '').trim())
    );
    if (nodes.length === 0) return { output: '', error: 'No renderable HTML content found.' };

    const lines: string[] = nodes.map((n) => {
      if (n.nodeType === 1) return walkForJsx(n as Element, nodes.length > 1 ? 1 : 0, true);
      return `${'  '.repeat(nodes.length > 1 ? 1 : 0)}${escapeJsxText((n.textContent || '').trim())}`;
    });

    const output = nodes.length > 1
      ? `<>\n${lines.join('\n')}\n</>\n`
      : `${lines[0]}\n`;
    return { output };
  } catch (e) {
    return { output: '', error: e instanceof Error ? e.message : 'Failed to parse HTML.' };
  }
}

function pugAttrString(el: Element): { classes: string; id: string; attrs: string } {
  const classList: string[] = [];
  let id = '';
  const attrParts: string[] = [];

  for (const attr of Array.from(el.attributes)) {
    if (attr.name === 'class') {
      classList.push(...attr.value.split(/\s+/).filter(Boolean));
    } else if (attr.name === 'id') {
      id = attr.value;
    } else {
      attrParts.push(`${attr.name}="${attr.value.replace(/"/g, '\\"')}"`);
    }
  }

  return {
    classes: classList.map((c) => `.${c}`).join(''),
    id: id ? `#${id}` : '',
    attrs: attrParts.length ? `(${attrParts.join(', ')})` : '',
  };
}

function walkForPug(el: Element, depth: number): string {
  const indent = '  '.repeat(depth);
  const tag = el.tagName.toLowerCase();
  const { classes, id, attrs } = pugAttrString(el);
  const header = `${indent}${tag}${id}${classes}${attrs}`;

  if (tag === 'input' || VOID_ELEMENTS.has(tag)) {
    return header;
  }

  const elementChildren = Array.from(el.childNodes).filter((n) => n.nodeType === 1);
  const textChildren = Array.from(el.childNodes).filter((n) => n.nodeType === 3 && (n.textContent || '').trim());
  const commentChildren = Array.from(el.childNodes).filter((n) => n.nodeType === 8);

  if (elementChildren.length === 0 && commentChildren.length === 0 && textChildren.length === 1) {
    const text = (textChildren[0].textContent || '').trim();
    if (text.length <= 60 && !text.includes('\n')) {
      return `${header} ${text}`;
    }
  }

  const childLines: string[] = [];
  for (const child of Array.from(el.childNodes)) {
    if (child.nodeType === 1) {
      childLines.push(walkForPug(child as Element, depth + 1));
    } else if (child.nodeType === 3) {
      const text = (child.textContent || '').trim();
      if (text) childLines.push(`${'  '.repeat(depth + 1)}| ${text}`);
    } else if (child.nodeType === 8) {
      childLines.push(`${'  '.repeat(depth + 1)}// ${child.textContent}`);
    }
  }

  if (childLines.length === 0) return header;
  return `${header}\n${childLines.join('\n')}`;
}

export function htmlToPug(htmlMarkup: string): DomTransformResult {
  try {
    if (!htmlMarkup.trim()) return { output: '', error: 'Please paste some HTML markup.' };
    const doc = parseXmlLike(htmlMarkup, 'text/html');
    const nodes = Array.from(doc.body.childNodes).filter(
      (n) => n.nodeType === 1 || (n.nodeType === 3 && (n.textContent || '').trim()) || n.nodeType === 8
    );
    if (nodes.length === 0) return { output: '', error: 'No renderable HTML content found.' };

    const lines = nodes.map((n) => {
      if (n.nodeType === 1) return walkForPug(n as Element, 0);
      if (n.nodeType === 8) return `// ${n.textContent}`;
      return `| ${(n.textContent || '').trim()}`;
    });

    return { output: lines.join('\n') + '\n' };
  } catch (e) {
    return { output: '', error: e instanceof Error ? e.message : 'Failed to parse HTML.' };
  }
}
