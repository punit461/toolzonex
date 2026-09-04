'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) =>
  `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const SocialMediaRoiCalculatorContent = () => {
  const [adSpend, setAdSpend] = useState('500');
  const [revenue, setRevenue] = useState('2000');
  const [engagements, setEngagements] = useState('4000');
  const [newFollowers, setNewFollowers] = useState('300');

  const result = useMemo(() => {
    const spend = parseFloat(adSpend) || 0;
    const rev = parseFloat(revenue) || 0;
    const eng = parseFloat(engagements);
    const followers = parseFloat(newFollowers);
    if (spend <= 0) return null;

    const roiPercent = ((rev - spend) / spend) * 100;
    const costPerEngagement = !Number.isNaN(eng) && eng > 0 ? spend / eng : null;
    const costPerFollower = !Number.isNaN(followers) && followers > 0 ? spend / followers : null;

    return { spend, roiPercent, costPerEngagement, costPerFollower };
  }, [adSpend, revenue, engagements, newFollowers]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Social Media Spend"
          type="number"
          fullWidth
          value={adSpend}
          onChange={(e) => setAdSpend(e.target.value)}
          onFocus={(e) => e.target.select()}
          helperText="Ad spend, boosted posts, and/or campaign cost"
          slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
        />
        <TextField
          label="Revenue Attributed to Social"
          type="number"
          fullWidth
          value={revenue}
          onChange={(e) => setRevenue(e.target.value)}
          onFocus={(e) => e.target.select()}
          slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
        />
        <TextField
          label="Engagements (optional)"
          type="number"
          fullWidth
          value={engagements}
          onChange={(e) => setEngagements(e.target.value)}
          onFocus={(e) => e.target.select()}
          helperText="Likes, comments, shares, clicks — enables cost per engagement"
        />
        <TextField
          label="New Followers Gained (optional)"
          type="number"
          fullWidth
          value={newFollowers}
          onChange={(e) => setNewFollowers(e.target.value)}
          onFocus={(e) => e.target.select()}
          helperText="Enables cost per follower"
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
                Total spend: {money(result.spend)}
                {result.costPerEngagement !== null && (
                  <>
                    <br />
                    Cost per engagement: {money(result.costPerEngagement)}
                  </>
                )}
                {result.costPerFollower !== null && (
                  <>
                    <br />
                    Cost per new follower: {money(result.costPerFollower)}
                  </>
                )}
              </Typography>
            </>
          ) : (
            <Typography variant="body1" color="text.secondary">Enter a positive spend amount to calculate</Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

const SocialMediaRoiCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How Social Media ROI Is Calculated</Typography>
      <Typography variant="body1">
        Enter your total social media spend (ad spend, boosted posts, or overall campaign cost) and the revenue
        you can attribute to that activity. Return on investment (ROI) expresses the net gain as a percentage
        of what you spent.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        ROI% = ((Revenue − Spend) ÷ Spend) × 100
      </Box>
      <Typography variant="body1">
        If revenue is hard to attribute directly, you can optionally enter total engagements (likes, comments,
        shares, clicks) or new followers gained to see a cost-per-engagement or cost-per-follower figure
        instead — useful secondary metrics for brand-awareness or growth-focused campaigns where direct
        revenue tracking is harder.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A campaign costing $500 in ad spend that generates $2,000 in attributed revenue has an ROI of
        (($2,000 − $500) ÷ $500) × 100 = 300%. With 4,000 engagements from that same spend, the cost per
        engagement is $500 ÷ 4,000 = $0.125.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Reporting social media campaign performance to stakeholders or clients.</li>
          <li>Comparing ROI across different platforms or campaign types.</li>
          <li>Evaluating brand-awareness campaigns using cost per engagement or follower.</li>
          <li>Justifying continued investment in paid social media promotion.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How do I attribute revenue to social media specifically?</Typography>
      <Typography variant="body1">
        Common methods include unique discount codes, UTM-tagged links, platform-reported conversion tracking
        (e.g. Meta or TikTok pixel data), or a dedicated landing page used only for that campaign. Mixing in
        revenue that would have happened anyway will overstate ROI.
      </Typography>
      <Typography variant="h3">What&apos;s a good cost per engagement or follower?</Typography>
      <Typography variant="body1">
        This varies enormously by platform, industry, and audience size — there&apos;s no universal benchmark.
        These figures are most useful for comparing your own campaigns against each other over time, or against
        your own historical averages.
      </Typography>
      <Typography variant="h3">Should organic (unpaid) social media efforts be included?</Typography>
      <Typography variant="body1">
        This calculator is built around a spend figure, so it&apos;s best suited to paid campaigns. For organic
        efforts, you could still estimate ROI by entering the value of staff/creator time as your &quot;spend&quot;
        figure.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/social-media-roi-calculator" content={content}>
      <SocialMediaRoiCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default SocialMediaRoiCalculator;
