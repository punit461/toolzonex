'use client';

import { useEffect, useState, useMemo } from 'react';
import { Box, TextField, Typography, Chip, IconButton, CircularProgress, Alert } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Direction = 'KRW_TO_USD' | 'USD_TO_KRW';

const KRW_QUICK_AMOUNTS = [1000, 10000, 100000, 1000000, 100000000, 1000000000];
const USD_QUICK_AMOUNTS = [1, 10, 50, 100, 500, 1000];

const formatKRW = (value: number) => `₩${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
const formatUSD = (value: number) => `$${value.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;

const KrwToUsdConverter = () => {
  const [amount, setAmount] = useState<number>(10000);
  const [direction, setDirection] = useState<Direction>('KRW_TO_USD');
  const [krwPerUsd, setKrwPerUsd] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch('https://api.frankfurter.dev/v1/latest?from=USD&to=KRW')
      .then((res) => {
        if (!res.ok) throw new Error('Request failed');
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        const rate = data.rates?.KRW;
        if (typeof rate !== 'number') throw new Error('Missing rate');
        setKrwPerUsd(rate);
        setLastUpdated(data.date ?? null);
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setError('Could not fetch live exchange rates. Check your connection and try again.');
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const fromCurrency = direction === 'KRW_TO_USD' ? 'KRW' : 'USD';
  const toCurrency = direction === 'KRW_TO_USD' ? 'USD' : 'KRW';
  const quickAmounts = direction === 'KRW_TO_USD' ? KRW_QUICK_AMOUNTS : USD_QUICK_AMOUNTS;

  const convertedAmount = useMemo(() => {
    if (krwPerUsd === null || Number.isNaN(amount)) return null;
    return direction === 'KRW_TO_USD' ? amount / krwPerUsd : amount * krwPerUsd;
  }, [krwPerUsd, amount, direction]);

  const rateLine = useMemo(() => {
    if (krwPerUsd === null) return null;
    return direction === 'KRW_TO_USD'
      ? `1 USD = ${krwPerUsd.toLocaleString('en-US', { maximumFractionDigits: 2 })} KRW`
      : `1 KRW = ${(1 / krwPerUsd).toFixed(6)} USD`;
  }, [krwPerUsd, direction]);

  const swapDirection = () => {
    setDirection((d) => (d === 'KRW_TO_USD' ? 'USD_TO_KRW' : 'KRW_TO_USD'));
  };

  const content = (
    <>
      <Typography variant="h2">How this KRW to USD converter works</Typography>
      <Typography variant="body1">
        This won to USD converter converts between the South Korean Won (KRW) and the US Dollar (USD) using
        live foreign exchange rates sourced from the European Central Bank via the free Frankfurter API. Enter
        an amount in either currency, or tap one of the popular amount buttons, and toggle the swap icon to
        switch between KRW → USD and USD → KRW.
      </Typography>
      <Alert severity="info" sx={{ my: 2 }}>
        Exchange rates on this page refresh once per day (not tick-by-tick), so the figure shown is a close
        estimate rather than a live market feed.
      </Alert>

      <Typography variant="h2">Formula</Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        USD Amount = KRW Amount ÷ (KRW per 1 USD)
        <br />
        KRW Amount = USD Amount × (KRW per 1 USD)
      </Box>

      <Typography variant="h2">Examples</Typography>
      <Typography variant="body1">
        Using an illustrative example rate of ₩1,350 per $1 (your actual conversion above uses today&apos;s live
        rate):
      </Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>1,000 won to USD ≈ $0.74</li>
          <li>10,000 won to USD ≈ $7.41</li>
          <li>100,000 won to USD ≈ $74.07</li>
          <li>1,000,000 won (1 million) to USD ≈ $740.74</li>
          <li>100,000,000 won (100 million) to USD ≈ $74,074</li>
          <li>1,000,000,000 won (1 billion) to USD ≈ $740,741</li>
          <li>1 USD to won ≈ ₩1,350</li>
        </ul>
      </Box>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking the USD cost of a purchase from a Korean shopping site, marketplace, or K-pop merch store.</li>
          <li>Budgeting for a trip to South Korea or converting leftover won back to dollars after a trip.</li>
          <li>Freelancers and remote workers converting a KRW invoice or payment into USD.</li>
          <li>Quickly sanity-checking a bank or card statement that shows a Korean won charge.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How much is 1,000 Korean won in US dollars?</Typography>
      <Typography variant="body1">
        At an example rate of ₩1,350 per $1, 1,000 KRW is about $0.74. Enter 1,000 above (or tap the 1,000
        quick-amount button) to see the exact figure using today&apos;s live rate.
      </Typography>
      <Typography variant="h3">How much is 10,000 won in dollars?</Typography>
      <Typography variant="body1">
        At that same example rate, 10,000 KRW converts to roughly $7.41. Because the won-to-dollar rate moves
        daily, use the live calculator above for the current figure.
      </Typography>
      <Typography variant="h3">What is 1 US dollar in Korean won?</Typography>
      <Typography variant="body1">
        One US dollar is typically worth somewhere in the range of ₩1,300–1,450, depending on current market
        conditions. Toggle the swap icon above to convert USD → KRW and see today&apos;s exact rate.
      </Typography>
      <Typography variant="h3">How current is the KRW to USD exchange rate?</Typography>
      <Typography variant="body1">
        Rates are sourced from the European Central Bank&apos;s daily reference rates, typically updated once
        each business day. They&apos;re accurate for estimates, but banks, card networks, and money-transfer
        services apply their own rates plus a markup or fee for actual currency exchange.
      </Typography>
      <Typography variant="h3">Can I convert USD to KRW on this page too?</Typography>
      <Typography variant="body1">
        Yes — tap the swap icon to flip the direction to USD → KRW, or use the general{' '}
        <a href="/finance/currency-converter">currency converter</a> to convert between other currency pairs.
      </Typography>
      <Typography variant="h3">Why does the won to dollar rate change?</Typography>
      <Typography variant="body1">
        The KRW/USD rate moves with South Korea&apos;s and the US&apos;s relative interest rates, inflation,
        trade balances, and overall market demand for each currency — the same forces that move any floating
        exchange rate.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/krw-to-usd-converter" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Typography sx={{ fontWeight: 600 }}>{fromCurrency}</Typography>
            <IconButton onClick={swapDirection} aria-label="Swap conversion direction" size="small">
              <SwapHorizIcon />
            </IconButton>
            <Typography sx={{ fontWeight: 600 }}>{toCurrency}</Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography gutterBottom>Amount in {fromCurrency}</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              onFocus={(e) => e.target.select()}
              value={Number.isNaN(amount) ? '' : amount}
              onChange={(e) => setAmount(e.target.value === '' ? NaN : Number(e.target.value))}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Popular amounts
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {quickAmounts.map((qa) => (
                <Chip
                  key={qa}
                  label={fromCurrency === 'KRW' ? formatKRW(qa) : formatUSD(qa)}
                  onClick={() => setAmount(qa)}
                  color={amount === qa ? 'primary' : 'default'}
                  variant={amount === qa ? 'filled' : 'outlined'}
                  size="small"
                />
              ))}
            </Box>
          </Box>

          {rateLine !== null && !loading && !error && (
            <Typography variant="body2" color="text.secondary">
              {rateLine}
              {lastUpdated ? ` (as of ${lastUpdated})` : ''}
            </Typography>
          )}
        </Box>

        <Box>
          <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {loading && (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <CircularProgress size={32} />
                <Typography variant="body2" color="text.secondary">Fetching live exchange rates...</Typography>
              </Box>
            )}

            {!loading && error && (
              <Alert severity="error" sx={{ textAlign: 'left' }}>{error}</Alert>
            )}

            {!loading && !error && (
              <>
                <Typography variant="h6" color="text.secondary">Converted Amount</Typography>
                {convertedAmount !== null ? (
                  <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    {toCurrency === 'USD' ? formatUSD(convertedAmount) : formatKRW(convertedAmount)}
                  </Typography>
                ) : (
                  <Typography color="error" sx={{ mt: 2, fontWeight: 600 }}>
                    Enter a valid amount to convert.
                  </Typography>
                )}
              </>
            )}
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default KrwToUsdConverter;
