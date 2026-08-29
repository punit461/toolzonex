'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const InventoryDaysCalculatorContent = () => {
  const [avgInventory, setAvgInventory] = useState('50000');
  const [cogs, setCogs] = useState('400000');

  const result = useMemo(() => {
    const inv = parseFloat(avgInventory) || 0;
    const c = parseFloat(cogs) || 0;
    const dio = c > 0 ? (inv / c) * 365 : 0;
    const turnover = inv > 0 ? c / inv : 0;
    return { dio, turnover };
  }, [avgInventory, cogs]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Average Inventory Value"
          type="number"
          value={avgInventory}
          onChange={(e) => setAvgInventory(e.target.value)}
          fullWidth
          slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
        />
        <TextField
          label="Cost of Goods Sold (Annual)"
          type="number"
          value={cogs}
          onChange={(e) => setCogs(e.target.value)}
          fullWidth
          slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
        />

        <Paper variant="outlined" sx={{ p: 2, bgcolor: 'action.hover' }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
            DIO = (Average Inventory / COGS) × 365
          </Typography>
        </Paper>
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
        <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="body2">Days Inventory Outstanding</Typography>
          <Typography variant="h3" fontWeight="bold">{result.dio.toFixed(1)} days</Typography>
        </Paper>
        <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Inventory Turnover Ratio</Typography>
          <Typography fontWeight={600}>{result.turnover.toFixed(2)}x / year</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

const InventoryDaysCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How Does the Inventory Days Calculator Work?</Typography>
      <Typography variant="body1">
        Days Inventory Outstanding (DIO) measures the average number of days a company holds inventory
        before selling it. Enter your average inventory value (typically the average of beginning and
        ending inventory for the period) and your annual cost of goods sold (COGS). The calculator
        divides average inventory by COGS and multiplies by 365 days to get DIO, and also shows the
        inventory turnover ratio — how many times inventory is sold and replaced over the year.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A company with $50,000 in average inventory and $400,000 in annual COGS has a DIO of (50,000 /
        400,000) × 365 ≈ 45.6 days — meaning inventory sits for about 45-46 days on average before
        being sold. That corresponds to an inventory turnover ratio of 8x per year.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Assessing how efficiently a business manages its inventory compared to industry peers.</li>
          <li>Spotting a slowdown in sales velocity before it shows up elsewhere in the financials.</li>
          <li>Evaluating a company as part of the cash conversion cycle alongside receivables and payables days.</li>
          <li>Comparing DIO trends quarter over quarter to catch a build-up of unsold stock.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is a lower or higher DIO better?</Typography>
      <Typography variant="body1">
        Generally, a lower DIO is better — it means inventory converts to sales faster, tying up less
        cash. However, an extremely low DIO can also signal understocking and lost sales from stockouts,
        so it&apos;s best interpreted against industry norms and the company&apos;s own history.
      </Typography>
      <Typography variant="h3">How is DIO related to inventory turnover?</Typography>
      <Typography variant="body1">
        They&apos;re inverses of the same idea expressed on different scales: turnover ratio = COGS ÷
        average inventory (times per year), while DIO = 365 ÷ turnover ratio (days per cycle). A
        turnover of 8x per year corresponds to a DIO of about 45.6 days.
      </Typography>
      <Typography variant="h3">Why use average inventory instead of ending inventory?</Typography>
      <Typography variant="body1">
        Average inventory (typically beginning plus ending balance divided by two) smooths out seasonal
        swings and point-in-time snapshots, giving a more representative figure for the period than a
        single ending balance that might be unusually high or low.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/inventory-days-calculator" content={content}>
      <InventoryDaysCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default InventoryDaysCalculator;
