'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { tsToShape } from './typescriptEngine';
import { emitFlow } from './jsonTransform/toFlow';

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

const TypeScriptToFlowContent = () => {
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
      setOutput(emitFlow(root, root.name || 'Root'));
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
          <Typography variant="subtitle1" fontWeight="600">Flow Types</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          component="pre"
          sx={{ p: 2, minHeight: 395, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {output || 'Flow type output will appear here...'}
        </Paper>
      </Box>
    </Box>
  );
};

const TypeScriptToFlow = () => {
  const content = (
    <>
      <Typography variant="h2">Free TypeScript to Flow Converter</Typography>
      <Typography variant="body1">
        Paste a TypeScript <code>interface</code> or <code>type</code> to instantly generate matching
        Flow type declarations, with optional and array fields carried over automatically.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste TypeScript source into the input box, or click &quot;Load Example.&quot; The tool parses the
        first top-level <code>interface</code> or <code>type</code> declaration in your source with the
        TypeScript compiler, resolving any other top-level interfaces it references by name, and emits an
        exact Flow type for each object level, using Flow&apos;s <code>{'{| ... |}'}</code> exact object
        syntax, <code>?</code> for nullable fields, and trailing <code>?:</code> for optional properties.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Given an <code>Address</code> interface with an optional <code>zip</code> field and a <code>User</code> interface
        referencing it, the tool emits a <code>UserAddress</code> Flow type plus a <code>User</code> type that
        references it, with <code>zip?: string,</code> and <code>tags: string[],</code> preserved exactly.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Porting TypeScript type definitions into a Flow-typed codebase.</li>
          <li>Comparing how the same shape reads in TypeScript versus Flow syntax.</li>
          <li>Bootstrapping Flow types for a shared API contract already documented in TypeScript.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does this support more than one interface at a time?</Typography>
      <Typography variant="body1">
        The tool converts the first top-level <code>interface</code> or <code>type</code> in your input as the
        root type. If that root type references other top-level interfaces from the same file by name (like
        <code>address: Address</code>), those are resolved and inlined as nested Flow types automatically —
        but interfaces that aren&apos;t referenced from the root are ignored.
      </Typography>
      <Typography variant="h3">What happens to unsupported TypeScript features?</Typography>
      <Typography variant="body1">
        Generics, mapped types, conditional types, and other advanced TypeScript features fall back to Flow&apos;s
        <code>mixed</code> type rather than an incorrect guess — you can refine those fields by hand afterward.
      </Typography>
      <Typography variant="h3">Is my TypeScript uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — parsing and type generation happen entirely client-side in your browser, using the TypeScript
        compiler loaded on demand. Nothing you paste is sent to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/typescript-to-flow" content={content}>
      <TypeScriptToFlowContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TypeScriptToFlow;
