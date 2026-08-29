'use client';

import { useMemo, useState } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const encodeHtml = (input: string): string => {
  if (!input) return '';
  let result = '';
  for (const ch of input) {
    const code = ch.codePointAt(0) ?? 0;
    if (ch === '<' || ch === '>' || ch === '&' || code > 159) {
      result += `&#${code};`;
    } else {
      result += ch;
    }
  }
  return result;
};

const HtmlEncoderContent = () => {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => encodeHtml(input), [input]);

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
        <Typography variant="subtitle1" fontWeight="600">Plain HTML / Text Input:</Typography>
        <TextField
          multiline
          rows={12}
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter HTML to encode (e.g. <div>Hello</div>)..."
        />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight="600">Encoded Output:</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output}>
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </Box>
        <TextField
          multiline
          rows={12}
          fullWidth
          value={output}
          InputProps={{ readOnly: true }}
          placeholder="Encoded output will appear here automatically..."
        />
      </Box>
    </Box>
  );
};

const HtmlEncoder = () => {
  const content = (
    <>
      <Typography variant="h2">How to Encode Text to HTML Entities</Typography>
      <Typography variant="body1">
        Type or paste HTML or plain text into the box above and it encodes to HTML entities instantly — no
        button to click. Characters like <code>&lt;</code>, <code>&gt;</code>, and <code>&amp;</code> have
        special meaning in HTML, so encoding them lets a browser display the literal characters instead of
        interpreting them as markup. This page only encodes; if you need to decode entities back to plain HTML
        instead, use our HTML Entity Encode/Decode tool.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        The text <code>&lt;div&gt;</code> encodes to <code>&amp;#60;div&amp;#62;</code>, so a browser renders
        the literal characters instead of an HTML tag.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Safely displaying code snippets or HTML markup as visible text on a webpage.</li>
          <li>Preventing user-submitted text from being interpreted as HTML (a first layer of XSS defense).</li>
          <li>Preparing HTML characters for embedding inside XML, JSON, or template attributes.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is this enough to prevent XSS attacks on its own?</Typography>
      <Typography variant="body1">
        Encoding output is one important layer of defense, but a complete security approach also includes
        proper input validation and context-aware escaping throughout your application.
      </Typography>
      <Typography variant="h3">Which characters get encoded?</Typography>
      <Typography variant="body1">
        Angle brackets, ampersands, and non-ASCII characters are converted into their numeric HTML entity
        equivalents (e.g. <code>&amp;#60;</code>), leaving standard ASCII letters, numbers, and punctuation
        untouched.
      </Typography>
      <Typography variant="h3">Does this tool also decode HTML entities?</Typography>
      <Typography variant="body1">
        This page is encode-only, for a simpler, focused experience. Use our HTML Entity Encode/Decode tool if
        you need to convert entities back into plain HTML.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/converters/html-encoder" content={content}>
      <HtmlEncoderContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default HtmlEncoder;
