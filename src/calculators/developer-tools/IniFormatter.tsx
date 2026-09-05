'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Line =
  | { type: 'section'; name: string }
  | { type: 'pair'; key: string; value: string }
  | { type: 'comment'; text: string }
  | { type: 'blank' };

function parseIni(raw: string): { lines: Line[]; errors: string[] } {
  const rawLines = raw.split('\n');
  const lines: Line[] = [];
  const errors: string[] = [];

  rawLines.forEach((rawLine, idx) => {
    const trimmed = rawLine.trim();
    if (trimmed === '') {
      lines.push({ type: 'blank' });
      return;
    }
    if (trimmed.startsWith(';') || trimmed.startsWith('#')) {
      lines.push({ type: 'comment', text: trimmed });
      return;
    }
    const sectionMatch = trimmed.match(/^\[(.+)\]$/);
    if (sectionMatch) {
      lines.push({ type: 'section', name: sectionMatch[1].trim() });
      return;
    }
    const eqIndex = trimmed.indexOf('=');
    if (eqIndex > 0) {
      const key = trimmed.slice(0, eqIndex).trim();
      const value = trimmed.slice(eqIndex + 1).trim();
      if (key) {
        lines.push({ type: 'pair', key, value });
        return;
      }
    }
    errors.push(`Line ${idx + 1}: "${rawLine}" is not a valid section, comment, or key=value pair.`);
  });

  return { lines, errors };
}

function serializeIni(lines: Line[]): string {
  const out: string[] = [];
  lines.forEach((line, idx) => {
    if (line.type === 'section') {
      if (idx > 0 && out.length > 0 && out[out.length - 1] !== '') out.push('');
      out.push(`[${line.name}]`);
    } else if (line.type === 'pair') {
      out.push(`${line.key} = ${line.value}`);
    } else if (line.type === 'comment') {
      out.push(line.text);
    } else {
      out.push('');
    }
  });
  // Collapse repeated blank lines
  const collapsed: string[] = [];
  for (const l of out) {
    if (l === '' && collapsed[collapsed.length - 1] === '') continue;
    collapsed.push(l);
  }
  return collapsed.join('\n').trim();
}

const SAMPLE = `[general]
name=My App
;comment about debug
debug = true

[database]
host=localhost
port=5432`;

const IniFormatterContent = () => {
  const [raw, setRaw] = useState<string>(SAMPLE);

  const { formatted, errors } = useMemo(() => {
    const { lines, errors } = parseIni(raw);
    return { formatted: serializeIni(lines), errors };
  }, [raw]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={1}>Raw INI Input</Typography>
        <TextField
          multiline
          rows={14}
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          fullWidth
          sx={{ fontFamily: 'monospace' }}
        />
        {errors.length > 0 && (
          <Alert severity="warning" sx={{ mt: 2 }}>
            {errors.map((e, i) => <div key={i}>{e}</div>)}
          </Alert>
        )}
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={1}>Formatted Output</Typography>
        <TextField
          multiline
          rows={14}
          value={formatted}
          fullWidth
          InputProps={{ readOnly: true, sx: { fontFamily: 'monospace', bgcolor: 'action.hover' } }}
        />
      </Box>
    </Box>
  );
};

const IniFormatter = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the INI Formatter</Typography>
      <Typography variant="body1">
        Paste raw INI text into the box — with <code>[section]</code> headers, <code>key=value</code> pairs,
        and <code>;</code> or <code>#</code> comment lines — and it&apos;s parsed leniently and re-serialized
        with normalized formatting: a single consistent space around every <code>=</code>, one blank line
        between sections, trimmed whitespace, and all comments and blank lines preserved in their original
        position.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        key=value  →  key = value
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Input <code>debug=true</code> (no spaces) is reformatted to <code>debug = true</code>, and a section
        immediately following a key=value pair with no blank line in between gets one inserted automatically,
        so every section is visually separated from the content above it.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Cleaning up an inconsistently-formatted config file before committing it to source control.</li>
          <li>Standardizing spacing conventions across INI files written by different tools or people.</li>
          <li>Spotting a malformed line in a config file that isn&apos;t a valid section, comment, or pair.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What happens if my INI file has a syntax error?</strong> The formatter flags any line that isn't a valid comment, blank line, section header, or key=value pair with a warning message that includes the line number, rather than crashing or silently dropping content — the rest of the valid file is still formatted normally.</li>
          <li><strong>Does this tool preserve comments and blank lines?</strong> Yes — comments (starting with <code>;</code> or <code>#</code>) and blank lines are kept in their original position in the output, they're just not reformatted since they aren't key=value pairs or sections.</li>
          <li><strong>Does it support both semicolon and hash comment styles?</strong> Yes — both <code>;</code> and <code>#</code> are recognized as comment markers, since different INI-parsing tools and languages use different conventions.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/ini-formatter" content={content}>
      <IniFormatterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default IniFormatter;
