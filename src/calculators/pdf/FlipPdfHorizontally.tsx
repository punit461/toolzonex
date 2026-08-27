'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, CircularProgress } from '@mui/material';
import { PDFName, PDFNumber, PDFArray } from '@cantoo/pdf-lib';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';

const FlipPdfHorizontallyContent = () => {
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
        const { width } = page.getSize();
        const inner = PDFArray.withContext(doc.context);
        inner.push(PDFNumber.of(-1));
        inner.push(PDFNumber.of(0));
        inner.push(PDFNumber.of(0));
        inner.push(PDFNumber.of(1));
        inner.push(PDFNumber.of(width));
        inner.push(PDFNumber.of(0));
        page.node.set(PDFName.of('Matrix'), inner);
      }

      const output = await doc.save();
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-flipped-h.pdf');
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
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />Flipping...</> : 'Flip Horizontally'}
      </Button>
    </Box>
  );
};

const FlipPdfHorizontally = () => {
  const content = (
    <>
      <Typography variant="h2">How to Flip a PDF Horizontally</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to mirror.</li>
          <li>Click <strong>Flip Horizontally</strong> — every page is mirrored left-to-right using a coordinate transformation.</li>
          <li>The flipped PDF downloads automatically.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A PDF containing a mirrored scan of a document (left-right reversed) can be flipped back to its correct
        reading orientation so text and images appear in the right order.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Correcting a PDF that was scanned or exported with the page reversed left-to-right.</li>
          <li>Mirroring a design layout for print proofs or proofreading.</li>
          <li>Creating a mirror-image version of a document for artistic or presentation purposes.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does this flip every page?</strong> Yes — the horizontal flip is applied to all pages in the file.</li>
          <li><strong>Will text become unreadable?</strong> The text itself is mirrored, so left-to-right languages will appear backwards. Use this to correct a page that was already reversed.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — flipping happens entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/flip-pdf-horizontally" content={content}>
      <FlipPdfHorizontallyContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default FlipPdfHorizontally;
