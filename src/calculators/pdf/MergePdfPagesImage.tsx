'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, Paper, CircularProgress } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';

const MergePdfPagesImageContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState('');
  const [resultUrl, setResultUrl] = useState('');
  const [resultHeight, setResultHeight] = useState(0);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleAction = async () => {
    setError('');
    setResultUrl('');
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      await unlock(bytes);
      const pdfjs = await import('pdfjs-dist');
      pdfjs.GlobalWorkerOptions.workerSrc = '//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      const pdf = await pdfjs.getDocument({ data: new Uint8Array(bytes.slice(0)) }).promise;

      const targetWidth = 800;
      const renderedPages: { canvas: HTMLCanvasElement; height: number }[] = [];
      let totalHeight = 0;

      for (let i = 1; i <= pdf.numPages; i++) {
        setProgress(`Rendering page ${i} of ${pdf.numPages}...`);
        const page = await pdf.getPage(i);
        const baseViewport = page.getViewport({ scale: 1 });
        const scale = targetWidth / baseViewport.width;
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d')!;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        await page.render({ canvas, viewport }).promise;

        renderedPages.push({ canvas, height: canvas.height });
        totalHeight += canvas.height;
      }

      const mergedCanvas = document.createElement('canvas');
      mergedCanvas.width = targetWidth;
      mergedCanvas.height = totalHeight;
      const ctx = mergedCanvas.getContext('2d')!;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, targetWidth, totalHeight);

      let yOffset = 0;
      for (const rp of renderedPages) {
        ctx.drawImage(rp.canvas, 0, yOffset);
        yOffset += rp.height;
      }

      setResultUrl(mergedCanvas.toDataURL('image/png'));
      setResultHeight(totalHeight);
    } catch {
      if (!(error)) setError('Could not process this file. Make sure it is a valid PDF.');
    } finally {
      setBusy(false);
      setProgress('');
    }
  };

  const handleDownload = () => {
    if (!resultUrl) return;
    const a = document.createElement('a');
    a.href = resultUrl;
    a.download = 'merged-pages.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Box>
      {dialog}
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setResultUrl(''); }} label="PDF file" selectedNames={file ? [file.name] : []} />
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleAction} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />{progress || 'Merging...'}</> : 'Merge Pages into Single Image'}
      </Button>

      {resultUrl && (
        <Paper variant="outlined" sx={{ mt: 3, p: 2, textAlign: 'center' }}>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Pages merged — single image ({resultHeight.toLocaleString()} px tall)
          </Typography>
          <Box
            component="img"
            src={resultUrl}
            alt="Merged PDF pages"
            sx={{ maxWidth: '100%', maxHeight: 600, objectFit: 'contain', borderRadius: 1, mb: 2 }}
          />
          <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleDownload}>
            Download Merged Image
          </Button>
        </Paper>
      )}
    </Box>
  );
};

const MergePdfPagesImage = () => {
  const content = (
    <>
      <Typography variant="h2">How to Merge PDF Pages into a Single Image</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to convert into one long image.</li>
          <li>Click <strong>Merge Pages into Single Image</strong> — every page is rendered and stacked vertically.</li>
          <li>Preview the combined image, then click <strong>Download Merged Image</strong> to save it as a PNG.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 4-page product brochure is rendered at 800 pixels wide and stitched into a single tall PNG image.
        The result looks like a long scroll showing every page in sequence — perfect for sharing on platforms
        that accept images but not multi-page PDFs.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Combining multi-page PDFs into a single scrollable image for social media or messaging apps.</li>
          <li>Creating a long-strip preview of a document for quick visual scanning.</li>
          <li>Converting a short PDF into an image format when the recipient cannot open PDF files.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How wide is the output image?</strong> Pages are rendered at 800 pixels wide. Very long documents will produce a very tall image — keep that in mind for viewing.</li>
          <li><strong>Does it preserve colors and images?</strong> Yes — each page is rendered at full fidelity and stitched together without compression artifacts.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — everything happens in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/merge-pdf-pages-image" content={content}>
      <MergePdfPagesImageContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default MergePdfPagesImage;
