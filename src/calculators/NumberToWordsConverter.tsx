'use client';

import { useState } from 'react';
import { Box, Typography, TextField, Paper, Button } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const NumberToWordsConverterContent = () => {
  const [numberInput, setNumberInput] = useState<string>('1234567');
  const [copied, setCopied] = useState(false);

  const numberToWords = (numStr: string): string => {
    let num = parseInt(numStr.replace(/,/g, ''), 10);
    if (isNaN(num)) return '';
    if (num === 0) return 'zero';

    const a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
    const b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

    if (num < 0) return 'negative ' + numberToWords(Math.abs(num).toString());

    if (num.toString().length > 15) return 'Number too large'; // limit to trillions

    const n = ('00000000000000000000' + num).substr(-20).match(/^(\d{2})(\d{3})(\d{3})(\d{3})(\d{3})(\d{3})(\d{2})$/);
    if (!n) return '';
    
    let str = '';
    str += (Number(n[1]) != 0) ? (a[Number(n[1])] || b[n[1][0] as any] + ' ' + a[n[1][1] as any]) + 'hundred thousand million ' : ''; 
    str += (Number(n[2]) != 0) ? (a[Number(n[2])] || b[n[2][0] as any] + ' ' + a[n[2][1] as any]) + 'quadrillion ' : '';
    str += (Number(n[3]) != 0) ? (a[Number(n[3])] || b[n[3][0] as any] + ' ' + a[n[3][1] as any]) + 'trillion ' : '';
    str += (Number(n[4]) != 0) ? (a[Number(n[4])] || b[n[4][0] as any] + ' ' + a[n[4][1] as any]) + 'billion ' : '';
    str += (Number(n[5]) != 0) ? (a[Number(n[5])] || b[n[5][0] as any] + ' ' + a[n[5][1] as any]) + 'million ' : '';
    str += (Number(n[6]) != 0) ? (a[Number(n[6])] || b[n[6][0] as any] + ' ' + a[n[6][1] as any]) + 'thousand ' : '';
    str += (Number(n[7]) != 0) ? (a[Number(n[7])] || b[n[7][0] as any] + ' ' + a[n[7][1] as any]) : '';

    return str.trim();
  };

  // Convert num using standard short scale
  // Actually the above regex is very flawed for standard reading (it reads n[7] as single/tens).
  // Let's write a standard short scale converter.

  const convertShortScale = (num: number): string => {
    if (num === 0) return 'zero';
    if (num < 0) return 'negative ' + convertShortScale(Math.abs(num));
    if (num >= 1e15) return 'Number is too large';

    const a = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    const scales = ['', 'thousand', 'million', 'billion', 'trillion'];

    const convertHundreds = (n: number): string => {
      let str = '';
      if (n > 99) {
        str += a[Math.floor(n / 100)] + ' hundred ';
        n %= 100;
      }
      if (n > 0) {
        if (n < 20) {
          str += a[n] + ' ';
        } else {
          str += b[Math.floor(n / 10)] + ' ';
          if (n % 10 > 0) {
            str += a[n % 10] + ' ';
          }
        }
      }
      return str.trim();
    };

    let result = '';
    let scaleIdx = 0;
    while (num > 0) {
      let chunk = num % 1000;
      if (chunk > 0) {
        result = convertHundreds(chunk) + (scales[scaleIdx] ? ' ' + scales[scaleIdx] : '') + ' ' + result;
      }
      num = Math.floor(num / 1000);
      scaleIdx++;
    }

    return result.trim();
  };

  const cleanNum = parseInt(numberInput.replace(/,/g, ''), 10);
  const words = isNaN(cleanNum) ? '' : convertShortScale(cleanNum);

  const handleCopy = () => {
    navigator.clipboard.writeText(words);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      
      {/* Input Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Enter a Number"
          value={numberInput}
          onChange={(e) => setNumberInput(e.target.value.replace(/[^0-9,-]/g, ''))}
          fullWidth
          placeholder="e.g. 123456"
          inputProps={{ style: { fontSize: '1.5rem', padding: '16px' } }}
        />
        <Typography variant="body2" color="text.secondary">
          Supports numbers up to 999 trillion.
        </Typography>
      </Box>

      {/* Output Panel */}
      <Box>
        <Paper variant="outlined" sx={{ p: 0, overflow: 'hidden', height: '100%', minHeight: 200, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Words</Typography>
            <Button 
              variant="contained" 
              color={copied ? "success" : "inherit"}
              size="small"
              startIcon={<ContentCopyIcon />}
              onClick={handleCopy}
              disabled={!words}
              sx={{ color: copied ? 'white' : 'primary.main', bgcolor: copied ? 'success.main' : 'white' }}
            >
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </Box>
          <Box sx={{ p: 4, flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f8fafc' }}>
            <Typography variant="h5" sx={{ textTransform: 'capitalize', textAlign: 'center', fontWeight: 'medium' }}>
              {words || 'Please enter a valid number'}
            </Typography>
          </Box>
        </Paper>
      </Box>

    </Box>
  );
};

const NumberToWordsConverter = () => {
  const content = (
    <>
      <Typography variant="h2">Number to Words Converter</Typography>
      <Typography variant="body1">
        Instantly convert any number into standard English words. Useful for writing checks, filling out legal documents, or just finding out how to pronounce extremely large numbers (up to the trillions).
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Number to Words Converter - Write Numbers in English"
      description="Convert any number to English words instantly. Perfect for writing checks, legal documents, and large numbers."
      url="/utilities/number-to-words-converter"
      content={content}
      category="Utilities"
    >
      <NumberToWordsConverterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default NumberToWordsConverter;
