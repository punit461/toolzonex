'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const PipCalculatorContent = () => {
  const [lotSize, setLotSize] = useState<string>('standard');
  const [exchangeRate, setExchangeRate] = useState<string>('1.1000');
  const [isJpy, setIsJpy] = useState<boolean>(false);

  const rate = parseFloat(exchangeRate) || 1;
  const lotMultiplier = lotSize === 'standard' ? 100000 : lotSize === 'mini' ? 10000 : 1000;

  const pipSize = isJpy ? 0.01 : 0.0001;
  const pipValue = rate !== 0 ? (pipSize / rate) * lotMultiplier : 0;

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Lot Size</InputLabel>
          <Select value={lotSize} label="Lot Size" onChange={(e) => setLotSize(e.target.value)}>
            <MenuItem value="standard">Standard (100,000 units)</MenuItem>
            <MenuItem value="mini">Mini (10,000 units)</MenuItem>
            <MenuItem value="micro">Micro (1,000 units)</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Exchange Rate"
          type="number"
          value={exchangeRate}
          onChange={(e) => setExchangeRate(e.target.value)}
          fullWidth
          helperText="e.g. 1.1000 for EUR/USD"
        />

        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="subtitle2" mb={1}>Pair Type</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Paper
              onClick={() => setIsJpy(false)}
              sx={{ p: 1.5, flex: 1, cursor: 'pointer', bgcolor: !isJpy ? 'primary.main' : 'action.hover', color: !isJpy ? 'white' : 'text.primary', textAlign: 'center', border: '1px solid', borderColor: !isJpy ? 'primary.main' : 'divider' }}
            >
              <Typography variant="body2" fontWeight="bold">Non-JPY</Typography>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>Pip = 0.0001</Typography>
            </Paper>
            <Paper
              onClick={() => setIsJpy(true)}
              sx={{ p: 1.5, flex: 1, cursor: 'pointer', bgcolor: isJpy ? 'primary.main' : 'action.hover', color: isJpy ? 'white' : 'text.primary', textAlign: 'center', border: '1px solid', borderColor: isJpy ? 'primary.main' : 'divider' }}
            >
              <Typography variant="body2" fontWeight="bold">JPY Pair</Typography>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>Pip = 0.01</Typography>
            </Paper>
          </Box>
        </Paper>
      </Box>

      <Box>
        <Paper
          sx={{
            p: 4,
            bgcolor: 'primary.main',
            color: 'white',
            borderRadius: 4,
            minHeight: 250,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>Pip Value</Typography>
          <Typography variant="h3" fontWeight="bold">
            ${pipValue.toFixed(4)}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
            per pip per {lotSize} lot
          </Typography>
        </Paper>

        <Paper variant="outlined" sx={{ mt: 3, p: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace', mb: 1 }}>
            Formula: Pip Value = (Pip Size / Exchange Rate) × Lot Size
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
            ({pipSize} / {rate}) × {lotMultiplier.toLocaleString()} = ${pipValue.toFixed(4)}
          </Typography>
        </Paper>

        <Paper variant="outlined" sx={{ mt: 2, p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Position Size</Typography>
            <Typography variant="body2" fontWeight="bold">{lotMultiplier.toLocaleString()} units</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Pip Size</Typography>
            <Typography variant="body2" fontWeight="bold">{pipSize}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">Exchange Rate</Typography>
            <Typography variant="body2" fontWeight="bold">{rate}</Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

const PipCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How Does the Pip Calculator Work?</Typography>
      <Typography variant="body1">
        A pip is the smallest price move in a forex pair. The calculator determines the monetary value of one
        pip for a given lot size and exchange rate. For most currency pairs, one pip equals 0.0001. For
        JPY pairs (e.g. USD/JPY), one pip equals 0.01.
      </Typography>

      <Typography variant="h2">Formula</Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Pip Value = (Pip Size / Exchange Rate) × Position Size (in units)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        For EUR/USD at 1.1000 with a standard lot (100,000 units): Pip Value = (0.0001 / 1.1000) × 100,000 =
        $9.09 per pip. If the price moves 10 pips in your favor, that&apos;s a $90.90 gain.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Calculating risk per trade in forex trading.</li>
          <li>Determining position sizes based on stop-loss in pips.</li>
          <li>Understanding potential profit or loss before entering a trade.</li>
          <li>Comparing pip values across different currency pairs.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is a pip?</Typography>
      <Typography variant="body1">
        A pip stands for "percentage in point" and is the standard unit of price change in forex. For most
        pairs it is the fourth decimal place (0.0001), but for JPY pairs it is the second decimal place
        (0.01).
      </Typography>
      <Typography variant="h3">Does the pip value change?</Typography>
      <Typography variant="body1">
        Yes — the pip value in your account currency depends on the current exchange rate. As the rate moves,
        the pip value fluctuates slightly. This calculator uses a fixed rate you provide.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/pip-calculator" content={content}>
      <PipCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PipCalculator;
