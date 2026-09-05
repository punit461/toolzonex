'use client';

import { useMemo, useState } from 'react';
import { Box, Button, Typography, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Style = 'single' | 'double' | 'asterisk' | 'hash';

const STYLE_CHARS: Record<Style, { tl: string; tr: string; bl: string; br: string; h: string; v: string }> = {
  single: { tl: '┌', tr: '┐', bl: '└', br: '┘', h: '─', v: '│' },
  double: { tl: '╔', tr: '╗', bl: '╚', br: '╝', h: '═', v: '║' },
  asterisk: { tl: '*', tr: '*', bl: '*', br: '*', h: '*', v: '*' },
  hash: { tl: '#', tr: '#', bl: '#', br: '#', h: '#', v: '#' },
};

function buildFrame(text: string, style: Style): string {
  const lines = text.length ? text.split('\n') : [''];
  const width = Math.max(...lines.map((l) => l.length));
  const { tl, tr, bl, br, h, v } = STYLE_CHARS[style];

  const top = tl + h.repeat(width + 2) + tr;
  const bottom = bl + h.repeat(width + 2) + br;
  const middle = lines.map((line) => `${v} ${line.padEnd(width)} ${v}`);

  return [top, ...middle, bottom].join('\n');
}

const STYLE_OPTIONS: { value: Style; label: string }[] = [
  { value: 'single', label: 'Single Line' },
  { value: 'double', label: 'Double Line' },
  { value: 'asterisk', label: 'Asterisk' },
  { value: 'hash', label: 'Hash' },
];

const TextFrameGeneratorContent = () => {
  const [input, setInput] = useState('Hello World');
  const [style, setStyle] = useState<Style>('single');
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => buildFrame(input, style), [input, style]);

  const copyResult = async () => {
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
        label="Text to Frame"
        placeholder="Enter one or more lines..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        multiline
        rows={4}
        fullWidth
      />

      <Box>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>Border style:</Typography>
        <ToggleButtonGroup
          value={style}
          exclusive
          onChange={(_, v) => v && setStyle(v)}
          sx={{ flexWrap: 'wrap', gap: 1, '& .MuiToggleButtonGroup-grouped': { border: '1px solid', borderColor: 'divider !important', borderRadius: '4px !important' } }}
        >
          {STYLE_OPTIONS.map((s) => (
            <ToggleButton key={s.value} value={s.value} size="small">{s.label}</ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" fontWeight="600">Framed Output:</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyResult} disabled={!output}>
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </Box>
        <Box
          component="pre"
          sx={{
            m: 0,
            p: 2,
            bgcolor: 'action.hover',
            borderRadius: 1,
            fontFamily: 'monospace',
            fontSize: '0.95rem',
            overflowX: 'auto',
            minHeight: 120,
          }}
        >
          {output || ' '}
        </Box>
      </Box>
    </Box>
  );
};

const TextFrameGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Text Frame Generator</Typography>
      <Typography variant="body1">
        Type or paste one or more lines of text and pick a border style — single-line Unicode box-drawing,
        double-line, asterisk, or hash. The tool measures the width of your longest line, pads every line evenly,
        and wraps the whole block in a properly aligned decorative border or text box, ready to copy as plain
        monospace text.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Typing <code>Hello World</code> with the Single Line style produces:
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem', whiteSpace: 'pre' }}>
        {'┌───────────────┐\n│ Hello World   │\n└───────────────┘'}
      </Box>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Framing an announcement or heading in a plain-text README, forum post, or code comment.</li>
          <li>Building a simple text box around a warning or note inside a Discord code block.</li>
          <li>Adding a decorative border to ASCII art or a signature block.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Can I frame multiple lines at once?</strong> Yes — enter as many lines as you like; every line is padded to match the width of the longest line so the border stays perfectly aligned.</li>
          <li><strong>Will the border display correctly everywhere?</strong> It requires a monospace font that preserves spacing exactly, such as a code block, plain text editor, or terminal — rich-text editors that use a proportional font may misalign it.</li>
          <li><strong>What is the difference between this and a "text box" generator?</strong> They describe the same idea — this tool covers both, wrapping your text in a padded, aligned decorative border regardless of whether you call it a frame or a box.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/text-frame-generator" content={content}>
      <TextFrameGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TextFrameGenerator;
