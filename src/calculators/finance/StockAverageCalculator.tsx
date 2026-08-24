'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Button, IconButton, Select, MenuItem, InputAdornment, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { CURRENCIES, CurrencyCode, currencySymbol, formatMoney } from '../currencyConfig';

interface Trade {
  id: string;
  quantity: number;
  price: number;
}

let nextId = 3;

const StockAverageCalculator = () => {
  const [trades, setTrades] = useState<Trade[]>([
    { id: '1', quantity: 10, price: 100 },
    { id: '2', quantity: 15, price: 120 },
  ]);
  const [currency, setCurrency] = useState<CurrencyCode>('INR');

  const addTrade = () => {
    setTrades([...trades, { id: String(nextId++), quantity: 0, price: 0 }]);
  };

  const removeTrade = (id: string) => {
    setTrades(trades.filter((t) => t.id !== id));
  };

  const updateTrade = (id: string, field: 'quantity' | 'price', value: number) => {
    setTrades(trades.map((t) => (t.id === id ? { ...t, [field]: value } : t)));
  };

  const { totalShares, totalInvested, averagePrice } = useMemo(() => {
    let shares = 0;
    let invested = 0;
    for (const t of trades) {
      const qty = Number.isNaN(t.quantity) ? 0 : t.quantity;
      const price = Number.isNaN(t.price) ? 0 : t.price;
      shares += qty;
      invested += qty * price;
    }
    return {
      totalShares: shares,
      totalInvested: invested,
      averagePrice: shares > 0 ? invested / shares : 0,
    };
  }, [trades]);

  const content = (
    <>
      <Typography variant="h2">What is average stock price / cost basis?</Typography>
      <Typography variant="body1">
        If you&apos;ve bought shares of the same stock across multiple transactions at different prices, your
        &quot;average price&quot; (or cost basis) is the <em>quantity-weighted</em> average of what you paid — not
        a simple average of the prices. Buying more shares at a lower price pulls your average down further than
        buying the same number of shares would at a higher price.
      </Typography>

      <Typography variant="h2">Formula</Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Average Price = Σ(Quantity × Price) ÷ Σ(Quantity)
      </Box>
      <Typography variant="body1">
        Add each buy transaction — quantity and price per share — below. Remove a row with the trash icon if you
        entered it by mistake. The calculator recomputes your weighted average cost and total invested amount as
        you type.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        You buy 10 shares at ₹100 (₹1,000 invested) and later buy 15 more shares at ₹120 (₹1,800 invested). Your
        total investment is ₹2,800 for 25 shares, giving a weighted average price of ₹112 — not the simple
        average of ₹100 and ₹120, which would be ₹110.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Tracking your true cost basis after averaging down or up on multiple purchases.</li>
          <li>Working out the breakeven price you&apos;d need to sell at to avoid a loss.</li>
          <li>Deciding whether adding to a position at a lower price meaningfully improves your average.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is average price the same as breakeven price?</Typography>
      <Typography variant="body1">
        Roughly, yes, before accounting for brokerage fees and taxes — selling all your shares exactly at your
        average price would return your original invested amount. Include any transaction charges separately if
        you need an exact breakeven figure.
      </Typography>
      <Typography variant="h3">Does &quot;averaging down&quot; always help?</Typography>
      <Typography variant="body1">
        It lowers your average cost, but only makes sense if you still believe in the stock&apos;s long-term
        prospects — buying more of a falling stock purely to lower your average, without reassessing why it
        fell, can increase your losses if the decline continues.
      </Typography>
      <Typography variant="h3">Can I use this for a stock I&apos;ve partially sold?</Typography>
      <Typography variant="body1">
        This calculator only totals buy transactions. If you&apos;ve sold part of a position, most brokers use
        FIFO (first-in-first-out) accounting to determine which lot was sold, which can change your remaining
        average cost — check your broker&apos;s statement for the post-sale average rather than recomputing it
        here.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/stock-average-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Buy Transactions</Typography>
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

          <Stack spacing={2}>
            {trades.map((trade) => (
              <Stack key={trade.id} direction="row" spacing={1.5} alignItems="center">
                <TextField
                  label="Quantity"
                  type="number"
                  size="small"
                  fullWidth
                  onFocus={(e) => e.target.select()}
                  value={Number.isNaN(trade.quantity) ? '' : trade.quantity}
                  onChange={(e) => updateTrade(trade.id, 'quantity', e.target.value === '' ? NaN : Number(e.target.value))}
                />
                <TextField
                  label="Price / Share"
                  type="number"
                  size="small"
                  fullWidth
                  onFocus={(e) => e.target.select()}
                  value={Number.isNaN(trade.price) ? '' : trade.price}
                  onChange={(e) => updateTrade(trade.id, 'price', e.target.value === '' ? NaN : Number(e.target.value))}
                  slotProps={{
                    input: {
                      startAdornment: <InputAdornment position="start">{currencySymbol(currency)}</InputAdornment>,
                    }
                  }}
                />
                <IconButton color="error" size="small" onClick={() => removeTrade(trade.id)} disabled={trades.length <= 1}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Stack>
            ))}
          </Stack>

          <Button startIcon={<AddIcon />} onClick={addTrade} sx={{ mt: 2 }}>
            Add Transaction
          </Button>
        </Box>

        <Box>
          <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2, textAlign: 'center', height: '100%' }}>
            <Typography variant="h6" color="text.secondary">Average Price / Share</Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 4, color: 'primary.main' }}>
              {formatMoney(averagePrice, currency)}
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">Total Shares</Typography>
                <Typography variant="h6">{totalShares.toLocaleString()}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Total Invested</Typography>
                <Typography variant="h6">{formatMoney(totalInvested, currency)}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default StockAverageCalculator;
