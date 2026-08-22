'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, InputAdornment, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

// England & Northern Ireland SDLT bands, in place since 1 April 2025. Scotland
// (LBTT) and Wales (LTT) use different bands and are not covered by this tool.
// Rates change periodically -- verify against gov.uk before relying on this
// for a real purchase.
interface Band { upTo: number; rate: number }

const STANDARD_BANDS: Band[] = [
  { upTo: 125_000, rate: 0 },
  { upTo: 250_000, rate: 0.02 },
  { upTo: 925_000, rate: 0.05 },
  { upTo: 1_500_000, rate: 0.10 },
  { upTo: Infinity, rate: 0.12 },
];

const ADDITIONAL_PROPERTY_SURCHARGE = 0.05;

const FIRST_TIME_BUYER_RELIEF_CAP = 500_000;
const FIRST_TIME_BUYER_ZERO_THRESHOLD = 300_000;
const FIRST_TIME_BUYER_RATE_ABOVE = 0.05;

type BuyerType = 'homeMover' | 'firstTimeBuyer' | 'additionalProperty';

const formatGBP = (value: number) =>
  `£${Math.round(value).toLocaleString('en-GB')}`;

function calculateSlicedTax(price: number, bands: Band[]): number {
  let tax = 0;
  let lowerBound = 0;
  for (const { upTo, rate } of bands) {
    if (price <= lowerBound) break;
    const sliceAmount = Math.min(price, upTo) - lowerBound;
    tax += sliceAmount * rate;
    lowerBound = upTo;
  }
  return tax;
}

const UKStampDutyCalculator = () => {
  const [price, setPrice] = useState<number>(350000);
  const [buyerType, setBuyerType] = useState<BuyerType>('homeMover');

  const result = useMemo(() => {
    if (buyerType === 'firstTimeBuyer') {
      if (price <= FIRST_TIME_BUYER_RELIEF_CAP) {
        const taxableAbove = Math.max(0, price - FIRST_TIME_BUYER_ZERO_THRESHOLD);
        return { tax: taxableAbove * FIRST_TIME_BUYER_RATE_ABOVE, reliefApplied: true };
      }
      // Relief lost entirely above £500,000 -- standard rates apply to the full price.
      return { tax: calculateSlicedTax(price, STANDARD_BANDS), reliefApplied: false };
    }

    if (buyerType === 'additionalProperty') {
      const surchargedBands = STANDARD_BANDS.map((b) => ({ ...b, rate: b.rate + ADDITIONAL_PROPERTY_SURCHARGE }));
      return { tax: calculateSlicedTax(price, surchargedBands), reliefApplied: false };
    }

    return { tax: calculateSlicedTax(price, STANDARD_BANDS), reliefApplied: false };
  }, [price, buyerType]);

  const effectiveRate = price > 0 ? (result.tax / price) * 100 : 0;

  const content = (
    <>
      <Typography variant="h2">How this calculator works</Typography>
      <Typography variant="body1">
        Stamp Duty Land Tax (SDLT) is charged on a <strong>slice basis</strong>, the same way UK income tax
        brackets work — you don&apos;t pay the top rate on the whole price, only on the portion that falls
        within each band. First-time buyers get relief on properties up to £500,000; landlords and second-home
        buyers pay a flat 5% surcharge on top of every standard band. These are the England &amp; Northern
        Ireland rates in place since 1 April 2025 — Scotland (LBTT) and Wales (LTT) use their own separate
        systems.
      </Typography>

      <Typography variant="h2">The standard bands</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>0% up to £125,000</li>
          <li>2% from £125,001 to £250,000</li>
          <li>5% from £250,001 to £925,000</li>
          <li>10% from £925,001 to £1,500,000</li>
          <li>12% above £1,500,000</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A home mover buying a £350,000 property pays 0% on the first £125,000, 2% on the next £125,000
        (£2,500), and 5% on the remaining £100,000 (£5,000) — £7,500 total, an effective rate of about 2.1% of
        the purchase price.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Budgeting total cash needed for a house purchase, not just the deposit.</li>
          <li>Checking whether first-time buyer relief applies before you go house-hunting above £500,000.</li>
          <li>Estimating the extra cost of buying a second home or buy-to-let property.</li>
          <li>Comparing SDLT across a few candidate price points before making an offer.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What happens if a first-time buyer&apos;s property is over £500,000?</Typography>
      <Typography variant="body1">
        First-time buyer relief is lost entirely — not just above the £500,000 slice. The full purchase price is
        then taxed at the standard home-mover rates instead.
      </Typography>
      <Typography variant="h3">Does the additional-property surcharge apply if I&apos;m selling my only home at the same time?</Typography>
      <Typography variant="body1">
        No — the 5% surcharge applies when you&apos;ll own more than one property after completion. If you sell
        your previous main residence within 36 months of buying the new one, you can usually reclaim the
        surcharge from HMRC.
      </Typography>
      <Typography variant="h3">Does this cover Scotland or Wales?</Typography>
      <Typography variant="body1">
        No — Scotland uses Land and Buildings Transaction Tax (LBTT) and Wales uses Land Transaction Tax (LTT),
        both with different bands and rates than SDLT. This calculator covers England and Northern Ireland only.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="UK Stamp Duty Calculator (SDLT)"
      description="Calculate Stamp Duty Land Tax for England & Northern Ireland, including first-time buyer relief and the additional-property surcharge."
      url="/finance/uk-stamp-duty-calculator"
      content={content}
      category="Finance"
    >
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>Property Price</Typography>
            <TextField
              fullWidth type="number" value={price} onFocus={(e) => e.target.select()}
              onChange={(e) => setPrice(e.target.value === '' ? 0 : Number(e.target.value))}
              slotProps={{ input: { startAdornment: <InputAdornment position="start">£</InputAdornment> } }}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>Buyer Type</Typography>
            <ToggleButtonGroup
              exclusive value={buyerType} orientation="vertical" fullWidth
              onChange={(_, value) => value !== null && setBuyerType(value)}
            >
              <ToggleButton value="homeMover">Home mover (standard rates)</ToggleButton>
              <ToggleButton value="firstTimeBuyer">First-time buyer</ToggleButton>
              <ToggleButton value="additionalProperty">Additional property (buy-to-let / second home)</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>

        <Box>
          <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2, textAlign: 'center', height: '100%' }}>
            <Typography variant="h6" color="text.secondary">
              Stamp Duty Owed
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 3, color: 'primary.main' }}>
              {formatGBP(result.tax)}
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">Effective Rate</Typography>
                <Typography variant="h6">{effectiveRate.toFixed(2)}%</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Total Cost</Typography>
                <Typography variant="h6">{formatGBP(price + result.tax)}</Typography>
              </Box>
            </Box>

            {buyerType === 'firstTimeBuyer' && !result.reliefApplied && price > FIRST_TIME_BUYER_RELIEF_CAP && (
              <Typography variant="caption" color="warning.main" sx={{ display: 'block', mt: 2 }}>
                First-time buyer relief doesn&apos;t apply above £{FIRST_TIME_BUYER_RELIEF_CAP.toLocaleString('en-GB')} — standard rates shown instead.
              </Typography>
            )}
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default UKStampDutyCalculator;
