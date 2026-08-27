'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, TextField } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';
import { PDFDocument, rgb } from '@cantoo/pdf-lib';

const MM_TO_PT = 72 / 25.4;

const RemoveHeaderFooterContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [topMm, setTopMm] = useState('15');
  const [bottomMm, setBottomMm] = useState('15');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleRemove = async () => {
    setError('');
    if (!file) { setError('Choose a PDF file first.'); return; }
    const top = parseFloat(topMm);
    const bottom = parseFloat(bottomMm);
    if (isNaN(top) || top < 0 || isNaN(bottom) || bottom < 0) {
      setError('Enter valid margin values in millimeters.');
      return;
    }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);
      const topPts = top * MM_TO_PT;
      const bottomPts = bottom * MM_TO_PT;

      doc.getPages().forEach((page) => {
        const { width, height } = page.getSize();
        if (topPts > 0) {
          page.drawRectangle({
            x: 0, y: height - topPts, width, height: topPts,
            color: rgb(1, 1, 1),
          });
        }
        if (bottomPts > 0) {
          page.drawRectangle({
            x: 0, y: 0, width, height: bottomPts,
            color: rgb(1, 1, 1),
          });
        }
      });

      const output = await doc.save();
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-cleaned.pdf');
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) {
        setError('Could not process this file. Make sure it is a valid PDF.');
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box>
      {dialog}
      <PdfFileDropzone onFilesSelected={(files) => setFile(files[0] ?? null)} label="PDF file" selectedNames={file ? [file.name] : []} />

      <Box sx={{ display: 'flex', gap: 2, mt: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
        <TextField
          label="Header height (mm)"
          type="number"
          value={topMm}
          onChange={(e) => setTopMm(e.target.value)}
          inputProps={{ min: 0, step: 1 }}
          fullWidth
        />
        <TextField
          label="Footer height (mm)"
          type="number"
          value={bottomMm}
          onChange={(e) => setBottomMm(e.target.value)}
          inputProps={{ min: 0, step: 1 }}
          fullWidth
        />
      </Box>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleRemove} disabled={busy || !file}>
        {busy ? 'Removing...' : 'Remove Header & Footer'}
      </Button>
    </Box>
  );
};

const RemoveHeaderFooter = () => {
  const content = (
    <>
      <Typography variant="h2">How to Remove Headers and Footers from a PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to clean up.</li>
          <li>Enter the header and footer heights in millimeters — the areas within those margins from the top and bottom of each page will be blanked out.</li>
          <li>Click <strong>Remove Header &amp; Footer</strong> to download the cleaned PDF.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 20-page report has a 12 mm header with a company logo and a 10 mm footer with page numbers. Setting the header
        height to 12 and footer to 10 draws white rectangles over those areas on every page, effectively erasing them.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Stripping auto-generated headers or footers from downloaded reports or papers.</li>
          <li>Preparing a PDF for rebranding by removing old logos, dates, or page numbers.</li>
          <li>Cleaning up scanned documents that have unwanted text at the top or bottom margins.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does this delete the text, or just cover it?</strong> White rectangles are drawn over the specified areas, visually hiding the content. The underlying text data may still exist in the PDF structure.</li>
          <li><strong>What margin values should I use?</strong> Measure or estimate the height of the header/footer area in millimeters. Common values are 10–20 mm for headers and 8–15 mm for footers.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — processing happens entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/remove-header-footer" content={content}>
      <RemoveHeaderFooterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RemoveHeaderFooter;
