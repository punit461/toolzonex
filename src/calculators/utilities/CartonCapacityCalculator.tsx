'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const CartonCapacityCalculator = () => {
  const [cartonL, setCartonL] = useState('24');
  const [cartonW, setCartonW] = useState('18');
  const [cartonH, setCartonH] = useState('12');
  const [itemL, setItemL] = useState('6');
  const [itemW, setItemW] = useState('4');
  const [itemH, setItemH] = useState('3');

  const cL = parseFloat(cartonL) || 0;
  const cW = parseFloat(cartonW) || 0;
  const cH = parseFloat(cartonH) || 0;
  const iL = parseFloat(itemL) || 0;
  const iW = parseFloat(itemW) || 0;
  const iH = parseFloat(itemH) || 0;
  const valid = cL > 0 && cW > 0 && cH > 0 && iL > 0 && iW > 0 && iH > 0;

  const fitL = valid ? Math.floor(cL / iL) : 0;
  const fitW = valid ? Math.floor(cW / iW) : 0;
  const fitH = valid ? Math.floor(cH / iH) : 0;
  const totalFit = fitL * fitW * fitH;

  const content = (
    <>
      <Typography variant="h2">How to Use the Carton Capacity Calculator</Typography>
      <Typography variant="body1">
        Enter your carton&apos;s internal length, width, and height, along with the length, width, and height of
        a single item you want to pack. The calculator works out how many items fit along each dimension by
        dividing the carton&apos;s size by the item&apos;s size and rounding down, then multiplies those three
        counts together for the total number of items that fit in the carton.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Items That Fit = ⌊Carton L / Item L⌋ × ⌊Carton W / Item W⌋ × ⌊Carton H / Item H⌋
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 24 × 18 × 12 in carton packing 6 × 4 × 3 in items fits 4 items along the length (24 ÷ 6), 4 along the
        width (18 ÷ 4, rounded down from 4.5), and 4 along the height (12 ÷ 3) — for a total of 4 × 4 × 4 = 64
        items.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating how many units of a product fit in a shipping or storage carton.</li>
          <li>Comparing carton sizes to find the option with the least wasted space for a given item.</li>
          <li>Planning how many cartons are needed for a production run or order.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does this account for rotating items to fit more?</strong> No — this uses a simple axis-aligned grid-packing approximation, where every item is assumed to sit in the same orientation. Real-world optimal packing can sometimes fit more items by rotating them or mixing orientations, so treat this result as a solid, conservative estimate rather than the absolute maximum.</li>
          <li><strong>Should I use inside or outside carton dimensions?</strong> Always use the carton&apos;s internal (inside) dimensions — the outside dimensions include the wall thickness of the cardboard, which would overstate how much usable space is actually available.</li>
          <li><strong>Does this leave room for padding or filler?</strong> No — it calculates the maximum items that fit based purely on dimensions. If you need to leave space for padding or filler material, reduce the carton&apos;s usable dimensions slightly before entering them.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/carton-capacity-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Stack spacing={3}>
          <Typography variant="subtitle1" fontWeight={600}>Carton Internal Dimensions</Typography>
          <Stack direction="row" spacing={1.5}>
            <TextField label="Length" type="number" value={cartonL} onChange={(e) => setCartonL(e.target.value)} fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">in</InputAdornment> } }} />
            <TextField label="Width" type="number" value={cartonW} onChange={(e) => setCartonW(e.target.value)} fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">in</InputAdornment> } }} />
            <TextField label="Height" type="number" value={cartonH} onChange={(e) => setCartonH(e.target.value)} fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">in</InputAdornment> } }} />
          </Stack>

          <Typography variant="subtitle1" fontWeight={600}>Item Dimensions</Typography>
          <Stack direction="row" spacing={1.5}>
            <TextField label="Length" type="number" value={itemL} onChange={(e) => setItemL(e.target.value)} fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">in</InputAdornment> } }} />
            <TextField label="Width" type="number" value={itemW} onChange={(e) => setItemW(e.target.value)} fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">in</InputAdornment> } }} />
            <TextField label="Height" type="number" value={itemH} onChange={(e) => setItemH(e.target.value)} fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">in</InputAdornment> } }} />
          </Stack>
        </Stack>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
          <Paper sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="h6">Items That Fit</Typography>
            <Typography variant="h6" fontWeight="bold">{valid ? totalFit : '—'}</Typography>
          </Paper>
          {valid && (
            <Paper sx={{ p: 2 }}>
              <Typography variant="body2" color="text.secondary">
                {fitL} along length × {fitW} along width × {fitH} along height
              </Typography>
            </Paper>
          )}
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CartonCapacityCalculator;
