'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { tsToDeclaration } from './typescriptEngine';

const SAMPLE = 'export function add(a: number, b: number): number {\n  return a + b;\n}\nexport interface Point { x: number; y: number; }';

const TypeScriptToDeclarationContent = () => {
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
    tsToDeclaration(input).then((result) => {
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
          <Typography variant="subtitle1" fontWeight="600">Type Declaration (.d.ts)</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          component="pre"
          sx={{ p: 2, minHeight: 395, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {output || 'Declaration output will appear here...'}
        </Paper>
      </Box>
    </Box>
  );
};

const TypeScriptToDeclaration = () => {
  const content = (
    <>
      <Typography variant="h2">Free TypeScript to Declaration (.d.ts) Converter</Typography>
      <Typography variant="body1">
        Paste TypeScript source — implementation code included, not just type declarations — to instantly
        generate its real <code>.d.ts</code> declaration file using the TypeScript compiler&apos;s own
        declaration emitter.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste TypeScript source into the input box, or click &quot;Load Example.&quot; The tool spins up an
        in-memory TypeScript compiler program with declaration emit enabled and no JavaScript output, then
        returns exactly what <code>tsc --declaration --emitDeclarationOnly</code> would produce for that file —
        function bodies and other implementation details are stripped, leaving only the exported signatures and
        types.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Given <code>export function add(a: number, b: number): number {'{'} return a + b; {'}'}</code> and
        <code> export interface Point {'{'} x: number; y: number; {'}'}</code>, the tool emits
        <code>export declare function add(a: number, b: number): number;</code> and
        <code>export interface Point {'{'} x: number; y: number; {'}'}</code> — the function body is gone, and
        only the type-level signatures remain.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking what public API surface a module exposes before publishing a package.</li>
          <li>Generating a quick <code>.d.ts</code> preview for a single file without configuring a full build.</li>
          <li>Reviewing exactly which types a piece of code exports at the declaration level.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is this a real declaration emit, or an approximation?</Typography>
      <Typography variant="body1">
        It&apos;s a real emit — this tool runs an actual TypeScript compiler program against your source with
        <code>declaration: true</code> and <code>emitDeclarationOnly: true</code>, the same flags
        <code>tsc</code> uses to generate <code>.d.ts</code> files, rather than a hand-written approximation.
      </Typography>
      <Typography variant="h3">Why did I get an error instead of output?</Typography>
      <Typography variant="body1">
        Declaration emit requires syntactically valid TypeScript. If your input has a syntax error, the tool
        surfaces the compiler&apos;s own diagnostic message so you can fix the specific issue.
      </Typography>
      <Typography variant="h3">Is my TypeScript uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — compilation happens entirely client-side in your browser, using the TypeScript compiler loaded on
        demand. Nothing you paste is sent to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/typescript-to-typescript-declaration" content={content}>
      <TypeScriptToDeclarationContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TypeScriptToDeclaration;
