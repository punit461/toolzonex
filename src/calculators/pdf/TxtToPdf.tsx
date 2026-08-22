'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, TextField } from '@mui/material';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { downloadBytes } from './pdfUtils';

function wrapLine(text: string, font: import('pdf-lib').PDFFont, size: number, maxWidth: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines;
}

const TxtToPdfContent = () => {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const handleConvert = async () => {
    setError('');
    if (!text.trim()) { setError('Enter or paste some text first.'); return; }
    setBusy(true);
    try {
      const doc = await PDFDocument.create();
      const font = await doc.embedFont(StandardFonts.Helvetica);
      const fontSize = 11;
      const lineHeight = fontSize * 1.4;
      const margin = 50;
      const pageWidth = 612;
      const pageHeight = 792;
      const maxWidth = pageWidth - margin * 2;

      let page = doc.addPage([pageWidth, pageHeight]);
      let y = pageHeight - margin;

      const paragraphs = text.split('\n');
      for (const paragraph of paragraphs) {
        const wrapped = paragraph === '' ? [''] : wrapLine(paragraph, font, fontSize, maxWidth);
        for (const line of wrapped) {
          if (y < margin) {
            page = doc.addPage([pageWidth, pageHeight]);
            y = pageHeight - margin;
          }
          page.drawText(line, { x: margin, y, size: fontSize, font, color: rgb(0.1, 0.1, 0.1) });
          y -= lineHeight;
        }
      }

      const output = await doc.save();
      downloadBytes(output, 'document.pdf');
    } catch (e) {
      setError('Could not generate the PDF. Try shorter text or check for unusual characters.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box>
      <TextField
        label="Text"
        placeholder="Type or paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        multiline
        rows={14}
        fullWidth
      />

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleConvert} disabled={busy || !text.trim()}>
        {busy ? 'Converting...' : 'Convert to PDF'}
      </Button>
    </Box>
  );
};

const TxtToPdf = () => {
  const content = (
    <>
      <Typography variant="h2">How to Convert Text to PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Type or paste your text into the box.</li>
          <li>Click <strong>Convert to PDF</strong> — the text is laid out with automatic line wrapping and page breaks.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Paste a long email draft or meeting notes and get back a clean, paginated PDF — no manual formatting
        needed, long lines wrap automatically and new pages are added as the text runs long.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Turning plain-text notes into a shareable PDF.</li>
          <li>Archiving a chat log or transcript as a PDF.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does it support rich formatting like bold or headings?</strong> No, this converts plain text only, with line and page breaks.</li>
          <li><strong>Is my text uploaded anywhere?</strong> No — conversion happens entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell
      url="/tools/text-to-pdf"
      content={content}
    >
      <TxtToPdfContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TxtToPdf;
