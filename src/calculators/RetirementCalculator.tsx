'use client';

import { useState, useMemo, useEffect } from 'react';
import { Box, TextField, Typography, Slider, InputAdornment, Select, MenuItem } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';
import { CURRENCIES, CurrencyCode, currencySymbol, formatMoney } from './currencyConfig';

const formatBigCurrency = (value: number, currency: CurrencyCode): string => {
  if (currency === 'INR') return `₹ ${(value / 10000000).toFixed(2)} Cr`;
  return formatMoney(value, currency);
};

const compactTick = (value: number, currency: CurrencyCode): string => {
  if (currency === 'INR') {
    return value >= 10000000 ? `${(value / 10000000).toFixed(1)}Cr` : `${(value / 100000).toFixed(0)}L`;
  }
  const symbol = currencySymbol(currency);
  return value >= 1000000 ? `${symbol}${(value / 1000000).toFixed(1)}M` : `${symbol}${(value / 1000).toFixed(0)}K`;
};

const RetirementCalculator = () => {
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(60);
  const [lifeExpectancy, setLifeExpectancy] = useState<number>(85);
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(50000);
  const [inflationRate, setInflationRate] = useState<number>(6);
  const [returnPreRetirement, setReturnPreRetirement] = useState<number>(12);
  const [returnPostRetirement, setReturnPostRetirement] = useState<number>(7);
  const [existingCorpus, setExistingCorpus] = useState<number>(500000);
  const [currency, setCurrency] = useState<CurrencyCode>('INR');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { corpusNeeded, monthlySavingsRequired, futureExpenses, chartData } = useMemo(() => {
    const yearsToRetire = retirementAge - currentAge;
    const yearsInRetirement = lifeExpectancy - retirementAge;
    
    if (yearsToRetire <= 0 || yearsInRetirement <= 0) {
      return { corpusNeeded: 0, monthlySavingsRequired: 0, futureExpenses: 0, chartData: [] };
    }

    // 1. Calculate future monthly expenses at retirement (accounting for inflation)
    const futureMonthlyExp = monthlyExpenses * Math.pow(1 + inflationRate / 100, yearsToRetire);
    
    // 2. Calculate inflation-adjusted return post-retirement
    const realReturn = ((1 + returnPostRetirement / 100) / (1 + inflationRate / 100)) - 1;
    const realReturnMonthly = realReturn / 12;
    const monthsInRetirement = yearsInRetirement * 12;

    // 3. Corpus needed at retirement
    let requiredCorpus = 0;
    if (realReturnMonthly === 0) {
      requiredCorpus = futureMonthlyExp * monthsInRetirement;
    } else {
      // Present value of annuity due formula
      requiredCorpus = futureMonthlyExp * ((1 - Math.pow(1 + realReturnMonthly, -monthsInRetirement)) / realReturnMonthly) * (1 + realReturnMonthly);
    }

    // 4. Future value of existing corpus
    const fvExistingCorpus = existingCorpus * Math.pow(1 + returnPreRetirement / 100, yearsToRetire);
    
    // 5. Shortfall to be met through SIP
    const shortfall = Math.max(0, requiredCorpus - fvExistingCorpus);
    
    // 6. Monthly SIP required to meet shortfall
    const monthlyReturnPre = returnPreRetirement / 12 / 100;
    const monthsToRetire = yearsToRetire * 12;
    
    let requiredSip = 0;
    if (shortfall > 0) {
      if (monthlyReturnPre === 0) {
        requiredSip = shortfall / monthsToRetire;
      } else {
        // Future value of annuity formula rearranged
        requiredSip = shortfall / (((Math.pow(1 + monthlyReturnPre, monthsToRetire) - 1) / monthlyReturnPre) * (1 + monthlyReturnPre));
      }
    }

    // Generate chart data for corpus growth
    const data = [];
    let currentBalance = existingCorpus;
    let totalInvestedSIP = 0;

    for (let year = 0; year <= yearsToRetire; year += Math.max(1, Math.floor(yearsToRetire / 10))) {
      const months = year * 12;
      
      // FV of initial investment after 'year' years
      const fvInitial = existingCorpus * Math.pow(1 + returnPreRetirement / 100, year);
      
      // FV of SIPs made over 'year' years
      let fvSip = 0;
      if (monthlyReturnPre > 0 && months > 0) {
        fvSip = requiredSip * (((Math.pow(1 + monthlyReturnPre, months) - 1) / monthlyReturnPre) * (1 + monthlyReturnPre));
      }
      
      const totalCorpusAtYear = fvInitial + fvSip;
      
      data.push({
        age: currentAge + year,
        'Expected Corpus': Math.round(totalCorpusAtYear),
        'Total Invested': Math.round(existingCorpus + (requiredSip * months))
      });
    }

    return {
      corpusNeeded: Math.round(requiredCorpus),
      monthlySavingsRequired: Math.round(requiredSip),
      futureExpenses: Math.round(futureMonthlyExp),
      chartData: data
    };
  }, [currentAge, retirementAge, lifeExpectancy, monthlyExpenses, inflationRate, returnPreRetirement, returnPostRetirement, existingCorpus]);

  const content = (
    <>
      <Typography variant="h2">How does the Retirement Calculator work?</Typography>
      <Typography variant="body1">
        Planning for retirement involves estimating how much your current expenses will cost in the future due to inflation, and then calculating the total corpus needed to sustain that lifestyle.
      </Typography>
      
      <Typography variant="h3">Key Factors:</Typography>
      <Typography variant="body1">
        <strong>Inflation:</strong> The silent wealth killer. At 6% inflation, expenses double roughly every 12 years.<br />
        <strong>Pre-Retirement Returns:</strong> The growth rate of your investments while you are earning (e.g., Equity Mutual Funds typically target 10-12%).<br />
        <strong>Post-Retirement Returns:</strong> Once retired, you should shift to safer assets (Debt funds, FDs, SCSS) which typically yield 6-8%.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 30-year-old planning to retire at 60, with current monthly expenses of ₹40,000 and 6% inflation,
        would need a retirement corpus well over ₹3 crore to sustain a similar lifestyle for 25+ years post-retirement.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating the retirement corpus you&apos;ll need based on your current expenses.</li>
          <li>Figuring out how much to invest monthly to reach that corpus by your target retirement age.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How do I calculate when I can retire?</Typography>
      <Typography variant="body1">
        Enter your current age, target retirement age, and current monthly expenses above — the calculator
        projects the corpus you&apos;ll need at that retirement age (after inflation) and the monthly SIP
        required to reach it from your existing savings. If the required SIP looks unaffordable, try a later
        retirement age or lower projected expenses to see when the plan becomes realistic for you.
      </Typography>
      <Typography variant="h3">How do I calculate my retirement needs?</Typography>
      <Typography variant="body1">
        Retirement needs are calculated by inflating your current monthly expenses forward to your retirement
        age, then working out how large a corpus is needed so that money (invested at a safer post-retirement
        return) can cover those inflated expenses for the rest of your expected lifespan. This tool runs that
        calculation automatically from the inputs above — see &quot;Exp. at Retirement (inflated)&quot; and
        &quot;Retirement Corpus Needed&quot; in the results.
      </Typography>
      <Typography variant="h3">How much money do I need to retire?</Typography>
      <Typography variant="body1">
        It depends on your current expenses, years left until retirement, inflation, and how long retirement
        needs to last — there&apos;s no single number that applies to everyone. Use the &quot;Retirement Corpus
        Needed&quot; figure above as your personalized estimate based on the details you enter.
      </Typography>
      <Typography variant="h3">Why does inflation matter so much for retirement planning?</Typography>
      <Typography variant="body1">
        Because your retirement corpus needs to last decades, even moderate inflation compounds significantly
        — at 6% inflation, an expense that costs ₹40,000 today will cost roughly ₹80,000 in 12 years.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Retirement Calculator"
      description="Calculate the exact corpus you need to retire and how much you need to save every month."
      url="/finance/retirement-calculator"
      content={content}
      category="Finance"
    >
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>Personal Details</Typography>
            <Select
              size="small"
              value={currency}
              onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
              sx={{ minWidth: 110 }}
            >
              {CURRENCIES.map((c) => (
                <MenuItem key={c.value} value={c.value}>{c.value}</MenuItem>
              ))}
            </Select>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 4 }}>
            <Box>
              <Typography gutterBottom variant="body2">Current Age</Typography>
              <TextField
                fullWidth variant="outlined" type="number" size="small"
                value={Number.isNaN(currentAge) ? '' : currentAge} onChange={(e) => setCurrentAge(e.target.value === '' ? NaN : Number(e.target.value))}
              />
            </Box>
            <Box>
              <Typography gutterBottom variant="body2">Retirement Age</Typography>
              <TextField
                fullWidth variant="outlined" type="number" size="small"
                value={Number.isNaN(retirementAge) ? '' : retirementAge} onChange={(e) => setRetirementAge(e.target.value === '' ? NaN : Number(e.target.value))}
              />
            </Box>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Current Monthly Expenses</Typography>
            <TextField
              fullWidth variant="outlined" type="number"
              value={Number.isNaN(monthlyExpenses) ? '' : monthlyExpenses} onChange={(e) => setMonthlyExpenses(e.target.value === '' ? NaN : Number(e.target.value))}
              slotProps={{ input: { startAdornment: <InputAdornment position="start">{currencySymbol(currency)}</InputAdornment> } }}
            />
            <Slider value={Number.isNaN(monthlyExpenses) ? 0 : monthlyExpenses} min={10000} max={500000} step={5000} onChange={(_, value) => setMonthlyExpenses(value as number)} sx={{ mt: 2 }} />
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Existing Savings / Corpus</Typography>
            <TextField
              fullWidth variant="outlined" type="number"
              value={Number.isNaN(existingCorpus) ? '' : existingCorpus} onChange={(e) => setExistingCorpus(e.target.value === '' ? NaN : Number(e.target.value))}
              slotProps={{ input: { startAdornment: <InputAdornment position="start">{currencySymbol(currency)}</InputAdornment> } }}
            />
          </Box>

          <Typography variant="h6" sx={{ mb: 3, mt: 5, fontWeight: 600 }}>Assumptions</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <Box>
              <Typography gutterBottom variant="body2">Inflation Rate (%)</Typography>
              <TextField fullWidth variant="outlined" type="number" size="small" value={Number.isNaN(inflationRate) ? '' : inflationRate} onChange={(e) => setInflationRate(e.target.value === '' ? NaN : Number(e.target.value))} />
            </Box>
            <Box>
              <Typography gutterBottom variant="body2">Life Expectancy</Typography>
              <TextField fullWidth variant="outlined" type="number" size="small" value={Number.isNaN(lifeExpectancy) ? '' : lifeExpectancy} onChange={(e) => setLifeExpectancy(e.target.value === '' ? NaN : Number(e.target.value))} />
            </Box>
            <Box>
              <Typography gutterBottom variant="body2">Return (Pre-Retire) %</Typography>
              <TextField fullWidth variant="outlined" type="number" size="small" value={Number.isNaN(returnPreRetirement) ? '' : returnPreRetirement} onChange={(e) => setReturnPreRetirement(e.target.value === '' ? NaN : Number(e.target.value))} />
            </Box>
            <Box>
              <Typography gutterBottom variant="body2">Return (Post-Retire) %</Typography>
              <TextField fullWidth variant="outlined" type="number" size="small" value={Number.isNaN(returnPostRetirement) ? '' : returnPostRetirement} onChange={(e) => setReturnPostRetirement(e.target.value === '' ? NaN : Number(e.target.value))} />
            </Box>
          </Box>
        </Box>

        <Box>
          <Box sx={{ p: { xs: 2, sm: 4 }, bgcolor: 'action.hover', borderRadius: 2, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mb: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2, border: '1px solid' }}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.05em', mb: 1 }}>
                Retirement Corpus Needed
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 800, color: 'primary.main', mb: 3, fontSize: { xs: '2rem', sm: '2.5rem' } }}>
                {formatBigCurrency(corpusNeeded, currency)}
              </Typography>

              <Typography variant="subtitle2" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.05em', mb: 1, mt: 2 }}>
                Monthly SIP Required Now
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.main' }}>
                {formatMoney(monthlySavingsRequired, currency)}
              </Typography>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 4, textAlign: 'left' }}>
              <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1, border: '1px solid' }}>
                <Typography variant="caption" color="text.secondary" display="block">Current Monthly Exp.</Typography>
                <Typography variant="body1" fontWeight={600}>{formatMoney(monthlyExpenses, currency)}</Typography>
              </Box>
              <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1, border: '1px solid' }}>
                <Typography variant="caption" color="text.secondary" display="block">Exp. at Retirement (inflated)</Typography>
                <Typography variant="body1" fontWeight={600}>{formatMoney(futureExpenses, currency)}</Typography>
              </Box>
            </Box>

            <Box sx={{ flexGrow: 1, height: 350, mt: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 2, textAlign: 'left' }}>Corpus Growth Projection</Typography>
              {isClient && (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="age" tickFormatter={(value) => `Age ${value}`} />
                    <YAxis tickFormatter={(value) => compactTick(value, currency)} />
                    <RechartsTooltip formatter={(value: any) => formatMoney(value, currency)} labelFormatter={(value) => `Age ${value}`} />
                    <Legend />
                    <Line type="monotone" dataKey="Expected Corpus" stroke="#1a56db" strokeWidth={3} dot={false} />
                    <Line type="monotone" dataKey="Total Invested" stroke="#71717A" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RetirementCalculator;
