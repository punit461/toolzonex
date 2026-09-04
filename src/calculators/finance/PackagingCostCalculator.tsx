'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Button, IconButton, Stack, Paper, InputAdornment } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface Material {
  id: string;
  name: string;
  cost: string;
}

let nextId = 4;

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(n);

const PackagingCostCalculator = () => {
  const [materials, setMaterials] = useState<Material[]>([
    { id: '1', name: 'Box', cost: '0.85' },
    { id: '2', name: 'Filler / Padding', cost: '0.25' },
    { id: '3', name: 'Tape & Label', cost: '0.15' },
  ]);
  const [labor, setLabor] = useState('0.50');
  const [shipping, setShipping] = useState('4.50');
  const [quantity, setQuantity] = useState('500');

  const addMaterial = () => setMaterials([...materials, { id: String(nextId++), name: `Material ${materials.length + 1}`, cost: '' }]);
  const removeMaterial = (id: string) => setMaterials(materials.filter((m) => m.id !== id));
  const updateMaterial = (id: string, field: 'name' | 'cost', val: string) => {
    setMaterials(materials.map((m) => (m.id === id ? { ...m, [field]: val } : m)));
  };

  const { materialsCost, perUnitCost, batchCost } = useMemo(() => {
    const materialsCost = materials.reduce((sum, m) => sum + (parseFloat(m.cost) || 0), 0);
    const perUnitCost = materialsCost + (parseFloat(labor) || 0) + (parseFloat(shipping) || 0);
    const qty = parseFloat(quantity) || 0;
    return { materialsCost, perUnitCost, batchCost: perUnitCost * qty };
  }, [materials, labor, shipping, quantity]);

  const content = (
    <>
      <Typography variant="h2">How to Calculate Packaging Cost per Unit</Typography>
      <Typography variant="body1">
        Add each packaging material — box, filler, tape, label, and anything else — with its cost per unit,
        then add labor/handling cost and shipping cost per unit. The calculator sums everything into a total
        packaging cost per unit, and multiplies by an order quantity to give a total cost for a full batch or
        order if you provide one.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Cost per Unit = Σ Material Costs + Labor/Handling + Shipping
        <br />
        Batch Cost = Cost per Unit × Quantity
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A box ($0.85), filler ($0.25), and tape/label ($0.15) total $1.25 in materials. Adding $0.50 in
        labor/handling and $4.50 in shipping brings the total packaging cost per unit to $6.25. For a batch of
        500 units, that&apos;s 500 × $6.25 = $3,125.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Pricing products to account for the full packaging and shipping cost, not just materials.</li>
          <li>Comparing packaging cost across different box sizes or fulfillment approaches.</li>
          <li>Estimating total packaging spend for a production run or order batch.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Should shipping cost really count as a &quot;packaging&quot; cost?</Typography>
      <Typography variant="body1">
        It&apos;s included here because most businesses care about the total cost to get a packaged product out
        the door, and shipping is a major, often-overlooked line item in that total. If you only want materials
        and labor, just leave the shipping field at zero.
      </Typography>
      <Typography variant="h3">How do I find my per-unit labor/handling cost?</Typography>
      <Typography variant="body1">
        Divide your total packing labor cost for a shift or period by the number of units packed in that same
        period — that gives a rough per-unit labor rate you can refine over time as your process changes.
      </Typography>
      <Typography variant="h3">Does this account for bulk discounts on materials?</Typography>
      <Typography variant="body1">
        No — enter your actual per-unit material costs at your current order volume. If you get a bulk discount
        at a higher order quantity, update the material cost fields to reflect that lower per-unit price before
        calculating the batch total.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/packaging-cost-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '3fr 2fr' }, gap: 6 }}>
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>Packaging Materials (per unit)</Typography>
          <Stack spacing={2}>
            {materials.map((m) => (
              <Stack key={m.id} direction="row" spacing={1.5} alignItems="center">
                <TextField
                  label="Material" size="small" fullWidth
                  value={m.name}
                  onChange={(e) => updateMaterial(m.id, 'name', e.target.value)}
                />
                <TextField
                  label="Cost" type="number" size="small" fullWidth
                  onFocus={(e) => e.target.select()}
                  value={m.cost}
                  onChange={(e) => updateMaterial(m.id, 'cost', e.target.value)}
                  slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
                />
                <IconButton color="error" size="small" onClick={() => removeMaterial(m.id)} disabled={materials.length <= 1}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Stack>
            ))}
          </Stack>
          <Button startIcon={<AddIcon />} onClick={addMaterial} sx={{ mt: 2, mb: 3 }}>Add Material</Button>

          <Stack spacing={2}>
            <TextField
              label="Labor / Handling Cost per Unit" type="number" value={labor}
              onChange={(e) => setLabor(e.target.value)} onFocus={(e) => e.target.select()}
              fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
            />
            <TextField
              label="Shipping Cost per Unit" type="number" value={shipping}
              onChange={(e) => setShipping(e.target.value)} onFocus={(e) => e.target.select()}
              fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
            />
            <TextField
              label="Order Quantity (optional)" type="number" value={quantity}
              onChange={(e) => setQuantity(e.target.value)} onFocus={(e) => e.target.select()}
              fullWidth
            />
          </Stack>
        </Box>

        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', height: 'fit-content' }}>
          <Typography variant="body2" color="text.secondary">Materials Cost per Unit</Typography>
          <Typography variant="h6" fontWeight={600}>{fmt(materialsCost)}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>Total Packaging Cost per Unit</Typography>
          <Typography variant="h3" color="primary" fontWeight={800}>{fmt(perUnitCost)}</Typography>
          {(parseFloat(quantity) || 0) > 0 && (
            <>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>Total for {quantity} Units</Typography>
              <Typography variant="h5" fontWeight={700}>{fmt(batchCost)}</Typography>
            </>
          )}
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PackagingCostCalculator;
