'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) => `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const HotelCostCalculator = () => {
  const [rate, setRate] = useState('150');
  const [nights, setNights] = useState('3');
  const [rooms, setRooms] = useState('1');
  const [taxRate, setTaxRate] = useState('12');
  const [fee, setFee] = useState('25');

  const r = parseFloat(rate);
  const n = parseFloat(nights);
  const rm = parseFloat(rooms);
  const tax = parseFloat(taxRate);
  const f = parseFloat(fee);

  const valid = [r, n, rm, tax, f].every((v) => !isNaN(v)) && r >= 0 && n >= 0 && rm >= 0;

  const subtotal = valid ? r * n * rm : 0;
  const taxAmount = valid ? subtotal * (tax / 100) : 0;
  const feesTotal = valid ? f * n * rm : 0;
  const total = subtotal + taxAmount + feesTotal;

  const content = (
    <>
      <Typography variant="h2">How to Use the Hotel Cost Calculator</Typography>
      <Typography variant="body1">
        Hotel bookings often show only the nightly rate up front, with taxes and mandatory resort or
        service fees added at checkout. Enter the nightly rate, number of nights, number of rooms, your
        area&apos;s tax rate, and any per-night resort or service fee per room to see the true total cost of
        your stay, broken down line by line.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Subtotal = Rate × Nights × Rooms<br />
        Tax = Subtotal × Tax Rate<br />
        Fees = Fee × Nights × Rooms<br />
        Total = Subtotal + Tax + Fees
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A $150/night room booked for 3 nights, 1 room, with a 12% tax rate and a $25/night resort fee: the
        subtotal is $450, tax is $54, and fees total $75 — bringing the grand total to $579, well above the
        advertised $150 nightly rate alone.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Comparing the real total cost of two hotels that advertise different nightly rates and fee structures.</li>
          <li>Budgeting the full cost of a multi-room group or family booking before reserving.</li>
          <li>Understanding how much taxes and resort fees actually add on top of the advertised rate.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What&apos;s the difference between a tax rate and a resort/service fee?</strong> Tax is a percentage set by local government and applied to the room subtotal, while a resort or service fee is a flat charge set by the hotel itself, often per room per night, covering amenities like pools, gyms, or Wi-Fi regardless of whether you use them.</li>
          <li><strong>Why do some hotels not charge a resort fee at all?</strong> Resort fees are more common at hotels with extensive amenities (resorts, larger city hotels) and less common at budget or extended-stay properties. Set the fee field to 0 if your hotel doesn&apos;t charge one.</li>
          <li><strong>Does this include one-time fees like parking or a deposit?</strong> No — this calculator covers recurring per-night charges (rate, tax, and a per-night fee) multiplied across your stay and room count. Add any one-time charges, like a security deposit or a single parking fee, to the total separately.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/hotel-cost-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Stack spacing={3}>
          <TextField
            label="Nightly Rate"
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField label="Number of Nights" type="number" value={nights} onChange={(e) => setNights(e.target.value)} fullWidth />
          <TextField label="Number of Rooms" type="number" value={rooms} onChange={(e) => setRooms(e.target.value)} fullWidth />
          <TextField
            label="Tax Rate"
            type="number"
            value={taxRate}
            onChange={(e) => setTaxRate(e.target.value)}
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
          />
          <TextField
            label="Resort/Service Fee (per room, per night)"
            type="number"
            value={fee}
            onChange={(e) => setFee(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
        </Stack>
        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Cost Breakdown</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Total Cost</Typography>
            <Typography variant="h4" fontWeight="bold">{valid ? money(total) : '—'}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Subtotal (Room Only)</Typography>
            <Typography fontWeight={600}>{valid ? money(subtotal) : '—'}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Tax</Typography>
            <Typography fontWeight={600}>{valid ? money(taxAmount) : '—'}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Resort/Service Fees</Typography>
            <Typography fontWeight={600}>{valid ? money(feesTotal) : '—'}</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default HotelCostCalculator;
