'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, TextField, Stack } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';
import { PDFDocument, StandardFonts, rgb } from '@cantoo/pdf-lib';

const AnnotatePdfContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [pageNum, setPageNum] = useState('1');
  const [posX, setPosX] = useState('50');
  const [posY, setPosY] = useState('750');
  const [fontSize, setFontSize] = useState(12);
  const [textColor, setTextColor] = useState('#000000');
  const { unlock, dialog } = usePdfPasswordUnlock();

  const hexToRgb = (hex: string) => {
    const h = hex.replace('#', '');
    return {
      r: parseInt(h.substring(0, 2), 16) / 255,
      g: parseInt(h.substring(2, 4), 16) / 255,
      b: parseInt(h.substring(4, 6), 16) / 255,
    };
  };

  const handleAnnotate = async () => {
    setError('');
    if (!file) { setError('Choose a PDF file first.'); return; }
    if (!noteText.trim()) { setError('Enter annotation text.'); return; }
    const pNum = parseInt(pageNum, 10);
    if (!pNum || pNum < 1) { setError('Enter a valid page number.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);
      const pages = doc.getPages();
      if (pNum > pages.length) { setError(`Page ${pNum} does not exist. The document has ${pages.length} page(s).`); setBusy(false); return; }
      const page = pages[pNum - 1];
      const font = await doc.embedFont(StandardFonts.Helvetica);
      const { r, g, b } = hexToRgb(textColor);
      const x = parseFloat(posX) || 50;
      const y = parseFloat(posY) || 750;

      page.drawText(noteText, {
        x,
        y,
        size: fontSize,
        font,
        color: rgb(r, g, b),
      });

      const output = await doc.save();
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-annotated.pdf');
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) {
        setError('Could not annotate this file. Make sure it is a valid PDF.');
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box>
      {dialog}
      <PdfFileDropzone onFilesSelected={(files) => setFile(files[0] ?? null)} label="PDF file" selectedNames={file ? [file.name] : []} />

      <Stack spacing={2} sx={{ mt: 3 }}>
        <TextField fullWidth label="Annotation text" value={noteText} onChange={(e) => setNoteText(e.target.value)} placeholder="Enter note or comment text" />
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr 1fr' }, gap: 2 }}>
          <TextField fullWidth type="number" label="Page number" value={pageNum} onFocus={(e) => e.target.select()} onChange={(e) => setPageNum(e.target.value)} inputProps={{ min: 1 }} />
          <TextField fullWidth type="number" label="X position (pt)" value={posX} onFocus={(e) => e.target.select()} onChange={(e) => setPosX(e.target.value)} />
          <TextField fullWidth type="number" label="Y position (pt)" value={posY} onFocus={(e) => e.target.select()} onChange={(e) => setPosY(e.target.value)} />
          <TextField fullWidth type="number" label="Font size" value={fontSize} onFocus={(e) => e.target.select()} onChange={(e) => setFontSize(Number(e.target.value))} inputProps={{ min: 6, max: 72 }} />
        </Box>
        <TextField label="Text color" type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} sx={{ width: 120 }} InputLabelProps={{ shrink: true }} />
      </Stack>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleAnnotate} disabled={busy || !file}>
        {busy ? 'Adding Annotation...' : 'Add Annotation'}
      </Button>
    </Box>
  );
};

const AnnotatePdf = () => {
  const content = (
    <>
      <Typography variant="h2">How to Annotate a PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to annotate.</li>
          <li>Enter your annotation text, choose the page number, and set the position (X, Y in points from bottom-left).</li>
          <li>Pick a font size and color, then click <strong>Add Annotation</strong> to download.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        You&apos;re reviewing a contract and want to add &quot;Please verify clause 3.2&quot; at coordinates (60, 720) on page 2.
        The tool draws the text directly onto the page at that position, creating a visible note that travels with the document.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Adding review comments or feedback notes directly onto PDF pages.</li>
          <li>Placing labels, dates, or reference numbers at specific locations on a document.</li>
          <li>Marking up a proof with change requests before sending it back to the designer.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What coordinate system is used?</strong> PDF points start at (0, 0) from the bottom-left corner of the page. A standard A4 page is roughly 595 × 842 points.</li>
          <li><strong>Can I add multiple annotations?</strong> Currently one annotation per operation. Repeat the process to add more notes at different positions.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — annotation happens entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/annotate-pdf" content={content}>
      <AnnotatePdfContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default AnnotatePdf;
