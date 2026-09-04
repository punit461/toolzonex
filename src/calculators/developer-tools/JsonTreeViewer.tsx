'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert, InputAdornment } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SearchIcon from '@mui/icons-material/Search';
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

function ownMatches(label: string | null, value: JsonValue, search: string): boolean {
  const needle = search.toLowerCase();
  if (label !== null && label.toLowerCase().includes(needle)) return true;
  if (value !== null && typeof value !== 'object') {
    return String(value).toLowerCase().includes(needle);
  }
  return false;
}

function subtreeHasMatch(label: string | null, value: JsonValue, search: string): boolean {
  if (ownMatches(label, value, search)) return true;
  if (value !== null && typeof value === 'object') {
    const entries = Array.isArray(value)
      ? value.map((v, i) => [String(i), v] as [string, JsonValue])
      : Object.entries(value as Record<string, JsonValue>);
    return entries.some(([k, v]) => subtreeHasMatch(k, v, search));
  }
  return false;
}

function Highlight({ text, search }: { text: string; search: string }) {
  if (!search.trim()) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(search.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <Box component="mark" sx={{ bgcolor: 'warning.light', color: 'text.primary', px: 0.25, borderRadius: 0.5 }}>
        {text.slice(idx, idx + search.length)}
      </Box>
      {text.slice(idx + search.length)}
    </>
  );
}

function JsonNode({ label, value, isIndex, search }: { label: string | null; value: JsonValue; isIndex?: boolean; search: string }) {
  const isContainer = value !== null && typeof value === 'object';
  const [manualExpanded, setManualExpanded] = useState(true);
  const hasSearch = search.trim().length > 0;
  const matchInSubtree = hasSearch && subtreeHasMatch(label, value, search);
  const expanded = manualExpanded || matchInSubtree;

  const keyLabel = label !== null && (
    <>
      <Box component="span" sx={{ color: isIndex ? 'text.secondary' : '#1565c0', fontWeight: isIndex ? 400 : 600 }}>
        {isIndex ? label : <>"<Highlight text={label} search={search} />"</>}
      </Box>
      <Box component="span" sx={{ color: 'text.secondary' }}>: </Box>
    </>
  );

  if (!isContainer) {
    return (
      <Box sx={{ pl: 2, fontFamily: 'monospace', fontSize: '0.85rem', lineHeight: 1.9 }}>
        {keyLabel}
        <Box component="span" sx={{ color: valueColor(value) }}>
          <Highlight text={formatPrimitive(value)} search={search} />
        </Box>
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
      <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', userSelect: 'none' }} onClick={() => setManualExpanded((e) => !e)}>
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
              <JsonNode key={k} label={isArray ? `${k}:` : k} value={v} isIndex={isArray} search={search} />
            ))}
          </Box>
          <Box sx={{ pl: 4.5, color: 'text.secondary' }}>{bracketClose}</Box>
        </>
      )}
    </Box>
  );
}

const SAMPLE = '{\n  "name": "Alice",\n  "age": 30,\n  "active": true,\n  "address": { "city": "Pune", "zip": "411001" },\n  "tags": ["admin", "editor"]\n}';

const JsonTreeViewerContent = () => {
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const [error, setError] = useState<string | null>(null);

  const parsed = useMemo<JsonValue | null>(() => {
    if (!input.trim()) { setError(null); return null; }
    try {
      const result = JSON.parse(input);
      setError(null);
      return result;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
      return null;
    }
  }, [input]);

  const matchCount = useMemo(() => {
    if (parsed === null || !search.trim()) return 0;
    let count = 0;
    const walk = (label: string | null, value: JsonValue) => {
      if (ownMatches(label, value, search)) count++;
      if (value !== null && typeof value === 'object') {
        const entries = Array.isArray(value)
          ? value.map((v, i) => [String(i), v] as [string, JsonValue])
          : Object.entries(value as Record<string, JsonValue>);
        entries.forEach(([k, v]) => walk(k, v));
      }
    };
    walk(null, parsed);
    return count;
  }, [parsed, search]);

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
        <TextField
          size="small"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search keys or values..."
          disabled={parsed === null}
          InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }}
        />
        {search.trim() && (
          <Typography variant="caption" color="text.secondary">
            {matchCount} match{matchCount === 1 ? '' : 'es'} found — matching branches auto-expand below
          </Typography>
        )}
        <Paper
          variant="outlined"
          sx={{ p: 2, minHeight: 380, maxHeight: 480, overflow: 'auto', bgcolor: 'grey.50' }}
        >
          {parsed === null ? (
            <Typography color="text.secondary">The interactive tree will appear here once you paste valid JSON...</Typography>
          ) : (
            <JsonNode label={null} value={parsed} search={search} />
          )}
        </Paper>
      </Box>
    </Box>
  );
};

const JsonTreeViewer = () => {
  const content = (
    <>
      <Typography variant="h2">Free JSON Tree Viewer with Search</Typography>
      <Typography variant="body1">
        Paste any JSON and explore it as a collapsible tree, then search for a specific key or value to find it
        instantly — matching branches expand automatically so you never have to hunt through a large payload by
        hand.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste your JSON into the left panel. Type into the search box above the tree to filter for a key name or
        value — every node containing a match is expanded automatically and the matching text is highlighted, so
        you can jump straight to what you're looking for in a large or deeply nested document.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        In a large API response, searching for <code>email</code> highlights every key named "email" anywhere in
        the tree and auto-expands each of their parent objects, even if they were originally collapsed several
        levels deep.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Finding a specific field buried inside a large, deeply nested API response.</li>
          <li>Checking whether a particular key or value exists anywhere in a config file.</li>
          <li>Auditing a JSON payload for a specific ID, email, or status value during debugging.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is this different from the plain JSON Viewer?</Typography>
      <Typography variant="body1">
        The JSON Viewer is a general-purpose collapsible tree explorer. This tool adds a search box on top of
        that same tree so you can filter for a specific key or value by typing — matching branches auto-expand
        and matches are highlighted, which the plain viewer doesn't do.
      </Typography>
      <Typography variant="h3">Is the search case-sensitive?</Typography>
      <Typography variant="body1">
        No — the search matches keys and values as a case-insensitive substring, so searching "email" also finds
        "Email" or "EMAIL".
      </Typography>
      <Typography variant="h3">Is my JSON data uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — parsing, searching, and rendering all happen entirely client-side in your browser. Your data is
        never sent to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/json-tree-viewer" content={content}>
      <JsonTreeViewerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default JsonTreeViewer;
