'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, CircularProgress, TextField } from '@mui/material';
import { PDFDocument } from '@cantoo/pdf-lib';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';

const POINTS_PER_INCH = 72;

const PdfSafePrintOptimizerContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [marginIn, setMarginIn] = useState('0.25');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleAction = async () => {
    setError('');
    if (!file) { setError('Choose a PDF file first.'); return; }
    const marginPt = (parseFloat(marginIn) || 0) * POINTS_PER_INCH;
    if (marginPt < 0) { setError('Margin cannot be negative.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);
      const newDoc = await PDFDocument.create();
      const pageCount = doc.getPageCount();

      for (let i = 0; i < pageCount; i++) {
        const { width, height } = doc.getPage(i).getSize();
        const targetWidth = Math.max(1, width - marginPt * 2);
        const targetHeight = Math.max(1, height - marginPt * 2);
        const scale = Math.min(targetWidth / width, targetHeight / height, 1);
        const scaledWidth = width * scale;
        const scaledHeight = height * scale;
        const x = (width - scaledWidth) / 2;
        const y = (height - scaledHeight) / 2;

        const newPage = newDoc.addPage([width, height]);
        const [embeddedPage] = await newDoc.embedPdf(doc, [i]);
        newPage.drawPage(embeddedPage, { x, y, width: scaledWidth, height: scaledHeight });
      }

      const output = await newDoc.save();
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-safe-print.pdf');
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
        sx={{ mt: 3 }}
        label="Safety margin (inches)"
        type="number"
        value={marginIn}
        onChange={(e) => setMarginIn(e.target.value)}
        inputProps={{ step: 0.05, min: 0 }}
        helperText="Shrinks page content inward by this much on every side so nothing gets clipped by printers that can't print edge-to-edge. Default is 0.25 in (18 pt)."
      />

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleAction} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />Optimizing...</> : 'Optimize for Safe Printing'}
      </Button>
    </Box>
  );
};

const PdfSafePrintOptimizer = () => {
  const content = (
    <>
      <Typography variant="h2">How This Tool Interprets "Safe Print"</Typography>
      <Box sx={{ typography: 'body1' }}>
        <p>
          Most consumer printers can&apos;t print all the way to the edge of the paper — they have a small
          unprintable border, and content placed too close to the edge of a page can get clipped or cut off.
          This tool scopes &quot;safe printing&quot; specifically to that problem: it shrinks each page&apos;s
          content inward by a safety margin and re-centers it within the original page size, leaving a uniform
          white border. It does not check for other print issues like color profiles or bleed.
        </p>
      </Box>

      <Typography variant="h2">How to Use It</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you plan to print.</li>
          <li>Set the <strong>safety margin</strong> in inches — 0.25 in (the default) is a safe choice for most home and office printers.</li>
          <li>Click <strong>Optimize for Safe Printing</strong> and download the result. Page dimensions stay the same, but the content is scaled down slightly and centered, leaving a clean margin on all sides.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A flyer designed with text running almost to the edge of a Letter-sized page gets scaled down by about
        5% and centered with a 0.25 in border on every side, so a home inkjet printer with a non-printable edge
        no longer clips the text or borders.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Fixing a design that was made for edge-to-edge (bleed) printing so it prints safely on a standard home or office printer.</li>
          <li>Adding a consistent white border to a batch of PDFs before printing them on a shared office printer.</li>
          <li>Preventing borders, page numbers, or footers placed near the edge from being cut off.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does this change my page size?</strong> No — output pages are the same size as the input. Only the content is scaled down and centered within that same page size.</li>
          <li><strong>Will this distort my content?</strong> No — content is scaled uniformly (same factor horizontally and vertically), so proportions are preserved.</li>
          <li><strong>Is my text still selectable afterward?</strong> Yes — unlike this batch's rasterizing tools, this one keeps your original page content as vector/text data; it's simply scaled and repositioned, not converted to an image.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — everything happens entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-safe-print-optimizer" content={content}>
      <PdfSafePrintOptimizerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfSafePrintOptimizer;
