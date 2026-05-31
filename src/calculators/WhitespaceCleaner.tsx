'use client';

import { useState } from 'react';
import { Box, TextField, Button, Typography, FormControlLabel, Checkbox, Paper } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const WhitespaceCleanerContent = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  
  // Options
  const [trimLines, setTrimLines] = useState(true);
  const [removeExtraSpaces, setRemoveExtraSpaces] = useState(true);
  const [removeEmptyLines, setRemoveEmptyLines] = useState(false);
  const [convertTabsToSpaces, setConvertTabsToSpaces] = useState(false);

  const handleClean = () => {
    let processed = text;

    if (convertTabsToSpaces) {
      processed = processed.replace(/\t/g, '    '); // Convert tab to 4 spaces
    }

    if (removeExtraSpaces) {
      // Replace multiple spaces (but not newlines) with a single space
      processed = processed.replace(/[^\S\r\n]+/g, ' ');
    }

    if (trimLines) {
      // Trim spaces from start and end of each line
      processed = processed
        .split('\n')
        .map(line => line.trim())
        .join('\n');
    }

    if (removeEmptyLines) {
      // Remove lines that are purely empty
      processed = processed
        .split('\n')
        .filter(line => line !== '')
        .join('\n');
    }

    setResult(processed);
  };

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(result);
    } catch (err) {
      console.error('Failed to copy to clipboard');
    }
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

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
          <FormControlLabel
            control={<Checkbox checked={trimLines} onChange={(e) => setTrimLines(e.target.checked)} />}
            label="Trim spaces at beginning and end of lines"
          />
          <FormControlLabel
            control={<Checkbox checked={removeExtraSpaces} onChange={(e) => setRemoveExtraSpaces(e.target.checked)} />}
            label="Remove multiple spaces between words"
          />
          <FormControlLabel
            control={<Checkbox checked={removeEmptyLines} onChange={(e) => setRemoveEmptyLines(e.target.checked)} />}
            label="Remove empty lines"
          />
          <FormControlLabel
            control={<Checkbox checked={convertTabsToSpaces} onChange={(e) => setConvertTabsToSpaces(e.target.checked)} />}
            label="Convert Tabs to Spaces"
          />
        </Box>

        <Button variant="contained" onClick={handleClean} fullWidth size="large">
          Clean Whitespace
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

const WhitespaceCleaner = () => {
  const content = (
    <>
      <Typography variant="h2">How to use the Whitespace Cleaner?</Typography>
      <Typography variant="body1">
        Paste your text into the input field, select your cleaning preferences (like removing empty lines or trimming trailing spaces), and click "Clean Whitespace". The tool instantly formats your text perfectly.
      </Typography>

      <Typography variant="h2">Why clean whitespace?</Typography>
      <Typography variant="body1">
        When copying data from PDFs, emails, or legacy software, text often carries invisible formatting errors like double spaces, random tabs, or trailing spaces. These can break code, ruin database imports, or look unprofessional in documents. This tool sanitizes your text instantly without tedious manual editing.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Whitespace Cleaner"
      description="Remove extra spaces, tabs, and empty lines from text automatically. Free online text formatting tool."
      url="/tools/whitespace-cleaner"
      content={content}
      category="Tools"
    >
      <WhitespaceCleanerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default WhitespaceCleaner;
