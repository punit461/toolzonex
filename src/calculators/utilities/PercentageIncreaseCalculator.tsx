'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const PercentageIncreaseCalculatorContent = () => {
  const [oldValue, setOldValue] = useState<string>('100');
  const [newValue, setNewValue] = useState<string>('150');

  const oldNum = parseFloat(oldValue) || 0;
  const newNum = parseFloat(newValue) || 0;

  const diff = newNum - oldNum;
  const percentageChange = oldNum !== 0 ? ((diff) / Math.abs(oldNum)) * 100 : 0;
  const isIncrease = diff >= 0;

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Original Value"
          type="number"
          value={oldValue}
          onChange={(e) => setOldValue(e.target.value)}
          fullWidth
        />
        <TextField
          label="New Value"
          type="number"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          fullWidth
        />

        <Paper variant="outlined" sx={{ p: 2, bgcolor: 'action.hover' }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
            ((New − Old) / |Old|) × 100
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace', mt: 0.5 }}>
            (({newNum} − {oldNum}) / {Math.abs(oldNum)}) × 100 = {percentageChange.toFixed(2)}%
          </Typography>
        </Paper>
      </Box>

      <Box>
        <Paper
          sx={{
            p: 4,
            bgcolor: 'primary.main',
            color: 'white',
            borderRadius: 4,
            minHeight: 200,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h3" fontWeight="bold">
            {Math.abs(percentageChange).toFixed(2)}%
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            {isIncrease ? 'Increase' : 'Decrease'}
          </Typography>
        </Paper>

        <Paper variant="outlined" sx={{ mt: 3, p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Original Value</Typography>
            <Typography variant="body2" fontWeight="bold">{oldNum}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">New Value</Typography>
            <Typography variant="body2" fontWeight="bold">{newNum}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">Absolute Difference</Typography>
            <Typography variant="body2" fontWeight="bold">{diff.toFixed(4)}</Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

const PercentageIncreaseCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How Does the Percentage Increase Calculator Work?</Typography>
      <Typography variant="body1">
        Enter the original value and the new value. The calculator computes the percentage change using the
        formula: ((New − Old) / |Old|) × 100. A positive result indicates an increase, while a negative
        result indicates a decrease.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        If a price goes from $100 to $150, the percentage increase is ((150 − 100) / 100) × 100 = 50%. If a
        price drops from $200 to $150, the percentage decrease is ((150 − 200) / 200) × 100 = −25%.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Calculating price increases or discounts.</li>
          <li>Measuring growth in revenue, sales, or population.</li>
          <li>Tracking changes in test scores or performance metrics.</li>
          <li>Comparing year-over-year percentage changes in data.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What if the original value is zero?</Typography>
      <Typography variant="body1">
        Division by zero is undefined. If the original value is zero, the percentage change cannot be
        calculated meaningfully — any change from zero is technically infinite.
      </Typography>
      <Typography variant="h3">What is the difference between percentage change and percentage points?</Typography>
      <Typography variant="body1">
        Percentage change measures relative change (e.g., from 4% to 6% is a 50% increase). Percentage points
        measure the absolute difference (e.g., from 4% to 6% is a 2 percentage point increase).
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/percentage-increase-calculator" content={content}>
      <PercentageIncreaseCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PercentageIncreaseCalculator;
