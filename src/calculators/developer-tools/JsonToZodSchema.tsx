'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { parseJsonSample } from './jsonTransform/inferShape';
import { emitZodSchema } from './jsonTransform/toZodSchema';

const SAMPLE = '{\n  "name": "Ann",\n  "age": 30,\n  "tags": ["a", "b"],\n  "address": { "city": "NYC", "zip": null }\n}';

const JsonToZodSchemaContent = () => {
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
    setOutput(emitZodSchema(root, 'Root'));
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

const JsonToZodSchema = () => {
  const content = (
    <>
      <Typography variant="h2">Free JSON to Zod Schema Converter</Typography>
      <Typography variant="body1">
        Paste a JSON sample to instantly generate a matching <a href="https://zod.dev" target="_blank" rel="noopener noreferrer">Zod</a> schema
        you can use to validate data at runtime in a TypeScript or JavaScript project.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste any JSON object or array, or click &quot;Load Example.&quot; The tool infers a type shape and
        emits a <code>z.object({'{'}...{'}'})</code> schema for every object level, pulling nested objects out
        into their own named schema constant, wrapping arrays in <code>z.array(...)</code>, and chaining
        <code>.nullable()</code> and/or <code>.optional()</code> onto any field that was ever <code>null</code>
        or missing from a sample.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Given <code>{'{'}"name": "Ann", "age": 30, "tags": ["a","b"], "address": {'{'}"city": "NYC", "zip": null{'}'}{'}'}</code>,
        the tool emits <code>const RootAddressSchema = z.object({'{'} city: z.string(), zip: z.null() {'}'});</code>
        and a <code>RootSchema</code> that references it, with <code>tags: z.array(z.string())</code>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Validating API responses or form submissions at runtime with Zod.</li>
          <li>Generating a starting schema for a tRPC or Next.js Server Action input type.</li>
          <li>Deriving a static TypeScript type from the schema with Zod's <code>z.infer&lt;typeof Schema&gt;</code>.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why are nested schemas defined before the root schema?</Typography>
      <Typography variant="body1">
        JavaScript evaluates <code>const</code> declarations top to bottom, and the root schema references its
        nested schemas by name — so those need to be defined earlier in the file, or you'd get a
        &quot;used before it was defined&quot; error at runtime.
      </Typography>
      <Typography variant="h3">Does the generated code include a Zod import?</Typography>
      <Typography variant="body1">
        No — only the schema declarations are generated. Add <code>import {'{'} z {'}'} from &quot;zod&quot;;</code>
        at the top of the file where you paste the output.
      </Typography>
      <Typography variant="h3">Is my JSON uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — parsing and schema generation happen entirely client-side in your browser. Nothing you paste is
        sent to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/json-to-zod-schema" content={content}>
      <JsonToZodSchemaContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default JsonToZodSchema;
