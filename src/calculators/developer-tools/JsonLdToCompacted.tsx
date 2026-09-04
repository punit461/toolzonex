'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { jsonLdToCompacted } from './jsonLdEngine';

const SAMPLE = `{
  "@context": {
    "name": "http://schema.org/name",
    "homepage": { "@id": "http://schema.org/url", "@type": "@id" }
  },
  "@id": "https://example.com/people/markus",
  "name": "Markus Lanthaler",
  "homepage": "https://example.com/"
}`;

const JsonLdToCompactedContent = () => {
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
    jsonLdToCompacted(input).then((result) => {
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
          <Typography variant="subtitle1" fontWeight="600">Compacted JSON-LD</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          component="pre"
          sx={{ p: 2, minHeight: 395, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {output || 'Compacted output will appear here...'}
        </Paper>
      </Box>
    </Box>
  );
};

const JsonLdToCompacted = () => {
  const content = (
    <>
      <Typography variant="h2">Free JSON-LD to Compacted Converter</Typography>
      <Typography variant="body1">
        Paste a JSON-LD document to compact it — rewriting it to use the short terms defined in its context
        instead of full IRIs, and cleaning up structural noise like single-element arrays. Runs entirely in
        your browser using the official jsonld.js reference implementation.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste any JSON-LD document into the input box, or click &quot;Load Example&quot; to see a sample run.
        This tool compacts the document against its own <code>@context</code> if it has one; if the document
        has no <code>@context</code>, it compacts against an empty context, which still tidies up structure
        without shortening any names.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Given the sample document above, compaction uses the <code>@context</code> mapping <code>name</code>{' '}
        to <code>http://schema.org/name</code> and <code>homepage</code> to <code>http://schema.org/url</code>{' '}
        to keep the document exactly as written — it already is in its most compact form relative to that
        context. Feed it an already-expanded document instead and you&apos;ll see full IRIs collapse back down
        to <code>name</code> and <code>homepage</code>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Turning a verbose, expanded JSON-LD document back into a short, readable form for humans.</li>
          <li>Re-compacting a document against a different context to see it expressed with different terms.</li>
          <li>Verifying that a hand-written context actually shortens the IRIs you expect it to.</li>
          <li>Preparing a JSON-LD document for storage or transmission in its most compact representation.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Where does the context used for compaction come from?</Typography>
      <Typography variant="body1">
        If your document already has its own <code>@context</code> (the common case — see the example above),
        this tool compacts against that same context, which is exactly what compaction is meant to do: shorten
        the document using terms it already defines. If the document has no <code>@context</code> at all,
        compaction runs against an empty context (<code>{'{}'}</code>), which still normalizes structure (for
        example, collapsing single-value arrays into plain values) but can&apos;t shorten any IRIs into short
        terms, since there are no terms to shorten them to.
      </Typography>
      <Typography variant="h3">What does compaction actually change in a JSON-LD document?</Typography>
      <Typography variant="body1">
        Compaction rewrites a JSON-LD document to use the short terms, prefixes, and aliases defined in a
        context instead of full IRIs, and simplifies structural noise like single-element arrays and redundant{' '}
        <code>@id</code> wrappers. It&apos;s the inverse of expansion — the same data, expressed as compactly
        as the context allows.
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
    <CalculatorShell url="/developer-tools/jsonld-to-compacted" content={content}>
      <JsonLdToCompactedContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default JsonLdToCompacted;
