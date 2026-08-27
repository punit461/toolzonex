'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, TextField, MenuItem } from '@mui/material';
import { PDFDocument, rgb } from '@cantoo/pdf-lib';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';

const COLOR_OPTIONS = [
  { label: 'Black', value: 'black', color: rgb(0, 0, 0) },
  { label: 'Gray', value: 'gray', color: rgb(0.5, 0.5, 0.5) },
  { label: 'Blue', value: 'blue', color: rgb(0.1, 0.3, 0.8) },
  { label: 'Red', value: 'red', color: rgb(0.85, 0.1, 0.1) },
];

const AddPdfBorderContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [color, setColor] = useState('black');
  const [thickness, setThickness] = useState('2');
  const [margin, setMargin] = useState('20');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleAction = async () => {
    setError('');
    if (!file) { setError('Choose a PDF file first.'); return; }
    const t = parseFloat(thickness) || 2;
    const m = parseFloat(margin) || 20;
    if (t <= 0) { setError('Border thickness must be greater than zero.'); return; }
    if (m < 0) { setError('Margin cannot be negative.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);
      const selectedColor = COLOR_OPTIONS.find((c) => c.value === color)?.color ?? rgb(0, 0, 0);

      doc.getPages().forEach((page) => {
        const { width, height } = page.getSize();
        page.drawRectangle({
          x: m,
          y: m,
          width: width - 2 * m,
          height: height - 2 * m,
          borderColor: selectedColor,
          borderWidth: t,
        });
      });

      const output = await doc.save();
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-bordered.pdf');
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) {
        setError('Could not process this file. Make sure it is a valid PDF.');
      }
    } finally { setBusy(false); }
  };

  return (
    <Box>
      {dialog}
      <PdfFileDropzone onFilesSelected={(files) => setFile(files[0] ?? null)} label="PDF file" selectedNames={file ? [file.name] : []} />

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mt: 3 }}>
        <TextField
          select
          fullWidth
          label="Border colour"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        >
          {COLOR_OPTIONS.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
          ))}
        </TextField>
        <TextField fullWidth type="number" label="Thickness (pt)" value={thickness} onFocus={(e) => e.target.select()} onChange={(e) => setThickness(e.target.value)} />
        <TextField fullWidth type="number" label="Inset from edge (pt)" value={margin} onFocus={(e) => e.target.select()} onChange={(e) => setMargin(e.target.value)} helperText="Distance from page edge to the border" />
      </Box>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleAction} disabled={busy || !file}>
        {busy ? 'Adding Border...' : 'Add Border'}
      </Button>
    </Box>
  );
};

const AddPdfBorder = () => {
  const content = (
    <>
      <Typography variant="h2">How to Add a Border to a PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to add a border to.</li>
          <li>Choose a border colour, set the thickness in points, and optionally set an inset distance from the page edge.</li>
          <li>Click <strong>Add Border</strong> — a rectangle is drawn on every page and the modified PDF downloads automatically.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Adding a 2-point black border with a 20-point inset to a certificate PDF creates a clean, professional
        frame around the content. Choosing a blue border at 3 points with no inset gives each page a bold,
        attention-grabbing edge — useful for drafts or internal documents.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Framing certificates, awards, or formal documents with a visible border.</li>
          <li>Marking drafts or internal documents with a coloured border for easy identification.</li>
          <li>Adding a thin black border to PDFs that will be printed, preventing content from touching the page edge.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What is a &quot;point&quot;?</strong> One PDF point equals 1/72 of an inch (≈ 0.35 mm). A 2-point border is roughly 0.7 mm thick.</li>
          <li><strong>Can I choose a custom colour?</strong> The tool offers black, gray, blue, and red. For other colours, use the PDF Editor tool after adding the border.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — all processing happens entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/add-pdf-border" content={content}>
      <AddPdfBorderContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default AddPdfBorder;
