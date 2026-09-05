'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, IconButton, Button, ToggleButton, ToggleButtonGroup } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface WallRow {
  id: number;
  length: string;
  height: string;
}

type SheetSize = '4x8' | '4x12';

const DrywallCalculator = () => {
  const [walls, setWalls] = useState<WallRow[]>([
    { id: 1, length: '12', height: '8' },
    { id: 2, length: '10', height: '8' },
  ]);
  const [nextId, setNextId] = useState(3);
  const [sheetSize, setSheetSize] = useState<SheetSize>('4x8');
  const [waste, setWaste] = useState('10');

  const addWall = () => {
    setWalls([...walls, { id: nextId, length: '', height: '' }]);
    setNextId(nextId + 1);
  };
  const removeWall = (id: number) => setWalls(walls.filter((w) => w.id !== id));
  const updateWall = (id: number, field: 'length' | 'height', value: string) => {
    setWalls(walls.map((w) => (w.id === id ? { ...w, [field]: value } : w)));
  };

  const sheetArea = sheetSize === '4x8' ? 32 : 48;

  const { totalArea, areaWithWaste, sheetsNeeded } = useMemo(() => {
    const area = walls.reduce((sum, w) => {
      const l = parseFloat(w.length);
      const h = parseFloat(w.height);
      return sum + (isNaN(l) || isNaN(h) ? 0 : l * h);
    }, 0);
    const wastePct = parseFloat(waste) || 0;
    const areaWithWaste = area * (1 + wastePct / 100);
    const sheets = sheetArea > 0 ? Math.ceil(areaWithWaste / sheetArea) : 0;
    return { totalArea: area, areaWithWaste, sheetsNeeded: sheets };
  }, [walls, waste, sheetArea]);

  const content = (
    <>
      <Typography variant="h2">How to Calculate How Many Drywall Sheets You Need</Typography>
      <Typography variant="body1">
        Add each wall you plan to cover with its length and height, choose your drywall sheet size (standard
        4×8 ft sheets are most common, though 4×12 ft sheets reduce the number of seams on taller or longer
        walls), and set a waste percentage to cover cuts around doors, windows, and outlets. The calculator
        totals your wall area, adds the waste buffer, and divides by the sheet&apos;s area to tell you how many
        sheets to buy.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Sheets Needed = ⌈(Total Wall Area × (1 + Waste %)) ÷ Sheet Area⌉
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Two walls measuring 12×8 ft and 10×8 ft give a total area of 96 + 80 = 176 sq ft. With a 10% waste
        allowance, that&apos;s 176 × 1.10 = 193.6 sq ft. Using standard 4×8 ft sheets (32 sq ft each), you&apos;d
        need ⌈193.6 ÷ 32⌉ = 7 sheets.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Getting a materials count together before ordering drywall for a room or addition.</li>
          <li>Comparing sheet counts between 4×8 ft and 4×12 ft sheet sizes.</li>
          <li>Budgeting a drywall installation or remodeling project.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What waste percentage should I use?</Typography>
      <Typography variant="body1">
        10% is a reasonable default for a straightforward room. Rooms with lots of doors, windows, angled
        ceilings, or complex cuts often warrant 15-20% to avoid running short mid-job.
      </Typography>
      <Typography variant="h3">Should I subtract door and window openings first?</Typography>
      <Typography variant="body1">
        This calculator doesn&apos;t subtract openings automatically — the waste percentage is meant to roughly
        absorb that. For a very precise count, you can manually reduce a wall&apos;s entered area to account for
        large openings and rely on a smaller waste percentage instead.
      </Typography>
      <Typography variant="h3">When should I use 4×12 sheets instead of 4×8?</Typography>
      <Typography variant="body1">
        Longer 4×12 ft sheets cover more wall per sheet and leave fewer seams to tape and mud, which can look
        better on tall or long walls, but they&apos;re heavier and harder to handle alone. Standard 4×8 sheets
        remain the easiest to transport and hang for most residential jobs.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/drywall-calculator" content={content}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
        <ToggleButtonGroup
          value={sheetSize}
          exclusive
          onChange={(_, val: SheetSize | null) => { if (val) setSheetSize(val); }}
          size="small"
        >
          <ToggleButton value="4x8">4×8 ft Sheets</ToggleButton>
          <ToggleButton value="4x12">4×12 ft Sheets</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="subtitle1" fontWeight={600}>Walls</Typography>
          {walls.map((w) => (
            <Box key={w.id} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <TextField
                label="Length (ft)"
                type="number"
                size="small"
                value={w.length}
                onChange={(e) => updateWall(w.id, 'length', e.target.value)}
                onFocus={(e) => e.target.select()}
                sx={{ flex: 1 }}
              />
              <TextField
                label="Height (ft)"
                type="number"
                size="small"
                value={w.height}
                onChange={(e) => updateWall(w.id, 'height', e.target.value)}
                onFocus={(e) => e.target.select()}
                sx={{ flex: 1 }}
              />
              <IconButton onClick={() => removeWall(w.id)} size="small" aria-label="Remove wall">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
          <Button startIcon={<AddIcon />} onClick={addWall} variant="outlined" size="small" sx={{ alignSelf: 'flex-start' }}>
            Add Wall
          </Button>

          <TextField
            label="Waste Allowance (%)"
            type="number"
            value={waste}
            onChange={(e) => setWaste(e.target.value)}
            onFocus={(e) => e.target.select()}
            sx={{ mt: 2 }}
          />
        </Box>

        <Paper variant="outlined" sx={{ p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
          <Box textAlign="center">
            <Typography variant="body2" color="text.secondary">Total Wall Area</Typography>
            <Typography variant="h5" fontWeight={700}>{totalArea.toLocaleString(undefined, { maximumFractionDigits: 1 })} sq ft</Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="body2" color="text.secondary">Area with Waste</Typography>
            <Typography variant="h6" fontWeight={600}>{areaWithWaste.toLocaleString(undefined, { maximumFractionDigits: 1 })} sq ft</Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="body2" color="text.secondary">Drywall Sheets Needed</Typography>
            <Typography variant="h3" color="primary" fontWeight={800}>{sheetsNeeded.toLocaleString()}</Typography>
          </Box>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default DrywallCalculator;
