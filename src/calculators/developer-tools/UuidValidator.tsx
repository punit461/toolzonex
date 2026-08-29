'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-([1-8])[0-9a-f]{3}-([89abAB])[0-9a-f]{3}-[0-9a-f]{12}$/i;

function analyzeUuid(value: string): { valid: boolean; version: string | null; variant: string | null } {
  const trimmed = value.trim();
  const match = trimmed.match(UUID_RE);
  if (!match) return { valid: false, version: null, variant: null };
  const version = match[1];
  return { valid: true, version, variant: 'RFC 4122 (variant 1)' };
}

const VERSION_LABELS: Record<string, string> = {
  '1': 'Version 1 — time-based (MAC address + timestamp)',
  '2': 'Version 2 — DCE Security',
  '3': 'Version 3 — name-based, MD5 hashed',
  '4': 'Version 4 — random or pseudo-random',
  '5': 'Version 5 — name-based, SHA-1 hashed',
};

const UuidValidatorContent = () => {
  const [input, setInput] = useState('');

  const result = useMemo(() => (input.trim() ? analyzeUuid(input) : null), [input]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TextField
        label="UUID"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        fullWidth
        placeholder="e.g. 550e8400-e29b-41d4-a716-446655440000"
        sx={{ fontFamily: 'monospace' }}
      />

      {result && (
        result.valid ? (
          <Paper variant="outlined" sx={{ p: 3 }}>
            <Alert severity="success" sx={{ mb: 2 }}>Valid UUID format</Alert>
            <Typography variant="body1"><strong>Version:</strong> {result.version ? VERSION_LABELS[result.version] || `Version ${result.version}` : 'Unknown'}</Typography>
            <Typography variant="body1"><strong>Variant:</strong> {result.variant}</Typography>
          </Paper>
        ) : (
          <Alert severity="error">Not a valid UUID — expected the format 8-4-4-4-12 hex characters (e.g. 550e8400-e29b-41d4-a716-446655440000).</Alert>
        )
      )}
    </Box>
  );
};

const UuidValidator = () => {
  const content = (
    <>
      <Typography variant="h2">Free UUID Validator & Version Detector</Typography>
      <Typography variant="body1">
        Paste any UUID/GUID to instantly check whether it's in valid format, and if so, detect which version
        (v1 through v5) it is, based on the version bits embedded in the string.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste a UUID into the input box. It's checked against the standard 8-4-4-4-12 hex format instantly, and
        if valid, its version and variant are shown below.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        <code>550e8400-e29b-41d4-a716-446655440000</code> is a valid UUID — the "4" right after the second
        hyphen group marks it as version 4 (random).
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking whether a string received from an API is actually a well-formed UUID.</li>
          <li>Confirming which UUID version a database or library is generating.</li>
          <li>Debugging ID-related bugs where a malformed UUID might be the cause.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is the UUID version detected?</Typography>
      <Typography variant="body1">
        The version number is encoded as the first hex digit of the third group (position 15 of the string).
        For example, in <code>xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx</code>, the leading "4" marks it as version
        4.
      </Typography>
      <Typography variant="h3">What's the difference between a UUID and a GUID?</Typography>
      <Typography variant="body1">
        They're effectively the same thing — GUID (Globally Unique Identifier) is Microsoft's name for the same
        128-bit identifier format standardized as UUID in RFC 4122.
      </Typography>
      <Typography variant="h3">Is my UUID uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — validation happens entirely client-side in your browser. Nothing you paste is sent to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/uuid-validator" content={content}>
      <UuidValidatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default UuidValidator;
