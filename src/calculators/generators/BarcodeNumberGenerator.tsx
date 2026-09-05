'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Button, FormControl, InputLabel, Select, MenuItem, Stack } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Format = 'upca' | 'ean13';

// UPC-A: 11 data digits. Odd positions (1st, 3rd, 5th... 1-indexed) weight 3, even positions weight 1.
function upcACheckDigit(digits11: string): number {
  let sum = 0;
  for (let i = 0; i < 11; i++) {
    const d = Number(digits11[i]);
    sum += i % 2 === 0 ? d * 3 : d;
  }
  return (10 - (sum % 10)) % 10;
}

// EAN-13: 12 data digits. Odd positions weight 1, even positions weight 3 (reversed vs UPC-A).
function ean13CheckDigit(digits12: string): number {
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    const d = Number(digits12[i]);
    sum += i % 2 === 0 ? d : d * 3;
  }
  return (10 - (sum % 10)) % 10;
}

function randomDigits(length: number): string {
  const arr = new Uint32Array(length);
  crypto.getRandomValues(arr);
  let result = '';
  for (let i = 0; i < length; i++) result += arr[i] % 10;
  return result;
}

const BarcodeNumberGeneratorContent = () => {
  const [format, setFormat] = useState<Format>('upca');
  const [digits, setDigits] = useState('03600029145');

  const requiredLength = format === 'upca' ? 11 : 12;

  const handleFormatChange = (f: Format) => {
    setFormat(f);
    setDigits((prev) => prev.replace(/\D/g, '').slice(0, f === 'upca' ? 11 : 12));
  };

  const randomize = () => setDigits(randomDigits(requiredLength));

  const cleanDigits = digits.replace(/\D/g, '').slice(0, requiredLength);
  const isComplete = cleanDigits.length === requiredLength;

  const { checkDigit, fullCode } = useMemo(() => {
    if (!isComplete) return { checkDigit: null as number | null, fullCode: '' };
    const cd = format === 'upca' ? upcACheckDigit(cleanDigits) : ean13CheckDigit(cleanDigits);
    return { checkDigit: cd, fullCode: cleanDigits + cd };
  }, [cleanDigits, isComplete, format]);

  const copyCode = async () => {
    if (!fullCode) return;
    try { await navigator.clipboard.writeText(fullCode); } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Barcode Format</InputLabel>
          <Select value={format} label="Barcode Format" onChange={(e) => handleFormatChange(e.target.value as Format)}>
            <MenuItem value="upca">UPC-A (12 digits total)</MenuItem>
            <MenuItem value="ean13">EAN-13 (13 digits total)</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label={`First ${requiredLength} digits`}
          value={digits}
          onChange={(e) => setDigits(e.target.value.replace(/\D/g, '').slice(0, requiredLength))}
          fullWidth
          helperText={`${cleanDigits.length}/${requiredLength} digits entered`}
        />

        <Button variant="outlined" startIcon={<ShuffleIcon />} onClick={randomize}>
          Randomize Digits
        </Button>
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
        <Paper variant="outlined" sx={{ p: 3, textAlign: 'center' }}>
          {isComplete ? (
            <>
              <Typography variant="body2" color="text.secondary">Calculated Check Digit</Typography>
              <Typography variant="h4" fontWeight={800} color="primary.main" sx={{ mb: 2 }}>{checkDigit}</Typography>
              <Typography variant="body2" color="text.secondary">Complete {format === 'upca' ? 'UPC-A' : 'EAN-13'} Number</Typography>
              <Typography variant="h5" fontWeight={700} fontFamily="monospace">{fullCode}</Typography>
              <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
                <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyCode}>Copy</Button>
              </Stack>
            </>
          ) : (
            <Typography color="text.secondary">
              Enter {requiredLength} digits (or click Randomize) to calculate the check digit.
            </Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

const BarcodeNumberGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Barcode Number Generator</Typography>
      <Typography variant="body1">
        Choose UPC-A (12-digit) or EAN-13 (13-digit) format, then either type in the first 11 or 12 digits
        manually or click Randomize to fill them in for you. The tool calculates the correct final check digit
        using the real, standard algorithm for that format and shows the complete, valid barcode number. UPC-A
        sums the odd-position digits (1st, 3rd, 5th...) multiplied by 3 plus the even-position digits, while
        EAN-13 uses the same approach with the weighting reversed — odd positions weighted 1, even positions
        weighted 3 — to account for its extra leading digit.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Entering the 11 digits <code>03600029145</code> in UPC-A mode calculates a check digit of{' '}
        <strong>2</strong>, producing the complete, verifiable UPC-A number <code>036000291452</code> — a real
        published example confirming the check-digit math is correct.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Calculating the correct check digit for a product barcode before printing packaging.</li>
          <li>Verifying that a manually typed UPC-A or EAN-13 number has the correct final digit.</li>
          <li>Generating sample, checksum-valid barcode numbers for testing inventory or POS software.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does this generate a scannable barcode image?</strong> No — this tool only calculates and displays the numeric code with a correct check digit. If you need an actual scannable barcode image to download, use a dedicated barcode image generator instead.</li>
          <li><strong>Can I use any random digits for a real product?</strong> Technically the check digit will always be mathematically valid, but real-world UPC and EAN codes are issued by GS1 with a registered manufacturer prefix — use an officially assigned code for actual retail products.</li>
          <li><strong>What&apos;s the actual difference between the UPC-A and EAN-13 formulas?</strong> Both sum weighted digits and derive the check digit the same way, but the weight pattern is reversed between them: UPC-A applies the ×3 weight to odd positions, while EAN-13 applies it to even positions, which is a direct consequence of EAN-13 having one extra leading digit compared to UPC-A.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/barcode-number-generator" content={content}>
      <BarcodeNumberGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BarcodeNumberGenerator;
