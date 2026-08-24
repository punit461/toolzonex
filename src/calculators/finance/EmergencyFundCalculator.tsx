'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Slider, InputAdornment, Select, MenuItem } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { CURRENCIES, CurrencyCode, currencySymbol, formatMoney } from '../currencyConfig';

const EmergencyFundCalculator = () => {
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(50000);
  const [coverageMonths, setCoverageMonths] = useState<number>(6);
  const [currentSavings, setCurrentSavings] = useState<number>(0);
  const [goalMonths, setGoalMonths] = useState<number>(12);
  const [currency, setCurrency] = useState<CurrencyCode>('INR');

  const { targetAmount, shortfall, suggestedMonthlySavings } = useMemo(() => {
    const target = Math.max(0, monthlyExpenses) * Math.max(0, coverageMonths);
    const gap = Math.max(0, target - Math.max(0, currentSavings));
    const monthly = goalMonths > 0 ? gap / goalMonths : 0;

    return {
      targetAmount: Math.round(target),
      shortfall: Math.round(gap),
      suggestedMonthlySavings: Math.round(monthly),
    };
  }, [monthlyExpenses, coverageMonths, currentSavings, goalMonths]);

  const content = (
    <>
      <Typography variant="h2">How much should you keep in an emergency fund?</Typography>
      <Typography variant="body1">
        An emergency fund is cash set aside to cover essential living costs — rent, groceries, utilities, loan
        payments — if you lose your income unexpectedly. Most financial planners suggest saving 3-6 months of
        expenses if you have stable, salaried income with a second earner in the household, and 6-12 months if
        your income is variable (freelance, commission, business ownership) or you&apos;re the sole earner.
      </Typography>

      <Typography variant="h2">How this calculator works</Typography>
      <Typography variant="body1">
        Enter your average monthly essential expenses and how many months of coverage you want. The calculator
        multiplies the two to get your target fund size, then — if you already have some savings set aside —
        works out how much you&apos;d need to save each month to close the gap within your chosen timeframe.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Target Fund = Monthly Expenses × Coverage Months
        <br />
        Monthly Savings Needed = (Target − Current Savings) ÷ Months to Goal
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        If your essential monthly expenses are ₹50,000 and you want 6 months of coverage, your target emergency
        fund is ₹3,00,000. If you already have ₹50,000 saved and want to close the remaining ₹2,50,000 gap within
        12 months, you&apos;d need to save roughly ₹20,833 per month.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Figuring out how large your safety net should be before investing surplus cash elsewhere.</li>
          <li>Setting a concrete monthly savings target to build (or rebuild) a fund after an emergency.</li>
          <li>Deciding whether 3, 6, or 12 months of coverage fits your job stability and household situation.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How many months of expenses should I save?</Typography>
      <Typography variant="body1">
        3-6 months is the standard guideline for dual-income households with stable jobs. If you&apos;re
        self-employed, work on commission, are the sole income earner, or work in an industry prone to layoffs,
        aim higher — 6-12 months gives you a longer runway to find new income without touching long-term
        investments or going into debt.
      </Typography>
      <Typography variant="h3">Where should I keep my emergency fund?</Typography>
      <Typography variant="body1">
        Keep it somewhere safe and easy to access on short notice — a high-yield savings account or a liquid/
        short-duration fund — rather than in stocks or locked-in fixed deposits. The goal is availability when
        you need it, not maximum returns.
      </Typography>
      <Typography variant="h3">Does this calculator count only essential expenses?</Typography>
      <Typography variant="body1">
        It should. Base the &quot;Monthly Expenses&quot; field on rent/EMI, groceries, utilities, insurance, and
        minimum debt payments — the costs you&apos;d still have to cover with no income — rather than your full
        monthly spending including discretionary items.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/emergency-fund-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography gutterBottom>Monthly Essential Expenses</Typography>
              <Select
                size="small"
                value={currency}
                onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                sx={{ minWidth: 110, mb: 1 }}
              >
                {CURRENCIES.map((c) => (
                  <MenuItem key={c.value} value={c.value}>{c.value}</MenuItem>
                ))}
              </Select>
            </Box>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              onFocus={(e) => e.target.select()}
              value={Number.isNaN(monthlyExpenses) ? '' : monthlyExpenses}
              onChange={(e) => setMonthlyExpenses(e.target.value === '' ? NaN : Number(e.target.value))}
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start">{currencySymbol(currency)}</InputAdornment>,
                }
              }}
            />
            <Slider
              value={Number.isNaN(monthlyExpenses) ? 0 : monthlyExpenses}
              min={5000}
              max={300000}
              step={1000}
              onChange={(_, value) => setMonthlyExpenses(value as number)}
              sx={{ mt: 2 }}
            />
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Coverage Months</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              onFocus={(e) => e.target.select()}
              value={Number.isNaN(coverageMonths) ? '' : coverageMonths}
              onChange={(e) => setCoverageMonths(e.target.value === '' ? NaN : Number(e.target.value))}
              slotProps={{
                input: {
                  endAdornment: <InputAdornment position="end">months</InputAdornment>,
                }
              }}
            />
            <Slider
              value={Number.isNaN(coverageMonths) ? 0 : coverageMonths}
              min={3}
              max={12}
              step={1}
              onChange={(_, value) => setCoverageMonths(value as number)}
              sx={{ mt: 2 }}
            />
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Current Emergency Savings</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              onFocus={(e) => e.target.select()}
              value={Number.isNaN(currentSavings) ? '' : currentSavings}
              onChange={(e) => setCurrentSavings(e.target.value === '' ? NaN : Number(e.target.value))}
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start">{currencySymbol(currency)}</InputAdornment>,
                }
              }}
            />
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Months to Reach Goal</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              onFocus={(e) => e.target.select()}
              value={Number.isNaN(goalMonths) ? '' : goalMonths}
              onChange={(e) => setGoalMonths(e.target.value === '' ? NaN : Number(e.target.value))}
              slotProps={{
                input: {
                  endAdornment: <InputAdornment position="end">months</InputAdornment>,
                }
              }}
            />
            <Slider
              value={Number.isNaN(goalMonths) ? 0 : goalMonths}
              min={1}
              max={36}
              step={1}
              onChange={(_, value) => setGoalMonths(value as number)}
              sx={{ mt: 2 }}
            />
          </Box>
        </Box>

        <Box>
          <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2, textAlign: 'center', height: '100%' }}>
            <Typography variant="h6" color="text.secondary">Target Emergency Fund</Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 4, color: 'primary.main' }}>
              {formatMoney(targetAmount, currency)}
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">Remaining Gap</Typography>
                <Typography variant="h6">{formatMoney(shortfall, currency)}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Suggested Monthly Savings</Typography>
                <Typography variant="h6">{formatMoney(suggestedMonthlySavings, currency)}</Typography>
              </Box>
            </Box>
            <Typography variant="caption" color="text.secondary">
              to close the gap in {goalMonths || 0} months
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default EmergencyFundCalculator;
