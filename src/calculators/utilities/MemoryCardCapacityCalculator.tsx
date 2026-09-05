'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, MenuItem } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type PresetKey = 'JPEG Photo' | 'RAW Photo' | '1080p Video' | '4K Video';

const PRESETS: Record<PresetKey, { sizeMB: number; unit: 'photos' | 'minutes' }> = {
  'JPEG Photo': { sizeMB: 5, unit: 'photos' },
  'RAW Photo': { sizeMB: 30, unit: 'photos' },
  '1080p Video': { sizeMB: 130, unit: 'minutes' },
  '4K Video': { sizeMB: 375, unit: 'minutes' },
};

const MemoryCardCapacityCalculator = () => {
  const [capacityGB, setCapacityGB] = useState('128');
  const [preset, setPreset] = useState<PresetKey>('4K Video');

  const result = useMemo(() => {
    const gb = parseFloat(capacityGB) || 0;
    const mb = gb * 1000; // marketing GB convention (1GB = 1000MB)
    const { sizeMB, unit } = PRESETS[preset];
    const count = sizeMB > 0 ? Math.floor(mb / sizeMB) : 0;
    return { count, unit };
  }, [capacityGB, preset]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Memory Card Capacity Calculator</Typography>
      <Typography variant="body1">
        Enter your memory card&apos;s capacity in gigabytes and select a file type/quality preset. Each preset
        uses an illustrative average file size — JPEG and RAW photos are sized per image, while video presets
        are sized per minute of footage — to estimate roughly how many photos or how many minutes of video
        will fit on the card.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Capacity = (Card Size in MB) / (Average File Size in MB)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 128GB memory card (≈128,000 MB) shooting 4K video at an illustrative 375 MB per minute holds about
        128,000 / 375 ≈ 341 minutes (roughly 5.7 hours) of footage. The same card shooting RAW photos at 30MB
        each holds about 128,000 / 30 ≈ 4,266 photos.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Deciding what size memory card to buy before a trip or shoot.</li>
          <li>Estimating how many cards you&apos;ll need for a full day of 4K video recording.</li>
          <li>Comparing storage needs between JPEG and RAW photo workflows.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Are these file sizes exact for my camera?</strong> No — actual file sizes vary by camera model, sensor resolution, compression settings, bitrate, and scene complexity. These are illustrative average figures meant to give a reasonable ballpark estimate, not an exact count.</li>
          <li><strong>Why does RAW take up so much more space than JPEG?</strong> RAW files store nearly all the sensor&apos;s unprocessed data with little to no compression, preserving maximum editing flexibility, while JPEG applies lossy compression that discards data to shrink the file significantly.</li>
          <li><strong>Does higher video bitrate or frame rate change the file size?</strong> Yes significantly — a higher bitrate or frame rate setting increases the data recorded per minute, which would raise the average file size beyond the illustrative figure used here. Check your camera&apos;s actual bitrate specs for a more precise per-minute estimate.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/memory-card-capacity-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Stack spacing={3}>
          <TextField label="Memory Card Capacity (GB)" type="number" value={capacityGB} onChange={(e) => setCapacityGB(e.target.value)} onFocus={(e) => e.target.select()} fullWidth />
          <TextField select label="File Type / Quality" value={preset} onChange={(e) => setPreset(e.target.value as PresetKey)} fullWidth>
            {Object.keys(PRESETS).map((key) => (
              <MenuItem key={key} value={key}>{key}</MenuItem>
            ))}
          </TextField>
        </Stack>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
          <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Approximate Capacity</Typography>
            <Typography variant="h3" fontWeight="bold">
              {result.count.toLocaleString()} {result.unit}
            </Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default MemoryCardCapacityCalculator;
