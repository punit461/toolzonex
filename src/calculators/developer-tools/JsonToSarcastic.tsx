'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { parseJsonSample } from './jsonTransform/inferShape';
import { emitSarcastic } from './jsonTransform/toSarcastic';

const SAMPLE = '{\n  "name": "Ann",\n  "age": 30,\n  "tags": ["a", "b"],\n  "address": { "city": "NYC", "zip": null }\n}';

const JsonToSarcasticContent = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }
    const { root, error: parseError } = parseJsonSample(input);
    if (parseError) {
      setOutput('');
      setError(parseError);
      return;
    }
    setError(null);
    setOutput(emitSarcastic(root, 'Root'));
  }, [input]);

  const copyToClipboard = async () => {
    if (output) await navigator.clipboard.writeText(output);
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" fontWeight="600">Paste JSON</Typography>
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
          <Typography variant="subtitle1" fontWeight="600">Sarcastic Schema</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          component="pre"
          sx={{ p: 2, minHeight: 395, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {output || 'Sarcastic schema definition will appear here...'}
        </Paper>
      </Box>
    </Box>
  );
};

const JsonToSarcastic = () => {
  const content = (
    <>
      <Typography variant="h2">Free JSON to Sarcastic Schema Converter</Typography>
      <Typography variant="body1">
        Paste a JSON sample to instantly generate a matching runtime type-checking schema using Sarcastic's
        <code>shape</code>/<code>arrayOf</code>/<code>optional</code>/<code>maybe</code> API. Nested objects
        become nested <code>shape({'{'}...{'}'})</code> calls, arrays become <code>arrayOf(T)</code>, and
        optional or nullable fields are wrapped accordingly.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste any JSON object into the input box, or click &quot;Load Example&quot; to see a sample run. The
        converter parses your JSON, infers a validator for every field, and generates a single
        <code>const Root = shape({'{'}...{'}'});</code> declaration with nested objects described inline.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Given <code>{'{'}"name": "Ann", "tags": ["a","b"], "address": {'{'}"city": "NYC", "zip": null{'}'}{'}'}</code>,
        the tool generates <code>name: string</code>, <code>tags: arrayOf(string)</code>, and
        <code>address: shape({'{'} city: string, zip: maybe(string) {'}'})</code> for the nested object, since
        <code>zip</code> was observed as <code>null</code>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Bootstrapping runtime validators for an API response before writing hand-rolled checks.</li>
          <li>Getting a quick starting schema to refine for input validation in a Node.js service.</li>
          <li>Documenting the exact optional/nullable shape of a JSON payload for teammates.</li>
          <li>Speeding up onboarding of a new endpoint into an existing Sarcastic-based validation layer.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What API convention does the generated output follow?</Typography>
      <Typography variant="body1">
        The output follows Sarcastic's documented <code>shape</code>/<code>arrayOf</code>/<code>optional</code>/
        <code>maybe</code> API convention, with bare <code>string</code>, <code>number</code>, and
        <code>boolean</code> validators for primitives (rather than function calls). If your installed
        version of Sarcastic differs slightly, adjust the generated names to match.
      </Typography>
      <Typography variant="h3">How are optional and nullable fields combined?</Typography>
      <Typography variant="body1">
        A field that was ever <code>null</code> is wrapped in <code>maybe(T)</code>, and a field that was
        missing from at least one sample is wrapped in <code>optional(T)</code>. A field that's both gets
        wrapped in <code>optional(maybe(T))</code>.
      </Typography>
      <Typography variant="h3">Is my JSON uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — parsing and schema generation happen entirely client-side in your browser. Nothing you paste is
        sent to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/json-to-sarcastic" content={content}>
      <JsonToSarcasticContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default JsonToSarcastic;
