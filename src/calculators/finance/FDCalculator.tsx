'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, MenuItem, Select } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const COMPOUNDING_OPTIONS = [
  { value: 1, label: 'Annually' },
  { value: 2, label: 'Half-yearly' },
  { value: 4, label: 'Quarterly' },
  { value: 12, label: 'Monthly' },
];

const FDCalculatorContent = () => {
  const [principal, setPrincipal] = useState('100000');
  const [interestRate, setInterestRate] = useState('7');
  const [tenureValue, setTenureValue] = useState('5');
  const [tenureUnit, setTenureUnit] = useState<'months' | 'years'>('years');
  const [compoundingFrequency, setCompoundingFrequency] = useState(4);

  const P = parseFloat(principal) || 0;
  const annualRate = parseFloat(interestRate) || 0;
  const tenureYears = tenureUnit === 'years' ? (parseFloat(tenureValue) || 0) : (parseFloat(tenureValue) || 0) / 12;

  const n = compoundingFrequency;
  const r = annualRate / 100;
  const maturityAmount = P * Math.pow(1 + r / n, n * tenureYears);
  const interestEarned = maturityAmount - P;

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Principal Amount"
          type="number"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
          fullWidth
          slotProps={{ input: { startAdornment: <InputAdornment position="start">₹</InputAdornment> } }}
        />
        <TextField
          label="Annual Interest Rate"
          type="number"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          fullWidth
          slotProps={{ input: { endAdornment: <InputAdornment position="end">% p.a.</InputAdornment> } }}
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            label="Tenure"
            type="number"
            value={tenureValue}
            onChange={(e) => setTenureValue(e.target.value)}
            fullWidth
          />
          <Select
            value={tenureUnit}
            onChange={(e) => setTenureUnit(e.target.value as 'months' | 'years')}
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="months">Months</MenuItem>
            <MenuItem value="years">Years</MenuItem>
          </Select>
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary" mb={1}>Compounding Frequency</Typography>
          <Select
            value={compoundingFrequency}
            onChange={(e) => setCompoundingFrequency(Number(e.target.value))}
            fullWidth
          >
            {COMPOUNDING_OPTIONS.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
            ))}
          </Select>
        </Box>
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight="600" mb={2}>Result</Typography>
        <Paper sx={{ p: 3, bgcolor: 'primary.main', color: 'white' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Maturity Amount</Typography>
            <Typography variant="h6" fontWeight="bold">₹{maturityAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="body2">Principal Amount</Typography>
            <Typography variant="body2" fontWeight="bold">₹{P.toLocaleString()}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">Interest Earned</Typography>
            <Typography variant="body2" fontWeight="bold">₹{interestEarned.toLocaleString(undefined, { maximumFractionDigits: 0 })}</Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

const FDCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Fixed Deposit Calculator</Typography>
      <Typography variant="body1">
        Enter the amount you plan to deposit, the annual interest rate offered by your bank, the tenure of the
        deposit, and how often interest compounds. The calculator instantly shows the maturity amount and total
        interest earned.
      </Typography>

      <Typography variant="h2">Formula</Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        A = P × (1 + r/n)<sup>n × t</sup>
        <br />
        P = principal, r = annual interest rate, n = compounding frequency per year, t = tenure in years
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Depositing ₹100,000 for 5 years at 7% annual interest, compounded quarterly (the standard for most
        Indian bank FDs), matures to roughly ₹141,478 — earning about ₹41,478 in interest over the tenure.
      </Typography>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why is quarterly compounding the default?</strong> Most Indian banks compound fixed deposit interest quarterly, so it&apos;s used as the default — switch to monthly, half-yearly, or annual if your bank&apos;s scheme differs.</li>
          <li><strong>Are taxes deducted from the maturity amount?</strong> This calculator shows pre-tax figures. Banks may deduct TDS on interest earned above the annual exemption threshold, and interest income is taxable per your income slab.</li>
          <li><strong>Does the rate stay fixed for the whole tenure?</strong> The calculator assumes a fixed rate throughout, which matches how bank FDs normally work — the rate is locked in when you open the deposit.</li>
        </ul>
      </Box>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Comparing maturity values across different banks or compounding frequencies before investing.</li>
          <li>Planning a lump-sum investment goal for a future expense.</li>
          <li>Understanding how compounding frequency affects the final interest earned.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/finance/fd-calculator" content={content}>
      <FDCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default FDCalculator;
