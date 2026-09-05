'use client';

import { useMemo, useState } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function buildIndex(input: string): string {
  const items = input
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  if (items.length === 0) return '';

  const groups = new Map<string, string[]>();
  for (const item of items) {
    const firstChar = item.charAt(0).toUpperCase();
    const key = /[A-Z]/.test(firstChar) ? firstChar : '#';
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(item);
  }

  const letterKeys = Array.from(groups.keys())
    .filter((k) => k !== '#')
    .sort();
  const orderedKeys = groups.has('#') ? [...letterKeys, '#'] : letterKeys;

  return orderedKeys
    .map((key) => {
      const sorted = groups.get(key)!.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
      return `${key}\n${sorted.map((s) => `  ${s}`).join('\n')}`;
    })
    .join('\n\n');
}

const AlphabetIndexGeneratorContent = () => {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => buildIndex(input), [input]);

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
        label="Terms / Names"
        placeholder={'Enter one term per line, e.g.\nZebra\nApple\nMango\nAvocado'}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        multiline
        rows={8}
        fullWidth
      />

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" fontWeight="600">Alphabetical Index:</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyResult} disabled={!output}>
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </Box>
        <Box
          component="pre"
          sx={{
            m: 0,
            p: 2,
            bgcolor: 'action.hover',
            borderRadius: 1,
            fontFamily: 'monospace',
            fontSize: '0.9rem',
            overflowX: 'auto',
            minHeight: 200,
            whiteSpace: 'pre-wrap',
          }}
        >
          {output || ' '}
        </Box>
      </Box>
    </Box>
  );
};

const AlphabetIndexGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Alphabet Index Generator</Typography>
      <Typography variant="body1">
        Paste a list of terms or names, one per line. The tool groups them alphabetically under A-Z section
        headers, showing only the letters that actually have at least one matching entry, and sorts entries
        alphabetically within each letter group. This is a quick way to turn a raw list into a formatted index,
        glossary, or directory listing.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Entering <code>Zebra</code>, <code>Apple</code>, <code>Mango</code>, and <code>Avocado</code> (one per
        line) produces an index with an &quot;A&quot; group containing Apple and Avocado in alphabetical order, a
        &quot;M&quot; group containing Mango, and a &quot;Z&quot; group containing Zebra — with no B through L or
        N through Y headers shown, since no entries start with those letters.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Building a glossary or index for a book, guide, or documentation site from a raw term list.</li>
          <li>Turning a member or contact list into an alphabetically sectioned directory.</li>
          <li>Organizing a list of product names, ingredients, or tags into readable A-Z groups.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What happens to entries that don&apos;t start with a letter?</strong> Entries starting with a number or symbol are grouped together under a single &quot;#&quot; section placed at the end of the index.</li>
          <li><strong>Is the grouping case-sensitive?</strong> No — grouping and sorting both ignore case, so &quot;apple&quot; and &quot;Apple&quot; are grouped and sorted together as if identically cased.</li>
          <li><strong>Are duplicate entries removed?</strong> No — every line you enter appears in the index exactly once per occurrence; run a duplicate-removal tool first if you want only unique entries.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/alphabet-index-generator" content={content}>
      <AlphabetIndexGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default AlphabetIndexGenerator;
