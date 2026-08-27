'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, TextField, CircularProgress } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { loadPdfJsDocument } from './pdfThumbnails';

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const PdfToXmlContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [xml, setXml] = useState<string | null>(null);

  const handleConvert = async () => {
    setError('');
    setXml(null);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const pdfDoc = await loadPdfJsDocument(bytes);
      const pageTexts: string[] = [];

      for (let i = 1; i <= pdfDoc.numPages; i++) {
        const page = await pdfDoc.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items
          .map((item) => ('str' in item ? item.str : ''))
          .join(' ')
          .replace(/\s+/g, ' ')
          .trim();
        pageTexts.push(`  <page n="${i}"><text>${escapeXml(pageText)}</text></page>`);
      }

      const xmlOutput = `<?xml version="1.0" encoding="UTF-8"?>\n<document>\n${pageTexts.join('\n')}\n</document>`;
      setXml(xmlOutput);
    } catch {
      setError('Could not process this file. Make sure it is a valid PDF.');
    } finally {
      setBusy(false);
    }
  };

  const handleDownload = () => {
    if (!xml || !file) return;
    const bytes = new TextEncoder().encode(xml);
    downloadBytes(bytes, file.name.replace(/\.pdf$/i, '') + '.xml', 'application/xml');
  };

  return (
    <Box>
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setXml(null); }} label="PDF file" selectedNames={file ? [file.name] : []} />

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleConvert} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />Converting...</> : 'Convert to XML'}
      </Button>

      {xml !== null && (
        <Box sx={{ mt: 3 }}>
          <TextField
            fullWidth
            multiline
            minRows={10}
            maxRows={20}
            value={xml}
            slotProps={{ input: { readOnly: true } }}
            sx={{ '& .MuiInputBase-root': { fontFamily: 'monospace', fontSize: '0.8rem' } }}
          />
          <Box sx={{ display: 'flex', gap: 2, mt: 2, flexWrap: 'wrap' }}>
            <Button variant="outlined" onClick={handleDownload}>Download as .xml</Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

const PdfToXml = () => {
  const content = (
    <>
      <Typography variant="h2">How to Convert a PDF to XML</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to convert.</li>
          <li>Click <strong>Convert to XML</strong> — the tool extracts text from every page and wraps it in XML tags.</li>
          <li>Preview the generated XML and click <strong>Download as .xml</strong> to save the file.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A two-page PDF invoice becomes an XML document where each page is a <code>&lt;page n=&quot;1&quot;&gt;</code> element
        containing a <code>&lt;text&gt;</code> child with that page&apos;s extracted text content — ready for data pipelines or further transformation.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Feeding PDF content into XML-based data processing pipelines.</li>
          <li>Extracting structured text for use with XSLT transformations.</li>
          <li>Converting PDF reports into XML format for archival or import into other systems.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does this preserve images or formatting?</strong> No — only the text layer is extracted. Images, tables, and visual styling are not included in the XML output.</li>
          <li><strong>Will the XML be valid?</strong> Yes — the output follows a well-formed XML structure with a proper declaration, root <code>&lt;document&gt;</code> element, and one <code>&lt;page&gt;</code> per PDF page.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — conversion happens entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-to-xml" content={content}>
      <PdfToXmlContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfToXml;
