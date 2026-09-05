'use client';

import { useState } from 'react';
import { Box, Typography, Paper, MenuItem, TextField } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface SignInfo {
  sign: string;
  color: string;
  hex: string;
}

const LUCKY_COLORS: SignInfo[] = [
  { sign: 'Aries', color: 'Red', hex: '#d32f2f' },
  { sign: 'Taurus', color: 'Green', hex: '#388e3c' },
  { sign: 'Gemini', color: 'Yellow', hex: '#fbc02d' },
  { sign: 'Cancer', color: 'Silver', hex: '#9e9e9e' },
  { sign: 'Leo', color: 'Gold', hex: '#c9a227' },
  { sign: 'Virgo', color: 'Navy Blue', hex: '#1a237e' },
  { sign: 'Libra', color: 'Pink', hex: '#ec407a' },
  { sign: 'Scorpio', color: 'Maroon', hex: '#7b1e2b' },
  { sign: 'Sagittarius', color: 'Purple', hex: '#7b1fa2' },
  { sign: 'Capricorn', color: 'Brown', hex: '#5d4037' },
  { sign: 'Aquarius', color: 'Turquoise', hex: '#00acc1' },
  { sign: 'Pisces', color: 'Sea Green', hex: '#00897b' },
];

const LuckyColorFinderContent = () => {
  const [signIndex, setSignIndex] = useState(0);
  const info = LUCKY_COLORS[signIndex];

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <TextField select label="Zodiac Sign" value={signIndex} onChange={(e) => setSignIndex(Number(e.target.value))} fullWidth>
        {LUCKY_COLORS.map((s, idx) => <MenuItem key={s.sign} value={idx}>{s.sign}</MenuItem>)}
      </TextField>

      <Paper sx={{ p: 3, textAlign: 'center', color: 'white', bgcolor: info.hex }}>
        <Typography variant="body2">Lucky Color for {info.sign}</Typography>
        <Typography variant="h4" fontWeight="bold">{info.color}</Typography>
      </Paper>
    </Box>
  );
};

const LuckyColorFinder = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Lucky Color Finder</Typography>
      <Typography variant="body1">
        Select your Western zodiac sign to see its traditionally-associated lucky color, drawn from a
        hand-written mapping table of common astrological color associations used in popular astrology
        writing.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Selecting Leo shows Gold as the traditionally-associated lucky color, while selecting Pisces shows Sea
        Green.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Picking a fun color theme for a birthday party based on the zodiac sign of the celebrant.</li>
          <li>Choosing an outfit or accessory color for a lighthearted astrology-themed occasion.</li>
          <li>Exploring popular zodiac color associations out of curiosity.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Is this based on science?</strong> No — this tool is for entertainment and fun purposes only. There is no scientific basis connecting zodiac signs to colors or luck of any kind; treat the result as a lighthearted novelty, not a factual claim.</li>
          <li><strong>Is there one official lucky color per sign?</strong> No — different astrology sources list slightly different colors for the same sign. This tool uses one commonly cited color per sign from popular astrology writing.</li>
          <li><strong>Can I find my zodiac sign here from my birth date?</strong> This tool expects you to already know your sign and select it directly; use a dedicated zodiac sign finder tool first if you need to determine your sign from a birth date.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/lucky-color-finder" content={content}>
      <LuckyColorFinderContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default LuckyColorFinder;
