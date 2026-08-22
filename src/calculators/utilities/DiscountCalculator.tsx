'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, Select, MenuItem } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { CURRENCIES, CurrencyCode, currencySymbol, formatMoney } from '../currencyConfig';

const DiscountCalculatorContent = () => {
  const [originalPrice, setOriginalPrice] = useState<string>('100');
  const [discountPercent, setDiscountPercent] = useState<string>('20');
  const [currency, setCurrency] = useState<CurrencyCode>('USD');

  const price = parseFloat(originalPrice) || 0;
  const discount = parseFloat(discountPercent) || 0;

  const savedAmount = price * (discount / 100);
  const finalPrice = price - savedAmount;

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      
      {/* Input Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Select
            size="small"
            value={currency}
            onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
            sx={{ minWidth: 110 }}
          >
            {CURRENCIES.map((c) => (
              <MenuItem key={c.value} value={c.value}>{c.value}</MenuItem>
            ))}
          </Select>
        </Box>
        <TextField
          label="Original Price"
          type="number"
          value={originalPrice}
          onChange={(e) => setOriginalPrice(e.target.value)}
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position="start">{currencySymbol(currency)}</InputAdornment>,
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
            <Typography variant="h6" fontWeight="bold">{formatMoney(finalPrice, currency)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="subtitle1" color="text.secondary">Amount Saved</Typography>
            <Typography variant="subtitle1" fontWeight="bold" color="success.main">{formatMoney(savedAmount, currency)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="subtitle1" color="text.secondary">Original Price</Typography>
            <Typography variant="subtitle1" sx={{ textDecoration: 'line-through' }}>{formatMoney(price, currency)}</Typography>
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

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A $250 jacket with a 30% discount saves $75, bringing the final price to $175.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking the final sale price during shopping.</li>
          <li>Comparing discount percentages across different stores or deals.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How do I stack multiple discounts?</Typography>
      <Typography variant="body1">
        Apply them sequentially, not by adding percentages — a 10% discount followed by another 10% off is a
        19% total discount, not 20%, since the second discount applies to the already-reduced price.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      url="/utilities/discount-calculator"
      content={content}
    >
      <DiscountCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default DiscountCalculator;
