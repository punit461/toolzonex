'use client';

import { useMemo, useState } from 'react';
import {
  Box, TextField, Typography, MenuItem, Select, InputAdornment,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Slider,
} from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface GpuOption {
  id: string;
  label: string;
  tier: string;
  perHour: number;
}

// Approximate on-demand cloud GPU rental rates (USD/hr), checked August 2026.
// Actual pricing varies significantly by provider, region, and availability --
// always confirm current rates with the provider before budgeting.
const GPUS: GpuOption[] = [
  { id: 't4', label: 'NVIDIA T4 (16GB)', tier: 'Budget / Inference', perHour: 0.20 },
  { id: 'l4', label: 'NVIDIA L4 (24GB)', tier: 'Budget / Inference', perHour: 0.39 },
  { id: 'rtx4090', label: 'NVIDIA RTX 4090 (24GB)', tier: 'Community Cloud', perHour: 0.34 },
  { id: 'a10', label: 'NVIDIA A10 (24GB)', tier: 'Community Cloud', perHour: 0.75 },
  { id: 'a100-40', label: 'NVIDIA A100 40GB', tier: 'Community Cloud', perHour: 1.10 },
  { id: 'a100-80', label: 'NVIDIA A100 80GB', tier: 'Community Cloud', perHour: 1.49 },
  { id: 'h100-pcie', label: 'NVIDIA H100 80GB PCIe', tier: 'Community Cloud', perHour: 1.99 },
  { id: 'h100-sxm', label: 'NVIDIA H100 80GB SXM', tier: 'Community Cloud', perHour: 2.99 },
  { id: 'a100-hyperscaler', label: 'NVIDIA A100 80GB (8-GPU instance)', tier: 'AWS / Azure per-GPU', perHour: 3.40 },
  { id: 'h100-hyperscaler', label: 'NVIDIA H100 80GB (8-GPU instance)', tier: 'AWS per-GPU', perHour: 6.88 },
];

const formatUSD = (value: number) =>
  `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const GPUCostCalculator = () => {
  const [gpuId, setGpuId] = useState('a100-80');
  const [quantity, setQuantity] = useState<number>(1);
  const [hoursPerMonth, setHoursPerMonth] = useState<number>(160);

  const selectedGpu = useMemo(
    () => GPUS.find((g) => g.id === gpuId) ?? GPUS[0],
    [gpuId]
  );

  const { costPerHour, costPerMonth, costPerYear } = useMemo(() => {
    const perHour = selectedGpu.perHour * quantity;
    return {
      costPerHour: perHour,
      costPerMonth: perHour * hoursPerMonth,
      costPerYear: perHour * hoursPerMonth * 12,
    };
  }, [selectedGpu, quantity, hoursPerMonth]);

  const comparisonRows = useMemo(() => {
    return GPUS
      .map((g) => ({
        ...g,
        totalPerHour: g.perHour * quantity,
        totalPerMonth: g.perHour * quantity * hoursPerMonth,
      }))
      .sort((a, b) => a.totalPerHour - b.totalPerHour);
  }, [quantity, hoursPerMonth]);

  const content = (
    <>
      <Typography variant="h2">How to estimate GPU cloud costs</Typography>
      <Typography variant="body1">
        Cloud GPU pricing depends heavily on the provider tier. &quot;Community cloud&quot; marketplaces (RunPod,
        Vast.ai, Lambda) offer the cheapest on-demand rates because they pool spare capacity, while hyperscalers
        (AWS, Azure, GCP) charge more per GPU but bundle enterprise SLAs, networking, and support. Spot/preemptible
        instances can cut costs further (often 40-70% off on-demand) but can be reclaimed with little notice, so
        they&apos;re best for fault-tolerant training jobs rather than production inference.
      </Typography>

      <Typography variant="h2">Which GPU do I actually need?</Typography>
      <Typography variant="body1">
        <strong>T4 / L4</strong> — fine for small-model inference, embeddings, and light fine-tuning.<br />
        <strong>RTX 4090 / A10</strong> — solid for most fine-tuning jobs and mid-size model inference on a budget.<br />
        <strong>A100 40GB/80GB</strong> — the standard for training and fine-tuning models up to ~13-70B parameters.<br />
        <strong>H100</strong> — needed for large-scale pretraining or serving the largest open-weight models with
        high throughput; the extra cost over A100 is usually only worth it at scale.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Renting a single A100 80GB at $2/hr for 200 hours/month costs roughly $400/month — compare that against
        an H100 or a multi-GPU setup to see the cost difference for your workload.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Budgeting a model fine-tuning or training run before starting.</li>
          <li>Comparing on-demand cloud GPU costs across providers and GPU tiers.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How much does it cost to rent an A100 GPU per hour?</Typography>
      <Typography variant="body1">
        On community cloud marketplaces, an A100 40GB runs about {formatUSD(GPUS.find((g) => g.id === 'a100-40')!.perHour)}/hr
        and an A100 80GB about {formatUSD(GPUS.find((g) => g.id === 'a100-80')!.perHour)}/hr. Hyperscalers like
        AWS/Azure charge more per GPU — roughly {formatUSD(GPUS.find((g) => g.id === 'a100-hyperscaler')!.perHour)}/hr
        for an A100 80GB — but bundle enterprise SLAs, networking, and support. Select an A100 option above to see
        the exact rate and your projected monthly/yearly spend.
      </Typography>
      <Typography variant="h3">What's the hourly price for cloud GPU rental?</Typography>
      <Typography variant="body1">
        It depends heavily on the card and provider tier: budget/inference cards like the T4 start around
        {' '}{formatUSD(GPUS.find((g) => g.id === 't4')!.perHour)}/hr, mid-range cards like the RTX 4090 or A10
        run {formatUSD(GPUS.find((g) => g.id === 'rtx4090')!.perHour)}-{formatUSD(GPUS.find((g) => g.id === 'a10')!.perHour)}/hr,
        and high-end training cards like the A100 and H100 run roughly {formatUSD(GPUS.find((g) => g.id === 'a100-40')!.perHour)}
        {' '}to {formatUSD(GPUS.find((g) => g.id === 'h100-hyperscaler')!.perHour)}/hr depending on the exact GPU
        and whether it&apos;s a community-cloud or hyperscaler instance. Use the &quot;Compare across GPU
        types&quot; table below to see every rate at once, sorted cheapest first.
      </Typography>
      <Typography variant="h3">How do I estimate my GPU rental cost over a month?</Typography>
      <Typography variant="body1">
        Enter your GPU type, how many you need, and expected hours per month (730 hrs/mo for always-on, roughly
        160 hrs/mo for business-hours-only usage) — the calculator multiplies hourly rate × quantity × hours to
        project your monthly and yearly cost, so you can track and compare GPU rental cost before committing.
      </Typography>
      <Typography variant="h3">Is this pricing accurate?</Typography>
      <Typography variant="body1">
        These are approximate on-demand rates checked against public provider pricing as of August 2026. GPU cloud
        pricing is volatile and varies by region, availability, and contract length — treat this as a starting
        estimate, not a quote.
      </Typography>
      <Typography variant="h3">Should I rent or buy a GPU?</Typography>
      <Typography variant="body1">
        As a rough rule of thumb, if your projected usage exceeds roughly 6-9 months of continuous rental cost,
        it&apos;s often worth pricing out owning hardware instead — though renting still wins for spiky or
        short-term workloads since it avoids upfront capital and depreciation risk.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="GPU Cloud Cost Calculator"
      description="Estimate the cost of renting cloud GPUs like A100, H100, and RTX 4090 for AI training and inference."
      url="/ai/gpu-cost-calculator"
      content={content}
      category="AI"
    >
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box sx={{ minWidth: 0 }}>
          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>GPU Type</Typography>
            <Select
              fullWidth
              value={gpuId}
              onChange={(e) => setGpuId(e.target.value)}
            >
              {GPUS.map((g) => (
                <MenuItem key={g.id} value={g.id}>
                  {g.label} — {formatUSD(g.perHour)}/hr ({g.tier})
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>Number of GPUs</Typography>
            <TextField
              fullWidth
              type="number"
              value={quantity}
              onFocus={(e) => e.target.select()}
              onChange={(e) => setQuantity(e.target.value === '' ? 0 : Number(e.target.value))}
              slotProps={{ input: { inputProps: { min: 1 } } }}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>Hours per month</Typography>
            <TextField
              fullWidth
              type="number"
              value={hoursPerMonth}
              onFocus={(e) => e.target.select()}
              onChange={(e) => setHoursPerMonth(e.target.value === '' ? 0 : Number(e.target.value))}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">hrs/mo</InputAdornment> } }}
            />
            <Slider
              value={hoursPerMonth}
              min={1}
              max={730}
              step={1}
              onChange={(_, value) => setHoursPerMonth(value as number)}
              sx={{ mt: 2 }}
            />
            <Typography variant="caption" color="text.secondary">
              730 hrs/mo = 24/7 always-on. 160 hrs/mo ≈ full-time business hours.
            </Typography>
          </Box>
        </Box>

        <Box>
          <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2, textAlign: 'center', height: '100%' }}>
            <Typography variant="h6" color="text.secondary">Cost per Month</Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 3, color: 'primary.main' }}>
              {formatUSD(costPerMonth)}
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">Cost per Hour</Typography>
                <Typography variant="h6">{formatUSD(costPerHour)}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Cost per Year</Typography>
                <Typography variant="h6">{formatUSD(costPerYear)}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
          Compare across GPU types
        </Typography>
        <TableContainer sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: 'action.hover' }}>
                <TableCell>GPU</TableCell>
                <TableCell>Tier</TableCell>
                <TableCell align="right">$/hr (total)</TableCell>
                <TableCell align="right">$/month</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {comparisonRows.map((row) => (
                <TableRow
                  key={row.id}
                  selected={row.id === gpuId}
                  hover
                  onClick={() => setGpuId(row.id)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell>{row.label}</TableCell>
                  <TableCell>{row.tier}</TableCell>
                  <TableCell align="right">{formatUSD(row.totalPerHour)}</TableCell>
                  <TableCell align="right">{formatUSD(row.totalPerMonth)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default GPUCostCalculator;
