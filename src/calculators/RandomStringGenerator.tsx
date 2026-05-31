'use client';

import { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, FormControlLabel, Checkbox, Paper } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RefreshIcon from '@mui/icons-material/Refresh';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const RandomStringGeneratorContent = () => {
  const [strings, setStrings] = useState<string[]>([]);
  const [length, setLength] = useState(16);
  const [count, setCount] = useState(5);
  
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [customChars, setCustomChars] = useState('');

  const generateStrings = () => {
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    if (customChars) charset += customChars;

    if (charset === '') {
      setStrings(['Please select at least one character set.']);
      return;
    }

    const newStrings = [];
    const amount = Math.min(Math.max(count, 1), 1000);
    const strLen = Math.min(Math.max(length, 1), 1000);

    for (let i = 0; i < amount; i++) {
      let result = '';
      const array = new Uint32Array(strLen);
      crypto.getRandomValues(array);
      
      for (let j = 0; j < strLen; j++) {
        result += charset[array[j] % charset.length];
      }
      newStrings.push(result);
    }
    
    setStrings(newStrings);
  };

  useEffect(() => {
    generateStrings();
  }, []);

  const copyAll = async () => {
    if (strings[0]?.startsWith('Please')) return;
    try {
      await navigator.clipboard.writeText(strings.join('\n'));
    } catch (err) {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box>
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            label="String Length"
            type="number"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value) || 1)}
            fullWidth
            InputProps={{ inputProps: { min: 1, max: 1000 } }}
          />
          <TextField
            label="Quantity"
            type="number"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value) || 1)}
            fullWidth
            InputProps={{ inputProps: { min: 1, max: 1000 } }}
          />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
          <FormControlLabel
            control={<Checkbox checked={includeUppercase} onChange={(e) => setIncludeUppercase(e.target.checked)} />}
            label="Uppercase Letters (A-Z)"
          />
          <FormControlLabel
            control={<Checkbox checked={includeLowercase} onChange={(e) => setIncludeLowercase(e.target.checked)} />}
            label="Lowercase Letters (a-z)"
          />
          <FormControlLabel
            control={<Checkbox checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} />}
            label="Numbers (0-9)"
          />
          <FormControlLabel
            control={<Checkbox checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} />}
            label="Symbols (!@#$%)"
          />
        </Box>
        
        <TextField
          label="Custom Characters (Optional)"
          placeholder="e.g. ABC123"
          value={customChars}
          onChange={(e) => setCustomChars(e.target.value)}
          fullWidth
          sx={{ mb: 3 }}
        />

        <Button variant="contained" onClick={generateStrings} fullWidth size="large" startIcon={<RefreshIcon />}>
          Generate Strings
        </Button>
      </Box>

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" fontWeight="600">Generated Strings:</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyAll}>
            Copy All
          </Button>
        </Box>
        
        <TextField
          value={strings.join('\n')}
          multiline
          rows={14}
          fullWidth
          InputProps={{ readOnly: true, sx: { fontFamily: 'monospace' } }}
        />
      </Box>
    </Box>
  );
};

const RandomStringGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to generate random strings?</Typography>
      <Typography variant="body1">
        Specify the length of the string you want, how many strings you need, and the types of characters to include (uppercase, lowercase, numbers, or symbols). You can even add a custom character set to restrict generation entirely to your specific letters. Click Generate to produce them instantly.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Random String Generator"
      description="Generate random alphanumeric strings securely online. Free bulk random text generator."
      url="/tools/random-string-generator"
      content={content}
      category="Tools"
    >
      <RandomStringGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RandomStringGenerator;
