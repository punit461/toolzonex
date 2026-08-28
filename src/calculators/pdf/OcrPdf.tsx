'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, TextField, CircularProgress, LinearProgress, Snackbar } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { loadPdfJsDocument } from './pdfThumbnails';

interface TesseractLoggerMessage {
  status: string;
  progress: number;
}

interface TesseractWorker {
  recognize: (image: HTMLCanvasElement) => Promise<{ data: { text: string } }>;
  terminate: () => Promise<void>;
}

interface TesseractModule {
  createWorker: (
    langs?: string,
    oem?: number,
    options?: { logger?: (m: TesseractLoggerMessage) => void }
  ) => Promise<TesseractWorker>;
}

const OcrPdfContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');
  const [pagePercent, setPagePercent] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleOcr = async () => {
    setError('');
    setText(null);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    setStatus('Loading OCR engine...');
    setPagePercent(0);

    let worker: TesseractWorker | null = null;
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const pdf = await loadPdfJsDocument(bytes);

      const tesseractModule = await import('tesseract.js');
      const Tesseract = ((tesseractModule as unknown as { default?: TesseractModule }).default ?? (tesseractModule as unknown as TesseractModule));

      let currentPage = 0;
      const totalPages = pdf.numPages;
      worker = await Tesseract.createWorker('eng', 1, {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            setPagePercent(Math.round(m.progress * 100));
            setStatus(`Processing page ${currentPage} of ${totalPages} (${Math.round(m.progress * 100)}%)...`);
          } else {
            setStatus(`${m.status}...`);
          }
        },
      });

      const pageTexts: string[] = [];
      for (let i = 1; i <= totalPages; i++) {
        currentPage = i;
        setStatus(`Rendering page ${i} of ${totalPages}...`);
        setPagePercent(0);
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

        const result = await worker.recognize(canvas);
        pageTexts.push(`--- Page ${i} ---\n${result.data.text.trim()}`);
      }

      setText(pageTexts.join('\n\n'));
    } catch {
      setError('Could not run OCR on this file. Make sure it is a valid PDF and you have an internet connection (the OCR engine downloads on first use).');
    } finally {
      if (worker) await worker.terminate();
      setBusy(false);
      setStatus('');
    }
  };

  const handleCopy = async () => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
  };

  const handleDownload = () => {
    if (!text || !file) return;
    const bytes = new TextEncoder().encode(text);
    downloadBytes(bytes, file.name.replace(/\.pdf$/i, '') + '-ocr.txt', 'text/plain');
  };

  return (
    <Box>
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setText(null); }} label="PDF file" selectedNames={file ? [file.name] : []} />

      <Alert severity="info" sx={{ mt: 2 }}>
        OCR works best on clear, non-skewed scans and runs entirely in your browser — it can take several seconds
        per page, and the first run downloads the OCR engine and English language data.
      </Alert>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleOcr} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />{status || 'Processing...'}</> : 'Extract Text with OCR'}
      </Button>

      {busy && <LinearProgress variant="determinate" value={pagePercent} sx={{ mt: 2 }} />}

      {text !== null && (
        <Box sx={{ mt: 3 }}>
          <TextField
            fullWidth
            multiline
            minRows={12}
            maxRows={24}
            value={text}
            slotProps={{ input: { readOnly: true } }}
            sx={{ '& .MuiInputBase-root': { fontFamily: 'monospace', fontSize: '0.85rem' } }}
          />
          <Box sx={{ display: 'flex', gap: 2, mt: 2, flexWrap: 'wrap' }}>
            <Button variant="outlined" onClick={handleCopy}>Copy to Clipboard</Button>
            <Button variant="outlined" onClick={handleDownload}>Download as .txt</Button>
          </Box>
        </Box>
      )}

      <Snackbar open={copied} autoHideDuration={2500} onClose={() => setCopied(false)} message="Copied to clipboard" />
    </Box>
  );
};

const OcrPdf = () => {
  const content = (
    <>
      <Typography variant="h2">How to OCR a PDF and Extract Text</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload a scanned or image-based PDF — one where the regular PDF to Text tool would find no text layer.</li>
          <li>Click <strong>Extract Text with OCR</strong>. Each page is rendered to an image, then run through an optical character recognition engine right in your browser.</li>
          <li>Watch the per-page progress indicator — OCR is slower than plain text extraction, taking several seconds per page.</li>
          <li>Copy the recognized text or download it as a <code>.txt</code> file once processing finishes.</li>
        </ul>
      </Box>

      <Typography variant="h2">OCR PDF vs. Extract Text from PDF — which do I need?</Typography>
      <Typography variant="body1">
        If your PDF was created from a word processor or has selectable text, use the regular PDF to Text tool —
        it's instant and more accurate since it reads the text layer directly. This tool, <strong>OCR PDF</strong>
        {' '}(also called <strong>extract text from PDF with OCR</strong>), is for PDFs made of scanned pages or
        photographs of documents, where there's no text layer to read — every character has to be visually
        recognized from the page image instead.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 4-page contract that was scanned on a photocopier has no selectable text — the regular text extractor
        returns nothing. Running it through OCR PDF recognizes the printed characters page by page and produces
        plain text you can search, copy, or paste elsewhere, separated by <code>--- Page 1 ---</code> style markers.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Making a scanned document's text searchable and copyable for the first time.</li>
          <li>Pulling text out of a photographed receipt, form, or printed page saved as a PDF.</li>
          <li>Digitizing old paper records that only exist as scanned image PDFs.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How accurate is the OCR?</strong> It depends heavily on scan quality — clear, non-skewed, high-contrast scans of printed (not handwritten) text give the best results. Blurry, rotated, low-resolution, or handwritten pages will produce more errors.</li>
          <li><strong>Does this support languages other than English?</strong> Not in this version — recognition currently runs in English only. The underlying OCR engine supports many other language packs, but they aren't wired up here yet to keep the tool simple and fast to load.</li>
          <li><strong>Why is this so much slower than PDF to Text?</strong> Regular text extraction just reads an existing text layer instantly. OCR has to visually analyze every page as an image and recognize each character, which genuinely takes real computation — several seconds per page is normal.</li>
          <li><strong>Does this preserve layout, like tables or columns?</strong> No — recognized text comes out in reading order as plain text, without the original layout, similar to the regular text extractor.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — rendering and OCR both run entirely in your browser. The OCR engine and language data are downloaded once from a public CDN on first use, but your PDF itself is never sent anywhere.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/ocr-pdf" content={content}>
      <OcrPdfContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default OcrPdf;
