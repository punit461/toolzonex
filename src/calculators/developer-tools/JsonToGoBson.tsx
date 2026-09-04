'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { parseJsonSample } from './jsonTransform/inferShape';
import { emitGoBson } from './jsonTransform/toGoBson';

const SAMPLE = '{\n  "name": "Ann",\n  "age": 30,\n  "tags": ["a", "b"],\n  "address": { "city": "NYC", "zip": null }\n}';

const JsonToGoBsonContent = () => {
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
    setOutput(emitGoBson(root, 'Root'));
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
          <Typography variant="subtitle1" fontWeight="600">Go Struct (BSON + JSON)</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          component="pre"
          sx={{ p: 2, minHeight: 395, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {output || 'Go struct definitions will appear here...'}
        </Paper>
      </Box>
    </Box>
  );
};

const JsonToGoBson = () => {
  const content = (
    <>
      <Typography variant="h2">Free JSON to Go BSON Struct Converter</Typography>
      <Typography variant="body1">
        Paste a JSON sample to generate Go structs tagged for both <code>encoding/json</code> and the MongoDB
        Go driver — each field gets a <code>json:&quot;...&quot;</code> tag alongside a
        <code>bson:&quot;...&quot;</code> tag, so the same struct can decode an API payload and read or write a
        MongoDB document.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste any JSON object or array, or click &quot;Load Example.&quot; The tool builds one struct per
        object level with PascalCase field names, nested objects as their own named structs, slices for
        arrays, and pointer types for fields that are optional or nullable in your sample — exactly like the
        plain Go Struct converter, but with a <code>bson</code> tag added next to every <code>json</code> tag.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Given <code>{'{'}"name": "Ann", "age": 30, "tags": ["a","b"], "address": {'{'}"city": "NYC", "zip": null{'}'}{'}'}</code>,
        the <code>Name</code> field is tagged
        <code>`json:&quot;name&quot; bson:&quot;name&quot;`</code>, so the struct works whether it's decoded
        from a JSON request body or a document returned by <code>mongo.Collection.FindOne</code>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Modeling a MongoDB collection's documents as Go structs for the official Go driver.</li>
          <li>Sharing one struct between an HTTP API layer and a MongoDB persistence layer without duplicating tags by hand.</li>
          <li>Scaffolding types quickly from a sample document exported from a MongoDB collection.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why include both json and bson tags?</Typography>
      <Typography variant="body1">
        In practice, most Go services that talk to MongoDB also expose or consume JSON over HTTP using the
        same struct. Adding both tags up front means you don't have to double back and add the missing one
        later.
      </Typography>
      <Typography variant="h3">Does this work with the official MongoDB Go driver?</Typography>
      <Typography variant="body1">
        Yes — the <code>bson:&quot;...&quot;</code> tag format matches what <code>go.mongodb.org/mongo-driver</code>
        expects for marshaling and unmarshaling BSON documents.
      </Typography>
      <Typography variant="h3">Is my JSON uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — parsing and struct generation happen entirely client-side in your browser. Nothing you paste is
        sent to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/json-to-go-bson" content={content}>
      <JsonToGoBsonContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default JsonToGoBson;
