'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, Slider, Paper } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { readFileAsArrayBuffer, downloadBytes } from './pdfUtils';
import { loadPdfJsDocument } from './pdfThumbnails';
import { PDFDocument } from '@cantoo/pdf-lib';

function formatBytes(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(2) + ' MB';
}

const PdfImageQualityOptimizerContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState<number>(60);
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
      const q = quality / 100;

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Could not create canvas context.');
        await page.render({ canvas, viewport }).promise;

        const jpegData = canvas.toDataURL('image/jpeg', q);
        const base64 = jpegData.split(',')[1];
        const imgBytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
        const img = await outDoc.embedJpg(imgBytes);

        const baseViewport = page.getViewport({ scale: 1 });
        const basePage = await outDoc.addPage([baseViewport.width, baseViewport.height]);
        basePage.drawImage(img, { x: 0, y: 0, width: basePage.getWidth(), height: basePage.getHeight() });
      }

      const output = await outDoc.save();
      setSizes({ original: originalSize, output: output.length });
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-optimized.pdf');
    } catch {
      setError('Could not process this file. Make sure it is a valid PDF.');
    } finally { setBusy(false); }
  };

  return (
    <Box>
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setSizes(null); }} label="PDF file" selectedNames={file ? [file.name] : []} />

      <Box sx={{ mt: 3, px: 1 }}>
        <Typography variant="subtitle2" gutterBottom>Image Quality: {quality}%</Typography>
        <Slider
          value={quality}
          onChange={(_, v) => setQuality(v as number)}
          min={10}
          max={100}
          step={5}
          marks={[
            { value: 10, label: '10%' },
            { value: 50, label: '50%' },
            { value: 100, label: '100%' },
          ]}
          valueLabelDisplay="auto"
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="caption" color="text.secondary">Smaller file</Typography>
          <Typography variant="caption" color="text.secondary">Better quality</Typography>
        </Box>
      </Box>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      {sizes && (
        <Paper variant="outlined" sx={{ mt: 2, p: 2, display: 'flex', gap: 3, alignItems: 'center' }}>
          <Box>
            <Typography variant="caption" color="text.secondary">Original</Typography>
            <Typography variant="h6">{formatBytes(sizes.original)}</Typography>
          </Box>
          <Typography variant="h4" color="text.secondary">&rarr;</Typography>
          <Box>
            <Typography variant="caption" color="text.secondary">Optimized</Typography>
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
        {busy ? 'Processing...' : 'Optimize Images'}
      </Button>
    </Box>
  );
};

const PdfImageQualityOptimizer = () => {
  const content = (
    <>
      <Typography variant="h2">How to Optimize PDF Image Quality</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to optimize.</li>
          <li>Use the slider to set the JPEG quality level from 10% (smallest) to 100% (original quality).</li>
          <li>Click <strong>Optimize Images</strong> to re-encode images at the chosen quality and download the result.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Setting quality to 30% on a 10 MB PDF full of screenshots can shrink it to under 2 MB.
        The images will look slightly softer on close inspection but remain perfectly readable at normal zoom.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Fine-tuning the trade-off between file size and visual quality for presentations.</li>
          <li>Reducing a large PDF to meet email attachment size limits.</li>
          <li>Optimizing PDFs for fast loading on a website or intranet.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What quality percentage should I choose?</strong> 40-60% is a good starting point for most documents. Text and vector elements are unaffected.</li>
          <li><strong>Does this affect text sharpness?</strong> No — only raster images embedded in the PDF are re-encoded.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — optimization runs entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-image-quality-optimizer" content={content}>
      <PdfImageQualityOptimizerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfImageQualityOptimizer;
