'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { htmlToJsx } from './domTransform';

const SAMPLE = '<div class="form-group">\n  <label for="email" style="color: #333; font-size: 14px;">Email</label>\n  <input id="email" type="email" placeholder="you@example.com">\n</div>';

const HtmlToJsxContent = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }
    const result = htmlToJsx(input);
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
          <Typography variant="subtitle1" fontWeight="600">JSX Output</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          component="pre"
          sx={{ p: 2, minHeight: 395, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {output || 'JSX output will appear here...'}
        </Paper>
      </Box>
    </Box>
  );
};

const HtmlToJsx = () => {
  const content = (
    <>
      <Typography variant="h2">Free HTML to JSX Converter</Typography>
      <Typography variant="body1">
        Paste raw HTML to instantly convert it into valid JSX. <code>class</code> becomes <code>className</code>,
        <code>for</code> becomes <code>htmlFor</code>, inline <code>style</code> strings become JavaScript style
        objects, and void elements like <code>{'<input>'}</code> and <code>{'<br>'}</code> are self-closed —
        exactly the fixes React&apos;s JSX compiler would otherwise complain about.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste any HTML snippet into the input box, or click &quot;Load Example&quot; to see a form field with a
        <code>class</code>, an inline <code>style</code> attribute, and a <code>for</code> attribute all converted
        at once. The tool parses your markup with the browser&apos;s DOM parser, walks the resulting tree, and
        wraps multiple top-level elements in a React fragment (<code>{'<>...</>'}</code>) automatically.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        <code>{'<label for="email" style="color: #333; font-size: 14px;">'}</code> becomes
        <code>{'<label htmlFor="email" style={{ color: \'#333\', fontSize: \'14px\' }}>'}</code>, and
        <code>{'<input id="email" type="email">'}</code> becomes a self-closed
        <code>{'<input id="email" type="email" />'}</code>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Converting a static HTML template into a React component when migrating a site to Next.js or CRA.</li>
          <li>Pasting markup copied from a design tool or email template directly into JSX without manual fixes.</li>
          <li>Quickly fixing React&apos;s &quot;Warning: Invalid DOM property&quot; console errors from pasted HTML.</li>
          <li>Converting inline <code>style</code> strings from legacy markup into React style objects.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What happens to data- and aria- attributes?</Typography>
      <Typography variant="body1">
        They&apos;re left exactly as-is — <code>data-*</code> and <code>aria-*</code> attributes stay kebab-case
        in JSX per React convention, unlike other HTML attributes which are camelCased.
      </Typography>
      <Typography variant="h3">Does it handle curly braces in text content?</Typography>
      <Typography variant="body1">
        Yes — literal <code>{'{'}</code> and <code>{'}'}</code> characters found in text nodes are escaped as
        <code>{"{'{'}"}</code> and <code>{"{'}'}"}</code> so the output compiles as valid JSX instead of being
        misread as an expression.
      </Typography>
      <Typography variant="h3">Is my HTML uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — parsing and conversion happen entirely client-side in your browser. Nothing you paste is sent to a
        server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/html-to-jsx" content={content}>
      <HtmlToJsxContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default HtmlToJsx;
