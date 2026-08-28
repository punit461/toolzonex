'use client';

import { Typography, Box, Alert } from '@mui/material';
import CurrencyPairConverter from './CurrencyPairConverter';

const USD_QUICK_AMOUNTS = [1, 10, 50, 100, 500, 1000];
const AUD_QUICK_AMOUNTS = [1, 10, 50, 100, 500, 1000];

const UsdToAudConverter = () => {
  const content = (
    <>
      <Typography variant="h2">How this USD to AUD converter works</Typography>
      <Typography variant="body1">
        This US dollar to Australian dollar converter converts between USD and AUD using live foreign
        exchange rates sourced from the European Central Bank via the free Frankfurter API. Enter an amount
        in either currency, or tap one of the popular amount buttons, and toggle the swap icon to switch
        between USD → AUD and AUD → USD.
      </Typography>
      <Alert severity="info" sx={{ my: 2 }}>
        Exchange rates on this page refresh once per day (not tick-by-tick), so the figure shown is a close
        estimate rather than a live market feed.
      </Alert>

      <Typography variant="h2">Formula</Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        AUD Amount = USD Amount × (AUD per 1 USD)
        <br />
        USD Amount = AUD Amount ÷ (AUD per 1 USD)
      </Box>

      <Typography variant="h2">Examples</Typography>
      <Typography variant="body1">
        Using an illustrative example rate of A$1.52 per $1 (your actual conversion above uses today&apos;s
        live rate):
      </Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>$1 to AUD ≈ A$1.52</li>
          <li>$10 to AUD ≈ A$15.20</li>
          <li>$50 to AUD ≈ A$76.00</li>
          <li>$100 to AUD ≈ A$152.00</li>
          <li>$1,000 to AUD ≈ A$1,520</li>
          <li>A$100 to USD ≈ $65.79</li>
        </ul>
      </Box>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking the AUD cost of a US-priced subscription, app, or online purchase.</li>
          <li>Budgeting for a trip between the US and Australia in either direction.</li>
          <li>Freelancers and businesses converting a USD invoice or payment into Australian dollars.</li>
          <li>Comparing prices on US and Australian shopping or trading sites at the current rate.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is 1 US dollar in Australian dollars?</Typography>
      <Typography variant="body1">
        One US Dollar is typically worth somewhere in the range of A$1.45–A$1.60, depending on current market
        conditions. Use the calculator above for today&apos;s exact live rate.
      </Typography>
      <Typography variant="h3">How much is $100 in AUD?</Typography>
      <Typography variant="body1">
        At an example rate of A$1.52 per $1, $100 converts to about A$152. Enter 100 above (or tap the $100
        quick-amount button) to see today&apos;s exact figure.
      </Typography>
      <Typography variant="h3">How current is the USD to AUD exchange rate?</Typography>
      <Typography variant="body1">
        Rates are sourced from the European Central Bank&apos;s daily reference rates, typically updated once
        each business day. They&apos;re accurate for estimates, but banks, card networks, and money-transfer
        services apply their own rate plus a markup or fee for actual currency exchange.
      </Typography>
      <Typography variant="h3">Can I convert AUD to USD on this page too?</Typography>
      <Typography variant="body1">
        Yes — tap the swap icon to flip the direction to AUD → USD, or use the general{' '}
        <a href="/finance/currency-converter">currency converter</a> to convert between other currency pairs.
      </Typography>
      <Typography variant="h3">Why does the USD to AUD rate change?</Typography>
      <Typography variant="body1">
        The USD/AUD rate moves with US and Australian interest rates, inflation, commodity prices, trade
        balances, and overall market demand for each currency — the same forces that move any floating
        exchange rate.
      </Typography>
    </>
  );

  return (
    <CurrencyPairConverter
      url="/finance/usd-to-aud-converter"
      fromCode="USD"
      toCode="AUD"
      fromQuickAmounts={USD_QUICK_AMOUNTS}
      toQuickAmounts={AUD_QUICK_AMOUNTS}
      defaultAmount={100}
      content={content}
    />
  );
};

export default UsdToAudConverter;
