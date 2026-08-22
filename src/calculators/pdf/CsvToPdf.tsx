'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes } from './pdfUtils';

function parseCsv(text: string): string[][] {
  return text
    .split(/\r?\n/)
    .filter((line) => line.length > 0)
    .map((line) => line.split(',').map((cell) => cell.trim().replace(/^"|"$/g, '')));
}

const CsvToPdfContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const handleConvert = async () => {
    setError('');
    if (!file) { setError('Choose a CSV file first.'); return; }
    setBusy(true);
    try {
      const text = await file.text();
      const rows = parseCsv(text);
      if (rows.length === 0) { setError('This CSV file appears to be empty.'); setBusy(false); return; }

      const colCount = Math.max(...rows.map((r) => r.length));
      const pageWidth = 792;
      const pageHeight = 612;
      const margin = 40;
      const colWidth = (pageWidth - margin * 2) / colCount;
      const rowHeight = 22;
      const fontSize = 9;

      const doc = await PDFDocument.create();
      const font = await doc.embedFont(StandardFonts.Helvetica);
      const boldFont = await doc.embedFont(StandardFonts.HelveticaBold);

      let page = doc.addPage([pageWidth, pageHeight]);
      let y = pageHeight - margin;

      rows.forEach((row, rowIndex) => {
        if (y < margin + rowHeight) {
          page = doc.addPage([pageWidth, pageHeight]);
          y = pageHeight - margin;
        }
        row.forEach((cell, colIndex) => {
          const x = margin + colIndex * colWidth;
          const truncated = cell.length > 40 ? cell.slice(0, 37) + '...' : cell;
          page.drawText(truncated, {
            x: x + 4,
            y: y - 14,
            size: fontSize,
            font: rowIndex === 0 ? boldFont : font,
            color: rgb(0.1, 0.1, 0.1),
          });
        });
        page.drawLine({ start: { x: margin, y: y - rowHeight + 6 }, end: { x: pageWidth - margin, y: y - rowHeight + 6 }, thickness: 0.5, color: rgb(0.85, 0.85, 0.85) });
        y -= rowHeight;
      });

      const output = await doc.save();
      downloadBytes(output, file.name.replace(/\.csv$/i, '') + '.pdf');
    } catch (e) {
      setError('Could not convert this CSV file.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box>
      <PdfFileDropzone accept=".csv,text/csv" onFilesSelected={(files) => setFile(files[0] ?? null)} label="CSV file" selectedNames={file ? [file.name] : []} />

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleConvert} disabled={busy || !file}>
        {busy ? 'Converting...' : 'Convert to PDF'}
      </Button>
    </Box>
  );
};

const CsvToPdf = () => {
  const content = (
    <>
      <Typography variant="h2">How to Convert CSV to PDF</Typography>
      <Typography variant="body1">
        Need to csv convert to pdf quickly? This free tool turns any CSV file into a clean, printable PDF table
        in two steps, entirely in your browser.
      </Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload a CSV file.</li>
          <li>Click <strong>Convert to PDF</strong> — the data is laid out as a simple table, with the first row bolded as a header, and the PDF downloads automatically.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A CSV export of your spreadsheet data converts into a landscape-oriented PDF table, with each column
        evenly spaced and long cell values truncated so the table stays readable.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Sharing a spreadsheet export as a read-only PDF.</li>
          <li>Printing tabular data without opening a spreadsheet app.</li>
          <li>Converting a CSV data export into a PDF attachment for an email or report.</li>
          <li>Turning raw CSV data from an API or database export into something non-technical readers can open directly.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does it preserve cell formatting or formulas?</strong> No, this is a plain-text table conversion — formulas, colors, and formatting from the original spreadsheet aren&apos;t preserved.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — conversion happens entirely in your browser.</li>
          <li><strong>How do I csv convert to pdf on this page?</strong> Upload your .csv file using the file picker, then click &quot;Convert to PDF&quot; — the file downloads automatically as a landscape PDF table with the first row bolded as a header.</li>
          <li><strong>Is there a size or row limit for the CSV file?</strong> There&apos;s no hard limit — the tool adds new pages automatically as rows fill the page, so a large CSV will simply produce a multi-page PDF.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell
      url="/tools/csv-to-pdf"
      content={content}
    >
      <CsvToPdfContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CsvToPdf;
