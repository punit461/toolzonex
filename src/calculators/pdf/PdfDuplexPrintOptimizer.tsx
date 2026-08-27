'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, Paper, CircularProgress } from '@mui/material';
import { PDFDocument } from '@cantoo/pdf-lib';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';

const PdfDuplexPrintOptimizerContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ originalCount: number; newCount: number; blanksAdded: number } | null>(null);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleAction = async () => {
    setError('');
    setResult(null);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const srcDoc = await unlock(bytes);
      const originalCount = srcDoc.getPageCount();

      const newDoc = await PDFDocument.create();
      const copiedPages = await newDoc.copyPages(srcDoc, srcDoc.getPageIndices());

      for (const page of copiedPages) {
        newDoc.addPage(page);
      }

      const blanksAdded = newDoc.getPageCount() % 2;
      if (blanksAdded > 0) {
        const lastPage = newDoc.getPages()[newDoc.getPageCount() - 1];
        const { width, height } = lastPage.getSize();
        newDoc.addPage([width, height]);
      }

      const output = await newDoc.save();
      setResult({ originalCount, newCount: newDoc.getPageCount(), blanksAdded });
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-duplex.pdf');
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
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setResult(null); }} label="PDF file" selectedNames={file ? [file.name] : []} />

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleAction} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />Optimizing for Duplex...</> : 'Optimize for Duplex Printing'}
      </Button>

      {result && (
        <Paper sx={{ mt: 3, p: 3 }}>
          <Alert severity="success" sx={{ mb: 2 }}>
            Optimized for double-sided printing.
          </Alert>
          <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            <Box>
              <Typography variant="caption" color="text.secondary">Original Pages</Typography>
              <Typography variant="h6">{result.originalCount}</Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">Final Pages</Typography>
              <Typography variant="h6">{result.newCount}</Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">Blank Pages Added</Typography>
              <Typography variant="h6">{result.blanksAdded}</Typography>
            </Box>
          </Box>
          {result.blanksAdded > 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              A blank page was added at the end so the total page count is even, ensuring proper front-back alignment when printing double-sided.
            </Typography>
          )}
        </Paper>
      )}
    </Box>
  );
};

const PdfDuplexPrintOptimizer = () => {
  const content = (
    <>
      <Typography variant="h2">How to Optimize a PDF for Duplex Printing</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to prepare for double-sided printing.</li>
          <li>Click <strong>Optimize for Duplex Printing</strong> — the tool checks the page count and adds a blank page at the end if needed to ensure an even number of pages.</li>
          <li>The optimized PDF downloads automatically, ready for front-back aligned printing.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 15-page document is optimized: one blank page is added at the end, producing a 16-page PDF. When
        printed double-sided, page 16 will be blank on the back, keeping all content pages properly aligned
        front-to-back without content ending up on the wrong side of a sheet.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Preparing odd-page-count documents for double-sided printing without misaligned content.</li>
          <li>Ensuring handouts and booklets print correctly on both sides of each sheet.</li>
          <li>Avoiding the last page of a report printing on the back of a blank sheet.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What if my PDF already has an even page count?</strong> No blank pages are added — the file is downloaded as-is since it is already duplex-ready.</li>
          <li><strong>Does this rearrange pages?</strong> No — page order is preserved. The tool only appends a blank page when needed to make the total count even.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — everything happens in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-duplex-print-optimizer" content={content}>
      <PdfDuplexPrintOptimizerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfDuplexPrintOptimizer;
