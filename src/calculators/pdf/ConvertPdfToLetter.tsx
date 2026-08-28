'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, CircularProgress } from '@mui/material';
import { PDFDocument } from '@cantoo/pdf-lib';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';

const LETTER_WIDTH = 612;
const LETTER_HEIGHT = 792;

const ConvertPdfToLetterContent = () => {
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
        const scale = Math.min(LETTER_WIDTH / width, LETTER_HEIGHT / height);
        const scaledWidth = width * scale;
        const scaledHeight = height * scale;
        const x = (LETTER_WIDTH - scaledWidth) / 2;
        const y = (LETTER_HEIGHT - scaledHeight) / 2;

        const newPage = newDoc.addPage([LETTER_WIDTH, LETTER_HEIGHT]);
        const [embeddedPage] = await newDoc.embedPdf(doc, [i]);
        newPage.drawPage(embeddedPage, { x, y, width: scaledWidth, height: scaledHeight });
      }

      const output = await newDoc.save();
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-letter.pdf');
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
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />Converting...</> : 'Convert to Letter'}
      </Button>
    </Box>
  );
};

const ConvertPdfToLetter = () => {
  const content = (
    <>
      <Typography variant="h2">How to Convert a PDF to US Letter Size</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want resized to US Letter dimensions.</li>
          <li>Click <strong>Convert to Letter</strong> — every page is resized to 8.5 &times; 11 inches (612 &times; 792 points).</li>
          <li>Download the output file with uniform Letter-sized pages.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A Legal-sized document that needs to be printed on standard office paper becomes a Letter-sized
        PDF where every page fits exactly onto the 8.5 &times; 11 inch sheets commonly found in homes and
        offices across the United States and Canada.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Converting a Legal-sized PDF to Letter for printing on standard home or office paper.</li>
          <li>Normalizing a mixed-size document so it prints correctly without scaling prompts.</li>
          <li>Preparing an A4 document for US Letter output when exact point-level sizing is needed.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What is US Letter size?</strong> US Letter is 8.5 &times; 11 inches, or 612 &times; 792 points. It is slightly wider and shorter than A4 (210 &times; 297 mm).</li>
          <li><strong>Does this stretch or crop my content?</strong> No — each page&apos;s original aspect ratio is preserved. Content is scaled proportionally to fit within the Letter page and centred, so it may not fill the page edge-to-edge if the original had a different aspect ratio.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — conversion happens entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/convert-pdf-to-letter" content={content}>
      <ConvertPdfToLetterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ConvertPdfToLetter;
