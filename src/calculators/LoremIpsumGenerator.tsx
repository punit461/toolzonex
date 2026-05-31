'use client';

import { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem, Paper, FormControlLabel, Checkbox } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RefreshIcon from '@mui/icons-material/Refresh';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const LOREM_WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", 
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", 
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation", 
  "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo", "consequat", "duis", 
  "aute", "irure", "in", "reprehenderit", "voluptate", "velit", "esse", "cillum", 
  "fugiat", "nulla", "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", 
  "proident", "sunt", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum"
];

const LoremIpsumGeneratorContent = () => {
  const [count, setCount] = useState(5);
  const [type, setType] = useState('paragraphs');
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [result, setResult] = useState('');

  const getRandomWord = () => LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];

  const generateSentence = (wordsCount: number = Math.floor(Math.random() * 8) + 5) => {
    const sentence = [];
    for (let i = 0; i < wordsCount; i++) {
      sentence.push(getRandomWord());
    }
    const finalStr = sentence.join(' ') + '.';
    return finalStr.charAt(0).toUpperCase() + finalStr.slice(1);
  };

  const generateParagraph = (sentencesCount: number = Math.floor(Math.random() * 4) + 3) => {
    const sentences = [];
    for (let i = 0; i < sentencesCount; i++) {
      sentences.push(generateSentence());
    }
    return sentences.join(' ');
  };

  const generateLorem = () => {
    const limit = Math.min(Math.max(count, 1), 100);
    let output = '';

    if (type === 'words') {
      const words = [];
      for (let i = 0; i < limit; i++) {
        words.push(getRandomWord());
      }
      if (startWithLorem && limit >= 5) {
        words[0] = "Lorem"; words[1] = "ipsum"; words[2] = "dolor"; words[3] = "sit"; words[4] = "amet";
      }
      output = words.join(' ');
    } else if (type === 'sentences') {
      const sentences = [];
      for (let i = 0; i < limit; i++) {
        sentences.push(generateSentence());
      }
      if (startWithLorem) {
        sentences[0] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
      }
      output = sentences.join(' ');
    } else {
      // paragraphs
      const paragraphs = [];
      for (let i = 0; i < limit; i++) {
        paragraphs.push(generateParagraph());
      }
      if (startWithLorem) {
        paragraphs[0] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " + paragraphs[0].split(' ').slice(19).join(' ');
      }
      output = paragraphs.join('\n\n');
    }

    setResult(output);
  };

  useEffect(() => {
    generateLorem();
  }, []);

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(result);
    } catch (err) {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box>
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            label="Quantity"
            type="number"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value) || 1)}
            fullWidth
            InputProps={{ inputProps: { min: 1, max: 100 } }}
          />
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              value={type}
              label="Type"
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value="paragraphs">Paragraphs</MenuItem>
              <MenuItem value="sentences">Sentences</MenuItem>
              <MenuItem value="words">Words</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ mb: 3 }}>
          <FormControlLabel
            control={<Checkbox checked={startWithLorem} onChange={(e) => setStartWithLorem(e.target.checked)} />}
            label="Start with 'Lorem ipsum dolor sit amet...'"
          />
        </Box>

        <Button variant="contained" onClick={generateLorem} fullWidth size="large" startIcon={<RefreshIcon />}>
          Generate Lorem Ipsum
        </Button>
      </Box>

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" fontWeight="600">Generated Text:</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyResult}>
            Copy All
          </Button>
        </Box>
        
        <Paper sx={{ p: 2, bgcolor: 'background.default', border: '1px solid', borderColor: 'divider', minHeight: 300, maxHeight: 600, overflow: 'auto' }}>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', color: 'text.secondary', fontFamily: 'serif', fontSize: '1.1rem', lineHeight: 1.6 }}>
            {result}
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

const LoremIpsumGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">What is Lorem Ipsum?</Typography>
      <Typography variant="body1">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has been the industry's standard dummy text ever since the 1500s. It is used to demonstrate the visual form of a document or a typeface without relying on meaningful content.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Lorem Ipsum Generator"
      description="Generate standard dummy text for UI testing, mockups, and wireframes. Free online Lorem Ipsum placeholder text generator."
      url="/tools/lorem-ipsum-generator"
      content={content}
      category="Tools"
    >
      <LoremIpsumGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default LoremIpsumGenerator;
