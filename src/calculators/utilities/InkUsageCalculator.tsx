'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) => `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const InkUsageCalculator = () => {
  const [pagesPerMonth, setPagesPerMonth] = useState('200');
  const [coverage, setCoverage] = useState('5');
  const [ratedYield, setRatedYield] = useState('300');
  const [cartridgeCost, setCartridgeCost] = useState('25');

  const pages = parseFloat(pagesPerMonth);
  const cov = parseFloat(coverage);
  const yieldPages = parseFloat(ratedYield);
  const cost = parseFloat(cartridgeCost);
  const valid = [pages, cov, yieldPages, cost].every((v) => !isNaN(v)) && cov > 0 && yieldPages > 0;

  const effectiveYield = valid ? yieldPages * (5 / cov) : 0;
  const cartridgesPerMonth = valid && effectiveYield > 0 ? pages / effectiveYield : 0;
  const monthlyCost = valid ? cartridgesPerMonth * cost : 0;
  const annualCost = monthlyCost * 12;

  const content = (
    <>
      <Typography variant="h2">How to Use the Ink Usage Calculator</Typography>
      <Typography variant="body1">
        Printer cartridges are rated for a specific page yield, but that rating is measured at a standard
        5% average ink coverage (a typical mixed page of text). If you print more graphics or darker
        documents, your actual coverage per page is higher, and your cartridge runs out faster than its
        rated yield suggests. Enter your monthly print volume, your typical ink coverage, and your
        cartridge&apos;s rated yield and cost to estimate your real-world monthly and annual ink spend.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Effective Pages per Cartridge = Rated Yield × (5 ÷ Coverage %)<br />
        Cartridges Needed per Month = Pages Printed ÷ Effective Pages per Cartridge<br />
        Monthly Cost = Cartridges Needed × Cartridge Cost
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A cartridge rated for 300 pages at 5% coverage, used for documents that average 10% coverage,
        effectively lasts only 300 × (5 ÷ 10) = 150 pages. Printing 200 pages a month at a $25 cartridge
        cost would need about 1.33 cartridges, for a monthly cost of roughly $33.33 and an annual cost of
        about $400.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Budgeting monthly and annual ink or toner costs for a home office or small business printer.</li>
          <li>Comparing the real running cost of cartridges with different rated yields and prices.</li>
          <li>Estimating how much heavier graphics or photo printing will drive up ink spend versus plain text.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why is 5% coverage used as the baseline?</strong> Nearly all printer manufacturers rate cartridge page yields under the ISO/IEC standard test, which uses a mixed document with about 5% average ink coverage per page — that&apos;s why 5% is the default here and the reference point the formula scales from.</li>
          <li><strong>What if my documents are mostly plain text with wide margins?</strong> Lower your coverage percentage below 5% — light text-only pages can use less ink than the standard test page, which would make your effective yield higher than the rated yield.</li>
          <li><strong>Does this account for color versus black ink separately?</strong> No — this calculator treats a single cartridge and coverage figure at a time. For a printer with separate color and black cartridges, run the calculator once per cartridge type using each one&apos;s own rated yield and cost.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/ink-usage-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Stack spacing={3}>
          <TextField label="Pages Printed per Month" type="number" value={pagesPerMonth} onChange={(e) => setPagesPerMonth(e.target.value)} fullWidth />
          <TextField
            label="Average Ink Coverage"
            type="number"
            value={coverage}
            onChange={(e) => setCoverage(e.target.value)}
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
            helperText="Default 5% matches the standard cartridge yield test"
          />
          <TextField label="Cartridge Rated Yield (pages)" type="number" value={ratedYield} onChange={(e) => setRatedYield(e.target.value)} fullWidth />
          <TextField
            label="Cartridge Cost"
            type="number"
            value={cartridgeCost}
            onChange={(e) => setCartridgeCost(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
        </Stack>
        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Monthly Ink Cost</Typography>
            <Typography variant="h4" fontWeight="bold">{valid ? money(monthlyCost) : '—'}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Effective Pages per Cartridge</Typography>
            <Typography fontWeight={600}>{valid ? effectiveYield.toFixed(0) : '—'}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Cartridges Needed per Month</Typography>
            <Typography fontWeight={600}>{valid ? cartridgesPerMonth.toFixed(2) : '—'}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Estimated Annual Cost</Typography>
            <Typography fontWeight={600}>{valid ? money(annualCost) : '—'}</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default InkUsageCalculator;
