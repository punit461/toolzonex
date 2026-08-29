'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, TextField, Typography, Button, Paper } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import JsBarcode from 'jsbarcode';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function ean13CheckDigit(digits12: string): number {
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    const d = Number(digits12[i]);
    sum += i % 2 === 0 ? d : d * 3;
  }
  return (10 - (sum % 10)) % 10;
}

const Ean13BarcodeGeneratorContent = () => {
  const [digits, setDigits] = useState('590123412345'.slice(0, 12));
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);

  const cleanDigits = digits.replace(/\D/g, '').slice(0, 12);
  const checkDigit = cleanDigits.length === 12 ? ean13CheckDigit(cleanDigits) : null;
  const fullCode = checkDigit !== null ? cleanDigits + checkDigit : '';

  useEffect(() => {
    if (!canvasRef.current) return;
    if (fullCode.length !== 13) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      setError(null);
      return;
    }
    try {
      JsBarcode(canvasRef.current, fullCode, {
        format: 'EAN13',
        width: 2,
        height: 100,
        displayValue: true,
        margin: 10,
      });
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not generate a barcode for this input.');
    }
  }, [fullCode]);

  const download = () => {
    if (!canvasRef.current || fullCode.length !== 13) return;
    const url = canvasRef.current.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `ean13-${fullCode}.png`;
    a.click();
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="First 12 digits"
          value={digits}
          onChange={(e) => setDigits(e.target.value.replace(/\D/g, '').slice(0, 12))}
          fullWidth
          helperText={`${cleanDigits.length}/12 digits entered`}
        />
        {checkDigit !== null && (
          <Typography variant="body2" color="text.secondary">
            Calculated check digit: <strong>{checkDigit}</strong> — full code: <strong>{fullCode}</strong>
          </Typography>
        )}
        {error && <Typography color="error">{error}</Typography>}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
        <Paper sx={{ p: 3, bgcolor: 'white', width: '100%', display: 'flex', justifyContent: 'center', minHeight: 160, alignItems: 'center' }}>
          <canvas ref={canvasRef} />
        </Paper>
        <Button variant="contained" startIcon={<DownloadIcon />} onClick={download} disabled={fullCode.length !== 13} fullWidth>
          Download PNG
        </Button>
      </Box>
    </Box>
  );
};

const Ean13BarcodeGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">Free EAN-13 Barcode Generator</Typography>
      <Typography variant="body1">
        Enter the first 12 digits of an EAN-13 code and this tool automatically calculates the 13th check
        digit and renders a scannable EAN-13 barcode — the standard retail barcode format used worldwide.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Type any 12 digits into the input. The check digit and full 13-digit code are calculated instantly, and
        the barcode preview updates live. Click Download PNG to save it as an image.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Entering <code>590123412345</code> calculates a check digit and produces the full code
        <code>5901234123457</code>, rendered as a scannable barcode.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Generating a product barcode for retail packaging or shelf labels.</li>
          <li>Verifying a manually typed EAN-13 code has the correct check digit.</li>
          <li>Creating printable barcode images for small-business inventory.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is the EAN-13 check digit calculated?</Typography>
      <Typography variant="body1">
        Each of the first 12 digits is multiplied by 1 or 3 alternately (odd positions ×1, even positions ×3,
        counting from the left starting at position 1), the results are summed, and the check digit is whatever
        number brings that sum up to the next multiple of 10.
      </Typography>
      <Typography variant="h3">Can I use any 12 digits?</Typography>
      <Typography variant="body1">
        Technically yes for generating a valid barcode, but real-world EAN-13 codes are issued by GS1 and
        include a registered manufacturer prefix — use a real assigned code for actual retail products.
      </Typography>
      <Typography variant="h3">Is my data uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — the barcode is generated entirely client-side in your browser using the jsbarcode library.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/ean13-barcode-generator" content={content}>
      <Ean13BarcodeGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default Ean13BarcodeGenerator;
