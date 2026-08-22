'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, InputAdornment, MenuItem, Select } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import {
  applyBrackets,
  FEDERAL_BRACKETS,
  FEDERAL_STANDARD_DEDUCTION,
  SOCIAL_SECURITY_RATE,
  SOCIAL_SECURITY_WAGE_BASE_2025,
  MEDICARE_RATE,
  ADDITIONAL_MEDICARE_RATE,
  ADDITIONAL_MEDICARE_THRESHOLD,
  type FilingStatus,
} from '../paycheck/federalTax';

// SE tax applies to 92.35% of net self-employment profit (IRC 1402(a)(12)),
// split into the Social Security portion (up to the wage base, shared with
// any W-2 wages) and the uncapped Medicare portion. Reuses the same 2025
// federal figures as the paycheck-by-state calculators for consistency.
const NET_EARNINGS_FACTOR = 0.9235;

const formatUSD = (value: number) =>
  `$${Math.round(value).toLocaleString('en-US')}`;

const SelfEmploymentTaxCalculator = () => {
  const [netProfit, setNetProfit] = useState<number>(80000);
  const [otherW2Wages, setOtherW2Wages] = useState<number>(0);
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');

  const result = useMemo(() => {
    const netEarningsFromSE = Math.max(0, netProfit) * NET_EARNINGS_FACTOR;

    const ssRoomLeft = Math.max(0, SOCIAL_SECURITY_WAGE_BASE_2025 - otherW2Wages);
    const ssTaxableSE = Math.min(netEarningsFromSE, ssRoomLeft);
    const socialSecurityTax = ssTaxableSE * (SOCIAL_SECURITY_RATE * 2); // both halves, since a self-employed person pays both

    const medicareTax = netEarningsFromSE * (MEDICARE_RATE * 2);

    const totalMedicareWages = otherW2Wages + netEarningsFromSE;
    const additionalMedicareThreshold = ADDITIONAL_MEDICARE_THRESHOLD[filingStatus];
    const additionalMedicareTax = Math.max(0, totalMedicareWages - additionalMedicareThreshold) * ADDITIONAL_MEDICARE_RATE;

    const selfEmploymentTax = socialSecurityTax + medicareTax + additionalMedicareTax;

    // Half of the SS + regular Medicare portion (not the additional Medicare
    // surtax) is deductible against income tax -- the standard "above the line" SE tax deduction.
    const halfSeTaxDeduction = (socialSecurityTax + medicareTax) / 2;

    const taxableIncomeForIncomeTax = Math.max(
      0,
      netProfit + otherW2Wages - halfSeTaxDeduction - FEDERAL_STANDARD_DEDUCTION[filingStatus]
    );
    const estimatedIncomeTax = applyBrackets(taxableIncomeForIncomeTax, FEDERAL_BRACKETS[filingStatus]);

    return {
      netEarningsFromSE,
      socialSecurityTax,
      medicareTax,
      additionalMedicareTax,
      selfEmploymentTax,
      halfSeTaxDeduction,
      taxableIncomeForIncomeTax,
      estimatedIncomeTax,
    };
  }, [netProfit, otherW2Wages, filingStatus]);

  const content = (
    <>
      <Typography variant="h2">How this calculator works</Typography>
      <Typography variant="body1">
        As a self-employed person or 1099 contractor, you pay both the employee <em>and</em> employer halves of
        Social Security and Medicare — 15.3% combined, versus the 7.65% a W-2 employee sees deducted from their
        paycheck (their employer quietly pays the other half). This calculator estimates your self-employment
        tax and gives a rough estimate of income tax on top, so you know what to set aside for quarterly
        estimated payments.
      </Typography>

      <Typography variant="h2">How SE tax is actually calculated</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Net profit is first reduced to 92.35% — this accounts for the employer-equivalent portion, mirroring how a W-2 employer&apos;s share isn&apos;t itself taxed as wages.</li>
          <li>12.4% Social Security tax applies up to the annual wage base ({formatUSD(SOCIAL_SECURITY_WAGE_BASE_2025)} for 2025) — shared with any W-2 wages you also earned this year.</li>
          <li>2.9% Medicare tax applies with no cap.</li>
          <li>An additional 0.9% Medicare surtax applies to combined wages + SE earnings above {formatUSD(ADDITIONAL_MEDICARE_THRESHOLD[filingStatus])} for your filing status.</li>
          <li>Half of the Social Security + regular Medicare portion (not the 0.9% surtax) is deductible against your income tax — the &quot;above the line&quot; SE tax deduction.</li>
        </ul>
      </Box>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Setting aside the right percentage of freelance income for taxes throughout the year.</li>
          <li>Estimating quarterly estimated tax payments before the IRS deadline.</li>
          <li>Comparing take-home pay between a W-2 offer and a 1099 contract at the same gross rate.</li>
          <li>Understanding why a side hustle&apos;s tax bill feels disproportionately large.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Do I owe SE tax on every dollar of profit?</Typography>
      <Typography variant="body1">
        SE tax applies to net profit (revenue minus business expenses), not gross revenue — and only above
        $400 of net earnings does SE tax apply at all. Track business expenses carefully; they reduce both your
        income tax and your SE tax.
      </Typography>
      <Typography variant="h3">What if I also have a W-2 job?</Typography>
      <Typography variant="body1">
        Your W-2 wages count first against the Social Security wage base — if your W-2 income alone already
        exceeds the cap, none of your self-employment earnings owe the 12.4% Social Security portion, only the
        uncapped 2.9% Medicare portion.
      </Typography>
      <Typography variant="h3">Is the income tax estimate exact?</Typography>
      <Typography variant="body1">
        No — it's a simplified estimate using the federal standard deduction and brackets only, and doesn't
        account for state tax, the Qualified Business Income (QBI) deduction, retirement plan contributions
        (SEP-IRA, Solo 401(k)), health insurance premiums, or other above-the-line deductions that commonly
        apply to self-employed filers and can meaningfully lower this number.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      url="/finance/self-employment-tax-calculator"
      content={content}
    >
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>Net Self-Employment Profit (annual)</Typography>
            <TextField
              fullWidth type="number" value={netProfit} onFocus={(e) => e.target.select()}
              onChange={(e) => setNetProfit(e.target.value === '' ? 0 : Number(e.target.value))}
              slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>Other W-2 Wages (if any)</Typography>
            <TextField
              fullWidth type="number" value={otherW2Wages} onFocus={(e) => e.target.select()}
              onChange={(e) => setOtherW2Wages(e.target.value === '' ? 0 : Number(e.target.value))}
              slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
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
        </Box>

        <Box>
          <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2, height: '100%' }}>
            <Typography variant="h6" color="text.secondary">
              Self-Employment Tax
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 3, color: 'primary.main' }}>
              {formatUSD(result.selfEmploymentTax)}
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 3 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">Social Security (12.4%)</Typography>
                <Typography variant="h6">{formatUSD(result.socialSecurityTax)}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Medicare (2.9%+)</Typography>
                <Typography variant="h6">{formatUSD(result.medicareTax + result.additionalMedicareTax)}</Typography>
              </Box>
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              Half of SE tax deduction: {formatUSD(result.halfSeTaxDeduction)}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Estimated federal income tax: {formatUSD(result.estimatedIncomeTax)}
            </Typography>

            <Box sx={{ pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
              <Typography variant="body2" color="text.secondary">Total estimated federal tax owed</Typography>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {formatUSD(result.selfEmploymentTax + result.estimatedIncomeTax)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default SelfEmploymentTaxCalculator;
