'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const SIZE_TABLE = [
  { range: 'Up to 75 sq ft', span: '29" - 36"' },
  { range: '76 - 144 sq ft', span: '36" - 42"' },
  { range: '145 - 225 sq ft', span: '44" - 50"' },
  { range: '226 - 400 sq ft', span: '50" - 54"' },
  { range: 'Over 400 sq ft', span: '56"+ (or multiple fans)' },
];

function recommend(area: number): string {
  if (area <= 75) return '29" - 36"';
  if (area <= 144) return '36" - 42"';
  if (area <= 225) return '44" - 50"';
  if (area <= 400) return '50" - 54"';
  return '56"+ (consider multiple fans)';
}

const CeilingFanSizeCalculator = () => {
  const [length, setLength] = useState<string>('12');
  const [width, setWidth] = useState<string>('12');

  const { area, valid, span } = useMemo(() => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    if (isNaN(l) || isNaN(w) || l <= 0 || w <= 0) return { area: 0, valid: false, span: '' };
    const a = l * w;
    return { area: a, valid: true, span: recommend(a) };
  }, [length, width]);

  const content = (
    <>
      <Typography variant="h2">How to Choose a Ceiling Fan Size</Typography>
      <Typography variant="body1">
        The right ceiling fan blade span depends mainly on your room&apos;s floor area — a fan that&apos;s too
        small won&apos;t move enough air, while an oversized fan can feel out of proportion and overpower a
        small room. Multiply room length by width to get the area, then match it against standard sizing
        guidelines.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Room Area = Length × Width
      </Box>

      <Typography variant="h2">Reference Table: Room Size to Fan Span</Typography>
      <Paper variant="outlined" sx={{ overflowX: 'auto', mb: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Room Area</TableCell>
              <TableCell>Recommended Blade Span</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {SIZE_TABLE.map((row) => (
              <TableRow key={row.range}>
                <TableCell>{row.range}</TableCell>
                <TableCell>{row.span}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 12&nbsp;ft × 12&nbsp;ft bedroom has an area of 144 sq ft, which falls at the top of the &quot;76-144 sq
        ft&quot; range, so a fan with a 36&quot;-42&quot; blade span is recommended.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Choosing an appropriately sized ceiling fan when furnishing a new room.</li>
          <li>Checking whether an existing fan is under- or oversized for its room.</li>
          <li>Planning multiple smaller fans for a large open-plan living area instead of one oversized fan.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What if my room is an unusual shape?</Typography>
      <Typography variant="body1">
        For irregularly shaped rooms, estimate the total floor area as closely as you can (breaking it into
        rectangular sections and adding them up works well), then use that total area with the sizing table.
      </Typography>
      <Typography variant="h3">Does ceiling height matter for fan size?</Typography>
      <Typography variant="body1">
        Ceiling height affects mounting method (using a downrod for higher ceilings) more than blade span
        selection, but very high ceilings may need a longer downrod to bring the fan down to the ideal
        7-9 feet above the floor for effective airflow.
      </Typography>
      <Typography variant="h3">Can I use two fans instead of one large fan?</Typography>
      <Typography variant="body1">
        Yes — for large or oddly shaped rooms over roughly 400 sq ft, two appropriately sized fans often
        distribute airflow more evenly than a single very large fan, and can look better proportioned too.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/ceiling-fan-size-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, alignItems: 'center' }}>
        <Stack spacing={2}>
          <TextField label="Room Length (ft)" type="number" fullWidth value={length} onChange={(e) => setLength(e.target.value)} onFocus={(e) => e.target.select()} />
          <TextField label="Room Width (ft)" type="number" fullWidth value={width} onChange={(e) => setWidth(e.target.value)} onFocus={(e) => e.target.select()} />
        </Stack>

        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">Room Area</Typography>
          <Typography variant="h5" fontWeight={700}>{valid ? `${area.toFixed(0)} sq ft` : '—'}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>Recommended Blade Span</Typography>
          <Typography variant="h4" color="primary" fontWeight={800}>{valid ? span : '—'}</Typography>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CeilingFanSizeCalculator;
