'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { jsonLdToFlattened } from './jsonLdEngine';

const SAMPLE = `{
  "@context": {
    "name": "http://schema.org/name",
    "homepage": { "@id": "http://schema.org/url", "@type": "@id" }
  },
  "@id": "https://example.com/people/markus",
  "name": "Markus Lanthaler",
  "homepage": "https://example.com/"
}`;

const JsonLdToFlattenedContent = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const requestId = useRef(0);

  useEffect(() => {
    const id = ++requestId.current;
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }
    jsonLdToFlattened(input).then((result) => {
      if (requestId.current !== id) return;
      setOutput(result.output);
      setError(result.error ?? null);
    });
  }, [input]);

  const copyToClipboard = async () => {
    if (output) await navigator.clipboard.writeText(output);
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" fontWeight="600">Paste JSON-LD Document</Typography>
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
          <Typography variant="subtitle1" fontWeight="600">Flattened JSON-LD</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          component="pre"
          sx={{ p: 2, minHeight: 395, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {output || 'Flattened output will appear here...'}
        </Paper>
      </Box>
    </Box>
  );
};

const JsonLdToFlattened = () => {
  const content = (
    <>
      <Typography variant="h2">Free JSON-LD to Flattened Converter</Typography>
      <Typography variant="body1">
        Paste a JSON-LD document to flatten it — collecting every node, however deeply nested, into a single
        flat array indexed by <code>@id</code>. Runs entirely in your browser using the official jsonld.js
        reference implementation.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste any JSON-LD document into the input box, or click &quot;Load Example&quot; to see a sample run.
        The tool expands the document internally, then pulls every node out into one top-level array, replacing
        nested object references with lightweight <code>@id</code> pointers. The output is in expanded
        (full-IRI) form rather than recompacted against your original context.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        The sample document above only has one node, so flattening mainly shows its properties rewritten as
        full IRIs (<code>http://schema.org/name</code>, <code>http://schema.org/url</code>) inside a
        single-element array. The effect is much more visible on documents with multiple nested objects, where
        each one gets pulled out to the top level with its own <code>@id</code>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Turning a deeply nested JSON-LD document into a flat list of nodes for easier indexing.</li>
          <li>Preparing data for import into a triple store or graph database that expects node-per-record input.</li>
          <li>Making every node in a document individually addressable by <code>@id</code>.</li>
          <li>Simplifying a document&apos;s structure before writing custom processing code against it.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What does flattening do?</Typography>
      <Typography variant="body1">
        Flattening collects every node in a JSON-LD document — including deeply nested ones — into a single
        flat array, each with its own <code>@id</code>, and replaces nested object references with{' '}
        <code>@id</code>-only pointers. It removes multiple levels of nesting from the document&apos;s
        structure, which makes it easier to look up any node by its identifier without walking the whole tree.
      </Typography>
      <Typography variant="h3">How is flattening different from expansion?</Typography>
      <Typography variant="body1">
        Expansion resolves shorthand terms into full IRIs but keeps the document&apos;s original nested shape.
        Flattening goes a step further: it also restructures the document itself, pulling every node — nested
        or not — out into one flat top-level array of node objects. In this tool, flattening runs on the
        expanded form internally and the result is itself in expanded (IRI) form, not recompacted against your
        original context.
      </Typography>
      <Typography variant="h3">Does this tool support remote @context URLs (like https://schema.org/)?</Typography>
      <Typography variant="body1">
        No — this tool intentionally disables network fetches for <code>@context</code> and document
        dereferencing, since a static, client-side tool can&apos;t reliably rely on a remote server&apos;s CORS
        policy or availability. Use a document with an inline <code>@context</code> object (a JSON object, not
        a URL string) — the sample document above and virtually every hand-written JSON-LD example works this
        way. If you paste a document whose <code>@context</code> is a URL, you&apos;ll get a clear error
        instead of an unpredictable network failure.
      </Typography>
      <Typography variant="h3">Is my document uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — all JSON-LD processing happens entirely client-side in your browser using the jsonld.js library.
        Nothing you paste is sent to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/jsonld-to-flattened" content={content}>
      <JsonLdToFlattenedContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default JsonLdToFlattened;
