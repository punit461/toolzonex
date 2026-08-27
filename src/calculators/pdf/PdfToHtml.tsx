'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, TextField, CircularProgress } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { loadPdfJsDocument } from './pdfThumbnails';

function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const PdfToHtmlContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [html, setHtml] = useState<string | null>(null);

  const handleExtract = async () => {
    setError('');
    setHtml(null);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const pdfDoc = await loadPdfJsDocument(bytes);
      const htmlParts: string[] = [
        '<!DOCTYPE html>', '<html lang="en"><head><meta charset="UTF-8">',
        '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
        '<title>', escapeHtml(file.name.replace(/\.pdf$/i, '')), '</title>',
        '<style>body{font-family:sans-serif;max-width:800px;margin:0 auto;padding:20px;line-height:1.6}',
        'table{border-collapse:collapse;width:100%;margin:16px 0}',
        'td,th{border:1px solid #ccc;padding:6px 10px;text-align:left}',
        'h1{font-size:1.5em} h2{font-size:1.3em} h3{font-size:1.1em}</style></head><body>',
      ];

      for (let i = 1; i <= pdfDoc.numPages; i++) {
        const page = await pdfDoc.getPage(i);
        const viewport = page.getViewport({ scale: 1 });
        const content = await page.getTextContent();

        const positioned = content.items
          .filter((item) => 'str' in item && 'transform' in item)
          .map((item) => {
            const t = (item as { transform: number[] }).transform;
            return {
              text: (item as { str: string }).str || '',
              x: Math.round(t[4] * 10) / 10,
              y: Math.round((viewport.height - t[5]) * 10) / 10,
              fontSize: Math.round(Math.abs(t[0]) * 10) / 10,
            };
          });

        if (positioned.length === 0) continue;

        const sorted = [...positioned].sort((a, b) => b.y - a.y || a.x - b.x);
        const Y_TOLERANCE = 6;

        htmlParts.push(`<hr><h2>Page ${i}</h2>`);

        let currentY = sorted[0].y;
        let lineTexts: typeof sorted = [];

        const flushLine = () => {
          if (lineTexts.length === 0) return;
          const avgFontSize = lineTexts.reduce((s, it) => s + it.fontSize, 0) / lineTexts.length;
          const lineStr = lineTexts.map((it) => it.text).join(' ').trim();
          if (!lineStr) return;
          const tag = avgFontSize >= 18 ? 'h1' : avgFontSize >= 14 ? 'h2' : avgFontSize >= 12 ? 'h3' : 'p';
          htmlParts.push(`<${tag}>${escapeHtml(lineStr)}</${tag}>`);
        };

        for (const item of sorted) {
          if (Math.abs(item.y - currentY) > Y_TOLERANCE) {
            flushLine();
            currentY = item.y;
            lineTexts = [item];
          } else {
            lineTexts.push(item);
          }
        }
        flushLine();
      }

      htmlParts.push('</body></html>');
      setHtml(htmlParts.join('\n'));
    } catch {
      setError('Could not process this file. Make sure it is a valid PDF.');
    } finally {
      setBusy(false);
    }
  };

  const handleDownload = () => {
    if (!html || !file) return;
    const bytes = new TextEncoder().encode(html);
    downloadBytes(bytes, file.name.replace(/\.pdf$/i, '') + '.html', 'text/html');
  };

  return (
    <Box>
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setHtml(null); }} label="PDF file" selectedNames={file ? [file.name] : []} />

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleExtract} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />Converting...</> : 'Convert to HTML'}
      </Button>

      {html !== null && (
        <Box sx={{ mt: 3 }}>
          <TextField
            fullWidth
            multiline
            minRows={10}
            maxRows={20}
            value={html}
            slotProps={{ input: { readOnly: true } }}
            sx={{ '& .MuiInputBase-root': { fontFamily: 'monospace', fontSize: '0.8rem' } }}
          />
          <Box sx={{ display: 'flex', gap: 2, mt: 2, flexWrap: 'wrap' }}>
            <Button variant="outlined" onClick={handleDownload}>Download as .html</Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

const PdfToHtml = () => {
  const content = (
    <>
      <Typography variant="h2">How to Convert a PDF to HTML</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to convert.</li>
          <li>Click <strong>Convert to HTML</strong> — the tool reads font sizes and positions to infer headings and paragraphs.</li>
          <li>Preview the generated HTML and click <strong>Download as .html</strong> to save the file.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A two-page PDF newsletter with a large title, subheadings, and body paragraphs will be converted into
        an HTML file with <code>&lt;h1&gt;</code>, <code>&lt;h2&gt;</code>, and <code>&lt;p&gt;</code> tags
        that mirror the original structure.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Turning PDF articles or reports into web-friendly HTML for publishing on a site or blog.</li>
          <li>Converting PDF documentation into a format that can be embedded in an email or knowledge base.</li>
          <li>Creating an editable HTML version of a PDF to restyle with CSS.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Will images from the PDF be included?</strong> No — only the text layer is converted. Images embedded in the PDF are not extracted.</li>
          <li><strong>Does the HTML preserve exact layout?</strong> The tool approximates the document structure using font sizes for heading levels, but pixel-perfect layout is not guaranteed.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — conversion runs entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-to-html" content={content}>
      <PdfToHtmlContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfToHtml;
