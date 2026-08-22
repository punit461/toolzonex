'use client';

import { useState } from 'react';
import { Box, TextField, Typography, InputAdornment, Link, Stack, Select, MenuItem } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';
import {
  WEIGHT_UNITS, RATE_UNITS, REGIONS, CURRENCIES, gramsFor, formatMoney, currencySymbol,
  Region, CurrencyCode,
} from './preciousMetalConfig';

const GoldRateCalculator = () => {
  const [weight, setWeight] = useState<number>(10);
  const [weightUnit, setWeightUnit] = useState('g');
  const [rate, setRate] = useState<number>(75000);
  const [rateUnit, setRateUnit] = useState('g10');
  const [makingChargesPct, setMakingChargesPct] = useState<number>(8);
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
  const goldValue = weightInGrams * pricePerGram;
  const makingCharges = (goldValue * makingChargesPct) / 100;
  const taxableValue = goldValue + makingCharges;
  const taxAmount = (taxableValue * taxPct) / 100;
  const totalPrice = taxableValue + taxAmount;

  const content = (
    <>
      <Typography variant="h2">How to calculate gold price per gram (with making charges and GST)</Typography>
      <Typography variant="body1">
        Buying gold jewellery is both a cultural tradition and a financial investment in many countries. However,
        the final price you pay at the jeweler is higher than the spot gold rate. To calculate the gold price by
        weight, use this formula:
      </Typography>
      <ul>
        <li><strong>Gold Value:</strong> Weight × Rate per unit weight (converted to the same unit) — this is how you calculate the gold rate per gram from a per-10-gram or per-kilogram quote.</li>
        <li><strong>Making Charges:</strong> Usually a percentage of the gold value (ranging from 5% to 20% depending on the design).</li>
        <li><strong>Tax:</strong> {regionConfig.taxNote}</li>
      </ul>
      <Typography variant="body1">
        Use the region selector to switch between India&apos;s GST (gold calculator with GST), US sales tax, UK
        VAT, or a custom rate for anywhere else — the calculator also accepts gold quoted per gram, per 10 grams,
        per kilogram, or per troy ounce (the global bullion convention), and item weight in grams, kilograms, or
        troy ounces, so it works as a gold jewellery calculator for India as well as international gold cost per
        gram calculations.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        10 grams of 22K gold at ₹6,000/gram = ₹60,000 gold value. At 10% making charges (₹6,000) and 3% GST on
        ₹66,000 (₹1,980), the final price comes to ₹67,980.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking a jeweler&apos;s quoted price against the actual gold rate before buying.</li>
          <li>Comparing making charges across different jewelers for the same design.</li>
          <li>Estimating the resale value of gold jewelry you already own.</li>
          <li>Converting a world spot price (quoted per troy ounce) into a local per-gram price.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How do making charges work on gold jewellery in India?</Typography>
      <Typography variant="body1">
        Making charges are what the jeweller charges for turning raw gold into a finished piece of jewellery,
        usually quoted as a percentage of the gold value (commonly 5-20% depending on the design&apos;s
        complexity) or sometimes as a flat rate per gram. Use the <strong>Making Charges (%)</strong> field above —
        it&apos;s applied on top of the gold value, exactly like on a jeweller&apos;s invoice.
      </Typography>
      <Typography variant="h3">How does GST apply to gold jewellery purchases?</Typography>
      <Typography variant="body1">
        In India, GST rules apply the 3% rate to the combined value of gold plus making charges, not just the raw
        gold value — that&apos;s why the tax amount is higher than 3% of the gold price alone. Selecting
        &quot;India&quot; as the region defaults the tax field to 3%, but you can edit it if your invoice shows a
        different rate. Other regions apply tax similarly to the full jeweler invoice, though investment-grade
        bullion is often taxed differently from jewelry — check your local rules.
      </Typography>
      <Typography variant="h3">What&apos;s the difference between 18K, 22K, and 24K gold pricing?</Typography>
      <Typography variant="body1">
        Karat measures gold purity: 24K is 99.9% pure, 22K is about 91.6% pure, and 18K is about 75% pure — the
        rest is other metals alloyed in for durability. Because purity drives price, each karat trades at a
        different rate per gram. This calculator doesn&apos;t look up karat-specific rates automatically — enter
        the per-gram (or per-10-gram) rate your jeweller quotes for the specific karat you&apos;re pricing.
      </Typography>
      <Typography variant="h3">Does the sell-back price differ from the buy price?</Typography>
      <Typography variant="body1">
        Yes. When buying, you pay gold value + making charges + tax. When selling gold jewellery back, most
        jewellers only pay for the gold&apos;s weight and purity — making charges and GST are usually not
        refunded, and some deduct extra for wastage or purity testing. To estimate a sell/resale price here, set
        Making Charges and tax to 0% and enter the buyback rate your jeweller quotes.
      </Typography>
      <Typography variant="h3">What is a troy ounce and why does the world price use it?</Typography>
      <Typography variant="body1">
        A troy ounce (31.1034768 grams) is the standard unit for pricing precious metals internationally — it&apos;s
        what you&apos;ll see quoted on goldprice.org and most bullion dealers outside India. Select &quot;Troy Ounce&quot;
        as the rate unit to plug in a world spot price directly.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Gold Rate Calculator"
      description="Calculate the final price of gold in any weight unit and currency, with region-based tax."
      url="/finance/gold-calculator"
      content={content}
      category="Finance"
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
            <Typography gutterBottom>Gold Weight</Typography>
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
            <Typography gutterBottom>Gold Rate</Typography>
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
                href="https://goldprice.org/gold-price-india.html"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, fontSize: '0.85rem' }}
              >
                Check today&apos;s India rate <OpenInNewIcon sx={{ fontSize: 14 }} />
              </Link>
              <Link
                href="https://goldprice.org"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, fontSize: '0.85rem' }}
              >
                World rate <OpenInNewIcon sx={{ fontSize: 14 }} />
              </Link>
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
              <Typography>Value of Gold</Typography>
              <Typography sx={{ fontWeight: 500 }}>{formatMoney(goldValue, currency)}</Typography>
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

export default GoldRateCalculator;
