'use client';

import { useMemo, useState } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const csvField = (value: string): string => {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
};

const tsvToCsv = (input: string): string => {
  if (!input.trim()) return '';
  return input
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => line.split('\t').map(csvField).join(','))
    .join('\n');
};

const TsvToCsvContent = () => {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => tsvToCsv(input), [input]);

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
        <Typography variant="subtitle1" fontWeight="600">TSV Input:</Typography>
        <TextField
          multiline
          rows={12}
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={'Name\tAge\tCity\nJane\t28\tBoston'}
          sx={{ '& .MuiInputBase-input': { fontFamily: 'monospace' } }}
        />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight="600">CSV Output:</Typography>
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
          placeholder="CSV output will appear here automatically..."
          sx={{ '& .MuiInputBase-input': { fontFamily: 'monospace' } }}
        />
      </Box>
    </Box>
  );
};

const TsvToCsvConverter = () => {
  const content = (
    <>
      <Typography variant="h2">How to Convert TSV to CSV Online</Typography>
      <Typography variant="body1">
        Paste tab-separated values (TSV) — for example, data copied from a spreadsheet — into the box above and
        it converts to comma-separated values (CSV) instantly. Any field that itself contains a comma,
        double quote, or line break is automatically wrapped in quotes (with internal quotes doubled) so the
        output stays valid CSV.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        The TSV row <code>Jane{'\t'}28{'\t'}Boston, MA</code> converts to{' '}
        <code>Jane,28,&quot;Boston, MA&quot;</code> — the comma inside &quot;Boston, MA&quot; is preserved
        correctly because the field is quoted.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Converting data copied from Excel or Google Sheets (which pastes as TSV) into CSV format.</li>
          <li>Preparing TSV exports for tools or scripts that only accept CSV input.</li>
          <li>Reformatting tab-delimited log or export files for spreadsheet or database import.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What happens if a cell already contains a comma?</Typography>
      <Typography variant="body1">
        The tool wraps that field in double quotes automatically, so the comma is treated as part of the value
        rather than a new column separator in the resulting CSV.
      </Typography>
      <Typography variant="h3">Does this handle quotes inside a cell?</Typography>
      <Typography variant="body1">
        Yes — any double quote character inside a field is escaped by doubling it (per the CSV standard), and
        the field is wrapped in quotes.
      </Typography>
      <Typography variant="h3">Can I paste data copied directly from a spreadsheet?</Typography>
      <Typography variant="body1">
        Yes — Excel and Google Sheets both copy selected cells as tab-separated values by default, so you can
        paste directly into the input box above without reformatting anything first.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/converters/tsv-to-csv-converter" content={content}>
      <TsvToCsvContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TsvToCsvConverter;
