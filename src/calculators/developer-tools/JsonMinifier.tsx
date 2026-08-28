'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const JsonMinifierContent = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<{ original: number; minified: number; saved: number } | null>(null);

  const minify = () => {
    if (!input.trim()) {
      setOutput('');
      setStats(null);
      setError(null);
      return;
    }
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      const originalSize = new Blob([input]).size;
      const minifiedSize = new Blob([minified]).size;
      setOutput(minified);
      setStats({
        original: originalSize,
        minified: minifiedSize,
        saved: originalSize > 0 ? Math.round(((originalSize - minifiedSize) / originalSize) * 100) : 0,
      });
      setError(null);
    } catch (e: any) {
      setError(e.message || 'Invalid JSON');
      setOutput('');
      setStats(null);
    }
  };

  const copyToClipboard = async () => {
    if (output) await navigator.clipboard.writeText(output);
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" fontWeight="600">Input JSON</Typography>
        <TextField
          multiline
          rows={15}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{\n  "name": "Alice",\n  "age": 30,\n  "hobbies": ["reading", "gaming"]\n}'
          fullWidth
          variant="outlined"
          sx={{ fontFamily: 'monospace' }}
        />
        <Button variant="contained" onClick={minify} fullWidth size="large">Minify JSON</Button>
        {error && <Alert severity="error">{error}</Alert>}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight="600">Minified Output</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          sx={{ p: 2, minHeight: 395, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}
        >
          {output || <Typography color="text.secondary">Minified JSON will appear here...</Typography>}
        </Paper>
        {stats && (
          <Alert severity="success">
            Original: {stats.original} bytes &nbsp;|&nbsp; Minified: {stats.minified} bytes &nbsp;|&nbsp; Saved: {stats.saved}%
          </Alert>
        )}
      </Box>
    </Box>
  );
};

const JsonMinifier = () => {
  const content = (
    <>
      <Typography variant="h2">Free JSON Minifier — Compress JSON Online</Typography>
      <Typography variant="body1">
        Paste your JSON and instantly minify it by stripping whitespace, newlines, and indentation.
        Also validates your JSON — any syntax errors are shown before you copy the compressed result.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste formatted or pretty-printed JSON into the input box and click &quot;Minify JSON.&quot; The tool
        parses the JSON (catching any syntax errors), removes all unnecessary whitespace, and shows the
        minified output with a byte-size comparison.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A formatted JSON object with 4 spaces of indentation and newlines gets compressed to a single line
        with no extra spaces — often saving 40-60% of the original size.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Reducing JSON payload size for API requests or network transfers.</li>
          <li>Compressing JSON config files before embedding in HTML or JavaScript.</li>
          <li>Validating that JSON is syntactically correct before deploying.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Will minifying change the data?</Typography>
      <Typography variant="body1">
        No — only whitespace is removed. The parsed data structure remains identical; minified JSON
        produces the same result when deserialized.
      </Typography>
      <Typography variant="h3">Is my data uploaded?</Typography>
      <Typography variant="body1">
        No — everything runs locally in your browser. No data is sent to any server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/json-minifier" content={content}>
      <JsonMinifierContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default JsonMinifier;
