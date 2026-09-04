'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Button, IconButton, Stack, Paper, InputAdornment } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface Period {
  id: string;
  label: string;
  revenue: string;
}

let nextId = 5;

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

const RevenueGrowthCalculator = () => {
  const [periods, setPeriods] = useState<Period[]>([
    { id: '1', label: 'Q1', revenue: '100000' },
    { id: '2', label: 'Q2', revenue: '112000' },
    { id: '3', label: 'Q3', revenue: '121000' },
    { id: '4', label: 'Q4', revenue: '135000' },
  ]);

  const addPeriod = () => setPeriods([...periods, { id: String(nextId++), label: `Period ${periods.length + 1}`, revenue: '' }]);
  const removePeriod = (id: string) => setPeriods(periods.filter((p) => p.id !== id));
  const updatePeriod = (id: string, field: 'label' | 'revenue', val: string) => {
    setPeriods(periods.map((p) => (p.id === id ? { ...p, [field]: val } : p)));
  };

  const rows = useMemo(() => {
    return periods.map((p, i) => {
      const revenue = parseFloat(p.revenue) || 0;
      if (i === 0) return { ...p, revenue, growth: null as number | null };
      const prevRevenue = parseFloat(periods[i - 1].revenue) || 0;
      const growth = prevRevenue > 0 ? ((revenue - prevRevenue) / prevRevenue) * 100 : null;
      return { ...p, revenue, growth };
    });
  }, [periods]);

  const latestGrowth = rows.length > 0 ? rows[rows.length - 1].growth : null;

  const content = (
    <>
      <Typography variant="h2">How Revenue Growth Is Calculated</Typography>
      <Typography variant="body1">
        Add each period&apos;s revenue in order — months, quarters, or years — and this calculator computes the
        period-over-period growth rate between every consecutive pair, so you can see the full growth trend
        across as many periods as you enter, not just a single before-and-after comparison.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Revenue Growth (%) = ((Current Period − Previous Period) ÷ Previous Period) × 100
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Revenue of $100,000 in Q1 growing to $112,000 in Q2 is (112,000 − 100,000) ÷ 100,000 × 100 = 12% growth.
        If Q3 comes in at $121,000, growth over Q2 is (121,000 − 112,000) ÷ 112,000 × 100 ≈ 8.04% — showing the
        growth rate slowing even though revenue is still rising.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Tracking quarter-over-quarter or year-over-year revenue growth for a business.</li>
          <li>Spotting whether growth is accelerating or slowing across several consecutive periods.</li>
          <li>Preparing growth figures for investor updates or board reporting.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What&apos;s considered good revenue growth?</Typography>
      <Typography variant="body1">
        It varies enormously by company stage and industry — early-stage startups often target 10-20%
        month-over-month growth, while mature public companies may see healthy growth in the single digits
        annually. Compare against your own historical trend and industry peers rather than a universal
        benchmark.
      </Typography>
      <Typography variant="h3">Should I compare the same period year-over-year instead of sequentially?</Typography>
      <Typography variant="body1">
        For businesses with seasonal revenue, comparing the same period a year apart (e.g., this Q4 versus last
        Q4) often gives a clearer growth signal than comparing sequential quarters, which can be skewed by
        seasonal swings. Enter matching periods from each year as your rows if that fits your business better.
      </Typography>
      <Typography variant="h3">What if a period has zero or negative revenue?</Typography>
      <Typography variant="body1">
        Growth percentage is undefined when the previous period&apos;s revenue is zero, since you can&apos;t
        divide by zero — that row will show no growth figure. Negative revenue isn&apos;t typical for a revenue
        line but the formula still works directionally if entered.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/revenue-growth-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '3fr 2fr' }, gap: 6 }}>
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>Periods</Typography>
          <Stack spacing={2}>
            {rows.map((p) => (
              <Stack key={p.id} direction="row" spacing={1.5} alignItems="center">
                <TextField
                  label="Period" size="small" sx={{ minWidth: 100 }}
                  value={p.label}
                  onChange={(e) => updatePeriod(p.id, 'label', e.target.value)}
                />
                <TextField
                  label="Revenue" type="number" size="small" fullWidth
                  onFocus={(e) => e.target.select()}
                  value={p.revenue}
                  onChange={(e) => updatePeriod(p.id, 'revenue', e.target.value)}
                  slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
                />
                <Typography variant="body2" sx={{ minWidth: 70, textAlign: 'right', color: p.growth === null ? 'text.secondary' : p.growth >= 0 ? 'success.main' : 'error.main' }}>
                  {p.growth === null ? '—' : `${p.growth >= 0 ? '+' : ''}${p.growth.toFixed(1)}%`}
                </Typography>
                <IconButton color="error" size="small" onClick={() => removePeriod(p.id)} disabled={periods.length <= 2}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Stack>
            ))}
          </Stack>
          <Button startIcon={<AddIcon />} onClick={addPeriod} sx={{ mt: 2 }}>Add Period</Button>
        </Box>

        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', height: 'fit-content' }}>
          <Typography variant="body2" color="text.secondary">Latest Period Revenue</Typography>
          <Typography variant="h5" fontWeight={700}>{fmt(rows[rows.length - 1]?.revenue ?? 0)}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>Latest Period-over-Period Growth</Typography>
          <Typography variant="h3" color="primary" fontWeight={800}>
            {latestGrowth === null ? '—' : `${latestGrowth >= 0 ? '+' : ''}${latestGrowth.toFixed(1)}%`}
          </Typography>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RevenueGrowthCalculator;
