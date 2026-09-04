'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { parseJsonSample } from './jsonTransform/inferShape';
import { emitRustSerde } from './jsonTransform/toRustSerde';

const SAMPLE = '{\n  "name": "Ann",\n  "age": 30,\n  "tags": ["a", "b"],\n  "address": { "city": "NYC", "zip": null }\n}';

const JsonToRustSerdeContent = () => {
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
    setOutput(emitRustSerde(root, 'Root'));
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
          <Typography variant="subtitle1" fontWeight="600">Rust Structs (serde)</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          component="pre"
          sx={{ p: 2, minHeight: 395, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {output || 'Rust struct definitions will appear here...'}
        </Paper>
      </Box>
    </Box>
  );
};

const JsonToRustSerde = () => {
  const content = (
    <>
      <Typography variant="h2">Free JSON to Rust Serde Struct Converter</Typography>
      <Typography variant="body1">
        Paste a JSON sample to instantly generate matching Rust structs annotated with
        <code>#[derive(Serialize, Deserialize)]</code>, snake_case field names, and
        <code>#[serde(rename = &quot;...&quot;)]</code> attributes that preserve your original JSON keys.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste any JSON object or array, or click &quot;Load Example.&quot; The tool infers a type shape and
        emits one <code>pub struct</code> per object level, converting field names to idiomatic snake_case and
        adding a <code>#[serde(rename = &quot;...&quot;)]</code> attribute whenever that differs from the
        original key. Arrays become <code>Vec&lt;T&gt;</code>, and any field that's optional or nullable in
        your sample is wrapped in <code>Option&lt;T&gt;</code>.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Given <code>{'{'}"name": "Ann", "age": 30, "tags": ["a","b"], "address": {'{'}"city": "NYC", "zip": null{'}'}{'}'}</code>,
        the tool emits a <code>RootAddress</code> struct with <code>pub city: String</code> and
        <code>pub zip: Option&lt;serde_json::Value&gt;</code>, plus a <code>Root</code> struct referencing it
        with <code>pub tags: Vec&lt;String&gt;</code>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Generating serde-compatible structs to deserialize an API response in a Rust service.</li>
          <li>Bootstrapping request/response types for an Actix-web or Axum handler.</li>
          <li>Keeping Rust field names idiomatic (snake_case) while preserving exact JSON compatibility via rename attributes.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why does the output need the serde crate?</Typography>
      <Typography variant="body1">
        The generated structs rely on <code>serde::{'{'}Serialize, Deserialize{'}'}</code> for the derive macros
        and, for unknown/mixed-type fields, on <code>serde_json::Value</code> to hold arbitrary JSON — add
        <code>serde</code> (with the <code>derive</code> feature) and <code>serde_json</code> to your
        <code>Cargo.toml</code>.
      </Typography>
      <Typography variant="h3">When does a field get a #[serde(rename)] attribute?</Typography>
      <Typography variant="body1">
        Only when converting the original key to snake_case actually changes it — for example, a JSON key
        <code>userId</code> becomes the Rust field <code>user_id</code> with
        <code>#[serde(rename = &quot;userId&quot;)]</code> so serialization still round-trips to the exact
        original key.
      </Typography>
      <Typography variant="h3">Is my JSON uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — parsing and struct generation happen entirely client-side in your browser. Nothing you paste is
        sent to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/json-to-rust-serde" content={content}>
      <JsonToRustSerdeContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default JsonToRustSerde;
