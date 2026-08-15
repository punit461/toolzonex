'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const JsonFormatterContent = () => {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const formatJson = () => {
    try {
      if (!input.trim()) {
        setOutput('');
        setError(null);
        return;
      }
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError(null);
    } catch (e: any) {
      setError(e.message || 'Invalid JSON');
    }
  };

  const minifyJson = () => {
    try {
      if (!input.trim()) {
        setOutput('');
        setError(null);
        return;
      }
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError(null);
    } catch (e: any) {
      setError(e.message || 'Invalid JSON');
    }
  };

  const copyToClipboard = () => {
    if (output) {
      navigator.clipboard.writeText(output);
    }
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      
      {/* Input Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" fontWeight="600">Input JSON</Typography>
        <TextField
          multiline
          rows={15}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"example": "data"}'
          fullWidth
          variant="outlined"
          sx={{ fontFamily: 'monospace' }}
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" onClick={formatJson} fullWidth>Format / Validate</Button>
          <Button variant="outlined" onClick={minifyJson} fullWidth>Minify</Button>
        </Box>
        {error && (
          <Alert severity="error" sx={{ mt: 1 }}>{error}</Alert>
        )}
      </Box>

      {/* Output Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight="600">Output JSON</Typography>
          <Button 
            startIcon={<ContentCopyIcon />} 
            onClick={copyToClipboard}
            disabled={!output}
            size="small"
          >
            Copy
          </Button>
        </Box>
        <Paper 
          variant="outlined" 
          sx={{ 
            p: 2, 
            height: '100%', 
            minHeight: 395, 
            bgcolor: 'grey.50',
            overflow: 'auto',
            fontFamily: 'monospace',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all'
          }}
        >
          {output || <Typography color="text.secondary">Formatted JSON will appear here...</Typography>}
        </Paper>
      </Box>

    </Box>
  );
};

const JsonFormatter = () => {
  const content = (
    <>
      <Typography variant="h2">Free JSON Formatter & Validator</Typography>
      <Typography variant="body1">
        Instantly format, validate, and minify your JSON data. This tool parses your JSON string, checks for syntax errors, and pretty-prints it with indentation for easy reading. Completely client-side and secure.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste your JSON into the input box — it&apos;s validated and pretty-printed instantly, with syntax
        errors highlighted if the JSON is malformed.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Pasting <code>{'{'}"name":"Alice","age":30{'}'}</code> and formatting it produces a neatly indented,
        multi-line JSON object — much easier to read and debug.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Debugging a minified or single-line API response.</li>
          <li>Validating that a JSON payload is syntactically correct.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What happens if my JSON is invalid?</Typography>
      <Typography variant="body1">
        The tool highlights the syntax error so you can locate and fix the exact problem in your JSON.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="JSON Formatter & Validator"
      description="Format, validate, and minify JSON data instantly in your browser. Free online developer tool."
      url="/developer-tools/json-formatter"
      content={content}
      category="Developer Tools"
    >
      <JsonFormatterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default JsonFormatter;
