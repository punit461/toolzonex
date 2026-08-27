'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';
import { PDFDocument } from '@cantoo/pdf-lib';

const N_UP_OPTIONS = [
  { value: 2, label: '2-up', cols: 2, rows: 1 },
  { value: 4, label: '4-up', cols: 2, rows: 2 },
  { value: 6, label: '6-up', cols: 3, rows: 2 },
  { value: 9, label: '9-up', cols: 3, rows: 3 },
];

const PdfNUpCreatorContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [nUp, setNUp] = useState<number>(4);
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
      const option = N_UP_OPTIONS.find((o) => o.value === nUp)!;
      const { cols, rows } = option;
      const perSheet = cols * rows;

      const outDoc = await PDFDocument.create();
      const srcPageCount = srcDoc.getPageCount();
      const totalSheets = Math.ceil(srcPageCount / perSheet);

      for (let s = 0; s < totalSheets; s++) {
        const outPage = outDoc.addPage([595.28, 841.89]);
        const { width: pageW, height: pageH } = outPage.getSize();
        const cellW = pageW / cols;
        const cellH = pageH / rows;

        for (let slot = 0; slot < perSheet; slot++) {
          const srcIdx = s * perSheet + slot;
          if (srcIdx >= srcPageCount) break;

          const srcPage = srcDoc.getPage(srcIdx);
          const { width: srcPW, height: srcPH } = srcPage.getSize();
          const [embedded] = await outDoc.embedPdf(srcDoc, [srcIdx]);

          const col = slot % cols;
          const row = rows - 1 - Math.floor(slot / cols);
          const x = col * cellW;
          const y = row * cellH;

          const scale = Math.min(cellW / srcPW, cellH / srcPH);
          const drawW = srcPW * scale;
          const drawH = srcPH * scale;
          const offsetX = x + (cellW - drawW) / 2;
          const offsetY = y + (cellH - drawH) / 2;

          outPage.drawPage(embedded, { x: offsetX, y: offsetY, width: drawW, height: drawH });
        }
      }

      const output = await outDoc.save();
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-nup.pdf');
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) setError('Could not process this file.');
    } finally { setBusy(false); }
  };

  return (
    <Box>
      {dialog}
      <PdfFileDropzone onFilesSelected={(files) => setFile(files[0] ?? null)} label="PDF file" selectedNames={file ? [file.name] : []} />
      <FormControl fullWidth sx={{ mt: 3 }}>
        <InputLabel>N-up Layout</InputLabel>
        <Select value={nUp} label="N-up Layout" onChange={(e) => setNUp(Number(e.target.value))}>
          {N_UP_OPTIONS.map((o) => <MenuItem key={o.value} value={o.value}>{o.label} ({o.cols}&times;{o.rows})</MenuItem>)}
        </Select>
      </FormControl>
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleAction} disabled={busy || !file}>
        {busy ? 'Processing...' : 'Create N-Up PDF'}
      </Button>
    </Box>
  );
};

const PdfNUpCreator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Create an N-Up PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to print multiple pages per sheet.</li>
          <li>Choose how many pages per sheet (2-up, 4-up, 6-up, or 9-up).</li>
          <li>Click <strong>Create N-Up PDF</strong> to download the combined layout.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 12-page document using 4-up layout produces 3 sheets, each containing 4 original pages
        scaled down and arranged in a 2&times;2 grid. The output is a standard single PDF ready to print.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Printing handouts with multiple slides per page to save paper.</li>
          <li>Reviewing many pages at a glance in thumbnail form.</li>
          <li>Creating a contact sheet of all pages in a short document.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What happens if the page count isn&apos;t a multiple of N?</strong> The last sheet is filled with blank space where remaining pages would go.</li>
          <li><strong>Are pages centered on each cell?</strong> Yes — each page is scaled to fit while preserving its aspect ratio.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — everything happens locally in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-n-up-creator" content={content}>
      <PdfNUpCreatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfNUpCreator;
