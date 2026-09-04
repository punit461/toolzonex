'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { parseJsonSample } from './jsonTransform/inferShape';
import { emitIoTs } from './jsonTransform/toIoTs';

const SAMPLE = '{\n  "name": "Ann",\n  "age": 30,\n  "tags": ["a", "b"],\n  "address": { "city": "NYC", "zip": null }\n}';

const JsonToIoTsContent = () => {
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
    setOutput(emitIoTs(root, 'Root'));
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
          <Typography variant="subtitle1" fontWeight="600">io-ts Codec</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          component="pre"
          sx={{ p: 2, minHeight: 395, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {output || 'io-ts codec definitions will appear here...'}
        </Paper>
      </Box>
    </Box>
  );
};

const JsonToIoTs = () => {
  const content = (
    <>
      <Typography variant="h2">Free JSON to io-ts Codec Converter</Typography>
      <Typography variant="body1">
        Paste a JSON sample to instantly generate a matching <a href="https://github.com/gcanti/io-ts" target="_blank" rel="noopener noreferrer">io-ts</a> codec,
        following its convention of declaring required and optional properties separately.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste any JSON object or array, or click &quot;Load Example.&quot; The tool infers a type shape and
        emits a <code>t.type({'{'}...{'}'})</code> codec for every object whose properties are all required. If
        an object has a mix of required and optional properties, it emits
        <code>t.intersection([t.type({'{'}...{'}'}), t.partial({'{'}...{'}'})])</code> instead — the standard
        io-ts pattern, since <code>t.type</code> alone can't express optional keys. Arrays become
        <code>t.array(...)</code>, and nullable fields are wrapped in <code>t.union([T, t.null])</code>.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Given <code>{'{'}"name": "Ann", "age": 30, "tags": ["a","b"], "address": {'{'}"city": "NYC", "zip": null{'}'}{'}'}</code>,
        the tool emits <code>const RootAddress = t.type({'{'} city: t.string, zip: t.null {'}'});</code> and a
        <code>Root</code> codec referencing it, with <code>tags: t.array(t.string)</code>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Validating API boundary data at runtime in an fp-ts / io-ts codebase.</li>
          <li>Getting the required/optional split right without hand-writing t.intersection boilerplate.</li>
          <li>Deriving a static TypeScript type from the codec with io-ts's <code>t.TypeOf&lt;typeof Codec&gt;</code>.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why does io-ts need t.intersection for optional fields?</Typography>
      <Typography variant="body1">
        Unlike Zod's per-field <code>.optional()</code>, io-ts models optionality at the object level:
        <code>t.type</code> declares required properties and <code>t.partial</code> declares optional ones. To
        combine both in a single object, io-ts's documented pattern is to intersect the two codecs.
      </Typography>
      <Typography variant="h3">Does the generated code include an io-ts import?</Typography>
      <Typography variant="body1">
        No — only the codec declarations are generated. Add
        <code>import * as t from &quot;io-ts&quot;;</code> at the top of the file where you paste the output.
      </Typography>
      <Typography variant="h3">Is my JSON uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — parsing and codec generation happen entirely client-side in your browser. Nothing you paste is
        sent to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/json-to-io-ts" content={content}>
      <JsonToIoTsContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default JsonToIoTs;
