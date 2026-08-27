'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';

const RemoveCoverPageContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleRemove = async () => {
    setError('');
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);
      if (doc.getPageCount() <= 1) {
        setError('The PDF only has one page — removing it would leave an empty document.');
        setBusy(false);
        return;
      }
      doc.removePage(0);
      const output = await doc.save();
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-no-cover.pdf');
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

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleRemove} disabled={busy || !file}>
        {busy ? 'Removing...' : 'Remove Cover Page'}
      </Button>
    </Box>
  );
};

const RemoveCoverPage = () => {
  const content = (
    <>
      <Typography variant="h2">How to Remove a Cover Page from a PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to modify.</li>
          <li>Click <strong>Remove Cover Page</strong> to delete the first page and download the result.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A report starts with a decorative cover page you don&apos;t need for internal review. Removing it
        drops the first page and keeps the rest intact — no manual editing required.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Stripping an auto-generated cover page before sharing content-only.</li>
          <li>Removing a blank or title page from a downloaded PDF.</li>
          <li>Cleaning up a document before merging it with others.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Which page gets removed?</strong> Always the first page (index 0).</li>
          <li><strong>What if the PDF only has one page?</strong> The tool will warn you — removing the only page would leave an empty document.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — everything happens locally in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/remove-cover-page" content={content}>
      <RemoveCoverPageContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RemoveCoverPage;
