'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) =>
  `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const EconomicOrderQuantityCalculatorContent = () => {
  const [demand, setDemand] = useState('10000');
  const [orderingCost, setOrderingCost] = useState('50');
  const [holdingCost, setHoldingCost] = useState('2');

  const result = useMemo(() => {
    const D = parseFloat(demand) || 0;
    const S = parseFloat(orderingCost) || 0;
    const H = parseFloat(holdingCost) || 0;

    const eoq = H > 0 ? Math.sqrt((2 * D * S) / H) : 0;
    const ordersPerYear = eoq > 0 ? D / eoq : 0;
    const totalOrderingCost = ordersPerYear * S;
    const totalHoldingCost = (eoq / 2) * H;
    const totalCost = totalOrderingCost + totalHoldingCost;

    return { eoq, ordersPerYear, totalOrderingCost, totalHoldingCost, totalCost };
  }, [demand, orderingCost, holdingCost]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Annual Demand"
          type="number"
          value={demand}
          onChange={(e) => setDemand(e.target.value)}
          fullWidth
          slotProps={{ input: { endAdornment: <InputAdornment position="end">units / year</InputAdornment> } }}
        />
        <TextField
          label="Ordering Cost Per Order"
          type="number"
          value={orderingCost}
          onChange={(e) => setOrderingCost(e.target.value)}
          fullWidth
          slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
        />
        <TextField
          label="Holding Cost Per Unit Per Year"
          type="number"
          value={holdingCost}
          onChange={(e) => setHoldingCost(e.target.value)}
          fullWidth
          slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
        />

        <Paper variant="outlined" sx={{ p: 2, bgcolor: 'action.hover' }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
            EOQ = √(2 × D × S / H)
          </Typography>
        </Paper>
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
        <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="body2">Economic Order Quantity</Typography>
          <Typography variant="h3" fontWeight="bold">{Math.round(result.eoq).toLocaleString('en-US')} units</Typography>
        </Paper>
        <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Orders Per Year</Typography>
          <Typography fontWeight={600}>{result.ordersPerYear.toFixed(1)}</Typography>
        </Paper>
        <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Total Ordering Cost</Typography>
          <Typography fontWeight={600}>{money(result.totalOrderingCost)}</Typography>
        </Paper>
        <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Total Holding Cost</Typography>
          <Typography fontWeight={600}>{money(result.totalHoldingCost)}</Typography>
        </Paper>
        <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Total Annual Inventory Cost</Typography>
          <Typography fontWeight={600}>{money(result.totalCost)}</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

const EconomicOrderQuantityCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How Does the EOQ Calculator Work?</Typography>
      <Typography variant="body1">
        Economic Order Quantity (EOQ) is the order size that minimizes the combined cost of ordering
        inventory and holding it in stock. Enter your annual demand for a product, the fixed cost of
        placing one order (shipping, processing, setup), and the annual cost of holding one unit in
        inventory (storage, insurance, spoilage, capital tied up). The calculator applies the standard
        EOQ formula, EOQ = √(2 × D × S ÷ H), where D is annual demand, S is ordering cost per order, and
        H is holding cost per unit per year.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        With annual demand of 10,000 units, an ordering cost of $50 per order, and a holding cost of $2
        per unit per year, the EOQ formula gives √((2 × 10,000 × 50) / 2) = √500,000 ≈ 707 units per
        order. That works out to about 14 orders a year, balancing ordering and holding costs at their
        lowest combined total.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Setting reorder quantities for retail or wholesale inventory management.</li>
          <li>Reducing total inventory costs by finding the ordering &quot;sweet spot.&quot;</li>
          <li>Comparing how a change in supplier pricing or storage cost shifts the ideal order size.</li>
          <li>Justifying inventory policy decisions with a standard, well-known formula.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What assumptions does the EOQ formula make?</Typography>
      <Typography variant="body1">
        Classic EOQ assumes constant, known demand, a fixed ordering cost per order, a fixed holding
        cost per unit, no quantity discounts, and instantaneous replenishment (no lead-time stockouts).
        Real-world inventory often violates one or more of these, so treat EOQ as a starting point
        rather than an exact answer.
      </Typography>
      <Typography variant="h3">What happens if I order more or less than the EOQ?</Typography>
      <Typography variant="body1">
        Ordering more than the EOQ increases holding costs faster than it reduces ordering costs (and
        vice versa for ordering less) — the EOQ is specifically the quantity where those two costs are
        balanced and their sum is at its minimum.
      </Typography>
      <Typography variant="h3">How do I estimate my holding cost per unit?</Typography>
      <Typography variant="body1">
        A common approach is to take a percentage (often 15-30%) of the unit&apos;s purchase cost to
        account for storage space, insurance, spoilage/obsolescence risk, and the opportunity cost of
        capital tied up in inventory rather than invested elsewhere.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/economic-order-quantity-calculator" content={content}>
      <EconomicOrderQuantityCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default EconomicOrderQuantityCalculator;
