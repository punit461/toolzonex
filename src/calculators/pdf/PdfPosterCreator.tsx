'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';
import { PDFDocument } from '@cantoo/pdf-lib';

const GRID_OPTIONS = [
  { value: '2x2', label: '2x2 (4 tiles)', cols: 2, rows: 2 },
  { value: '3x3', label: '3x3 (9 tiles)', cols: 3, rows: 3 },
  { value: '4x4', label: '4x4 (16 tiles)', cols: 4, rows: 4 },
];

const PdfPosterCreatorContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [grid, setGrid] = useState('2x2');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleAction = async () => {
    setError('');
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const srcDoc = await unlock(bytes);
      if (srcDoc.getPageCount() === 0) { setError('The PDF has no pages.'); setBusy(false); return; }

      const option = GRID_OPTIONS.find((o) => o.value === grid)!;
      const { cols, rows } = option;
      const totalPages = cols * rows;

      const outDoc = await PDFDocument.create();
      const [copiedPage] = await outDoc.copyPages(srcDoc, [0]);
      const embedded = await outDoc.embedPage(copiedPage);
      const srcW = embedded.width;
      const srcH = embedded.height;

      const outPage = outDoc.addPage([srcW, srcH]);
      const cellW = srcW / cols;
      const cellH = srcH / rows;

      for (let t = 0; t < totalPages; t++) {
        const col = t % cols;
        const row = rows - 1 - Math.floor(t / cols);
        const x = col * cellW;
        const y = row * cellH;
        const srcX = (col / cols) * srcW;
        const srcY = (row / rows) * srcH;

        const clipped = await outDoc.embedPage(srcDoc.getPage(0), {
          left: srcX, bottom: srcY, right: srcX + cellW, top: srcY + cellH,
        });
        outPage.drawPage(clipped, { x, y, width: cellW, height: cellH });
      }

      const output = await outDoc.save();
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-poster.pdf');
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) setError('Could not process this file. Make sure it is a valid PDF.');
    } finally { setBusy(false); }
  };

  return (
    <Box>
      {dialog}
      <PdfFileDropzone onFilesSelected={(files) => setFile(files[0] ?? null)} label="PDF file" selectedNames={file ? [file.name] : []} />
      <FormControl fullWidth sx={{ mt: 3 }}>
        <InputLabel>Grid Size</InputLabel>
        <Select value={grid} label="Grid Size" onChange={(e) => setGrid(e.target.value)}>
          {GRID_OPTIONS.map((o) => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
        </Select>
      </FormControl>
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleAction} disabled={busy || !file}>
        {busy ? 'Processing...' : 'Create Poster'}
      </Button>
    </Box>
  );
};

const PdfPosterCreator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Create a Poster from a PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF whose first page you want to tile as a poster.</li>
          <li>Choose a grid size (2x2, 3x3, or 4x4) to split the page into tiles.</li>
          <li>Click <strong>Create Poster</strong> to download a single PDF where each tile is a separate page, ready for printing and assembling.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A single-page PDF at Letter size with a 2x2 grid produces a 4-page PDF. Each page contains
        one quadrant of the original, scaled up to fill the full page — print all four and tape them together.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Printing a large poster on standard home printer paper.</li>
          <li>Creating oversized wall art from a small design or flyer.</li>
          <li>Assembling a banner from multiple printed sheets.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does it use only the first page?</strong> Yes — the poster is created from the first page of the uploaded PDF.</li>
          <li><strong>How do I assemble the printed tiles?</strong> Arrange them in order (top-left, top-right, bottom-left, bottom-right for 2x2) and tape or glue the edges.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — all processing is done in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-poster-creator" content={content}>
      <PdfPosterCreatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfPosterCreator;
