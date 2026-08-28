'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, Button, ToggleButton, ToggleButtonGroup, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const FLIP_MAP: Record<string, string> = {
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
  '1': '\u21C9', '2': '\u218A', '3': '\u218B', '4': '\u2090',
  '!': '\u00A1', '?': '\u00BF', '.': '\u02D9', ',': '\u275D',
  '\'': ',', '"': ',,', '`': ',',
  '(': ')', ')': '(', '[': ']', ']': '[',
  '{': '}', '}': '{', '<': '>', '>': '<',
  '_': '\u203E', '&': '\u214B',
};

function flipText(text: string): string {
  return text.split('').map((ch) => FLIP_MAP[ch] || ch).reverse().join('');
}

function reverseText(text: string): string {
  return text.split('').reverse().join('');
}

const FlipTextContent = () => {
  const [text, setText] = useState('Hello World!');
  const [mode, setMode] = useState<'flip' | 'reverse'>('flip');
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => mode === 'flip' ? flipText(text) : reverseText(text), [text, mode]);

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

      <ToggleButtonGroup
        value={mode}
        exclusive
        onChange={(_, v) => v && setMode(v)}
        fullWidth
      >
        <ToggleButton value="flip">Flip Upside Down</ToggleButton>
        <ToggleButton value="reverse">Reverse Text</ToggleButton>
      </ToggleButtonGroup>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Typography sx={{ fontSize: '1.25rem', wordBreak: 'break-word', fontFamily: 'monospace' }}>{output}</Typography>
          <IconButton size="small" onClick={copyOutput} sx={{ flexShrink: 0 }}>
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Box>
        {copied && <Typography variant="caption" color="primary">Copied!</Typography>}
      </Paper>
    </Box>
  );
};

const FlipText = () => {
  const content = (
    <>
      <Typography variant="h2">Free Flip Text &amp; Upside Down Text Generator</Typography>
      <Typography variant="body1">
        Transform any text into upside-down text or reverse it character by character using Unicode characters. Copy the result and paste it anywhere that supports plain text.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Type your text, choose between &quot;Flip Upside Down&quot; (which maps each character to its Unicode upside-down equivalent and reverses the string) or &quot;Reverse Text&quot; (which simply reverses character order), then click the copy icon.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        &quot;Hello&quot; flipped upside down becomes <strong>o˥˥ǝH</strong>. The same word reversed becomes <strong>olleH</strong>. Punctuation and numbers are also mapped where possible.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Creating fun, upside-down text for social media posts and bios.</li>
          <li>Making a playful profile description or status update.</li>
          <li>Generating backwards text for puzzles or games.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Will the upside-down text work everywhere?</Typography>
      <Typography variant="body1">
        Most modern apps, browsers, and operating systems support these Unicode characters. Some older systems or apps with limited font support may show placeholder boxes for certain glyphs.
      </Typography>
      <Typography variant="h3">Can I paste this into Instagram or Twitter?</Typography>
      <Typography variant="body1">
        Yes — since these are regular Unicode characters (not a special font), they can be pasted into Instagram, Twitter/X, TikTok, Discord, and most other platforms that accept plain text.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/flip-text" content={content}>
      <FlipTextContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default FlipText;
