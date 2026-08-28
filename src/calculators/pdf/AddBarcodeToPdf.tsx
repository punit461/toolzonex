'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, TextField, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import JsBarcode from 'jsbarcode';
import { PDFDocument } from '@cantoo/pdf-lib';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';

type Position = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

function generateBarcodePng(value: string, format: string): string {
  const canvas = document.createElement('canvas');
  JsBarcode(canvas, value, { format, width: 2, height: 60, displayValue: true, margin: 8, background: '#ffffff', lineColor: '#000000' });
  return canvas.toDataURL('image/png');
}

const AddBarcodeToPdfContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [value, setValue] = useState('123456789012');
  const [format, setFormat] = useState('CODE128');
  const [position, setPosition] = useState<Position>('bottom-right');
  const [pageNumber, setPageNumber] = useState('1');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleAdd = async () => {
    setError('');
    if (!file) { setError('Choose a PDF file first.'); return; }
    if (!value.trim()) { setError('Enter a value to encode.'); return; }
    setBusy(true);
    try {
      let barcodeDataUrl: string;
      try {
        barcodeDataUrl = generateBarcodePng(value.trim(), format);
      } catch {
        setError('This value is not valid for the selected barcode format.');
        setBusy(false);
        return;
      }

      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);
      const pageCount = doc.getPageCount();
      const targetIndex = Math.min(Math.max(1, parseInt(pageNumber, 10) || 1), pageCount) - 1;
      const page = doc.getPage(targetIndex);
      const { width: pageWidth, height: pageHeight } = page.getSize();

      const pngBytes = await (await fetch(barcodeDataUrl)).arrayBuffer();
      const pngImage = await doc.embedPng(pngBytes);
      const margin = 24;
      const drawWidth = Math.min(160, pageWidth - margin * 2);
      const drawHeight = drawWidth * (pngImage.height / pngImage.width);

      let x = margin;
      let y = margin;
      if (position === 'top-left') { x = margin; y = pageHeight - margin - drawHeight; }
      else if (position === 'top-right') { x = pageWidth - margin - drawWidth; y = pageHeight - margin - drawHeight; }
      else if (position === 'bottom-left') { x = margin; y = margin; }
      else { x = pageWidth - margin - drawWidth; y = margin; }

      page.drawImage(pngImage, { x, y, width: drawWidth, height: drawHeight });

      const output = await doc.save();
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-with-barcode.pdf');
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) {
        setError('Could not add a barcode to this file. Make sure it is a valid PDF.');
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box>
      {dialog}
      <PdfFileDropzone onFilesSelected={(files) => setFile(files[0] ?? null)} label="PDF file" selectedNames={file ? [file.name] : []} />

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mt: 3 }}>
        <TextField label="Barcode value" value={value} onChange={(e) => setValue(e.target.value)} fullWidth />
        <FormControl fullWidth>
          <InputLabel>Barcode format</InputLabel>
          <Select value={format} label="Barcode format" onChange={(e) => setFormat(e.target.value)}>
            <MenuItem value="CODE128">CODE128 (Standard alphanumeric)</MenuItem>
            <MenuItem value="CODE39">CODE39 (Uppercase alphanumeric)</MenuItem>
            <MenuItem value="UPC">UPC (12-digit numeric)</MenuItem>
            <MenuItem value="EAN13">EAN13 (13-digit numeric)</MenuItem>
            <MenuItem value="EAN8">EAN8 (8-digit numeric)</MenuItem>
            <MenuItem value="ITF14">ITF14 (14-digit numeric)</MenuItem>
            <MenuItem value="MSI">MSI (Numeric)</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Page number"
          type="number"
          value={pageNumber}
          onChange={(e) => setPageNumber(e.target.value)}
          fullWidth
          helperText="Which page to place the barcode on (1-indexed)."
        />
        <FormControl fullWidth>
          <InputLabel>Position</InputLabel>
          <Select value={position} label="Position" onChange={(e) => setPosition(e.target.value as Position)}>
            <MenuItem value="top-left">Top left</MenuItem>
            <MenuItem value="top-right">Top right</MenuItem>
            <MenuItem value="bottom-left">Bottom left</MenuItem>
            <MenuItem value="bottom-right">Bottom right</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleAdd} disabled={busy || !file || !value.trim()}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />Adding Barcode...</> : 'Add Barcode to PDF'}
      </Button>
    </Box>
  );
};

const AddBarcodeToPdf = () => {
  const content = (
    <>
      <Typography variant="h2">How to Add a Barcode to a PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to add a barcode to.</li>
          <li>Enter the value to encode and choose a barcode format (CODE128, CODE39, UPC, EAN, etc.).</li>
          <li>Choose which page to place it on and which corner to position it in.</li>
          <li>Click <strong>Add Barcode to PDF</strong> to download the file with the barcode embedded.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Entering &quot;INV-2025-0042&quot; with format CODE128, placed in the bottom-right corner of page 1, stamps
        a scannable barcode onto your invoice PDF without needing any design software.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Adding a scannable tracking or reference code to invoices, labels, or shipping documents.</li>
          <li>Stamping a barcode onto a product spec sheet or asset tag PDF.</li>
          <li>Adding a batch or lot number barcode to a quality control document.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Which barcode format should I use?</strong> CODE128 works for general alphanumeric text, UPC/EAN are standard for retail products, and CODE39 is common in logistics and inventory systems — check what your scanner expects.</li>
          <li><strong>Can I add a barcode to more than one page?</strong> This tool adds one barcode to one chosen page per run — repeat the process (uploading the result again) to stamp additional pages.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — barcode generation and embedding both happen entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/add-barcode-to-pdf" content={content}>
      <AddBarcodeToPdfContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default AddBarcodeToPdf;
