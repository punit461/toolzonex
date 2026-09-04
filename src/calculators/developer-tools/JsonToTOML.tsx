'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { parseJsonSample } from './jsonTransform/inferShape';
import { emitTOML } from './jsonTransform/toTOML';

const SAMPLE = '{\n  "name": "Ann",\n  "age": 30,\n  "tags": ["a", "b"],\n  "address": { "city": "NYC", "zip": "10001" }\n}';

const JsonToTOMLContent = () => {
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
    setOutput(emitTOML(root, 'root'));
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
          <Typography variant="subtitle1" fontWeight="600">TOML Document</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          component="pre"
          sx={{ p: 2, minHeight: 395, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {output || 'TOML output will appear here...'}
        </Paper>
      </Box>
    </Box>
  );
};

const JsonToTOML = () => {
  const content = (
    <>
      <Typography variant="h2">Free JSON to TOML Converter</Typography>
      <Typography variant="body1">
        Paste a JSON sample to instantly convert it into a valid TOML document. Unlike this tool's
        type-generator siblings, TOML has no schema concept — the output is a real TOML document populated
        with the actual values from your sample, with nested objects becoming <code>[table]</code> sections
        and arrays becoming TOML arrays.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste any JSON object into the input box, or click &quot;Load Example&quot; to see a sample run. The
        converter walks your JSON and emits <code>key = value</code> pairs for scalars and arrays of
        scalars, and turns each nested object into its own <code>[table]</code> section (or
        <code>[[table]]</code> for arrays of objects) using dotted paths to represent nesting.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Given <code>{'{'}"name": "Ann", "tags": ["a","b"], "address": {'{'}"city": "NYC", "zip": "10001"{'}'}{'}'}</code>,
        the tool emits <code>name = &quot;Ann&quot;</code> and <code>tags = [&quot;a&quot;, &quot;b&quot;]</code>
        at the top level, followed by an <code>[address]</code> section containing
        <code>city = &quot;NYC&quot;</code> and <code>zip = &quot;10001&quot;</code>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Converting a JSON config export into a TOML config file for tools like Cargo or Poetry.</li>
          <li>Migrating settings from a JSON-based app to a TOML-based one.</li>
          <li>Producing a human-readable sample TOML document from real API response data.</li>
          <li>Quickly checking how a nested JSON structure would look expressed as TOML tables.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why does this tool output values instead of type declarations?</Typography>
      <Typography variant="body1">
        TOML is a configuration file format, not a schema/type language — there's no TOML equivalent of a
        TypeScript interface. Instead, this converter produces a real, valid TOML document populated with
        the sample values from your JSON, which you can use directly as a config file or as a template.
      </Typography>
      <Typography variant="h3">How are null values handled, since TOML has no null?</Typography>
      <Typography variant="body1">
        TOML has no native null/nil value, so any field that was <code>null</code> in your JSON is emitted
        as an empty string with a trailing comment noting it was null in the source, so you can decide how to
        represent it for your use case.
      </Typography>
      <Typography variant="h3">Is my JSON uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — parsing and TOML generation happen entirely client-side in your browser. Nothing you paste is
        sent to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/json-to-toml" content={content}>
      <JsonToTOMLContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default JsonToTOML;
