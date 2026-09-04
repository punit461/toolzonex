'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Button, IconButton, Stack, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface HeaderRow {
  id: string;
  key: string;
  value: string;
}

let nextId = 2;

const BODY_METHODS: Method[] = ['POST', 'PUT', 'PATCH'];

function shellQuote(value: string): string {
  return `'${value.replace(/'/g, `'\\''`)}'`;
}

const CurlCommandGeneratorContent = () => {
  const [method, setMethod] = useState<Method>('POST');
  const [url, setUrl] = useState('https://api.example.com/v1/users');
  const [headers, setHeaders] = useState<HeaderRow[]>([
    { id: '1', key: 'Content-Type', value: 'application/json' },
  ]);
  const [body, setBody] = useState('{\n  "name": "Ada Lovelace"\n}');

  const addHeader = () => setHeaders([...headers, { id: String(nextId++), key: '', value: '' }]);
  const removeHeader = (id: string) => setHeaders(headers.filter((h) => h.id !== id));
  const updateHeader = (id: string, field: 'key' | 'value', val: string) =>
    setHeaders(headers.map((h) => (h.id === id ? { ...h, [field]: val } : h)));

  const supportsBody = BODY_METHODS.includes(method);

  const command = useMemo(() => {
    const lines: string[] = [`curl -X ${method} ${shellQuote(url || '')}`];
    headers.filter((h) => h.key.trim()).forEach((h) => {
      lines.push(`  -H ${shellQuote(`${h.key}: ${h.value}`)}`);
    });
    if (supportsBody && body.trim()) {
      lines.push(`  -d ${shellQuote(body)}`);
    }
    return lines.join(' \\\n');
  }, [method, url, headers, supportsBody, body]);

  const copy = () => navigator.clipboard.writeText(command);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Stack direction="row" spacing={2}>
          <FormControl sx={{ minWidth: 130 }}>
            <InputLabel>Method</InputLabel>
            <Select value={method} label="Method" onChange={(e) => setMethod(e.target.value as Method)}>
              {(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] as Method[]).map((m) => (
                <MenuItem key={m} value={m}>{m}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField label="URL" value={url} onChange={(e) => setUrl(e.target.value)} fullWidth />
        </Stack>

        <Box>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>Headers</Typography>
          <Stack spacing={1.5}>
            {headers.map((h) => (
              <Stack key={h.id} direction="row" spacing={1.5}>
                <TextField label="Key" size="small" fullWidth value={h.key} onChange={(e) => updateHeader(h.id, 'key', e.target.value)} />
                <TextField label="Value" size="small" fullWidth value={h.value} onChange={(e) => updateHeader(h.id, 'value', e.target.value)} />
                <IconButton color="error" size="small" onClick={() => removeHeader(h.id)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Stack>
            ))}
          </Stack>
          <Button startIcon={<AddIcon />} onClick={addHeader} sx={{ mt: 1.5 }}>Add Header</Button>
        </Box>

        {supportsBody && (
          <TextField
            label="Request Body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            multiline
            rows={6}
            fullWidth
          />
        )}
      </Box>

      <Box>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>Generated curl Command</Typography>
        <Paper variant="outlined" sx={{ p: 2, position: 'relative', bgcolor: 'grey.900', color: '#10b981', fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
          {command}
          <Button
            size="small"
            variant="contained"
            startIcon={<ContentCopyIcon />}
            onClick={copy}
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            Copy
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};

const CurlCommandGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How the curl Command Generator Works</Typography>
      <Typography variant="body1">
        Pick an HTTP method, enter the target URL, add any headers as key/value rows, and — for methods that
        support one — type a request body. The tool assembles a properly quoted and escaped <code>curl</code>{' '}
        command you can paste straight into a terminal, with each single-quoted value safely escaped even if it
        contains an apostrophe.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A POST request to <code>https://api.example.com/v1/users</code> with a{' '}
        <code>Content-Type: application/json</code> header and a JSON body generates:
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.85rem', whiteSpace: 'pre-wrap' }}>
        {`curl -X POST 'https://api.example.com/v1/users' \\\n  -H 'Content-Type: application/json' \\\n  -d '{"name": "Ada Lovelace"}'`}
      </Box>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Turning an API request from documentation or Postman into a shareable curl command.</li>
          <li>Quickly testing an endpoint from a terminal without hand-writing quoting and escaping.</li>
          <li>Producing a reproducible command to paste into a bug report or support ticket.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why are values wrapped in single quotes?</Typography>
      <Typography variant="body1">
        Single quotes prevent the shell from interpreting special characters like <code>$</code>, backticks, or
        spaces inside a header value or JSON body. Any single quote inside the value itself is escaped using the{' '}
        <code>&apos;\&apos;&apos;</code> pattern so the generated command still runs correctly.
      </Typography>
      <Typography variant="h3">Why doesn&apos;t the body field show up for GET requests?</Typography>
      <Typography variant="body1">
        GET and DELETE requests conventionally don&apos;t carry a request body, so the body field is hidden for
        methods that don&apos;t typically use one and shown only for POST, PUT, and PATCH.
      </Typography>
      <Typography variant="h3">Does this send the request anywhere?</Typography>
      <Typography variant="body1">
        No — this only builds the command text. Nothing is sent over the network; you run the generated command
        yourself in a terminal when you&apos;re ready.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/curl-command-generator" content={content}>
      <CurlCommandGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CurlCommandGenerator;
