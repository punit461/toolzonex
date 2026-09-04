'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const CustomerRetentionRateCalculator = () => {
  const [start, setStart] = useState('500');
  const [end, setEnd] = useState('540');
  const [newCustomers, setNewCustomers] = useState('80');

  const result = useMemo(() => {
    const s = parseFloat(start) || 0;
    const e = parseFloat(end) || 0;
    const n = parseFloat(newCustomers) || 0;

    if (s <= 0) return { valid: false, crr: 0, flag: false };

    const crr = ((e - n) / s) * 100;
    return { valid: true, crr, flag: crr < 0 || crr > 100 };
  }, [start, end, newCustomers]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Customer Retention Rate Calculator</Typography>
      <Typography variant="body1">
        Enter the number of customers you started a period with, the number you ended the period with, and how
        many new customers you acquired during that same period. Customer retention rate (CRR) removes new
        customers from the ending count so it measures only how many of your original customers you kept — it
        answers &quot;of the customers I had, how many stayed?&quot; rather than blending in growth from new
        acquisition.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        CRR = ((Customers at End − New Customers) / Customers at Start) × 100
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A business starts the month with 500 customers, ends with 540, and acquired 80 new customers during the
        month. CRR = ((540 − 80) / 500) × 100 = 92%, meaning 92% of the original 500 customers were retained
        (40 of the original 500 were lost, offset by the 80 new customers gained).
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Tracking subscription or membership renewal health month over month.</li>
          <li>Measuring the impact of a customer success or loyalty initiative over time.</li>
          <li>Comparing retention across different customer segments or acquisition channels.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What does a negative or over-100% result mean?</strong> Both signal a data-entry issue — in a valid scenario, ending customers minus new customers should never exceed your starting customer count. Double-check that your start, end, and new customer figures are all measured over the exact same period.</li>
          <li><strong>What counts as a &quot;good&quot; retention rate?</strong> It varies heavily by industry — subscription software businesses often aim for 90%+ monthly retention, while other industries with naturally higher churn may consider 70-80% healthy. Compare against your own historical trend rather than a universal benchmark.</li>
          <li><strong>How is this different from churn rate?</strong> Churn rate and retention rate are complementary — churn rate measures the percentage of customers lost, while retention rate measures the percentage kept. Retention rate = 100% − churn rate when both are measured the same way.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/finance/customer-retention-rate-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField label="Customers at Start of Period" type="number" value={start} onChange={(e) => setStart(e.target.value)} onFocus={(e) => e.target.select()} fullWidth />
          <TextField label="Customers at End of Period" type="number" value={end} onChange={(e) => setEnd(e.target.value)} onFocus={(e) => e.target.select()} fullWidth />
          <TextField label="New Customers Acquired During Period" type="number" value={newCustomers} onChange={(e) => setNewCustomers(e.target.value)} onFocus={(e) => e.target.select()} fullWidth />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
          <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Customer Retention Rate</Typography>
            <Typography variant="h3" fontWeight="bold">{result.valid ? `${result.crr.toFixed(1)}%` : '—'}</Typography>
          </Paper>
          {result.valid && result.flag && (
            <Typography variant="body2" color="error" sx={{ mt: 2 }}>
              This result is outside the normal 0-100% range, which usually means the inputs don&apos;t represent
              the same period consistently. Double-check your figures.
            </Typography>
          )}
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CustomerRetentionRateCalculator;
