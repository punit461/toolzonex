'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const DiscountCalculatorContent = () => {
  const [originalPrice, setOriginalPrice] = useState<string>('100');
  const [discountPercent, setDiscountPercent] = useState<string>('20');
  
  const price = parseFloat(originalPrice) || 0;
  const discount = parseFloat(discountPercent) || 0;

  const savedAmount = price * (discount / 100);
  const finalPrice = price - savedAmount;

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      
      {/* Input Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Original Price"
          type="number"
          value={originalPrice}
          onChange={(e) => setOriginalPrice(e.target.value)}
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
        <TextField
          label="Discount Percentage"
          type="number"
          value={discountPercent}
          onChange={(e) => setDiscountPercent(e.target.value)}
          fullWidth
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
        />
      </Box>

      {/* Output Panel */}
      <Box>
        <Typography variant="subtitle1" fontWeight="600" mb={2}>Savings Summary</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="h6">Final Price</Typography>
            <Typography variant="h6" fontWeight="bold">${finalPrice.toFixed(2)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="subtitle1" color="text.secondary">Amount Saved</Typography>
            <Typography variant="subtitle1" fontWeight="bold" color="success.main">${savedAmount.toFixed(2)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="subtitle1" color="text.secondary">Original Price</Typography>
            <Typography variant="subtitle1" sx={{ textDecoration: 'line-through' }}>${price.toFixed(2)}</Typography>
          </Paper>
        </Box>
      </Box>

    </Box>
  );
};

const DiscountCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How to calculate a discount?</Typography>
      <Typography variant="body1">
        To calculate a discount, multiply the original price by the discount percentage (as a decimal), then subtract that amount from the original price.
        <br/><br/>
        For example, a 20% discount on a $100 item: 
        `$100 * 0.20 = $20 saved`. 
        The final price is `$100 - $20 = $80`.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Discount Calculator"
      description="Calculate the final price and amount saved after a percentage discount is applied. Free online discount calculator."
      url="/utilities/discount-calculator"
      content={content}
      category="Utilities"
    >
      <DiscountCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default DiscountCalculator;
