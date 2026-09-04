'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { htmlToPug } from './domTransform';

const SAMPLE = '<div class="form-group">\n  <label for="email" style="color: #333; font-size: 14px;">Email</label>\n  <input id="email" type="email" placeholder="you@example.com">\n</div>';

const HtmlToPugContent = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }
    const result = htmlToPug(input);
    setOutput(result.output);
    setError(result.error ?? null);
  }, [input]);

  const copyToClipboard = async () => {
    if (output) await navigator.clipboard.writeText(output);
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" fontWeight="600">Paste HTML Markup</Typography>
        <TextField
          multiline
          rows={16}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={SAMPLE}
          fullWidth
          variant="outlined"
          sx={{ fontFamily: 'monospace' }}
        />
        <Button variant="outlined" size="small" onClick={() => setInput(SAMPLE)} sx={{ alignSelf: 'flex-start' }}>
          Load Example
        </Button>
        {error && <Alert severity="error">{error}</Alert>}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight="600">Pug Output</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          component="pre"
          sx={{ p: 2, minHeight: 395, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {output || 'Pug template will appear here...'}
        </Paper>
      </Box>
    </Box>
  );
};

const HtmlToPug = () => {
  const content = (
    <>
      <Typography variant="h2">Free HTML to Pug Converter</Typography>
      <Typography variant="body1">
        Paste raw HTML to instantly convert it into Pug&apos;s indentation-based template syntax. Classes and
        IDs collapse into the shorthand <code>tag.class#id</code> notation, remaining attributes move into
        parentheses, and void elements like <code>{'<input>'}</code> need no closing tag.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste any HTML snippet into the input box, or click &quot;Load Example&quot;. The tool parses the markup
        and walks the element tree, emitting one indented line per element. Short single-line text content stays
        on the same line as its tag; longer or multi-line text is placed on its own indented <code>|</code> line
        below, and HTML comments become Pug <code>//</code> comment lines.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        <code>{'<div class="form-group">'}</code> becomes <code>div.form-group</code>, and
        <code>{'<input id="email" type="email" placeholder="you@example.com">'}</code> becomes
        <code>{'input#email(type="email", placeholder="you@example.com")'}</code> — no closing tag needed.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Migrating a static HTML template into an Express/Pug (formerly Jade) view.</li>
          <li>Converting a designer&apos;s HTML mockup into the templating syntax your backend already uses.</li>
          <li>Learning Pug syntax by comparing it side-by-side against familiar HTML.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How are multiple classes handled?</Typography>
      <Typography variant="body1">
        Every class in a space-separated <code>class</code> attribute becomes its own chained shorthand, so
        <code>{'class="card card--large"'}</code> becomes <code>.card.card--large</code> appended directly after
        the tag name.
      </Typography>
      <Typography variant="h3">What happens to attributes with no value, like &quot;disabled&quot;?</Typography>
      <Typography variant="body1">
        This converter reads attribute values as reported by the browser&apos;s DOM parser, so boolean HTML
        attributes are emitted with their resolved value (e.g. <code>disabled=&quot;&quot;</code>) inside the
        parentheses — you can trim the <code>=&quot;&quot;</code> by hand if your Pug setup prefers the bare form.
      </Typography>
      <Typography variant="h3">Is my HTML uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — parsing and conversion happen entirely client-side in your browser. Nothing you paste is sent to a
        server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/html-to-pug" content={content}>
      <HtmlToPugContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default HtmlToPug;
