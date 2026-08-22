'use client';

import { useState } from 'react';
import { Box, Typography, Button, TextField, Alert } from '@mui/material';
import { PDFDocument } from '@cantoo/pdf-lib';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';

const SplitPdfContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [splitAfter, setSplitAfter] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleSplit = async () => {
    setError('');
    if (!file) {
      setError('Choose a PDF file first.');
      return;
    }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);
      const pageCount = doc.getPageCount();

      const breakpoints = splitAfter
        .split(',')
        .map((s) => parseInt(s.trim(), 10))
        .filter((n) => Number.isInteger(n) && n >= 1 && n < pageCount)
        .sort((a, b) => a - b);

      const boundaries = [0, ...breakpoints, pageCount];
      const baseName = file.name.replace(/\.pdf$/i, '');

      for (let i = 0; i < boundaries.length - 1; i++) {
        const start = boundaries[i];
        const end = boundaries[i + 1];
        if (start >= end) continue;
        const part = await PDFDocument.create();
        const indices = Array.from({ length: end - start }, (_, k) => start + k);
        const pages = await part.copyPages(doc, indices);
        pages.forEach((p) => part.addPage(p));
        const output = await part.save();
        downloadBytes(output, `${baseName}-part${i + 1}.pdf`);
      }
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) {
        setError('Could not split this file. Make sure it is a valid PDF.');
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
        <Typography gutterBottom>Split after page(s)</Typography>
        <TextField
          fullWidth
          placeholder="e.g. 3  or  3, 7"
          value={splitAfter}
          onChange={(e) => setSplitAfter(e.target.value)}
          helperText="Comma-separated page numbers. e.g. '3' splits a 10-page PDF into pages 1-3 and 4-10. '3, 7' produces three files: 1-3, 4-7, 8-10."
        />
      </Box>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleSplit} disabled={busy || !file || !splitAfter}>
        {busy ? 'Splitting...' : 'Split PDF'}
      </Button>
    </Box>
  );
};

const SplitPdf = () => {
  const content = (
    <>
      <Typography variant="h2">How to Split a PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to split.</li>
          <li>Enter the page number(s) to split after — e.g. <code>3</code> or <code>3, 7</code>.</li>
          <li>Click <strong>Split PDF</strong> — each resulting piece downloads as a separate file.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 10-page PDF split after page 3 produces two files: pages 1-3 and pages 4-10. Splitting after pages
        3 and 7 instead produces three files: 1-3, 4-7, and 8-10.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Separating a scanned multi-document batch into individual files.</li>
          <li>Breaking a large report into per-chapter PDFs.</li>
          <li>Extracting a specific section from a long contract to send separately.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Is my file uploaded anywhere?</strong> No — splitting happens entirely in your browser.</li>
          <li><strong>Can I split into single-page files?</strong> Yes, list every page number except the last, e.g. for a 5-page PDF enter <code>1, 2, 3, 4</code>.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell
      url="/tools/split-pdf"
      content={content}
    >
      <SplitPdfContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default SplitPdf;
