'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, IconButton, Button, InputAdornment } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) => `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

interface Tier {
  id: number;
  threshold: string;
  discountPct: string;
}

const DEFAULT_TIERS: Tier[] = [
  { id: 1, threshold: '10', discountPct: '5' },
  { id: 2, threshold: '50', discountPct: '10' },
  { id: 3, threshold: '100', discountPct: '15' },
];

const BulkDiscountContent = () => {
  const [unitPrice, setUnitPrice] = useState('20');
  const [quantity, setQuantity] = useState('60');
  const [tiers, setTiers] = useState<Tier[]>(DEFAULT_TIERS);
  const [nextId, setNextId] = useState(DEFAULT_TIERS.length + 1);

  const addTier = () => {
    setTiers([...tiers, { id: nextId, threshold: '0', discountPct: '0' }]);
    setNextId(nextId + 1);
  };
  const removeTier = (id: number) => setTiers(tiers.filter((t) => t.id !== id));
  const updateTier = (id: number, field: 'threshold' | 'discountPct', v: string) =>
    setTiers(tiers.map((t) => (t.id === id ? { ...t, [field]: v } : t)));

  const price = parseFloat(unitPrice) || 0;
  const qty = parseFloat(quantity) || 0;

  const { appliedTier, discountPct } = useMemo(() => {
    const sorted = [...tiers]
      .map((t) => ({ ...t, thresholdNum: parseFloat(t.threshold) || 0, discountNum: parseFloat(t.discountPct) || 0 }))
      .filter((t) => qty >= t.thresholdNum)
      .sort((a, b) => b.thresholdNum - a.thresholdNum);
    if (sorted.length === 0) return { appliedTier: null, discountPct: 0 };
    return { appliedTier: sorted[0], discountPct: sorted[0].discountNum };
  }, [tiers, qty]);

  const fullPrice = price * qty;
  const discountAmount = fullPrice * (discountPct / 100);
  const totalPrice = fullPrice - discountAmount;

  return (
    <Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 3 }}>
        <TextField
          label="Unit Price"
          type="number"
          value={unitPrice}
          onChange={(e) => setUnitPrice(e.target.value)}
          fullWidth
          slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
        />
        <TextField label="Quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} fullWidth />
      </Box>

      <Typography variant="subtitle2" fontWeight={600} mb={1}>Discount Tiers</Typography>
      <Stack spacing={2} sx={{ mb: 3 }}>
        {tiers.map((t) => (
          <Box key={t.id} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <TextField
              label="Threshold (units+)"
              type="number"
              value={t.threshold}
              onChange={(e) => updateTier(t.id, 'threshold', e.target.value)}
              size="small"
              sx={{ flex: 1 }}
            />
            <TextField
              label="Discount"
              type="number"
              value={t.discountPct}
              onChange={(e) => updateTier(t.id, 'discountPct', e.target.value)}
              size="small"
              sx={{ flex: 1 }}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
            />
            <IconButton onClick={() => removeTier(t.id)} size="small" aria-label="Remove tier">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
        <Button startIcon={<AddIcon />} onClick={addTier} variant="outlined" size="small" sx={{ alignSelf: 'flex-start' }}>
          Add Tier
        </Button>
      </Stack>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
        <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="body2">Total Price</Typography>
          <Typography variant="h4" fontWeight="bold">{money(totalPrice)}</Typography>
        </Paper>
        <Stack spacing={1}>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Applied Discount</Typography>
            <Typography fontWeight={600}>{appliedTier ? `${discountPct}%` : 'None'}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Savings vs Full Price</Typography>
            <Typography fontWeight={600}>{money(discountAmount)}</Typography>
          </Paper>
        </Stack>
      </Box>
    </Box>
  );
};

const BulkDiscountCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Bulk Discount Calculator</Typography>
      <Typography variant="body1">
        Wholesale and quantity pricing often works in tiers — the more units you buy, the higher a discount
        percentage kicks in. Enter the unit price and quantity you&apos;re purchasing, then set up a tiered
        discount schedule (editable — add, remove, or change any tier&apos;s threshold and discount
        percentage). The calculator finds the highest threshold your quantity qualifies for and applies
        that tier&apos;s discount rate.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Applied Tier = Highest Threshold Where Quantity ≥ Threshold<br />
        Total Price = (Unit Price × Quantity) × (1 − Applied Discount %)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        With tiers of 10+ units for 5% off, 50+ units for 10% off, and 100+ units for 15% off, buying 60
        units at $20 each qualifies for the 50+ tier (10% off), since 60 meets the 50 threshold but not the
        100 threshold. The full price of $1,200 drops to $1,080, a savings of $120.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Working out wholesale pricing when a supplier offers volume-based discount tiers.</li>
          <li>Deciding whether buying a few more units to reach the next discount tier saves money overall.</li>
          <li>Modeling a custom tiered pricing structure for your own bulk sales or B2B pricing.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Discount Calculator?</strong> The Discount Calculator applies one flat percentage off a single item&apos;s price. This tool is built for quantity-based wholesale pricing, where the discount rate itself changes depending on how many units you buy — you set up multiple tiers, and the calculator automatically applies whichever one your quantity qualifies for.</li>
          <li><strong>What happens if my quantity doesn&apos;t meet any tier&apos;s threshold?</strong> No discount is applied, and you pay the full unit price × quantity — the same as the lowest, no-discount starting point before any tier threshold is reached.</li>
          <li><strong>Can tiers overlap or apply cumulatively?</strong> No — this calculator applies only the single best-matching tier (the highest threshold your quantity meets or exceeds), not a stack of every tier you&apos;ve passed. This matches how most real-world bulk/wholesale pricing schedules work.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/bulk-discount-calculator" content={content}>
      <BulkDiscountContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BulkDiscountCalculator;
