'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, TextField } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';
import { StandardFonts, rgb } from '@cantoo/pdf-lib';

const AddCoverPageContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleAdd = async () => {
    setError('');
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);
      const firstPage = doc.getPage(0);
      const { width, height } = firstPage.getSize();
      const coverPage = doc.insertPage(0, [width, height]);

      if (title.trim()) {
        const font = await doc.embedFont(StandardFonts.HelveticaBold);
        const fontSize = Math.min(width, height) / 12;
        const textWidth = font.widthOfTextAtSize(title.trim(), fontSize);
        coverPage.drawText(title.trim(), {
          x: (width - textWidth) / 2,
          y: height / 2,
          size: fontSize,
          font,
          color: rgb(0, 0, 0),
        });
      }

      const output = await doc.save();
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-with-cover.pdf');
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
          label="Cover page title (optional)"
          placeholder="e.g. Annual Report 2025"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          helperText="Leave blank for a plain cover page."
        />
      </Box>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleAdd} disabled={busy || !file}>
        {busy ? 'Adding...' : 'Add Cover Page'}
      </Button>
    </Box>
  );
};

const AddCoverPage = () => {
  const content = (
    <>
      <Typography variant="h2">How to Add a Cover Page to a PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to modify.</li>
          <li>Optionally enter a title to display on the cover page.</li>
          <li>Click <strong>Add Cover Page</strong> to download the updated file.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Adding a cover page with the title &quot;Q4 Financial Summary&quot; inserts a new first page
        with the text centered, pushing all existing pages back by one.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Professionalizing a report or proposal with a clean title page.</li>
          <li>Adding a cover before sharing a document externally.</li>
          <li>Creating a consistent look across multiple PDF deliverables.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What if I leave the title blank?</strong> A blank cover page is inserted — same size as the first page.</li>
          <li><strong>What size is the cover page?</strong> It matches the dimensions of the first existing page.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — everything happens locally in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/add-cover-page" content={content}>
      <AddCoverPageContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default AddCoverPage;
