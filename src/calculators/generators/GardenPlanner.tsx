'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, IconButton, Button, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const WATERING_OPTIONS = ['Daily', 'Every 2-3 days', 'Weekly', 'As needed'];

interface Plant {
  id: number;
  name: string;
  plantMonth: string;
  harvestMonth: string;
  watering: string;
}

let nextId = 1;

const DEFAULT_PLANTS: Plant[] = [
  { id: nextId++, name: 'Tomatoes', plantMonth: 'April', harvestMonth: 'July', watering: 'Every 2-3 days' },
  { id: nextId++, name: 'Carrots', plantMonth: 'March', harvestMonth: 'June', watering: 'Weekly' },
];

const GardenPlannerContent = () => {
  const [plants, setPlants] = useState<Plant[]>(DEFAULT_PLANTS);

  const addPlant = () => setPlants((prev) => [...prev, { id: nextId++, name: '', plantMonth: 'January', harvestMonth: 'January', watering: 'Weekly' }]);
  const removePlant = (id: number) => setPlants((prev) => prev.filter((p) => p.id !== id));
  const updatePlant = (id: number, patch: Partial<Plant>) =>
    setPlants((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));

  const validPlants = useMemo(
    () =>
      plants
        .filter((p) => p.name.trim())
        .slice()
        .sort((a, b) => MONTHS.indexOf(a.plantMonth) - MONTHS.indexOf(b.plantMonth)),
    [plants]
  );

  const copyList = async () => {
    const lines = validPlants.map(
      (p) => `- ${p.name.trim()}: plant in ${p.plantMonth}, harvest in ${p.harvestMonth}, water ${p.watering.toLowerCase()}`
    );
    try {
      await navigator.clipboard.writeText(lines.join('\n'));
    } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.4fr 1fr' }, gap: 4 }}>
      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Plants / Crops</Typography>
        <Stack spacing={2}>
          {plants.map((p) => (
            <Paper key={p.id} variant="outlined" sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
                <TextField size="small" fullWidth label="Plant/crop name" value={p.name} onChange={(e) => updatePlant(p.id, { name: e.target.value })} />
                <IconButton onClick={() => removePlant(p.id)} disabled={plants.length <= 1} size="small">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
              <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                <FormControl size="small" fullWidth>
                  <InputLabel>Planting month</InputLabel>
                  <Select label="Planting month" value={p.plantMonth} onChange={(e: SelectChangeEvent) => updatePlant(p.id, { plantMonth: e.target.value })}>
                    {MONTHS.map((m) => <MenuItem key={m} value={m}>{m}</MenuItem>)}
                  </Select>
                </FormControl>
                <FormControl size="small" fullWidth>
                  <InputLabel>Harvest month</InputLabel>
                  <Select label="Harvest month" value={p.harvestMonth} onChange={(e: SelectChangeEvent) => updatePlant(p.id, { harvestMonth: e.target.value })}>
                    {MONTHS.map((m) => <MenuItem key={m} value={m}>{m}</MenuItem>)}
                  </Select>
                </FormControl>
              </Stack>
              <FormControl size="small" fullWidth>
                <InputLabel>Watering frequency</InputLabel>
                <Select label="Watering frequency" value={p.watering} onChange={(e: SelectChangeEvent) => updatePlant(p.id, { watering: e.target.value })}>
                  {WATERING_OPTIONS.map((w) => <MenuItem key={w} value={w}>{w}</MenuItem>)}
                </Select>
              </FormControl>
            </Paper>
          ))}
        </Stack>
        <Button startIcon={<AddIcon />} onClick={addPlant} sx={{ mt: 2 }}>
          Add Plant
        </Button>
      </Box>

      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle1" fontWeight={600}>Planting Schedule</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyList} disabled={validPlants.length === 0}>
            Copy
          </Button>
        </Stack>
        <Paper variant="outlined" sx={{ p: 2, minHeight: 250 }}>
          {validPlants.length === 0 && (
            <Typography variant="body2" color="text.secondary">Add a plant to build your planting schedule.</Typography>
          )}
          <ul style={{ marginTop: 0, paddingLeft: 20 }}>
            {validPlants.map((p) => (
              <li key={p.id} style={{ marginBottom: 6 }}>
                <strong>{p.name}</strong>: plant in {p.plantMonth}, harvest in {p.harvestMonth}, water {p.watering.toLowerCase()}
              </li>
            ))}
          </ul>
        </Paper>
      </Box>
    </Box>
  );
};

const GardenPlanner = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Garden Planner</Typography>
      <Typography variant="body1">
        Add each plant or crop you&apos;re growing, along with its planting month, expected harvest month,
        and watering frequency. The panel on the right automatically sorts your plants by planting month,
        building an organized planting-and-harvest schedule across the growing season — helping you see at
        a glance what needs planting when, and what to expect to harvest and by when.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Adding Tomatoes (plant in April, harvest in July, water every 2-3 days) and Carrots (plant in March,
        harvest in June, water weekly) produces a schedule sorted with Carrots listed first, since March
        comes before April, followed by Tomatoes.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Planning which crops to plant and when across a full growing season.</li>
          <li>Coordinating watering schedules across multiple plants with different needs.</li>
          <li>Building a printable planting calendar to reference throughout spring and summer.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Garden Bed Calculator or Seed Spacing Calculator?</strong> Those tools handle physical layout and spacing math — how many beds fit in your plot, or how far apart to space seeds. This Garden Planner is a planting-and-harvest timing schedule across the growing season, not a physical layout tool.</li>
          <li><strong>Does the schedule reorder automatically as I change planting months?</strong> Yes — the list on the right re-sorts by planting month instantly whenever you add, edit, or remove a plant.</li>
          <li><strong>Is my garden plan saved anywhere?</strong> No — everything is kept only in your browser for the current session and resets on reload, so copy the schedule before closing the tab if you want to keep it.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/garden-planner" content={content}>
      <GardenPlannerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default GardenPlanner;
