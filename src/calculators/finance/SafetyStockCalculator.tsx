'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const SafetyStockCalculatorContent = () => {
  const [maxDaily, setMaxDaily] = useState('120');
  const [avgDaily, setAvgDaily] = useState('100');
  const [maxLead, setMaxLead] = useState('12');
  const [avgLead, setAvgLead] = useState('9');

  const result = useMemo(() => {
    const maxD = parseFloat(maxDaily) || 0;
    const avgD = parseFloat(avgDaily) || 0;
    const maxL = parseFloat(maxLead) || 0;
    const avgL = parseFloat(avgLead) || 0;

    const safetyStock = (maxD * maxL) - (avgD * avgL);
    return { safetyStock };
  }, [maxDaily, avgDaily, maxLead, avgLead]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Maximum Daily Usage"
          type="number"
          value={maxDaily}
          onChange={(e) => setMaxDaily(e.target.value)}
          onFocus={(e) => e.target.select()}
          fullWidth
          slotProps={{ input: { endAdornment: <InputAdornment position="end">units / day</InputAdornment> } }}
        />
        <TextField
          label="Average Daily Usage"
          type="number"
          value={avgDaily}
          onChange={(e) => setAvgDaily(e.target.value)}
          onFocus={(e) => e.target.select()}
          fullWidth
          slotProps={{ input: { endAdornment: <InputAdornment position="end">units / day</InputAdornment> } }}
        />
        <TextField
          label="Maximum Lead Time"
          type="number"
          value={maxLead}
          onChange={(e) => setMaxLead(e.target.value)}
          onFocus={(e) => e.target.select()}
          fullWidth
          slotProps={{ input: { endAdornment: <InputAdornment position="end">days</InputAdornment> } }}
        />
        <TextField
          label="Average Lead Time"
          type="number"
          value={avgLead}
          onChange={(e) => setAvgLead(e.target.value)}
          onFocus={(e) => e.target.select()}
          fullWidth
          slotProps={{ input: { endAdornment: <InputAdornment position="end">days</InputAdornment> } }}
        />

        <Paper variant="outlined" sx={{ p: 2, bgcolor: 'action.hover' }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
            Safety Stock = (Max Daily × Max Lead Time) − (Avg Daily × Avg Lead Time)
          </Typography>
        </Paper>
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
        <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="body2">Safety Stock</Typography>
          <Typography variant="h3" fontWeight="bold">{Math.max(0, Math.round(result.safetyStock)).toLocaleString('en-US')} units</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

const SafetyStockCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How the Safety Stock Calculator Works</Typography>
      <Typography variant="body1">
        Safety stock is the extra buffer inventory kept on hand to protect against unexpected spikes in demand
        or delays in supplier lead time. Enter your maximum and average daily usage, and your maximum and
        average supplier lead time (in days), and this calculator applies the standard safety stock formula to
        estimate the buffer quantity you should hold.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Safety Stock = (Max Daily Usage × Max Lead Time) − (Avg Daily Usage × Avg Lead Time)
      </Box>
      <Typography variant="body1">
        This is a different question from the Economic Order Quantity (EOQ) — EOQ tells you the optimal size
        of a regular order to minimize ordering and holding costs, while safety stock tells you how much extra
        buffer inventory to hold on top of your regular cycle stock to avoid stockouts.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        With a maximum daily usage of 120 units, an average daily usage of 100 units, a maximum lead time of 12
        days, and an average lead time of 9 days: Safety Stock = (120 × 12) − (100 × 9) = 1,440 − 900 = 540
        units.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Setting reorder points that account for demand and lead-time variability.</li>
          <li>Reducing the risk of stockouts during supplier delays or demand spikes.</li>
          <li>Justifying buffer inventory levels to finance or operations stakeholders.</li>
          <li>Reviewing safety stock levels after a change in supplier reliability.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is safety stock different from the Economic Order Quantity (EOQ)?</Typography>
      <Typography variant="body1">
        EOQ answers &quot;how much should I order each time?&quot; to minimize total ordering and holding
        costs. Safety stock answers a different question — &quot;how much extra buffer should I hold?&quot; to
        protect against demand spikes and lead-time delays. Use our separate EOQ calculator to size your
        regular order quantity, and this tool to size your buffer on top of it.
      </Typography>
      <Typography variant="h3">What if my safety stock comes out negative?</Typography>
      <Typography variant="body1">
        A negative result means your maximum daily usage and lead time aren&apos;t much higher than your
        averages, implying little variability to buffer against. In practice, most businesses still hold at
        least a small buffer, so treat a negative or near-zero result as a signal that minimal safety stock is
        needed, rather than literally holding negative inventory.
      </Typography>
      <Typography variant="h3">Where do I get my &quot;maximum&quot; usage and lead time figures?</Typography>
      <Typography variant="body1">
        Look back at your historical sales and supplier delivery data over a recent period (such as the last 6-12
        months) and use the highest daily usage and longest lead time observed, alongside the averages over
        that same period, for a realistic buffer calculation.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/safety-stock-calculator" content={content}>
      <SafetyStockCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default SafetyStockCalculator;
