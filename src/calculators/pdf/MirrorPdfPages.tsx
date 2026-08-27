'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, CircularProgress } from '@mui/material';
import { PDFDocument, PDFOperator, PDFOperatorNames, PDFNumber } from '@cantoo/pdf-lib';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';

const MirrorPdfPagesContent = () => {
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
      const srcDoc = await unlock(bytes);
      const newDoc = await PDFDocument.create();

      const pages = srcDoc.getPages();
      for (let i = 0; i < pages.length; i++) {
        const srcPage = pages[i];
        const { width, height } = srcPage.getSize();
        const spreadWidth = width * 2;

        const [embeddedPage] = await newDoc.embedPdf(srcDoc, [i]);
        const [mirrorEmbedded] = await newDoc.embedPdf(srcDoc, [i]);

        const spreadPage = newDoc.addPage([spreadWidth, height]);

        spreadPage.drawPage(embeddedPage, { x: 0, y: 0 });

        spreadPage.pushOperators(
          PDFOperator.of(PDFOperatorNames.PushGraphicsState),
          PDFOperator.of(PDFOperatorNames.ConcatTransformationMatrix, [
            PDFNumber.of(-1),
            PDFNumber.of(0),
            PDFNumber.of(0),
            PDFNumber.of(1),
            PDFNumber.of(spreadWidth),
            PDFNumber.of(0),
          ]),
        );
        spreadPage.drawPage(mirrorEmbedded, { x: 0, y: 0 });
        spreadPage.pushOperators(
          PDFOperator.of(PDFOperatorNames.PopGraphicsState),
        );
      }

      const output = await newDoc.save();
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-mirrored.pdf');
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

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleAction} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />Creating Mirror Layout...</> : 'Create Mirror Layout'}
      </Button>
    </Box>
  );
};

const MirrorPdfPages = () => {
  const content = (
    <>
      <Typography variant="h2">How to Mirror PDF Pages</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to mirror.</li>
          <li>Click <strong>Create Mirror Layout</strong> — each page is placed on the left half of a double-width spread, with a horizontally flipped copy on the right half.</li>
          <li>The mirrored PDF downloads automatically.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A single-page PDF with a logo on the left side produces a double-width spread: the original on the
        left and a mirrored reflection on the right, creating a symmetrical mirror-image layout suitable for
        fold proofs or artistic designs.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Creating spread layouts for print proofs to visualize how a page looks when folded.</li>
          <li>Generating symmetrical mirror designs for artistic or presentation purposes.</li>
          <li>Checking how content aligns across a fold in booklet or magazine layouts.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does this work with multi-page PDFs?</strong> Yes — each page becomes its own double-width spread with a mirrored right side.</li>
          <li><strong>Will the page size change?</strong> The output pages are double the original width to accommodate both the original and mirrored copy side by side.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — everything happens in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/mirror-pdf-pages" content={content}>
      <MirrorPdfPagesContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default MirrorPdfPages;
