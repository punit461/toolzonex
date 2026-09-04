'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Preset = 'us' | 'eu' | 'custom';

const PRESETS: Record<Exclude<Preset, 'custom'>, { length: number; width: number }> = {
  us: { length: 48, width: 40 },
  eu: { length: 47.24, width: 31.5 },
};

const PalletLoadCalculator = () => {
  const [preset, setPreset] = useState<Preset>('us');
  const [palletLength, setPalletLength] = useState('48');
  const [palletWidth, setPalletWidth] = useState('40');
  const [boxLength, setBoxLength] = useState('12');
  const [boxWidth, setBoxWidth] = useState('10');
  const [boxHeight, setBoxHeight] = useState('8');
  const [maxStackHeight, setMaxStackHeight] = useState('60');

  const applyPreset = (value: Preset) => {
    setPreset(value);
    if (value !== 'custom') {
      setPalletLength(String(PRESETS[value].length));
      setPalletWidth(String(PRESETS[value].width));
    }
  };

  const result = useMemo(() => {
    const pl = parseFloat(palletLength) || 0;
    const pw = parseFloat(palletWidth) || 0;
    const bl = parseFloat(boxLength) || 0;
    const bw = parseFloat(boxWidth) || 0;
    const bh = parseFloat(boxHeight) || 0;
    const maxH = parseFloat(maxStackHeight) || 0;

    const orientationA = bl > 0 && bw > 0 ? Math.floor(pl / bl) * Math.floor(pw / bw) : 0;
    const orientationB = bl > 0 && bw > 0 ? Math.floor(pl / bw) * Math.floor(pw / bl) : 0;
    const boxesPerLayer = Math.max(orientationA, orientationB);

    const layers = bh > 0 ? Math.floor(maxH / bh) : 0;
    const totalBoxes = boxesPerLayer * layers;

    return { boxesPerLayer, layers, totalBoxes };
  }, [palletLength, palletWidth, boxLength, boxWidth, boxHeight, maxStackHeight]);

  const content = (
    <>
      <Typography variant="h2">How Pallet Load Is Calculated</Typography>
      <Typography variant="body1">
        This calculator estimates how many boxes fit on a pallet by comparing the pallet&apos;s footprint to the
        box&apos;s footprint in a simple grid layout, then stacking layers up to a maximum height. Choose a
        standard pallet preset — US (48&quot; × 40&quot;) or EU (1200mm × 800mm) — or enter custom pallet
        dimensions. The calculator checks both box orientations (rotated 90°) on the pallet footprint and uses
        whichever fits more boxes per layer, then multiplies by how many layers fit under your maximum stack
        height.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Boxes Per Layer = MAX of both orientations: ⌊Pallet L ÷ Box L⌋ × ⌊Pallet W ÷ Box W⌋
        <br />
        Layers = ⌊Max Stack Height ÷ Box Height⌋
        <br />
        Total Boxes = Boxes Per Layer × Layers
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A US pallet (48&quot; × 40&quot;) loaded with 12&quot; × 10&quot; × 8&quot; boxes fits 4 × 4 = 16 boxes
        per layer. With a 60&quot; maximum stack height, 60 ÷ 8 = 7 layers fit, for a total of 112 boxes on the
        pallet.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Planning warehouse storage or truckload capacity before packing a shipment.</li>
          <li>Comparing how box size choices affect how efficiently a pallet is used.</li>
          <li>Estimating the number of pallets needed for a given order quantity.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does this account for optimal 3D bin-packing?</Typography>
      <Typography variant="body1">
        No — this uses a simple grid-fit calculation per layer, checking both flat box orientations on the
        pallet footprint, not full 3D bin-packing optimization (which can sometimes interlock or offset boxes
        to squeeze in extra units). Treat the result as a solid practical estimate, not an absolute maximum.
      </Typography>
      <Typography variant="h3">Why check both box orientations?</Typography>
      <Typography variant="body1">
        Rotating a box 90° on the pallet footprint often fits a different number of boxes per layer — picking
        the better of the two orientations gives a more realistic and efficient loading estimate than assuming
        just one fixed orientation.
      </Typography>
      <Typography variant="h3">What should I use for maximum stack height?</Typography>
      <Typography variant="body1">
        Use whichever is more restrictive: your storage racking height, trailer or container interior height,
        or a safe handling height limit, typically minus the height of the pallet itself if that matters for
        your use case.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/pallet-load-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Pallet Preset</InputLabel>
            <Select value={preset} label="Pallet Preset" onChange={(e) => applyPreset(e.target.value as Preset)}>
              <MenuItem value="us">US Standard (48&quot; × 40&quot;)</MenuItem>
              <MenuItem value="eu">EU Standard (1200mm × 800mm)</MenuItem>
              <MenuItem value="custom">Custom</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <TextField
              label="Pallet Length"
              type="number"
              value={palletLength}
              onChange={(e) => {
                setPalletLength(e.target.value);
                setPreset('custom');
              }}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">in</InputAdornment> } }}
            />
            <TextField
              label="Pallet Width"
              type="number"
              value={palletWidth}
              onChange={(e) => {
                setPalletWidth(e.target.value);
                setPreset('custom');
              }}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">in</InputAdornment> } }}
            />
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2 }}>
            <TextField
              label="Box Length"
              type="number"
              value={boxLength}
              onChange={(e) => setBoxLength(e.target.value)}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">in</InputAdornment> } }}
            />
            <TextField
              label="Box Width"
              type="number"
              value={boxWidth}
              onChange={(e) => setBoxWidth(e.target.value)}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">in</InputAdornment> } }}
            />
            <TextField
              label="Box Height"
              type="number"
              value={boxHeight}
              onChange={(e) => setBoxHeight(e.target.value)}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">in</InputAdornment> } }}
            />
          </Box>

          <TextField
            label="Max Stack Height"
            type="number"
            value={maxStackHeight}
            onChange={(e) => setMaxStackHeight(e.target.value)}
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">in</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Total Boxes Per Pallet</Typography>
            <Typography variant="h3" fontWeight="bold">{result.totalBoxes}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Boxes Per Layer</Typography>
            <Typography fontWeight={600}>{result.boxesPerLayer}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Layers</Typography>
            <Typography fontWeight={600}>{result.layers}</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PalletLoadCalculator;
