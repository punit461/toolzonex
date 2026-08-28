'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Button, Paper } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const UrlEncoderContent = () => {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => (input ? encodeURIComponent(input) : ''), [input]);

  const copyToClipboard = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TextField
        label="Text to Encode"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        multiline
        rows={4}
        fullWidth
        placeholder="Enter text, URLs, or special characters..."
        sx={{ fontFamily: 'monospace' }}
      />

      {output && (
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle1" fontWeight={600}>URL-Encoded Output</Typography>
            <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyToClipboard}>
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </Box>
          <Paper sx={{ p: 2, bgcolor: 'grey.50', fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-all', overflow: 'auto' }}>
            {output}
          </Paper>
        </Paper>
      )}
    </Box>
  );
};

const UrlEncoder = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the URL Encoder</Typography>
      <Typography variant="body1">
        Paste or type your text into the box above — it converts to a percent-encoded, URL-safe string automatically
        as you type. This tool only encodes; if you need to decode a URL-encoded string back to plain text, use our
        dedicated URL Decoder, or the combined URL Encode/Decode tool if you need both in one place.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Encoding <code>hello world!</code> produces <code>hello%20world%21</code>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Encoding URL query parameters with special characters or unicode.</li>
          <li>Preparing plain text for safe inclusion inside a URL.</li>
          <li>Testing API endpoints that require URL-encoded request bodies.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What characters are encoded?</strong> Spaces, special characters (!, @, #, etc.), and non-ASCII characters (unicode) are converted to percent-encoded form (%XX).</li>
          <li><strong>What is percent encoding?</strong> It is the standard encoding used in URLs where unsafe characters are replaced with % followed by two hex digits.</li>
          <li><strong>Does this tool also decode URL-encoded strings?</strong> This page is encode-only, for a simpler, focused experience. Use our dedicated URL Decoder tool if you need to decode instead.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/url-encoder" content={content}>
      <UrlEncoderContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default UrlEncoder;
