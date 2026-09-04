'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

const InventoryCarryingCostCalculator = () => {
  const [avgInventory, setAvgInventory] = useState('300000');
  const [storageRate, setStorageRate] = useState('6');
  const [insuranceRate, setInsuranceRate] = useState('2');
  const [obsolescenceRate, setObsolescenceRate] = useState('8');
  const [opportunityRate, setOpportunityRate] = useState('10');

  const { totalRate, carryingCost } = useMemo(() => {
    const inv = parseFloat(avgInventory) || 0;
    const totalRate = (parseFloat(storageRate) || 0)
      + (parseFloat(insuranceRate) || 0)
      + (parseFloat(obsolescenceRate) || 0)
      + (parseFloat(opportunityRate) || 0);
    return { totalRate, carryingCost: inv * (totalRate / 100) };
  }, [avgInventory, storageRate, insuranceRate, obsolescenceRate, opportunityRate]);

  const content = (
    <>
      <Typography variant="h2">How Inventory Carrying Cost Is Calculated</Typography>
      <Typography variant="body1">
        Inventory carrying cost (also called holding cost) is what it costs a business each year just to keep
        inventory on hand — separate from what the inventory itself is worth. Enter your average inventory
        value along with a carrying cost rate made up of its typical components — storage, insurance,
        obsolescence, and the opportunity cost of capital tied up in stock — and this calculator computes the
        total annual carrying cost.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Annual Carrying Cost = Average Inventory Value × Total Carrying Cost Rate (%)
      </Box>
      <Typography variant="body2" color="text.secondary">
        A combined carrying cost rate of roughly 20-30% of inventory value per year is a commonly cited industry
        rule of thumb, made up of storage costs (warehousing, utilities, labor), insurance, obsolescence or
        shrinkage (goods that go unsold, expire, or become outdated), and the opportunity cost of the capital
        that&apos;s tied up in inventory instead of earning a return elsewhere.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        With $300,000 in average inventory and a combined rate of 6% storage + 2% insurance + 8% obsolescence
        + 10% opportunity cost = 26% total, the annual carrying cost is 300,000 × 0.26 = $78,000 — meaning it
        costs about $78,000 a year just to hold that inventory, on top of what it cost to acquire.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Understanding the true annual cost of carrying excess or safety-stock inventory.</li>
          <li>Justifying inventory reduction or just-in-time initiatives with a dollar figure.</li>
          <li>Comparing the cost of holding inventory against the cost of stockouts or expedited shipping.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is this different from inventory turnover?</Typography>
      <Typography variant="body1">
        Inventory turnover measures how many times inventory is sold and replaced in a period (COGS ÷ average
        inventory) — it&apos;s a speed metric. Carrying cost instead puts an actual dollar figure on what it
        costs to hold that inventory each year, regardless of how fast it turns over.
      </Typography>
      <Typography variant="h3">What counts as the &quot;opportunity cost&quot; component?</Typography>
      <Typography variant="body1">
        It&apos;s the return that capital tied up in inventory could have earned elsewhere — paying down debt,
        investing in growth, or simply earning interest — instead of sitting on a warehouse shelf. Many
        businesses estimate this using their cost of capital or a target investment return rate.
      </Typography>
      <Typography variant="h3">What&apos;s a typical total carrying cost rate?</Typography>
      <Typography variant="body1">
        20-30% of inventory value per year is a widely used industry rule of thumb, though it varies by
        industry — perishable or fast-obsolescing goods (like electronics or fashion) often carry higher rates,
        while stable, non-perishable goods may carry lower rates.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/inventory-carrying-cost-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Average Inventory Value" type="number" value={avgInventory}
            onChange={(e) => setAvgInventory(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <Typography variant="body2" color="text.secondary">Carrying Cost Rate Components (% per year)</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <TextField
              label="Storage" type="number" value={storageRate}
              onChange={(e) => setStorageRate(e.target.value)} onFocus={(e) => e.target.select()}
              fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
            />
            <TextField
              label="Insurance" type="number" value={insuranceRate}
              onChange={(e) => setInsuranceRate(e.target.value)} onFocus={(e) => e.target.select()}
              fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
            />
            <TextField
              label="Obsolescence" type="number" value={obsolescenceRate}
              onChange={(e) => setObsolescenceRate(e.target.value)} onFocus={(e) => e.target.select()}
              fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
            />
            <TextField
              label="Opportunity Cost" type="number" value={opportunityRate}
              onChange={(e) => setOpportunityRate(e.target.value)} onFocus={(e) => e.target.select()}
              fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
            />
          </Box>
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Total Carrying Cost Rate</Typography>
            <Typography fontWeight={600}>{totalRate.toFixed(1)}%</Typography>
          </Paper>
          <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Annual Carrying Cost</Typography>
            <Typography variant="h3" fontWeight="bold">{fmt(carryingCost)}</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default InventoryCarryingCostCalculator;
