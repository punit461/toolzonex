'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { downloadBytes } from './pdfUtils';
import { PDFDocument, StandardFonts, rgb } from '@cantoo/pdf-lib';

const PAGE_SIZES: Record<string, { width: number; height: number; label: string }> = {
  a4: { width: 595.28, height: 841.89, label: 'A4 (210 × 297 mm)' },
  letter: { width: 612, height: 792, label: 'US Letter (8.5 × 11 in)' },
  legal: { width: 612, height: 1008, label: 'US Legal (8.5 × 14 in)' },
};

const FONT_SIZES = [10, 12, 14, 16, 18, 20, 24];

const PdfBuilderContent = () => {
  const [text, setText] = useState('');
  const [pageSize, setPageSize] = useState('a4');
  const [fontSize, setFontSize] = useState(12);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const handleBuild = async () => {
    setError('');
    if (!text.trim()) { setError('Enter some text to create the PDF.'); return; }
    setBusy(true);
    try {
      const { width, height } = PAGE_SIZES[pageSize];
      const doc = await PDFDocument.create();
      const font = await doc.embedFont(StandardFonts.Helvetica);

      const margin = 50;
      const usableWidth = width - margin * 2;
      const lineHeight = fontSize * 1.4;
      const linesPerPage = Math.floor((height - margin * 2) / lineHeight);

      const paragraphs = text.split('\n');
      const allLines: string[] = [];
      for (const para of paragraphs) {
        if (para.trim() === '') { allLines.push(''); continue; }
        const words = para.split(/\s+/);
        let currentLine = '';
        for (const word of words) {
          const testLine = currentLine ? `${currentLine} ${word}` : word;
          const testWidth = font.widthOfTextAtSize(testLine, fontSize);
          if (testWidth > usableWidth && currentLine) {
            allLines.push(currentLine);
            currentLine = word;
          } else {
            currentLine = testLine;
          }
        }
        if (currentLine) allLines.push(currentLine);
      }

      let page = doc.addPage([width, height]);
      let y = height - margin;

      for (const line of allLines) {
        if (y < margin) {
          page = doc.addPage([width, height]);
          y = height - margin;
        }
        if (line) {
          page.drawText(line, {
            x: margin,
            y,
            size: fontSize,
            font,
            color: rgb(0, 0, 0),
          });
        }
        y -= lineHeight;
      }

      const output = await doc.save();
      downloadBytes(output, 'created-document.pdf');
    } catch {
      setError('Could not create the PDF. Please check your text input.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box>
      <TextField
        fullWidth
        multiline
        minRows={8}
        maxRows={20}
        label="Enter your text content"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste your text here. Line breaks are preserved as new paragraphs."
        sx={{ mb: 2 }}
      />

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
        <FormControl fullWidth>
          <InputLabel>Page size</InputLabel>
          <Select value={pageSize} label="Page size" onChange={(e) => setPageSize(e.target.value)}>
            {Object.entries(PAGE_SIZES).map(([key, val]) => (
              <MenuItem key={key} value={key}>{val.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Font size</InputLabel>
          <Select value={fontSize} label="Font size" onChange={(e) => setFontSize(Number(e.target.value))}>
            {FONT_SIZES.map((s) => (
              <MenuItem key={s} value={s}>{s}pt</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleBuild} disabled={busy || !text.trim()}>
        {busy ? 'Creating...' : 'Create PDF'}
      </Button>
    </Box>
  );
};

const PdfBuilder = () => {
  const content = (
    <>
      <Typography variant="h2">How to Create a PDF from Text</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Type or paste your text content into the text area.</li>
          <li>Select a page size (A4, US Letter, or US Legal) and font size.</li>
          <li>Click <strong>Create PDF</strong> to generate and download your document.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        You have a meeting agenda typed in a notes app. Paste it into the text area, choose A4 and 12pt font,
        and click Create PDF — a properly formatted, multi-page document is ready in seconds with automatic line
        wrapping and page breaks.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Quickly converting plain-text notes into a shareable PDF document.</li>
          <li>Generating simple one-page letters or memos without a word processor.</li>
          <li>Creating text-based PDF templates for forms or instructions.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does this support images or formatting?</strong> No — this tool creates text-only PDFs. For rich formatting, use a word processor and export as PDF.</li>
          <li><strong>How are page breaks handled?</strong> Text wraps automatically. When a page fills up, a new page is created with the same margins and formatting.</li>
          <li><strong>Is my content uploaded anywhere?</strong> No — the PDF is generated entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-builder" content={content}>
      <PdfBuilderContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfBuilder;
