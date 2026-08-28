'use client';

import { Typography, Box, Alert } from '@mui/material';
import CurrencyPairConverter from './CurrencyPairConverter';

const USD_QUICK_AMOUNTS = [1, 10, 50, 100, 500, 1000];
const CAD_QUICK_AMOUNTS = [1, 10, 50, 100, 500, 1000];

const UsdToCadConverter = () => {
  const content = (
    <>
      <Typography variant="h2">How this USD to CAD converter works</Typography>
      <Typography variant="body1">
        This US dollar to Canadian dollar converter converts between USD and CAD using live foreign exchange
        rates sourced from the European Central Bank via the free Frankfurter API. Enter an amount in either
        currency, or tap one of the popular amount buttons, and toggle the swap icon to switch between
        USD → CAD and CAD → USD.
      </Typography>
      <Alert severity="info" sx={{ my: 2 }}>
        Exchange rates on this page refresh once per day (not tick-by-tick), so the figure shown is a close
        estimate rather than a live market feed.
      </Alert>

      <Typography variant="h2">Formula</Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        CAD Amount = USD Amount × (CAD per 1 USD)
        <br />
        USD Amount = CAD Amount ÷ (CAD per 1 USD)
      </Box>

      <Typography variant="h2">Examples</Typography>
      <Typography variant="body1">
        Using an illustrative example rate of C$1.38 per $1 (your actual conversion above uses today&apos;s
        live rate):
      </Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>$1 to CAD ≈ C$1.38</li>
          <li>$10 to CAD ≈ C$13.80</li>
          <li>$50 to CAD ≈ C$69.00</li>
          <li>$100 to CAD ≈ C$138.00</li>
          <li>$1,000 to CAD ≈ C$1,380</li>
          <li>C$100 to USD ≈ $72.46</li>
        </ul>
      </Box>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking the CAD cost of a US-priced subscription, app, or online purchase.</li>
          <li>Budgeting for a trip between the US and Canada in either direction.</li>
          <li>Freelancers and businesses converting a USD invoice or payment into Canadian dollars.</li>
          <li>Comparing prices on US and Canadian shopping or trading sites at the current rate.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is 1 US dollar in Canadian dollars?</Typography>
      <Typography variant="body1">
        One US Dollar is typically worth somewhere in the range of C$1.30–C$1.45, depending on current market
        conditions. Use the calculator above for today&apos;s exact live rate.
      </Typography>
      <Typography variant="h3">How much is $100 in CAD?</Typography>
      <Typography variant="body1">
        At an example rate of C$1.38 per $1, $100 converts to about C$138. Enter 100 above (or tap the $100
        quick-amount button) to see today&apos;s exact figure.
      </Typography>
      <Typography variant="h3">How current is the USD to CAD exchange rate?</Typography>
      <Typography variant="body1">
        Rates are sourced from the European Central Bank&apos;s daily reference rates, typically updated once
        each business day. They&apos;re accurate for estimates, but banks, card networks, and money-transfer
        services apply their own rate plus a markup or fee for actual currency exchange.
      </Typography>
      <Typography variant="h3">Can I convert CAD to USD on this page too?</Typography>
      <Typography variant="body1">
        Yes — tap the swap icon to flip the direction to CAD → USD, or use the general{' '}
        <a href="/finance/currency-converter">currency converter</a> to convert between other currency pairs.
      </Typography>
      <Typography variant="h3">Why does the USD to CAD rate change?</Typography>
      <Typography variant="body1">
        The USD/CAD rate — often called the &quot;loonie&quot; pair — moves with US and Canadian interest
        rates, inflation, oil prices, trade balances, and overall market demand for each currency.
      </Typography>
    </>
  );

  return (
    <CurrencyPairConverter
      url="/finance/usd-to-cad-converter"
      fromCode="USD"
      toCode="CAD"
      fromQuickAmounts={USD_QUICK_AMOUNTS}
      toQuickAmounts={CAD_QUICK_AMOUNTS}
      defaultAmount={100}
      content={content}
    />
  );
};

export default UsdToCadConverter;
