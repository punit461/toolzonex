'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, CircularProgress } from '@mui/material';
import { PDFDocument } from '@cantoo/pdf-lib';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';

const LEGAL_WIDTH = 612;
const LEGAL_HEIGHT = 1008;

const ConvertPdfToLegalContent = () => {
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
      const newDoc = await PDFDocument.create();
      const pageCount = doc.getPageCount();

      for (let i = 0; i < pageCount; i++) {
        const { width, height } = doc.getPage(i).getSize();
        const scale = Math.min(LEGAL_WIDTH / width, LEGAL_HEIGHT / height);
        const scaledWidth = width * scale;
        const scaledHeight = height * scale;
        const x = (LEGAL_WIDTH - scaledWidth) / 2;
        const y = (LEGAL_HEIGHT - scaledHeight) / 2;

        const newPage = newDoc.addPage([LEGAL_WIDTH, LEGAL_HEIGHT]);
        const [embeddedPage] = await newDoc.embedPdf(doc, [i]);
        newPage.drawPage(embeddedPage, { x, y, width: scaledWidth, height: scaledHeight });
      }

      const output = await newDoc.save();
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-legal.pdf');
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
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleAction} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />Converting...</> : 'Convert to Legal'}
      </Button>
    </Box>
  );
};

const ConvertPdfToLegal = () => {
  const content = (
    <>
      <Typography variant="h2">How to Convert a PDF to US Legal Size</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want resized to US Legal dimensions.</li>
          <li>Click <strong>Convert to Legal</strong> — every page is resized to 8.5 &times; 14 inches (612 &times; 1008 points).</li>
          <li>Download the output file with uniform Legal-sized pages.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A collection of scanned documents that were originally Letter-sized becomes a single Legal-sized
        PDF, which is the standard format used by law firms, courts, and government agencies in the United
        States for contracts, briefs, and filings.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Preparing a document for filing in a US court that requires Legal format.</li>
          <li>Converting a Letter-sized contract to Legal size for a law firm&apos;s standard template.</li>
          <li>Normalizing mixed-size scanned legal documents to a single Legal page size.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What is US Legal size?</strong> US Legal is 8.5 &times; 14 inches, or 612 &times; 1008 points in PDF units. It is taller than US Letter (8.5 &times; 11 inches).</li>
          <li><strong>Does this stretch or crop my content?</strong> No — each page&apos;s original aspect ratio is preserved. Content is scaled proportionally to fit within the Legal page and centred, so it may not fill the page edge-to-edge if the original had a different aspect ratio.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — conversion happens entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/convert-pdf-to-legal" content={content}>
      <ConvertPdfToLegalContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ConvertPdfToLegal;
