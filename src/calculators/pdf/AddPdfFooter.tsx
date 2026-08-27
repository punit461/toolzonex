'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, TextField, ToggleButtonGroup, ToggleButton } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';
import { StandardFonts, rgb } from '@cantoo/pdf-lib';

type FooterPosition = 'left' | 'center' | 'right';

const AddPdfFooterContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState('');
  const [position, setPosition] = useState<FooterPosition>('center');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleAdd = async () => {
    setError('');
    if (!file) { setError('Choose a PDF file first.'); return; }
    if (!text.trim()) { setError('Enter footer text.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);
      const font = await doc.embedFont(StandardFonts.Helvetica);
      const fontSize = 10;

      doc.getPages().forEach((page) => {
        const { width } = page.getSize();
        const textWidth = font.widthOfTextAtSize(text, fontSize);
        let x = 36;
        if (position === 'center') x = (width - textWidth) / 2;
        else if (position === 'right') x = width - textWidth - 36;
        page.drawText(text, { x, y: 30, size: fontSize, font, color: rgb(0, 0, 0) });
      });

      const output = await doc.save();
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-footer.pdf');
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
          label="Footer text"
          placeholder="e.g. Confidential — Do Not Distribute"
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
        {busy ? 'Adding...' : 'Add Footer'}
      </Button>
    </Box>
  );
};

const AddPdfFooter = () => {
  const content = (
    <>
      <Typography variant="h2">How to Add a Footer to a PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to annotate.</li>
          <li>Enter the footer text and choose an alignment (left, center, or right).</li>
          <li>Click <strong>Add Footer</strong> to download the updated PDF.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Adding &quot;Confidential&quot; centered as a footer stamps the word at the bottom of every page
        in a 10-page report, clearly marking the document&apos;s status.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Adding confidentiality notices to shared documents.</li>
          <li>Labeling internal-only material with a department name.</li>
          <li>Marking draft versions with &quot;DRAFT — Not for Distribution&quot;.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Can I add page numbers instead?</strong> This tool adds custom text. For page numbers, check our dedicated page numbering tool.</li>
          <li><strong>Where exactly does the footer appear?</strong> Near the bottom edge of each page, with a small margin.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — everything happens locally in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/add-pdf-footer" content={content}>
      <AddPdfFooterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default AddPdfFooter;
