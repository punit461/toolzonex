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

const PSUCalculator = () => {
  const [basic, setBasic] = useState<string>('50000');
  const [daRate, setDaRate] = useState<string>('30');
  const [hraRate, setHraRate] = useState<string>('20');
  const [allowances, setAllowances] = useState<string>('5000');

  const { gross, da, hra, pf, esi, net } = useMemo(() => {
    const b = parseFloat(basic) || 0;
    const daV = b * (parseFloat(daRate) || 0) / 100;
    const hraV = b * (parseFloat(hraRate) || 0) / 100;
    const all = parseFloat(allowances) || 0;
    const g = b + daV + hraV + all;
    const pfV = b * 0.12;
    const esiV = g <= 21000 ? g * 0.0075 : 0;
    return {
      gross: Math.round(g),
      da: Math.round(daV),
      hra: Math.round(hraV),
      pf: Math.round(pfV),
      esi: Math.round(esiV),
      net: Math.round(g - pfV - esiV),
    };
  }, [basic, daRate, hraRate, allowances]);

  const content = (
    <>
      <Typography variant="h2">How to use?</Typography>
      <Typography variant="body1">
        Enter your basic pay, DA rate, HRA rate, and other allowances. The calculator
        computes gross pay, statutory deductions (PF at 12% of basic, ESI at 0.75% if
        gross ≤ ₹21,000), and your net take-home pay.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Basic ₹50,000 with 30% DA, 20% HRA, and ₹5,000 allowances: gross = ₹70,000,
        PF = ₹6,000, ESI = ₹0 (gross above ₹21,000), net ≈ ₹64,000.
      </Typography>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What is DA?</strong> Dearness Allowance is a cost-of-living adjustment, typically a percentage of basic pay.</li>
          <li><strong>Is ESI always deducted?</strong> No — ESI applies only when gross pay is at or below ₹21,000/month.</li>
        </ul>
      </Box>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating public sector salary in-hand pay.</li>
          <li>Comparing offer letters and revisions.</li>
          <li>Budgeting monthly income.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/finance/psu-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField label="Basic Pay" type="number" value={basic} onChange={(e) => setBasic(e.target.value)} fullWidth InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }} />
          <TextField label="DA Rate" type="number" value={daRate} onChange={(e) => setDaRate(e.target.value)} fullWidth InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }} />
          <TextField label="HRA Rate" type="number" value={hraRate} onChange={(e) => setHraRate(e.target.value)} fullWidth InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }} />
          <TextField label="Other Allowances" type="number" value={allowances} onChange={(e) => setAllowances(e.target.value)} fullWidth InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }} />
        </Box>
        <Box>
          <Typography variant="subtitle1" fontWeight="600" mb={2}>Result</Typography>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', bgcolor: 'primary.main', color: 'white', mb: 2 }}>
            <Typography variant="h6">Gross Pay</Typography>
            <Typography variant="h6" fontWeight="bold">₹{gross.toLocaleString()}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', bgcolor: 'action.hover', mb: 2 }}>
            <Typography variant="h6">PF + ESI</Typography>
            <Typography variant="h6" fontWeight="bold">₹{(pf + esi).toLocaleString()}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', bgcolor: 'secondary.main', color: 'white' }}>
            <Typography variant="h6">Net Pay</Typography>
            <Typography variant="h6" fontWeight="bold">₹{net.toLocaleString()}</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PSUCalculator;
