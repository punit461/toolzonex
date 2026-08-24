'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function parseNumbers(text: string): number[] {
  return text
    .split(/[\s,]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .map(Number)
    .filter((n) => !Number.isNaN(n));
}

const AverageCalculator = () => {
  const [input, setInput] = useState<string>('12, 15, 18, 20, 25');

  const { numbers, sum, mean } = useMemo(() => {
    const numbers = parseNumbers(input);
    const sum = numbers.reduce((acc, n) => acc + n, 0);
    return { numbers, sum, mean: numbers.length > 0 ? sum / numbers.length : 0 };
  }, [input]);

  const content = (
    <>
      <Typography variant="h2">How to Calculate the Average (Mean) of a List of Numbers</Typography>
      <Typography variant="body1">
        The average (arithmetic mean) of a set of numbers is the sum of all the values divided by how many
        values there are. Paste or type your numbers below, separated by commas, spaces, or new lines, and the
        calculator instantly shows the sum, count, and average.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Average = Sum of Values ÷ Count of Values
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        For the numbers 12, 15, 18, 20, and 25: the sum is 90, the count is 5, so the average is 90 ÷ 5 = 18.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Finding the average score across a set of test results or assignments.</li>
          <li>Calculating the average of a list of measurements, prices, or survey ratings.</li>
          <li>Quickly summing and counting a pasted column of numbers from a spreadsheet.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What formats of numbers can I paste in?</Typography>
      <Typography variant="body1">
        Numbers separated by commas, spaces, or line breaks all work — you can paste a column copied straight
        from a spreadsheet, or type values separated by commas. Any text that isn&apos;t a valid number is
        automatically ignored.
      </Typography>
      <Typography variant="h3">How is average different from median?</Typography>
      <Typography variant="body1">
        Average (mean) is the sum of all values divided by the count, so a few very large or very small values
        can pull it up or down significantly. Median is the middle value when the numbers are sorted, and is
        less affected by extreme outliers — use the Median Calculator if you need that instead.
      </Typography>
      <Typography variant="h3">Does the order of the numbers matter?</Typography>
      <Typography variant="body1">
        No — the average only depends on the sum and count of the values, so entering them in any order gives
        exactly the same result.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/average-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Typography gutterBottom>Numbers (comma, space, or line separated)</Typography>
          <TextField
            fullWidth
            multiline
            minRows={6}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. 12, 15, 18, 20, 25"
          />
        </Box>

        <Box>
          <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>Average</Typography>
            <Typography variant="h2" sx={{ fontWeight: 800, color: 'primary.main', mb: 3 }}>
              {mean.toLocaleString(undefined, { maximumFractionDigits: 4 })}
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, width: '100%' }}>
              <Box textAlign="center">
                <Typography variant="body2" color="text.secondary">Sum</Typography>
                <Typography variant="h6">{sum.toLocaleString()}</Typography>
              </Box>
              <Box textAlign="center">
                <Typography variant="body2" color="text.secondary">Count</Typography>
                <Typography variant="h6">{numbers.length}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default AverageCalculator;
