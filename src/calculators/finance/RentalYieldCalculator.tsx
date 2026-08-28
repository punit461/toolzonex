'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, Select, MenuItem } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { CURRENCIES, CurrencyCode, currencySymbol } from '../currencyConfig';

const yieldCurrencies = CURRENCIES.filter((c) => c.value === 'INR' || c.value === 'USD');

const RentalYieldCalculatorContent = () => {
  const [price, setPrice] = useState<string>('500000');
  const [monthlyRent, setMonthlyRent] = useState<string>('25000');
  const [expenses, setExpenses] = useState<string>('30000');
  const [monthsRented, setMonthsRented] = useState<string>('12');
  const [currency, setCurrency] = useState<CurrencyCode>('INR');

  const P = parseFloat(price) || 0;
  const rent = parseFloat(monthlyRent) || 0;
  const annualExpenses = parseFloat(expenses) || 0;
  const months = parseFloat(monthsRented) || 0;

  const grossAnnualRent = rent * months;
  const netAnnualRent = grossAnnualRent - annualExpenses;
  const grossYield = P > 0 ? (grossAnnualRent / P) * 100 : null;
  const netYield = P > 0 ? (netAnnualRent / P) * 100 : null;

  const sym = currencySymbol(currency);
  const money = (v: number) => `${sym}${Number.isNaN(v) ? 0 : v.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography>Currency</Typography>
          <Select
            size="small"
            value={currency}
            onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
            sx={{ minWidth: 110 }}
          >
            {yieldCurrencies.map((c) => (
              <MenuItem key={c.value} value={c.value}>{c.label}</MenuItem>
            ))}
          </Select>
        </Box>
        <TextField
          label="Property Purchase Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
          slotProps={{ input: { startAdornment: <InputAdornment position="start">{sym}</InputAdornment> } }}
        />
        <TextField
          label="Monthly Rent"
          type="number"
          value={monthlyRent}
          onChange={(e) => setMonthlyRent(e.target.value)}
          fullWidth
          slotProps={{ input: { startAdornment: <InputAdornment position="start">{sym}</InputAdornment> } }}
        />
        <TextField
          label="Annual Operating Expenses"
          type="number"
          value={expenses}
          helperText="Maintenance, property tax, insurance, and other annual costs."
          onChange={(e) => setExpenses(e.target.value)}
          fullWidth
          slotProps={{ input: { startAdornment: <InputAdornment position="start">{sym}</InputAdornment> } }}
        />
        <TextField
          label="Months Rented Per Year"
          type="number"
          value={monthsRented}
          onChange={(e) => setMonthsRented(e.target.value)}
          fullWidth
          slotProps={{ input: { endAdornment: <InputAdornment position="end">mo/yr</InputAdornment> } }}
        />

        <Paper variant="outlined" sx={{ p: 2, bgcolor: 'action.hover' }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
            Gross Yield = (Annual Rent / Price) × 100
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace', mt: 0.5 }}>
            Net Yield = (Annual Rent − Expenses) / Price × 100
          </Typography>
        </Paper>
      </Box>

      <Box>
        <Paper
          sx={{
            p: 4,
            bgcolor: 'primary.main',
            color: 'white',
            borderRadius: 4,
            minHeight: 200,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h3" fontWeight="bold">
            {netYield !== null ? `${netYield.toFixed(2)}%` : '--'}
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            Net Rental Yield
          </Typography>
        </Paper>

        <Paper variant="outlined" sx={{ mt: 3, p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Gross Annual Rent</Typography>
            <Typography variant="body2" fontWeight="bold">{money(grossAnnualRent)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Gross Yield</Typography>
            <Typography variant="body2" fontWeight="bold">
              {grossYield !== null ? `${grossYield.toFixed(2)}%` : '--'}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Net Annual Rent</Typography>
            <Typography variant="body2" fontWeight="bold">{money(netAnnualRent)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Annual Operating Expenses</Typography>
            <Typography variant="body2" fontWeight="bold">{money(annualExpenses)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">Net Yield</Typography>
            <Typography variant="body2" fontWeight="bold">
              {netYield !== null ? `${netYield.toFixed(2)}%` : '--'}
            </Typography>
          </Box>
        </Paper>

        <Paper variant="outlined" sx={{ mt: 3, p: 2, bgcolor: 'action.hover' }}>
          <Typography variant="body2" color="text.secondary">
            Cap rate comparison: the gross yield behaves like a simplified cap rate — it ignores
            vacancy, operating costs, and purchase costs. The net yield subtracts those costs, making
            it the fairer figure to compare against other local property yields or the risk-free rate.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

const RentalYieldCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How Does the Rental Yield Calculator Work?</Typography>
      <Typography variant="body1">
        The calculator multiplies your monthly rent by the months rented per year to get gross annual
        rent, then divides by the property purchase price and multiplies by 100 for the gross yield.
        Subtracting annual operating expenses (maintenance, tax, insurance) from gross annual rent
        gives the net annual rent, and the same division yields the net yield. The net figure is the
        one investors compare, because it reflects the real cash a property produces after its running
        costs.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A property bought for $500,000 that rents for $2,500 a month for 12 months produces $30,000 in
        gross annual rent, a gross yield of 6%. With $6,000 in annual operating expenses, net annual
        rent drops to $24,000 and net yield to 4.8%. That 1.2 percentage point gap is the real cost of
        owning and maintaining the property.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Screening rental properties before a purchase using a quick yield estimate.</li>
          <li>Comparing several properties with different prices and rents on the same basis.</li>
          <li>Stress-testing a property by modelling vacancies or higher maintenance costs.</li>
          <li>Benchmarking a property against bank fixed deposits or other investments.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is a good rental yield?</Typography>
      <Typography variant="body1">
        A healthy net yield is usually 3-5% in metro markets, while better returns are typically found
        in smaller cities and high-rent commercial pockets. Anything that beats the local risk-free
        rate after costs is reasonable, and location usually matters more than the exact number.
      </Typography>
      <Typography variant="h3">How is yield different from cap rate?</Typography>
      <Typography variant="body1">
        Gross yield treats the purchase price as the investment and ignores costs, similar to a
        simplified cap rate. A true cap rate divides net operating income by value, which matches the
        net yield here when the property is bought at market value without heavy transaction costs.
      </Typography>
      <Typography variant="h3">Should I leave vacancy out of the calculation?</Typography>
      <Typography variant="body1">
        The default of 12 rented months assumes full occupancy. If you expect any vacancy, reduce the
        months rented or bump up operating expenses, because an empty month has rent of zero but still
        carries tax and maintenance.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/rental-yield-calculator" content={content}>
      <RentalYieldCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RentalYieldCalculator;