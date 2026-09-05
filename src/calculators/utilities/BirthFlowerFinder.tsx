'use client';

import { useState } from 'react';
import { Box, Typography, Paper, MenuItem, TextField } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface FlowerInfo {
  month: string;
  flowers: string[];
  meaning: string;
}

const BIRTH_FLOWERS: FlowerInfo[] = [
  { month: 'January', flowers: ['Carnation'], meaning: 'Carnations symbolize love, fascination, and distinction — a fitting start to the year.' },
  { month: 'February', flowers: ['Violet'], meaning: 'Violets represent modesty, faithfulness, and everlasting love.' },
  { month: 'March', flowers: ['Daffodil'], meaning: 'Daffodils stand for new beginnings, rebirth, and hope — echoing the arrival of spring.' },
  { month: 'April', flowers: ['Daisy'], meaning: 'Daisies symbolize innocence, purity, and loyal love.' },
  { month: 'May', flowers: ['Lily of the Valley'], meaning: 'Lily of the Valley represents sweetness, humility, and a return of happiness.' },
  { month: 'June', flowers: ['Rose'], meaning: 'Roses are the classic symbol of love, passion, and beauty.' },
  { month: 'July', flowers: ['Larkspur'], meaning: 'Larkspur symbolizes positivity, an open heart, and strong bonds of love.' },
  { month: 'August', flowers: ['Gladiolus'], meaning: 'Gladiolus represents strength of character, integrity, and moral virtue.' },
  { month: 'September', flowers: ['Aster'], meaning: 'Asters symbolize wisdom, faith, and valor.' },
  { month: 'October', flowers: ['Marigold'], meaning: 'Marigolds represent warmth, creativity, and passion.' },
  { month: 'November', flowers: ['Chrysanthemum'], meaning: 'Chrysanthemums symbolize joy, optimism, and long life.' },
  { month: 'December', flowers: ['Narcissus', 'Poinsettia'], meaning: 'Narcissus represents hope and rebirth, while Poinsettia symbolizes celebration and good cheer — both traditionally associated with this month.' },
];

const BirthFlowerFinderContent = () => {
  const [monthIndex, setMonthIndex] = useState(5);
  const info = BIRTH_FLOWERS[monthIndex];

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <TextField
        select
        label="Birth Month"
        value={monthIndex}
        onChange={(e) => setMonthIndex(Number(e.target.value))}
        fullWidth
      >
        {BIRTH_FLOWERS.map((f, idx) => (
          <MenuItem key={f.month} value={idx}>{f.month}</MenuItem>
        ))}
      </TextField>

      <Paper sx={{ p: 3, bgcolor: 'primary.main', color: 'white' }}>
        <Typography variant="body2">Birth Flower{info.flowers.length > 1 ? 's' : ''} for {info.month}</Typography>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>{info.flowers.join(' & ')}</Typography>
        <Typography variant="body2">{info.meaning}</Typography>
      </Paper>
    </Box>
  );
};

const BirthFlowerFinder = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Birth Flower Finder</Typography>
      <Typography variant="body1">
        Select your birth month to see its traditional birth flower, based on the standard published
        birth-flower list. Some months traditionally have two associated flowers, both of which are shown
        together. Each result also includes a brief note on the flower&apos;s traditional meaning or symbolism.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Selecting June shows the Rose, traditionally symbolizing love, passion, and beauty. Selecting December
        shows both Narcissus and Poinsettia, since that month has two traditionally associated flowers.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Choosing a birth-flower-themed gift for a birthday or anniversary.</li>
          <li>Finding meaningful flower motifs for a birth-month-themed tattoo or jewelry design.</li>
          <li>Learning the traditional symbolism behind a specific month&apos;s birth flower.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why do some months have two birth flowers?</strong> Birth flower lists were compiled from different floral traditions over time, and for several months two flowers became commonly associated with that month rather than just one — both are considered traditionally valid.</li>
          <li><strong>Is there one single official birth flower list?</strong> Not exactly — different regions and eras have published slightly varying lists. This tool uses the most widely recognized standard list found in modern references.</li>
          <li><strong>Is this related to my zodiac sign?</strong> No — birth flowers are tied purely to birth month, while zodiac signs follow their own date ranges that don&apos;t align cleanly with calendar months.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/birth-flower-finder" content={content}>
      <BirthFlowerFinderContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BirthFlowerFinder;
