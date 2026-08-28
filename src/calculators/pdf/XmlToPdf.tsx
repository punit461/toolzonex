'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, TextField } from '@mui/material';
import { PDFDocument, StandardFonts, rgb } from '@cantoo/pdf-lib';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes } from './pdfUtils';

function formatXml(xml: string): string {
  const PAD = '  ';
  let formatted = '';
  let pad = 0;

  const trimmed = xml.replace(/>\s*</g, '><').trim();
  const nodes = trimmed.split(/(?=<)/g).filter((n) => n.trim().length > 0);

  nodes.forEach((rawNode) => {
    const node = rawNode.trim();
    const isDeclaration = /^<\?/.test(node);
    const isComment = /^<!--/.test(node);
    const isClosing = /^<\//.test(node);
    const isSelfClosing = /\/>\s*$/.test(node) || isDeclaration;
    const isOpenAndCloseOnOneLine = /^<([\w:.-]+)[^>]*>.*<\/\1\s*>$/.test(node);

    if (isClosing) pad = Math.max(0, pad - 1);
    formatted += PAD.repeat(pad) + node + '\n';
    if (!isClosing && !isSelfClosing && !isComment && !isOpenAndCloseOnOneLine) pad += 1;
  });

  return formatted.trim();
}

function wrapMonoLine(line: string, maxChars: number): string[] {
  if (line.length <= maxChars) return [line];
  const chunks: string[] = [];
  for (let i = 0; i < line.length; i += maxChars) chunks.push(line.slice(i, i + maxChars));
  return chunks;
}

const XmlToPdfContent = () => {
  const [xml, setXml] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const handleUpload = async (files: File[]) => {
    const file = files[0];
    if (!file) return;
    const text = await file.text();
    setXml(text);
  };

  const handleConvert = async () => {
    setError('');
    if (!xml.trim()) { setError('Paste or upload some XML first.'); return; }
    if (!xml.includes('<') || !xml.includes('>')) { setError('This doesn\'t look like XML — no tags found.'); return; }
    setBusy(true);
    try {
      const pretty = formatXml(xml);

      const doc = await PDFDocument.create();
      const font = await doc.embedFont(StandardFonts.Courier);
      const fontSize = 9;
      const lineHeight = fontSize * 1.4;
      const margin = 40;
      const pageWidth = 612;
      const pageHeight = 792;
      const maxWidth = pageWidth - margin * 2;
      const charWidth = font.widthOfTextAtSize('M', fontSize);
      const maxChars = Math.max(10, Math.floor(maxWidth / charWidth));

      let page = doc.addPage([pageWidth, pageHeight]);
      let y = pageHeight - margin;

      for (const line of pretty.split('\n')) {
        const wrapped = line === '' ? [''] : wrapMonoLine(line, maxChars);
        for (const chunk of wrapped) {
          if (y < margin) {
            page = doc.addPage([pageWidth, pageHeight]);
            y = pageHeight - margin;
          }
          page.drawText(chunk, { x: margin, y, size: fontSize, font, color: rgb(0.1, 0.1, 0.1) });
          y -= lineHeight;
        }
      }

      const output = await doc.save();
      downloadBytes(output, 'formatted-xml.pdf');
    } catch {
      setError('Could not convert this XML to PDF. Check that tags are properly closed.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box>
      <PdfFileDropzone accept=".xml,text/xml,application/xml" onFilesSelected={handleUpload} label="XML file" />

      <TextField
        sx={{ mt: 3 }}
        label="XML"
        placeholder="Paste your XML here, or upload a file above..."
        value={xml}
        onChange={(e) => setXml(e.target.value)}
        multiline
        rows={14}
        fullWidth
        slotProps={{ input: { style: { fontFamily: 'monospace', fontSize: '0.85rem' } } }}
      />

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleConvert} disabled={busy || !xml.trim()}>
        {busy ? 'Converting...' : 'Convert XML to PDF'}
      </Button>
    </Box>
  );
};

const XmlToPdf = () => {
  const content = (
    <>
      <Typography variant="h2">How to Convert XML to PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Paste your XML into the text box, or upload an <code>.xml</code> file.</li>
          <li>Click <strong>Convert XML to PDF</strong> — the XML is pretty-printed with proper indentation, then
            rendered as monospace text across as many pages as needed.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Pasting <code>{'<root><user><name>Alice</name></user></root>'}</code> produces a multi-page-ready PDF
        with the XML re-indented onto separate lines, each element nested under its parent — much easier to
        read and archive than a single minified line.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Archiving an API response or configuration file as a readable PDF snapshot.</li>
          <li>Sharing a formatted XML document with someone who doesn&apos;t have a code editor.</li>
          <li>Attaching a readable copy of an XML data file to a report or ticket.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does this validate my XML?</strong> Not strictly — it uses a lightweight, regex-based re-indenter, so it focuses on formatting rather than full schema validation.</li>
          <li><strong>What happens to very long lines or deeply nested elements?</strong> Long lines are wrapped to fit the page width, and the PDF automatically adds new pages as content runs long — there&apos;s no practical size limit.</li>
          <li><strong>Is my XML uploaded anywhere?</strong> No — formatting and PDF generation both happen entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/xml-to-pdf" content={content}>
      <XmlToPdfContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default XmlToPdf;
