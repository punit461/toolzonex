'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { flowToTypeScript } from './flowEngine';

const SAMPLE = '// @flow\ntype Address = {\n  city: string,\n  zip?: string,\n};\n\nfunction greet(name: string, address: Address): string {\n  return `Hello ${name} from ${address.city}`;\n}';

const FlowToTypeScriptContent = () => {
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
    flowToTypeScript(input).then((result) => {
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
          <Typography variant="subtitle1" fontWeight="600">TypeScript (Best-Effort)</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          component="pre"
          sx={{ p: 2, minHeight: 395, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {output || 'TypeScript output will appear here...'}
        </Paper>
      </Box>
    </Box>
  );
};

const FlowToTypeScript = () => {
  const content = (
    <>
      <Typography variant="h2">Free Flow to TypeScript Converter (Best-Effort)</Typography>
      <Typography variant="body1">
        Paste Flow-annotated source to get back a single TypeScript file: a block of generated type
        declarations followed by the runnable implementation with its Flow types stripped. This is a
        best-effort combination of two separate conversions, not a first-class, fully type-annotated port —
        see the limitations below before relying on it.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste any Flow-annotated source into the input box, or click &quot;Load Example.&quot; The tool runs
        two conversions and stitches the results together: it strips Flow types from your source to get a
        runnable implementation, and separately generates TypeScript type declarations from the same source.
        Both pieces are placed in one output file — declarations on top, implementation below.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Given <code>type Address = {'{'} city: string, zip?: string {'}'}</code> and a
        <code>function greet(name: string, address: Address): string</code> declaration, the output starts
        with a generated <code>type Address = {'{'} city: string; zip?: string; {'}'}</code> declaration
        block, followed by the plain <code>function greet(name, address) {'{'} ... {'}'}</code> implementation
        with its Flow annotations removed.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Getting a quick, single-file TypeScript starting point from a small Flow module.</li>
          <li>Seeing both the inferred types and the stripped implementation side by side in one output.</li>
          <li>A first pass before manually re-annotating the implementation with real inline types.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Are the parameter and variable types restored inline in the implementation?</Typography>
      <Typography variant="body1">
        No — and this is the most important limitation to understand. This tool combines two independent
        conversions: a types-only declaration block (generated the same way as the separate
        &quot;Flow to TypeScript Declaration&quot; tool) and a type-stripped implementation (generated the
        same way as the separate &quot;Flow to Plain JavaScript&quot; tool). The two are stitched together as
        a declaration block followed by an implementation — they are not merged, so the function bodies and
        variable declarations below the declaration block do <em>not</em> have their original parameter or
        variable types annotated in place. If you need that level of fidelity, use the
        &quot;Flow to TypeScript Declaration&quot; tool for the types and &quot;Flow to Plain JavaScript&quot;
        for the implementation separately, and merge the two by hand where precision matters.
      </Typography>
      <Typography variant="h3">Why not just generate fully-typed TypeScript directly?</Typography>
      <Typography variant="body1">
        Generating types and stripping types are two different, well-understood operations, but mapping a
        generated type declaration back onto the exact position of each parameter and variable in the
        implementation is a much harder problem with no reliable general solution — so this tool is
        deliberately transparent about combining the two outputs rather than pretending to solve that
        problem.
      </Typography>
      <Typography variant="h3">Is my code uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — both conversions happen entirely client-side in your browser. Nothing you paste is sent to a
        server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/flow-to-typescript" content={content}>
      <FlowToTypeScriptContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default FlowToTypeScript;
