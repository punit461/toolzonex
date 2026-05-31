'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper } from '@mui/material';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const RuleOfThreeContent = () => {
  const [a, setA] = useState<string>('10');
  const [b, setB] = useState<string>('20');
  const [c, setC] = useState<string>('30');
  const [x, setX] = useState<string>('60'); // x = (b * c) / a

  const handleAChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setA(val);
    const numA = parseFloat(val);
    const numB = parseFloat(b);
    const numC = parseFloat(c);
    if (!isNaN(numA) && numA !== 0 && !isNaN(numB) && !isNaN(numC)) {
      setX(((numB * numC) / numA).toFixed(4).replace(/\.?0+$/, ''));
    }
  };

  const handleBChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setB(val);
    const numA = parseFloat(a);
    const numB = parseFloat(val);
    const numC = parseFloat(c);
    if (!isNaN(numA) && numA !== 0 && !isNaN(numB) && !isNaN(numC)) {
      setX(((numB * numC) / numA).toFixed(4).replace(/\.?0+$/, ''));
    }
  };

  const handleCChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setC(val);
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    const numC = parseFloat(val);
    if (!isNaN(numA) && numA !== 0 && !isNaN(numB) && !isNaN(numC)) {
      setX(((numB * numC) / numA).toFixed(4).replace(/\.?0+$/, ''));
    }
  };

  // If X is edited, we could calculate C, but standard Rule of 3 usually calculates X.
  // We'll let X calculate C if modified.
  const handleXChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setX(val);
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    const numX = parseFloat(val);
    if (!isNaN(numA) && !isNaN(numB) && numB !== 0 && !isNaN(numX)) {
      setC(((numA * numX) / numB).toFixed(4).replace(/\.?0+$/, ''));
    }
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr' }, gap: 4 }}>
      
      <Box sx={{ maxWidth: 600, mx: 'auto', width: '100%' }}>
        <Paper sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 4, border: '1px solid', borderColor: 'divider' }}>
          
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
            <TextField label="Value A" type="number" value={a} onChange={handleAChange} sx={{ flex: 1 }} />
            <Typography variant="h5">is to</Typography>
            <TextField label="Value B" type="number" value={b} onChange={handleBChange} sx={{ flex: 1 }} />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6" color="text.secondary">As</Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
            <TextField label="Value C" type="number" value={c} onChange={handleCChange} sx={{ flex: 1 }} />
            <Typography variant="h5">is to</Typography>
            <TextField label="Result (X)" type="number" value={x} onChange={handleXChange} sx={{ flex: 1 }} color="success" focused />
          </Box>

        </Paper>

        <Box mt={4} p={3} bgcolor="background.default" borderRadius={2} border="1px dashed #ccc">
          <Typography variant="subtitle1" fontWeight="600" mb={1}>Formula Applied:</Typography>
          <Typography variant="body1" fontFamily="monospace" fontSize="1.1rem">
            X = (B × C) ÷ A
          </Typography>
          <Typography variant="body1" fontFamily="monospace" fontSize="1.1rem" mt={1} color="success.main">
            X = ({b || 0} × {c || 0}) ÷ {a || 0} = {x || 0}
          </Typography>
        </Box>
      </Box>

    </Box>
  );
};

const RuleOfThreeCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">What is the Rule of Three?</Typography>
      <Typography variant="body1">
        The Rule of Three is a mathematical method for finding a fourth, unknown value when three values are known and they are proportional. It is widely used for solving problems related to percentages, ratios, scaling recipes, and currency conversion.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Rule of Three Calculator"
      description="Solve proportions instantly with our Rule of Three calculator. Enter three values to find the fourth unknown value."
      url="/utilities/rule-of-three-calculator"
      content={content}
      category="Utilities"
    >
      <RuleOfThreeContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RuleOfThreeCalculator;
