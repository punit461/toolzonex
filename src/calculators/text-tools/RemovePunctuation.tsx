'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Button } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const PUNCTUATION_REGEX = /[.,/#!$%^&*;:{}=\-_`~()[\]<>'"?@+|\\]/g;

const RemovePunctuationContent = () => {
  const [text, setText] = useState('');

  const result = useMemo(() => text.replace(PUNCTUATION_REGEX, ''), [text]);

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
          placeholder="Hello, world! How are you today? I'm doing great..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          multiline
          rows={12}
          fullWidth
        />
      </Box>

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" fontWeight="600">Result (updates live):</Typography>
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
          placeholder="Text without punctuation will appear here..."
        />
      </Box>
    </Box>
  );
};

const RemovePunctuation = () => {
  const content = (
    <>
      <Typography variant="h2">How to remove punctuation from text</Typography>
      <Typography variant="body1">
        Type or paste your text into the box above. Every punctuation character — periods, commas, exclamation
        marks, quotes, brackets, and more — is stripped out instantly, with the result updating live as you
        type.
      </Typography>

      <Typography variant="h2">Which characters count as punctuation?</Typography>
      <Typography variant="body1">
        This tool removes common punctuation and symbol characters, including periods, commas, exclamation
        marks, question marks, colons, semicolons, quotes, apostrophes, parentheses, brackets, hyphens,
        underscores, and symbols like @, #, and &amp;. Letters, numbers, and spaces are always preserved.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        &quot;Hello, world! How are you today? I&apos;m doing great...&quot; becomes &quot;Hello world How are
        you today Im doing great&quot;.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Preparing plain text for word-frequency or keyword analysis.</li>
          <li>Cleaning quotes and captions for use in systems that don&apos;t handle punctuation well.</li>
          <li>Simplifying text before tokenizing it for a script or spreadsheet.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does it remove spaces or line breaks too?</Typography>
      <Typography variant="body1">
        No — only punctuation and symbol characters are removed. Spaces, line breaks, letters, and numbers are
        all left in place.
      </Typography>
      <Typography variant="h3">Will apostrophes in contractions be removed?</Typography>
      <Typography variant="body1">
        Yes — apostrophes are treated as punctuation, so &quot;I&apos;m&quot; becomes &quot;Im&quot; and
        &quot;don&apos;t&quot; becomes &quot;dont&quot;.
      </Typography>
      <Typography variant="h3">Does this update as I type?</Typography>
      <Typography variant="body1">
        Yes — there&apos;s no button to click. The result recalculates instantly as you edit the input text.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/remove-punctuation" content={content}>
      <RemovePunctuationContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RemovePunctuation;
