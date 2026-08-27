'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, Slider, Paper } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';
import { PDFDocument } from '@cantoo/pdf-lib';

const ResizeAndRescalePdfContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [scale, setScale] = useState(100);
  const [originalSize, setOriginalSize] = useState(0);
  const [outputSize, setOutputSize] = useState(0);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleResize = async () => {
    setError('');
    setOriginalSize(0);
    setOutputSize(0);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      setOriginalSize(bytes.byteLength);
      const doc = await unlock(bytes);
      const s = scale / 100;

      const newDoc = await PDFDocument.create();
      const pages = doc.getPages();

      for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        const { width, height } = page.getSize();
        const newWidth = width * s;
        const newHeight = height * s;
        const newPage = newDoc.addPage([newWidth, newHeight]);
        const [embeddedPage] = await newDoc.embedPdf(doc, [i]);
        newPage.drawPage(embeddedPage, {
          x: 0,
          y: 0,
          width: newWidth,
          height: newHeight,
        });
      }

      const output = await newDoc.save();
      setOutputSize(output.byteLength);
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + `-rescaled-${scale}pct.pdf`);
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) {
        setError('Could not resize this file. Make sure it is a valid PDF.');
      }
    } finally {
      setBusy(false);
    }
  };

  const fmtSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <Box>
      {dialog}
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setOriginalSize(0); setOutputSize(0); }} label="PDF file" selectedNames={file ? [file.name] : []} />

      <Box sx={{ mt: 3 }}>
        <Typography gutterBottom>Scale: {scale}%</Typography>
        <Slider
          value={scale}
          min={50}
          max={200}
          step={5}
          onChange={(_, v) => setScale(v as number)}
          marks={[
            { value: 50, label: '50%' },
            { value: 100, label: '100%' },
            { value: 150, label: '150%' },
            { value: 200, label: '200%' },
          ]}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `${v}%`}
        />
      </Box>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleResize} disabled={busy || !file}>
        {busy ? 'Resizing...' : 'Resize & Rescale'}
      </Button>

      {originalSize > 0 && outputSize > 0 && (
        <Paper variant="outlined" sx={{ mt: 3, p: 2 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2, textAlign: 'center' }}>
            <Box>
              <Typography variant="caption" color="text.secondary">Original Size</Typography>
              <Typography variant="h6">{fmtSize(originalSize)}</Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">Rescaled Size</Typography>
              <Typography variant="h6">{fmtSize(outputSize)}</Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">Scale Applied</Typography>
              <Typography variant="h6">{scale}%</Typography>
            </Box>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

const ResizeAndRescalePdf = () => {
  const content = (
    <>
      <Typography variant="h2">How to Resize &amp; Rescale a PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to resize.</li>
          <li>Use the slider to choose a scale between 50% (half size) and 200% (double size).</li>
          <li>Click <strong>Resize &amp; Rescale</strong> to create a new PDF with all pages proportionally scaled.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A landscape architect has a set of A1 drawings that are too large for standard printers. Rescaling to 50%
        shrinks every page proportionally to A2 size while maintaining the exact layout and proportions of the original.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Scaling down large-format PDFs for home or office printing.</li>
          <li>Ensembling small PDF thumbnails into larger, presentation-ready pages.</li>
          <li>Uniformly resizing all pages in a multi-page document to match a target paper size.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does this change the page dimensions or just the content?</strong> Both — the page canvas and all content are scaled together, preserving the original layout at the new size.</li>
          <li><strong>What happens to text quality?</strong> Vector text remains sharp at any scale. Raster images within the PDF may appear softer when scaled up beyond their native resolution.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — rescaling happens entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/resize-and-rescale-pdf-online" content={content}>
      <ResizeAndRescalePdfContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ResizeAndRescalePdf;
