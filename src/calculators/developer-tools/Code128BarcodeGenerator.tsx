'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, TextField, Typography, Button, Paper } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import JsBarcode from 'jsbarcode';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const Code128BarcodeGeneratorContent = () => {
  const [text, setText] = useState('CODE-128-Example');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (!text) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      setError(null);
      return;
    }
    try {
      JsBarcode(canvasRef.current, text, {
        format: 'CODE128',
        width: 2,
        height: 100,
        displayValue: true,
        margin: 10,
      });
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not generate a barcode for this input.');
    }
  }, [text]);

  const download = () => {
    if (!canvasRef.current || !text) return;
    const url = canvasRef.current.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'code128-barcode.png';
    a.click();
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Text to encode"
          value={text}
          onChange={(e) => setText(e.target.value)}
          fullWidth
          multiline
          rows={3}
          error={!!error}
          helperText={error || 'Code128 supports the full ASCII character set.'}
        />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
        <Paper sx={{ p: 3, bgcolor: 'white', width: '100%', display: 'flex', justifyContent: 'center', minHeight: 160, alignItems: 'center', overflow: 'auto' }}>
          <canvas ref={canvasRef} />
        </Paper>
        <Button variant="contained" startIcon={<DownloadIcon />} onClick={download} disabled={!text || !!error} fullWidth>
          Download PNG
        </Button>
      </Box>
    </Box>
  );
};

const Code128BarcodeGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">Free Code128 Barcode Generator</Typography>
      <Typography variant="body1">
        Turn any text — letters, numbers, and symbols — into a scannable Code128 barcode. Code128 is one of the
        most widely used 1D barcode formats because it can encode the full ASCII character set efficiently.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Type any text into the input box. The Code128 barcode renders live as you type. Click Download PNG to
        save the barcode as an image.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Entering <code>SKU-4471-A</code> produces a scannable barcode encoding that exact alphanumeric string.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Generating shipping, warehouse, or inventory tracking labels.</li>
          <li>Encoding alphanumeric SKUs or serial numbers that EAN/UPC formats can't handle.</li>
          <li>Creating barcode images for internal asset tagging systems.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is Code128 different from EAN-13?</Typography>
      <Typography variant="body1">
        EAN-13 only encodes 13 numeric digits and is used for retail products. Code128 can encode any ASCII
        text — letters, numbers, and punctuation — making it far more flexible for logistics and inventory use.
      </Typography>
      <Typography variant="h3">Is there a length limit?</Typography>
      <Typography variant="body1">
        There's no hard limit, but very long text produces a wide, dense barcode that may be harder for some
        scanners to read reliably — shorter codes scan more consistently.
      </Typography>
      <Typography variant="h3">Is my data uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — the barcode is generated entirely client-side in your browser using the jsbarcode library.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/code128-barcode-generator" content={content}>
      <Code128BarcodeGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default Code128BarcodeGenerator;
