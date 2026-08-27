'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, TextField } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer, parsePageRanges } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';

const DuplicatePdfPagesContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState('');
  const [copies, setCopies] = useState('1');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleDuplicate = async () => {
    setError('');
    if (!file) { setError('Choose a PDF file first.'); return; }
    const dupCount = parseInt(copies, 10);
    if (!dupCount || dupCount < 1 || dupCount > 10) { setError('Copies must be between 1 and 10.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);
      const pageCount = doc.getPageCount();
      const targets = parsePageRanges(pages, pageCount).sort((a, b) => a - b);
      if (targets.length === 0) { setError('Enter at least one valid page number.'); setBusy(false); return; }

      let insertOffset = 0;
      for (const pageIndex of targets) {
        const adjustedIndex = pageIndex + insertOffset;
        for (let c = 0; c < dupCount; c++) {
          const [copiedPage] = await doc.copyPages(doc, [pageIndex]);
          doc.insertPage(adjustedIndex + c + 1, copiedPage);
        }
        insertOffset += dupCount;
      }

      const output = await doc.save();
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-duplicated.pdf');
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
          label="Pages to duplicate"
          placeholder="e.g. 1, 3-4"
          value={pages}
          onChange={(e) => setPages(e.target.value)}
          helperText="Comma-separated page numbers and/or ranges, 1-indexed."
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Extra copies per page"
          type="number"
          value={copies}
          onChange={(e) => setCopies(e.target.value)}
          inputProps={{ min: 1, max: 10 }}
          helperText="How many duplicate copies to create for each selected page."
        />
      </Box>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleDuplicate} disabled={busy || !file || !pages}>
        {busy ? 'Duplicating...' : 'Duplicate Pages'}
      </Button>
    </Box>
  );
};

const DuplicatePdfPages = () => {
  const content = (
    <>
      <Typography variant="h2">How to Duplicate PDF Pages</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to modify.</li>
          <li>Enter the page numbers to duplicate and how many extra copies of each.</li>
          <li>Click <strong>Duplicate Pages</strong> to download the updated PDF.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Duplicating page <code>1</code> with 2 extra copies on a 3-page document produces a 5-page PDF:
        the original page 1 is followed by two copies, then the rest of the document continues.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Repeating an important page (like a cover or summary) multiple times.</li>
          <li>Creating a handout where certain pages need multiple copies per recipient.</li>
          <li>Duplicating a form page so users have a spare to fill out again.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Where do the duplicates appear?</strong> Immediately after the original page.</li>
          <li><strong>What if I duplicate the same page twice?</strong> Each duplication is based on the original page index, so duplicating page 1 twice will copy the same original page.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — everything happens locally in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/duplicate-pdf-pages" content={content}>
      <DuplicatePdfPagesContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default DuplicatePdfPages;
