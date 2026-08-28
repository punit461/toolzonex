'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, Button, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const SUPERSCRIPT: Record<string, string> = {
  '0': '\u2070', '1': '\u00B9', '2': '\u00B2', '3': '\u00B3', '4': '\u2074',
  '5': '\u2075', '6': '\u2076', '7': '\u2077', '8': '\u2078', '9': '\u2079',
};
const SMALL_CAPS: Record<string, string> = {
  a: '\u1D00', b: '\u0299', c: '\u1D04', d: '\u1D05', e: '\u1D07',
  f: '\uA730', g: '\u0262', h: '\u029C', i: '\u026A', j: '\u0249',
  k: '\u1D0B', l: '\u029F', m: '\u1D0D', n: '\u0274', o: '\u1D0F',
  p: '\u1D18', q: '\u01EB', r: '\u0280', s: '\uA731', t: '\u1D1B',
  u: '\u1D1C', v: '\u028B', w: '\u1D20', x: '\u1D22', y: '\u028F',
  z: '\u1D22',
};

function toSuperscript(text: string): string {
  return text.split('').map((ch) => SUPERSCRIPT[ch] || ch).join('');
}

function toSmallCaps(text: string): string {
  return text.split('').map((ch) => {
    const lower = ch.toLowerCase();
    if (ch === ch.toUpperCase() && ch !== ch.toLowerCase()) {
      return SMALL_CAPS[lower] || ch;
    }
    return SMALL_CAPS[lower] || ch;
  }).join('');
}

const SmallTextGeneratorContent = () => {
  const [text, setText] = useState('Hello World');
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const outputs = useMemo(() => [
    { label: 'Superscript', value: toSuperscript(text) },
    { label: 'Small Caps', value: toSmallCaps(text) },
  ], [text]);

  const copyText = async (value: string, idx: number) => {
    await navigator.clipboard.writeText(value);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1500);
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

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {outputs.map((o, idx) => (
          <Paper key={o.label} variant="outlined" sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="caption" color="text.secondary">{o.label}</Typography>
              <Typography sx={{ fontSize: '1.25rem', wordBreak: 'break-word' }}>{o.value || '\u2014'}</Typography>
            </Box>
            <IconButton size="small" onClick={() => copyText(o.value, idx)} sx={{ flexShrink: 0 }}>
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

const SmallTextGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">Free Small Text Generator</Typography>
      <Typography variant="body1">
        Convert your text into tiny superscript and small-cap Unicode characters. Copy the output and paste it anywhere that accepts plain text — social media bios, usernames, messages, and more.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Type your text in the input field. Two styles are generated instantly: superscript (like ʜᴇʟʟᴏ) and small caps (like HELLO using small Unicode glyphs). Click the copy icon next to any style to copy it to your clipboard.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Typing &quot;Hello&quot; produces <strong>ᴴᵉˡˡᵒ</strong> (superscript) and <strong>ʜᴇʟʟᴏ</strong> (small caps). These are real Unicode characters, not a CSS trick — they work when pasted into any plain-text field.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Making your Instagram or TikTok bio stand out with unique text styling.</li>
          <li>Creating eye-catching Discord or Twitter usernames.</li>
          <li>Adding styled math-like notation to messages without rich text support.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Will this small text work everywhere?</Typography>
      <Typography variant="body1">
        Most modern apps and browsers support these Unicode characters. Some older platforms or apps with limited Unicode support may show placeholder boxes instead.
      </Typography>
      <Typography variant="h3">Is this the same as using a smaller font size?</Typography>
      <Typography variant="body1">
        No — these are different Unicode characters that happen to look smaller. The actual font size remains the same; only the visual appearance of the glyphs changes.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/small-text-generator" content={content}>
      <SmallTextGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default SmallTextGenerator;
