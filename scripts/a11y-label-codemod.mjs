// Gives unlabelled form controls and icon-only buttons an accessible name.
//
// Most tools follow the same shape -- a caption, then the controls it
// describes:
//
//   <Typography gutterBottom>Loan Tenure (Years)</Typography>
//   <TextField ... />          <- no label: screen readers say "edit text"
//   <Slider ... />             <- no label: screen readers say "slider"
//
// This finds each TextField / Select / Slider without an accessible name,
// takes the visible caption text as its name, and inserts an aria-label (so
// the spoken name matches what sighted users read -- WCAG 2.5.3). Icon-only
// IconButtons get a name from their icon (DeleteIcon -> "Remove"). Edits are
// inserted at exact source offsets, so nothing else in the file is reformatted.
//
// Usage:
//   node scripts/a11y-label-codemod.mjs            # report proposed labels
//   node scripts/a11y-label-codemod.mjs --apply    # write them
//   node scripts/a11y-label-codemod.mjs --check    # exit 1 if anything is unlabelled
//
// Review the report before --apply: the caption heuristic is right for the
// common shape above, but a control can sit next to a caption that belongs to
// something else (a currency <Select> beside a "Loan Amount" caption), so
// value-derived names like "Currency" win over captions for Selects.
import fs from 'node:fs';
import path from 'node:path';
import { parse } from '@babel/parser';
import traverseMod from '@babel/traverse';

const traverse = traverseMod.default || traverseMod;
const ROOT = path.resolve(process.cwd(), 'src');
const APPLY = process.argv.includes('--apply');
const CHECK = process.argv.includes('--check');

const CONTROLS = new Set(['TextField', 'Select', 'Slider']);
const LABEL_TAGS = new Set(['Typography', 'FormLabel', 'InputLabel', 'label']);

const ICON_LABELS = {
  DeleteIcon: 'Remove', DeleteOutlineIcon: 'Remove', ClearIcon: 'Clear', CloseIcon: 'Close',
  ContentCopyIcon: 'Copy', ArrowUpwardIcon: 'Move up', ArrowDownwardIcon: 'Move down',
  ArrowBackIosNewIcon: 'Previous', ArrowBackIosIcon: 'Previous', ArrowForwardIosIcon: 'Next',
  DownloadIcon: 'Download', RotateLeftIcon: 'Rotate left', RotateRightIcon: 'Rotate right',
  FlipIcon: 'Flip', OpenInNewIcon: 'Open in new tab', RestartAltIcon: 'Reset',
  AddIcon: 'Add', EditIcon: 'Edit', PlayArrowIcon: 'Play', PauseIcon: 'Pause', StopIcon: 'Stop',
};

function listFiles(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...listFiles(p));
    else if (p.endsWith('.tsx') && !p.includes('.test.')) out.push(p);
  }
  return out;
}

const attr = (el, name) => el.openingElement.attributes.find((a) => a.type === 'JSXAttribute' && a.name.name === name);
const tagName = (el) => (el.openingElement.name.type === 'JSXIdentifier' ? el.openingElement.name.name : null);

/** Static text of a JSX subtree, stopping at the first dynamic expression. */
function staticText(node) {
  let text = '';
  let stopped = false;
  const visit = (n) => {
    if (stopped) return;
    if (n.type === 'JSXText') text += n.value;
    else if (n.type === 'JSXExpressionContainer') {
      const e = n.expression;
      if (e.type === 'StringLiteral') text += e.value;
      else if (e.type === 'TemplateLiteral' && e.expressions.length === 0) text += e.quasis[0].value.cooked;
      else if (e.type === 'JSXEmptyExpression') { /* comment */ }
      else stopped = true;
    } else if (n.type === 'JSXElement' || n.type === 'JSXFragment') {
      if (n.type === 'JSXElement' && ['br'].includes(tagName(n))) text += ' ';
      n.children.forEach(visit);
    }
  };
  node.children.forEach(visit);
  return text.replace(/\s+/g, ' ').trim().replace(/[:：]\s*$/, '').trim()
    .replace(/\s+(in|of|to|for|at|per|the|a|an)$/i, '').trim();
}

/** True when the element (or its attributes) already provide an accessible name. */
function hasName(el, src) {
  const isSelect = tagName(el) === 'Select';
  for (const a of el.openingElement.attributes) {
    if (a.type !== 'JSXAttribute') return true; // spread props: can't tell -- leave alone
    const n = a.name.name;
    // <Select label="..."> only sizes the outline's notch; without labelId the
    // visible <InputLabel> isn't attached, so the combobox has no name.
    if (n === 'label' && isSelect) continue;
    if (['label', 'aria-label', 'aria-labelledby', 'labelId', 'title'].includes(n)) return true;
    if (['inputProps', 'slotProps', 'SelectProps'].includes(n) && /aria-label|aria-labelledby/.test(src.slice(a.start, a.end))) return true;
    if (n === 'getAriaLabel') return true;
  }
  return false;
}

/**
 * Looks for a caption among the earlier siblings of the control, where the
 * "sibling position" is the child of the nearest JSX element that contains the
 * control -- so a control inside {cond ? <TextField/> : ...} or {rows.map(...)}
 * still sees the caption placed just before that block. Climbs one extra level
 * (caption above a grid of fields) before giving up.
 */
function captionSearch(elPath, src) {
  let cur = elPath;
  for (let level = 0; level < 2; level++) {
    const anc = cur.findParent((p) => p.isJSXElement());
    if (!anc) return null;
    const kids = anc.node.children;
    const idx = kids.findIndex((c) => c.start <= cur.node.start && c.end >= cur.node.end);
    let skipped = 0;
    for (let k = idx - 1; k >= 0; k--) {
      const sib = kids[k];
      if (sib.type === 'JSXText' || sib.type === 'JSXExpressionContainer') continue;
      if (sib.type !== 'JSXElement') break;
      const cap = captionFrom(sib, src);
      if (cap) return { ...cap, how: level ? 'caption(parent)' : skipped ? 'caption(shared)' : 'caption' };
      if (LABEL_TAGS.has(tagName(sib))) return null; // a caption we can't use ("#1", "?"): don't borrow a farther one
      if (CONTROLS.has(tagName(sib)) || ['Box', 'Stack'].includes(tagName(sib))) {
        if (++skipped > 2) break;
        continue;
      }
      break;
    }
    cur = anc;
  }
  return null;
}

// Inline sentence fragments ("What is [x] % of [y]") and symbols aren't names.
const NOT_A_CAPTION = /^(?:[^A-Za-z0-9]*|of|is|and|or|by|x|vs\.?|% of|is what % of|what is)$/i;

/**
 * Mixed text + simple expressions ("{regionConfig.taxLabel} (%)", "Weight in {unit}")
 * become a template literal, so the spoken name matches what's displayed.
 * Returns undefined when the caption has no dynamic part (use staticText).
 */
function templateCaption(kids, src) {
  const parts = [];
  let words = '';
  let dynamic = false;
  for (const k of kids) {
    if (k.type === 'JSXText') { parts.push(k.value.replace(/\s+/g, ' ').replace(/[`$\\]/g, '\\$&')); words += k.value; continue; }
    if (k.type !== 'JSXExpressionContainer') return undefined;
    const e = k.expression;
    if (e.type === 'StringLiteral') { parts.push(e.value.replace(/[`$\\]/g, '\\$&')); words += e.value; continue; }
    if (e.type === 'Identifier' || e.type === 'MemberExpression') { parts.push('${' + src.slice(e.start, e.end) + '}'); dynamic = true; continue; }
    return undefined;
  }
  if (!dynamic) return undefined;
  if (!/[A-Za-z]{2,}/.test(words)) {
    // "{s.label}: {value}{unit}" -- the leading expression is the name.
    const first = kids[0];
    if (first.type === 'JSXExpressionContainer' && ['Identifier', 'MemberExpression'].includes(first.expression.type)) {
      return { expr: src.slice(first.expression.start, first.expression.end) };
    }
    return null;
  }
  const body = parts.join('').trim().replace(/[:：]\s*$/, '').trim();
  return { expr: '`' + body + '`' };
}

/** A caption's text as { text } or, for a single dynamic child like {r.category}, as { expr }. */
function captionFrom(el, src) {
  const t = tagName(el);
  if (LABEL_TAGS.has(t)) {
    const variant = attr(el, 'variant');
    const v = variant?.value?.value;
    if (v && /^h[1-4]$/.test(v)) return null; // section headings aren't field captions
    const kids = el.children.filter((c) => !(c.type === 'JSXText' && !c.value.trim()));
    if (kids.length === 1 && kids[0].type === 'JSXExpressionContainer' &&
        ['Identifier', 'MemberExpression'].includes(kids[0].expression.type)) {
      return { expr: src.slice(kids[0].expression.start, kids[0].expression.end) };
    }
    // {mode === 'encode' ? 'Plain Text Input:' : 'Base64 Input:'}
    const only = kids.length === 1 && kids[0].type === 'JSXExpressionContainer' ? kids[0].expression : null;
    if (only?.type === 'ConditionalExpression' && only.consequent.type === 'StringLiteral' && only.alternate.type === 'StringLiteral') {
      const clean = (v) => jsString(v.replace(/[:：]\s*$/, '').trim());
      return { expr: `${src.slice(only.test.start, only.test.end)} ? ${clean(only.consequent.value)} : ${clean(only.alternate.value)}` };
    }
    const tpl = templateCaption(kids, src);
    if (tpl !== undefined) return tpl; // null = has a dynamic part but no words: not a caption
    const text = staticText(el);
    if (!text || text.length > 80 || NOT_A_CAPTION.test(text)) return null;
    return { text };
  }
  // A row that starts with the caption (e.g. caption + unit/currency picker).
  if (['Box', 'Stack', 'div'].includes(t)) {
    const first = el.children.find((c) => c.type === 'JSXElement');
    if (first && LABEL_TAGS.has(tagName(first))) return captionFrom(first, src);
  }
  return null;
}

const WORDS = {
  pct: 'percentage', bg: 'background', fg: 'foreground', expr: 'expression', val: 'value', num: 'number',
  qty: 'quantity', amt: 'amount', cm: '(cm)', ft: '(feet)', kg: '(kg)', lb: '(lb)', lbs: '(lb)',
  rgb: 'RGB', rgba: 'RGBA', html: 'HTML', json: 'JSON', xml: 'XML', rsvp: 'RSVP', url: 'URL', ltv: 'LTV',
};
const DROP = new Set(['input', 'selected', 'displayed', 'current']);
function humanize(id) {
  const tokens = id.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/[_-]+/g, ' ').trim().toLowerCase().split(/\s+/);
  const out = tokens.filter((t) => !DROP.has(t)).map((t, i, arr) => (t === 'in' && i === arr.length - 1 ? '(inches)' : WORDS[t] ?? t));
  const words = out.join(' ');
  return words ? words.charAt(0).toUpperCase() + words.slice(1) : '';
}

function valueIdentifier(el) {
  const v = attr(el, 'value');
  if (!v || v.value?.type !== 'JSXExpressionContainer') return null;
  let e = v.value.expression;
  if (e.type === 'ConditionalExpression') e = e.alternate; // Number.isNaN(x) ? '' : x
  if (e.type === 'Identifier') return e.name;
  if (e.type === 'MemberExpression' && e.property.type === 'Identifier') return e.property.name;
  return null;
}

function proposeControlLabel(elPath, src, rel) {
  const el = elPath.node;
  const t = tagName(el);
  const override = OVERRIDES[`${rel}:${el.loc.start.line}`];
  if (override) return { ...override, how: 'override' };
  const valueId = valueIdentifier(el);
  if (t === 'Select') {
    // The label prop duplicates the visible InputLabel text: reuse it.
    const lp = attr(el, 'label');
    if (lp?.value?.type === 'StringLiteral' && lp.value.value.trim()) return { label: lp.value.value.trim(), how: 'label-prop' };
    if (lp?.value?.type === 'JSXExpressionContainer') return { expr: src.slice(lp.value.expression.start, lp.value.expression.end), how: 'label-prop' };
  }
  if (t === 'Select' || (t === 'TextField' && attr(el, 'select'))) {
    if (valueId && /currency/i.test(valueId)) return { label: 'Currency', how: 'value' };
    // Inside a FormControl with an InputLabel: use that text.
    const fc = elPath.findParent((p) => p.isJSXElement() && tagName(p.node) === 'FormControl');
    if (fc) {
      const il = fc.node.children.find((c) => c.type === 'JSXElement' && tagName(c) === 'InputLabel');
      if (il) { const text = staticText(il); if (text) return { label: text, how: 'InputLabel' }; }
    }
  }
  const cap = captionSearch(elPath, src);
  // A bare {variable} above a field that has its own placeholder is usually prose
  // (a page intro above a search box), not the field's caption.
  if (cap?.expr && /^[\w.]+$/.test(cap.expr) && attr(el, 'placeholder')) return { label: null, how: 'placeholder-only' };
  if (cap) {
    if (cap.expr) return { expr: cap.expr, how: cap.how };
    const isUnitPicker = (t === 'Select' || attr(el, 'select')) && valueId && /unit$/i.test(valueId) && !/\bunit\b/i.test(cap.text);
    if (isUnitPicker) return { label: `${cap.text} unit`, how: cap.how };
    if (/^(from|to)$/i.test(cap.text)) return { label: `${cap.text} value`, how: cap.how };
    return { label: cap.text, how: cap.how };
  }
  const ph = attr(el, 'placeholder');
  if (ph?.value?.type === 'StringLiteral' && ph.value.value.trim()) return { label: null, how: 'placeholder-only' };
  const name = valueId && !/^(value|val|v|input|text)$/i.test(valueId) ? humanize(valueId) : '';
  if (name) return { label: name, how: 'value' };
  return { label: null, how: 'none' };
}

/**
 * Hand-checked names for controls the heuristics can't name well: inline
 * sentence layouts, grid cells and list rows. Keyed by path:line of the
 * control's opening tag in the pre-codemod source.
 */
const OVERRIDES = {
  'src/calculators/utilities/PercentageCalculator.tsx:84': { label: 'Percentage (X)' },
  'src/calculators/utilities/PercentageCalculator.tsx:94': { label: 'Of value (Y)' },
  'src/calculators/utilities/PercentageCalculator.tsx:115': { label: 'Value (X)' },
  'src/calculators/utilities/PercentageCalculator.tsx:125': { label: 'Total (Y)' },
  'src/calculators/utilities/PercentageCalculator.tsx:146': { label: 'From value' },
  'src/calculators/utilities/PercentageCalculator.tsx:156': { label: 'To value' },
  'src/calculators/finance/MatrixCalculator.tsx:219': { expr: '`Matrix A, row ${i + 1}, column ${j + 1}`' },
  'src/calculators/finance/MatrixCalculator.tsx:246': { expr: '`Matrix B, row ${i + 1}, column ${j + 1}`' },
  'src/calculators/screens/TipScreen.tsx:152': { expr: '`Tip percentage ${i + 1}`' },
  'src/calculators/finance/CostPerLeadCalculator.tsx:154': { label: 'Channel name' },
  'src/calculators/generators/MeetingNotesTemplateGenerator.tsx:88': { expr: '`Agenda item ${idx + 1}`' },
  'src/calculators/generators/DutyRosterShiftScheduleGenerator.tsx:109': { label: 'Assigned staff' },
  'src/calculators/developer-tools/ColorContrastChecker.tsx:81': { label: 'Foreground color' },
  'src/calculators/developer-tools/ColorContrastChecker.tsx:107': { label: 'Background color' },
  'src/calculators/developer-tools/CronExpressionGenerator.tsx:165': { label: 'Cron expression' },
  'src/calculators/converters/HexToRgbConverter.tsx:75': { label: 'RGB value' },
  'src/calculators/converters/HexToRgbConverter.tsx:85': { label: 'RGBA value' },
  'src/calculators/converters/RgbToHexConverter.tsx:84': { label: 'Hex value' },
  'src/calculators/pdf/PdfToHtml.tsx:114': { label: 'HTML output' },
  'src/calculators/pdf/PdfToLlamaIndexJson.tsx:76': { label: 'JSON output' },
  'src/calculators/pdf/PdfToXml.tsx:74': { label: 'XML output' },
  'src/calculators/generators/TypingSpeedTest.tsx:139': { label: 'Typing area' },
  'src/calculators/health/CalorieDeficitCalculator.tsx:133': { label: 'Calorie deficit' },
  'src/calculators/health/WeightGainCalculator.tsx:132': { label: 'Calorie surplus' },
  'src/calculators/finance/BitcoinMiningCalculator.tsx:65': { label: 'Hash rate unit' },
  'src/calculators/finance/VATCalculator.tsx:222': { label: 'Custom VAT rate (%)' },
  'src/calculators/health/ChildHeightPredictorCalculator.tsx:132': { label: 'Mother’s height (cm)' },
  'src/calculators/health/ChildHeightPredictorCalculator.tsx:142': { label: 'Mother’s height (feet)' },
  'src/calculators/health/ChildHeightPredictorCalculator.tsx:143': { label: 'Mother’s height (inches)' },
  'src/calculators/health/ChildHeightPredictorCalculator.tsx:151': { label: 'Father’s height (cm)' },
  'src/calculators/health/ChildHeightPredictorCalculator.tsx:161': { label: 'Father’s height (feet)' },
  'src/calculators/health/ChildHeightPredictorCalculator.tsx:162': { label: 'Father’s height (inches)' },
  'src/components/CategoryDashboard.tsx:63': { label: 'Search tools' },
  'src/app/page.tsx:87': { label: 'Search tools' },
  'src/calculators/finance/CostPerLeadCalculator.tsx:162': { label: 'Spend' },
  'src/calculators/finance/CostPerLeadCalculator.tsx:172': { label: 'Leads' },
  'src/calculators/generators/DailyPlannerGenerator.tsx:122': { expr: '`Plan for ${formatHour(h)}`' },
  'src/calculators/pdf/OcrPdf.tsx:128': { label: 'Extracted text' },
  'src/calculators/converters/HexToHsvConverter.tsx:70': { label: 'HSV value' },
  'src/calculators/pdf/PdfToText.tsx:85': { label: 'Extracted text' },
  // Icon-only buttons whose icon alone doesn't say what they do.
  'src/calculators/tools/OnlineImageEditor.tsx:237': { label: 'Reset filters' },
  'src/calculators/utilities/AlphabetLearningTool.tsx:114': { label: 'Play sound' },
  'src/calculators/utilities/WaterDrinkingTracker.tsx:70': { label: 'Remove a glass' },
};

function proposeIconLabel(elPath) {
  const kids = elPath.node.children.filter((c) => c.type === 'JSXElement');
  if (kids.length !== 1) return null;
  const name = tagName(kids[0]);
  return ICON_LABELS[name] ? { label: ICON_LABELS[name], how: name } : null;
}

const jsxString = (s) => (/["{}<>&\\]/.test(s) ? `{${JSON.stringify(s)}}` : `"${s}"`);
const jsString = (s) => `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;

/** Returns [offset, text] insertions that give `el` the aria-label in `name` ({ label } or { expr }). */
function edits(el, name) {
  const t = tagName(el);
  const afterName = el.openingElement.name.end;
  const jsxVal = name.expr ? `{${name.expr}}` : jsxString(name.label);
  const jsVal = name.expr ? name.expr : jsString(name.label);
  if (t === 'Slider' || t === 'IconButton') return [[afterName, ` aria-label=${jsxVal}`]];
  if (t === 'Select') {
    const ip = attr(el, 'inputProps');
    if (ip) {
      const obj = ip.value?.expression;
      if (obj?.type !== 'ObjectExpression') return null;
      return [[obj.start + 1, ` 'aria-label': ${jsVal},`]];
    }
    return [[afterName, ` inputProps={{ 'aria-label': ${jsVal} }}`]];
  }
  if (t === 'TextField') {
    const sp = attr(el, 'slotProps');
    if (sp) {
      const obj = sp.value?.expression;
      if (obj?.type !== 'ObjectExpression') return null;
      // slotProps.input.inputProps overrides the htmlInput slot, so a label put
      // in htmlInput would be silently dropped: add it where it will survive.
      const inp = obj.properties.find((p) => p.type === 'ObjectProperty' && p.key.name === 'input');
      const nested = inp?.value.type === 'ObjectExpression'
        && inp.value.properties.find((p) => p.type === 'ObjectProperty' && p.key.name === 'inputProps');
      if (nested) {
        if (nested.value.type !== 'ObjectExpression') return null;
        return [[nested.value.start + 1, ` 'aria-label': ${jsVal},`]];
      }
      const hi = obj.properties.find((p) => p.type === 'ObjectProperty' && (p.key.name === 'htmlInput' || p.key.value === 'htmlInput'));
      if (hi) {
        if (hi.value.type !== 'ObjectExpression') return null;
        return [[hi.value.start + 1, ` 'aria-label': ${jsVal},`]];
      }
      return [[obj.start + 1, ` htmlInput: { 'aria-label': ${jsVal} },`]];
    }
    const ip = attr(el, 'inputProps');
    if (ip) {
      const obj = ip.value?.expression;
      if (obj?.type !== 'ObjectExpression') return null;
      return [[obj.start + 1, ` 'aria-label': ${jsVal},`]];
    }
    return [[afterName, ` slotProps={{ htmlInput: { 'aria-label': ${jsVal} } }}`]];
  }
  return null;
}

const report = [];
let changedFiles = 0;
let applied = 0;
let unresolved = 0;

for (const file of listFiles(ROOT)) {
  const src = fs.readFileSync(file, 'utf8');
  if (!/TextField|Select|Slider|IconButton|Progress/.test(src)) continue;
  let ast;
  try {
    ast = parse(src, { sourceType: 'module', plugins: ['typescript', 'jsx'] });
  } catch (e) {
    console.error(`parse error ${file}: ${e.message}`);
    continue;
  }
  const ins = [];
  traverse(ast, {
    JSXElement(p) {
      const el = p.node;
      const t = tagName(el);
      const rel = path.relative(process.cwd(), file);
      const line = el.loc.start.line;
      if (t === 'IconButton') {
        if (hasName(el, src)) return;
        const inTooltip = p.findParent((pp) => pp.isJSXElement() && tagName(pp.node) === 'Tooltip');
        if (inTooltip) return; // MUI Tooltip names its child from `title`
        const ov = OVERRIDES[`${rel}:${line}`];
        const prop = ov ? { ...ov, how: 'override' } : proposeIconLabel(p);
        if (!prop) { unresolved++; report.push(`UNRESOLVED ${rel}:${line} IconButton`); return; }
        report.push(`${rel}:${line} IconButton -> "${prop.label}" [${prop.how}]`);
        ins.push(...edits(el, prop));
        return;
      }
      if (t === 'LinearProgress' || t === 'CircularProgress') {
        if (hasName(el, src)) return;
        const determinate = attr(el, 'variant')?.value?.value === 'determinate';
        const label = determinate ? 'Progress' : 'Loading';
        report.push(`${rel}:${line} ${t} -> "${label}" [progress]`);
        ins.push([el.openingElement.name.end, ` aria-label="${label}"`]);
        return;
      }
      if (!CONTROLS.has(t) || hasName(el, src)) return;
      const prop = proposeControlLabel(p, src, rel);
      if (!prop.label && !prop.expr) {
        if (prop.how !== 'placeholder-only') { unresolved++; report.push(`UNRESOLVED ${rel}:${line} ${t} [${prop.how}]`); }
        return;
      }
      const e = edits(el, prop);
      if (!e) { unresolved++; report.push(`UNRESOLVED ${rel}:${line} ${t} [non-literal props]`); return; }
      report.push(`${rel}:${line} ${t} -> ${prop.expr ? `{${prop.expr}}` : `"${prop.label}"`} [${prop.how}]`);
      ins.push(...e);
    },
  });
  if (ins.length && APPLY) {
    let out = src;
    for (const [off, text] of ins.sort((a, b) => b[0] - a[0])) out = out.slice(0, off) + text + out.slice(off);
    fs.writeFileSync(file, out);
    changedFiles++;
    applied += ins.length;
  }
}

console.log(report.join('\n'));
console.log(`\n${APPLY ? `applied ${applied} labels in ${changedFiles} files` : 'dry run'}; unresolved: ${unresolved}`);
if (CHECK && (report.some((r) => !r.startsWith('UNRESOLVED')) || unresolved)) process.exit(1);
