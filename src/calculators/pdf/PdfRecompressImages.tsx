'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, FormControl, InputLabel, Select, MenuItem, Paper } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { readFileAsArrayBuffer, downloadBytes } from './pdfUtils';
import { loadPdfJsDocument } from './pdfThumbnails';
import { PDFDocument } from '@cantoo/pdf-lib';

const QUALITY_OPTIONS = [
  { value: 0.3, label: 'Low (smallest file)' },
  { value: 0.55, label: 'Medium (balanced)' },
  { value: 0.8, label: 'High (best quality)' },
];

function formatBytes(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(2) + ' MB';
}

const PdfRecompressImagesContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState<number>(0.55);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [sizes, setSizes] = useState<{ original: number; output: number } | null>(null);

  const handleAction = async () => {
    setError('');
    setSizes(null);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const originalSize = file.size;
      const bytes = await readFileAsArrayBuffer(file);

      const pdf = await loadPdfJsDocument(bytes);
      const outDoc = await PDFDocument.create();

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Could not create canvas context.');
        await page.render({ canvas, viewport }).promise;

        const jpegData = canvas.toDataURL('image/jpeg', quality);
        const base64 = jpegData.split(',')[1];
        const imgBytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
        const img = await outDoc.embedJpg(imgBytes);

        const basePage = await outDoc.addPage([page.getViewport({ scale: 1 }).width, page.getViewport({ scale: 1 }).height]);
        basePage.drawImage(img, { x: 0, y: 0, width: basePage.getWidth(), height: basePage.getHeight() });
      }

      const output = await outDoc.save();
      setSizes({ original: originalSize, output: output.length });
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-recompressed.pdf');
    } catch {
      setError('Could not process this file. Make sure it is a valid PDF.');
    } finally { setBusy(false); }
  };

  return (
    <Box>
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setSizes(null); }} label="PDF file" selectedNames={file ? [file.name] : []} />
      <FormControl fullWidth sx={{ mt: 3 }}>
        <InputLabel>Image Quality</InputLabel>
        <Select value={quality} label="Image Quality" onChange={(e) => setQuality(Number(e.target.value))}>
          {QUALITY_OPTIONS.map((o) => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
        </Select>
      </FormControl>
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      {sizes && (
        <Paper variant="outlined" sx={{ mt: 2, p: 2, display: 'flex', gap: 3, alignItems: 'center' }}>
          <Box>
            <Typography variant="caption" color="text.secondary">Original</Typography>
            <Typography variant="h6">{formatBytes(sizes.original)}</Typography>
          </Box>
          <Typography variant="h4" color="text.secondary">&rarr;</Typography>
          <Box>
            <Typography variant="caption" color="text.secondary">Recompressed</Typography>
            <Typography variant="h6">{formatBytes(sizes.output)}</Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">Saved</Typography>
            <Typography variant="h6" color="success.main">
              {sizes.original > sizes.output
                ? `${((1 - sizes.output / sizes.original) * 100).toFixed(0)}%`
                : 'Larger'}
            </Typography>
          </Box>
        </Paper>
      )}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleAction} disabled={busy || !file}>
        {busy ? 'Processing...' : 'Recompress Images'}
      </Button>
    </Box>
  );
};

const PdfRecompressImages = () => {
  const content = (
    <>
      <Typography variant="h2">How to Recompress PDF Images</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF with images you want to reduce in size.</li>
          <li>Pick a quality level (low, medium, or high).</li>
          <li>Click <strong>Recompress Images</strong> to re-encode the images at lower quality and download the smaller PDF.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A photo-heavy PDF at 8 MB with medium quality selected might compress to around 3 MB, saving
        over 60% of file size. The visible quality difference is usually minimal for screen viewing.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Reducing the size of a PDF before emailing it as an attachment.</li>
          <li>Optimizing image-heavy reports for web publishing.</li>
          <li>Shrinking a scanned document that has unnecessarily large images.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Will this reduce text quality?</strong> No — only embedded images are re-encoded. Text and vector graphics remain crisp.</li>
          <li><strong>Why is the output sometimes larger?</strong> If the original images were already compressed aggressively, re-encoding may not shrink them further.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — recompression runs entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-recompress-images" content={content}>
      <PdfRecompressImagesContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfRecompressImages;
