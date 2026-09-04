'use client';

import { useMemo, useState } from 'react';
import { Box, Typography, TextField, Paper, Button } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function numberToRoman(num: number): string {
  if (!Number.isInteger(num) || num < 1 || num > 3999) return '';
  const lookup: [string, number][] = [
    ['M', 1000], ['CM', 900], ['D', 500], ['CD', 400], ['C', 100], ['XC', 90],
    ['L', 50], ['XL', 40], ['X', 10], ['IX', 9], ['V', 5], ['IV', 4], ['I', 1],
  ];
  let result = '';
  let remaining = num;
  for (const [symbol, value] of lookup) {
    while (remaining >= value) {
      result += symbol;
      remaining -= value;
    }
  }
  return result;
}

const RomanNumeralGeneratorContent = () => {
  const [input, setInput] = useState('2024');
  const [copied, setCopied] = useState(false);

  const num = parseInt(input, 10);
  const roman = useMemo(() => numberToRoman(num), [num]);
  const isValid = input.trim() !== '' && !Number.isNaN(num) && num >= 1 && num <= 3999;

  const handleCopy = () => {
    if (!roman) return;
    navigator.clipboard.writeText(roman);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 500, mx: 'auto' }}>
      <TextField
        label="Number (1-3999)"
        type="number"
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="e.g. 2024"
        inputProps={{ style: { fontSize: '1.5rem', textAlign: 'center' } }}
      />

      <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', bgcolor: 'action.hover' }}>
        {isValid ? (
          <Typography variant="h2" fontWeight={800} sx={{ fontSize: { xs: '2.5rem', sm: '3.5rem' }, letterSpacing: 2 }}>
            {roman}
          </Typography>
        ) : (
          <Typography variant="body1" color="text.secondary">Enter a whole number between 1 and 3999</Typography>
        )}
      </Paper>

      <Button
        variant="contained"
        size="large"
        color={copied ? 'success' : 'primary'}
        startIcon={<ContentCopyIcon />}
        onClick={handleCopy}
        disabled={!isValid}
      >
        {copied ? 'Copied to Clipboard!' : 'Copy Roman Numeral'}
      </Button>
    </Box>
  );
};

const RomanNumeralGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">Roman Numeral Generator</Typography>
      <Typography variant="body1">
        Type a number and instantly generate its Roman numeral. This is a focused, one-way number-to-Roman-numeral
        tool — enter a whole number between 1 and 3999 (the practical range of the classical Roman numeral
        system) and get its Roman numeral translation right away.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Type a whole number into the field — the generated Roman numeral appears instantly below it. Click
        "Copy Roman Numeral" to grab the result for engravings, titles, or anywhere else you need it.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Entering 1994 generates "MCMXCIV", and entering 2024 generates "MMXXIV" (M + M + XX + IV = 1000 + 1000
        + 20 + 4).
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Generating a Roman numeral for a birth year, wedding date, or anniversary engraving or tattoo.</li>
          <li>Creating Roman numeral chapter headings, movie sequel titles, or event numbering (Super Bowl-style).</li>
          <li>Quickly generating a Roman numeral without needing to also convert numerals back to numbers.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is the Roman numeral for 2024?</Typography>
      <Typography variant="body1">
        2024 in Roman numerals is "MMXXIV". Enter any year into the field above to generate its Roman numeral
        equivalent the same way.
      </Typography>
      <Typography variant="h3">Can I also convert Roman numerals back to numbers with this tool?</Typography>
      <Typography variant="body1">
        This generator is one-directional — number to Roman numeral only, for a simpler, faster experience. If
        you need to convert Roman numerals back into regular numbers too, use our bi-directional Roman Numeral
        Converter instead.
      </Typography>
      <Typography variant="h3">What's the largest number I can generate a Roman numeral for?</Typography>
      <Typography variant="body1">
        This generator supports numbers up to 3999 (MMMCMXCIX), the practical limit of standard Roman numeral
        notation without adding special overline symbols for larger values.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/roman-numeral-generator" content={content}>
      <RomanNumeralGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RomanNumeralGenerator;
