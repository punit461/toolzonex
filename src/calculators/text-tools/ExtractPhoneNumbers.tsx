'use client';

import { useState, useCallback } from 'react';
import { Box, TextField, Typography, Button, Paper, Stack, Chip, IconButton, Divider } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const PHONE_REGEX = /(?:\+?1[-.\s]?)?(?:\(\d{3}\)[-.\s]?|[-.\s]?\d{3}[-.\s]?)\d{3}[-.\s]?\d{4}/g;

function normalize(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  return digits.length === 11 && digits.startsWith('1') ? '+' + digits : '+' + (digits.length === 10 ? '1' + digits : digits);
}

function extractNumbers(text: string): string[] {
  const matches = text.match(PHONE_REGEX) ?? [];
  const seen = new Set<string>();
  const unique: string[] = [];
  for (const match of matches) {
    const normalized = normalize(match);
    if (!seen.has(normalized)) {
      seen.add(normalized);
      unique.push(normalized);
    }
  }
  return unique;
}

const ExtractPhoneNumbersContent = () => {
  const [text, setText] = useState<string>('');
  const [numbers, setNumbers] = useState<string[]>([]);
  const [showCountryCode, setShowCountryCode] = useState<boolean>(false);

  const handleExtract = useCallback(() => {
    const found = extractNumbers(text);
    setNumbers(showCountryCode ? found : found.map((n) => n.replace(/^\+\d+/, '').trim()));
  }, [text, showCountryCode]);

  const copyAll = async () => {
    if (numbers.length === 0) return;
    try { await navigator.clipboard.writeText(numbers.join('\n')); } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box>
          <Typography variant="subtitle2" mb={1} color="text.secondary">Paste your text below:</Typography>
          <TextField
            multiline
            rows={8}
            value={text}
            onChange={(e) => setText(e.target.value)}
            fullWidth
            placeholder="Paste text containing phone numbers..."
          />
        </Box>
        <Chip
          label={showCountryCode ? 'Include Country Code' : 'Hide Country Code'}
          clickable
          color={showCountryCode ? 'primary' : 'default'}
          onClick={() => setShowCountryCode((v) => !v)}
          sx={{ alignSelf: 'flex-start' }}
        />
        <Button variant="contained" size="large" onClick={handleExtract} fullWidth>
          Extract Phone Numbers
        </Button>
      </Box>

      <Box>
        <Paper variant="outlined" sx={{ p: 3, minHeight: 240 }}>
          {numbers.length > 0 ? (
            <Stack spacing={1.5}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Found {numbers.length} unique number{numbers.length === 1 ? '' : 's'}
                </Typography>
                <IconButton size="small" onClick={copyAll} aria-label="Copy all numbers">
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Box>
              <Divider />
              {numbers.map((n, idx) => (
                <Paper key={idx} variant="outlined" sx={{ p: 1.5, bgcolor: 'action.hover' }}>
                  <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>{n}</Typography>
                </Paper>
              ))}
            </Stack>
          ) : (
            <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography color="text.secondary" align="center">
                Paste text and click Extract to find phone numbers.
              </Typography>
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

const ExtractPhoneNumbers = () => {
  const content = (
    <>
      <Typography variant="h2">How Does the Phone Number Extractor Work?</Typography>
      <Typography variant="body1">
        Paste any text and the tool scans it for phone numbers in common US and international formats,
        including (555) 123-4567, 555-123-4567, 555.123.4567, and +1 555 123 4567. It finds every match,
        removes duplicates by normalizing the number, and shows you a clean, copyable list.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        From text like "Call (555) 123-4567 or reach +1 555 123 4567 today" the extractor returns the same
        number once, shown as (555) 123-4567 (or +15551234567 when the country-code toggle is on), because
        both formats normalize to the same number.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Pulling contact numbers from emails, chat logs, or documents.</li>
          <li>Cleaning up messy data before importing into a CRM.</li>
          <li>Extracting leads from scraped or exported text.</li>
          <li>Deduplicating contact lists that mix multiple formatting styles.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What formats are supported?</Typography>
      <Typography variant="body1">
        The extractor handles US-style numbers in parentheses, dash, dot, and space separators, as well as
        numbers with a leading +1 international prefix. It normalizes matches so the same number found in
        different formats is only reported once.
      </Typography>
      <Typography variant="h3">Will short numbers or IDs be false positives?</Typography>
      <Typography variant="body1">
        The pattern requires 10 digits in a standard grouping, which avoids matching most short numbers such
        as years, order IDs, or five-digit ZIP codes. Results are reported as you typed them plus a
        normalized version.
      </Typography>
      <Typography variant="h3">Should I include the country code?</Typography>
      <Typography variant="body1">
        Turn on "Include Country Code" if you want the full international format with +1, which is useful
        when a number may be dialed from outside the US or stored in a dialing-friendly format.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/extract-phone-numbers" content={content}>
      <ExtractPhoneNumbersContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ExtractPhoneNumbers;
