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
  InputAdornment,
} from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Gender = 'female' | 'male';

function tableRecommendation(age: number, gender: Gender): number {
  if (age < 19) return age + 5;
  if (gender === 'male') return age <= 50 ? 38 : 30;
  return age <= 50 ? 25 : 21;
}

const DailyFiberCalculatorContent = () => {
  const [age, setAge] = useState('30');
  const [gender, setGender] = useState<Gender>('female');
  const [calories, setCalories] = useState('');

  const result = useMemo(() => {
    const a = parseFloat(age);
    if (Number.isNaN(a) || a <= 0) return null;
    const recommended = tableRecommendation(a, gender);
    const cal = parseFloat(calories);
    const calorieBased = !Number.isNaN(cal) && cal > 0 ? (cal / 1000) * 14 : null;
    return { recommended, calorieBased };
  }, [age, gender, calories]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Age"
            type="number"
            fullWidth
            value={age}
            onChange={(e) => setAge(e.target.value)}
            onFocus={(e) => e.target.select()}
            slotProps={{ input: { endAdornment: <InputAdornment position="end">years</InputAdornment> } }}
          />
          <FormControl fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select label="Gender" value={gender} onChange={(e) => setGender(e.target.value as Gender)}>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="male">Male</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Daily Calorie Intake (optional)"
            type="number"
            fullWidth
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            onFocus={(e) => e.target.select()}
            helperText="Optional — provides an additional calorie-based estimate"
            slotProps={{ input: { endAdornment: <InputAdornment position="end">kcal</InputAdornment> } }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'action.hover', width: '100%' }}>
            {result ? (
              <>
                <Typography variant="body2" color="text.secondary" gutterBottom>Recommended Daily Fiber</Typography>
                <Typography variant="h2" fontWeight={800} color="primary.main">{result.recommended.toFixed(0)}g</Typography>
                {result.calorieBased !== null && (
                  <Typography variant="body2" color="text.secondary" mt={2}>
                    Calorie-based estimate (14g per 1,000 kcal): {result.calorieBased.toFixed(0)}g
                  </Typography>
                )}
              </>
            ) : (
              <Typography variant="body1" color="text.secondary">Enter a valid age to calculate</Typography>
            )}
          </Paper>
        </Box>
      </Box>

      <Box sx={{ overflowX: 'auto' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Age Group</TableCell>
              <TableCell>Women</TableCell>
              <TableCell>Men</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow><TableCell>1-18 years</TableCell><TableCell colSpan={2}>Age + 5 grams</TableCell></TableRow>
            <TableRow><TableCell>19-50 years</TableCell><TableCell>25g</TableCell><TableCell>38g</TableCell></TableRow>
            <TableRow><TableCell>51+ years</TableCell><TableCell>21g</TableCell><TableCell>30g</TableCell></TableRow>
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

const DailyFiberCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How Much Fiber Do You Need?</Typography>
      <Typography variant="body1">
        Enter your age and gender to get a recommended daily fiber intake based on standard dietary guidelines.
        If you know your typical daily calorie intake, you can also enter it for a second, calorie-based
        estimate using the common guideline of about 14 grams of fiber per 1,000 calories consumed.
      </Typography>

      <Typography variant="h2">Reference Table</Typography>
      <Typography variant="body1">
        The table above shows the general adult and adolescent fiber guidelines used by this calculator.
        Recommendations are slightly lower for adults over 50, reflecting typically lower calorie needs.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 35-year-old woman is recommended 25g of fiber per day. A 60-year-old man is recommended 30g per day.
        If that same man reports eating 2,400 calories a day, the calorie-based estimate would be
        (2,400 ÷ 1,000) × 14 ≈ 34g.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking whether your current diet is meeting general fiber recommendations.</li>
          <li>Planning meals with enough fruits, vegetables, whole grains, and legumes.</li>
          <li>Understanding how fiber needs change with age.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is this personalized medical advice?</Typography>
      <Typography variant="body1">
        No — this calculator provides a general dietary guideline based on age and gender, not personalized
        medical advice. Individual fiber needs vary based on overall diet, digestive health, activity level,
        and other health conditions. Talk to a doctor or registered dietitian for guidance specific to you.
      </Typography>
      <Typography variant="h3">What foods are good sources of fiber?</Typography>
      <Typography variant="body1">
        Whole grains, legumes (beans, lentils), fruits (especially with the skin on), vegetables, nuts, and
        seeds are all good sources of dietary fiber.
      </Typography>
      <Typography variant="h3">Can I eat too much fiber?</Typography>
      <Typography variant="body1">
        Increasing fiber intake very quickly can cause bloating, gas, or digestive discomfort for some people.
        It&apos;s generally recommended to increase fiber gradually and drink plenty of water alongside it.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/health/daily-fiber-calculator" content={content}>
      <DailyFiberCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default DailyFiberCalculator;
