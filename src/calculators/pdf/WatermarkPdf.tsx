'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, TextField, Slider } from '@mui/material';
import { StandardFonts, rgb, degrees } from '@cantoo/pdf-lib';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';

const WatermarkPdfContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState('CONFIDENTIAL');
  const [opacity, setOpacity] = useState(0.25);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleWatermark = async () => {
    setError('');
    if (!file) { setError('Choose a PDF file first.'); return; }
    if (!text.trim()) { setError('Enter watermark text.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);
      const font = await doc.embedFont(StandardFonts.HelveticaBold);

      doc.getPages().forEach((page) => {
        const { width, height } = page.getSize();
        const size = Math.min(width, height) / 8;
        const textWidth = font.widthOfTextAtSize(text, size);
        page.drawText(text, {
          x: width / 2 - textWidth / 2,
          y: height / 2,
          size,
          font,
          color: rgb(0.5, 0.5, 0.5),
          opacity,
          rotate: degrees(45),
        });
      });

      const output = await doc.save();
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-watermarked.pdf');
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) {
        setError('Could not watermark this file. Make sure it is a valid PDF.');
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box>
      {dialog}
      <PdfFileDropzone onFilesSelected={(files) => setFile(files[0] ?? null)} label="PDF file" selectedNames={file ? [file.name] : []} />

      <Box sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="Watermark text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          sx={{ mb: 3 }}
        />
        <Typography gutterBottom>Opacity: {Math.round(opacity * 100)}%</Typography>
        <Slider value={opacity} min={0.05} max={0.6} step={0.05} onChange={(_, v) => setOpacity(v as number)} />
      </Box>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleWatermark} disabled={busy || !file}>
        {busy ? 'Adding Watermark...' : 'Add Watermark'}
      </Button>
    </Box>
  );
};

const WatermarkPdf = () => {
  const content = (
    <>
      <Typography variant="h2">How to Watermark a PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to watermark.</li>
          <li>Enter your watermark text (e.g. &quot;CONFIDENTIAL&quot; or &quot;DRAFT&quot;) and adjust the opacity.</li>
          <li>Click <strong>Add Watermark</strong> to download the watermarked PDF.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Watermarking a contract draft with &quot;DRAFT&quot; at 25% opacity stamps the word diagonally across
        every page, clearly marking it as not-yet-final without obscuring the underlying text.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Marking draft documents before they&apos;re finalized.</li>
          <li>Labeling confidential or internal-only material.</li>
          <li>Branding shared documents with a company name.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Can I remove a watermark added this way?</strong> Not with this tool — it&apos;s meant to be a visible, permanent mark on the output file.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — watermarking happens entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell
      url="/tools/watermark-pdf"
      content={content}
    >
      <WatermarkPdfContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default WatermarkPdf;
