'use client';

import { useState, useMemo } from 'react';
import { Box, Typography, Paper, Slider, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Harmony = 'complementary' | 'analogous' | 'triadic' | 'split-complementary' | 'tetradic' | 'monochromatic';

const HARMONY_OFFSETS: Record<Harmony, number[]> = {
  complementary: [0, 180],
  analogous: [0, 30, -30],
  triadic: [0, 120, 240],
  'split-complementary': [0, 150, 210],
  tetradic: [0, 90, 180, 270],
  monochromatic: [0, 0, 0, 0],
};

const hslToHex = (h: number, s: number, l: number) => {
  h = ((h % 360) + 360) % 360;
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const toHex = (v: number) => Math.round(v * 255).toString(16).padStart(2, '0');
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`.toUpperCase();
};

const WHEEL_SIZE = 260;
const RADIUS = WHEEL_SIZE / 2;

const ColorWheelContent = () => {
  const [baseHue, setBaseHue] = useState(210);
  const [saturation, setSaturation] = useState(70);
  const [lightness, setLightness] = useState(50);
  const [harmony, setHarmony] = useState<Harmony>('complementary');
  const [copied, setCopied] = useState<string | null>(null);

  const swatches = useMemo(() => {
    const offsets = HARMONY_OFFSETS[harmony];
    return offsets.map((offset, i) => {
      const l = harmony === 'monochromatic' ? Math.max(15, Math.min(90, lightness - 25 + i * 20)) : lightness;
      return {
        hue: baseHue + offset,
        hex: hslToHex(baseHue + offset, saturation, l),
      };
    });
  }, [baseHue, saturation, lightness, harmony]);

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied(null), 1200);
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '280px 1fr' }, gap: 4 }}>
      {/* Wheel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <Box
          sx={{
            position: 'relative',
            width: WHEEL_SIZE,
            height: WHEEL_SIZE,
            borderRadius: '50%',
            background: 'conic-gradient(from 0deg, red, yellow, lime, cyan, blue, magenta, red)',
            boxShadow: 3,
          }}
        >
          {swatches.map((s, i) => {
            const angleRad = (s.hue - 90) * (Math.PI / 180);
            const dist = RADIUS - 18;
            const x = RADIUS + dist * Math.cos(angleRad);
            const y = RADIUS + dist * Math.sin(angleRad);
            return (
              <Tooltip title={s.hex} key={i} arrow>
                <Box
                  onClick={() => handleCopy(s.hex)}
                  sx={{
                    position: 'absolute',
                    left: x - 14,
                    top: y - 14,
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    bgcolor: s.hex,
                    border: '3px solid white',
                    boxShadow: 2,
                    cursor: 'pointer',
                    fontSize: 10,
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {i === 0 && (
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'white', opacity: 0.9 }} />
                  )}
                </Box>
              </Tooltip>
            );
          })}
        </Box>

        <Box sx={{ width: '100%' }}>
          <Typography variant="body2" color="text.secondary" mb={0.5}>Base Hue: {Math.round(((baseHue % 360) + 360) % 360)}°</Typography>
          <Slider value={baseHue} min={0} max={359} onChange={(_, v) => setBaseHue(v as number)} />
        </Box>
        <Box sx={{ width: '100%' }}>
          <Typography variant="body2" color="text.secondary" mb={0.5}>Saturation: {saturation}%</Typography>
          <Slider value={saturation} min={0} max={100} onChange={(_, v) => setSaturation(v as number)} />
        </Box>
        <Box sx={{ width: '100%' }}>
          <Typography variant="body2" color="text.secondary" mb={0.5}>Lightness: {lightness}%</Typography>
          <Slider value={lightness} min={10} max={90} onChange={(_, v) => setLightness(v as number)} />
        </Box>
      </Box>

      {/* Harmony + swatches */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box>
          <Typography variant="subtitle2" mb={1}>Color Harmony</Typography>
          <ToggleButtonGroup
            value={harmony}
            exclusive
            onChange={(_, v) => v && setHarmony(v)}
            sx={{ flexWrap: 'wrap', gap: 1, '& .MuiToggleButtonGroup-grouped': { border: '1px solid', borderColor: 'divider', borderRadius: '4px !important' } }}
          >
            <ToggleButton value="complementary">Complementary</ToggleButton>
            <ToggleButton value="analogous">Analogous</ToggleButton>
            <ToggleButton value="triadic">Triadic</ToggleButton>
            <ToggleButton value="split-complementary">Split-Comp</ToggleButton>
            <ToggleButton value="tetradic">Tetradic</ToggleButton>
            <ToggleButton value="monochromatic">Monochromatic</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box sx={{ display: 'flex', borderRadius: 2, overflow: 'hidden', boxShadow: 2, minHeight: 140 }}>
          {swatches.map((s, i) => (
            <Box
              key={i}
              onClick={() => handleCopy(s.hex)}
              sx={{
                flex: 1,
                bgcolor: s.hex,
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                pb: 1.5,
                cursor: 'pointer',
                transition: 'flex 0.2s',
                '&:hover': { flex: 1.15 },
              }}
            >
              <Paper sx={{ px: 1, py: 0.5, display: 'flex', alignItems: 'center', gap: 0.5, fontSize: 12 }}>
                <Typography variant="caption" fontWeight="bold">{copied === s.hex ? 'Copied!' : s.hex}</Typography>
                <ContentCopyIcon sx={{ fontSize: 14 }} />
              </Paper>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

const ColorWheel = () => {
  const content = (
    <>
      <Typography variant="h2">Color Wheel &amp; Harmony Generator</Typography>
      <Typography variant="body1">
        Pick a base color and instantly see matching combinations using classic color theory rules —
        complementary, analogous, triadic, split-complementary, tetradic, and monochromatic. Click any
        swatch to copy its HEX code.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Drag the Hue slider (or the Saturation/Lightness sliders) to set your base color, then pick a
        harmony rule. The wheel marks each color&apos;s position and the strip below shows the resulting
        palette. Click a swatch to copy its HEX value to your clipboard.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A base hue of 210° (a blue) with the Triadic rule produces three evenly-spaced hues at 210°,
        330°, and 90° — giving you a vivid blue, pink, and green combination that reads as balanced
        rather than clashing.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Choosing a primary/accent color pairing for a brand or UI.</li>
          <li>Building a balanced palette for illustrations or data visualizations.</li>
          <li>Learning color theory rules (complementary, triadic, etc.) interactively.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What&apos;s the difference between complementary and analogous?</Typography>
      <Typography variant="body1">
        Complementary colors sit opposite each other on the wheel (high contrast, good for accents).
        Analogous colors sit close together (30° apart), producing a calmer, more harmonious look.
      </Typography>
      <Typography variant="h3">What does the monochromatic option do?</Typography>
      <Typography variant="body1">
        It keeps the same hue but varies the lightness, giving you a set of tints and shades of a
        single color — useful for shadows, hover states, or subtle UI variation.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      url="/tools/color-wheel"
      content={content}
    >
      <ColorWheelContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ColorWheel;
