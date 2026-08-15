'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, InputAdornment, Slider } from '@mui/material';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

// 2026 IRS limits (irs.gov). These change annually -- verify current-year
// limits before relying on this for tax planning.
const EMPLOYEE_LIMIT_2026 = 24_500;
const CATCHUP_50_PLUS = 8_000;
const CATCHUP_60_TO_63 = 11_250;
const TOTAL_LIMIT_2026 = 72_000;

const formatUSD = (value: number) =>
  `$${Math.round(value).toLocaleString('en-US')}`;

const US401kCalculator = () => {
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(65);
  const [currentBalance, setCurrentBalance] = useState<number>(20000);
  const [annualSalary, setAnnualSalary] = useState<number>(85000);
  const [contributionPct, setContributionPct] = useState<number>(10);
  const [employerMatchPct, setEmployerMatchPct] = useState<number>(50);
  const [employerMatchCapPct, setEmployerMatchCapPct] = useState<number>(6);
  const [annualReturn, setAnnualReturn] = useState<number>(7);
  const [salaryGrowth, setSalaryGrowth] = useState<number>(3);

  const projection = useMemo(() => {
    const years = Math.max(0, retirementAge - currentAge);
    const rows: { age: number; balance: number; contributions: number }[] = [];

    let balance = currentBalance;
    let salary = annualSalary;
    let totalContributions = currentBalance;
    let totalEmployerMatch = 0;
    let totalGrowth = 0;
    let limitWasCapped = false;

    rows.push({ age: currentAge, balance, contributions: totalContributions });

    for (let year = 1; year <= years; year++) {
      const age = currentAge + year;
      const employeeElectiveLimit =
        age >= 60 && age <= 63 ? EMPLOYEE_LIMIT_2026 + CATCHUP_60_TO_63
        : age >= 50 ? EMPLOYEE_LIMIT_2026 + CATCHUP_50_PLUS
        : EMPLOYEE_LIMIT_2026;

      let employeeContribution = salary * (contributionPct / 100);
      if (employeeContribution > employeeElectiveLimit) {
        employeeContribution = employeeElectiveLimit;
        limitWasCapped = true;
      }

      const matchableContributionPct = Math.min(contributionPct, employerMatchCapPct);
      let employerMatch = salary * (matchableContributionPct / 100) * (employerMatchPct / 100);

      if (employeeContribution + employerMatch > TOTAL_LIMIT_2026) {
        employerMatch = Math.max(0, TOTAL_LIMIT_2026 - employeeContribution);
      }

      const growth = balance * (annualReturn / 100);
      balance = balance + growth + employeeContribution + employerMatch;

      totalContributions += employeeContribution;
      totalEmployerMatch += employerMatch;
      totalGrowth += growth;

      rows.push({ age, balance, contributions: totalContributions + totalEmployerMatch });

      salary = salary * (1 + salaryGrowth / 100);
    }

    return {
      rows,
      finalBalance: balance,
      totalContributions,
      totalEmployerMatch,
      totalGrowth,
      limitWasCapped,
    };
  }, [currentAge, retirementAge, currentBalance, annualSalary, contributionPct, employerMatchPct, employerMatchCapPct, annualReturn, salaryGrowth]);

  const content = (
    <>
      <Typography variant="h2">How this projection works</Typography>
      <Typography variant="body1">
        Each year, your contribution (a % of salary) and your employer&apos;s match are added to your balance,
        which then grows at your assumed annual return. Your salary grows each year by the rate you set, and
        your elective deferral is automatically capped at the current IRS limit — including catch-up
        contributions if you&apos;re 50+ (or the higher &quot;super catch-up&quot; for ages 60-63).
      </Typography>

      <Typography variant="h2">2026 IRS 401(k) limits</Typography>
      <Typography variant="body1">
        <strong>Employee elective deferral:</strong> {formatUSD(EMPLOYEE_LIMIT_2026)}<br />
        <strong>Catch-up (age 50+):</strong> additional {formatUSD(CATCHUP_50_PLUS)}<br />
        <strong>Super catch-up (age 60-63):</strong> additional {formatUSD(CATCHUP_60_TO_63)} instead of the standard catch-up<br />
        <strong>Combined employee + employer limit:</strong> {formatUSD(TOTAL_LIMIT_2026)}<br />
        Employer match does not count against your elective deferral limit, only the combined limit.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 30-year-old contributing 10% of a $70,000 salary, with a 50% employer match up to 6% of salary, could
        project a balance well over $500,000 by age 65 assuming steady 7% annual returns.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Deciding how much to contribute to capture your full employer match.</li>
          <li>Projecting retirement savings under different contribution rates or return assumptions.</li>
          <li>Understanding how catch-up contributions boost savings after age 50.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What return rate should I assume?</Typography>
      <Typography variant="body1">
        A diversified stock/bond portfolio has historically averaged roughly 6-8% annually over long horizons
        before inflation, though any single year can vary widely and past performance doesn&apos;t guarantee
        future results. This calculator does not adjust for inflation — treat the result as a nominal (not
        real/inflation-adjusted) future value.
      </Typography>
      <Typography variant="h3">Am I leaving money on the table?</Typography>
      <Typography variant="body1">
        If your contribution percentage is below your employer&apos;s match cap, you&apos;re giving up free
        money. Most financial advisors recommend contributing at least enough to capture the full employer match
        before directing savings elsewhere.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="401(k) Retirement Calculator"
      description="Project your 401(k) balance at retirement, including employer match and 2026 IRS contribution limits."
      url="/finance/401k-calculator"
      content={content}
      category="Finance"
    >
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 3 }}>
            <Box>
              <Typography gutterBottom>Current Age</Typography>
              <TextField
                fullWidth type="number" value={currentAge} onFocus={(e) => e.target.select()}
                onChange={(e) => setCurrentAge(e.target.value === '' ? 0 : Number(e.target.value))}
              />
            </Box>
            <Box>
              <Typography gutterBottom>Retirement Age</Typography>
              <TextField
                fullWidth type="number" value={retirementAge} onFocus={(e) => e.target.select()}
                onChange={(e) => setRetirementAge(e.target.value === '' ? 0 : Number(e.target.value))}
              />
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>Current 401(k) Balance</Typography>
            <TextField
              fullWidth type="number" value={currentBalance} onFocus={(e) => e.target.select()}
              onChange={(e) => setCurrentBalance(e.target.value === '' ? 0 : Number(e.target.value))}
              slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>Annual Salary</Typography>
            <TextField
              fullWidth type="number" value={annualSalary} onFocus={(e) => e.target.select()}
              onChange={(e) => setAnnualSalary(e.target.value === '' ? 0 : Number(e.target.value))}
              slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>Your Contribution ({contributionPct}% of salary)</Typography>
            <Slider
              value={contributionPct} min={0} max={50} step={1}
              onChange={(_, value) => setContributionPct(value as number)}
              valueLabelDisplay="auto"
            />
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 3 }}>
            <Box>
              <Typography gutterBottom>Employer Match</Typography>
              <TextField
                fullWidth type="number" value={employerMatchPct} onFocus={(e) => e.target.select()}
                onChange={(e) => setEmployerMatchPct(e.target.value === '' ? 0 : Number(e.target.value))}
                slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
              />
            </Box>
            <Box>
              <Typography gutterBottom>Match Cap (% of salary)</Typography>
              <TextField
                fullWidth type="number" value={employerMatchCapPct} onFocus={(e) => e.target.select()}
                onChange={(e) => setEmployerMatchCapPct(e.target.value === '' ? 0 : Number(e.target.value))}
                slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
              />
            </Box>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 3 }}>
            <Box>
              <Typography gutterBottom>Expected Annual Return</Typography>
              <TextField
                fullWidth type="number" value={annualReturn} onFocus={(e) => e.target.select()}
                onChange={(e) => setAnnualReturn(e.target.value === '' ? 0 : Number(e.target.value))}
                slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
              />
            </Box>
            <Box>
              <Typography gutterBottom>Annual Salary Growth</Typography>
              <TextField
                fullWidth type="number" value={salaryGrowth} onFocus={(e) => e.target.select()}
                onChange={(e) => setSalaryGrowth(e.target.value === '' ? 0 : Number(e.target.value))}
                slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
              />
            </Box>
          </Box>
        </Box>

        <Box>
          <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2, textAlign: 'center', height: '100%' }}>
            <Typography variant="h6" color="text.secondary">
              Projected Balance at Age {retirementAge}
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 3, color: 'primary.main' }}>
              {formatUSD(projection.finalBalance)}
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' }, gap: 2, mb: 3 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">Your Contributions</Typography>
                <Typography variant="h6">{formatUSD(projection.totalContributions)}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Employer Match</Typography>
                <Typography variant="h6">{formatUSD(projection.totalEmployerMatch)}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Growth</Typography>
                <Typography variant="h6">{formatUSD(projection.totalGrowth)}</Typography>
              </Box>
            </Box>

            {projection.limitWasCapped && (
              <Typography variant="caption" color="warning.main" sx={{ display: 'block', mb: 2 }}>
                Your contribution % exceeds the IRS elective deferral limit in some years — contributions were
                capped accordingly.
              </Typography>
            )}

            <Box sx={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={projection.rows} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1a56db" stopOpacity={0.6} />
                      <stop offset="95%" stopColor="#1a56db" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="age" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                  <RechartsTooltip formatter={(value: number) => formatUSD(value)} labelFormatter={(age) => `Age ${age}`} />
                  <Area type="monotone" dataKey="balance" stroke="#1a56db" fill="url(#balanceGradient)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default US401kCalculator;
