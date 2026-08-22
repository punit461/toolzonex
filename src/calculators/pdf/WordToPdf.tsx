'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';
import mammoth from 'mammoth';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { htmlStringToPdfBytes } from './htmlToPdfPages';

const WordToPdfContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const handleConvert = async () => {
    setError('');
    if (!file) { setError('Choose a .docx file first.'); return; }
    setBusy(true);
    try {
      const arrayBuffer = await readFileAsArrayBuffer(file);
      const { value: html } = await mammoth.convertToHtml({ arrayBuffer });
      const pdfBytes = await htmlStringToPdfBytes(html);
      downloadBytes(pdfBytes, file.name.replace(/\.docx$/i, '') + '.pdf');
    } catch (e) {
      setError('Could not convert this file. Make sure it is a valid .docx file (older .doc files are not supported).');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box>
      <PdfFileDropzone
        accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        onFilesSelected={(files) => setFile(files[0] ?? null)}
        label=".docx file"
        selectedNames={file ? [file.name] : []}
      />

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleConvert} disabled={busy || !file}>
        {busy ? 'Converting...' : 'Convert to PDF'}
      </Button>
    </Box>
  );
};

const WordToPdf = () => {
  const content = (
    <>
      <Typography variant="h2">How to Convert Word to PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload a <code>.docx</code> file (Word 2007 or later format).</li>
          <li>Click <strong>Convert to PDF</strong> — your document&apos;s text, headings, and tables are rendered and saved as a PDF.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Upload <code>report.docx</code> and get back <code>report.pdf</code>, preserving headings, paragraphs,
        lists, and tables — ready to share as a fixed, non-editable PDF.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Sharing a Word document as a PDF so formatting can&apos;t shift between devices.</li>
          <li>Submitting a resume, report, or assignment in PDF form.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does this support the old .doc format?</strong> No, only the modern <code>.docx</code> format is supported.</li>
          <li><strong>Will complex formatting be preserved exactly?</strong> Most text formatting, headings, lists, and tables come through well; very complex layouts (multi-column sections, embedded objects) may render differently than in Word.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — conversion happens entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell
      url="/tools/word-to-pdf"
      content={content}
    >
      <WordToPdfContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default WordToPdf;
