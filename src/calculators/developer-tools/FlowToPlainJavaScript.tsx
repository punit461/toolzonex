'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { flowToPlainJavaScript } from './flowEngine';

const SAMPLE = '// @flow\ntype Address = {\n  city: string,\n  zip?: string,\n};\n\nfunction greet(name: string, address: Address): string {\n  return `Hello ${name} from ${address.city}`;\n}';

const FlowToPlainJavaScriptContent = () => {
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
    flowToPlainJavaScript(input).then((result) => {
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

const FlowToPlainJavaScript = () => {
  const content = (
    <>
      <Typography variant="h2">Free Flow to Plain JavaScript Converter</Typography>
      <Typography variant="body1">
        Paste Flow-annotated source to instantly strip out its type annotations and produce plain, runnable
        JavaScript — using Babel&apos;s official Flow parser to remove every type construct, the same
        parsing approach Flow projects have relied on for production builds for years.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste any Flow-annotated source into the input box, or click &quot;Load Example.&quot; The tool
        parses your code with Babel&apos;s Flow syntax plugin, walks the resulting syntax tree removing every
        Flow-only construct — type annotations, type aliases, interfaces, type-only imports/exports, and
        runtime type casts — and regenerates the remaining code, leaving your actual runtime logic completely
        untouched.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Given a <code>function greet(name: string, address: Address): string</code> declaration with a
        Flow <code>type Address</code> alias above it, the tool emits the plain
        <code>function greet(name, address)</code> version with the type alias removed entirely — the
        function body is unchanged.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Running a Flow-typed snippet in a plain JavaScript environment without a build step.</li>
          <li>Migrating a codebase off Flow by first producing a runnable, type-free baseline.</li>
          <li>Quickly checking what a Flow-annotated file looks like once its types are removed.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is this an approximation, or does it produce exact output?</Typography>
      <Typography variant="body1">
        The logic is exact — every Flow type construct is removed via the same battle-tested Flow-parsing
        approach used across the JavaScript ecosystem, not a regex or a hand-written approximation. One
        honest caveat: the output is regenerated from the parsed syntax tree rather than a minimal patch of
        your original text, so formatting details like quote style or spacing can differ from your input
        even though the runtime behavior is identical.
      </Typography>
      <Typography variant="h3">Does this type-check my code first?</Typography>
      <Typography variant="body1">
        No — it only removes type syntax; it doesn&apos;t verify that your Flow types were correct in the
        first place. If you need type-checking, run your code through the Flow compiler itself before using
        this tool.
      </Typography>
      <Typography variant="h3">Is my code uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — type removal happens entirely client-side in your browser, using Babel&apos;s parser loaded on
        demand. Nothing you paste is sent to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/flow-to-plain-javascript" content={content}>
      <FlowToPlainJavaScriptContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default FlowToPlainJavaScript;
