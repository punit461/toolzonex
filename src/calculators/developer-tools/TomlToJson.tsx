'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { parse } from 'smol-toml';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const SAMPLE = 'title = "Example"\n\n[owner]\nname = "Ann"\nactive = true\n\n[owner.address]\ncity = "NYC"\n';

const TomlToJsonContent = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }
    try {
      const parsed = parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (err) {
      setOutput('');
      setError(err instanceof Error ? err.message : 'Invalid TOML');
    }
  }, [input]);

  const copyToClipboard = async () => {
    if (output) await navigator.clipboard.writeText(output);
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" fontWeight="600">Paste TOML</Typography>
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
          <Typography variant="subtitle1" fontWeight="600">JSON Output</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          component="pre"
          sx={{ p: 2, minHeight: 395, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {output || 'JSON output will appear here...'}
        </Paper>
      </Box>
    </Box>
  );
};

const TomlToJson = () => {
  const content = (
    <>
      <Typography variant="h2">Free TOML to JSON Converter</Typography>
      <Typography variant="body1">
        Paste a TOML document to instantly convert it into equivalent, pretty-printed JSON. Tables, nested
        tables, arrays, and inline values all map cleanly onto their JSON counterparts.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste any TOML configuration into the input box, or click &quot;Load Example&quot; to see a sample run.
        The converter parses your TOML and renders the resulting object as formatted JSON, updating live as
        you type.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Given a TOML file with a top-level <code>title</code> key and an <code>[owner]</code> table containing
        a nested <code>[owner.address]</code> table, the tool produces a JSON object with <code>title</code> at
        the root and an <code>owner</code> object whose <code>address</code> property is itself a nested
        object — exactly mirroring the TOML table hierarchy.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Converting a Rust <code>Cargo.toml</code> or Python <code>pyproject.toml</code> to JSON for tooling that only reads JSON.</li>
          <li>Inspecting a TOML config's structure quickly by viewing it as JSON.</li>
          <li>Feeding a TOML-based config into a JSON schema validator or JSON-only API.</li>
          <li>Debugging TOML parsing issues by comparing the parsed structure against expectations.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does this handle arrays of tables and nested tables correctly?</Typography>
      <Typography variant="body1">
        Yes — standard TOML constructs like arrays of tables (<code>[[items]]</code>), nested tables, and
        inline tables convert reliably for typical configuration files. Very unusual or deeply exotic TOML
        structures are rare in practice, but it's worth a quick visual check of the output for anything
        highly nonstandard.
      </Typography>
      <Typography variant="h3">How are TOML dates and times represented in JSON?</Typography>
      <Typography variant="body1">
        JSON has no native date type, so TOML date and datetime values are converted to their ISO 8601 string
        representation in the output.
      </Typography>
      <Typography variant="h3">Is my TOML uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — parsing and conversion happen entirely client-side in your browser. Nothing you paste is sent to
        a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/toml-to-json" content={content}>
      <TomlToJsonContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TomlToJson;
