'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import yaml from 'js-yaml';
import { stringify } from 'smol-toml';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const SAMPLE = 'title: Example\nowner:\n  name: Ann\n  active: true\n  address:\n    city: NYC\n';

const YamlToTomlContent = () => {
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
      const parsed = yaml.load(input);
      setOutput(stringify(parsed as Record<string, unknown>));
      setError(null);
    } catch (err) {
      setOutput('');
      setError(err instanceof Error ? err.message : 'Invalid YAML');
    }
  }, [input]);

  const copyToClipboard = async () => {
    if (output) await navigator.clipboard.writeText(output);
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" fontWeight="600">Paste YAML</Typography>
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
          <Typography variant="subtitle1" fontWeight="600">TOML Output</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          component="pre"
          sx={{ p: 2, minHeight: 395, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {output || 'TOML output will appear here...'}
        </Paper>
      </Box>
    </Box>
  );
};

const YamlToToml = () => {
  const content = (
    <>
      <Typography variant="h2">Free YAML to TOML Converter</Typography>
      <Typography variant="body1">
        Paste a YAML document to instantly convert it into equivalent TOML. Nested mappings become TOML
        tables and sequences become TOML arrays, so the structure of your config carries over cleanly.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste any YAML configuration into the input box, or click &quot;Load Example&quot; to see a sample run.
        The converter parses your YAML and renders the resulting object as TOML, updating live as you type.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Given a YAML document with a top-level <code>title</code> key and an <code>owner</code> mapping
        containing a nested <code>address</code> mapping, the tool produces TOML with <code>title</code> at
        the root, an <code>[owner]</code> table, and a nested <code>[owner.address]</code> table — matching
        the YAML's structure.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Migrating a Kubernetes-style or Docker Compose YAML config into TOML for a Rust or Python project.</li>
          <li>Converting YAML application settings to a <code>Cargo.toml</code> or <code>pyproject.toml</code> style format.</li>
          <li>Comparing YAML and TOML representations of the same configuration side by side.</li>
          <li>Bootstrapping a TOML config file from an existing YAML one instead of retyping it by hand.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does this handle nested mappings and lists correctly?</Typography>
      <Typography variant="body1">
        Yes — standard YAML mappings, nested mappings, and lists (including lists of mappings, which become
        TOML arrays of tables) convert reliably for typical configuration files. Very unusual YAML features
        like anchors, aliases, or multi-document streams are uncommon in practice, but it's worth a quick
        visual check of the output for anything highly nonstandard.
      </Typography>
      <Typography variant="h3">What happens to YAML null values?</Typography>
      <Typography variant="body1">
        TOML has no native null type, so keys with a <code>null</code> value in the YAML source cannot be
        represented as-is — review the output for any such keys and decide how you want them handled in the
        TOML version.
      </Typography>
      <Typography variant="h3">Is my YAML uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — parsing and conversion happen entirely client-side in your browser. Nothing you paste is sent to
        a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/yaml-to-toml" content={content}>
      <YamlToTomlContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default YamlToToml;
