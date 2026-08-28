'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, Paper, CircularProgress, Chip } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { readFileAsArrayBuffer } from './pdfUtils';
import { loadPdfJsDocument } from './pdfThumbnails';

interface FontCounterResult {
  count: number;
  names: string[];
  pageCount: number;
}

function resolveFontName(page: unknown, fontId: string): string {
  try {
    const obj = (page as { commonObjs: { get: (id: string) => unknown } }).commonObjs.get(fontId) as
      | { name?: string; fallbackName?: string; loadedName?: string }
      | undefined;
    return obj?.name || obj?.fallbackName || obj?.loadedName || fontId;
  } catch {
    return fontId;
  }
}

const PdfFontCounterContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<FontCounterResult | null>(null);

  const handleCount = async () => {
    setError('');
    setResult(null);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const pdf = await loadPdfJsDocument(bytes);
      const names = new Set<string>();

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const seenOnPage = new Set<string>();
        for (const item of content.items) {
          if (!('fontName' in item) || !item.fontName) continue;
          if (seenOnPage.has(item.fontName)) continue;
          seenOnPage.add(item.fontName);
          names.add(resolveFontName(page, item.fontName));
        }
      }

      setResult({ count: names.size, names: [...names].sort((a, b) => a.localeCompare(b)), pageCount: pdf.numPages });
    } catch {
      setError('Could not read this file. Make sure it is a valid PDF.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box>
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setResult(null); }} label="PDF file" selectedNames={file ? [file.name] : []} />

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleCount} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />Counting Fonts...</> : 'Count Fonts'}
      </Button>

      {result && (
        <Paper variant="outlined" sx={{ mt: 3, p: 2.5 }}>
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Typography variant="caption" color="text.secondary">Distinct Fonts Found</Typography>
            <Typography variant="h3" sx={{ fontWeight: 'bold' }}>{result.count}</Typography>
            <Typography variant="body2" color="text.secondary">across {result.pageCount} page{result.pageCount !== 1 ? 's' : ''}</Typography>
          </Box>
          {result.count > 0 ? (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
              {result.names.map((name) => (
                <Chip key={name} label={name} size="small" />
              ))}
            </Box>
          ) : (
            <Alert severity="warning">No fonts detected in the text layer — this PDF may be scanned or image-based.</Alert>
          )}
        </Paper>
      )}
    </Box>
  );
};

const PdfFontCounter = () => {
  const content = (
    <>
      <Typography variant="h2">How to Count Fonts in a PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to check.</li>
          <li>Click <strong>Count Fonts</strong> — every page&apos;s text is scanned for the fonts used to render it.</li>
          <li>See the total number of distinct fonts, and their names, in the results panel.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A typical report built in Word or Google Docs might use just two fonts — a bold heading font and a
        regular body font — while a design-heavy brochure exported from InDesign could easily use six or more
        distinct typefaces across its pages.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Auditing a document for excessive font variety before standardizing a template.</li>
          <li>Checking which fonts a PDF relies on before editing it in design software.</li>
          <li>Diagnosing font-related rendering or printing issues in a shared PDF.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why does it say no fonts were detected?</strong> Scanned or photographed PDFs are just images of text with no underlying text layer, so there are no fonts to detect. Use a PDF with selectable text instead.</li>
          <li><strong>Are the font names always the original font family name?</strong> Usually, but some PDFs use subsetted or renamed fonts (common with embedded fonts), which can show an internal identifier rather than the exact original font name.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — analysis happens entirely in your browser; the PDF is never sent to a server.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-font-counter" content={content}>
      <PdfFontCounterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfFontCounter;
