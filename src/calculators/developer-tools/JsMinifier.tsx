'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const JsMinifierContent = () => {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  
  const [savings, setSavings] = useState<{ original: number, minified: number, percent: number } | null>(null);

  const minifyJs = () => {
    try {
      if (!input.trim()) {
        setOutput('');
        setSavings(null);
        setError(null);
        return;
      }

      const originalSize = new Blob([input]).size;

      // Very basic regex-based JS minification
      // Note: This is not a substitute for a real AST parser (like Terser/Uglify)
      // but it works for simple scripts by removing comments and extra whitespace.
      let minified = input
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
        .replace(/\/\/.*/g, '')           // Remove single-line comments
        .replace(/\s+/g, ' ')             // Collapse whitespace
        .replace(/\s*([=+\-*/<>!&|{}()[\];:,\.?])\s*/g, '$1') // Remove space around operators and punctuation
        .trim();

      const minifiedSize = new Blob([minified]).size;
      const percent = originalSize > 0 ? ((originalSize - minifiedSize) / originalSize) * 100 : 0;

      setOutput(minified);
      setSavings({ original: originalSize, minified: minifiedSize, percent });
      setError(null);
    } catch (e: any) {
      setError("Failed to minify JavaScript.");
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
        <Typography variant="subtitle1" fontWeight="600">Original JavaScript</Typography>
        <TextField
          multiline
          rows={15}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={'function hello() {\n  console.log("Hello, World!");\n}'}
          fullWidth
          variant="outlined"
          sx={{ fontFamily: 'monospace' }}
        />
        <Button variant="contained" onClick={minifyJs} fullWidth size="large">Minify JS</Button>
        {error && (
          <Alert severity="error" sx={{ mt: 1 }}>{error}</Alert>
        )}
      </Box>

      {/* Output Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight="600">Minified JavaScript</Typography>
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
          {output || <Typography color="text.secondary">Minified JS will appear here...</Typography>}
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

const JsMinifier = () => {
  const content = (
    <>
      <Typography variant="h2">Free JavaScript Minifier Tool</Typography>
      <Typography variant="body1">
        Reduce your JavaScript payload size and improve load times. This basic client-side minifier strips comments, line breaks, and unnecessary spaces from your JS files instantly — a quick way to minify js online or compress js without a build pipeline. Note: For complex production code, we recommend using a full AST-based minifier like Terser.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste your JavaScript into the input box and click minify to instantly strip comments and unnecessary
        whitespace, producing a compact output ready to copy. This works as a fast javascript minify / javascript
        compress tool with no sign-up and no software to install — everything runs locally in your browser.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Multi-line, commented JavaScript with extra whitespace minifies down to a compact single-line output —
        smaller file size, same behavior.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Quickly shrinking a small script for a prototype or personal project.</li>
          <li>Removing comments and whitespace before sharing or embedding a snippet.</li>
          <li>Minimizing JS pasted into a &lt;script&gt; tag to trim page weight without a build step.</li>
          <li>Comparing original vs. minified byte size before deciding whether to bother compressing further.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is this safe for production code?</Typography>
      <Typography variant="body1">
        For complex production codebases, a full AST-based minifier like Terser or esbuild is safer and more
        thorough — this tool is best for quick, simple minification needs.
      </Typography>
      <Typography variant="h3">Can I minify js online without installing anything?</Typography>
      <Typography variant="body1">
        Yes — paste your JavaScript into the input box and click Minify JS. Everything runs in your browser, so
        there&apos;s nothing to install and no build tooling required.
      </Typography>
      <Typography variant="h3">What does this JavaScript minify / compress js tool actually remove?</Typography>
      <Typography variant="body1">
        It strips comments (both <code>//</code> and <code>/* */</code> styles), collapses extra whitespace and
        line breaks, and removes unnecessary spaces around operators and punctuation — reducing file size
        without changing behavior for typical scripts.
      </Typography>
      <Typography variant="h3">Does minimizing JS change how my code runs?</Typography>
      <Typography variant="body1">
        It shouldn&apos;t — minifying only removes comments and formatting whitespace, not logic. However, this
        is a basic regex-based minifier, not a full parser, so always test minified output before deploying it,
        especially for complex code.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="JavaScript Minifier"
      description="Compress and minify JavaScript code online instantly. Free tool to reduce JS file size and improve website performance."
      url="/developer-tools/js-minifier"
      content={content}
      category="Developer Tools"
    >
      <JsMinifierContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default JsMinifier;
