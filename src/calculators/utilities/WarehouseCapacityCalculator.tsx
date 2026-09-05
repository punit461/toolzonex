'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const WarehouseCapacityCalculator = () => {
  const [totalArea, setTotalArea] = useState('20000');
  const [palletFootprint, setPalletFootprint] = useState('13.3');
  const [overhead, setOverhead] = useState('30');

  const result = useMemo(() => {
    const area = parseFloat(totalArea) || 0;
    const footprint = parseFloat(palletFootprint) || 0;
    const overheadPct = parseFloat(overhead) || 0;

    const usableArea = area * (1 - overheadPct / 100);
    const capacity = footprint > 0 ? Math.floor(usableArea / footprint) : 0;

    return { usableArea, capacity };
  }, [totalArea, palletFootprint, overhead]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Warehouse Capacity Calculator</Typography>
      <Typography variant="body1">
        Enter your warehouse&apos;s total floor area, the footprint of a single pallet, and an aisle/clearance
        overhead percentage that accounts for forklift lanes, walkways, and staging areas that don&apos;t hold
        inventory. The calculator subtracts that overhead to find your usable storage area, then divides by
        pallet footprint to estimate how many pallets can actually fit.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Usable Storage Area = Total Area × (1 − Overhead %)
        <br />
        Pallet Capacity = FLOOR(Usable Area / Pallet Footprint)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 20,000 sq ft warehouse with a 30% aisle/clearance overhead has 20,000 × 0.70 = 14,000 sq ft of
        usable storage area. At a standard 13.3 sq ft pallet footprint, that fits 14,000 / 13.3 ≈ 1,052
        pallets.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating maximum pallet capacity before signing a warehouse lease.</li>
          <li>Comparing storage capacity across warehouses of different total floor areas.</li>
          <li>Sanity-checking inventory growth plans against available floor space.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Warehouse Space Calculator?</strong> The Warehouse Space Calculator answers &quot;how much space do I need to store X pallets&quot; — you give it a pallet count and it tells you the floor space required. This tool answers the reverse question — &quot;how many pallets can fit in a warehouse of Y square feet&quot; — you give it a floor area and it tells you the pallet capacity.</li>
          <li><strong>What overhead percentage should I use?</strong> 30-40% is a common starting range for standard pallet racking with forklift aisles, similar to the Warehouse Space Calculator&apos;s guidance. Narrow-aisle or high-density storage can reduce this, while operations needing wide turning radii or large staging areas may need more.</li>
          <li><strong>Does this account for vertical stacking or multi-level racking?</strong> No — this calculates floor-level pallet capacity (footprint) only. If you stack pallets or use multi-level racking, the same floor footprint can hold significantly more total inventory than the pallet count shown here.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/warehouse-capacity-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Total Warehouse Floor Area" type="number" value={totalArea}
            onChange={(e) => setTotalArea(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">sq ft</InputAdornment> } }}
          />
          <TextField
            label="Pallet Footprint" type="number" value={palletFootprint}
            onChange={(e) => setPalletFootprint(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth
            helperText="Standard 40×48 in pallet ≈ 13.3 sq ft"
            slotProps={{ input: { endAdornment: <InputAdornment position="end">sq ft</InputAdornment> } }}
          />
          <TextField
            label="Aisle / Clearance Overhead (%)"
            type="number"
            value={overhead}
            onChange={(e) => setOverhead(e.target.value)}
            onFocus={(e) => e.target.select()}
            fullWidth
            helperText="Commonly 30-40% for standard racking and forklift aisles"
          />
        </Box>

        <Paper variant="outlined" sx={{ p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
          <Box textAlign="center">
            <Typography variant="body2" color="text.secondary">Usable Storage Area</Typography>
            <Typography variant="h5" fontWeight={700}>{result.usableArea.toLocaleString(undefined, { maximumFractionDigits: 0 })} sq ft</Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="body2" color="text.secondary">Estimated Pallet Capacity</Typography>
            <Typography variant="h3" color="primary" fontWeight={800}>
              {result.capacity.toLocaleString()} pallets
            </Typography>
          </Box>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default WarehouseCapacityCalculator;
