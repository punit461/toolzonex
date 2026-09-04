'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { parse } from 'smol-toml';
import yaml from 'js-yaml';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const SAMPLE = 'title = "Example"\n\n[owner]\nname = "Ann"\nactive = true\n\n[owner.address]\ncity = "NYC"\n';

const TomlToYamlContent = () => {
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
      setOutput(yaml.dump(parsed));
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
          <Typography variant="subtitle1" fontWeight="600">YAML Output</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          component="pre"
          sx={{ p: 2, minHeight: 395, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {output || 'YAML output will appear here...'}
        </Paper>
      </Box>
    </Box>
  );
};

const TomlToYaml = () => {
  const content = (
    <>
      <Typography variant="h2">Free TOML to YAML Converter</Typography>
      <Typography variant="body1">
        Paste a TOML document to instantly convert it into equivalent YAML. Tables become nested YAML
        mappings and arrays become YAML sequences, so the structure of your config is preserved exactly.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste any TOML configuration into the input box, or click &quot;Load Example&quot; to see a sample run.
        The converter parses your TOML and renders the resulting object as YAML, updating live as you type.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Given a TOML file with a top-level <code>title</code> key and an <code>[owner]</code> table containing
        a nested <code>[owner.address]</code> table, the tool produces a YAML document with <code>title</code>
        at the root and an indented <code>owner</code> mapping whose <code>address</code> key is itself a
        nested mapping — matching the TOML table hierarchy.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Migrating a Rust <code>Cargo.toml</code> or Python <code>pyproject.toml</code> style config to a YAML-based tool.</li>
          <li>Converting TOML application settings into YAML for Kubernetes or Docker Compose style configs.</li>
          <li>Comparing TOML and YAML representations of the same configuration side by side.</li>
          <li>Bootstrapping a YAML config file from an existing TOML one instead of retyping it by hand.</li>
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
      <Typography variant="h3">How are TOML dates and times represented in YAML?</Typography>
      <Typography variant="body1">
        TOML date and datetime values are serialized using YAML's native timestamp representation, so tools
        that read the resulting YAML will typically parse them back into date objects automatically.
      </Typography>
      <Typography variant="h3">Is my TOML uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — parsing and conversion happen entirely client-side in your browser. Nothing you paste is sent to
        a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/toml-to-yaml" content={content}>
      <TomlToYamlContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TomlToYaml;
