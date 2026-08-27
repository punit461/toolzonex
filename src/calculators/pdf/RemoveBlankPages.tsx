'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, CircularProgress, Paper } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';
import { PDFDocument } from '@cantoo/pdf-lib';
import { loadPdfJsDocument } from './pdfThumbnails';

const RemoveBlankPagesContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [removedPages, setRemovedPages] = useState<number[] | null>(null);
  const [totalBefore, setTotalBefore] = useState(0);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleRemove = async () => {
    setError('');
    setRemovedPages(null);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);

      const pdfDoc = await loadPdfJsDocument(bytes);
      const blankPages: number[] = [];
      for (let i = 1; i <= pdfDoc.numPages; i++) {
        const page = await pdfDoc.getPage(i);
        const textContent = await page.getTextContent();
        if (textContent.items.length === 0) {
          blankPages.push(i);
        }
      }

      setTotalBefore(pdfDoc.numPages);

      if (blankPages.length === 0) {
        setError('No blank pages found — every page contains text content.');
        setBusy(false);
        return;
      }

      const doc = await unlock(bytes);
      const removeIndices = blankPages.map((p) => p - 1).sort((a, b) => b - a);
      for (const idx of removeIndices) {
        doc.removePage(idx);
      }

      const output = await doc.save();
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-no-blanks.pdf');
      setRemovedPages(blankPages);
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
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setRemovedPages(null); }} label="PDF file" selectedNames={file ? [file.name] : []} />

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleRemove} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />Processing...</> : 'Remove Blank Pages'}
      </Button>

      {removedPages && (
        <Paper sx={{ mt: 3, p: 3 }}>
          <Alert severity="success" sx={{ mb: 2 }}>
            Removed {removedPages.length} blank page{removedPages.length !== 1 ? 's' : ''} from {totalBefore} total page{totalBefore !== 1 ? 's' : ''}.
          </Alert>
          <Typography variant="subtitle2" gutterBottom>Pages removed</Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {removedPages.map((p) => (
              <Paper key={p} variant="outlined" sx={{ px: 1.5, py: 0.5, typography: 'body2' }}>
                Page {p}
              </Paper>
            ))}
          </Box>
        </Paper>
      )}
    </Box>
  );
};

const RemoveBlankPages = () => {
  const content = (
    <>
      <Typography variant="h2">How to Remove Blank Pages from a PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to clean up.</li>
          <li>Click <strong>Remove Blank Pages</strong> — the tool checks each page for text content.</li>
          <li>Blank pages are removed and the cleaned PDF is downloaded automatically. A summary shows which pages were removed.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 50-page scanned document has 5 completely blank separator pages. The tool detects them by checking
        for text content on each page, removes them, and delivers a 45-page file with a report showing exactly
        which page numbers were dropped.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Cleaning up scanned or exported documents that contain empty separator pages.</li>
          <li>Reducing file size by removing unnecessary blank pages from reports or contracts.</li>
          <li>Preparing a PDF for print or digital publishing by eliminating blank sheets.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How does it detect blank pages?</strong> A page is considered blank if its text content layer has no items. Pages that contain only images but no text will not be flagged as blank.</li>
          <li><strong>Can I undo this?</strong> No — the modified file is saved as a new download. Keep the original if you may need it later.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — everything happens in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/remove-blank-pages" content={content}>
      <RemoveBlankPagesContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RemoveBlankPages;
