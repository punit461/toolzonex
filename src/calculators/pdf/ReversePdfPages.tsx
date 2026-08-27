'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';
import { PDFDocument } from '@cantoo/pdf-lib';

const ReversePdfPagesContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleReverse = async () => {
    setError('');
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);
      const pageCount = doc.getPageCount();
      const reversedIndices = Array.from({ length: pageCount }, (_, i) => pageCount - 1 - i);
      const newDoc = await PDFDocument.create();
      const copiedPages = await newDoc.copyPages(doc, reversedIndices);
      copiedPages.forEach((p) => newDoc.addPage(p));
      const output = await newDoc.save();
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-reversed.pdf');
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) {
        setError('Could not process this file. Make sure it is a valid PDF.');
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box>
      {dialog}
      <PdfFileDropzone onFilesSelected={(files) => setFile(files[0] ?? null)} label="PDF file" selectedNames={file ? [file.name] : []} />

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleReverse} disabled={busy || !file}>
        {busy ? 'Reversing...' : 'Reverse Page Order'}
      </Button>
    </Box>
  );
};

const ReversePdfPages = () => {
  const content = (
    <>
      <Typography variant="h2">How to Reverse PDF Page Order</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to reverse.</li>
          <li>Click <strong>Reverse Page Order</strong> to download the reordered PDF.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 5-page document with pages 1-2-3-4-5 becomes 5-4-3-2-1. This is handy when a document
        was scanned in the wrong order or you need last-page-first reading.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Correcting documents scanned back-to-front.</li>
          <li>Preparing a presentation in reverse chronological order.</li>
          <li>Reversing a document for right-to-left reading workflows.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does this affect bookmarks or links?</strong> Bookmarks stay on their original pages but may no longer match the intended reading order.</li>
          <li><strong>Can I undo this?</strong> Just run the tool again — reversing twice restores the original order.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — everything happens locally in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/reverse-pdf-pages" content={content}>
      <ReversePdfPagesContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ReversePdfPages;
