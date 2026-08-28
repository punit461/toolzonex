'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, CircularProgress } from '@mui/material';
import { PDFDocument } from '@cantoo/pdf-lib';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';

interface RepairResult {
  pageCount: number;
  originalSize: number;
  repairedSize: number;
}

const RepairPdfContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<RepairResult | null>(null);
  const [outputBytes, setOutputBytes] = useState<Uint8Array | null>(null);

  const handleRepair = async () => {
    setError('');
    setResult(null);
    setOutputBytes(null);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      let doc: PDFDocument;
      try {
        doc = await PDFDocument.load(bytes, {
          ignoreEncryption: true,
          throwOnInvalidObject: false,
          updateMetadata: false,
        });
      } catch {
        setError('This file is too damaged for this tool to repair. It may be missing critical structure (like its cross-reference table or page tree) that a lenient parser still can\'t recover.');
        return;
      }
      const pageCount = doc.getPageCount();
      const output = await doc.save({ useObjectStreams: true });
      setResult({ pageCount, originalSize: bytes.byteLength, repairedSize: output.byteLength });
      setOutputBytes(output);
    } catch {
      setError('Could not process this file.');
    } finally {
      setBusy(false);
    }
  };

  const handleDownload = () => {
    if (!outputBytes || !file) return;
    downloadBytes(outputBytes, file.name.replace(/\.pdf$/i, '') + '-repaired.pdf');
  };

  return (
    <Box>
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setResult(null); setOutputBytes(null); }} label="PDF file" selectedNames={file ? [file.name] : []} />

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      {result && (
        <Alert severity="success" sx={{ mt: 2 }}>
          Repaired successfully. Detected {result.pageCount} page{result.pageCount !== 1 ? 's' : ''}, rebuilt from
          {' '}{(result.originalSize / 1024).toFixed(1)} KB to {(result.repairedSize / 1024).toFixed(1)} KB with a clean structure.
        </Alert>
      )}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleRepair} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />Attempting Repair...</> : 'Repair PDF'}
      </Button>

      {outputBytes && (
        <Button variant="outlined" size="large" fullWidth sx={{ mt: 2 }} onClick={handleDownload}>
          Download Repaired PDF
        </Button>
      )}
    </Box>
  );
};

const RepairPdf = () => {
  const content = (
    <>
      <Typography variant="h2">How to Repair a Corrupt PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF that won&apos;t open properly or shows errors in other viewers.</li>
          <li>Click <strong>Repair PDF</strong> — the file is parsed with a lenient reader that tolerates minor structural damage, then rebuilt from scratch with a clean, well-formed structure.</li>
          <li>Download the repaired file once the tool reports success.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A PDF that was interrupted mid-download or edited by a buggy tool sometimes has a broken cross-reference
        table or malformed objects that make strict PDF readers refuse to open it. Running it through this tool
        parses whatever can be recovered and re-saves it with a fresh, standards-compliant structure that most
        viewers can open again.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Fixing a PDF that shows a &quot;file is damaged&quot; or &quot;failed to load&quot; error in a browser or PDF reader.</li>
          <li>Recovering a file after an interrupted download, transfer, or disk error.</li>
          <li>Cleaning up a PDF produced by a buggy export tool before archiving or sharing it.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Can this fix any corrupted PDF?</strong> No. It recovers files with minor structural issues that a lenient parser can still make sense of — a broken cross-reference table, slightly malformed objects, and similar issues. If the core structure (like the page tree) is too badly damaged, the parser itself will fail and the tool will tell you it couldn&apos;t recover the file.</li>
          <li><strong>Will this fix visual corruption, like garbled text or missing images?</strong> No — this tool repairs the PDF&apos;s underlying object structure, not rendering issues caused by missing fonts or damaged image streams inside an otherwise valid file.</li>
          <li><strong>Does this remove password protection?</strong> Encryption is ignored during the repair pass so the structure can be read, but the tool doesn&apos;t handle password-protected PDFs specially — use Unlock PDF first if the file is encrypted.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — everything happens entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/repair-pdf" content={content}>
      <RepairPdfContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RepairPdf;
