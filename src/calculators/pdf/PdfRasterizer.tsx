'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, Paper, CircularProgress, Grid } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { readFileAsArrayBuffer } from './pdfUtils';
import { loadPdfJsDocument } from './pdfThumbnails';

interface PageImage {
  url: string;
  pageNumber: number;
  width: number;
  height: number;
}

const PdfRasterizerContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState('');
  const [pages, setPages] = useState<PageImage[]>([]);

  const handleAction = async () => {
    setError('');
    setPages([]);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const pdf = await loadPdfJsDocument(bytes);
      const results: PageImage[] = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        setProgress(`Rendering page ${i} of ${pdf.numPages}...`);
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Could not create canvas context.');
        await page.render({ canvas, viewport }).promise;
        results.push({
          url: canvas.toDataURL('image/png'),
          pageNumber: i,
          width: Math.round(viewport.width / 2),
          height: Math.round(viewport.height / 2),
        });
      }
      setPages(results);
    } catch {
      setError('Could not process this file. Make sure it is a valid PDF.');
    } finally {
      setBusy(false);
      setProgress('');
    }
  };

  const handleDownload = (url: string, pageNum: number) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = `page-${pageNum}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Box>
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setPages([]); }} label="PDF file" selectedNames={file ? [file.name] : []} />
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleAction} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />{progress || 'Rendering...'}</> : 'Convert to Images'}
      </Button>

      {pages.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>{pages.length} page(s) rendered as PNG images</Typography>
          <Grid container spacing={2}>
            {pages.map((p) => (
              <Grid item xs={12} sm={6} md={4} key={p.pageNumber}>
                <Paper variant="outlined" sx={{ p: 1.5, textAlign: 'center' }}>
                  <Box
                    component="img"
                    src={p.url}
                    alt={`Page ${p.pageNumber}`}
                    sx={{ width: '100%', height: 'auto', maxHeight: 300, objectFit: 'contain', borderRadius: 1, mb: 1 }}
                  />
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                    Page {p.pageNumber} &middot; {p.width} &times; {p.height} px
                  </Typography>
                  <Button size="small" startIcon={<DownloadIcon />} onClick={() => handleDownload(p.url, p.pageNumber)}>
                    Download PNG
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

const PdfRasterizer = () => {
  const content = (
    <>
      <Typography variant="h2">How to Convert a PDF to Images</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to rasterize.</li>
          <li>Click <strong>Convert to Images</strong> — each page is rendered at 2&times; resolution into a high-quality PNG image.</li>
          <li>Preview every page as a thumbnail, then click <strong>Download PNG</strong> on any individual page to save it.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 3-page PDF becomes three separate PNG images at 2&times; resolution, which means each pixel in the
        original page renders as a 2&times;2 block of pixels, producing a crisp, high-DPI image suitable for
        zooming or printing without visible pixelation.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Extracting individual pages as images for use in presentations or social media posts.</li>
          <li>Converting a scanned PDF into standard PNG files for use in image editors or OCR tools.</li>
          <li>Creating image previews of PDF pages for a document management system.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why are the images larger than the screen display?</strong> Pages are rendered at 2&times; resolution to produce sharp images. The actual pixel dimensions will be roughly double the on-screen points.</li>
          <li><strong>Can I control the output resolution?</strong> This version uses a fixed 2&times; scale. For most uses this provides a good balance between quality and file size.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — rasterization happens entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-rasterizer" content={content}>
      <PdfRasterizerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfRasterizer;
