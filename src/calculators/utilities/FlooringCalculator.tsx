'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const FlooringCalculator = () => {
  const [unit, setUnit] = useState<'ft' | 'm'>('ft');
  const [roomLength, setRoomLength] = useState<string>('15');
  const [roomWidth, setRoomWidth] = useState<string>('12');
  const [boxCoverage, setBoxCoverage] = useState<string>('20');
  const [wastePct, setWastePct] = useState<string>('10');

  const handleUnitChange = (newUnit: 'ft' | 'm') => {
    setUnit(newUnit);
    setBoxCoverage(newUnit === 'ft' ? '20' : '2');
  };

  const { roomArea, boxesNeeded, boxesWithWaste } = useMemo(() => {
    const rl = parseFloat(roomLength);
    const rw = parseFloat(roomWidth);
    const coverage = parseFloat(boxCoverage);
    const waste = parseFloat(wastePct) || 0;

    if ([rl, rw, coverage].some((v) => isNaN(v) || v <= 0)) {
      return { roomArea: 0, boxesNeeded: 0, boxesWithWaste: 0 };
    }

    const area = rl * rw;
    const needed = area / coverage;
    const withWaste = needed * (1 + waste / 100);
    return { roomArea: area, boxesNeeded: needed, boxesWithWaste: withWaste };
  }, [roomLength, roomWidth, boxCoverage, wastePct]);

  const areaUnit = unit === 'ft' ? 'sq ft' : 'm²';

  const content = (
    <>
      <Typography variant="h2">How to Calculate How Many Flooring Boxes You Need</Typography>
      <Typography variant="body1">
        Flooring materials like laminate, vinyl plank, and hardwood are sold in boxes that cover a fixed area
        (printed on the box). Enter your room&apos;s length and width to get the total floor area, then divide
        by the coverage per box to find how many boxes you need — plus a waste allowance for cuts around edges,
        doorways, and pattern layout.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Boxes Needed = (Room Area / Coverage per Box) × (1 + Waste %)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 15×12 ft room has an area of 180 sq ft. If each box of laminate flooring covers 20 sq ft, you&apos;d
        need 180 / 20 = 9 boxes at minimum. Adding a 10% waste allowance for cuts brings that to 9.9, which
        rounds up to 10 boxes to purchase.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating how many boxes of laminate, vinyl plank, or hardwood flooring to buy.</li>
          <li>Budgeting a flooring installation project before purchasing materials.</li>
          <li>Comparing total cost between flooring products with different per-box coverage.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Where do I find the coverage per box?</Typography>
      <Typography variant="body1">
        It&apos;s printed directly on the flooring box (often listed in sq ft or m²), or available on the
        product page from the retailer or manufacturer. Coverage varies by plank size and packaging, so always
        check the specific product you&apos;re buying.
      </Typography>
      <Typography variant="h3">Why is 10% waste the default?</Typography>
      <Typography variant="body1">
        10% is a common baseline for straightforward rectangular rooms. Rooms with lots of corners, closets, or
        diagonal installation patterns typically need 15% or more to account for extra cuts and offcuts that
        can&apos;t be reused.
      </Typography>
      <Typography variant="h3">How is this different from a tile calculator?</Typography>
      <Typography variant="body1">
        Tile calculators typically work per individual tile using its exact length and width. This calculator
        instead works per box, since flooring like laminate and vinyl plank is purchased and priced by
        box-coverage area rather than by counting individual planks.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/flooring-calculator" content={content}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <ToggleButtonGroup value={unit} exclusive onChange={(_, v) => v && handleUnitChange(v)} size="small">
          <ToggleButton value="ft">Feet (sq ft)</ToggleButton>
          <ToggleButton value="m">Meters (m²)</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">Room Dimensions ({unit})</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="Length" type="number" fullWidth value={roomLength} onChange={(e) => setRoomLength(e.target.value)} onFocus={(e) => e.target.select()} />
            <TextField label="Width" type="number" fullWidth value={roomWidth} onChange={(e) => setRoomWidth(e.target.value)} onFocus={(e) => e.target.select()} />
          </Box>
          <TextField label={`Coverage per Box (${areaUnit})`} type="number" fullWidth value={boxCoverage} onChange={(e) => setBoxCoverage(e.target.value)} onFocus={(e) => e.target.select()} sx={{ mt: 1 }} />
          <TextField label="Waste Allowance (%)" type="number" fullWidth value={wastePct} onChange={(e) => setWastePct(e.target.value)} onFocus={(e) => e.target.select()} />
        </Box>

        <Paper variant="outlined" sx={{ p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2 }}>
          <Box textAlign="center">
            <Typography variant="body2" color="text.secondary">Room Area</Typography>
            <Typography variant="h6" fontWeight={700}>{roomArea.toLocaleString(undefined, { maximumFractionDigits: 2 })} {areaUnit}</Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="body2" color="text.secondary">Boxes Needed (with waste)</Typography>
            <Typography variant="h3" color="primary" fontWeight={800}>
              {Math.ceil(boxesWithWaste)}
            </Typography>
            <Typography variant="caption" color="text.secondary">{boxesNeeded.toFixed(2)} boxes without waste allowance</Typography>
          </Box>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default FlooringCalculator;
