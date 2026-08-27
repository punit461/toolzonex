'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, TextField } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';
import { PDFDocument } from '@cantoo/pdf-lib';

const InsertBlankPagesContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [position, setPosition] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleInsert = async () => {
    setError('');
    if (!file) { setError('Choose a PDF file first.'); return; }
    const pos = parseInt(position, 10);
    if (!pos || pos < 1) { setError('Enter a valid position (1 or higher).'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);
      const pageCount = doc.getPageCount();
      const insertAt = Math.min(pos - 1, pageCount);
      const refPage = doc.getPage(insertAt < pageCount ? insertAt : pageCount - 1);
      const { width, height } = refPage.getSize();
      doc.insertPage(insertAt, [width, height]);
      const output = await doc.save();
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-blank-inserted.pdf');
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

      <Box sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="Insert after page number"
          placeholder="e.g. 3"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          helperText="1-based position. A blank page will be inserted at this position."
        />
      </Box>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleInsert} disabled={busy || !file || !position}>
        {busy ? 'Inserting...' : 'Insert Blank Page'}
      </Button>
    </Box>
  );
};

const InsertBlankPages = () => {
  const content = (
    <>
      <Typography variant="h2">How to Insert Blank Pages into a PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to modify.</li>
          <li>Enter the page position where you want the blank page inserted.</li>
          <li>Click <strong>Insert Blank Page</strong> to download the modified PDF.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Entering position <code>3</code> on a 5-page PDF inserts a new blank page between pages 2 and 3,
        shifting everything after it forward and producing a 6-page document.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Adding spacing between sections of a report.</li>
          <li>Preparing a document for double-sided printing where an odd page count needs adjustment.</li>
          <li>Creating placeholder pages for content you plan to add later.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What happens if I enter a position past the last page?</strong> The blank page is appended at the end.</li>
          <li><strong>What size is the blank page?</strong> It matches the dimensions of the page at the insertion position.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — everything happens locally in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/insert-blank-pages" content={content}>
      <InsertBlankPagesContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default InsertBlankPages;
