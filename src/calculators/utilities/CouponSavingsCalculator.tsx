'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, IconButton, Button, InputAdornment, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) => `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

interface Coupon {
  id: number;
  type: 'percent' | 'fixed';
  value: string;
}

const DEFAULT_COUPONS: Coupon[] = [
  { id: 1, type: 'percent', value: '20' },
  { id: 2, type: 'fixed', value: '10' },
];

const CouponSavingsContent = () => {
  const [originalPrice, setOriginalPrice] = useState('150');
  const [coupons, setCoupons] = useState<Coupon[]>(DEFAULT_COUPONS);
  const [nextId, setNextId] = useState(DEFAULT_COUPONS.length + 1);

  const addCoupon = () => {
    setCoupons([...coupons, { id: nextId, type: 'percent', value: '0' }]);
    setNextId(nextId + 1);
  };
  const removeCoupon = (id: number) => setCoupons(coupons.filter((c) => c.id !== id));
  const updateCoupon = (id: number, field: 'type' | 'value', v: string) =>
    setCoupons(coupons.map((c) => (c.id === id ? { ...c, [field]: v } as Coupon : c)));

  const price = parseFloat(originalPrice) || 0;

  const steps = useMemo(() => {
    let running = price;
    return coupons.map((c) => {
      const value = parseFloat(c.value) || 0;
      const before = running;
      if (c.type === 'percent') {
        running = running * (1 - value / 100);
      } else {
        running = Math.max(0, running - value);
      }
      return { ...c, before, after: running, saved: before - running };
    });
  }, [coupons, price]);

  const finalPrice = steps.length > 0 ? steps[steps.length - 1].after : price;
  const totalSaved = price - finalPrice;
  const percentSaved = price > 0 ? (totalSaved / price) * 100 : 0;

  return (
    <Box>
      <TextField
        label="Original Price"
        type="number"
        value={originalPrice}
        onChange={(e) => setOriginalPrice(e.target.value)}
        sx={{ mb: 3, maxWidth: 300 }}
        fullWidth
        slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
      />

      <Typography variant="subtitle2" fontWeight={600} mb={1}>Coupons (applied in order)</Typography>
      <Stack spacing={2} sx={{ mb: 3 }}>
        {coupons.map((c) => (
          <Box key={c.id} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <TextField select label="Type" value={c.type} onChange={(e) => updateCoupon(c.id, 'type', e.target.value)} size="small" sx={{ flex: 1 }}>
              <MenuItem value="percent">% Off</MenuItem>
              <MenuItem value="fixed">$ Off</MenuItem>
            </TextField>
            <TextField
              label="Value"
              type="number"
              value={c.value}
              onChange={(e) => updateCoupon(c.id, 'value', e.target.value)}
              size="small"
              sx={{ flex: 1 }}
              slotProps={{ input: c.type === 'percent' ? { endAdornment: <InputAdornment position="end">%</InputAdornment> } : { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
            />
            <IconButton onClick={() => removeCoupon(c.id)} size="small" aria-label="Remove coupon">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
        <Button startIcon={<AddIcon />} onClick={addCoupon} variant="outlined" size="small" sx={{ alignSelf: 'flex-start' }}>
          Add Coupon
        </Button>
      </Stack>

      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Step</TableCell>
              <TableCell align="right">Price Before</TableCell>
              <TableCell align="right">Applied</TableCell>
              <TableCell align="right">Price After</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {steps.map((s, idx) => (
              <TableRow key={s.id}>
                <TableCell>Coupon {idx + 1}</TableCell>
                <TableCell align="right">{money(s.before)}</TableCell>
                <TableCell align="right">{s.type === 'percent' ? `${s.value}% off` : `${money(parseFloat(s.value) || 0)} off`}</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>{money(s.after)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
        <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="body2">Final Price</Typography>
          <Typography variant="h4" fontWeight="bold">{money(finalPrice)}</Typography>
        </Paper>
        <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography>Total Savings</Typography>
          <Typography fontWeight={600}>{money(totalSaved)} ({percentSaved.toFixed(1)}%)</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

const CouponSavingsCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Coupon Savings Calculator</Typography>
      <Typography variant="body1">
        Coupons often stack — you apply one, then apply the next to the already-discounted price, not the
        original price. Enter the original price and add each coupon in the order you&apos;d apply them,
        choosing whether each one is a percentage off or a fixed dollar amount off. The calculator runs
        each coupon sequentially against the running price and shows the price after every step, plus your
        total savings.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Running Price After Each Coupon = Previous Price − (Previous Price × % Off) or − $ Off
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A $150 item with a 20%-off coupon applied first drops to $120. Then stacking a $10-off coupon on
        top brings it to $110 — a total savings of $40, or about 26.7% off the original price. Note that
        applying the coupons in the opposite order would give a slightly different result, since the
        percentage coupon would be calculated on a different running price.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Figuring out your real final price when stacking multiple coupons at checkout.</li>
          <li>Comparing the order coupons are applied in, since percentage-off coupons yield different savings depending on the running price they&apos;re calculated against.</li>
          <li>Estimating total savings across a mix of percentage and fixed-dollar coupons for a purchase.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Discount Calculator?</strong> The Discount Calculator applies a single flat percentage discount to a price. This tool supports stacking multiple coupons of mixed types (percentage and fixed-dollar) applied one after another in sequence, matching how real-world coupon stacking actually works at checkout.</li>
          <li><strong>Does the order coupons are applied in matter?</strong> Yes, for percentage-off coupons — since each percentage is calculated on the current running price, applying a percentage coupon earlier (against a higher price) yields a larger dollar discount than applying the same percentage later (against an already-reduced price). Fixed-dollar coupons subtract the same amount regardless of order.</li>
          <li><strong>Can a coupon ever bring the price below zero?</strong> No — a fixed-dollar coupon larger than the current running price is capped at reducing the price to $0 rather than going negative, matching how retailers typically handle over-sized fixed coupons.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/coupon-savings-calculator" content={content}>
      <CouponSavingsContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CouponSavingsCalculator;
