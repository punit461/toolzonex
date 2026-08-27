'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';

const AddBlankLastPageContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleAdd = async () => {
    setError('');
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);
      const lastPage = doc.getPage(doc.getPageCount() - 1);
      const { width, height } = lastPage.getSize();
      doc.addPage([width, height]);
      const output = await doc.save();
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-blank-last.pdf');
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

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleAdd} disabled={busy || !file}>
        {busy ? 'Adding...' : 'Add Blank Last Page'}
      </Button>
    </Box>
  );
};

const AddBlankLastPage = () => {
  const content = (
    <>
      <Typography variant="h2">How to Add a Blank Last Page to a PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to modify.</li>
          <li>Click <strong>Add Blank Last Page</strong> and download the updated file.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 9-page document needs an even number of pages for double-sided printing. Adding a blank last page
        makes it 10 pages so every sheet has content on both sides.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Padding an odd page count to an even number for duplex printing.</li>
          <li>Reserving space at the end of a report for notes or a signature.</li>
          <li>Ensuring a document meets submission guidelines that require a minimum page count.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What size is the blank page?</strong> It matches the dimensions of the last existing page.</li>
          <li><strong>Can I add more than one blank page?</strong> Use this tool once, or try the Insert Blank Pages tool for multiple inserts.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — everything happens locally in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/add-blank-last-page" content={content}>
      <AddBlankLastPageContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default AddBlankLastPage;
