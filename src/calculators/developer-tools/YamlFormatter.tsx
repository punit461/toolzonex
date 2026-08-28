'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function formatYaml(input: string): string {
  const lines = input.split(/\r?\n/);
  const output: string[] = [];
  let indentLevel = 0;

  for (const rawLine of lines) {
    const trimmed = rawLine.trim();
    if (!trimmed) {
      output.push('');
      continue;
    }

    const isComment = trimmed.startsWith('#');
    const isDocumentStart = trimmed === '---' || trimmed === '...';
    const isListIndicator = /^-\s/.test(trimmed);
    const isClosing = /^[\}\]]/.test(trimmed);

    if (isComment || isDocumentStart) {
      output.push(trimmed);
      continue;
    }

    if (isClosing) {
      indentLevel = Math.max(0, indentLevel - 1);
    }

    const level = isListIndicator
      ? Math.max(0, indentLevel - 1)
      : indentLevel;

    output.push('  '.repeat(level) + trimmed);

    const opensBlock = /[:]\s*$/.test(trimmed) || /[:]\s*[\[{]\s*$/.test(trimmed);
    const isList = isListIndicator;
    if (opensBlock) {
      indentLevel += 1;
    } else if (isList && indentLevel === 0) {
      indentLevel = 1;
    }
  }

  return output.join('\n');
}

const SAMPLE = 'name: Acme Corp\n  employees:\n      - alice\n      - bob\nsettings:\n  debug: true\n    retries: 3';

const YamlFormatterContent = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const format = () => {
    if (!input.trim()) {
      setOutput('');
      return;
    }
    setOutput(formatYaml(input));
  };

  const copyOutput = () => {
    if (output) navigator.clipboard.writeText(output);
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" fontWeight="600">Unformatted YAML</Typography>
        <TextField
          multiline
          rows={15}
          value={input}
          onChange={(e) => { setInput(e.target.value); setOutput(formatYaml(e.target.value)); }}
          placeholder={SAMPLE}
          fullWidth
          variant="outlined"
          inputProps={{ style: { fontFamily: 'monospace' } }}
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" onClick={format} fullWidth>Format YAML</Button>
          <Button variant="outlined" onClick={() => setInput(SAMPLE)} fullWidth>Load Sample</Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight="600">Formatted Output</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyOutput} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          sx={{ p: 2, minHeight: 380, maxHeight: 460, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}
        >
          {output || <Typography color="text.secondary">Formatted YAML will appear here...</Typography>}
        </Paper>
      </Box>
    </Box>
  );
};

const YamlFormatter = () => {
  const content = (
    <>
      <Typography variant="h2">How does it work?</Typography>
      <Typography variant="body1">
        Paste raw, messy YAML into the left box. The tool re-indents each nested key onto its own line,
        normalizing the whole document to a consistent two-space indentation. Formatting happens instantly and
        entirely in your browser.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Pasting irregularly indented YAML like <code>{'settings:\n  debug: true\n    retries: 3'}</code> is
        cleaned up so <code>debug</code> and <code>retries</code> sit at the same consistent nesting level.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Reading minified or poorly indented YAML configs (Docker, Kubernetes, CI pipelines).</li>
          <li>Cleaning up YAML you received before editing or sharing it.</li>
          <li>Standardizing indentation across config files to two spaces.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does this validate my YAML?</Typography>
      <Typography variant="body1">
        Not strictly. This uses a lightweight line-based re-indenter rather than a full YAML parser, so it focuses
        on consistent indentation rather than catching every syntax error.
      </Typography>
      <Typography variant="h3">Is my YAML uploaded anywhere?</Typography>
      <Typography variant="body1">
        No. Formatting happens entirely client-side — nothing you paste is sent to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/yaml-formatter" content={content}>
      <YamlFormatterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default YamlFormatter;
