'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, MenuItem } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const TIERS = [
  { key: 'low', label: 'Low (~64 kbps)', kbps: 64 },
  { key: 'normal', label: 'Normal (~128 kbps)', kbps: 128 },
  { key: 'high', label: 'High (~320 kbps)', kbps: 320 },
];

const PERIODS = [
  { key: 'day', label: 'Day' },
  { key: 'week', label: 'Week' },
  { key: 'month', label: 'Month' },
];

const gbPerHour = (kbps: number) => (kbps * 3600) / 8 / 1_000_000;

const MusicStreamingDataCalculator = () => {
  const [tier, setTier] = useState('normal');
  const [hours, setHours] = useState('10');
  const [period, setPeriod] = useState('week');

  const selectedTier = TIERS.find((t) => t.key === tier)!;
  const selectedPeriod = PERIODS.find((p) => p.key === period)!;
  const h = parseFloat(hours) || 0;
  const rate = gbPerHour(selectedTier.kbps);
  const totalGb = h * rate;

  const content = (
    <>
      <Typography variant="h2">How to Use the Music Streaming Data Calculator</Typography>
      <Typography variant="body1">
        Pick an audio quality/bitrate tier matching your streaming service&apos;s setting — Low, Normal, or High
        — then enter how many hours you listen per day, week, or month. Bitrate (in kilobits per second) is
        converted into data used per hour, then multiplied by your listening time for the selected period.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        GB per Hour = Bitrate (kbps) × 3600 seconds / 8 bits-per-byte / 1,000,000<br />
        Total Data = GB per Hour × Hours Listened
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Streaming at Normal quality (128 kbps) works out to about 0.0576 GB per hour. Listening 10 hours a week
        at that quality uses about 0.58 GB per week — roughly 2.5 GB per month. Switching to High quality (320
        kbps, about 0.144 GB per hour) for the same 10 hours would use about 1.44 GB per week instead.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking how much of a limited mobile data plan music streaming will use.</li>
          <li>Comparing data usage between streaming quality settings before choosing one for mobile listening.</li>
          <li>Estimating monthly data usage for offline-download planning versus live streaming.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why is music streaming data usage so much lower than video?</strong> Audio requires far less data than video because it has no visual information to encode — even a high-quality 320 kbps audio stream uses a small fraction of the data that even standard-definition video uses per hour.</li>
          <li><strong>Do these bitrates match every streaming service exactly?</strong> They're representative of common settings (many services offer roughly 24-64 kbps low-data modes, ~128 kbps normal streaming, and 256-320 kbps high-quality options), but exact bitrate labels and default settings vary by platform — check your app's audio quality settings for its specific figures.</li>
          <li><strong>Does downloading for offline listening use less data overall?</strong> Downloading a track uses the same data as streaming it once, but you avoid re-downloading that data every time you play it again — so for songs you replay often, downloading once for offline listening uses less total data than repeated streaming.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/music-streaming-data-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Stack spacing={3}>
          <TextField select label="Audio Quality" value={tier} onChange={(e) => setTier(e.target.value)} fullWidth>
            {TIERS.map((t) => (
              <MenuItem key={t.key} value={t.key}>{t.label}</MenuItem>
            ))}
          </TextField>
          <TextField label="Hours Listened" type="number" value={hours} onChange={(e) => setHours(e.target.value)} fullWidth />
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
            <Typography variant="h6" fontWeight="bold">{totalGb.toFixed(3)} GB</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default MusicStreamingDataCalculator;
