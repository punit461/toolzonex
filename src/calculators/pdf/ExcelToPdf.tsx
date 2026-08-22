'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';
import * as XLSX from 'xlsx';
import { PDFDocument, StandardFonts, rgb } from '@cantoo/pdf-lib';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';

const ExcelToPdfContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const handleConvert = async () => {
    setError('');
    if (!file) { setError('Choose an Excel file first.'); return; }
    setBusy(true);
    try {
      const arrayBuffer = await readFileAsArrayBuffer(file);
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });

      const doc = await PDFDocument.create();
      const font = await doc.embedFont(StandardFonts.Helvetica);
      const boldFont = await doc.embedFont(StandardFonts.HelveticaBold);
      const pageWidth = 792;
      const pageHeight = 612;
      const margin = 40;
      const rowHeight = 22;
      const fontSize = 9;

      for (const sheetName of workbook.SheetNames) {
        const sheet = workbook.Sheets[sheetName];
        const rows: string[][] = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });
        if (rows.length === 0) continue;

        const colCount = Math.max(...rows.map((r) => r.length), 1);
        const colWidth = (pageWidth - margin * 2) / colCount;

        let page = doc.addPage([pageWidth, pageHeight]);
        let y = pageHeight - margin;
        page.drawText(sheetName, { x: margin, y, size: 12, font: boldFont, color: rgb(0.1, 0.1, 0.1) });
        y -= rowHeight;

        rows.forEach((row, rowIndex) => {
          if (y < margin + rowHeight) {
            page = doc.addPage([pageWidth, pageHeight]);
            y = pageHeight - margin;
          }
          row.forEach((cell, colIndex) => {
            const x = margin + colIndex * colWidth;
            const text = String(cell ?? '');
            const truncated = text.length > 40 ? text.slice(0, 37) + '...' : text;
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
      }

      const output = await doc.save();
      downloadBytes(output, file.name.replace(/\.(xlsx|xls)$/i, '') + '.pdf');
    } catch (e) {
      setError('Could not convert this file. Make sure it is a valid Excel (.xlsx or .xls) file.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box>
      <PdfFileDropzone
        accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        onFilesSelected={(files) => setFile(files[0] ?? null)}
        label="Excel file"
        selectedNames={file ? [file.name] : []}
      />

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleConvert} disabled={busy || !file}>
        {busy ? 'Converting...' : 'Convert to PDF'}
      </Button>
    </Box>
  );
};

const ExcelToPdf = () => {
  const content = (
    <>
      <Typography variant="h2">How to Convert Excel to PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload an <code>.xlsx</code> or <code>.xls</code> file.</li>
          <li>Click <strong>Convert to PDF</strong> — each sheet is rendered as a table, with the first row bolded as a header.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A workbook with &quot;Q1&quot; and &quot;Q2&quot; sheets converts into a PDF where each sheet starts on
        its own page, labeled with the sheet name and laid out as a bordered table.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Sharing a spreadsheet as a fixed, non-editable PDF.</li>
          <li>Printing multi-sheet workbooks in one combined document.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Are charts and formatting preserved?</strong> No — this converts cell values into a plain table; charts, colors, and cell formatting from Excel aren&apos;t carried over.</li>
          <li><strong>Are formulas preserved?</strong> Formula results (the displayed values) are converted, not the formulas themselves.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — conversion happens entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell
      url="/tools/excel-to-pdf"
      content={content}
    >
      <ExcelToPdfContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ExcelToPdf;
