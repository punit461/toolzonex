'use client';

import { useState } from 'react';
import { Box, TextField, Typography, InputAdornment } from '@mui/material';
import CalculatorShell from '../components/CalculatorShell';

const SilverRateCalculator = () => {
  const [weight, setWeight] = useState<number>(100); // in grams
  const [ratePerKg, setRatePerKg] = useState<number>(85000); // default mock rate
  const [makingChargesPct, setMakingChargesPct] = useState<number>(10);
  const [gstPct, setGstPct] = useState<number>(3); // Standard GST on silver is 3%

  // Calculations
  const ratePerGram = ratePerKg / 1000;
  const silverValue = weight * ratePerGram;
  const makingCharges = (silverValue * makingChargesPct) / 100;
  const taxableValue = silverValue + makingCharges;
  const gstAmount = (taxableValue * gstPct) / 100;
  const totalPrice = taxableValue + gstAmount;

  const content = (
    <>
      <Typography variant="h2">How to calculate the price of silver?</Typography>
      <Typography variant="body1">
        Silver is usually priced per Kilogram (KG) in India. Just like gold, buying silver jewelry or utensils includes additional costs beyond the raw metal price.
      </Typography>
      <ul>
        <li><strong>Silver Value:</strong> Weight (in grams) × Rate per gram (Rate per KG / 1000)</li>
        <li><strong>Making Charges:</strong> For silver, making charges are often higher in percentage terms than gold because of intricate designs.</li>
        <li><strong>GST:</strong> A flat 3% Goods and Services Tax is levied on the total value.</li>
      </ul>
    </>
  );

  return (
    <CalculatorShell
      title="Silver Rate Calculator"
      description="Calculate the exact final price of silver items including making charges and GST."
      url="/finance/silver-calculator"
      content={content}
    >
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Silver Rate (Per 1 KG)</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              value={ratePerKg}
              onChange={(e) => setRatePerKg(Number(e.target.value))}
              onFocus={(e) => e.target.select()}
              slotProps={{ input: { startAdornment: <InputAdornment position="start">₹</InputAdornment> } }}
            />
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Item Weight (Grams)</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              onFocus={(e) => e.target.select()}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">g</InputAdornment> } }}
            />
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Making Charges (%)</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              value={makingChargesPct}
              onChange={(e) => setMakingChargesPct(Number(e.target.value))}
              onFocus={(e) => e.target.select()}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
            />
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>GST on Silver (%)</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              value={gstPct}
              onChange={(e) => setGstPct(Number(e.target.value))}
              onFocus={(e) => e.target.select()}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
            />
          </Box>
        </Box>

        <Box>
          <Box sx={{ p: 4, bgcolor: '#f9f9f9', borderRadius: 2, height: '100%' }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>Price Breakdown</Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, mt: 3 }}>
              <Typography>Value of Silver</Typography>
              <Typography sx={{ fontWeight: 500 }}>₹ {Math.round(silverValue).toLocaleString('en-IN')}</Typography>
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
    </CalculatorShell>
  );
};

export default SilverRateCalculator;
