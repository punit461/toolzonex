'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, TextField } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { downloadBytes } from './pdfUtils';
import { htmlStringToPdfBytes } from './htmlToPdfPages';

const HtmlToPdfContent = () => {
  const [html, setHtml] = useState('<h1>Hello World</h1>\n<p>This is a paragraph of sample HTML content.</p>');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const handleConvert = async () => {
    setError('');
    if (!html.trim()) { setError('Enter or paste some HTML first.'); return; }
    setBusy(true);
    try {
      const pdfBytes = await htmlStringToPdfBytes(html);
      downloadBytes(pdfBytes, 'document.pdf');
    } catch (e) {
      setError('Could not render this HTML to PDF.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box>
      <TextField
        label="HTML"
        placeholder="Paste your HTML here..."
        value={html}
        onChange={(e) => setHtml(e.target.value)}
        multiline
        rows={14}
        fullWidth
        sx={{ '& textarea': { fontFamily: 'monospace', fontSize: '0.85rem' } }}
      />

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleConvert} disabled={busy || !html.trim()}>
        {busy ? 'Converting...' : 'Convert to PDF'}
      </Button>
    </Box>
  );
};

const HtmlToPdf = () => {
  const content = (
    <>
      <Typography variant="h2">How to Convert HTML to PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Paste your HTML markup into the box.</li>
          <li>Click <strong>Convert to PDF</strong> — the HTML is rendered and saved as a paginated PDF.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Paste a snippet like <code>&lt;h1&gt;Invoice&lt;/h1&gt;&lt;table&gt;...&lt;/table&gt;</code> to turn a
        styled HTML invoice or report into a downloadable PDF.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Turning an HTML email template or report into a PDF.</li>
          <li>Archiving a web page snippet as a fixed document.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does it support CSS?</strong> Basic inline and embedded CSS renders correctly; external stylesheets and JavaScript are not loaded.</li>
          <li><strong>Is my HTML uploaded anywhere?</strong> No — rendering happens entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell
      url="/tools/html-to-pdf"
      content={content}
    >
      <HtmlToPdfContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default HtmlToPdf;
