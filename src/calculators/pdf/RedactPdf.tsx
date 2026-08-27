'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, TextField } from '@mui/material';
import { rgb } from '@cantoo/pdf-lib';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer, parsePageRanges } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';

const MM_TO_PT = 2.8346;

const RedactPdfContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [pages, setPages] = useState('all');
  const [x, setX] = useState('20');
  const [y, setY] = useState('20');
  const [width, setWidth] = useState('80');
  const [height, setHeight] = useState('20');
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleAction = async () => {
    setError('');
    if (!file) { setError('Choose a PDF file first.'); return; }
    const xPt = (parseFloat(x) || 0) * MM_TO_PT;
    const yPt = (parseFloat(y) || 0) * MM_TO_PT;
    const wPt = (parseFloat(width) || 0) * MM_TO_PT;
    const hPt = (parseFloat(height) || 0) * MM_TO_PT;
    if (wPt <= 0 || hPt <= 0) { setError('Width and height must be greater than zero.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);
      const allPages = doc.getPages();
      const indices = parsePageRanges(pages || 'all', allPages.length);
      if (indices.length === 0) { setError('No matching pages found for that range.'); setBusy(false); return; }
      for (const i of indices) {
        allPages[i].drawRectangle({ x: xPt, y: yPt, width: wPt, height: hPt, color: rgb(0, 0, 0) });
      }
      const output = await doc.save();
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-redacted.pdf');
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

      <Box sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="Pages (e.g. 1, 3, 5-8 or 'all')"
          value={pages}
          onChange={(e) => setPages(e.target.value)}
          sx={{ mb: 2 }}
          helperText="Which pages to redact. Coordinates apply to each selected page."
        />
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr 1fr 1fr' }, gap: 2 }}>
          <TextField label="X (mm)" type="number" value={x} onChange={(e) => setX(e.target.value)} />
          <TextField label="Y (mm)" type="number" value={y} onChange={(e) => setY(e.target.value)} />
          <TextField label="Width (mm)" type="number" value={width} onChange={(e) => setWidth(e.target.value)} />
          <TextField label="Height (mm)" type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
        </Box>
      </Box>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleAction} disabled={busy || !file}>
        {busy ? 'Redacting...' : 'Redact PDF'}
      </Button>
    </Box>
  );
};

const RedactPdf = () => {
  const content = (
    <>
      <Typography variant="h2">How to Redact a PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to redact.</li>
          <li>Enter the page range, then the rectangle to black out as X, Y, width, and height in millimetres (measured from the bottom-left corner).</li>
          <li>Click <strong>Redact PDF</strong> &mdash; a solid black box is drawn over the area on every selected page.</li>
          <li>Download the redacted file. The covered content is hidden behind an opaque rectangle.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A payslip has a bank account number at 20&nbsp;mm from the left and 20&nbsp;mm from the bottom, 80&nbsp;mm wide and 20&nbsp;mm tall.
        Entering those values on page 1 draws a black bar over the number, so the redacted payslip can be safely shared.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Blacking out personal data (account numbers, addresses, IDs) before sharing a document.</li>
          <li>Censoring sensitive sections of contracts, reports, or legal filings.</li>
          <li>Removing signatures or stamps from a page that will be published.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Is the original text really removed?</strong> This tool paints an opaque black rectangle on top of the content. The text is not deleted from the file, so treat the redaction as visual cover. For irreversible removal, use a tool that strips the underlying content.</li>
          <li><strong>Where is the origin (0,0)?</strong> Coordinates are measured from the bottom-left corner of the page, which matches how PDF pages are laid out.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No &mdash; redaction happens entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/redact-pdf" content={content}>
      <RedactPdfContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RedactPdf;
