'use client';

import { useState } from 'react';
import { Box, TextField, Typography, InputAdornment } from '@mui/material';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const GoldRateCalculator = () => {
  const [weight, setWeight] = useState<number>(10); // in grams
  const [ratePer10g, setRatePer10g] = useState<number>(75000);
  const [makingChargesPct, setMakingChargesPct] = useState<number>(8);
  const [gstPct, setGstPct] = useState<number>(3); // Standard GST on gold is 3%

  // Calculations
  const ratePerGram = ratePer10g / 10;
  const goldValue = weight * ratePerGram;
  const makingCharges = (goldValue * makingChargesPct) / 100;
  const taxableValue = goldValue + makingCharges;
  const gstAmount = (taxableValue * gstPct) / 100;
  const totalPrice = taxableValue + gstAmount;

  const content = (
    <>
      <Typography variant="h2">How to calculate the price of gold jewelry?</Typography>
      <Typography variant="body1">
        Buying gold in India is a cultural tradition and a financial investment. However, the final price you pay at the jeweler is higher than the spot gold rate. Here is the formula:
      </Typography>
      <ul>
        <li><strong>Gold Value:</strong> Weight (in grams) × Rate per gram</li>
        <li><strong>Making Charges:</strong> Usually a percentage of the gold value (ranging from 5% to 20% depending on the design).</li>
        <li><strong>GST:</strong> A flat 3% Goods and Services Tax is levied on the total value (Gold Value + Making Charges).</li>
      </ul>
      <Typography variant="body1">
        Using our online Gold Rate Calculator ensures you know exactly how much you are paying for the actual gold versus the taxes and labor costs.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        10 grams of 22K gold at ₹6,000/gram = ₹60,000 gold value. At 10% making charges (₹6,000) and 3% GST on
        ₹66,000 (₹1,980), the final price comes to ₹67,980.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking a jeweler&apos;s quoted price against the actual gold rate before buying.</li>
          <li>Comparing making charges across different jewelers for the same design.</li>
          <li>Estimating the resale value of gold jewelry you already own.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why does the final price include GST on making charges too?</Typography>
      <Typography variant="body1">
        Indian GST rules apply the 3% rate to the combined value of gold plus making charges, not just the raw
        gold value — that&apos;s why the tax amount is higher than 3% of the gold price alone.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Gold Rate Calculator"
      description="Calculate the exact final price of gold jewelry including making charges and GST."
      url="/finance/gold-calculator"
      content={content}
      category="Finance"
    >
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Gold Weight (Grams)</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              value={Number.isNaN(weight) ? '' : weight}
              onChange={(e) => setWeight(e.target.value === '' ? NaN : Number(e.target.value))}
              onFocus={(e) => e.target.select()}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">g</InputAdornment> } }}
            />
          </Box>
          
          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Gold Rate (Per 10 Grams)</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              value={Number.isNaN(ratePer10g) ? '' : ratePer10g}
              onChange={(e) => setRatePer10g(e.target.value === '' ? NaN : Number(e.target.value))}
              onFocus={(e) => e.target.select()}
              slotProps={{ input: { startAdornment: <InputAdornment position="start">₹</InputAdornment> } }}
            />
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Making Charges (%)</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              value={Number.isNaN(makingChargesPct) ? '' : makingChargesPct}
              onChange={(e) => setMakingChargesPct(e.target.value === '' ? NaN : Number(e.target.value))}
              onFocus={(e) => e.target.select()}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
            />
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>GST on Gold (%)</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              value={Number.isNaN(gstPct) ? '' : gstPct}
              onChange={(e) => setGstPct(e.target.value === '' ? NaN : Number(e.target.value))}
              onFocus={(e) => e.target.select()}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
            />
          </Box>
        </Box>

        <Box>
          <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2, height: '100%' }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>Price Breakdown</Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, mt: 3 }}>
              <Typography>Value of Gold</Typography>
              <Typography sx={{ fontWeight: 500 }}>₹ {Math.round(goldValue).toLocaleString('en-IN')}</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Making Charges</Typography>
              <Typography sx={{ fontWeight: 500 }}>+ ₹ {Math.round(makingCharges).toLocaleString('en-IN')}</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, pb: 2, borderBottom: '1px solid #E5E5E5' }}>
              <Typography>GST ({gstPct}%)</Typography>
              <Typography sx={{ fontWeight: 500 }}>+ ₹ {Math.round(gstAmount).toLocaleString('en-IN')}</Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>Total Final Price</Typography>
              <Typography variant="h4" color="primary.main" sx={{ fontWeight: 800 }}>₹ {Math.round(totalPrice).toLocaleString('en-IN')}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default GoldRateCalculator;
