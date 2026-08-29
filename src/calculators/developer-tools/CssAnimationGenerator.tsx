'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Slider, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ReplayIcon from '@mui/icons-material/Replay';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Preset = 'fade' | 'slide' | 'spin' | 'bounce';

const KEYFRAMES: Record<Preset, string> = {
  fade: '0% { opacity: 0; }\n  100% { opacity: 1; }',
  slide: '0% { transform: translateX(-100%); }\n  100% { transform: translateX(0); }',
  spin: '0% { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }',
  bounce: '0%, 100% { transform: translateY(0); }\n  50% { transform: translateY(-30px); }',
};

const TIMING_FUNCTIONS = ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'];
const DIRECTIONS = ['normal', 'reverse', 'alternate', 'alternate-reverse'];

const CssAnimationGeneratorContent = () => {
  const [name, setName] = useState('my-animation');
  const [preset, setPreset] = useState<Preset>('bounce');
  const [duration, setDuration] = useState(1.5);
  const [timing, setTiming] = useState(TIMING_FUNCTIONS[4]);
  const [iterations, setIterations] = useState('infinite');
  const [direction, setDirection] = useState(DIRECTIONS[0]);
  const [replayKey, setReplayKey] = useState(0);

  const safeName = name.trim() || 'my-animation';

  const css = useMemo(() => (
    `@keyframes ${safeName} {\n  ${KEYFRAMES[preset]}\n}\n\n.element {\n  animation: ${safeName} ${duration}s ${timing} ${iterations} ${direction};\n}`
  ), [safeName, preset, duration, timing, iterations, direction]);

  const copy = () => navigator.clipboard.writeText(css);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Animation Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
        <FormControl fullWidth>
          <InputLabel>Preset</InputLabel>
          <Select value={preset} label="Preset" onChange={(e) => setPreset(e.target.value as Preset)}>
            <MenuItem value="fade">Fade In</MenuItem>
            <MenuItem value="slide">Slide In</MenuItem>
            <MenuItem value="spin">Spin</MenuItem>
            <MenuItem value="bounce">Bounce</MenuItem>
          </Select>
        </FormControl>
        <Box>
          <Typography variant="subtitle2" mb={1}>Duration: {duration}s</Typography>
          <Slider value={duration} min={0.2} max={5} step={0.1} onChange={(_, v) => setDuration(v as number)} />
        </Box>
        <FormControl fullWidth>
          <InputLabel>Timing Function</InputLabel>
          <Select value={timing} label="Timing Function" onChange={(e) => setTiming(e.target.value)}>
            {TIMING_FUNCTIONS.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Iteration Count</InputLabel>
          <Select value={iterations} label="Iteration Count" onChange={(e) => setIterations(e.target.value)}>
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="3">3</MenuItem>
            <MenuItem value="infinite">infinite</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Direction</InputLabel>
          <Select value={direction} label="Direction" onChange={(e) => setDirection(e.target.value)}>
            {DIRECTIONS.map((d) => <MenuItem key={d} value={d}>{d}</MenuItem>)}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Paper variant="outlined" sx={{ p: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 140, bgcolor: 'action.hover', overflow: 'hidden' }}>
          <style>{`@keyframes ${safeName}-preview { ${KEYFRAMES[preset]} }`}</style>
          <Box
            key={replayKey}
            sx={{
              width: 56, height: 56, borderRadius: 2, bgcolor: 'primary.main',
              animation: `${safeName}-preview ${duration}s ${timing} ${iterations} ${direction}`,
            }}
          />
        </Paper>
        <Button variant="outlined" startIcon={<ReplayIcon />} onClick={() => setReplayKey((k) => k + 1)}>
          Replay Animation
        </Button>

        <Box sx={{ position: 'relative' }}>
          <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.900', color: '#10b981', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
            {css}
          </Paper>
          <Button variant="contained" size="small" startIcon={<ContentCopyIcon />} onClick={copy} sx={{ position: 'absolute', top: 8, right: 8 }}>
            Copy
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

const CssAnimationGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">Free CSS Animation Generator</Typography>
      <Typography variant="body1">
        Build a CSS <code>@keyframes</code> animation from ready-made presets — fade, slide, spin, or bounce —
        and customize duration, timing, iteration count, and direction, with a live preview and a Replay button.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Name your animation, pick a preset, and adjust the duration, timing function, iteration count, and
        direction. Watch the preview box animate live, then copy the generated <code>@keyframes</code> and
        <code>animation</code> CSS.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Choosing "Bounce" with a 1.5s duration and infinite iterations generates a
        <code>@keyframes</code> block that translates an element up and down repeatedly — a common loading or
        attention-grabbing effect.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Adding an entrance animation (fade or slide) to a modal or card component.</li>
          <li>Building a loading spinner using the Spin preset.</li>
          <li>Creating an attention-drawing bounce effect for a call-to-action button.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why doesn't my animation restart when I change settings?</Typography>
      <Typography variant="body1">
        Some browsers won't replay a CSS animation just because its properties changed if it's already running
        the same keyframe name — click "Replay Animation" to force a fresh restart in the preview.
      </Typography>
      <Typography variant="h3">Can I combine multiple keyframe effects?</Typography>
      <Typography variant="body1">
        Yes — copy this generator's output and add more properties inside the same <code>@keyframes</code>
        percentage steps (like combining <code>opacity</code> and <code>transform</code> together).
      </Typography>
      <Typography variant="h3">Is my data uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — the CSS is generated and previewed entirely client-side in your browser.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/css-animation-generator" content={content}>
      <CssAnimationGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CssAnimationGenerator;
