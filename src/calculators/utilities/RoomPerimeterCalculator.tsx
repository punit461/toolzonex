'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Button, IconButton, Stack, ToggleButton, ToggleButtonGroup, InputAdornment } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Mode = 'rectangle' | 'irregular';

interface Segment {
  id: string;
  value: string;
}

let nextId = 5;

const RoomPerimeterCalculator = () => {
  const [mode, setMode] = useState<Mode>('rectangle');
  const [length, setLength] = useState('12');
  const [width, setWidth] = useState('10');
  const [segments, setSegments] = useState<Segment[]>([
    { id: '1', value: '8' },
    { id: '2', value: '5' },
    { id: '3', value: '6' },
    { id: '4', value: '9' },
  ]);

  const addSegment = () => setSegments([...segments, { id: String(nextId++), value: '' }]);
  const removeSegment = (id: string) => setSegments(segments.filter((s) => s.id !== id));
  const updateSegment = (id: string, value: string) =>
    setSegments(segments.map((s) => (s.id === id ? { ...s, value } : s)));

  const perimeter = useMemo(() => {
    if (mode === 'rectangle') {
      const l = parseFloat(length) || 0;
      const w = parseFloat(width) || 0;
      return 2 * (l + w);
    }
    return segments.reduce((sum, s) => sum + (parseFloat(s.value) || 0), 0);
  }, [mode, length, width, segments]);

  const area = useMemo(() => {
    if (mode !== 'rectangle') return null;
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    return l * w;
  }, [mode, length, width]);

  const content = (
    <>
      <Typography variant="h2">How Room Perimeter Is Calculated</Typography>
      <Typography variant="body1">
        For a simple rectangular room, perimeter is twice the sum of length and width. For a room that isn&apos;t
        a clean rectangle — an L-shaped room, a room with a bump-out, or an oddly angled space — switch to
        Irregular Room mode and enter the length of each wall segment going around the room; the tool adds them
        all up for you.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Rectangle Perimeter = 2 × (Length + Width)
        <br />
        Irregular Perimeter = Sum of All Wall Segment Lengths
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 12 ft × 10 ft rectangular room has a perimeter of 2 × (12 + 10) = 44 ft. An L-shaped room with wall
        segments of 8, 5, 6, and 9 ft has a perimeter of 8 + 5 + 6 + 9 = 28 ft.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating how much baseboard or trim molding to buy for a room.</li>
          <li>Figuring out crown molding or wallpaper border length.</li>
          <li>Planning fencing-style perimeter materials around an irregular space.</li>
          <li>Double-checking a contractor&apos;s quoted linear footage before ordering materials.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Should I subtract doorways and openings from the perimeter?</Typography>
      <Typography variant="body1">
        For baseboard or trim, yes — subtract the width of any doorways or open archways, since trim isn&apos;t
        installed across an opening. This tool gives the full wall perimeter; deduct openings separately for an
        exact material order.
      </Typography>
      <Typography variant="h3">How do I measure an irregular room?</Typography>
      <Typography variant="body1">
        Walk the room&apos;s perimeter and measure each straight wall segment one at a time, in order, then enter
        each length as its own row in Irregular Room mode. The tool sums every segment into a total perimeter.
      </Typography>
      <Typography variant="h3">Does this calculate floor area too?</Typography>
      <Typography variant="body1">
        In Rectangle mode, yes — the area (length × width) is shown alongside the perimeter. Irregular mode only
        totals the perimeter, since area for a non-rectangular shape needs more than just the outer wall
        lengths.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/room-perimeter-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box>
          <ToggleButtonGroup value={mode} exclusive onChange={(_, v) => v && setMode(v)} fullWidth sx={{ mb: 3 }}>
            <ToggleButton value="rectangle">Rectangular Room</ToggleButton>
            <ToggleButton value="irregular">Irregular Room</ToggleButton>
          </ToggleButtonGroup>

          {mode === 'rectangle' ? (
            <Stack spacing={2}>
              <TextField
                label="Room Length"
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                fullWidth
                slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }}
              />
              <TextField
                label="Room Width"
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                fullWidth
                slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }}
              />
            </Stack>
          ) : (
            <Box>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                Wall Segment Lengths
              </Typography>
              <Stack spacing={1.5}>
                {segments.map((s, index) => (
                  <Stack key={s.id} direction="row" spacing={1.5} alignItems="center">
                    <Typography sx={{ minWidth: 24, color: 'text.secondary' }}>#{index + 1}</Typography>
                    <TextField
                      label="Length"
                      type="number"
                      size="small"
                      fullWidth
                      value={s.value}
                      onChange={(e) => updateSegment(s.id, e.target.value)}
                      slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }}
                    />
                    <IconButton color="error" size="small" onClick={() => removeSegment(s.id)} disabled={segments.length <= 1}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                ))}
              </Stack>
              <Button startIcon={<AddIcon />} onClick={addSegment} sx={{ mt: 2 }}>Add Wall Segment</Button>
            </Box>
          )}
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Total Perimeter</Typography>
            <Typography variant="h3" fontWeight="bold">{perimeter.toFixed(2)} ft</Typography>
          </Paper>
          {area !== null && (
            <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Floor Area</Typography>
              <Typography fontWeight={600}>{area.toFixed(2)} sq ft</Typography>
            </Paper>
          )}
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RoomPerimeterCalculator;
