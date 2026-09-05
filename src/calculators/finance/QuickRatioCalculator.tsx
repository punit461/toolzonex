'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const QuickRatioCalculator = () => {
  const [assets, setAssets] = useState('180000');
  const [inventory, setInventory] = useState('50000');
  const [prepaid, setPrepaid] = useState('10000');
  const [liabilities, setLiabilities] = useState('90000');

  const { ratio, band, bandColor } = useMemo(() => {
    const a = parseFloat(assets) || 0;
    const inv = parseFloat(inventory) || 0;
    const pre = parseFloat(prepaid) || 0;
    const l = parseFloat(liabilities) || 0;
    const quickAssets = Math.max(0, a - inv - pre);
    const r = l > 0 ? quickAssets / l : 0;

    let bandLabel = 'Enter values to see interpretation';
    let color: 'success' | 'warning' | 'error' | 'info' = 'info';
    if (l > 0) {
      if (r < 1) {
        bandLabel = 'Below 1.0 — potential concern. Quick assets alone may not cover current liabilities without selling inventory.';
        color = 'error';
      } else if (r <= 1.5) {
        bandLabel = 'Between 1.0 and 1.5 — a reasonably healthy, stricter liquidity position.';
        color = 'success';
      } else {
        bandLabel = 'Above 1.5 — very strong immediate liquidity.';
        color = 'warning';
      }
    }
    return { ratio: r, band: bandLabel, bandColor: color };
  }, [assets, inventory, prepaid, liabilities]);

  const content = (
    <>
      <Typography variant="h2">How the Quick Ratio Is Calculated</Typography>
      <Typography variant="body1">
        The quick ratio — also called the acid-test ratio — is a stricter liquidity measure than the current
        ratio. It excludes inventory and prepaid expenses from current assets, since both can take time to
        convert into cash, then divides the remainder by current liabilities.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Quick Ratio = (Current Assets − Inventory − Prepaid Expenses) ÷ Current Liabilities
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A company with $180,000 in current assets, $50,000 of which is inventory and $10,000 prepaid
        expenses, against $90,000 in current liabilities has a quick ratio of (180,000 − 50,000 − 10,000) ÷
        90,000 = 1.33 — it can cover its short-term obligations 1.33 times over using only its most liquid
        assets.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Getting a stricter read on liquidity for businesses with large, slow-moving inventory.</li>
          <li>Assessing short-term solvency risk before extending credit or a loan.</li>
          <li>Comparing quick ratio against the current ratio to see how much inventory affects the picture.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Current Ratio Calculator?</strong> The Current Ratio Calculator divides all current assets by current liabilities, treating inventory the same as cash. This quick ratio (acid-test) excludes inventory and prepaid expenses — less liquid assets — giving a stricter measure of a business&apos;s immediate ability to pay short-term debts.</li>
          <li><strong>What counts as a good quick ratio?</strong> A quick ratio of 1.0 or higher is generally considered healthy, meaning quick assets alone can cover current liabilities without needing to sell inventory. Ratios below 1.0 warrant a closer look at cash flow.</li>
          <li><strong>Why exclude prepaid expenses?</strong> Prepaid expenses (like prepaid insurance or rent) represent value already used up in advance — they can&apos;t be converted back into cash to pay a bill, so the quick ratio leaves them out of the numerator.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/finance/quick-ratio-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Current Assets"
            type="number"
            value={assets}
            onChange={(e) => setAssets(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Inventory"
            type="number"
            value={inventory}
            onChange={(e) => setInventory(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Prepaid Expenses"
            type="number"
            value={prepaid}
            onChange={(e) => setPrepaid(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Current Liabilities"
            type="number"
            value={liabilities}
            onChange={(e) => setLiabilities(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Quick Ratio</Typography>
            <Typography variant="h3" fontWeight="bold">{ratio.toFixed(2)}</Typography>
          </Paper>
          <Alert severity={bandColor}>{band}</Alert>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default QuickRatioCalculator;
