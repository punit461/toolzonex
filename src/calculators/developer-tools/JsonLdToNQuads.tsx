'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { jsonLdToNQuads } from './jsonLdEngine';

const SAMPLE = `{
  "@context": {
    "name": "http://schema.org/name",
    "homepage": { "@id": "http://schema.org/url", "@type": "@id" }
  },
  "@id": "https://example.com/people/markus",
  "name": "Markus Lanthaler",
  "homepage": "https://example.com/"
}`;

const JsonLdToNQuadsContent = () => {
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
    jsonLdToNQuads(input).then((result) => {
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
          <Typography variant="subtitle1" fontWeight="600">N-Quads</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          component="pre"
          sx={{ p: 2, minHeight: 395, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {output || 'N-Quads output will appear here...'}
        </Paper>
      </Box>
    </Box>
  );
};

const JsonLdToNQuads = () => {
  const content = (
    <>
      <Typography variant="h2">Free JSON-LD to N-Quads Converter</Typography>
      <Typography variant="body1">
        Paste a JSON-LD document to convert it into N-Quads — the plain-text, line-based RDF format most
        triple stores and linked-data tooling expect. Runs entirely in your browser using the official
        jsonld.js reference implementation.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste any JSON-LD document into the input box, or click &quot;Load Example&quot; to see a sample run.
        The tool expands your document into RDF triples/quads internally, then serializes each one as a single
        N-Quads line ending in a period. The output is plain text, not JSON.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        The sample document above converts to two N-Quads lines — one for the <code>name</code> statement and
        one for the <code>homepage</code> statement — each written as{' '}
        <code>&lt;subject&gt; &lt;predicate&gt; object .</code>, with the subject resolved to the document&apos;s{' '}
        <code>@id</code> and the predicates spelled out as full IRIs.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Loading JSON-LD data into a triple store or SPARQL engine that expects N-Quads input.</li>
          <li>Inspecting a document&apos;s data as individual RDF statements rather than nested JSON.</li>
          <li>Converting linked-data documents for interchange with non-JSON RDF tooling.</li>
          <li>Debugging exactly which triples a JSON-LD document actually produces.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is N-Quads, and why does the output look so different from JSON?</Typography>
      <Typography variant="body1">
        N-Quads is a plain-text, line-based RDF serialization — every line is one subject-predicate-object
        statement (a &quot;quad,&quot; optionally with a fourth graph name), terminated with a period. It has
        nothing to do with JSON syntax; it&apos;s the format most RDF tooling (triple stores, SPARQL engines,
        linked-data pipelines) expects as an interchange format, so this tool converts your JSON-LD document
        into that statement-per-line form.
      </Typography>
      <Typography variant="h3">Is this the same as the Normalized / URDNA2015 output?</Typography>
      <Typography variant="body1">
        No, and this is the most common point of confusion between the two tools. This N-Quads tool just runs
        jsonld.js&apos;s toRDF conversion once and prints whatever order it produces — running the same
        document through it twice will generally give you the same result, but the ordering isn&apos;t a
        canonicalization guarantee, and isn&apos;t guaranteed to be stable across different-but-equivalent
        input documents (different key order, different blank node labels, etc.). If you need a byte-for-byte
        deterministic output — for hashing or digitally signing a JSON-LD document — use the Normalized
        (URDNA2015) tool instead, which sorts and relabels everything into one canonical form regardless of how
        the input was written.
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
    <CalculatorShell url="/developer-tools/jsonld-to-n-quads" content={content}>
      <JsonLdToNQuadsContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default JsonLdToNQuads;
