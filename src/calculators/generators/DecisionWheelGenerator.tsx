'use client';

import { useMemo, useRef, useState } from 'react';
import { Box, Button, Typography, TextField, IconButton, Stack, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CasinoIcon from '@mui/icons-material/Casino';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const COLORS = ['#e57373', '#64b5f6', '#81c784', '#ffd54f', '#ba68c8', '#4db6ac', '#f06292', '#a1887f', '#90a4ae', '#ff8a65'];

let nextId = 100;

interface Option {
  id: number;
  label: string;
}

const DEFAULT_OPTIONS: Option[] = [
  { id: nextId++, label: 'Pizza' },
  { id: nextId++, label: 'Sushi' },
  { id: nextId++, label: 'Tacos' },
  { id: nextId++, label: 'Burgers' },
];

const DecisionWheelGeneratorContent = () => {
  const [options, setOptions] = useState<Option[]>(DEFAULT_OPTIONS);
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState<Option | null>(null);
  const spinCount = useRef(0);

  const addOption = () => setOptions((prev) => [...prev, { id: nextId++, label: '' }]);
  const removeOption = (id: number) => setOptions((prev) => prev.filter((o) => o.id !== id));
  const updateOption = (id: number, label: string) =>
    setOptions((prev) => prev.map((o) => (o.id === id ? { ...o, label } : o)));

  const validOptions = useMemo(() => options.filter((o) => o.label.trim().length > 0), [options]);
  const segmentAngle = validOptions.length > 0 ? 360 / validOptions.length : 0;

  const spin = () => {
    if (spinning || validOptions.length < 2) return;
    setSpinning(true);
    setWinner(null);

    const winnerIndex = Math.floor(Math.random() * validOptions.length);
    // The segment's own center angle (segments are drawn starting at 0deg, going clockwise).
    const segmentCenter = winnerIndex * segmentAngle + segmentAngle / 2;
    // To land the pointer (fixed at the top, 0deg) on the winning segment's center,
    // the wheel must rotate so that segmentCenter ends up at 0deg (i.e. 360 - segmentCenter),
    // plus several full extra rotations for a satisfying spin animation. Always spin forward
    // from the current rotation so consecutive spins keep accumulating rather than snapping back.
    spinCount.current += 1;
    const extraSpins = 6 + Math.floor(Math.random() * 3); // 6-8 full rotations
    setRotation((prev) => {
      const base = prev % 360;
      const targetAngle = extraSpins * 360 + (360 - segmentCenter);
      return prev - base + targetAngle;
    });

    setTimeout(() => {
      setWinner(validOptions[winnerIndex]);
      setSpinning(false);
    }, 4000);
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={1}>Options</Typography>
        <Stack spacing={1.5}>
          {options.map((o) => (
            <Box key={o.id} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <TextField
                size="small"
                fullWidth
                placeholder="Enter an option"
                value={o.label}
                onChange={(e) => updateOption(o.id, e.target.value)}
              />
              <IconButton onClick={() => removeOption(o.id)} disabled={options.length <= 2} size="small">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Stack>
        <Button startIcon={<AddIcon />} onClick={addOption} sx={{ mt: 1.5 }} size="small">
          Add Option
        </Button>

        <Button
          variant="contained"
          size="large"
          startIcon={<CasinoIcon />}
          onClick={spin}
          disabled={spinning || validOptions.length < 2}
          sx={{ mt: 3 }}
          fullWidth
        >
          {spinning ? 'Spinning...' : 'Spin the Wheel'}
        </Button>
        {validOptions.length < 2 && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Enter at least 2 options to spin.
          </Typography>
        )}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
        <Box sx={{ position: 'relative', width: 280, height: 280 }}>
          {/* Pointer */}
          <Box
            sx={{
              position: 'absolute',
              top: -6,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '12px solid transparent',
              borderRight: '12px solid transparent',
              borderTop: '20px solid',
              borderTopColor: 'text.primary',
              zIndex: 2,
            }}
          />
          <Box
            sx={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'relative',
              overflow: 'hidden',
              border: '4px solid',
              borderColor: 'divider',
              transform: `rotate(${rotation}deg)`,
              transition: spinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.32, 1.02)' : 'none',
              background:
                validOptions.length > 0
                  ? `conic-gradient(${validOptions
                      .map((o, i) => {
                        const start = (i / validOptions.length) * 360;
                        const end = ((i + 1) / validOptions.length) * 360;
                        return `${COLORS[i % COLORS.length]} ${start}deg ${end}deg`;
                      })
                      .join(', ')})`
                  : 'none',
            }}
          >
            {validOptions.map((o, i) => {
              const center = (i + 0.5) * segmentAngle;
              return (
                <Box
                  key={o.id}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '50%',
                    transformOrigin: '0% 50%',
                    transform: `rotate(${center}deg)`,
                    textAlign: 'right',
                    pr: 1.5,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#fff',
                      fontWeight: 700,
                      textShadow: '0 1px 2px rgba(0,0,0,0.6)',
                      display: 'inline-block',
                      maxWidth: 90,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {o.label}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>

        {winner && (
          <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white', width: '100%' }}>
            <Typography variant="body2" sx={{ opacity: 0.85 }}>The wheel landed on</Typography>
            <Typography variant="h5" fontWeight={800}>{winner.label}</Typography>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

const DecisionWheelGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Decision Wheel Generator</Typography>
      <Typography variant="body1">
        Add the options you&apos;re choosing between using the input list — each one becomes an equal-sized,
        colored slice on the wheel. Click &quot;Spin the Wheel&quot; and a genuinely random number
        (via <code>Math.random()</code>) picks the winning slice. The wheel then animates several full
        rotations plus a calculated final angle that lands the pointer exactly on that slice, before
        revealing the winning option clearly below the wheel.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Enter &quot;Pizza&quot;, &quot;Sushi&quot;, &quot;Tacos&quot;, and &quot;Burgers&quot; as four equal
        slices, click Spin, and after a few seconds of animated spinning the wheel might land on
        &quot;Tacos&quot; — a random, fair way to settle a group&apos;s dinner debate.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Picking a restaurant, movie, or activity when a group can&apos;t agree.</li>
          <li>Randomly choosing a name from a raffle, giveaway, or team assignment list.</li>
          <li>Adding a fun, visual randomizer to classroom activities or team icebreakers.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Decision List Generator?</strong> The Decision List Generator is an analytical tool — you weigh pros and cons by importance to see which side of a decision scores higher. This Decision Wheel Generator does the opposite: it's a fun, purely random picker for when your options are roughly equal and you just want something chosen for you, with no weighing or analysis involved.</li>
          <li><strong>Is the spin actually random, or does it favor certain slices?</strong> It's genuinely random — the winning option is chosen with <code>Math.random()</code> before the animation even starts, and the wheel's spin angle is calculated afterward purely to visually land on that already-chosen result. Every option has an equal chance regardless of its position on the wheel.</li>
          <li><strong>Is there a limit to how many options I can add?</strong> No hard limit — add as many as you need with the "Add Option" button, though very long lists make each slice's label harder to read on the wheel.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/decision-wheel-generator" content={content}>
      <DecisionWheelGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default DecisionWheelGenerator;
