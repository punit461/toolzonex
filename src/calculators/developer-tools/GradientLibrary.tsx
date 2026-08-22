'use client';

import { useState, useMemo } from 'react';
import { Box, Typography, Paper, Chip, IconButton, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface GradientPreset {
  name: string;
  tags: string[];
  angle: number;
  colors: string[];
}

const GRADIENTS: GradientPreset[] = [
  { name: 'Sunset', tags: ['warm'], angle: 120, colors: ['#FF512F', '#F09819'] },
  { name: 'Ocean', tags: ['cool'], angle: 90, colors: ['#2E3192', '#1BFFFF'] },
  { name: 'Peach', tags: ['warm', 'pastel'], angle: 135, colors: ['#FFECD2', '#FCB69F'] },
  { name: 'Mint Fresh', tags: ['cool', 'pastel'], angle: 120, colors: ['#00B09B', '#96C93D'] },
  { name: 'Purple Haze', tags: ['vibrant'], angle: 135, colors: ['#8E2DE2', '#4A00E0'] },
  { name: 'Cherry Blossom', tags: ['pastel'], angle: 90, colors: ['#FFDDE1', '#EE9CA7'] },
  { name: 'Deep Space', tags: ['dark'], angle: 135, colors: ['#0F2027', '#203A43', '#2C5364'] },
  { name: 'Candy', tags: ['vibrant', 'pastel'], angle: 120, colors: ['#F857A6', '#FF5858'] },
  { name: 'Lush Green', tags: ['cool'], angle: 90, colors: ['#56AB2F', '#A8E063'] },
  { name: 'Firestorm', tags: ['warm', 'vibrant'], angle: 135, colors: ['#F00000', '#DC281E'] },
  { name: 'Cotton Candy', tags: ['pastel'], angle: 90, colors: ['#FBD3E9', '#BB377D'] },
  { name: 'Midnight City', tags: ['dark', 'cool'], angle: 120, colors: ['#232526', '#414345'] },
  { name: 'Tropical', tags: ['vibrant', 'warm'], angle: 135, colors: ['#F4D03F', '#16A085'] },
  { name: 'Blue Lagoon', tags: ['cool'], angle: 90, colors: ['#4CA1AF', '#2C3E50'] },
  { name: 'Golden Hour', tags: ['warm', 'pastel'], angle: 120, colors: ['#F6D365', '#FDA085'] },
  { name: 'Royal', tags: ['vibrant', 'dark'], angle: 135, colors: ['#141E30', '#243B55'] },
];

const ALL_TAGS = Array.from(new Set(GRADIENTS.flatMap((g) => g.tags))).sort();

const gradientCss = (g: GradientPreset) => `linear-gradient(${g.angle}deg, ${g.colors.join(', ')})`;

const GradientLibraryContent = () => {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const filtered = useMemo(
    () => (activeTag ? GRADIENTS.filter((g) => g.tags.includes(activeTag)) : GRADIENTS),
    [activeTag]
  );

  const handleCopy = (g: GradientPreset) => {
    const css = `background: ${gradientCss(g)};`;
    navigator.clipboard.writeText(css);
    setCopied(g.name);
    setTimeout(() => setCopied(null), 1200);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        <Chip
          label="All"
          color={activeTag === null ? 'primary' : 'default'}
          onClick={() => setActiveTag(null)}
          variant={activeTag === null ? 'filled' : 'outlined'}
        />
        {ALL_TAGS.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            color={activeTag === tag ? 'primary' : 'default'}
            onClick={() => setActiveTag(tag)}
            variant={activeTag === tag ? 'filled' : 'outlined'}
          />
        ))}
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 2 }}>
        {filtered.map((g) => (
          <Paper key={g.name} variant="outlined" sx={{ overflow: 'hidden' }}>
            <Tooltip title="Click to copy CSS" arrow>
              <Box
                onClick={() => handleCopy(g)}
                sx={{ height: 110, background: gradientCss(g), cursor: 'pointer' }}
              />
            </Tooltip>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, py: 1 }}>
              <Box>
                <Typography variant="subtitle2" fontWeight={600}>{g.name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {copied === g.name ? 'CSS copied!' : g.tags.join(' · ')}
                </Typography>
              </Box>
              <IconButton size="small" onClick={() => handleCopy(g)}>
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

const GradientLibrary = () => {
  const content = (
    <>
      <Typography variant="h2">Gradient Library</Typography>
      <Typography variant="body1">
        Browse a curated collection of ready-to-use CSS gradients — from warm sunsets to deep space
        tones. Filter by style and copy the CSS in one click.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Filter gradients by tag (warm, cool, pastel, vibrant, dark), then click any gradient card to
        copy its ready-to-paste <code>background: linear-gradient(...)</code> CSS declaration.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Clicking &quot;Ocean&quot; copies <code>background: linear-gradient(90deg, #2E3192, #1BFFFF);</code>{' '}
        — paste it directly into a stylesheet or a component&apos;s <code>style</code> prop.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Finding a ready-made gradient for a hero section or button.</li>
          <li>Getting design inspiration without tweaking colors from scratch.</li>
          <li>Quickly grabbing production-ready CSS for a landing page.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is this different from the Gradient Generator?</Typography>
      <Typography variant="body1">
        The Gradient Generator lets you build a custom two-color gradient from scratch. This library is
        a curated, hand-picked collection of finished gradients you can browse and copy directly.
      </Typography>
      <Typography variant="h3">Can I tweak a gradient after copying it?</Typography>
      <Typography variant="body1">
        Yes — paste the copied CSS into the Gradient Generator&apos;s color pickers, or edit the HEX
        values and angle directly in your stylesheet.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      url="/developer-tools/gradient-library"
      content={content}
    >
      <GradientLibraryContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default GradientLibrary;
