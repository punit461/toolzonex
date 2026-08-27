'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';
import { PDFDocument } from '@cantoo/pdf-lib';

const PdfBookletCreatorContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleCreate = async () => {
    setError('');
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);
      const pageCount = doc.getPageCount();
      const newDoc = await PDFDocument.create();

      const workingCount = pageCount % 2 === 0 ? pageCount : pageCount + 1;
      const half = workingCount / 2;

      const bookletOrder: number[] = [];
      for (let i = 0; i < half; i++) {
        bookletOrder.push(i);
        bookletOrder.push(workingCount - 1 - i);
      }

      const allIndices = Array.from({ length: pageCount }, (_, i) => i);
      const copiedPages = await newDoc.copyPages(doc, allIndices);
      const pageMap = new Map<number, typeof copiedPages[0]>();
      copiedPages.forEach((p, i) => pageMap.set(i, p));

      for (const idx of bookletOrder) {
        if (idx < pageCount && pageMap.has(idx)) {
          newDoc.addPage(pageMap.get(idx));
        } else {
          const [blankPage] = await newDoc.copyPages(doc, [pageCount - 1]);
          newDoc.addPage(blankPage);
        }
      }

      const pdfBytes = await newDoc.save();
      const baseName = file.name.replace(/\.pdf$/i, '');
      downloadBytes(new Uint8Array(pdfBytes), `${baseName}_booklet.pdf`);
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) setError('Could not create booklet. Please ensure the PDF is valid.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box>
      {dialog}
      <PdfFileDropzone onFilesSelected={(files) => setFile(files[0] ?? null)} label="PDF file" selectedNames={file ? [file.name] : []} />
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleCreate} disabled={busy || !file}>
        {busy ? 'Creating Booklet...' : 'Create Booklet'}
      </Button>
    </Box>
  );
};

const PdfBookletCreator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Create a PDF Booklet</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to turn into a booklet.</li>
          <li>Click <strong>Create Booklet</strong> — pages are rearranged in print-ready booklet order.</li>
          <li>Download the reordered PDF, then print it double-sided and fold in half for a booklet.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 12-page newsletter is reordered so that pages 1 and 12 print on the same sheet, pages 2 and 11 on the back, pages 3
        and 10 on the next sheet, and so on — producing a correctly paginated booklet when folded.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Preparing a zine or mini-magazine for double-sided booklet printing.</li>
          <li>Reordering a short story collection or chapbook for saddle-stitch binding.</li>
          <li>Creating a self-pamphlet from a PDF report for distribution at events.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What if my page count is odd?</strong> A blank page is automatically added at the end so that every sheet has content on both sides.</li>
          <li><strong>Do I need special software to print?</strong> No — open the booklet PDF, select &quot;Print on Both Sides&quot; (flip on short edge), and fold the printed stack in half.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-booklet-creator" content={content}>
      <PdfBookletCreatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfBookletCreator;
