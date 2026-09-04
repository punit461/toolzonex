'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const HEADER_EXPLANATIONS: Record<string, string> = {
  'content-type': 'The media type (MIME type) of the response body, e.g. text/html or application/json.',
  'cache-control': 'Directives for how the response may be cached by browsers and proxies.',
  'set-cookie': 'Tells the browser to store a cookie, used for sessions, auth, or tracking.',
  'content-security-policy': 'Restricts which sources of scripts, styles, and other resources the page may load, to help prevent XSS.',
  'strict-transport-security': 'Forces the browser to only connect to this site over HTTPS for a set duration.',
  'x-frame-options': 'Controls whether the page can be embedded in an iframe, to help prevent clickjacking.',
  'access-control-allow-origin': 'Part of CORS — specifies which origins are allowed to read the response from a cross-origin request.',
  'etag': 'A version identifier for the resource, used for cache validation.',
  'content-encoding': 'The compression algorithm applied to the response body, e.g. gzip or br.',
  'vary': 'Lists request headers that affect which cached version of a response is served.',
  'location': 'The URL to redirect to, used with 3xx redirect status codes.',
  'server': 'Identifies the software running on the origin server, e.g. nginx or cloudflare.',
};

interface ParsedHeader {
  name: string;
  value: string;
  explanation?: string;
}

function parseHeaders(raw: string): { statusLine: string | null; headers: ParsedHeader[] } {
  const lines = raw.split('\n').map((l) => l.trim()).filter((l) => l.length > 0);
  let statusLine: string | null = null;
  const headers: ParsedHeader[] = [];

  for (const line of lines) {
    if (/^HTTP\/\d/.test(line)) {
      statusLine = line;
      continue;
    }
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;
    const name = line.slice(0, colonIndex).trim();
    const value = line.slice(colonIndex + 1).trim();
    if (!name) continue;
    headers.push({ name, value, explanation: HEADER_EXPLANATIONS[name.toLowerCase()] });
  }

  return { statusLine, headers };
}

const SAMPLE = `HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Cache-Control: max-age=3600
ETag: "abc123"
Content-Encoding: gzip
Server: nginx`;

const HttpHeaderViewerContent = () => {
  const [raw, setRaw] = useState<string>(SAMPLE);

  const { statusLine, headers } = useMemo(() => parseHeaders(raw), [raw]);
  const statusMatch = statusLine ? statusLine.match(/^HTTP\/(\S+)\s+(\d{3})\s*(.*)$/) : null;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TextField
        label="Paste Raw HTTP Response Headers"
        multiline
        rows={8}
        value={raw}
        onChange={(e) => setRaw(e.target.value)}
        placeholder={SAMPLE}
        fullWidth
        sx={{ fontFamily: 'monospace' }}
        helperText="Copy headers from your browser's DevTools Network tab, curl -I output, Postman, or any other tool."
      />

      {statusMatch && (
        <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2, bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="subtitle1">Status</Typography>
          <Chip label={statusMatch[2]} sx={{ bgcolor: 'white', color: 'primary.main', fontWeight: 700 }} />
          <Typography variant="body1">{statusMatch[3] || ''}</Typography>
          <Typography variant="caption" sx={{ ml: 'auto', opacity: 0.85 }}>HTTP/{statusMatch[1]}</Typography>
        </Paper>
      )}

      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Header Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {headers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={2}>
                  <Typography color="text.secondary">Paste headers above to see them parsed here.</Typography>
                </TableCell>
              </TableRow>
            ) : (
              headers.map((h, i) => (
                <TableRow key={`${h.name}-${i}`}>
                  <TableCell sx={{ fontFamily: 'monospace', fontWeight: 600, verticalAlign: 'top' }}>
                    {h.name}
                    {h.explanation && (
                      <Typography variant="caption" color="text.secondary" display="block" sx={{ fontFamily: 'body1.fontFamily', mt: 0.5 }}>
                        {h.explanation}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>{h.value}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

const HttpHeaderViewer = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the HTTP Header Viewer</Typography>
      <Typography variant="body1">
        Paste raw HTTP response headers — copied from your browser&apos;s DevTools Network tab, a{' '}
        <code>curl -I</code> command, Postman, or any other tool — into the box above. The first
        &quot;HTTP/...&quot; line is parsed as the status line and shown separately, and every subsequent
        &quot;Header-Name: value&quot; line is split on its first colon and rendered as a clean table. This
        tool is a parser and formatter for headers you already have — it does not fetch live headers from a
        URL itself.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.85rem', whiteSpace: 'pre-wrap' }}>
        {'HTTP/1.1 200 OK\nContent-Type: text/html; charset=utf-8\nCache-Control: max-age=3600'}
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Pasting <code>Content-Type: text/html; charset=utf-8</code> produces a row with header name
        &quot;Content-Type&quot; and value &quot;text/html; charset=utf-8&quot;, along with a plain-English
        note explaining what the Content-Type header does, since it&apos;s one of the common well-known
        headers this tool recognizes.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Quickly reading and understanding a long block of headers copied from DevTools or curl.</li>
          <li>Checking which caching, security, or CORS headers a server response includes.</li>
          <li>Learning what common headers like Content-Security-Policy or Strict-Transport-Security actually do.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why doesn't this tool fetch headers directly from a URL?</strong> Browsers block cross-origin JavaScript from reading most response headers of arbitrary third-party sites due to CORS restrictions — a live-fetch version would fail for the vast majority of real websites and would be misleading. Instead, this tool works with headers you've already captured from DevTools, curl, or another tool that isn't subject to those browser restrictions.</li>
          <li><strong>How does the parser split each header line?</strong> Each line is split on its first colon only — everything before the first colon becomes the header name, and everything after (trimmed) becomes the value. This correctly handles values that themselves contain colons, like <code>Content-Type: text/html; charset=utf-8</code> or time-formatted values.</li>
          <li><strong>Which headers get a plain-English explanation?</strong> A set of about a dozen commonly seen headers — including Content-Type, Cache-Control, Set-Cookie, Content-Security-Policy, Strict-Transport-Security, X-Frame-Options, Access-Control-Allow-Origin, ETag, Content-Encoding, Vary, Location, and Server — show a short note beneath the header name when they appear in your pasted input.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/http-header-viewer" content={content}>
      <HttpHeaderViewerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default HttpHeaderViewer;
