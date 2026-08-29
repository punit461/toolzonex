'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const SAMPLE = 'https://user:pass@www.example.com:8080/products/search?q=laptop&sort=price&page=2#reviews';

function parseUrl(value: string): { url: URL | null; error: string | null } {
  if (!value.trim()) return { url: null, error: null };
  try {
    return { url: new URL(value), error: null };
  } catch {
    return { url: null, error: "That doesn't look like a valid, fully-qualified URL (it must include a protocol, like https://)." };
  }
}

const UrlParserContent = () => {
  const [input, setInput] = useState('');

  const { url, error } = useMemo(() => parseUrl(input), [input]);
  const params = url ? Array.from(url.searchParams.entries()) : [];

  const rows: { label: string; value: string }[] = url ? [
    { label: 'Protocol', value: url.protocol },
    { label: 'Host', value: url.host },
    { label: 'Hostname', value: url.hostname },
    { label: 'Port', value: url.port || '(default)' },
    { label: 'Origin', value: url.origin },
    { label: 'Pathname', value: url.pathname || '/' },
    { label: 'Search', value: url.search || '(none)' },
    { label: 'Hash', value: url.hash || '(none)' },
    { label: 'Username', value: url.username || '(none)' },
    { label: 'Password', value: url.password || '(none)' },
  ] : [];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TextField
        label="Full URL"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={SAMPLE}
        fullWidth
      />
      {error && <Alert severity="error">{error}</Alert>}

      {url && (
        <>
          <Paper variant="outlined">
            <Table size="small">
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.label}>
                    <TableCell sx={{ fontWeight: 600, width: '30%' }}>{row.label}</TableCell>
                    <TableCell sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>{row.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>

          <Box>
            <Typography variant="subtitle1" fontWeight="600" gutterBottom>Query Parameters</Typography>
            {params.length === 0 ? (
              <Typography color="text.secondary">No query parameters found.</Typography>
            ) : (
              <Paper variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Key</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {params.map(([k, v], i) => (
                      <TableRow key={`${k}-${i}`}>
                        <TableCell sx={{ fontFamily: 'monospace' }}>{k}</TableCell>
                        <TableCell sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>{v}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

const UrlParser = () => {
  const content = (
    <>
      <Typography variant="h2">Free URL Parser — Break Down Any URL</Typography>
      <Typography variant="body1">
        Paste any full URL to instantly break it down into its component parts — protocol, host, port,
        pathname, query parameters, and hash — using the browser's native <code>URL</code> object.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste a complete URL, including its protocol (like <code>https://</code>), into the input box. The
        breakdown table and query parameter list update instantly.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Pasting <code>{SAMPLE}</code> shows hostname <code>www.example.com</code>, port <code>8080</code>,
        pathname <code>/products/search</code>, and query parameters <code>q=laptop</code>,
        <code>sort=price</code>, <code>page=2</code>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Debugging a redirect or webhook URL by inspecting its exact components.</li>
          <li>Extracting and reading query string parameters from a long tracking or API URL.</li>
          <li>Checking whether a URL includes a non-default port or embedded credentials.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does this work with relative URLs?</Typography>
      <Typography variant="body1">
        No — the browser's <code>URL</code> object requires a fully-qualified URL with a protocol (like
        <code>https://</code> or <code>ftp://</code>). Relative paths on their own can't be parsed this way.
      </Typography>
      <Typography variant="h3">Does it decode percent-encoded characters?</Typography>
      <Typography variant="body1">
        Query parameter values are decoded automatically, since they're read via the URL object's
        <code>searchParams</code> API, which handles percent-decoding for you.
      </Typography>
      <Typography variant="h3">Is my URL sent anywhere?</Typography>
      <Typography variant="body1">
        No — parsing happens entirely client-side in your browser. Nothing you paste is sent to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/url-parser" content={content}>
      <UrlParserContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default UrlParser;
