'use client';

import { useMemo, useState } from 'react';
import { Box, Button, Typography, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Style = 'bullet' | 'dash' | 'numbered' | 'lettered' | 'mdBullet' | 'mdNumbered';

function toLetterSequence(index: number): string {
  let n = index;
  let result = '';
  do {
    result = String.fromCharCode(97 + (n % 26)) + result;
    n = Math.floor(n / 26) - 1;
  } while (n >= 0);
  return result;
}

function formatList(input: string, style: Style): string {
  const items = input.split('\n').filter((line) => line.trim().length > 0);
  return items
    .map((item, i) => {
      const trimmed = item.trim();
      switch (style) {
        case 'bullet':
          return `• ${trimmed}`;
        case 'dash':
          return `- ${trimmed}`;
        case 'numbered':
          return `${i + 1}. ${trimmed}`;
        case 'lettered':
          return `${toLetterSequence(i)}. ${trimmed}`;
        case 'mdBullet':
          return `- ${trimmed}`;
        case 'mdNumbered':
          return `1. ${trimmed}`;
        default:
          return trimmed;
      }
    })
    .join('\n');
}

const STYLES: { value: Style; label: string }[] = [
  { value: 'bullet', label: 'Bullet (•)' },
  { value: 'dash', label: 'Dash (-)' },
  { value: 'numbered', label: 'Numbered (1. 2. 3.)' },
  { value: 'lettered', label: 'Lettered (a. b. c.)' },
  { value: 'mdBullet', label: 'Markdown Bullet' },
  { value: 'mdNumbered', label: 'Markdown Numbered' },
];

const TextToListFormatterContent = () => {
  const [input, setInput] = useState('');
  const [style, setStyle] = useState<Style>('bullet');
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => formatList(input, style), [input, style]);

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
        label="Text (one item per line)"
        placeholder={'Enter one item per line, e.g.\nMilk\nEggs\nBread'}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        multiline
        rows={7}
        fullWidth
      />

      <Box>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>List style:</Typography>
        <ToggleButtonGroup
          value={style}
          exclusive
          onChange={(_, v) => v && setStyle(v)}
          sx={{ flexWrap: 'wrap', gap: 1, '& .MuiToggleButtonGroup-grouped': { border: '1px solid', borderColor: 'divider !important', borderRadius: '4px !important' } }}
        >
          {STYLES.map((s) => (
            <ToggleButton key={s.value} value={s.value} size="small">{s.label}</ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" fontWeight="600">Formatted List:</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyResult} disabled={!output}>
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </Box>
        <TextField
          value={output}
          multiline
          rows={7}
          fullWidth
          InputProps={{ readOnly: true }}
          placeholder="Formatted list will appear here..."
        />
      </Box>
    </Box>
  );
};

const TextToListFormatter = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Text to List Formatter</Typography>
      <Typography variant="body1">
        Paste your text with one item per line, then choose a list style — Bullet, Dash, Numbered, Lettered,
        Markdown Bullet, or Markdown Numbered. Each line is prefixed with the matching marker, turning plain text
        into a ready-to-use bullet list or numbered list in one step, whichever format you need.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Entering <code>Milk</code>, <code>Eggs</code>, and <code>Bread</code> (one per line) with the Numbered
        style produces <code>1. Milk</code>, <code>2. Eggs</code>, and <code>3. Bread</code>. Switching to
        Lettered instead produces <code>a. Milk</code>, <code>b. Eggs</code>, and <code>c. Bread</code>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Turning a plain-text list of items into a numbered or bulleted list for a document or email.</li>
          <li>Preparing a Markdown-formatted bullet or numbered list for a README or blog post.</li>
          <li>Converting a pasted list of steps into a lettered sub-list for an outline.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What is the difference between Dash and Markdown Bullet?</strong> Both use the same <code>- </code> marker, but they're offered as separate style options since &quot;dash list&quot; and &quot;markdown bullet list&quot; are two common ways people search for the same result.</li>
          <li><strong>What happens after "z" in Lettered style?</strong> The sequence continues with double letters — aa, ab, ac, and so on — the same way spreadsheet columns continue past Z, so lists longer than 26 items still get a unique marker.</li>
          <li><strong>Are blank lines included in the output?</strong> No — empty lines in your input are skipped, so the numbering or lettering stays continuous across only the actual list items.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/text-to-list-formatter" content={content}>
      <TextToListFormatterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TextToListFormatter;
