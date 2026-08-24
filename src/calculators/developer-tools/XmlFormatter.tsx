'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function formatXml(xml: string): string {
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

const SAMPLE = '<root><user id="1"><name>Alice</name><roles><role>admin</role><role>editor</role></roles></user></root>';

const XmlFormatterContent = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const format = () => {
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
      setOutput(formatXml(input));
      setError(null);
    } catch {
      setError('Could not format this XML — check that tags are properly closed.');
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
    a.download = 'formatted.xml';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" fontWeight="600">Minified / Unformatted XML</Typography>
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
          <Button variant="contained" onClick={format} fullWidth>Format XML</Button>
          <Button variant="outlined" onClick={() => setInput(SAMPLE)} fullWidth>Load Sample</Button>
        </Box>
        {error && <Alert severity="error">{error}</Alert>}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight="600">Formatted Output</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button startIcon={<ContentCopyIcon />} onClick={copyOutput} disabled={!output} size="small">Copy</Button>
            <Button startIcon={<DownloadIcon />} onClick={downloadOutput} disabled={!output} size="small">Download</Button>
          </Box>
        </Box>
        <Paper
          variant="outlined"
          sx={{ p: 2, minHeight: 380, maxHeight: 460, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}
        >
          {output || <Typography color="text.secondary">Pretty-printed XML will appear here...</Typography>}
        </Paper>
      </Box>
    </Box>
  );
};

const XmlFormatter = () => {
  const content = (
    <>
      <Typography variant="h2">Free XML Formatter — Pretty-Print & Indent XML</Typography>
      <Typography variant="body1">
        Paste minified or unformatted XML and instantly convert it into a clean, properly indented document —
        much easier to read, review, and debug. Runs entirely in your browser with copy and download options.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste your XML into the left box and click "Format XML." The tool re-indents nested elements onto
        their own lines, giving each level of the document tree consistent two-space indentation. Copy the
        result or download it as a `.xml` file.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Pasting <code>{'<root><user><name>Alice</name></user></root>'}</code> produces a multi-line, indented
        document with <code>{'<user>'}</code> and <code>{'<name>'}</code> each on their own properly nested line.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Reading a minified XML API response or SOAP payload during debugging.</li>
          <li>Cleaning up a configuration file (like an Android manifest or Maven POM) for review.</li>
          <li>Preparing readable XML output before sharing it in documentation or a bug report.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does this validate my XML?</Typography>
      <Typography variant="body1">
        Not strictly — this tool uses a lightweight, regex-based re-indenter rather than a full XML parser, so
        it focuses on reformatting tag structure rather than validating schema correctness or catching every
        possible malformed-XML edge case.
      </Typography>
      <Typography variant="h3">Will it handle self-closing tags and comments correctly?</Typography>
      <Typography variant="body1">
        Yes — self-closing tags (like <code>{'<br/>'}</code>), XML declarations, and comments are each placed on
        their own line at the correct indentation level without adding unnecessary nested indenting after them.
      </Typography>
      <Typography variant="h3">Is my XML data uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — formatting happens entirely client-side in your browser. Nothing you paste is sent to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/xml-formatter" content={content}>
      <XmlFormatterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default XmlFormatter;
