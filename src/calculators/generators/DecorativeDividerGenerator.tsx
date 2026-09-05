'use client';

import { useMemo, useState } from 'react';
import { Box, Button, Typography, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const PRESETS: { label: string; unit: string }[] = [
  { label: 'Solid Block', unit: '▬' },
  { label: 'Dots', unit: '• ' },
  { label: 'Tildes', unit: '~' },
  { label: 'Double Line', unit: '═' },
  { label: 'Ornate', unit: '※ ' },
  { label: 'Dashes', unit: '--- ' },
];

function buildDivider(unit: string, count: number, ornament: string): string {
  const base = unit.repeat(Math.max(1, count)).trimEnd();
  if (!ornament) return base;
  const mid = Math.floor(base.length / 2);
  return base.slice(0, mid) + ornament + base.slice(mid);
}

const DecorativeDividerGeneratorContent = () => {
  const [presetIdx, setPresetIdx] = useState(0);
  const [count, setCount] = useState('10');
  const [ornament, setOrnament] = useState('');
  const [copied, setCopied] = useState(false);

  const countNum = Math.max(1, Math.min(100, parseInt(count, 10) || 10));
  const output = useMemo(
    () => buildDivider(PRESETS[presetIdx].unit, countNum, ornament),
    [presetIdx, countNum, ornament]
  );

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
      <Box>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>Divider style:</Typography>
        <ToggleButtonGroup
          value={presetIdx}
          exclusive
          onChange={(_, v) => v !== null && setPresetIdx(v)}
          sx={{ flexWrap: 'wrap', gap: 1, '& .MuiToggleButtonGroup-grouped': { border: '1px solid', borderColor: 'divider !important', borderRadius: '4px !important' } }}
        >
          {PRESETS.map((p, i) => (
            <ToggleButton key={p.label} value={i} size="small">{p.label}</ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <TextField
          label="Repeat Count"
          type="number"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          sx={{ width: 160 }}
          inputProps={{ min: 1, max: 100 }}
        />
        <TextField
          label="Center Ornament (optional)"
          value={ornament}
          onChange={(e) => setOrnament(e.target.value.slice(0, 5))}
          sx={{ width: 220 }}
          placeholder="e.g. ✦"
        />
      </Box>

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" fontWeight="600">Divider:</Typography>
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
            fontSize: '1.1rem',
            overflowX: 'auto',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all',
          }}
        >
          {output || ' '}
        </Box>
      </Box>
    </Box>
  );
};

const DecorativeDividerGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Decorative Divider Generator</Typography>
      <Typography variant="body1">
        Pick a preset divider style — solid blocks, dots, tildes, a double line, an ornate pattern, or dashes —
        set how many times the unit repeats, and optionally add a single ornament character to appear in the
        center. Click Copy to grab the finished divider for use as a section break anywhere plain text is
        supported.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Choosing the &quot;Dots&quot; style with a repeat count of 5 and no ornament produces{' '}
        <code>• • • • •</code>. Adding a center ornament of <code>✦</code> inserts it in the middle of the
        divider.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Separating sections in a Discord bio, forum signature, or plain-text document.</li>
          <li>Adding a decorative break between paragraphs in a social media post.</li>
          <li>Building a consistent visual divider style across a series of README sections.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What does the repeat count control?</strong> It sets how many times the chosen style's unit is repeated, which determines the overall length of the divider — a higher count produces a longer line.</li>
          <li><strong>What happens if I add a center ornament?</strong> The ornament character is inserted at the midpoint of the repeated divider, giving the line a focal point without changing its overall style.</li>
          <li><strong>Can I use more than one character as the ornament?</strong> Yes, up to 5 characters, though a single symbol like ✦ or ❖ usually looks cleanest centered in a divider.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/decorative-divider-generator" content={content}>
      <DecorativeDividerGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default DecorativeDividerGenerator;
