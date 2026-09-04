'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const InventoryTurnoverCalculator = () => {
  const [cogs, setCogs] = useState('500000');
  const [avgInventory, setAvgInventory] = useState('100000');

  const { turnover, daysInventory } = useMemo(() => {
    const c = parseFloat(cogs) || 0;
    const inv = parseFloat(avgInventory) || 0;
    if (inv <= 0) return { turnover: null, daysInventory: null };
    const t = c / inv;
    return { turnover: t, daysInventory: t > 0 ? 365 / t : null };
  }, [cogs, avgInventory]);

  const content = (
    <>
      <Typography variant="h2">How Inventory Turnover Is Calculated</Typography>
      <Typography variant="body1">
        Inventory turnover measures how many times a business sells and replaces its inventory over a given
        period. Enter your cost of goods sold (COGS) for the period and your average inventory value over that
        same period to calculate the ratio.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Inventory Turnover = COGS ÷ Average Inventory
      </Box>
      <Typography variant="body1">
        Average inventory is typically calculated as (beginning inventory + ending inventory) ÷ 2 for the
        period. The calculator also shows Days Inventory Outstanding (365 ÷ Turnover), which estimates how many
        days, on average, inventory sits before it&apos;s sold.
      </Typography>

      <Typography variant="h2">What Counts as a &quot;Good&quot; Turnover Ratio?</Typography>
      <Typography variant="body1">
        There&apos;s no single universal benchmark — a &quot;good&quot; inventory turnover ratio varies widely
        by industry. Grocery stores and other businesses selling perishable goods often turn over inventory
        10-15+ times a year, while industries with expensive, slow-moving goods — like jewelry, heavy machinery,
        or automobiles — may turn over inventory just 2-4 times a year and still be perfectly healthy. Compare
        your ratio to others in your specific industry rather than to a generic number.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A retailer with $500,000 in annual COGS and $100,000 in average inventory has a turnover ratio of
        500,000 ÷ 100,000 = 5 — meaning inventory is fully sold and replaced about 5 times a year, or roughly
        every 73 days (365 ÷ 5).
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Assessing how efficiently a business manages its inventory and cash tied up in stock.</li>
          <li>Comparing turnover across periods to spot slowing sales or overstocking.</li>
          <li>Benchmarking against competitors within the same industry.</li>
          <li>Supporting purchasing and reorder decisions.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What does a low turnover ratio mean?</Typography>
      <Typography variant="body1">
        A low ratio can indicate overstocking, weak sales, or obsolete inventory tying up cash that could be
        used elsewhere. However, some industries (like capital equipment) normally run low ratios, so context
        matters.
      </Typography>
      <Typography variant="h3">What does a very high turnover ratio mean?</Typography>
      <Typography variant="body1">
        A very high ratio can mean strong sales and efficient inventory management, but an unusually high ratio
        can also signal insufficient stock levels, leading to missed sales from stockouts.
      </Typography>
      <Typography variant="h3">Should I use annual or a different period for COGS?</Typography>
      <Typography variant="body1">
        You can use any period (monthly, quarterly, or annual) as long as the COGS figure and the average
        inventory figure cover the same timeframe — mixing periods will distort the ratio.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/inventory-turnover-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Cost of Goods Sold (COGS)"
            type="number"
            fullWidth
            value={cogs}
            onChange={(e) => setCogs(e.target.value)}
            onFocus={(e) => e.target.select()}
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Average Inventory Value"
            type="number"
            fullWidth
            value={avgInventory}
            onChange={(e) => setAvgInventory(e.target.value)}
            onFocus={(e) => e.target.select()}
            helperText="(Beginning inventory + Ending inventory) ÷ 2"
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Inventory Turnover Ratio</Typography>
            <Typography variant="h3" fontWeight="bold">
              {turnover !== null ? `${turnover.toFixed(2)}x` : '—'}
            </Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Days Inventory Outstanding</Typography>
            <Typography fontWeight={600}>
              {daysInventory !== null ? `${daysInventory.toFixed(0)} days` : '—'}
            </Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default InventoryTurnoverCalculator;
