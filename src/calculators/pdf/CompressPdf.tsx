'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, Switch, FormControlLabel, Slider, CircularProgress, Paper } from '@mui/material';
import { PDFDocument } from '@cantoo/pdf-lib';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { loadPdfJsDocument } from './pdfThumbnails';

const MAX_DIMENSION = 1800;

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function dataUrlToBytes(dataUrl: string): Uint8Array {
  const base64 = dataUrl.split(',')[1] ?? '';
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function compressWithRasterization(bytes: ArrayBuffer, quality: number, onProgress: (msg: string) => void): Promise<Uint8Array> {
  const pdf = await loadPdfJsDocument(bytes);
  const output = await PDFDocument.create();

  for (let i = 1; i <= pdf.numPages; i++) {
    onProgress(`Compressing page ${i} of ${pdf.numPages}...`);
    const page = await pdf.getPage(i);
    const baseViewport = page.getViewport({ scale: 1 });
    const scale = Math.min(4, MAX_DIMENSION / Math.max(baseViewport.width, baseViewport.height));
    const viewport = page.getViewport({ scale: Math.max(scale, 0.1) });

    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    if (!canvas.getContext('2d')) throw new Error('Could not create a canvas context.');

    await page.render({ canvas, viewport }).promise;
    const jpegBytes = dataUrlToBytes(canvas.toDataURL('image/jpeg', quality));

    const image = await output.embedJpg(jpegBytes);
    const newPage = output.addPage([baseViewport.width, baseViewport.height]);
    newPage.drawImage(image, { x: 0, y: 0, width: baseViewport.width, height: baseViewport.height });
  }

  return output.save();
}

const CompressPdfContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [strong, setStrong] = useState(false);
  const [quality, setQuality] = useState(0.7);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState('');
  const [result, setResult] = useState<{ bytes: Uint8Array; originalSize: number } | null>(null);

  const handleCompress = async () => {
    setError('');
    setResult(null);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    setProgress(strong ? 'Preparing...' : 'Compressing...');
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const originalSize = file.size;
      let output: Uint8Array;

      if (strong) {
        output = await compressWithRasterization(bytes, quality, setProgress);
      } else {
        const doc = await PDFDocument.load(bytes);
        output = await doc.save({ useObjectStreams: true });
      }

      setResult({ bytes: output, originalSize });
    } catch {
      setError('Could not compress this file. Make sure it is a valid, unencrypted PDF.');
    } finally {
      setBusy(false);
      setProgress('');
    }
  };

  const handleDownload = () => {
    if (!result || !file) return;
    downloadBytes(result.bytes, file.name.replace(/\.pdf$/i, '') + '-compressed.pdf');
  };

  const reduction = result ? Math.max(0, Math.round((1 - result.bytes.length / result.originalSize) * 100)) : 0;

  return (
    <Box>
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setResult(null); }} label="PDF file" selectedNames={file ? [file.name] : []} />

      <Box sx={{ mt: 3 }}>
        <FormControlLabel
          control={<Switch checked={strong} onChange={(e) => { setStrong(e.target.checked); setResult(null); }} />}
          label="Strong compression (lossy, best for scanned or image-heavy PDFs)"
        />

        {strong && (
          <Alert severity="warning" sx={{ mt: 1, mb: 2 }}>
            This mode converts every page into a compressed image. File size drops a lot more, but text will
            no longer be selectable or searchable, and image quality is reduced. Use the standard mode instead
            if your PDF is mostly text and you want to keep it selectable.
          </Alert>
        )}

        {strong && (
          <Box sx={{ mb: 2 }}>
            <Typography gutterBottom>Image quality: {Math.round(quality * 100)}%</Typography>
            <Slider value={quality} min={0.3} max={0.95} step={0.05} onChange={(_, v) => setQuality(v as number)} />
            <Typography variant="caption" color="text.secondary">
              Lower quality means a smaller file but blurrier images and text.
            </Typography>
          </Box>
        )}
      </Box>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 1 }} onClick={handleCompress} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />{progress || 'Compressing...'}</> : 'Compress PDF'}
      </Button>

      {result && (
        <Paper variant="outlined" sx={{ mt: 3, p: 2.5 }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 2 }}>
            <Box>
              <Typography variant="caption" color="text.secondary">Original size</Typography>
              <Typography variant="h6">{formatSize(result.originalSize)}</Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">Compressed size</Typography>
              <Typography variant="h6">{formatSize(result.bytes.length)}</Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">Reduction</Typography>
              <Typography variant="h6" color={reduction > 0 ? 'success.main' : 'text.primary'}>{reduction}%</Typography>
            </Box>
          </Box>
          <Button variant="contained" fullWidth onClick={handleDownload}>Download Compressed PDF</Button>
        </Paper>
      )}
    </Box>
  );
};

const CompressPdf = () => {
  const content = (
    <>
      <Typography variant="h2">How to Compress a PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to shrink.</li>
          <li>By default, <strong>Compress PDF</strong> applies lossless compression — it re-packs the file&apos;s internal structure without changing how any page looks.</li>
          <li>For a much bigger reduction on scanned or image-heavy PDFs, turn on <strong>Strong compression</strong> and pick an image quality, then click <strong>Compress PDF</strong> again.</li>
          <li>Compare the original and compressed sizes, then click <strong>Download Compressed PDF</strong>.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 12 MB scanned PDF made of high-resolution page photos often shrinks to 2-3 MB with standard
        compression, and much further — sometimes under 1 MB — with strong compression at a moderate quality
        setting, since most of its size comes from oversized images rather than text.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Shrinking a PDF so it fits under an email attachment size limit.</li>
          <li>Reducing a scanned document&apos;s size before uploading it to a form or portal.</li>
          <li>Cutting down storage space used by large PDF archives.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Will standard compression change how my PDF looks?</strong> No — it&apos;s lossless. It only re-organizes the file&apos;s internal data more efficiently; every page renders identically.</li>
          <li><strong>What does strong compression change?</strong> It redraws every page as a compressed JPEG image, similar to what most free online PDF compressors do for image-heavy files. This gives a much smaller file, but any selectable text becomes part of the image and can no longer be selected, searched, or copied.</li>
          <li><strong>Why didn&apos;t standard compression shrink my file much?</strong> If a PDF is already efficiently packed (or mostly plain text with few images), there may be little left to compress losslessly — try strong compression if you need a smaller file and can accept the tradeoffs.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — compression happens entirely in your browser; the PDF is never sent to a server.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell
      url="/tools/compress-pdf"
      content={content}
    >
      <CompressPdfContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CompressPdf;
