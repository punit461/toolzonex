'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) => `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const BannerPrintingCostCalculator = () => {
  const [width, setWidth] = useState('4');
  const [height, setHeight] = useState('2');
  const [pricePerSqFt, setPricePerSqFt] = useState('6');
  const [quantity, setQuantity] = useState('1');

  const w = parseFloat(width) || 0;
  const h = parseFloat(height) || 0;
  const price = parseFloat(pricePerSqFt) || 0;
  const qty = parseFloat(quantity) || 0;

  const area = w * h;
  const costPerBanner = area * price;
  const totalCost = costPerBanner * qty;

  const content = (
    <>
      <Typography variant="h2">How to Use the Banner Printing Cost Calculator</Typography>
      <Typography variant="body1">
        Enter your banner&apos;s width and height in feet, the printer&apos;s price per square foot, and how many
        banners you need. The calculator multiplies width by height to get the banner&apos;s area, multiplies
        that by the price per square foot to get the cost of one banner, and multiplies by quantity for a total
        order cost.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Area = Width × Height<br />
        Cost per Banner = Area × Price per Sq Ft<br />
        Total Cost = Cost per Banner × Quantity
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 4 × 2 ft banner (8 sq ft) at $6 per square foot costs $48 for one banner. Ordering 3 of them brings
        the total to $144.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Budgeting the printing cost of a banner for an event, storefront, or trade show.</li>
          <li>Comparing quotes from different print shops using a consistent per-square-foot rate.</li>
          <li>Estimating total cost for ordering multiple banners at once.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Banner Size Calculator?</strong> The Banner Size Calculator recommends appropriate banner dimensions based on how far away it will typically be viewed from. This tool assumes you already know the dimensions you want and calculates the printing cost for a banner of that size — the two tools are complementary steps in planning a banner.</li>
          <li><strong>Does price per square foot vary by material?</strong> Yes — vinyl, mesh, fabric, and other banner materials all have different typical price points per square foot, and finishing options (grommets, hemming, pole pockets) can add to the base cost. Use your specific print shop's quoted rate for the material and finish you want.</li>
          <li><strong>Does ordering more banners lower the per-square-foot price?</strong> Often yes in practice — many print shops offer volume discounts at higher quantities. This calculator uses a flat rate you enter, so if your printer offers a bulk discount, adjust the price per square foot to reflect that lower rate.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/banner-printing-cost-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Stack spacing={3}>
          <Stack direction="row" spacing={1.5}>
            <TextField label="Width" type="number" value={width} onChange={(e) => setWidth(e.target.value)} fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }} />
            <TextField label="Height" type="number" value={height} onChange={(e) => setHeight(e.target.value)} fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }} />
          </Stack>
          <TextField
            label="Price per Square Foot"
            type="number"
            value={pricePerSqFt}
            onChange={(e) => setPricePerSqFt(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField label="Quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} fullWidth />
        </Stack>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
          <Stack spacing={2}>
            <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6">Banner Area</Typography>
              <Typography variant="h6" fontWeight="bold">{area.toFixed(1)} sq ft</Typography>
            </Paper>
            <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6">Cost per Banner</Typography>
              <Typography variant="h6" fontWeight="bold">{money(costPerBanner)}</Typography>
            </Paper>
            <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', bgcolor: 'primary.main', color: 'white' }}>
              <Typography variant="h6">Total Cost ({qty || 0} banner{qty === 1 ? '' : 's'})</Typography>
              <Typography variant="h6" fontWeight="bold">{money(totalCost)}</Typography>
            </Paper>
          </Stack>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BannerPrintingCostCalculator;
