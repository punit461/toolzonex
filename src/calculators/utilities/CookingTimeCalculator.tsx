'use client';

import { useMemo, useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface FoodGuide {
  id: string;
  label: string;
  method: string;
  usesWeight: boolean;
  guideline: string;
  compute: (weightLb: number) => { min: number; max: number };
}

const FOOD_GUIDE: FoodGuide[] = [
  { id: 'chicken-breast', label: 'Chicken Breast', method: 'Oven, 375°F (190°C)', usesWeight: false, guideline: '20-30 min total', compute: () => ({ min: 20, max: 30 }) },
  { id: 'whole-chicken', label: 'Whole Chicken', method: 'Oven, 350°F (175°C)', usesWeight: true, guideline: '~18-22 min per lb, plus 10-15 min', compute: (w) => ({ min: w * 18 + 10, max: w * 22 + 15 }) },
  { id: 'roast-beef', label: 'Roast Beef', method: 'Oven, 350°F (175°C)', usesWeight: true, guideline: '~18-22 min per lb', compute: (w) => ({ min: w * 18, max: w * 22 }) },
  { id: 'turkey', label: 'Whole Turkey (unstuffed)', method: 'Oven, 325°F (165°C)', usesWeight: true, guideline: '~12-15 min per lb', compute: (w) => ({ min: w * 12, max: w * 15 }) },
  { id: 'baked-potato', label: 'Baked Potato', method: 'Oven, 425°F (220°C)', usesWeight: true, guideline: '40-55 min for 0.5 lb, +25 min per extra lb', compute: (w) => ({ min: 40 + (w - 0.5) * 25, max: 55 + (w - 0.5) * 25 }) },
  { id: 'rice', label: 'White Rice', method: 'Stovetop, boiled/simmered', usesWeight: false, guideline: '15-20 min total', compute: () => ({ min: 15, max: 20 }) },
  { id: 'pasta', label: 'Pasta', method: 'Stovetop, boiled', usesWeight: false, guideline: '8-12 min total', compute: () => ({ min: 8, max: 12 }) },
  { id: 'hard-boiled-egg', label: 'Hard-Boiled Egg', method: 'Stovetop, boiled', usesWeight: false, guideline: '9-12 min total', compute: () => ({ min: 9, max: 12 }) },
];

const CookingTimeCalculatorContent = () => {
  const [foodId, setFoodId] = useState('chicken-breast');
  const [weight, setWeight] = useState('1.5');

  const food = FOOD_GUIDE.find((f) => f.id === foodId) ?? FOOD_GUIDE[0];

  const result = useMemo(() => {
    const w = parseFloat(weight) || 0;
    if (food.usesWeight && w <= 0) return null;
    const { min, max } = food.compute(w);
    return { min: Math.max(0, min), max: Math.max(0, max) };
  }, [food, weight]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Food</InputLabel>
            <Select label="Food" value={foodId} onChange={(e) => setFoodId(e.target.value)}>
              {FOOD_GUIDE.map((f) => (
                <MenuItem key={f.id} value={f.id}>{f.label}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {food.usesWeight && (
            <TextField
              label="Weight"
              type="number"
              fullWidth
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              onFocus={(e) => e.target.select()}
              helperText="Enter weight in pounds (lb)"
            />
          )}

          <TextField label="Cooking Method" value={food.method} fullWidth disabled />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'action.hover', width: '100%' }}>
            {result ? (
              <>
                <Typography variant="body2" color="text.secondary" gutterBottom>Estimated Cooking Time</Typography>
                <Typography variant="h2" fontWeight={800} color="primary.main">
                  {Math.round(result.min)}–{Math.round(result.max)} min
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={2}>{food.method}</Typography>
              </>
            ) : (
              <Typography variant="body1" color="text.secondary">Enter a positive weight to calculate</Typography>
            )}
          </Paper>
        </Box>
      </Box>

      <Box sx={{ overflowX: 'auto' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Food</TableCell>
              <TableCell>Method</TableCell>
              <TableCell>Guideline</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {FOOD_GUIDE.map((f) => (
              <TableRow key={f.id}>
                <TableCell>{f.label}</TableCell>
                <TableCell>{f.method}</TableCell>
                <TableCell>{f.guideline}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

const CookingTimeCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How This Calculator Works</Typography>
      <Typography variant="body1">
        Pick a food type from the list, and for meats and other weight-dependent foods, enter the weight in
        pounds. The calculator applies standard reference cooking-time guidelines (based on common recipe and
        food-safety charts) for that food and method to estimate a time range.
      </Typography>

      <Typography variant="h2">Reference Cooking Time Guide</Typography>
      <Typography variant="body1">
        The table above shows the general guideline used for each food type. These are starting points, not
        guarantees — see the FAQ below for why actual results vary.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 4 lb whole chicken roasted at 350°F takes roughly 82-98 minutes (about 18-22 minutes per pound, plus
        a base allowance), while a single baked potato in a 425°F oven takes about 40-55 minutes regardless of
        exact weight for typical sizes.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Planning meal timing when cooking multiple dishes for dinner.</li>
          <li>Getting a starting-point cook time for an unfamiliar cut of meat.</li>
          <li>Working backward from a serving time to figure out when to start cooking.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why might my actual cooking time be different?</Typography>
      <Typography variant="body1">
        Actual cooking time varies by your exact oven or appliance (ovens can run hot or cold by 25°F or more),
        the starting temperature of the food (refrigerated vs. room temperature), the shape and thickness of
        the item, whether it&apos;s stuffed, and altitude. Treat these numbers as a planning estimate, not a
        guarantee.
      </Typography>
      <Typography variant="h3">How do I know meat and poultry are actually done?</Typography>
      <Typography variant="body1">
        Always use a food thermometer to confirm doneness for meat and poultry — don&apos;t rely on time alone
        for food safety. Common safe minimum internal temperatures are 165°F for poultry, 145°F for whole cuts
        of beef/pork (with a rest time), and 160°F for ground meats. Check your local food safety guidelines
        for the most current recommendations.
      </Typography>
      <Typography variant="h3">Does this account for resting time after cooking?</Typography>
      <Typography variant="body1">
        No — the estimates above are active cooking time only. Many meats (especially roasts and whole
        poultry) benefit from resting 10-20 minutes after cooking before carving, which isn&apos;t included in
        these numbers.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/cooking-time-calculator" content={content}>
      <CookingTimeCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CookingTimeCalculator;
