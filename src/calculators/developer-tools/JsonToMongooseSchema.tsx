'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { parseJsonSample } from './jsonTransform/inferShape';
import { emitMongooseSchema } from './jsonTransform/toMongooseSchema';

const SAMPLE = '{\n  "name": "Ann",\n  "age": 30,\n  "createdAt": "2024-01-15T10:00:00Z",\n  "tags": ["a", "b"],\n  "address": { "city": "NYC", "zip": null }\n}';

const JsonToMongooseSchemaContent = () => {
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
    setOutput(emitMongooseSchema(root, 'Root'));
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
          <Typography variant="subtitle1" fontWeight="600">Mongoose Schema</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          component="pre"
          sx={{ p: 2, minHeight: 395, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {output || 'Mongoose schema definition will appear here...'}
        </Paper>
      </Box>
    </Box>
  );
};

const JsonToMongooseSchema = () => {
  const content = (
    <>
      <Typography variant="h2">Free JSON to Mongoose Schema Converter</Typography>
      <Typography variant="body1">
        Paste a JSON sample to instantly generate a matching Mongoose <code>Schema</code> definition for
        MongoDB. Nested objects are described inline, arrays map to array field definitions, and fields
        that are present in every sample are marked <code>required: true</code> automatically.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste any JSON object into the input box, or click &quot;Load Example&quot; to see a sample run. The
        converter parses your JSON, infers a field shape from the values it finds, and generates a single
        <code>new mongoose.Schema({'{'}...{'}'})</code> call with nested objects described inline as
        sub-documents.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Given <code>{'{'}"name": "Ann", "createdAt": "2024-01-15T10:00:00Z", "tags": ["a","b"], "address": {'{'}"city": "NYC"{'}'}{'}'}</code>,
        the tool maps <code>name</code> to <code>{'{'} type: String, required: true {'}'}</code>,
        detects the ISO-8601-looking string in <code>createdAt</code> and maps it to <code>Date</code>, maps
        <code>tags</code> to <code>[String]</code>, and describes <code>address</code> as an inline nested
        schema object.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Bootstrapping a Mongoose model for a new Express/MongoDB API from a sample payload.</li>
          <li>Converting a REST API response shape into a matching MongoDB collection schema.</li>
          <li>Getting a starting point for required fields based on what's always present in your data.</li>
          <li>Speeding up backend scaffolding for Node.js projects that use Mongoose as their ODM.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How does the tool decide a string should be a Date?</Typography>
      <Typography variant="body1">
        If a string value in your sample looks like an ISO-8601 timestamp (for example
        <code>2024-01-15T10:00:00Z</code>), the field is mapped to Mongoose's <code>Date</code> type instead
        of <code>String</code>. Ordinary strings always map to <code>String</code>.
      </Typography>
      <Typography variant="h3">What type is used for fields with mixed or unknown types?</Typography>
      <Typography variant="body1">
        Fields whose type can't be confidently inferred fall back to
        <code>mongoose.Schema.Types.Mixed</code>, Mongoose's catch-all type for arbitrary values.
      </Typography>
      <Typography variant="h3">Is my JSON uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — parsing and schema generation happen entirely client-side in your browser. Nothing you paste is
        sent to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/json-to-mongoose-schema" content={content}>
      <JsonToMongooseSchemaContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default JsonToMongooseSchema;
