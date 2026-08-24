'use client';

import { useMemo, useState } from 'react';
import { Box, Button, Typography, TextField, Paper } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface RangeMap {
  upperBase?: number;
  lowerBase?: number;
  digitBase?: number;
  overrides?: Record<string, string>;
}

function mapByRange(text: string, { upperBase, lowerBase, digitBase, overrides = {} }: RangeMap): string {
  return text
    .split('')
    .map((ch) => {
      if (overrides[ch]) return overrides[ch];
      const code = ch.charCodeAt(0);
      if (upperBase !== undefined && code >= 65 && code <= 90) return String.fromCodePoint(upperBase + (code - 65));
      if (lowerBase !== undefined && code >= 97 && code <= 122) return String.fromCodePoint(lowerBase + (code - 97));
      if (digitBase !== undefined && code >= 48 && code <= 57) return String.fromCodePoint(digitBase + (code - 48));
      return ch;
    })
    .join('');
}

function circledText(text: string): string {
  return text
    .split('')
    .map((ch) => {
      if (ch === '0') return '⓪';
      const code = ch.charCodeAt(0);
      if (code >= 49 && code <= 57) return String.fromCodePoint(0x2460 + (code - 49));
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x24B6 + (code - 65));
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x24D0 + (code - 97));
      return ch;
    })
    .join('');
}

const SMALL_CAPS_LOWER: Record<string, string> = {
  a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ꜰ', g: 'ɢ',
  h: 'ʜ', i: 'ɪ', j: 'ᴊ', k: 'ᴋ', l: 'ʟ', m: 'ᴍ', n: 'ɴ',
  o: 'ᴏ', p: 'ᴘ', q: 'ꞯ', r: 'ʀ', s: 'ꜱ', t: 'ᴛ', u: 'ᴜ',
  v: 'ᴠ', w: 'ᴡ', x: 'x', y: 'ʏ', z: 'ᴢ',
};
const SMALL_CAPS_MAP: Record<string, string> = {};
Object.entries(SMALL_CAPS_LOWER).forEach(([lower, glyph]) => {
  SMALL_CAPS_MAP[lower] = glyph;
  SMALL_CAPS_MAP[lower.toUpperCase()] = glyph;
});

const STYLES: { name: string; convert: (text: string) => string }[] = [
  { name: 'Bold', convert: (t) => mapByRange(t, { upperBase: 0x1D400, lowerBase: 0x1D41A, digitBase: 0x1D7CE }) },
  { name: 'Italic', convert: (t) => mapByRange(t, { upperBase: 0x1D434, lowerBase: 0x1D44E, overrides: { h: 'ℎ' } }) },
  { name: 'Bold Italic', convert: (t) => mapByRange(t, { upperBase: 0x1D468, lowerBase: 0x1D482 }) },
  { name: 'Script', convert: (t) => mapByRange(t, { upperBase: 0x1D4D0, lowerBase: 0x1D4EA }) },
  { name: 'Fraktur', convert: (t) => mapByRange(t, { upperBase: 0x1D56C, lowerBase: 0x1D586 }) },
  {
    name: 'Double-Struck',
    convert: (t) => mapByRange(t, {
      upperBase: 0x1D538,
      lowerBase: 0x1D552,
      digitBase: 0x1D7D8,
      overrides: { C: 'ℂ', H: 'ℍ', N: 'ℕ', P: 'ℙ', Q: 'ℚ', R: 'ℝ', Z: 'ℤ' },
    }),
  },
  { name: 'Small Caps', convert: (t) => mapByRange(t, { overrides: SMALL_CAPS_MAP }) },
  { name: 'Circled', convert: circledText },
];

const StyleRow = ({ label, output }: { label: string; output: string }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <Paper variant="outlined" sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
      <Box sx={{ minWidth: 0 }}>
        <Typography variant="caption" color="text.secondary">{label}</Typography>
        <Typography sx={{ fontSize: '1.25rem', wordBreak: 'break-word' }}>{output || '—'}</Typography>
      </Box>
      <Button size="small" startIcon={<ContentCopyIcon />} onClick={copy} disabled={!output} sx={{ flexShrink: 0 }}>
        {copied ? 'Copied!' : 'Copy'}
      </Button>
    </Paper>
  );
};

const FancyTextGeneratorContent = () => {
  const [text, setText] = useState('Hello World');

  const outputs = useMemo(() => STYLES.map((s) => ({ name: s.name, output: s.convert(text) })), [text]);

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
        {outputs.map((o) => (
          <StyleRow key={o.name} label={o.name} output={o.output} />
        ))}
      </Box>
    </Box>
  );
};

const FancyTextGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How the Fancy Text Generator Works</Typography>
      <Typography variant="body1">
        This tool doesn&apos;t change your font — instead, it maps each letter to a different, visually styled
        character that already exists in the Unicode standard, such as Mathematical Bold, Script, Fraktur, and
        Double-Struck letters, plus Small Caps and Circled letters. Because these are real Unicode characters
        (not a custom font), the styled text can be copied and pasted anywhere plain text is accepted.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Type your text into the input box.</li>
          <li>Every style updates instantly below — Bold, Italic, Bold Italic, Script, Fraktur, Double-Struck, Small Caps, and Circled.</li>
          <li>Click Copy next to any style to copy that version to your clipboard.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Typing &quot;Hello&quot; produces 𝐇𝐞𝐥𝐥𝐨 (Bold), 𝓗𝓮𝓵𝓵𝓸 (Script), 𝕳𝖊𝖑𝖑𝖔 (Fraktur), and
        {' '}ⓗⓔⓛⓛⓞ (Circled), among the other styles shown above.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Making an Instagram, TikTok, or Twitter/X bio stand out with a styled name or tagline.</li>
          <li>Adding stylized text to Discord messages, usernames, or server names.</li>
          <li>Creating eye-catching headings for platforms that don&apos;t support real text formatting.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Will this fancy text work everywhere I paste it?</Typography>
      <Typography variant="body1">
        In most modern apps and browsers, yes — since these are standard Unicode characters. Some older systems,
        certain fonts, or platforms with limited Unicode support may show missing-character boxes instead of the
        styled glyphs, so it&apos;s worth previewing on the platform you plan to use it on.
      </Typography>
      <Typography variant="h3">Is this the same as real bold or italic formatting?</Typography>
      <Typography variant="body1">
        No — real bold/italic formatting (like in a word processor) uses styling metadata on regular letters,
        while this tool substitutes entirely different Unicode characters that only look bold or italic. Screen
        readers and search engines generally don&apos;t recognize these characters as actual bold or italic
        text, and some may not read them correctly at all, so avoid using them for important accessible content.
      </Typography>
      <Typography variant="h3">Why do some Small Caps letters look like normal lowercase letters?</Typography>
      <Typography variant="body1">
        Unicode doesn&apos;t define a true small-capital character for every letter of the alphabet. Where no
        dedicated small-caps character exists (such as &quot;x&quot;), the regular lowercase letter is used
        instead as the closest available fallback.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/fancy-text-generator" content={content}>
      <FancyTextGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default FancyTextGenerator;
