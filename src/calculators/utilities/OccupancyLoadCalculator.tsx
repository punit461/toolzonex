'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface OccupancyType {
  label: string;
  factor: number;
}

const OCCUPANCY_TYPES: OccupancyType[] = [
  { label: 'Assembly - Unconcentrated (tables & chairs)', factor: 15 },
  { label: 'Assembly - Concentrated (standing)', factor: 7 },
  { label: 'Business / Office', factor: 100 },
  { label: 'Mercantile (retail)', factor: 45 },
  { label: 'Educational Classroom', factor: 20 },
];

const OccupancyLoadCalculator = () => {
  const [area, setArea] = useState('3000');
  const [typeIndex, setTypeIndex] = useState(0);

  const type = OCCUPANCY_TYPES[typeIndex];

  const load = useMemo(() => {
    const a = parseFloat(area) || 0;
    return type.factor > 0 ? Math.floor(a / type.factor) : 0;
  }, [area, type]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Occupancy Load Calculator</Typography>
      <Typography variant="body1">
        Enter the floor area of a room or building and select an occupancy type to estimate the maximum number
        of people it can hold. Each occupancy type uses a standard square-feet-per-person factor commonly
        referenced from building-code-style occupant load tables — assembly spaces with dense standing crowds
        need far less area per person than an office, for example.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Occupancy Load = Floor Area (sq ft) / Occupant Load Factor (sq ft per person)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 3,000 sq ft space used for unconcentrated assembly (tables and chairs) at 15 sq ft per person has an
        occupancy load of 3,000 / 15 = 200 people. The same space used as concentrated standing assembly at 7
        sq ft per person could hold up to 3,000 / 7 = 428 people.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Getting a rough estimate of maximum capacity before consulting official code requirements.</li>
          <li>Planning event or venue capacity for a given room size and layout.</li>
          <li>Comparing how occupancy limits change between different uses of the same physical space.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Is this the official, legally binding occupancy load for my building?</strong> No. These are general reference factors intended for estimation only. Actual code-compliant occupancy load must be confirmed with your local building and fire code officials, who apply the specific code edition, exits, and use-case rules that govern your building.</li>
          <li><strong>Why do occupancy factors vary so much between space types?</strong> The factors reflect how densely people typically occupy a space for that use — a standing crowd at a concert packs in much more tightly than desks and chairs in an office, so codes assign a much smaller area-per-person figure to concentrated assembly use.</li>
          <li><strong>Does this account for exits and egress requirements?</strong> No — this only estimates occupant load from floor area and use type. Actual code compliance also requires enough exit doors, exit width, and egress path capacity to safely evacuate that many occupants, which is a separate calculation done by a code official or engineer.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/occupancy-load-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Floor Area" type="number" value={area}
            onChange={(e) => setArea(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">sq ft</InputAdornment> } }}
          />
          <FormControl fullWidth>
            <InputLabel>Occupancy Type</InputLabel>
            <Select
              value={typeIndex}
              label="Occupancy Type"
              onChange={(e: SelectChangeEvent<number>) => setTypeIndex(Number(e.target.value))}
            >
              {OCCUPANCY_TYPES.map((t, i) => (
                <MenuItem key={t.label} value={i}>{t.label} ({t.factor} sq ft/person)</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Estimated Occupancy Load</Typography>
            <Typography variant="h3" fontWeight="bold">{load} people</Typography>
          </Paper>
          <Typography variant="caption" color="text.secondary">
            General reference estimate only — confirm actual occupancy load with local building/fire code officials.
          </Typography>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default OccupancyLoadCalculator;
