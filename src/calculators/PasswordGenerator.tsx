'use client';

import { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, FormControlLabel, Checkbox, Slider, Paper, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RefreshIcon from '@mui/icons-material/Refresh';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const PasswordGeneratorContent = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState<number>(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const generatePassword = () => {
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    if (charset === '') {
      setPassword('Please select at least one character type.');
      return;
    }

    let result = '';
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);

    for (let i = 0; i < length; i++) {
      result += charset[array[i] % charset.length];
    }
    
    setPassword(result);
  };

  // Generate on first load
  useEffect(() => {
    generatePassword();
  }, []);

  const copyResult = async () => {
    if (password.startsWith('Please')) return;
    try {
      await navigator.clipboard.writeText(password);
    } catch (err) {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box>
        <Typography variant="subtitle1" gutterBottom>Password Length: {length}</Typography>
        <Slider
          value={length}
          onChange={(e, newValue) => setLength(newValue as number)}
          min={4}
          max={128}
          valueLabelDisplay="auto"
          sx={{ mb: 3 }}
        />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
          <FormControlLabel
            control={<Checkbox checked={includeUppercase} onChange={(e) => setIncludeUppercase(e.target.checked)} />}
            label="Include Uppercase Letters (A-Z)"
          />
          <FormControlLabel
            control={<Checkbox checked={includeLowercase} onChange={(e) => setIncludeLowercase(e.target.checked)} />}
            label="Include Lowercase Letters (a-z)"
          />
          <FormControlLabel
            control={<Checkbox checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} />}
            label="Include Numbers (0-9)"
          />
          <FormControlLabel
            control={<Checkbox checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} />}
            label="Include Symbols (!@#$%)"
          />
        </Box>

        <Button variant="contained" onClick={generatePassword} fullWidth size="large" startIcon={<RefreshIcon />}>
          Generate Password
        </Button>
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight="600" mb={1}>Generated Password:</Typography>
        <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: 'background.default', border: '1px solid', borderColor: 'divider' }}>
          <Typography variant="h5" sx={{ wordBreak: 'break-all', fontFamily: 'monospace', fontWeight: '500' }}>
            {password}
          </Typography>
          <IconButton color="primary" onClick={copyResult} title="Copy to clipboard">
            <ContentCopyIcon />
          </IconButton>
        </Paper>
      </Box>
    </Box>
  );
};

const PasswordGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to use the Password Generator?</Typography>
      <Typography variant="body1">
        Adjust the slider to choose your desired password length (up to 128 characters). Check the boxes to include uppercase, lowercase, numbers, or symbols. Click "Generate Password" to instantly create a highly secure password using secure browser cryptography (`crypto.getRandomValues`).
      </Typography>

      <Typography variant="h2">Is this tool secure?</Typography>
      <Typography variant="body1">
        Yes! This tool generates passwords entirely locally in your web browser. It does not send any data to our servers, meaning nobody (not even us) knows the passwords you generate.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Secure Password Generator"
      description="Generate strong, secure, and random passwords instantly. Client-side tool that never sends your data to any server."
      url="/tools/password-generator"
      content={content}
      category="Tools"
    >
      <PasswordGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PasswordGenerator;
