'use client';

import { useState } from 'react';
import { Box, Typography, Paper, Stack, Select, MenuItem, InputLabel, FormControl, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Tier = 'entry' | 'mid' | 'high' | 'enthusiast';
type Resolution = '1080p' | '1440p' | '4k';

const TIER_VALUE: Record<Tier, number> = { entry: 1, mid: 2, high: 3, enthusiast: 4 };
const TIER_LABEL: Record<Tier, string> = { entry: 'Entry-Level', mid: 'Mid-Range', high: 'High-End', enthusiast: 'Enthusiast / Flagship' };
const RES_WEIGHT: Record<Resolution, number> = { '1080p': 1.0, '1440p': 0.65, '4k': 0.35 };
const RES_LABEL: Record<Resolution, string> = { '1080p': '1080p (Full HD)', '1440p': '1440p (QHD)', '4k': '4K (UHD)' };

const CpuBottleneckCalculator = () => {
  const [cpuTier, setCpuTier] = useState<Tier>('mid');
  const [gpuTier, setGpuTier] = useState<Tier>('high');
  const [resolution, setResolution] = useState<Resolution>('1080p');

  const gap = TIER_VALUE[gpuTier] - TIER_VALUE[cpuTier];
  const riskScore = gap > 0 ? gap * RES_WEIGHT[resolution] : 0;

  let risk: 'Low' | 'Moderate' | 'High' = 'Low';
  if (riskScore >= 1.75) risk = 'High';
  else if (riskScore >= 0.75) risk = 'Moderate';

  const riskColor = risk === 'High' ? 'error' : risk === 'Moderate' ? 'warning' : 'success';

  let explanation = '';
  if (gap <= 0) {
    explanation = 'Your CPU tier is at or above your GPU tier, so the GPU is more likely to be the limiting factor here rather than the CPU.';
  } else if (resolution === '4k') {
    explanation = 'At 4K, the GPU has to render far more pixels per frame, so it becomes the dominant bottleneck and a weaker CPU matters much less.';
  } else if (resolution === '1440p') {
    explanation = 'At 1440p, workload is fairly balanced between CPU and GPU, so a CPU tier gap starts to matter more than it would at 4K.';
  } else {
    explanation = 'At 1080p, the GPU renders frames quickly, so the CPU has to keep up with feeding it — a weaker CPU paired with a stronger GPU is most likely to bottleneck here.';
  }

  const content = (
    <>
      <Typography variant="h2">How This Bottleneck Estimate Works</Typography>
      <Typography variant="body1">
        Pick a general performance tier for your CPU and GPU, and a target resolution, and this tool gives a
        rough, qualitative bottleneck risk indicator. The core idea reflects a well-known pattern in PC gaming:
        at lower resolutions the CPU has to prepare frames faster (since the GPU renders each one quickly), so
        a CPU that&apos;s much weaker than the GPU is more likely to hold back performance. At higher
        resolutions like 4K, the GPU&apos;s rendering workload grows so much that it becomes the dominant
        factor, and CPU differences matter far less.
      </Typography>
      <Alert severity="info" sx={{ my: 2 }}>
        This is a simplified educational estimate based on general tier gaps and resolution, not live benchmark
        data or a real hardware database. It doesn&apos;t know your specific CPU/GPU models, the game or
        application you&apos;re running, or other system factors — treat it as a general intuition-builder, not
        a precise prediction.
      </Alert>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        An Entry-level CPU paired with a High-end GPU at 1080p shows a High bottleneck risk, since the gap
        between the tiers is large and 1080p leans on the CPU the most. The same pairing at 4K shows a much
        lower risk, since the GPU becomes the limiting factor at that resolution regardless of the CPU.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Getting a rough sense of whether a planned CPU/GPU pairing is reasonably balanced.</li>
          <li>Understanding why the same GPU can behave differently at different resolutions.</li>
          <li>A starting point before researching specific benchmarks for your exact hardware.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is this based on real benchmark data?</Typography>
      <Typography variant="body1">
        No. This is a simplified educational tool that uses general performance tiers and resolution to
        illustrate the CPU/GPU bottleneck relationship — it doesn&apos;t query a live hardware database or
        real benchmark results for specific CPU and GPU models. For an accurate answer about a specific
        pairing, look up head-to-head benchmarks for those exact parts.
      </Typography>
      <Typography variant="h3">Why does resolution affect the bottleneck risk?</Typography>
      <Typography variant="body1">
        Higher resolutions require the GPU to render dramatically more pixels per frame, shifting the workload
        balance toward the GPU. Lower resolutions render faster on the GPU side, so the CPU&apos;s ability to
        prepare frames quickly enough becomes the more common limiting factor.
      </Typography>
      <Typography variant="h3">What should I do if my result shows a High bottleneck risk?</Typography>
      <Typography variant="body1">
        Consider either a stronger CPU tier, a more modest GPU tier, or a higher resolution/settings target that
        shifts more load onto the GPU — any of these narrows the gap this estimate is flagging. Again, treat this
        as a general educational signal rather than a precise verdict.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/cpu-bottleneck-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, alignItems: 'center' }}>
        <Stack spacing={2}>
          <FormControl fullWidth size="small">
            <InputLabel>CPU Tier</InputLabel>
            <Select label="CPU Tier" value={cpuTier} onChange={(e) => setCpuTier(e.target.value as Tier)}>
              {(Object.keys(TIER_LABEL) as Tier[]).map((t) => (
                <MenuItem key={t} value={t}>{TIER_LABEL[t]}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth size="small">
            <InputLabel>GPU Tier</InputLabel>
            <Select label="GPU Tier" value={gpuTier} onChange={(e) => setGpuTier(e.target.value as Tier)}>
              {(Object.keys(TIER_LABEL) as Tier[]).map((t) => (
                <MenuItem key={t} value={t}>{TIER_LABEL[t]}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth size="small">
            <InputLabel>Target Resolution</InputLabel>
            <Select label="Target Resolution" value={resolution} onChange={(e) => setResolution(e.target.value as Resolution)}>
              {(Object.keys(RES_LABEL) as Resolution[]).map((r) => (
                <MenuItem key={r} value={r}>{RES_LABEL[r]}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">Bottleneck Risk</Typography>
          <Typography variant="h3" fontWeight={800} color={riskColor === 'error' ? 'error.main' : riskColor === 'warning' ? 'warning.main' : 'success.main'}>
            {risk}
          </Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>{explanation}</Typography>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CpuBottleneckCalculator;
