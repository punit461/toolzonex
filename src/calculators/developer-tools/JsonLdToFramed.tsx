'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { jsonLdToFramed } from './jsonLdEngine';

const SAMPLE_DOC = `{
  "@context": {
    "name": "http://schema.org/name",
    "homepage": { "@id": "http://schema.org/url", "@type": "@id" }
  },
  "@id": "https://example.com/people/markus",
  "name": "Markus Lanthaler",
  "homepage": "https://example.com/"
}`;

const SAMPLE_FRAME = `{
  "@context": {
    "name": "http://schema.org/name"
  },
  "name": {}
}`;

const JsonLdToFramedContent = () => {
  const [doc, setDoc] = useState('');
  const [frame, setFrame] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const requestId = useRef(0);

  useEffect(() => {
    const id = ++requestId.current;
    if (!doc.trim() || !frame.trim()) {
      setOutput('');
      setError(null);
      return;
    }
    jsonLdToFramed(doc, frame).then((result) => {
      if (requestId.current !== id) return;
      setOutput(result.output);
      setError(result.error ?? null);
    });
  }, [doc, frame]);

  const copyToClipboard = async () => {
    if (output) await navigator.clipboard.writeText(output);
  };

  const loadExample = () => {
    setDoc(SAMPLE_DOC);
    setFrame(SAMPLE_FRAME);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="subtitle1" fontWeight="600">Paste JSON-LD Document</Typography>
          <TextField
            multiline
            rows={12}
            value={doc}
            onChange={(e) => setDoc(e.target.value)}
            placeholder={SAMPLE_DOC}
            fullWidth
            variant="outlined"
            sx={{ fontFamily: 'monospace' }}
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="subtitle1" fontWeight="600">Paste Frame</Typography>
          <TextField
            multiline
            rows={12}
            value={frame}
            onChange={(e) => setFrame(e.target.value)}
            placeholder={SAMPLE_FRAME}
            fullWidth
            variant="outlined"
            sx={{ fontFamily: 'monospace' }}
          />
        </Box>
      </Box>

      <Button variant="outlined" size="small" onClick={loadExample} sx={{ alignSelf: 'flex-start' }}>
        Load Example
      </Button>
      {error && <Alert severity="error">{error}</Alert>}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight="600">Framed JSON-LD</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          component="pre"
          sx={{ p: 2, minHeight: 200, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {output || 'Framed output will appear here...'}
        </Paper>
      </Box>
    </Box>
  );
};

const JsonLdToFramed = () => {
  const content = (
    <>
      <Typography variant="h2">Free JSON-LD to Framed Converter</Typography>
      <Typography variant="body1">
        Paste a JSON-LD document and a frame to reshape the document into the exact structure the frame
        describes — matching by type and property, then rebuilding a document in that shape. Runs entirely in
        your browser using the official jsonld.js reference implementation.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste a JSON-LD document into the first box and a frame into the second, or click &quot;Load
        Example&quot; to see a working pair. Framing matches nodes in your document against the constraints in
        the frame (required properties, specific <code>@type</code> values, or specific property values) and
        rebuilds a document containing only the matching branches, arranged in the shape the frame specifies.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        The sample frame requires a <code>name</code> property to be present, which the sample document
        satisfies — framing returns the document with <code>name</code> and <code>homepage</code> intact under
        the frame&apos;s own context. Change the frame to require a property your document doesn&apos;t have,
        and the result comes back empty, since framing only keeps nodes matching every constraint.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Pulling out only the nodes of a specific type from a larger, mixed JSON-LD document.</li>
          <li>Forcing a predictable, consistent output shape for downstream code that expects fixed field order.</li>
          <li>Filtering a document down to only the properties a frame explicitly asks for.</li>
          <li>Re-nesting a flattened document back into an embedded structure for display purposes.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What does a JSON-LD frame do?</Typography>
      <Typography variant="body1">
        A frame is a JSON-LD document (or document with a <code>@context</code>) that describes the shape you
        want the output in — which node type or properties must be present, and what order/nesting to arrange
        matching nodes. Framing matches your input document against the frame&apos;s pattern and rebuilds a
        document in that shape, filling in only the branches that matched.
      </Typography>
      <Typography variant="h3">Why did framing return an empty result / just the context?</Typography>
      <Typography variant="body1">
        Framing only includes nodes that match every constraint in your frame — if you require a specific{' '}
        <code>@type</code>, a specific property to exist, or a specific value, only nodes satisfying all of it
        are used, and everything else is dropped silently. If you get back an empty (or nearly empty) result,
        double-check that the property names and values in your frame actually match what&apos;s in your
        document — for instance, a frame requiring <code>&quot;@type&quot;: &quot;http://schema.org/Person&quot;</code>{' '}
        won&apos;t match anything unless your document actually sets that type on a node.
      </Typography>
      <Typography variant="h3">Does this tool support remote @context URLs (like https://schema.org/)?</Typography>
      <Typography variant="body1">
        No — this tool intentionally disables network fetches for <code>@context</code> and document
        dereferencing, since a static, client-side tool can&apos;t reliably rely on a remote server&apos;s CORS
        policy or availability. Use a document and frame with an inline <code>@context</code> object (a JSON
        object, not a URL string) — the sample above works this way. If either your document or your frame has
        a <code>@context</code> that&apos;s a URL, you&apos;ll get a clear error instead of an unpredictable
        network failure.
      </Typography>
      <Typography variant="h3">Is my document uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — all JSON-LD processing happens entirely client-side in your browser using the jsonld.js library.
        Nothing you paste is sent to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/jsonld-to-framed" content={content}>
      <JsonLdToFramedContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default JsonLdToFramed;
