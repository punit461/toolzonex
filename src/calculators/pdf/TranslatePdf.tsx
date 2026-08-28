'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, TextField, MenuItem, CircularProgress, Snackbar } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { loadPdfJsDocument } from './pdfThumbnails';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Spanish' },
  { code: 'fr', label: 'French' },
  { code: 'de', label: 'German' },
  { code: 'it', label: 'Italian' },
  { code: 'pt', label: 'Portuguese' },
  { code: 'nl', label: 'Dutch' },
  { code: 'ru', label: 'Russian' },
  { code: 'hi', label: 'Hindi' },
  { code: 'bn', label: 'Bengali' },
  { code: 'ta', label: 'Tamil' },
  { code: 'te', label: 'Telugu' },
  { code: 'mr', label: 'Marathi' },
  { code: 'gu', label: 'Gujarati' },
  { code: 'zh-CN', label: 'Chinese (Simplified)' },
  { code: 'ja', label: 'Japanese' },
  { code: 'ko', label: 'Korean' },
  { code: 'ar', label: 'Arabic' },
  { code: 'tr', label: 'Turkish' },
];

const MAX_CHUNK_LEN = 450;

function chunkText(text: string, maxLen = MAX_CHUNK_LEN): string[] {
  const chunks: string[] = [];
  let remaining = text.replace(/\s+/g, ' ').trim();
  while (remaining.length > 0) {
    if (remaining.length <= maxLen) {
      chunks.push(remaining);
      break;
    }
    let cut = remaining.lastIndexOf(' ', maxLen);
    if (cut <= 0) cut = maxLen;
    chunks.push(remaining.slice(0, cut));
    remaining = remaining.slice(cut).trim();
  }
  return chunks;
}

async function translateChunk(text: string, source: string, target: string): Promise<string> {
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${target}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Translation request failed.');
  const data = await res.json();
  return typeof data?.responseData?.translatedText === 'string' ? data.responseData.translatedText : '';
}

const TranslatePdfContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('es');
  const [extractedText, setExtractedText] = useState('');
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState('');
  const [copied, setCopied] = useState(false);

  const handleTranslate = async () => {
    setError('');
    setTranslatedText(null);
    if (!file) { setError('Choose a PDF file first.'); return; }
    if (sourceLang === targetLang) { setError('Choose two different languages.'); return; }
    setBusy(true);
    try {
      setProgress('Extracting text...');
      const bytes = await readFileAsArrayBuffer(file);
      const pdf = await loadPdfJsDocument(bytes);
      const pageTexts: string[] = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map((item) => ('str' in item ? item.str : '')).join(' ').replace(/\s+/g, ' ').trim();
        pageTexts.push(pageText);
      }
      const fullText = pageTexts.join('\n\n');
      setExtractedText(fullText);

      if (!fullText.trim()) {
        setError('No selectable text found in this PDF — it may be scanned or image-based.');
        setBusy(false);
        setProgress('');
        return;
      }

      const chunks = chunkText(fullText);
      const translated: string[] = [];
      for (let i = 0; i < chunks.length; i++) {
        setProgress(`Translating chunk ${i + 1} of ${chunks.length}...`);
        const result = await translateChunk(chunks[i], sourceLang, targetLang);
        translated.push(result);
      }
      setTranslatedText(translated.join(' '));
    } catch {
      setError('Could not translate this file. The free translation service may be temporarily unavailable or rate-limited — try again shortly.');
    } finally {
      setBusy(false);
      setProgress('');
    }
  };

  const handleCopy = async () => {
    if (!translatedText) return;
    await navigator.clipboard.writeText(translatedText);
    setCopied(true);
  };

  const handleDownload = () => {
    if (!translatedText || !file) return;
    const bytes = new TextEncoder().encode(translatedText);
    downloadBytes(bytes, file.name.replace(/\.pdf$/i, '') + `-${targetLang}.txt`, 'text/plain');
  };

  return (
    <Box>
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setTranslatedText(null); setExtractedText(''); }} label="PDF file" selectedNames={file ? [file.name] : []} />

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mt: 3 }}>
        <TextField select fullWidth label="Translate from" value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
          {LANGUAGES.map((l) => <MenuItem key={l.code} value={l.code}>{l.label}</MenuItem>)}
        </TextField>
        <TextField select fullWidth label="Translate to" value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
          {LANGUAGES.map((l) => <MenuItem key={l.code} value={l.code}>{l.label}</MenuItem>)}
        </TextField>
      </Box>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleTranslate} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />{progress || 'Translating...'}</> : 'Translate PDF'}
      </Button>

      {translatedText !== null && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle2" gutterBottom>Translated text</Typography>
          <TextField
            fullWidth
            multiline
            minRows={10}
            maxRows={20}
            value={translatedText}
            slotProps={{ input: { readOnly: true } }}
          />
          <Box sx={{ display: 'flex', gap: 2, mt: 2, flexWrap: 'wrap' }}>
            <Button variant="outlined" onClick={handleCopy}>Copy to Clipboard</Button>
            <Button variant="outlined" onClick={handleDownload}>Download as .txt</Button>
          </Box>
        </Box>
      )}

      {extractedText && (
        <Snackbar open={copied} autoHideDuration={2500} onClose={() => setCopied(false)} message="Copied to clipboard" />
      )}
    </Box>
  );
};

const TranslatePdf = () => {
  const content = (
    <>
      <Typography variant="h2">How to Translate a PDF Online</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to translate.</li>
          <li>Choose the source language and the language you want to translate into.</li>
          <li>Click <strong>Translate PDF</strong> — its text is extracted, split into chunks, and each chunk is translated in sequence.</li>
          <li>Copy the translated text or download it as a <code>.txt</code> file.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 2-page French contract translated to English produces a single English text block covering the whole
        document — handy for a quick understanding of the content, even though the original PDF&apos;s layout
        isn&apos;t preserved.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Getting the gist of a foreign-language PDF contract, letter, or manual.</li>
          <li>Translating a scanned-and-OCR&apos;d document&apos;s text for a quick read.</li>
          <li>Preparing a rough translation before sending a document to a professional translator.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How accurate is the translation?</strong> This uses a free machine translation API, which is good for getting the gist of a document but is not a substitute for a professional or certified translation, especially for legal or medical documents.</li>
          <li><strong>Why did translation fail partway through?</strong> This tool calls a free, keyless public translation API (MyMemory) directly from your browser, which has usage limits shared across everyone using it without an API key. Heavy or repeated use — from you or other visitors — may hit that quota; wait a bit and try again, or translate a shorter document.</li>
          <li><strong>Does this preserve the PDF&apos;s formatting?</strong> No — only the extracted text is translated and shown as plain text; page layout, tables, and images are not reproduced.</li>
          <li><strong>Is my file uploaded anywhere?</strong> Text is extracted in your browser, then only the extracted text (never the original PDF file) is sent to the translation API to be translated.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/translate-pdf" content={content}>
      <TranslatePdfContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TranslatePdf;
