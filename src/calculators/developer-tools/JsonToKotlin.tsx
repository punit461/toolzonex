'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { parseJsonSample } from './jsonTransform/inferShape';
import { emitKotlin } from './jsonTransform/toKotlin';

const SAMPLE = '{\n  "name": "Ann",\n  "age": 30,\n  "tags": ["a", "b"],\n  "address": { "city": "NYC", "zip": null }\n}';

const JsonToKotlinContent = () => {
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
    setOutput(emitKotlin(root, 'Root'));
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
          <Typography variant="subtitle1" fontWeight="600">Kotlin Data Classes</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          component="pre"
          sx={{ p: 2, minHeight: 395, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {output || 'Kotlin data class definitions will appear here...'}
        </Paper>
      </Box>
    </Box>
  );
};

const JsonToKotlin = () => {
  const content = (
    <>
      <Typography variant="h2">Free JSON to Kotlin Data Class Converter</Typography>
      <Typography variant="body1">
        Paste a JSON sample to instantly generate matching Kotlin <code>data class</code> declarations, with
        nullable properties and default values inferred straight from your data.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste any JSON object or array, or click &quot;Load Example.&quot; The tool infers a type shape and
        emits one <code>data class</code> per object level, with camelCase constructor properties, nested
        objects pulled out into their own named data class, <code>List&lt;T&gt;</code> for arrays, and a
        nullable type (<code>Type?</code>) with a <code>= null</code> default for any property that's optional
        or nullable in your sample.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Given <code>{'{'}"name": "Ann", "age": 30, "tags": ["a","b"], "address": {'{'}"city": "NYC", "zip": null{'}'}{'}'}</code>,
        the tool emits <code>data class RootAddress(val city: String, val zip: String? = null)</code> and a
        <code>Root</code> data class referencing it, with <code>tags: List&lt;String&gt;</code>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Modeling API responses for Retrofit or Ktor clients in an Android or Kotlin backend project.</li>
          <li>Generating immutable data classes for use with kotlinx.serialization or Moshi.</li>
          <li>Bootstrapping types quickly from a sample payload instead of writing them by hand.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why do some properties get a default value of null?</Typography>
      <Typography variant="body1">
        Giving optional or nullable properties a <code>= null</code> default lets you construct instances of
        the data class without supplying every field, which mirrors how the property might legitimately be
        absent from the JSON.
      </Typography>
      <Typography variant="h3">Does this work with kotlinx.serialization?</Typography>
      <Typography variant="body1">
        The generated data classes are plain Kotlin and map cleanly onto kotlinx.serialization or Moshi models
        — you may want to add <code>@Serializable</code> or <code>@JsonClass</code> annotations depending on
        which library you use.
      </Typography>
      <Typography variant="h3">Is my JSON uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — parsing and code generation happen entirely client-side in your browser. Nothing you paste is
        sent to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/json-to-kotlin" content={content}>
      <JsonToKotlinContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default JsonToKotlin;
