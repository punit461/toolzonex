'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, CircularProgress } from '@mui/material';
import { PDFName } from '@cantoo/pdf-lib';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';

const RemovePdfMarginsContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleAction = async () => {
    setError('');
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);

      for (const page of doc.getPages()) {
        const mediaBox = page.getMediaBox();
        if (mediaBox) {
          page.setCropBox(mediaBox.x, mediaBox.y, mediaBox.width, mediaBox.height);
        }
        page.node.delete(PDFName.of('TrimBox'));
        page.node.delete(PDFName.of('BleedBox'));
        page.node.delete(PDFName.of('ArtBox'));
        page.node.delete(PDFName.of('CropBox'));
      }

      const output = await doc.save();
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-no-margins.pdf');
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) {
        setError('Could not process this file.');
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
      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleAction} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />Processing...</> : 'Remove Margins'}
      </Button>
    </Box>
  );
};

const RemovePdfMargins = () => {
  const content = (
    <>
      <Typography variant="h2">How to Remove PDF Margins</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF whose margins you want to remove.</li>
          <li>Click <strong>Remove Margins</strong> — the tool strips the crop, trim, bleed, and art boxes from every page.</li>
          <li>The cleaned PDF downloads automatically.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A PDF exported from a design tool with visible crop-mark margins will be trimmed so that
        each page shows only the content area, with no extra whitespace around the edges.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Removing printer crop marks and bleed areas from press-ready PDFs.</li>
          <li>Cleaning up extra whitespace around pages exported from design or layout software.</li>
          <li>Preparing a PDF for display on screen where margins are unnecessary.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does this actually crop the content?</strong> It removes the crop, trim, bleed, and art boxes so the viewer uses the full media box. Content inside the media box is preserved.</li>
          <li><strong>What if the PDF has no extra margins?</strong> The tool still runs safely — if no trim or bleed boxes exist, the output is effectively unchanged.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — processing happens entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/remove-pdf-margins" content={content}>
      <RemovePdfMarginsContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RemovePdfMargins;
