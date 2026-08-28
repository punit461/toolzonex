'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, TextField, MenuItem } from '@mui/material';
import { rgb } from '@cantoo/pdf-lib';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';

const POINTS_PER_INCH = 72;

type Region = 'bottom-center' | 'bottom-left' | 'bottom-right' | 'top-center' | 'top-left' | 'top-right';

const REGIONS: { value: Region; label: string }[] = [
  { value: 'bottom-center', label: 'Bottom center' },
  { value: 'bottom-left', label: 'Bottom left' },
  { value: 'bottom-right', label: 'Bottom right' },
  { value: 'top-center', label: 'Top center' },
  { value: 'top-left', label: 'Top left' },
  { value: 'top-right', label: 'Top right' },
];

function computeBand(region: Region, pageWidth: number, pageHeight: number, bandHeightPt: number, bandWidthPt: number) {
  const isBottom = region.startsWith('bottom');
  const y = isBottom ? 0 : pageHeight - bandHeightPt;

  let x = 0;
  if (region.endsWith('center')) x = (pageWidth - bandWidthPt) / 2;
  else if (region.endsWith('right')) x = pageWidth - bandWidthPt;

  return { x: Math.max(0, x), y: Math.max(0, y), width: Math.min(bandWidthPt, pageWidth), height: Math.min(bandHeightPt, pageHeight) };
}

const PdfPageNumberRemoverContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [region, setRegion] = useState<Region>('bottom-center');
  const [bandHeightIn, setBandHeightIn] = useState('0.5');
  const [bandWidthIn, setBandWidthIn] = useState('2');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleAction = async () => {
    setError('');
    if (!file) { setError('Choose a PDF file first.'); return; }
    const bandHeightPt = (parseFloat(bandHeightIn) || 0) * POINTS_PER_INCH;
    const bandWidthPt = (parseFloat(bandWidthIn) || 0) * POINTS_PER_INCH;
    if (bandHeightPt <= 0 || bandWidthPt <= 0) { setError('Region width and height must be greater than zero.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);
      for (const page of doc.getPages()) {
        const { width, height } = page.getSize();
        const band = computeBand(region, width, height, bandHeightPt, bandWidthPt);
        page.drawRectangle({ ...band, color: rgb(1, 1, 1) });
      }
      const output = await doc.save();
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-no-page-numbers.pdf');
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

      <Box sx={{ mt: 3, display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' }, gap: 2 }}>
        <TextField select label="Page number location" value={region} onChange={(e) => setRegion(e.target.value as Region)}>
          {REGIONS.map((r) => <MenuItem key={r.value} value={r.value}>{r.label}</MenuItem>)}
        </TextField>
        <TextField label="Region width (in)" type="number" value={bandWidthIn} onChange={(e) => setBandWidthIn(e.target.value)} inputProps={{ step: 0.1, min: 0.1 }} />
        <TextField label="Region height (in)" type="number" value={bandHeightIn} onChange={(e) => setBandHeightIn(e.target.value)} inputProps={{ step: 0.1, min: 0.1 }} />
      </Box>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
        Covers this rectangle with solid white on every page. Defaults (bottom center, 2 &times; 0.5 in) match
        where page numbers usually sit.
      </Typography>

      <Alert severity="info" sx={{ mt: 2 }}>
        This covers the selected area with a white rectangle — it doesn&apos;t detect or delete page-number text.
        Anything else in that area (footer text, a logo) will be covered too.
      </Alert>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleAction} disabled={busy || !file}>
        {busy ? 'Processing...' : 'Remove Page Numbers'}
      </Button>
    </Box>
  );
};

const PdfPageNumberRemover = () => {
  const content = (
    <>
      <Typography variant="h2">How This Tool Actually Removes Page Numbers</Typography>
      <Box sx={{ typography: 'body1' }}>
        <p>
          Reliably telling apart "this text is a page number" from any other text on an arbitrary, already-flattened
          PDF page isn&apos;t something that can be done accurately without real content-stream analysis. Rather
          than guess and risk covering the wrong thing (or nothing at all), this tool takes the honest, predictable
          approach: you tell it which corner or edge of the page page numbers normally sit in, and it paints a
          solid white rectangle over exactly that region on every page — covering the page number underneath. This
          also reliably reverses page numbers added by this site&apos;s own <strong>Add Page Numbers to PDF</strong>
          tool, since that tool places numbers in one of these same standard positions.
        </p>
      </Box>

      <Typography variant="h2">How to Use It</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF that has page numbers you want to hide.</li>
          <li>Pick the location page numbers sit in — bottom center is the most common default.</li>
          <li>Adjust the region&apos;s width and height in inches if the default 2 &times; 0.5 in box doesn&apos;t fully cover the number.</li>
          <li>Click <strong>Remove Page Numbers</strong> and download the result.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A report with "Page 3 of 12" centered at the very bottom of each page gets a white 2 &times; 0.5 inch bar
        painted over that spot on every page, hiding the page number while leaving the rest of the page untouched.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Undoing page numbers that were added with this site's Add Page Numbers to PDF tool.</li>
          <li>Hiding page numbers before merging a document into a larger PDF with its own numbering.</li>
          <li>Removing a footer-area page number before re-purposing pages as standalone handouts.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does this detect and delete the page-number text itself?</strong> No — it covers the region with an opaque white rectangle. The underlying text isn't deleted, just visually hidden underneath the rectangle.</li>
          <li><strong>Will it also cover other footer content in that spot?</strong> Yes — anything within the selected rectangle (a logo, a footer line, a date stamp) gets covered too, since the tool has no way to distinguish a page number from other nearby text.</li>
          <li><strong>What if page numbers aren't in a standard corner?</strong> Widen the region or pick a different preset location closest to where the numbers actually sit; there's no free-form region picker in this version.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — everything happens entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-page-number-remover" content={content}>
      <PdfPageNumberRemoverContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfPageNumberRemover;
