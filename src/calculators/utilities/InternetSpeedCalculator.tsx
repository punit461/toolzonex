'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Select, MenuItem, FormControl, InputLabel, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const SIZE_UNITS: Record<string, number> = { mb: 8, gb: 8000, tb: 8_000_000 };
const SPEED_UNITS: Record<string, number> = { mbps: 1, gbps: 1000 };

function formatDuration(totalSeconds: number): string {
  if (!isFinite(totalSeconds) || totalSeconds < 0) return '—';
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);
  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0 || days > 0) parts.push(`${hours}h`);
  if (minutes > 0 || hours > 0 || days > 0) parts.push(`${minutes}m`);
  parts.push(`${seconds}s`);
  return parts.join(' ');
}

const InternetSpeedCalculator = () => {
  const [mode, setMode] = useState<'time' | 'speed'>('time');
  const [fileSize, setFileSize] = useState<string>('5');
  const [sizeUnit, setSizeUnit] = useState<string>('gb');
  const [speed, setSpeed] = useState<string>('100');
  const [speedUnit, setSpeedUnit] = useState<string>('mbps');
  const [desiredTime, setDesiredTime] = useState<string>('10');

  const fileSizeMegabits = useMemo(() => {
    const s = parseFloat(fileSize);
    if (isNaN(s)) return null;
    return s * SIZE_UNITS[sizeUnit];
  }, [fileSize, sizeUnit]);

  const timeResult = useMemo(() => {
    if (mode !== 'time' || fileSizeMegabits === null) return null;
    const sp = parseFloat(speed);
    if (isNaN(sp) || sp <= 0) return null;
    const mbps = sp * SPEED_UNITS[speedUnit];
    return fileSizeMegabits / mbps;
  }, [mode, fileSizeMegabits, speed, speedUnit]);

  const speedResult = useMemo(() => {
    if (mode !== 'speed' || fileSizeMegabits === null) return null;
    const minutes = parseFloat(desiredTime);
    if (isNaN(minutes) || minutes <= 0) return null;
    return fileSizeMegabits / (minutes * 60);
  }, [mode, fileSizeMegabits, desiredTime]);

  const content = (
    <>
      <Typography variant="h2">How to Calculate Download/Upload Time</Typography>
      <Typography variant="body1">
        Internet speed is measured in megabits per second (Mbps), while file sizes are usually shown in
        megabytes or gigabytes — 1 byte equals 8 bits, so a file&apos;s size in megabits is 8 times its size in
        megabytes. Dividing the file size (in megabits) by your connection speed (in Mbps) gives the estimated
        transfer time in seconds. This tool also works in reverse: given a file size and a target time, it
        tells you the connection speed required.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Time = File Size (megabits) / Speed (Mbps) &nbsp;|&nbsp; Speed = File Size (megabits) / Time (seconds)
      </Box>

      <Typography variant="body2" color="text.secondary">
        Real-world speeds are usually lower than the advertised connection speed due to overhead, network
        congestion, and server-side limits — treat this as a best-case estimate.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 5 GB file is 5,000 MB, or 40,000 megabits (5,000 × 8). On a 100 Mbps connection, the estimated download
        time is 40,000 / 100 = 400 seconds, or about 6 minutes 40 seconds.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating how long a large file, game, or backup will take to download or upload.</li>
          <li>Working out the minimum internet speed needed to transfer a file within a deadline.</li>
          <li>Comparing plan speeds when choosing an internet service package.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why is my actual download slower than this estimate?</Typography>
      <Typography variant="body1">
        This calculator assumes you get the full advertised speed with no overhead. In practice, protocol
        overhead, server-side bandwidth limits, Wi-Fi conditions, and other devices sharing your connection all
        reduce real-world throughput below the theoretical maximum.
      </Typography>
      <Typography variant="h3">Why do file sizes and speeds use different units (bytes vs. bits)?</Typography>
      <Typography variant="body1">
        It&apos;s a long-standing convention: storage (file sizes) is measured in bytes, while network speeds
        are measured in bits per second. Since 1 byte = 8 bits, a "100 Mbps" connection transfers at most 12.5
        megabytes per second, not 100 megabytes per second.
      </Typography>
      <Typography variant="h3">What speed do I need to download a file in a specific time?</Typography>
      <Typography variant="body1">
        Switch to "Required Speed" mode, enter the file size and your desired completion time, and the
        calculator returns the minimum connection speed (in Mbps) needed to meet that deadline.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/internet-speed-calculator" content={content}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <ToggleButtonGroup value={mode} exclusive onChange={(_, v) => v && setMode(v)} size="small">
          <ToggleButton value="time">Estimate Time</ToggleButton>
          <ToggleButton value="speed">Required Speed</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="File Size" type="number" fullWidth value={fileSize} onChange={(e) => setFileSize(e.target.value)} onFocus={(e) => e.target.select()} />
            <FormControl sx={{ minWidth: 100 }}>
              <InputLabel>Unit</InputLabel>
              <Select value={sizeUnit} label="Unit" onChange={(e) => setSizeUnit(e.target.value)}>
                <MenuItem value="mb">MB</MenuItem>
                <MenuItem value="gb">GB</MenuItem>
                <MenuItem value="tb">TB</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {mode === 'time' ? (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField label="Connection Speed" type="number" fullWidth value={speed} onChange={(e) => setSpeed(e.target.value)} onFocus={(e) => e.target.select()} />
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Unit</InputLabel>
                <Select value={speedUnit} label="Unit" onChange={(e) => setSpeedUnit(e.target.value)}>
                  <MenuItem value="mbps">Mbps</MenuItem>
                  <MenuItem value="gbps">Gbps</MenuItem>
                </Select>
              </FormControl>
            </Box>
          ) : (
            <TextField label="Desired Time (minutes)" type="number" fullWidth value={desiredTime} onChange={(e) => setDesiredTime(e.target.value)} onFocus={(e) => e.target.select()} />
          )}
        </Box>

        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {mode === 'time' ? (
            <>
              <Typography variant="body2" color="text.secondary">Estimated Time</Typography>
              <Typography variant="h4" color="primary" fontWeight={800}>
                {timeResult !== null ? formatDuration(timeResult) : '—'}
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="body2" color="text.secondary">Required Speed</Typography>
              <Typography variant="h4" color="primary" fontWeight={800}>
                {speedResult !== null ? `${speedResult.toLocaleString(undefined, { maximumFractionDigits: 2 })} Mbps` : '—'}
              </Typography>
            </>
          )}
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default InternetSpeedCalculator;
