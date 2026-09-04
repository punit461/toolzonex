'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) =>
  `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const CustomerAcquisitionCostCalculator = () => {
  const [spend, setSpend] = useState('50000');
  const [newCustomers, setNewCustomers] = useState('250');
  const [ltv, setLtv] = useState('600');

  const result = useMemo(() => {
    const s = parseFloat(spend) || 0;
    const n = parseFloat(newCustomers) || 0;
    const ltvValue = parseFloat(ltv) || 0;

    const cac = n > 0 ? s / n : 0;
    const ratio = ltvValue > 0 && cac > 0 ? ltvValue / cac : null;

    return { cac, ratio, hasLtv: ltvValue > 0 };
  }, [spend, newCustomers, ltv]);

  const content = (
    <>
      <Typography variant="h2">How to Calculate Customer Acquisition Cost (CAC)</Typography>
      <Typography variant="body1">
        Customer Acquisition Cost divides your total sales and marketing spend over a period by the number of
        new customers you acquired in that same period. If you also know your average customer lifetime value
        (LTV), this calculator shows the LTV:CAC ratio, a widely used measure of how efficiently that spend is
        turning into profitable customers.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        CAC = Sales & Marketing Spend ÷ New Customers Acquired &nbsp;|&nbsp; LTV:CAC = LTV ÷ CAC
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Spending $50,000 on sales and marketing in a month that brings in 250 new customers gives a CAC of
        $50,000 ÷ 250 = $200 per customer. If the average customer is worth $600 in lifetime value, the
        LTV:CAC ratio is 600 ÷ 200 = 3:1.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Tracking how efficiently marketing and sales spend converts into new customers over time.</li>
          <li>Comparing CAC across different channels or campaigns to see which is most cost-effective.</li>
          <li>Checking whether current spending is sustainable relative to what a customer is worth long-term.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What counts as &quot;sales and marketing spend&quot;?</Typography>
      <Typography variant="body1">
        Typically this includes advertising spend, sales and marketing salaries, tools and software, and any
        agency or contractor fees directly tied to acquiring new customers during the period you&apos;re
        measuring — not general overhead unrelated to acquisition.
      </Typography>
      <Typography variant="h3">What&apos;s a healthy LTV:CAC ratio?</Typography>
      <Typography variant="body1">
        A commonly cited guideline is that a ratio of 3:1 or better is healthy — meaning a customer is worth at
        least three times what it costs to acquire them. A ratio below that can signal spend is too high
        relative to the value customers bring, while a very high ratio can sometimes mean a company is
        under-investing in growth.
      </Typography>
      <Typography variant="h3">Do I need to know LTV to use this calculator?</Typography>
      <Typography variant="body1">
        No — the LTV field is optional. Leave it blank or at zero to see just the CAC figure; entering an LTV
        estimate additionally shows the LTV:CAC ratio for context.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/customer-acquisition-cost-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Total Sales & Marketing Spend"
            type="number"
            value={spend}
            onChange={(e) => setSpend(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="New Customers Acquired"
            type="number"
            value={newCustomers}
            onChange={(e) => setNewCustomers(e.target.value)}
            fullWidth
          />
          <TextField
            label="Average Customer Lifetime Value (optional)"
            type="number"
            value={ltv}
            onChange={(e) => setLtv(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Customer Acquisition Cost</Typography>
            <Typography variant="h3" fontWeight="bold">{money(result.cac)}</Typography>
          </Paper>
          {result.hasLtv && result.ratio !== null && (
            <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Typography>LTV:CAC Ratio</Typography>
              <Typography fontWeight={600} color={result.ratio >= 3 ? 'success.main' : 'warning.main'}>
                {result.ratio.toFixed(2)}:1
              </Typography>
            </Paper>
          )}
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CustomerAcquisitionCostCalculator;
