'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';
import { PDFDocument } from '@cantoo/pdf-lib';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';

const A4_WIDTH = 595.28;
const A4_HEIGHT = 841.89;

const ConvertPdfToA4Content = () => {
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
      doc.getPages().forEach((page) => {
        page.setSize(A4_WIDTH, A4_HEIGHT);
      });
      const output = await doc.save();
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-a4.pdf');
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
        {busy ? 'Converting...' : 'Convert to A4'}
      </Button>
    </Box>
  );
};

const ConvertPdfToA4 = () => {
  const content = (
    <>
      <Typography variant="h2">How to Convert a PDF to A4</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF whose page size you want to change to A4.</li>
          <li>Click <strong>Convert to A4</strong> — every page is resized to the standard A4 dimensions (210 &times; 297 mm).</li>
          <li>Download the resulting file, which now has uniform A4-sized pages.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A PDF with mixed page sizes — perhaps a scanned Letter-width page followed by a Legal-length
        page — becomes a consistent, print-ready A4 document where every page matches the same 595.28 &times;
        841.89 point dimensions.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Normalizing a scanned document that was mixed Letter and Legal size into a single A4 file.</li>
          <li>Preparing a PDF for submission to an agency or portal that requires A4 format.</li>
          <li>Ensuring consistent page dimensions before sending a PDF to a commercial printer that expects A4.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Will the content stretch or get cut off?</strong> The page canvas is resized to A4 dimensions. Content is not reflowed, so some elements may shift relative to the edges if the original size was significantly different.</li>
          <li><strong>What if my PDF is already A4?</strong> The tool will still run, but the file will be essentially unchanged — it simply ensures all pages are exactly A4.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — conversion happens entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/convert-pdf-to-a4" content={content}>
      <ConvertPdfToA4Content />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ConvertPdfToA4;
