'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const UNIT_LABELS: Record<string, string> = {
  oz: 'oz',
  lb: 'lb',
  g: 'g',
  kg: 'kg',
  ml: 'ml',
  l: 'L',
  count: 'item',
};

const UnitPriceCalculator = () => {
  const [unit, setUnit] = useState<string>('oz');
  const [priceA, setPriceA] = useState<string>('4.99');
  const [qtyA, setQtyA] = useState<string>('16');
  const [priceB, setPriceB] = useState<string>('8.49');
  const [qtyB, setQtyB] = useState<string>('32');

  const result = useMemo(() => {
    const pA = parseFloat(priceA);
    const qA = parseFloat(qtyA);
    const pB = parseFloat(priceB);
    const qB = parseFloat(qtyB);
    if ([pA, qA, pB, qB].some((n) => Number.isNaN(n)) || qA <= 0 || qB <= 0 || pA < 0 || pB < 0) return null;

    const unitPriceA = pA / qA;
    const unitPriceB = pB / qB;
    const cheaper = unitPriceA === unitPriceB ? 'tie' : unitPriceA < unitPriceB ? 'A' : 'B';
    return { unitPriceA, unitPriceB, cheaper };
  }, [priceA, qtyA, priceB, qtyB]);

  const unitLabel = UNIT_LABELS[unit];

  const content = (
    <>
      <Typography variant="h2">How to Calculate Unit Price</Typography>
      <Typography variant="body1">
        Unit price is simply Price ÷ Quantity, expressed in a standard unit (like price per ounce or price per
        100 grams) so two differently sized products can be compared fairly. Enter both products&apos; price
        and size using the same unit of measure, and this calculator computes each one&apos;s price per unit
        and highlights the better deal.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Unit Price = Total Price ÷ Quantity
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 16 oz bottle priced at $4.99 costs 4.99 ÷ 16 = $0.312/oz. A 32 oz bottle priced at $8.49 costs 8.49 ÷
        32 = $0.265/oz. Even though the second bottle costs more upfront, it&apos;s the better deal per ounce.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Comparing grocery store products sold in different package sizes.</li>
          <li>Checking whether a &quot;bulk&quot; or &quot;family size&quot; option is actually cheaper per unit.</li>
          <li>Comparing prices between two different brands or stores for the same type of product.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why do both products need the same unit of measure?</Typography>
      <Typography variant="body1">
        Unit price is only a fair comparison when both quantities are measured the same way — for example, both
        in ounces, or both in milliliters. Comparing a product priced per ounce against one priced per gram
        without converting first would give a misleading result.
      </Typography>
      <Typography variant="h3">Does the cheapest unit price always mean the best value?</Typography>
      <Typography variant="body1">
        Usually, but not always — factors like product quality, whether you&apos;ll actually use the larger
        quantity before it expires, and storage space can matter too. Unit price is a great starting point for
        comparison, not the only factor in a purchase decision.
      </Typography>
      <Typography variant="h3">Can I use this for non-grocery items?</Typography>
      <Typography variant="body1">
        Yes — unit price comparison works for anything sold by quantity, including cleaning supplies, pet food,
        office supplies, or items sold by count (like a pack of batteries), using the &quot;item&quot; unit
        option.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/unit-price-calculator" content={content}>
      <FormControl fullWidth sx={{ mb: 4, maxWidth: 300 }}>
        <InputLabel>Quantity Unit (used for both)</InputLabel>
        <Select value={unit} label="Quantity Unit (used for both)" onChange={(e) => setUnit(e.target.value)}>
          {Object.entries(UNIT_LABELS).map(([key, label]) => (
            <MenuItem key={key} value={key}>{label}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Paper variant="outlined" sx={{ p: 3, borderColor: result?.cheaper === 'A' ? 'success.main' : undefined, borderWidth: result?.cheaper === 'A' ? 2 : 1 }}>
          <Typography variant="subtitle1" fontWeight={700} mb={2}>Product A</Typography>
          <TextField label="Price ($)" type="number" fullWidth value={priceA} onChange={(e) => setPriceA(e.target.value)} onFocus={(e) => e.target.select()} sx={{ mb: 2 }} />
          <TextField label={`Quantity (${unitLabel})`} type="number" fullWidth value={qtyA} onChange={(e) => setQtyA(e.target.value)} onFocus={(e) => e.target.select()} sx={{ mb: 2 }} />
          {result && (
            <Typography variant="h6" fontWeight={800} color={result.cheaper === 'A' ? 'success.main' : 'text.primary'}>
              ${result.unitPriceA.toFixed(4)} / {unitLabel}
            </Typography>
          )}
        </Paper>

        <Paper variant="outlined" sx={{ p: 3, borderColor: result?.cheaper === 'B' ? 'success.main' : undefined, borderWidth: result?.cheaper === 'B' ? 2 : 1 }}>
          <Typography variant="subtitle1" fontWeight={700} mb={2}>Product B</Typography>
          <TextField label="Price ($)" type="number" fullWidth value={priceB} onChange={(e) => setPriceB(e.target.value)} onFocus={(e) => e.target.select()} sx={{ mb: 2 }} />
          <TextField label={`Quantity (${unitLabel})`} type="number" fullWidth value={qtyB} onChange={(e) => setQtyB(e.target.value)} onFocus={(e) => e.target.select()} sx={{ mb: 2 }} />
          {result && (
            <Typography variant="h6" fontWeight={800} color={result.cheaper === 'B' ? 'success.main' : 'text.primary'}>
              ${result.unitPriceB.toFixed(4)} / {unitLabel}
            </Typography>
          )}
        </Paper>
      </Box>

      {result && (
        <Paper sx={{ p: 2, mt: 3, textAlign: 'center', bgcolor: 'action.hover' }}>
          <Typography variant="body1" fontWeight={600}>
            {result.cheaper === 'tie' ? 'Both products cost the same per unit' : `Product ${result.cheaper} is the better deal per ${unitLabel}`}
          </Typography>
        </Paper>
      )}

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default UnitPriceCalculator;
