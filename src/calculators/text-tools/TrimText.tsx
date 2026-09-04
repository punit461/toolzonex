'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Button, Paper } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const TrimTextContent = () => {
  const [text, setText] = useState('');

  const trimmed = useMemo(() => text.trim(), [text]);
  const charsRemoved = text.length - trimmed.length;

  const copy = () => trimmed && navigator.clipboard.writeText(trimmed);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box>
        <TextField
          label="Input Text"
          placeholder="Paste text with leading/trailing whitespace..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          multiline
          rows={10}
          fullWidth
        />
      </Box>

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" fontWeight="600">Trimmed Result</Typography>
          {trimmed && (
            <Button size="small" startIcon={<ContentCopyIcon />} onClick={copy}>Copy</Button>
          )}
        </Box>
        <TextField
          value={trimmed}
          multiline
          rows={10}
          fullWidth
          slotProps={{ input: { readOnly: true } }}
          placeholder="Trimmed text will appear here..."
        />
        <Paper variant="outlined" sx={{ p: 1.5, mt: 1.5, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            {charsRemoved > 0 ? `${charsRemoved} whitespace character${charsRemoved === 1 ? '' : 's'} removed` : 'No leading/trailing whitespace found'}
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

const TrimText = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Trim Text Tool</Typography>
      <Typography variant="body1">
        Paste your text into the input box and the leading and trailing whitespace — spaces, tabs, and line
        breaks at the very start and very end of the whole block — is stripped instantly. This is the single,
        literal meaning of &quot;trim&quot;: it does not touch whitespace in the middle of your text or clean up
        individual lines, it just removes what&apos;s hanging off the beginning and end of the entire input.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Input with three spaces before &quot;Hello world&quot; and a trailing newline after it becomes exactly
        &quot;Hello world&quot; — nothing in between is changed.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Cleaning a stray leading space or trailing newline off a value pasted from another app.</li>
          <li>Preparing a single line of text — like a username or code snippet — for exact comparison.</li>
          <li>Quickly trimming a block of text without opening a menu of cleaning options.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is this different from the Whitespace Cleaner?</Typography>
      <Typography variant="body1">
        The Whitespace Cleaner is a full cleaning suite with several checkboxes — trimming each line, removing
        blank lines, collapsing multiple spaces, and converting tabs to spaces. This tool is deliberately
        minimal: it does exactly one thing, stripping only the leading and trailing whitespace from the entire
        input as a single block, for anyone who just wants that one specific operation without a menu of
        choices.
      </Typography>
      <Typography variant="h3">Does this trim whitespace from every line, or just the ends?</Typography>
      <Typography variant="body1">
        Just the very start and very end of the whole input — not each individual line. If you need per-line
        trimming as well, use the Whitespace Cleaner instead.
      </Typography>
      <Typography variant="h3">Does this collapse multiple spaces in the middle of my text?</Typography>
      <Typography variant="body1">
        No — only leading and trailing whitespace is removed. Spaces, tabs, and line breaks anywhere in the
        middle of your text are left exactly as you typed them.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/trim-text" content={content}>
      <TrimTextContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TrimText;
