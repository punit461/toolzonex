'use client';

import { useState } from 'react';
import { Box, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const TextReverserContent = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [mode, setMode] = useState('reverse-all');

  const handleReverse = () => {
    let reversed = '';
    
    if (mode === 'reverse-all') {
      // Reverses everything backwards
      reversed = text.split('').reverse().join('');
    } else if (mode === 'reverse-words') {
      // "hello world" -> "world hello"
      reversed = text.split(/\s+/).reverse().join(' ');
    } else if (mode === 'reverse-letters-in-words') {
      // "hello world" -> "olleh dlrow"
      reversed = text.split(/\s+/).map(word => word.split('').reverse().join('')).join(' ');
    } else if (mode === 'reverse-lines') {
      // line 1 \n line 2 -> line 2 \n line 1
      reversed = text.split('\n').reverse().join('\n');
    }
    
    setResult(reversed);
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
          placeholder="Type or paste text to reverse..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          multiline
          rows={10}
          fullWidth
          sx={{ mb: 2 }}
        />

        <Box sx={{ mb: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Reversal Mode</InputLabel>
            <Select
              value={mode}
              label="Reversal Mode"
              onChange={(e) => setMode(e.target.value)}
            >
              <MenuItem value="reverse-all">Reverse Entire Text (Backwards)</MenuItem>
              <MenuItem value="reverse-words">Reverse Word Order ("Hello World" → "World Hello")</MenuItem>
              <MenuItem value="reverse-letters-in-words">Reverse Letters in Words ("Hello" → "olleH")</MenuItem>
              <MenuItem value="reverse-lines">Reverse Line Order (Bottom to Top)</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Button variant="contained" onClick={handleReverse} fullWidth size="large">
          Reverse Text
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
          placeholder="Reversed text will appear here..."
        />
      </Box>
    </Box>
  );
};

const TextReverser = () => {
  const content = (
    <>
      <Typography variant="h2">How to use the Text Reverser?</Typography>
      <Typography variant="body1">
        Type or paste your text into the input field. Choose a reversal mode from the dropdown menu, and click "Reverse Text". The modified text will instantly appear in the result box, ready to be copied.
      </Typography>

      <Typography variant="h2">Reversal Modes Explained</Typography>
      <Typography variant="body1">
        <ul>
          <li><strong>Reverse Entire Text:</strong> Flips the entire string backwards. The last character becomes the first character.</li>
          <li><strong>Reverse Word Order:</strong> Keeps words intact but reverses their sequence. Great for rearranging lists.</li>
          <li><strong>Reverse Letters in Words:</strong> Reverses the letters inside each word, but keeps the words in their original order.</li>
          <li><strong>Reverse Line Order:</strong> Flips paragraphs or lists upside down. The last line becomes the first line.</li>
        </ul>
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Text Reverser"
      description="Reverse text backwards, reverse words, or flip lines upside down. Free online text reversal tool."
      url="/tools/text-reverser"
      content={content}
      category="Tools"
    >
      <TextReverserContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TextReverser;
