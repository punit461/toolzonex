'use client';

import { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const RemovePrefixSuffixContent = () => {
  const [text, setText] = useState('');
  const [prefix, setPrefix] = useState('');
  const [suffix, setSuffix] = useState('');
  const [result, setResult] = useState('');

  const applyRemoval = () => {
    const lines = text.split('\n');
    const processed = lines.map((line) => {
      let out = line;
      if (prefix && out.startsWith(prefix)) out = out.slice(prefix.length);
      if (suffix && out.endsWith(suffix)) out = out.slice(0, out.length - suffix.length);
      return out;
    });
    setResult(processed.join('\n'));
  };

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(result);
    } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box>
        <TextField
          label="Input Text (Multiple Lines)"
          placeholder="Paste a list of items here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          multiline
          rows={6}
          fullWidth
          sx={{ mb: 2 }}
        />

        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            label="Prefix to Remove"
            placeholder="e.g. - "
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            fullWidth
          />
          <TextField
            label="Suffix to Remove"
            placeholder="e.g. ,"
            value={suffix}
            onChange={(e) => setSuffix(e.target.value)}
            fullWidth
          />
        </Box>

        <Button variant="contained" onClick={applyRemoval} fullWidth size="large">
          Remove Prefix & Suffix
        </Button>
      </Box>

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" fontWeight="600">Result:</Typography>
          {result && (
            <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyResult}>
              Copy
            </Button>
          )}
        </Box>
        <TextField
          value={result}
          multiline
          rows={12}
          fullWidth
          InputProps={{ readOnly: true }}
          placeholder="Cleaned text will appear here..."
        />
      </Box>
    </Box>
  );
};

const RemovePrefixSuffixTool = () => {
  const content = (
    <>
      <Typography variant="h2">How to Remove a Prefix or Suffix</Typography>
      <Typography variant="body1">
        Paste your list into the main text box, then specify the exact text you want stripped from the beginning
        (prefix) or end (suffix) of each line. Click the button and every line is checked individually — a
        prefix is only removed from lines that actually START with that exact text, and a suffix is only
        removed from lines that actually END with it. Lines that don&apos;t have the prefix or suffix are left
        completely unchanged.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Removing prefix <code>- </code> from the lines <code>- Apples</code>, <code>Bananas</code>, and{' '}
        <code>- Cherries</code> produces <code>Apples</code>, <code>Bananas</code> (unchanged, since it never had
        the prefix), and <code>Cherries</code>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Stripping markdown bullet markers (<code>- </code> or <code>* </code>) off a pasted list.</li>
          <li>Removing quotes and trailing commas from a JSON or SQL-style list of values.</li>
          <li>Cleaning a shared prefix (like a folder path) or file extension off a list of filenames.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Line Prefix &amp; Suffix Tool?</strong> The Line Prefix &amp; Suffix Tool ADDS text to the beginning and/or end of every line. This tool does the reverse — it REMOVES a specified prefix and/or suffix, but only from the lines that actually have it, leaving every other line untouched.</li>
          <li><strong>What happens if a line doesn&apos;t start with the prefix I entered?</strong> That line is left completely unchanged — the removal only applies to lines that actually match, so you never risk accidentally cutting text off lines that don&apos;t have the prefix or suffix.</li>
          <li><strong>Is the match case-sensitive?</strong> Yes — the prefix and suffix must match the line&apos;s text exactly, including capitalization, for the removal to apply.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/remove-prefix-suffix-tool" content={content}>
      <RemovePrefixSuffixContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RemovePrefixSuffixTool;
