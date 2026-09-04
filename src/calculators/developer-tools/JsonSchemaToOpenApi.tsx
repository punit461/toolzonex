'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { parseJsonSchema } from './jsonSchemaTransform/normalize';
import { emitOpenApi } from './jsonSchemaTransform/toOpenApi';

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

const JsonSchemaToOpenApiContent = () => {
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
    setOutput(emitOpenApi(root, 'Root'));
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
          <Typography variant="subtitle1" fontWeight="600">OpenAPI Schema</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          component="pre"
          sx={{ p: 2, minHeight: 395, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {output || 'OpenAPI components.schemas fragment will appear here...'}
        </Paper>
      </Box>
    </Box>
  );
};

const JsonSchemaToOpenApi = () => {
  const content = (
    <>
      <Typography variant="h2">Free JSON Schema to OpenAPI Converter</Typography>
      <Typography variant="body1">
        Paste an actual JSON Schema document — not a plain JSON data sample — to instantly generate a
        matching OpenAPI 3.0 <code>components.schemas</code> fragment. Nested objects are extracted into
        their own named schema and referenced with <code>$ref</code>, matching how OpenAPI documents
        typically structure reusable schemas.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste a draft-07-style JSON Schema object into the input box, or click &quot;Load Example
        Schema&quot; to see a sample run. The tool converts your schema's <code>type</code>/
        <code>properties</code>/<code>required</code>/<code>items</code> keywords, then emits an OpenAPI
        <code>components.schemas</code> object with a named schema for the root and for every nested object,
        using OpenAPI's <code>nullable: true</code> sibling key instead of JSON Schema's type-array style for
        nullable fields.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Given a schema with a nested <code>address</code> object, the tool generates a
        <code>Root</code> schema whose <code>address</code> property is
        <code>{'{'} "$ref": "#/components/schemas/RootAddress" {'}'}</code>, plus a separate
        <code>RootAddress</code> schema entry describing that object's own properties.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Converting a standalone JSON Schema into a reusable OpenAPI component for an API spec.</li>
          <li>Migrating request/response validation schemas into an OpenAPI-documented API.</li>
          <li>Producing a first draft of an OpenAPI schema to paste into a larger <code>openapi.yaml</code> file.</li>
          <li>Checking how a JSON Schema's nullable fields translate into OpenAPI's nullable convention.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How does JSON Schema nullability map to OpenAPI?</Typography>
      <Typography variant="body1">
        JSON Schema commonly expresses "nullable" with a type array like <code>["string", "null"]</code>.
        OpenAPI 3.0 doesn't support type arrays, so this converter instead adds a <code>nullable: true</code>
        sibling key next to the resolved type, which is the standard OpenAPI 3.0 convention.
      </Typography>
      <Typography variant="h3">Are $schema and $id kept in the output?</Typography>
      <Typography variant="body1">
        No — <code>$schema</code> and <code>$id</code> are JSON-Schema-specific metadata keywords that don't
        belong in an OpenAPI schema object, so they're dropped from the generated
        <code>components.schemas</code> fragment.
      </Typography>
      <Typography variant="h3">Is my schema uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — parsing and schema generation happen entirely client-side in your browser. Nothing you paste is
        sent to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/json-schema-to-openapi-schema" content={content}>
      <JsonSchemaToOpenApiContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default JsonSchemaToOpenApi;
