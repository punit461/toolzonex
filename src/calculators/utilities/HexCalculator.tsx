'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const HexCalculatorContent = () => {
  const [hexA, setHexA] = useState<string>('1A');
  const [hexB, setHexB] = useState<string>('2F');
  const [operation, setOperation] = useState<string>('+');

  const parseHex = (hex: string): number | null => {
    const cleaned = hex.replace(/^0x/i, '').replace(/[^0-9a-fA-F]/g, '');
    if (cleaned === '') return null;
    return parseInt(cleaned, 16);
  };

  const numA = parseHex(hexA);
  const numB = parseHex(hexB);

  const compute = (): number | null => {
    if (numA === null || numB === null) return null;
    switch (operation) {
      case '+': return numA + numB;
      case '-': return numA - numB;
      case '*': return numA * numB;
      case '/': return numB !== 0 ? numA / numB : null;
      default: return null;
    }
  };

  const result = compute();
  const toHex = (n: number) => n >= 0 ? n.toString(16).toUpperCase() : '-' + Math.abs(n).toString(16).toUpperCase();
  const toBinary = (n: number) => (n >= 0 ? n : Math.abs(n)).toString(2);
  const toOctal = (n: number) => (n >= 0 ? n : Math.abs(n)).toString(8);

  const ConversionRow = ({ label, value }: { label: string; value: string }) => (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5, borderBottom: '1px solid', borderColor: 'divider' }}>
      <Typography variant="body2" color="text.secondary">{label}</Typography>
      <Typography variant="body2" fontWeight="bold" sx={{ fontFamily: 'monospace' }}>{value}</Typography>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr auto 1fr' }, gap: 2, alignItems: 'start' }}>
        <TextField
          label="First Hex Value"
          value={hexA}
          onChange={(e) => setHexA(e.target.value)}
          fullWidth
          placeholder="e.g. 1A"
          sx={{ fontFamily: 'monospace' }}
          slotProps={{ input: { sx: { fontFamily: 'monospace' } } }}
        />
        <FormControl sx={{ minWidth: 80, mt: { xs: 0, md: 1 } }}>
          <InputLabel>Op</InputLabel>
          <Select value={operation} label="Op" onChange={(e) => setOperation(e.target.value)}>
            <MenuItem value="+">+</MenuItem>
            <MenuItem value="-">−</MenuItem>
            <MenuItem value="*">×</MenuItem>
            <MenuItem value="/">÷</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Second Hex Value"
          value={hexB}
          onChange={(e) => setHexB(e.target.value)}
          fullWidth
          placeholder="e.g. 2F"
          slotProps={{ input: { sx: { fontFamily: 'monospace' } } }}
        />
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography variant="subtitle2" mb={2} color="text.secondary">Input A ({numA !== null ? numA : '—'})</Typography>
          <ConversionRow label="Hex" value={numA !== null ? `0x${toHex(numA)}` : '—'} />
          <ConversionRow label="Decimal" value={numA !== null ? String(numA) : '—'} />
          <ConversionRow label="Binary" value={numA !== null ? `0b${toBinary(numA)}` : '—'} />
          <ConversionRow label="Octal" value={numA !== null ? `0o${toOctal(numA)}` : '—'} />
        </Paper>

        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography variant="subtitle2" mb={2} color="text.secondary">Input B ({numB !== null ? numB : '—'})</Typography>
          <ConversionRow label="Hex" value={numB !== null ? `0x${toHex(numB)}` : '—'} />
          <ConversionRow label="Decimal" value={numB !== null ? String(numB) : '—'} />
          <ConversionRow label="Binary" value={numB !== null ? `0b${toBinary(numB)}` : '—'} />
          <ConversionRow label="Octal" value={numB !== null ? `0o${toOctal(numB)}` : '—'} />
        </Paper>

        <Paper sx={{ p: 3, bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="subtitle2" mb={2} sx={{ opacity: 0.9 }}>Result</Typography>
          <ConversionRow label="Hex" value={result !== null ? `0x${toHex(result)}` : '—'} />
          <ConversionRow label="Decimal" value={result !== null ? String(Math.round(result * 10000) / 10000) : '—'} />
          <ConversionRow label="Binary" value={result !== null ? `0b${toBinary(Math.round(result))}` : '—'} />
          <ConversionRow label="Octal" value={result !== null ? `0o${toOctal(Math.round(result))}` : '—'} />
        </Paper>
      </Box>
    </Box>
  );
};

const HexCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How Does the Hex Calculator Work?</Typography>
      <Typography variant="body1">
        Enter two hexadecimal values and select an operation (add, subtract, multiply, or divide). The
        calculator parses both values and displays the result in hex, decimal, binary, and octal. The full
        conversion of both inputs is shown alongside the result.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        0x1A + 0x2F = 0x49 (decimal 73). The calculator converts each hex value to its decimal equivalent
        (26 and 47), performs the addition, then shows the result in all four bases.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Debugging and reverse-engineering software that uses hex addresses.</li>
          <li>Working with color codes in web design and graphics.</li>
          <li>Performing bitwise or arithmetic operations on hex values.</li>
          <li>Learning number base conversions between hex, decimal, binary, and octal.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What prefixes does the tool accept?</Typography>
      <Typography variant="body1">
        You can enter hex values with or without the 0x prefix. Both 1A and 0x1A are interpreted as the same
        value (26 in decimal).
      </Typography>
      <Typography variant="h3">What happens with division by zero?</Typography>
      <Typography variant="body1">
        If the second value is 0 and the operation is division, the result will show as undefined. The
        calculator prevents division by zero gracefully.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/hex-calculator" content={content}>
      <HexCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default HexCalculator;
