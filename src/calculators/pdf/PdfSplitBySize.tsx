'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, TextField, CircularProgress } from '@mui/material';
import { PDFDocument } from '@cantoo/pdf-lib';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';

const PdfSplitBySizeContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [targetMB, setTargetMB] = useState('2');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState('');
  const [parts, setParts] = useState(0);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleAction = async () => {
    setError('');
    setParts(0);
    if (!file) { setError('Choose a PDF file first.'); return; }
    const targetBytes = (parseFloat(targetMB) || 2) * 1024 * 1024;
    if (targetBytes < 10240) { setError('Target size must be at least 10 KB.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);
      const pageCount = doc.getPageCount();
      const totalBytes = bytes.byteLength;
      const estimatedParts = Math.max(1, Math.ceil(totalBytes / targetBytes));
      const pagesPerPart = Math.max(1, Math.ceil(pageCount / estimatedParts));

      const baseName = file.name.replace(/\.pdf$/i, '');
      let partIndex = 0;

      for (let start = 0; start < pageCount; start += pagesPerPart) {
        partIndex++;
        const end = Math.min(start + pagesPerPart, pageCount);
        setProgress(`Building part ${partIndex} (pages ${start + 1}–${end})...`);
        const part = await PDFDocument.create();
        const indices = Array.from({ length: end - start }, (_, k) => start + k);
        const copiedPages = await part.copyPages(doc, indices);
        copiedPages.forEach((p) => part.addPage(p));
        const output = await part.save();
        downloadBytes(output, `${baseName}-part${partIndex}.pdf`);
        await new Promise((r) => setTimeout(r, 200));
      }

      setParts(partIndex);
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) {
        setError('Could not process this file. Make sure it is a valid PDF.');
      }
    } finally {
      setBusy(false);
      setProgress('');
    }
  };

  return (
    <Box>
      {dialog}
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setParts(0); }} label="PDF file" selectedNames={file ? [file.name] : []} />

      <Box sx={{ mt: 3 }}>
        <TextField
          fullWidth
          type="number"
          label="Target size per part (MB)"
          value={targetMB}
          onFocus={(e) => e.target.select()}
          onChange={(e) => setTargetMB(e.target.value)}
          helperText="Each downloaded file will be approximately this size or smaller."
        />
      </Box>

      {parts > 0 && (
        <Alert severity="success" sx={{ mt: 2 }}>
          Done — {parts} file{parts !== 1 ? 's' : ''} downloaded.
        </Alert>
      )}

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleAction} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />{progress || 'Splitting...'}</> : 'Split by Size'}
      </Button>
    </Box>
  );
};

const PdfSplitBySize = () => {
  const content = (
    <>
      <Typography variant="h2">How to Split a PDF by File Size</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to split.</li>
          <li>Enter the maximum file size (in MB) for each part.</li>
          <li>Click <strong>Split by Size</strong> — the tool divides the document into parts that each fit within the target size and downloads them as separate files.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 12 MB PDF split with a 2 MB target produces roughly 6 smaller files. Each file contains a
        consecutive chunk of pages and is estimated to be under 2 MB when saved. This is especially
        useful when an email or upload service has a strict file-size limit.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Breaking a large PDF into parts that fit under an email attachment size limit.</li>
          <li>Splitting a heavy document for upload to platforms with file-size caps.</li>
          <li>Dividing a long report into smaller, more manageable chunks for sharing.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why isn&apos;t every part exactly the target size?</strong> The tool divides pages into roughly equal chunks based on the total file size. The actual size of each part depends on the content of those specific pages, so some variation is expected.</li>
          <li><strong>Can I split into single-page files?</strong> Yes — set the target size very low (e.g. 0.01 MB). Each page will become its own file.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — splitting happens entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-split-by-size" content={content}>
      <PdfSplitBySizeContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfSplitBySize;
