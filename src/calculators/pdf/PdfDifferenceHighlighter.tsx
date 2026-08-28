'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, CircularProgress, Paper } from '@mui/material';
import { PDFDocument } from '@cantoo/pdf-lib';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { loadPdfJsDocument } from './pdfThumbnails';
import { dataUrlToBytes } from './pdfRasterize';
import type { PDFDocumentProxy } from 'pdfjs-dist';

const TARGET_WIDTH = 900;
const DIFF_THRESHOLD = 32;

async function renderPageToCanvas(pdf: PDFDocumentProxy, pageNumber: number, targetWidth: number, targetHeight?: number): Promise<HTMLCanvasElement> {
  const page = await pdf.getPage(pageNumber);
  const baseViewport = page.getViewport({ scale: 1 });
  const scale = targetWidth / baseViewport.width;
  const viewport = page.getViewport({ scale });

  const source = document.createElement('canvas');
  source.width = viewport.width;
  source.height = viewport.height;
  const sourceCtx = source.getContext('2d');
  if (!sourceCtx) throw new Error('Could not create a canvas context.');
  sourceCtx.fillStyle = '#ffffff';
  sourceCtx.fillRect(0, 0, source.width, source.height);
  await page.render({ canvas: source, viewport, background: '#ffffff' }).promise;

  if (targetHeight === undefined) return source;

  const resized = document.createElement('canvas');
  resized.width = targetWidth;
  resized.height = targetHeight;
  const resizedCtx = resized.getContext('2d');
  if (!resizedCtx) throw new Error('Could not create a canvas context.');
  resizedCtx.drawImage(source, 0, 0, source.width, source.height, 0, 0, targetWidth, targetHeight);
  return resized;
}

function computeDiff(dataA: ImageData, dataB: ImageData): { diffImage: ImageData; diffPixelCount: number } {
  const out = new ImageData(dataA.width, dataA.height);
  let diffPixelCount = 0;
  for (let i = 0; i < dataA.data.length; i += 4) {
    const dr = Math.abs(dataA.data[i] - dataB.data[i]);
    const dg = Math.abs(dataA.data[i + 1] - dataB.data[i + 1]);
    const db = Math.abs(dataA.data[i + 2] - dataB.data[i + 2]);
    if (dr + dg + db > DIFF_THRESHOLD) {
      out.data[i] = 255;
      out.data[i + 1] = 0;
      out.data[i + 2] = 0;
      out.data[i + 3] = 255;
      diffPixelCount++;
    } else {
      const gray = 200 + 0.15 * dataA.data[i];
      out.data[i] = gray;
      out.data[i + 1] = gray;
      out.data[i + 2] = gray;
      out.data[i + 3] = 255;
    }
  }
  return { diffImage: out, diffPixelCount };
}

interface PageDiffResult {
  pageNumber: number;
  dataUrl: string;
  diffPercent: number;
}

const PdfDifferenceHighlighterContent = () => {
  const [fileA, setFileA] = useState<File | null>(null);
  const [fileB, setFileB] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState('');
  const [results, setResults] = useState<PageDiffResult[] | null>(null);
  const [pageMismatch, setPageMismatch] = useState<{ a: number; b: number } | null>(null);
  const [diffBytes, setDiffBytes] = useState<Uint8Array | null>(null);

  const handleCompare = async () => {
    setError('');
    setResults(null);
    setPageMismatch(null);
    setDiffBytes(null);
    if (!fileA || !fileB) { setError('Upload both PDF files to compare.'); return; }
    setBusy(true);
    try {
      const [bytesA, bytesB] = await Promise.all([readFileAsArrayBuffer(fileA), readFileAsArrayBuffer(fileB)]);
      const [pdfA, pdfB] = await Promise.all([loadPdfJsDocument(bytesA), loadPdfJsDocument(bytesB)]);

      if (pdfA.numPages !== pdfB.numPages) {
        setPageMismatch({ a: pdfA.numPages, b: pdfB.numPages });
      }
      const pageCount = Math.min(pdfA.numPages, pdfB.numPages);

      const pageResults: PageDiffResult[] = [];
      const reportDoc = await PDFDocument.create();

      for (let i = 1; i <= pageCount; i++) {
        setProgress(`Comparing page ${i} of ${pageCount}...`);
        const canvasA = await renderPageToCanvas(pdfA, i, TARGET_WIDTH);
        const canvasB = await renderPageToCanvas(pdfB, i, TARGET_WIDTH, canvasA.height);

        const ctxA = canvasA.getContext('2d');
        const ctxB = canvasB.getContext('2d');
        if (!ctxA || !ctxB) throw new Error('Could not create a canvas context.');
        const dataA = ctxA.getImageData(0, 0, canvasA.width, canvasA.height);
        const dataB = ctxB.getImageData(0, 0, canvasB.width, canvasB.height);

        const { diffImage, diffPixelCount } = computeDiff(dataA, dataB);
        const outCanvas = document.createElement('canvas');
        outCanvas.width = diffImage.width;
        outCanvas.height = diffImage.height;
        const outCtx = outCanvas.getContext('2d');
        if (!outCtx) throw new Error('Could not create a canvas context.');
        outCtx.putImageData(diffImage, 0, 0);

        const dataUrl = outCanvas.toDataURL('image/png');
        const diffPercent = Math.round((diffPixelCount / (diffImage.width * diffImage.height)) * 1000) / 10;
        pageResults.push({ pageNumber: i, dataUrl, diffPercent });

        const jpegBytes = dataUrlToBytes(outCanvas.toDataURL('image/jpeg', 0.85));
        const image = await reportDoc.embedJpg(jpegBytes);
        const reportPage = reportDoc.addPage([outCanvas.width, outCanvas.height]);
        reportPage.drawImage(image, { x: 0, y: 0, width: outCanvas.width, height: outCanvas.height });
      }

      setResults(pageResults);
      setDiffBytes(await reportDoc.save());
    } catch {
      setError('Could not compare these files. Make sure both are valid PDFs.');
    } finally {
      setBusy(false);
      setProgress('');
    }
  };

  const handleDownload = () => {
    if (!diffBytes) return;
    downloadBytes(diffBytes, 'pdf-difference-report.pdf');
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle2" gutterBottom>First PDF</Typography>
          <PdfFileDropzone onFilesSelected={(files) => { setFileA(files[0] ?? null); setResults(null); }} label="First PDF" selectedNames={fileA ? [fileA.name] : []} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle2" gutterBottom>Second PDF</Typography>
          <PdfFileDropzone onFilesSelected={(files) => { setFileB(files[0] ?? null); setResults(null); }} label="Second PDF" selectedNames={fileB ? [fileB.name] : []} />
        </Box>
      </Box>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleCompare} disabled={busy || !fileA || !fileB}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />{progress || 'Comparing...'}</> : 'Highlight Differences'}
      </Button>

      {pageMismatch && (
        <Alert severity="warning" sx={{ mt: 3 }}>
          Page counts differ ({pageMismatch.a} vs {pageMismatch.b} pages) — only the first {Math.min(pageMismatch.a, pageMismatch.b)} pages of each were compared.
        </Alert>
      )}

      {results && results.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h3">Diff Results</Typography>
            <Button variant="outlined" onClick={handleDownload}>Download Diff Report (PDF)</Button>
          </Box>
          {results.map((r) => (
            <Paper key={r.pageNumber} variant="outlined" sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Page {r.pageNumber} — {r.diffPercent}% of pixels differ
              </Typography>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={r.dataUrl} alt={`Difference on page ${r.pageNumber}`} style={{ maxWidth: '100%', border: '1px solid #ddd' }} />
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
};

const PdfDifferenceHighlighter = () => {
  const content = (
    <>
      <Typography variant="h2">How This Tool Differs From "Compare Two PDFs"</Typography>
      <Box sx={{ typography: 'body1' }}>
        <p>
          This site's Compare Two PDFs tool compares the extracted <em>text</em> of two documents word-by-word.
          This tool works differently: it renders each page of both PDFs to an image and compares them
          <strong> pixel by pixel</strong>, which catches visual changes that text comparison can't — moved
          images, shifted layout, changed colors, or edits inside a scanned/image-only PDF with no text layer
          at all.
        </p>
      </Box>

      <Typography variant="h2">How to Use It</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the original PDF and the modified version.</li>
          <li>Click <strong>Highlight Differences</strong> — each corresponding page pair is rendered and compared pixel by pixel.</li>
          <li>Any pixel that differs beyond a small tolerance (to ignore anti-aliasing noise) is highlighted in red on the output image; matching areas are shown dimmed for contrast.</li>
          <li>Review each page's diff percentage and image, or download a single PDF report containing every diff image.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Two versions of a scanned invoice where only the total amount changed will show a small red patch right
        over that number, with the rest of the page shown dimmed and unchanged — even though neither PDF has a
        text layer for a text-based comparison to use.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Verifying that a re-exported or re-scanned document didn't shift or change visually.</li>
          <li>Spotting layout or image changes between two design proofs that text comparison would miss.</li>
          <li>Comparing scanned or image-only PDFs that have no extractable text at all.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What happens if the two PDFs have different page counts?</strong> Only pages up to the shorter document's page count are compared; a warning notes the mismatch and how many pages were skipped.</li>
          <li><strong>Why do minor formatting differences show up as red everywhere?</strong> If the two PDFs are laid out slightly differently (different page size, shifted margins), corresponding pixels won't line up and will register as differences across large areas. This tool assumes both pages are meant to look the same overall.</li>
          <li><strong>Does this replace the text-based Compare Two PDFs tool?</strong> No — they answer different questions. Use text comparison for wording changes, and this tool for visual/layout changes.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — both files are processed and compared entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-difference-highlighter" content={content}>
      <PdfDifferenceHighlighterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfDifferenceHighlighter;
