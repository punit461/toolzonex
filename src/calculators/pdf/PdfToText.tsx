'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, TextField, CircularProgress, Snackbar } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { loadPdfJsDocument } from './pdfThumbnails';

const PdfToTextContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState<string | null>(null);
  const [noTextFound, setNoTextFound] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleExtract = async () => {
    setError('');
    setText(null);
    setNoTextFound(false);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const pdf = await loadPdfJsDocument(bytes);
      const pageTexts: string[] = [];
      let anyText = false;

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items
          .map((item) => ('str' in item ? item.str : ''))
          .join(' ')
          .replace(/\s+/g, ' ')
          .trim();
        if (pageText) anyText = true;
        pageTexts.push(`--- Page ${i} ---\n${pageText}`);
      }

      if (!anyText) {
        setNoTextFound(true);
      } else {
        setText(pageTexts.join('\n\n'));
      }
    } catch {
      setError('Could not read this file. Make sure it is a valid PDF.');
    } finally {
      setBusy(false);
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
    downloadBytes(bytes, file.name.replace(/\.pdf$/i, '') + '.txt', 'text/plain');
  };

  return (
    <Box>
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setText(null); setNoTextFound(false); }} label="PDF file" selectedNames={file ? [file.name] : []} />

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleExtract} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />Extracting Text...</> : 'Extract Text'}
      </Button>

      {noTextFound && (
        <Alert severity="warning" sx={{ mt: 3 }}>
          No selectable text found — this PDF may be scanned or image-based, so there is no text layer to extract.
        </Alert>
      )}

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

      <Snackbar
        open={copied}
        autoHideDuration={2500}
        onClose={() => setCopied(false)}
        message="Copied to clipboard"
      />
    </Box>
  );
};

const PdfToText = () => {
  const content = (
    <>
      <Typography variant="h2">How to Extract Text from a PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to pull text from.</li>
          <li>Click <strong>Extract Text</strong> — every page&apos;s text is pulled out and shown below, separated by page markers.</li>
          <li>Use <strong>Copy to Clipboard</strong> to paste the text elsewhere, or <strong>Download as .txt</strong> to save it as a file.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 3-page PDF report produces a single text block starting with <code>--- Page 1 ---</code>, followed
        by that page&apos;s text, then <code>--- Page 2 ---</code>, and so on — ready to paste into a document
        or search with Ctrl+F.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Pulling quotes or data out of a PDF report without retyping them.</li>
          <li>Getting a PDF&apos;s text into a plain-text editor, spreadsheet, or note-taking app.</li>
          <li>Making a PDF&apos;s content searchable or easier to copy in bulk.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why does it say no text was found?</strong> Scanned or photographed PDFs are usually just images of text with no underlying text layer, so there is nothing to extract. You would need OCR software to pull text out of those.</li>
          <li><strong>Does this preserve formatting like tables or columns?</strong> No — text is extracted in reading order as plain text, so complex layouts (multi-column pages, tables) may come out re-flowed.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — extraction happens entirely in your browser; the PDF is never sent to a server.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell
      url="/tools/pdf-to-text"
      content={content}
    >
      <PdfToTextContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfToText;
