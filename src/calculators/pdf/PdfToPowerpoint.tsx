'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, CircularProgress } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { loadPdfJsDocument } from './pdfThumbnails';
import { dataUrlToBytes } from './pdfRasterize';
import { buildPptxFromImages, type PptxImagePage } from './pptxBuilder';

const PdfToPowerpointContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState('');

  const handleConvert = async () => {
    setError('');
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const pdf = await loadPdfJsDocument(bytes);
      const pages: PptxImagePage[] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        setProgress(`Rendering page ${i} of ${pdf.numPages}...`);
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Could not create a canvas context.');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        await page.render({ canvas, viewport, background: '#ffffff' }).promise;
        const imgBytes = dataUrlToBytes(canvas.toDataURL('image/png'));
        pages.push({ bytes: imgBytes, mime: 'image/png', width: canvas.width, height: canvas.height });
      }

      setProgress('Building presentation...');
      const pptx = await buildPptxFromImages(pages);
      downloadBytes(pptx, file.name.replace(/\.pdf$/i, '') + '.pptx', 'application/vnd.openxmlformats-officedocument.presentationml.presentation');
    } catch {
      setError('Could not convert this file. Please ensure it is a valid PDF.');
    } finally {
      setBusy(false);
      setProgress('');
    }
  };

  return (
    <Box>
      <PdfFileDropzone onFilesSelected={(files) => setFile(files[0] ?? null)} label="PDF file" selectedNames={file ? [file.name] : []} />

      <Alert severity="warning" sx={{ mt: 2 }}>
        Each PDF page becomes a full-slide image in the presentation — text is not converted into editable slide
        text boxes. See the FAQ below for details.
      </Alert>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleConvert} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />{progress || 'Converting...'}</> : 'Convert to PowerPoint (.pptx)'}
      </Button>
    </Box>
  );
};

const PdfToPowerpoint = () => {
  const content = (
    <>
      <Typography variant="h2">How to Convert a PDF to PowerPoint</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to convert.</li>
          <li>Click <strong>Convert to PowerPoint (.pptx)</strong> — each page is rendered as an image and placed on its own slide.</li>
          <li>Open the downloaded <code>.pptx</code> file in PowerPoint, Google Slides, or LibreOffice Impress.</li>
        </ul>
      </Box>

      <Typography variant="h2">What this tool actually does</Typography>
      <Typography variant="body1">
        Converting a PDF into a presentation with genuinely editable text boxes, shapes, and layouts requires
        reconstructing the original slide design from the PDF&apos;s rendered content — something well beyond what
        this browser-based tool can reliably do. Instead, this tool takes the same practical approach used by many
        &quot;PDF to PPT&quot; converters for scanned or non-editable source PDFs: it renders each PDF page to a
        high-resolution image and places that image, centered and scaled to fit, on its own slide in a genuinely
        valid <code>.pptx</code> file. The result looks exactly like your PDF and opens in any presentation software,
        but the content on each slide is a single picture — not editable text, shapes, or placeholders.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 10-page PDF slide deck exported from Keynote becomes a 10-slide <code>.pptx</code> file, with each
        original page rendered as a crisp image filling its slide — ready to present or share as PowerPoint,
        even though the text on each slide can&apos;t be edited directly afterward.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Turning a PDF deck into a <code>.pptx</code> file for presenting with PowerPoint or Google Slides.</li>
          <li>Sharing a PDF report as slides for a meeting without redesigning it from scratch.</li>
          <li>Getting a scanned or flattened PDF into a presentation-compatible file format.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Can I edit the text on each slide afterward?</strong> No — each slide contains a single image of the original page, not editable text boxes or shapes. To get editable text, use the PDF to Text tool separately and rebuild your slide content manually.</li>
          <li><strong>Is the output a real .pptx file?</strong> Yes — it's a genuinely valid PowerPoint Open XML presentation that opens natively in PowerPoint, Google Slides, and LibreOffice Impress, not a renamed image archive.</li>
          <li><strong>Will the slide look exactly like the PDF page?</strong> Visually, yes — each page is rendered at high resolution and fit to the slide, preserving its exact appearance.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — rendering and presentation creation both happen entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-to-powerpoint" content={content}>
      <PdfToPowerpointContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfToPowerpoint;
