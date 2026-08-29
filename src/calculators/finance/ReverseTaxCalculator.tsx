'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) =>
  `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const ReverseTaxCalculatorContent = () => {
  const [totalPrice, setTotalPrice] = useState('107.50');
  const [taxRate, setTaxRate] = useState('7.5');

  const result = useMemo(() => {
    const total = parseFloat(totalPrice) || 0;
    const rate = (parseFloat(taxRate) || 0) / 100;

    const netPrice = total / (1 + rate);
    const taxAmount = total - netPrice;

    return { netPrice, taxAmount };
  }, [totalPrice, taxRate]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Total Price (Tax Included)"
          type="number"
          value={totalPrice}
          onChange={(e) => setTotalPrice(e.target.value)}
          fullWidth
          slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
        />
        <TextField
          label="Tax Rate"
          type="number"
          value={taxRate}
          onChange={(e) => setTaxRate(e.target.value)}
          fullWidth
          slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
        />

        <Paper variant="outlined" sx={{ p: 2, bgcolor: 'action.hover' }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
            Net Price = Total Price / (1 + Tax Rate)
          </Typography>
        </Paper>
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
        <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="body2">Pre-Tax (Net) Price</Typography>
          <Typography variant="h3" fontWeight="bold">{money(result.netPrice)}</Typography>
        </Paper>
        <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Tax Amount Included</Typography>
          <Typography fontWeight={600}>{money(result.taxAmount)}</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

const ReverseTaxCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How Does the Reverse Tax Calculator Work?</Typography>
      <Typography variant="body1">
        Most sales tax calculators start with a pre-tax price and add tax on top. This one works
        backward: enter a total, tax-inclusive price — like the final amount on a receipt — and the tax
        rate that was applied, and the calculator figures out what the price was before tax and how much
        of the total was tax. It divides the total price by (1 + tax rate) to strip the tax back out,
        since simply subtracting the tax rate percentage from the total would overstate the tax amount.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A receipt shows a total of $107.50 with a 7.5% tax rate included. The pre-tax price is 107.50 ÷
        1.075 = $100.00, meaning exactly $7.50 of the total was tax. Note that this is not the same as
        taking 7.5% of $107.50 (which would incorrectly give $8.06) — the tax rate applies to the
        pre-tax price, not the tax-inclusive total.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Figuring out the pre-tax cost of an item from a receipt that only shows the final total.</li>
          <li>Separating the tax portion out of a lump-sum invoice or expense for bookkeeping.</li>
          <li>Checking that a vendor applied the correct tax rate to a tax-inclusive quote.</li>
          <li>Reconciling accounting records where only tax-inclusive totals were recorded.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why can&apos;t I just subtract the tax percentage from the total?</Typography>
      <Typography variant="body1">
        Because the tax rate was applied to the pre-tax price, not the final total — subtracting 7.5% of
        $107.50 gives $8.06, not the correct $7.50 tax amount. Dividing the total by (1 + tax rate)
        correctly reverses the original calculation.
      </Typography>
      <Typography variant="h3">Does this work for VAT as well as sales tax?</Typography>
      <Typography variant="body1">
        Yes — the math is identical whether the tax-inclusive amount includes sales tax, VAT, or GST.
        Just enter the applicable rate and the tax-inclusive total; the calculator doesn&apos;t need to
        know which specific tax it is.
      </Typography>
      <Typography variant="h3">What if a price includes multiple different tax rates?</Typography>
      <Typography variant="body1">
        This calculator assumes a single combined tax rate. If separate taxes stack (like a state rate
        plus a local rate), add them together into one combined percentage first, since sales taxes are
        typically applied on the same base rather than compounding on each other.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/reverse-tax-calculator" content={content}>
      <ReverseTaxCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ReverseTaxCalculator;
