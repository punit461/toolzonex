'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const CssMinifierContent = () => {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  
  const [savings, setSavings] = useState<{ original: number, minified: number, percent: number } | null>(null);

  const minifyCss = () => {
    try {
      if (!input.trim()) {
        setOutput('');
        setSavings(null);
        setError(null);
        return;
      }

      const originalSize = new Blob([input]).size;

      // Basic regex-based CSS minification
      let minified = input
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
        .replace(/\s+/g, ' ') // Collapse whitespace
        .replace(/\s*([{}:;,>+~])\s*/g, '$1') // Remove space around separators
        .replace(/;}/g, '}') // Remove last semicolon before closing brace
        .trim();

      const minifiedSize = new Blob([minified]).size;
      const percent = originalSize > 0 ? ((originalSize - minifiedSize) / originalSize) * 100 : 0;

      setOutput(minified);
      setSavings({ original: originalSize, minified: minifiedSize, percent });
      setError(null);
    } catch (e: any) {
      setError("Failed to minify CSS.");
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
        <Typography variant="subtitle1" fontWeight="600">Original CSS</Typography>
        <TextField
          multiline
          rows={15}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={'body {\n  margin: 0;\n  padding: 0;\n}'}
          fullWidth
          variant="outlined"
          sx={{ fontFamily: 'monospace' }}
        />
        <Button variant="contained" onClick={minifyCss} fullWidth size="large">Minify CSS</Button>
        {error && (
          <Alert severity="error" sx={{ mt: 1 }}>{error}</Alert>
        )}
      </Box>

      {/* Output Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight="600">Minified CSS</Typography>
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
          {output || <Typography color="text.secondary">Minified CSS will appear here...</Typography>}
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

const CssMinifier = () => {
  const content = (
    <>
      <Typography variant="h2">Free CSS Minifier Tool</Typography>
      <Typography variant="body1">
        Compress your CSS files instantly to reduce loading times and improve your website's performance. This tool removes unnecessary whitespace, comments, and line breaks from your CSS code. 
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="CSS Minifier"
      description="Compress and minify CSS code online instantly. Free tool to reduce CSS file size and improve website performance."
      url="/tools/css-minifier"
      content={content}
      category="Tools"
    >
      <CssMinifierContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CssMinifier;
