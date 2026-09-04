'use client';

import { useMemo, useState } from 'react';
import { Box, Button, Typography, TextField, Paper, ToggleButton, ToggleButtonGroup } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function hollowCircledChar(ch: string): string {
  if (ch === '0') return '⓪';
  const code = ch.charCodeAt(0);
  if (code >= 49 && code <= 57) return String.fromCodePoint(0x2460 + (code - 49));
  if (code >= 65 && code <= 90) return String.fromCodePoint(0x24B6 + (code - 65));
  if (code >= 97 && code <= 122) return String.fromCodePoint(0x24D0 + (code - 97));
  return ch;
}

function hollowBubbleText(text: string): string {
  return text.split('').map(hollowCircledChar).join('');
}

function filledBubbleText(text: string): string {
  return text
    .split('')
    .map((ch) => {
      const code = ch.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x1f150 + (code - 65));
      return hollowCircledChar(ch);
    })
    .join('');
}

type Mode = 'hollow' | 'filled';

const BubbleTextGeneratorContent = () => {
  const [text, setText] = useState('Hello World');
  const [mode, setMode] = useState<Mode>('hollow');
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => (mode === 'hollow' ? hollowBubbleText(text) : filledBubbleText(text)), [text, mode]);

  const copy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
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
        onChange={(_e, val) => val && setMode(val)}
        fullWidth
        color="primary"
      >
        <ToggleButton value="hollow">Hollow Bubble (ⓐⓑⓒ)</ToggleButton>
        <ToggleButton value="filled">Filled Bubble (🅰🅱🅲)</ToggleButton>
      </ToggleButtonGroup>

      <Paper variant="outlined" sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
        <Typography sx={{ fontSize: '1.5rem', wordBreak: 'break-word', minWidth: 0 }}>{output || '—'}</Typography>
        <Button size="small" startIcon={<ContentCopyIcon />} onClick={copy} disabled={!output} sx={{ flexShrink: 0 }}>
          {copied ? 'Copied!' : 'Copy'}
        </Button>
      </Paper>
    </Box>
  );
};

const BubbleTextGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How the Bubble Text Generator Works</Typography>
      <Typography variant="body1">
        This tool converts your text into &quot;bubble letters&quot; using real Unicode characters — no custom
        font required, so the result can be copied and pasted anywhere plain text is accepted. It supports two
        styles: <strong>Hollow</strong>, which uses the Unicode Circled Letters and Digits block (ⓐⓑⓒ, works
        for uppercase, lowercase, and digits), and <strong>Filled</strong>, which uses the Negative Circled
        Latin Capital Letters block (🅰🅱🅲) for a bold, solid bubble look.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Type your text into the input box.</li>
          <li>Choose Hollow or Filled bubble style.</li>
          <li>Click Copy to copy the result to your clipboard.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Typing &quot;ABC&quot; in Hollow mode gives ⒶⒷⒸ, while Filled mode gives 🅰🅱🅲. Typing lowercase
        &quot;abc&quot; in either mode gives ⓐⓑⓒ, since Unicode only defines filled bubble glyphs for
        uppercase letters.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Making a bold, bubbly username or bio for Instagram, TikTok, or Discord.</li>
          <li>Adding eye-catching bubble letters to social media captions or comments.</li>
          <li>Creating stylized headings for platforms that don&apos;t support rich text formatting.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why do lowercase letters and numbers look hollow even in Filled mode?</Typography>
      <Typography variant="body1">
        Unicode only defines &quot;Negative Circled&quot; (filled) glyphs for the 26 uppercase Latin letters
        A-Z. There&apos;s no equivalent filled character for lowercase letters or digits, so this tool
        automatically falls back to the hollow circled version for any character without a filled equivalent.
      </Typography>
      <Typography variant="h3">Will bubble text work everywhere I paste it?</Typography>
      <Typography variant="body1">
        In most modern apps and browsers, yes — these are standard Unicode characters. Some older systems,
        fonts, or apps with limited Unicode/emoji support may not render every glyph correctly, so it&apos;s
        worth previewing on the platform you plan to use it on.
      </Typography>
      <Typography variant="h3">Is this the same as the site&apos;s Fancy Text Generator?</Typography>
      <Typography variant="body1">
        This tool is a focused, single-purpose bubble-letter generator with both hollow and filled styles side
        by side. Our Fancy Text Generator offers a broader set of Unicode text styles (Bold, Italic, Script,
        Fraktur, Double-Struck, Small Caps, and Circled) if you want more variety in one place.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/generators/bubble-text-generator" content={content}>
      <BubbleTextGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BubbleTextGenerator;
