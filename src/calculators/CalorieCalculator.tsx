'use client';

import { useState } from 'react';
import { Box, Typography, Button, Paper, TextField, ToggleButton, ToggleButtonGroup, FormControl, InputLabel, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const CalorieCalculatorContent = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number>(30);
  const [weight, setWeight] = useState<number>(75);
  const [height, setHeight] = useState<number>(175);
  const [activity, setActivity] = useState<number>(1.2);
  
  const [calories, setCalories] = useState<{ maintain: number, mildWeightLoss: number, weightLoss: number, extremeWeightLoss: number, weightGain: number } | null>(null);

  const calculateCalories = () => {
    // Mifflin-St Jeor Equation
    let bmr = 10 * weight + 6.25 * height - 5 * age;
    bmr += gender === 'male' ? 5 : -161;

    const maintain = Math.round(bmr * activity);
    
    setCalories({
      maintain,
      mildWeightLoss: Math.round(maintain * 0.9), // ~ -250 kcal/day (0.25 kg/week)
      weightLoss: Math.round(maintain * 0.8),     // ~ -500 kcal/day (0.5 kg/week)
      extremeWeightLoss: Math.round(maintain * 0.6), // ~ -1000 kcal/day (1 kg/week)
      weightGain: Math.round(maintain * 1.2)      // ~ +500 kcal/day
    });
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      
      {/* Input Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        
        <ToggleButtonGroup
          color="primary"
          value={gender}
          exclusive
          onChange={(e, val) => val && setGender(val)}
          fullWidth
        >
          <ToggleButton value="male">Male</ToggleButton>
          <ToggleButton value="female">Female</ToggleButton>
        </ToggleButtonGroup>

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <TextField 
            label="Age" 
            type="number" 
            value={age || ''} 
            onChange={(e) => setAge(Number(e.target.value))} 
            fullWidth 
          />
          <TextField 
            label="Height (cm)" 
            type="number" 
            value={height || ''} 
            onChange={(e) => setHeight(Number(e.target.value))} 
            fullWidth 
          />
        </Box>

        <TextField 
          label="Weight (kg)" 
          type="number" 
          value={weight || ''} 
          onChange={(e) => setWeight(Number(e.target.value))} 
          fullWidth 
        />

        <FormControl fullWidth>
          <InputLabel>Activity Level</InputLabel>
          <Select value={activity} label="Activity Level" onChange={(e) => setActivity(Number(e.target.value))}>
            <MenuItem value={1.2}>Sedentary (little to no exercise)</MenuItem>
            <MenuItem value={1.375}>Lightly active (light exercise 1-3 days/week)</MenuItem>
            <MenuItem value={1.55}>Moderately active (moderate exercise 3-5 days/week)</MenuItem>
            <MenuItem value={1.725}>Very active (hard exercise 6-7 days/week)</MenuItem>
            <MenuItem value={1.9}>Extra active (very hard exercise/physical job)</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" size="large" onClick={calculateCalories} fullWidth>
          Calculate Calories
        </Button>
      </Box>

      {/* Output Panel */}
      <Box>
        {calories ? (
          <Paper variant="outlined" sx={{ overflow: 'hidden' }}>
            <Box sx={{ p: 3, bgcolor: 'primary.main', color: 'white', textAlign: 'center' }}>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>Maintenance Calories</Typography>
              <Typography variant="h2" sx={{ fontWeight: 800 }}>{calories.maintain}</Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>Calories/day to maintain weight</Typography>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: 'grey.100' }}>
                    <TableCell><strong>Goal</strong></TableCell>
                    <TableCell align="right"><strong>Calories / Day</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Mild Weight Loss (0.25 kg/week)</TableCell>
                    <TableCell align="right">{calories.mildWeightLoss}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Weight Loss (0.5 kg/week)</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold', color: 'success.main' }}>{calories.weightLoss}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Extreme Weight Loss (1 kg/week)</TableCell>
                    <TableCell align="right" sx={{ color: 'error.main' }}>{calories.extremeWeightLoss}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Weight Gain (0.5 kg/week)</TableCell>
                    <TableCell align="right">{calories.weightGain}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        ) : (
          <Paper variant="outlined" sx={{ p: 4, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.50' }}>
            <Typography color="text.secondary" align="center">
              Enter your details and click Calculate to see your daily calorie targets for weight loss, maintenance, or muscle gain.
            </Typography>
          </Paper>
        )}
      </Box>

    </Box>
  );
};

const CalorieCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">Free Calorie Calculator</Typography>
      <Typography variant="body1">
        Find out exactly how many calories you need to eat per day to maintain your weight, lose fat, or gain muscle. This calculator uses the highly accurate Mifflin-St Jeor equation to estimate your Basal Metabolic Rate (BMR) and factors in your activity level.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Enter your age, gender, height, and weight.</li>
          <li>Select your activity level, from sedentary to very active.</li>
          <li>Choose a goal — maintain, lose, or gain weight — to see your target daily calories.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A moderately active 28-year-old man, 180cm and 80kg, might need roughly 2,700 calories/day to maintain
        weight, or around 2,200 to lose about 1lb per week.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Setting a daily calorie target for weight loss, maintenance, or muscle gain.</li>
          <li>Planning meals or tracking food intake against a personalized goal.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How many calories should I cut to lose weight?</Typography>
      <Typography variant="body1">
        A deficit of about 500 calories/day from your maintenance level typically leads to roughly 1lb of weight
        loss per week — a commonly recommended, sustainable pace.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Calorie Calculator"
      description="Calculate your daily calorie needs for weight loss, maintenance, or muscle gain using the accurate Mifflin-St Jeor equation."
      url="/health/calorie-calculator"
      content={content}
      category="Health"
    >
      <CalorieCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CalorieCalculator;
