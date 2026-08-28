'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const PercentageDecreaseCalculatorContent = () => {
  const [originalValue, setOriginalValue] = useState<string>('200');
  const [decreasedValue, setDecreasedValue] = useState<string>('150');

  const originalNum = parseFloat(originalValue) || 0;
  const newNum = parseFloat(decreasedValue) || 0;

  const amountDecreased = originalNum - newNum;
  const percentageDecrease = originalNum !== 0 ? (amountDecreased / Math.abs(originalNum)) * 100 : 0;
  const isIncrease = newNum > originalNum;
  const ratio = originalNum !== 0 ? newNum / originalNum : 0;

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Original Value"
          type="number"
          value={originalValue}
          onChange={(e) => setOriginalValue(e.target.value)}
          fullWidth
        />
        <TextField
          label="Decreased Value"
          type="number"
          value={decreasedValue}
          onChange={(e) => setDecreasedValue(e.target.value)}
          fullWidth
        />

        <Paper variant="outlined" sx={{ p: 2, bgcolor: 'action.hover' }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
            ((Original − New) / |Original|) × 100
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace', mt: 0.5 }}>
            (({originalNum} − {newNum}) / {Math.abs(originalNum)}) × 100 = {Math.abs(percentageDecrease).toFixed(2)}%
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
            {Math.abs(percentageDecrease).toFixed(2)}%
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            {isIncrease ? 'Increase' : 'Decrease'}
          </Typography>
          {isIncrease && (
            <Typography variant="body2" sx={{ opacity: 0.9, mt: 1, textAlign: 'center' }}>
              The decreased value is higher than the original — this is an increase of{' '}
              {Math.abs(percentageDecrease).toFixed(2)}%, not a decrease.
            </Typography>
          )}
        </Paper>

        <Paper variant="outlined" sx={{ mt: 3, p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Original Value</Typography>
            <Typography variant="body2" fontWeight="bold">{originalNum}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Decreased Value</Typography>
            <Typography variant="body2" fontWeight="bold">{newNum}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Amount Decreased</Typography>
            <Typography variant="body2" fontWeight="bold">{amountDecreased.toFixed(4)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">New / Original Ratio</Typography>
            <Typography variant="body2" fontWeight="bold">{ratio.toFixed(4)}</Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

const PercentageDecreaseCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How Does the Percentage Decrease Calculator Work?</Typography>
      <Typography variant="body1">
        Enter the original value and the decreased value. The calculator finds the amount decreased and
        computes the percentage using the formula: ((Original − New) / |Original|) × 100. The result is
        always shown as a positive percentage, and the new/original ratio shows how much of the original
        value remains.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        If a price drops from $200 to $150, the percentage decrease is ((200 − 150) / 200) × 100 = 25%,
        and the new/original ratio is 150 / 200 = 0.75. If the new value ends up higher than the original,
        the tool flags it as an increase instead of a decrease.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Calculating the size of discounts and markdowns.</li>
          <li>Measuring reductions in costs, expenses, or inventory.</li>
          <li>Tracking decreases in website traffic, sales, or engagement.</li>
          <li>Reporting weight loss, grade drops, or other decline metrics.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What if the new value is greater than the original value?</Typography>
      <Typography variant="body1">
        Then it is an increase, not a decrease. The calculator still shows the percentage (positive) and
        labels it as an increase, so no negative numbers appear.
      </Typography>
      <Typography variant="h3">What if the original value is zero?</Typography>
      <Typography variant="body1">
        Division by zero is undefined. If the original value is zero, a percentage cannot be calculated
        meaningfully because any change from zero is technically infinite.
      </Typography>
      <Typography variant="h3">What does the new/original ratio mean?</Typography>
      <Typography variant="body1">
        The ratio tells you what fraction of the original value remains. A ratio of 0.75 means the new
        value is 75% of the original, which corresponds to a 25% decrease.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/percentage-decrease-calculator" content={content}>
      <PercentageDecreaseCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PercentageDecreaseCalculator;