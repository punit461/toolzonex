'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, CircularProgress } from '@mui/material';
import { PDFName, PDFNumber, PDFArray } from '@cantoo/pdf-lib';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';

const FlipPdfVerticallyContent = () => {
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
        const { height } = page.getSize();
        const inner = PDFArray.withContext(doc.context);
        inner.push(PDFNumber.of(1));
        inner.push(PDFNumber.of(0));
        inner.push(PDFNumber.of(0));
        inner.push(PDFNumber.of(-1));
        inner.push(PDFNumber.of(0));
        inner.push(PDFNumber.of(height));
        page.node.set(PDFName.of('Matrix'), inner);
      }

      const output = await doc.save();
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-flipped-v.pdf');
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
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />Flipping...</> : 'Flip Vertically'}
      </Button>
    </Box>
  );
};

const FlipPdfVertically = () => {
  const content = (
    <>
      <Typography variant="h2">How to Flip a PDF Vertically</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to flip upside-down.</li>
          <li>Click <strong>Flip Vertically</strong> — every page is mirrored top-to-bottom using a coordinate transformation.</li>
          <li>The flipped PDF downloads automatically.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A PDF exported from a scanner with pages flipped upside-down can be corrected so the text reads normally
        from top to bottom without rotating the file.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Correcting a PDF where pages appear upside-down due to a scanning or export error.</li>
          <li>Creating a vertical mirror image of a layout for design proofs.</li>
          <li>Preparing a document for specialized printing that requires an inverted page orientation.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does this flip every page?</strong> Yes — the vertical flip is applied uniformly to all pages.</li>
          <li><strong>How is this different from rotating 180 degrees?</strong> A 180-degree rotation flips both axes. A vertical flip only mirrors top-to-bottom, which produces a different result for asymmetric content.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — flipping happens entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/flip-pdf-vertically" content={content}>
      <FlipPdfVerticallyContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default FlipPdfVertically;
