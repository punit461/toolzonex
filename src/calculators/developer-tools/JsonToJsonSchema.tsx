'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { parseJsonSample } from './jsonTransform/inferShape';
import { emitJsonSchema } from './jsonTransform/toJsonSchema';

const SAMPLE = '{\n  "name": "Ann",\n  "age": 30,\n  "tags": ["a", "b"],\n  "address": { "city": "NYC", "zip": null }\n}';

const JsonToJsonSchemaContent = () => {
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
    setOutput(emitJsonSchema(root, 'Root'));
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
          <Typography variant="subtitle1" fontWeight="600">JSON Schema (draft-07)</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          component="pre"
          sx={{ p: 2, minHeight: 395, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {output || 'A JSON Schema document will appear here...'}
        </Paper>
      </Box>
    </Box>
  );
};

const JsonToJsonSchema = () => {
  const content = (
    <>
      <Typography variant="h2">Free JSON to JSON Schema Converter</Typography>
      <Typography variant="body1">
        Paste a JSON sample to instantly generate a matching <a href="https://json-schema.org/draft-07" target="_blank" rel="noopener noreferrer">JSON Schema (draft-07)</a> document
        describing its structure, types, and required fields.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste any JSON object or array, or click &quot;Load Example.&quot; The tool infers a type shape and
        builds a schema with <code>&quot;type&quot;</code>, <code>&quot;properties&quot;</code>, and a
        <code>&quot;required&quot;</code> array listing every key present in all samples. Nested objects are
        described inline (not via <code>$ref</code>) so the schema is a single self-contained document, arrays
        get an <code>&quot;items&quot;</code> schema, and any field that was ever <code>null</code> gets the
        array form <code>&quot;type&quot;: [&quot;string&quot;, &quot;null&quot;]</code>.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Given <code>{'{'}"name": "Ann", "age": 30, "tags": ["a","b"], "address": {'{'}"city": "NYC", "zip": null{'}'}{'}'}</code>,
        the <code>address</code> property becomes an inline object schema whose <code>zip</code> property is
        typed <code>&quot;null&quot;</code>, while <code>tags</code> becomes
        <code>{'{'} &quot;type&quot;: &quot;array&quot;, &quot;items&quot;: {'{'} &quot;type&quot;: &quot;string&quot; {'}'} {'}'}</code>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Generating a starting schema for validating API payloads with Ajv or another JSON Schema validator.</li>
          <li>Documenting an API's expected request or response shape.</li>
          <li>Feeding a schema into code generators, form builders, or OpenAPI tooling that consume JSON Schema.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why draft-07 instead of a newer JSON Schema version?</Typography>
      <Typography variant="body1">
        Draft-07 remains the most widely supported version across validators and tooling (including Ajv and
        many OpenAPI-adjacent tools), so it's the safest default for a generated schema meant to be broadly
        compatible.
      </Typography>
      <Typography variant="h3">Are nested objects defined with $ref?</Typography>
      <Typography variant="body1">
        No — to keep the output simple and self-contained, nested objects are described inline as nested
        schema objects rather than extracted into <code>$defs</code>/<code>definitions</code> and referenced
        with <code>$ref</code>.
      </Typography>
      <Typography variant="h3">Is my JSON uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — parsing and schema generation happen entirely client-side in your browser. Nothing you paste is
        sent to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/json-to-json-schema" content={content}>
      <JsonToJsonSchemaContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default JsonToJsonSchema;
