'use client';

import { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const AcronymGeneratorContent = () => {
  const [text, setText] = useState('');
  const [acronym, setAcronym] = useState('');

  const generateAcronym = () => {
    if (!text.trim()) {
      setAcronym('');
      return;
    }

    // Ignore stop words in acronym generation like 'and', 'or', 'of', 'the'
    const stopwords = ['and', 'or', 'of', 'the', 'a', 'an', 'in', 'on', 'at', 'for', 'to', 'with'];
    
    const words = text
      .replace(/[^a-zA-Z\s]/g, '') // Remove punctuation
      .split(/\s+/)
      .filter(w => w.length > 0 && !stopwords.includes(w.toLowerCase()));

    const result = words.map(word => word[0].toUpperCase()).join('');
    setAcronym(result);
  };

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(acronym);
    } catch (err) {}
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box>
        <TextField
          label="Enter Phrase or Title"
          placeholder="e.g. National Aeronautics and Space Administration"
          value={text}
          onChange={(e) => setText(e.target.value)}
          fullWidth
          sx={{ mb: 3 }}
        />

        <Button variant="contained" onClick={generateAcronym} size="large">
          Generate Acronym
        </Button>
      </Box>

      {acronym && (
        <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'background.default', border: '1px solid', borderColor: 'divider' }}>
          <Typography variant="h3" sx={{ fontWeight: 800, letterSpacing: '0.1em', mb: 2, color: 'primary.main' }}>
            {acronym}
          </Typography>
          <Button variant="outlined" startIcon={<ContentCopyIcon />} onClick={copyResult}>
            Copy Acronym
          </Button>
        </Paper>
      )}
    </Box>
  );
};

const AcronymGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">What is an Acronym Generator?</Typography>
      <Typography variant="body1">
        This tool takes a long phrase or title (like "World Health Organization") and converts it into a concise acronym ("WHO"). It automatically ignores common stop words like "and", "the", and "of" to produce cleaner acronyms.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Acronym Generator"
      description="Instantly convert phrases or titles into acronyms. Free online abbreviation maker."
      url="/tools/acronym-generator"
      content={content}
      category="Tools"
    >
      <AcronymGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default AcronymGenerator;
