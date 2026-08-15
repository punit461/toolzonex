'use client';

import { useMemo, useState } from 'react';
import {
  Box, TextField, Typography, InputAdornment, Select, MenuItem,
  FormControl, InputLabel, Divider,
} from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import type { FilingStatus } from './federalTax';
import { STATE_TAX_CONFIGS } from './stateTax';
import { calculatePaycheck, forPeriod, type PayFrequency } from './paycheckEngine';

const formatUSD = (value: number) =>
  `$${Math.round(value).toLocaleString('en-US')}`;

const FILING_STATUS_LABELS: Record<FilingStatus, string> = {
  single: 'Single',
  marriedJoint: 'Married Filing Jointly',
  headOfHousehold: 'Head of Household',
};

const FREQUENCY_LABELS: Record<PayFrequency, string> = {
  annual: 'Annual',
  monthly: 'Monthly',
  biweekly: 'Bi-Weekly (26/yr)',
  weekly: 'Weekly',
};

interface Props {
  stateSlug: keyof typeof STATE_TAX_CONFIGS;
}

const PaycheckCalculatorContent = ({ stateSlug }: Props) => {
  const [grossAnnual, setGrossAnnual] = useState<number>(75_000);
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');
  const [frequency, setFrequency] = useState<PayFrequency>('biweekly');

  const stateConfig = STATE_TAX_CONFIGS[stateSlug];
  const result = useMemo(
    () => calculatePaycheck(grossAnnual, filingStatus, stateConfig),
    [grossAnnual, filingStatus, stateConfig],
  );

  const period = (annual: number) => formatUSD(forPeriod(annual, frequency));

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
      <Box sx={{ minWidth: 0 }}>
        <Box sx={{ mb: 3 }}>
          <Typography gutterBottom>Gross Annual Salary</Typography>
          <TextField
            fullWidth
            type="number"
            value={grossAnnual}
            onFocus={(e) => e.target.select()}
            onChange={(e) => setGrossAnnual(e.target.value === '' ? 0 : Number(e.target.value))}
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Filing Status</InputLabel>
            <Select
              value={filingStatus}
              label="Filing Status"
              onChange={(e) => setFilingStatus(e.target.value as FilingStatus)}
            >
              {Object.entries(FILING_STATUS_LABELS).map(([value, label]) => (
                <MenuItem key={value} value={value}>{label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Pay Frequency</InputLabel>
            <Select
              value={frequency}
              label="Pay Frequency"
              onChange={(e) => setFrequency(e.target.value as PayFrequency)}
            >
              {Object.entries(FREQUENCY_LABELS).map(([value, label]) => (
                <MenuItem key={value} value={value}>{label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
          Based on published 2025 federal and {stateConfig.name} tax brackets. For illustration only —
          consult a tax professional or your state&apos;s Department of Revenue for exact figures.
          {stateConfig.notes ? ` ${stateConfig.notes}` : ''}
        </Typography>
      </Box>

      <Box>
        <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">Take-Home Pay ({FREQUENCY_LABELS[frequency]})</Typography>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, color: 'primary.main' }}>
            {period(result.netAnnual)}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {formatUSD(result.netAnnual)} / year · effective tax rate {(result.effectiveTaxRate * 100).toFixed(1)}%
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">Gross Pay</Typography>
              <Typography variant="body2" fontWeight={600}>{period(result.grossAnnual)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">Federal Income Tax</Typography>
              <Typography variant="body2" fontWeight={600}>-{period(result.federalTax)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">Social Security</Typography>
              <Typography variant="body2" fontWeight={600}>-{period(result.socialSecurity)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">Medicare</Typography>
              <Typography variant="body2" fontWeight={600}>-{period(result.medicare)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">{stateConfig.name} State Tax</Typography>
              <Typography variant="body2" fontWeight={600}>
                {result.stateTax > 0 ? `-${period(result.stateTax)}` : '$0 (no state income tax)'}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const PaycheckCalculator = ({ stateSlug }: Props) => {
  const stateConfig = STATE_TAX_CONFIGS[stateSlug];

  const content = (
    <>
      <Typography variant="h2">{stateConfig.name} Paycheck Calculator</Typography>
      <Typography variant="body1">
        Estimate your {stateConfig.name} take-home pay after federal income tax, Social Security, Medicare, and
        {stateConfig.hasIncomeTax ? ` ${stateConfig.name} state income tax` : ` — since ${stateConfig.name} has no state income tax, none is deducted here`}.
        Enter your gross annual salary, choose your filing status, and see your net pay broken down by pay period.
      </Typography>

      <Typography variant="h2">How is my {stateConfig.name} paycheck calculated?</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Federal income tax:</strong> calculated using 2025 IRS tax brackets after the standard deduction.</li>
          <li><strong>Social Security:</strong> 6.2% of wages, up to the annual wage base ($176,100 for 2025).</li>
          <li><strong>Medicare:</strong> 1.45% of all wages, plus an additional 0.9% on income above $200,000 (single) or $250,000 (married filing jointly).</li>
          {stateConfig.hasIncomeTax ? (
            <li><strong>{stateConfig.name} state tax:</strong> calculated using {stateConfig.name}&apos;s published state income tax brackets after the state standard deduction.</li>
          ) : (
            <li><strong>{stateConfig.name} state tax:</strong> $0 — {stateConfig.name} does not levy a state income tax on wages.</li>
          )}
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell
      title={`${stateConfig.name} Paycheck Calculator`}
      description={`Free ${stateConfig.name} paycheck calculator. Estimate your take-home pay after federal tax, FICA, and state tax.`}
      url={`/finance/${stateConfig.slug}-paycheck-calculator`}
      content={content}
      category="Finance"
    >
      <PaycheckCalculatorContent stateSlug={stateSlug} />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PaycheckCalculator;
