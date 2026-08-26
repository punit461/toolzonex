'use client';

import { useEffect, useState, useMemo } from 'react';
import { Box, TextField, Typography, InputAdornment, Select, MenuItem, IconButton, CircularProgress, Alert } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const MAJOR_CURRENCIES = [
  { code: 'USD', label: 'US Dollar (USD)' },
  { code: 'EUR', label: 'Euro (EUR)' },
  { code: 'GBP', label: 'British Pound (GBP)' },
  { code: 'INR', label: 'Indian Rupee (INR)' },
  { code: 'JPY', label: 'Japanese Yen (JPY)' },
  { code: 'AUD', label: 'Australian Dollar (AUD)' },
  { code: 'CAD', label: 'Canadian Dollar (CAD)' },
  { code: 'CHF', label: 'Swiss Franc (CHF)' },
  { code: 'CNY', label: 'Chinese Yuan (CNY)' },
  { code: 'SGD', label: 'Singapore Dollar (SGD)' },
  { code: 'NZD', label: 'New Zealand Dollar (NZD)' },
  { code: 'HKD', label: 'Hong Kong Dollar (HKD)' },
  { code: 'KRW', label: 'South Korean Won (KRW)' },
];

const CurrencyConverter = () => {
  const [amount, setAmount] = useState<number>(100);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('INR');
  const [rates, setRates] = useState<Record<string, number> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(`https://api.frankfurter.app/latest?from=${fromCurrency}`)
      .then((res) => {
        if (!res.ok) throw new Error('Request failed');
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        setRates(data.rates ?? {});
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
  }, [fromCurrency]);

  const convertedAmount = useMemo(() => {
    if (!rates || Number.isNaN(amount)) return null;
    if (fromCurrency === toCurrency) return amount;
    const rate = rates[toCurrency];
    if (rate === undefined) return null;
    return amount * rate;
  }, [rates, amount, fromCurrency, toCurrency]);

  const rate = useMemo(() => {
    if (!rates) return null;
    if (fromCurrency === toCurrency) return 1;
    return rates[toCurrency] ?? null;
  }, [rates, fromCurrency, toCurrency]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const content = (
    <>
      <Typography variant="h2">How this currency converter works</Typography>
      <Typography variant="body1">
        This tool converts between major world currencies using live, daily-updated foreign exchange rates
        sourced from the European Central Bank via the free Frankfurter API. Rates refresh automatically when
        you change the &quot;From&quot; currency, and are cached for the session so switching the
        &quot;To&quot; currency doesn&apos;t trigger another network request.
      </Typography>
      <Alert severity="info" sx={{ my: 2 }}>
        Exchange rates on this page refresh once per day (not tick-by-tick), so the figure shown is a close
        estimate rather than a live market feed. For a dedicated Korean Won calculator with quick preset
        amounts, see the <a href="/finance/krw-to-usd-converter">KRW to USD converter</a>.
      </Alert>

      <Typography variant="h2">Formula</Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Converted Amount = Amount × Exchange Rate (From → To)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Converting 100 USD to INR uses that day&apos;s USD→INR exchange rate — if the rate is 83.2, 100 USD
        converts to 8,320 INR. Exchange rates move throughout each trading day, so the figure shown here
        reflects the latest rate available from the data source, not a live tick-by-tick market feed.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating the cost of an international purchase, subscription, or invoice in your home currency.</li>
          <li>Checking roughly how much foreign currency you&apos;ll get before a trip.</li>
          <li>Comparing prices quoted in different currencies on the same footing.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How current are these exchange rates?</Typography>
      <Typography variant="body1">
        Rates are sourced from the European Central Bank&apos;s daily reference rates, typically updated once
        each business day around 16:00 CET. They&apos;re suitable for estimates, but banks and card networks
        apply their own rates plus a markup or fee for actual currency conversion.
      </Typography>
      <Typography variant="h3">Why did the conversion fail to load?</Typography>
      <Typography variant="body1">
        The live rate lookup needs an internet connection to reach the exchange-rate data source. If you&apos;re
        offline or the service is temporarily unavailable, you&apos;ll see an error message instead of a
        result — try again once you&apos;re back online.
      </Typography>
      <Typography variant="h3">Why isn&apos;t every world currency available?</Typography>
      <Typography variant="body1">
        This converter covers major, widely-traded currencies supported by the underlying rate data source. A
        small number of less commonly traded currencies aren&apos;t included.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/currency-converter" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Amount</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              onFocus={(e) => e.target.select()}
              value={Number.isNaN(amount) ? '' : amount}
              onChange={(e) => setAmount(e.target.value === '' ? NaN : Number(e.target.value))}
            />
          </Box>

          <Box sx={{ mb: 3, display: 'flex', gap: 1.5, alignItems: 'center' }}>
            <Box sx={{ flex: 1 }}>
              <Typography gutterBottom>From</Typography>
              <Select fullWidth value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                {MAJOR_CURRENCIES.map((c) => (
                  <MenuItem key={c.code} value={c.code}>{c.label}</MenuItem>
                ))}
              </Select>
            </Box>

            <IconButton onClick={swapCurrencies} sx={{ mt: 3 }} aria-label="Swap currencies">
              <SwapHorizIcon />
            </IconButton>

            <Box sx={{ flex: 1 }}>
              <Typography gutterBottom>To</Typography>
              <Select fullWidth value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
                {MAJOR_CURRENCIES.map((c) => (
                  <MenuItem key={c.code} value={c.code}>{c.label}</MenuItem>
                ))}
              </Select>
            </Box>
          </Box>

          {rate !== null && !loading && !error && (
            <Typography variant="body2" color="text.secondary">
              1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}
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
                    {convertedAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })} {toCurrency}
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

export default CurrencyConverter;
