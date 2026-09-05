'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Stack } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) => `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const TIERS = [
  { key: 'standard', label: 'Standard', base: 5, perLb: 0.5 },
  { key: 'expedited', label: 'Expedited', base: 10, perLb: 1.0 },
  { key: 'overnight', label: 'Overnight', base: 20, perLb: 2.0 },
];

const ShippingCostEstimator = () => {
  const [weight, setWeight] = useState('5');
  const [tier, setTier] = useState('standard');

  const w = parseFloat(weight) || 0;

  const content = (
    <>
      <Typography variant="h2">How to Use the Shipping Cost Estimator</Typography>
      <Typography variant="body1">
        Enter the weight of your package and this tool estimates the cost across three common small-parcel
        service tiers — Standard, Expedited, and Overnight — using an illustrative base fee plus a per-pound
        rate for each tier, so you can compare the trade-off between speed and cost at a glance.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Estimated Cost = Base Fee + (Per-Pound Rate × Weight)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 5 lb package costs an estimated $7.50 Standard ($5 + 5 × $0.50), $15.00 Expedited ($10 + 5 × $1.00),
        and $30.00 Overnight ($20 + 5 × $2.00) under this tool&apos;s illustrative rate table.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Comparing the rough cost difference between shipping speeds before choosing a service.</li>
          <li>Budgeting an approximate small-parcel shipping cost for an online order.</li>
          <li>Getting a quick ballpark figure before checking an actual carrier&apos;s live rate quote.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Are these real carrier rates?</strong> No — the base fees and per-pound rates used here are illustrative example numbers meant for quick estimation, not the actual pricing of any specific carrier. Real rates depend on the carrier, package dimensions, origin/destination zone, fuel surcharges, and current promotions, so always check your carrier&apos;s live rate tool for an exact quote.</li>
          <li><strong>How is this different from the Freight Cost Calculator?</strong> The Freight Cost Calculator is built for large freight or LTL (less-than-truckload) shipments, which are billed on whichever is greater between actual weight and volumetric (dimensional) weight based on the shipment&apos;s dimensions. This tool is for smaller parcels and uses a simple weight-only tiered estimate — no dimensions needed.</li>
          <li><strong>Why does Overnight cost so much more than Standard?</strong> Faster service tiers require carriers to prioritize a shipment through express sorting and dedicated transport rather than the slower, more efficient bulk routing used for standard ground shipping, which is reflected in a higher base fee and per-pound rate.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/finance/shipping-cost-estimator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Stack spacing={3}>
          <TextField label="Package Weight (lbs)" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} fullWidth />
        </Stack>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Estimated Cost by Tier</Typography>
          <Stack spacing={2}>
            {TIERS.map((t) => {
              const cost = t.base + t.perLb * w;
              const selected = tier === t.key;
              return (
                <Paper
                  key={t.key}
                  onClick={() => setTier(t.key)}
                  sx={{
                    p: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    bgcolor: selected ? 'primary.main' : 'background.paper',
                    color: selected ? 'white' : 'text.primary',
                    border: '1px solid',
                    borderColor: selected ? 'primary.main' : 'divider',
                  }}
                >
                  <Box>
                    <Typography variant="h6">{t.label}</Typography>
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>
                      ${t.base.toFixed(2)} base + ${t.perLb.toFixed(2)}/lb
                    </Typography>
                  </Box>
                  <Typography variant="h6" fontWeight="bold">{money(cost)}</Typography>
                </Paper>
              );
            })}
          </Stack>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ShippingCostEstimator;
