'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { tsToShape } from './typescriptEngine';
import { emitZodSchema } from './jsonTransform/toZodSchema';

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

const TypeScriptToZodSchemaContent = () => {
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
      setOutput(emitZodSchema(root, root.name || 'Root'));
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
          <Typography variant="subtitle1" fontWeight="600">Zod Schema</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          component="pre"
          sx={{ p: 2, minHeight: 395, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {output || 'Zod schema output will appear here...'}
        </Paper>
      </Box>
    </Box>
  );
};

const TypeScriptToZodSchema = () => {
  const content = (
    <>
      <Typography variant="h2">Free TypeScript to Zod Schema Converter</Typography>
      <Typography variant="body1">
        Paste a TypeScript <code>interface</code> or <code>type</code> to instantly generate a matching
        <a href="https://zod.dev" target="_blank" rel="noopener noreferrer">Zod</a> schema you can use to
        validate data at runtime.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste TypeScript source into the input box, or click &quot;Load Example.&quot; The tool parses the
        first top-level <code>interface</code> or <code>type</code> declaration with the TypeScript compiler,
        resolving any other top-level interfaces it references by name, and emits a
        <code>z.object({'{'}...{'}'})</code> schema for every object level, pulling nested objects out into
        their own named schema constant, wrapping arrays in <code>z.array(...)</code>, and chaining
        <code>.nullable()</code> and/or <code>.optional()</code> onto any field marked that way in your source.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Given an <code>Address</code> interface with an optional <code>zip</code> field and a <code>User</code> interface
        referencing it, the tool emits a <code>UserAddressSchema</code> with
        <code>zip: z.string().optional()</code>, plus a <code>UserSchema</code> that references it, with
        <code>tags: z.array(z.string())</code>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Adding runtime validation to a codebase that already has TypeScript types but no Zod schemas.</li>
          <li>Generating a starting schema for a tRPC or Next.js Server Action input type from an interface.</li>
          <li>Validating API responses at runtime against types you&apos;ve already written.</li>
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
      <Typography variant="h3">Does the generated code include a Zod import?</Typography>
      <Typography variant="body1">
        No — only the schema declarations are generated. Add <code>import {'{'} z {'}'} from &quot;zod&quot;;</code>
        at the top of the file where you paste the output.
      </Typography>
      <Typography variant="h3">Is my TypeScript uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — parsing and schema generation happen entirely client-side in your browser, using the TypeScript
        compiler loaded on demand. Nothing you paste is sent to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/typescript-to-zod-schema" content={content}>
      <TypeScriptToZodSchemaContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TypeScriptToZodSchema;
