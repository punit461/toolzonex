'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';

const POSITIONS = {
  'bottom-center': { label: 'Bottom Center' },
  'bottom-right': { label: 'Bottom Right' },
  'top-right': { label: 'Top Right' },
} as const;

const NumberPdfPagesContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [position, setPosition] = useState<keyof typeof POSITIONS>('bottom-center');
  const [startAt, setStartAt] = useState(1);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const handleNumber = async () => {
    setError('');
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await PDFDocument.load(bytes);
      const font = await doc.embedFont(StandardFonts.Helvetica);
      const margin = 28;

      doc.getPages().forEach((page, i) => {
        const { width, height } = page.getSize();
        const label = String(startAt + i);
        const textWidth = font.widthOfTextAtSize(label, 10);

        let x = width / 2 - textWidth / 2;
        let y = margin / 1.5;
        if (position === 'bottom-right') x = width - margin - textWidth;
        if (position === 'top-right') { x = width - margin - textWidth; y = height - margin; }

        page.drawText(label, { x, y, size: 10, font, color: rgb(0.3, 0.3, 0.3) });
      });

      const output = await doc.save();
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-numbered.pdf');
    } catch (e) {
      setError('Could not number this file. Make sure it is a valid, non-password-protected PDF.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box>
      <PdfFileDropzone onFilesSelected={(files) => setFile(files[0] ?? null)} label="PDF file" selectedNames={file ? [file.name] : []} />

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mt: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Position</InputLabel>
          <Select value={position} label="Position" onChange={(e) => setPosition(e.target.value as keyof typeof POSITIONS)}>
            {Object.entries(POSITIONS).map(([key, { label }]) => (
              <MenuItem key={key} value={key}>{label}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          type="number"
          label="Start numbering at"
          value={startAt}
          onFocus={(e) => e.target.select()}
          onChange={(e) => setStartAt(e.target.value === '' ? 1 : Number(e.target.value))}
        />
      </Box>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleNumber} disabled={busy || !file}>
        {busy ? 'Adding Numbers...' : 'Add Page Numbers'}
      </Button>
    </Box>
  );
};

const NumberPdfPages = () => {
  const content = (
    <>
      <Typography variant="h2">How to Add Page Numbers to a PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to number.</li>
          <li>Choose where the numbers should appear and what number to start counting from.</li>
          <li>Click <strong>Add Page Numbers</strong> to download the numbered PDF.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Setting &quot;Start numbering at&quot; to <code>1</code> labels the first page &quot;1&quot;, the second
        &quot;2&quot;, and so on. Starting at <code>5</code> is useful if this PDF continues from another document
        that already ends on page 4.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Preparing a report or thesis for printing with page numbers.</li>
          <li>Numbering a contract so pages can be referenced unambiguously.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Will this overwrite existing content?</strong> The page number is drawn on top of the existing page content at the chosen position, so make sure that area is clear.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — numbering happens entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell
      url="/tools/number-pdf-pages"
      content={content}
    >
      <NumberPdfPagesContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default NumberPdfPages;
