'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const fmt = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

const PresentValueCalculator = () => {
  const [fv, setFv] = useState('100000');
  const [rate, setRate] = useState('5');
  const [years, setYears] = useState('10');

  const result = useMemo(() => {
    const futureVal = parseFloat(fv) || 0;
    const r = (parseFloat(rate) || 0) / 100;
    const n = parseFloat(years) || 0;
    const pv = n > 0 ? futureVal / Math.pow(1 + r, n) : futureVal;
    const totalDiscount = futureVal - pv;
    const effectiveRate = r > 0 ? (Math.pow(1 + r, n) - 1) * 100 : 0;

    const yearly: { year: number; pv: number; discounted: number }[] = [];
    for (let i = 1; i <= Math.min(n, 50); i++) {
      const yearPv = futureVal / Math.pow(1 + r, i);
      yearly.push({ year: i, pv: yearPv, discounted: futureVal - yearPv });
    }

    return { pv, totalDiscount, effectiveRate, yearly };
  }, [fv, rate, years]);

  const content = (
    <>
      <Typography variant="h2">How is Present Value Calculated?</Typography>
      <Typography variant="body1">
        Present value (PV) tells you what a future sum of money is worth today, given a specified discount rate. It discounts future cash flows back to the present using the time value of money.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        PV = FV / (1 + r)^n
        <br />
        Where FV = future value, r = discount rate, n = number of years
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        $100,000 received 10 years from now is worth about $61,391 today at a 5% discount rate. The total discount is $38,609, reflecting the time value of money.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Evaluating investment opportunities and business projects.</li>
          <li>Comparing lottery payout options (lump sum vs. annuity).</li>
          <li>Valuing bonds and fixed-income securities.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What discount rate should I use?</Typography>
      <Typography variant="body1">
        Use your required rate of return or the opportunity cost of capital. A higher discount rate results in a lower present value.
      </Typography>
      <Typography variant="h3">What is the relationship between PV and interest rates?</Typography>
      <Typography variant="body1">
        Present value is inversely related to the discount rate. As rates rise, the present value of future money falls, and vice versa.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/present-value-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField label="Future Value" type="number" value={fv} onChange={(e) => setFv(e.target.value)} slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }} fullWidth />
          <TextField label="Discount Rate" type="number" value={rate} onChange={(e) => setRate(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }} fullWidth />
          <TextField label="Number of Years" type="number" value={years} onChange={(e) => setYears(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">Years</InputAdornment> } }} fullWidth />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Present Value</Typography>
            <Typography variant="h3" fontWeight="bold">{fmt(result.pv)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Total Discount</Typography>
            <Typography fontWeight={600} color="error.main">{fmt(result.totalDiscount)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Effective Total Rate</Typography>
            <Typography fontWeight={600}>{result.effectiveRate.toFixed(2)}%</Typography>
          </Paper>
        </Box>
      </Box>

      {result.yearly.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" fontWeight={600} mb={1}>Year-by-Year Discounting</Typography>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Year</TableCell>
                  <TableCell align="right">Present Value</TableCell>
                  <TableCell align="right">Discounted</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {result.yearly.map((row) => (
                  <TableRow key={row.year}>
                    <TableCell>{row.year}</TableCell>
                    <TableCell align="right">{fmt(row.pv)}</TableCell>
                    <TableCell align="right" sx={{ color: 'error.main' }}>{fmt(row.discounted)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      <Box sx={{ mt: 4 }}>
        <AdSenseUnit />
      </Box>
    </CalculatorShell>
  );
};

export default PresentValueCalculator;
