'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { parseJsonSchema } from './jsonSchemaTransform/normalize';
import { emitProtobuf } from './jsonSchemaTransform/toProtobuf';

const SAMPLE = JSON.stringify(
  {
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    properties: {
      name: { type: 'string' },
      age: { type: 'integer' },
      tags: { type: 'array', items: { type: 'string' } },
      address: {
        type: 'object',
        properties: {
          city: { type: 'string' },
          zip: { type: ['string', 'null'] },
        },
        required: ['city'],
      },
    },
    required: ['name', 'age'],
  },
  null,
  2
);

const JsonSchemaToProtobufContent = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }
    const { root, error: parseError } = parseJsonSchema(input);
    if (parseError) {
      setOutput('');
      setError(parseError);
      return;
    }
    setError(null);
    setOutput(emitProtobuf(root, 'Root'));
  }, [input]);

  const copyToClipboard = async () => {
    if (output) await navigator.clipboard.writeText(output);
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" fontWeight="600">Paste a JSON Schema document</Typography>
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
          Load Example Schema
        </Button>
        {error && <Alert severity="error">{error}</Alert>}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight="600">Protocol Buffers (.proto)</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          component="pre"
          sx={{ p: 2, minHeight: 395, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {output || 'Protobuf message definitions will appear here...'}
        </Paper>
      </Box>
    </Box>
  );
};

const JsonSchemaToProtobuf = () => {
  const content = (
    <>
      <Typography variant="h2">Free JSON Schema to Protocol Buffers Converter</Typography>
      <Typography variant="body1">
        Paste an actual JSON Schema document — not a plain JSON data sample — to instantly generate a
        matching Protocol Buffers <code>.proto</code> message definition. Nested objects become nested
        <code>message</code> definitions, arrays become <code>repeated</code> fields, and every field gets a
        sequential field number starting at 1.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste a draft-07-style JSON Schema object into the input box, or click &quot;Load Example
        Schema&quot; to see a sample run. The tool converts your schema's <code>type</code>/
        <code>properties</code>/<code>items</code> keywords, then emits a <code>proto3</code>
        <code>message</code> block, numbering fields in the order they appear and nesting sub-messages inside
        their parent message body.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Given a schema with <code>properties: {'{'} name: {'{'} type: "string" {'}'}, tags: {'{'} type: "array", items: {'{'} type: "string" {'}'} {'}'} {'}'}</code>,
        the tool generates <code>message Root {'{'} string name = 1; repeated string tags = 2; {'}'}</code>,
        with field numbers assigned in property order.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Bootstrapping a .proto message definition for a gRPC service from an existing JSON Schema.</li>
          <li>Migrating a REST API's JSON Schema contract toward a Protocol Buffers-based service.</li>
          <li>Getting a first-draft .proto file to refine field numbering and types for by hand.</li>
          <li>Comparing how a JSON Schema's field types map onto Protobuf's scalar type system.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How are JSON Schema types mapped to Protobuf types?</Typography>
      <Typography variant="body1">
        <code>string</code> maps to Protobuf's <code>string</code>, <code>integer</code> maps to
        <code>int64</code>, <code>number</code> maps to <code>double</code>, and <code>boolean</code> maps to
        <code>bool</code>. Fields with an unrecognized type fall back to <code>string</code>.
      </Typography>
      <Typography variant="h3">Are field numbers stable if I reorder my schema's properties?</Typography>
      <Typography variant="body1">
        No — field numbers are assigned sequentially in the order properties appear in your schema. If you
        reorder properties after generating a message once already in production use, you'll break wire
        compatibility, so treat the generated numbers as a starting point to lock in, not something to
        regenerate on every schema change.
      </Typography>
      <Typography variant="h3">Is my schema uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — parsing and message generation happen entirely client-side in your browser. Nothing you paste is
        sent to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/json-schema-to-protobuf" content={content}>
      <JsonSchemaToProtobufContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default JsonSchemaToProtobuf;
