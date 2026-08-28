'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, Select, MenuItem } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { CURRENCIES, CurrencyCode, currencySymbol } from '../currencyConfig';

const cryptoCurrencies = CURRENCIES.filter((c) => c.value === 'USD' || c.value === 'INR');

const CryptoProfitCalculatorContent = () => {
  const [buyPrice, setBuyPrice] = useState<string>('50000');
  const [sellPrice, setSellPrice] = useState<string>('60000');
  const [quantity, setQuantity] = useState<string>('1');
  const [buyFee, setBuyFee] = useState<string>('0.1');
  const [sellFee, setSellFee] = useState<string>('0.1');
  const [currency, setCurrency] = useState<CurrencyCode>('USD');

  const buy = parseFloat(buyPrice) || 0;
  const sell = parseFloat(sellPrice) || 0;
  const qty = parseFloat(quantity) || 0;
  const bFee = parseFloat(buyFee) || 0;
  const sFee = parseFloat(sellFee) || 0;

  const investment = buy * qty + (buy * qty * bFee) / 100;
  const totalProceeds = sell * qty - (sell * qty * sFee) / 100;
  const profit = totalProceeds - investment;
  const profitPct = investment > 0 ? (profit / investment) * 100 : 0;
  const roiPct = profitPct;

  const isProfit = profit > 0;
  const isLoss = profit < 0;
  const resultColor = isLoss ? 'error.main' : isProfit ? 'success.main' : 'inherit';
  const totalFees = (buy * qty * bFee) / 100 + (sell * qty * sFee) / 100;

  const sym = currencySymbol(currency);
  const money = (v: number) => `${sym}${v.toLocaleString('en-US', {
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
            {cryptoCurrencies.map((c) => (
              <MenuItem key={c.value} value={c.value}>{c.label}</MenuItem>
            ))}
          </Select>
        </Box>
        <TextField
          label="Buy Price Per Coin"
          type="number"
          value={buyPrice}
          onChange={(e) => setBuyPrice(e.target.value)}
          fullWidth
          slotProps={{ input: { startAdornment: <InputAdornment position="start">{sym}</InputAdornment> } }}
        />
        <TextField
          label="Sell Price Per Coin"
          type="number"
          value={sellPrice}
          onChange={(e) => setSellPrice(e.target.value)}
          fullWidth
          slotProps={{ input: { startAdornment: <InputAdornment position="start">{sym}</InputAdornment> } }}
        />
        <TextField
          label="Quantity of Coins"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          fullWidth
          slotProps={{ input: { endAdornment: <InputAdornment position="end">coins</InputAdornment> } }}
        />
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <TextField
            label="Buy Fees (%)"
            type="number"
            value={buyFee}
            onChange={(e) => setBuyFee(e.target.value)}
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
          />
          <TextField
            label="Sell Fees (%)"
            type="number"
            value={sellFee}
            onChange={(e) => setSellFee(e.target.value)}
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
          />
        </Box>

        <Paper variant="outlined" sx={{ p: 2, bgcolor: 'action.hover' }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
            Profit = (Sell − Buy) × Qty − Fees
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace', mt: 0.5 }}>
            ({sell} − {buy}) × {qty} − {money(totalFees)} = {money(profit)}
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
            {profit >= 0 ? money(profit) : `−${money(Math.abs(profit))}`}
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            {isProfit ? 'Profit' : isLoss ? 'Loss' : 'Breakeven'}
          </Typography>
        </Paper>

        <Paper variant="outlined" sx={{ mt: 3, p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Total Investment</Typography>
            <Typography variant="body2" fontWeight="bold">{money(investment)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Total Proceeds</Typography>
            <Typography variant="body2" fontWeight="bold">{money(totalProceeds)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Total Fees (Buy + Sell)</Typography>
            <Typography variant="body2" fontWeight="bold">
              {money(totalFees)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Profit / Loss</Typography>
            <Typography variant="body2" fontWeight="bold" sx={{ color: resultColor }}>
              {profit >= 0 ? money(profit) : `−${money(Math.abs(profit))}`}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Profit %</Typography>
            <Typography variant="body2" fontWeight="bold" sx={{ color: resultColor }}>
              {profitPct.toFixed(2)}%
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">ROI %</Typography>
            <Typography variant="body2" fontWeight="bold">
              {roiPct.toFixed(2)}%
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

const CryptoProfitCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How Does the Crypto Profit Calculator Work?</Typography>
      <Typography variant="body1">
        Enter the price you paid per coin, the price you plan to sell at, and the quantity of coins.
        The calculator multiplies the price difference by the quantity and then adjusts for optional
        buy and sell fees, which are applied as a percentage of the buy and sell order values. The
        result is the net profit or loss, expressed in money and as a percentage of your total
        investment (ROI).
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Buy 1 coin at $50,000 and sell it at $60,000 with 0.1% fees on each side. The gross profit is
        (60,000 − 50,000) × 1 = $10,000. Buy fees add $50 and sell fees deduct $60, so net profit is
        about $9,890 and return on investment about 19.8%.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Working out the real take-home profit after exchange fees.</li>
          <li>Planning a sell price that meets a target return.</li>
          <li>Comparing profits across different amounts of a coin.</li>
          <li>Estimating losses before exiting a falling position.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How are the fees applied?</Typography>
      <Typography variant="body1">
        The buy fee is a percentage of your buy order value (buy price × quantity) and the sell fee a
        percentage of your sell order value (sell price × quantity). Both are subtracted from the
        gross profit. Leaving both at 0 ignores fees entirely.
      </Typography>
      <Typography variant="h3">Does this include crypto-to-crypto conversion or transfer fees?</Typography>
      <Typography variant="body1">
        Only the buy and sell order fees are included. Network transfer fees, spread between bid and
        ask, and conversion costs for moving between coins are not modelled, so actual results can be
        slightly lower.
      </Typography>
      <Typography variant="h3">Is the profit taxable?</Typography>
      <Typography variant="body1">
        This calculator reports gross trading profit only. Crypto gains are taxed in most countries
        when sold at a gain, and whether you file as a trader or investor changes how the gain is
        treated — a tax professional should confirm your applicable rate.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/crypto-profit-calculator" content={content}>
      <CryptoProfitCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CryptoProfitCalculator;