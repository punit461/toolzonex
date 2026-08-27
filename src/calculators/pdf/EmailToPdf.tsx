'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, TextField, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { downloadBytes } from './pdfUtils';
import { htmlStringToPdfBytes } from './htmlToPdfPages';

const EmailToPdfContent = () => {
  const [subject, setSubject] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [body, setBody] = useState('');
  const [format, setFormat] = useState<'html' | 'text'>('html');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const handleConvert = async () => {
    setError('');
    if (!body.trim()) { setError('Paste your email content first.'); return; }
    setBusy(true);
    try {
      const escapedBody = format === 'text'
        ? `<pre style="white-space:pre-wrap;font-family:monospace;">${body.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>`
        : body;

      const html = `
        <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#111;">
          <table style="width:100%;border-bottom:2px solid #ccc;padding-bottom:12px;margin-bottom:16px;">
            ${subject ? `<tr><td style="font-weight:bold;padding:2px 0;">Subject</td><td>${subject.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</td></tr>` : ''}
            ${from ? `<tr><td style="font-weight:bold;padding:2px 0;">From</td><td>${from.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</td></tr>` : ''}
            ${to ? `<tr><td style="font-weight:bold;padding:2px 0;">To</td><td>${to.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</td></tr>` : ''}
          </table>
          <div>${escapedBody}</div>
        </div>`;

      const pdfBytes = await htmlStringToPdfBytes(html);
      const filename = subject ? subject.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 40) + '.pdf' : 'email.pdf';
      downloadBytes(pdfBytes, filename);
    } catch {
      setError('Could not convert this content to PDF.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box>
      <Stack spacing={2}>
        <TextField
          label="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          fullWidth
          placeholder="Email subject line"
        />
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            label="From"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            fullWidth
            placeholder="sender@example.com"
          />
          <TextField
            label="To"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            fullWidth
            placeholder="recipient@example.com"
          />
        </Stack>
        <FormControl fullWidth>
          <InputLabel>Content Format</InputLabel>
          <Select value={format} label="Content Format" onChange={(e) => setFormat(e.target.value as 'html' | 'text')}>
            <MenuItem value="html">HTML</MenuItem>
            <MenuItem value="text">Plain Text</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Email Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          multiline
          rows={14}
          fullWidth
          placeholder={format === 'html' ? '<h1>Hello</h1><p>Paste your HTML email content here...</p>' : 'Paste your plain text email here...'}
          sx={{ '& textarea': { fontFamily: 'monospace', fontSize: '0.85rem' } }}
        />
      </Stack>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleConvert} disabled={busy || !body.trim()}>
        {busy ? 'Converting...' : 'Convert Email to PDF'}
      </Button>
    </Box>
  );
};

const EmailToPdf = () => {
  const content = (
    <>
      <Typography variant="h2">How to Convert Email to PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Paste your email subject, from/to addresses, and body content into the form.</li>
          <li>Choose between HTML or plain text format for the body.</li>
          <li>Click <strong>Convert Email to PDF</strong> — a formatted PDF with email headers and content is downloaded.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Copy an important email thread from your mail client, paste the body into the text area, add the subject
        and sender info, and download a clean PDF copy — useful for legal records, expense reports, or
        archiving correspondence outside your inbox.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Saving important email correspondence as a permanent PDF archive.</li>
          <li>Creating printable copies of email threads for meetings or legal purposes.</li>
          <li>Converting HTML-formatted newsletters or announcements into PDF documents.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Can I paste HTML directly?</strong> Yes — select the HTML format option and paste your email HTML. Basic inline and embedded CSS is supported.</li>
          <li><strong>Are attachments included?</strong> No — only the email body text or HTML is converted. Attachments would need to be handled separately.</li>
          <li><strong>Is my content uploaded anywhere?</strong> No — conversion happens entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/email-to-pdf" content={content}>
      <EmailToPdfContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default EmailToPdf;
