'use client';

import { useState } from 'react';
import { Box, Typography, Button, TextField, Alert, CircularProgress } from '@mui/material';
import { PDFDocument } from '@cantoo/pdf-lib';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer, parsePageRanges } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const PdfSplitByPageRangeContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [ranges, setRanges] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleSplit = async () => {
    setError('');
    if (!file) { setError('Choose a PDF file first.'); return; }
    const groups = ranges.split(';').map((g) => g.trim()).filter(Boolean);
    if (groups.length === 0) { setError('Enter at least one page range.'); return; }

    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);
      const pageCount = doc.getPageCount();
      const baseName = file.name.replace(/\.pdf$/i, '');

      const parsedGroups = groups.map((spec) => parsePageRanges(spec, pageCount));
      if (parsedGroups.some((g) => g.length === 0)) {
        setError('One of the ranges you entered does not match any page in this PDF.');
        setBusy(false);
        return;
      }

      for (let g = 0; g < parsedGroups.length; g++) {
        const output = await PDFDocument.create();
        const copied = await output.copyPages(doc, parsedGroups[g]);
        copied.forEach((p) => output.addPage(p));
        const outBytes = await output.save();
        downloadBytes(outBytes, `${baseName}-part-${g + 1}.pdf`);
        if (g < parsedGroups.length - 1) await sleep(350);
      }
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) {
        setError('Could not split this file. Make sure it is a valid PDF.');
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
        <Typography gutterBottom>Page ranges (one output file per range, separated by semicolons)</Typography>
        <TextField
          fullWidth
          placeholder="e.g. 1-3; 5; 8-10"
          value={ranges}
          onChange={(e) => setRanges(e.target.value)}
          helperText="Each semicolon-separated group becomes its own downloaded PDF. A group can list several pages/ranges with commas, e.g. 1-2,9."
        />
      </Box>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleSplit} disabled={busy || !file || !ranges}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />Splitting...</> : 'Split PDF'}
      </Button>
    </Box>
  );
};

const PdfSplitByPageRange = () => {
  const content = (
    <>
      <Typography variant="h2">How to Split a PDF by Page Range</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to split.</li>
          <li>Enter one or more page ranges, separated by semicolons — e.g. <code>1-3; 5; 8-10</code> produces
            three separate PDF files.</li>
          <li>Click <strong>Split PDF</strong> — each range downloads as its own PDF file, one after another.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        On a 12-page report, entering <code>1-3; 4-8; 9-12</code> downloads three files: pages 1&ndash;3 as the
        first PDF, pages 4&ndash;8 as the second, and pages 9&ndash;12 as the third — useful for splitting a
        combined document back into its original sections.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Breaking a scanned batch of multiple documents back into individual files.</li>
          <li>Splitting chapters of a book or report into separate PDFs.</li>
          <li>Dividing a multi-invoice PDF into one file per invoice.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What happens with just one range?</strong> You get a single downloaded PDF containing only those pages — equivalent to extracting pages.</li>
          <li><strong>Why do the files download one after another instead of as a zip?</strong> This tool downloads each split file directly as soon as it&apos;s ready, so you don&apos;t need to unzip anything afterward. Your browser may ask to allow multiple downloads the first time — allow it to receive every file.</li>
          <li><strong>Can a group inside a range include multiple pieces?</strong> Yes — within a semicolon-separated group you can combine commas and dashes, e.g. <code>1-2,9</code> as one group produces a single PDF with pages 1, 2, and 9.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — splitting happens entirely in your browser; the PDF is never sent to a server.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-split-by-page-range" content={content}>
      <PdfSplitByPageRangeContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfSplitByPageRange;
