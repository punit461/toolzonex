'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { parseJsonSample } from './jsonTransform/inferShape';
import { emitJSDoc } from './jsonTransform/toJSDoc';

const SAMPLE = '{\n  "name": "Ann",\n  "age": 30,\n  "tags": ["a", "b"],\n  "address": { "city": "NYC", "zip": null }\n}';

const JsonToJSDocContent = () => {
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
    setOutput(emitJSDoc(root, 'Root'));
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
          <Typography variant="subtitle1" fontWeight="600">JSDoc @typedef</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          component="pre"
          sx={{ p: 2, minHeight: 395, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {output || 'JSDoc @typedef blocks will appear here...'}
        </Paper>
      </Box>
    </Box>
  );
};

const JsonToJSDoc = () => {
  const content = (
    <>
      <Typography variant="h2">Free JSON to JSDoc Converter</Typography>
      <Typography variant="body1">
        Paste a JSON sample to instantly generate matching JSDoc <code>@typedef</code> blocks — handy for
        adding editor autocomplete and type-checking to plain JavaScript without adopting TypeScript.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste any JSON object or array, or click &quot;Load Example.&quot; The tool infers a type shape and
        emits one <code>@typedef {'{'}Object{'}'}</code> block per object level, listing each property with
        <code>@property</code>. Nested objects get their own named typedef, arrays become
        <code>Type[]</code>, optional properties use the bracketed <code>[name]</code> syntax JSDoc expects,
        and nullable properties get a leading <code>?</code> on their type.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Given <code>{'{'}"name": "Ann", "age": 30, "tags": ["a","b"], "address": {'{'}"city": "NYC", "zip": null{'}'}{'}'}</code>,
        the tool emits a <code>RootAddress</code> typedef whose <code>zip</code> property is documented as
        <code>{'{'}?string{'}'} zip</code>, plus a <code>Root</code> typedef whose <code>tags</code> property is
        <code>{'{'}string[]{'}'} tags</code>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Documenting the shape of a function's parameter or return value in plain JavaScript.</li>
          <li>Getting editor autocomplete and basic type checking via <code>// @ts-check</code> without migrating to TypeScript.</li>
          <li>Adding self-documenting types to a JSON config or API payload consumed by a JS codebase.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How do optional properties look in the output?</Typography>
      <Typography variant="body1">
        Following standard JSDoc convention, an optional property's name is wrapped in brackets, like
        <code>@property {'{'}string{'}'} [zip]</code>, rather than using a separate optional-type marker.
      </Typography>
      <Typography variant="h3">Can I use these typedefs with @ts-check?</Typography>
      <Typography variant="body1">
        Yes — paste the generated <code>@typedef</code> blocks above a function and reference the type name in
        a <code>@param {'{'}Root{'}'}</code> or <code>@returns {'{'}Root{'}'}</code> tag; VS Code and other
        TypeScript-powered editors will pick it up automatically.
      </Typography>
      <Typography variant="h3">Is my JSON uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — parsing and typedef generation happen entirely client-side in your browser. Nothing you paste is
        sent to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/json-to-jsdoc" content={content}>
      <JsonToJSDocContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default JsonToJSDoc;
