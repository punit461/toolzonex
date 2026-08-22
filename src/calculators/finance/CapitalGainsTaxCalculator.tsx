'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, InputAdornment, MenuItem, Select, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { applyBrackets, type FilingStatus, type TaxBracket } from '../paycheck/federalTax';
import { STATE_TAX_CONFIGS, calculateStateTax } from '../paycheck/stateTax';

// 2026 federal figures (IRS Rev. Proc. 2025-32, incorporating the One Big
// Beautiful Bill Act's inflation adjustments). Verify against irs.gov before
// relying on this for tax planning -- these adjust annually.
const ORDINARY_BRACKETS_2026: Record<FilingStatus, TaxBracket[]> = {
  single: [
    { rate: 0.10, upTo: 12_400 },
    { rate: 0.12, upTo: 50_400 },
    { rate: 0.22, upTo: 105_700 },
    { rate: 0.24, upTo: 201_775 },
    { rate: 0.32, upTo: 256_225 },
    { rate: 0.35, upTo: 640_600 },
    { rate: 0.37, upTo: Infinity },
  ],
  marriedJoint: [
    { rate: 0.10, upTo: 24_800 },
    { rate: 0.12, upTo: 100_800 },
    { rate: 0.22, upTo: 211_400 },
    { rate: 0.24, upTo: 403_550 },
    { rate: 0.32, upTo: 512_450 },
    { rate: 0.35, upTo: 768_700 },
    { rate: 0.37, upTo: Infinity },
  ],
  headOfHousehold: [
    { rate: 0.10, upTo: 17_700 },
    { rate: 0.12, upTo: 67_025 },
    { rate: 0.22, upTo: 105_700 },
    { rate: 0.24, upTo: 201_775 },
    { rate: 0.32, upTo: 256_225 },
    { rate: 0.35, upTo: 640_600 },
    { rate: 0.37, upTo: Infinity },
  ],
};

const STANDARD_DEDUCTION_2026: Record<FilingStatus, number> = {
  single: 16_100,
  marriedJoint: 32_200,
  headOfHousehold: 24_150,
};

// Long-term capital gains brackets stack on top of ordinary taxable income.
const LTCG_THRESHOLDS_2026: Record<FilingStatus, { zeroCeiling: number; fifteenCeiling: number }> = {
  single: { zeroCeiling: 49_450, fifteenCeiling: 545_500 },
  marriedJoint: { zeroCeiling: 98_900, fifteenCeiling: 613_700 },
  headOfHousehold: { zeroCeiling: 66_200, fifteenCeiling: 579_600 },
};

const NIIT_RATE = 0.038;
const NIIT_THRESHOLD: Record<FilingStatus, number> = {
  single: 200_000,
  marriedJoint: 250_000,
  headOfHousehold: 200_000,
};

type HoldingPeriod = 'short' | 'long';

const formatUSD = (value: number) =>
  `$${Math.round(value).toLocaleString('en-US')}`;

/** Long-term gain, stacked on top of ordinary taxable income, split across the 0/15/20% bands. */
function calculateLtcgTax(ordinaryTaxableIncome: number, gain: number, thresholds: { zeroCeiling: number; fifteenCeiling: number }): number {
  if (gain <= 0) return 0;
  const gainStart = ordinaryTaxableIncome;
  const gainEnd = ordinaryTaxableIncome + gain;

  const zeroBand = Math.max(0, Math.min(gainEnd, thresholds.zeroCeiling) - Math.max(gainStart, 0));
  const fifteenBand = Math.max(0, Math.min(gainEnd, thresholds.fifteenCeiling) - Math.max(gainStart, thresholds.zeroCeiling));
  const twentyBand = Math.max(0, gainEnd - Math.max(gainStart, thresholds.fifteenCeiling));

  return zeroBand * 0 + fifteenBand * 0.15 + twentyBand * 0.20;
}

const CapitalGainsTaxCalculator = () => {
  const [otherIncome, setOtherIncome] = useState<number>(90000);
  const [gain, setGain] = useState<number>(20000);
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');
  const [holdingPeriod, setHoldingPeriod] = useState<HoldingPeriod>('long');
  const [stateSlug, setStateSlug] = useState<string>('none');

  const result = useMemo(() => {
    const ordinaryTaxableIncome = Math.max(0, otherIncome - STANDARD_DEDUCTION_2026[filingStatus]);
    const brackets = ORDINARY_BRACKETS_2026[filingStatus];

    let federalGainTax: number;
    if (holdingPeriod === 'short') {
      const taxWithGain = applyBrackets(ordinaryTaxableIncome + gain, brackets);
      const taxWithoutGain = applyBrackets(ordinaryTaxableIncome, brackets);
      federalGainTax = taxWithGain - taxWithoutGain;
    } else {
      federalGainTax = calculateLtcgTax(ordinaryTaxableIncome, gain, LTCG_THRESHOLDS_2026[filingStatus]);
    }

    const magiEstimate = otherIncome + gain;
    const niitThreshold = NIIT_THRESHOLD[filingStatus];
    const niitApplicable = Math.max(0, Math.min(gain, magiEstimate - niitThreshold));
    const niitTax = niitApplicable * NIIT_RATE;

    let stateGainTax = 0;
    const stateConfig = stateSlug !== 'none' ? STATE_TAX_CONFIGS[stateSlug] : undefined;
    if (stateConfig?.hasIncomeTax) {
      const stateTaxWithGain = calculateStateTax(otherIncome + gain, filingStatus, stateConfig);
      const stateTaxWithoutGain = calculateStateTax(otherIncome, filingStatus, stateConfig);
      stateGainTax = stateTaxWithGain - stateTaxWithoutGain;
    }

    const totalTax = federalGainTax + niitTax + stateGainTax;
    const effectiveRate = gain > 0 ? (totalTax / gain) * 100 : 0;

    return { federalGainTax, niitTax, stateGainTax, totalTax, effectiveRate, netProceeds: gain - totalTax };
  }, [otherIncome, gain, filingStatus, holdingPeriod, stateSlug]);

  const stateOptions = Object.values(STATE_TAX_CONFIGS).sort((a, b) => a.name.localeCompare(b.name));

  const content = (
    <>
      <Typography variant="h2">How this calculator works</Typography>
      <Typography variant="body1">
        Capital gains are taxed very differently depending on how long you held the asset. <strong>Short-term</strong> gains
        (held one year or less) are taxed as ordinary income, stacked on top of your other income at your marginal
        rate. <strong>Long-term</strong> gains (held over a year) get preferential 0%, 15%, or 20% federal rates —
        also stacked on top of your other income, so where your ordinary income lands determines which LTCG
        bracket your gain falls into. High earners may also owe the 3.8% Net Investment Income Tax (NIIT) on top.
      </Typography>

      <Typography variant="h2">2026 long-term capital gains brackets</Typography>
      <Typography variant="body1">
        <strong>Single:</strong> 0% up to $49,450 taxable income, 15% up to $545,500, 20% above.<br />
        <strong>Married Filing Jointly:</strong> 0% up to $98,900, 15% up to $613,700, 20% above.<br />
        <strong>Head of Household:</strong> 0% up to $66,200, 15% up to $579,600, 20% above.<br />
        NIIT (3.8%) applies to investment income once MAGI exceeds $200,000 (single/HoH) or $250,000 (married
        filing jointly).
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A single filer with $90,000 of other income and a $20,000 long-term gain has $73,900 of ordinary
        taxable income after the standard deduction — comfortably inside the 15% LTCG bracket, so the entire
        gain is taxed at 15% federally ($3,000), with no NIIT since total income is well under $200,000.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Deciding whether to hold an investment a few more weeks to cross into long-term treatment.</li>
          <li>Estimating the tax hit before selling stock, crypto, or a rental property.</li>
          <li>Checking whether a large gain will push you into NIIT territory.</li>
          <li>Comparing after-tax proceeds across different states before relocating.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why does holding period matter so much?</Typography>
      <Typography variant="body1">
        Selling one day before the one-year mark can mean paying your full ordinary income rate (up to 37%)
        instead of the long-term rate (at most 20% federally) on the same dollar of gain — one of the largest
        single tax-timing decisions most investors make.
      </Typography>
      <Typography variant="h3">Does this model my state&apos;s special capital gains treatment?</Typography>
      <Typography variant="body1">
        Most states tax capital gains as ordinary income using their regular brackets, which is what this
        calculator models by reusing each state&apos;s income tax rules. A few states have unique rules not
        modeled here — Washington, for example, levies a separate 7% excise tax only on gains above roughly
        $270,000, not its regular income tax (Washington has none). Verify your specific state&apos;s rules
        before relying on this for a real transaction.
      </Typography>
      <Typography variant="h3">Is the NIIT calculation exact?</Typography>
      <Typography variant="body1">
        It's an approximation using your entered income + gain as a stand-in for MAGI. Real MAGI calculations
        can differ (certain deductions and foreign income adjustments apply) — this is a planning estimate, not
        a substitute for a tax professional.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Capital Gains Tax Calculator"
      description="Estimate federal, NIIT, and state tax on a short-term or long-term capital gain using 2026 brackets."
      url="/finance/capital-gains-tax-calculator"
      content={content}
      category="Finance"
    >
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>Other Annual Income (before this gain)</Typography>
            <TextField
              fullWidth type="number" value={otherIncome} onFocus={(e) => e.target.select()}
              onChange={(e) => setOtherIncome(e.target.value === '' ? 0 : Number(e.target.value))}
              slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>Capital Gain Amount</Typography>
            <TextField
              fullWidth type="number" value={gain} onFocus={(e) => e.target.select()}
              onChange={(e) => setGain(e.target.value === '' ? 0 : Number(e.target.value))}
              slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>Holding Period</Typography>
            <ToggleButtonGroup
              exclusive value={holdingPeriod}
              onChange={(_, value) => value !== null && setHoldingPeriod(value)}
            >
              <ToggleButton value="short">Short-term (≤1 year)</ToggleButton>
              <ToggleButton value="long">Long-term (&gt;1 year)</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 3 }}>
            <Box>
              <Typography gutterBottom>Filing Status</Typography>
              <Select
                fullWidth value={filingStatus}
                onChange={(e) => setFilingStatus(e.target.value as FilingStatus)}
              >
                <MenuItem value="single">Single</MenuItem>
                <MenuItem value="marriedJoint">Married Filing Jointly</MenuItem>
                <MenuItem value="headOfHousehold">Head of Household</MenuItem>
              </Select>
            </Box>
            <Box>
              <Typography gutterBottom>State (optional)</Typography>
              <Select
                fullWidth value={stateSlug}
                onChange={(e) => setStateSlug(e.target.value)}
              >
                <MenuItem value="none">Federal only</MenuItem>
                {stateOptions.map((s) => (
                  <MenuItem key={s.slug} value={s.slug}>{s.name}{!s.hasIncomeTax ? ' (no income tax)' : ''}</MenuItem>
                ))}
              </Select>
            </Box>
          </Box>
        </Box>

        <Box>
          <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2, height: '100%' }}>
            <Typography variant="h6" color="text.secondary">
              Total Tax on This Gain
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 3, color: 'primary.main' }}>
              {formatUSD(result.totalTax)}
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 3 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">Federal Tax</Typography>
                <Typography variant="h6">{formatUSD(result.federalGainTax)}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">NIIT (3.8%)</Typography>
                <Typography variant="h6">{formatUSD(result.niitTax)}</Typography>
              </Box>
              {stateSlug !== 'none' && (
                <Box>
                  <Typography variant="body2" color="text.secondary">State Tax</Typography>
                  <Typography variant="h6">{formatUSD(result.stateGainTax)}</Typography>
                </Box>
              )}
              <Box>
                <Typography variant="body2" color="text.secondary">Effective Rate</Typography>
                <Typography variant="h6">{result.effectiveRate.toFixed(1)}%</Typography>
              </Box>
            </Box>

            <Box sx={{ pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
              <Typography variant="body2" color="text.secondary">Net proceeds after tax</Typography>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {formatUSD(result.netProceeds)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CapitalGainsTaxCalculator;
