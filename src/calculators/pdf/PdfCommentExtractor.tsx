'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { readFileAsArrayBuffer } from './pdfUtils';
import { loadPdfJsDocument } from './pdfThumbnails';

interface ExtractedComment {
  pageNumber: number;
  type: string;
  author: string;
  content: string;
  rect?: { x: number; y: number; w: number; h: number };
}

const TYPE_COLORS: Record<string, 'warning' | 'info' | 'success' | 'default'> = {
  Highlight: 'warning',
  Text: 'info',
  Note: 'info',
  Stamp: 'success',
  FreeText: 'default',
  Square: 'default',
  Circle: 'default',
  Line: 'default',
};

function downloadText(text: string, filename: string) {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

const PdfCommentExtractorContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [comments, setComments] = useState<ExtractedComment[]>([]);

  const handleAction = async () => {
    setError('');
    setComments([]);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const pdf = await loadPdfJsDocument(bytes);
      const all: ExtractedComment[] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const annotations = await page.getAnnotations();
        for (const a of annotations) {
          if (!a.hasPopup && !a.contents && !a.title && !a.subtype) continue;
          all.push({
            pageNumber: i,
            type: a.subtype || 'Unknown',
            author: a.title || '',
            content: a.contents || '',
            rect: a.rect ? { x: a.rect[0], y: a.rect[1], w: a.rect[2] - a.rect[0], h: a.rect[3] - a.rect[1] } : undefined,
          });
        }
      }

      setComments(all);
      if (all.length === 0) setError('No annotations found in this PDF.');
    } catch {
      setError('Could not process this file. Make sure it is a valid PDF.');
    } finally { setBusy(false); }
  };

  const handleDownloadJSON = () => {
    downloadText(JSON.stringify(comments, null, 2), 'annotations.json');
  };

  const handleDownloadText = () => {
    const lines = comments.map((c) => `[Page ${c.pageNumber}] (${c.type}) ${c.author ? c.author + ': ' : ''}${c.content}`);
    downloadText(lines.join('\n'), 'annotations.txt');
  };

  return (
    <Box>
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setComments([]); }} label="PDF file" selectedNames={file ? [file.name] : []} />
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleAction} disabled={busy || !file}>
        {busy ? 'Extracting...' : 'Extract Comments'}
      </Button>

      {comments.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="subtitle1">{comments.length} annotation{comments.length !== 1 ? 's' : ''} found</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button size="small" startIcon={<DownloadIcon />} onClick={handleDownloadText}>Text</Button>
              <Button size="small" startIcon={<DownloadIcon />} onClick={handleDownloadJSON}>JSON</Button>
            </Box>
          </Box>

          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Page</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell>Content</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {comments.map((c, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{c.pageNumber}</TableCell>
                    <TableCell><Chip label={c.type} size="small" color={TYPE_COLORS[c.type] || 'default'} variant="outlined" /></TableCell>
                    <TableCell>{c.author || '—'}</TableCell>
                    <TableCell sx={{ maxWidth: 300, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{c.content || '—'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};

const PdfCommentExtractor = () => {
  const content = (
    <>
      <Typography variant="h2">How to Extract Comments from a PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF containing comments or annotations.</li>
          <li>Click <strong>Extract Comments</strong> to scan all pages and list every annotation.</li>
          <li>View the results in the table, or download them as a text or JSON file.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 20-page reviewed document yields a table showing 15 annotations: page numbers, authors (e.g. "Alice"),
        types (Highlight, Note, FreeText), and the content of each comment — ready to export as JSON for downstream processing.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Collecting all reviewer feedback from a shared PDF into a single list.</li>
          <li>Exporting annotation data for import into a project management tool.</li>
          <li>Proofreading a document by reviewing every highlight and comment in order.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What types of annotations are extracted?</strong> All types that have content or a popup — highlights, text notes, stamps, free-text annotations, and more.</li>
          <li><strong>Will it find empty sticky notes?</strong> Only annotations with visible content, an author, or a popup are listed.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — extraction runs entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-comment-extractor" content={content}>
      <PdfCommentExtractorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfCommentExtractor;
