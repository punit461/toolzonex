'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert, Chip } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface CsvIssue {
  row: number;
  message: string;
}

interface ValidationResult {
  issues: CsvIssue[];
  rowCount: number;
  expectedColumns: number | null;
}

function validateCsv(text: string): ValidationResult {
  const issues: CsvIssue[] = [];
  const columnCounts: number[] = [];

  let row = 1;
  let fieldHasChars = 0;
  let rowHasContent = false;
  let inQuotes = false;
  let fieldCount = 0;
  let quoteErrorFlaggedForRow = false;

  const endField = () => { fieldCount++; fieldHasChars = 0; };
  const endRow = () => {
    endField();
    columnCounts.push(fieldCount);
    fieldCount = 0;
    rowHasContent = false;
    quoteErrorFlaggedForRow = false;
    row++;
  };

  let i = 0;
  const n = text.length;
  while (i < n) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { fieldHasChars++; i += 2; continue; }
        inQuotes = false; i++; continue;
      }
      fieldHasChars++; rowHasContent = true; i++; continue;
    }
    if (c === '"') {
      if (fieldHasChars > 0 && !quoteErrorFlaggedForRow) {
        issues.push({ row, message: `Row ${row}: unescaped quote found inside a field — a quote inside a value must be doubled ("") or the entire field wrapped in quotes.` });
        quoteErrorFlaggedForRow = true;
      }
      inQuotes = true; rowHasContent = true; i++; continue;
    }
    if (c === ',') { endField(); i++; continue; }
    if (c === '\r') { i++; continue; }
    if (c === '\n') {
      if (rowHasContent || fieldCount > 0 || fieldHasChars > 0) endRow();
      i++; continue;
    }
    fieldHasChars++; rowHasContent = true; i++; continue;
  }

  if (inQuotes) {
    issues.push({ row, message: `Row ${row}: quoted field is never closed — missing a closing double-quote (").` });
  }
  if (rowHasContent || fieldHasChars > 0 || fieldCount > 0) endRow();

  const expectedColumns = columnCounts.length > 0 ? columnCounts[0] : null;
  columnCounts.forEach((count, idx) => {
    if (expectedColumns !== null && count !== expectedColumns) {
      issues.push({
        row: idx + 1,
        message: `Row ${idx + 1} has ${count} column${count === 1 ? '' : 's'}, but the header/first row has ${expectedColumns}.`,
      });
    }
  });

  issues.sort((a, b) => a.row - b.row);

  return { issues, rowCount: columnCounts.length, expectedColumns };
}

const SAMPLE = 'name,age,city\nAlice,30,Pune\nBob,25,Mumbai\nCharlie,28';

const CsvValidatorContent = () => {
  const [input, setInput] = useState('');

  const result = useMemo<ValidationResult | null>(() => {
    if (!input.trim()) return null;
    return validateCsv(input);
  }, [input]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setInput(String(reader.result || ''));
    reader.readAsText(file);
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" fontWeight="600">Paste or Upload CSV</Typography>
        <TextField
          multiline
          rows={16}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={SAMPLE}
          fullWidth
          variant="outlined"
          sx={{ fontFamily: 'monospace' }}
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" component="label" startIcon={<UploadFileIcon />}>
            Upload File
            <input type="file" hidden accept=".csv,text/csv,text/plain" onChange={handleUpload} />
          </Button>
          <Button variant="outlined" onClick={() => setInput(SAMPLE)}>Load Sample</Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" fontWeight="600">Validation Result</Typography>
        {!result ? (
          <Paper variant="outlined" sx={{ p: 3, bgcolor: 'grey.50' }}>
            <Typography color="text.secondary">Paste or upload a CSV file to check its structure.</Typography>
          </Paper>
        ) : result.issues.length === 0 ? (
          <>
            <Alert severity="success">
              Valid CSV structure — {result.rowCount} row{result.rowCount === 1 ? '' : 's'}, {result.expectedColumns} column{result.expectedColumns === 1 ? '' : 's'} each, no quote-escaping problems found.
            </Alert>
            <Chip label="Well-formed" color="success" sx={{ alignSelf: 'flex-start' }} />
          </>
        ) : (
          <>
            <Alert severity="error">
              Invalid CSV structure — {result.issues.length} issue{result.issues.length === 1 ? '' : 's'} found across {result.rowCount} row{result.rowCount === 1 ? '' : 's'}.
            </Alert>
            <Paper variant="outlined" sx={{ p: 2, maxHeight: 400, overflow: 'auto' }}>
              {result.issues.map((issue, idx) => (
                <Typography key={idx} variant="body2" sx={{ mb: 1, fontFamily: 'monospace' }}>
                  • {issue.message}
                </Typography>
              ))}
            </Paper>
          </>
        )}
      </Box>
    </Box>
  );
};

const CsvValidator = () => {
  const content = (
    <>
      <Typography variant="h2">Free CSV Validator — Structural Well-Formedness Checker</Typography>
      <Typography variant="body1">
        Paste or upload a CSV file and check whether it's structurally well-formed: consistent column counts
        across every row and properly escaped quotes per the RFC 4180 CSV convention. This tool checks
        structure only — it doesn't validate cell data types (like whether a column is really a number or
        date) or any business rules about what the data should contain.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste your CSV text into the box, or upload a <code>.csv</code> file directly. The tool scans every row
        and reports either a clean "valid" summary, or a specific list of issues with the row numbers where a
        column-count mismatch or a quote-escaping problem was found.
      </Typography>

      <Typography variant="h2">What It Checks</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Consistent column count</strong> — every row should have the same number of columns as the first (header) row; mismatched rows are flagged by row number.</li>
          <li><strong>Quote escaping</strong> — a quote character appearing inside an already-started field without being doubled (<code>""</code>) is flagged as malformed per RFC 4180.</li>
          <li><strong>Unterminated quoted fields</strong> — a quoted field that never finds its closing quote before the file ends is flagged.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A file where the header row has 3 columns but row 4 only has 2 (a missing value with no trailing comma)
        gets flagged as "Row 4 has 2 columns, but the header/first row has 3."
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking an exported CSV file for missing or extra columns before importing it elsewhere.</li>
          <li>Debugging a CSV parsing error by finding exactly which row broke the format.</li>
          <li>Verifying a hand-edited CSV file didn't introduce an unescaped quote or a dropped comma.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does this check that my data types are correct?</Typography>
      <Typography variant="body1">
        No — this tool only checks structural well-formedness (consistent columns and proper quote escaping).
        It does not verify that a column meant to hold numbers actually contains numbers, or enforce any
        business rules about the data's content.
      </Typography>
      <Typography variant="h3">What counts as a properly escaped quote in CSV?</Typography>
      <Typography variant="body1">
        Per RFC 4180, if a field's value needs to contain a double-quote character, the whole field must be
        wrapped in quotes and the internal quote doubled — for example, a value of <code>Say "Hi"</code> should
        be written as <code>{'"Say ""Hi"""'}</code> in the CSV file.
      </Typography>
      <Typography variant="h3">Is my CSV data uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — parsing and validation happen entirely client-side in your browser. Your file is never sent to a
        server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/csv-validator" content={content}>
      <CsvValidatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CsvValidator;
