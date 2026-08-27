'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, TextField, CircularProgress } from '@mui/material';
import { PDFDocument, rgb } from '@cantoo/pdf-lib';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';

const RemovePdfBorderContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [margin, setMargin] = useState('5');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleAction = async () => {
    setError('');
    if (!file) { setError('Choose a PDF file first.'); return; }
    const m = parseFloat(margin) || 5;
    if (m < 0) { setError('Margin cannot be negative.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);

      doc.getPages().forEach((page) => {
        const { width, height } = page.getSize();

        page.drawRectangle({
          x: 0,
          y: 0,
          width,
          height: m,
          color: rgb(1, 1, 1),
        });
        page.drawRectangle({
          x: 0,
          y: height - m,
          width,
          height: m,
          color: rgb(1, 1, 1),
        });
        page.drawRectangle({
          x: 0,
          y: m,
          width: m,
          height: height - 2 * m,
          color: rgb(1, 1, 1),
        });
        page.drawRectangle({
          x: width - m,
          y: m,
          width: m,
          height: height - 2 * m,
          color: rgb(1, 1, 1),
        });
      });

      const output = await doc.save();
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-no-border.pdf');
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) {
        setError('Could not process this file. Make sure it is a valid PDF.');
      }
    } finally { setBusy(false); }
  };

  return (
    <Box>
      {dialog}
      <PdfFileDropzone onFilesSelected={(files) => setFile(files[0] ?? null)} label="PDF file" selectedNames={file ? [file.name] : []} />

      <TextField
        fullWidth
        type="number"
        label="Border width to remove (pt)"
        value={margin}
        onFocus={(e) => e.target.select()}
        onChange={(e) => setMargin(e.target.value)}
        helperText="How many points from each edge to cover with white."
        sx={{ mt: 3 }}
      />

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleAction} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />Removing Border...</> : 'Remove Border'}
      </Button>
    </Box>
  );
};

const RemovePdfBorder = () => {
  const content = (
    <>
      <Typography variant="h2">How to Remove a Border from a PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF that has an unwanted border.</li>
          <li>Set the border width to remove (in points) — this is the thickness of the edge area to cover.</li>
          <li>Click <strong>Remove Border</strong> — white rectangles are drawn over the border area on every page and the modified PDF downloads automatically.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A certificate PDF with a 10-point decorative border can be cleaned up by setting the removal width
        to 12 points, which covers the border with white rectangles on all four edges, leaving only the
        inner content visible.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Removing unwanted decorative borders from scanned or exported documents.</li>
          <li>Cleaning up PDFs with colored or thick edges before printing or sharing.</li>
          <li>Covering thin lines or frames around the page margin that interfere with layout.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What is a &quot;point&quot;?</strong> One PDF point equals 1/72 of an inch (≈ 0.35 mm). A 10-point border is roughly 3.5 mm thick.</li>
          <li><strong>Will this cover content near the edges?</strong> Yes — if your content extends into the border area, it will be covered. Use a smaller width value to avoid this.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — all processing happens entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/remove-pdf-border" content={content}>
      <RemovePdfBorderContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RemovePdfBorder;
