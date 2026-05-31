'use client';

import { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, FormControlLabel, Checkbox } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const LineNumberingContent = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [skipEmptyLines, setSkipEmptyLines] = useState(false);
  const [addDot, setAddDot] = useState(true);

  const handleNumbering = () => {
    const lines = text.split('\n');
    let counter = 1;
    const numbered = lines.map((line) => {
      if (skipEmptyLines && line.trim() === '') {
        return line;
      }
      const prefix = addDot ? `${counter}. ` : `${counter} `;
      counter++;
      return prefix + line;
    });
    setResult(numbered.join('\n'));
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
          placeholder="Paste your lines of text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          multiline
          rows={10}
          fullWidth
          sx={{ mb: 2 }}
        />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
          <FormControlLabel
            control={<Checkbox checked={skipEmptyLines} onChange={(e) => setSkipEmptyLines(e.target.checked)} />}
            label="Skip empty lines (don't increment number)"
          />
          <FormControlLabel
            control={<Checkbox checked={addDot} onChange={(e) => setAddDot(e.target.checked)} />}
            label="Add dot after number (e.g., '1. ' vs '1 ')"
          />
        </Box>

        <Button variant="contained" onClick={handleNumbering} fullWidth size="large">
          Add Line Numbers
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
          placeholder="Numbered list will appear here..."
        />
      </Box>
    </Box>
  );
};

const LineNumbering = () => {
  const content = (
    <>
      <Typography variant="h2">How to use the Line Numbering tool?</Typography>
      <Typography variant="body1">
        Paste your text into the left box, select whether you want to skip numbering on empty lines, and click "Add Line Numbers". The tool will automatically prepend sequential numbers to each line of your text.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Line Numbering"
      description="Automatically add line numbers to text or lists. Free online utility for coding or document formatting."
      url="/tools/line-numbering"
      content={content}
      category="Tools"
    >
      <LineNumberingContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default LineNumbering;
