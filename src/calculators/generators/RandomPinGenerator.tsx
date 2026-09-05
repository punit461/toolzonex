'use client';

import { useEffect, useState } from 'react';
import { Box, Button, Typography, Slider, Paper, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RefreshIcon from '@mui/icons-material/Refresh';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const RandomPinGeneratorContent = () => {
  const [length, setLength] = useState<number>(4);
  const [pin, setPin] = useState<string>('');

  const generatePin = (len: number) => {
    const array = new Uint32Array(len);
    crypto.getRandomValues(array);
    let result = '';
    for (let i = 0; i < len; i++) {
      result += (array[i] % 10).toString();
    }
    setPin(result);
  };

  useEffect(() => {
    generatePin(length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLengthChange = (_: Event, value: number | number[]) => {
    const newLength = value as number;
    setLength(newLength);
    generatePin(newLength);
  };

  const copyResult = async () => {
    if (!pin) return;
    try {
      await navigator.clipboard.writeText(pin);
    } catch {
      // ignore
    }
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box>
        <Typography variant="subtitle1" gutterBottom>PIN Length: {length}</Typography>
        <Slider
          value={length}
          onChange={handleLengthChange}
          min={4}
          max={12}
          step={1}
          marks
          valueLabelDisplay="auto"
          sx={{ mb: 3 }}
        />
        <Button variant="contained" onClick={() => generatePin(length)} fullWidth size="large" startIcon={<RefreshIcon />}>
          Regenerate PIN
        </Button>
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight="600" mb={1}>Generated PIN:</Typography>
        <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="h4" sx={{ letterSpacing: 4, fontFamily: 'monospace', fontWeight: 'bold' }}>
            {pin}
          </Typography>
          <IconButton onClick={copyResult} sx={{ color: 'white' }} title="Copy to clipboard">
            <ContentCopyIcon />
          </IconButton>
        </Paper>
      </Box>
    </Box>
  );
};

const RandomPinGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Random PIN Generator</Typography>
      <Typography variant="body1">
        Choose a PIN length between 4 and 12 digits using the slider, and a random, strictly numeric PIN is
        generated instantly using <code>crypto.getRandomValues</code> — the browser&apos;s cryptographically
        secure random number source, not the weaker <code>Math.random()</code>. Click Regenerate any time for
        a fresh PIN.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        PIN = length digits, each 0-9, from crypto.getRandomValues()
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Setting the length to 6 might generate a PIN like <code>702914</code> — a purely numeric code with no
        letters or symbols, generated fresh every time you click Regenerate.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Choosing a random PIN for a phone lock screen, door code, or safe combination.</li>
          <li>Generating a numeric verification or access code for testing an app or form.</li>
          <li>Creating a temporary PIN to share before switching to a permanent one.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Password Generator?</strong> The Password Generator creates longer, mixed-character passwords that can include uppercase and lowercase letters, numbers, and symbols — built for account security. This Random PIN Generator is strictly numeric and shorter (4-12 digits), matching the format required by PIN-style use cases like device unlock codes, safe combinations, or numeric access codes, where only digits are accepted.</li>
          <li><strong>Is this PIN generator secure?</strong> Yes — it uses <code>crypto.getRandomValues</code>, the same cryptographically secure randomness source used by security-focused tools, rather than <code>Math.random()</code>, which is not suitable for anything security-related. Everything runs locally in your browser; no PIN is ever sent anywhere.</li>
          <li><strong>What's the most secure PIN length?</strong> Longer is generally more secure against guessing — a 4-digit PIN has only 10,000 possible combinations, while a 6-digit PIN has 1,000,000. Use the longest PIN length your device or system allows for better protection.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/random-pin-generator" content={content}>
      <RandomPinGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RandomPinGenerator;
