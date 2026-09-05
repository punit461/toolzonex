'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Mode = 'direct' | 'breakdown';

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

const OperatingMarginCalculator = () => {
  const [mode, setMode] = useState<Mode>('breakdown');
  const [revenue, setRevenue] = useState('500000');
  const [operatingIncome, setOperatingIncome] = useState('75000');
  const [cogs, setCogs] = useState('300000');
  const [opex, setOpex] = useState('125000');

  const { opIncome, margin } = useMemo(() => {
    const rev = parseFloat(revenue) || 0;
    const opIncome = mode === 'direct'
      ? (parseFloat(operatingIncome) || 0)
      : rev - (parseFloat(cogs) || 0) - (parseFloat(opex) || 0);
    const margin = rev > 0 ? (opIncome / rev) * 100 : 0;
    return { opIncome, margin };
  }, [mode, revenue, operatingIncome, cogs, opex]);

  const content = (
    <>
      <Typography variant="h2">How Operating Margin Is Calculated</Typography>
      <Typography variant="body1">
        Operating margin measures what share of revenue is left as profit after covering both the direct cost
        of goods sold and the operating expenses needed to run the business — things like salaries, rent,
        marketing, and administration. Enter your operating income directly if you already have it, or build it
        up from revenue, COGS, and operating expenses.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Operating Income = Revenue − COGS − Operating Expenses
        <br />
        Operating Margin (%) = (Operating Income ÷ Revenue) × 100
      </Box>
      <Typography variant="body2" color="text.secondary">
        Operating margin differs from gross margin in one key way: gross margin only subtracts the cost of
        goods sold (COGS) from revenue, while operating margin goes a step further and also subtracts operating
        expenses like SG&amp;A (selling, general &amp; administrative costs). Operating margin is always equal
        to or lower than gross margin for the same business.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A business with $500,000 in revenue, $300,000 in COGS, and $125,000 in operating expenses has operating
        income of 500,000 − 300,000 − 125,000 = $75,000, for an operating margin of 75,000 ÷ 500,000 × 100 = 15%.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Assessing how efficiently a business converts revenue into operating profit.</li>
          <li>Comparing operational efficiency across companies or business units, independent of financing and tax structure.</li>
          <li>Tracking whether rising overhead is eating into profitability even as revenue grows.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is operating margin different from gross margin?</Typography>
      <Typography variant="body1">
        Gross margin only accounts for COGS — the direct cost of producing what&apos;s sold. Operating margin
        also subtracts operating expenses like salaries, rent, marketing, and admin costs, giving a fuller
        picture of how much of each revenue dollar survives after running the actual business, not just making
        the product.
      </Typography>
      <Typography variant="h3">How is operating margin different from net margin?</Typography>
      <Typography variant="body1">
        Operating margin stops before interest and taxes. Net margin goes further still, subtracting interest
        expense and taxes to arrive at the final bottom-line profit margin.
      </Typography>
      <Typography variant="h3">What&apos;s considered a good operating margin?</Typography>
      <Typography variant="body1">
        It varies by industry — software and services businesses often post operating margins of 20% or higher,
        while capital-intensive industries like retail or manufacturing frequently run margins in the
        single-digit to low-teens range. Compare against similar businesses in your industry.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/operating-margin-calculator" content={content}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={(_, val: Mode | null) => { if (val) setMode(val); }}
          size="small"
        >
          <ToggleButton value="breakdown">Revenue − COGS − OpEx</ToggleButton>
          <ToggleButton value="direct">Operating Income Directly</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Revenue" type="number" value={revenue}
            onChange={(e) => setRevenue(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          {mode === 'direct' ? (
            <TextField
              label="Operating Income" type="number" value={operatingIncome}
              onChange={(e) => setOperatingIncome(e.target.value)} onFocus={(e) => e.target.select()}
              fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
            />
          ) : (
            <>
              <TextField
                label="Cost of Goods Sold (COGS)" type="number" value={cogs}
                onChange={(e) => setCogs(e.target.value)} onFocus={(e) => e.target.select()}
                fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
              />
              <TextField
                label="Operating Expenses (SG&A)" type="number" value={opex}
                onChange={(e) => setOpex(e.target.value)} onFocus={(e) => e.target.select()}
                fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
              />
            </>
          )}
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Operating Income</Typography>
            <Typography variant="h3" fontWeight="bold">{fmt(opIncome)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Operating Margin</Typography>
            <Typography fontWeight={600}>{margin.toFixed(1)}%</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default OperatingMarginCalculator;
