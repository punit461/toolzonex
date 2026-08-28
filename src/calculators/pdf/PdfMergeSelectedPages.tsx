'use client';

import { useState } from 'react';
import { Box, Typography, Button, List, ListItem, ListItemText, IconButton, TextField, Alert, CircularProgress } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteIcon from '@mui/icons-material/Delete';
import { PDFDocument } from '@cantoo/pdf-lib';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer, parsePageRanges } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';

interface FileEntry {
  file: File;
  pageSpec: string;
}

const PdfMergeSelectedPagesContent = () => {
  const [entries, setEntries] = useState<FileEntry[]>([]);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const addFiles = (newFiles: File[]) => setEntries((prev) => [...prev, ...newFiles.map((file) => ({ file, pageSpec: '' }))]);
  const removeEntry = (index: number) => setEntries((prev) => prev.filter((_, i) => i !== index));
  const moveEntry = (index: number, dir: -1 | 1) => {
    setEntries((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };
  const setPageSpec = (index: number, spec: string) => {
    setEntries((prev) => prev.map((e, i) => (i === index ? { ...e, pageSpec: spec } : e)));
  };

  const handleMerge = async () => {
    setError('');
    if (entries.length < 1) { setError('Add at least one PDF file.'); return; }
    setBusy(true);
    try {
      const merged = await PDFDocument.create();
      for (const entry of entries) {
        const bytes = await readFileAsArrayBuffer(entry.file);
        const doc = await unlock(bytes);
        const pageCount = doc.getPageCount();
        const indices = entry.pageSpec.trim()
          ? parsePageRanges(entry.pageSpec, pageCount)
          : doc.getPageIndices();
        if (indices.length === 0) {
          setError(`No matching pages found for "${entry.file.name}" — check its page range.`);
          setBusy(false);
          return;
        }
        const pages = await merged.copyPages(doc, indices);
        pages.forEach((p) => merged.addPage(p));
      }
      const output = await merged.save();
      downloadBytes(output, 'merged-selected-pages.pdf');
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) {
        setError('Could not merge these files. Make sure they are all valid PDFs.');
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box>
      {dialog}
      <PdfFileDropzone multiple onFilesSelected={addFiles} label="PDF file" />

      {entries.length > 0 && (
        <List sx={{ mt: 2 }}>
          {entries.map((entry, i) => (
            <ListItem
              key={`${entry.file.name}-${i}`}
              sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, mb: 1, flexDirection: 'column', alignItems: 'stretch', gap: 1 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <ListItemText primary={`${i + 1}. ${entry.file.name}`} />
                <Box>
                  <IconButton size="small" onClick={() => moveEntry(i, -1)} disabled={i === 0}><ArrowUpwardIcon fontSize="small" /></IconButton>
                  <IconButton size="small" onClick={() => moveEntry(i, 1)} disabled={i === entries.length - 1}><ArrowDownwardIcon fontSize="small" /></IconButton>
                  <IconButton size="small" onClick={() => removeEntry(i)}><DeleteIcon fontSize="small" /></IconButton>
                </Box>
              </Box>
              <TextField
                size="small"
                fullWidth
                label="Pages to include"
                placeholder="e.g. 1-3, 5 (blank = all pages)"
                value={entry.pageSpec}
                onChange={(e) => setPageSpec(i, e.target.value)}
              />
            </ListItem>
          ))}
        </List>
      )}

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleMerge} disabled={busy || entries.length < 1}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />Merging...</> : 'Merge Selected Pages'}
      </Button>
    </Box>
  );
};

const PdfMergeSelectedPages = () => {
  const content = (
    <>
      <Typography variant="h2">How to Merge Selected Pages from Multiple PDFs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload two or more PDF files (or drag and drop them in).</li>
          <li>For each file, optionally enter a page range like <code>1-3, 5</code> — leave it blank to
            include every page from that file.</li>
          <li>Reorder files using the up/down arrows — pages are combined in the order the files are listed.</li>
          <li>Click <strong>Merge Selected Pages</strong> to download a single PDF with only the pages you chose,
            from every file, in order.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Upload <code>report-a.pdf</code> with range <code>1-2</code> and <code>report-b.pdf</code> with range
        <code> 4</code> — the merged output contains pages 1 and 2 from the first file, followed by page 4 from
        the second, four pages total, dropping everything else.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Building a custom packet from specific pages of several source documents.</li>
          <li>Combining just the signature pages from multiple contracts into one file.</li>
          <li>Assembling a summary document from selected sections of several reports.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from Merge PDF?</strong> The regular Merge PDF tool combines every page of every file. This tool lets you pick specific pages (or ranges) from each file before merging.</li>
          <li><strong>What happens if I leave a file&apos;s page range blank?</strong> All of that file&apos;s pages are included, same as a normal merge.</li>
          <li><strong>Can I merge password-protected PDFs?</strong> Yes — you&apos;ll be prompted for the password of each locked file before its pages are read.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — merging happens entirely in your browser; files are never sent to a server.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-merge-selected-pages" content={content}>
      <PdfMergeSelectedPagesContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfMergeSelectedPages;
