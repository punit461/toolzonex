'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert, ToggleButtonGroup, ToggleButton, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

function valueColor(value: JsonValue): string {
  if (value === null) return '#9e9e9e';
  switch (typeof value) {
    case 'string': return '#2e7d32';
    case 'number': return '#e65100';
    case 'boolean': return '#6a1b9a';
    default: return 'inherit';
  }
}

function formatPrimitive(value: JsonValue): string {
  if (value === null) return 'null';
  if (typeof value === 'string') return `"${value}"`;
  return String(value);
}

function JsonNode({ label, value, isIndex }: { label: string | null; value: JsonValue; isIndex?: boolean }) {
  const isContainer = value !== null && typeof value === 'object';
  const [expanded, setExpanded] = useState(true);

  const keyLabel = label !== null && (
    <>
      <Box component="span" sx={{ color: isIndex ? 'text.secondary' : '#1565c0', fontWeight: isIndex ? 400 : 600 }}>
        {isIndex ? label : `"${label}"`}
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
    ? (value as JsonValue[]).map((v, i) => [String(i), v] as [string, JsonValue])
    : Object.entries(value as Record<string, JsonValue>);
  const bracketOpen = isArray ? '[' : '{';
  const bracketClose = isArray ? ']' : '}';

  return (
    <Box sx={{ fontFamily: 'monospace', fontSize: '0.85rem', lineHeight: 1.9 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', userSelect: 'none' }} onClick={() => setExpanded((e) => !e)}>
        <IconButton size="small" sx={{ p: 0.25, mr: 0.5 }} tabIndex={-1}>
          {expanded ? <ExpandMoreIcon fontSize="small" /> : <ChevronRightIcon fontSize="small" />}
        </IconButton>
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
              <JsonNode key={k} label={isArray ? `${k}:` : k} value={v} isIndex={isArray} />
            ))}
          </Box>
          <Box sx={{ pl: 4.5, color: 'text.secondary' }}>{bracketClose}</Box>
        </>
      )}
    </Box>
  );
}

const SAMPLE = '{\n  "name": "Alice",\n  "age": 30,\n  "active": true,\n  "address": { "city": "Pune", "zip": "411001" },\n  "tags": ["admin", "editor"]\n}';

const JsonViewerContent = () => {
  const [input, setInput] = useState('');
  const [parsed, setParsed] = useState<JsonValue | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<'tree' | 'raw'>('tree');

  useEffect(() => {
    if (!input.trim()) {
      setParsed(null);
      setError(null);
      return;
    }
    try {
      setParsed(JSON.parse(input));
      setError(null);
    } catch (e) {
      setParsed(null);
      setError(e instanceof Error ? e.message : 'Invalid JSON');
    }
  }, [input]);

  const copyRaw = () => {
    if (parsed !== null) navigator.clipboard.writeText(JSON.stringify(parsed, null, 2));
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
          Load Sample
        </Button>
        {error && <Alert severity="error" sx={{ mt: 1 }}>{error}</Alert>}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
          <ToggleButtonGroup value={view} exclusive size="small" onChange={(_, v) => v && setView(v)}>
            <ToggleButton value="tree">Tree View</ToggleButton>
            <ToggleButton value="raw">Raw Formatted</ToggleButton>
          </ToggleButtonGroup>
          <Button startIcon={<ContentCopyIcon />} onClick={copyRaw} disabled={parsed === null} size="small">
            Copy
          </Button>
        </Box>
        <Paper
          variant="outlined"
          sx={{ p: 2, minHeight: 400, maxHeight: 500, overflow: 'auto', bgcolor: 'grey.50' }}
        >
          {parsed === null ? (
            <Typography color="text.secondary">The interactive tree will appear here once you paste valid JSON...</Typography>
          ) : view === 'tree' ? (
            <JsonNode label={null} value={parsed} />
          ) : (
            <Box component="pre" sx={{ m: 0, fontFamily: 'monospace', fontSize: '0.85rem', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
              {JSON.stringify(parsed, null, 2)}
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

const JsonViewer = () => {
  const content = (
    <>
      <Typography variant="h2">Free JSON Viewer — Interactive Tree Explorer</Typography>
      <Typography variant="body1">
        Paste any JSON and explore it as a collapsible, syntax-colored tree instead of a flat wall of text.
        Expand and collapse nested objects and arrays to focus on the part of the payload you actually care
        about — ideal for digging through large API responses or config files.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste your JSON into the left panel. It's parsed instantly and rendered as an interactive tree on the
        right — click the arrow next to any object or array to expand or collapse it. Switch to "Raw
        Formatted" to see the same data as plain indented JSON, and use Copy to grab it.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Pasting a nested object like <code>{'{'}"user": {'{'}"name": "Alice", "roles": ["admin","editor"]{'}'}{'}'}</code> renders
        "user" as a collapsible node — collapse it to hide the details, or expand "roles" on its own to check
        just that array.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Exploring a large, deeply nested API response without scrolling through every field.</li>
          <li>Reviewing a configuration file's structure before editing it.</li>
          <li>Collapsing irrelevant branches to focus on one part of a payload during debugging.</li>
          <li>Getting a quick visual sense of a JSON document's shape and depth.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is this different from the JSON Formatter?</Typography>
      <Typography variant="body1">
        The JSON Formatter focuses on pretty-printing and minifying JSON as text. This viewer is built for
        exploration — it renders the same data as an interactive, collapsible tree so you can expand only the
        parts you need, though a raw formatted view is also available here.
      </Typography>
      <Typography variant="h3">Does it work with large JSON documents?</Typography>
      <Typography variant="body1">
        Yes — everything runs in your browser, and collapsing large branches you don't need makes it easy to
        navigate even sizeable payloads without the page becoming sluggish.
      </Typography>
      <Typography variant="h3">Is my JSON data uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — parsing and rendering happen entirely client-side in your browser. Your data is never sent to a
        server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/json-viewer" content={content}>
      <JsonViewerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default JsonViewer;
