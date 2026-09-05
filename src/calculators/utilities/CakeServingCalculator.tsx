'use client';

import { useState } from 'react';
import { Box, Typography, Paper, Stack, MenuItem, TextField } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const CAKE_SERVINGS: Record<string, { wedding: number; party: number }> = {
  '6" round': { wedding: 12, party: 6 },
  '8" round': { wedding: 24, party: 12 },
  '10" round': { wedding: 38, party: 18 },
  '12" round': { wedding: 56, party: 27 },
  '9×13 sheet': { wedding: 54, party: 24 },
  'Half sheet (13×18)': { wedding: 96, party: 48 },
  'Full sheet (18×26)': { wedding: 192, party: 96 },
};

const CakeServingCalculator = () => {
  const [panSize, setPanSize] = useState('8" round');
  const [sliceType, setSliceType] = useState<'wedding' | 'party'>('party');

  const servings = CAKE_SERVINGS[panSize][sliceType];

  const content = (
    <>
      <Typography variant="h2">How to Use the Cake Serving Calculator</Typography>
      <Typography variant="body1">
        Select your cake pan&apos;s shape and size and the slice-size convention you plan to use — a smaller
        &quot;wedding&quot; slice (roughly 1&quot; × 2&quot;) or a larger &quot;party&quot; slice (roughly 2&quot;
        × 2&quot;) — to see how many people a finished cake of that size will typically serve, based on
        commonly published wedding-cake-serving chart figures.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Servings = Standard Chart Lookup for Pan Size × Slice Size
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        An 8&quot; round cake serves about 24 people using small wedding-style slices, but only about 12 people
        using larger party-style slices. A 9×13 sheet cake serves roughly 54 wedding slices or 24 party
        slices.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Deciding what size cake to order for a wedding, birthday, or office party guest count.</li>
          <li>Comparing sheet cake vs. round cake serving counts for the same guest list.</li>
          <li>Estimating how many cakes or tiers are needed for a large event.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Baking Pan Converter?</strong> The Baking Pan Converter is about substituting one pan size for another based on batter volume — useful when adapting a recipe to a different pan you own. This tool instead estimates how many people a finished cake of a given pan size actually serves, which is a separate question about portioning, not batter volume.</li>
          <li><strong>Why do wedding slices serve so many more people than party slices?</strong> Wedding-style slices are intentionally small (about 1&quot; × 2&quot;) because they&apos;re typically served alongside other desserts or as part of a multi-tier cake-cutting ceremony, while party-style slices (about 2&quot; × 2&quot;) are sized as a standalone dessert portion.</li>
          <li><strong>Are these serving counts exact?</strong> They&apos;re commonly cited industry figures used by bakeries for standard cake heights (typically a single 4&quot;-tall layer or two stacked layers). Taller, multi-layer cakes can be cut into thinner horizontal slices to serve more people from the same footprint.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/cake-serving-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Stack spacing={3}>
          <TextField select label="Pan Shape / Size" value={panSize} onChange={(e) => setPanSize(e.target.value)} fullWidth>
            {Object.keys(CAKE_SERVINGS).map((key) => (
              <MenuItem key={key} value={key}>{key}</MenuItem>
            ))}
          </TextField>
          <TextField select label="Slice Size" value={sliceType} onChange={(e) => setSliceType(e.target.value as 'wedding' | 'party')} fullWidth>
            <MenuItem value="wedding">Wedding / Small Slice (~1&quot;×2&quot;)</MenuItem>
            <MenuItem value="party">Party / Regular Slice (~2&quot;×2&quot;)</MenuItem>
          </TextField>
        </Stack>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
          <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Estimated Servings</Typography>
            <Typography variant="h3" fontWeight="bold">{servings}</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CakeServingCalculator;
