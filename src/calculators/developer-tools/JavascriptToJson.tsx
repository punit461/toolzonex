'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import JSON5 from 'json5';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const SAMPLE = "{ name: 'Ann', age: 30, /* a comment */ tags: ['a', 'b',], }";

const JavascriptToJsonContent = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }
    try {
      const parsed = JSON5.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (e) {
      setOutput('');
      setError(e instanceof Error ? e.message : 'Failed to parse JavaScript object literal.');
    }
  }, [input]);

  const copyToClipboard = async () => {
    if (output) await navigator.clipboard.writeText(output);
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" fontWeight="600">Paste JavaScript Object Literal</Typography>
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
          <Typography variant="subtitle1" fontWeight="600">Strict JSON</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          component="pre"
          sx={{ p: 2, minHeight: 395, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {output || 'Strict JSON will appear here...'}
        </Paper>
      </Box>
    </Box>
  );
};

const JavascriptToJson = () => {
  const content = (
    <>
      <Typography variant="h2">Free JavaScript to JSON Converter</Typography>
      <Typography variant="body1">
        Paste a permissive JavaScript object literal — with unquoted keys, single quotes, trailing commas, or
        comments — to instantly convert it into strict, valid JSON. This is the reverse of simply reading JSON as
        JavaScript: it takes the relaxed syntax developers actually write in config files and source code and
        produces output that passes <code>JSON.parse</code> anywhere.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste any JS object literal into the input box, or click &quot;Load Example&quot; to see a sample with
        unquoted keys, single-quoted strings, an inline comment, and a trailing comma all handled at once. The
        tool parses the input using the JSON5 spec (a superset of JSON that permits this relaxed syntax) and then
        re-serializes it as pretty-printed, strict JSON.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        <code>{"{ name: 'Ann', age: 30, /* a comment */ tags: ['a', 'b',], }"}</code> becomes valid JSON with
        quoted keys, double-quoted strings, the comment stripped, and the trailing comma removed:
        <code>{'{ "name": "Ann", "age": 30, "tags": ["a", "b"] }'}</code>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Converting a hand-written JavaScript config object into a strict <code>.json</code> config file.</li>
          <li>Cleaning up a JS object copied from source code so it can be pasted into a JSON-only tool or API.</li>
          <li>Fixing trailing-comma or unquoted-key errors that break <code>JSON.parse</code>.</li>
          <li>Stripping comments out of a JSON5/JSONC file before feeding it to a strict JSON parser.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What exactly counts as valid input?</Typography>
      <Typography variant="body1">
        Anything valid under the <a href="https://json5.org" target="_blank" rel="noopener noreferrer">JSON5
        specification</a> — unquoted or single-quoted keys, single-quoted strings, trailing commas in objects and
        arrays, single-line and block comments, and a few extra numeric literals like leading <code>+</code> and
        hexadecimal numbers.
      </Typography>
      <Typography variant="h3">What happens with functions or <code>undefined</code> values?</Typography>
      <Typography variant="body1">
        JSON5 (and JSON itself) doesn&apos;t support function values, <code>undefined</code>, or other
        non-serializable JavaScript values — if your input contains any of these, parsing will fail with an
        error rather than silently dropping them.
      </Typography>
      <Typography variant="h3">Is my data uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — parsing and conversion happen entirely client-side in your browser using the JSON5 library. Nothing
        you paste is sent to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/javascript-to-json" content={content}>
      <JavascriptToJsonContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default JavascriptToJson;
