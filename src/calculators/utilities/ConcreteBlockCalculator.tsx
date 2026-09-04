'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const ConcreteBlockCalculator = () => {
  const [wallLength, setWallLength] = useState('20');
  const [wallHeight, setWallHeight] = useState('8');
  const [blockLength, setBlockLength] = useState('16');
  const [blockHeight, setBlockHeight] = useState('8');
  const [mortarJoint, setMortarJoint] = useState('0.375');
  const [wastePct, setWastePct] = useState('10');
  const [mortarBagsPer100, setMortarBagsPer100] = useState('3');

  const result = useMemo(() => {
    const wl = parseFloat(wallLength) || 0;
    const wh = parseFloat(wallHeight) || 0;
    const bl = parseFloat(blockLength) || 0;
    const bh = parseFloat(blockHeight) || 0;
    const joint = parseFloat(mortarJoint) || 0;
    const waste = (parseFloat(wastePct) || 0) / 100;
    const bagsPer100 = parseFloat(mortarBagsPer100) || 0;

    const wallArea = wl * wh;
    const effBlockLengthFt = (bl + joint) / 12;
    const effBlockHeightFt = (bh + joint) / 12;
    const blockFaceArea = effBlockLengthFt * effBlockHeightFt;
    const baseBlocks = blockFaceArea > 0 ? wallArea / blockFaceArea : 0;
    const totalBlocks = Math.ceil(baseBlocks * (1 + waste));
    const mortarBags = Math.ceil((totalBlocks / 100) * bagsPer100);

    return { wallArea, baseBlocks, totalBlocks, mortarBags };
  }, [wallLength, wallHeight, blockLength, blockHeight, mortarJoint, wastePct, mortarBagsPer100]);

  const content = (
    <>
      <Typography variant="h2">How to Calculate Concrete Blocks Needed for a Wall</Typography>
      <Typography variant="body1">
        This calculator is for concrete block (cinder block) wall construction, not poured or mixed concrete.
        It divides the total wall area by the face area of a single block — including the mortar joint around
        it — to find how many blocks the wall requires, then adds a waste allowance for cutting and breakage.
        It also estimates the mortar bags needed using a standard rule of thumb of about 3 bags per 100 blocks.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Blocks Needed = Wall Area ÷ [(Block Length + Joint) × (Block Height + Joint)] × (1 + Waste %)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 20 ft long, 8 ft high wall (160 sq ft) built with standard 16&quot; × 8&quot; blocks and a 3/8&quot;
        mortar joint has an effective block face of about 1.36 ft × 0.7 ft = 0.95 sq ft, so it needs roughly
        168 blocks before waste, or about 185 blocks with a 10% allowance — and around 6 bags of mortar mix.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating block quantities for a foundation, retaining wall, or garden wall.</li>
          <li>Getting a materials list together before requesting a quote from a mason or supplier.</li>
          <li>Comparing costs between different standard block sizes for the same wall.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is this different from the site&apos;s Concrete Calculator?</Typography>
      <Typography variant="body1">
        The Concrete Calculator and Concrete Slab Calculator are for poured or mixed concrete — they calculate
        wet concrete volume and cement bags for slabs, footings, and columns. This tool is specifically for
        concrete block (cinder block) construction, where you&apos;re counting individual masonry units and
        mortar for a block wall, not pouring a volume of concrete.
      </Typography>
      <Typography variant="h3">What&apos;s a standard concrete block size?</Typography>
      <Typography variant="body1">
        The most common standard block is nominally 16&quot; long × 8&quot; high × 8&quot; deep, though the
        actual block is slightly smaller (about 15&#8541;&quot; × 7&#8541;&quot;) to allow for a 3/8&quot; mortar
        joint on each side, which is why this calculator adds the joint back in when sizing the effective
        coverage area.
      </Typography>
      <Typography variant="h3">How much waste should I allow for?</Typography>
      <Typography variant="body1">
        A 5-10% allowance is typical to cover cut blocks at corners and openings, plus breakage during handling.
        Complex layouts with lots of openings or corners may need a higher allowance.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/concrete-block-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField label="Wall Length" type="number" value={wallLength} onChange={(e) => setWallLength(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }} fullWidth />
          <TextField label="Wall Height" type="number" value={wallHeight} onChange={(e) => setWallHeight(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }} fullWidth />
          <TextField label="Block Length" type="number" value={blockLength} onChange={(e) => setBlockLength(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">in</InputAdornment> } }} fullWidth />
          <TextField label="Block Height" type="number" value={blockHeight} onChange={(e) => setBlockHeight(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">in</InputAdornment> } }} fullWidth />
          <TextField label="Mortar Joint Thickness" type="number" value={mortarJoint} onChange={(e) => setMortarJoint(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">in</InputAdornment> } }} fullWidth />
          <TextField label="Waste Allowance" type="number" value={wastePct} onChange={(e) => setWastePct(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }} fullWidth />
          <TextField label="Mortar Bags per 100 Blocks" type="number" value={mortarBagsPer100} onChange={(e) => setMortarBagsPer100(e.target.value)} fullWidth helperText="Adjust based on your mortar mix and joint size." />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Blocks Needed</Typography>
            <Typography variant="h3" fontWeight="bold">{result.totalBlocks.toLocaleString()}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Wall Area</Typography>
            <Typography fontWeight={600}>{result.wallArea.toFixed(1)} sq ft</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Blocks Before Waste</Typography>
            <Typography fontWeight={600}>{Math.ceil(result.baseBlocks).toLocaleString()}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Mortar Bags Needed</Typography>
            <Typography fontWeight={600}>{result.mortarBags.toLocaleString()} bags</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ConcreteBlockCalculator;
