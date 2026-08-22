'use client';

import { useState } from 'react';
import { Box, Typography, Paper, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

interface ColorMeaning {
  name: string;
  hex: string;
  meaning: string;
}

const COLOR_MEANINGS: ColorMeaning[] = [
  { name: 'Red', hex: '#E53E3E', meaning: 'Passion, energy, urgency, and danger. Used to grab attention (sale banners, warnings) but can feel aggressive in excess.' },
  { name: 'Orange', hex: '#F97316', meaning: 'Enthusiasm, warmth, and playfulness. Common in calls-to-action and brands wanting a friendly, energetic feel.' },
  { name: 'Yellow', hex: '#FACC15', meaning: 'Optimism, happiness, and caution. Highly visible — used for both cheerful branding and hazard signage.' },
  { name: 'Green', hex: '#22C55E', meaning: 'Growth, nature, health, and money. Widely used for eco-friendly, finance, and wellness brands.' },
  { name: 'Teal', hex: '#14B8A6', meaning: 'Calm sophistication blending blue\'s trust with green\'s freshness. Popular in tech and healthcare.' },
  { name: 'Blue', hex: '#3B82F6', meaning: 'Trust, stability, and calm. The most common corporate color — used heavily by banks, tech, and healthcare.' },
  { name: 'Navy', hex: '#1E3A8A', meaning: 'Authority, professionalism, and depth. A darker, more formal cousin of blue seen in finance and law.' },
  { name: 'Purple', hex: '#8B5CF6', meaning: 'Luxury, creativity, and royalty. Historically rare and expensive to produce, still reads as premium.' },
  { name: 'Pink', hex: '#EC4899', meaning: 'Playfulness, romance, and youthfulness. Ranges from soft and nurturing (pastel) to bold and modern (hot pink).' },
  { name: 'Brown', hex: '#92400E', meaning: 'Reliability, earthiness, and simplicity. Common in organic, artisanal, and outdoor brands.' },
  { name: 'Black', hex: '#111827', meaning: 'Elegance, power, and sophistication. Used for premium branding, but can feel heavy without contrast.' },
  { name: 'White', hex: '#F9FAFB', meaning: 'Simplicity, cleanliness, and space. Creates breathing room and lets other colors stand out.' },
  { name: 'Gray', hex: '#6B7280', meaning: 'Neutrality, balance, and professionalism. A safe background or supporting color that rarely clashes.' },
  { name: 'Gold', hex: '#D4AF37', meaning: 'Achievement, wealth, and prestige. Used sparingly as an accent to signal premium tiers or awards.' },
  { name: 'Silver', hex: '#C0C0C0', meaning: 'Modernity, sleekness, and technology. Common in electronics and automotive branding.' },
  { name: 'Turquoise', hex: '#2DD4BF', meaning: 'Freshness, clarity, and tranquility, evoking tropical water. Popular in travel and wellness.' },
  { name: 'Maroon', hex: '#7F1D1D', meaning: 'Richness, tradition, and seriousness. A deeper, more restrained take on red.' },
  { name: 'Beige', hex: '#E7DFCF', meaning: 'Warmth, neutrality, and understated comfort. A common minimalist background color.' },
];

const ColorMeaningsContent = () => {
  const [copied, setCopied] = useState<string | null>(null);
  const [active, setActive] = useState<string>(COLOR_MEANINGS[0].name);

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied(null), 1200);
  };

  const activeColor = COLOR_MEANINGS.find((c) => c.name === active) ?? COLOR_MEANINGS[0];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Paper
        variant="outlined"
        sx={{
          p: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 3,
          bgcolor: activeColor.hex,
          color: ['White', 'Yellow', 'Beige', 'Silver', 'Gold'].includes(activeColor.name) ? '#111827' : '#fff',
          transition: 'background-color 0.2s',
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography variant="h5" fontWeight="bold">{activeColor.name}</Typography>
          <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>{activeColor.meaning}</Typography>
        </Box>
        <IconButton onClick={() => handleCopy(activeColor.hex)} sx={{ color: 'inherit' }}>
          <ContentCopyIcon />
        </IconButton>
        <Typography fontFamily="monospace" fontWeight="bold">{copied === activeColor.hex ? 'Copied!' : activeColor.hex}</Typography>
      </Paper>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 1.5 }}>
        {COLOR_MEANINGS.map((c) => (
          <Paper
            key={c.name}
            variant="outlined"
            onClick={() => setActive(c.name)}
            sx={{
              cursor: 'pointer',
              overflow: 'hidden',
              outline: active === c.name ? '2px solid' : 'none',
              outlineColor: 'primary.main',
            }}
          >
            <Box sx={{ height: 48, bgcolor: c.hex }} />
            <Box sx={{ px: 1.5, py: 1 }}>
              <Typography variant="body2" fontWeight={600}>{c.name}</Typography>
              <Typography variant="caption" color="text.secondary" fontFamily="monospace">{c.hex}</Typography>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

const ColorMeanings = () => {
  const content = (
    <>
      <Typography variant="h2">Color Meanings &amp; Psychology</Typography>
      <Typography variant="body1">
        Every color carries associations shaped by culture, nature, and psychology. This guide breaks
        down what common colors typically signal in branding and design, so you can choose colors on
        purpose rather than by accident.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Click any swatch in the grid to see its meaning and copy its HEX code. Use it as a quick
        reference when picking a primary color for a brand, product, or design project.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A fintech app choosing between blue and red will usually lean blue — it reads as trustworthy
        and stable, while red can feel urgent or alarming for a product that handles people&apos;s money.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Choosing a brand&apos;s primary color based on the emotion it should evoke.</li>
          <li>Understanding why competitors in an industry cluster around certain colors.</li>
          <li>Briefing a designer or client on the reasoning behind a color choice.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Do color meanings apply the same way in every culture?</Typography>
      <Typography variant="body1">
        No. These meanings reflect common Western associations. For example, white signals purity in
        many Western contexts but mourning in parts of East Asia — always sanity-check colors against
        your target audience&apos;s culture.
      </Typography>
      <Typography variant="h3">Should I pick a color purely based on its meaning?</Typography>
      <Typography variant="body1">
        Meaning is one input. Also weigh brand differentiation, accessibility/contrast, and how the
        color performs across your actual UI before committing to it.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Color Meanings"
      description="Browse the list of colors and learn about the psychology and meaning behind each one."
      url="/tools/color-meanings"
      content={content}
      category="Tools"
    >
      <ColorMeaningsContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ColorMeanings;
