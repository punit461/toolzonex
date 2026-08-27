'use client';

import { useState, useRef } from 'react';
import { Box, Typography, Button, Alert, CircularProgress, TextField, Paper } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { readFileAsArrayBuffer } from './pdfUtils';
import { loadPdfJsDocument } from './pdfThumbnails';

interface RenderedPage {
  url: string;
  pageNumber: number;
}

const OnlinePdfViewerContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState('');
  const [pages, setPages] = useState<RenderedPage[]>([]);
  const [numPages, setNumPages] = useState(0);
  const [pageInput, setPageInput] = useState('1');
  const pageRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleLoad = async () => {
    setError('');
    setPages([]);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const pdf = await loadPdfJsDocument(bytes);
      setNumPages(pdf.numPages);
      const results: RenderedPage[] = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        setProgress(`Rendering page ${i} of ${pdf.numPages}...`);
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Could not create canvas context.');
        await page.render({ canvas, viewport }).promise;
        results.push({ url: canvas.toDataURL('image/png'), pageNumber: i });
      }
      setPages(results);
      setPageInput('1');
    } catch {
      setError('Could not process this file. Make sure it is a valid PDF.');
    } finally {
      setBusy(false);
      setProgress('');
    }
  };

  const jumpToPage = () => {
    const n = parseInt(pageInput, 10);
    if (!n || n < 1 || n > numPages) { setError(`Enter a page number between 1 and ${numPages}.`); return; }
    setError('');
    pageRefs.current[n]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Box>
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setPages([]); setNumPages(0); }} label="PDF file" selectedNames={file ? [file.name] : []} />
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleLoad} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />{progress || 'Loading...'}</> : 'Open in Viewer'}
      </Button>

      {pages.length > 0 && (
        <Box sx={{ mt: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            label={`Jump to page (1-${numPages})`}
            value={pageInput}
            onChange={(e) => setPageInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') jumpToPage(); }}
            size="small"
            sx={{ width: 200 }}
          />
          <Button variant="outlined" onClick={jumpToPage}>Go</Button>
          <Typography variant="body2" color="text.secondary">{numPages} page(s)</Typography>
        </Box>
      )}

      {pages.length > 0 && (
        <Box sx={{ mt: 2, maxHeight: 70, overflow: 'auto' }}>
          {pages.map((p) => (
            <Box
              key={p.pageNumber}
              ref={(el) => { pageRefs.current[p.pageNumber] = (el as HTMLDivElement | null); }}
              sx={{ mb: 2, scrollMarginTop: 16 }}
            >
              <Paper variant="outlined" sx={{ p: 1 }}>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>Page {p.pageNumber}</Typography>
                <Box component="img" src={p.url} alt={`Page ${p.pageNumber}`} sx={{ width: '100%', height: 'auto', display: 'block', borderRadius: 1 }} />
              </Paper>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

const OnlinePdfViewer = () => {
  const content = (
    <>
      <Typography variant="h2">How to View a PDF Online</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to read.</li>
          <li>Click <strong>Open in Viewer</strong> — every page is rendered to an image right in your browser.</li>
          <li>Scroll through the pages, or type a page number and click <strong>Go</strong> to jump straight to it.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 20-page lease agreement opens as a scrollable stack of page images. Instead of downloading a 5 MB file just to skim
        page 14, you type &quot;14&quot; and jump directly there &mdash; no download, no external viewer required.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Quickly preview a PDF before deciding to download it.</li>
          <li>Read documents on a device that has no PDF reader installed.</li>
          <li>Jump to a specific page in a long report without scrolling through everything.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does viewing download the file to my device?</strong> No &mdash; the pages are rendered in memory and displayed as images. Nothing is saved unless you choose to download.</li>
          <li><strong>Can I view password-protected PDFs?</strong> Not yet &mdash; this viewer is for unprotected documents. Use our unlock tool first if your file is password protected.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No &mdash; rendering happens entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/online-pdf-viewer" content={content}>
      <OnlinePdfViewerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default OnlinePdfViewer;
