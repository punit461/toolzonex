'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, IconButton, Button, InputAdornment, ToggleButtonGroup, ToggleButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) => `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

interface PersonRow {
  id: number;
  name: string;
  distance: string;
}

const DEFAULT_PEOPLE: PersonRow[] = [
  { id: 1, name: 'Alex', distance: '300' },
  { id: 2, name: 'Sam', distance: '200' },
  { id: 3, name: 'Jordan', distance: '150' },
];

const FuelSplitContent = () => {
  const [totalCost, setTotalCost] = useState('120');
  const [unit, setUnit] = useState<'miles' | 'km'>('miles');
  const [people, setPeople] = useState<PersonRow[]>(DEFAULT_PEOPLE);
  const [nextId, setNextId] = useState(DEFAULT_PEOPLE.length + 1);

  const addPerson = () => {
    setPeople([...people, { id: nextId, name: 'Person', distance: '0' }]);
    setNextId(nextId + 1);
  };
  const removePerson = (id: number) => setPeople(people.filter((p) => p.id !== id));
  const updatePerson = (id: number, field: 'name' | 'distance', v: string) =>
    setPeople(people.map((p) => (p.id === id ? { ...p, [field]: v } : p)));

  const cost = parseFloat(totalCost) || 0;
  const totalDistance = people.reduce((sum, p) => sum + (parseFloat(p.distance) || 0), 0);

  const shares = people.map((p) => {
    const d = parseFloat(p.distance) || 0;
    const share = totalDistance > 0 ? (d / totalDistance) * cost : 0;
    return { ...p, distanceNum: d, share };
  });

  return (
    <Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 3 }}>
        <TextField
          label="Total Fuel Cost"
          type="number"
          value={totalCost}
          onChange={(e) => setTotalCost(e.target.value)}
          fullWidth
          slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
        />
        <ToggleButtonGroup value={unit} exclusive onChange={(_, v) => v && setUnit(v)} size="small">
          <ToggleButton value="miles">Miles</ToggleButton>
          <ToggleButton value="km">Kilometers</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Stack spacing={2} sx={{ mb: 3 }}>
        {people.map((p) => (
          <Box key={p.id} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <TextField label="Name" value={p.name} onChange={(e) => updatePerson(p.id, 'name', e.target.value)} size="small" sx={{ flex: 2 }} />
            <TextField
              label={`Distance Traveled (${unit})`}
              type="number"
              value={p.distance}
              onChange={(e) => updatePerson(p.id, 'distance', e.target.value)}
              size="small"
              sx={{ flex: 1 }}
            />
            <IconButton onClick={() => removePerson(p.id)} size="small" aria-label="Remove person">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
        <Button startIcon={<AddIcon />} onClick={addPerson} variant="outlined" size="small" sx={{ alignSelf: 'flex-start' }}>
          Add Person
        </Button>
      </Stack>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Person</TableCell>
              <TableCell align="right">Distance ({unit})</TableCell>
              <TableCell align="right">Share of Fuel Cost</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shares.map((s) => (
              <TableRow key={s.id}>
                <TableCell>{s.name}</TableCell>
                <TableCell align="right">{s.distanceNum}</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>{money(s.share)}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Total</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>{totalDistance}</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>{money(cost)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

const FuelSplitCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Fuel Split Calculator</Typography>
      <Typography variant="body1">
        On a road trip, it&apos;s often fairer to split the total fuel cost by how far each person actually
        rode in the vehicle rather than splitting it evenly — especially when people join or leave partway
        through the trip. Enter the total fuel cost and list each person with the distance they personally
        traveled; the calculator divides the cost proportionally to each person&apos;s share of the total
        distance traveled by everyone combined.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Person&apos;s Share = Total Fuel Cost × (Their Distance ÷ Sum of All Distances)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A $120 fuel cost split among Alex (300 miles), Sam (200 miles), and Jordan (150 miles) who joined
        partway through — a combined 650 miles. Alex&apos;s share is 120 × (300 ÷ 650) ≈ $55.38, Sam&apos;s
        is 120 × (200 ÷ 650) ≈ $36.92, and Jordan&apos;s is 120 × (150 ÷ 650) ≈ $27.69.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Splitting road trip fuel costs fairly when passengers join or leave the vehicle at different points.</li>
          <li>Settling up fuel costs among carpool participants who each rode different distances.</li>
          <li>Dividing a multi-leg trip&apos;s total gas expense proportionally rather than splitting it evenly.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Split Bill Calculator?</strong> The Split Bill Calculator is built for restaurant and group bills — splitting a total evenly or by itemized purchases, with tip handling. This tool is specifically for road-trip fuel costs, splitting proportionally by the actual distance each rider traveled, which matters when people join or leave partway through a trip.</li>
          <li><strong>What if everyone rode the entire trip together?</strong> Enter the same total trip distance for every person — with equal distances, the calculator naturally splits the fuel cost evenly among everyone, the same result you&apos;d get from an even split.</li>
          <li><strong>Should distance be one-way or round-trip?</strong> Use whichever distance each person actually rode for — if someone only rode one leg of a round trip, enter just that leg&apos;s distance for them, while someone who rode the whole round trip enters the full round-trip distance.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/fuel-split-calculator" content={content}>
      <FuelSplitContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default FuelSplitCalculator;
