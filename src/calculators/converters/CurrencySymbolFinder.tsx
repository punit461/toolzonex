'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Grid, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface CurrencyInfo {
  code: string;
  symbol: string;
  name: string;
}

const CURRENCIES: CurrencyInfo[] = [
  { code: 'USD', symbol: '$', name: 'United States Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound Sterling' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'AUD', symbol: '$', name: 'Australian Dollar' },
  { code: 'CAD', symbol: '$', name: 'Canadian Dollar' },
  { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc' },
  { code: 'HKD', symbol: '$', name: 'Hong Kong Dollar' },
  { code: 'NZD', symbol: '$', name: 'New Zealand Dollar' },
  { code: 'SEK', symbol: 'kr', name: 'Swedish Krona' },
  { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone' },
  { code: 'DKK', symbol: 'kr', name: 'Danish Krone' },
  { code: 'SGD', symbol: '$', name: 'Singapore Dollar' },
  { code: 'MXN', symbol: '$', name: 'Mexican Peso' },
  { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
  { code: 'RUB', symbol: '₽', name: 'Russian Ruble' },
  { code: 'KRW', symbol: '₩', name: 'South Korean Won' },
  { code: 'TRY', symbol: '₺', name: 'Turkish Lira' },
  { code: 'PLN', symbol: 'zł', name: 'Polish Złoty' },
  { code: 'THB', symbol: '฿', name: 'Thai Baht' },
  { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah' },
  { code: 'HUF', symbol: 'Ft', name: 'Hungarian Forint' },
  { code: 'CZK', symbol: 'Kč', name: 'Czech Koruna' },
  { code: 'ILS', symbol: '₪', name: 'Israeli New Shekel' },
  { code: 'PHP', symbol: '₱', name: 'Philippine Peso' },
  { code: 'AED', symbol: 'د.إ', name: 'United Arab Emirates Dirham' },
  { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal' },
  { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit' },
  { code: 'VND', symbol: '₫', name: 'Vietnamese Đồng' },
  { code: 'EGP', symbol: '£', name: 'Egyptian Pound' },
  { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee' },
  { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka' },
  { code: 'NGN', symbol: '₦', name: 'Nigerian Naira' },
  { code: 'ARS', symbol: '$', name: 'Argentine Peso' },
  { code: 'CLP', symbol: '$', name: 'Chilean Peso' },
  { code: 'COP', symbol: '$', name: 'Colombian Peso' },
  { code: 'PEN', symbol: 'S/', name: 'Peruvian Sol' },
  { code: 'UAH', symbol: '₴', name: 'Ukrainian Hryvnia' },
  { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling' },
  { code: 'GHS', symbol: '₵', name: 'Ghanaian Cedi' },
  { code: 'MAD', symbol: 'د.م.', name: 'Moroccan Dirham' },
  { code: 'QAR', symbol: 'ر.ق', name: 'Qatari Riyal' },
  { code: 'KWD', symbol: 'د.ك', name: 'Kuwaiti Dinar' },
  { code: 'BHD', symbol: '.د.ب', name: 'Bahraini Dinar' },
  { code: 'OMR', symbol: 'ر.ع.', name: 'Omani Rial' },
  { code: 'JOD', symbol: 'د.ا', name: 'Jordanian Dinar' },
  { code: 'LKR', symbol: 'Rs', name: 'Sri Lankan Rupee' },
  { code: 'NPR', symbol: 'Rs', name: 'Nepalese Rupee' },
  { code: 'TWD', symbol: 'NT$', name: 'New Taiwan Dollar' },
  { code: 'ISK', symbol: 'kr', name: 'Icelandic Króna' },
  { code: 'RON', symbol: 'lei', name: 'Romanian Leu' },
  { code: 'BGN', symbol: 'лв', name: 'Bulgarian Lev' },
  { code: 'HRK', symbol: 'kn', name: 'Croatian Kuna' },
  { code: 'RSD', symbol: 'дин', name: 'Serbian Dinar' },
  { code: 'IQD', symbol: 'ع.د', name: 'Iraqi Dinar' },
  { code: 'IRR', symbol: '﷼', name: 'Iranian Rial' },
  { code: 'MMK', symbol: 'K', name: 'Myanmar Kyat' },
  { code: 'KHR', symbol: '៛', name: 'Cambodian Riel' },
  { code: 'LAK', symbol: '₭', name: 'Lao Kip' },
  { code: 'MNT', symbol: '₮', name: 'Mongolian Tögrög' },
  { code: 'ETB', symbol: 'Br', name: 'Ethiopian Birr' },
  { code: 'TZS', symbol: 'TSh', name: 'Tanzanian Shilling' },
  { code: 'UGX', symbol: 'USh', name: 'Ugandan Shilling' },
  { code: 'DZD', symbol: 'د.ج', name: 'Algerian Dinar' },
  { code: 'TND', symbol: 'د.ت', name: 'Tunisian Dinar' },
  { code: 'XAF', symbol: 'FCFA', name: 'Central African CFA Franc' },
  { code: 'XOF', symbol: 'CFA', name: 'West African CFA Franc' },
  { code: 'BYN', symbol: 'Br', name: 'Belarusian Ruble' },
  { code: 'AZN', symbol: '₼', name: 'Azerbaijani Manat' },
  { code: 'GEL', symbol: '₾', name: 'Georgian Lari' },
  { code: 'AMD', symbol: '֏', name: 'Armenian Dram' },
  { code: 'KZT', symbol: '₸', name: 'Kazakhstani Tenge' },
  { code: 'UZS', symbol: 'soʼm', name: 'Uzbekistani Som' },
  { code: 'AFN', symbol: '؋', name: 'Afghan Afghani' },
  { code: 'FJD', symbol: '$', name: 'Fijian Dollar' },
  { code: 'BND', symbol: '$', name: 'Brunei Dollar' },
];

const CurrencySymbolFinderContent = () => {
  const [query, setQuery] = useState('rupee');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return CURRENCIES.filter(
      (c) => c.code.toLowerCase().includes(q) || c.name.toLowerCase().includes(q) || c.symbol === query.trim()
    );
  }, [query]);

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <TextField
        label="Search by Code, Symbol, or Name"
        placeholder="e.g. USD, $, dollar, rupee"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        fullWidth
        sx={{ mb: 3 }}
      />

      {query.trim() && results.length === 0 && (
        <Alert severity="info">No matching currencies found.</Alert>
      )}

      <Grid container spacing={2}>
        {results.map((c) => (
          <Grid item xs={12} sm={6} md={4} key={c.code}>
            <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
              <Typography sx={{ fontSize: '2rem' }}>{c.symbol}</Typography>
              <Typography variant="body2" fontWeight={700}>{c.code}</Typography>
              <Typography variant="caption" color="text.secondary">{c.name}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const CurrencySymbolFinder = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Currency Symbol Finder</Typography>
      <Typography variant="body1">
        Search by 3-letter currency code (like <code>USD</code>), by symbol (like <code>$</code>), or by full
        currency name (like &quot;dollar&quot; or &quot;rupee&quot;) to find matching currencies from a curated
        list of around 75 world currencies, each shown with its symbol, code, and full name.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Searching &quot;rupee&quot; returns both the Indian Rupee (₹, INR) and other rupee-named currencies like
        the Pakistani Rupee (₨, PKR) and Sri Lankan Rupee (Rs, LKR). Searching &quot;$&quot; returns every
        currency that uses the dollar sign, including USD, AUD, CAD, and several others.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Finding the correct symbol to display for a given currency code in an app or invoice.</li>
          <li>Looking up which currency a code like &quot;AED&quot; or &quot;ZAR&quot; refers to.</li>
          <li>Checking which other currencies share the same symbol as a given one, like &quot;$&quot;.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why do multiple currencies share the same symbol?</strong> Symbols like &quot;$&quot; and &quot;£&quot; are used by many different countries&apos; currencies historically or by convention — the 3-letter ISO code (like USD vs. AUD) is what actually distinguishes them precisely.</li>
          <li><strong>How many currencies are included?</strong> Around 75 of the world&apos;s most commonly referenced currencies, covering all major and many regional currencies.</li>
          <li><strong>Can I search using a partial currency name?</strong> Yes — typing part of a currency&apos;s name, like &quot;franc&quot; or &quot;dinar&quot;, returns every currency whose name contains that text.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/converters/currency-symbol-finder" content={content}>
      <CurrencySymbolFinderContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CurrencySymbolFinder;
