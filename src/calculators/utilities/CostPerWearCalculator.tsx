'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const CostPerWearCalculator = () => {
  const [price, setPrice] = useState<string>('120');
  const [timesWorn, setTimesWorn] = useState<string>('15');
  const [futureUses, setFutureUses] = useState<string>('10');

  const { costPerWearSoFar, costPerWearProjected, valid } = useMemo(() => {
    const p = parseFloat(price);
    const worn = parseFloat(timesWorn);
    const future = parseFloat(futureUses);

    if (isNaN(p) || isNaN(worn) || p < 0 || worn < 0) {
      return { costPerWearSoFar: null, costPerWearProjected: null, valid: false };
    }

    const soFar = worn > 0 ? p / worn : null;
    const totalUses = worn + (isNaN(future) ? 0 : Math.max(future, 0));
    const projected = totalUses > 0 ? p / totalUses : null;

    return { costPerWearSoFar: soFar, costPerWearProjected: projected, valid: true };
  }, [price, timesWorn, futureUses]);

  const content = (
    <>
      <Typography variant="h2">How to Calculate Cost Per Wear</Typography>
      <Typography variant="body1">
        Cost per wear divides an item&apos;s purchase price by the number of times you&apos;ve worn or used it,
        giving a clearer sense of value than the sticker price alone. A pricier item worn constantly can end up
        far cheaper per use than a bargain item that only gets worn once or twice.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Cost Per Wear = Purchase Price ÷ Number of Times Worn
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A $120 jacket worn 15 times so far has a cost per wear of 120 ÷ 15 = $8.00. If you expect to wear it 10
        more times, the projected cost per wear over its full expected use (25 wears) drops to
        120 ÷ 25 = $4.80.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Deciding whether an expensive clothing item, bag, or shoe was actually good value.</li>
          <li>Comparing a cheaper item you rarely use against a pricier item you use often.</li>
          <li>Justifying (or reconsidering) a purchase by projecting its cost per use over its expected lifetime.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does a lower cost per wear always mean a better purchase?</Typography>
      <Typography variant="body1">
        Generally, yes, from a pure value standpoint — but it&apos;s only one factor. Comfort, quality,
        versatility, and how much you enjoy an item also matter, and cost per wear naturally improves the longer
        you keep using something, so it rewards items with staying power.
      </Typography>
      <Typography variant="h3">What counts as a &quot;wear&quot; for non-clothing items?</Typography>
      <Typography variant="body1">
        The same idea works for any item you use repeatedly, not just clothing — count each use, session, or
        occasion the item serves its purpose, whether that&apos;s a kitchen gadget, a tool, or a piece of sports
        equipment.
      </Typography>
      <Typography variant="h3">Why include estimated future uses?</Typography>
      <Typography variant="body1">
        Cost per wear so far only reflects your usage up to today. Adding an estimate of how many more times
        you&apos;ll realistically use the item projects the cost per wear over its full expected lifetime, which
        is often a fairer picture of long-term value.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/cost-per-wear-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, alignItems: 'center' }}>
        <Stack spacing={2}>
          <TextField label="Purchase Price ($)" type="number" fullWidth value={price} onChange={(e) => setPrice(e.target.value)} onFocus={(e) => e.target.select()} />
          <TextField label="Times Worn/Used So Far" type="number" fullWidth value={timesWorn} onChange={(e) => setTimesWorn(e.target.value)} onFocus={(e) => e.target.select()} />
          <TextField label="Estimated Future Uses (optional)" type="number" fullWidth value={futureUses} onChange={(e) => setFutureUses(e.target.value)} onFocus={(e) => e.target.select()} />
        </Stack>

        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">Cost Per Wear (so far)</Typography>
          <Typography variant="h3" color="primary" fontWeight={800}>
            {valid && costPerWearSoFar !== null ? `$${costPerWearSoFar.toFixed(2)}` : '—'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>Projected Cost Per Wear (with future uses)</Typography>
          <Typography variant="h5" fontWeight={700}>
            {valid && costPerWearProjected !== null ? `$${costPerWearProjected.toFixed(2)}` : '—'}
          </Typography>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CostPerWearCalculator;
