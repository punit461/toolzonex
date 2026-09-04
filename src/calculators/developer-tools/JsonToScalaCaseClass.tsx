'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { parseJsonSample } from './jsonTransform/inferShape';
import { emitScalaCaseClass } from './jsonTransform/toScalaCaseClass';

const SAMPLE = '{\n  "name": "Ann",\n  "age": 30,\n  "tags": ["a", "b"],\n  "address": { "city": "NYC", "zip": null }\n}';

const JsonToScalaCaseClassContent = () => {
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
    setOutput(emitScalaCaseClass(root, 'Root'));
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
          <Typography variant="subtitle1" fontWeight="600">Scala Case Classes</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          component="pre"
          sx={{ p: 2, minHeight: 395, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {output || 'Scala case class definitions will appear here...'}
        </Paper>
      </Box>
    </Box>
  );
};

const JsonToScalaCaseClass = () => {
  const content = (
    <>
      <Typography variant="h2">Free JSON to Scala Case Class Converter</Typography>
      <Typography variant="body1">
        Paste a JSON sample to instantly generate matching Scala <code>case class</code> declarations, with
        <code>Option[Type]</code> wrapping any field that's optional or nullable in your data.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste any JSON object or array, or click &quot;Load Example.&quot; The tool infers a type shape and
        emits one <code>case class</code> per object level, with camelCase constructor parameters, nested
        objects pulled out into their own named case class, <code>List[T]</code> for arrays, and
        <code>Option[Type]</code> (defaulting to <code>None</code>) for any property that's missing or
        <code>null</code> in your sample.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Given <code>{'{'}"name": "Ann", "age": 30, "tags": ["a","b"], "address": {'{'}"city": "NYC", "zip": null{'}'}{'}'}</code>,
        the tool emits <code>case class RootAddress(city: String, zip: Option[String] = None)</code> and a
        <code>Root</code> case class referencing it, with <code>tags: List[String]</code>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Modeling JSON payloads for circe, play-json, or spray-json in a Scala backend.</li>
          <li>Bootstrapping immutable domain models from a sample API response.</li>
          <li>Getting a starting point for Akka HTTP or Play Framework request/response types.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why does the generator use Option instead of nullable types?</Typography>
      <Typography variant="body1">
        Idiomatic Scala avoids <code>null</code> in favor of <code>Option[T]</code>, which forces callers to
        explicitly handle the absent case. Any field that's missing from at least one sample or was ever
        <code>null</code> is wrapped in <code>Option</code> with a <code>None</code> default.
      </Typography>
      <Typography variant="h3">Will this work directly with circe or play-json?</Typography>
      <Typography variant="body1">
        The generated case classes are plain Scala and are exactly the shape both libraries expect for
        automatic derivation — you'll still need to bring the relevant codec/format derivation into scope for
        your library of choice.
      </Typography>
      <Typography variant="h3">Is my JSON uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — parsing and code generation happen entirely client-side in your browser. Nothing you paste is
        sent to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/json-to-scala-case-class" content={content}>
      <JsonToScalaCaseClassContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default JsonToScalaCaseClass;
