'use client';

import { useMemo, useState } from 'react';
import { Box, Button, Typography, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Mode = 'markdown' | 'curly' | 'attribution';

function formatQuote(text: string, mode: Mode, author: string): string {
  if (!text) return '';
  switch (mode) {
    case 'markdown':
      return text
        .split('\n')
        .map((line) => `> ${line}`)
        .join('\n');
    case 'curly':
      return `“${text}”`;
    case 'attribution': {
      const trimmed = text.trim().replace(/[."]+$/, '');
      const who = author.trim() || 'Unknown';
      return `"${trimmed}." — ${who}`;
    }
    default:
      return text;
  }
}

const MODES: { value: Mode; label: string }[] = [
  { value: 'markdown', label: 'Markdown Blockquote' },
  { value: 'curly', label: 'Smart / Curly Quotes' },
  { value: 'attribution', label: 'Attribution Format' },
];

const QuoteFormatterContent = () => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<Mode>('markdown');
  const [author, setAuthor] = useState('');
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => formatQuote(input, mode, author), [input, mode, author]);

  const copyResult = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TextField
        label="Text to Quote"
        placeholder="Type or paste your text here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        multiline
        rows={5}
        fullWidth
      />

      <Box>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>Formatting mode:</Typography>
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={(_, v) => v && setMode(v)}
          sx={{ flexWrap: 'wrap', gap: 1, '& .MuiToggleButtonGroup-grouped': { border: '1px solid', borderColor: 'divider !important', borderRadius: '4px !important' } }}
        >
          {MODES.map((m) => (
            <ToggleButton key={m.value} value={m.value} size="small">{m.label}</ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      {mode === 'attribution' && (
        <TextField
          label="Author Name"
          placeholder="e.g. Maya Angelou"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          fullWidth
        />
      )}

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" fontWeight="600">Result:</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyResult} disabled={!output}>
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </Box>
        <TextField
          value={output}
          multiline
          rows={5}
          fullWidth
          InputProps={{ readOnly: true }}
          placeholder="Formatted quote will appear here..."
        />
      </Box>
    </Box>
  );
};

const QuoteFormatter = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Quote Formatter</Typography>
      <Typography variant="body1">
        Type or paste the text you want to quote, then choose a formatting mode. Markdown Blockquote prefixes
        every line with <code>&gt; </code> for use in Markdown files, chat apps, and forums that support it. Smart
        / Curly Quotes wraps the whole text in proper curly quotation marks. Attribution Format wraps the text in
        straight quotes and appends an attribution line in the classic <code>&quot;Quote text.&quot; — Author
        Name</code> style.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Entering <code>The only way to do great work is to love what you do</code> with Attribution Format and an
        author of <code>Steve Jobs</code> produces: <code>&quot;The only way to do great work is to love what you
        do.&quot; — Steve Jobs</code>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Formatting a quoted reply as a Markdown blockquote in a GitHub issue, README, or forum post.</li>
          <li>Converting straight quotation marks into proper curly quotes for a polished document.</li>
          <li>Adding a clean attribution line under a quote for a slide, social media graphic, or blog post.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does Markdown Blockquote work on multi-line text?</strong> Yes — every line, including blank lines, gets its own <code>&gt; </code> prefix, which is the standard way to blockquote a multi-line passage in Markdown.</li>
          <li><strong>What if I leave the author name blank in Attribution Format?</strong> The output falls back to &quot;Unknown&quot; as the attribution so the format stays consistent even without a specified author.</li>
          <li><strong>Does Smart / Curly Quotes convert quotation marks inside the text too?</strong> No — it only wraps the entire block of text in a single pair of curly quotes; any straight quotes already inside your text are left as typed.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/quote-formatter" content={content}>
      <QuoteFormatterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default QuoteFormatter;
