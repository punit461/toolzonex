'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { parseJsonSample } from './jsonTransform/inferShape';
import { emitGoStruct } from './jsonTransform/toGoStruct';

const SAMPLE = '{\n  "name": "Ann",\n  "age": 30,\n  "tags": ["a", "b"],\n  "address": { "city": "NYC", "zip": null }\n}';

const JsonToGoStructContent = () => {
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
    setOutput(emitGoStruct(root, 'Root'));
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
          <Typography variant="subtitle1" fontWeight="600">Go Struct</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          component="pre"
          sx={{ p: 2, minHeight: 395, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {output || 'Go struct definitions will appear here...'}
        </Paper>
      </Box>
    </Box>
  );
};

const JsonToGoStruct = () => {
  const content = (
    <>
      <Typography variant="h2">Free JSON to Go Struct Converter</Typography>
      <Typography variant="body1">
        Paste a JSON sample to instantly generate matching Go <code>struct</code> declarations, complete with
        PascalCase field names and <code>json</code> struct tags that preserve your original key names.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste any JSON object or array, or click &quot;Load Example.&quot; The tool infers a type shape from
        the sample and emits one <code>struct</code> per object level. Nested objects get their own named
        struct, arrays become slices (<code>[]T</code>), and fields that are optional or nullable in your
        sample become pointer types (<code>*T</code>) — the idiomatic Go way to represent JSON fields that
        might be absent or <code>null</code>.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Given <code>{'{'}"name": "Ann", "age": 30, "tags": ["a","b"], "address": {'{'}"city": "NYC", "zip": null{'}'}{'}'}</code>,
        the tool emits a <code>RootAddress</code> struct with <code>City string</code> and
        <code>Zip interface{'{}'}</code> fields tagged <code>json:&quot;city&quot;</code> /
        <code>json:&quot;zip&quot;</code>, plus a <code>Root</code> struct that embeds it.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Generating structs to unmarshal an API response with <code>encoding/json</code>.</li>
          <li>Bootstrapping Go types for a webhook payload or third-party API without typing every field by hand.</li>
          <li>Making sure struct tags exactly match the original JSON key casing.</li>
          <li>Quickly scaffolding request/response types for a new Go microservice.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why are some fields pointer types?</Typography>
      <Typography variant="body1">
        Go's zero values (like <code>0</code> or <code>""</code>) are indistinguishable from a field that was
        never sent. For any property that's missing from at least one sample object or was ever
        <code>null</code>, the generator uses a pointer (<code>*string</code>, <code>*int</code>, etc.) so
        <code>nil</code> unambiguously means &quot;not present.&quot;
      </Typography>
      <Typography variant="h3">Does it use the standard library's <code>encoding/json</code>?</Typography>
      <Typography variant="body1">
        The generated <code>json:&quot;...&quot;</code> tags work with Go's standard <code>encoding/json</code>
        package directly — no extra dependency required.
      </Typography>
      <Typography variant="h3">Is my JSON uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — parsing and struct generation happen entirely client-side in your browser. Nothing you paste is
        sent to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/json-to-go-struct" content={content}>
      <JsonToGoStructContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default JsonToGoStruct;
