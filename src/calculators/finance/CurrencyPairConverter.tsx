'use client';

import { useEffect, useState, useMemo, type ReactNode } from 'react';
import { Box, TextField, Typography, Chip, IconButton, CircularProgress, Alert } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { CURRENCIES, type CurrencyCode } from '../currencyConfig';

const formatAmount = (value: number, code: CurrencyCode): string => {
  const cfg = CURRENCIES.find((c) => c.value === code) ?? CURRENCIES[0];
  const decimals = Math.abs(value) >= 1000 ? 0 : 2;
  return `${cfg.symbol}${value.toLocaleString(cfg.locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`;
};

type Direction = 'FROM_TO' | 'TO_FROM';

interface CurrencyPairConverterProps {
  url: string;
  fromCode: CurrencyCode;
  toCode: CurrencyCode;
  fromQuickAmounts: number[];
  toQuickAmounts: number[];
  defaultAmount: number;
  content: ReactNode;
}

const CurrencyPairConverter = ({
  url,
  fromCode,
  toCode,
  fromQuickAmounts,
  toQuickAmounts,
  defaultAmount,
  content,
}: CurrencyPairConverterProps) => {
  const [amount, setAmount] = useState<number>(defaultAmount);
  const [direction, setDirection] = useState<Direction>('FROM_TO');
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(`https://api.frankfurter.dev/v1/latest?from=${fromCode}&to=${toCode}`)
      .then((res) => {
        if (!res.ok) throw new Error('Request failed');
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        const r = data.rates?.[toCode];
        if (typeof r !== 'number') throw new Error('Missing rate');
        setRate(r);
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
  }, [fromCode, toCode]);

  const activeFrom = direction === 'FROM_TO' ? fromCode : toCode;
  const activeTo = direction === 'FROM_TO' ? toCode : fromCode;
  const quickAmounts = direction === 'FROM_TO' ? fromQuickAmounts : toQuickAmounts;

  const convertedAmount = useMemo(() => {
    if (rate === null || Number.isNaN(amount)) return null;
    return direction === 'FROM_TO' ? amount * rate : amount / rate;
  }, [rate, amount, direction]);

  const rateLine = useMemo(() => {
    if (rate === null) return null;
    return direction === 'FROM_TO'
      ? `1 ${fromCode} = ${rate.toLocaleString('en-US', { maximumFractionDigits: 4 })} ${toCode}`
      : `1 ${toCode} = ${(1 / rate).toLocaleString('en-US', { maximumFractionDigits: 4 })} ${fromCode}`;
  }, [rate, direction, fromCode, toCode]);

  const swapDirection = () => {
    setDirection((d) => (d === 'FROM_TO' ? 'TO_FROM' : 'FROM_TO'));
  };

  return (
    <CalculatorShell url={url} content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Typography sx={{ fontWeight: 600 }}>{activeFrom}</Typography>
            <IconButton onClick={swapDirection} aria-label="Swap conversion direction" size="small">
              <SwapHorizIcon />
            </IconButton>
            <Typography sx={{ fontWeight: 600 }}>{activeTo}</Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography gutterBottom>Amount in {activeFrom}</Typography>
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
                  label={formatAmount(qa, activeFrom)}
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
                    {formatAmount(convertedAmount, activeTo)}
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

export default CurrencyPairConverter;
