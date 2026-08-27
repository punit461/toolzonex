'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';
import { PDFDocument } from '@cantoo/pdf-lib';

const DPI_OPTIONS = [
  { value: 1, label: '72 DPI' },
  { value: 2, label: '144 DPI' },
  { value: 3, label: '216 DPI' },
];

const PdfToPngContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [scale, setScale] = useState(2);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleConvert = async () => {
    setError('');
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      await unlock(bytes);
      const pdfjs = await import('pdfjs-dist');
      pdfjs.GlobalWorkerOptions.workerSrc = '//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      const pdf = await pdfjs.getDocument({ data: new Uint8Array(bytes) }).promise;
      const baseName = file.name.replace(/\.pdf$/i, '');

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvas, viewport }).promise;
        const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
        if (!blob) continue;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${baseName}_page_${i}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) setError('Could not convert this file. Please ensure it is a valid PDF.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box>
      {dialog}
      <PdfFileDropzone onFilesSelected={(files) => setFile(files[0] ?? null)} label="PDF file" selectedNames={file ? [file.name] : []} />
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel>Output DPI</InputLabel>
        <Select value={scale} label="Output DPI" onChange={(e) => setScale(Number(e.target.value))}>
          {DPI_OPTIONS.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleConvert} disabled={busy || !file}>
        {busy ? 'Exporting...' : 'Export as PNG'}
      </Button>
    </Box>
  );
};

const PdfToPng = () => {
  const content = (
    <>
      <Typography variant="h2">How to Convert PDF to PNG</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Drag and drop your PDF into the upload area or click to browse.</li>
          <li>Select the desired output DPI — higher values produce larger, sharper images.</li>
          <li>Click <strong>Export as PNG</strong> — every page is downloaded as a lossless PNG file.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Uploading a 3-page invoice PDF at 144 DPI yields three PNG files, each named
        <strong> invoice_page_1.png</strong> through <strong>invoice_page_3.png</strong>, with transparent backgrounds
        where applicable.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Preserving PDF page content as lossless PNG images for archival purposes.</li>
          <li>Generating crisp page thumbnails for documentation or wiki pages.</li>
          <li>Creating printable PNG exports of receipts or certificates from a PDF.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>PNG or JPG — which is better?</strong> PNG is lossless and supports transparency, making it ideal for text-heavy documents. Use JPG when file size matters more than quality.</li>
          <li><strong>Is there a page limit?</strong> No — all pages are processed regardless of the PDF length.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-to-png" content={content}>
      <PdfToPngContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfToPng;
