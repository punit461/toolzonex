'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) =>
  `$${v.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

const LeaseVsBuyCalculator = () => {
  const [leasePayment, setLeasePayment] = useState('400');
  const [leaseTerm, setLeaseTerm] = useState('36');
  const [buyPayment, setBuyPayment] = useState('600');
  const [buyTerm, setBuyTerm] = useState('60');
  const [downPayment, setDownPayment] = useState('3000');
  const [resaleValue, setResaleValue] = useState('12000');

  const result = useMemo(() => {
    const lp = parseFloat(leasePayment) || 0;
    const lt = parseFloat(leaseTerm) || 0;
    const bp = parseFloat(buyPayment) || 0;
    const bt = parseFloat(buyTerm) || 0;
    const dp = parseFloat(downPayment) || 0;
    const resale = parseFloat(resaleValue) || 0;

    const totalLeaseCost = lp * lt;
    const totalBuyCost = dp + bp * bt - resale;

    const leaseCostPerMonth = lt > 0 ? totalLeaseCost / lt : 0;
    const buyCostPerMonth = bt > 0 ? totalBuyCost / bt : 0;

    return { totalLeaseCost, totalBuyCost, leaseCostPerMonth, buyCostPerMonth };
  }, [leasePayment, leaseTerm, buyPayment, buyTerm, downPayment, resaleValue]);

  const cheaper = result.buyCostPerMonth < result.leaseCostPerMonth ? 'buy' : 'lease';

  const content = (
    <>
      <Typography variant="h2">How Lease vs. Buy Is Calculated</Typography>
      <Typography variant="body1">
        This calculator compares the total cost of leasing a vehicle or piece of equipment against buying it
        outright with a loan. Enter the monthly lease payment and lease term, then the monthly loan payment,
        loan term, any down payment, and an optional estimated resale (residual) value if you buy and later
        sell it.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Total Lease Cost = Monthly Lease Payment × Lease Term<br />
        Total Buy Cost = Down Payment + (Monthly Loan Payment × Loan Term) − Estimated Resale Value
      </Box>
      <Typography variant="body1">
        Since lease and loan terms are often different lengths, the calculator also shows a cost-per-month
        figure for each option, which is the fairer way to compare them side by side.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Leasing a car at $400/month for 36 months costs $14,400 total ($400/month). Buying the same car with a
        $3,000 down payment, $600/month for 60 months, and an estimated $12,000 resale value at the end costs
        $3,000 + $36,000 − $12,000 = $27,000 total, or $450/month — in this example, leasing is cheaper on a
        monthly basis, though buying builds equity in an asset you keep.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Deciding whether to lease or finance a new car.</li>
          <li>Comparing leasing vs. purchasing equipment for a business.</li>
          <li>Weighing lower monthly lease payments against long-term ownership costs.</li>
          <li>Estimating how resale value affects the true cost of buying.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does this account for mileage limits or lease-end fees?</Typography>
      <Typography variant="body1">
        No — this calculator focuses on the core payment comparison. Leases often include mileage limits,
        wear-and-tear charges, and disposition fees at the end of the term, which can add real cost beyond the
        monthly payment and should be factored in separately.
      </Typography>
      <Typography variant="h3">Why does buying show a cost even after subtracting resale value?</Typography>
      <Typography variant="body1">
        Buying still involves paying interest on the loan and the asset&apos;s natural depreciation — the
        resale value simply recovers part of what you paid, it doesn&apos;t erase financing costs or
        depreciation entirely.
      </Typography>
      <Typography variant="h3">Is leasing or buying always better?</Typography>
      <Typography variant="body1">
        Neither is universally better — leasing typically offers lower monthly payments and the option to
        upgrade more often, while buying builds ownership and equity over time and has no mileage or usage
        restrictions. The right choice depends on your budget, how long you plan to keep the vehicle or
        equipment, and how much you use it.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/lease-vs-buy-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box sx={{ bgcolor: '#f0f9ff', p: 4, borderRadius: 3, border: '1px solid #bae6fd' }}>
          <Typography variant="h5" sx={{ color: '#0369a1', fontWeight: 800, mb: 3 }}>Lease Details</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Monthly Lease Payment"
              type="number"
              fullWidth
              value={leasePayment}
              onChange={(e) => setLeasePayment(e.target.value)}
              onFocus={(e) => e.target.select()}
              slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
            />
            <TextField
              label="Lease Term (months)"
              type="number"
              fullWidth
              value={leaseTerm}
              onChange={(e) => setLeaseTerm(e.target.value)}
              onFocus={(e) => e.target.select()}
            />
          </Box>
        </Box>

        <Box sx={{ bgcolor: '#fefce8', p: 4, borderRadius: 3, border: '1px solid #fef08a' }}>
          <Typography variant="h5" sx={{ color: '#a16207', fontWeight: 800, mb: 3 }}>Buy Details</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Down Payment"
              type="number"
              fullWidth
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              onFocus={(e) => e.target.select()}
              slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
            />
            <TextField
              label="Monthly Loan Payment"
              type="number"
              fullWidth
              value={buyPayment}
              onChange={(e) => setBuyPayment(e.target.value)}
              onFocus={(e) => e.target.select()}
              slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
            />
            <TextField
              label="Loan Term (months)"
              type="number"
              fullWidth
              value={buyTerm}
              onChange={(e) => setBuyTerm(e.target.value)}
              onFocus={(e) => e.target.select()}
            />
            <TextField
              label="Estimated Resale Value (optional)"
              type="number"
              fullWidth
              value={resaleValue}
              onChange={(e) => setResaleValue(e.target.value)}
              onFocus={(e) => e.target.select()}
              helperText="Value at the end of the loan term, if sold"
              slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
            />
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 4, display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        <Paper sx={{ p: 3, textAlign: 'center', bgcolor: cheaper === 'lease' ? 'primary.main' : 'action.hover', color: cheaper === 'lease' ? 'white' : 'text.primary' }}>
          <Typography variant="body2">Total Lease Cost</Typography>
          <Typography variant="h4" fontWeight="bold">{money(result.totalLeaseCost)}</Typography>
          <Typography variant="body2">{money(result.leaseCostPerMonth)}/month equivalent</Typography>
        </Paper>
        <Paper sx={{ p: 3, textAlign: 'center', bgcolor: cheaper === 'buy' ? 'primary.main' : 'action.hover', color: cheaper === 'buy' ? 'white' : 'text.primary' }}>
          <Typography variant="body2">Total Buy Cost (net of resale)</Typography>
          <Typography variant="h4" fontWeight="bold">{money(result.totalBuyCost)}</Typography>
          <Typography variant="body2">{money(result.buyCostPerMonth)}/month equivalent</Typography>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default LeaseVsBuyCalculator;
