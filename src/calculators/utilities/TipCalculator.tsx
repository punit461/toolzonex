'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, Slider, Select, MenuItem } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { CURRENCIES, CurrencyCode, currencySymbol, formatMoney } from '../currencyConfig';

const TipCalculatorContent = () => {
  const [billAmount, setBillAmount] = useState<string>('50');
  const [tipPercentage, setTipPercentage] = useState<number>(15);
  const [splitCount, setSplitCount] = useState<number>(1);
  const [currency, setCurrency] = useState<CurrencyCode>('USD');

  const bill = parseFloat(billAmount) || 0;
  
  const tipAmount = bill * (tipPercentage / 100);
  const totalBill = bill + tipAmount;

  const tipPerPerson = splitCount > 0 ? tipAmount / splitCount : 0;
  const totalPerPerson = splitCount > 0 ? totalBill / splitCount : 0;

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      
      {/* Input Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
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
          label="Bill Amount"
          type="number"
          value={billAmount}
          onChange={(e) => setBillAmount(e.target.value)}
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position="start">{currencySymbol(currency)}</InputAdornment>,
          }}
        />

        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="subtitle2" fontWeight="bold">Tip %</Typography>
            <Typography variant="subtitle2" fontWeight="bold">{tipPercentage}%</Typography>
          </Box>
          <Slider
            value={tipPercentage}
            min={0}
            max={50}
            step={1}
            marks={[
              { value: 10, label: '10%' },
              { value: 15, label: '15%' },
              { value: 20, label: '20%' },
              { value: 25, label: '25%' },
            ]}
            onChange={(e, val) => setTipPercentage(val as number)}
          />
        </Box>

        <Box mt={2}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="subtitle2" fontWeight="bold">Split between (people)</Typography>
            <Typography variant="subtitle2" fontWeight="bold">{splitCount}</Typography>
          </Box>
          <Slider
            value={splitCount}
            min={1}
            max={20}
            step={1}
            marks
            onChange={(e, val) => setSplitCount(val as number)}
          />
        </Box>
      </Box>

      {/* Output Panel */}
      <Box>
        <Typography variant="subtitle1" fontWeight="600" mb={2}>Tip Summary</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="h6">Total Bill</Typography>
            <Typography variant="h6" fontWeight="bold">{formatMoney(totalBill, currency)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="subtitle1" color="text.secondary">Tip Amount</Typography>
            <Typography variant="subtitle1" fontWeight="bold">{formatMoney(tipAmount, currency)}</Typography>
          </Paper>

          {splitCount > 1 && (
            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="subtitle2" fontWeight="600" color="text.secondary">Per Person ({splitCount})</Typography>
              <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="subtitle1" color="text.secondary">Total Per Person</Typography>
                <Typography variant="subtitle1" fontWeight="bold">{formatMoney(totalPerPerson, currency)}</Typography>
              </Paper>
              <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="subtitle1" color="text.secondary">Tip Per Person</Typography>
                <Typography variant="subtitle1" fontWeight="bold">{formatMoney(tipPerPerson, currency)}</Typography>
              </Paper>
            </Box>
          )}
        </Box>
      </Box>

    </Box>
  );
};

const TipCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How to use the Tip Calculator?</Typography>
      <Typography variant="body1">
        Simply enter your total bill amount, select your desired tip percentage, and indicate how many people are splitting the bill. We'll instantly calculate the tip amount, total bill, and exactly how much each person needs to pay.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A $80 bill split 4 ways with a 20% tip works out to a $16 tip, a $96 total, and $24 per person.
      </Typography>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What&apos;s a standard tip percentage?</Typography>
      <Typography variant="body1">
        In the US, 15-20% is typical for restaurant service; norms vary by country and service type.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Splitting a restaurant bill evenly among a group of friends.</li>
          <li>Quickly checking a fair tip amount before paying.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell
      url="/utilities/tip-calculator"
      content={content}
    >
      <TipCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TipCalculator;
