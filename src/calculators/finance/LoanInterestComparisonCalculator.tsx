'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, Button, IconButton, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) => `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

interface Offer {
  id: number;
  name: string;
  principal: string;
  rate: string;
  term: string;
}

let nextId = 3;

const DEFAULT_OFFERS: Offer[] = [
  { id: 1, name: 'Lender A', principal: '25000', rate: '6.5', term: '60' },
  { id: 2, name: 'Lender B', principal: '25000', rate: '5.9', term: '72' },
];

function monthlyPayment(principal: number, annualRate: number, months: number): number {
  const r = annualRate / 100 / 12;
  if (months <= 0) return 0;
  if (r === 0) return principal / months;
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

const LoanInterestComparisonContent = () => {
  const [offers, setOffers] = useState<Offer[]>(DEFAULT_OFFERS);

  const addOffer = () => {
    setOffers([...offers, { id: nextId++, name: `Lender ${String.fromCharCode(65 + offers.length)}`, principal: '25000', rate: '6', term: '60' }]);
  };
  const removeOffer = (id: number) => setOffers(offers.filter((o) => o.id !== id));
  const updateOffer = (id: number, field: keyof Omit<Offer, 'id'>, v: string) =>
    setOffers(offers.map((o) => (o.id === id ? { ...o, [field]: v } : o)));

  const results = offers.map((o) => {
    const p = parseFloat(o.principal) || 0;
    const r = parseFloat(o.rate) || 0;
    const n = parseFloat(o.term) || 0;
    const payment = monthlyPayment(p, r, n);
    const totalCost = payment * n;
    const totalInterest = totalCost - p;
    return { ...o, payment, totalCost, totalInterest };
  });

  const validResults = results.filter((r) => r.totalInterest > 0 || r.payment > 0);
  const lowestInterestId = validResults.length > 0
    ? validResults.reduce((best, r) => (r.totalInterest < best.totalInterest ? r : best)).id
    : null;

  return (
    <Box>
      <Stack spacing={2} sx={{ mb: 3 }}>
        {offers.map((o) => (
          <Box key={o.id} sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
            <TextField label="Offer Name" value={o.name} onChange={(e) => updateOffer(o.id, 'name', e.target.value)} size="small" sx={{ flex: 1.5, minWidth: 120 }} />
            <TextField
              label="Principal" type="number" value={o.principal} onChange={(e) => updateOffer(o.id, 'principal', e.target.value)}
              size="small" sx={{ flex: 1, minWidth: 110 }}
              slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
            />
            <TextField
              label="APR" type="number" value={o.rate} onChange={(e) => updateOffer(o.id, 'rate', e.target.value)}
              size="small" sx={{ flex: 1, minWidth: 90 }}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
            />
            <TextField
              label="Term" type="number" value={o.term} onChange={(e) => updateOffer(o.id, 'term', e.target.value)}
              size="small" sx={{ flex: 1, minWidth: 100 }}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">months</InputAdornment> } }}
            />
            <IconButton onClick={() => removeOffer(o.id)} size="small" aria-label="Remove offer" disabled={offers.length <= 2}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
        <Button startIcon={<AddIcon />} onClick={addOffer} variant="outlined" size="small" sx={{ alignSelf: 'flex-start' }}>
          Add Loan Offer
        </Button>
      </Stack>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Offer</TableCell>
              <TableCell align="right">Monthly Payment</TableCell>
              <TableCell align="right">Total Interest</TableCell>
              <TableCell align="right">Total Cost</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((r) => (
              <TableRow key={r.id} sx={r.id === lowestInterestId ? { bgcolor: 'success.main', '& .MuiTableCell-root': { color: 'success.contrastText' } } : undefined}>
                <TableCell>
                  {r.name}{' '}
                  {r.id === lowestInterestId && <Chip label="Lowest Interest" size="small" color="success" sx={{ ml: 1 }} />}
                </TableCell>
                <TableCell align="right">{money(r.payment)}</TableCell>
                <TableCell align="right">{money(r.totalInterest)}</TableCell>
                <TableCell align="right">{money(r.totalCost)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

const LoanInterestComparisonCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Loan Interest Comparison Calculator</Typography>
      <Typography variant="body1">
        List two or more loan offers with each one&apos;s principal, annual interest rate, and term in months.
        For every offer, the calculator computes the standard amortized monthly payment, then multiplies it by
        the term to get the total cost, and subtracts the principal to isolate total interest paid. The offer
        with the lowest total interest — not necessarily the lowest monthly payment or the lowest rate — is
        highlighted so you can see which loan actually costs you the least over its full life.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Monthly Payment = P × [r(1+r)ⁿ] / [(1+r)ⁿ − 1]
        <br />
        Total Interest = (Monthly Payment × n) − P
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A $25,000 loan at 6.5% over 60 months costs about $489/month and roughly $4,340 in total interest.
        A competing offer of the same $25,000 at a lower 5.9% rate but stretched to 72 months costs less per
        month (about $412) but accrues roughly $4,650 in total interest — slightly more than the shorter,
        higher-rate offer, because of the longer time the balance accrues interest.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Comparing two or more auto, personal, or personal loan offers side by side before signing.</li>
          <li>Seeing how a lower rate but longer term can sometimes cost more in total interest than a shorter, higher-rate offer.</li>
          <li>Negotiating with a lender using a concrete total-interest figure instead of comparing rates alone.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why does the highlighted offer have the lowest interest instead of the lowest payment?</strong> The lowest monthly payment often comes from stretching the term out, which usually increases total interest paid. This tool highlights whichever offer costs the least in total interest over the life of the loan, since that&apos;s the truest measure of which loan is cheapest.</li>
          <li><strong>Can I compare more than two offers at once?</strong> Yes — use the &quot;Add Loan Offer&quot; button to add as many offers as you want to compare side by side in the same table.</li>
          <li><strong>Does this include fees like origination charges?</strong> No — this compares principal, rate, and term only. If a lender charges an origination fee or other upfront costs, add that to your own comparison separately, since it isn&apos;t reflected in the total interest shown here.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/finance/loan-interest-comparison-calculator" content={content}>
      <LoanInterestComparisonContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default LoanInterestComparisonCalculator;
