'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, InputAdornment, MenuItem, Select, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

// 2026 IRS figures (Rev. Proc. 2025-32 / IRS "401(k) limit increases to $24,500
// for 2026; IRA limit increases to $7,500" release). These are inflation-adjusted
// annually -- verify against irs.gov before relying on this for tax planning.
const IRA_LIMIT_2026 = 7_500;
const IRA_CATCHUP_50_PLUS = 1_100;

type FilingStatus = 'single' | 'marriedJoint' | 'headOfHousehold' | 'marriedSeparate';
type Coverage = 'neither' | 'covered' | 'spouseCovered';

const ROTH_PHASEOUT: Record<FilingStatus, { floor: number; ceiling: number }> = {
  single: { floor: 153_000, ceiling: 168_000 },
  headOfHousehold: { floor: 153_000, ceiling: 168_000 },
  marriedJoint: { floor: 242_000, ceiling: 252_000 },
  marriedSeparate: { floor: 0, ceiling: 10_000 },
};

const TRADITIONAL_PHASEOUT_COVERED: Record<FilingStatus, { floor: number; ceiling: number }> = {
  single: { floor: 81_000, ceiling: 91_000 },
  headOfHousehold: { floor: 81_000, ceiling: 91_000 },
  marriedJoint: { floor: 129_000, ceiling: 149_000 },
  marriedSeparate: { floor: 0, ceiling: 10_000 },
};

const TRADITIONAL_PHASEOUT_SPOUSE_COVERED = { floor: 242_000, ceiling: 252_000 };

const formatUSD = (value: number) =>
  `$${Math.round(value).toLocaleString('en-US')}`;

/** Linear phase-out, rounded down to the nearest $10, with the IRS's $200 minimum once any amount survives. */
function phaseOut(magi: number, floor: number, ceiling: number, limit: number): number {
  if (limit <= 0) return 0;
  if (magi <= floor) return limit;
  if (magi >= ceiling) return 0;
  const reduced = limit * (ceiling - magi) / (ceiling - floor);
  const rounded = Math.floor(reduced / 10) * 10;
  return Math.max(rounded, 200);
}

const IraRothCalculator = () => {
  const [age, setAge] = useState<number>(35);
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');
  const [magi, setMagi] = useState<number>(90000);
  const [coverage, setCoverage] = useState<Coverage>('covered');

  const result = useMemo(() => {
    const contributionLimit = IRA_LIMIT_2026 + (age >= 50 ? IRA_CATCHUP_50_PLUS : 0);

    const rothRange = ROTH_PHASEOUT[filingStatus];
    const rothAllowed = phaseOut(magi, rothRange.floor, rothRange.ceiling, contributionLimit);

    let traditionalDeductible = contributionLimit;
    let deductionNote = 'Fully deductible — neither you nor your spouse is covered by a workplace retirement plan, so income doesn\'t limit the deduction.';
    if (coverage === 'covered') {
      const range = TRADITIONAL_PHASEOUT_COVERED[filingStatus];
      traditionalDeductible = phaseOut(magi, range.floor, range.ceiling, contributionLimit);
      deductionNote = `Phases out between ${formatUSD(range.floor)} and ${formatUSD(range.ceiling)} MAGI since you're covered by a workplace plan.`;
    } else if (coverage === 'spouseCovered') {
      const range = TRADITIONAL_PHASEOUT_SPOUSE_COVERED;
      traditionalDeductible = phaseOut(magi, range.floor, range.ceiling, contributionLimit);
      deductionNote = `Phases out between ${formatUSD(range.floor)} and ${formatUSD(range.ceiling)} MAGI — you're not covered, but your spouse is.`;
    }

    return { contributionLimit, rothAllowed, traditionalDeductible, deductionNote, rothRange };
  }, [age, filingStatus, magi, coverage]);

  const content = (
    <>
      <Typography variant="h2">How this calculator works</Typography>
      <Typography variant="body1">
        The IRS caps how much you can contribute to an IRA each year, and separately limits <em>who</em> gets
        the tax benefits based on income. A Roth IRA&apos;s contribution eligibility phases out entirely above a
        MAGI ceiling. A Traditional IRA is always open to contribute to, but the <em>deduction</em> phases out
        once you (or your spouse) are covered by a workplace retirement plan and your income crosses the
        relevant range — outside that range, contributions are still allowed, just as non-deductible
        (after-tax) contributions.
      </Typography>

      <Typography variant="h2">2026 limits</Typography>
      <Typography variant="body1">
        <strong>Base contribution limit:</strong> {formatUSD(IRA_LIMIT_2026)}<br />
        <strong>Catch-up (age 50+):</strong> additional {formatUSD(IRA_CATCHUP_50_PLUS)}, for a total of {formatUSD(IRA_LIMIT_2026 + IRA_CATCHUP_50_PLUS)}<br />
        This limit is shared across all your IRAs combined (Traditional + Roth), not per account.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking whether your income is too high for a direct Roth IRA contribution this year.</li>
          <li>Deciding between a Traditional and Roth IRA based on whether the Traditional deduction actually applies to you.</li>
          <li>Planning a &quot;backdoor Roth&quot; when direct Roth contributions are phased out.</li>
          <li>Confirming your exact contribution limit once you turn 50.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What if my Roth contribution is limited — can I still contribute the rest to a Traditional IRA?</Typography>
      <Typography variant="body1">
        Yes. The {formatUSD(result.contributionLimit)} limit is a combined cap across Traditional and Roth IRAs, not
        a separate limit for each. If you&apos;re phased out of a full Roth contribution, you can split the
        remainder into a Traditional IRA (deductible or not, depending on your coverage situation).
      </Typography>
      <Typography variant="h3">What&apos;s a &quot;backdoor Roth&quot;?</Typography>
      <Typography variant="body1">
        If your income is above the Roth phase-out, you can still contribute to a Traditional IRA
        (non-deductible if you&apos;re covered by a workplace plan and over the deduction limit) and then convert
        it to a Roth IRA — there&apos;s no income limit on conversions, only on direct contributions. This has
        tax implications if you hold other pre-tax IRA balances (the pro-rata rule); consult a tax professional
        before doing this.
      </Typography>
      <Typography variant="h3">Is this exact to the dollar?</Typography>
      <Typography variant="body1">
        The phase-out uses the IRS&apos;s standard linear reduction rounded down to the nearest $10, with the
        $200 minimum once any amount survives — the same method the IRS worksheet uses. Always confirm your
        exact allowed contribution using IRS Publication 590-A or a tax professional before filing.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="IRA & Roth IRA Contribution Calculator"
      description="Check your 2026 IRA contribution limit, Roth IRA eligibility by income, and Traditional IRA deduction phase-out."
      url="/finance/ira-roth-calculator"
      content={content}
      category="Finance"
    >
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 3 }}>
            <Box>
              <Typography gutterBottom>Your Age</Typography>
              <TextField
                fullWidth type="number" value={age} onFocus={(e) => e.target.select()}
                onChange={(e) => setAge(e.target.value === '' ? 0 : Number(e.target.value))}
              />
            </Box>
            <Box>
              <Typography gutterBottom>Filing Status</Typography>
              <Select
                fullWidth value={filingStatus}
                onChange={(e) => setFilingStatus(e.target.value as FilingStatus)}
              >
                <MenuItem value="single">Single</MenuItem>
                <MenuItem value="headOfHousehold">Head of Household</MenuItem>
                <MenuItem value="marriedJoint">Married Filing Jointly</MenuItem>
                <MenuItem value="marriedSeparate">Married Filing Separately</MenuItem>
              </Select>
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>Modified AGI (MAGI)</Typography>
            <TextField
              fullWidth type="number" value={magi} onFocus={(e) => e.target.select()}
              onChange={(e) => setMagi(e.target.value === '' ? 0 : Number(e.target.value))}
              slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>Workplace Plan Coverage (for Traditional IRA deduction)</Typography>
            <ToggleButtonGroup
              exclusive value={coverage} orientation="vertical" fullWidth
              onChange={(_, value) => value !== null && setCoverage(value)}
            >
              <ToggleButton value="neither">Neither spouse covered by a workplace plan</ToggleButton>
              <ToggleButton value="covered">You&apos;re covered by a workplace plan</ToggleButton>
              {filingStatus === 'marriedJoint' && (
                <ToggleButton value="spouseCovered">You&apos;re not covered, but your spouse is</ToggleButton>
              )}
            </ToggleButtonGroup>
          </Box>
        </Box>

        <Box>
          <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2, height: '100%' }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              2026 Contribution Limit
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 3, color: 'primary.main' }}>
              {formatUSD(result.contributionLimit)}
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary">Roth IRA — amount you can contribute</Typography>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {formatUSD(result.rothAllowed)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {result.rothAllowed === result.contributionLimit
                  ? 'Fully eligible — your MAGI is below the phase-out range.'
                  : result.rothAllowed === 0
                    ? `Phased out completely above ${formatUSD(result.rothRange.ceiling)} MAGI.`
                    : `Partially phased out (range: ${formatUSD(result.rothRange.floor)}–${formatUSD(result.rothRange.ceiling)}).`}
              </Typography>
            </Box>

            <Box>
              <Typography variant="body2" color="text.secondary">Traditional IRA — deductible amount</Typography>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {formatUSD(result.traditionalDeductible)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {result.deductionNote}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default IraRothCalculator;
