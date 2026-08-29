'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

const PropertyAppreciationCalculator = () => {
  const [currentValue, setCurrentValue] = useState('400000');
  const [appreciationRate, setAppreciationRate] = useState('4');
  const [years, setYears] = useState('10');

  const { futureValue, totalGain, yearlyRows } = useMemo(() => {
    const value = parseFloat(currentValue) || 0;
    const rate = (parseFloat(appreciationRate) || 0) / 100;
    const n = parseFloat(years) || 0;

    const future = value * Math.pow(1 + rate, n);
    const gain = future - value;

    const rows: { year: number; value: number }[] = [];
    const maxRows = Math.min(n, 30);
    for (let t = 1; t <= maxRows; t++) {
      rows.push({ year: t, value: value * Math.pow(1 + rate, t) });
    }

    return { futureValue: future, totalGain: gain, yearlyRows: rows };
  }, [currentValue, appreciationRate, years]);

  const content = (
    <>
      <Typography variant="h2">How Property Appreciation Is Calculated</Typography>
      <Typography variant="body1">
        This calculator projects a property&apos;s future value using compound growth: the current
        value grows by the expected annual appreciation rate every year, and each year&apos;s gain
        compounds on top of the previous year&apos;s higher value. Enter the current property value, an
        expected annual appreciation rate, and the number of years to see the projected future value.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Future Value = Current Value × (1 + Appreciation Rate)<sup>Years</sup>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A $400,000 property appreciating at 4% annually is worth roughly $592,000 after 10 years — a
        gain of about $192,000, driven by compounding rather than a flat 4%-per-year addition (which
        would only total $160,000 over the same period).
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Projecting how much home equity might grow over time from appreciation alone.</li>
          <li>Comparing different appreciation rate assumptions for a market or neighborhood.</li>
          <li>Estimating future sale value when planning a long-term hold versus a quicker flip.</li>
          <li>Modeling how appreciation contributes to overall real estate investment returns.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What appreciation rate should I use?</Typography>
      <Typography variant="body1">
        Historical long-term US home price appreciation has averaged roughly 3-5% annually, though this
        varies significantly by location, property type, and market cycle. Use local historical data or
        a conservative estimate if you&apos;re uncertain.
      </Typography>
      <Typography variant="h3">Is appreciation guaranteed?</Typography>
      <Typography variant="body1">
        No — property values can also decline, especially over shorter time horizons or during market
        downturns. This calculator shows a projection based on a constant assumed rate, not a
        guaranteed outcome.
      </Typography>
      <Typography variant="h3">Does this include renovations or capital improvements?</Typography>
      <Typography variant="body1">
        No — this projects appreciation from market forces on the property as-is. Renovations,
        additions, or major improvements can add value beyond what pure market appreciation would
        produce, and would need to be estimated separately.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/property-appreciation-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Current Property Value"
            type="number"
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Expected Annual Appreciation Rate"
            type="number"
            value={appreciationRate}
            onChange={(e) => setAppreciationRate(e.target.value)}
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
          />
          <TextField
            label="Number of Years"
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            fullWidth
          />
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Future Property Value</Typography>
            <Typography variant="h3" fontWeight="bold">{fmt(futureValue)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Total Appreciation Gain</Typography>
            <Typography fontWeight={600} color="success.main">{fmt(totalGain)}</Typography>
          </Paper>
        </Box>
      </Box>

      {yearlyRows.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" fontWeight={600} mb={1}>Year-by-Year Projection</Typography>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Year</TableCell>
                  <TableCell align="right">Projected Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {yearlyRows.map((row) => (
                  <TableRow key={row.year}>
                    <TableCell>{row.year}</TableCell>
                    <TableCell align="right">{fmt(row.value)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PropertyAppreciationCalculator;
