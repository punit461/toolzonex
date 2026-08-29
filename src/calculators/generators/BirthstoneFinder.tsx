'use client';

import { useState } from 'react';
import { Box, Typography, Paper, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface Birthstone {
  month: string;
  stone: string;
  color: string;
  description: string;
}

const BIRTHSTONES: Birthstone[] = [
  { month: 'January', stone: 'Garnet', color: '#7b1f2b', description: 'A deep red gemstone traditionally associated with protection and strong friendships during travel.' },
  { month: 'February', stone: 'Amethyst', color: '#8e5bb5', description: 'A purple quartz long linked with calm, clarity, and inner strength.' },
  { month: 'March', stone: 'Aquamarine', color: '#7fd4d0', description: 'A pale blue-green gem named for its resemblance to seawater, associated with courage and calm.' },
  { month: 'April', stone: 'Diamond', color: '#e8e8f0', description: 'The hardest natural mineral, symbolizing everlasting love and clarity.' },
  { month: 'May', stone: 'Emerald', color: '#2e8b57', description: 'A vivid green beryl gemstone traditionally linked with rebirth, love, and wisdom.' },
  { month: 'June', stone: 'Pearl', color: '#f2eee2', description: 'A lustrous gem formed inside mollusks, symbolizing purity and new beginnings.' },
  { month: 'July', stone: 'Ruby', color: '#9b111e', description: 'A vibrant red gem historically associated with passion, protection, and vitality.' },
  { month: 'August', stone: 'Peridot', color: '#a8c33c', description: 'A bright yellow-green gem believed to bring strength and dispel negative energy.' },
  { month: 'September', stone: 'Sapphire', color: '#0f52ba', description: 'A rich blue corundum gem traditionally linked with wisdom, loyalty, and nobility.' },
  { month: 'October', stone: 'Opal', color: '#e0d7d0', description: 'A gem known for its shifting play of color, symbolizing hope, creativity, and innocence.' },
  { month: 'November', stone: 'Topaz', color: '#f6b93b', description: 'A golden-yellow gem traditionally associated with strength and good fortune.' },
  { month: 'December', stone: 'Turquoise', color: '#30d5c8', description: 'A blue-green stone valued for centuries as a symbol of protection and good fortune.' },
];

const BirthstoneFinderContent = () => {
  const now = new Date();
  const [monthIndex, setMonthIndex] = useState(now.getMonth());

  const birthstone = BIRTHSTONES[monthIndex];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 1.5 }}>Select your birth month</Typography>
        <ToggleButtonGroup
          exclusive
          value={monthIndex}
          onChange={(_, val) => { if (val !== null) setMonthIndex(val); }}
          sx={{ flexWrap: 'wrap' }}
        >
          {BIRTHSTONES.map((b, i) => (
            <ToggleButton key={b.month} value={i} sx={{ textTransform: 'none' }}>{b.month}</ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', maxWidth: 420 }}>
        <Box sx={{ width: 64, height: 64, borderRadius: '50%', bgcolor: birthstone.color, mx: 'auto', mb: 2, boxShadow: 2 }} />
        <Typography variant="overline" color="text.secondary">{birthstone.month}</Typography>
        <Typography variant="h4" fontWeight={700}>{birthstone.stone}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>{birthstone.description}</Typography>
      </Paper>
    </Box>
  );
};

const BirthstoneFinder = () => {
  const content = (
    <>
      <Typography variant="h2">How the Birthstone Finder Works</Typography>
      <Typography variant="body1">
        Select your birth month and this tool instantly shows the corresponding traditional birthstone, along
        with its color and a brief description of what it&apos;s historically associated with.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Click the month you were born in.</li>
          <li>Your traditional birthstone appears instantly, along with a short description.</li>
          <li>Switch months any time to look up a different birthstone.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Selecting &quot;September&quot; shows &quot;Sapphire&quot; — a rich blue gemstone traditionally linked
        with wisdom, loyalty, and nobility.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Finding the right birthstone when shopping for jewelry as a gift.</li>
          <li>Learning your own or a family member&apos;s traditional birthstone.</li>
          <li>Choosing a birthstone theme for a custom ring, necklace, or bracelet.</li>
          <li>Looking up birthstones for a whole family or group of friends.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why do some months have more than one associated gemstone elsewhere?</Typography>
      <Typography variant="body1">
        Different jewelry associations have published slightly varying birthstone lists over time. This tool
        uses the most widely recognized modern birthstone for each month.
      </Typography>
      <Typography variant="h3">Are birthstones based on science?</Typography>
      <Typography variant="body1">
        No — birthstone traditions come from history and culture rather than science, tracing back centuries
        to various cultural and religious associations between gemstones and calendar months.
      </Typography>
      <Typography variant="h3">Can a month have more than one traditional birthstone?</Typography>
      <Typography variant="body1">
        Some modern lists do assign alternate birthstones to certain months, but this tool shows the single
        most commonly recognized birthstone for each month for simplicity.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/generators/birthstone-finder" content={content}>
      <BirthstoneFinderContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BirthstoneFinder;
