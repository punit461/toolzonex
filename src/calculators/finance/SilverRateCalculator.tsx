'use client';

import { useState } from 'react';
import { Box, TextField, Typography, InputAdornment, Link, Stack, Select, MenuItem } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import {
  WEIGHT_UNITS, RATE_UNITS, REGIONS, CURRENCIES, gramsFor, formatMoney, currencySymbol,
  Region, CurrencyCode,
} from './preciousMetalConfig';

const SilverRateCalculator = () => {
  const [rate, setRate] = useState<number>(85000);
  const [rateUnit, setRateUnit] = useState('kg');
  const [weight, setWeight] = useState<number>(100);
  const [weightUnit, setWeightUnit] = useState('g');
  const [makingChargesPct, setMakingChargesPct] = useState<number>(10);
  const [region, setRegion] = useState<Region>('india');
  const [taxPct, setTaxPct] = useState<number>(3);
  const [customCurrency, setCustomCurrency] = useState<CurrencyCode>('USD');

  const regionConfig = REGIONS.find((r) => r.value === region) ?? REGIONS[0];
  const currency = region === 'custom' ? customCurrency : regionConfig.currency;

  const handleRegionChange = (value: Region) => {
    setRegion(value);
    const preset = REGIONS.find((r) => r.value === value);
    if (preset) setTaxPct(preset.defaultTaxPct);
  };

  // Calculations
  const weightInGrams = weight * gramsFor(WEIGHT_UNITS, weightUnit);
  const pricePerGram = rate / gramsFor(RATE_UNITS, rateUnit);
  const silverValue = weightInGrams * pricePerGram;
  const makingCharges = (silverValue * makingChargesPct) / 100;
  const taxableValue = silverValue + makingCharges;
  const taxAmount = (taxableValue * taxPct) / 100;
  const totalPrice = taxableValue + taxAmount;

  const content = (
    <>
      <Typography variant="h2">How to calculate the price of silver?</Typography>
      <Typography variant="body1">
        Silver is usually priced per kilogram in India, but per troy ounce internationally. Just like gold, buying
        silver jewelry or utensils includes additional costs beyond the raw metal price.
      </Typography>
      <ul>
        <li><strong>Silver Value:</strong> Weight × Rate per unit weight (converted to the same unit)</li>
        <li><strong>Making Charges:</strong> For silver, making charges are often higher in percentage terms than gold because of intricate designs.</li>
        <li><strong>Tax:</strong> {regionConfig.taxNote}</li>
      </ul>
      <Typography variant="body1">
        Use the region selector to switch between India&apos;s GST, US sales tax, UK VAT, or a custom rate for
        anywhere else — the calculator also accepts silver quoted per gram, per 10 grams, per kilogram, or per troy
        ounce, and item weight in grams, kilograms, or troy ounces.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        1kg of silver at ₹75/gram = ₹75,000 silver value. At 12% making charges (₹9,000) and 3% GST on
        ₹84,000 (₹2,520), the final price comes to ₹86,520.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking a jeweler&apos;s quoted price against the actual silver rate before buying.</li>
          <li>Estimating the cost of silver utensils or coins before purchase.</li>
          <li>Converting a world spot price (quoted per troy ounce) into a local per-gram or per-kg price.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why are silver making charges often higher than gold?</Typography>
      <Typography variant="body1">
        Silver items often involve more intricate craftsmanship relative to their lower per-gram value, so
        making charges are commonly expressed as a higher percentage than for gold.
      </Typography>
      <Typography variant="h3">What is a troy ounce and why does the world price use it?</Typography>
      <Typography variant="body1">
        A troy ounce (31.1034768 grams) is the standard unit for pricing precious metals internationally — it&apos;s
        what you&apos;ll see quoted on silverprice.org and most bullion dealers outside India. Select &quot;Troy Ounce&quot;
        as the rate unit to plug in a world spot price directly.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      url="/finance/silver-calculator"
      content={content}
    >
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Region</Typography>
            <Select fullWidth value={region} onChange={(e) => handleRegionChange(e.target.value as Region)}>
              {REGIONS.map((r) => (
                <MenuItem key={r.value} value={r.value}>{r.label}</MenuItem>
              ))}
            </Select>
          </Box>

          {region === 'custom' && (
            <Box sx={{ mb: 4 }}>
              <Typography gutterBottom>Currency</Typography>
              <Select fullWidth value={customCurrency} onChange={(e) => setCustomCurrency(e.target.value as CurrencyCode)}>
                {CURRENCIES.map((c) => (
                  <MenuItem key={c.value} value={c.value}>{c.label}</MenuItem>
                ))}
              </Select>
            </Box>
          )}

          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Silver Rate</Typography>
            <Stack direction="row" spacing={1.5}>
              <TextField
                fullWidth
                variant="outlined"
                type="number"
                value={Number.isNaN(rate) ? '' : rate}
                onChange={(e) => setRate(e.target.value === '' ? NaN : Number(e.target.value))}
                onFocus={(e) => e.target.select()}
                slotProps={{ input: { startAdornment: <InputAdornment position="start">{currencySymbol(currency)}</InputAdornment> } }}
              />
              <Select value={rateUnit} onChange={(e) => setRateUnit(e.target.value)} sx={{ minWidth: 150 }}>
                {RATE_UNITS.map((u) => (
                  <MenuItem key={u.value} value={u.value}>{u.label}</MenuItem>
                ))}
              </Select>
            </Stack>
            <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
              <Link
                href="https://silverprice.org/silver-price-india.html"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, fontSize: '0.85rem' }}
              >
                Check today&apos;s India rate <OpenInNewIcon sx={{ fontSize: 14 }} />
              </Link>
              <Link
                href="https://silverprice.org"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, fontSize: '0.85rem' }}
              >
                World rate <OpenInNewIcon sx={{ fontSize: 14 }} />
              </Link>
            </Stack>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Item Weight</Typography>
            <Stack direction="row" spacing={1.5}>
              <TextField
                fullWidth
                variant="outlined"
                type="number"
                value={Number.isNaN(weight) ? '' : weight}
                onChange={(e) => setWeight(e.target.value === '' ? NaN : Number(e.target.value))}
                onFocus={(e) => e.target.select()}
              />
              <Select value={weightUnit} onChange={(e) => setWeightUnit(e.target.value)} sx={{ minWidth: 150 }}>
                {WEIGHT_UNITS.map((u) => (
                  <MenuItem key={u.value} value={u.value}>{u.label}</MenuItem>
                ))}
              </Select>
            </Stack>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Making Charges (%)</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              value={Number.isNaN(makingChargesPct) ? '' : makingChargesPct}
              onChange={(e) => setMakingChargesPct(e.target.value === '' ? NaN : Number(e.target.value))}
              onFocus={(e) => e.target.select()}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
            />
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>{regionConfig.taxLabel} (%)</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              value={Number.isNaN(taxPct) ? '' : taxPct}
              onChange={(e) => setTaxPct(e.target.value === '' ? NaN : Number(e.target.value))}
              onFocus={(e) => e.target.select()}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
            />
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
              {regionConfig.taxNote}
            </Typography>
          </Box>
        </Box>

        <Box>
          <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2, height: '100%' }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>Price Breakdown</Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, mt: 3 }}>
              <Typography>Value of Silver</Typography>
              <Typography sx={{ fontWeight: 500 }}>{formatMoney(silverValue, currency)}</Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Making Charges</Typography>
              <Typography sx={{ fontWeight: 500 }}>+ {formatMoney(makingCharges, currency)}</Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, pb: 2, borderBottom: '1px solid #E5E5E5' }}>
              <Typography>{regionConfig.taxLabel} ({taxPct}%)</Typography>
              <Typography sx={{ fontWeight: 500 }}>+ {formatMoney(taxAmount, currency)}</Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>Total Final Price</Typography>
              <Typography variant="h4" color="primary.main" sx={{ fontWeight: 800 }}>{formatMoney(totalPrice, currency)}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default SilverRateCalculator;
