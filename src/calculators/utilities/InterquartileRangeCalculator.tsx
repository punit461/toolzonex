'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function median(arr: number[]): number {
  const n = arr.length;
  if (n === 0) return 0;
  const mid = Math.floor(n / 2);
  return n % 2 === 0 ? (arr[mid - 1] + arr[mid]) / 2 : arr[mid];
}

const InterquartileRangeCalculator = () => {
  const [input, setInput] = useState('7, 15, 36, 39, 40, 41, 42, 43, 47, 49');

  const result = useMemo(() => {
    const nums = input
      .split(/[\n,]+/)
      .map((s) => parseFloat(s.trim()))
      .filter((n) => !isNaN(n))
      .sort((a, b) => a - b);

    if (nums.length < 4) return { valid: false, q1: 0, q3: 0, iqr: 0, outliers: [] as number[], nums };

    const n = nums.length;
    const mid = Math.floor(n / 2);
    const lowerHalf = n % 2 === 0 ? nums.slice(0, mid) : nums.slice(0, mid);
    const upperHalf = n % 2 === 0 ? nums.slice(mid) : nums.slice(mid + 1);

    const q1 = median(lowerHalf);
    const q3 = median(upperHalf);
    const iqr = q3 - q1;

    const lowerFence = q1 - 1.5 * iqr;
    const upperFence = q3 + 1.5 * iqr;
    const outliers = nums.filter((x) => x < lowerFence || x > upperFence);

    return { valid: true, q1, q3, iqr, outliers, nums };
  }, [input]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Interquartile Range Calculator</Typography>
      <Typography variant="body1">
        Enter a list of numbers separated by commas or new lines. The calculator sorts the data, splits it
        into a lower half and an upper half around the median, then finds the median of each half — the first
        quartile (Q1) and third quartile (Q3). The interquartile range (IQR) is the spread between them, and
        it&apos;s also used to flag statistical outliers using the standard 1.5×IQR rule.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        IQR = Q3 − Q1
        <br />
        Outlier if value &lt; Q1 − 1.5×IQR or value &gt; Q3 + 1.5×IQR
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        For the data set 7, 15, 36, 39, 40, 41, 42, 43, 47, 49 (already sorted), the lower half is
        7, 15, 36, 39, 40 (Q1 = 36) and the upper half is 41, 42, 43, 47, 49 (Q3 = 43), giving an IQR of
        43 − 36 = 7. The lower fence is 36 − 1.5×7 = 25.5, so 7 and 15 are flagged as outliers.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Identifying outliers in a data set before further statistical analysis.</li>
          <li>Measuring the spread of the middle 50% of data, which is less sensitive to extreme values than the full range.</li>
          <li>Building box plots or summarizing data distributions for a report.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is Q1 and Q3 calculated here?</strong> This calculator uses the common exclusive method: sort the data, split it into a lower half and upper half around the median (excluding the median itself when the count is odd), then Q1 is the median of the lower half and Q3 is the median of the upper half. Other methods (like linear interpolation) can give slightly different results for the same data.</li>
          <li><strong>Why 1.5×IQR for flagging outliers?</strong> It&apos;s a widely used statistical convention (originating with box plots) that flags values falling far enough outside the middle 50% of the data to be considered unusual, without being so strict that normal variation gets flagged.</li>
          <li><strong>What&apos;s the minimum data set size this works with?</strong> You need at least 4 numbers to get a meaningful Q1/Q3 split — with fewer values, quartiles aren&apos;t well-defined and the calculator won&apos;t produce a result.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/interquartile-range-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box>
          <TextField
            label="Data Set (comma or newline separated)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            fullWidth
            multiline
            minRows={5}
          />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
          {result.valid ? (
            <>
              <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
                <Typography variant="body2">Interquartile Range (IQR)</Typography>
                <Typography variant="h3" fontWeight="bold">{result.iqr.toFixed(2)}</Typography>
              </Paper>
              <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Q1 (25th percentile)</Typography>
                <Typography fontWeight={600}>{result.q1.toFixed(2)}</Typography>
              </Paper>
              <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Q3 (75th percentile)</Typography>
                <Typography fontWeight={600}>{result.q3.toFixed(2)}</Typography>
              </Paper>
              <Paper sx={{ p: 2 }}>
                <Typography fontWeight={600} gutterBottom>Outliers (1.5×IQR rule)</Typography>
                <Typography variant="body2">
                  {result.outliers.length > 0 ? result.outliers.join(', ') : 'None detected'}
                </Typography>
              </Paper>
            </>
          ) : (
            <Typography color="text.secondary">Enter at least 4 numeric values to calculate the IQR.</Typography>
          )}
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default InterquartileRangeCalculator;
