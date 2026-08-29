'use client';

import { useMemo, useState } from 'react';
import { Box, Button, Typography, TextField, Paper } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function toFullWidth(text: string): string {
  return text
    .split('')
    .map((ch) => {
      const code = ch.charCodeAt(0);
      if (ch === ' ') return '　';
      if (code >= 0x21 && code <= 0x7e) return String.fromCodePoint(0xff01 + (code - 0x21));
      return ch;
    })
    .join('');
}

const WideTextGeneratorContent = () => {
  const [text, setText] = useState('Hello World');
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => toFullWidth(text), [text]);

  const copy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable; silently ignore
    }
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

      <Paper variant="outlined" sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
        <Typography sx={{ fontSize: '1.35rem', wordBreak: 'break-word' }}>{output || '—'}</Typography>
        <Button size="small" startIcon={<ContentCopyIcon />} onClick={copy} disabled={!output} sx={{ flexShrink: 0 }}>
          {copied ? 'Copied!' : 'Copy'}
        </Button>
      </Paper>
    </Box>
  );
};

const WideTextGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How the Wide Text Generator Works</Typography>
      <Typography variant="body1">
        This tool converts your normal text into full-width Unicode characters — a set of letters, numbers,
        and symbols that render wider and more spaced out than usual, giving a stylized &quot;wide&quot; look
        (like &quot;Ｈｅｌｌｏ&quot;). Because these are real Unicode characters rather than a custom font,
        the output can be copied and pasted anywhere plain text is accepted.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Type your text into the input box.</li>
          <li>The wide, full-width version updates instantly below.</li>
          <li>Click &quot;Copy&quot; to copy the styled text to your clipboard.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Typing &quot;Hello World&quot; produces &quot;Ｈｅｌｌｏ　Ｗｏｒｌｄ&quot; — the same letters,
        rendered in a wide, evenly spaced full-width form.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Making a social media bio, caption, or username stand out with a spaced-out look.</li>
          <li>Styling a heading or title for platforms that don&apos;t support real text formatting.</li>
          <li>Adding a stylized effect to Discord messages, server names, or usernames.</li>
          <li>Creating an aesthetic text effect for a design mockup or graphic.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Will this wide text work everywhere I paste it?</Typography>
      <Typography variant="body1">
        In most modern apps and browsers, yes, since these are standard Unicode characters. Some older systems
        or fonts with limited Unicode support may not render every character correctly, so it&apos;s worth
        previewing on the platform you plan to use it on.
      </Typography>
      <Typography variant="h3">Does this work the same as the Fancy Text Generator?</Typography>
      <Typography variant="body1">
        Both tools remap your text to different Unicode characters, but this one focuses specifically on the
        full-width forms that create a wide, spaced-out look, while the Fancy Text Generator offers a broader
        range of styles like Bold, Script, and Fraktur.
      </Typography>
      <Typography variant="h3">Does it convert numbers and punctuation too?</Typography>
      <Typography variant="body1">
        Yes — letters, numbers, and most common punctuation are all converted to their full-width Unicode
        equivalents, and spaces become a full-width space for consistent spacing.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/generators/wide-text-generator" content={content}>
      <WideTextGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default WideTextGenerator;
