'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { parseJsonSample } from './jsonTransform/inferShape';
import { emitBigQuerySchema } from './jsonTransform/toBigQuerySchema';

const SAMPLE = '{\n  "name": "Ann",\n  "age": 30,\n  "tags": ["a", "b"],\n  "address": { "city": "NYC", "zip": null }\n}';

const JsonToBigQuerySchemaContent = () => {
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
    setOutput(emitBigQuerySchema(root, 'root'));
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
          <Typography variant="subtitle1" fontWeight="600">BigQuery Schema</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          component="pre"
          sx={{ p: 2, minHeight: 395, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {output || 'BigQuery table schema JSON will appear here...'}
        </Paper>
      </Box>
    </Box>
  );
};

const JsonToBigQuerySchema = () => {
  const content = (
    <>
      <Typography variant="h2">Free JSON to BigQuery Schema Converter</Typography>
      <Typography variant="body1">
        Paste a JSON sample to instantly generate a matching Google BigQuery table schema, in the JSON array
        format BigQuery's load jobs and client libraries expect. Nested objects become <code>RECORD</code>
        fields with a nested <code>fields</code> array, and arrays get the <code>REPEATED</code> mode.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste any JSON object into the input box, or click &quot;Load Example&quot; to see a sample run. The
        converter parses your JSON, maps each field to a BigQuery type and mode, and generates a
        <code>[{'{'} "name": ..., "type": ..., "mode": ... {'}'}]</code> array you can pass directly to
        <code>bq load --schema</code> or the BigQuery client libraries.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Given <code>{'{'}"name": "Ann", "age": 30, "tags": ["a","b"], "address": {'{'}"city": "NYC", "zip": null{'}'}{'}'}</code>,
        the tool generates a <code>name</code> field of type <code>STRING</code> with mode
        <code>REQUIRED</code>, an <code>age</code> field of type <code>INTEGER</code>, a <code>tags</code>
        field of type <code>STRING</code> with mode <code>REPEATED</code>, and an <code>address</code> field
        of type <code>RECORD</code> with mode <code>NULLABLE</code> containing nested <code>city</code> and
        <code>zip</code> fields.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Preparing a schema file for a <code>bq load</code> job from a sample JSON export.</li>
          <li>Bootstrapping a BigQuery table definition for a new data pipeline destination.</li>
          <li>Checking at a glance how nested JSON will map to BigQuery's RECORD/REPEATED model.</li>
          <li>Speeding up ETL development by generating a first-draft schema from real sample rows.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is the REPEATED mode chosen?</Typography>
      <Typography variant="body1">
        Any field backed by a JSON array is given BigQuery's <code>REPEATED</code> mode, since BigQuery's
        field mode is mutually exclusive — a repeated field can't also be marked <code>NULLABLE</code> or
        <code>REQUIRED</code>. Object and scalar fields get <code>NULLABLE</code> if they were ever missing
        or null, and <code>REQUIRED</code> otherwise.
      </Typography>
      <Typography variant="h3">How are nested objects represented?</Typography>
      <Typography variant="body1">
        A nested object becomes a field with <code>"type": "RECORD"</code> and a nested
        <code>"fields"</code> array describing its own properties, matching BigQuery's native representation
        of struct-like columns.
      </Typography>
      <Typography variant="h3">Is my JSON uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — parsing and schema generation happen entirely client-side in your browser. Nothing you paste is
        sent to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/json-to-bigquery-schema" content={content}>
      <JsonToBigQuerySchemaContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default JsonToBigQuerySchema;
