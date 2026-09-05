'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface ValidationResult {
  valid: boolean;
  reason?: string;
  digitCount?: number;
}

function validateHex(input: string): ValidationResult {
  const trimmed = input.trim();
  if (!trimmed) return { valid: false, reason: 'Enter a value to validate.' };

  const withoutHash = trimmed.startsWith('#') ? trimmed.slice(1) : trimmed;

  if (withoutHash.length === 0) {
    return { valid: false, reason: 'No hex digits found after "#".' };
  }

  const validLengths = [3, 4, 6, 8];
  if (!/^[0-9a-fA-F]+$/.test(withoutHash)) {
    const invalidChars = Array.from(new Set(withoutHash.replace(/[0-9a-fA-F]/g, '').split('')));
    return {
      valid: false,
      reason: `Contains invalid character${invalidChars.length === 1 ? '' : 's'}: ${invalidChars.map((c) => `"${c}"`).join(', ')}. Only 0-9 and A-F are allowed.`,
      digitCount: withoutHash.length,
    };
  }

  if (!validLengths.includes(withoutHash.length)) {
    return {
      valid: false,
      reason: `Found ${withoutHash.length} hex digit${withoutHash.length === 1 ? '' : 's'} — valid lengths are 3, 4, 6, or 8.`,
      digitCount: withoutHash.length,
    };
  }

  return { valid: true, digitCount: withoutHash.length };
}

const HexColorValidatorContent = () => {
  const [input, setInput] = useState('#3B82F6');

  const result = useMemo(() => validateHex(input), [input]);

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto' }}>
      <TextField
        label="Enter a Hex Color Value"
        placeholder="e.g. #fff, 3B82F6, #ff00ff80"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        fullWidth
        sx={{ mb: 3 }}
      />

      {input.trim() && (
        <Paper variant="outlined" sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 3 }}>
          {result.valid && (
            <Box sx={{ width: 56, height: 56, borderRadius: 1, border: '1px solid', borderColor: 'divider', bgcolor: input.trim().startsWith('#') ? input.trim() : `#${input.trim()}` }} />
          )}
          <Box>
            <Alert severity={result.valid ? 'success' : 'error'} sx={{ mb: result.valid ? 0 : 1 }}>
              {result.valid ? `Valid — ${result.digitCount}-digit hex color` : 'Invalid hex color'}
            </Alert>
            {!result.valid && result.reason && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{result.reason}</Typography>
            )}
          </Box>
        </Paper>
      )}
    </Box>
  );
};

const HexColorValidator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Hex Color Validator</Typography>
      <Typography variant="body1">
        Type any string into the box, and the tool checks whether it&apos;s syntactically correct hex color
        notation. Valid hex colors have 3, 4, 6, or 8 hex digits (0-9 and A-F), with or without a leading{' '}
        <code>#</code>. If the value is invalid, the tool explains exactly what&apos;s wrong — whether it&apos;s
        the wrong digit count, invalid characters, or something else.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        <code>#3B82F6</code> is valid (6 digits). <code>#fff</code> is valid (3-digit shorthand).{' '}
        <code>#ff00ff80</code> is valid (8 digits, includes alpha). <code>#12345</code> is invalid (5 digits —
        not one of the allowed lengths). <code>#gggggg</code> is invalid (contains the character &quot;g&quot;,
        which isn&apos;t a valid hex digit).
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking a hex color value pasted from an external source before using it in code.</li>
          <li>Debugging why a CSS color isn&apos;t rendering — often due to an invalid hex format.</li>
          <li>Validating user-submitted color values in a form before saving them.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What hex digit counts are considered valid?</strong> 3 digits (shorthand RGB), 4 digits (shorthand RGB with alpha), 6 digits (full RGB), or 8 digits (full RGB with alpha) — any other count is flagged as invalid.</li>
          <li><strong>Is the leading "#" required?</strong> No — the tool accepts hex values both with and without a leading "#" symbol, since both forms are commonly used depending on context.</li>
          <li><strong>What characters are valid in a hex color?</strong> Only the digits 0-9 and the letters A-F (case-insensitive) — any other character, including spaces or symbols, makes the value invalid.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/converters/hex-color-validator" content={content}>
      <HexColorValidatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default HexColorValidator;
