'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Alert, ToggleButtonGroup, ToggleButton } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface ValidationResult {
  valid: boolean;
  reason?: string;
  r?: number; g?: number; b?: number; a?: number;
}

function validateChannels(rStr: string, gStr: string, bStr: string, aStr: string): ValidationResult {
  const r = Number(rStr);
  const g = Number(gStr);
  const b = Number(bStr);
  const hasAlpha = aStr.trim() !== '';
  const a = hasAlpha ? Number(aStr) : undefined;

  const checkChannel = (val: number, raw: string, label: string): string | null => {
    if (raw.trim() === '' || Number.isNaN(val)) return `${label} must be a number.`;
    if (!Number.isInteger(val)) return `${label} must be a whole number (integer), got ${val}.`;
    if (val < 0 || val > 255) return `${label} must be between 0 and 255, got ${val}.`;
    return null;
  };

  const rErr = checkChannel(r, rStr, 'Red');
  if (rErr) return { valid: false, reason: rErr };
  const gErr = checkChannel(g, gStr, 'Green');
  if (gErr) return { valid: false, reason: gErr };
  const bErr = checkChannel(b, bStr, 'Blue');
  if (bErr) return { valid: false, reason: bErr };

  if (hasAlpha) {
    if (Number.isNaN(a as number)) return { valid: false, reason: 'Alpha must be a decimal number.' };
    if ((a as number) < 0 || (a as number) > 1) return { valid: false, reason: `Alpha must be between 0 and 1, got ${a}.` };
  }

  return { valid: true, r, g, b, a };
}

function parseRgbString(input: string): { r: string; g: string; b: string; a: string } | null {
  const match = input.trim().match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+)\s*)?\)$/i);
  if (!match) return null;
  return { r: match[1], g: match[2], b: match[3], a: match[4] ?? '' };
}

const RgbColorValidatorContent = () => {
  const [mode, setMode] = useState<'string' | 'fields'>('string');
  const [str, setStr] = useState('rgba(59, 130, 246, 0.9)');
  const [r, setR] = useState('59');
  const [g, setG] = useState('130');
  const [b, setB] = useState('246');
  const [a, setA] = useState('0.9');

  const result: ValidationResult | { valid: false; reason: string } = useMemo(() => {
    if (mode === 'string') {
      if (!str.trim()) return { valid: false, reason: 'Enter an rgb() or rgba() string.' };
      const parsed = parseRgbString(str);
      if (!parsed) {
        return { valid: false, reason: 'Not a valid rgb()/rgba() syntax — expected format like "rgb(255, 0, 0)" or "rgba(255, 0, 0, 0.5)".' };
      }
      return validateChannels(parsed.r, parsed.g, parsed.b, parsed.a);
    }
    return validateChannels(r, g, b, a);
  }, [mode, str, r, g, b, a]);

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto' }}>
      <ToggleButtonGroup value={mode} exclusive onChange={(_, v) => v && setMode(v)} fullWidth sx={{ mb: 3 }}>
        <ToggleButton value="string">Full String</ToggleButton>
        <ToggleButton value="fields">Individual Fields</ToggleButton>
      </ToggleButtonGroup>

      {mode === 'string' ? (
        <TextField
          label="rgb() / rgba() String"
          placeholder="e.g. rgb(255, 0, 0) or rgba(255, 0, 0, 0.5)"
          value={str}
          onChange={(e) => setStr(e.target.value)}
          fullWidth
          sx={{ mb: 3 }}
        />
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, mb: 3 }}>
          <TextField label="R" value={r} onChange={(e) => setR(e.target.value)} />
          <TextField label="G" value={g} onChange={(e) => setG(e.target.value)} />
          <TextField label="B" value={b} onChange={(e) => setB(e.target.value)} />
          <TextField label="A (optional)" value={a} onChange={(e) => setA(e.target.value)} />
        </Box>
      )}

      <Paper variant="outlined" sx={{ p: 3 }}>
        <Alert severity={result.valid ? 'success' : 'error'}>
          {result.valid ? 'Valid RGB(A) color' : 'Invalid RGB(A) color'}
        </Alert>
        {!result.valid && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>{result.reason}</Typography>
        )}
      </Paper>
    </Box>
  );
};

const RgbColorValidator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the RGB Color Validator</Typography>
      <Typography variant="body1">
        Choose between entering a full <code>rgb(r, g, b)</code> or <code>rgba(r, g, b, a)</code> string, or
        entering individual R, G, B, and (optionally) A number fields directly. The tool validates each channel:
        Red, Green, and Blue must be whole numbers from 0 to 255, and alpha (if present) must be a decimal
        between 0 and 1. If anything is invalid, it explains specifically which channel is out of range.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        <code>rgb(59, 130, 246)</code> is valid. <code>rgba(59, 130, 246, 0.9)</code> is valid.{' '}
        <code>rgb(300, 0, 0)</code> is invalid — Red (300) is above the maximum of 255.{' '}
        <code>rgba(0, 0, 0, 1.5)</code> is invalid — Alpha (1.5) is above the maximum of 1.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking whether a color value from user input or an external file is valid before using it.</li>
          <li>Debugging a CSS rule that isn&apos;t applying due to an out-of-range channel value.</li>
          <li>Validating individual R, G, B, A values before combining them programmatically.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Can R, G, or B be decimal numbers?</strong> No — R, G, and B must be whole integers between 0 and 255. A value like 128.5 is invalid, even though it falls within the numeric range, because RGB channels are always whole numbers.</li>
          <li><strong>What range is alpha allowed to be in?</strong> Alpha is a decimal (not a percentage) between 0 (fully transparent) and 1 (fully opaque), inclusive. Values like 0.5 or 1 are valid; a value like 50 or 1.2 is not.</li>
          <li><strong>Is the alpha channel required?</strong> No — leaving the alpha field blank (or using a plain <code>rgb()</code> string) validates just the R, G, and B channels, since alpha is optional.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/converters/rgb-color-validator" content={content}>
      <RgbColorValidatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RgbColorValidator;
