'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, MenuItem } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) => `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const SIZE_PRESETS = [
  { key: 'small', label: 'Small (~2 sq in)', sqIn: 2, multiplier: 0.8 },
  { key: 'medium', label: 'Medium (~4 sq in)', sqIn: 4, multiplier: 1.0 },
  { key: 'large', label: 'Large (~9 sq in)', sqIn: 9, multiplier: 1.5 },
  { key: 'custom', label: 'Custom', sqIn: null, multiplier: null },
];

// Illustrative tiered per-unit price for a "medium" size sticker at each quantity breakpoint.
const PRICE_TIERS = [
  { min: 1, pricePerUnit: 0.6 },
  { min: 50, pricePerUnit: 0.45 },
  { min: 100, pricePerUnit: 0.35 },
  { min: 250, pricePerUnit: 0.25 },
  { min: 500, pricePerUnit: 0.2 },
  { min: 1000, pricePerUnit: 0.18 },
];

const getTierPrice = (quantity: number) => {
  let price = PRICE_TIERS[0].pricePerUnit;
  for (const tier of PRICE_TIERS) {
    if (quantity >= tier.min) price = tier.pricePerUnit;
  }
  return price;
};

const StickerPrintingCostCalculator = () => {
  const [sizeKey, setSizeKey] = useState('medium');
  const [customSqIn, setCustomSqIn] = useState('6');
  const [quantity, setQuantity] = useState('250');

  const preset = SIZE_PRESETS.find((s) => s.key === sizeKey)!;
  const sqIn = preset.sqIn ?? (parseFloat(customSqIn) || 0);
  const multiplier = preset.multiplier ?? Math.min(3, Math.max(0.5, sqIn / 4));
  const qty = parseFloat(quantity) || 0;

  const basePrice = getTierPrice(qty);
  const effectivePricePerUnit = basePrice * multiplier;
  const totalCost = effectivePricePerUnit * qty;

  const content = (
    <>
      <Typography variant="h2">How to Use the Sticker Printing Cost Calculator</Typography>
      <Typography variant="body1">
        Choose a sticker size preset (or enter a custom size in square inches) and a quantity ordered. This
        tool uses an illustrative tiered per-unit price table for individual die-cut stickers — the price per
        sticker decreases at higher quantity breakpoints (50, 100, 250, 500, and 1,000+ units), reflecting how
        die-cut sticker printing is typically priced per unit.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Total Cost = Price per Sticker (at your quantity tier and size) × Quantity
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        250 medium (~4 sq in) stickers fall into the 250-unit price tier at an illustrative $0.25 each, for a
        total of $62.50. Ordering 1,000 instead drops the per-unit price to the 1,000+ tier of $0.18 each — a
        total of $180, but a much lower cost per sticker.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Budgeting the cost of ordering custom die-cut stickers for a product, brand, or event.</li>
          <li>Comparing the cost-per-sticker savings of ordering at a higher quantity tier.</li>
          <li>Estimating total merchandise cost when planning a sticker giveaway or product line.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Are these real printer prices?</strong> No — the per-unit price table and size multipliers used here are illustrative example figures for estimation purposes, not any specific printer's actual pricing. Real sticker pricing varies by printer, material, finish (glossy, matte, holographic), and shape complexity, so always check an actual quote for a precise cost.</li>
          <li><strong>How is this different from the Label Printing Cost Calculator?</strong> This tool is for individual custom die-cut stickers, priced per unit with quantity-based discount tiers — a typical model for small-batch custom stickers. The Label Printing Cost Calculator instead models bulk roll-based product or shipping labels, priced per roll rather than per individual unit — a different real-world purchasing model entirely.</li>
          <li><strong>Why does a larger sticker cost more per unit?</strong> Larger stickers use more material and vinyl per piece and often take longer to cut, which is reflected here as a size multiplier applied on top of the base quantity-tier price.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/sticker-printing-cost-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Stack spacing={3}>
          <TextField select label="Sticker Size" value={sizeKey} onChange={(e) => setSizeKey(e.target.value)} fullWidth>
            {SIZE_PRESETS.map((s) => (
              <MenuItem key={s.key} value={s.key}>{s.label}</MenuItem>
            ))}
          </TextField>
          {sizeKey === 'custom' && (
            <TextField label="Custom Size (sq in)" type="number" value={customSqIn} onChange={(e) => setCustomSqIn(e.target.value)} fullWidth />
          )}
          <TextField label="Quantity Ordered" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} fullWidth />
        </Stack>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
          <Stack spacing={2}>
            <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6">Cost per Sticker</Typography>
              <Typography variant="h6" fontWeight="bold">{money(effectivePricePerUnit)}</Typography>
            </Paper>
            <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', bgcolor: 'primary.main', color: 'white' }}>
              <Typography variant="h6">Total Cost</Typography>
              <Typography variant="h6" fontWeight="bold">{money(totalCost)}</Typography>
            </Paper>
          </Stack>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default StickerPrintingCostCalculator;
