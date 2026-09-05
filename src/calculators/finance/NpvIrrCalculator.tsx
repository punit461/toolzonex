'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, Button, InputAdornment, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });

interface CashFlow {
  id: number;
  value: string;
}

let nextId = 1;

function computeNpv(initialInvestment: number, flows: number[], ratePercent: number): number {
  const r = ratePercent / 100;
  let npv = -initialInvestment;
  flows.forEach((cf, i) => {
    npv += cf / Math.pow(1 + r, i + 1);
  });
  return npv;
}

function computeIrr(initialInvestment: number, flows: number[]): number | null {
  let lo = -99;
  let hi = 1000;
  const npvAt = (rate: number) => computeNpv(initialInvestment, flows, rate);

  const npvLo = npvAt(lo);
  const npvHi = npvAt(hi);

  // Need a sign change across the search range for bisection to work.
  if (npvLo === 0) return lo;
  if (npvHi === 0) return hi;
  if ((npvLo > 0 && npvHi > 0) || (npvLo < 0 && npvHi < 0)) return null;

  for (let i = 0; i < 100; i++) {
    const mid = (lo + hi) / 2;
    const npvMid = npvAt(mid);
    if (Math.abs(npvMid) < 1e-7) return mid;
    if ((npvMid > 0) === (npvLo > 0)) {
      lo = mid;
    } else {
      hi = mid;
    }
  }
  return (lo + hi) / 2;
}

const NpvIrrCalculatorContent = () => {
  const [initialInvestment, setInitialInvestment] = useState('10000');
  const [discountRate, setDiscountRate] = useState('8');
  const [flows, setFlows] = useState<CashFlow[]>([
    { id: 0, value: '3000' },
    { id: 1, value: '4000' },
    { id: 2, value: '5000' },
    { id: 3, value: '4000' },
  ]);

  const result = useMemo(() => {
    const initial = parseFloat(initialInvestment) || 0;
    const rate = parseFloat(discountRate) || 0;
    const cfValues = flows.map((f) => parseFloat(f.value) || 0);
    const npv = computeNpv(initial, cfValues, rate);
    const irr = computeIrr(initial, cfValues);
    return { npv, irr };
  }, [initialInvestment, discountRate, flows]);

  const updateFlow = (id: number, value: string) => {
    setFlows((prev) => prev.map((f) => (f.id === id ? { ...f, value } : f)));
  };

  const addFlow = () => setFlows((prev) => [...prev, { id: nextId++, value: '' }]);
  const removeFlow = (id: number) => setFlows((prev) => prev.filter((f) => f.id !== id));

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Stack spacing={3}>
        <TextField
          label="Initial Investment (cash out today)"
          type="number"
          value={initialInvestment}
          onChange={(e) => setInitialInvestment(e.target.value)}
          fullWidth
          slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
        />
        <TextField
          label="Discount Rate"
          type="number"
          value={discountRate}
          onChange={(e) => setDiscountRate(e.target.value)}
          fullWidth
          slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
        />

        <Typography variant="subtitle1" fontWeight={600}>Future Cash Flows (one per period)</Typography>
        <Stack spacing={1.5}>
          {flows.map((f, idx) => (
            <Stack key={f.id} direction="row" spacing={1.5} alignItems="center">
              <TextField
                label={`Period ${idx + 1}`}
                type="number"
                size="small"
                fullWidth
                value={f.value}
                onChange={(e) => updateFlow(f.id, e.target.value)}
                slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
              />
              {flows.length > 1 && (
                <Button color="error" size="small" onClick={() => removeFlow(f.id)}><DeleteIcon fontSize="small" /></Button>
              )}
            </Stack>
          ))}
          <Button startIcon={<AddIcon />} onClick={addFlow} variant="outlined" sx={{ alignSelf: 'flex-start' }}>Add Period</Button>
        </Stack>
      </Stack>

      <Box>
        <Stack spacing={2}>
          <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Net Present Value (NPV)</Typography>
            <Typography variant="h4" fontWeight="bold">{currency.format(result.npv)}</Typography>
          </Paper>
          <Paper variant="outlined" sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">Internal Rate of Return (IRR)</Typography>
            {result.irr !== null ? (
              <Typography variant="h4" fontWeight="bold">{result.irr.toFixed(2)}%</Typography>
            ) : (
              <Alert severity="warning" sx={{ mt: 1, textAlign: 'left' }}>
                IRR could not be determined for these cash flows. This usually means the cash flows never
                cross from negative to positive within a realistic rate range.
              </Alert>
            )}
          </Paper>
        </Stack>
      </Box>
    </Box>
  );
};

const NpvIrrCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How the NPV & IRR Calculator Works</Typography>
      <Typography variant="body1">
        Enter your initial investment (the cash you put in today), a discount rate, and each future period&apos;s
        expected cash flow. Net Present Value (NPV) discounts every future cash flow back to today&apos;s
        dollars and subtracts the initial investment, telling you whether a project creates value at your
        chosen discount rate. Internal Rate of Return (IRR) is the discount rate at which NPV would equal
        exactly zero — the break-even return of the investment.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        NPV = −Initial Investment + Σ [CF(t) / (1+r)^t]
      </Box>
      <Typography variant="body1">
        IRR is found with a bisection search: the calculator repeatedly narrows a range between −99% and
        1,000% until it lands on the rate that makes NPV cross zero, converging to a precise answer within
        about 100 iterations.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A $10,000 initial investment returning $3,000, $4,000, $5,000, and $4,000 over four years, discounted
        at 8%, produces a positive NPV — meaning the project is expected to earn more than an 8% return — and
        an IRR somewhere above 8%, the effective annualized return the cash flows themselves imply.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Deciding whether a capital project or investment clears your minimum required return.</li>
          <li>Comparing two projects with different cash flow timing on equal footing.</li>
          <li>Finding the effective annualized return implied by an irregular series of cash flows.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What does a negative NPV mean?</strong> A negative NPV means the investment is expected to return less than your discount rate — in other words, the future cash flows aren&apos;t worth more than what you put in, once discounted back to today.</li>
          <li><strong>Why might IRR not be calculable?</strong> If the cash flow series never actually flips from a net negative present value to a net positive one anywhere in the −99% to 1,000% search range, there is no rate in that range where NPV crosses zero, so IRR can&apos;t be determined.</li>
          <li><strong>Should I use NPV or IRR to decide between two projects?</strong> NPV is generally considered the more reliable metric for ranking projects since it reflects total dollar value created, while IRR can sometimes be misleading when comparing projects of very different sizes or cash flow timing.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/finance/npv-irr-calculator" content={content}>
      <NpvIrrCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default NpvIrrCalculator;
