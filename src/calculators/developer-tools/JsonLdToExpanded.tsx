'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { jsonLdToExpanded } from './jsonLdEngine';

const SAMPLE = `{
  "@context": {
    "name": "http://schema.org/name",
    "homepage": { "@id": "http://schema.org/url", "@type": "@id" }
  },
  "@id": "https://example.com/people/markus",
  "name": "Markus Lanthaler",
  "homepage": "https://example.com/"
}`;

const JsonLdToExpandedContent = () => {
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
    jsonLdToExpanded(input).then((result) => {
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
          <Typography variant="subtitle1" fontWeight="600">Expanded JSON-LD</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          component="pre"
          sx={{ p: 2, minHeight: 395, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {output || 'Expanded output will appear here...'}
        </Paper>
      </Box>
    </Box>
  );
};

const JsonLdToExpanded = () => {
  const content = (
    <>
      <Typography variant="h2">Free JSON-LD to Expanded Converter</Typography>
      <Typography variant="body1">
        Paste a JSON-LD document to expand it — removing every context-dependent shortcut and rewriting all
        properties and types as full, absolute IRIs. Runs entirely in your browser using the official
        jsonld.js reference implementation.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste any JSON-LD document into the input box, or click &quot;Load Example&quot; to see a sample run.
        The tool resolves the document&apos;s <code>@context</code> and rewrites every short term, prefix, and
        alias as a full IRI, then drops the <code>@context</code> section entirely since it&apos;s no longer
        needed.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Given the sample document above, expansion turns <code>name</code> into{' '}
        <code>http://schema.org/name</code> and <code>homepage</code> into an <code>@id</code>-typed reference
        under <code>http://schema.org/url</code>, wrapping every value in its explicit <code>@value</code> or{' '}
        <code>@id</code> form.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Inspecting exactly which IRIs a document&apos;s short terms actually resolve to.</li>
          <li>Normalizing documents that use different contexts before comparing or merging them.</li>
          <li>Debugging a context that isn&apos;t mapping a term the way you expect.</li>
          <li>Preparing a document as an intermediate step before flattening, framing, or RDF conversion.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What does expansion do to a JSON-LD document?</Typography>
      <Typography variant="body1">
        Expansion removes all context-dependent shortcuts — short property names, prefixes, and term aliases —
        and rewrites every property and type as its full, absolute IRI. The result has no <code>@context</code>{' '}
        section at all, because none is needed: every key is already an unambiguous IRI. This is the
        canonical, most &quot;spelled-out&quot; form of a JSON-LD document.
      </Typography>
      <Typography variant="h3">Why would I want the expanded form instead of the original document?</Typography>
      <Typography variant="body1">
        Expansion is JSON-LD&apos;s normal form for programmatic processing — once a document is expanded, you
        can compare, merge, or process it without needing to know which context (or which shorthand terms) the
        original author used. It&apos;s usually an internal step before flattening, framing, or converting to
        RDF, but it&apos;s also useful on its own for inspecting exactly what a document &quot;really
        means&quot; at the IRI level.
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
    <CalculatorShell url="/developer-tools/jsonld-to-expanded" content={content}>
      <JsonLdToExpandedContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default JsonLdToExpanded;
