'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) =>
  `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const EmployeeCostCalculatorContent = () => {
  const [salary, setSalary] = useState('70000');
  const [payrollTax, setPayrollTax] = useState('7.65');
  const [benefits, setBenefits] = useState('20');
  const [overhead, setOverhead] = useState('10');

  const result = useMemo(() => {
    const s = parseFloat(salary) || 0;
    const pt = parseFloat(payrollTax) || 0;
    const b = parseFloat(benefits) || 0;
    const oh = parseFloat(overhead) || 0;

    const payrollTaxCost = s * (pt / 100);
    const benefitsCost = s * (b / 100);
    const overheadCost = s * (oh / 100);
    const totalCost = s + payrollTaxCost + benefitsCost + overheadCost;
    const loadMultiplier = s > 0 ? totalCost / s : 0;

    return { payrollTaxCost, benefitsCost, overheadCost, totalCost, loadMultiplier };
  }, [salary, payrollTax, benefits, overhead]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Base Salary"
          type="number"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          onFocus={(e) => e.target.select()}
          fullWidth
          slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
        />
        <TextField
          label="Payroll Tax"
          type="number"
          value={payrollTax}
          onChange={(e) => setPayrollTax(e.target.value)}
          onFocus={(e) => e.target.select()}
          fullWidth
          helperText="Employer-side payroll tax, e.g. FICA"
          slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
        />
        <TextField
          label="Benefits"
          type="number"
          value={benefits}
          onChange={(e) => setBenefits(e.target.value)}
          onFocus={(e) => e.target.select()}
          fullWidth
          helperText="Health insurance, retirement match, PTO, etc."
          slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
        />
        <TextField
          label="Equipment / Overhead"
          type="number"
          value={overhead}
          onChange={(e) => setOverhead(e.target.value)}
          onFocus={(e) => e.target.select()}
          fullWidth
          helperText="Workspace, software licenses, equipment"
          slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
        />
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
        <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="body2">Total Fully-Loaded Cost</Typography>
          <Typography variant="h3" fontWeight="bold">{money(result.totalCost)}</Typography>
          <Typography variant="caption">{result.loadMultiplier.toFixed(2)}x base salary</Typography>
        </Paper>
        <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Payroll Tax Cost</Typography>
          <Typography fontWeight={600}>{money(result.payrollTaxCost)}</Typography>
        </Paper>
        <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Benefits Cost</Typography>
          <Typography fontWeight={600}>{money(result.benefitsCost)}</Typography>
        </Paper>
        <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Overhead Cost</Typography>
          <Typography fontWeight={600}>{money(result.overheadCost)}</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

const EmployeeCostCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How the Employee Cost Calculator Works</Typography>
      <Typography variant="body1">
        An employee&apos;s salary is only part of what they actually cost a business. Enter the base salary
        along with adjustable percentages for employer-side payroll tax, benefits, and equipment/overhead, and
        this calculator adds them together to show the total fully-loaded cost of employing that person.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Total Cost = Salary × (1 + Payroll Tax % + Benefits % + Overhead %)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A $70,000 base salary with 7.65% payroll tax, 20% benefits, and 10% overhead adds $5,355 + $14,000 +
        $7,000 = $26,355 on top of salary, for a total fully-loaded cost of $96,355 — about 1.38x the base
        salary.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Budgeting the true cost of a new hire before extending an offer.</li>
          <li>Comparing the cost of hiring an employee versus a contractor.</li>
          <li>Building an accurate headcount budget for a department or startup.</li>
          <li>Pricing services or projects that factor in fully-loaded labor cost.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why is an employee&apos;s real cost higher than their salary?</Typography>
      <Typography variant="body1">
        Employers pay mandatory payroll taxes on top of salary, often contribute to benefits like health
        insurance and retirement plans, and provide equipment, software, and workspace — all real costs that
        don&apos;t appear on the employee&apos;s paycheck but do appear on the company&apos;s books.
      </Typography>
      <Typography variant="h3">What&apos;s a typical total load multiplier?</Typography>
      <Typography variant="body1">
        Many businesses estimate total employment cost at roughly 1.25x to 1.4x base salary, though this varies
        significantly by country, industry, benefits generosity, and company size — adjust the percentage
        fields above to match your specific situation.
      </Typography>
      <Typography variant="h3">Does this include one-time costs like recruiting or onboarding?</Typography>
      <Typography variant="body1">
        No — this calculates ongoing annual costs (payroll tax, benefits, overhead) as a percentage of salary.
        One-time costs like recruiting fees, signing bonuses, or onboarding time aren&apos;t included and would
        need to be added separately.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/employee-cost-calculator" content={content}>
      <EmployeeCostCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default EmployeeCostCalculator;
