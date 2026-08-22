'use client';

import { useState } from 'react';
import { Box, Typography, Button, TextField, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer, parsePageRanges } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';

const DeletePdfPagesContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleDelete = async () => {
    setError('');
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);
      const pageCount = doc.getPageCount();
      const toDelete = new Set(parsePageRanges(pages, pageCount));
      if (toDelete.size === 0) { setError('Enter at least one valid page number to delete.'); setBusy(false); return; }
      if (toDelete.size >= pageCount) { setError('You cannot delete every page in the document.'); setBusy(false); return; }

      // Delete from the end so earlier indices stay valid as we go.
      [...toDelete].sort((a, b) => b - a).forEach((i) => doc.removePage(i));

      const output = await doc.save();
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-edited.pdf');
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) {
        setError('Could not edit this file. Make sure it is a valid PDF.');
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
        <Typography gutterBottom>Pages to delete</Typography>
        <TextField
          fullWidth
          placeholder="e.g. 2, 5-7"
          value={pages}
          onChange={(e) => setPages(e.target.value)}
          helperText="Comma-separated page numbers and/or ranges, 1-indexed."
        />
      </Box>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleDelete} disabled={busy || !file || !pages}>
        {busy ? 'Deleting...' : 'Delete Pages'}
      </Button>
    </Box>
  );
};

const DeletePdfPages = () => {
  const content = (
    <>
      <Typography variant="h2">How to Delete Pages from a PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to edit.</li>
          <li>Enter the page numbers or ranges to remove — e.g. <code>2, 5-7</code>.</li>
          <li>Click <strong>Delete Pages</strong> to download the edited PDF.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Entering <code>2, 5-7</code> on a 10-page PDF removes pages 2, 5, 6, and 7, leaving a 6-page document
        with pages 1, 3, 4, 8, 9, and 10.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Removing a blank scanned page.</li>
          <li>Cutting an outdated cover page or appendix before sharing.</li>
          <li>Trimming unwanted pages from a downloaded form.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Is my file uploaded anywhere?</strong> No — everything happens locally in your browser.</li>
          <li><strong>Can I delete every page?</strong> No, at least one page must remain in the output.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell
      url="/tools/delete-pdf-pages"
      content={content}
    >
      <DeletePdfPagesContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default DeletePdfPages;
