'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, MenuItem, Select } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const RecurringDepositCalculatorContent = () => {
  const [monthlyDeposit, setMonthlyDeposit] = useState('5000');
  const [interestRate, setInterestRate] = useState('7');
  const [tenureValue, setTenureValue] = useState('5');
  const [tenureUnit, setTenureUnit] = useState<'months' | 'years'>('years');

  const P = parseFloat(monthlyDeposit) || 0;
  const annualRate = parseFloat(interestRate) || 0;
  const n = tenureUnit === 'months' ? parseFloat(tenureValue) || 0 : (parseFloat(tenureValue) || 0) * 12;

  const r = annualRate / 100 / 12;
  const maturityAmount = r > 0
    ? P * n * (1 + r) * ((Math.pow(1 + r, n) - 1) / r)
    : P * n;
  const totalDeposits = P * n;
  const interestEarned = maturityAmount - totalDeposits;

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Monthly Deposit"
          type="number"
          value={monthlyDeposit}
          onChange={(e) => setMonthlyDeposit(e.target.value)}
          fullWidth
          slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
        />
        <TextField
          label="Interest Rate"
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
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight="600" mb={2}>Result</Typography>
        <Paper sx={{ p: 3, bgcolor: 'primary.main', color: 'white' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Maturity Amount</Typography>
            <Typography variant="h6" fontWeight="bold">${maturityAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="body2">Total Deposits</Typography>
            <Typography variant="body2" fontWeight="bold">${totalDeposits.toLocaleString()}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">Interest Earned</Typography>
            <Typography variant="body2" fontWeight="bold">${interestEarned.toLocaleString(undefined, { maximumFractionDigits: 0 })}</Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

const RecurringDepositCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How to use the recurring deposit calculator?</Typography>
      <Typography variant="body1">
        Enter your planned monthly deposit, the annual interest rate offered by your bank, and the tenure
        of the deposit in months or years. The calculator instantly shows the maturity amount, total deposits
        made, and interest earned.
      </Typography>

      <Typography variant="h2">Formula</Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        M = P × n × (1 + r) × ((1 + r)<sup>n</sup> − 1) / r
        <br />
        P = monthly deposit, r = monthly interest rate, n = total months
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Depositing $5,000 every month for 5 years at 7% annual interest yields a maturity amount of roughly
        $356,555. You will have deposited $300,000 in total, earning approximately $56,555 in interest.
      </Typography>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Is this interest compounded quarterly like real banks?</strong> This calculator uses a simplified monthly compounding formula. Actual bank RD products may compound quarterly, slightly increasing the maturity amount.</li>
          <li><strong>What if I miss a monthly payment?</strong> The formula assumes every monthly deposit is made on time. Late or missed payments reduce the actual maturity amount.</li>
          <li><strong>Are taxes deducted?</strong> The calculator shows pre-tax amounts. Banks may deduct TDS on interest earned above the annual exemption limit.</li>
        </ul>
      </Box>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Comparing returns across different banks or RD schemes before committing.</li>
          <li>Planning a monthly savings goal for a future expense like a wedding or education.</li>
          <li>Understanding the difference between total deposits and the final maturity amount.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/finance/recurring-deposit-calculator" content={content}>
      <RecurringDepositCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RecurringDepositCalculator;
