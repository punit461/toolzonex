'use client';

import { Typography, Box, Alert } from '@mui/material';
import CurrencyPairConverter from './CurrencyPairConverter';

const AUD_QUICK_AMOUNTS = [10, 50, 100, 500, 1000, 5000];
const INR_QUICK_AMOUNTS = [1000, 5000, 10000, 50000, 100000, 1000000];

const AudToInrConverter = () => {
  const content = (
    <>
      <Typography variant="h2">How this AUD to INR converter works</Typography>
      <Typography variant="body1">
        This Australian dollar to INR converter converts between the Australian Dollar (AUD) and the Indian
        Rupee (INR) using live foreign exchange rates sourced from the European Central Bank via the free
        Frankfurter API. Enter an amount in either currency, or tap one of the popular amount buttons, and
        toggle the swap icon to switch between AUD → INR and INR → AUD.
      </Typography>
      <Alert severity="info" sx={{ my: 2 }}>
        Exchange rates on this page refresh once per day (not tick-by-tick), so the figure shown is a close
        estimate rather than a live market feed.
      </Alert>

      <Typography variant="h2">Formula</Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        INR Amount = AUD Amount × (INR per 1 AUD)
        <br />
        AUD Amount = INR Amount ÷ (INR per 1 AUD)
      </Box>

      <Typography variant="h2">Examples</Typography>
      <Typography variant="body1">
        Using an illustrative example rate of ₹56 per A$1 (your actual conversion above uses today&apos;s live
        rate):
      </Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>A$10 to INR ≈ ₹560</li>
          <li>A$50 to INR ≈ ₹2,800</li>
          <li>A$100 to INR ≈ ₹5,600</li>
          <li>A$500 to INR ≈ ₹28,000</li>
          <li>A$1,000 to INR ≈ ₹56,000</li>
          <li>₹1,00,000 to AUD ≈ A$1,786</li>
        </ul>
      </Box>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Indian students and workers in Australia converting a salary, stipend, or remittance back to rupees.</li>
          <li>Checking the rupee cost of an Australian purchase, subscription, or freelance invoice billed in AUD.</li>
          <li>Budgeting for a trip to Australia, or converting leftover Australian dollars back to INR after a visit.</li>
          <li>Families sending money from Australia to India comparing what a transfer is worth before fees.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is 1 Australian dollar in Indian rupees?</Typography>
      <Typography variant="body1">
        One Australian Dollar is typically worth somewhere in the range of ₹53–₹58, depending on current
        market conditions. Use the calculator above for today&apos;s exact live rate.
      </Typography>
      <Typography variant="h3">How much is A$100 in INR?</Typography>
      <Typography variant="body1">
        At an example rate of ₹56 per A$1, A$100 converts to about ₹5,600. Enter 100 above (or tap the A$100
        quick-amount button) to see today&apos;s exact figure.
      </Typography>
      <Typography variant="h3">How current is the AUD to INR exchange rate?</Typography>
      <Typography variant="body1">
        Rates are sourced from the European Central Bank&apos;s daily reference rates, typically updated once
        each business day. They&apos;re accurate for estimates, but banks, card networks, and money-transfer
        services apply their own rate plus a markup or fee for actual currency exchange.
      </Typography>
      <Typography variant="h3">Can I convert INR to AUD on this page too?</Typography>
      <Typography variant="body1">
        Yes — tap the swap icon to flip the direction to INR → AUD, or use the general{' '}
        <a href="/finance/currency-converter">currency converter</a> to convert between other currency pairs.
      </Typography>
      <Typography variant="h3">Why does the Australian dollar to rupee rate change?</Typography>
      <Typography variant="body1">
        The AUD/INR rate moves with Australia&apos;s and India&apos;s relative interest rates, inflation,
        commodity prices, trade balances, and overall market demand for each currency — the same forces that
        move any floating exchange rate.
      </Typography>
    </>
  );

  return (
    <CurrencyPairConverter
      url="/finance/aud-to-inr-converter"
      fromCode="AUD"
      toCode="INR"
      fromQuickAmounts={AUD_QUICK_AMOUNTS}
      toQuickAmounts={INR_QUICK_AMOUNTS}
      defaultAmount={100}
      content={content}
    />
  );
};

export default AudToInrConverter;
