'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, CircularProgress } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';
import { loadPdfJsDocument } from './pdfThumbnails';

/** Encodes an opaque canvas as an uncompressed 24-bit BMP (BITMAPINFOHEADER, bottom-up, BGR rows padded to 4 bytes). */
function canvasToBmpBytes(canvas: HTMLCanvasElement): Uint8Array {
  const { width, height } = canvas;
  const ctx = canvas.getContext('2d')!;
  const imageData = ctx.getImageData(0, 0, width, height).data;

  const rowSize = Math.floor((24 * width + 31) / 32) * 4;
  const pixelArraySize = rowSize * height;
  const fileSize = 54 + pixelArraySize;

  const buffer = new ArrayBuffer(fileSize);
  const view = new DataView(buffer);

  // BITMAPFILEHEADER (14 bytes)
  view.setUint8(0, 0x42); // 'B'
  view.setUint8(1, 0x4d); // 'M'
  view.setUint32(2, fileSize, true);
  view.setUint32(6, 0, true);
  view.setUint32(10, 54, true);

  // BITMAPINFOHEADER (40 bytes)
  view.setUint32(14, 40, true);
  view.setInt32(18, width, true);
  view.setInt32(22, height, true);
  view.setUint16(26, 1, true);
  view.setUint16(28, 24, true);
  view.setUint32(30, 0, true);
  view.setUint32(34, pixelArraySize, true);
  view.setInt32(38, 2835, true);
  view.setInt32(42, 2835, true);
  view.setUint32(46, 0, true);
  view.setUint32(50, 0, true);

  let offset = 54;
  for (let y = height - 1; y >= 0; y--) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      view.setUint8(offset++, imageData[idx + 2]); // B
      view.setUint8(offset++, imageData[idx + 1]); // G
      view.setUint8(offset++, imageData[idx]); // R
    }
    for (let p = 0; p < rowSize - width * 3; p++) view.setUint8(offset++, 0);
  }

  return new Uint8Array(buffer);
}

const PdfToBmpContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState('');
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleConvert = async () => {
    setError('');
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      await unlock(bytes);
      const pdf = await loadPdfJsDocument(bytes);
      const baseName = file.name.replace(/\.pdf$/i, '');

      for (let i = 1; i <= pdf.numPages; i++) {
        setProgress(`Converting page ${i} of ${pdf.numPages}...`);
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d')!;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        await page.render({ canvas, viewport }).promise;

        const bmpBytes = canvasToBmpBytes(canvas);
        downloadBytes(bmpBytes, `${baseName}_page_${i}.bmp`, 'image/bmp');
      }
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) {
        setError('Could not convert this file. Please ensure it is a valid PDF.');
      }
    } finally {
      setBusy(false);
      setProgress('');
    }
  };

  return (
    <Box>
      {dialog}
      <PdfFileDropzone onFilesSelected={(files) => setFile(files[0] ?? null)} label="PDF file" selectedNames={file ? [file.name] : []} />

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleConvert} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />{progress || 'Converting...'}</> : 'Convert to BMP'}
      </Button>
    </Box>
  );
};

const PdfToBmp = () => {
  const content = (
    <>
      <Typography variant="h2">How to Convert PDF to BMP</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload your PDF using the file drop zone.</li>
          <li>Click <strong>Convert to BMP</strong> — each page is rendered and downloaded as a separate uncompressed BMP image.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 3-page scanned form converts into three <code>.bmp</code> files, each an uncompressed 24-bit bitmap —
        larger than an equivalent JPG or PNG, but in the raw, universally-compatible format some older
        software, printers, and embedded systems require.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Feeding PDF pages into legacy software or hardware that only accepts BMP images.</li>
          <li>Getting an uncompressed, lossless raster copy of a PDF page for further image processing.</li>
          <li>Working with tools or printers that expect the simple, well-documented BMP format.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why are BMP files so much larger than JPG or PNG?</strong> BMP here is stored uncompressed — every pixel is written directly as 24-bit color, with no compression applied. That makes it simple and lossless, but large.</li>
          <li><strong>Does this support transparency?</strong> No — pages are rendered on a white background and saved as 24-bit BMP without an alpha channel, matching how a printed page looks.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — rendering and BMP encoding both happen entirely in your browser; the PDF is never sent to a server.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-to-bmp" content={content}>
      <PdfToBmpContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfToBmp;
