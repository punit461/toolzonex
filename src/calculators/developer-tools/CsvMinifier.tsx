'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Chip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface Cell {
  value: string;
  quoted: boolean;
}

function parseCsvCells(input: string): Cell[][] {
  const rows: Cell[][] = [];
  let cells: Cell[] = [];
  let current = '';
  let quoted = false;
  let inQuotes = false;
  let i = 0;
  const n = input.length;

  const flushCell = () => {
    cells.push({ value: current, quoted });
    current = '';
    quoted = false;
  };
  const flushRow = () => {
    flushCell();
    rows.push(cells);
    cells = [];
  };

  while (i < n) {
    const ch = input[i];
    if (ch === '"') {
      if (inQuotes && input[i + 1] === '"') {
        current += '"';
        i += 2;
        continue;
      }
      inQuotes = !inQuotes;
      if (inQuotes) quoted = true;
      i++;
      continue;
    }
    if (ch === ',' && !inQuotes) {
      flushCell();
      i++;
      continue;
    }
    if ((ch === '\n' || ch === '\r') && !inQuotes) {
      if (ch === '\r' && input[i + 1] === '\n') i++;
      flushRow();
      i++;
      continue;
    }
    current += ch;
    i++;
  }
  if (current !== '' || cells.length > 0) flushRow();

  return rows;
}

function minifyCsv(input: string): { output: string; savedBytes: number } {
  const rows = parseCsvCells(input);
  const output = rows
    .map((row) =>
      row
        .map((cell) => {
          const val = cell.quoted ? cell.value : cell.value.trim();
          const needsQuoting = /[",\n\r]/.test(val);
          return needsQuoting ? `"${val.replace(/"/g, '""')}"` : val;
        })
        .join(',')
    )
    .join('\n');
  return { output, savedBytes: input.length - output.length };
}

const SAMPLE = 'Name , Age , City\n"Alice" , 30 , "New York"\nBob,  25 ,  "Los  Angeles"\n';

const CsvMinifierContent = () => {
  const [input, setInput] = useState('');

  const { output, savedBytes } = useMemo(() => {
    if (!input.trim()) return { output: '', savedBytes: 0 };
    return minifyCsv(input);
  }, [input]);

  const copy = () => output && navigator.clipboard.writeText(output);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {input.trim() && (
        <Box>
          <Chip
            label={savedBytes >= 0 ? `${savedBytes} bytes smaller` : `${Math.abs(savedBytes)} bytes larger (already minimal)`}
            color={savedBytes > 0 ? 'success' : 'default'}
            size="small"
          />
        </Box>
      )}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="subtitle1" fontWeight="600">Raw CSV Input</Typography>
          <TextField
            multiline
            rows={14}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={SAMPLE}
            fullWidth
            variant="outlined"
            inputProps={{ style: { fontFamily: 'monospace' } }}
          />
          <Button variant="outlined" onClick={() => setInput(SAMPLE)}>Load Sample</Button>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle1" fontWeight="600">Minified Output</Typography>
            <Button startIcon={<ContentCopyIcon />} onClick={copy} disabled={!output} size="small">Copy</Button>
          </Box>
          <Paper
            variant="outlined"
            sx={{ p: 2, minHeight: 380, maxHeight: 460, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', whiteSpace: 'pre' }}
          >
            {output || <Typography color="text.secondary">Minified CSV will appear here...</Typography>}
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

const CsvMinifier = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the CSV Minifier</Typography>
      <Typography variant="body1">
        Paste your CSV into the input box. The minifier parses it with full quote-awareness, then strips
        every bit of unnecessary whitespace around delimiters and unquoted field values — while leaving
        whitespace that sits meaningfully INSIDE a quoted field completely untouched. It also drops quote
        marks that aren't actually required (a field only needs quoting if it contains a comma, a quote
        character, or a newline), producing the smallest valid CSV that still parses identically.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Input like <code>{'Name , Age\n"Alice" , 30'}</code> minifies down to{' '}
        <code>{'Name,Age\nAlice,30'}</code> — the padding around commas is removed and the unnecessary quotes
        around <code>Alice</code> are dropped, since that field doesn't contain a comma, quote, or newline.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Shrinking CSV file size before uploading it to a system with strict size limits.</li>
          <li>Cleaning up CSV exported from a spreadsheet tool that adds inconsistent padding.</li>
          <li>Producing compact CSV output for a data pipeline where every byte counts.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the CSV Formatter?</strong> The <a href="/developer-tools/csv-formatter">CSV Formatter</a> does the opposite job — it ALIGNS CSV into readable, padded columns for easier reading by a human. This CSV Minifier strips all non-essential whitespace instead, aiming for the smallest possible file size rather than readability.</li>
          <li><strong>Will this change what my CSV actually contains?</strong> No — the output parses to exactly the same rows and values as the input. Only insignificant whitespace (padding around delimiters and outside quoted fields) and unnecessary quote marks are removed; any whitespace that was genuinely inside a quoted field is preserved exactly.</li>
          <li><strong>Does it handle fields containing commas or quotes correctly?</strong> Yes — fields that contain a comma, a quote character, or a newline are automatically kept quoted (with embedded quotes doubled per the CSV standard) so the minified output still parses correctly.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/csv-minifier" content={content}>
      <CsvMinifierContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CsvMinifier;
