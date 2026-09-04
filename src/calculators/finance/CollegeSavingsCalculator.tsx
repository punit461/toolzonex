'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

const COST_PRESETS: Record<string, { label: string; total: number }> = {
  public: { label: 'In-State Public (4 years, ~$110,000)', total: 110000 },
  private: { label: 'Private (4 years, ~$240,000)', total: 240000 },
  custom: { label: 'Custom Amount', total: 0 },
};

const CollegeSavingsCalculator = () => {
  const [childAge, setChildAge] = useState('5');
  const [startAge, setStartAge] = useState('18');
  const [preset, setPreset] = useState<keyof typeof COST_PRESETS>('public');
  const [customCost, setCustomCost] = useState('110000');
  const [currentSavings, setCurrentSavings] = useState('5000');
  const [annualReturn, setAnnualReturn] = useState('6');

  const targetCost = preset === 'custom' ? parseFloat(customCost) || 0 : COST_PRESETS[preset].total;

  const { requiredMonthly, monthsToGo, totalContributions, totalGrowth } = useMemo(() => {
    const age = parseFloat(childAge) || 0;
    const start = parseFloat(startAge) || 0;
    const current = parseFloat(currentSavings) || 0;
    const r = (parseFloat(annualReturn) || 0) / 100 / 12;
    const years = Math.max(0, start - age);
    const n = Math.round(years * 12);

    if (n <= 0) return { requiredMonthly: 0, monthsToGo: 0, totalContributions: 0, totalGrowth: 0 };

    const futureValueOfCurrent = current * Math.pow(1 + r, n);
    const remaining = targetCost - futureValueOfCurrent;

    let monthly = 0;
    if (remaining > 0) {
      monthly = r > 0 ? remaining / ((Math.pow(1 + r, n) - 1) / r) : remaining / n;
    }

    const contributions = monthly * n;
    const growth = targetCost - current - contributions;

    return { requiredMonthly: Math.max(0, monthly), monthsToGo: n, totalContributions: contributions, totalGrowth: growth };
  }, [childAge, startAge, currentSavings, annualReturn, targetCost]);

  const content = (
    <>
      <Typography variant="h2">How College Savings Are Calculated</Typography>
      <Typography variant="body1">
        Enter your child&apos;s current age, the age they&apos;ll start college (typically 18), an estimated
        total college cost, what you&apos;ve already saved, and an expected annual investment return. The
        calculator projects your current savings forward with compounding, finds the remaining gap to your
        target cost, and solves for the fixed monthly contribution needed to close that gap by the time college
        starts.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Required Monthly = (Target Cost − Current Savings × (1+r)ⁿ) / [((1+r)ⁿ − 1) / r]
      </Box>
      <Typography variant="body1">
        In the US, a <strong>529 plan</strong> is one of the most common tax-advantaged accounts used
        specifically for education savings, though it&apos;s far from the only option. This calculator doesn&apos;t
        account for the specific tax treatment of any particular account type — check with a financial advisor
        or tax professional for guidance on which savings vehicle fits your situation.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 5-year-old with $5,000 already saved, targeting an in-state public college cost of $110,000 by age
        18, at an expected 6% annual return, would need to contribute roughly $340 per month for the next 13
        years to reach that goal.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Planning monthly contributions to a 529 plan or other education savings account.</li>
          <li>Comparing how public vs. private college cost estimates change the required savings rate.</li>
          <li>Checking how starting to save earlier (or later) affects the monthly amount needed.</li>
          <li>Seeing how a higher expected return reduces the required monthly contribution.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is a 529 plan?</Typography>
      <Typography variant="body1">
        A 529 plan is a US tax-advantaged savings account specifically designed for education expenses. Rules,
        contribution limits, and state-specific tax benefits vary, so this tool doesn&apos;t provide specific
        tax or legal advice — consult a financial advisor for guidance tailored to your situation.
      </Typography>
      <Typography variant="h3">How accurate are the college cost presets?</Typography>
      <Typography variant="body1">
        The in-state public and private presets are rough ballpark figures for a 4-year degree at today&apos;s
        prices, meant as a starting point. Actual costs vary widely by school and will likely rise with
        inflation by the time your child enrolls — use the custom option to enter your own more specific
        estimate.
      </Typography>
      <Typography variant="h3">What if my child is already close to college age?</Typography>
      <Typography variant="body1">
        With less time to save, the required monthly contribution will be noticeably higher for the same target
        cost — the calculator will still compute it, but you may also want to consider adjusting your cost
        expectations or savings timeline.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/college-savings-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <TextField
              label="Child's Current Age"
              type="number"
              fullWidth
              value={childAge}
              onChange={(e) => setChildAge(e.target.value)}
              onFocus={(e) => e.target.select()}
            />
            <TextField
              label="College Start Age"
              type="number"
              fullWidth
              value={startAge}
              onChange={(e) => setStartAge(e.target.value)}
              onFocus={(e) => e.target.select()}
            />
          </Box>
          <FormControl fullWidth>
            <InputLabel>Estimated College Cost</InputLabel>
            <Select label="Estimated College Cost" value={preset} onChange={(e) => setPreset(e.target.value as keyof typeof COST_PRESETS)}>
              {Object.entries(COST_PRESETS).map(([key, item]) => (
                <MenuItem key={key} value={key}>{item.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {preset === 'custom' && (
            <TextField
              label="Custom Total College Cost"
              type="number"
              fullWidth
              value={customCost}
              onChange={(e) => setCustomCost(e.target.value)}
              onFocus={(e) => e.target.select()}
              slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
            />
          )}
          <TextField
            label="Current Savings"
            type="number"
            fullWidth
            value={currentSavings}
            onChange={(e) => setCurrentSavings(e.target.value)}
            onFocus={(e) => e.target.select()}
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Expected Annual Return"
            type="number"
            fullWidth
            value={annualReturn}
            onChange={(e) => setAnnualReturn(e.target.value)}
            onFocus={(e) => e.target.select()}
            slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Required Monthly Contribution</Typography>
            <Typography variant="h3" fontWeight="bold">{fmt(requiredMonthly)}</Typography>
            <Typography variant="body2" mt={1}>
              over {monthsToGo > 0 ? `${Math.round(monthsToGo / 12 * 10) / 10} years` : '—'}
            </Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Target College Cost</Typography>
            <Typography fontWeight={600}>{fmt(targetCost)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Total Contributions</Typography>
            <Typography fontWeight={600}>{fmt(totalContributions)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Investment Growth</Typography>
            <Typography fontWeight={600} color="success.main">{fmt(Math.max(0, totalGrowth))}</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CollegeSavingsCalculator;
