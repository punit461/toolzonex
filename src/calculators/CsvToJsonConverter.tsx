'use client';

import { useState } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const CsvToJsonContent = () => {
  const [input, setInput] = useState('id,name,email\n1,John Doe,john@example.com\n2,Jane Smith,jane@example.com');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const convertToJson = () => {
    setError('');
    setOutput('');
    
    if (!input.trim()) return;

    try {
      const lines = input.split('\n').filter(line => line.trim());
      if (lines.length < 2) {
        throw new Error("CSV must contain at least a header row and one data row.");
      }

      // A simple CSV parser that handles quotes
      const parseLine = (text: string) => {
        const result = [];
        let cur = '';
        let inQuotes = false;
        
        for (let i = 0; i < text.length; i++) {
          const char = text[i];
          if (char === '"') {
            if (inQuotes && text[i + 1] === '"') {
              cur += '"'; // escaped quote
              i++;
            } else {
              inQuotes = !inQuotes;
            }
          } else if (char === ',' && !inQuotes) {
            result.push(cur);
            cur = '';
          } else {
            cur += char;
          }
        }
        result.push(cur);
        return result;
      };

      const headers = parseLine(lines[0]).map(h => h.trim());
      const jsonArr = [];

      for (let i = 1; i < lines.length; i++) {
        const row = parseLine(lines[i]);
        const obj: Record<string, string | number> = {};
        
        headers.forEach((header, index) => {
          let val = row[index] || '';
          
          // Basic type inference: if it looks like a number, parse it
          if (!isNaN(Number(val)) && val.trim() !== '') {
             obj[header] = Number(val);
          } else {
             obj[header] = val;
          }
        });
        
        jsonArr.push(obj);
      }

      setOutput(JSON.stringify(jsonArr, null, 2));

    } catch (err: any) {
      setError(err.message || "Failed to parse CSV.");
    }
  };

  const copyToClipboard = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
    } catch (err) {}
  };

  const downloadJson = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'converted.json';
    link.click();
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      
      {/* Input Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" fontWeight="600">Input CSV:</Typography>
        <TextField
          multiline
          rows={16}
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your CSV here (first row must be headers)..."
          error={!!error}
          helperText={error}
          sx={{ '& .MuiInputBase-input': { fontFamily: 'monospace', fontSize: '0.9rem' } }}
        />
        <Button variant="contained" size="large" onClick={convertToJson} fullWidth>
          Convert to JSON
        </Button>
      </Box>

      {/* Output Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight="600">Output JSON Array:</Typography>
          <Box>
            <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output}>
              Copy
            </Button>
            <Button size="small" startIcon={<FileDownloadIcon />} onClick={downloadJson} disabled={!output}>
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
          placeholder="JSON output will appear here..."
          sx={{ '& .MuiInputBase-input': { fontFamily: 'monospace', fontSize: '0.9rem' } }}
        />
      </Box>

    </Box>
  );
};

const CsvToJsonConverter = () => {
  const content = (
    <>
      <Typography variant="h2">How to use the CSV to JSON Converter?</Typography>
      <Typography variant="body1">
        Paste your CSV data into the input box. Ensure the very first row contains your column headers, as these will become the JSON keys. Click "Convert to JSON", and the tool will automatically parse the data, infer numeric types where applicable, and output a clean, formatted JSON array.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="CSV to JSON Converter"
      description="Convert CSV data into a JSON array instantly. Free online data conversion tool with type inference."
      url="/tools/csv-to-json"
      content={content}
      category="Tools"
    >
      <CsvToJsonContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CsvToJsonConverter;
