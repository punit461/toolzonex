'use client';

import { useState, useMemo } from 'react';
import { Box, Typography, Paper, Chip, IconButton, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface Palette {
  name: string;
  tags: string[];
  colors: string[];
}

const PALETTES: Palette[] = [
  { name: 'Sunset Coast', tags: ['warm', 'vibrant'], colors: ['#FF6B6B', '#FFA07A', '#FFD166', '#F79256', '#EF476F'] },
  { name: 'Ocean Breeze', tags: ['cool', 'nature'], colors: ['#03045E', '#0077B6', '#00B4D8', '#90E0EF', '#CAF0F8'] },
  { name: 'Forest Floor', tags: ['nature', 'earthy'], colors: ['#283618', '#606C38', '#DDA15E', '#BC6C25', '#FEFAE0'] },
  { name: 'Pastel Dream', tags: ['pastel', 'soft'], colors: ['#FFC6FF', '#BDB2FF', '#A0C4FF', '#9BF6FF', '#CAFFBF'] },
  { name: 'Neon Nights', tags: ['neon', 'vibrant'], colors: ['#F72585', '#B5179E', '#7209B7', '#560BAD', '#3A0CA3'] },
  { name: 'Autumn Harvest', tags: ['warm', 'earthy'], colors: ['#582F0E', '#7F4F24', '#936639', '#A68A64', '#B6AD90'] },
  { name: 'Minimal Mono', tags: ['monochrome', 'minimal'], colors: ['#0D1B2A', '#1B263B', '#415A77', '#778DA9', '#E0E1DD'] },
  { name: 'Candy Pop', tags: ['pastel', 'vibrant'], colors: ['#FF99C8', '#FCF6BD', '#D0F4DE', '#A9DEF9', '#E4C1F9'] },
  { name: 'Corporate Trust', tags: ['corporate', 'cool'], colors: ['#03071E', '#023E8A', '#0077B6', '#0096C7', '#48CAE4'] },
  { name: 'Desert Bloom', tags: ['earthy', 'warm'], colors: ['#E9C46A', '#F4A261', '#E76F51', '#2A9D8F', '#264653'] },
  { name: 'Midnight Violet', tags: ['dark', 'vibrant'], colors: ['#10002B', '#240046', '#3C096C', '#5A189A', '#9D4EDD'] },
  { name: 'Fresh Mint', tags: ['cool', 'nature'], colors: ['#D8F3DC', '#B7E4C7', '#95D5B2', '#74C69D', '#52B788'] },
  { name: 'Retro Diner', tags: ['vintage', 'warm'], colors: ['#F26419', '#F6AE2D', '#33658A', '#86BBD8', '#2F4858'] },
  { name: 'Rose Gold', tags: ['pastel', 'warm'], colors: ['#FFE5D9', '#FFCAD4', '#F4ACB7', '#9D8189', '#D8E2DC'] },
  { name: 'Slate & Sage', tags: ['minimal', 'cool'], colors: ['#606C5D', '#B4C4AE', '#EAE7DC', '#D8C3A5', '#8E8D8A'] },
  { name: 'Cyberpunk', tags: ['neon', 'dark'], colors: ['#0D0221', '#0F0F0F', '#F706CF', '#04D9FF', '#FFE800'] },
];

const ALL_TAGS = Array.from(new Set(PALETTES.flatMap((p) => p.tags))).sort();

const ColorPaletteLibraryContent = () => {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const filtered = useMemo(
    () => (activeTag ? PALETTES.filter((p) => p.tags.includes(activeTag)) : PALETTES),
    [activeTag]
  );

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
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

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
        {filtered.map((palette) => (
          <Paper key={palette.name} variant="outlined" sx={{ overflow: 'hidden' }}>
            <Box sx={{ display: 'flex', height: 80 }}>
              {palette.colors.map((hex) => (
                <Tooltip title={hex} key={hex} arrow>
                  <Box
                    onClick={() => handleCopy(hex)}
                    sx={{ flex: 1, bgcolor: hex, cursor: 'pointer', transition: 'flex 0.2s', '&:hover': { flex: 1.2 } }}
                  />
                </Tooltip>
              ))}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, py: 1 }}>
              <Box>
                <Typography variant="subtitle2" fontWeight={600}>{palette.name}</Typography>
                <Typography variant="caption" color="text.secondary">{copied === palette.colors.join(', ') ? 'Copied all!' : palette.tags.join(' · ')}</Typography>
              </Box>
              <Tooltip title="Copy all HEX codes" arrow>
                <IconButton size="small" onClick={() => handleCopy(palette.colors.join(', '))}>
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

const ColorPaletteLibrary = () => {
  const content = (
    <>
      <Typography variant="h2">Color Palette Library</Typography>
      <Typography variant="body1">
        Browse a curated collection of ready-made color palettes for your next project — from vibrant
        neons to muted earthy tones. Filter by style and copy any color, or the whole palette, in one
        click.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Filter palettes by tag (warm, cool, pastel, vibrant, and more), click an individual swatch to
        copy its HEX code, or use the copy icon on a card to copy every color in that palette at once.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Filtering by &quot;nature&quot; surfaces palettes like Forest Floor and Fresh Mint — a quick
        starting point if you&apos;re designing something outdoorsy or eco-focused instead of building
        a palette from scratch.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Finding a ready-made palette instead of generating random colors.</li>
          <li>Getting inspiration for a brand, website, or illustration project.</li>
          <li>Quickly copying a cohesive set of HEX codes for a design system.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is this different from the Color Palette Generator?</Typography>
      <Typography variant="body1">
        The generator creates random palettes on demand. This library is a curated, hand-picked
        collection you can browse and filter — useful when you want proven combinations rather than
        random ones.
      </Typography>
      <Typography variant="h3">Can I use these palettes commercially?</Typography>
      <Typography variant="body1">
        Yes — color combinations aren&apos;t copyrightable, so every palette here is free to use in
        personal or commercial projects.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      url="/tools/color-palette-library"
      content={content}
    >
      <ColorPaletteLibraryContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ColorPaletteLibrary;
