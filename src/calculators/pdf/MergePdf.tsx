'use client';

import { useState } from 'react';
import { Box, Typography, Button, List, ListItem, ListItemText, IconButton, Alert } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteIcon from '@mui/icons-material/Delete';
import { PDFDocument } from 'pdf-lib';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';

const MergePdfContent = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const addFiles = (newFiles: File[]) => setFiles((prev) => [...prev, ...newFiles]);
  const removeFile = (index: number) => setFiles((prev) => prev.filter((_, i) => i !== index));
  const moveFile = (index: number, dir: -1 | 1) => {
    setFiles((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const handleMerge = async () => {
    setError('');
    if (files.length < 2) {
      setError('Add at least two PDF files to merge.');
      return;
    }
    setBusy(true);
    try {
      const merged = await PDFDocument.create();
      for (const file of files) {
        const bytes = await readFileAsArrayBuffer(file);
        const doc = await PDFDocument.load(bytes);
        const pages = await merged.copyPages(doc, doc.getPageIndices());
        pages.forEach((p) => merged.addPage(p));
      }
      const output = await merged.save();
      downloadBytes(output, 'merged.pdf');
    } catch (e) {
      setError('Could not merge these files. Make sure they are all valid, non-password-protected PDFs.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box>
      <PdfFileDropzone multiple onFilesSelected={addFiles} label="PDF file" />

      {files.length > 0 && (
        <List sx={{ mt: 2 }}>
          {files.map((f, i) => (
            <ListItem
              key={`${f.name}-${i}`}
              sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, mb: 1 }}
              secondaryAction={
                <Box>
                  <IconButton size="small" onClick={() => moveFile(i, -1)} disabled={i === 0}><ArrowUpwardIcon fontSize="small" /></IconButton>
                  <IconButton size="small" onClick={() => moveFile(i, 1)} disabled={i === files.length - 1}><ArrowDownwardIcon fontSize="small" /></IconButton>
                  <IconButton size="small" onClick={() => removeFile(i)}><DeleteIcon fontSize="small" /></IconButton>
                </Box>
              }
            >
              <ListItemText primary={`${i + 1}. ${f.name}`} />
            </ListItem>
          ))}
        </List>
      )}

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleMerge} disabled={busy || files.length < 2}>
        {busy ? 'Merging...' : 'Merge PDFs'}
      </Button>
    </Box>
  );
};

const MergePdf = () => {
  const content = (
    <>
      <Typography variant="h2">How to Merge PDF Files</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Click the upload area and select two or more PDF files (or drag and drop them in).</li>
          <li>Reorder files using the up/down arrows — they&apos;ll be combined in the order shown.</li>
          <li>Click <strong>Merge PDFs</strong> to download a single combined PDF.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Upload <code>invoice-jan.pdf</code>, <code>invoice-feb.pdf</code>, and <code>invoice-mar.pdf</code> — merge
        them into a single <code>merged.pdf</code> with all three invoices in sequence, ready to send as one file.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Combining multiple scanned pages into a single document.</li>
          <li>Merging separate chapters or reports into one PDF before submission.</li>
          <li>Bundling invoices, receipts, or contracts for a single email attachment.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Is my file uploaded to a server?</strong> No — everything happens locally in your browser using JavaScript. Your PDFs are never uploaded anywhere.</li>
          <li><strong>Is there a file size or page limit?</strong> No hard limit is enforced, but very large PDFs may be slower to process since everything runs in your browser&apos;s memory.</li>
          <li><strong>Can I merge password-protected PDFs?</strong> Not currently — remove the password first using your PDF reader, then merge.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell
      url="/tools/merge-pdf"
      content={content}
    >
      <MergePdfContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default MergePdf;
