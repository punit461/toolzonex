'use client';

import { useState } from 'react';
import { Box, Typography, Button, TextField, Alert } from '@mui/material';
import { PDFDocument } from 'pdf-lib';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer, parsePageRanges } from './pdfUtils';

const ExtractPdfPagesContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const handleExtract = async () => {
    setError('');
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await PDFDocument.load(bytes);
      const pageCount = doc.getPageCount();
      const keep = parsePageRanges(pages, pageCount);
      if (keep.length === 0) { setError('Enter at least one valid page number to extract.'); setBusy(false); return; }

      const output = await PDFDocument.create();
      const copied = await output.copyPages(doc, keep);
      copied.forEach((p) => output.addPage(p));
      const bytesOut = await output.save();
      downloadBytes(bytesOut, file.name.replace(/\.pdf$/i, '') + '-extracted.pdf');
    } catch (e) {
      setError('Could not extract pages from this file. Make sure it is a valid, non-password-protected PDF.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box>
      <PdfFileDropzone onFilesSelected={(files) => setFile(files[0] ?? null)} label="PDF file" selectedNames={file ? [file.name] : []} />

      <Box sx={{ mt: 3 }}>
        <Typography gutterBottom>Pages to extract</Typography>
        <TextField
          fullWidth
          placeholder="e.g. 1, 3-5"
          value={pages}
          onChange={(e) => setPages(e.target.value)}
          helperText="Comma-separated page numbers and/or ranges, 1-indexed. Only these pages will be kept."
        />
      </Box>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleExtract} disabled={busy || !file || !pages}>
        {busy ? 'Extracting...' : 'Extract Pages'}
      </Button>
    </Box>
  );
};

const ExtractPdfPages = () => {
  const content = (
    <>
      <Typography variant="h2">How to Extract Pages from a PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to extract pages from.</li>
          <li>Enter the page numbers or ranges to keep — e.g. <code>1, 3-5</code>.</li>
          <li>Click <strong>Extract Pages</strong> to download a new PDF containing only those pages.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Entering <code>1, 3-5</code> on a 10-page PDF produces a new 4-page PDF containing pages 1, 3, 4, and 5
        — everything else is dropped.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Pulling a specific chapter or section out of a larger document.</li>
          <li>Creating a shorter version of a report with only the relevant pages.</li>
          <li>Saving just the signature page from a signed contract.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from Delete Pages?</strong> Extract keeps only the pages you list; Delete removes only the pages you list and keeps the rest.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — extraction happens entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell
      url="/tools/extract-pdf-pages"
      content={content}
    >
      <ExtractPdfPagesContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ExtractPdfPages;
