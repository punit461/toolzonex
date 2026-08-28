'use client';

import { useState, useMemo } from 'react';
import {
  Box,
  TextField,
  Typography,
  Paper,
  InputAdornment,
} from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const ROICalculator = () => {
  const [initial, setInitial] = useState<string>('10000');
  const [finalValue, setFinalValue] = useState<string>('15000');
  const [years, setYears] = useState<string>('3');

  const { roi, annualized } = useMemo(() => {
    const init = parseFloat(initial) || 0;
    const fin = parseFloat(finalValue) || 0;
    const yrs = parseFloat(years) || 0;

    const calcRoi = init !== 0 ? ((fin - init) / init) * 100 : 0;
    let calcAnnual = 0;
    if (init > 0 && fin > 0 && yrs > 0) {
      calcAnnual = (Math.pow(fin / init, 1 / yrs) - 1) * 100;
    }
    return {
      roi: Math.round(calcRoi * 100) / 100,
      annualized: Math.round(calcAnnual * 100) / 100,
    };
  }, [initial, finalValue, years]);

  const content = (
    <>
      <Typography variant="h2">How to use?</Typography>
      <Typography variant="body1">
        Enter your initial investment, the final value of that investment, and the
        holding period in years. The calculator returns your total return on
        investment (ROI) and the annualized ROI (the equivalent yearly rate).
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Invest ₹10,000 and sell for ₹15,000 after 3 years. ROI = ((15000 − 10000) /
        10000) × 100 = 50%. The annualized ROI is roughly 14.47% per year.
      </Typography>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What is a good ROI?</strong> It depends on the asset and risk, but a positive ROI that beats a safe alternative (like a savings rate) is generally considered good.</li>
          <li><strong>Why annualized ROI?</strong> It normalizes returns over different time periods so investments of different lengths can be compared fairly.</li>
        </ul>
      </Box>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Compare the profitability of different investments.</li>
          <li>Evaluate business projects and marketing campaigns.</li>
          <li>Track portfolio performance over time.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/finance/roi-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Initial Investment"
            type="number"
            value={initial}
            onChange={(e) => setInitial(e.target.value)}
            fullWidth
            InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }}
          />
          <TextField
            label="Final Value"
            type="number"
            value={finalValue}
            onChange={(e) => setFinalValue(e.target.value)}
            fullWidth
            InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }}
          />
          <TextField
            label="Holding Period"
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            fullWidth
            InputProps={{ endAdornment: <InputAdornment position="end">Yr</InputAdornment> }}
          />
        </Box>
        <Box>
          <Typography variant="subtitle1" fontWeight="600" mb={2}>Result</Typography>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', bgcolor: 'primary.main', color: 'white', mb: 2 }}>
            <Typography variant="h6">Total ROI</Typography>
            <Typography variant="h6" fontWeight="bold">{roi}%</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', bgcolor: 'secondary.main', color: 'white' }}>
            <Typography variant="h6">Annualized ROI</Typography>
            <Typography variant="h6" fontWeight="bold">{annualized}%</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ROICalculator;
