'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, Stack, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

interface Room {
  id: number;
  label: string;
  length: string;
  width: string;
}

let nextId = 1;

const CarpetAreaCalculator = () => {
  const [rooms, setRooms] = useState<Room[]>([{ id: 0, label: 'Room 1', length: '', width: '' }]);
  const [wastage, setWastage] = useState<string>('10');
  const [price, setPrice] = useState<string>('');

  const result = useMemo(() => {
    let neatArea = 0;
    for (const room of rooms) {
      const len = Number(room.length);
      const wid = Number(room.width);
      if (!room.label.trim()) return null;
      if (!len || !wid || len <= 0 || wid <= 0) return null;
      neatArea += len * wid;
    }
    const wastePct = Number(wastage) || 0;
    const withWastage = neatArea * (1 + wastePct / 100);
    const sqYd = withWastage / 9;
    const pricePsf = Number(price) || 0;
    const cost = pricePsf > 0 ? withWastage * pricePsf : 0;
    return { neatArea, withWastage, sqYd, wastePct, cost, pricePsf };
  }, [rooms, wastage, price]);

  const updateRoom = (id: number, field: 'label' | 'length' | 'width', value: string) => {
    setRooms((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  };

  const addRoom = () => {
    setRooms((prev) => [...prev, { id: nextId++, label: `Room ${prev.length + 1}`, length: '', width: '' }]);
  };

  const removeRoom = (id: number) => {
    setRooms((prev) => prev.filter((r) => r.id !== id));
  };

  const content = (
    <>
      <Typography variant="h2">How is Carpet Area Calculated?</Typography>
      <Typography variant="body1">
        Carpet area is the amount of flooring you actually need: the sum of each room's length × width. To
        account for trimming, seams, and irregular shapes, a wastage percentage is added on top. Convert
        square feet to square yards by dividing by 9 (since 1 yard = 3 feet, 1 square yard = 9 square feet).
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A bedroom of 12 ft × 10 ft is 120 sq ft. Adding a 10% wastage allowance gives 120 × 1.10 = 132 sq
        ft, or 132 / 9 = 14.67 sq yd. At $4 per sq ft, the carpet would cost 132 × $4 = $528.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating carpet needed before ordering from a retailer.</li>
          <li>Budgeting for new flooring across multiple rooms.</li>
          <li>Comparing square-foot versus square-yard pricing with retailers.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How much wastage should I add?</Typography>
      <Typography variant="body1">
        A 10% allowance is typical. Rooms with many alcoves, angles, or a patterned carpet that must be
        matched seam-to-seam may need 15% or more.
      </Typography>
      <Typography variant="h3">How do I convert square feet to square yards?</Typography>
      <Typography variant="body1">
        Divide the square footage by 9. Carpet is commonly sold by the square yard in the US, so retailers
        often quote prices this way.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/carpet-area-calculator" content={content}>
      <Stack spacing={3}>
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Stack spacing={2}>
            {rooms.map((room, idx) => (
              <Stack key={room.id} direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
                <Box sx={{ flex: 1, minWidth: 140 }}>
                  <TextField
                    label={`Room ${idx + 1}`}
                    size="small"
                    fullWidth
                    value={room.label}
                    onChange={(e) => updateRoom(room.id, 'label', e.target.value)}
                  />
                </Box>
                <TextField label="Length (ft)" type="number" size="small" sx={{ width: 140 }} value={room.length} onChange={(e) => updateRoom(room.id, 'length', e.target.value)} onFocus={(e) => e.target.select()} />
                <TextField label="Width (ft)" type="number" size="small" sx={{ width: 140 }} value={room.width} onChange={(e) => updateRoom(room.id, 'width', e.target.value)} onFocus={(e) => e.target.select()} />
                {rooms.length > 1 && (
                  <Button color="error" size="small" startIcon={<DeleteIcon />} onClick={() => removeRoom(room.id)}>Remove</Button>
                )}
              </Stack>
            ))}
            <Button startIcon={<AddIcon />} onClick={addRoom} variant="outlined" sx={{ alignSelf: 'flex-start' }}>Add Room</Button>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField label="Wastage (%)" type="number" fullWidth value={wastage} onChange={(e) => setWastage(e.target.value)} onFocus={(e) => e.target.select()} />
              <TextField label="Price per sq ft ($)" type="number" fullWidth value={price} onChange={(e) => setPrice(e.target.value)} onFocus={(e) => e.target.select()} />
            </Stack>
          </Stack>
        </Paper>

        {result && (
          <Paper variant="outlined" sx={{ p: 3, bgcolor: 'action.hover' }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 2, mb: 2 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">Neat Area</Typography>
                <Typography variant="h6" fontWeight={700}>{result.neatArea.toFixed(1)} sq ft</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">Total with Wastage ({result.wastePct}%)</Typography>
                <Typography variant="h6" fontWeight={700}>{result.withWastage.toFixed(1)} sq ft</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">Carpet Needed</Typography>
                <Typography variant="h5" fontWeight={700}>{result.sqYd.toFixed(1)} sq yd</Typography>
              </Box>
              {result.pricePsf > 0 && (
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">Estimated Cost</Typography>
                  <Typography variant="h5" fontWeight={700} color="primary.main">{currency.format(result.cost)}</Typography>
                </Box>
              )}
            </Box>
          </Paper>
        )}
      </Stack>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CarpetAreaCalculator;
