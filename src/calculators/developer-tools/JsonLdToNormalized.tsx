'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { jsonLdToNormalized } from './jsonLdEngine';

const SAMPLE = `{
  "@context": {
    "name": "http://schema.org/name",
    "homepage": { "@id": "http://schema.org/url", "@type": "@id" }
  },
  "@id": "https://example.com/people/markus",
  "name": "Markus Lanthaler",
  "homepage": "https://example.com/"
}`;

const JsonLdToNormalizedContent = () => {
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
    jsonLdToNormalized(input).then((result) => {
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
          <Typography variant="subtitle1" fontWeight="600">Normalized (URDNA2015) N-Quads</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          component="pre"
          sx={{ p: 2, minHeight: 395, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {output || 'Normalized output will appear here...'}
        </Paper>
      </Box>
    </Box>
  );
};

const JsonLdToNormalized = () => {
  const content = (
    <>
      <Typography variant="h2">Free JSON-LD to Normalized (URDNA2015) Converter</Typography>
      <Typography variant="body1">
        Paste a JSON-LD document to canonicalize it with the URDNA2015 algorithm, producing deterministic,
        byte-identical N-Quads output regardless of how the source JSON was written. Runs entirely in your
        browser using the official jsonld.js reference implementation.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste any JSON-LD document into the input box, or click &quot;Load Example&quot; to see a sample run.
        The tool expands your document into RDF, then applies URDNA2015 canonicalization — sorting statements
        and deterministically relabeling blank nodes — before serializing the result as N-Quads text.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        The sample document above has no blank nodes, so its normalized output looks the same as its plain
        N-Quads conversion — two sorted statement lines. The difference becomes visible on documents with
        multiple blank nodes or differently ordered keys: normalizing two such documents that describe the
        same graph always produces identical text, while plain N-Quads conversion might not.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Generating a stable content hash for a JSON-LD document, regardless of formatting differences.</li>
          <li>Producing the canonical form required for JSON-LD-based digital signatures (e.g. Verifiable Credentials data integrity proofs).</li>
          <li>Comparing two JSON-LD documents for semantic equality even when their raw JSON differs.</li>
          <li>Deduplicating linked-data records that describe the same graph with different blank node labels.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is this different from the N-Quads tool?</Typography>
      <Typography variant="body1">
        N-Quads conversion (jsonld.js&apos;s toRDF) is a straightforward format change — your JSON-LD document
        turned into RDF statements in whatever order the processor happens to produce them. This tool instead
        applies the URDNA2015 canonicalization algorithm: it sorts statements and deterministically relabels
        every blank node so that the same underlying data always normalizes to byte-identical output, no
        matter how the original JSON was formatted, what order its keys appeared in, or what blank node
        identifiers it used. Two JSON-LD documents that describe the same graph will normalize to the exact
        same text, even if their source JSON looks completely different.
      </Typography>
      <Typography variant="h3">What is this actually used for?</Typography>
      <Typography variant="body1">
        Deterministic, canonical output is what makes it possible to generate a stable content hash or a
        digital signature over a JSON-LD document (as used in, for example, Verifiable Credentials&apos;
        data-integrity proofs) — you can&apos;t hash or sign a document reliably if trivial formatting
        differences (key order, whitespace, blank node naming) change the bytes you&apos;re hashing.
        Normalization strips all of that variability out first.
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
    <CalculatorShell url="/developer-tools/jsonld-to-normalized" content={content}>
      <JsonLdToNormalizedContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default JsonLdToNormalized;
