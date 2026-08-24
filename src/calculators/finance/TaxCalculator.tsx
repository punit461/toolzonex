'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, InputAdornment, MenuItem, Select } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import {
  applyBrackets,
  FEDERAL_BRACKETS,
  FEDERAL_STANDARD_DEDUCTION,
  type FilingStatus,
} from '../paycheck/federalTax';

const formatUSD = (value: number) =>
  `$${Math.round(value).toLocaleString('en-US')}`;

function marginalRateFor(taxableIncome: number, filingStatus: FilingStatus): number {
  const brackets = FEDERAL_BRACKETS[filingStatus];
  for (const { rate, upTo } of brackets) {
    if (taxableIncome <= upTo) return rate;
  }
  return brackets[brackets.length - 1].rate;
}

const TaxCalculator = () => {
  const [annualIncome, setAnnualIncome] = useState<number>(75000);
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');

  const result = useMemo(() => {
    const standardDeduction = FEDERAL_STANDARD_DEDUCTION[filingStatus];
    const taxableIncome = Math.max(0, annualIncome - standardDeduction);
    const estimatedTax = applyBrackets(taxableIncome, FEDERAL_BRACKETS[filingStatus]);
    const effectiveRate = annualIncome > 0 ? (estimatedTax / annualIncome) * 100 : 0;
    const marginalRate = marginalRateFor(taxableIncome, filingStatus) * 100;
    const takeHome = annualIncome - estimatedTax;

    return { standardDeduction, taxableIncome, estimatedTax, effectiveRate, marginalRate, takeHome };
  }, [annualIncome, filingStatus]);

  const content = (
    <>
      <Typography variant="h2">How this US federal tax estimator works</Typography>
      <Typography variant="body1">
        This tool estimates <strong>US federal income tax</strong> only, using the current-year IRS tax brackets
        and standard deduction for your filing status. It&apos;s a quick estimate for single filers, married
        couples filing jointly, or head of household filers — not a substitute for a full tax return, since it
        doesn&apos;t account for state income tax, itemized deductions, tax credits, or additional income types.
      </Typography>

      <Typography variant="h2">How federal tax brackets actually work</Typography>
      <Typography variant="body1">
        The US uses a progressive bracket system: each slice of your taxable income is taxed at the rate for that
        bracket, not your entire income at your top rate. Taxable income is your annual income minus the standard
        deduction ({formatUSD(FEDERAL_STANDARD_DEDUCTION[filingStatus])} for your selected filing status this
        year). Your <strong>marginal rate</strong> is the rate on your last dollar earned; your{' '}
        <strong>effective rate</strong> is your total tax divided by your total income — almost always lower than
        your marginal rate.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A single filer earning $75,000/year has a taxable income of $75,000 minus the standard deduction, taxed
        across the 10%, 12%, and 22% brackets — landing at an estimated federal tax bill with an effective rate
        well below the 22% marginal rate, since only the income inside the top bracket is taxed at 22%.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating take-home pay before accepting a new salary or raise.</li>
          <li>Understanding the difference between your marginal and effective tax rate.</li>
          <li>Comparing rough tax liability across filing statuses (e.g. before or after marriage).</li>
          <li>Sanity-checking withholding before filing your annual return.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is this the same as the site&apos;s Income Tax Calculator?</Typography>
      <Typography variant="body1">
        No. This is a <strong>US federal</strong> tax estimator using IRS brackets, filing statuses, and the
        standard deduction. The site&apos;s separate Income Tax Calculator estimates Indian income tax under the
        Old and New regimes for a given financial year — use that one instead if you&apos;re filing taxes in
        India.
      </Typography>
      <Typography variant="h3">What&apos;s the difference between marginal and effective tax rate?</Typography>
      <Typography variant="body1">
        Your marginal rate is what you pay on your next dollar of income — it only applies to the top slice of
        your earnings. Your effective rate is your total tax divided by total income, blending all the lower
        brackets you passed through first, which is why it&apos;s always lower than (or equal to) your marginal
        rate.
      </Typography>
      <Typography variant="h3">Does this include state tax or FICA?</Typography>
      <Typography variant="body1">
        No — this estimates federal income tax only. It doesn&apos;t include state/local income tax, or Social
        Security and Medicare (FICA) payroll taxes, which reduce a paycheck further on top of federal withholding.
      </Typography>
      <Typography variant="h3">Does this use itemized deductions?</Typography>
      <Typography variant="body1">
        No — it assumes the standard deduction for your filing status. If your itemized deductions (mortgage
        interest, charitable giving, state taxes paid, etc.) exceed the standard deduction, your actual tax bill
        would be lower than this estimate.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/tax-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>Annual Income (gross)</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              onFocus={(e) => e.target.select()}
              value={Number.isNaN(annualIncome) ? '' : annualIncome}
              onChange={(e) => setAnnualIncome(e.target.value === '' ? NaN : Number(e.target.value))}
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }
              }}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>Filing Status</Typography>
            <Select
              fullWidth
              value={filingStatus}
              onChange={(e) => setFilingStatus(e.target.value as FilingStatus)}
            >
              <MenuItem value="single">Single</MenuItem>
              <MenuItem value="marriedJoint">Married Filing Jointly</MenuItem>
              <MenuItem value="headOfHousehold">Head of Household</MenuItem>
            </Select>
          </Box>

          <Typography variant="body2" color="text.secondary">
            Standard deduction applied: {formatUSD(result.standardDeduction)}
          </Typography>
        </Box>

        <Box>
          <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2, textAlign: 'center', height: '100%' }}>
            <Typography variant="h6" color="text.secondary">Estimated Federal Tax Owed</Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 4, color: 'primary.main' }}>
              {formatUSD(result.estimatedTax)}
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">Effective Rate</Typography>
                <Typography variant="h6">{result.effectiveRate.toFixed(1)}%</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Marginal Rate</Typography>
                <Typography variant="h6">{(result.marginalRate).toFixed(0)}%</Typography>
              </Box>
            </Box>

            <Box sx={{ pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
              <Typography variant="body2" color="text.secondary">Estimated Take-Home (after federal tax)</Typography>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>{formatUSD(result.takeHome)}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TaxCalculator;
