'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Button, IconButton, Stack, Paper, Select, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const ACTIVITY_PRESETS: { label: string; gbPerHour: number }[] = [
  { label: 'Streaming HD Video', gbPerHour: 3 },
  { label: 'Streaming 4K Video', gbPerHour: 7 },
  { label: 'Video Calls', gbPerHour: 0.9 },
  { label: 'Web Browsing', gbPerHour: 0.15 },
  { label: 'Online Gaming', gbPerHour: 0.1 },
  { label: 'Custom', gbPerHour: 0 },
];

interface Activity {
  id: string;
  preset: string;
  customRate: string;
  hoursPerDay: string;
}

let nextId = 4;

const InternetDataUsageCalculator = () => {
  const [activities, setActivities] = useState<Activity[]>([
    { id: '1', preset: 'Streaming HD Video', customRate: '3', hoursPerDay: '2' },
    { id: '2', preset: 'Video Calls', customRate: '0.9', hoursPerDay: '1' },
    { id: '3', preset: 'Web Browsing', customRate: '0.15', hoursPerDay: '2' },
  ]);

  const addActivity = () => setActivities([...activities, { id: String(nextId++), preset: 'Custom', customRate: '', hoursPerDay: '' }]);
  const removeActivity = (id: string) => setActivities(activities.filter((a) => a.id !== id));
  const updateActivity = (id: string, field: keyof Activity, val: string) => {
    setActivities(activities.map((a) => (a.id === id ? { ...a, [field]: val } : a)));
  };

  const { rows, dailyGb } = useMemo(() => {
    const rows = activities.map((a) => {
      const preset = ACTIVITY_PRESETS.find((p) => p.label === a.preset);
      const rate = a.preset === 'Custom' ? (parseFloat(a.customRate) || 0) : (preset?.gbPerHour ?? 0);
      const hours = parseFloat(a.hoursPerDay) || 0;
      return { ...a, rate, gbPerDay: rate * hours };
    });
    const dailyGb = rows.reduce((sum, r) => sum + r.gbPerDay, 0);
    return { rows, dailyGb };
  }, [activities]);

  const content = (
    <>
      <Typography variant="h2">How to Estimate Your Internet Data Usage</Typography>
      <Typography variant="body1">
        Add each online activity you do regularly — streaming, video calls, browsing, gaming — with how many
        hours per day you spend on it, using the preset data rates or your own custom rate. The calculator adds
        up daily data usage across all activities, then scales it to weekly and monthly totals so you can pick
        the right internet or mobile data plan.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Daily Usage = Σ (Data Rate per Hour × Hours per Day) &nbsp;|&nbsp; Monthly ≈ Daily × 30
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        2 hours of HD streaming (3 GB/hr = 6 GB) plus 1 hour of video calls (0.9 GB/hr = 0.9 GB) plus 2 hours of
        browsing (0.15 GB/hr = 0.3 GB) totals 7.2 GB per day — about 50.4 GB per week and roughly 216 GB per
        month.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Choosing an internet or mobile data plan that fits your actual usage.</li>
          <li>Checking whether a household is likely to hit a data cap.</li>
          <li>Estimating the data cost of adding a new streaming or gaming habit.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How accurate are the preset data rates?</Typography>
      <Typography variant="body1">
        They&apos;re reasonable ballpark averages — actual usage varies by streaming quality settings, video
        resolution, codec, and platform. For a more precise estimate, check your streaming service or video
        call app&apos;s own data usage settings and enter a custom rate.
      </Typography>
      <Typography variant="h3">Does this account for multiple devices or people?</Typography>
      <Typography variant="body1">
        Add a separate activity row per person or device (or combine hours) to build up a full household
        estimate — the calculator just sums whatever rows you add, so it scales to as many activities and users
        as you need.
      </Typography>
      <Typography variant="h3">Why does 4K streaming use so much more data than HD?</Typography>
      <Typography variant="body1">
        4K video has roughly 4x the pixel count of HD, and while compression reduces the gap somewhat, 4K
        streams still typically use more than twice the data per hour of standard HD streams.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/internet-data-usage-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '3fr 2fr' }, gap: 6 }}>
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>Activities</Typography>
          <Stack spacing={2}>
            {rows.map((a) => (
              <Stack key={a.id} direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems={{ sm: 'center' }}>
                <Select
                  size="small"
                  value={a.preset}
                  onChange={(e) => updateActivity(a.id, 'preset', e.target.value)}
                  sx={{ minWidth: 200 }}
                >
                  {ACTIVITY_PRESETS.map((p) => (
                    <MenuItem key={p.label} value={p.label}>{p.label}</MenuItem>
                  ))}
                </Select>
                {a.preset === 'Custom' ? (
                  <TextField
                    label="GB per Hour" type="number" size="small" fullWidth
                    onFocus={(e) => e.target.select()}
                    value={a.customRate}
                    onChange={(e) => updateActivity(a.id, 'customRate', e.target.value)}
                  />
                ) : (
                  <Typography variant="body2" color="text.secondary" sx={{ minWidth: 90 }}>{a.rate} GB/hr</Typography>
                )}
                <TextField
                  label="Hours / Day" type="number" size="small" fullWidth
                  onFocus={(e) => e.target.select()}
                  value={a.hoursPerDay}
                  onChange={(e) => updateActivity(a.id, 'hoursPerDay', e.target.value)}
                />
                <IconButton color="error" size="small" onClick={() => removeActivity(a.id)} disabled={activities.length <= 1}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Stack>
            ))}
          </Stack>
          <Button startIcon={<AddIcon />} onClick={addActivity} sx={{ mt: 2 }}>Add Activity</Button>
        </Box>

        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', height: 'fit-content' }}>
          <Typography variant="body2" color="text.secondary">Daily Usage</Typography>
          <Typography variant="h4" fontWeight={700}>{dailyGb.toFixed(2)} GB</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>Weekly Usage</Typography>
          <Typography variant="h5" fontWeight={700}>{(dailyGb * 7).toFixed(1)} GB</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>Monthly Usage</Typography>
          <Typography variant="h3" color="primary" fontWeight={800}>{(dailyGb * 30).toFixed(0)} GB</Typography>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default InternetDataUsageCalculator;
