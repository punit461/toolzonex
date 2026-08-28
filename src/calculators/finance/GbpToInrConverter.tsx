'use client';

import { Typography, Box, Alert } from '@mui/material';
import CurrencyPairConverter from './CurrencyPairConverter';

const GBP_QUICK_AMOUNTS = [10, 50, 100, 500, 1000, 5000];
const INR_QUICK_AMOUNTS = [1000, 5000, 10000, 50000, 100000, 1000000];

const GbpToInrConverter = () => {
  const content = (
    <>
      <Typography variant="h2">How this GBP to INR converter works</Typography>
      <Typography variant="body1">
        This pound to INR converter converts between the British Pound Sterling (GBP) and the Indian Rupee
        (INR) using live foreign exchange rates sourced from the European Central Bank via the free
        Frankfurter API. Enter an amount in either currency, or tap one of the popular amount buttons, and
        toggle the swap icon to switch between GBP → INR and INR → GBP.
      </Typography>
      <Alert severity="info" sx={{ my: 2 }}>
        Exchange rates on this page refresh once per day (not tick-by-tick), so the figure shown is a close
        estimate rather than a live market feed.
      </Alert>

      <Typography variant="h2">Formula</Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        INR Amount = GBP Amount × (INR per 1 GBP)
        <br />
        GBP Amount = INR Amount ÷ (INR per 1 GBP)
      </Box>

      <Typography variant="h2">Examples</Typography>
      <Typography variant="body1">
        Using an illustrative example rate of ₹108 per £1 (your actual conversion above uses today&apos;s live
        rate):
      </Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>£10 to INR ≈ ₹1,080</li>
          <li>£50 to INR ≈ ₹5,400</li>
          <li>£100 to INR ≈ ₹10,800</li>
          <li>£500 to INR ≈ ₹54,000</li>
          <li>£1,000 to INR ≈ ₹1,08,000</li>
          <li>₹1,00,000 to GBP ≈ £926</li>
        </ul>
      </Box>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>NRIs and students in the UK converting a salary, stipend, or remittance back to rupees.</li>
          <li>Checking the rupee cost of a UK purchase, subscription, or freelance invoice billed in pounds.</li>
          <li>Budgeting for a trip to the UK, or converting leftover pounds back to INR after a visit.</li>
          <li>Families sending money from the UK to India comparing what a transfer is worth before fees.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is 1 pound in Indian rupees?</Typography>
      <Typography variant="body1">
        One British Pound is typically worth somewhere in the range of ₹105–₹112, depending on current market
        conditions. Use the calculator above for today&apos;s exact live rate.
      </Typography>
      <Typography variant="h3">How much is £100 in INR?</Typography>
      <Typography variant="body1">
        At an example rate of ₹108 per £1, £100 converts to about ₹10,800. Enter 100 above (or tap the £100
        quick-amount button) to see today&apos;s exact figure.
      </Typography>
      <Typography variant="h3">How current is the GBP to INR exchange rate?</Typography>
      <Typography variant="body1">
        Rates are sourced from the European Central Bank&apos;s daily reference rates, typically updated once
        each business day. They&apos;re accurate for estimates, but banks, card networks, and money-transfer
        services apply their own rate plus a markup or fee for actual currency exchange.
      </Typography>
      <Typography variant="h3">Can I convert INR to GBP on this page too?</Typography>
      <Typography variant="body1">
        Yes — tap the swap icon to flip the direction to INR → GBP, or use the general{' '}
        <a href="/finance/currency-converter">currency converter</a> to convert between other currency pairs.
      </Typography>
      <Typography variant="h3">Why does the pound to rupee rate change?</Typography>
      <Typography variant="body1">
        The GBP/INR rate moves with the UK&apos;s and India&apos;s relative interest rates, inflation, trade
        balances, and overall market demand for each currency — the same forces that move any floating
        exchange rate.
      </Typography>
    </>
  );

  return (
    <CurrencyPairConverter
      url="/finance/gbp-to-inr-converter"
      fromCode="GBP"
      toCode="INR"
      fromQuickAmounts={GBP_QUICK_AMOUNTS}
      toQuickAmounts={INR_QUICK_AMOUNTS}
      defaultAmount={100}
      content={content}
    />
  );
};

export default GbpToInrConverter;
