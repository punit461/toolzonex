'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, TextField, CircularProgress, Snackbar, Paper, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { loadPdfJsDocument } from './pdfThumbnails';

function cleanText(text: string): string {
  return text
    .replace(/[ \t]+/g, ' ')
    .replace(/[ \t]*\n[ \t]*/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function chunkText(text: string, size: number, overlap: number): string[] {
  const chunks: string[] = [];
  const safeOverlap = Math.min(overlap, Math.max(0, size - 1));
  let start = 0;
  while (start < text.length) {
    const end = Math.min(start + size, text.length);
    chunks.push(text.slice(start, end));
    if (end === text.length) break;
    start = end - safeOverlap;
  }
  return chunks;
}

const PreparePdfForAiContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [chunkSize, setChunkSize] = useState('1000');
  const [overlap, setOverlap] = useState('100');
  const [format, setFormat] = useState<'txt' | 'json'>('txt');
  const [chunks, setChunks] = useState<string[] | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  const handlePrepare = async () => {
    setError('');
    setChunks(null);
    if (!file) { setError('Choose a PDF file first.'); return; }
    const size = parseInt(chunkSize, 10);
    const overlapVal = parseInt(overlap, 10);
    if (!size || size < 50) { setError('Chunk size must be at least 50 characters.'); return; }
    if (overlapVal < 0 || overlapVal >= size) { setError('Overlap must be 0 or greater, and smaller than the chunk size.'); return; }

    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const pdf = await loadPdfJsDocument(bytes);
      const pageTexts: string[] = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        pageTexts.push(content.items.map((item) => ('str' in item ? item.str : '')).join(' '));
      }
      const cleaned = cleanText(pageTexts.join('\n\n'));
      if (!cleaned) {
        setError('No selectable text found — this PDF may be scanned or image-based.');
        return;
      }
      setChunks(chunkText(cleaned, size, overlapVal));
    } catch {
      setError('Could not read this file. Make sure it is a valid PDF.');
    } finally {
      setBusy(false);
    }
  };

  const handleCopy = async () => {
    if (!chunks) return;
    await navigator.clipboard.writeText(chunks.join('\n\n---\n\n'));
    setCopied(true);
  };

  const handleDownload = () => {
    if (!chunks || !file) return;
    const baseName = file.name.replace(/\.pdf$/i, '');
    if (format === 'json') {
      const bytes = new TextEncoder().encode(JSON.stringify(chunks, null, 2));
      downloadBytes(bytes, baseName + '-chunks.json', 'application/json');
    } else {
      const bytes = new TextEncoder().encode(chunks.map((c, i) => `--- Chunk ${i + 1} ---\n${c}`).join('\n\n'));
      downloadBytes(bytes, baseName + '-chunks.txt', 'text/plain');
    }
  };

  return (
    <Box>
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setChunks(null); }} label="PDF file" selectedNames={file ? [file.name] : []} />

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mt: 3 }}>
        <TextField fullWidth type="number" label="Chunk size (characters)" value={chunkSize} onFocus={(e) => e.target.select()} onChange={(e) => setChunkSize(e.target.value)} />
        <TextField fullWidth type="number" label="Overlap (characters)" value={overlap} onFocus={(e) => e.target.select()} onChange={(e) => setOverlap(e.target.value)} />
      </Box>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handlePrepare} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />Preparing...</> : 'Clean & Chunk for AI'}
      </Button>

      {chunks && (
        <Box sx={{ mt: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 2 }}>
            <Typography variant="subtitle1">{chunks.length} chunk{chunks.length === 1 ? '' : 's'} generated</Typography>
            <ToggleButtonGroup value={format} exclusive size="small" onChange={(_, v) => v !== null && setFormat(v)}>
              <ToggleButton value="txt">.txt</ToggleButton>
              <ToggleButton value="json">.json</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box sx={{ maxHeight: 500, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
            {chunks.map((chunk, i) => (
              <Paper key={i} variant="outlined" sx={{ p: 2 }}>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                  Chunk {i + 1} of {chunks.length} ({chunk.length} characters)
                </Typography>
                <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '0.8rem' }}>
                  {chunk}
                </Typography>
              </Paper>
            ))}
          </Box>

          <Box sx={{ display: 'flex', gap: 2, mt: 2, flexWrap: 'wrap' }}>
            <Button variant="outlined" onClick={handleCopy}>Copy All Chunks</Button>
            <Button variant="outlined" onClick={handleDownload}>Download as {format === 'json' ? '.json' : '.txt'}</Button>
          </Box>
        </Box>
      )}

      <Snackbar open={copied} autoHideDuration={2500} onClose={() => setCopied(false)} message="Copied to clipboard" />
    </Box>
  );
};

const PreparePdfForAi = () => {
  const content = (
    <>
      <Typography variant="h2">How to Prepare a PDF for AI / RAG Ingestion</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to prepare.</li>
          <li>Set the <strong>chunk size</strong> (default 1000 characters) and <strong>overlap</strong> (default 100 characters) between consecutive chunks.</li>
          <li>Click <strong>Clean &amp; Chunk for AI</strong> — text is extracted, whitespace is normalized, and it&apos;s split into numbered chunks.</li>
          <li>Copy all chunks or download them as a <code>.txt</code> file (chunks separated by headers) or a <code>.json</code> array of strings.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 10-page manual with messy spacing and repeated blank lines is cleaned up, then split into 1000-character
        chunks with a 100-character overlap — so context isn&apos;t lost at chunk boundaries — ready to embed and
        index for a retrieval-augmented generation (RAG) pipeline or to paste into an LLM&apos;s context window.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Preparing a document for a RAG pipeline that needs pre-chunked, cleaned text.</li>
          <li>Splitting a long PDF into pieces that fit within an LLM&apos;s context window.</li>
          <li>Cleaning up extracted PDF text before embedding or indexing it.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why use overlap between chunks?</strong> Overlap keeps a bit of context from the end of one chunk repeated in the next, so a fact or sentence split at a chunk boundary isn&apos;t lost when a language model or search index processes each chunk independently.</li>
          <li><strong>What size chunk should I use?</strong> 500–1500 characters works well for most RAG setups; use smaller chunks for precise retrieval or larger chunks if your model or index handles more context per entry.</li>
          <li><strong>Does this remove headers and footers?</strong> It only normalizes whitespace (collapsing extra spaces and blank lines) — it does not attempt to detect and strip repeated headers or footers, since reliably identifying those varies a lot by document.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — extraction, cleaning, and chunking all happen entirely in your browser; the PDF is never sent to a server.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/prepare-pdf-for-ai" content={content}>
      <PreparePdfForAiContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PreparePdfForAi;
