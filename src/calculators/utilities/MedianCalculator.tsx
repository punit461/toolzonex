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

const MedianCalculator = () => {
  const [input, setInput] = useState<string>('7, 12, 3, 9, 15, 5');

  const { sorted, median, count } = useMemo(() => {
    const numbers = parseNumbers(input);
    const sorted = [...numbers].sort((a, b) => a - b);
    const n = sorted.length;
    let median = 0;
    if (n > 0) {
      const mid = Math.floor(n / 2);
      median = n % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
    }
    return { sorted, median, count: n };
  }, [input]);

  const content = (
    <>
      <Typography variant="h2">How to Calculate the Median of a List of Numbers</Typography>
      <Typography variant="body1">
        The median is the middle value of a list of numbers once they&apos;re sorted from smallest to largest.
        If there&apos;s an odd count, the median is the single middle number. If there&apos;s an even count, it&apos;s
        the average of the two middle numbers. Paste or type your numbers below to find the median instantly.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        For 7, 12, 3, 9, 15, 5 — sorted, this becomes 3, 5, 7, 9, 12, 15. With 6 values (an even count), the
        median is the average of the two middle numbers, 7 and 9, giving (7 + 9) ÷ 2 = 8.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Finding a &quot;typical&quot; value in a data set that has some extreme outliers, like house prices or salaries.</li>
          <li>Comparing the median to the average (mean) to check how skewed a data set is.</li>
          <li>Analyzing survey results, test scores, or measurement data for statistics homework.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why use median instead of average?</Typography>
      <Typography variant="body1">
        Median is less sensitive to extreme outliers than average (mean). For example, in a list of salaries
        where one person earns far more than everyone else, the average gets pulled upward, while the median
        stays representative of what a &quot;typical&quot; person earns.
      </Typography>
      <Typography variant="h3">How is the median calculated for an even number of values?</Typography>
      <Typography variant="body1">
        When there&apos;s an even count of numbers, there is no single middle value, so the median is the
        average of the two values closest to the middle of the sorted list.
      </Typography>
      <Typography variant="h3">Does the order I type the numbers in matter?</Typography>
      <Typography variant="body1">
        No — the calculator automatically sorts your numbers before finding the median, so you can enter them in
        any order and get the same result. The sorted list is shown below the result for reference.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/median-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Typography gutterBottom>Numbers (comma, space, or line separated)</Typography>
          <TextField
            fullWidth
            multiline
            minRows={6}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. 7, 12, 3, 9, 15, 5"
          />
        </Box>

        <Box>
          <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>Median</Typography>
            <Typography variant="h2" sx={{ fontWeight: 800, color: 'primary.main', mb: 3 }}>
              {median.toLocaleString(undefined, { maximumFractionDigits: 4 })}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {count} value{count === 1 ? '' : 's'}
            </Typography>
            {sorted.length > 0 && (
              <Typography variant="body2" sx={{ mt: 1, wordBreak: 'break-word', textAlign: 'center' }}>
                Sorted: {sorted.join(', ')}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default MedianCalculator;
