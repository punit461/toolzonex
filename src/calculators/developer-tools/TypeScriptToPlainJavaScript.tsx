'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { tsToPlainJavaScript } from './typescriptEngine';

const SAMPLE = 'function greet(name: string): string {\n  return `Hello, ${name}`;\n}';

const TypeScriptToPlainJavaScriptContent = () => {
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
    tsToPlainJavaScript(input).then((result) => {
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
          <Typography variant="subtitle1" fontWeight="600">Plain JavaScript</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          component="pre"
          sx={{ p: 2, minHeight: 395, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {output || 'Plain JavaScript output will appear here...'}
        </Paper>
      </Box>
    </Box>
  );
};

const TypeScriptToPlainJavaScript = () => {
  const content = (
    <>
      <Typography variant="h2">Free TypeScript to Plain JavaScript Converter</Typography>
      <Typography variant="body1">
        Paste TypeScript source to instantly strip out its types and produce plain, runnable JavaScript —
        using the TypeScript compiler&apos;s own type-stripping, so the result is exact, not an approximation.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste any TypeScript source into the input box, or click &quot;Load Example.&quot; The tool runs it
        through the TypeScript compiler&apos;s <code>transpileModule</code> API targeting modern ES2020 output,
        which removes type annotations, interfaces, and type-only imports while leaving your actual runtime
        logic untouched.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Given <code>{'function greet(name: string): string { return `Hello, ${name}`; }'}</code>, the tool
        emits <code>{'function greet(name) { return `Hello, ${name}`; }'}</code> — the parameter and return
        type annotations are gone, and the function body is unchanged.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Quickly checking what a TypeScript snippet compiles down to at runtime.</li>
          <li>Producing a plain-JS version of a small utility to paste into an environment without a build step.</li>
          <li>Stripping types from a one-off script before running it in a plain Node or browser context.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is this an approximation, or does it produce exact output?</Typography>
      <Typography variant="body1">
        It&apos;s exact — this tool runs the real TypeScript compiler&apos;s <code>transpileModule</code>
        function, the same type-stripping logic TypeScript itself uses, rather than a hand-written or
        best-effort approximation.
      </Typography>
      <Typography variant="h3">Does this type-check my code first?</Typography>
      <Typography variant="body1">
        No — <code>transpileModule</code> transpiles a single file in isolation without full type-checking, so
        it will happily strip types from code that wouldn&apos;t actually pass <code>tsc</code>. If you need
        full type-checking, run your project through your normal TypeScript build instead.
      </Typography>
      <Typography variant="h3">Is my TypeScript uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — transpilation happens entirely client-side in your browser, using the TypeScript compiler loaded
        on demand. Nothing you paste is sent to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/typescript-to-plain-javascript" content={content}>
      <TypeScriptToPlainJavaScriptContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TypeScriptToPlainJavaScript;
