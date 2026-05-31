'use client';

import { useState } from 'react';
import { Box, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const SentenceCaseFixerContent = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [mode, setMode] = useState('sentence-case');

  const fixCase = () => {
    let output = text;

    if (mode === 'sentence-case') {
      // Very basic sentence case (capitalize first letter after ., ! or ?)
      output = text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (match) => match.toUpperCase());
    } else if (mode === 'lower-case') {
      output = text.toLowerCase();
    } else if (mode === 'upper-case') {
      output = text.toUpperCase();
    } else if (mode === 'title-case') {
      // Capitalize first letter of every word
      output = text.toLowerCase().replace(/\b\w/g, (match) => match.toUpperCase());
    } else if (mode === 'alternating-case') {
      // aLtErNaTiNg cAsE
      output = text.split('').map((char, index) => index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()).join('');
    }

    setResult(output);
  };

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(result);
    } catch (err) {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box>
        <TextField
          label="Input Text"
          placeholder="tYPe oR PAsTe YouR meSSy TeXT HeRE..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          multiline
          rows={10}
          fullWidth
          sx={{ mb: 2 }}
        />

        <Box sx={{ mb: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Case Mode</InputLabel>
            <Select
              value={mode}
              label="Case Mode"
              onChange={(e) => setMode(e.target.value)}
            >
              <MenuItem value="sentence-case">Sentence case (First letter capitalized)</MenuItem>
              <MenuItem value="lower-case">lower case</MenuItem>
              <MenuItem value="upper-case">UPPER CASE</MenuItem>
              <MenuItem value="title-case">Title Case (Every Word Capitalized)</MenuItem>
              <MenuItem value="alternating-case">aLtErNaTiNg cAsE</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Button variant="contained" onClick={fixCase} fullWidth size="large">
          Convert Text
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
          placeholder="Converted text will appear here..."
        />
      </Box>
    </Box>
  );
};

const SentenceCaseFixer = () => {
  const content = (
    <>
      <Typography variant="h2">How to use the Sentence Case Fixer?</Typography>
      <Typography variant="body1">
        If you accidentally left Caps Lock on, or you need to reformat messy text, just paste it here. Select your desired text casing format (like Sentence case or Title Case) and click "Convert Text".
      </Typography>

      <Typography variant="h2">Available Case Modes</Typography>
      <Typography variant="body1">
        <ul>
          <li><strong>Sentence case:</strong> Capitalizes only the first letter of each sentence.</li>
          <li><strong>lower case:</strong> Converts all letters to lowercase.</li>
          <li><strong>UPPER CASE:</strong> Converts all letters to uppercase (all caps).</li>
          <li><strong>Title Case:</strong> Capitalizes the first letter of every single word.</li>
          <li><strong>Alternating Case:</strong> Randomly alternates between upper and lowercase for a mocking or meme effect.</li>
        </ul>
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Sentence Case Fixer & Text Case Converter"
      description="Convert text to UPPERCASE, lowercase, Title Case, or Sentence case instantly. Free online text formatting tool."
      url="/tools/sentence-case-fixer"
      content={content}
      category="Tools"
    >
      <SentenceCaseFixerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default SentenceCaseFixer;
