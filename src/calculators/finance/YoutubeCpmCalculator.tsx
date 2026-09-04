'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) =>
  `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

type InputMode = 'impressions' | 'views';

const YoutubeCpmCalculatorContent = () => {
  const [mode, setMode] = useState<InputMode>('impressions');
  const [revenue, setRevenue] = useState('500');
  const [impressions, setImpressions] = useState('80000');

  const result = useMemo(() => {
    const r = parseFloat(revenue) || 0;
    const i = parseFloat(impressions) || 0;
    const cpm = i > 0 ? (r / i) * 1000 : 0;
    return { cpm };
  }, [revenue, impressions]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Total Ad Revenue Earned"
          type="number"
          value={revenue}
          onChange={(e) => setRevenue(e.target.value)}
          onFocus={(e) => e.target.select()}
          fullWidth
          slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
        />

        <ToggleButtonGroup value={mode} exclusive onChange={(_, val) => val && setMode(val)} size="small" fullWidth>
          <ToggleButton value="impressions">Ad Impressions</ToggleButton>
          <ToggleButton value="views">Views</ToggleButton>
        </ToggleButtonGroup>

        <TextField
          label={mode === 'impressions' ? 'Number of Ad Impressions' : 'Number of Views'}
          type="number"
          value={impressions}
          onChange={(e) => setImpressions(e.target.value)}
          onFocus={(e) => e.target.select()}
          fullWidth
          helperText={
            mode === 'views'
              ? 'CPM is technically per 1,000 ad impressions, not per view — use impressions for the most accurate CPM'
              : undefined
          }
        />
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
        <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="body2">CPM (Cost Per Mille)</Typography>
          <Typography variant="h3" fontWeight="bold">{money(result.cpm)}</Typography>
          <Typography variant="caption">per 1,000 {mode === 'impressions' ? 'impressions' : 'views'}</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

const YoutubeCpmCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How the YouTube CPM Calculator Works</Typography>
      <Typography variant="body1">
        CPM stands for &quot;cost per mille&quot; (mille = thousand) — the amount advertisers pay per 1,000 ad
        impressions shown. Enter the total ad revenue earned on a video or channel and the number of ad
        impressions (or views, as an approximation) over that same period, and this calculator divides revenue
        by impressions and multiplies by 1,000 to get your CPM.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        CPM = (Ad Revenue ÷ Ad Impressions) × 1,000
      </Box>
      <Typography variant="body1">
        CPM is technically calculated per ad impression, not per video view — a single view can show zero, one,
        or multiple ad impressions depending on ad format and skip behavior. If you only have view counts,
        this calculator can still estimate an approximate CPM using views in place of impressions, but the true
        CPM (based on impressions) is more accurate.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        If a video earned $500 in ad revenue from 80,000 ad impressions, CPM = (500 ÷ 80,000) × 1,000 = $6.25.
        That means advertisers paid an average of $6.25 for every 1,000 times their ad was shown on that video.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Benchmarking your channel&apos;s CPM against your niche&apos;s typical range.</li>
          <li>Tracking how CPM changes across seasons, niches, or audience geography.</li>
          <li>Understanding the advertiser-side metric behind your RPM-based earnings.</li>
          <li>Comparing CPM performance between different videos on the same channel.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is the difference between CPM and RPM?</Typography>
      <Typography variant="body1">
        CPM is what advertisers pay per 1,000 ad impressions, before YouTube&apos;s revenue share. RPM
        (revenue per mille) is what a creator actually earns per 1,000 views, after YouTube&apos;s cut and
        accounting for videos that aren&apos;t fully monetized. If you want to estimate total earnings from
        views, use our separate YouTube Revenue Calculator, which is built around RPM.
      </Typography>
      <Typography variant="h3">Why use impressions instead of views for CPM?</Typography>
      <Typography variant="body1">
        CPM is defined per ad impression, since that&apos;s what advertisers are actually billed for. A video
        can have more ad impressions than views if multiple ads play per view, or fewer if not every view
        triggers an ad — so using views as a stand-in gives only an approximate CPM.
      </Typography>
      <Typography variant="h3">What is a good CPM for YouTube?</Typography>
      <Typography variant="body1">
        CPM varies enormously by content niche, audience country, time of year, and ad format — finance and
        business content, for example, typically commands a much higher CPM than gaming or entertainment
        content. There&apos;s no single &quot;good&quot; number; compare your own CPM over time and against
        similar channels in your niche instead.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/youtube-cpm-calculator" content={content}>
      <YoutubeCpmCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default YoutubeCpmCalculator;
