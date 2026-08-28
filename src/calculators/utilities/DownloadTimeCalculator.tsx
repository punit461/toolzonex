'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const SIZE_FACTOR: Record<string, number> = {
  MB: 1e6,
  GB: 1e9,
};

const fmtDuration = (seconds: number): { primary: string; secondary: string } => {
  if (!isFinite(seconds) || seconds <= 0) return { primary: '0 sec', secondary: '' };
  if (seconds < 60) return { primary: `${seconds.toFixed(1)} sec`, secondary: '' };
  const mins = seconds / 60;
  if (mins < 60) return { primary: `${mins.toFixed(1)} min`, secondary: `${seconds.toFixed(0)} sec` };
  const hrs = mins / 60;
  if (hrs < 24) return { primary: `${hrs.toFixed(2)} hr`, secondary: `${Math.floor(mins)} min` };
  const days = hrs / 24;
  return { primary: `${days.toFixed(2)} days`, secondary: `${Math.floor(hrs)} hr` };
};

const DownloadTimeCalculator = () => {
  const [fileSize, setFileSize] = useState<string>('100');
  const [sizeUnit, setSizeUnit] = useState<string>('MB');
  const [speed, setSpeed] = useState<string>('50');

  const seconds = useMemo(() => {
    const size = parseFloat(fileSize) || 0;
    const spd = parseFloat(speed) || 0;
    if (spd <= 0) return Infinity;
    const bytes = size * (SIZE_FACTOR[sizeUnit] ?? 1e6);
    return (bytes * 8) / (spd * 1e6);
  }, [fileSize, sizeUnit, speed]);

  const dur = fmtDuration(seconds);

  const content = (
    <>
      <Typography variant="h2">What is a download time calculator?</Typography>
      <Typography variant="body1">
        A download time calculator estimates how long a file will take to download given its size and your
        connection speed. It converts the file size into bits and divides by your speed in megabits per
        second (Mbps).
      </Typography>

      <Typography variant="h2">Formula</Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Time (s) = (file size in bytes × 8) ÷ (speed in Mbps × 10⁶)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 100&nbsp;MB file on a 50&nbsp;Mbps connection takes roughly 16 seconds — 100×10⁶×8 bits divided by
        50×10⁶ bits per second.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating wait times for large downloads or game installs.</li>
          <li>Comparing plans by real download duration.</li>
          <li>Planning uploads and backups around connection limits.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why is speed in Mbps, not MB/s?</Typography>
      <Typography variant="body1">
        Internet plans are sold in megabits per second (Mbps). Since 1 byte = 8 bits, divide your Mbps by 8
        to get megabytes per second actually transferred.
      </Typography>
      <Typography variant="h3">Why is my real download slower?</Typography>
      <Typography variant="body1">
        Actual speeds vary with network congestion, server limits, Wi-Fi overhead, and overhead protocols —
        this is a best-case estimate at the stated speed.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/download-time-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="File Size"
              type="number"
              value={fileSize}
              onChange={(e) => setFileSize(e.target.value)}
              fullWidth
            />
            <FormControl sx={{ minWidth: 110 }}>
              <InputLabel id="dt-size">Unit</InputLabel>
              <Select labelId="dt-size" label="Unit" value={sizeUnit} onChange={(e) => setSizeUnit(e.target.value)}>
                <MenuItem value="MB">MB</MenuItem>
                <MenuItem value="GB">GB</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <TextField
            label="Internet Speed"
            type="number"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
            slotProps={{ input: { endAdornment: <InputAdornment position="end">Mbps</InputAdornment> } }}
            fullWidth
          />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>
            Result
          </Typography>
          <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Estimated Download Time</Typography>
            <Typography variant="h3" fontWeight="bold">{dur.primary}</Typography>
            {dur.secondary && (
              <Typography variant="body2" mt={1}>
                ({dur.secondary})
              </Typography>
            )}
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}>
        <AdSenseUnit />
      </Box>
    </CalculatorShell>
  );
};

export default DownloadTimeCalculator;
