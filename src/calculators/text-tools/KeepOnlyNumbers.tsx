'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Button, FormControlLabel, Checkbox } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const KeepOnlyNumbersContent = () => {
  const [text, setText] = useState('');
  const [keepDecimalMinus, setKeepDecimalMinus] = useState(true);
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    const pattern = keepDecimalMinus ? /[^0-9.\-]/g : /[^0-9]/g;
    return text.replace(pattern, '');
  }, [text, keepDecimalMinus]);

  const copyResult = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TextField
        label="Input Text"
        placeholder="Type or paste messy text with a phone number, ID, or price..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        multiline
        rows={6}
        fullWidth
      />

      <FormControlLabel
        control={<Checkbox checked={keepDecimalMinus} onChange={(e) => setKeepDecimalMinus(e.target.checked)} />}
        label="Preserve decimal points (.) and minus signs (-)"
      />

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" fontWeight="600">Result:</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyResult} disabled={!output}>
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </Box>
        <TextField
          value={output}
          multiline
          rows={6}
          fullWidth
          InputProps={{ readOnly: true }}
          placeholder="Cleaned numbers will appear here..."
        />
      </Box>
    </Box>
  );
};

const KeepOnlyNumbers = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use Keep Only Numbers</Typography>
      <Typography variant="body1">
        Paste any messy text into the box, and every character that isn&apos;t a digit is stripped out instantly
        — letters, spaces, and most punctuation all disappear. Leave &quot;Preserve decimal points and minus
        signs&quot; checked to keep values like <code>-19.99</code> intact, or untick it to leave only the bare
        digits, which is handy for extracting something like a clean phone number or ID.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        &quot;Call us at (555) 123-4567 or check your balance: -$42.50&quot; becomes{' '}
        <code>555123-4567-42.50</code> with decimals and minus signs preserved, or{' '}
        <code>5551234567 4250</code>-style digits only with that option unticked.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Extracting a clean phone number or ID from messy pasted text.</li>
          <li>Pulling a numeric price or measurement out of a sentence or label.</li>
          <li>Stripping formatting characters out of copied spreadsheet or form data before reuse.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Will it keep the minus sign in a negative number?</strong> Yes, if &quot;Preserve decimal points and minus signs&quot; is checked — every hyphen/minus character in the text is kept, though note that in text with multiple dashes (like a formatted phone number), all of those dashes are preserved too, not just ones meant as a negative sign.</li>
          <li><strong>Does it keep commas used as thousands separators?</strong> No — commas are always removed; only digits (and optionally the decimal point and minus sign) are preserved.</li>
          <li><strong>Can I use this to clean up a pasted phone number?</strong> Yes — untick the decimal/minus option to strip parentheses, spaces, and dashes down to plain digits, giving you a clean number ready to dial or store.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/keep-only-numbers" content={content}>
      <KeepOnlyNumbersContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default KeepOnlyNumbers;
