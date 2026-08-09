'use client';

import { useMemo, useState } from 'react';
import {
  Box, TextField, Typography, MenuItem, Select, InputAdornment,
  ToggleButtonGroup, ToggleButton,
} from '@mui/material';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

interface VatCountry {
  code: string;
  name: string;
  standardRate: number;
}

// Standard VAT rates by country (%), checked against official/EU sources
// August 2026. Rates change with national budgets -- always confirm the
// current rate with the relevant tax authority before filing or invoicing.
const COUNTRIES: VatCountry[] = [
  { code: 'gb', name: 'United Kingdom', standardRate: 20 },
  { code: 'de', name: 'Germany', standardRate: 19 },
  { code: 'fr', name: 'France', standardRate: 20 },
  { code: 'ie', name: 'Ireland', standardRate: 23 },
  { code: 'es', name: 'Spain', standardRate: 21 },
  { code: 'it', name: 'Italy', standardRate: 22 },
  { code: 'nl', name: 'Netherlands', standardRate: 21 },
  { code: 'be', name: 'Belgium', standardRate: 21 },
  { code: 'at', name: 'Austria', standardRate: 20 },
  { code: 'pl', name: 'Poland', standardRate: 23 },
  { code: 'se', name: 'Sweden', standardRate: 25 },
  { code: 'dk', name: 'Denmark', standardRate: 25 },
  { code: 'fi', name: 'Finland', standardRate: 25.5 },
  { code: 'pt', name: 'Portugal', standardRate: 23 },
  { code: 'lu', name: 'Luxembourg', standardRate: 17 },
  { code: 'mt', name: 'Malta', standardRate: 18 },
  { code: 'hu', name: 'Hungary', standardRate: 27 },
  { code: 'hr', name: 'Croatia', standardRate: 25 },
  { code: 'ch', name: 'Switzerland (non-EU)', standardRate: 8.1 },
];

const formatMoney = (value: number) =>
  value.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const VATCalculator = () => {
  const [countryCode, setCountryCode] = useState('gb');
  const [customRate, setCustomRate] = useState<number>(20);
  const [useCustomRate, setUseCustomRate] = useState(false);
  const [amount, setAmount] = useState<number>(100);
  const [mode, setMode] = useState<'add' | 'remove'>('add');

  const selectedCountry = useMemo(
    () => COUNTRIES.find((c) => c.code === countryCode) ?? COUNTRIES[0],
    [countryCode]
  );

  const rate = useCustomRate ? customRate : selectedCountry.standardRate;

  const { netAmount, vatAmount, grossAmount } = useMemo(() => {
    if (mode === 'add') {
      const net = amount;
      const vat = net * (rate / 100);
      return { netAmount: net, vatAmount: vat, grossAmount: net + vat };
    } else {
      const gross = amount;
      const net = gross / (1 + rate / 100);
      const vat = gross - net;
      return { netAmount: net, vatAmount: vat, grossAmount: gross };
    }
  }, [amount, rate, mode]);

  const content = (
    <>
      <Typography variant="h2">How VAT is calculated</Typography>
      <Typography variant="body1">
        VAT (Value Added Tax) is a consumption tax applied at each stage of the supply chain in the UK, EU, and
        many other countries. To <strong>add VAT</strong> to a net (pre-tax) price: multiply by the rate and add
        it to the original amount. To <strong>remove VAT</strong> from a gross (VAT-inclusive) price: divide the
        gross amount by (1 + rate) to find the net amount, then subtract.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Add VAT: Gross = Net × (1 + Rate)<br />
        Remove VAT: Net = Gross ÷ (1 + Rate)
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is this the standard rate or a reduced rate?</Typography>
      <Typography variant="body1">
        This calculator uses each country&apos;s <strong>standard</strong> VAT rate. Most countries also apply
        reduced rates (often 0-15%) to specific categories like food, books, or children&apos;s clothing — check
        your local tax authority if your goods or services qualify for a reduced rate.
      </Typography>
      <Typography variant="h3">Is this pricing accurate?</Typography>
      <Typography variant="body1">
        Rates are checked against official/EU sources as of August 2026 but change with national budgets —
        always confirm the current rate before invoicing or filing.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="VAT Calculator"
      description="Add or remove VAT for the UK, EU, and other countries using current standard rates."
      url="/finance/vat-calculator"
      content={content}
      category="Finance"
    >
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Box sx={{ mb: 3 }}>
            <ToggleButtonGroup
              value={mode}
              exclusive
              onChange={(_, value) => value && setMode(value)}
              fullWidth
            >
              <ToggleButton value="add">Add VAT</ToggleButton>
              <ToggleButton value="remove">Remove VAT</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>{mode === 'add' ? 'Net Amount (excl. VAT)' : 'Gross Amount (incl. VAT)'}</Typography>
            <TextField
              fullWidth
              type="number"
              value={amount}
              onFocus={(e) => e.target.select()}
              onChange={(e) => setAmount(e.target.value === '' ? 0 : Number(e.target.value))}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>Country</Typography>
            <Select
              fullWidth
              value={countryCode}
              disabled={useCustomRate}
              onChange={(e) => setCountryCode(e.target.value)}
            >
              {COUNTRIES.map((c) => (
                <MenuItem key={c.code} value={c.code}>
                  {c.name} — {c.standardRate}%
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography
              variant="body2"
              sx={{ cursor: 'pointer', color: useCustomRate ? 'primary.main' : 'text.secondary', fontWeight: 600 }}
              onClick={() => setUseCustomRate(!useCustomRate)}
            >
              {useCustomRate ? '✓ ' : ''}Use a custom rate instead
            </Typography>
            {useCustomRate && (
              <TextField
                size="small"
                type="number"
                value={customRate}
                onFocus={(e) => e.target.select()}
                onChange={(e) => setCustomRate(e.target.value === '' ? 0 : Number(e.target.value))}
                slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
                sx={{ width: 100 }}
              />
            )}
          </Box>
        </Box>

        <Box>
          <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2, textAlign: 'center', height: '100%' }}>
            <Typography variant="h6" color="text.secondary">
              {mode === 'add' ? 'Gross Amount (incl. VAT)' : 'Net Amount (excl. VAT)'}
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 4, color: 'primary.main' }}>
              {formatMoney(mode === 'add' ? grossAmount : netAmount)}
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">Net Amount</Typography>
                <Typography variant="h6">{formatMoney(netAmount)}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">VAT ({rate}%)</Typography>
                <Typography variant="h6">{formatMoney(vatAmount)}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default VATCalculator;
