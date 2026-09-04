'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert, FormControlLabel, Switch } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function prettyPrintXml(xml: string): string {
  const PAD = '  ';
  let formatted = '';
  let pad = 0;

  const trimmed = xml.replace(/>\s*</g, '><').trim();
  const nodes = trimmed.split(/(?=<)/g).filter((n) => n.trim().length > 0);

  nodes.forEach((rawNode) => {
    const node = rawNode.trim();
    const isDeclaration = /^<\?/.test(node);
    const isComment = /^<!--/.test(node);
    const isClosing = /^<\//.test(node);
    const isSelfClosing = /\/>\s*$/.test(node) || isDeclaration;
    const isOpenAndCloseOnOneLine = /^<([\w:.-]+)[^>]*>.*<\/\1\s*>$/.test(node);

    if (isClosing) pad = Math.max(0, pad - 1);
    formatted += PAD.repeat(pad) + node + '\n';
    if (!isClosing && !isSelfClosing && !isComment && !isOpenAndCloseOnOneLine) pad += 1;
  });

  return formatted.trim();
}

function minifyXml(xml: string): string {
  return xml
    .replace(/>\s+</g, '><')
    .replace(/\s+/g, ' ')
    .trim();
}

const SAMPLE = '<root><user id="1"><name>Alice</name><roles><role>admin</role><role>editor</role></roles></user></root>';

const XmlPrettyPrinterContent = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [minify, setMinify] = useState(false);

  const process = () => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }
    if (!input.includes('<') || !input.includes('>')) {
      setError('This doesn\'t look like XML — no tags found.');
      setOutput('');
      return;
    }
    try {
      setOutput(minify ? minifyXml(input) : prettyPrintXml(input));
      setError(null);
    } catch {
      setError('Could not process this XML — check that tags are properly closed.');
      setOutput('');
    }
  };

  const copyOutput = () => {
    if (output) navigator.clipboard.writeText(output);
  };

  const downloadOutput = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = minify ? 'minified.xml' : 'formatted.xml';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <FormControlLabel
        control={<Switch checked={minify} onChange={(e) => { setMinify(e.target.checked); setOutput(''); }} />}
        label={minify ? 'Minify mode — strip whitespace between tags' : 'Pretty-print mode — indent nested elements'}
      />

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="subtitle1" fontWeight="600">Input XML</Typography>
          <TextField
            multiline
            rows={15}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={SAMPLE}
            fullWidth
            variant="outlined"
            sx={{ fontFamily: 'monospace' }}
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" onClick={process} fullWidth>{minify ? 'Minify XML' : 'Format XML'}</Button>
            <Button variant="outlined" onClick={() => setInput(SAMPLE)} fullWidth>Load Sample</Button>
          </Box>
          {error && <Alert severity="error">{error}</Alert>}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle1" fontWeight="600">{minify ? 'Minified Output' : 'Formatted Output'}</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button startIcon={<ContentCopyIcon />} onClick={copyOutput} disabled={!output} size="small">Copy</Button>
              <Button startIcon={<DownloadIcon />} onClick={downloadOutput} disabled={!output} size="small">Download</Button>
            </Box>
          </Box>
          <Paper
            variant="outlined"
            sx={{ p: 2, minHeight: 380, maxHeight: 460, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}
          >
            {output || <Typography color="text.secondary">{minify ? 'Minified' : 'Pretty-printed'} XML will appear here...</Typography>}
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

const XmlPrettyPrinter = () => {
  const content = (
    <>
      <Typography variant="h2">Free XML Pretty Print & Minify Tool</Typography>
      <Typography variant="body1">
        Paste any XML and either pretty-print it into a clean, indented document or minify it down to a single
        compact line — flip the switch above to choose between the two modes on the same page. Runs entirely in
        your browser with copy and download options.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste your XML into the left box. With the switch off, click "Format XML" to re-indent nested elements
        onto their own lines with consistent two-space indentation. Turn the switch on and click "Minify XML" to
        strip all whitespace between tags instead, producing the smallest possible payload. Copy the result or
        download it as a <code>.xml</code> file.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Pretty-printing <code>{'<root><user><name>Alice</name></user></root>'}</code> produces a multi-line,
        indented document with <code>{'<user>'}</code> and <code>{'<name>'}</code> each on their own line.
        Minifying an indented document does the reverse — it collapses all the whitespace between tags back down
        to one compact line.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Reading a minified XML API response or SOAP payload during debugging (pretty-print mode).</li>
          <li>Shrinking an XML config or feed file's size before storing or transmitting it (minify mode).</li>
          <li>Cleaning up a configuration file for review, then minifying it again before deployment.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does this validate my XML?</Typography>
      <Typography variant="body1">
        Not strictly — this tool uses a lightweight, regex-based processor rather than a full XML parser, so it
        focuses on reformatting or compacting tag structure rather than validating schema correctness or catching
        every possible malformed-XML edge case.
      </Typography>
      <Typography variant="h3">What does minify mode actually remove?</Typography>
      <Typography variant="body1">
        Minify mode strips whitespace (spaces, tabs, and line breaks) sitting between tags, collapsing the
        document onto a single line. It doesn't alter attribute values or text content inside elements.
      </Typography>
      <Typography variant="h3">Is my XML data uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — formatting and minifying happen entirely client-side in your browser. Nothing you paste is sent to
        a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/xml-pretty-print" content={content}>
      <XmlPrettyPrinterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default XmlPrettyPrinter;
