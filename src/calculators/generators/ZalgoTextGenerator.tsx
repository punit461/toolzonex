'use client';

import { useEffect, useState } from 'react';
import { Box, Typography, Button, Paper, TextField, Slider } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const ZALGO_UP = ['̍', '̎', '̄', '̅', '̿', '̑', '̆', '̐', '͒', '͗', '͑', '̇', '̈', '̊', '͂', '̓', '̈́', '͊', '͋', '͌', '̃', '̂', '̌', '͐', '̀', '́', '̋', '̏', '̒', '̓', '̔', '̽', '̉', 'ͣ', 'ͤ', 'ͥ', 'ͦ', 'ͧ', 'ͨ', 'ͩ', 'ͪ', 'ͫ', 'ͬ', 'ͭ', 'ͮ', 'ͯ'];
const ZALGO_DOWN = ['̖', '̗', '̘', '̙', '̜', '̝', '̞', '̟', '̠', '̤', '̥', '̦', '̩', '̪', '̫', '̬', '̭', '̮', '̯', '̰', '̱', '̲', '̳', '̹', '̺', '̻', '̼', '͇', '͈', '͉', '͍', '͎', '̣'];
const ZALGO_MID = ['̕', '̛', '̀', '́', '͘', '̡', '̢', '̧', '̨', '̴', '̵', '̶', '͜', '͝', '͞', '͟', '͠', '͢'];

const INTENSITY_RANGES: Record<number, { up: [number, number]; mid: [number, number]; down: [number, number] }> = {
  1: { up: [0, 2], mid: [0, 1], down: [0, 2] },
  2: { up: [2, 5], mid: [1, 2], down: [2, 5] },
  3: { up: [5, 10], mid: [2, 4], down: [5, 10] },
};

function pickMarks(pool: string[], min: number, max: number): string {
  const count = min + Math.floor(Math.random() * (max - min + 1));
  let out = '';
  for (let i = 0; i < count; i++) out += pool[Math.floor(Math.random() * pool.length)];
  return out;
}

function zalgify(text: string, intensity: number): string {
  const range = INTENSITY_RANGES[intensity];
  return Array.from(text)
    .map((ch) => {
      if (ch === '\n') return ch;
      return ch + pickMarks(ZALGO_UP, range.up[0], range.up[1]) + pickMarks(ZALGO_MID, range.mid[0], range.mid[1]) + pickMarks(ZALGO_DOWN, range.down[0], range.down[1]);
    })
    .join('');
}

const INTENSITY_LABELS: Record<number, string> = { 1: 'Low', 2: 'Medium', 3: 'High' };

const ZalgoTextGeneratorContent = () => {
  const [input, setInput] = useState('Zalgo text');
  const [intensity, setIntensity] = useState(2);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setOutput(input ? zalgify(input, intensity) : '');
  }, [input, intensity]);

  const regenerate = () => setOutput(input ? zalgify(input, intensity) : '');

  const copyToClipboard = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* clipboard not available */ }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TextField
        label="Enter text"
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type text to corrupt..."
      />

      <Box>
        <Typography variant="subtitle2" color="text.secondary" mb={1}>Intensity: {INTENSITY_LABELS[intensity]}</Typography>
        <Slider
          value={intensity}
          min={1}
          max={3}
          step={1}
          marks={[{ value: 1, label: 'Low' }, { value: 2, label: 'Medium' }, { value: 3, label: 'High' }]}
          onChange={(_, v) => setIntensity(v as number)}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="subtitle1" fontWeight="600">Zalgo Output</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button size="small" onClick={regenerate} disabled={!input}>Regenerate</Button>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output}>
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </Box>
      </Box>
      <Paper variant="outlined" sx={{ p: 3, minHeight: 140, bgcolor: 'grey.50', wordBreak: 'break-word', fontSize: '1.5rem', lineHeight: 2.5 }}>
        {output || <Typography color="text.secondary" variant="body1">Corrupted text will appear here...</Typography>}
      </Paper>
    </Box>
  );
};

const ZalgoTextGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">Free Zalgo Text Generator</Typography>
      <Typography variant="body1">
        Turn any text into "corrupted" or "glitch" text by stacking random combining Unicode diacritical marks
        above, below, and through each character — the classic "Zalgo" effect. Adjust the intensity from a
        subtle wobble to full chaos, then copy the result.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Type your text into the box, then drag the intensity slider between Low, Medium, and High to control how
        many combining marks get stacked on each character. Click "Regenerate" for a fresh random variation at
        the same intensity, and "Copy" to grab the result.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Typing "Zalgo text" at Low intensity produces a mildly glitchy version with just a few marks per
        letter, while High intensity stacks many more marks above and below each character for a dense,
        heavily corrupted look.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Creating spooky, "cursed," or glitchy usernames and messages for games, forums, or social media.</li>
          <li>Adding a corrupted-text effect to a Halloween or horror-themed post.</li>
          <li>Novelty text for chat apps, bios, or creative writing.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is this a real font or an image?</Typography>
      <Typography variant="body1">
        Neither — it's real, plain Unicode text built by layering combining diacritical marks (a standard part
        of the Unicode character set) onto each ordinary letter. Since it's genuine text, not an image, you can
        copy and paste it anywhere that accepts Unicode text, like chat apps, social media bios, or documents.
      </Typography>
      <Typography variant="h3">Why does it look different on different devices?</Typography>
      <Typography variant="body1">
        Very high intensity stacks dozens of combining marks per character, and different fonts and platforms
        render large stacks of combining marks slightly differently — some may truncate, reflow, or clip the
        stack. Lower intensities render far more consistently across platforms.
      </Typography>
      <Typography variant="h3">Will Zalgo text break the platform I paste it into?</Typography>
      <Typography variant="body1">
        It shouldn't break anything, but very high-intensity text can look messy, take up unusual vertical
        space, or get truncated by character limits or content filters on some platforms, since each visual
        character is actually many Unicode code points combined together.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/generators/zalgo-text-generator" content={content}>
      <ZalgoTextGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ZalgoTextGenerator;
