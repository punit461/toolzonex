'use client';

import { useState } from 'react';
import { Box, Button, Typography, Paper, Alert, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type FormatKey = 'us' | 'uk' | 'india' | 'international';

const FORMAT_LABELS: Record<FormatKey, string> = {
  us: 'United States',
  uk: 'United Kingdom',
  india: 'India',
  international: 'Generic International',
};

function randDigits(count: number): string {
  let s = '';
  for (let i = 0; i < count; i++) s += Math.floor(Math.random() * 10).toString();
  return s;
}

function generateOne(format: FormatKey): string {
  switch (format) {
    case 'us': {
      const area = 200 + Math.floor(Math.random() * 700);
      return `(${area}) 555-${randDigits(4)}`;
    }
    case 'uk': {
      // Ofcom-reserved "07700 900xxx" style drama numbers use a fictional-looking prefix.
      return `07700 900${randDigits(3)}`;
    }
    case 'india': {
      return `+91 90000 ${randDigits(5)}`;
    }
    default: {
      return `+000 ${randDigits(2)} ${randDigits(3)} ${randDigits(4)}`;
    }
  }
}

const FakePhoneGeneratorContent = () => {
  const [format, setFormat] = useState<FormatKey>('us');
  const [numbers, setNumbers] = useState<string[]>([]);

  const generate = () => {
    setNumbers(Array.from({ length: 5 }, () => generateOne(format)));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <Alert severity="warning" sx={{ maxWidth: 520 }}>
        <strong>For testing and mock-data purposes only.</strong> These numbers are not real, dialable phone
        numbers — they use reserved fictional patterns (like the US &quot;555&quot; central-office code)
        specifically set aside so they can&apos;t belong to a real subscriber.
      </Alert>

      <FormControl sx={{ minWidth: 240 }}>
        <InputLabel>Format</InputLabel>
        <Select label="Format" value={format} onChange={(e) => setFormat(e.target.value as FormatKey)}>
          {(Object.keys(FORMAT_LABELS) as FormatKey[]).map((key) => (
            <MenuItem key={key} value={key}>{FORMAT_LABELS[key]}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button variant="contained" size="large" startIcon={<CasinoIcon />} onClick={generate}>
        Generate 5 Fake Phone Numbers
      </Button>

      {numbers.length > 0 && (
        <Paper variant="outlined" sx={{ p: 3, maxWidth: 420, width: '100%' }}>
          {numbers.map((n, i) => (
            <Typography key={i} variant="h6" sx={{ fontFamily: 'monospace', py: 0.5 }}>{n}</Typography>
          ))}
        </Paper>
      )}
    </Box>
  );
};

const FakePhoneGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Fake Phone Generator</Typography>
      <Typography variant="body1">
        Choose a country/format, then click Generate to produce 5 random, clearly fictional phone numbers
        shaped like that format. For US numbers, this tool uses the &quot;555&quot; central-office code (e.g.
        <code> (202) 555-0134</code>) — a range the North American Numbering Plan Administrator (NANPA)
        reserves specifically for fictional use in movies, TV, and testing, guaranteeing it can never be a
        real, assignable number. Other formats use similarly recognizable, clearly non-issued-looking
        prefixes.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        US format: (XXX) 555-XXXX — 555 is NANPA-reserved for fictional use
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Selecting &quot;United States&quot; and clicking Generate might produce numbers like{' '}
        <code>(415) 555-0192</code> and <code>(212) 555-0157</code> — realistic-looking area codes paired
        with the fictional 555 exchange.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Filling out test forms or QA test cases that require a phone number field.</li>
          <li>Populating UI mockups and demos with realistic-looking placeholder contact data.</li>
          <li>Generating sample data for scripts, seed databases, or documentation examples.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Are these real, dialable phone numbers?</strong> No. They are generated for testing, mock-data, and development purposes only. The US format specifically uses the &quot;555&quot; central-office code, which NANPA has permanently reserved for fictional use precisely so that numbers like these can never be assigned to a real subscriber. Other formats use similarly non-issued patterns, but should still only be used for testing, not presented as real contact information.</li>
          <li><strong>Why does the US format always use 555?</strong> The North American Numbering Plan reserves the 555 exchange (555-0100 through 555-0199 specifically, though this generator uses the wider 555-XXXX range for variety) so that film, television, and software testing can use realistic-looking phone numbers without any risk of reaching or impersonating a real person's line.</li>
          <li><strong>Can I generate more than 5 numbers at once?</strong> Click Generate again for a fresh batch of 5 — each click produces a completely new, independent set of fictional numbers in your chosen format.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/fake-phone-generator" content={content}>
      <FakePhoneGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default FakePhoneGenerator;
