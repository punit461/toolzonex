'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) => `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const InventoryShrinkageCalculator = () => {
  const [recorded, setRecorded] = useState('50000');
  const [actual, setActual] = useState('47500');

  const r = parseFloat(recorded) || 0;
  const a = parseFloat(actual) || 0;
  const valid = r > 0;
  const shrinkage = valid ? r - a : 0;
  const shrinkagePct = valid ? (shrinkage / r) * 100 : 0;

  const content = (
    <>
      <Typography variant="h2">How to Use the Inventory Shrinkage Calculator</Typography>
      <Typography variant="body1">
        Enter your recorded (book) inventory value — what your records say you should have — and your actual
        (counted) inventory value from a physical count. The difference is your shrinkage: inventory that
        exists on paper but is missing in reality, typically due to theft, damage, spoilage, or record-keeping
        errors.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Shrinkage = Recorded Value − Actual Value<br />
        Shrinkage % = (Shrinkage / Recorded Value) × 100
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Records show $50,000 of inventory, but a physical count finds only $47,500 on the shelves. That&apos;s
        $2,500 in shrinkage, or 5% of recorded inventory value.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Measuring loss after a periodic or annual physical inventory count.</li>
          <li>Tracking shrinkage rate over time to spot theft, damage, or process problems.</li>
          <li>Benchmarking a store or warehouse&apos;s shrinkage rate against industry averages.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Inventory Turnover Calculator?</strong> Inventory turnover measures how quickly inventory sells — it&apos;s about sales velocity, calculated from cost of goods sold and average inventory value. Shrinkage measures inventory that is simply lost — to theft, damage, or record errors — regardless of how fast the remaining stock sells. They answer completely different questions.</li>
          <li><strong>How is this different from the Inventory Carrying Cost Calculator?</strong> Carrying cost estimates what it costs to hold inventory over time — storage, insurance, obsolescence, and opportunity cost on the capital tied up. Shrinkage instead measures inventory that has physically disappeared from stock. Carrying cost is about the cost of keeping inventory; shrinkage is about inventory you no longer have at all.</li>
          <li><strong>What's a typical shrinkage rate?</strong> Retail shrinkage rates commonly cited in industry surveys often fall around 1-2% of sales, though this varies significantly by industry, store type, and loss-prevention practices. Use your own historical shrinkage rate as the most relevant benchmark for your business.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/finance/inventory-shrinkage-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Stack spacing={3}>
          <TextField
            label="Recorded (Book) Inventory Value"
            type="number"
            value={recorded}
            onChange={(e) => setRecorded(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Actual (Counted) Inventory Value"
            type="number"
            value={actual}
            onChange={(e) => setActual(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
        </Stack>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
          <Paper sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="h6">Shrinkage</Typography>
            <Typography variant="h6" fontWeight="bold">{valid ? money(shrinkage) : '—'}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">Shrinkage %</Typography>
            <Typography variant="h6" fontWeight="bold">{valid ? `${shrinkagePct.toFixed(2)}%` : '—'}</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default InventoryShrinkageCalculator;
