'use client';

import { Typography, Box, Alert } from '@mui/material';
import CurrencyPairConverter from './CurrencyPairConverter';

const CAD_QUICK_AMOUNTS = [10, 50, 100, 500, 1000, 5000];
const INR_QUICK_AMOUNTS = [1000, 5000, 10000, 50000, 100000, 1000000];

const CadToInrConverter = () => {
  const content = (
    <>
      <Typography variant="h2">How this CAD to INR converter works</Typography>
      <Typography variant="body1">
        This Canadian dollar to INR converter converts between the Canadian Dollar (CAD) and the Indian Rupee
        (INR) using live foreign exchange rates sourced from the European Central Bank via the free
        Frankfurter API. Enter an amount in either currency, or tap one of the popular amount buttons, and
        toggle the swap icon to switch between CAD → INR and INR → CAD.
      </Typography>
      <Alert severity="info" sx={{ my: 2 }}>
        Exchange rates on this page refresh once per day (not tick-by-tick), so the figure shown is a close
        estimate rather than a live market feed.
      </Alert>

      <Typography variant="h2">Formula</Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        INR Amount = CAD Amount × (INR per 1 CAD)
        <br />
        CAD Amount = INR Amount ÷ (INR per 1 CAD)
      </Box>

      <Typography variant="h2">Examples</Typography>
      <Typography variant="body1">
        Using an illustrative example rate of ₹61 per C$1 (your actual conversion above uses today&apos;s live
        rate):
      </Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>C$10 to INR ≈ ₹610</li>
          <li>C$50 to INR ≈ ₹3,050</li>
          <li>C$100 to INR ≈ ₹6,100</li>
          <li>C$500 to INR ≈ ₹30,500</li>
          <li>C$1,000 to INR ≈ ₹61,000</li>
          <li>₹1,00,000 to CAD ≈ C$1,639</li>
        </ul>
      </Box>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Indian students and workers in Canada converting a salary, stipend, or remittance back to rupees.</li>
          <li>Checking the rupee cost of a Canadian purchase, subscription, or freelance invoice billed in CAD.</li>
          <li>Budgeting for a trip to Canada, or converting leftover Canadian dollars back to INR after a visit.</li>
          <li>Families sending money from Canada to India comparing what a transfer is worth before fees.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is 1 Canadian dollar in Indian rupees?</Typography>
      <Typography variant="body1">
        One Canadian Dollar is typically worth somewhere in the range of ₹58–₹63, depending on current market
        conditions. Use the calculator above for today&apos;s exact live rate.
      </Typography>
      <Typography variant="h3">How much is C$100 in INR?</Typography>
      <Typography variant="body1">
        At an example rate of ₹61 per C$1, C$100 converts to about ₹6,100. Enter 100 above (or tap the C$100
        quick-amount button) to see today&apos;s exact figure.
      </Typography>
      <Typography variant="h3">How current is the CAD to INR exchange rate?</Typography>
      <Typography variant="body1">
        Rates are sourced from the European Central Bank&apos;s daily reference rates, typically updated once
        each business day. They&apos;re accurate for estimates, but banks, card networks, and money-transfer
        services apply their own rate plus a markup or fee for actual currency exchange.
      </Typography>
      <Typography variant="h3">Can I convert INR to CAD on this page too?</Typography>
      <Typography variant="body1">
        Yes — tap the swap icon to flip the direction to INR → CAD, or use the general{' '}
        <a href="/finance/currency-converter">currency converter</a> to convert between other currency pairs.
      </Typography>
      <Typography variant="h3">Why does the Canadian dollar to rupee rate change?</Typography>
      <Typography variant="body1">
        The CAD/INR rate moves with Canada&apos;s and India&apos;s relative interest rates, inflation, oil
        prices, trade balances, and overall market demand for each currency — the same forces that move any
        floating exchange rate.
      </Typography>
    </>
  );

  return (
    <CurrencyPairConverter
      url="/finance/cad-to-inr-converter"
      fromCode="CAD"
      toCode="INR"
      fromQuickAmounts={CAD_QUICK_AMOUNTS}
      toQuickAmounts={INR_QUICK_AMOUNTS}
      defaultAmount={100}
      content={content}
    />
  );
};

export default CadToInrConverter;
