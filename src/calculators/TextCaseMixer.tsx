'use client';

import { useState } from 'react';
import { Box, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const TextCaseMixerContent = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [mode, setMode] = useState('random');

  const mixCase = () => {
    let output = '';

    if (mode === 'random') {
      output = text.split('').map(char => Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase()).join('');
    } else if (mode === 'alternating-start-lower') {
      output = text.split('').map((char, index) => index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()).join('');
    } else if (mode === 'alternating-start-upper') {
      output = text.split('').map((char, index) => index % 2 === 0 ? char.toUpperCase() : char.toLowerCase()).join('');
    } else if (mode === 'inverse') {
      output = text.split('').map(char => {
        if (char === char.toUpperCase()) return char.toLowerCase();
        if (char === char.toLowerCase()) return char.toUpperCase();
        return char;
      }).join('');
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
          placeholder="Type your normal text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          multiline
          rows={6}
          fullWidth
          sx={{ mb: 2 }}
        />

        <Box sx={{ mb: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Mixing Mode</InputLabel>
            <Select
              value={mode}
              label="Mixing Mode"
              onChange={(e) => setMode(e.target.value)}
            >
              <MenuItem value="random">rANdoM caSE (Mocking Spongebob)</MenuItem>
              <MenuItem value="alternating-start-lower">aLtErNaTiNg (start lower)</MenuItem>
              <MenuItem value="alternating-start-upper">AlTeRnAtInG (start upper)</MenuItem>
              <MenuItem value="inverse">InVeRsE Case (Swap case of each letter)</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Button variant="contained" onClick={mixCase} fullWidth size="large">
          Mix Case
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
          rows={10}
          fullWidth
          InputProps={{ readOnly: true }}
          placeholder="mIxEd teXt WiLl apPEar HerE..."
        />
      </Box>
    </Box>
  );
};

const TextCaseMixer = () => {
  const content = (
    <>
      <Typography variant="h2">What is the Text Case Mixer?</Typography>
      <Typography variant="body1">
        This tool takes normal text and scrambles the capitalization. It's often used for generating "Mocking Spongebob" meme text, alternating capitalization, or simply swapping the case of every character in a string.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Text Case Mixer"
      description="Convert text into random case, alternating case, or inverse case. Free online meme text generator."
      url="/tools/text-case-mixer"
      content={content}
      category="Tools"
    >
      <TextCaseMixerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TextCaseMixer;
