'use client';

import { useState } from 'react';
import { Box, Button, Typography, Paper, TextField } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CasinoIcon from '@mui/icons-material/Casino';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface GeneratedColor {
  hex: string;
  rgb: string;
  hsl: string;
}

function hexToHsl(r: number, g: number, b: number): string {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn: h = (gn - bn) / d + (gn < bn ? 6 : 0); break;
      case gn: h = (bn - rn) / d + 2; break;
      default: h = (rn - gn) / d + 4;
    }
    h /= 6;
  }

  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

function generateColor(): GeneratedColor {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const hex = `#${[r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')}`;
  return { hex, rgb: `rgb(${r}, ${g}, ${b})`, hsl: hexToHsl(r, g, b) };
}

const CopyField = ({ label, value }: { label: string; value: string }) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // clipboard unavailable; silently ignore
    }
  };
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
      <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{label}: {value}</Typography>
      <Button size="small" startIcon={<ContentCopyIcon fontSize="small" />} onClick={copy}>
        {copied ? 'Copied' : 'Copy'}
      </Button>
    </Box>
  );
};

const ColorCard = ({ color }: { color: GeneratedColor }) => (
  <Paper variant="outlined" sx={{ overflow: 'hidden' }}>
    <Box sx={{ height: 100, bgcolor: color.hex }} />
    <Box sx={{ p: 1.5, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
      <CopyField label="HEX" value={color.hex} />
      <CopyField label="RGB" value={color.rgb} />
      <CopyField label="HSL" value={color.hsl} />
    </Box>
  </Paper>
);

const RandomColorGeneratorContent = () => {
  const [colors, setColors] = useState<GeneratedColor[]>([]);
  const [count, setCount] = useState(1);

  const generate = () => {
    const n = Math.min(Math.max(Math.round(count) || 1, 1), 12);
    setColors(Array.from({ length: n }, generateColor));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
        <TextField
          label="Colors to generate"
          type="number"
          size="small"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          inputProps={{ min: 1, max: 12 }}
          sx={{ width: 160 }}
        />
        <Button variant="contained" size="large" startIcon={<CasinoIcon />} onClick={generate}>
          Generate
        </Button>
      </Box>

      {colors.length === 0 ? (
        <Typography color="text.secondary">Click &quot;Generate&quot; to create a random color palette.</Typography>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' }, gap: 2 }}>
          {colors.map((c, i) => <ColorCard key={i} color={c} />)}
        </Box>
      )}
    </Box>
  );
};

const RandomColorGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How the Random Color Generator Works</Typography>
      <Typography variant="body1">
        This tool picks a fully random color by generating random red, green, and blue values, then converts
        that color into three common formats — HEX, RGB, and HSL — so you can copy whichever one your project
        needs. Set the count above 1 to generate a small palette of several random colors at once.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Choose how many colors to generate (1 to 12).</li>
          <li>Click &quot;Generate&quot; to create random colors, each shown as a swatch with HEX, RGB, and HSL values.</li>
          <li>Click &quot;Copy&quot; next to any format to copy that value to your clipboard.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A generated color might come out as HEX #3fae7c, RGB rgb(63, 174, 124), and HSL hsl(147, 47%, 46%) —
        the same color expressed in three different formats commonly used in design and code.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Finding inspiration for a website, app, or brand color palette.</li>
          <li>Generating placeholder colors for mockups, wireframes, or design systems.</li>
          <li>Quickly converting a random color into the HEX, RGB, or HSL format your CSS or design tool needs.</li>
          <li>Picking a fun random accent color for a personal project or presentation.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Are the colors truly random?</Typography>
      <Typography variant="body1">
        Yes — each color is generated by randomly choosing red, green, and blue values independently, giving
        every one of the 16.7 million possible RGB colors an equal chance of appearing.
      </Typography>
      <Typography variant="h3">What&apos;s the difference between HEX, RGB, and HSL?</Typography>
      <Typography variant="body1">
        HEX and RGB both describe a color by its red, green, and blue components — HEX as a compact hexadecimal
        code and RGB as three decimal numbers. HSL describes the same color using hue, saturation, and
        lightness instead, which some designers find more intuitive for adjusting a color&apos;s shade.
      </Typography>
      <Typography variant="h3">Can I generate more than one color at a time?</Typography>
      <Typography variant="body1">
        Yes — set the &quot;Colors to generate&quot; field to any number up to 12 to create a small random
        palette in one click.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/generators/random-color-generator" content={content}>
      <RandomColorGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RandomColorGenerator;
