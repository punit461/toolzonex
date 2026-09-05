'use client';

import { useMemo, useState } from 'react';
import { Box, Button, Typography, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Mode = 'chars' | 'words' | 'br';

function breakEveryNChars(text: string, n: number): string {
  const words = text.split(/(\s+)/);
  const lines: string[] = [];
  let current = '';

  for (const chunk of words) {
    if (current.length + chunk.length > n && current.trim().length > 0) {
      lines.push(current.trimEnd());
      current = chunk.trimStart();
    } else {
      current += chunk;
    }
  }
  if (current.trim().length > 0 || lines.length === 0) lines.push(current.trimEnd());
  return lines.join('\n');
}

function breakEveryNWords(text: string, n: number): string {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  for (let i = 0; i < words.length; i += n) {
    lines.push(words.slice(i, i + n).join(' '));
  }
  return lines.join('\n');
}

function convertNewlinesToBr(text: string): string {
  return text
    .split('\n')
    .join('<br>\n');
}

const LineBreakInserterContent = () => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<Mode>('chars');
  const [n, setN] = useState('40');
  const [copied, setCopied] = useState(false);

  const nNum = Math.max(1, parseInt(n, 10) || 40);

  const output = useMemo(() => {
    if (!input) return '';
    if (mode === 'chars') return breakEveryNChars(input, nNum);
    if (mode === 'words') return breakEveryNWords(input, nNum);
    return convertNewlinesToBr(input);
  }, [input, mode, nNum]);

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
        label="Text"
        placeholder="Type or paste your text here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        multiline
        rows={6}
        fullWidth
      />

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={(_, v) => v && setMode(v)}
          sx={{ flexWrap: 'wrap', gap: 1, '& .MuiToggleButtonGroup-grouped': { border: '1px solid', borderColor: 'divider !important', borderRadius: '4px !important' } }}
        >
          <ToggleButton value="chars" size="small">Every N Characters</ToggleButton>
          <ToggleButton value="words" size="small">Every N Words</ToggleButton>
          <ToggleButton value="br" size="small">Newlines to &lt;br&gt;</ToggleButton>
        </ToggleButtonGroup>

        {mode !== 'br' && (
          <TextField
            label={mode === 'chars' ? 'Characters' : 'Words'}
            type="number"
            value={n}
            onChange={(e) => setN(e.target.value)}
            sx={{ width: 140 }}
            inputProps={{ min: 1, max: 500 }}
          />
        )}
      </Box>

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
          rows={6}
          fullWidth
          InputProps={{ readOnly: true }}
          placeholder="Result will appear here..."
        />
      </Box>
    </Box>
  );
};

const LineBreakInserter = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Line Break Inserter</Typography>
      <Typography variant="body1">
        Paste your text and choose a mode. &quot;Every N Characters&quot; inserts a line break roughly every N
        characters, but it&apos;s word-boundary-aware so it never splits a word in half — it looks for the
        nearest space instead. &quot;Every N Words&quot; inserts a break after every N words regardless of line
        length. &quot;Newlines to &lt;br&gt;&quot; converts every existing single newline in your text into an
        HTML <code>&lt;br&gt;</code> tag followed by a newline, ready to paste into HTML source.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Running &quot;Every N Words&quot; with N set to 3 on <code>The quick brown fox jumps over the lazy
        dog</code> produces three lines: <code>The quick brown</code>, <code>fox jumps over</code>, and{' '}
        <code>the lazy dog</code>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Wrapping long text to a fixed character width for a fixed-width display, label, or terminal output.</li>
          <li>Breaking a long sentence into short, evenly-sized lines for a slide or lyric sheet.</li>
          <li>Converting plain-text paragraphs into HTML source with explicit <code>&lt;br&gt;</code> line breaks.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Will "Every N Characters" ever break in the middle of a word?</strong> No — it looks for the nearest word boundary at or before the character limit, so a line may end up slightly shorter than N characters rather than splitting a word.</li>
          <li><strong>What happens to existing line breaks in "Every N Characters" or "Every N Words" mode?</strong> Those two modes treat the input as one continuous stream of words, so existing line breaks are effectively removed and replaced by the new break pattern.</li>
          <li><strong>Does "Newlines to &lt;br&gt;" affect blank lines?</strong> Yes — every newline character, including ones between blank lines, is followed by a <code>&lt;br&gt;</code> tag, matching how browsers render explicit line breaks in HTML.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/line-break-inserter" content={content}>
      <LineBreakInserterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default LineBreakInserter;
