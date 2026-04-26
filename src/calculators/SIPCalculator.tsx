import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Slider, InputAdornment } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import CalculatorShell from '../components/CalculatorShell';

const SIPCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(5000);
  const [expectedReturnRate, setExpectedReturnRate] = useState<number>(12);
  const [timePeriod, setTimePeriod] = useState<number>(10);

  const { investedAmount, estimatedReturns, totalValue, chartData } = useMemo(() => {
    let currentInvested = 0;
    let currentValue = 0;
    const monthlyRate = expectedReturnRate / 12 / 100;
    const months = timePeriod * 12;
    const data = [];

    for (let i = 1; i <= months; i++) {
      currentInvested += monthlyInvestment;
      currentValue = (currentValue + monthlyInvestment) * (1 + monthlyRate);
      
      if (i % 12 === 0) {
        data.push({
          year: `Year ${i / 12}`,
          Invested: Math.round(currentInvested),
          Returns: Math.round(currentValue - currentInvested),
        });
      }
    }

    return {
      investedAmount: currentInvested,
      estimatedReturns: Math.round(currentValue - currentInvested),
      totalValue: Math.round(currentValue),
      chartData: data,
    };
  }, [monthlyInvestment, expectedReturnRate, timePeriod]);

  const content = (
    <>
      <Typography variant="h2">What is a SIP?</Typography>
      <Typography variant="body1">
        A Systematic Investment Plan (SIP) is a disciplined way of investing in mutual funds. It allows you to invest a fixed amount regularly (e.g., monthly) instead of making a lump-sum investment.
      </Typography>

      <Typography variant="h2">Power of Compounding</Typography>
      <Typography variant="body1">
        SIPs benefit from the power of compounding. The returns you earn on your investment generate further returns over time, accelerating the growth of your wealth.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="SIP Calculator"
      description="Estimate the future value of your Systematic Investment Plan."
      url="/finance/sip-calculator"
      content={content}
    >
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Monthly Investment (₹)</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              onFocus={(e) => e.target.select()}
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }
              }}
            />
            <Slider
              value={monthlyInvestment}
              min={500}
              max={100000}
              step={500}
              onChange={(_, value) => setMonthlyInvestment(value as number)}
              sx={{ mt: 2 }}
            />
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Expected Return Rate (% p.a.)</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              onFocus={(e) => e.target.select()}
              value={expectedReturnRate}
              onChange={(e) => setExpectedReturnRate(Number(e.target.value))}
              slotProps={{
                input: {
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }
              }}
            />
            <Slider
              value={expectedReturnRate}
              min={1}
              max={30}
              step={0.5}
              onChange={(_, value) => setExpectedReturnRate(value as number)}
              sx={{ mt: 2 }}
            />
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Time Period (Years)</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              onFocus={(e) => e.target.select()}
              value={timePeriod}
              onChange={(e) => setTimePeriod(Number(e.target.value))}
              slotProps={{
                input: {
                  endAdornment: <InputAdornment position="end">Yr</InputAdornment>,
                }
              }}
            />
            <Slider
              value={timePeriod}
              min={1}
              max={40}
              step={1}
              onChange={(_, value) => setTimePeriod(value as number)}
              sx={{ mt: 2 }}
            />
          </Box>
        </Box>

        <Box>
          <Box sx={{ p: 4, bgcolor: '#f9f9f9', borderRadius: 2, textAlign: 'center', height: '100%' }}>
            <Typography variant="h6" color="text.secondary">Total Value</Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 4, color: 'primary.main' }}>
              ₹ {totalValue.toLocaleString('en-IN')}
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 4 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">Invested Amount</Typography>
                <Typography variant="h6">₹ {investedAmount.toLocaleString('en-IN')}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Est. Returns</Typography>
                <Typography variant="h6">₹ {estimatedReturns.toLocaleString('en-IN')}</Typography>
              </Box>
            </Box>

            <Box sx={{ height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="year" hide />
                  <YAxis hide />
                  <RechartsTooltip formatter={(value: any) => `₹ ${value.toLocaleString('en-IN')}`} />
                  <Legend />
                  <Bar dataKey="Invested" stackId="a" fill="#171717" />
                  <Bar dataKey="Returns" stackId="a" fill="#D4AF37" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        </Box>
      </Box>
    </CalculatorShell>
  );
};

export default SIPCalculator;
