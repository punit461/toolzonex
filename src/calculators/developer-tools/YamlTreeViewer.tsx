'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import yaml from 'js-yaml';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type YamlValue = string | number | boolean | null | YamlValue[] | { [key: string]: YamlValue };

function valueColor(value: YamlValue): string {
  if (value === null || value === undefined) return '#9e9e9e';
  switch (typeof value) {
    case 'string': return '#2e7d32';
    case 'number': return '#e65100';
    case 'boolean': return '#6a1b9a';
    default: return 'inherit';
  }
}

function formatPrimitive(value: YamlValue): string {
  if (value === null || value === undefined) return 'null';
  if (typeof value === 'string') return `"${value}"`;
  return String(value);
}

function YamlNode({ label, value, isIndex }: { label: string | null; value: YamlValue; isIndex?: boolean }) {
  const isContainer = value !== null && typeof value === 'object';
  const [expanded, setExpanded] = useState(true);

  const keyLabel = label !== null && (
    <>
      <Box component="span" sx={{ color: isIndex ? 'text.secondary' : '#1565c0', fontWeight: isIndex ? 400 : 600 }}>
        {isIndex ? label : label}
      </Box>
      <Box component="span" sx={{ color: 'text.secondary' }}>: </Box>
    </>
  );

  if (!isContainer) {
    return (
      <Box sx={{ pl: 2, fontFamily: 'monospace', fontSize: '0.85rem', lineHeight: 1.9 }}>
        {keyLabel}
        <Box component="span" sx={{ color: valueColor(value) }}>{formatPrimitive(value)}</Box>
      </Box>
    );
  }

  const isArray = Array.isArray(value);
  const entries = isArray
    ? (value as YamlValue[]).map((v, i) => [String(i), v] as [string, YamlValue])
    : Object.entries(value as Record<string, YamlValue>);
  const bracketOpen = isArray ? '[' : '{';
  const bracketClose = isArray ? ']' : '}';

  return (
    <Box sx={{ fontFamily: 'monospace', fontSize: '0.85rem', lineHeight: 1.9 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', userSelect: 'none' }} onClick={() => setExpanded((e) => !e)}>
        <Box sx={{ display: 'flex', p: 0.25, mr: 0.5 }}>
          {expanded ? <ExpandMoreIcon fontSize="small" /> : <ChevronRightIcon fontSize="small" />}
        </Box>
        {keyLabel}
        <Box component="span" sx={{ color: 'text.secondary' }}>
          {bracketOpen}
          {!expanded && ` ${entries.length} ${isArray ? 'items' : 'keys'} ${bracketClose}`}
        </Box>
      </Box>
      {expanded && (
        <>
          <Box sx={{ pl: 3, ml: 1.5, borderLeft: '1px dashed', borderColor: 'divider' }}>
            {entries.map(([k, v]) => (
              <YamlNode key={k} label={isArray ? `${k}:` : k} value={v} isIndex={isArray} />
            ))}
          </Box>
          <Box sx={{ pl: 4.5, color: 'text.secondary' }}>{bracketClose}</Box>
        </>
      )}
    </Box>
  );
}

const SAMPLE = 'name: Acme Corp\nemployees:\n  - alice\n  - bob\nsettings:\n  debug: true\n  retries: 3\naddress:\n  city: Pune\n  zip: "411001"';

const YamlTreeViewerContent = () => {
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const parsed = useMemo<YamlValue | null>(() => {
    if (!input.trim()) { setError(null); return null; }
    try {
      const result = yaml.load(input) as YamlValue;
      setError(null);
      return result ?? null;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid YAML');
      return null;
    }
  }, [input]);

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
          Load Sample
        </Button>
        {error && <Alert severity="error" sx={{ mt: 1 }}>{error}</Alert>}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" fontWeight="600">Interactive Tree</Typography>
        <Paper
          variant="outlined"
          sx={{ p: 2, minHeight: 400, maxHeight: 500, overflow: 'auto', bgcolor: 'grey.50' }}
        >
          {parsed === null ? (
            <Typography color="text.secondary">The interactive tree will appear here once you paste valid YAML...</Typography>
          ) : (
            <YamlNode label={null} value={parsed} />
          )}
        </Paper>
      </Box>
    </Box>
  );
};

const YamlTreeViewer = () => {
  const content = (
    <>
      <Typography variant="h2">Free YAML Viewer — Interactive Tree Explorer</Typography>
      <Typography variant="body1">
        Paste any YAML document and explore it as a collapsible, syntax-colored tree instead of scanning raw
        indentation by eye. Expand and collapse nested mappings and sequences to focus on the part of the
        document you actually care about — ideal for digging through large config files, Kubernetes manifests,
        or CI pipeline definitions.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste your YAML into the left panel. It's parsed instantly and rendered as an interactive tree on the
        right — click the arrow next to any mapping or sequence to expand or collapse it.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Pasting a nested document like <code>{'settings:\n  debug: true\n  retries: 3'}</code> renders
        "settings" as a collapsible node — collapse it to hide the details, or expand it on its own to check
        just those two keys.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Exploring a large, deeply nested Kubernetes manifest or CI config without scrolling through every line.</li>
          <li>Reviewing a YAML configuration file's structure before editing it.</li>
          <li>Collapsing irrelevant sections to focus on one part of a document during debugging.</li>
          <li>Getting a quick visual sense of a YAML document's shape and nesting depth.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is this different from the YAML Formatter?</Typography>
      <Typography variant="body1">
        The YAML Formatter focuses on re-indenting messy YAML text back into consistent, readable YAML. This
        viewer parses the YAML and renders it as an interactive, collapsible tree instead — the same
        exploration-focused interaction as our JSON Tree Viewer — so you can expand only the parts you need
        rather than reading reformatted text top to bottom.
      </Typography>
      <Typography variant="h3">Does it work with large YAML documents?</Typography>
      <Typography variant="body1">
        Yes — everything runs in your browser, and collapsing large branches you don't need makes it easy to
        navigate even sizeable documents without the page becoming sluggish.
      </Typography>
      <Typography variant="h3">Is my YAML data uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — parsing and rendering happen entirely client-side in your browser. Your data is never sent to a
        server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/yaml-viewer" content={content}>
      <YamlTreeViewerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default YamlTreeViewer;
