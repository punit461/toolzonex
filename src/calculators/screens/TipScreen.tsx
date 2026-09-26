'use client';

import { useEffect, useMemo, useState } from 'react';
import { Box, TextField, Typography, Button, InputAdornment, MenuItem, Select, FormControlLabel, Switch } from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { useFullscreen } from './useFullscreen';
import { CURRENCIES, CurrencyCode, currencySymbol } from '../currencyConfig';

// Tip amounts need cents, which the shared formatMoney rounds away.
const formatAmount = (value: number, code: CurrencyCode) => {
  const cfg = CURRENCIES.find((c) => c.value === code) ?? CURRENCIES[0];
  return `${cfg.symbol}${value.toLocaleString(cfg.locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const PRESETS: { label: string; heading: string; subtotal: number; percentages: number[]; joke: boolean }[] = [
  { label: 'Restaurant', heading: 'Add a Tip', subtotal: 40, percentages: [18, 20, 25], joke: false },
  { label: 'Coffee Shop', heading: 'Add a tip?', subtotal: 5.5, percentages: [20, 25, 30], joke: false },
  { label: 'Joke', heading: 'Leave a tip for your self-checkout?', subtotal: 12.49, percentages: [25, 30, 35], joke: true },
];

// Joke mode: "No Tip" has to be confirmed once per line before it goes through.
const GUILT_LINES = [
  'Are you sure? This screen has feelings.',
  'The card reader will remember this.',
  'Somewhere, a tablet sheds a single tear.',
];

// How long the thank-you screen stays up before the next customer's turn.
const RESET_MS = 6000;

type Stage =
  | { kind: 'choose' }
  | { kind: 'custom' }
  | { kind: 'confirmNoTip'; step: number }
  | { kind: 'done'; tip: number };

const TipScreenContent = () => {
  const [heading, setHeading] = useState<string>('Add a Tip');
  const [subtotal, setSubtotal] = useState<number>(10);
  const [percentages, setPercentages] = useState<number[]>([15, 20, 25]);
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [showCustom, setShowCustom] = useState(true);
  const [showNoTip, setShowNoTip] = useState(true);
  const [joke, setJoke] = useState(false);
  const [stage, setStage] = useState<Stage>({ kind: 'choose' });
  const [customTip, setCustomTip] = useState('');
  const { targetRef, isFullscreen, toggle } = useFullscreen<HTMLDivElement>();

  const bill = Math.max(0, subtotal);
  const tipAmounts = useMemo(
    () => percentages.map((pct) => bill * (pct / 100)),
    [percentages, bill],
  );

  useEffect(() => {
    if (stage.kind !== 'done') return;
    const timer = setTimeout(() => setStage({ kind: 'choose' }), RESET_MS);
    return () => clearTimeout(timer);
  }, [stage]);

  const updatePercentage = (index: number, value: string) => {
    const num = value === '' ? 0 : Number(value);
    setPercentages((prev) => prev.map((p, i) => (i === index ? num : p)));
  };

  const applyPreset = (preset: (typeof PRESETS)[number]) => {
    setHeading(preset.heading);
    setSubtotal(preset.subtotal);
    setPercentages([...preset.percentages]);
    setJoke(preset.joke);
    setShowNoTip(true);
    setStage({ kind: 'choose' });
  };

  const pressNoTip = () => {
    if (joke) setStage({ kind: 'confirmNoTip', step: 0 });
    else setStage({ kind: 'done', tip: 0 });
  };

  const confirmNoTip = (step: number) => {
    if (step + 1 < GUILT_LINES.length) setStage({ kind: 'confirmNoTip', step: step + 1 });
    else setStage({ kind: 'done', tip: 0 });
  };

  const addCustomTip = () => {
    const amount = Number(customTip);
    if (!Number.isFinite(amount) || amount < 0) return;
    setCustomTip('');
    setStage({ kind: 'done', tip: amount });
  };

  const screenWidth = { maxWidth: 700, width: '100%', mx: 'auto' };

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
        <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>Presets:</Typography>
          {PRESETS.map((preset) => (
            <Button key={preset.label} size="small" variant="outlined" onClick={() => applyPreset(preset)}>
              {preset.label}
            </Button>
          ))}
        </Box>
        <Box sx={{ mb: 3 }}>
          <Typography gutterBottom>Screen Heading</Typography>
          <TextField slotProps={{ htmlInput: { 'aria-label': 'Screen Heading' } }}
            fullWidth
            value={heading}
            onFocus={(e) => e.target.select()}
            onChange={(e) => setHeading(e.target.value)}
            placeholder="Add a Tip"
          />
        </Box>
        <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '2fr 1fr' }, gap: 2 }}>
          <Box>
            <Typography gutterBottom>Subtotal Amount</Typography>
            <TextField
              fullWidth
              type="number"
              value={subtotal}
              onFocus={(e) => e.target.select()}
              onChange={(e) => setSubtotal(e.target.value === '' ? 0 : Number(e.target.value))}
              slotProps={{ htmlInput: { 'aria-label': 'Subtotal Amount' }, input: { startAdornment: <InputAdornment position="start">{currencySymbol(currency)}</InputAdornment> } }}
            />
          </Box>
          <Box>
            <Typography gutterBottom>Currency</Typography>
            <Select inputProps={{ 'aria-label': 'Currency' }} fullWidth value={currency} onChange={(e) => setCurrency(e.target.value as CurrencyCode)}>
              {CURRENCIES.map((c) => (
                <MenuItem key={c.value} value={c.value}>{c.label}</MenuItem>
              ))}
            </Select>
          </Box>
        </Box>
        <Typography gutterBottom>Tip Percentages</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' }, gap: 2, mb: 2 }}>
          {percentages.map((pct, i) => (
            <TextField
              key={i}
              type="number"
              value={pct}
              onFocus={(e) => e.target.select()}
              onChange={(e) => updatePercentage(i, e.target.value)}
              slotProps={{ htmlInput: { 'aria-label': `Tip percentage ${i + 1}` }, input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
            />
          ))}
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', columnGap: 3 }}>
          <FormControlLabel control={<Switch checked={showCustom} onChange={(e) => setShowCustom(e.target.checked)} />} label="Custom Tip button" />
          <FormControlLabel control={<Switch checked={showNoTip} onChange={(e) => setShowNoTip(e.target.checked)} />} label="No Tip button" />
          <FormControlLabel control={<Switch checked={joke} onChange={(e) => setJoke(e.target.checked)} />} label="Joke mode (No Tip guilt-trips)" />
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
        {stage.kind === 'choose' && (
          <>
            <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>{heading || 'Add a Tip'}</Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>Subtotal {formatAmount(bill, currency)}</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: `repeat(${percentages.length}, 1fr)` }, gap: 2, ...screenWidth }}>
              {percentages.map((pct, i) => (
                <Button
                  key={i}
                  variant="contained"
                  size="large"
                  onClick={() => setStage({ kind: 'done', tip: tipAmounts[i] })}
                  sx={{ py: 3, display: 'flex', flexDirection: 'column', gap: 0.5 }}
                >
                  <Typography variant="h5" fontWeight={700}>{pct}%</Typography>
                  <Typography variant="body1">{formatAmount(tipAmounts[i], currency)}</Typography>
                </Button>
              ))}
            </Box>
            {(showCustom || showNoTip) && (
              <Box sx={{ mt: 2, display: 'grid', gridTemplateColumns: showCustom && showNoTip ? '1fr 1fr' : '1fr', gap: 2, ...screenWidth }}>
                {showCustom && (
                  <Button variant="outlined" size="large" onClick={() => setStage({ kind: 'custom' })}>Custom Tip</Button>
                )}
                {showNoTip && (
                  <Button variant="outlined" size="large" onClick={pressNoTip}>No Tip</Button>
                )}
              </Box>
            )}
          </>
        )}

        {stage.kind === 'custom' && (
          <Box sx={screenWidth}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>Enter a Tip Amount</Typography>
            <TextField
              autoFocus
              fullWidth
              type="number"
              value={customTip}
              onChange={(e) => setCustomTip(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') addCustomTip(); }}
              slotProps={{ htmlInput: { 'aria-label': 'Custom tip' }, input: { startAdornment: <InputAdornment position="start">{currencySymbol(currency)}</InputAdornment> } }}
              sx={{ mb: 2, bgcolor: 'background.paper' }}
            />
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <Button variant="outlined" size="large" onClick={() => setStage({ kind: 'choose' })}>Back</Button>
              <Button variant="contained" size="large" onClick={addCustomTip} disabled={customTip === ''}>Add Tip</Button>
            </Box>
          </Box>
        )}

        {stage.kind === 'confirmNoTip' && (
          <Box sx={screenWidth}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>{GUILT_LINES[stage.step]}</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <Button variant="contained" size="large" onClick={() => setStage({ kind: 'choose' })}>Add a Tip</Button>
              <Button variant="text" size="small" onClick={() => confirmNoTip(stage.step)}>Yes, no tip</Button>
            </Box>
          </Box>
        )}

        {stage.kind === 'done' && (
          <Box sx={{ ...screenWidth, cursor: 'pointer' }} onClick={() => setStage({ kind: 'choose' })}>
            <CheckCircleIcon color="success" sx={{ fontSize: 72, mb: 1 }} />
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
              {stage.tip === 0 && joke ? 'Okay then.' : 'Thank you!'}
            </Typography>
            <Typography variant="h6" color="text.secondary">Tip {formatAmount(stage.tip, currency)}</Typography>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>Total {formatAmount(bill + stage.tip, currency)}</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
              Tap to start over
            </Typography>
          </Box>
        )}
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
        the exact amount for each tip percentage side by side, tap one, and get the total with a thank-you
        screen. It also works as a joke tip screen — change the heading to whatever favor you want &quot;tipped&quot;
        for (holding a door, walking the dog, one more episode) and show it to a friend or coworker for a laugh.
      </Typography>

      <Typography variant="h2">How to use it</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Pick a preset (<strong>Restaurant</strong>, <strong>Coffee Shop</strong> or <strong>Joke</strong>), or enter your own heading, <strong>subtotal</strong>, currency and three tip percentages.</li>
          <li>Choose whether to show the <strong>Custom Tip</strong> and <strong>No Tip</strong> buttons.</li>
          <li>Click <strong>Click to Fullscreen</strong> (or press F / Space) to switch to kiosk mode.</li>
          <li>Tapping a tip shows the tip and the new total with a thank-you screen, which resets on its own after a few seconds for the next person.</li>
          <li>Press <strong>Esc</strong> at any time to exit fullscreen.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        For a $40 subtotal with 15%, 20%, and 25% tip options, the screen shows $6.00, $8.00, and $10.00 side by
        side — the customer taps $8.00 and sees a $48.00 total and a thank-you message.
      </Typography>

      <Typography variant="h2">Tip Screen Etiquette: Do You Have to Tip?</Typography>
      <Typography variant="body1">
        Tip screens now appear at coffee counters, food trucks, stadiums and even self-checkout kiosks, and the
        suggested percentages have crept up. In the US, 15–20% is customary for table service at a sit-down
        restaurant. At a counter where you order and pick up yourself, a tip is optional, and at self-checkout or
        ordinary retail no tip is expected, so tapping <strong>No Tip</strong> is fine. For businesses, offering
        sensible percentages and a visible No Tip or Custom Tip button keeps customers from feeling pressured.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Cafes, food trucks, and small restaurants without a full POS tipping system.</li>
          <li>Tablets or kiosks left at the counter for customers to self-select a tip.</li>
          <li>Delivery or service providers presenting tip options in person.</li>
          <li>A joke tip screen for friends, roommates or coworkers, with Joke mode making &quot;No Tip&quot; as awkward as the real thing.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Can I change the tip percentages?</strong> Yes, edit any of the three percentage fields before going fullscreen, or start from a preset.</li>
          <li><strong>What happens when someone taps a tip?</strong> The screen shows the tip and the total with a thank-you message, then returns to the tip choice after a few seconds, ready for the next person.</li>
          <li><strong>Does this process payments?</strong> No — it&apos;s a display only, showing tip amounts for reference; it doesn&apos;t charge cards or record transactions.</li>
          <li><strong>Can I use this for a joke tip screen?</strong> Yes — use the Joke preset or turn on Joke mode, and &quot;No Tip&quot; asks &quot;Are you sure?&quot; a few times before it gives in. You can also hide the No Tip button entirely, or change the heading to any favor you want &quot;tipped&quot; for.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell
      url="/utilities/tip-screen"
      content={content}
    >
      <TipScreenContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TipScreen;
