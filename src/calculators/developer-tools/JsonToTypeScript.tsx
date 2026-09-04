'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { parseJsonSample } from './jsonTransform/inferShape';
import { emitTypeScript } from './jsonTransform/toTypeScript';

const SAMPLE = '{\n  "name": "Ann",\n  "age": 30,\n  "tags": ["a", "b"],\n  "address": { "city": "NYC", "zip": null }\n}';

const JsonToTypeScriptContent = () => {
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
    setOutput(emitTypeScript(root, 'Root'));
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
          <Typography variant="subtitle1" fontWeight="600">TypeScript Interfaces</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          component="pre"
          sx={{ p: 2, minHeight: 395, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {output || 'Interface definitions will appear here...'}
        </Paper>
      </Box>
    </Box>
  );
};

const JsonToTypeScript = () => {
  const content = (
    <>
      <Typography variant="h2">Free JSON to TypeScript Converter</Typography>
      <Typography variant="body1">
        Paste a JSON sample to instantly generate matching TypeScript <code>interface</code> declarations.
        Nested objects become their own named interfaces, arrays become typed arrays, and fields that are
        missing or null in your sample are marked optional or nullable automatically.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste any JSON object or array into the input box, or click &quot;Load Example&quot; to see a sample
        run. The converter parses your JSON, infers a type shape from the values it finds, and generates one
        interface per object level — nested objects are pulled out into their own interface named after the
        parent property, so the output stays readable even for deeply nested payloads.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Given <code>{'{'}"name": "Ann", "age": 30, "tags": ["a","b"], "address": {'{'}"city": "NYC", "zip": null{'}'}{'}'}</code>,
        the tool generates a <code>RootAddress</code> interface for the nested object plus a <code>Root</code>
        interface referencing it, with <code>tags: string[]</code> and <code>zip: null</code> reflecting exactly
        what was observed in the sample.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Typing an API response quickly without hand-writing interfaces field by field.</li>
          <li>Bootstrapping types for a third-party webhook payload or config file.</li>
          <li>Checking at a glance which fields in a JSON sample are optional or nullable.</li>
          <li>Speeding up TypeScript migrations of existing JavaScript codebases that consume JSON.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How are optional and nullable fields detected?</Typography>
      <Typography variant="body1">
        If you paste an array of objects, the tool merges the shape of every element — a property that's
        missing from at least one object becomes optional (<code>?:</code>), and a property that's ever
        <code>null</code> gets a <code>| null</code> union added to its type.
      </Typography>
      <Typography variant="h3">What happens if a field's type is inconsistent across samples?</Typography>
      <Typography variant="body1">
        When the same property holds genuinely conflicting types across an array of samples (say, a string in
        one object and a boolean in another), the field falls back to <code>unknown</code> rather than
        guessing an inaccurate union — you can then refine it by hand.
      </Typography>
      <Typography variant="h3">Is my JSON uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — parsing and type generation happen entirely client-side in your browser. Nothing you paste is
        sent to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/json-to-typescript" content={content}>
      <JsonToTypeScriptContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default JsonToTypeScript;
