'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, Paper, CircularProgress, ToggleButton, ToggleButtonGroup } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';
import { loadPdfJsDocument } from './pdfThumbnails';

type Direction = 'vertical' | 'horizontal';

const MergePdfPagesIntoImageContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [direction, setDirection] = useState<Direction>('vertical');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState('');
  const [resultUrl, setResultUrl] = useState('');
  const [resultDims, setResultDims] = useState({ width: 0, height: 0 });
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleAction = async () => {
    setError('');
    setResultUrl('');
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      await unlock(bytes);
      const pdf = await loadPdfJsDocument(bytes);

      const targetSize = 800;
      const renderedPages: HTMLCanvasElement[] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        setProgress(`Rendering page ${i} of ${pdf.numPages}...`);
        const page = await pdf.getPage(i);
        const baseViewport = page.getViewport({ scale: 1 });
        const scale = direction === 'vertical' ? targetSize / baseViewport.width : targetSize / baseViewport.height;
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d')!;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        await page.render({ canvas, viewport }).promise;
        renderedPages.push(canvas);
      }

      const mergedCanvas = document.createElement('canvas');
      if (direction === 'vertical') {
        mergedCanvas.width = targetSize;
        mergedCanvas.height = renderedPages.reduce((sum, c) => sum + c.height, 0);
      } else {
        mergedCanvas.width = renderedPages.reduce((sum, c) => sum + c.width, 0);
        mergedCanvas.height = targetSize;
      }

      const ctx = mergedCanvas.getContext('2d')!;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, mergedCanvas.width, mergedCanvas.height);

      let offset = 0;
      for (const canvas of renderedPages) {
        if (direction === 'vertical') {
          ctx.drawImage(canvas, 0, offset);
          offset += canvas.height;
        } else {
          ctx.drawImage(canvas, offset, 0);
          offset += canvas.width;
        }
      }

      setResultUrl(mergedCanvas.toDataURL('image/png'));
      setResultDims({ width: mergedCanvas.width, height: mergedCanvas.height });
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) {
        setError('Could not process this file. Make sure it is a valid PDF.');
      }
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

      <Box sx={{ mt: 3 }}>
        <Typography gutterBottom>Stack direction</Typography>
        <ToggleButtonGroup value={direction} exclusive onChange={(_, v) => v !== null && setDirection(v)} fullWidth>
          <ToggleButton value="vertical">Vertical (stacked top to bottom)</ToggleButton>
          <ToggleButton value="horizontal">Horizontal (side by side)</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleAction} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />{progress || 'Merging...'}</> : 'Merge Pages into One Image'}
      </Button>

      {resultUrl && (
        <Paper variant="outlined" sx={{ mt: 3, p: 2, textAlign: 'center' }}>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Pages merged — {resultDims.width.toLocaleString()} × {resultDims.height.toLocaleString()} px
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

const MergePdfPagesIntoImage = () => {
  const content = (
    <>
      <Typography variant="h2">How to Merge PDF Pages into One Image</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to convert into a single image.</li>
          <li>Choose <strong>Vertical</strong> to stack pages top to bottom (good for a long scrolling strip), or <strong>Horizontal</strong> to lay them side by side (good for comparing pages).</li>
          <li>Click <strong>Merge Pages into One Image</strong> — every page is rendered and combined into a single canvas.</li>
          <li>Preview the combined image, then click <strong>Download Merged Image</strong> to save it as a PNG.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 4-page product brochure merged vertically becomes one tall PNG that scrolls like a long strip — ideal
        for sharing on platforms that accept images but not multi-page PDFs. The same brochure merged
        horizontally instead becomes one wide image with every page laid out left to right, handy for
        side-by-side comparison.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Combining a multi-page PDF into a single scrollable image for social media or messaging apps.</li>
          <li>Laying pages side by side to compare layouts or spot differences at a glance.</li>
          <li>Converting a short PDF into an image format when the recipient cannot open PDF files.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How large is the output image?</strong> Pages are rendered at 800 pixels along the fixed dimension (width for vertical stacking, height for horizontal). Documents with many pages will produce a very large image in the other dimension.</li>
          <li><strong>Does it preserve colors and images?</strong> Yes — each page is rendered at full fidelity and combined without additional compression artifacts.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — everything happens in your browser; the PDF is never sent to a server.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/merge-pdf-pages-into-image" content={content}>
      <MergePdfPagesIntoImageContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default MergePdfPagesIntoImage;
