'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { tsToShape } from './typescriptEngine';
import { emitJsonSchema } from './jsonTransform/toJsonSchema';

const SAMPLE = `interface Address {
  city: string;
  zip?: string;
}
interface User {
  name: string;
  age: number;
  address: Address;
  tags: string[];
}`;

const TypeScriptToJsonSchemaContent = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }
    tsToShape(input).then(({ root, error: parseError }) => {
      if (ignore) return;
      if (parseError) {
        setOutput('');
        setError(parseError);
        return;
      }
      setError(null);
      setOutput(emitJsonSchema(root, root.name || 'Root'));
    });
    return () => {
      ignore = true;
    };
  }, [input]);

  const copyToClipboard = async () => {
    if (output) await navigator.clipboard.writeText(output);
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" fontWeight="600">Paste TypeScript</Typography>
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
          <Typography variant="subtitle1" fontWeight="600">JSON Schema</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          component="pre"
          sx={{ p: 2, minHeight: 395, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {output || 'JSON Schema output will appear here...'}
        </Paper>
      </Box>
    </Box>
  );
};

const TypeScriptToJsonSchema = () => {
  const content = (
    <>
      <Typography variant="h2">Free TypeScript to JSON Schema Converter</Typography>
      <Typography variant="body1">
        Paste a TypeScript <code>interface</code> or <code>type</code> to instantly generate a matching
        draft-07 JSON Schema document, with <code>required</code> and nested <code>properties</code> filled
        in automatically.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste TypeScript source into the input box, or click &quot;Load Example.&quot; The tool parses the
        first top-level <code>interface</code> or <code>type</code> declaration with the TypeScript compiler,
        resolving any other top-level interfaces it references by name, and emits a JSON Schema
        <code>object</code> definition for every level, listing every non-optional property under
        <code>required</code> and describing arrays with an <code>items</code> schema.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Given an <code>Address</code> interface with an optional <code>zip</code> field and a <code>User</code> interface
        referencing it, the tool emits a schema whose <code>address</code> property is a nested object schema
        with <code>&quot;required&quot;: [&quot;city&quot;]</code>, and whose <code>tags</code> property is
        <code>{'{ "type": "array", "items": { "type": "string" } }'}</code>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Generating a validation schema for an API payload already typed in TypeScript.</li>
          <li>Documenting a TypeScript interface as a portable, language-agnostic JSON Schema.</li>
          <li>Feeding a JSON Schema into form-generation or OpenAPI tooling from an existing type.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does this support more than one interface at a time?</Typography>
      <Typography variant="body1">
        The tool converts the first top-level <code>interface</code> or <code>type</code> in your input as the
        root schema. If that root type references other top-level interfaces from the same file by name (like
        <code>address: Address</code>), those are resolved and inlined as nested schemas automatically — but
        interfaces that aren&apos;t referenced from the root are ignored.
      </Typography>
      <Typography variant="h3">How are optional and nullable fields represented?</Typography>
      <Typography variant="body1">
        An optional property (<code>zip?: string</code>) is simply left out of the schema&apos;s
        <code>required</code> array. A nullable property (a union with <code>null</code>) gets its
        <code>type</code> turned into an array like <code>[&quot;string&quot;, &quot;null&quot;]</code>, matching
        JSON Schema draft-07 conventions.
      </Typography>
      <Typography variant="h3">Is my TypeScript uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — parsing and schema generation happen entirely client-side in your browser, using the TypeScript
        compiler loaded on demand. Nothing you paste is sent to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/typescript-to-json-schema" content={content}>
      <TypeScriptToJsonSchemaContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TypeScriptToJsonSchema;
