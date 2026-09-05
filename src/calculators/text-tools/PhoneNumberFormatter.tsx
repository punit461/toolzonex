'use client';

import { useMemo, useState } from 'react';
import { Box, Typography, TextField, Paper, ToggleButtonGroup, ToggleButton, Stack, Button, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PhoneIcon from '@mui/icons-material/Phone';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Style = 'us' | 'intl' | 'dotted';

function cleanDigits(raw: string): string {
  return raw.replace(/\D/g, '');
}

function formatPhone(rawDigits: string, style: Style): { formatted: string; error: string | null } {
  let digits = rawDigits;

  if (digits.length === 11 && digits.startsWith('1')) {
    digits = digits.slice(1);
  }

  if (digits.length !== 10) {
    return { formatted: '', error: `Expected 10 digits (or 11 with a leading 1) — got ${digits.length}.` };
  }

  const area = digits.slice(0, 3);
  const mid = digits.slice(3, 6);
  const last = digits.slice(6);

  switch (style) {
    case 'us':
      return { formatted: `(${area}) ${mid}-${last}`, error: null };
    case 'intl':
      return { formatted: `+1 ${area}-${mid}-${last}`, error: null };
    case 'dotted':
      return { formatted: `${area}.${mid}.${last}`, error: null };
  }
}

const PhoneNumberFormatterContent = () => {
  const [raw, setRaw] = useState('(555) 123.4567');
  const [style, setStyle] = useState<Style>('us');

  const digits = useMemo(() => cleanDigits(raw), [raw]);
  const result = useMemo(() => formatPhone(digits, style), [digits, style]);

  const copyResult = async () => {
    if (!result.formatted) return;
    try { await navigator.clipboard.writeText(result.formatted); } catch {}
  };

  return (
    <Box sx={{ maxWidth: 560, mx: 'auto' }}>
      <TextField
        label="Raw phone number (any format)"
        value={raw}
        onChange={(e) => setRaw(e.target.value)}
        fullWidth
        sx={{ mb: 3 }}
        placeholder="e.g. 555.123-4567 or 1 (555) 123 4567"
      />

      <ToggleButtonGroup size="small" value={style} exclusive onChange={(_, v) => v && setStyle(v)} sx={{ mb: 3, flexWrap: 'wrap' }}>
        <ToggleButton value="us">US Standard</ToggleButton>
        <ToggleButton value="intl">International</ToggleButton>
        <ToggleButton value="dotted">Dotted</ToggleButton>
      </ToggleButtonGroup>

      <Paper variant="outlined" sx={{ p: 3, textAlign: 'center' }}>
        <PhoneIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
        {result.error ? (
          <Alert severity="warning">{result.error}</Alert>
        ) : (
          <>
            <Typography variant="h4" fontWeight={800} sx={{ mb: 2, fontFamily: 'monospace' }}>
              {result.formatted}
            </Typography>
            <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyResult}>
              Copy
            </Button>
          </>
        )}
      </Paper>
    </Box>
  );
};

const PhoneNumberFormatter = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Phone Number Formatter</Typography>
      <Typography variant="body1">
        Paste a phone number in any messy format — with spaces, dots, dashes, parentheses, or extra
        characters — and choose a target style: US standard &quot;(XXX) XXX-XXXX&quot;, international
        &quot;+1 XXX-XXX-XXXX&quot;, or dotted &quot;XXX.XXX.XXXX&quot;. The tool first strips everything down
        to just the digits, then reformats them into your chosen style. It correctly handles both 10-digit
        numbers and 11-digit numbers with a leading 1 (which is dropped before formatting).
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Entering &quot;1 (555) 123.4567&quot; with the International style selected produces
        &quot;+1 555-123-4567&quot; — the leading 1 is recognized and handled correctly rather than treated
        as part of the area code.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Cleaning up phone numbers copied from a messy spreadsheet or form export into one consistent style.</li>
          <li>Converting numbers to an international format before adding them to a global contact list.</li>
          <li>Standardizing phone number formatting across a database or mailing list.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does this tool also clean up messy phone numbers, or just format them?</strong> Both — it strips all non-digit characters (spaces, dots, dashes, parentheses, letters) down to the raw digits first as a cleaning step, then applies your chosen formatting style, so there&apos;s no need for a separate cleaning tool.</li>
          <li><strong>What happens with an 11-digit number?</strong> If the number is 11 digits and starts with a leading 1 (the US/Canada country code), that leading 1 is automatically dropped before formatting the remaining 10 digits, and re-added for the International style.</li>
          <li><strong>What if my number doesn&apos;t have exactly 10 or 11 digits?</strong> The tool shows a warning telling you how many digits it found, since a number with the wrong digit count can&apos;t be reliably split into area code, prefix, and line number.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/phone-number-formatter" content={content}>
      <PhoneNumberFormatterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PhoneNumberFormatter;
