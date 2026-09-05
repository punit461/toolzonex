'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const CustomerChurnRateCalculator = () => {
  const [start, setStart] = useState('500');
  const [lost, setLost] = useState('40');

  const result = useMemo(() => {
    const s = parseFloat(start) || 0;
    const l = parseFloat(lost) || 0;
    if (s <= 0) return { valid: false, churnRate: 0 };
    return { valid: true, churnRate: (l / s) * 100 };
  }, [start, lost]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Customer Churn Rate Calculator</Typography>
      <Typography variant="body1">
        Enter the number of customers you had at the start of a period and the number of those customers you
        lost (churned) during that same period. Churn rate frames the calculation directly around losses,
        which makes it a natural fit for churn-focused reporting — it needs only a starting count and a lost
        count, without tracking new customer acquisition separately.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Churn Rate = (Customers Lost / Customers at Start) × 100
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A business starts the month with 500 customers and loses 40 of them during the month. Churn Rate =
        (40 / 500) × 100 = 8%, meaning 8% of the starting customer base churned that month.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Tracking month-over-month or year-over-year subscription cancellations.</li>
          <li>Reporting churn to stakeholders in a format that highlights losses directly.</li>
          <li>Benchmarking churn against industry averages to gauge customer health.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Customer Retention Rate Calculator?</strong> Churn and retention describe complementary aspects of the same customer loss — but this tool frames the calculation directly around losses (useful for churn-focused reporting), while the Retention Rate Calculator instead uses starting, ending, and new-customer counts to measure how many original customers were kept. Retention rate = 100% − churn rate when both are measured over the same period the same way.</li>
          <li><strong>What&apos;s considered a &quot;good&quot; churn rate?</strong> It varies by industry — subscription software businesses often aim for under 5-10% annual churn, while other industries with naturally higher turnover may tolerate more. Compare against your own historical trend rather than a single universal benchmark.</li>
          <li><strong>Does this account for new customers gained during the period?</strong> No — this calculator measures losses only, relative to the customers you started with. If you also want to factor in new customers acquired, use the Customer Retention Rate Calculator instead.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/finance/customer-churn-rate-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField label="Customers at Start of Period" type="number" value={start} onChange={(e) => setStart(e.target.value)} onFocus={(e) => e.target.select()} fullWidth />
          <TextField label="Customers Lost (Churned) During Period" type="number" value={lost} onChange={(e) => setLost(e.target.value)} onFocus={(e) => e.target.select()} fullWidth />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
          <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Customer Churn Rate</Typography>
            <Typography variant="h3" fontWeight="bold">{result.valid ? `${result.churnRate.toFixed(1)}%` : '—'}</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CustomerChurnRateCalculator;
