'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { parseJsonSample } from './jsonTransform/inferShape';
import { emitReactPropTypes } from './jsonTransform/toReactPropTypes';

const SAMPLE = '{\n  "name": "Ann",\n  "age": 30,\n  "tags": ["a", "b"],\n  "address": { "city": "NYC", "zip": null }\n}';

const JsonToReactPropTypesContent = () => {
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
    setOutput(emitReactPropTypes(root, 'MyComponent'));
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
          <Typography variant="subtitle1" fontWeight="600">React PropTypes</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          component="pre"
          sx={{ p: 2, minHeight: 395, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {output || 'PropTypes definitions will appear here...'}
        </Paper>
      </Box>
    </Box>
  );
};

const JsonToReactPropTypes = () => {
  const content = (
    <>
      <Typography variant="h2">Free JSON to React PropTypes Converter</Typography>
      <Typography variant="body1">
        Paste a JSON sample to instantly generate a matching <code>propTypes</code> object for a React
        component built with the <code>prop-types</code> package. Nested objects become
        <code>PropTypes.shape({'{'}...{'}'})</code>, arrays become <code>PropTypes.arrayOf</code>, and fields
        that are present in every sample are marked <code>.isRequired</code> automatically.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste any JSON object into the input box, or click &quot;Load Example&quot; to see a sample run. The
        converter parses your JSON, infers a prop type for every field, and generates a single
        <code>MyComponent.propTypes = {'{'}...{'}'}</code> assignment with nested objects described inline as
        shapes.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Given <code>{'{'}"name": "Ann", "tags": ["a","b"], "address": {'{'}"city": "NYC", "zip": null{'}'}{'}'}</code>,
        the tool generates <code>name: PropTypes.string.isRequired</code>,
        <code>tags: PropTypes.arrayOf(PropTypes.string).isRequired</code>, and an
        <code>address: PropTypes.shape({'{'} city: PropTypes.string.isRequired, zip: PropTypes.string {'}'})</code>
        entry for the nested object.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Adding runtime prop validation to a plain JavaScript React component quickly.</li>
          <li>Documenting the expected shape of props for a component that receives API data.</li>
          <li>Bootstrapping propTypes for legacy React codebases that haven't migrated to TypeScript.</li>
          <li>Checking at a glance which props should be required versus optional.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is .isRequired decided?</Typography>
      <Typography variant="body1">
        A field gets <code>.isRequired</code> whenever it was present in every sample object you pasted. If
        you paste an array of objects and a property is missing from at least one of them, it's left without
        <code>.isRequired</code> instead.
      </Typography>
      <Typography variant="h3">Do I need to rename MyComponent in the output?</Typography>
      <Typography variant="body1">
        Yes — the generated code uses <code>MyComponent</code> as a placeholder. Replace it with the actual
        name of the component you're adding prop types to before pasting it into your project.
      </Typography>
      <Typography variant="h3">Is my JSON uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — parsing and PropTypes generation happen entirely client-side in your browser. Nothing you paste
        is sent to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/json-to-react-proptypes" content={content}>
      <JsonToReactPropTypesContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default JsonToReactPropTypes;
