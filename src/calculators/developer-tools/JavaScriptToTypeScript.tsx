'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { javascriptToTypeScript } from './typescriptEngine';

const SAMPLE = "function add(a = 0, b = 0) {\n  return a + b;\n}\nconst name = 'Ann';\nconst isActive = true;";

const JavaScriptToTypeScriptContent = () => {
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
    javascriptToTypeScript(input).then((result) => {
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
        <Typography variant="subtitle1" fontWeight="600">Paste JavaScript</Typography>
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
          <Typography variant="subtitle1" fontWeight="600">TypeScript (best-effort)</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          component="pre"
          sx={{ p: 2, minHeight: 395, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {output || 'Annotated TypeScript output will appear here...'}
        </Paper>
      </Box>
    </Box>
  );
};

const JavaScriptToTypeScript = () => {
  const content = (
    <>
      <Typography variant="h2">Free JavaScript to TypeScript Converter (Best-Effort)</Typography>
      <Typography variant="body1">
        Paste JavaScript source to get back the same code with obvious type annotations added — untyped
        function parameters, and <code>const</code>/<code>let</code> declarations initialized with a literal
        value. This is a best-effort syntactic pass, not full type inference.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste any JavaScript source into the input box, or click &quot;Load Example.&quot; The tool parses your
        code with the TypeScript compiler and walks its syntax tree: function parameters with a literal default
        value (like <code>a = 0</code>) get typed from that default (<code>a: number = 0</code>), parameters
        with no default get typed <code>: any</code>, and <code>const</code>/<code>let</code> declarations
        initialized with a number, string, or boolean literal get an explicit type annotation. The result is
        reprinted from the modified syntax tree, so formatting stays close to a normal TypeScript printer&apos;s
        output rather than your original spacing.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Given <code>{'function add(a = 0, b = 0) { return a + b; }'}</code> and{' '}
        <code>const name = &apos;Ann&apos;;</code>, the tool emits{' '}
        <code>{'function add(a: number = 0, b: number = 0) { return a + b; }'}</code> and{' '}
        <code>const name: string = &apos;Ann&apos;;</code>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Getting a head start on a manual JavaScript-to-TypeScript migration.</li>
          <li>Quickly seeing which function parameters and variables have no obvious inferable type.</li>
          <li>Adding the easy, mechanical annotations before doing the harder type work by hand.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does this do real, full type inference?</Typography>
      <Typography variant="body1">
        No — this is explicitly a best-effort tool, not real control-flow type inference. It only adds obvious,
        syntactic annotations: <code>any</code> for untyped parameters, primitive types inferred from literal
        parameter defaults, and primitive/array types inferred from literal variable initializers. Complex
        logic, conditional types, object literal shapes, and any type that depends on how a value is actually
        used elsewhere in your code are left untouched and will need manual typing afterward.
      </Typography>
      <Typography variant="h3">Why did some declarations get a type and others didn&apos;t?</Typography>
      <Typography variant="body1">
        Only declarations initialized with a literal value the tool recognizes — numbers, strings, booleans,
        and array literals for variables, plus literal defaults for parameters — get an inferred annotation.
        Object literals, function calls, and anything else are left as-is rather than risk an incorrect guess.
      </Typography>
      <Typography variant="h3">Is my JavaScript uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — parsing and annotation happen entirely client-side in your browser, using the TypeScript compiler
        loaded on demand. Nothing you paste is sent to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/javascript-to-typescript" content={content}>
      <JavaScriptToTypeScriptContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default JavaScriptToTypeScript;
