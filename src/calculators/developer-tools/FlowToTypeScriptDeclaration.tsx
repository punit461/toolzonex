'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { flowToTypeScriptDeclaration } from './flowEngine';

const SAMPLE = '// @flow\ntype Address = {\n  city: string,\n  zip?: string,\n};\n\nfunction greet(name: string, address: Address): string {\n  return `Hello ${name} from ${address.city}`;\n}';

const FlowToTypeScriptDeclarationContent = () => {
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
    flowToTypeScriptDeclaration(input).then((result) => {
      if (ignore) return;
      setOutput(result.output);
      setError(result.error ?? null);
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
        <Typography variant="subtitle1" fontWeight="600">Paste Flow Source</Typography>
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
          <Typography variant="subtitle1" fontWeight="600">TypeScript Declaration</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          component="pre"
          sx={{ p: 2, minHeight: 395, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {output || 'TypeScript declaration output will appear here...'}
        </Paper>
      </Box>
    </Box>
  );
};

const FlowToTypeScriptDeclaration = () => {
  const content = (
    <>
      <Typography variant="h2">Free Flow to TypeScript Declaration Converter</Typography>
      <Typography variant="body1">
        Paste Flow-annotated source to generate a matching TypeScript declaration (<code>.d.ts</code>-style)
        file — type aliases, interfaces, and function signatures are converted to their TypeScript
        equivalents so you can drop the shapes straight into a <code>.d.ts</code> file or a type-only import.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste any Flow-annotated source into the input box, or click &quot;Load Example.&quot; The tool
        parses your code with Flow&apos;s own parser, walks every top-level <code>type</code> alias,
        <code>interface</code>, and function declaration, and prints a TypeScript equivalent for each one —
        object types, unions, arrays, nullable (<code>?T</code>) types, and function signatures all map to
        their closest TypeScript form.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Given <code>type Address = {'{'} city: string, zip?: string {'}'}</code> and a
        <code>function greet(name: string, address: Address): string</code> declaration, the tool emits a
        TypeScript <code>type Address = {'{'} city: string; zip?: string; {'}'}</code> plus a
        <code>declare function greet(name: string, address: Address): string;</code> ambient declaration.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Producing a starting-point <code>.d.ts</code> file when porting a Flow-typed library to TypeScript.</li>
          <li>Quickly converting a single Flow type alias or interface without setting up a full build pipeline.</li>
          <li>Checking how a Flow type shape maps onto TypeScript syntax during a gradual migration.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is this an exact, byte-for-byte conversion?</Typography>
      <Typography variant="body1">
        No — this is a best-effort structural conversion. It handles the most common Flow constructs well
        (object types, optional and nullable fields, unions, arrays, tuples, interfaces, and function
        signatures), but it&apos;s a hand-built mapping rather than an official, fully-specified Flow-to-TypeScript
        compiler. Less common constructs — object spreads inside a type, exact/inexact object semantics,
        bounded or defaulted generics, and Flow utility types like <code>$Diff</code> or <code>$Shape</code>
        — are simplified, approximated, or left as <code>any</code> rather than causing the tool to fail.
        Review the output before relying on it for anything nontrivial.
      </Typography>
      <Typography variant="h3">Why does it only convert some declarations and skip others?</Typography>
      <Typography variant="body1">
        Only top-level <code>type</code> aliases, <code>interface</code> declarations, and function
        declarations are converted — runtime-only code like variable assignments or class implementations
        is intentionally skipped, since a declaration file describes shapes, not runtime behavior.
      </Typography>
      <Typography variant="h3">Is my code uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — parsing and conversion happen entirely client-side in your browser, using Flow&apos;s parser
        loaded on demand. Nothing you paste is sent to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/flow-to-typescript-declaration" content={content}>
      <FlowToTypeScriptDeclarationContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default FlowToTypeScriptDeclaration;
