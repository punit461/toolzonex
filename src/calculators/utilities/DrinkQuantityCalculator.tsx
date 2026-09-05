'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const DrinkQuantityCalculator = () => {
  const [guests, setGuests] = useState('50');
  const [hours, setHours] = useState('4');
  const [rate, setRate] = useState('1');

  const [beerPct, setBeerPct] = useState('40');
  const [winePct, setWinePct] = useState('30');
  const [spiritsPct, setSpiritsPct] = useState('20');
  const [naPct, setNaPct] = useState('10');

  const result = useMemo(() => {
    const g = parseFloat(guests) || 0;
    const h = parseFloat(hours) || 0;
    const r = parseFloat(rate) || 0;
    const total = g * h * r;

    const beer = (parseFloat(beerPct) || 0) / 100 * total;
    const wine = (parseFloat(winePct) || 0) / 100 * total;
    const spirits = (parseFloat(spiritsPct) || 0) / 100 * total;
    const na = (parseFloat(naPct) || 0) / 100 * total;

    return {
      total,
      beer,
      wine,
      spirits,
      na,
      beerCans: Math.ceil(beer), // 1 serving per can/bottle
      wineBottles: Math.ceil(wine / 5), // ~5 glasses per 750ml bottle
      spiritsBottles: Math.ceil(spirits / 17), // ~17 shots per 750ml bottle
    };
  }, [guests, hours, rate, beerPct, winePct, spiritsPct, naPct]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Drink Quantity Calculator</Typography>
      <Typography variant="body1">
        Enter your guest count, how many hours the event runs, and the expected drinks per person per hour
        (1 is a common planning default). Optionally break the total down by drink type percentage to convert
        each category into the number of bottles or cans you&apos;ll actually need to buy.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Total Drinks = Guests × Hours × Drinks per Person per Hour
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 4-hour party for 50 guests at 1 drink per person per hour needs 50 × 4 × 1 = 200 total drinks. If
        40% is beer, that&apos;s 80 drinks — 80 cans, since each can is one serving. If 30% is wine (60
        drinks), that&apos;s 60 / 5 = 12 bottles of wine (about 5 glasses per 750ml bottle).
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Shopping for a wedding, birthday, or holiday party bar without over- or under-buying.</li>
          <li>Splitting a mixed bar (beer, wine, spirits, non-alcoholic) into a purchasing list.</li>
          <li>Adjusting drink quantities for a longer or shorter event duration.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why 1 drink per person per hour as a default?</strong> It&apos;s a commonly used general event-planning estimate that accounts for guests who don&apos;t drink at all balancing out those who drink more, though you should adjust it up or down based on your specific crowd and event type.</li>
          <li><strong>How many glasses are in a bottle of wine?</strong> A standard 750ml bottle pours about 5 standard glasses (5 oz each), which is the figure used here to convert wine drinks into bottles needed.</li>
          <li><strong>Do the drink-type percentages need to add up to 100%?</strong> They should for the bottle/can breakdown to reflect your actual total — if they don&apos;t sum to 100%, each category is still calculated correctly as its own percentage of the total drinks, but the categories combined won&apos;t account for every drink.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/drink-quantity-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField label="Number of Guests" type="number" value={guests} onChange={(e) => setGuests(e.target.value)} onFocus={(e) => e.target.select()} fullWidth />
          <TextField label="Event Duration (hours)" type="number" value={hours} onChange={(e) => setHours(e.target.value)} onFocus={(e) => e.target.select()} fullWidth />
          <TextField label="Drinks per Person per Hour" type="number" value={rate} onChange={(e) => setRate(e.target.value)} onFocus={(e) => e.target.select()} fullWidth />

          <Typography variant="subtitle2" sx={{ mt: 1 }}>Drink Type Breakdown (optional, %)</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <TextField label="Beer %" type="number" value={beerPct} onChange={(e) => setBeerPct(e.target.value)} onFocus={(e) => e.target.select()} fullWidth />
            <TextField label="Wine %" type="number" value={winePct} onChange={(e) => setWinePct(e.target.value)} onFocus={(e) => e.target.select()} fullWidth />
            <TextField label="Spirits %" type="number" value={spiritsPct} onChange={(e) => setSpiritsPct(e.target.value)} onFocus={(e) => e.target.select()} fullWidth />
            <TextField label="Non-Alcoholic %" type="number" value={naPct} onChange={(e) => setNaPct(e.target.value)} onFocus={(e) => e.target.select()} fullWidth />
          </Box>
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Total Drinks Needed</Typography>
            <Typography variant="h3" fontWeight="bold">{result.total.toFixed(0)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Beer (cans/bottles)</Typography>
            <Typography fontWeight={600}>{result.beerCans}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Wine (750ml bottles)</Typography>
            <Typography fontWeight={600}>{result.wineBottles}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Spirits (750ml bottles)</Typography>
            <Typography fontWeight={600}>{result.spiritsBottles}</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default DrinkQuantityCalculator;
