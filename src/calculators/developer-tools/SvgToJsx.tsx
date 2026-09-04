'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { svgToJsx } from './domTransform';

const SAMPLE = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2z" stroke-width="1.5" class="icon-path"/>\n</svg>';

const SvgToJsxContent = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }
    const result = svgToJsx(input, 'Icon');
    setOutput(result.output);
    setError(result.error ?? null);
  }, [input]);

  const copyToClipboard = async () => {
    if (output) await navigator.clipboard.writeText(output);
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" fontWeight="600">Paste SVG Markup</Typography>
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
          <Typography variant="subtitle1" fontWeight="600">JSX Component</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          component="pre"
          sx={{ p: 2, minHeight: 395, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {output || 'JSX component will appear here...'}
        </Paper>
      </Box>
    </Box>
  );
};

const SvgToJsx = () => {
  const content = (
    <>
      <Typography variant="h2">Free SVG to JSX Converter</Typography>
      <Typography variant="body1">
        Paste raw SVG markup to instantly convert it into a React JSX component. Kebab-case SVG attributes
        like <code>fill-rule</code> and <code>stroke-width</code> are renamed to their camelCase JSX
        equivalents (<code>fillRule</code>, <code>strokeWidth</code>), and <code>class</code> becomes
        <code>className</code>, so the output drops straight into a React component.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste any SVG markup into the input box, or click &quot;Load Example&quot; to see a sample icon run
        through the converter. The tool parses the markup with the browser&apos;s native DOM parser, walks the
        resulting element tree, and emits a JSX component function with props spread onto the root
        <code>{'<svg>'}</code> element so you can pass through <code>className</code>, <code>onClick</code>, and
        other standard props.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        An input attribute like <code>fill-rule=&quot;evenodd&quot;</code> becomes <code>fillRule=&quot;evenodd&quot;</code>,
        <code>stroke-width=&quot;1.5&quot;</code> becomes <code>strokeWidth=&quot;1.5&quot;</code>, and
        <code>class=&quot;icon-path&quot;</code> becomes <code>className=&quot;icon-path&quot;</code> — all other
        attributes and the element structure are preserved exactly.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Converting icons exported from Figma or Illustrator into reusable React components.</li>
          <li>Bringing third-party SVG assets into a React codebase without manual attribute renaming.</li>
          <li>Building an icon component library from a folder of raw <code>.svg</code> files.</li>
          <li>Avoiding React&apos;s &quot;unknown DOM attribute&quot; console warnings caused by pasting raw SVG into JSX.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Which attributes get renamed?</Typography>
      <Typography variant="body1">
        Common SVG presentation attributes (<code>fill-rule</code>, <code>clip-rule</code>, <code>stroke-width</code>,
        <code>stroke-linecap</code>, <code>font-family</code>, <code>xlink:href</code>, and more) are mapped to
        their exact React/JSX camelCase equivalents. Any other kebab-case attribute without a known mapping is
        still camelCased automatically rather than dropped, and <code>class</code> always becomes
        <code>className</code>.
      </Typography>
      <Typography variant="h3">Does it handle nested groups and gradients?</Typography>
      <Typography variant="body1">
        Yes — the converter walks the entire element tree recursively, so nested <code>{'<g>'}</code>,
        <code>{'<defs>'}</code>, <code>{'<linearGradient>'}</code>, and other child elements are all converted and
        indented to match their depth in the original markup.
      </Typography>
      <Typography variant="h3">Is my SVG uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — parsing and conversion happen entirely client-side in your browser using the native DOM parser.
        Nothing you paste is sent to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/svg-to-jsx" content={content}>
      <SvgToJsxContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default SvgToJsx;
