'use client';

import { useState } from 'react';
import { Box, Typography, Paper, Stack, MenuItem, TextField } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const PAN_SIZES: Record<string, number> = {
  '8" round': 6,
  '9" round': 8,
  '8×8 square': 8,
  '9×9 square': 10,
  '9×13 rectangular': 14.5,
  '9×5 loaf pan': 8,
  'Standard bundt (10")': 9.5,
};

const BakingPanConverter = () => {
  const [originalPan, setOriginalPan] = useState('9" round');
  const [newPan, setNewPan] = useState('9×13 rectangular');

  const origVolume = PAN_SIZES[originalPan];
  const newVolume = PAN_SIZES[newPan];
  const scaleFactor = origVolume > 0 ? newVolume / origVolume : 0;

  const isBigger = newVolume > origVolume;
  const isSmaller = newVolume < origVolume;

  const content = (
    <>
      <Typography variant="h2">How to Use the Baking Pan Converter</Typography>
      <Typography variant="body1">
        Every baking pan holds a different volume of batter even when recipes describe them by a single
        dimension. Select the pan size your recipe was written for and the pan you actually want to use —
        the calculator looks up each pan&apos;s approximate volume in cups and shows the scaling factor to
        adjust your recipe&apos;s ingredient quantities so the batter depth stays roughly the same.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Scaling Factor = New Pan Volume (cups) ÷ Original Pan Volume (cups)
      </Box>
      <Typography variant="body1">
        As general guidance only (not a precise formula): if the new pan holds more volume than the
        original, your batter will spread thinner and typically bakes faster — shorten the bake time and
        check for doneness early, or consider slightly lowering the oven temperature. If the new pan is
        smaller or deeper, the batter will be thicker and generally needs a longer bake time at the same
        temperature to cook through the center.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Switching a recipe written for a 9&quot; round pan (about 8 cups) into a 9×13 rectangular pan
        (about 14.5 cups) gives a scaling factor of roughly 1.8× — you&apos;d need about 1.8 times the
        original batter to fill the new pan to a similar depth, and since the batter spreads thinner in the
        larger pan, expect a shorter bake time than the original recipe calls for.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Substituting a pan you own for the one a recipe specifically calls for.</li>
          <li>Converting a cake recipe between round, square, and rectangular pans for a different presentation.</li>
          <li>Figuring out roughly how much to scale a recipe&apos;s ingredients when switching pan sizes.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Are these pan volumes exact?</strong> No — they&apos;re commonly published approximate figures for standard pan depths. Actual volume varies slightly by manufacturer and by how full you fill the pan, so use the scaling factor as a strong starting estimate rather than an exact conversion.</li>
          <li><strong>Why doesn&apos;t the tool give me an exact new bake time?</strong> Bake time depends on batter depth, pan material, and oven behavior in ways that don&apos;t reduce to a simple formula. The safest approach is to check for doneness (a toothpick test, visual browning, or an internal temperature) starting earlier than the original recipe&apos;s time when using a pan that spreads the batter thinner.</li>
          <li><strong>What if I don&apos;t see my exact pan size listed?</strong> Pick the closest listed pan by volume as a reasonable substitute, or calculate your pan&apos;s volume directly (roughly, area of the base × depth, converted to cups) and scale from there manually.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/baking-pan-converter" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Stack spacing={3}>
          <TextField select label="Original Pan Size" value={originalPan} onChange={(e) => setOriginalPan(e.target.value)} fullWidth>
            {Object.keys(PAN_SIZES).map((key) => (
              <MenuItem key={key} value={key}>{key} (~{PAN_SIZES[key]} cups)</MenuItem>
            ))}
          </TextField>
          <TextField select label="Desired Pan Size" value={newPan} onChange={(e) => setNewPan(e.target.value)} fullWidth>
            {Object.keys(PAN_SIZES).map((key) => (
              <MenuItem key={key} value={key}>{key} (~{PAN_SIZES[key]} cups)</MenuItem>
            ))}
          </TextField>
        </Stack>
        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Scaling Factor</Typography>
            <Typography variant="h3" fontWeight="bold">{scaleFactor.toFixed(2)}×</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Original Volume</Typography>
            <Typography fontWeight={600}>{origVolume} cups</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>New Pan Volume</Typography>
            <Typography fontWeight={600}>{newVolume} cups</Typography>
          </Paper>
          <Paper sx={{ p: 2 }}>
            <Typography fontWeight={600} gutterBottom>Baking Time Guidance</Typography>
            <Typography variant="body2">
              {isBigger && 'The new pan holds more volume, so batter will be thinner — expect a shorter bake time, and check doneness early, or slightly lower the oven temperature.'}
              {isSmaller && 'The new pan holds less volume, so batter will be thicker/deeper — expect a longer bake time at the same temperature to cook through the center.'}
              {!isBigger && !isSmaller && 'These pans hold a similar volume — bake time should be close to the original recipe, but always check for doneness.'}
            </Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BakingPanConverter;
