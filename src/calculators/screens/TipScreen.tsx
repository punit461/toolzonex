'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Button, InputAdornment } from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { useFullscreen } from './useFullscreen';

const formatUSD = (value: number) => `$${value.toFixed(2)}`;

const TipScreenContent = () => {
  const [subtotal, setSubtotal] = useState<number>(10);
  const [percentages, setPercentages] = useState<number[]>([15, 20, 25]);
  const { targetRef, isFullscreen, toggle } = useFullscreen<HTMLDivElement>();

  const tipAmounts = useMemo(
    () => percentages.map((pct) => Math.max(0, subtotal) * (pct / 100)),
    [percentages, subtotal],
  );

  const updatePercentage = (index: number, value: string) => {
    const num = value === '' ? 0 : Number(value);
    setPercentages((prev) => prev.map((p, i) => (i === index ? num : p)));
  };

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
        <Button variant="contained" size="large" startIcon={<FullscreenIcon />} onClick={toggle}>
          Click to Fullscreen
        </Button>
        <Typography variant="caption" color="text.secondary">
          Press F or Space for fullscreen &bull; Esc to exit
        </Typography>
      </Box>

      <Box sx={{ mb: 4, p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Customize Tip Screen</Typography>
        <Box sx={{ mb: 3 }}>
          <Typography gutterBottom>Subtotal Amount</Typography>
          <TextField
            fullWidth
            type="number"
            value={subtotal}
            onFocus={(e) => e.target.select()}
            onChange={(e) => setSubtotal(e.target.value === '' ? 0 : Number(e.target.value))}
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
        </Box>
        <Typography gutterBottom>Tip Percentages</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' }, gap: 2 }}>
          {percentages.map((pct, i) => (
            <TextField
              key={i}
              type="number"
              value={pct}
              onFocus={(e) => e.target.select()}
              onChange={(e) => updatePercentage(i, e.target.value)}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
            />
          ))}
        </Box>
      </Box>

      <Box
        ref={targetRef}
        sx={{
          p: { xs: 3, md: 6 },
          bgcolor: isFullscreen ? 'background.default' : 'action.hover',
          borderRadius: isFullscreen ? 0 : 2,
          textAlign: 'center',
          ...(isFullscreen && {
            position: 'fixed', inset: 0, display: 'flex', flexDirection: 'column',
            justifyContent: 'center', zIndex: 1300,
          }),
        }}
      >
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>Add a Tip</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: `repeat(${percentages.length}, 1fr)` }, gap: 2, maxWidth: 700, mx: 'auto', width: '100%' }}>
          {percentages.map((pct, i) => (
            <Button
              key={i}
              variant="contained"
              size="large"
              sx={{ py: 3, display: 'flex', flexDirection: 'column', gap: 0.5 }}
            >
              <Typography variant="h5" fontWeight={700}>{pct}%</Typography>
              <Typography variant="body1">{formatUSD(tipAmounts[i])}</Typography>
            </Button>
          ))}
        </Box>
        <Button variant="outlined" size="large" sx={{ mt: 2, maxWidth: 700, width: '100%', mx: 'auto' }}>
          No Tip
        </Button>
      </Box>
    </Box>
  );
};

const TipScreen = () => {
  const content = (
    <>
      <Typography variant="h2">What is a Tip Screen?</Typography>
      <Typography variant="body1">
        A Tip Screen is a fullscreen, point-of-sale style tipping display. Set your bill subtotal and the tip
        percentages you want to offer, then go fullscreen and hand the device to your customer — they&apos;ll see
        the exact dollar amount for each tip percentage side by side, so they can pick one at a glance.
      </Typography>

      <Typography variant="h2">How to use it</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Enter the bill <strong>subtotal</strong> and adjust the three tip percentages if needed.</li>
          <li>Click <strong>Click to Fullscreen</strong> (or press F / Space) to switch to kiosk mode.</li>
          <li>Press <strong>Esc</strong> at any time to exit fullscreen.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        For a $40 subtotal with 15%, 20%, and 25% tip options, the screen shows $6.00, $8.00, and $10.00 side by
        side — the customer just taps the amount they want to leave.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Cafes, food trucks, and small restaurants without a full POS tipping system.</li>
          <li>Tablets or kiosks left at the counter for customers to self-select a tip.</li>
          <li>Delivery or service providers presenting tip options in person.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Can I change the tip percentages?</strong> Yes, edit any of the three percentage fields before going fullscreen.</li>
          <li><strong>Does this process payments?</strong> No — it&apos;s a display only, showing tip amounts for reference; it doesn&apos;t charge cards or record transactions.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell
      title="Tip Screen"
      description="A fullscreen tipping display for restaurants and point-of-sale systems — enter a subtotal and show customers exact tip amounts."
      url="/utilities/tip-screen"
      content={content}
      category="Utilities"
    >
      <TipScreenContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TipScreen;
