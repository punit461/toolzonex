'use client';

import { useState } from 'react';
import { Box, Typography, TextField, Paper, Button } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

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

  const digitWords = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

  const convertToWords = (input: string): string => {
    const cleaned = input.replace(/,/g, '');
    const [wholePart, decimalPart] = cleaned.split('.');

    const whole = wholePart === '' || wholePart === '-' ? 0 : parseInt(wholePart, 10);
    if (isNaN(whole)) return '';

    let result = convertShortScale(whole);
    if (decimalPart !== undefined) {
      if (decimalPart === '') return result;
      const decimalWords = decimalPart.split('').map((d) => digitWords[Number(d)]).join(' ');
      result += ' point ' + decimalWords;
    }
    return result;
  };

  const words = convertToWords(numberInput);

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
          onChange={(e) => {
            const cleaned = e.target.value.replace(/[^0-9,.-]/g, '');
            const firstDot = cleaned.indexOf('.');
            const sanitized = firstDot === -1
              ? cleaned
              : cleaned.slice(0, firstDot + 1) + cleaned.slice(firstDot + 1).replace(/\./g, '');
            setNumberInput(sanitized);
          }}
          fullWidth
          placeholder="e.g. 123456 or 367.5"
          inputProps={{ style: { fontSize: '1.5rem', padding: '16px' } }}
        />
        <Typography variant="body2" color="text.secondary">
          Supports whole numbers up to 999 trillion, plus decimals (e.g. 367.5).
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
          <Box sx={{ p: 4, flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'action.hover' }}>
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
        Instantly convert any whole number into standard English words — the same as writing numbers in words,
        spelling numbers out in letters, or converting an amount into words for a check. Useful for writing
        checks, filling out legal or financial documents, double-checking homework, or just finding out how to
        pronounce extremely large numbers (up to the trillions).
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Type any whole number into the input field — with or without comma separators — and the English words
        spelling it out appear instantly on the right. This works for small numbers like 24 as well as large
        ones like 518,500 or 23,698.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Entering 1,024 converts to &quot;one thousand twenty-four&quot;, ready to paste onto a check or legal
        document. A few more worked examples: <strong>23,698</strong> in words is &quot;twenty-three thousand,
        six hundred ninety-eight&quot;. <strong>518,500</strong> in words is &quot;five hundred eighteen
        thousand, five hundred&quot;. <strong>10,795</strong> in words is &quot;ten thousand, seven hundred
        ninety-five&quot;.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Writing out the amount in words on a check, e.g. spelling out &quot;518,500&quot; as &quot;five hundred eighteen thousand, five hundred&quot;.</li>
          <li>Filling legal or financial documents that require numbers spelled out in letters instead of digits.</li>
          <li>Converting an invoice or contract total into words to match the numeric amount.</li>
          <li>Checking how to say or pronounce a large number, like a big population or budget figure.</li>
          <li>Helping students learn how numbers are written out in English words.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How do I convert a number to words in English?</Typography>
      <Typography variant="body1">
        Type the number into the input field (digits only, commas are fine) and the English word form appears
        immediately in the results panel — no button press needed. This works the same whether you think of it
        as converting a number to words, writing a number in letters, or spelling a number out.
      </Typography>
      <Typography variant="h3">What is 23,698 in words?</Typography>
      <Typography variant="body1">
        23,698 in words is &quot;twenty-three thousand, six hundred ninety-eight&quot;.
      </Typography>
      <Typography variant="h3">What is 518,500 in words?</Typography>
      <Typography variant="body1">
        518,500 in words is &quot;five hundred eighteen thousand, five hundred&quot;.
      </Typography>
      <Typography variant="h3">What is 10,795 in words?</Typography>
      <Typography variant="body1">
        10,795 in words is &quot;ten thousand, seven hundred ninety-five&quot;.
      </Typography>
      <Typography variant="h3">Does this tool convert decimal numbers, like 367.5, to words?</Typography>
      <Typography variant="body1">
        Yes — enter a decimal point and the digits after it are read out individually, the standard way decimals
        are spoken. <strong>367.5</strong> in words is &quot;three hundred sixty-seven point five&quot;.
      </Typography>
      <Typography variant="h3">What&apos;s the largest number this can convert?</Typography>
      <Typography variant="body1">
        The converter supports whole numbers up into the trillions (just under 1 quadrillion).
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      url="/utilities/number-to-words-converter"
      content={content}
    >
      <NumberToWordsConverterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default NumberToWordsConverter;
