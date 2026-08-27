'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, TextField, ToggleButtonGroup, ToggleButton } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';
import { StandardFonts, rgb } from '@cantoo/pdf-lib';

type HeaderPosition = 'left' | 'center' | 'right';

const AddPdfHeaderContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState('');
  const [position, setPosition] = useState<HeaderPosition>('center');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleAdd = async () => {
    setError('');
    if (!file) { setError('Choose a PDF file first.'); return; }
    if (!text.trim()) { setError('Enter header text.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);
      const font = await doc.embedFont(StandardFonts.Helvetica);
      const fontSize = 10;

      doc.getPages().forEach((page) => {
        const { width, height } = page.getSize();
        const textWidth = font.widthOfTextAtSize(text, fontSize);
        let x = 36;
        if (position === 'center') x = (width - textWidth) / 2;
        else if (position === 'right') x = width - textWidth - 36;
        page.drawText(text, { x, y: height - 36, size: fontSize, font, color: rgb(0, 0, 0) });
      });

      const output = await doc.save();
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-header.pdf');
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

      <Box sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="Header text"
          placeholder="e.g. Company Name — Internal Use Only"
          value={text}
          onChange={(e) => setText(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Typography gutterBottom>Alignment</Typography>
        <ToggleButtonGroup value={position} exclusive onChange={(_, v) => v && setPosition(v)} fullWidth>
          <ToggleButton value="left">Left</ToggleButton>
          <ToggleButton value="center">Center</ToggleButton>
          <ToggleButton value="right">Right</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleAdd} disabled={busy || !file || !text.trim()}>
        {busy ? 'Adding...' : 'Add Header'}
      </Button>
    </Box>
  );
};

const AddPdfHeader = () => {
  const content = (
    <>
      <Typography variant="h2">How to Add a Header to a PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to annotate.</li>
          <li>Enter the header text and choose an alignment (left, center, or right).</li>
          <li>Click <strong>Add Header</strong> to download the updated PDF.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Adding &quot;Acme Corp — Confidential&quot; as a left-aligned header places the text at the top of
        every page, branding the document consistently without obscuring content.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Branding company documents with a standard header.</li>
          <li>Marking pages as &quot;DRAFT&quot; or &quot;INTERNAL USE ONLY&quot;.</li>
          <li>Adding a project or department name to shared reports.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Where exactly does the header appear?</strong> Near the top edge of each page, with a small margin.</li>
          <li><strong>Will the header overlap my content?</strong> It is placed with a standard margin. If your pages have tight margins, you may want to check the result.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — everything happens locally in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/add-pdf-header" content={content}>
      <AddPdfHeaderContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default AddPdfHeader;
