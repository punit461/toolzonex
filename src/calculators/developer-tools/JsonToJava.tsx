'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { parseJsonSample } from './jsonTransform/inferShape';
import { emitJava } from './jsonTransform/toJava';

const SAMPLE = '{\n  "name": "Ann",\n  "age": 30,\n  "tags": ["a", "b"],\n  "address": { "city": "NYC", "zip": null }\n}';

const JsonToJavaContent = () => {
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
    setOutput(emitJava(root, 'Root'));
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
          <Typography variant="subtitle1" fontWeight="600">Java POJO</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          component="pre"
          sx={{ p: 2, minHeight: 395, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {output || 'Java class definitions will appear here...'}
        </Paper>
      </Box>
    </Box>
  );
};

const JsonToJava = () => {
  const content = (
    <>
      <Typography variant="h2">Free JSON to Java POJO Converter</Typography>
      <Typography variant="body1">
        Paste a JSON sample to instantly generate matching Java classes with private fields, getters, and
        setters — a classic POJO for every object level in your JSON.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste any JSON object or array, or click &quot;Load Example.&quot; The tool infers a type shape and
        emits one public class per object level, with camelCase field names, matching getter/setter methods,
        <code>List&lt;T&gt;</code> for arrays (note the <code>java.util.List</code> import called out in a
        comment when used), and boxed types like <code>Integer</code> or <code>Boolean</code> instead of
        primitives for any field that's optional or nullable in your sample.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Given <code>{'{'}"name": "Ann", "age": 30, "tags": ["a","b"], "address": {'{'}"city": "NYC", "zip": null{'}'}{'}'}</code>,
        the tool generates a <code>RootAddress</code> class with private <code>city</code> and <code>zip</code>
        fields plus getters/setters, and a <code>Root</code> class whose <code>tags</code> field is typed
        <code>List&lt;String&gt;</code>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Scaffolding DTOs for a Spring Boot or Jackson-based REST API from a sample payload.</li>
          <li>Generating request/response POJOs quickly instead of writing boilerplate getters/setters by hand.</li>
          <li>Bootstrapping model classes for an Android app that consumes a JSON API.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why do some fields use boxed types like Integer instead of int?</Typography>
      <Typography variant="body1">
        Java's primitive types can't represent <code>null</code>. Any field that's missing from at least one
        sample or was ever <code>null</code> is generated with its boxed equivalent (<code>Integer</code>,
        <code>Double</code>, <code>Boolean</code>) so the class can actually represent the absence of a value.
      </Typography>
      <Typography variant="h3">Does this work with Jackson or Gson out of the box?</Typography>
      <Typography variant="body1">
        The generated classes follow standard JavaBean conventions (private fields with public getters and
        setters), which both Jackson and Gson can bind to by default without extra annotations, as long as
        field names match your JSON keys.
      </Typography>
      <Typography variant="h3">Is my JSON uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — parsing and class generation happen entirely client-side in your browser. Nothing you paste is
        sent to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/json-to-java" content={content}>
      <JsonToJavaContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default JsonToJava;
