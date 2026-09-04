'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { parseJsonSample } from './jsonTransform/inferShape';
import { emitGraphQL } from './jsonTransform/toGraphQL';

const SAMPLE = '{\n  "name": "Ann",\n  "age": 30,\n  "tags": ["a", "b"],\n  "address": { "city": "NYC", "zip": null }\n}';

const JsonToGraphQLContent = () => {
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
    setOutput(emitGraphQL(root, 'Root'));
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
          <Typography variant="subtitle1" fontWeight="600">GraphQL SDL</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          component="pre"
          sx={{ p: 2, minHeight: 395, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {output || 'GraphQL type definitions will appear here...'}
        </Paper>
      </Box>
    </Box>
  );
};

const JsonToGraphQL = () => {
  const content = (
    <>
      <Typography variant="h2">Free JSON to GraphQL Schema Converter</Typography>
      <Typography variant="body1">
        Paste a JSON sample to instantly generate matching GraphQL SDL <code>type</code> definitions.
        Nested objects become their own named types, arrays become list types, and fields that are present
        and non-nullable in every sample get GraphQL's <code>!</code> non-null suffix automatically.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste any JSON object into the input box, or click &quot;Load Example&quot; to see a sample run. The
        converter parses your JSON, infers a GraphQL scalar or object type for every field, and generates
        one SDL <code>type</code> per object level — nested objects are pulled out into their own type named
        after the parent property.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Given <code>{'{'}"name": "Ann", "age": 30, "tags": ["a","b"], "address": {'{'}"city": "NYC", "zip": null{'}'}{'}'}</code>,
        the tool generates a <code>RootAddress</code> type for the nested object plus a <code>Root</code>
        type referencing it, with <code>name: String!</code>, <code>age: Int!</code>,
        <code>tags: [String!]!</code>, and <code>zip: String</code> (no <code>!</code>, since it was
        observed as null).
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Bootstrapping a GraphQL schema for a new API from an existing REST response.</li>
          <li>Scaffolding SDL types for a GraphQL gateway wrapping an existing JSON-based service.</li>
          <li>Checking at a glance which fields should be non-null in a GraphQL schema design.</li>
          <li>Speeding up schema-first GraphQL development by starting from real sample data.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">When does a field get the ! non-null suffix?</Typography>
      <Typography variant="body1">
        A field gets GraphQL's <code>!</code> suffix only when it is both never missing (not optional) and
        never observed as <code>null</code> (not nullable) across your sample. If either condition fails,
        the field is left nullable, matching GraphQL's stricter definition of non-null.
      </Typography>
      <Typography variant="h3">What type is used for fields with unknown or mixed types?</Typography>
      <Typography variant="body1">
        Since GraphQL has no built-in "any" scalar, fields with an unrecognized or mixed type map to a
        custom <code>JSON</code> scalar, and a <code>scalar JSON</code> declaration is added at the top of
        the output automatically whenever it's needed.
      </Typography>
      <Typography variant="h3">Is my JSON uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — parsing and schema generation happen entirely client-side in your browser. Nothing you paste is
        sent to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/json-to-graphql" content={content}>
      <JsonToGraphQLContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default JsonToGraphQL;
