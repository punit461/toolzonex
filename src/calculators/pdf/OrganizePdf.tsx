'use client';

import { useState } from 'react';
import { Box, Typography, Button, TextField, Alert } from '@mui/material';
import { PDFDocument } from '@cantoo/pdf-lib';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';

const OrganizePdfContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [order, setOrder] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleReorder = async () => {
    setError('');
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);
      const pageCount = doc.getPageCount();

      const newOrder = order.split(',').map((s) => parseInt(s.trim(), 10) - 1);
      const valid = newOrder.every((n) => Number.isInteger(n) && n >= 0 && n < pageCount) && newOrder.length === pageCount
        && new Set(newOrder).size === pageCount;

      if (!valid) {
        setError(`Enter every page number from 1 to ${pageCount}, each exactly once, separated by commas.`);
        setBusy(false);
        return;
      }

      const output = await PDFDocument.create();
      const copied = await output.copyPages(doc, newOrder);
      copied.forEach((p) => output.addPage(p));
      const bytesOut = await output.save();
      downloadBytes(bytesOut, file.name.replace(/\.pdf$/i, '') + '-reordered.pdf');
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) {
        setError('Could not reorder this file. Make sure it is a valid PDF.');
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
        <Typography gutterBottom>New page order</Typography>
        <TextField
          fullWidth
          placeholder="e.g. 3, 1, 2, 4"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          helperText="List every page number in the new order you want, separated by commas."
        />
      </Box>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleReorder} disabled={busy || !file || !order}>
        {busy ? 'Reordering...' : 'Reorder Pages'}
      </Button>
    </Box>
  );
};

const OrganizePdf = () => {
  const content = (
    <>
      <Typography variant="h2">How to Reorder PDF Pages</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to reorganize.</li>
          <li>Enter the new page order as a comma-separated list — e.g. <code>3, 1, 2, 4</code> for a 4-page PDF.</li>
          <li>Click <strong>Reorder Pages</strong> to download the reorganized PDF.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        For a 4-page PDF, entering <code>3, 1, 2, 4</code> moves the current page 3 to the front, followed by
        the original pages 1, 2, and finally 4 — every original page must appear exactly once.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Moving a cover page or table of contents to the correct position.</li>
          <li>Fixing scan order after scanning pages out of sequence.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Do I need to list every page?</strong> Yes, every page number from 1 to the total page count, each exactly once.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — reordering happens entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell
      url="/tools/organize-pdf"
      content={content}
    >
      <OrganizePdfContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default OrganizePdf;
