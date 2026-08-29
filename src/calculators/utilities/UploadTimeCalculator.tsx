'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, Select, MenuItem, FormControl, InputLabel, InputAdornment, ToggleButton, ToggleButtonGroup, Stack } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const SIZE_FACTOR: Record<string, number> = {
  MB: 1e6,
  GB: 1e9,
};

type Mode = 'time' | 'speed';

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

const UploadTimeCalculator = () => {
  const [mode, setMode] = useState<Mode>('time');
  const [fileSize, setFileSize] = useState<string>('500');
  const [sizeUnit, setSizeUnit] = useState<string>('MB');
  const [speed, setSpeed] = useState<string>('10');
  const [targetMinutes, setTargetMinutes] = useState<string>('5');

  const seconds = useMemo(() => {
    const size = parseFloat(fileSize) || 0;
    const spd = parseFloat(speed) || 0;
    if (spd <= 0) return Infinity;
    const bytes = size * (SIZE_FACTOR[sizeUnit] ?? 1e6);
    return (bytes * 8) / (spd * 1e6);
  }, [fileSize, sizeUnit, speed]);

  const requiredSpeed = useMemo(() => {
    const size = parseFloat(fileSize) || 0;
    const mins = parseFloat(targetMinutes) || 0;
    if (mins <= 0) return null;
    const bytes = size * (SIZE_FACTOR[sizeUnit] ?? 1e6);
    return (bytes * 8) / (mins * 60 * 1e6);
  }, [fileSize, sizeUnit, targetMinutes]);

  const dur = fmtDuration(seconds);

  const content = (
    <>
      <Typography variant="h2">How to Calculate Upload Time</Typography>
      <Typography variant="body1">
        Upload time depends on your file size and your connection&apos;s upload speed, which is usually slower
        than download speed on most home internet plans. Convert the file size to bits and divide by your
        upload speed in megabits per second (Mbps) to estimate how long the transfer will take — or work
        backward to find the upload speed you&apos;d need to hit a target time.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Time (s) = (File Size in bytes × 8) ÷ (Upload Speed in Mbps × 10⁶)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 500&nbsp;MB video on a 10&nbsp;Mbps upload connection takes roughly 400 seconds (about 6.7 minutes) —
        500×10⁶×8 bits divided by 10×10⁶ bits per second. To upload that same file in 5 minutes instead, you&apos;d
        need an upload speed of about 13.3 Mbps.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating how long it will take to upload videos, photos, or backups to the cloud.</li>
          <li>Checking whether your current upload speed is fast enough for a livestream or large file transfer.</li>
          <li>Working out the minimum upload speed you&apos;d need to meet a deadline.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why is my upload speed slower than my download speed?</Typography>
      <Typography variant="body1">
        Most consumer internet plans (especially cable and DSL) are asymmetric, meaning they allocate much more
        bandwidth to downloads than uploads since most home usage is download-heavy. Fiber connections are more
        likely to offer symmetric upload and download speeds.
      </Typography>
      <Typography variant="h3">Why is my actual upload slower than this estimate?</Typography>
      <Typography variant="body1">
        This is a best-case estimate at your stated speed. Real uploads are also affected by network congestion,
        the destination server&apos;s upload limits, Wi-Fi overhead, and other devices sharing your connection at
        the same time.
      </Typography>
      <Typography variant="h3">Why is speed measured in Mbps, not MB/s?</Typography>
      <Typography variant="body1">
        Internet plans are advertised in megabits per second (Mbps). Since 1 byte equals 8 bits, divide your
        Mbps figure by 8 to estimate the actual megabytes transferred per second.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/upload-time-calculator" content={content}>
      <Stack spacing={3}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <ToggleButtonGroup value={mode} exclusive onChange={(_, v) => v && setMode(v)} size="small">
            <ToggleButton value="time">Estimate Upload Time</ToggleButton>
            <ToggleButton value="speed">Find Required Speed</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField label="File Size" type="number" value={fileSize} onChange={(e) => setFileSize(e.target.value)} onFocus={(e) => e.target.select()} fullWidth />
              <FormControl sx={{ minWidth: 110 }}>
                <InputLabel id="ut-size">Unit</InputLabel>
                <Select labelId="ut-size" label="Unit" value={sizeUnit} onChange={(e) => setSizeUnit(e.target.value)}>
                  <MenuItem value="MB">MB</MenuItem>
                  <MenuItem value="GB">GB</MenuItem>
                </Select>
              </FormControl>
            </Box>
            {mode === 'time' ? (
              <TextField
                label="Upload Speed"
                type="number"
                value={speed}
                onChange={(e) => setSpeed(e.target.value)}
                onFocus={(e) => e.target.select()}
                slotProps={{ input: { endAdornment: <InputAdornment position="end">Mbps</InputAdornment> } }}
                fullWidth
              />
            ) : (
              <TextField
                label="Target Upload Time"
                type="number"
                value={targetMinutes}
                onChange={(e) => setTargetMinutes(e.target.value)}
                onFocus={(e) => e.target.select()}
                slotProps={{ input: { endAdornment: <InputAdornment position="end">minutes</InputAdornment> } }}
                fullWidth
              />
            )}
          </Box>

          <Box>
            <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
            <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
              {mode === 'time' ? (
                <>
                  <Typography variant="body2">Estimated Upload Time</Typography>
                  <Typography variant="h3" fontWeight="bold">{dur.primary}</Typography>
                  {dur.secondary && <Typography variant="body2" mt={1}>({dur.secondary})</Typography>}
                </>
              ) : (
                <>
                  <Typography variant="body2">Required Upload Speed</Typography>
                  <Typography variant="h3" fontWeight="bold">
                    {requiredSpeed !== null ? `${requiredSpeed.toFixed(2)} Mbps` : '—'}
                  </Typography>
                </>
              )}
            </Paper>
          </Box>
        </Box>
      </Stack>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default UploadTimeCalculator;
