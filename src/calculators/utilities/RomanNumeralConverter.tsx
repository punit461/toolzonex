'use client';

import { useState } from 'react';
import { Box, Typography, TextField, Paper, Button, Divider, IconButton } from '@mui/material';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

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
      
      <Paper variant="outlined" sx={{ p: 4, bgcolor: 'action.hover', display: 'flex', flexDirection: 'column', gap: 2 }}>
        
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
        Convert a number to Roman numerals, or convert Roman numerals back to regular (Arabic) numbers — this
        tool works as both a <strong>number to roman numeral converter</strong> and a{' '}
        <strong>roman numeral to number converter</strong> at the same time. It&apos;s fully bi-directional: type
        into either field and the other updates instantly. It supports whole numbers between 1 and 3999, the
        range the classical Roman numeral system can represent.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        To convert a number to roman numerals, type a whole number (1-3999) into the &quot;Number&quot; field —
        the Roman numeral translation appears instantly below it. To go the other way and translate roman
        numerals to english (regular numbers), type letters like &quot;MCMXCIV&quot; into the &quot;Roman
        Numeral&quot; field and the equivalent number appears instantly above it. There&apos;s no need to switch
        modes — the calculator detects which field you&apos;re typing in and converts automatically in that
        direction.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Converting a number to roman numerals: the number 1994 converts to &quot;MCMXCIV&quot;, and 2024
        converts to &quot;MMXXIV&quot;. Converting roman numerals to numbers (the reverse direction): &quot;MCMXCIV&quot;
        translates back to 1994, and &quot;XIV&quot; translates to the regular number 14.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Converting a birth year, wedding date, or anniversary into Roman numerals for an engraving, tattoo, or gift.</li>
          <li>Translating a Roman numeral date on a ring, monument, clock face, or movie credit back into a regular number you can actually read.</li>
          <li>Converting numbers for stylistic use in titles, chapter headings, or Super Bowl/Olympic-style event numbering.</li>
          <li>Checking homework or quiz answers that ask you to convert numbers to Roman numerals or vice versa.</li>
          <li>Looking up what a specific Roman numeral, like &quot;XL&quot; or &quot;MCM&quot;, means in ordinary numbers.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How do I convert a number to Roman numerals?</Typography>
      <Typography variant="body1">
        Type your number into the &quot;Number&quot; field (any whole number from 1 to 3999) and the Roman
        numeral translation appears immediately in the &quot;Roman Numeral&quot; field below — no extra steps
        or button presses needed.
      </Typography>
      <Typography variant="h3">Can I convert Roman numerals back to regular numbers with this tool?</Typography>
      <Typography variant="body1">
        Yes — this tool converts in both directions. Type the Roman numeral (like &quot;MCMXCIV&quot; or
        &quot;XIV&quot;) into the &quot;Roman Numeral&quot; field and the regular (decimal) number appears
        instantly in the &quot;Number&quot; field — this is the same as translating Roman numerals to English
        or converting a Roman number to an English number.
      </Typography>
      <Typography variant="h3">What is the Roman numeral for 2024?</Typography>
      <Typography variant="body1">
        2024 in Roman numerals is &quot;MMXXIV&quot; (M + M + XX + IV = 1000 + 1000 + 20 + 4). You can enter any
        year into the Number field to see its Roman numeral equivalent the same way.
      </Typography>
      <Typography variant="h3">Why is there no number for zero in Roman numerals?</Typography>
      <Typography variant="body1">
        The classical Roman numeral system had no symbol for zero, which is why this converter supports whole
        numbers from 1 to 3999.
      </Typography>
      <Typography variant="h3">What&apos;s the largest number I can convert to Roman numerals?</Typography>
      <Typography variant="body1">
        This converter supports numbers up to 3999 (MMMCMXCIX), which is the practical limit of standard Roman
        numeral notation without adding special overline symbols for larger values.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      url="/utilities/roman-numeral-converter"
      content={content}
    >
      <RomanNumeralConverterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RomanNumeralConverter;
