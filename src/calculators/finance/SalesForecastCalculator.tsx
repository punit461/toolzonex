'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) =>
  `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const MAX_PERIODS = 12;

const SalesForecastCalculator = () => {
  const [currentSales, setCurrentSales] = useState('50000');
  const [growthRate, setGrowthRate] = useState('5');
  const [periods, setPeriods] = useState('6');

  const result = useMemo(() => {
    const sales = parseFloat(currentSales) || 0;
    const rate = (parseFloat(growthRate) || 0) / 100;
    const n = Math.min(MAX_PERIODS, Math.max(1, Math.round(parseFloat(periods) || 0)));

    const rows = Array.from({ length: n }, (_, i) => {
      const period = i + 1;
      const forecast = sales * Math.pow(1 + rate, period);
      return { period, forecast };
    });

    return { rows, n, finalForecast: rows.length ? rows[rows.length - 1].forecast : 0 };
  }, [currentSales, growthRate, periods]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Sales Forecast Calculator</Typography>
      <Typography variant="body1">
        Enter your current period&apos;s sales, an expected growth rate per period, and how many future periods
        you want to project. The calculator compounds the growth rate period over period, the same way revenue
        actually compounds when it grows at a steady rate — each period&apos;s forecast builds on the previous
        period&apos;s forecast rather than always growing off the original starting figure.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Forecast (Period n) = Current Sales × (1 + Growth Rate) ^ n
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        If current sales are $50,000 and you expect 5% growth per period, period 1 forecasts to
        $50,000 × 1.05 = $52,500, period 2 forecasts to $50,000 × 1.05² = $55,125, and so on — each period
        compounding on the last.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Projecting next quarter&apos;s or next year&apos;s revenue for a budget or investor update.</li>
          <li>Modeling how a change in growth rate compounds over several periods.</li>
          <li>Setting realistic sales targets for a team based on historical growth trends.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does this assume growth stays constant every period?</strong> Yes — this is a simple compounding model that applies the same growth rate to every future period. Real sales growth fluctuates with seasonality, market conditions, and competition, so treat this as a baseline scenario rather than a guarantee.</li>
          <li><strong>What period length should I use?</strong> Whatever fits your planning horizon — months, quarters, or years all work, as long as the growth rate you enter matches that same period length.</li>
          <li><strong>Can I model a declining forecast?</strong> Yes — enter a negative growth rate to project a decline instead of growth; the same compounding formula applies in either direction.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/finance/sales-forecast-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Current Period Sales" type="number" value={currentSales}
            onChange={(e) => setCurrentSales(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Expected Growth Rate Per Period" type="number" value={growthRate}
            onChange={(e) => setGrowthRate(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
          />
          <TextField
            label="Number of Future Periods" type="number" value={periods}
            onChange={(e) => setPeriods(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth helperText={`Capped at ${MAX_PERIODS} periods`}
          />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Forecast</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Sales at Period {result.n}</Typography>
            <Typography variant="h4" fontWeight="bold">{money(result.finalForecast)}</Typography>
          </Paper>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Period</TableCell>
                  <TableCell align="right">Forecasted Sales</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {result.rows.map((row) => (
                  <TableRow key={row.period}>
                    <TableCell>{row.period}</TableCell>
                    <TableCell align="right">{money(row.forecast)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default SalesForecastCalculator;
