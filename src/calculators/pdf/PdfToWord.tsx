'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, CircularProgress } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { loadPdfJsDocument } from './pdfThumbnails';
import { buildDocxFromPages } from './docxBuilder';

const PdfToWordContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState(false);
  const [noTextFound, setNoTextFound] = useState(false);

  const handleConvert = async () => {
    setError('');
    setSuccess(false);
    setNoTextFound(false);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const pdf = await loadPdfJsDocument(bytes);
      const pages: string[] = [];
      let anyText = false;

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        let pageText = '';
        for (const item of content.items) {
          if (!('str' in item)) continue;
          pageText += item.str;
          if ('hasEOL' in item && item.hasEOL) pageText += '\n';
          else pageText += ' ';
        }
        pageText = pageText.replace(/[ \t]+\n/g, '\n').trim();
        if (pageText) anyText = true;
        pages.push(pageText);
      }

      if (!anyText) {
        setNoTextFound(true);
        return;
      }

      const baseName = file.name.replace(/\.pdf$/i, '');
      const docx = await buildDocxFromPages(pages, baseName);
      downloadBytes(docx, baseName + '.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
      setSuccess(true);
    } catch {
      setError('Could not convert this file. Make sure it is a valid PDF.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box>
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setSuccess(false); setNoTextFound(false); }} label="PDF file" selectedNames={file ? [file.name] : []} />

      <Alert severity="warning" sx={{ mt: 2 }}>
        This extracts the PDF&apos;s text into a real, Word-compatible <code>.docx</code> file — it does not
        preserve the original layout, fonts, images, tables, or columns. See the FAQ below for details.
      </Alert>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mt: 2 }}>Converted and downloaded as a .docx file.</Alert>}
      {noTextFound && (
        <Alert severity="warning" sx={{ mt: 2 }}>
          No selectable text found — this PDF may be scanned or image-based, so there is no text layer to convert.
          Try the OCR PDF tool first to extract text from a scanned document.
        </Alert>
      )}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleConvert} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />Converting...</> : 'Convert to Word (.docx)'}
      </Button>
    </Box>
  );
};

const PdfToWord = () => {
  const content = (
    <>
      <Typography variant="h2">How to Convert a PDF to Word</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to convert.</li>
          <li>Click <strong>Convert to Word (.docx)</strong> — the text from every page is pulled out and assembled into a Word-compatible document.</li>
          <li>Open the downloaded <code>.docx</code> file in Microsoft Word, Google Docs, or LibreOffice.</li>
        </ul>
      </Box>

      <Typography variant="h2">What this tool actually does</Typography>
      <Typography variant="body1">
        Fully preserving a PDF&apos;s exact layout — fonts, positioning, tables, columns, and images — when
        converting to an editable Word document requires a rendering and layout-reconstruction engine well beyond
        what a static, client-side tool can do. This tool takes an honest, practical approach instead: it extracts
        each page&apos;s text content in reading order and builds it into a genuinely valid Word Open XML
        (<code>.docx</code>) file, with a page break inserted between each original PDF page. The result opens
        natively in Word and is fully editable, but it is plain text — no original fonts, images, tables, or
        multi-column layouts carry over.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 2-page PDF report becomes a <code>.docx</code> file with the first page&apos;s text, then a page break,
        then the second page&apos;s text — ready to edit, reformat, or copy into another document in Word.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Getting a PDF&apos;s text into an editable Word document without retyping it.</li>
          <li>Repurposing the wording from a PDF report into a new Word template.</li>
          <li>Quickly extracting and reformatting text from a PDF for a different document.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Will the formatting, fonts, and layout be preserved?</strong> No — only the extracted plain text is preserved, with paragraph breaks and a page break between original pages. Fonts, colors, images, tables, and multi-column layouts from the source PDF are not carried over.</li>
          <li><strong>Is the output a real .docx file?</strong> Yes — it&apos;s a genuinely valid Word Open XML document that opens natively in Microsoft Word, Google Docs, and LibreOffice, not a renamed text file.</li>
          <li><strong>Why does it say no text was found?</strong> Scanned or photographed PDFs are usually just images with no underlying text layer. Run the OCR PDF tool first to recognize the text, then convert that.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — extraction and document creation both happen entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-to-word" content={content}>
      <PdfToWordContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfToWord;
