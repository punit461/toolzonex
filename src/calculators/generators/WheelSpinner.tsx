'use client';

import { useState } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const PALETTE = ['#1565c0', '#ef6c00'];

const WheelSpinnerContent = () => {
  const [text, setText] = useState('Pizza\nSushi\nTacos\nBurgers');
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  const entries = text.split('\n').map((s) => s.trim()).filter(Boolean);
  const sliceAngle = entries.length > 0 ? 360 / entries.length : 360;

  const spin = () => {
    if (entries.length < 2 || spinning) return;
    setSpinning(true);
    setWinner(null);

    const extraSpins = 1440 + Math.floor(Math.random() * 360);
    const newRotation = rotation + extraSpins;
    setRotation(newRotation);

    setTimeout(() => {
      const normalized = newRotation % 360;
      const pointerAngle = (360 - normalized) % 360;
      const index = Math.floor(pointerAngle / sliceAngle) % entries.length;
      setWinner(entries[index]);
      setSpinning(false);
    }, 3500);
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, alignItems: 'start' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" fontWeight="600">Entries (one per line)</Typography>
        <TextField
          multiline
          rows={8}
          value={text}
          onChange={(e) => setText(e.target.value)}
          fullWidth
          disabled={spinning}
          placeholder={'Option 1\nOption 2\nOption 3'}
        />
        <Typography variant="caption" color="text.secondary">
          {entries.length} entries — minimum 2 needed to spin
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
        <Box sx={{ position: 'relative', width: 240, height: 240 }}>
          <Box sx={{
            position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', zIndex: 10,
            width: 0, height: 0, borderLeft: '12px solid transparent', borderRight: '12px solid transparent',
            borderTop: '20px solid', borderTopColor: 'text.primary',
          }} />
          <Box sx={{
            width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', position: 'relative',
            boxShadow: '0 6px 24px rgba(0,0,0,0.15)',
            transition: 'transform 3.5s cubic-bezier(0.1, 0.7, 0.1, 1)',
            transform: `rotate(${rotation}deg)`,
          }}>
            {entries.length >= 2 ? entries.map((entry, index) => {
              const startAngle = index * sliceAngle;
              const endAngle = startAngle + sliceAngle;
              const largeArc = sliceAngle > 180 ? 1 : 0;
              const startX = 50 + 50 * Math.sin((Math.PI * startAngle) / 180);
              const startY = 50 - 50 * Math.cos((Math.PI * startAngle) / 180);
              const endX = 50 + 50 * Math.sin((Math.PI * endAngle) / 180);
              const endY = 50 - 50 * Math.cos((Math.PI * endAngle) / 180);
              const path = `M50,50 L${startX},${startY} A50,50 0 ${largeArc},1 ${endX},${endY} Z`;
              return (
                <svg key={index} viewBox="0 0 100 100" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                  <path d={path} fill={PALETTE[index % PALETTE.length]} />
                  <text
                    x="50" y="16" fill="#fff" fontSize="5.5" fontWeight="bold" textAnchor="middle"
                    transform={`rotate(${startAngle + sliceAngle / 2}, 50, 50)`}
                  >
                    {entry.length > 12 ? entry.slice(0, 10) + '...' : entry}
                  </text>
                </svg>
              );
            }) : (
              <Box sx={{ width: '100%', height: '100%', bgcolor: 'grey.300', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="caption" color="text.secondary">Add 2+ entries</Typography>
              </Box>
            )}
          </Box>
        </Box>

        <Button variant="contained" size="large" onClick={spin} disabled={spinning || entries.length < 2} sx={{ px: 5, borderRadius: 8 }}>
          {spinning ? 'Spinning...' : 'Spin'}
        </Button>

        <Box sx={{ minHeight: 48, textAlign: 'center' }}>
          {winner && !spinning && (
            <Typography variant="h5" color="success.main" fontWeight="800">
              🎉 {winner}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

const WheelSpinner = () => {
  const content = (
    <>
      <Typography variant="h2">Free Wheel Spinner — Quick Random Spin</Typography>
      <Typography variant="body1">
        Type a list of options, hit spin, and let the wheel pick one at random. A minimal, no-frills spinner
        for when you just need a fast random pick — no setup or customization required.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Type your options into the textarea, one per line, and click "Spin." The wheel spins and lands on one
        entry at random, which is then highlighted below it.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Typing "Pizza," "Sushi," "Tacos," and "Burgers" on separate lines and spinning randomly lands on one
        of the four — an instant answer to "what should we eat?"
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Quickly deciding between a short list of options without any setup.</li>
          <li>Picking a random name or item from a list pasted straight from elsewhere.</li>
          <li>A faster, simpler alternative when you don't need custom colors or a saved list.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is this different from the Wheel of Fortune Spinner?</Typography>
      <Typography variant="body1">
        The Wheel of Fortune Spinner lets you add and remove entries one at a time, customize colors, and
        track spin stats. This tool is intentionally simpler — just paste or type a plain list of entries and
        spin, with no extra customization, for when you want the fastest possible random pick.
      </Typography>
      <Typography variant="h3">Is the spin result random?</Typography>
      <Typography variant="body1">
        Yes — each spin lands on a random entry, with every entry given an equal chance based on its slice
        size.
      </Typography>
      <Typography variant="h3">How many entries can I add?</Typography>
      <Typography variant="body1">
        There's no hard cap, but the wheel is easiest to read with a shorter list — a minimum of 2 entries is
        required to spin.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/generators/wheel-spinner" content={content}>
      <WheelSpinnerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default WheelSpinner;
