'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const HtmlMinifierContent = () => {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  
  const [savings, setSavings] = useState<{ original: number, minified: number, percent: number } | null>(null);

  const minifyHtml = () => {
    try {
      if (!input.trim()) {
        setOutput('');
        setSavings(null);
        setError(null);
        return;
      }

      const originalSize = new Blob([input]).size;

      // Basic HTML minification
      let minified = input
        .replace(/<!--[\s\S]*?-->/g, '') // Remove HTML comments
        .replace(/>\s+</g, '><')          // Remove space between tags
        .replace(/\s{2,}/g, ' ')          // Replace multiple spaces with a single space
        .trim();

      const minifiedSize = new Blob([minified]).size;
      const percent = originalSize > 0 ? ((originalSize - minifiedSize) / originalSize) * 100 : 0;

      setOutput(minified);
      setSavings({ original: originalSize, minified: minifiedSize, percent });
      setError(null);
    } catch (e: any) {
      setError("Failed to minify HTML.");
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
        <Typography variant="subtitle1" fontWeight="600">Original HTML</Typography>
        <TextField
          multiline
          rows={15}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={'<!DOCTYPE html>\n<html>\n  <head>\n    <title>Hello</title>\n  </head>\n  <body>\n    <!-- Comment -->\n    <p>World</p>\n  </body>\n</html>'}
          fullWidth
          variant="outlined"
          sx={{ fontFamily: 'monospace' }}
        />
        <Button variant="contained" onClick={minifyHtml} fullWidth size="large">Minify HTML</Button>
        {error && (
          <Alert severity="error" sx={{ mt: 1 }}>{error}</Alert>
        )}
      </Box>

      {/* Output Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight="600">Minified HTML</Typography>
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
            minHeight: 330, 
            bgcolor: 'grey.50',
            overflow: 'auto',
            fontFamily: 'monospace',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all'
          }}
        >
          {output || <Typography color="text.secondary">Minified HTML will appear here...</Typography>}
        </Paper>
        
        {savings && (
          <Alert severity="success" sx={{ mt: 1 }}>
            Original: {savings.original} bytes | Minified: {savings.minified} bytes | Saved: {savings.percent.toFixed(1)}%
          </Alert>
        )}
      </Box>

    </Box>
  );
};

const HtmlMinifier = () => {
  const content = (
    <>
      <Typography variant="h2">Free HTML Minifier Tool</Typography>
      <Typography variant="body1">
        Compress your HTML payload size by removing unnecessary comments and whitespace between tags. This reduces page weight, bandwidth usage, and improves your Core Web Vitals loading scores.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste your HTML into the input box and click minify to instantly strip comments and unnecessary
        whitespace, producing a compact output ready to copy.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Multi-line, indented HTML with comments minifies down to a single compact line — the same rendered
        result, fewer bytes over the wire.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Reducing HTML file size before deploying to production.</li>
          <li>Cleaning up generated or templated HTML output.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Will minifying affect how my page looks?</Typography>
      <Typography variant="body1">
        No — only whitespace and comments are removed; the rendered page looks identical.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="HTML Minifier"
      description="Compress and minify HTML code online instantly. Free tool to reduce HTML file size and improve website performance."
      url="/developer-tools/html-minifier"
      content={content}
      category="Developer Tools"
    >
      <HtmlMinifierContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default HtmlMinifier;
