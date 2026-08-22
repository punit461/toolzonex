'use client';

import { useState, useEffect, useRef, Fragment } from 'react';
import {
  Box, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem,
  Paper, FormControlLabel, Checkbox, ToggleButtonGroup, ToggleButton,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RefreshIcon from '@mui/icons-material/Refresh';
import CodeIcon from '@mui/icons-material/Code';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const LOREM_WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation",
  "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo", "consequat", "duis",
  "aute", "irure", "in", "reprehenderit", "voluptate", "velit", "esse", "cillum",
  "fugiat", "nulla", "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non",
  "proident", "sunt", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum"
];

type ParagraphLength = 'short' | 'medium' | 'long';

const LENGTH_CONFIG: Record<ParagraphLength, { sentences: [number, number]; words: [number, number] }> = {
  short: { sentences: [2, 4], words: [4, 8] },
  medium: { sentences: [3, 6], words: [5, 12] },
  long: { sentences: [6, 10], words: [10, 18] },
};

type TextCase = 'regular' | 'lower' | 'upper' | 'title' | 'sentence';

const CASE_OPTIONS: { value: TextCase; label: string }[] = [
  { value: 'regular', label: 'Regular' },
  { value: 'lower', label: 'lowercase' },
  { value: 'upper', label: 'UPPERCASE' },
  { value: 'title', label: 'Title Case' },
  { value: 'sentence', label: 'Sentence case' },
];

interface HtmlOptions {
  links: boolean;
  bold: boolean;
  code: boolean;
  headers: boolean;
  ul: boolean;
  ol: boolean;
  dl: boolean;
  blockquote: boolean;
  pre: boolean;
}

const DEFAULT_HTML_OPTIONS: HtmlOptions = {
  links: false, bold: false, code: false, headers: false, ul: false, ol: false, dl: false, blockquote: false, pre: false,
};

const HTML_OPTION_LABELS: { key: keyof HtmlOptions; label: string }[] = [
  { key: 'links', label: "Links <a>" },
  { key: 'bold', label: "Bold and italic <b> <i>" },
  { key: 'code', label: "Inline code <code>" },
  { key: 'headers', label: "Headers <h2>-<h5>" },
  { key: 'ul', label: "Unordered lists <ul>" },
  { key: 'ol', label: "Ordered lists <ol>" },
  { key: 'dl', label: "Description lists <dl>" },
  { key: 'blockquote', label: "Blockquotes <blockquote>" },
  { key: 'pre', label: "Preformatted <pre>" },
];

const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const MIN_SOURCE_WORDS = 5;

const getWordBank = (source: string): string[] => {
  const words = source.match(/[A-Za-z0-9']+/g) || [];
  return words.length >= MIN_SOURCE_WORDS ? words : LOREM_WORDS;
};

const getRandomWord = (bank: string[]) => bank[Math.floor(Math.random() * bank.length)];

const caseWord = (word: string, textCase: TextCase, sentenceStart: boolean): string => {
  switch (textCase) {
    case 'lower': return word.toLowerCase();
    case 'upper': return word.toUpperCase();
    case 'title': return capitalize(word.toLowerCase());
    case 'sentence': return sentenceStart ? capitalize(word.toLowerCase()) : word.toLowerCase();
    case 'regular':
    default: return sentenceStart ? capitalize(word) : word;
  }
};

const caseWords = (words: string[], textCase: TextCase): string[] =>
  words.map((w, i) => caseWord(w, textCase, i === 0));

const applyCaseToText = (text: string, textCase: TextCase): string => {
  switch (textCase) {
    case 'lower': return text.toLowerCase();
    case 'upper': return text.toUpperCase();
    case 'title': return text.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
    case 'sentence': return text.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g, (c) => c.toUpperCase());
    case 'regular':
    default: return text;
  }
};

const applyInlineFormatting = (words: string[], opts: HtmlOptions): string[] => {
  const tags: Array<'b' | 'i' | 'a' | 'code'> = [];
  if (opts.bold) tags.push('b', 'i');
  if (opts.links) tags.push('a');
  if (opts.code) tags.push('code');
  if (!tags.length) return words;
  return words.map((w) => {
    if (Math.random() < 0.08) {
      const tag = tags[randInt(0, tags.length - 1)];
      return tag === 'a' ? `<a href="#">${w}</a>` : `<${tag}>${w}</${tag}>`;
    }
    return w;
  });
};

const buildSentence = (bank: string[], min: number, max: number, textCase: TextCase, opts?: HtmlOptions) => {
  const n = randInt(min, max);
  let words = caseWords(Array.from({ length: n }, () => getRandomWord(bank)), textCase);
  if (opts) words = applyInlineFormatting(words, opts);
  return words.join(' ') + '.';
};

const buildParagraph = (bank: string[], cfg: { sentences: [number, number]; words: [number, number] }, textCase: TextCase, opts?: HtmlOptions) => {
  const n = randInt(cfg.sentences[0], cfg.sentences[1]);
  return Array.from({ length: n }, () => buildSentence(bank, cfg.words[0], cfg.words[1], textCase, opts)).join(' ');
};

const buildHeader = (bank: string[], textCase: TextCase) => {
  const level = randInt(2, 5);
  const words = caseWords(Array.from({ length: randInt(2, 5) }, () => getRandomWord(bank)), textCase);
  return `<h${level}>${words.join(' ')}</h${level}>`;
};

const buildList = (bank: string[], ordered: boolean, textCase: TextCase) => {
  const tag = ordered ? 'ol' : 'ul';
  const items = Array.from({ length: randInt(3, 5) }, () => {
    const words = caseWords(Array.from({ length: randInt(3, 7) }, () => getRandomWord(bank)), textCase);
    return `  <li>${words.join(' ')}</li>`;
  }).join('\n');
  return `<${tag}>\n${items}\n</${tag}>`;
};

const buildDl = (bank: string[], textCase: TextCase) => {
  const rows = Array.from({ length: randInt(2, 4) }, () => {
    const dt = caseWord(getRandomWord(bank), textCase, true);
    const dd = caseWords(Array.from({ length: randInt(4, 10) }, () => getRandomWord(bank)), textCase).join(' ');
    return `  <dt>${dt}</dt>\n  <dd>${dd}.</dd>`;
  }).join('\n');
  return `<dl>\n${rows}\n</dl>`;
};

const buildBlockquote = (bank: string[], cfg: { sentences: [number, number]; words: [number, number] }, textCase: TextCase) =>
  `<blockquote>\n  <p>${buildParagraph(bank, cfg, textCase)}</p>\n</blockquote>`;

const buildPre = (bank: string[]) => {
  const lines = Array.from({ length: randInt(2, 4) }, () =>
    Array.from({ length: randInt(3, 6) }, () => getRandomWord(bank)).join('-')
  ).join('\n');
  return `<pre>${lines}</pre>`;
};

const buildHtmlOutput = (
  bank: string[],
  count: number,
  cfg: { sentences: [number, number]; words: [number, number] },
  opts: HtmlOptions,
  textCase: TextCase,
  forceLoremStart: boolean
) => {
  const blocks: string[] = [];
  for (let i = 0; i < count; i++) {
    let text = buildParagraph(bank, cfg, textCase, opts);
    if (i === 0 && forceLoremStart) {
      const literal = applyCaseToText('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ', textCase);
      text = literal + text.split(' ').slice(15).join(' ');
    }
    blocks.push(`<p>${text}</p>`);
  }

  // Each enabled element type is guaranteed to appear exactly once; only its position is randomized.
  const extras: string[] = [];
  if (opts.headers) extras.push(buildHeader(bank, textCase));
  if (opts.ul) extras.push(buildList(bank, false, textCase));
  if (opts.ol) extras.push(buildList(bank, true, textCase));
  if (opts.dl) extras.push(buildDl(bank, textCase));
  if (opts.blockquote) extras.push(buildBlockquote(bank, cfg, textCase));
  if (opts.pre) extras.push(buildPre(bank));

  extras.forEach((extra) => {
    const insertAt = randInt(1, blocks.length);
    blocks.splice(insertAt, 0, extra);
  });

  return blocks.join('\n\n');
};

const stripHtml = (html: string) => {
  if (typeof document === 'undefined') return html.replace(/<[^>]+>/g, '');
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.innerText;
};

const LoremIpsumGeneratorContent = () => {
  const [sourceText, setSourceText] = useState('');
  const [count, setCount] = useState(5);
  const [type, setType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
  const [paragraphLength, setParagraphLength] = useState<ParagraphLength>('medium');
  const [textCase, setTextCase] = useState<TextCase>('regular');
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [htmlEnabled, setHtmlEnabled] = useState(false);
  const [htmlOptions, setHtmlOptions] = useState<HtmlOptions>(DEFAULT_HTML_OPTIONS);
  const [result, setResult] = useState('');
  const [htmlResult, setHtmlResult] = useState('');
  const [view, setView] = useState<'preview' | 'source'>('preview');

  const bankPreview = getWordBank(sourceText);
  const usingCustomBank = bankPreview !== LOREM_WORDS;
  const sourceWordCount = (sourceText.match(/[A-Za-z0-9']+/g) || []).length;

  const toggleHtmlOption = (key: keyof HtmlOptions) => {
    setHtmlOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const clearHtmlOptions = () => setHtmlOptions(DEFAULT_HTML_OPTIONS);

  const generateLorem = () => {
    const limit = Math.min(Math.max(count, 1), 100);
    const bank = getWordBank(sourceText);
    const customBank = bank !== LOREM_WORDS;
    const cfg = LENGTH_CONFIG[paragraphLength];

    if (type === 'words') {
      const words = caseWords(Array.from({ length: limit }, () => getRandomWord(bank)), textCase);
      if (startWithLorem && !customBank && limit >= 5) {
        const literal = caseWords(['Lorem', 'ipsum', 'dolor', 'sit', 'amet'], textCase);
        words[0] = literal[0]; words[1] = literal[1]; words[2] = literal[2]; words[3] = literal[3]; words[4] = literal[4];
      }
      setResult(words.join(' '));
      setHtmlResult('');
      return;
    }

    if (type === 'sentences') {
      const sentences = Array.from({ length: limit }, () => buildSentence(bank, cfg.words[0], cfg.words[1], textCase));
      if (startWithLorem && !customBank) {
        sentences[0] = applyCaseToText("Lorem ipsum dolor sit amet, consectetur adipiscing elit.", textCase);
      }
      setResult(sentences.join(' '));
      setHtmlResult('');
      return;
    }

    // paragraphs
    if (htmlEnabled) {
      setHtmlResult(buildHtmlOutput(bank, limit, cfg, htmlOptions, textCase, startWithLorem && !customBank));
      setResult('');
    } else {
      const paragraphs = Array.from({ length: limit }, () => buildParagraph(bank, cfg, textCase));
      if (startWithLorem && !customBank) {
        const literal = applyCaseToText("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ", textCase);
        paragraphs[0] = literal + paragraphs[0].split(' ').slice(19).join(' ');
      }
      setResult(paragraphs.join('\n\n'));
      setHtmlResult('');
    }
  };

  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      generateLorem();
      return;
    }
    const handle = setTimeout(generateLorem, 300);
    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceText, count, type, paragraphLength, textCase, startWithLorem, htmlEnabled, htmlOptions]);

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(htmlResult ? stripHtml(htmlResult) : result);
    } catch (err) {}
  };

  const copyHtml = async () => {
    try {
      await navigator.clipboard.writeText(htmlResult);
    } catch (err) {}
  };

  const quantityLabel = type === 'paragraphs' ? 'Paragraphs' : type === 'sentences' ? 'Sentences' : 'Words';

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box>
        <TextField
          label="Source Text (optional)"
          placeholder="Paste an article, poem, speech, or any text — we'll turn its own words into your unique Lorem Ipsum."
          value={sourceText}
          onChange={(e) => setSourceText(e.target.value)}
          multiline
          minRows={3}
          fullWidth
          sx={{ mb: 1 }}
        />
        <Typography
          variant="caption"
          color={usingCustomBank ? 'success.main' : 'text.secondary'}
          sx={{ display: 'block', mb: 3, fontWeight: usingCustomBank ? 600 : 400 }}
        >
          {usingCustomBank
            ? `Using your text — ${new Set(bankPreview).size} unique words.`
            : sourceWordCount > 0
              ? `Using the classic Lorem Ipsum vocabulary. Add ${MIN_SOURCE_WORDS - sourceWordCount} more word${MIN_SOURCE_WORDS - sourceWordCount === 1 ? '' : 's'} above to switch to your own text.`
              : 'Using the classic Lorem Ipsum vocabulary. Paste at least 5 words above to generate from your own text instead.'}
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            label={quantityLabel}
            type="number"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value) || 1)}
            fullWidth
            InputProps={{ inputProps: { min: 1, max: 100 } }}
          />
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              value={type}
              label="Type"
              onChange={(e) => setType(e.target.value as 'paragraphs' | 'sentences' | 'words')}
            >
              <MenuItem value="paragraphs">Paragraphs</MenuItem>
              <MenuItem value="sentences">Sentences</MenuItem>
              <MenuItem value="words">Words</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          {type !== 'words' && (
            <FormControl fullWidth>
              <InputLabel>Length</InputLabel>
              <Select
                value={paragraphLength}
                label="Length"
                onChange={(e) => setParagraphLength(e.target.value as ParagraphLength)}
              >
                <MenuItem value="short">Short</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="long">Long</MenuItem>
              </Select>
            </FormControl>
          )}
          <FormControl fullWidth>
            <InputLabel>Case</InputLabel>
            <Select
              value={textCase}
              label="Case"
              onChange={(e) => setTextCase(e.target.value as TextCase)}
            >
              {CASE_OPTIONS.map(({ value, label }) => (
                <MenuItem key={value} value={value}>{label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ mb: 1 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={startWithLorem && !usingCustomBank}
                disabled={usingCustomBank}
                onChange={(e) => setStartWithLorem(e.target.checked)}
              />
            }
            label="Start with 'Lorem ipsum dolor sit amet...'"
          />
          {usingCustomBank && (
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', ml: 4, mt: -0.5 }}>
              Not available while generating from your own source text.
            </Typography>
          )}
        </Box>

        {type === 'paragraphs' && (
          <Box sx={{ mb: 3 }}>
            <FormControlLabel
              control={<Checkbox checked={htmlEnabled} onChange={(e) => setHtmlEnabled(e.target.checked)} />}
              label="Add HTML elements to output"
            />
            {htmlEnabled && (
              <Box sx={{ pl: 4 }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 0 }}>
                  {HTML_OPTION_LABELS.map(({ key, label }) => (
                    <FormControlLabel
                      key={key}
                      control={<Checkbox size="small" checked={htmlOptions[key]} onChange={() => toggleHtmlOption(key)} />}
                      label={label}
                    />
                  ))}
                </Box>
                <Button size="small" onClick={clearHtmlOptions} sx={{ mt: 0.5 }}>
                  Turn off HTML elements
                </Button>
              </Box>
            )}
          </Box>
        )}

        <Button variant="contained" onClick={generateLorem} fullWidth size="large" startIcon={<RefreshIcon />}>
          Shuffle Text
        </Button>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
          The text updates automatically as you change any option above — use Shuffle to get a new random draw with the same settings.
        </Typography>
      </Box>

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1, mb: 1 }}>
          <Typography variant="subtitle1" fontWeight="600">Generated Text:</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {htmlResult && (
              <ToggleButtonGroup size="small" exclusive value={view} onChange={(_, v) => v && setView(v)}>
                <ToggleButton value="preview">Preview</ToggleButton>
                <ToggleButton value="source"><CodeIcon fontSize="small" sx={{ mr: 0.5 }} />HTML</ToggleButton>
              </ToggleButtonGroup>
            )}
            <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyText}>
              Copy Text
            </Button>
            {htmlResult && (
              <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyHtml}>
                Copy HTML
              </Button>
            )}
          </Box>
        </Box>

        <Paper sx={{ p: 2, bgcolor: 'background.default', border: '1px solid', borderColor: 'divider', minHeight: 300, maxHeight: 600, overflow: 'auto' }}>
          {htmlResult ? (
            view === 'source' ? (
              <Box component="pre" sx={{ m: 0, whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '0.85rem', color: 'text.secondary' }}>
                {htmlResult}
              </Box>
            ) : (
              <Box
                sx={{
                  color: 'text.secondary',
                  fontFamily: 'serif',
                  fontSize: '1.1rem',
                  lineHeight: 1.6,
                  '& p': { m: 0, mb: 2 },
                  '& h2, & h3, & h4, & h5': { fontFamily: 'inherit', fontWeight: 700, color: 'text.primary', mt: 2, mb: 1 },
                  '& ul, & ol': { pl: 3, mb: 2 },
                  '& dl': { mb: 2 },
                  '& dt': { fontWeight: 700, color: 'text.primary' },
                  '& dd': { ml: 0, mb: 1 },
                  '& blockquote': { m: 0, mb: 2, pl: 2, borderLeft: '3px solid', borderColor: 'divider', fontStyle: 'italic' },
                  '& pre': { bgcolor: 'action.hover', p: 1.5, borderRadius: 1, overflow: 'auto', fontSize: '0.85rem', mb: 2, fontFamily: 'monospace' },
                  '& code': { fontFamily: 'monospace', bgcolor: 'action.hover', px: 0.5, borderRadius: 0.5 },
                  '& a': { color: 'primary.main' },
                }}
                dangerouslySetInnerHTML={{ __html: htmlResult }}
              />
            )
          ) : (
            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', color: 'text.secondary', fontFamily: 'serif', fontSize: '1.1rem', lineHeight: 1.6 }}>
              {result}
            </Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

const faqs = [
  {
    question: 'Why use Lorem Ipsum instead of real text?',
    answer: 'Its neutral, non-meaningful content keeps viewers focused on layout and typography rather than reading the actual words.',
  },
  {
    question: 'Can I generate Lorem Ipsum from my own text?',
    answer: 'Yes. Paste any text of at least a few sentences into the Source Text field and the generator will build new sentences from that text\'s own vocabulary instead of the classic Latin word list — useful for placeholder copy that roughly matches your brand\'s tone or a specific language.',
  },
  {
    question: 'Can I add HTML tags like headings and lists to the output?',
    answer: 'Yes. With paragraph output selected, enable "Add HTML elements" and choose which tags to include — links, bold/italic text, inline code, headers, ordered and unordered lists, description lists, blockquotes, and preformatted blocks. You can preview the rendered result or copy the raw HTML source.',
  },
  {
    question: 'Can I change the text case of the output?',
    answer: 'Yes. The Case dropdown switches the generated text between Regular, lowercase, UPPERCASE, Title Case, and Sentence case — useful for matching a specific style guide or testing how a layout handles different capitalization.',
  },
];

const LoremIpsumGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">What is Lorem Ipsum?</Typography>
      <Typography variant="body1">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has been the industry&apos;s standard dummy text ever since the 1500s. It is used to demonstrate the visual form of a document or a typeface without relying on meaningful content.
      </Typography>
      <Typography variant="body1">
        This generator goes beyond the classic Latin filler: paste your own source text — an article, a speech, a poem, your own product copy — and it will build a fresh, meaningless-but-readable text out of your own words. You can also enrich the output with real HTML markup like headings, links, lists, and blockquotes, so it drops straight into a mockup that already needs structure, not just words.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Generating 2 paragraphs produces roughly 60-100 words of placeholder text, ready to paste
        into a design mockup. Turn on HTML elements and the same output arrives as ready-to-use markup — headings,
        an unordered list, a blockquote — so you can preview exactly how a real content block will render.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Filling design mockups or wireframes with realistic-looking placeholder text.</li>
          <li>Testing how a layout handles varying amounts of text.</li>
          <li>Generating placeholder HTML (headings, lists, links, blockquotes) to test a CMS template or rich-text renderer.</li>
          <li>Producing on-brand filler by seeding the generator with your own product copy or brand voice text.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      {faqs.map((f) => (
        <Fragment key={f.question}>
          <Typography variant="h3">{f.question}</Typography>
          <Typography variant="body1">{f.answer}</Typography>
        </Fragment>
      ))}
    </>
  );

  return (
    <CalculatorShell
      title="Lorem Ipsum Generator"
      description="Generate standard dummy text for UI testing, mockups, and wireframes. Free online Lorem Ipsum placeholder text generator with custom source text and HTML output."
      url="/generators/lorem-ipsum-generator"
      content={content}
      category="Generators"
      faqs={faqs}
    >
      <LoremIpsumGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default LoremIpsumGenerator;
