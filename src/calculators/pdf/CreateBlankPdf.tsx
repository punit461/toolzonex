'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, TextField, FormControl, InputLabel, Select, MenuItem, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { PDFDocument } from '@cantoo/pdf-lib';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { downloadBytes } from './pdfUtils';

const MM_TO_PT = 2.8346;

const PRESETS: Record<string, { width: number; height: number }> = {
  a4: { width: 595.28, height: 841.89 },
  letter: { width: 612, height: 792 },
  legal: { width: 612, height: 1008 },
};

const CreateBlankPdfContent = () => {
  const [pageCount, setPageCount] = useState(1);
  const [preset, setPreset] = useState('a4');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [customW, setCustomW] = useState('210');
  const [customH, setCustomH] = useState('297');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const handleAction = async () => {
    setError('');
    const count = parseInt(String(pageCount), 10);
    if (!count || count < 1) { setError('Enter a valid page count (1 or more).'); return; }
    let wPt: number, hPt: number;
    if (preset === 'custom') {
      const cw = parseFloat(customW);
      const ch = parseFloat(customH);
      if (!cw || cw <= 0 || !ch || ch <= 0) { setError('Enter valid custom dimensions in millimetres.'); return; }
      wPt = cw * MM_TO_PT;
      hPt = ch * MM_TO_PT;
    } else {
      wPt = PRESETS[preset].width;
      hPt = PRESETS[preset].height;
    }
    if (orientation === 'landscape') { const tmp = wPt; wPt = hPt; hPt = tmp; }
    setBusy(true);
    try {
      const doc = await PDFDocument.create();
      for (let i = 0; i < count; i++) doc.addPage([wPt, hPt]);
      const output = await doc.save();
      downloadBytes(output, `blank-${count}-pages.pdf`);
    } catch {
      setError('Could not create the PDF.');
    } finally { setBusy(false); }
  };

  return (
    <Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
        <TextField
          fullWidth
          type="number"
          label="Number of pages"
          value={pageCount}
          onFocus={(e) => e.target.select()}
          onChange={(e) => setPageCount(parseInt(e.target.value, 10) || 1)}
        />
        <FormControl fullWidth>
          <InputLabel>Page size</InputLabel>
          <Select value={preset} label="Page size" onChange={(e) => setPreset(e.target.value)}>
            <MenuItem value="a4">A4 (210 &times; 297 mm)</MenuItem>
            <MenuItem value="letter">US Letter (8.5 &times; 11 in)</MenuItem>
            <MenuItem value="legal">US Legal (8.5 &times; 14 in)</MenuItem>
            <MenuItem value="custom">Custom</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {preset === 'custom' && (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr' }, gap: 2, mt: 2 }}>
          <TextField fullWidth type="number" label="Width (mm)" value={customW} onFocus={(e) => e.target.select()} onChange={(e) => setCustomW(e.target.value)} />
          <TextField fullWidth type="number" label="Height (mm)" value={customH} onFocus={(e) => e.target.select()} onChange={(e) => setCustomH(e.target.value)} />
        </Box>
      )}

      <Box sx={{ mt: 2 }}>
        <Typography gutterBottom>Orientation</Typography>
        <ToggleButtonGroup value={orientation} exclusive onChange={(_, v) => v && setOrientation(v)} fullWidth>
          <ToggleButton value="portrait">Portrait</ToggleButton>
          <ToggleButton value="landscape">Landscape</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleAction} disabled={busy}>
        {busy ? 'Creating...' : 'Create Blank PDF'}
      </Button>
    </Box>
  );
};

const CreateBlankPdf = () => {
  const content = (
    <>
      <Typography variant="h2">How to Create a Blank PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Choose the number of blank pages you need.</li>
          <li>Select a preset page size (A4, US Letter, US Legal) or enter custom dimensions in millimetres.</li>
          <li>Pick portrait or landscape orientation.</li>
          <li>Click <strong>Create Blank PDF</strong> to download your empty PDF file.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Creating 10 blank A4 portrait pages produces a simple, empty PDF you can use as a starting template
        in any PDF editor, or fill in with handwritten notes after printing.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Generating a set of blank pages for printing handwriting or sketching practice sheets.</li>
          <li>Creating an empty multi-page PDF template to use as a starting point in a PDF editor.</li>
          <li>Making placeholder files of a specific page count for testing document workflows.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Can the blank pages have lines or a grid?</strong> No — this tool creates truly blank pages with no content. Use a PDF editor to add lines or grids.</li>
          <li><strong>What is the maximum page count?</strong> There is no hard limit, but creating hundreds of pages may slow down your browser briefly while the file is being assembled.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/create-blank-pdf" content={content}>
      <CreateBlankPdfContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CreateBlankPdf;
