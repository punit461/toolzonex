'use client';

import { useState, useRef } from 'react';
import { Box, TextField, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Chip } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type SortDirection = 'asc' | 'desc';

const CsvViewerContent = () => {
  const [csvText, setCsvText] = useState('');
  const [headers, setHeaders] = useState<string[]>([]);
  const [rows, setRows] = useState<string[][]>([]);
  const [sortCol, setSortCol] = useState<number | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>('asc');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const parseCsv = (text: string) => {
    const lines = text.trim().split('\n').filter((l) => l.trim());
    if (lines.length === 0) {
      setHeaders([]);
      setRows([]);
      return;
    }

    const parseRow = (line: string): string[] => {
      const result: string[] = [];
      let current = '';
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (inQuotes) {
          if (ch === '"') {
            if (i + 1 < line.length && line[i + 1] === '"') {
              current += '"';
              i++;
            } else {
              inQuotes = false;
            }
          } else {
            current += ch;
          }
        } else {
          if (ch === '"') {
            inQuotes = true;
          } else if (ch === ',') {
            result.push(current.trim());
            current = '';
          } else {
            current += ch;
          }
        }
      }
      result.push(current.trim());
      return result;
    };

    const parsedRows = lines.map(parseRow);
    setHeaders(parsedRows[0]);
    setRows(parsedRows.slice(1));
    setSortCol(null);
  };

  const handleTextChange = (value: string) => {
    setCsvText(value);
    parseCsv(value);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      setCsvText(text);
      parseCsv(text);
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleSort = (colIdx: number) => {
    const isAsc = sortCol === colIdx && sortDir === 'asc';
    setSortDir(isAsc ? 'desc' : 'asc');
    setSortCol(colIdx);
    const sorted = [...rows].sort((a, b) => {
      const aVal = a[colIdx] || '';
      const bVal = b[colIdx] || '';
      const numA = parseFloat(aVal);
      const numB = parseFloat(bVal);
      if (!isNaN(numA) && !isNaN(numB)) {
        return isAsc ? numB - numA : numA - numB;
      }
      return isAsc ? bVal.localeCompare(aVal) : aVal.localeCompare(bVal);
    });
    setRows(sorted);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
        <TextField
          label="Paste CSV Data"
          value={csvText}
          onChange={(e) => handleTextChange(e.target.value)}
          multiline
          rows={5}
          fullWidth
          placeholder={`name,age,city\nAlice,30,NYC\nBob,25,LA`}
          sx={{ fontFamily: 'monospace' }}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <input
            type="file"
            accept=".csv,.tsv,.txt"
            ref={fileInputRef}
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
          <Button
            variant="outlined"
            startIcon={<CloudUploadIcon />}
            onClick={() => fileInputRef.current?.click()}
            sx={{ whiteSpace: 'nowrap' }}
          >
            Upload CSV
          </Button>
        </Box>
      </Box>

      {rows.length > 0 && (
        <Paper variant="outlined">
          <Box sx={{ p: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              {rows.length} row{rows.length !== 1 ? 's' : ''}, {headers.length} column{headers.length !== 1 ? 's' : ''}
            </Typography>
          </Box>
          <TableContainer sx={{ maxHeight: 500 }}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  {headers.map((h, i) => (
                    <TableCell key={i} sx={{ fontWeight: 700 }}>
                      <TableSortLabel
                        active={sortCol === i}
                        direction={sortCol === i ? sortDir : 'asc'}
                        onClick={() => handleSort(i)}
                      >
                        {h}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, ri) => (
                  <TableRow key={ri} hover>
                    {row.map((cell, ci) => (
                      <TableCell key={ci}>{cell}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {csvText && rows.length === 0 && (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography color="text.secondary">No data found. Make sure your CSV uses commas as delimiters.</Typography>
        </Paper>
      )}
    </Box>
  );
};

const CsvViewer = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the CSV Viewer</Typography>
      <Typography variant="body1">
        Paste your CSV data into the text box or upload a CSV file. The tool parses the data and displays it as a formatted, sortable HTML table. Click any column header to sort by that column.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Pasting <code>name,age,city{'\n'}Alice,30,NYC{'\n'}Bob,25,LA</code> produces a table with 2 data rows and 3 columns that can be sorted by any column.
      </Typography>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does this upload my data?</strong> No — everything is processed entirely in your browser. Your CSV data never leaves your device.</li>
          <li><strong>What CSV formats are supported?</strong> Standard comma-delimited CSV with optional quoted fields. Tab-separated and other delimiter formats may not parse correctly.</li>
          <li><strong>Can I sort the data?</strong> Yes — click any column header to sort ascending or descending. Numeric columns sort numerically.</li>
          <li><strong>Is there a row limit?</strong> The viewer handles thousands of rows, but very large files may slow down the browser. For best performance, keep files under 10,000 rows.</li>
        </ul>
      </Box>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Quickly viewing CSV exports from spreadsheets or databases.</li>
          <li>Inspecting data files before importing into another tool.</li>
          <li>Sharing a quick data view without needing a spreadsheet application.</li>
          <li>Sorting and filtering CSV data on the go.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/csv-viewer" content={content}>
      <CsvViewerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CsvViewer;
