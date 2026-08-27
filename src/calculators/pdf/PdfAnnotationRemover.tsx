'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';
import { PDFDocument, PDFName, PDFArray } from '@cantoo/pdf-lib';

const PdfAnnotationRemoverContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [removedCount, setRemovedCount] = useState<number | null>(null);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleAction = async () => {
    setError('');
    setRemovedCount(null);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);
      let totalRemoved = 0;

      const pages = doc.getPages();
      for (const page of pages) {
        const annots = page.node.lookup(PDFName.of('Annots'));
        if (annots instanceof PDFArray) {
          totalRemoved += annots.size();
          page.node.delete(PDFName.of('Annots'));
        }
      }

      setRemovedCount(totalRemoved);
      const output = await doc.save();
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-no-annotations.pdf');
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) setError('Could not process this file.');
    } finally { setBusy(false); }
  };

  return (
    <Box>
      {dialog}
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setRemovedCount(null); }} label="PDF file" selectedNames={file ? [file.name] : []} />

      {removedCount !== null && (
        <Alert severity="success" sx={{ mt: 2 }}>
          Removed {removedCount} annotation{removedCount !== 1 ? 's' : ''} from the PDF.
        </Alert>
      )}
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleAction} disabled={busy || !file}>
        {busy ? 'Processing...' : 'Remove Annotations'}
      </Button>
    </Box>
  );
};

const PdfAnnotationRemover = () => {
  const content = (
    <>
      <Typography variant="h2">How to Remove PDF Annotations</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF that contains annotations, comments, highlights, or stamps.</li>
          <li>Click <strong>Remove Annotations</strong> — all annotations are stripped from every page.</li>
          <li>Download the clean PDF and see how many annotations were removed.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A collaborative review PDF with 23 highlights and sticky notes across 8 pages comes back with
        "Removed 23 annotations" and a clean version ready for final distribution.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Cleaning up a reviewed document before sending it to a client or publishing it.</li>
          <li>Removing internal comments and markup from a shared PDF.</li>
          <li>Stripping stamps and watermarks added as annotations.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does this remove form fields?</strong> No — only annotations (comments, highlights, stamps) are removed. Use the Flatten PDF tool for form fields.</li>
          <li><strong>What types of annotations are removed?</strong> All annotation types including text notes, highlights, underlines, stamps, and freehand drawings.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — everything happens locally in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-annotation-remover" content={content}>
      <PdfAnnotationRemoverContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfAnnotationRemover;
