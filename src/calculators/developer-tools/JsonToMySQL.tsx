'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { parseJsonSample } from './jsonTransform/inferShape';
import { emitMySQL } from './jsonTransform/toMySQL';

const SAMPLE = '{\n  "name": "Ann",\n  "age": 30,\n  "signedUpAt": "2024-01-15T10:00:00Z",\n  "tags": ["a", "b"],\n  "address": { "city": "NYC", "zip": null }\n}';

const JsonToMySQLContent = () => {
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
    setOutput(emitMySQL(root, 'root'));
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
          <Typography variant="subtitle1" fontWeight="600">MySQL CREATE TABLE</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          component="pre"
          sx={{ p: 2, minHeight: 395, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {output || 'CREATE TABLE statements will appear here...'}
        </Paper>
      </Box>
    </Box>
  );
};

const JsonToMySQL = () => {
  const content = (
    <>
      <Typography variant="h2">Free JSON to MySQL Converter</Typography>
      <Typography variant="body1">
        Paste a JSON sample to instantly generate matching MySQL <code>CREATE TABLE</code> statements.
        Nested objects become separate tables with a foreign-key comment describing the relationship, and
        columns are marked <code>NULL</code> or <code>NOT NULL</code> based on what your sample shows.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste any JSON object into the input box, or click &quot;Load Example&quot; to see a sample run. The
        converter parses your JSON, infers a column type for every scalar field, and generates one
        <code>CREATE TABLE</code> statement for the top-level object plus one additional statement for every
        nested object it finds. Arrays of primitive values are called out in a SQL comment noting that a
        separate join table would be needed for proper normalization — this tool does not attempt to build
        those join tables automatically.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Given <code>{'{'}"name": "Ann", "signedUpAt": "2024-01-15T10:00:00Z", "tags": ["a","b"], "address": {'{'}"city": "NYC"{'}'}{'}'}</code>,
        the tool generates a <code>root</code> table with <code>name VARCHAR(255) NOT NULL</code> and
        <code>signed_up_at DATETIME NOT NULL</code>, a comment noting <code>tags</code> would need a join
        table, and a separate <code>root_address</code> table with a foreign key column referencing
        <code>root.id</code>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Sketching out a relational schema quickly from an existing API response or export.</li>
          <li>Getting a starting point for migrating a document-shaped payload into MySQL.</li>
          <li>Seeing at a glance which nested objects will need their own tables and foreign keys.</li>
          <li>Speeding up database design reviews by generating a first draft to refine by hand.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does this tool fully normalize my data?</Typography>
      <Typography variant="body1">
        No — proper normalization (join tables for arrays, choosing the right key types, indexes, and so on)
        is out of scope for an automated converter. Nested objects get their own table with a clearly
        commented foreign-key relationship, and arrays of primitives get a SQL comment flagging that a join
        table would be needed, so you can finish the design by hand.
      </Typography>
      <Typography variant="h3">How are column types chosen?</Typography>
      <Typography variant="body1">
        Strings map to <code>VARCHAR(255)</code> unless they look like an ISO-8601 timestamp, in which case
        they map to <code>DATETIME</code>. Whole numbers map to <code>BIGINT</code>, decimals map to
        <code>DOUBLE</code>, and booleans map to <code>BOOLEAN</code>.
      </Typography>
      <Typography variant="h3">Is my JSON uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — parsing and SQL generation happen entirely client-side in your browser. Nothing you paste is
        sent to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/json-to-mysql" content={content}>
      <JsonToMySQLContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default JsonToMySQL;
