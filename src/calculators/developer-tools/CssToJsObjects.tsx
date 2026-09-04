'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { cssToJsObjects } from './cssTransform';

const SAMPLE = '.card {\n  display: flex;\n  padding: 16px;\n  background-color: #3b82f6;\n  border-radius: 8px;\n  font-size: 14px;\n}';

const CssToJsObjectsContent = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      return;
    }
    setOutput(cssToJsObjects(input));
  }, [input]);

  const copyToClipboard = async () => {
    if (output) await navigator.clipboard.writeText(output);
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" fontWeight="600">Paste CSS</Typography>
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
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight="600">JS Style Objects</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          component="pre"
          sx={{ p: 2, minHeight: 395, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {output || 'JS style objects will appear here...'}
        </Paper>
      </Box>
    </Box>
  );
};

const CssToJsObjects = () => {
  const content = (
    <>
      <Typography variant="h2">Free CSS to JS Objects Converter</Typography>
      <Typography variant="body1">
        Paste CSS to instantly convert each rule into a JavaScript object literal suitable for React inline
        <code>style</code> props. Property names are camelCased (<code>background-color</code> becomes
        <code>backgroundColor</code>), and each selector produces its own named JS variable.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste a CSS stylesheet or snippet into the input box, or click &quot;Load Example&quot;. The tool parses
        each rule block, converts every property/value pair, and generates one <code>const</code> object per
        selector, named from a sanitized camelCase version of the selector (e.g. <code>.my-class</code> becomes
        <code>myClass</code>).
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        <code>{'.card { display: flex; padding: 16px; }'}</code> becomes
        <code>{"const card = { display: 'flex', padding: '16px' };"}</code> — ready to spread into a
        <code>style</code> prop or CSS-in-JS object.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Converting a small CSS file into inline <code>style</code> objects for a React component.</li>
          <li>Migrating legacy CSS into a CSS-in-JS library that accepts plain object literals.</li>
          <li>Quickly camelCasing a handful of CSS declarations without doing it by hand.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Are numeric values converted to plain numbers?</Typography>
      <Typography variant="body1">
        No — all values are kept as strings (e.g. <code>&apos;16px&apos;</code>), including pixel values. React
        accepts string values for every style property, and guessing which unitless properties can take a bare
        number risks generating incorrect styles, so this tool always plays it safe.
      </Typography>
      <Typography variant="h3">How are selector names turned into JS variable names?</Typography>
      <Typography variant="body1">
        Leading <code>.</code> or <code>#</code> characters are stripped, non-alphanumeric characters are
        removed, and hyphen-or-space-separated words are joined in camelCase — so <code>.btn-primary</code>
        becomes <code>btnPrimary</code>.
      </Typography>
      <Typography variant="h3">Is my CSS uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — parsing and conversion happen entirely client-side in your browser. Nothing you paste is sent to a
        server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/css-to-js-objects" content={content}>
      <CssToJsObjectsContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CssToJsObjects;
