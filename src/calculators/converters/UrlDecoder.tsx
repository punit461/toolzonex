'use client';

import { useMemo, useState } from 'react';
import { Box, Button, Typography, TextField, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const UrlDecoderContent = () => {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  const { output, error } = useMemo(() => {
    if (!input.trim()) return { output: '', error: '' };
    try {
      return { output: decodeURIComponent(input), error: '' };
    } catch {
      return { output: '', error: 'This does not look like a valid URL-encoded string. Check for stray % characters.' };
    }
  }, [input]);

  const copyToClipboard = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" fontWeight="600">URL-Encoded Input:</Typography>
        <TextField
          multiline
          rows={10}
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste a URL-encoded string here, e.g. hello%20world%21"
        />
        {error && <Alert severity="error">{error}</Alert>}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight="600">Decoded Text:</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output}>
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </Box>
        <TextField
          multiline
          rows={10}
          fullWidth
          value={output}
          InputProps={{ readOnly: true }}
          placeholder="Decoded text will appear here automatically..."
        />
      </Box>
    </Box>
  );
};

const UrlDecoder = () => {
  const content = (
    <>
      <Typography variant="h2">How to Decode a URL-Encoded String</Typography>
      <Typography variant="body1">
        Paste a percent-encoded (URL-encoded) string into the box above and it decodes to readable plain text
        instantly — no button to click, no upload, and no account needed. This tool only decodes; if you need to
        URL-encode plain text instead, use our combined URL Encode/Decode tool.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Pasting <code>hello%20world%21</code> decodes instantly to <code>hello world!</code>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Reading a query string parameter copied from a browser address bar.</li>
          <li>Decoding a URL-encoded value found in server logs or API responses.</li>
          <li>Making sense of a long, percent-encoded redirect or tracking link.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why do I see % symbols followed by two characters in encoded URLs?</Typography>
      <Typography variant="body1">
        URL encoding replaces unsafe or reserved characters with a <code>%</code> followed by their two-digit
        hexadecimal code — for example, a space becomes <code>%20</code>. Decoding reverses this back to the
        original character.
      </Typography>
      <Typography variant="h3">Why does decoding sometimes fail?</Typography>
      <Typography variant="body1">
        Decoding fails if the string contains a stray <code>%</code> that isn&apos;t followed by two valid
        hexadecimal digits, since that isn&apos;t valid percent-encoding — double-check the string was copied in
        full.
      </Typography>
      <Typography variant="h3">Does this tool also encode text into a URL-safe format?</Typography>
      <Typography variant="body1">
        This page is decode-only, for a simpler, focused experience. Use our combined URL Encode/Decode tool if
        you need to encode plain text for use in a URL.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/converters/url-decoder" content={content}>
      <UrlDecoderContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default UrlDecoder;
