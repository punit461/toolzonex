'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const CurtainSizeCalculator = () => {
  const [rodWidth, setRodWidth] = useState<string>('60');
  const [fullness, setFullness] = useState<string>('2.5');
  const [panels, setPanels] = useState<string>('2');

  const { totalWidth, perPanel, valid } = useMemo(() => {
    const w = parseFloat(rodWidth);
    const f = parseFloat(fullness);
    const p = parseFloat(panels);

    if (isNaN(w) || isNaN(f) || isNaN(p) || w <= 0 || f <= 0 || p <= 0) {
      return { totalWidth: 0, perPanel: 0, valid: false };
    }

    const total = w * f;
    return { totalWidth: total, perPanel: total / p, valid: true };
  }, [rodWidth, fullness, panels]);

  const content = (
    <>
      <Typography variant="h2">How to Calculate Curtain Fabric Width</Typography>
      <Typography variant="body1">
        Curtains need more fabric width than the rod or window itself so they hang with soft folds instead of
        lying flat. Multiply your rod width by a fullness ratio — typically 2x to 2.5x for standard fullness,
        or up to 3x for a very full, luxurious look — to get the total fabric width, then divide by the number
        of panels to size each one.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Total Fabric Width = Rod Width × Fullness Ratio &nbsp;|&nbsp; Per-Panel Width = Total Width ÷ Number of Panels
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        For a 60&quot; wide rod with standard 2.5x fullness, you need 60 × 2.5 = 150&quot; of total fabric width.
        Split across 2 panels, each panel should be 150 ÷ 2 = 75&quot; wide.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Working out how wide to cut or order curtain fabric or ready-made panels for a window.</li>
          <li>Comparing how different fullness ratios change the amount of fabric needed.</li>
          <li>Sizing individual panels when splitting a rod width across two or more panels.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What fullness ratio should I use?</Typography>
      <Typography variant="body1">
        A ratio of 2x to 2.5x gives a standard, well-draped look suitable for most rooms. Lightweight sheers
        often look best at 2.5x-3x fullness, while heavier fabrics like velvet can look full even at 2x since
        the material itself has more body.
      </Typography>
      <Typography variant="h3">Should I measure the rod width or the window width?</Typography>
      <Typography variant="body1">
        Use the rod width, not the window opening — curtain rods are usually mounted wider than the window
        frame so panels can fully clear the glass when open, and fabric width should be based on that actual
        mounted rod width.
      </Typography>
      <Typography variant="h3">Does this account for fabric needed for hems and seams?</Typography>
      <Typography variant="body1">
        No — this calculates the finished, hung width only. Add extra fabric on top of this result for side
        hems, center seams if joining fabric widths, and pattern repeat matching if using a patterned fabric.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/curtain-size-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, alignItems: 'center' }}>
        <Stack spacing={2}>
          <TextField label="Rod / Window Width (in)" type="number" fullWidth value={rodWidth} onChange={(e) => setRodWidth(e.target.value)} onFocus={(e) => e.target.select()} />
          <TextField label="Fullness Ratio" type="number" fullWidth value={fullness} onChange={(e) => setFullness(e.target.value)} onFocus={(e) => e.target.select()} helperText="Typically 2x-2.5x for standard fullness" />
          <TextField label="Number of Panels" type="number" fullWidth value={panels} onChange={(e) => setPanels(e.target.value)} onFocus={(e) => e.target.select()} />
        </Stack>

        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">Total Fabric Width</Typography>
          <Typography variant="h3" color="primary" fontWeight={800}>
            {valid ? `${totalWidth.toFixed(1)} in` : '—'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>Per Panel</Typography>
          <Typography variant="h5" fontWeight={700}>
            {valid ? `${perPanel.toFixed(1)} in` : '—'}
          </Typography>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CurtainSizeCalculator;
