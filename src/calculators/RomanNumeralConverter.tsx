'use client';

import { useState } from 'react';
import { Box, Typography, TextField, Paper, Button, Divider, IconButton } from '@mui/material';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const RomanNumeralConverterContent = () => {
  const [numberInput, setNumberInput] = useState<string>('2024');
  const [romanInput, setRomanInput] = useState<string>('MMXXIV');
  const [mode, setMode] = useState<'numToRom' | 'romToNum'>('numToRom');
  const [copied, setCopied] = useState(false);

  const numToRom = (num: number): string => {
    if (isNaN(num) || num < 1 || num > 3999) return 'Number must be between 1 and 3999';
    const lookup: Record<string, number> = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1};
    let roman = '', i;
    for (i in lookup) {
      while (num >= lookup[i]) {
        roman += i;
        num -= lookup[i];
      }
    }
    return roman;
  };

  const romToNum = (roman: string): string => {
    roman = roman.toUpperCase();
    if (!/^[MDCLXVI]+$/.test(roman)) return 'Invalid Roman Numeral';
    const lookup: Record<string, number> = {M:1000,D:500,C:100,L:50,X:10,V:5,I:1};
    let num = 0;
    for (let i = 0; i < roman.length; i++) {
      if (lookup[roman[i]] < lookup[roman[i+1]]) {
        num -= lookup[roman[i]];
      } else {
        num += lookup[roman[i]];
      }
    }
    return num.toString();
  };

  const handleNumChange = (val: string) => {
    setMode('numToRom');
    setNumberInput(val);
    const num = parseInt(val, 10);
    setRomanInput(numToRom(num));
  };

  const handleRomChange = (val: string) => {
    setMode('romToNum');
    setRomanInput(val.toUpperCase());
    setNumberInput(romToNum(val));
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 600, mx: 'auto' }}>
      
      <Paper variant="outlined" sx={{ p: 4, bgcolor: '#f8fafc', display: 'flex', flexDirection: 'column', gap: 2 }}>
        
        <Box sx={{ position: 'relative' }}>
          <Typography variant="subtitle2" mb={1} color="text.secondary">Number (1-3999)</Typography>
          <TextField
            value={mode === 'numToRom' ? numberInput : numberInput.includes('Invalid') ? '' : numberInput}
            onChange={(e) => handleNumChange(e.target.value)}
            fullWidth
            type="number"
            placeholder="e.g. 2024"
            inputProps={{ style: { fontSize: '2rem', textAlign: 'center', fontWeight: 'bold' } }}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', my: 1 }}>
          <SwapVertIcon color="primary" fontSize="large" />
        </Box>

        <Box sx={{ position: 'relative' }}>
          <Typography variant="subtitle2" mb={1} color="text.secondary">Roman Numeral</Typography>
          <TextField
            value={mode === 'romToNum' ? romanInput : romanInput.includes('must be') ? '' : romanInput}
            onChange={(e) => handleRomChange(e.target.value)}
            fullWidth
            placeholder="e.g. MMXXIV"
            inputProps={{ style: { fontSize: '2rem', textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase' } }}
          />
        </Box>

      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button 
          variant="contained" 
          size="large"
          color={copied ? "success" : "primary"}
          startIcon={<ContentCopyIcon />}
          onClick={() => handleCopy(mode === 'numToRom' ? romanInput : numberInput)}
        >
          {copied ? 'Copied to Clipboard!' : 'Copy Result'}
        </Button>
      </Box>

    </Box>
  );
};

const RomanNumeralConverter = () => {
  const content = (
    <>
      <Typography variant="h2">Roman Numeral Converter</Typography>
      <Typography variant="body1">
        Convert numbers to Roman numerals or translate Roman numerals back to standard numbers. This bi-directional tool works instantly and supports numbers between 1 and 3999.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Roman Numeral Converter - Numbers to Roman Numerals"
      description="Convert numbers to Roman numerals and vice versa instantly. Free online roman numeral translator."
      url="/utilities/roman-numeral-converter"
      content={content}
      category="Utilities"
    >
      <RomanNumeralConverterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RomanNumeralConverter;
