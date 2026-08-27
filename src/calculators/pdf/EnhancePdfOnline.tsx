'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, FormControl, InputLabel, Select, MenuItem, Paper, CircularProgress } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';
import { PDFDocument } from '@cantoo/pdf-lib';

const ENHANCE_LEVELS = [
  { value: 2, label: 'Standard (2×)', desc: 'Good balance of quality and file size' },
  { value: 3, label: 'High (3×)', desc: 'Sharper output, larger file' },
  { value: 4, label: 'Ultra (4×)', desc: 'Maximum quality, largest file' },
];

const EnhancePdfOnlineContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState('');
  const [level, setLevel] = useState(3);
  const [originalSize, setOriginalSize] = useState(0);
  const [outputSize, setOutputSize] = useState(0);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleEnhance = async () => {
    setError('');
    setOriginalSize(0);
    setOutputSize(0);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);
      setOriginalSize(bytes.byteLength);

      const pdfjs = await import('pdfjs-dist');
      pdfjs.GlobalWorkerOptions.workerSrc = '//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      const pdf = await pdfjs.getDocument({ data: new Uint8Array(bytes.slice(0)) }).promise;

      const newDoc = await PDFDocument.create();
      const pages = doc.getPages();

      for (let i = 0; i < pages.length; i++) {
        setProgress(`Enhancing page ${i + 1} of ${pages.length}...`);
        const page = await pdf.getPage(i + 1);
        const viewport = page.getViewport({ scale: level });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Could not create canvas context.');
        await page.render({ canvas, viewport }).promise;

        const imgDataUrl = canvas.toDataURL('image/png');
        const imgBytes = await fetch(imgDataUrl).then((r) => r.arrayBuffer());
        const img = await newDoc.embedPng(imgBytes);

        const origPage = pages[i];
        const { width, height } = origPage.getSize();
        const newPage = newDoc.addPage([width, height]);
        newPage.drawImage(img, { x: 0, y: 0, width, height });
      }

      const output = await newDoc.save();
      setOutputSize(output.byteLength);
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-enhanced.pdf');
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) {
        setError('Could not enhance this file. Make sure it is a valid PDF.');
      }
    } finally {
      setBusy(false);
      setProgress('');
    }
  };

  const fmtSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <Box>
      {dialog}
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setOriginalSize(0); setOutputSize(0); }} label="PDF file" selectedNames={file ? [file.name] : []} />

      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel>Enhancement Level</InputLabel>
        <Select value={level} label="Enhancement Level" onChange={(e) => setLevel(Number(e.target.value))}>
          {ENHANCE_LEVELS.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>{opt.label} — {opt.desc}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleEnhance} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />{progress || 'Enhancing...'}</> : 'Enhance PDF'}
      </Button>

      {originalSize > 0 && outputSize > 0 && (
        <Paper variant="outlined" sx={{ mt: 3, p: 2 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2, textAlign: 'center' }}>
            <Box>
              <Typography variant="caption" color="text.secondary">Original Size</Typography>
              <Typography variant="h6">{fmtSize(originalSize)}</Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">Enhanced Size</Typography>
              <Typography variant="h6">{fmtSize(outputSize)}</Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">Change</Typography>
              <Typography variant="h6" color={outputSize > originalSize ? 'warning.main' : 'success.main'}>
                {outputSize > originalSize ? '+' : ''}{fmtSize(outputSize - originalSize)}
              </Typography>
            </Box>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

const EnhancePdfOnline = () => {
  const content = (
    <>
      <Typography variant="h2">How to Enhance PDF Quality</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to enhance.</li>
          <li>Choose an enhancement level — Standard (2×), High (3×), or Ultra (4×).</li>
          <li>Click <strong>Enhance PDF</strong> to re-render every page at higher resolution and download the result.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A scanned invoice at standard resolution looks blurry when zoomed in. Enhancing it at 3× re-renders each page
        at triple resolution, producing a sharper PDF that prints cleanly even at larger sizes.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Improving the clarity of scanned documents before printing or archiving.</li>
          <li>Making low-resolution PDF presentations sharper for projection on large screens.</li>
          <li>Boosting the quality of image-heavy PDFs for professional printing.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Will this make my PDF text selectable?</strong> No — this tool re-renders pages as images embedded in a new PDF. The original text layer is not preserved.</li>
          <li><strong>Why is the enhanced file larger?</strong> Higher resolution means more pixel data per page. Ultra (4×) can produce files 8–16× larger than the original.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — enhancement happens entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/enhance-pdf-online-free" content={content}>
      <EnhancePdfOnlineContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default EnhancePdfOnline;
