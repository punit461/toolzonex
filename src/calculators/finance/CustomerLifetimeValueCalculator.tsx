'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(n);

const CustomerLifetimeValueCalculator = () => {
  const [avgPurchaseValue, setAvgPurchaseValue] = useState('75');
  const [purchaseFrequency, setPurchaseFrequency] = useState('4');
  const [customerLifespan, setCustomerLifespan] = useState('3');
  const [acquisitionCost, setAcquisitionCost] = useState('50');

  const { grossCLV, netCLV, cac } = useMemo(() => {
    const apv = parseFloat(avgPurchaseValue) || 0;
    const freq = parseFloat(purchaseFrequency) || 0;
    const lifespan = parseFloat(customerLifespan) || 0;
    const acq = parseFloat(acquisitionCost) || 0;
    const gross = apv * freq * lifespan;
    return { grossCLV: gross, netCLV: gross - acq, cac: acq };
  }, [avgPurchaseValue, purchaseFrequency, customerLifespan, acquisitionCost]);

  const content = (
    <>
      <Typography variant="h2">How Customer Lifetime Value Is Calculated</Typography>
      <Typography variant="body1">
        Customer lifetime value (CLV) estimates the total revenue a business can expect from a single
        customer over the entire relationship. Multiply the average purchase value by how often a
        customer buys per year, then by the average number of years they stay a customer. Subtracting
        the customer acquisition cost (CAC) gives a net CLV that reflects actual profit contribution
        rather than gross revenue.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        CLV = Average Purchase Value × Purchase Frequency × Customer Lifespan
        <br />
        Net CLV = CLV − Customer Acquisition Cost
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A customer who spends $75 per order, buys 4 times a year, and stays a customer for 3 years has
        a gross CLV of $900. If it cost $50 in marketing and sales spend to acquire that customer, the
        net CLV comes down to $850 — still a strong return on the acquisition investment.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Deciding how much you can afford to spend acquiring a new customer.</li>
          <li>Comparing the long-term value of different customer segments or channels.</li>
          <li>Justifying investment in retention and loyalty programs.</li>
          <li>Forecasting revenue contribution from an expanding customer base.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is a healthy CLV to CAC ratio?</Typography>
      <Typography variant="body1">
        A commonly cited benchmark is a CLV to CAC ratio of at least 3:1, meaning a customer generates
        three times what it cost to acquire them. Below that, growth can be unprofitable once overhead
        is included.
      </Typography>
      <Typography variant="h3">How do I estimate customer lifespan?</Typography>
      <Typography variant="body1">
        Divide 1 by your annual customer churn rate. For example, a 25% annual churn rate implies an
        average customer lifespan of 4 years (1 ÷ 0.25). If you don&apos;t track churn yet, a
        conservative estimate based on historical repeat-purchase data works as a starting point.
      </Typography>
      <Typography variant="h3">Should I use gross or net CLV for decisions?</Typography>
      <Typography variant="body1">
        Net CLV, which subtracts acquisition cost, gives a truer picture of profitability. Gross CLV is
        still useful for understanding total revenue potential before costs are factored in.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/customer-lifetime-value-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Average Purchase Value"
            type="number"
            value={avgPurchaseValue}
            onChange={(e) => setAvgPurchaseValue(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Purchase Frequency (per year)"
            type="number"
            value={purchaseFrequency}
            onChange={(e) => setPurchaseFrequency(e.target.value)}
            fullWidth
          />
          <TextField
            label="Average Customer Lifespan"
            type="number"
            value={customerLifespan}
            onChange={(e) => setCustomerLifespan(e.target.value)}
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">years</InputAdornment> } }}
          />
          <TextField
            label="Customer Acquisition Cost (optional)"
            type="number"
            value={acquisitionCost}
            onChange={(e) => setAcquisitionCost(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Net Customer Lifetime Value</Typography>
            <Typography variant="h3" fontWeight="bold">{fmt(netCLV)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Gross CLV</Typography>
            <Typography fontWeight={600}>{fmt(grossCLV)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Acquisition Cost</Typography>
            <Typography fontWeight={600} color="error.main">{fmt(cac)}</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CustomerLifetimeValueCalculator;
