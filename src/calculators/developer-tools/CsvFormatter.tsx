'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Select, MenuItem, Chip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Delimiter = ',' | '\t' | ';';

const DELIMITER_LABELS: Record<string, string> = {
  ',': 'Comma (,)',
  '\t': 'Tab',
  ';': 'Semicolon (;)',
};

function parseCsv(input: string, delimiter: Delimiter): string[][] {
  const rows: string[][] = [];
  let current = '';
  const cells: string[] = [];
  let inQuotes = false;

  const flushCell = () => {
    cells.push(current);
    current = '';
  };
  const flushRow = () => {
    flushCell();
    rows.push(cells.slice());
    cells.length = 0;
  };

  for (let i = 0; i < input.length; i++) {
    const ch = input[i];
    if (ch === '"') {
      if (inQuotes && input[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === delimiter && !inQuotes) {
      flushCell();
    } else if ((ch === '\n' || ch === '\r') && !inQuotes) {
      if (ch === '\r' && input[i + 1] === '\n') i++;
      flushRow();
    } else {
      current += ch;
    }
  }
  if (current !== '' || cells.length > 0) flushRow();

  return rows;
}

function formatCsv(rows: string[][], delimiter: Delimiter): string {
  if (rows.length === 0) return '';
  const cols = Math.max(...rows.map((r) => r.length));
  const widths: number[] = [];
  for (let c = 0; c < cols; c++) {
    let max = 0;
    for (const row of rows) {
      const cell = row[c] ?? '';
      max = Math.max(max, cell.length);
    }
    widths.push(max);
  }
  const escape = (cell: string) => {
    if (/[",\n\r]/.test(cell)) return `"${cell.replace(/"/g, '""')}"`;
    return cell;
  };
  return rows
    .map((row) =>
      widths.map((w, c) => escape(row[c] ?? '').padEnd(w)).join(delimiter === '\t' ? '\t' : delimiter)
    )
    .join('\n');
}

const SAMPLE = 'Name,Age,City\nAlice,30,New York\nBob,25,Los Angeles\nCarol,28,Chicago';

const CsvFormatterContent = () => {
  const [input, setInput] = useState('');
  const [delimiter, setDelimiter] = useState<Delimiter>(',');
  const [output, setOutput] = useState('');

  const parseAndFormat = (val: string, delim: Delimiter) => {
    if (!val.trim()) {
      setOutput('');
      return;
    }
    setOutput(formatCsv(parseCsv(val, delim), delim));
  };

  const handleInput = (val: string) => {
    setInput(val);
    parseAndFormat(val, delimiter);
  };

  const handleDelimiter = (d: Delimiter) => {
    setDelimiter(d);
    parseAndFormat(input, d);
  };

  const rows = input.trim() ? parseCsv(input, delimiter) : [];
  const colCount = rows.length > 0 ? Math.max(...rows.map((r) => r.length)) : 0;

  const copyOutput = () => {
    if (output) navigator.clipboard.writeText(output);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Typography variant="subtitle1">Delimiter:</Typography>
        <Select
          value={delimiter}
          onChange={(e) => handleDelimiter(e.target.value as Delimiter)}
          size="small"
          sx={{ minWidth: 180 }}
        >
          {Object.entries(DELIMITER_LABELS).map(([v, label]) => (
            <MenuItem key={v} value={v}>{label}</MenuItem>
          ))}
        </Select>
        <Chip label={`${rows.length} rows`} size="small" variant="outlined" />
        <Chip label={`${colCount} columns`} size="small" variant="outlined" />
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="subtitle1" fontWeight="600">Raw CSV Input</Typography>
          <TextField
            multiline
            rows={14}
            value={input}
            onChange={(e) => handleInput(e.target.value)}
            placeholder={SAMPLE}
            fullWidth
            variant="outlined"
            inputProps={{ style: { fontFamily: 'monospace' } }}
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="outlined" onClick={() => handleInput(SAMPLE)} fullWidth>Load Sample</Button>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle1" fontWeight="600">Formatted Output</Typography>
            <Button startIcon={<ContentCopyIcon />} onClick={copyOutput} disabled={!output} size="small">Copy</Button>
          </Box>
          <Paper
            variant="outlined"
            sx={{ p: 2, minHeight: 380, maxHeight: 460, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', whiteSpace: 'pre' }}
          >
            {output || <Typography color="text.secondary">Formatted CSV will appear here...</Typography>}
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

const CsvFormatter = () => {
  const content = (
    <>
      <Typography variant="h2">How does it work?</Typography>
      <Typography variant="body1">
        Paste raw CSV (or tab/semicolon separated data) into the input box and pick the matching delimiter. The
        tool parses the rows, detects the column structure, and re-emits the data with every column padded to a
        consistent width for clean, aligned output.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Pasting <code>{'Name,Age,City\nAlice,30,New York'}</code> aligns the columns so every field lines up
        vertically, making the table much easier to scan.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Cleaning up CSV exported from spreadsheets or databases.</li>
          <li>Aligning ragged data columns for easier reading in code or docs.</li>
          <li>Quickly verifying row/column counts before processing a file.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does it handle quoted fields with commas?</Typography>
      <Typography variant="body1">
        Yes. Fields wrapped in double quotes are treated as a single cell even if they contain the delimiter, and
        escaped quotes (<code>{'""'}</code>) are handled correctly.
      </Typography>
      <Typography variant="h3">What delimiters are supported?</Typography>
      <Typography variant="body1">
        Comma, tab, and semicolon. Pick the matching option from the selector above the input.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/csv-formatter" content={content}>
      <CsvFormatterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CsvFormatter;
