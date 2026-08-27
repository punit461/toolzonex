'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { loadPdfJsDocument } from './pdfThumbnails';

interface PositionedCell {
  text: string;
  x: number;
  y: number;
}

interface CsvRow {
  cells: string[];
}

const PdfToCsvContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [tableData, setTableData] = useState<CsvRow[]>([]);
  const [noDataFound, setNoDataFound] = useState(false);

  const extractTables = async () => {
    setError('');
    setTableData([]);
    setNoDataFound(false);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const pdfDoc = await loadPdfJsDocument(bytes);
      const allRows: CsvRow[] = [];
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
          const prev = sortedByY[j - 1];
          const curr = sortedByY[j];
          if (Math.abs(curr.y - prev.y) <= Y_TOLERANCE) {
            currentRow.push(curr);
          } else {
            rowGroups.push(currentRow);
            currentRow = [curr];
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
            allRows.push({ cells });
          }
        }
      }

      if (allRows.length === 0) {
        setNoDataFound(true);
      } else {
        setTableData(allRows);
      }
    } catch {
      setError('Could not process this file. Make sure it is a valid PDF.');
    } finally {
      setBusy(false);
    }
  };

  const escapeCsv = (value: string) => {
    if (value.includes(',') || value.includes('"') || value.includes('\n')) {
      return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
  };

  const handleDownload = () => {
    if (!tableData.length || !file) return;
    const csv = tableData.map((row) => row.cells.map((c) => escapeCsv(c)).join(',')).join('\n');
    const bytes = new TextEncoder().encode(csv);
    downloadBytes(bytes, file.name.replace(/\.pdf$/i, '') + '.csv', 'text/csv');
  };

  const columnCount = tableData[0]?.cells.length ?? 0;

  return (
    <Box>
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setTableData([]); setNoDataFound(false); }} label="PDF file" selectedNames={file ? [file.name] : []} />

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={extractTables} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />Extracting Tables...</> : 'Extract to CSV'}
      </Button>

      {noDataFound && (
        <Alert severity="warning" sx={{ mt: 3 }}>
          No tabular data could be detected in this PDF. The file may contain only plain text, images, or a layout that does not resemble a table.
        </Alert>
      )}

      {tableData.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" gutterBottom>Extracted table ({tableData.length} rows)</Typography>
          <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  {Array.from({ length: columnCount }, (_, idx) => (
                    <TableCell key={idx} sx={{ fontWeight: 700 }}>Col {idx + 1}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((row, rIdx) => (
                  <TableRow key={rIdx}>
                    {row.cells.map((cellText, cIdx) => (
                      <TableCell key={cIdx}>{cellText}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button variant="outlined" sx={{ mt: 2 }} onClick={handleDownload}>Download as .csv</Button>
        </Box>
      )}
    </Box>
  );
};

const PdfToCsv = () => {
  const content = (
    <>
      <Typography variant="h2">How to Convert a PDF to CSV</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF that contains the table you want to extract.</li>
          <li>Click <strong>Extract to CSV</strong> — the tool analyses text positions to detect rows and columns.</li>
          <li>Preview the extracted table on screen and click <strong>Download as .csv</strong> to save the file.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A one-page PDF invoice with a product table (columns for Item, Quantity, and Price) will produce a CSV
        with three header columns and one row per line item — ready to import into Excel or Google Sheets.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Pulling financial or sales tables out of PDF reports into spreadsheets for analysis.</li>
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
    <CalculatorShell url="/tools/pdf-to-csv" content={content}>
      <PdfToCsvContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfToCsv;
