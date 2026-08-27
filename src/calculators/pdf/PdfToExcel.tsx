'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, CircularProgress } from '@mui/material';
import * as XLSX from 'xlsx';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { readFileAsArrayBuffer } from './pdfUtils';
import { loadPdfJsDocument } from './pdfThumbnails';

interface PositionedCell {
  text: string;
  x: number;
  y: number;
}

const PdfToExcelContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [rowCount, setRowCount] = useState<number | null>(null);
  const [noDataFound, setNoDataFound] = useState(false);

  const handleConvert = async () => {
    setError('');
    setRowCount(null);
    setNoDataFound(false);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const pdfDoc = await loadPdfJsDocument(bytes);
      const allRows: string[][] = [];
      const Y_TOLERANCE = 5;
      const X_TOLERANCE = 5;

      for (let i = 1; i <= pdfDoc.numPages; i++) {
        const page = await pdfDoc.getPage(i);
        const viewport = page.getViewport({ scale: 1 });
        const content = await page.getTextContent();

        const positioned: PositionedCell[] = content.items
          .filter((item) => 'str' in item && 'transform' in item)
          .map((item) => {
            const t = (item as { transform: number[] }).transform;
            return {
              text: ((item as { str: string }).str || '').trim(),
              x: Math.round(t[4] * 10) / 10,
              y: Math.round((viewport.height - t[5]) * 10) / 10,
            };
          })
          .filter((it) => it.text);

        if (positioned.length === 0) continue;

        const sortedByY = [...positioned].sort((a, b) => a.y - b.y);
        const rowGroups: PositionedCell[][] = [];
        let currentRow: PositionedCell[] = [sortedByY[0]];
        for (let j = 1; j < sortedByY.length; j++) {
          if (Math.abs(sortedByY[j].y - sortedByY[j - 1].y) <= Y_TOLERANCE) {
            currentRow.push(sortedByY[j]);
          } else {
            rowGroups.push(currentRow);
            currentRow = [sortedByY[j]];
          }
        }
        rowGroups.push(currentRow);

        const allXPositions = rowGroups.flatMap((r) => r.map((c) => c.x)).sort((a, b) => a - b);
        const columnPositions: number[] = [];
        for (const x of allXPositions) {
          if (columnPositions.length === 0 || Math.abs(x - columnPositions[columnPositions.length - 1]) > X_TOLERANCE) {
            columnPositions.push(x);
          }
        }

        for (const row of rowGroups) {
          const cells: string[] = columnPositions.map((colX) => {
            const match = row.find((c) => Math.abs(c.x - colX) <= X_TOLERANCE);
            return match ? match.text : '';
          });
          if (cells.some((c) => c)) {
            allRows.push(cells);
          }
        }
      }

      if (allRows.length === 0) {
        setNoDataFound(true);
        setBusy(false);
        return;
      }

      const ws = XLSX.utils.aoa_to_sheet(allRows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Extracted Data');
      const xlsxBytes = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

      const { downloadBytes } = await import('./pdfUtils');
      downloadBytes(new Uint8Array(xlsxBytes), file.name.replace(/\.pdf$/i, '') + '.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      setRowCount(allRows.length);
    } catch {
      setError('Could not process this file. Make sure it is a valid PDF.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box>
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setRowCount(null); setNoDataFound(false); }} label="PDF file" selectedNames={file ? [file.name] : []} />

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleConvert} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />Extracting Tables...</> : 'Extract to Excel'}
      </Button>

      {noDataFound && (
        <Alert severity="warning" sx={{ mt: 3 }}>
          No tabular data could be detected in this PDF. The file may contain only plain text, images, or a layout that does not resemble a table.
        </Alert>
      )}

      {rowCount !== null && (
        <Alert severity="success" sx={{ mt: 3 }}>
          Extracted {rowCount} row{rowCount !== 1 ? 's' : ''} into an Excel file. The download should start automatically.
        </Alert>
      )}
    </Box>
  );
};

const PdfToExcel = () => {
  const content = (
    <>
      <Typography variant="h2">How to Convert a PDF to Excel</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF that contains the table you want to extract.</li>
          <li>Click <strong>Extract to Excel</strong> — the tool analyses text positions to detect rows and columns.</li>
          <li>An <code>.xlsx</code> file is generated and downloaded automatically.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A one-page PDF invoice with a product table (columns for Item, Quantity, and Price) will produce an Excel
        file with three columns and one row per line item — ready to open in Microsoft Excel or Google Sheets.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Pulling financial or sales tables out of PDF reports for analysis in a spreadsheet.</li>
          <li>Importing tabular data from scanned invoices or statements into accounting software.</li>
          <li>Extracting data from research papers or government publications that publish tables as PDFs.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why are some columns missing or merged?</strong> PDF tables without clear cell boundaries or with merged cells are hard to detect automatically. The tool uses text-position heuristics, so heavily formatted or multi-line cells may not split perfectly.</li>
          <li><strong>Does this work with scanned PDFs?</strong> No — scanned PDFs contain images, not a text layer. You need OCR software first to make the text selectable.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — extraction runs entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-to-excel" content={content}>
      <PdfToExcelContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfToExcel;
