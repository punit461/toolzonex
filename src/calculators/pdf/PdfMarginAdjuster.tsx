'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, Button, Alert, TextField } from '@mui/material';
import { PDFDocument } from '@cantoo/pdf-lib';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';

const MM_TO_PT = 2.8346;
const PT_TO_MM = 1 / MM_TO_PT;

const PdfMarginAdjusterContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [top, setTop] = useState('15');
  const [right, setRight] = useState('15');
  const [bottom, setBottom] = useState('15');
  const [left, setLeft] = useState('15');
  const [current, setCurrent] = useState<{ w: number; h: number } | null>(null);
  const { unlock, dialog } = usePdfPasswordUnlock();

  useEffect(() => {
    if (!file) return;
    let cancelled = false;
    (async () => {
      try {
        const bytes = await readFileAsArrayBuffer(file);
        const probe = await PDFDocument.load(bytes);
        const first = probe.getPages()[0];
        if (!first || cancelled) return;
        const { width, height } = first.getSize();
        setCurrent({ w: width * PT_TO_MM, h: height * PT_TO_MM });
      } catch {
        /* ignore probe errors; handled on action */
      }
    })();
    return () => { cancelled = true; };
  }, [file]);

  const handleAction = async () => {
    setError('');
    if (!file) { setError('Choose a PDF file first.'); return; }
    const t = parseFloat(top) || 0;
    const r = parseFloat(right) || 0;
    const b = parseFloat(bottom) || 0;
    const l = parseFloat(left) || 0;
    if (t <= 0 && r <= 0 && b <= 0 && l <= 0) { setError('Enter at least one margin greater than zero.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);
      for (const page of doc.getPages()) {
        const { width, height } = page.getSize();
        const leftPt = l * MM_TO_PT;
        const bottomPt = b * MM_TO_PT;
        const topPt = t * MM_TO_PT;
        const rightPt = r * MM_TO_PT;
        page.setMediaBox(0, 0, width + leftPt + rightPt, height + topPt + bottomPt);
        page.translateContent(leftPt, bottomPt);
      }
      const output = await doc.save();
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-margins.pdf');
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) {
        setError('Could not process this file. Make sure it is a valid PDF.');
      }
    } finally { setBusy(false); }
  };

  const newW = current ? current.w + (parseFloat(left) || 0) + (parseFloat(right) || 0) : null;
  const newH = current ? current.h + (parseFloat(top) || 0) + (parseFloat(bottom) || 0) : null;

  return (
    <Box>
      {dialog}
      <PdfFileDropzone onFilesSelected={(files) => setFile(files[0] ?? null)} label="PDF file" selectedNames={file ? [file.name] : []} />

      {current && (
        <Alert severity="info" sx={{ mt: 3 }}>
          Current first-page size: {current.w.toFixed(1)} &times; {current.h.toFixed(1)} mm
          {newW != null && newH != null && (
            <> &middot; New size: {newW.toFixed(1)} &times; {newH.toFixed(1)} mm</>
          )}
        </Alert>
      )}

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr' }, gap: 2, mt: 3 }}>
        <TextField fullWidth type="number" label="Top margin (mm)" value={top} onChange={(e) => setTop(e.target.value)} />
        <TextField fullWidth type="number" label="Right margin (mm)" value={right} onChange={(e) => setRight(e.target.value)} />
        <TextField fullWidth type="number" label="Bottom margin (mm)" value={bottom} onChange={(e) => setBottom(e.target.value)} />
        <TextField fullWidth type="number" label="Left margin (mm)" value={left} onChange={(e) => setLeft(e.target.value)} />
      </Box>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleAction} disabled={busy || !file}>
        {busy ? 'Adjusting Margins...' : 'Adjust Margins'}
      </Button>
    </Box>
  );
};

const PdfMarginAdjuster = () => {
  const content = (
    <>
      <Typography variant="h2">How to Adjust PDF Margins</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF whose margins you want to change.</li>
          <li>Set a margin in millimetres for each edge &mdash; top, right, bottom, and left. The tool shows the current and new page size as you type.</li>
          <li>Click <strong>Adjust Margins</strong> &mdash; each page grows by the chosen amounts while the content keeps its position.</li>
          <li>Download the PDF with the new margins.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 210 &times; 297 mm A4 page with 10 mm margins on every side becomes 230 &times; 317 mm. The text does not move
        relative to the page corner &mdash; the page simply gains white space around it, which is ideal for binding or printing.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Adding uneven margins, such as a wider left margin for spiral binding.</li>
          <li>Creating exact white space for a printer&apos;s non-printable border.</li>
          <li>Balancing a page that was scanned with content too close to one edge.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from our Add Margins tool?</strong> This adjuster exposes all four edges separately and previews the resulting page dimensions, giving you finer control over each side.</li>
          <li><strong>Does the text stay in place?</strong> Yes &mdash; the content is shifted by the left and bottom margins so its position relative to the corner is preserved, and the page expands around it.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No &mdash; everything happens in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-margin-adjuster" content={content}>
      <PdfMarginAdjusterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfMarginAdjuster;
