'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const GardenBedCalculator = () => {
  const [plotWidth, setPlotWidth] = useState('20');
  const [plotLength, setPlotLength] = useState('30');
  const [bedWidth, setBedWidth] = useState('4');
  const [pathWidth, setPathWidth] = useState('2');

  const result = useMemo(() => {
    const pw = parseFloat(plotWidth) || 0;
    const pl = parseFloat(plotLength) || 0;
    const bw = parseFloat(bedWidth) || 0;
    const path = parseFloat(pathWidth) || 0;

    const unit = bw + path;
    const bedsAcross = unit > 0 ? Math.floor(pw / unit) : 0;
    const totalPlantingArea = bedsAcross * bw * pl;
    const totalPathArea = bedsAcross * path * pl;

    return { bedsAcross, totalPlantingArea, totalPathArea };
  }, [plotWidth, plotLength, bedWidth, pathWidth]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Garden Bed Calculator</Typography>
      <Typography variant="body1">
        Enter the total width and length of your available garden plot, your desired width for each individual
        bed, and the width of the walking paths between beds. The calculator figures out how many beds of your
        chosen width actually fit across your plot, along with the total planting area and total path area
        that layout consumes — helping you plan a garden layout before you build anything.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Number of Beds Across = floor(Plot Width / (Bed Width + Path Width))
        <br />
        Total Planting Area = Number of Beds × Bed Width × Plot Length
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 20 ft wide by 30 ft long plot with 4 ft wide beds and 2 ft wide paths fits floor(20 / (4+2)) = 3 beds
        across. That gives a total planting area of 3 × 4 × 30 = 360 sq ft, with the remaining 3 × 2 × 30 = 180
        sq ft consumed by walking paths between and around the beds.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Planning how many raised beds actually fit in a backyard garden plot before building them.</li>
          <li>Balancing bed size against path width to maximize usable planting area.</li>
          <li>Laying out a community garden or allotment plot with multiple beds and walkways.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Garden Soil Calculator?</strong> The Garden Soil Calculator computes the volume of soil needed to fill a bed that&apos;s already a known size. This tool comes earlier in the planning process — it helps you figure out how many beds actually fit in your available garden space in the first place.</li>
          <li><strong>How wide should garden paths be?</strong> Paths need to be wide enough to comfortably walk, kneel, and maneuver a wheelbarrow through — 18-24 inches is a common minimum, while 2-3 feet is more comfortable for wheelbarrow access and accessibility.</li>
          <li><strong>Why not just make one giant bed instead of several smaller ones?</strong> Narrower beds (commonly 3-4 feet wide) let you reach the center from either side without stepping on and compacting the soil, which is important for root growth and soil health — a single very wide bed makes the middle hard to reach.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/garden-bed-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Available Plot Width" type="number" value={plotWidth}
            onChange={(e) => setPlotWidth(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }}
          />
          <TextField
            label="Available Plot Length" type="number" value={plotLength}
            onChange={(e) => setPlotLength(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }}
          />
          <TextField
            label="Desired Bed Width" type="number" value={bedWidth}
            onChange={(e) => setBedWidth(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }}
          />
          <TextField
            label="Path Width Between Beds" type="number" value={pathWidth}
            onChange={(e) => setPathWidth(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Number of Beds That Fit Across</Typography>
            <Typography variant="h3" fontWeight="bold">{result.bedsAcross}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Total Planting Area</Typography>
            <Typography fontWeight={600}>{result.totalPlantingArea.toFixed(1)} sq ft</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Total Path Area</Typography>
            <Typography fontWeight={600}>{result.totalPathArea.toFixed(1)} sq ft</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default GardenBedCalculator;
