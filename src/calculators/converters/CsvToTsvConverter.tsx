'use client';

import { useMemo, useState } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const parseCsvRows = (input: string): string[][] => {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;
  let i = 0;

  while (i < input.length) {
    const char = input[i];

    if (inQuotes) {
      if (char === '"') {
        if (input[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i += 1;
        continue;
      }
      field += char;
      i += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = true;
      i += 1;
      continue;
    }
    if (char === ',') {
      row.push(field);
      field = '';
      i += 1;
      continue;
    }
    if (char === '\r') {
      i += 1;
      continue;
    }
    if (char === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
      i += 1;
      continue;
    }
    field += char;
    i += 1;
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows;
};

const tsvField = (value: string): string => value.replace(/\t/g, ' ').replace(/\r?\n/g, ' ');

const csvToTsv = (input: string): string => {
  if (!input.trim()) return '';
  const rows = parseCsvRows(input);
  return rows.map((row) => row.map(tsvField).join('\t')).join('\n');
};

const CsvToTsvContent = () => {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => csvToTsv(input), [input]);

  const copyToClipboard = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" fontWeight="600">CSV Input:</Typography>
        <TextField
          multiline
          rows={12}
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={'Name,Age,City\nJane,28,"Boston, MA"'}
          sx={{ '& .MuiInputBase-input': { fontFamily: 'monospace' } }}
        />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight="600">TSV Output:</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output}>
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </Box>
        <TextField
          multiline
          rows={12}
          fullWidth
          value={output}
          InputProps={{ readOnly: true }}
          placeholder="TSV output will appear here automatically..."
          sx={{ '& .MuiInputBase-input': { fontFamily: 'monospace' } }}
        />
      </Box>
    </Box>
  );
};

const CsvToTsvConverter = () => {
  const content = (
    <>
      <Typography variant="h2">How to Convert CSV to TSV Online</Typography>
      <Typography variant="body1">
        Paste comma-separated values (CSV) into the box above and it converts to tab-separated values (TSV)
        instantly. Quoted fields — including ones containing commas, escaped double quotes, or embedded line
        breaks — are parsed correctly first, then re-joined with tab characters. Since TSV has no quoting
        convention of its own, any tab or newline that was inside a field is replaced with a single space so
        it can&apos;t be mistaken for a new column or row.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        The CSV row <code>Jane,28,&quot;Boston, MA&quot;</code> converts to{' '}
        <code>Jane{'\t'}28{'\t'}Boston, MA</code> — the comma that was protected by quotes in the CSV becomes a
        plain character in the TSV output, since tabs (not commas) are now the column separator.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Preparing CSV data for pasting into spreadsheet apps that expect tab-separated clipboard data.</li>
          <li>Converting CSV exports for tools or scripts that only accept tab-delimited input.</li>
          <li>Reformatting comma-delimited log or export files for tab-delimited database import.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What happens to a comma that was inside a quoted CSV field?</Typography>
      <Typography variant="body1">
        It's preserved as a literal comma in the output — TSV uses tabs as the column separator, so a comma
        inside a field is no longer special once the field is correctly identified during CSV parsing.
      </Typography>
      <Typography variant="h3">What if a field contains a tab character or a line break?</Typography>
      <Typography variant="body1">
        Since TSV has no standard way to escape or quote a tab or newline inside a field, any tab or line break
        found inside a CSV field is replaced with a single space so it doesn't get misread as a column or row
        break in the TSV output.
      </Typography>
      <Typography variant="h3">Does this handle escaped double quotes inside a field?</Typography>
      <Typography variant="body1">
        Yes — a doubled double-quote (<code>&quot;&quot;</code>) inside a quoted CSV field is correctly parsed
        as a single literal quote character before conversion.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/converters/csv-to-tsv-converter" content={content}>
      <CsvToTsvContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CsvToTsvConverter;
