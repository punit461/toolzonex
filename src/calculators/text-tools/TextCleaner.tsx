'use client';

import { useState } from 'react';
import { Box, TextField, Button, Typography, FormControlLabel, Checkbox } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const TextCleanerContent = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');

  const [trimWhitespace, setTrimWhitespace] = useState(true);
  const [collapseSpaces, setCollapseSpaces] = useState(true);
  const [removeLineBreaks, setRemoveLineBreaks] = useState(false);
  const [removeSpecialChars, setRemoveSpecialChars] = useState(false);
  const [normalizeQuotes, setNormalizeQuotes] = useState(true);

  const handleClean = () => {
    let processed = text;

    if (normalizeQuotes) {
      processed = processed
        .replace(/[‘’‚‛]/g, "'")
        .replace(/[“”„‟]/g, '"');
    }

    if (removeLineBreaks) {
      processed = processed.replace(/\r?\n+/g, ' ');
    }

    if (removeSpecialChars) {
      processed = processed.replace(/[^a-zA-Z0-9\s.,!?'"()-]/g, '');
    }

    if (collapseSpaces) {
      processed = processed.replace(/[^\S\r\n]+/g, ' ');
    }

    if (trimWhitespace) {
      processed = processed
        .split('\n')
        .map((line) => line.trim())
        .join('\n')
        .trim();
    }

    setResult(processed);
  };

  const copyResult = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
    } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box>
        <TextField
          label="Input Text"
          placeholder="Paste messy text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          multiline
          rows={10}
          fullWidth
          sx={{ mb: 2 }}
        />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mb: 3 }}>
          <FormControlLabel
            control={<Checkbox checked={trimWhitespace} onChange={(e) => setTrimWhitespace(e.target.checked)} />}
            label="Trim leading/trailing whitespace"
          />
          <FormControlLabel
            control={<Checkbox checked={collapseSpaces} onChange={(e) => setCollapseSpaces(e.target.checked)} />}
            label="Collapse multiple spaces into one"
          />
          <FormControlLabel
            control={<Checkbox checked={removeLineBreaks} onChange={(e) => setRemoveLineBreaks(e.target.checked)} />}
            label="Remove line breaks"
          />
          <FormControlLabel
            control={<Checkbox checked={removeSpecialChars} onChange={(e) => setRemoveSpecialChars(e.target.checked)} />}
            label="Remove special characters"
          />
          <FormControlLabel
            control={<Checkbox checked={normalizeQuotes} onChange={(e) => setNormalizeQuotes(e.target.checked)} />}
            label="Normalize smart quotes to straight quotes"
          />
        </Box>

        <Button variant="contained" onClick={handleClean} fullWidth size="large">
          Clean Text
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

const TextCleaner = () => {
  const content = (
    <>
      <Typography variant="h2">How to use the Text Cleaner</Typography>
      <Typography variant="body1">
        Paste your text into the box, tick the cleanup options you need, and click &quot;Clean Text&quot;. Each
        option can be toggled independently, so you can mix and match exactly the cleanup steps your text
        needs.
      </Typography>

      <Typography variant="h2">Cleanup options explained</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Trim leading/trailing whitespace:</strong> Removes stray spaces from the start and end of the text and each line.</li>
          <li><strong>Collapse multiple spaces:</strong> Turns two or more spaces in a row into a single space.</li>
          <li><strong>Remove line breaks:</strong> Joins multi-line text into a single paragraph, replacing line breaks with spaces.</li>
          <li><strong>Remove special characters:</strong> Strips everything except letters, numbers, spaces, and basic punctuation.</li>
          <li><strong>Normalize smart quotes:</strong> Converts curly &quot;smart&quot; quotes and apostrophes (often introduced by Word or iOS) into plain straight quotes.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Text copied from a Word document with curly quotes, double spaces, and trailing whitespace on each line
        is cleaned into plain, single-spaced text with straight quotes — ready to paste into code, a CMS, or a
        plain-text file.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Cleaning text copied from Word or Google Docs before pasting into code or a database.</li>
          <li>Normalizing smart quotes so text displays correctly in plain-text environments.</li>
          <li>Stripping stray formatting characters from scraped or exported content.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Can I use only some of the cleanup options?</Typography>
      <Typography variant="body1">
        Yes — every checkbox is independent. Untick anything you don&apos;t want applied and only the checked
        options run when you click &quot;Clean Text&quot;.
      </Typography>
      <Typography variant="h3">What counts as a &quot;special character&quot;?</Typography>
      <Typography variant="body1">
        With that option enabled, anything that isn&apos;t a letter, number, space, or basic punctuation
        (period, comma, exclamation mark, question mark, quotes, parentheses, hyphen) is removed.
      </Typography>
      <Typography variant="h3">Why would I normalize smart quotes?</Typography>
      <Typography variant="body1">
        Word processors and phone keyboards often auto-replace straight quotes with curly &quot;smart&quot;
        quotes, which can break code syntax, CSV files, or systems that expect plain ASCII quotation marks.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/text-cleaner" content={content}>
      <TextCleanerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TextCleaner;
