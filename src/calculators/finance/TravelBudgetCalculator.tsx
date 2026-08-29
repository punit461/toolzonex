'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) =>
  `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const TravelBudgetCalculatorContent = () => {
  const [days, setDays] = useState('7');
  const [lodging, setLodging] = useState('120');
  const [food, setFood] = useState('50');
  const [transport, setTransport] = useState('25');
  const [activities, setActivities] = useState('40');

  const result = useMemo(() => {
    const d = parseFloat(days) || 0;
    const perDay = {
      lodging: parseFloat(lodging) || 0,
      food: parseFloat(food) || 0,
      transport: parseFloat(transport) || 0,
      activities: parseFloat(activities) || 0,
    };
    const perDayTotal = perDay.lodging + perDay.food + perDay.transport + perDay.activities;
    const totals = {
      lodging: perDay.lodging * d,
      food: perDay.food * d,
      transport: perDay.transport * d,
      activities: perDay.activities * d,
    };
    const grandTotal = perDayTotal * d;
    return { perDayTotal, totals, grandTotal };
  }, [days, lodging, food, transport, activities]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Trip Duration"
          type="number"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          fullWidth
          slotProps={{ input: { endAdornment: <InputAdornment position="end">days</InputAdornment> } }}
        />
        <Typography variant="subtitle1" fontWeight={600}>Per-Day Costs</Typography>
        <TextField
          label="Lodging"
          type="number"
          value={lodging}
          onChange={(e) => setLodging(e.target.value)}
          fullWidth
          slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment>, endAdornment: <InputAdornment position="end">/ day</InputAdornment> } }}
        />
        <TextField
          label="Food"
          type="number"
          value={food}
          onChange={(e) => setFood(e.target.value)}
          fullWidth
          slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment>, endAdornment: <InputAdornment position="end">/ day</InputAdornment> } }}
        />
        <TextField
          label="Transport"
          type="number"
          value={transport}
          onChange={(e) => setTransport(e.target.value)}
          fullWidth
          slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment>, endAdornment: <InputAdornment position="end">/ day</InputAdornment> } }}
        />
        <TextField
          label="Activities"
          type="number"
          value={activities}
          onChange={(e) => setActivities(e.target.value)}
          fullWidth
          slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment>, endAdornment: <InputAdornment position="end">/ day</InputAdornment> } }}
        />
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
        <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="body2">Total Trip Budget</Typography>
          <Typography variant="h3" fontWeight="bold">{money(result.grandTotal)}</Typography>
        </Paper>
        <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Lodging Total</Typography>
          <Typography fontWeight={600}>{money(result.totals.lodging)}</Typography>
        </Paper>
        <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Food Total</Typography>
          <Typography fontWeight={600}>{money(result.totals.food)}</Typography>
        </Paper>
        <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Transport Total</Typography>
          <Typography fontWeight={600}>{money(result.totals.transport)}</Typography>
        </Paper>
        <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Activities Total</Typography>
          <Typography fontWeight={600}>{money(result.totals.activities)}</Typography>
        </Paper>
        <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Cost Per Day</Typography>
          <Typography fontWeight={600}>{money(result.perDayTotal)}</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

const TravelBudgetCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How Does the Travel Budget Calculator Work?</Typography>
      <Typography variant="body1">
        Enter how many days your trip will last, then estimate what you&apos;ll spend per day in four
        categories: lodging, food, transport, and activities. The calculator multiplies each per-day
        amount by the trip duration to get a category total, adds all four together for the grand
        total, and also shows your combined cost per day across every category.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 7-day trip budgeting $120/day for lodging, $50/day for food, $25/day for transport, and
        $40/day for activities comes to a combined $235 per day, or $1,645 for the full trip.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Setting a savings target before booking a vacation.</li>
          <li>Comparing the cost of a longer trip at a cheaper destination versus a shorter trip at a pricier one.</li>
          <li>Deciding which category to trim when a trip is running over budget.</li>
          <li>Planning per-day spending money to bring or load onto a travel card.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Should I include flights in this budget?</Typography>
      <Typography variant="body1">
        This calculator focuses on per-day, on-the-ground costs. Flights, visas, and travel insurance
        are typically one-time costs that don&apos;t scale with trip length, so add them separately to
        the total this calculator gives you.
      </Typography>
      <Typography variant="h3">How do I budget for a trip with very different costs by city?</Typography>
      <Typography variant="body1">
        Run the calculator once per city or leg of the trip using that city&apos;s per-day estimates and
        number of days there, then add the totals together for the full itinerary.
      </Typography>
      <Typography variant="h3">What if my per-day spending isn&apos;t consistent every day?</Typography>
      <Typography variant="body1">
        Use an average per-day figure across the whole trip — a splurge day and a cheap day should
        roughly balance out. For very uneven trips (like a few nights in an expensive city followed by
        many budget days elsewhere), it&apos;s more accurate to calculate each portion separately.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/travel-budget-calculator" content={content}>
      <TravelBudgetCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TravelBudgetCalculator;
