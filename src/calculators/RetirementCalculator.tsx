'use client';

import { useState, useMemo, useEffect } from 'react';
import { Box, TextField, Typography, Slider, InputAdornment } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import CalculatorShell from '../components/CalculatorShell';

const RetirementCalculator = () => {
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(60);
  const [lifeExpectancy, setLifeExpectancy] = useState<number>(85);
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(50000);
  const [inflationRate, setInflationRate] = useState<number>(6);
  const [returnPreRetirement, setReturnPreRetirement] = useState<number>(12);
  const [returnPostRetirement, setReturnPostRetirement] = useState<number>(7);
  const [existingCorpus, setExistingCorpus] = useState<number>(500000);
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
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>Personal Details</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 4 }}>
            <Box>
              <Typography gutterBottom variant="body2">Current Age</Typography>
              <TextField
                fullWidth variant="outlined" type="number" size="small"
                value={currentAge} onChange={(e) => setCurrentAge(Number(e.target.value))}
              />
            </Box>
            <Box>
              <Typography gutterBottom variant="body2">Retirement Age</Typography>
              <TextField
                fullWidth variant="outlined" type="number" size="small"
                value={retirementAge} onChange={(e) => setRetirementAge(Number(e.target.value))}
              />
            </Box>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Current Monthly Expenses (₹)</Typography>
            <TextField
              fullWidth variant="outlined" type="number"
              value={monthlyExpenses} onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
              slotProps={{ input: { startAdornment: <InputAdornment position="start">₹</InputAdornment> } }}
            />
            <Slider value={monthlyExpenses} min={10000} max={500000} step={5000} onChange={(_, value) => setMonthlyExpenses(value as number)} sx={{ mt: 2 }} />
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Existing Savings / Corpus (₹)</Typography>
            <TextField
              fullWidth variant="outlined" type="number"
              value={existingCorpus} onChange={(e) => setExistingCorpus(Number(e.target.value))}
              slotProps={{ input: { startAdornment: <InputAdornment position="start">₹</InputAdornment> } }}
            />
          </Box>

          <Typography variant="h6" sx={{ mb: 3, mt: 5, fontWeight: 600 }}>Assumptions</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <Box>
              <Typography gutterBottom variant="body2">Inflation Rate (%)</Typography>
              <TextField fullWidth variant="outlined" type="number" size="small" value={inflationRate} onChange={(e) => setInflationRate(Number(e.target.value))} />
            </Box>
            <Box>
              <Typography gutterBottom variant="body2">Life Expectancy</Typography>
              <TextField fullWidth variant="outlined" type="number" size="small" value={lifeExpectancy} onChange={(e) => setLifeExpectancy(Number(e.target.value))} />
            </Box>
            <Box>
              <Typography gutterBottom variant="body2">Return (Pre-Retire) %</Typography>
              <TextField fullWidth variant="outlined" type="number" size="small" value={returnPreRetirement} onChange={(e) => setReturnPreRetirement(Number(e.target.value))} />
            </Box>
            <Box>
              <Typography gutterBottom variant="body2">Return (Post-Retire) %</Typography>
              <TextField fullWidth variant="outlined" type="number" size="small" value={returnPostRetirement} onChange={(e) => setReturnPostRetirement(Number(e.target.value))} />
            </Box>
          </Box>
        </Box>

        <Box>
          <Box sx={{ p: { xs: 2, sm: 4 }, bgcolor: '#f9f9f9', borderRadius: 2, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mb: 4, p: 3, bgcolor: '#fff', borderRadius: 2, border: '1px solid #E5E5E5' }}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.05em', mb: 1 }}>
                Retirement Corpus Needed
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 800, color: 'primary.main', mb: 3, fontSize: { xs: '2rem', sm: '2.5rem' } }}>
                ₹ {(corpusNeeded / 10000000).toFixed(2)} Cr
              </Typography>
              
              <Typography variant="subtitle2" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.05em', mb: 1, mt: 2 }}>
                Monthly SIP Required Now
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.main' }}>
                ₹ {monthlySavingsRequired.toLocaleString('en-IN')}
              </Typography>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 4, textAlign: 'left' }}>
              <Box sx={{ bgcolor: '#fff', p: 2, borderRadius: 1, border: '1px solid #E5E5E5' }}>
                <Typography variant="caption" color="text.secondary" display="block">Current Monthly Exp.</Typography>
                <Typography variant="body1" fontWeight={600}>₹ {monthlyExpenses.toLocaleString('en-IN')}</Typography>
              </Box>
              <Box sx={{ bgcolor: '#fff', p: 2, borderRadius: 1, border: '1px solid #E5E5E5' }}>
                <Typography variant="caption" color="text.secondary" display="block">Exp. at Retirement (inflated)</Typography>
                <Typography variant="body1" fontWeight={600}>₹ {futureExpenses.toLocaleString('en-IN')}</Typography>
              </Box>
            </Box>

            <Box sx={{ flexGrow: 1, height: 350, mt: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 2, textAlign: 'left' }}>Corpus Growth Projection</Typography>
              {isClient && (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="age" tickFormatter={(value) => `Age ${value}`} />
                    <YAxis tickFormatter={(value) => value >= 10000000 ? `${(value / 10000000).toFixed(1)}Cr` : `${(value / 100000).toFixed(0)}L`} />
                    <RechartsTooltip formatter={(value: any) => `₹ ${value.toLocaleString('en-IN')}`} labelFormatter={(value) => `Age ${value}`} />
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
    </CalculatorShell>
  );
};

export default RetirementCalculator;
