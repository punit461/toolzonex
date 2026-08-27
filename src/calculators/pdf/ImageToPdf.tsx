'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, List, ListItem, ListItemText, IconButton, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { PDFDocument } from '@cantoo/pdf-lib';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes } from './pdfUtils';

const A4_W = 595.28;
const A4_H = 841.89;
const MARGIN = 40;

const readFile = (file: File): Promise<ArrayBuffer> =>
  new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result as ArrayBuffer);
    r.onerror = () => rej(r.error);
    r.readAsArrayBuffer(file);
  });

const imageToPng = async (file: File): Promise<Uint8Array> => {
  const url = URL.createObjectURL(file);
  const img = await new Promise<HTMLImageElement>((res, rej) => {
    const el = new Image();
    el.onload = () => res(el);
    el.onerror = () => rej(new Error('load'));
    el.src = url;
  });
  URL.revokeObjectURL(url);

  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(img, 0, 0);
  const blob = await new Promise<Blob>((res, rej) =>
    canvas.toBlob((b) => (b ? res(b) : rej(new Error('blob'))), 'image/png')
  );
  return new Uint8Array(await blob.arrayBuffer());
};

const ImageToPdfContent = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const addFiles = (newFiles: File[]) => setFiles((prev) => [...prev, ...newFiles]);
  const removeFile = (index: number) => setFiles((prev) => prev.filter((_, i) => i !== index));
  const move = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= files.length) return;
    setFiles((prev) => {
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const handleConvert = async () => {
    setError('');
    if (files.length === 0) { setError('Add at least one image.'); return; }
    setBusy(true);
    try {
      const doc = await PDFDocument.create();
      for (const file of files) {
        const pngBytes = await imageToPng(file);
        const image = await doc.embedPng(pngBytes);
        const availW = A4_W - MARGIN * 2;
        const availH = A4_H - MARGIN * 2;
        const scale = Math.min(availW / image.width, availH / image.height);
        const w = image.width * scale;
        const h = image.height * scale;
        const page = doc.addPage([A4_W, A4_H]);
        page.drawImage(image, {
          x: (A4_W - w) / 2,
          y: (A4_H - h) / 2,
          width: w,
          height: h,
        });
      }
      const output = await doc.save();
      downloadBytes(output, 'images.pdf');
    } catch {
      setError('Could not convert images to PDF. Use JPG, PNG, or WEBP files.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box>
      <PdfFileDropzone multiple accept="image/jpeg,image/png,image/webp" onFilesSelected={addFiles} label="image" />

      {files.length > 0 && (
        <List sx={{ mt: 2 }}>
          {files.map((f, i) => (
            <ListItem
              key={`${f.name}-${i}`}
              sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, mb: 1 }}
              secondaryAction={
                <Stack direction="row" spacing={0.5}>
                  <IconButton size="small" onClick={() => move(i, -1)} disabled={i === 0}><ArrowUpwardIcon fontSize="small" /></IconButton>
                  <IconButton size="small" onClick={() => move(i, 1)} disabled={i === files.length - 1}><ArrowDownwardIcon fontSize="small" /></IconButton>
                  <IconButton size="small" onClick={() => removeFile(i)}><DeleteIcon fontSize="small" /></IconButton>
                </Stack>
              }
            >
              <ListItemText primary={`${i + 1}. ${f.name}`} />
            </ListItem>
          ))}
        </List>
      )}

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleConvert} disabled={busy || files.length === 0}>
        {busy ? 'Converting...' : 'Convert to PDF'}
      </Button>
    </Box>
  );
};

const ImageToPdf = () => {
  const content = (
    <>
      <Typography variant="h2">How to Convert Images to PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload one or more JPG, PNG, or WEBP images.</li>
          <li>Use the arrow buttons to reorder images (each image becomes one A4 page).</li>
          <li>Click <strong>Convert to PDF</strong> — each image is centered and scaled to fit the page.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Upload five scanned pages of a handwritten note as <code>page1.jpg</code> through <code>page5.jpg</code>, reorder them
        if needed, and get back a single 5-page <code>images.pdf</code> ready to share or print.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Combining scanned documents into a single PDF for email or archival.</li>
          <li>Converting phone photos of receipts into a tidy PDF expense report.</li>
          <li>Merging multiple screenshots into a PDF presentation or portfolio.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What image formats are supported?</strong> JPG, PNG, and WEBP. All are converted to PNG internally before embedding.</li>
          <li><strong>Does it fit images to A4?</strong> Yes — each image is scaled proportionally to fill an A4 page with a small margin.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — conversion happens entirely in your browser using pdf-lib.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/image-to-pdf" content={content}>
      <ImageToPdfContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ImageToPdf;
