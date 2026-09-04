'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) =>
  `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const EmailMarketingRoiCalculatorContent = () => {
  const [platformCost, setPlatformCost] = useState('150');
  const [adSpend, setAdSpend] = useState('0');
  const [revenue, setRevenue] = useState('2400');
  const [listSize, setListSize] = useState('10000');

  const result = useMemo(() => {
    const cost = (parseFloat(platformCost) || 0) + (parseFloat(adSpend) || 0);
    const rev = parseFloat(revenue) || 0;
    const list = parseFloat(listSize);
    if (cost <= 0) return null;

    const roiPercent = ((rev - cost) / cost) * 100;
    const costPerEmail = !Number.isNaN(list) && list > 0 ? cost / list : null;

    return { cost, roiPercent, costPerEmail };
  }, [platformCost, adSpend, revenue, listSize]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Email Platform / Tool Cost"
          type="number"
          fullWidth
          value={platformCost}
          onChange={(e) => setPlatformCost(e.target.value)}
          onFocus={(e) => e.target.select()}
          slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
        />
        <TextField
          label="Ad Spend (if any)"
          type="number"
          fullWidth
          value={adSpend}
          onChange={(e) => setAdSpend(e.target.value)}
          onFocus={(e) => e.target.select()}
          helperText="Any paid promotion to grow the list or campaign"
          slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
        />
        <TextField
          label="Revenue Generated"
          type="number"
          fullWidth
          value={revenue}
          onChange={(e) => setRevenue(e.target.value)}
          onFocus={(e) => e.target.select()}
          slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
        />
        <TextField
          label="Emails Sent (optional)"
          type="number"
          fullWidth
          value={listSize}
          onChange={(e) => setListSize(e.target.value)}
          onFocus={(e) => e.target.select()}
          helperText="Optional — enables a cost-per-email figure"
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'action.hover', width: '100%' }}>
          {result ? (
            <>
              <Typography variant="body2" color="text.secondary" gutterBottom>Campaign ROI</Typography>
              <Typography
                variant="h2"
                fontWeight={800}
                color={result.roiPercent >= 0 ? 'success.main' : 'error.main'}
              >
                {result.roiPercent >= 0 ? '+' : ''}{result.roiPercent.toFixed(1)}%
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={2}>
                Total cost: {money(result.cost)}
                {result.costPerEmail !== null && (
                  <>
                    <br />
                    Cost per email: {money(result.costPerEmail)}
                  </>
                )}
              </Typography>
            </>
          ) : (
            <Typography variant="body1" color="text.secondary">Enter a positive campaign cost to calculate</Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

const EmailMarketingRoiCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How Email Marketing ROI Is Calculated</Typography>
      <Typography variant="body1">
        Add up your total campaign cost — your email platform/tool subscription plus any ad spend used to
        grow your list or promote the campaign — then compare it to the revenue that campaign generated.
        Return on investment (ROI) expresses the net gain as a percentage of what you spent.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        ROI% = ((Revenue − Cost) ÷ Cost) × 100
      </Box>
      <Typography variant="body1">
        If you know how many emails were sent, the calculator also shows a cost-per-email figure, which is
        useful for comparing efficiency across different campaigns or list sizes.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A campaign costing $150 in platform fees that generates $2,400 in revenue has an ROI of
        (($2,400 − $150) ÷ $150) × 100 = 1,500%. Sent to a list of 10,000 people, that&apos;s a cost of $0.015
        per email.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Reporting campaign performance to stakeholders or clients.</li>
          <li>Comparing ROI across multiple email campaigns to see which performed best.</li>
          <li>Justifying continued investment in an email marketing platform or list-growth ad spend.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What counts as &quot;revenue generated&quot; from a campaign?</Typography>
      <Typography variant="body1">
        Ideally, revenue directly attributable to that specific campaign — for example, sales tracked through
        a unique discount code, UTM-tagged link, or attribution window tied to clicks from that email. Mixing
        in revenue that would have happened anyway will overstate ROI.
      </Typography>
      <Typography variant="h3">Is email marketing ROI usually this high?</Typography>
      <Typography variant="body1">
        Email marketing is often cited as one of the highest-ROI marketing channels because sending costs are
        low relative to potential revenue, especially for an engaged existing list — but actual results vary
        widely by industry, list quality, and offer.
      </Typography>
      <Typography variant="h3">Should I include staff time as a cost?</Typography>
      <Typography variant="body1">
        This calculator only accounts for direct monetary costs (platform fees and ad spend). If you want a
        fully loaded ROI figure, you can add an estimated dollar value for the time spent creating and
        managing the campaign into the platform/tool cost field.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/email-marketing-roi-calculator" content={content}>
      <EmailMarketingRoiCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default EmailMarketingRoiCalculator;
