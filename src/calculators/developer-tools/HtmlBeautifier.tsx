'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const HtmlBeautifierContent = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const beautify = () => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }
    try {
      let indent = 0;
      const lines: string[] = [];
      const raw = input.replace(/>\s*</g, '>\n<').split('\n');

      for (let line of raw) {
        line = line.trim();
        if (!line) continue;

        if (line.match(/^<\/\w/)) {
          indent = Math.max(0, indent - 1);
        }

        lines.push('  '.repeat(indent) + line);

        if (
          line.match(/^<\w[^>]*[^\/]>$/i) &&
          !line.match(/^<(br|hr|img|input|meta|link|source|area|base|col|embed|param|track|wbr)\b/i) &&
          !line.match(/<\/\w+>/)
        ) {
          indent++;
        }
      }

      setOutput(lines.join('\n'));
      setError(null);
    } catch {
      setError('Failed to beautify HTML. Check for unclosed tags.');
    }
  };

  const copyToClipboard = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
    }
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" fontWeight="600">Minified HTML</Typography>
        <TextField
          multiline
          rows={15}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='<div><p>Hello</p><img src="photo.jpg"/></div>'
          fullWidth
          variant="outlined"
          sx={{ fontFamily: 'monospace' }}
        />
        <Button variant="contained" onClick={beautify} fullWidth>Beautify HTML</Button>
        {error && <Alert severity="error">{error}</Alert>}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight="600">Formatted HTML</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper variant="outlined" sx={{ p: 2, height: '100%', minHeight: 395, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
          {output || <Typography color="text.secondary">Formatted HTML will appear here...</Typography>}
        </Paper>
      </Box>
    </Box>
  );
};

const HtmlBeautifier = () => {
  const content = (
    <>
      <Typography variant="h2">Free HTML Beautifier &amp; Formatter</Typography>
      <Typography variant="body1">
        Paste your minified or messy HTML code and instantly get a clean, properly indented version. This tool runs entirely in your browser — no code is sent to any server.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste your HTML code into the left panel and click &quot;Beautify HTML.&quot; The formatted result appears on the right with proper indentation, making nested elements easy to read.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Pasting <code>&lt;div&gt;&lt;p&gt;Hi&lt;/p&gt;&lt;img src=&quot;a.jpg&quot;/&gt;&lt;/div&gt;</code> produces neatly indented output where each nested element sits one level deeper than its parent.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Cleaning up HTML minified by build tools or CDN proxies.</li>
          <li>Reading markup copied from an online source or CMS export.</li>
          <li>Formatting code before committing it to a repository.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does this tool fix broken HTML?</Typography>
      <Typography variant="body1">
        No — this is a formatting tool, not a validator. It applies indentation rules to your existing markup. If your HTML has unclosed tags, the output may still be misaligned.
      </Typography>
      <Typography variant="h3">Is my HTML code uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — all processing happens locally in your browser using client-side JavaScript. Nothing is transmitted over the network.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/html-beautifier" content={content}>
      <HtmlBeautifierContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default HtmlBeautifier;
