'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, MenuItem } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const TIERS = [
  { key: 'sd', label: 'SD (Standard Definition)', gbPerHour: 0.3 },
  { key: 'hd', label: 'HD (720p/1080p)', gbPerHour: 1.8 },
  { key: '4k', label: '4K Ultra HD', gbPerHour: 8 },
];

const PERIODS = [
  { key: 'day', label: 'Day' },
  { key: 'week', label: 'Week' },
  { key: 'month', label: 'Month' },
];

const VideoStreamingDataCalculator = () => {
  const [tier, setTier] = useState('hd');
  const [hours, setHours] = useState('2');
  const [period, setPeriod] = useState('day');

  const selectedTier = TIERS.find((t) => t.key === tier)!;
  const selectedPeriod = PERIODS.find((p) => p.key === period)!;
  const h = parseFloat(hours) || 0;
  const totalGb = h * selectedTier.gbPerHour;

  const content = (
    <>
      <Typography variant="h2">How to Use the Video Streaming Data Calculator</Typography>
      <Typography variant="body1">
        Pick a video quality tier — SD, HD, or 4K Ultra HD — then enter how many hours you watch per day, week,
        or month using the period selector. Each tier uses an illustrative data rate commonly cited by
        streaming services, in GB per hour of video, to estimate the total data used over your selected period.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Total Data = Hours Watched × GB per Hour (for selected quality tier)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Watching 2 hours of HD video per day at roughly 1.8 GB per hour uses about 3.6 GB per day. The same 2
        hours in 4K Ultra HD at roughly 8 GB per hour would use about 16 GB per day instead — more than four
        times as much data for the same viewing time.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking whether your mobile or home internet data plan is enough for your streaming habits.</li>
          <li>Comparing how much switching from HD to 4K would increase your data usage.</li>
          <li>Estimating data usage before a trip where you'll rely on a limited mobile hotspot.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Internet Data Usage Calculator?</strong> The Internet Data Usage Calculator is a generic broadband usage estimator where you add multiple activities — streaming, video calls, browsing, gaming — each with hours and a custom rate. This tool is pre-loaded specifically with video-streaming quality-tier data rates (SD, HD, 4K), making it a faster, more focused way to estimate data use from streaming video alone.</li>
          <li><strong>Are these data rates exact for every streaming service?</strong> No — they're representative illustrative figures. Actual usage varies by platform, video codec, and specific quality setting (some services let you cap quality lower to save data), so check your streaming app's own data usage settings for a more precise number.</li>
          <li><strong>Why does 4K use so much more data than HD?</strong> 4K video has roughly four times the pixel count of 1080p HD. While video compression narrows the gap somewhat, 4K streams still typically require several times more data per hour than standard HD streams to preserve that extra detail.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/video-streaming-data-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Stack spacing={3}>
          <TextField select label="Video Quality" value={tier} onChange={(e) => setTier(e.target.value)} fullWidth>
            {TIERS.map((t) => (
              <MenuItem key={t.key} value={t.key}>{t.label} (~{t.gbPerHour} GB/hr)</MenuItem>
            ))}
          </TextField>
          <TextField label="Hours Watched" type="number" value={hours} onChange={(e) => setHours(e.target.value)} fullWidth />
          <TextField select label="Per" value={period} onChange={(e) => setPeriod(e.target.value)} fullWidth>
            {PERIODS.map((p) => (
              <MenuItem key={p.key} value={p.key}>{p.label}</MenuItem>
            ))}
          </TextField>
        </Stack>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="h6">Data Used per {selectedPeriod.label}</Typography>
            <Typography variant="h6" fontWeight="bold">{totalGb.toFixed(2)} GB</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default VideoStreamingDataCalculator;
