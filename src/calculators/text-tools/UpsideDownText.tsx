'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const UPSIDE_DOWN_MAP: Record<string, string> = {
  a: '\u0250', b: 'q', c: '\u0254', d: 'p', e: '\u01DD', f: '\u025F',
  g: '\u0283', h: '\u0265', i: '\u0131', j: '\u027F', k: '\u029E',
  l: '\u026F', m: '\u026E', n: '\u0275', o: 'o', p: 'd', q: 'b',
  r: '\u0279', s: '\u0282', t: '\u0287', u: '\u0148', v: '\u028C',
  w: '\u026D', x: 'x', y: '\u028E', z: '\u0291',
  A: '\u2200', B: '\u0181', C: '\u0186', D: '\u018A', E: '\u018E',
  F: '\u2132', G: '\u018F', H: '\u0191', I: '\u0196', J: '\u0197',
  K: '\u0198', L: '\u023F', M: '\u2221', N: '\u019D', O: '\u019F',
  P: '\u2C63', Q: '\u01A3', R: '\u0280', S: '\u0221', T: '\u01AE',
  U: '\u01B0', V: '\u0245', W: '\u0244', X: '\u2229', Y: '\u024E',
  Z: '\u01B7',
  '0': '0', '1': '\u21C9', '2': '\u218A', '3': '\u218B', '4': '৭',
  '5': '\u2188', '6': '9', '7': '\u02BB', '8': '8', '9': '6',
  '!': '\u00A1', '?': '\u00BF', '.': '\u02D9', ',': '\u275D',
  "'": ',', '"': ',,', '`': ',',
  '(': ')', ')': '(', '[': ']', ']': '[',
  '{': '}', '}': '{', '<': '>', '>': '<',
  '_': '\u203E', '&': '\u214B', ';': '\u061B',
};

function flipToUpsideDown(text: string): string {
  return text
    .split('')
    .map((ch) => UPSIDE_DOWN_MAP[ch] || ch)
    .reverse()
    .join('');
}

const UpsideDownTextContent = () => {
  const [text, setText] = useState('Hello World!');
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => flipToUpsideDown(text), [text]);

  const copyOutput = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TextField
        label="Enter your text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        fullWidth
        placeholder="Type something..."
      />

      <Paper variant="outlined" sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Typography
            sx={{
              fontSize: '1.25rem',
              wordBreak: 'break-word',
              fontFamily: 'monospace',
              lineHeight: 1.8,
              whiteSpace: 'pre-wrap',
            }}
          >
            {output}
          </Typography>
          <IconButton size="small" onClick={copyOutput} sx={{ flexShrink: 0 }}>
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Box>
        {copied && <Typography variant="caption" color="primary">Copied!</Typography>}
      </Paper>
    </Box>
  );
};

const UpsideDownText = () => {
  const content = (
    <>
      <Typography variant="h2">Free Upside Down Text Generator — Flip Text Upside Down</Typography>
      <Typography variant="body1">
        Convert any text into upside-down Unicode characters instantly. Letters, numbers, and common
        punctuation are mapped to their inverted Unicode equivalents. Copy the result and paste it
        anywhere that supports plain text.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Type or paste your text in the input box. The upside-down version appears immediately below.
        Click the copy icon to grab it, then paste it into social media posts, messages, or anywhere
        that accepts plain text.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        &quot;Hello World!&quot; becomes <strong>-symbol ploɹʍ o˥˥ǝH</strong> — each character is replaced with
        its Unicode upside-down counterpart and the entire string is reversed.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Creating fun upside-down text for social media bios and posts.</li>
          <li>Making playful profile descriptions for Instagram, Twitter/X, or TikTok.</li>
          <li>Surprising friends with inverted text in messages or chat.</li>
          <li>Adding novelty text to documents or creative projects.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Will this work on all platforms?</Typography>
      <Typography variant="body1">
        Most modern apps and browsers support these Unicode characters. Some older systems or apps with
        limited font support may show placeholder boxes for less common glyphs.
      </Typography>
      <Typography variant="h3">Can I paste this into Instagram, Twitter, or TikTok?</Typography>
      <Typography variant="body1">
        Yes — since these are standard Unicode characters (not a special font), they paste into
        Instagram, Twitter/X, TikTok, Discord, and most other platforms that accept plain text.
      </Typography>
      <Typography variant="h3">How does it work?</Typography>
      <Typography variant="body1">
        Each character is mapped to its closest Unicode upside-down equivalent, then the entire
        string is reversed so it reads correctly when rotated 180 degrees. Letters, numbers, and
        common punctuation are all supported.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/upside-down-text" content={content}>
      <UpsideDownTextContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default UpsideDownText;
