'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { PDFDocument } from '@cantoo/pdf-lib';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';

const JpgToPdfContent = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const addFiles = (newFiles: File[]) => setFiles((prev) => [...prev, ...newFiles]);
  const removeFile = (index: number) => setFiles((prev) => prev.filter((_, i) => i !== index));

  const handleConvert = async () => {
    setError('');
    if (files.length === 0) { setError('Add at least one image.'); return; }
    setBusy(true);
    try {
      const doc = await PDFDocument.create();
      for (const file of files) {
        const bytes = await readFileAsArrayBuffer(file);
        const isPng = file.type === 'image/png' || /\.png$/i.test(file.name);
        const image = isPng ? await doc.embedPng(bytes) : await doc.embedJpg(bytes);
        const page = doc.addPage([image.width, image.height]);
        page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
      }
      const output = await doc.save();
      downloadBytes(output, 'images.pdf');
    } catch (e) {
      setError('Could not convert these images. Only JPG and PNG files are supported.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box>
      <PdfFileDropzone multiple accept="image/jpeg,image/png" onFilesSelected={addFiles} label="image" />

      {files.length > 0 && (
        <List sx={{ mt: 2 }}>
          {files.map((f, i) => (
            <ListItem key={`${f.name}-${i}`} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, mb: 1 }}
              secondaryAction={<IconButton size="small" onClick={() => removeFile(i)}><DeleteIcon fontSize="small" /></IconButton>}
            >
              <ListItemText primary={`${i + 1}. ${f.name}`} />
            </ListItem>
          ))}
        </List>
      )}

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleConvert} disabled={busy || files.length === 0}>
        {busy ? 'Converting...' : 'Convert to PDF'}
      </Button>
    </Box>
  );
};

const JpgToPdf = () => {
  const content = (
    <>
      <Typography variant="h2">How to Convert JPG/PNG to PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload one or more JPG or PNG images, in the order you want them to appear.</li>
          <li>Click <strong>Convert to PDF</strong> — each image becomes its own page, at its original size.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Upload three photos of a signed document — <code>page1.jpg</code>, <code>page2.jpg</code>,
        <code>page3.jpg</code> — and get back a single 3-page <code>images.pdf</code>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Turning photographed or scanned pages into a single shareable PDF.</li>
          <li>Combining screenshots into a PDF report.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What image formats are supported?</strong> JPG and PNG.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — conversion happens entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell
      url="/tools/jpg-to-pdf"
      content={content}
    >
      <JpgToPdfContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default JpgToPdf;
