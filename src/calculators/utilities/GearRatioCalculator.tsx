'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface GearPair {
  driving: string;
  driven: string;
}

const GearRatioCalculator = () => {
  const [pairs, setPairs] = useState<GearPair[]>([{ driving: '12', driven: '36' }]);

  const results = useMemo(() => {
    const stageRatios: number[] = [];
    for (const p of pairs) {
      const driving = parseFloat(p.driving);
      const driven = parseFloat(p.driven);
      if (Number.isNaN(driving) || Number.isNaN(driven) || driving <= 0 || driven <= 0) {
        stageRatios.push(NaN);
      } else {
        stageRatios.push(driven / driving);
      }
    }
    const valid = stageRatios.every((r) => !Number.isNaN(r));
    const compound = valid ? stageRatios.reduce((acc, r) => acc * r, 1) : NaN;
    return { stageRatios, compound, valid };
  }, [pairs]);

  const updatePair = (index: number, field: keyof GearPair, value: string) => {
    setPairs((prev) => prev.map((p, i) => (i === index ? { ...p, [field]: value } : p)));
  };

  const addPair = () => setPairs((prev) => [...prev, { driving: '', driven: '' }]);
  const removePair = (index: number) => setPairs((prev) => prev.filter((_, i) => i !== index));

  const content = (
    <>
      <Typography variant="h2">How to Calculate Gear Ratio</Typography>
      <Typography variant="body1">
        Gear ratio compares the number of teeth on the driven gear to the number of teeth on the driving gear:
        Ratio = Driven Teeth ÷ Driving Teeth. A ratio greater than 1 means the driven gear turns slower than
        the driving gear but with more torque (a speed reduction); a ratio less than 1 means it spins faster
        with less torque. For a gear train with multiple pairs in sequence, the overall compound ratio is the
        product of each stage&apos;s individual ratio.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Stage Ratio = Driven Teeth ÷ Driving Teeth &nbsp;|&nbsp; Compound Ratio = Ratio₁ × Ratio₂ × ... × Ratioₙ
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A driving gear with 12 teeth meshed with a driven gear with 36 teeth gives a ratio of 36 ÷ 12 = 3, often
        written 3:1 — the driven gear turns once for every 3 turns of the driving gear. Add a second stage
        (say, 10 teeth driving 40 teeth, a 4:1 ratio) and the compound ratio becomes 3 × 4 = 12:1 overall.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Designing gear trains for RC cars, robotics, or 3D-printed mechanisms.</li>
          <li>Calculating overall reduction ratio across a multi-stage gearbox.</li>
          <li>Checking bicycle gearing (chainring and cassette teeth) for speed and cadence estimates.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Which gear is the &quot;driving&quot; gear?</Typography>
      <Typography variant="body1">
        The driving gear is the one connected to the power source (like a motor shaft or pedal crank), and the
        driven gear is the one that receives motion from it. Torque and speed both scale with the ratio between
        them, in opposite directions.
      </Typography>
      <Typography variant="h3">How does compound ratio work for multiple gear stages?</Typography>
      <Typography variant="body1">
        Each pair of meshing gears forms one stage. In a gear train, the driven gear of one stage is typically
        connected to the driving gear of the next stage, so the overall reduction is the product of every
        individual stage ratio, not their sum.
      </Typography>
      <Typography variant="h3">Does gear ratio depend on gear diameter instead of teeth count?</Typography>
      <Typography variant="body1">
        Teeth count and diameter are proportional for gears of the same tooth pitch (tooth size), so using
        teeth counts gives the same ratio as using diameters, and is usually easier to count accurately.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/gear-ratio-calculator" content={content}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
        {pairs.map((pair, i) => (
          <Box key={i} sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr auto', sm: '1fr 1fr 1fr auto' }, gap: 2, alignItems: 'center' }}>
            <TextField
              label={`Stage ${i + 1}: Driving Teeth`}
              type="number"
              value={pair.driving}
              onChange={(e) => updatePair(i, 'driving', e.target.value)}
              onFocus={(e) => e.target.select()}
              fullWidth
            />
            <TextField
              label={`Stage ${i + 1}: Driven Teeth`}
              type="number"
              value={pair.driven}
              onChange={(e) => updatePair(i, 'driven', e.target.value)}
              onFocus={(e) => e.target.select()}
              fullWidth
            />
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Typography variant="body2" color="text.secondary">
                {!Number.isNaN(results.stageRatios[i]) ? `Ratio: ${results.stageRatios[i].toFixed(3)}:1` : '—'}
              </Typography>
            </Box>
            <IconButton onClick={() => removePair(i)} disabled={pairs.length === 1} aria-label="Remove stage">
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
        <Button startIcon={<AddIcon />} onClick={addPair} variant="outlined" sx={{ alignSelf: 'flex-start' }}>
          Add Gear Stage
        </Button>
      </Box>

      <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'action.hover' }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {pairs.length > 1 ? 'Compound Gear Ratio' : 'Gear Ratio'}
        </Typography>
        <Typography variant="h3" fontWeight={800} color="primary.main">
          {results.valid ? `${results.compound.toFixed(4)}:1` : 'Enter valid teeth counts'}
        </Typography>
      </Paper>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default GearRatioCalculator;
