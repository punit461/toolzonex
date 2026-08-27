'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';
import { PDFDocument, PDFName, PDFRef } from '@cantoo/pdf-lib';

const RemovePdfBookmarksContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [busy, setBusy] = useState(false);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleRemove = async () => {
    setError('');
    setSuccess('');
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);

      const outlinesRef = doc.catalog.lookupMaybe(PDFName.of('Outlines'), PDFRef);

      if (!outlinesRef) {
        setError('This PDF has no bookmarks to remove.');
        setBusy(false);
        return;
      }

      doc.catalog.delete(PDFName.of('Outlines'));

      const output = await doc.save();
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-no-bookmarks.pdf');
      setSuccess('All bookmarks removed. File downloaded.');
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
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setSuccess(''); }} label="PDF file" selectedNames={file ? [file.name] : []} />

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleRemove} disabled={busy || !file}>
        {busy ? 'Removing...' : 'Remove Bookmarks'}
      </Button>
    </Box>
  );
};

const RemovePdfBookmarks = () => {
  const content = (
    <>
      <Typography variant="h2">How to Remove PDF Bookmarks</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF whose bookmarks you want to remove.</li>
          <li>Click <strong>Remove Bookmarks</strong> to strip all outline entries.</li>
          <li>Download the PDF — the navigation sidebar will no longer show any bookmarks.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 200-page technical manual has a detailed bookmark tree. After removing bookmarks, the PDF is leaner
        and the reader sees no outline panel — useful when distributing a simplified version to clients who
        only need specific pages.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Cleaning up a PDF before publishing it publicly so the outline panel is empty.</li>
          <li>Removing internal chapter markers that should not be visible to external recipients.</li>
          <li>Reducing file size slightly by eliminating the outline structure.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does this delete bookmarks from every page?</strong> Bookmarks are a document-level feature, not per-page. Removing them clears the entire outline tree in one step.</li>
          <li><strong>Can I undo this?</strong> No — once bookmarks are removed, they cannot be restored from the downloaded file. Keep a backup of the original if needed.</li>
          <li><strong>Does this affect the page content?</strong> No — only the outline/bookmark structure is removed. All pages, text, images, and links remain intact.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/remove-pdf-bookmarks" content={content}>
      <RemovePdfBookmarksContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RemovePdfBookmarks;
