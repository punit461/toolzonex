'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Op = '+' | '-' | '*' | '/';

const operators: Op[] = ['+', '-', '*', '/'];

function toHex(n: number): string {
  if (n < 0) return '-' + toHex(-n);
  return '0x' + n.toString(16).toUpperCase();
}

function toOct(n: number): string {
  if (n < 0) return '-' + toOct(-n);
  return '0o' + n.toString(8);
}

function toBin(n: number): string {
  if (n < 0) return '-' + toBin(-n);
  return n.toString(2);
}

const BinaryCalculator = () => {
  const [inputA, setInputA] = useState<string>('1010');
  const [inputB, setInputB] = useState<string>('110');
  const [op, setOp] = useState<Op>('+');

  const { result, decA, decB, error } = useMemo(() => {
    const a = parseInt(inputA.replace(/^0+/, '') || '0', 2);
    const b = parseInt(inputB.replace(/^0+/, '') || '0', 2);
    const decA = isNaN(a) ? 0 : a;
    const decB = isNaN(b) ? 0 : b;

    let result: number | null = null;
    let error = '';

    switch (op) {
      case '+': result = decA + decB; break;
      case '-': result = decA - decB; break;
      case '*': result = decA * decB; break;
      case '/':
        if (decB === 0) {
          error = 'Cannot divide by zero';
          result = null;
        } else {
          result = decA / decB;
        }
        break;
    }

    return { result, decA, decB, error };
  }, [inputA, inputB, op]);

  const content = (
    <>
      <Typography variant="h2">How the Binary Calculator Works</Typography>
      <Typography variant="body1">
        This calculator lets you perform arithmetic directly on binary (base-2) numbers. Enter two binary
        strings using only 0s and 1s, choose an operation, and the result is shown in binary, decimal,
        hexadecimal, and octal — along with a decimal conversion of each input for reference.
      </Typography>
      <Typography variant="body1">
        Binary arithmetic follows the same rules as decimal, but carries happen at 2 instead of 10. The
        calculator converts your inputs to integers internally, performs the operation, and converts back to all
        common bases.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        1010 (binary for 10) + 110 (binary for 6) = 10000 (binary for 16). In hex: 0xA + 0x6 = 0x10. In octal:
        0o12 + 0o6 = 0o20.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Learning how binary arithmetic works in computer science courses.</li>
          <li>Verifying manual binary addition, subtraction, multiplication, or division.</li>
          <li>Quick conversion between binary, decimal, hex, and octal representations.</li>
          <li>Debugging bitwise operations in programming.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What if I enter invalid binary digits?</Typography>
      <Typography variant="body1">
        Only 0s and 1s are valid in binary. If you enter other digits (like 2 or 3), they will be ignored and
        the result will reflect only the valid binary digits in order.
      </Typography>
      <Typography variant="h3">Can I divide binary numbers?</Typography>
      <Typography variant="body1">
        Yes — division is supported. If the result is not a whole number, the decimal value is shown (e.g.
        1010 ÷ 11 = 11.1 in binary, which is 10 ÷ 3 ≈ 3.3333 in decimal).
      </Typography>
      <Typography variant="h3">Why show the result in multiple bases?</Typography>
      <Typography variant="body1">
        Different bases are useful in different contexts: binary for low-level computing, hex for memory
        addresses and color codes, octal for Unix file permissions, and decimal for everyday use.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/binary-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <TextField
            fullWidth
            label="Binary A"
            value={inputA}
            onChange={(e) => setInputA(e.target.value.replace(/[^01]/g, ''))}
            placeholder="e.g. 1010"
            sx={{ mb: 3 }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <ToggleButtonGroup
              value={op}
              exclusive
              onChange={(_, v) => v && setOp(v)}
              size="small"
            >
              {operators.map((o) => (
                <ToggleButton key={o} value={o} sx={{ minWidth: 48, fontFamily: 'monospace', fontWeight: 700 }}>
                  {o}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>

          <TextField
            fullWidth
            label="Binary B"
            value={inputB}
            onChange={(e) => setInputB(e.target.value.replace(/[^01]/g, ''))}
            placeholder="e.g. 110"
          />

          <Box sx={{ mt: 3, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
            <Box sx={{ p: 1.5, bgcolor: 'action.hover', borderRadius: 1 }}>
              <Typography variant="caption" color="text.secondary">A = {decA}</Typography>
            </Box>
            <Box sx={{ p: 1.5, bgcolor: 'action.hover', borderRadius: 1 }}>
              <Typography variant="caption" color="text.secondary">B = {decB}</Typography>
            </Box>
          </Box>
        </Box>

        <Box>
          <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2 }}>
            {error ? (
              <Typography variant="h6" color="error" textAlign="center">{error}</Typography>
            ) : result !== null ? (
              <>
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <Typography variant="h6" color="text.secondary" gutterBottom>Result</Typography>
                  <Typography variant="h3" sx={{ fontWeight: 800, color: 'primary.main', fontFamily: 'monospace' }}>
                    {toBin(result)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
                  <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                    <Typography variant="caption" color="text.secondary">Decimal</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>{Number.isInteger(result) ? result : result.toFixed(4)}</Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                    <Typography variant="caption" color="text.secondary">Hexadecimal</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600, fontFamily: 'monospace' }}>
                      {Number.isInteger(result) ? toHex(result) : '—'}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                    <Typography variant="caption" color="text.secondary">Octal</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600, fontFamily: 'monospace' }}>
                      {Number.isInteger(result) ? toOct(result) : '—'}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                    <Typography variant="caption" color="text.secondary">Binary</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600, fontFamily: 'monospace' }}>{toBin(result)}</Typography>
                  </Box>
                </Box>
              </>
            ) : (
              <Typography variant="body1" color="text.secondary" textAlign="center">Enter binary numbers to compute</Typography>
            )}
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BinaryCalculator;
