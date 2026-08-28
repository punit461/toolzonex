'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, TextField, CircularProgress, Snackbar } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { loadPdfJsDocument } from './pdfThumbnails';

interface LlamaIndexDocument {
  text: string;
  metadata: { page_number: number; source: string };
}

const PdfToLlamaIndexJsonContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [json, setJson] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleExtract = async () => {
    setError('');
    setJson(null);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const pdf = await loadPdfJsDocument(bytes);
      const documents: LlamaIndexDocument[] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const text = content.items.map((item) => ('str' in item ? item.str : '')).join(' ').replace(/\s+/g, ' ').trim();
        documents.push({ text, metadata: { page_number: i, source: file.name } });
      }

      if (documents.every((d) => !d.text)) {
        setError('No selectable text found — this PDF may be scanned or image-based, so there is no text layer to extract.');
      } else {
        setJson(JSON.stringify(documents, null, 2));
      }
    } catch {
      setError('Could not read this file. Make sure it is a valid PDF.');
    } finally {
      setBusy(false);
    }
  };

  const handleCopy = async () => {
    if (!json) return;
    await navigator.clipboard.writeText(json);
    setCopied(true);
  };

  const handleDownload = () => {
    if (!json || !file) return;
    const bytes = new TextEncoder().encode(json);
    downloadBytes(bytes, file.name.replace(/\.pdf$/i, '') + '-llamaindex.json', 'application/json');
  };

  return (
    <Box>
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setJson(null); }} label="PDF file" selectedNames={file ? [file.name] : []} />

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleExtract} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />Extracting...</> : 'Convert to LlamaIndex JSON'}
      </Button>

      {json !== null && (
        <Box sx={{ mt: 3 }}>
          <TextField
            fullWidth
            multiline
            minRows={12}
            maxRows={24}
            value={json}
            slotProps={{ input: { readOnly: true } }}
            sx={{ '& .MuiInputBase-root': { fontFamily: 'monospace', fontSize: '0.8rem' } }}
          />
          <Box sx={{ display: 'flex', gap: 2, mt: 2, flexWrap: 'wrap' }}>
            <Button variant="outlined" onClick={handleCopy}>Copy to Clipboard</Button>
            <Button variant="outlined" onClick={handleDownload}>Download as .json</Button>
          </Box>
        </Box>
      )}

      <Snackbar open={copied} autoHideDuration={2500} onClose={() => setCopied(false)} message="Copied to clipboard" />
    </Box>
  );
};

const PdfToLlamaIndexJson = () => {
  const content = (
    <>
      <Typography variant="h2">How to Convert a PDF to LlamaIndex JSON</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to convert.</li>
          <li>Click <strong>Convert to LlamaIndex JSON</strong> — text is extracted from every page and formatted as a JSON array of document objects.</li>
          <li>Copy the JSON or download it as a <code>.json</code> file, ready to feed into a LlamaIndex ingestion pipeline.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 2-page PDF produces: <code>{`[{"text": "...page 1 text...", "metadata": {"page_number": 1, "source": "report.pdf"}}, {"text": "...page 2 text...", "metadata": {"page_number": 2, "source": "report.pdf"}}]`}</code> — one document object per page, matching LlamaIndex&apos;s simple Document schema.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Preparing a PDF for ingestion into a LlamaIndex RAG (retrieval-augmented generation) pipeline.</li>
          <li>Getting per-page text with metadata for building a searchable document index.</li>
          <li>Converting a document into a structured format for downstream LLM or embedding workflows.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why does one document&apos;s text come out empty?</strong> Scanned or photographed pages have no underlying text layer, so there is nothing to extract from that page — the JSON entry is still created, just with empty text.</li>
          <li><strong>Does this exactly match LlamaIndex&apos;s internal Document class?</strong> It matches the common simple JSON shape (<code>text</code> + <code>metadata</code>) used when loading documents manually — you can load this JSON and construct <code>Document</code> objects from it in your own ingestion code.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — extraction happens entirely in your browser; the PDF is never sent to a server.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-to-llamaindex-json" content={content}>
      <PdfToLlamaIndexJsonContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfToLlamaIndexJson;
