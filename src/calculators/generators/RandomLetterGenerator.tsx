'use client';

import { useState } from 'react';
import { Box, Button, Typography, Paper, IconButton, TextField, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RefreshIcon from '@mui/icons-material/Refresh';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type CaseOption = 'upper' | 'lower' | 'mixed';

const RandomLetterGeneratorContent = () => {
  const [letters, setLetters] = useState('');
  const [count, setCount] = useState(20);
  const [caseOption, setCaseOption] = useState<CaseOption>('mixed');
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const n = Math.min(Math.max(count, 1), 1000);
    let pool = '';
    if (caseOption === 'upper' || caseOption === 'mixed') pool += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (caseOption === 'lower' || caseOption === 'mixed') pool += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) pool += '0123456789';

    let result = '';
    const arr = new Uint32Array(n);
    crypto.getRandomValues(arr);
    for (let i = 0; i < n; i++) {
      result += pool[arr[i] % pool.length];
    }
    setLetters(result);
    setCopied(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(letters);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
        <TextField
          label="Number of Characters"
          type="number"
          value={count}
          onChange={(e) => setCount(parseInt(e.target.value) || 1)}
          InputProps={{ inputProps: { min: 1, max: 1000 } }}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Case</InputLabel>
          <Select value={caseOption} label="Case" onChange={(e) => setCaseOption(e.target.value as CaseOption)}>
            <MenuItem value="upper">Uppercase (A-Z)</MenuItem>
            <MenuItem value="lower">Lowercase (a-z)</MenuItem>
            <MenuItem value="mixed">Mixed (A-Z + a-z)</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <FormControlLabel
        control={<Checkbox checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} />}
        label="Include Numbers (0-9)"
      />

      <Button variant="contained" onClick={generate} size="large" startIcon={<RefreshIcon />}>
        Generate Random Letters
      </Button>

      {letters && (
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle1" fontWeight={600}>Generated ({letters.length} characters)</Typography>
            <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyToClipboard}>
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </Box>
          <Paper sx={{ p: 2, bgcolor: 'grey.50', fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-all', overflow: 'auto', maxHeight: 200 }}>
            {letters}
          </Paper>
        </Paper>
      )}
    </Box>
  );
};

const RandomLetterGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Random Letter Generator</Typography>
      <Typography variant="body1">
        Set the number of characters you need, choose uppercase, lowercase, or mixed case, and optionally include numbers. Click &quot;Generate&quot; to produce cryptographically secure random characters instantly.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Generating 10 mixed-case letters might produce <code>xKqRmBwZtYn</code>. Each generation uses the browser&apos;s crypto API for secure randomness.
      </Typography>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Is this truly random?</strong> Yes — the tool uses the Web Crypto API (crypto.getRandomValues) which provides cryptographically secure random numbers.</li>
          <li><strong>What&apos;s the maximum I can generate?</strong> You can generate up to 1,000 characters at once.</li>
          <li><strong>Can I generate random letters and numbers?</strong> Yes — check the &quot;Include Numbers&quot; option to add digits 0-9 to the character pool.</li>
        </ul>
      </Box>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Generating random codes, tokens, or identifiers for testing.</li>
          <li>Creating placeholder text or random strings for development.</li>
          <li>Generating random characters for password or CAPTCHA prototyping.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/random-letter-generator" content={content}>
      <RandomLetterGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RandomLetterGenerator;
