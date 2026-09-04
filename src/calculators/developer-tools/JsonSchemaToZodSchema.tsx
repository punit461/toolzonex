'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { parseJsonSchema } from './jsonSchemaTransform/normalize';
import { emitZodSchema } from './jsonTransform/toZodSchema';

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

const JsonSchemaToZodSchemaContent = () => {
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
    setOutput(emitZodSchema(root, 'Root'));
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
          <Typography variant="subtitle1" fontWeight="600">Zod Schema</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          component="pre"
          sx={{ p: 2, minHeight: 395, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {output || 'Zod schema definitions will appear here...'}
        </Paper>
      </Box>
    </Box>
  );
};

const JsonSchemaToZodSchema = () => {
  const content = (
    <>
      <Typography variant="h2">Free JSON Schema to Zod Converter</Typography>
      <Typography variant="body1">
        Paste an actual JSON Schema document — not a plain JSON data sample — to instantly generate a
        matching Zod validation schema. This tool reads <code>type</code>, <code>properties</code>,
        <code>required</code>, and <code>items</code> keywords directly from your schema, so it works even
        for fields your schema declares but that don't appear in any sample data.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste a draft-07-style JSON Schema object into the input box, or click &quot;Load Example
        Schema&quot; to see a sample run. The tool converts your schema's <code>type</code>/
        <code>properties</code>/<code>required</code>/<code>items</code> keywords into the same internal
        shape used by this site's JSON-to-Zod converter, then reuses that exact converter to generate one
        <code>z.object({'{'}...{'}'})</code> per object level, with nested objects pulled into their own
        named schemas.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Given a schema with <code>properties: {'{'} name: {'{'} type: "string" {'}'}, age: {'{'} type: "integer" {'}'} {'}'}</code>
        and <code>required: ["name"]</code>, the tool generates
        <code>const RootSchema = z.object({'{'} name: z.string(), age: z.number().int().optional() {'}'});</code>
        — <code>age</code> gets <code>.optional()</code> because it wasn't listed in <code>required</code>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Generating runtime Zod validators directly from an API's published JSON Schema definitions.</li>
          <li>Validating form or config input against the same rules described by an existing JSON Schema.</li>
          <li>Keeping a TypeScript backend's Zod validators in sync with a JSON Schema contract.</li>
          <li>Bootstrapping request/response validation for an endpoint that's already documented with JSON Schema.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is this different from the JSON to Zod Schema tool?</Typography>
      <Typography variant="body1">
        The JSON to Zod Schema tool reads a plain JSON data sample and infers types from the actual values it
        finds. This tool instead reads a real JSON Schema document and uses its explicit
        <code>type</code>/<code>required</code> declarations — no data sample needed, since the schema
        already states the types directly.
      </Typography>
      <Typography variant="h3">Which JSON Schema keywords are supported?</Typography>
      <Typography variant="body1">
        The converter reads <code>type</code> (as a string or as an array like <code>["string", "null"]</code>
        for nullable fields), <code>properties</code>, <code>required</code>, and <code>items</code>. Other
        validation keywords like <code>pattern</code> or <code>minimum</code> don't automatically become Zod
        refinements and are ignored — add those by hand if you need them.
      </Typography>
      <Typography variant="h3">Is my schema uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — parsing and schema generation happen entirely client-side in your browser. Nothing you paste is
        sent to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/json-schema-to-zod-schema" content={content}>
      <JsonSchemaToZodSchemaContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default JsonSchemaToZodSchema;
