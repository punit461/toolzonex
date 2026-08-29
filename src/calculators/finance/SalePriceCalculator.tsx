'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

const SalePriceCalculator = () => {
  const [mode, setMode] = useState<'toSale' | 'toOriginal'>('toOriginal');
  const [knownPrice, setKnownPrice] = useState('80');
  const [discountPercent, setDiscountPercent] = useState('20');

  const result = useMemo(() => {
    const price = parseFloat(knownPrice) || 0;
    const discount = parseFloat(discountPercent) || 0;

    if (mode === 'toSale') {
      const saved = price * (discount / 100);
      const salePrice = price - saved;
      return { originalPrice: price, salePrice, amountSaved: saved };
    } else {
      const denominator = 1 - discount / 100;
      const originalPrice = denominator > 0 ? price / denominator : 0;
      const amountSaved = originalPrice - price;
      return { originalPrice, salePrice: price, amountSaved };
    }
  }, [mode, knownPrice, discountPercent]);

  const content = (
    <>
      <Typography variant="h2">How the Sale Price Calculator Works</Typography>
      <Typography variant="body1">
        This calculator works in both directions. Going forward, it takes an original price and a
        discount percentage to find the sale price. Going in reverse — the more unusual calculation —
        it starts from a sale price you already know (say, a receipt or a tag) and the discount
        percentage applied, and works backward to find the original, pre-discount price.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Sale Price = Original Price × (1 − Discount %)
        <br />
        Original Price = Sale Price / (1 − Discount %)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        If an item sells for $80 after a 20% discount, dividing $80 by (1 − 0.20) gives an original
        price of $100 — meaning $20 was saved. Going the other way, a $100 item with a 20% discount
        sells for $80, the same relationship in reverse.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Working out the original price of an item from a discounted receipt or price tag.</li>
          <li>Checking whether an advertised discount percentage matches the actual price drop.</li>
          <li>Calculating a sale price directly from an original price and discount.</li>
          <li>Verifying markdown math when auditing retail pricing.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why isn&apos;t the original price just the sale price plus the discount percentage added back?</Typography>
      <Typography variant="body1">
        Because the discount percentage was applied to the original price, not the sale price. Adding
        20% to an $80 sale price gives $96, not the correct $100 original price — you have to divide by
        (1 − discount %) to reverse the math correctly.
      </Typography>
      <Typography variant="h3">How do I stack multiple discounts?</Typography>
      <Typography variant="body1">
        Apply them sequentially, not by adding percentages — a 10% discount followed by another 10% off
        is a 19% total discount, not 20%, since the second discount applies to the already-reduced
        price.
      </Typography>
      <Typography variant="h3">What happens if the discount is 100%?</Typography>
      <Typography variant="body1">
        A 100% discount means the sale price is $0, and reversing from a $0 sale price can&apos;t
        determine a unique original price — the calculator can&apos;t solve for the original price when
        the discount is exactly 100%.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/sale-price-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={(_, val) => val && setMode(val)}
            size="small"
            fullWidth
          >
            <ToggleButton value="toOriginal">Sale Price → Original</ToggleButton>
            <ToggleButton value="toSale">Original → Sale Price</ToggleButton>
          </ToggleButtonGroup>

          <TextField
            label={mode === 'toOriginal' ? 'Sale Price' : 'Original Price'}
            type="number"
            value={knownPrice}
            onChange={(e) => setKnownPrice(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Discount Percentage"
            type="number"
            value={discountPercent}
            onChange={(e) => setDiscountPercent(e.target.value)}
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">{mode === 'toOriginal' ? 'Original Price' : 'Sale Price'}</Typography>
            <Typography variant="h3" fontWeight="bold">
              {fmt(mode === 'toOriginal' ? result.originalPrice : result.salePrice)}
            </Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Original Price</Typography>
            <Typography fontWeight={600} sx={{ textDecoration: mode === 'toOriginal' ? 'none' : 'line-through' }}>
              {fmt(result.originalPrice)}
            </Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Sale Price</Typography>
            <Typography fontWeight={600}>{fmt(result.salePrice)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Amount Saved</Typography>
            <Typography fontWeight={600} color="success.main">{fmt(result.amountSaved)}</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default SalePriceCalculator;
