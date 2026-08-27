'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, Paper, IconButton, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { readFileAsArrayBuffer } from './pdfUtils';

const PdfToBase64Content = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [base64, setBase64] = useState('');
  const [copied, setCopied] = useState(false);

  const handleAction = async () => {
    setError('');
    setBase64('');
    setCopied(false);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const binary = new Uint8Array(bytes);
      let bin = '';
      for (let i = 0; i < binary.length; i++) bin += String.fromCharCode(binary[i]);
      setBase64(btoa(bin));
    } catch {
      setError('Could not read this file.');
    } finally { setBusy(false); }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(base64);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError('Could not copy to clipboard.');
    }
  };

  const PREVIEW_LEN = 300;

  return (
    <Box>
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setBase64(''); setCopied(false); }} label="PDF file" selectedNames={file ? [file.name] : []} />
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleAction} disabled={busy || !file}>
        {busy ? 'Converting...' : 'Convert to Base64'}
      </Button>

      {base64 && (
        <Paper variant="outlined" sx={{ mt: 3, p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle2" sx={{ flex: 1 }}>Base64 Output ({(base64.length / 1024).toFixed(1)} KB)</Typography>
            <Tooltip title={copied ? 'Copied!' : 'Copy full base64 string'}>
              <IconButton size="small" onClick={handleCopy}>
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
          <Box sx={{
            fontFamily: 'monospace',
            fontSize: '0.75rem',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all',
            maxHeight: 200,
            overflow: 'auto',
            bgcolor: 'action.hover',
            borderRadius: 1,
            p: 1.5,
          }}>
            {base64.length > PREVIEW_LEN * 2
              ? `${base64.slice(0, PREVIEW_LEN)}... (${base64.length - PREVIEW_LEN * 2} characters omitted) ...${base64.slice(-PREVIEW_LEN)}`
              : base64}
          </Box>
          {base64.length > PREVIEW_LEN * 2 && (
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Showing preview — click copy to get the complete string.
            </Typography>
          )}
        </Paper>
      )}
    </Box>
  );
};

const PdfToBase64 = () => {
  const content = (
    <>
      <Typography variant="h2">How to Convert a PDF to Base64</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF file you want to encode.</li>
          <li>Click <strong>Convert to Base64</strong> — the file is read and converted to a Base64 string entirely in your browser.</li>
          <li>Copy the full Base64 string using the copy button, or preview the first and last characters inline.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 50 KB PDF converts to roughly 67 KB of Base64 text (Base64 encodes every 3 bytes as 4 characters).
        The output string always starts with <code>JVBERi0</code>, which is the Base64 encoding of the PDF
        magic bytes <code>%PDF-</code>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Embedding a PDF directly into a JSON payload or API request body.</li>
          <li>Storing a PDF as a text column in a database that doesn&apos;t support binary blobs.</li>
          <li>Including a PDF as an inline data URI in an HTML document.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why does the Base64 string look longer than the file?</strong> Base64 encoding expands data by roughly 33% — three binary bytes become four printable characters, so the output is always about a third larger than the original.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — encoding happens entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-to-base64" content={content}>
      <PdfToBase64Content />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfToBase64;
