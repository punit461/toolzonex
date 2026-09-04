'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { parseJsonSample } from './jsonTransform/inferShape';
import { emitMobxStateTree } from './jsonTransform/toMobxStateTree';

const SAMPLE = '{\n  "name": "Ann",\n  "age": 30,\n  "tags": ["a", "b"],\n  "address": { "city": "NYC", "zip": null }\n}';

const JsonToMobxStateTreeContent = () => {
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
    setOutput(emitMobxStateTree(root, 'Root'));
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
          <Typography variant="subtitle1" fontWeight="600">MobX-State-Tree Model</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          component="pre"
          sx={{ p: 2, minHeight: 395, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {output || 'MobX-State-Tree model definitions will appear here...'}
        </Paper>
      </Box>
    </Box>
  );
};

const JsonToMobxStateTree = () => {
  const content = (
    <>
      <Typography variant="h2">Free JSON to MobX-State-Tree Converter</Typography>
      <Typography variant="body1">
        Paste a JSON sample to instantly generate matching MobX-State-Tree (MST) <code>types.model</code>
        definitions. Nested objects become their own named models, arrays become <code>types.array</code>,
        and fields that are missing or null in your sample are wrapped in <code>types.maybe</code> or
        <code>types.maybeNull</code> automatically.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste any JSON object or array into the input box, or click &quot;Load Example&quot; to see a sample
        run. The converter parses your JSON, infers a type shape from the values it finds, and generates one
        <code>types.model</code> per object level — nested objects are pulled out into their own model named
        after the parent property so the output stays readable even for deeply nested state trees.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Given <code>{'{'}"name": "Ann", "age": 30, "tags": ["a","b"], "address": {'{'}"city": "NYC", "zip": null{'}'}{'}'}</code>,
        the tool generates a <code>RootAddressModel</code> for the nested object plus a <code>RootModel</code>
        referencing it, with <code>tags: types.array(types.string)</code> and
        <code>zip: types.maybeNull(types.string)</code> reflecting exactly what was observed in the sample.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Bootstrapping MST models for a new MobX-State-Tree store from an API response.</li>
          <li>Scaffolding nested models for a React Native or React app that uses MST for state.</li>
          <li>Checking at a glance which fields in a JSON sample should be optional or nullable in the store.</li>
          <li>Saving time hand-writing <code>types.model</code> boilerplate for large payloads.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What's the difference between types.maybe and types.maybeNull in the output?</Typography>
      <Typography variant="body1">
        <code>types.maybe(T)</code> is used when a property was missing from at least one sample object
        (it allows <code>undefined</code>), while <code>types.maybeNull(T)</code> is used when a property was
        ever observed as <code>null</code>. A field that's both optional and nullable gets wrapped in both.
      </Typography>
      <Typography variant="h3">Are nested objects extracted into separate models?</Typography>
      <Typography variant="body1">
        Yes — every nested object becomes its own <code>const XModel = types.model(&quot;X&quot;, {'{'}...{'}'})</code>
        declaration, named after the property path, and is referenced by name from its parent model.
      </Typography>
      <Typography variant="h3">Is my JSON uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — parsing and model generation happen entirely client-side in your browser. Nothing you paste is
        sent to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/json-to-mobx-state-tree" content={content}>
      <JsonToMobxStateTreeContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default JsonToMobxStateTree;
