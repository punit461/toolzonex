'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, Paper, CircularProgress, Grid } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { readFileAsArrayBuffer } from './pdfUtils';
import { loadPdfJsDocument, renderPageThumbnail } from './pdfThumbnails';

interface Thumb {
  url: string;
  pageNum: number;
}

const PdfThumbnailGeneratorContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState('');
  const [thumbs, setThumbs] = useState<Thumb[]>([]);

  const handleAction = async () => {
    setError('');
    setThumbs([]);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const pdf = await loadPdfJsDocument(bytes);
      const results: Thumb[] = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        setProgress(`Rendering page ${i} of ${pdf.numPages}...`);
        const thumb = await renderPageThumbnail(pdf, i, 260);
        results.push({ url: thumb.url, pageNum: i });
      }
      setThumbs(results);
    } catch {
      setError('Could not process this file. Make sure it is a valid PDF.');
    } finally {
      setBusy(false);
      setProgress('');
    }
  };

  const handleDownloadOne = (thumb: Thumb) => {
    const a = document.createElement('a');
    a.href = thumb.url;
    a.download = `thumbnail_page_${thumb.pageNum}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadAll = () => {
    thumbs.forEach((t) => handleDownloadOne(t));
  };

  return (
    <Box>
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setThumbs([]); }} label="PDF file" selectedNames={file ? [file.name] : []} />
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleAction} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />{progress || 'Rendering...'}</> : 'Generate Thumbnails'}
      </Button>

      {thumbs.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle1">{thumbs.length} thumbnail(s) generated</Typography>
            <Button variant="outlined" size="small" startIcon={<DownloadIcon />} onClick={handleDownloadAll}>
              Download All
            </Button>
          </Box>
          <Grid container spacing={2}>
            {thumbs.map((t) => (
              <Grid item xs={6} sm={4} md={3} key={t.pageNum}>
                <Paper variant="outlined" sx={{ p: 1, textAlign: 'center' }}>
                  <Box
                    component="img"
                    src={t.url}
                    alt={`Page ${t.pageNum}`}
                    sx={{ width: '100%', height: 'auto', maxHeight: 220, objectFit: 'contain', borderRadius: 1, mb: 1 }}
                  />
                  <Typography variant="caption" display="block">Page {t.pageNum}</Typography>
                  <Button size="small" onClick={() => handleDownloadOne(t)} sx={{ mt: 0.5 }}>
                    Save PNG
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

const PdfThumbnailGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Generate PDF Thumbnails</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF whose pages you want as image previews.</li>
          <li>Click <strong>Generate Thumbnails</strong> — each page is rendered as a small PNG thumbnail.</li>
          <li>Download individual thumbnails or click <strong>Download All</strong> to save every page at once.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 5-page contract PDF produces five separate PNG thumbnails, each 260 pixels wide with the original
        page aspect ratio preserved. Click any &quot;Save PNG&quot; button to download a single page, or grab
        them all in one click.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Creating page preview images for document management systems.</li>
          <li>Generating thumbnails to embed in presentation slides or reports.</li>
          <li>Building a visual index of a long PDF for quick reference.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What resolution are the thumbnails?</strong> Each thumbnail is rendered at 260 pixels wide with the page aspect ratio preserved. For higher resolution, use the PDF to PNG tool with a larger DPI setting.</li>
          <li><strong>Is there a page limit?</strong> No — every page in the PDF is processed. Very large documents (200+ pages) may take longer to render.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — all rendering happens entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-thumbnail-generator" content={content}>
      <PdfThumbnailGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfThumbnailGenerator;
