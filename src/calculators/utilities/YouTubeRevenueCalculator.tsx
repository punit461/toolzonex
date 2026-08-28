'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, Stack } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

const YouTubeRevenueCalculator = () => {
  const [views, setViews] = useState<string>('');
  const [rpm, setRpm] = useState<string>('5');
  const [cpm, setCpm] = useState<string>('8');
  const [fill, setFill] = useState<string>('100');

  const result = useMemo(() => {
    const totalViews = Number(views);
    const r = Number(rpm);
    const c = Number(cpm);
    const f = Number(fill) || 0;

    if (!totalViews || totalViews <= 0 || !r || r < 0) return null;

    const monthly = (totalViews / 1000) * r;
    const yearly = monthly * 12;
    const daily = monthly / 30;

    const adSenseShare = monthly * 0.55;
    const effectiveCpm = c * (f / 100);
    const cpmBased = (totalViews / 1000) * effectiveCpm;

    return { monthly, yearly, daily, adSenseShare, cpmBased };
  }, [views, rpm, cpm, fill]);

  const content = (
    <>
      <Typography variant="h2">How is YouTube Revenue Calculated?</Typography>
      <Typography variant="body1">
        YouTube revenue is estimated from your views and RPM (revenue per 1,000 views). Monthly revenue =
        (monthly views / 1000) × RPM. RPM is the amount you actually earn per 1,000 views after YouTube's
        share. A related metric is CPM, the amount advertisers pay per 1,000 ad impressions, of which
        creators typically receive around 55%.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        With 100,000 monthly views and an RPM of $5, monthly revenue is (100,000 / 1000) × $5 = $500. That
        works out to $6,000 per year and roughly $16.67 per day.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Setting realistic expectations for a new or growing channel.</li>
          <li>Comparing the earning potential of different RPM scenarios.</li>
          <li>Estimate monthly passive income from monetized content.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is the difference between RPM and CPM?</Typography>
      <Typography variant="body1">
        RPM is your actual revenue per 1,000 views (after YouTube's cut). CPM is what advertisers pay per
        1,000 ad impressions. RPM is the number that directly reflects what you earn.
      </Typography>
      <Typography variant="h3">Why does YouTube take a 45% cut?</Typography>
      <Typography variant="body1">
        YouTube keeps roughly 45% of ad revenue for infrastructure, hosting, and operating costs, leaving
        about 55% for the creator. Not every view is monetized either, which is why RPM is lower than CPM.
      </Typography>
      <Typography variant="h3">Is this a guaranteed amount?</Typography>
      <Typography variant="body1">
        No — this is an estimate. Actual earnings depend on your audience, ad fill rate, geography, video
        length, and the content niche, and they vary month to month.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/youtube-revenue-calculator" content={content}>
      <Stack spacing={3}>
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Stack spacing={2}>
            <TextField label="Monthly Views" type="number" fullWidth value={views} onChange={(e) => setViews(e.target.value)} onFocus={(e) => e.target.select()} />
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField label="Average RPM ($)" type="number" fullWidth value={rpm} onChange={(e) => setRpm(e.target.value)} onFocus={(e) => e.target.select()} />
              <TextField label="Ad Fill Rate (%)" type="number" fullWidth value={fill} onChange={(e) => setFill(e.target.value)} onFocus={(e) => e.target.select()} />
            </Stack>
            <TextField label="CPM ($)" type="number" fullWidth value={cpm} onChange={(e) => setCpm(e.target.value)} onFocus={(e) => e.target.select()} />
          </Stack>
        </Paper>

        {result && (
          <Paper variant="outlined" sx={{ p: 3, bgcolor: 'action.hover' }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 2, mb: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">Monthly Revenue</Typography>
                <Typography variant="h5" fontWeight={700}>{currency.format(result.monthly)}</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">Yearly Revenue</Typography>
                <Typography variant="h5" fontWeight={700}>{currency.format(result.yearly)}</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">Daily Revenue</Typography>
                <Typography variant="h5" fontWeight={700}>{currency.format(result.daily)}</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 2 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">AdSense Share (55%)</Typography>
                <Typography variant="h6" fontWeight={600}>{currency.format(result.adSenseShare)} / mo</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">Estimated CPM-based</Typography>
                <Typography variant="h6" fontWeight={600}>{currency.format(result.cpmBased)} / mo</Typography>
              </Box>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary" align="center">Revenue is an estimate and can vary.</Typography>
            </Box>
          </Paper>
        )}
      </Stack>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default YouTubeRevenueCalculator;
