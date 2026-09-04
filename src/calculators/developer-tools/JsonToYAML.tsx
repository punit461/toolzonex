'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { parseJsonSample } from './jsonTransform/inferShape';
import { emitYAML } from './jsonTransform/toYAML';

const SAMPLE = '{\n  "name": "Ann",\n  "age": 30,\n  "tags": ["a", "b"],\n  "address": { "city": "NYC", "zip": null }\n}';

const JsonToYAMLContent = () => {
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
    setOutput(emitYAML(root, 'root'));
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
          <Typography variant="subtitle1" fontWeight="600">YAML Document</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          component="pre"
          sx={{ p: 2, minHeight: 395, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {output || 'YAML output will appear here...'}
        </Paper>
      </Box>
    </Box>
  );
};

const JsonToYAML = () => {
  const content = (
    <>
      <Typography variant="h2">Free JSON to YAML Converter</Typography>
      <Typography variant="body1">
        Paste a JSON sample to instantly convert it into valid, properly indented YAML. Nested objects
        become indented key blocks, arrays become <code>-</code> item lists, and values are quoted only when
        needed so the output stays as readable as hand-written YAML.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste any JSON object or array into the input box, or click &quot;Load Example&quot; to see a sample
        run. The converter walks your JSON's actual values (not inferred types) and emits standard
        two-space-indented YAML, quoting strings only when they'd otherwise be ambiguous (for example, a
        string that looks like a number, a boolean, or contains YAML special characters).
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Given <code>{'{'}"name": "Ann", "tags": ["a","b"], "address": {'{'}"city": "NYC", "zip": null{'}'}{'}'}</code>,
        the tool emits <code>name: Ann</code>, a <code>tags:</code> key followed by <code>- a</code> and
        <code>- b</code> on their own indented lines, and an <code>address:</code> block containing
        <code>city: NYC</code> and <code>zip: null</code>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Converting a JSON API response into a YAML fixture for tests.</li>
          <li>Turning a JSON config export into a YAML config file for Docker Compose, Kubernetes, or CI.</li>
          <li>Making a deeply nested JSON payload easier to read by reformatting it as YAML.</li>
          <li>Producing a starting YAML document from real sample data instead of writing it by hand.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why does this tool output values instead of type declarations?</Typography>
      <Typography variant="body1">
        Like TOML, YAML is a data-serialization format rather than a type/schema language, so this converter
        emits a real YAML document populated with your sample's actual values rather than type names.
      </Typography>
      <Typography variant="h3">When does the converter quote a string value?</Typography>
      <Typography variant="body1">
        A string is quoted whenever leaving it bare would change its meaning in YAML — for example if it's
        empty, looks like a number or boolean, has leading/trailing whitespace, or contains a YAML special
        character like <code>:</code>, <code>#</code>, or <code>-</code>. Ordinary strings are left unquoted.
      </Typography>
      <Typography variant="h3">Is my JSON uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — parsing and YAML generation happen entirely client-side in your browser. Nothing you paste is
        sent to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/json-to-yaml" content={content}>
      <JsonToYAMLContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default JsonToYAML;
