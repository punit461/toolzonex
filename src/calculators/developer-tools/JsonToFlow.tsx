'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { parseJsonSample } from './jsonTransform/inferShape';
import { emitFlow } from './jsonTransform/toFlow';

const SAMPLE = '{\n  "name": "Ann",\n  "age": 30,\n  "tags": ["a", "b"],\n  "address": { "city": "NYC", "zip": null }\n}';

const JsonToFlowContent = () => {
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
    setOutput(emitFlow(root, 'Root'));
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
          <Typography variant="subtitle1" fontWeight="600">Flow Types</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          component="pre"
          sx={{ p: 2, minHeight: 395, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {output || 'Flow type definitions will appear here...'}
        </Paper>
      </Box>
    </Box>
  );
};

const JsonToFlow = () => {
  const content = (
    <>
      <Typography variant="h2">Free JSON to Flow Type Converter</Typography>
      <Typography variant="body1">
        Paste a JSON sample to instantly generate matching Flow exact object types (<code>{'{|'} ... {'|}'}</code>).
        Nested objects become their own named types, arrays become typed arrays, and fields that are missing or
        null in your sample are marked optional or nullable automatically.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste any JSON object or array into the input box, or click &quot;Load Example&quot; to see a sample run.
        The converter parses your JSON, infers a type shape from the values it finds, and generates one Flow
        type per object level — nested objects are pulled out into their own type named after the parent
        property, so the output stays readable even for deeply nested payloads.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Given <code>{'{'}"name": "Ann", "age": 30, "tags": ["a","b"], "address": {'{'}"city": "NYC", "zip": null{'}'}{'}'}</code>,
        the tool generates a <code>RootAddress</code> exact object type for the nested object plus a{' '}
        <code>Root</code> type referencing it, with <code>tags: string[]</code> and a leading <code>?</code> on
        any field that was ever seen as <code>null</code>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Typing an API response quickly in a Flow-typed codebase without hand-writing types field by field.</li>
          <li>Bootstrapping types for a third-party webhook payload or config file.</li>
          <li>Checking at a glance which fields in a JSON sample are optional or nullable.</li>
          <li>Prototyping types before deciding whether to migrate a module to TypeScript instead.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why does the output use exact object types ({'{|'} ... {'|}'})?</Typography>
      <Typography variant="body1">
        Exact object types reject extra properties that aren&apos;t declared, which best matches what was
        actually observed in your sample. If you need Flow&apos;s more permissive inexact objects instead, just
        remove the <code>|</code> from each opening and closing brace after copying the output.
      </Typography>
      <Typography variant="h3">How are optional and nullable fields different in Flow?</Typography>
      <Typography variant="body1">
        A trailing <code>?</code> on the property name (e.g. <code>zip?: string</code>) marks a field optional —
        it can be entirely missing. A leading <code>?</code> on the type itself (e.g. <code>?string</code>) marks
        it nullable — the key is present but its value can be <code>null</code>. This tool applies each based on
        what it actually saw in your sample.
      </Typography>
      <Typography variant="h3">Is my JSON uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — parsing and type generation happen entirely client-side in your browser. Nothing you paste is sent
        to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/json-to-flow" content={content}>
      <JsonToFlowContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default JsonToFlow;
