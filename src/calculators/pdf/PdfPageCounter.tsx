'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';

const PdfPageCounterContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleCount = async () => {
    setError('');
    setPageCount(null);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);
      setPageCount(doc.getPageCount());
    } catch {
      setError('Could not read this file. Make sure it is a valid PDF.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box>
      {dialog}
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setPageCount(null); }} label="PDF file" selectedNames={file ? [file.name] : []} />

      {pageCount !== null && (
        <Box sx={{ mt: 3, p: 3, borderRadius: 2, bgcolor: 'grey.50', border: '1px solid', borderColor: 'grey.300' }}>
          <Typography variant="body2" color="text.secondary">File</Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>{file?.name}</Typography>
          <Typography variant="body2" color="text.secondary">Size</Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            {file ? `${(file.size / 1024).toFixed(1)} KB` : ''}
          </Typography>
          <Typography variant="body2" color="text.secondary">Pages</Typography>
          <Typography variant="h3" color="primary">{pageCount}</Typography>
        </Box>
      )}

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleCount} disabled={busy || !file}>
        {busy ? 'Counting...' : 'Count Pages'}
      </Button>
    </Box>
  );
};

const PdfPageCounter = () => {
  const content = (
    <>
      <Typography variant="h2">How to Count Pages in a PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to inspect.</li>
          <li>Click <strong>Count Pages</strong> — the page count is shown instantly along with the file name and size.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 45-page quarterly report PDF uploaded to this tool will display <strong>45</strong> as the page count,
        along with the file&apos;s name and size in kilobytes.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking how many pages a PDF has before printing to estimate paper usage.</li>
          <li>Verifying that a document conversion produced the expected number of pages.</li>
          <li>Quickly confirming a contract or report length before sharing it.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does this work with password-protected PDFs?</strong> Yes — if the PDF is password-protected, you will be prompted to enter the password before the page count is calculated.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — the page count is calculated entirely in your browser; the PDF never leaves your device.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell
      url="/tools/pdf-page-counter"
      content={content}
    >
      <PdfPageCounterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfPageCounter;
