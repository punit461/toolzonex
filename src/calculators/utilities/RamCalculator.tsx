'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Mode = 'capacity' | 'bandwidth';

const RamCalculator = () => {
  const [mode, setMode] = useState<Mode>('capacity');

  const [sticks, setSticks] = useState<string>('2');
  const [capacityPerStick, setCapacityPerStick] = useState<string>('16');

  const [speed, setSpeed] = useState<string>('3200');
  const [busWidth, setBusWidth] = useState<string>('64');

  const totalCapacity = useMemo(() => {
    const n = parseFloat(sticks);
    const c = parseFloat(capacityPerStick);
    if (isNaN(n) || isNaN(c) || n < 0 || c < 0) return null;
    return n * c;
  }, [sticks, capacityPerStick]);

  const bandwidth = useMemo(() => {
    const s = parseFloat(speed);
    const b = parseFloat(busWidth);
    if (isNaN(s) || isNaN(b) || s <= 0 || b <= 0) return null;
    // MT/s x bus width (bits) / 8 = MB/s, then / 1000 = GB/s
    return (s * b) / 8 / 1000;
  }, [speed, busWidth]);

  const content = (
    <>
      <Typography variant="h2">How to Calculate RAM Capacity and Bandwidth</Typography>
      <Typography variant="body1">
        This calculator covers two common RAM questions: how much total memory you have across multiple sticks,
        and how much theoretical memory bandwidth a given RAM speed and bus width can deliver. Use the capacity
        mode to add up installed memory, or the bandwidth mode to estimate peak data transfer rate.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Total Capacity = Sticks × Capacity per Stick &nbsp;|&nbsp; Bandwidth (GB/s) = (Speed × Bus Width) ÷ 8 ÷ 1000
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Two 16&nbsp;GB sticks give a total capacity of 2 × 16 = 32&nbsp;GB. Separately, DDR4-3200 RAM with the
        standard 64-bit bus width has a theoretical bandwidth of (3200 × 64) ÷ 8 ÷ 1000 ≈ 25.6&nbsp;GB/s per
        stick — dual-channel setups effectively double this to around 51.2&nbsp;GB/s.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking your total installed RAM capacity when planning an upgrade.</li>
          <li>Estimating theoretical memory bandwidth for a given RAM speed rating.</li>
          <li>Comparing bandwidth across different RAM speed grades (e.g. DDR4-3200 vs DDR5-6000).</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why is the bus width usually 64 bits?</Typography>
      <Typography variant="body1">
        A standard single memory channel on desktop and laptop platforms has a 64-bit (8-byte) wide data path,
        which is why 64 is the default here. Some specialized systems use wider or narrower buses, which you
        can enter manually.
      </Typography>
      <Typography variant="h3">Is this the real-world bandwidth I&apos;ll see?</Typography>
      <Typography variant="body1">
        This is the theoretical peak bandwidth for a single channel at the rated speed. Actual achieved
        bandwidth is typically lower due to memory controller overhead, timings/latency, and whether you&apos;re
        running in single-, dual-, or quad-channel mode — multiply by the number of channels for a rough
        multi-channel estimate.
      </Typography>
      <Typography variant="h3">Does more RAM capacity mean faster performance?</Typography>
      <Typography variant="body1">
        Not directly — capacity determines how much data can be held in memory at once, while bandwidth (driven
        by speed and channel count) determines how fast that data can be read and written. Both matter, but for
        different reasons: capacity avoids swapping to disk, while bandwidth affects throughput-sensitive tasks.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/ram-calculator" content={content}>
      <Stack spacing={3}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <ToggleButtonGroup value={mode} exclusive onChange={(_, v) => v && setMode(v)} size="small">
            <ToggleButton value="capacity">Total Capacity</ToggleButton>
            <ToggleButton value="bandwidth">Memory Bandwidth</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {mode === 'capacity' ? (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, alignItems: 'center' }}>
            <Stack spacing={2}>
              <TextField label="Number of RAM Sticks" type="number" fullWidth value={sticks} onChange={(e) => setSticks(e.target.value)} onFocus={(e) => e.target.select()} />
              <TextField label="Capacity per Stick (GB)" type="number" fullWidth value={capacityPerStick} onChange={(e) => setCapacityPerStick(e.target.value)} onFocus={(e) => e.target.select()} />
            </Stack>
            <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">Total RAM Capacity</Typography>
              <Typography variant="h3" color="primary" fontWeight={800}>
                {totalCapacity !== null ? `${totalCapacity} GB` : '—'}
              </Typography>
            </Paper>
          </Box>
        ) : (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, alignItems: 'center' }}>
            <Stack spacing={2}>
              <TextField label="RAM Speed (MT/s, e.g. 3200)" type="number" fullWidth value={speed} onChange={(e) => setSpeed(e.target.value)} onFocus={(e) => e.target.select()} />
              <TextField label="Bus Width (bits)" type="number" fullWidth value={busWidth} onChange={(e) => setBusWidth(e.target.value)} onFocus={(e) => e.target.select()} />
            </Stack>
            <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">Theoretical Bandwidth</Typography>
              <Typography variant="h3" color="primary" fontWeight={800}>
                {bandwidth !== null ? `${bandwidth.toFixed(2)} GB/s` : '—'}
              </Typography>
            </Paper>
          </Box>
        )}
      </Stack>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RamCalculator;
