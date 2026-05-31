'use client';

import { useState } from 'react';
import { Box, Button, Typography, TextField, Paper } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const JsonToCsvContent = () => {
  const [input, setInput] = useState('[\n  {\n    "id": 1,\n    "name": "John Doe",\n    "email": "john@example.com"\n  },\n  {\n    "id": 2,\n    "name": "Jane Smith",\n    "email": "jane@example.com"\n  }\n]');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const convertToCsv = () => {
    setError('');
    setOutput('');
    
    try {
      if (!input.trim()) return;
      
      const parsed = JSON.parse(input);
      const arr = Array.isArray(parsed) ? parsed : [parsed];
      
      if (arr.length === 0) {
        setOutput('');
        return;
      }

      // Get all unique keys across all objects
      const headerSet = new Set<string>();
      arr.forEach(obj => {
        if (typeof obj === 'object' && obj !== null) {
          Object.keys(obj).forEach(key => headerSet.add(key));
        }
      });
      
      const headers = Array.from(headerSet);
      
      // Escape CSV values
      const escapeCsv = (val: any) => {
        if (val === null || val === undefined) return '';
        const str = String(val);
        if (str.includes(',') || str.includes('"') || str.includes('\n')) {
          return `"${str.replace(/"/g, '""')}"`;
        }
        return str;
      };

      const rows = arr.map(obj => {
        return headers.map(header => escapeCsv(obj[header])).join(',');
      });

      const csvContent = [headers.join(','), ...rows].join('\n');
      setOutput(csvContent);

    } catch (err: any) {
      setError(`Invalid JSON: ${err.message}`);
    }
  };

  const copyToClipboard = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
    } catch (err) {}
  };

  const downloadCsv = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'converted.csv';
    link.click();
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      
      {/* Input Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" fontWeight="600">Input JSON Array:</Typography>
        <TextField
          multiline
          rows={16}
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your JSON here..."
          error={!!error}
          helperText={error}
          sx={{ '& .MuiInputBase-input': { fontFamily: 'monospace', fontSize: '0.9rem' } }}
        />
        <Button variant="contained" size="large" onClick={convertToCsv} fullWidth>
          Convert to CSV
        </Button>
      </Box>

      {/* Output Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight="600">Output CSV:</Typography>
          <Box>
            <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output}>
              Copy
            </Button>
            <Button size="small" startIcon={<FileDownloadIcon />} onClick={downloadCsv} disabled={!output}>
              Download
            </Button>
          </Box>
        </Box>
        <TextField
          multiline
          rows={16}
          fullWidth
          value={output}
          InputProps={{ readOnly: true }}
          placeholder="CSV output will appear here..."
          sx={{ '& .MuiInputBase-input': { fontFamily: 'monospace', fontSize: '0.9rem' } }}
        />
      </Box>

    </Box>
  );
};

const JsonToCsvConverter = () => {
  const content = (
    <>
      <Typography variant="h2">How to use the JSON to CSV Converter?</Typography>
      <Typography variant="body1">
        Simply paste your JSON array into the left input box. The tool automatically detects all unique keys across the objects and sets them as the CSV header row. Click "Convert to CSV", and your formatted comma-separated values will appear on the right, ready to be copied or downloaded as a `.csv` file.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="JSON to CSV Converter"
      description="Convert JSON arrays into CSV format instantly. Free online data conversion tool for developers."
      url="/tools/json-to-csv"
      content={content}
      category="Tools"
    >
      <JsonToCsvContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default JsonToCsvConverter;
