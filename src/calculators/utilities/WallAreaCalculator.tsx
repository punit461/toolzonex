'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Button, IconButton, Stack, Paper, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface Rect {
  id: string;
  length: number;
  height: number;
}

let nextWallId = 3;
let nextOpeningId = 3;

const WallAreaCalculator = () => {
  const [walls, setWalls] = useState<Rect[]>([
    { id: 'w1', length: 12, height: 8 },
    { id: 'w2', length: 10, height: 8 },
  ]);
  const [openings, setOpenings] = useState<Rect[]>([
    { id: 'o1', length: 3, height: 6.67 },
  ]);

  const addWall = () => setWalls([...walls, { id: `w${nextWallId++}`, length: 10, height: 8 }]);
  const removeWall = (id: string) => setWalls(walls.filter((w) => w.id !== id));
  const updateWall = (id: string, field: 'length' | 'height', val: number) => {
    setWalls(walls.map((w) => (w.id === id ? { ...w, [field]: val } : w)));
  };

  const addOpening = () => setOpenings([...openings, { id: `o${nextOpeningId++}`, length: 3, height: 4 }]);
  const removeOpening = (id: string) => setOpenings(openings.filter((o) => o.id !== id));
  const updateOpening = (id: string, field: 'length' | 'height', val: number) => {
    setOpenings(openings.map((o) => (o.id === id ? { ...o, [field]: val } : o)));
  };

  const { wallTotal, openingTotal, netArea } = useMemo(() => {
    const wt = walls.reduce((sum, w) => sum + (Number.isNaN(w.length) ? 0 : w.length) * (Number.isNaN(w.height) ? 0 : w.height), 0);
    const ot = openings.reduce((sum, o) => sum + (Number.isNaN(o.length) ? 0 : o.length) * (Number.isNaN(o.height) ? 0 : o.height), 0);
    return { wallTotal: wt, openingTotal: ot, netArea: Math.max(0, wt - ot) };
  }, [walls, openings]);

  const content = (
    <>
      <Typography variant="h2">How to Calculate Net Wall Area</Typography>
      <Typography variant="body1">
        Add each wall&apos;s length and height to get its gross area, then add each door or window&apos;s
        length and height as an opening to subtract. The result is the net paintable or usable wall area —
        useful for estimating paint, wallpaper, drywall, or siding quantities.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Net Area = Σ(Wall Length × Wall Height) − Σ(Opening Length × Opening Height)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Two walls — 12 ft × 8 ft and 10 ft × 8 ft — total 96 + 80 = 176 sq ft of gross wall area. Subtracting a
        3 ft × 6.67 ft door (about 20 sq ft) leaves a net area of roughly 156 sq ft to paint or cover.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating paint or wallpaper needed for a room after accounting for doors and windows.</li>
          <li>Calculating drywall sheet counts for a renovation project.</li>
          <li>Figuring out siding material needed for an exterior wall with windows.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Should I subtract windows and doors from the total?</Typography>
      <Typography variant="body1">
        Yes, for the most accurate paint, wallpaper, or material estimate — you generally don&apos;t need
        material to cover door and window openings. If you also plan to paint the door and window frames or
        trim, add a smaller separate allowance for those surfaces.
      </Typography>
      <Typography variant="h3">What if the net area comes out to zero?</Typography>
      <Typography variant="body1">
        A net area of zero means the total opening area you entered equals or exceeds the total wall area,
        which usually signals a data entry issue — double-check that your wall and opening dimensions are
        correct and in the same units.
      </Typography>
      <Typography variant="h3">Can I use this for multiple rooms at once?</Typography>
      <Typography variant="body1">
        Yes — just add a row for every wall across every room you&apos;re covering, and a row for every door or
        window throughout, and the calculator totals everything together into one combined net area.
      </Typography>
    </>
  );

  const renderRows = (
    rows: Rect[],
    update: (id: string, field: 'length' | 'height', val: number) => void,
    remove: (id: string) => void,
    minRows: number
  ) => (
    <Stack spacing={2}>
      {rows.map((row, index) => (
        <Stack key={row.id} direction="row" spacing={1.5} alignItems="center">
          <Typography sx={{ minWidth: 28, color: 'text.secondary' }}>#{index + 1}</Typography>
          <TextField
            label="Length (ft)" type="number" size="small" fullWidth
            onFocus={(e) => e.target.select()}
            value={Number.isNaN(row.length) ? '' : row.length}
            onChange={(e) => update(row.id, 'length', e.target.value === '' ? NaN : Number(e.target.value))}
          />
          <TextField
            label="Height (ft)" type="number" size="small" fullWidth
            onFocus={(e) => e.target.select()}
            value={Number.isNaN(row.height) ? '' : row.height}
            onChange={(e) => update(row.id, 'height', e.target.value === '' ? NaN : Number(e.target.value))}
          />
          <IconButton color="error" size="small" onClick={() => remove(row.id)} disabled={rows.length <= minRows}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      ))}
    </Stack>
  );

  return (
    <CalculatorShell url="/utilities/wall-area-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>Walls</Typography>
          {renderRows(walls, updateWall, removeWall, 1)}
          <Button startIcon={<AddIcon />} onClick={addWall} sx={{ mt: 2 }}>Add Wall</Button>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h6" sx={{ mb: 2 }}>Doors / Windows (subtracted)</Typography>
          {renderRows(openings, updateOpening, removeOpening, 0)}
          <Button startIcon={<AddIcon />} onClick={addOpening} sx={{ mt: 2 }}>Add Opening</Button>
        </Box>

        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', height: 'fit-content' }}>
          <Typography variant="body2" color="text.secondary">Net Wall Area</Typography>
          <Typography variant="h3" color="primary" fontWeight={800}>{netArea.toFixed(1)} sq ft</Typography>
          <Box sx={{ mt: 3, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <Box>
              <Typography variant="body2" color="text.secondary">Gross Wall Area</Typography>
              <Typography variant="h6">{wallTotal.toFixed(1)} sq ft</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">Openings</Typography>
              <Typography variant="h6">{openingTotal.toFixed(1)} sq ft</Typography>
            </Box>
          </Box>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default WallAreaCalculator;
