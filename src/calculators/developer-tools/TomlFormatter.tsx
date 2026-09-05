'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { parse, stringify } from 'smol-toml';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const SAMPLE = 'title="Example"\n[owner]\nname="Ann"\nactive=true\n[owner.address]\ncity="NYC"\n';

const TomlFormatterContent = () => {
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
      setOutput(stringify(parsed));
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
        <Typography variant="subtitle1" fontWeight="600">Raw TOML Input</Typography>
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
          <Typography variant="subtitle1" fontWeight="600">Formatted TOML</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          component="pre"
          sx={{ p: 2, minHeight: 395, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {output || 'Formatted TOML will appear here...'}
        </Paper>
      </Box>
    </Box>
  );
};

const TomlFormatter = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the TOML Formatter</Typography>
      <Typography variant="body1">
        Paste any TOML document into the input box. The formatter parses it fully, then re-serializes it
        with clean, consistent spacing and structure — normalizing indentation, key spacing, and table
        headers regardless of how inconsistently the original file was written. If your TOML has a syntax
        error, a friendly error message is shown instead of a crash, so you can fix the issue and keep
        going.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Cramped input like <code>{'title="Example"\n[owner]\nname="Ann"'}</code> is reformatted with
        consistent spacing around the equals signs and table headers, producing a clean, readable TOML
        document with exactly the same data.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Cleaning up a <code>Cargo.toml</code> or <code>pyproject.toml</code> file with inconsistent formatting.</li>
          <li>Normalizing TOML config files before committing them to a shared repository.</li>
          <li>Verifying a TOML document is syntactically valid by checking that it parses and reformats without error.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the TOML to JSON or JSON to TOML converters?</strong> Our <a href="/developer-tools/toml-to-json">TOML to JSON</a> and <a href="/developer-tools/json-to-toml">JSON to TOML</a> tools convert TOML TO or FROM a completely different format. This TOML Formatter stays within TOML the whole time — it just reformats your TOML input back into clean, consistent TOML output, without ever changing formats.</li>
          <li><strong>Does formatting change the data or key order?</strong> No — parsing and re-serializing preserves all keys, values, and their nesting structure exactly. Only whitespace, indentation, and table-header presentation are normalized for consistency.</li>
          <li><strong>Is my TOML uploaded anywhere?</strong> No — parsing and formatting happen entirely client-side in your browser. Nothing you paste is sent to a server.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/toml-formatter" content={content}>
      <TomlFormatterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TomlFormatter;
