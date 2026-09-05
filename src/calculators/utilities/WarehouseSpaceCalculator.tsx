'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Mode = 'pallets' | 'area';

const WarehouseSpaceCalculator = () => {
  const [mode, setMode] = useState<Mode>('pallets');
  const [palletCount, setPalletCount] = useState('200');
  const [palletFootprint, setPalletFootprint] = useState('13.3');
  const [directArea, setDirectArea] = useState('2660');
  const [overhead, setOverhead] = useState('35');

  const { storageArea, totalArea } = useMemo(() => {
    const overheadPct = parseFloat(overhead) || 0;
    const base =
      mode === 'pallets'
        ? (parseFloat(palletCount) || 0) * (parseFloat(palletFootprint) || 0)
        : parseFloat(directArea) || 0;
    return { storageArea: base, totalArea: base * (1 + overheadPct / 100) };
  }, [mode, palletCount, palletFootprint, directArea, overhead]);

  const content = (
    <>
      <Typography variant="h2">How to Calculate Warehouse Floor Space Needed</Typography>
      <Typography variant="body1">
        Work out your raw storage footprint — either by multiplying your number of pallets by the floor space
        each pallet takes up, or by entering a known storage area directly — then add an aisle and clearance
        overhead percentage on top. Storage racking and pallets alone never fill 100% of a warehouse floor:
        forklifts, walkways, loading areas, and safety clearances all take additional space, commonly adding
        30-40% on top of pure storage footprint, though this varies with your layout and equipment.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Storage Area = Pallets × Footprint per Pallet
        <br />
        Total Floor Space = Storage Area × (1 + Aisle/Clearance Overhead %)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        200 pallets on a standard 40&quot; × 48&quot; footprint (about 13.3 sq ft each) take up 200 × 13.3 =
        2,660 sq ft of pure storage space. With a 35% aisle and clearance overhead, the total warehouse floor
        space needed is 2,660 × 1.35 ≈ 3,591 sq ft.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating how much floor space a given inventory volume or pallet count requires.</li>
          <li>Comparing space needs across different aisle widths or racking layouts.</li>
          <li>Sizing a warehouse or storage unit lease before committing.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What overhead percentage should I use?</Typography>
      <Typography variant="body1">
        30-40% is a common starting range for standard pallet racking with forklift aisles. Narrow-aisle or
        high-density storage (like drive-in racking) can push overhead lower, while operations needing wide
        forklift turning radii, staging areas, or heavy foot traffic often need more than 40%.
      </Typography>
      <Typography variant="h3">What&apos;s a standard pallet footprint?</Typography>
      <Typography variant="body1">
        The most common U.S. pallet size is 40&quot; × 48&quot;, which works out to about 13.3 sq ft. Euro
        pallets (1200mm × 800mm) are smaller, at roughly 10.3 sq ft. Adjust the footprint field to match the
        pallet size you actually use.
      </Typography>
      <Typography variant="h3">Does this account for vertical stacking or racking height?</Typography>
      <Typography variant="body1">
        No — this calculates floor space (footprint) only. If you stack pallets or use multi-level racking,
        the same floor footprint can hold significantly more inventory, but the floor space required to support
        that footprint doesn&apos;t change.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/warehouse-space-calculator" content={content}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={(_, val: Mode | null) => { if (val) setMode(val); }}
          size="small"
        >
          <ToggleButton value="pallets">Pallets × Footprint</ToggleButton>
          <ToggleButton value="area">Direct Storage Area</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {mode === 'pallets' ? (
            <>
              <TextField
                label="Number of Pallets" type="number" value={palletCount}
                onChange={(e) => setPalletCount(e.target.value)} onFocus={(e) => e.target.select()}
                fullWidth
              />
              <TextField
                label="Footprint per Pallet" type="number" value={palletFootprint}
                onChange={(e) => setPalletFootprint(e.target.value)} onFocus={(e) => e.target.select()}
                fullWidth
                helperText="Standard 40×48 in pallet ≈ 13.3 sq ft"
                slotProps={{ input: { endAdornment: <InputAdornment position="end">sq ft</InputAdornment> } }}
              />
            </>
          ) : (
            <TextField
              label="Storage Area" type="number" value={directArea}
              onChange={(e) => setDirectArea(e.target.value)} onFocus={(e) => e.target.select()}
              fullWidth
              slotProps={{ input: { endAdornment: <InputAdornment position="end">sq ft</InputAdornment> } }}
            />
          )}
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
            <Typography variant="body2" color="text.secondary">Storage Footprint</Typography>
            <Typography variant="h5" fontWeight={700}>{storageArea.toLocaleString(undefined, { maximumFractionDigits: 0 })} sq ft</Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="body2" color="text.secondary">Total Warehouse Floor Space Needed</Typography>
            <Typography variant="h3" color="primary" fontWeight={800}>
              {totalArea.toLocaleString(undefined, { maximumFractionDigits: 0 })} sq ft
            </Typography>
          </Box>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default WarehouseSpaceCalculator;
