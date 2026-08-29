'use client';

import { useMemo, useState } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const PALETTE = ['#6a1b9a', '#00897b', '#d81b60', '#3949ab', '#f9a825', '#43a047'];

interface Entry {
  name: string;
  weight: number;
}

function parseEntries(text: string): Entry[] {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const match = line.match(/^(.*?)\s*[×x]\s*(\d+)\s*$/i);
      if (match) {
        const weight = Math.max(1, parseInt(match[2], 10) || 1);
        return { name: match[1].trim(), weight };
      }
      return { name: line, weight: 1 };
    })
    .filter((e) => e.name.length > 0);
}

const NamePickerWheelContent = () => {
  const [text, setText] = useState('Alice ×2\nBob\nCharlie\nDana ×3');
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  const entries = useMemo(() => parseEntries(text), [text]);
  const totalWeight = entries.reduce((sum, e) => sum + e.weight, 0);

  const segments = useMemo(() => {
    let angle = 0;
    return entries.map((e, i) => {
      const size = totalWeight > 0 ? (e.weight / totalWeight) * 360 : 0;
      const seg = { name: e.name, weight: e.weight, start: angle, size, color: PALETTE[i % PALETTE.length] };
      angle += size;
      return seg;
    });
  }, [entries, totalWeight]);

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
      const hit = segments.find((s) => pointerAngle >= s.start && pointerAngle < s.start + s.size);
      setWinner(hit ? hit.name : segments[segments.length - 1]?.name ?? null);
      setSpinning(false);
    }, 3500);
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, alignItems: 'start' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" fontWeight="600">Names (one per line)</Typography>
        <TextField
          multiline
          rows={8}
          value={text}
          onChange={(e) => setText(e.target.value)}
          fullWidth
          disabled={spinning}
          placeholder={'Alice\nBob ×2\nCharlie'}
        />
        <Typography variant="caption" color="text.secondary">
          {entries.length} names — minimum 2 needed to spin. Add &quot;×N&quot; after a name (e.g.
          &quot;Bob ×3&quot;) to give it N times the chance of winning.
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
            {segments.length >= 2 ? segments.map((seg, index) => {
              const startAngle = seg.start;
              const endAngle = seg.start + seg.size;
              const largeArc = seg.size > 180 ? 1 : 0;
              const startX = 50 + 50 * Math.sin((Math.PI * startAngle) / 180);
              const startY = 50 - 50 * Math.cos((Math.PI * startAngle) / 180);
              const endX = 50 + 50 * Math.sin((Math.PI * endAngle) / 180);
              const endY = 50 - 50 * Math.cos((Math.PI * endAngle) / 180);
              const path = `M50,50 L${startX},${startY} A50,50 0 ${largeArc},1 ${endX},${endY} Z`;
              return (
                <svg key={index} viewBox="0 0 100 100" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                  <path d={path} fill={seg.color} />
                  <text
                    x="50" y="16" fill="#fff" fontSize="5" fontWeight="bold" textAnchor="middle"
                    transform={`rotate(${startAngle + seg.size / 2}, 50, 50)`}
                  >
                    {seg.name.length > 10 ? seg.name.slice(0, 8) + '...' : seg.name}
                  </text>
                </svg>
              );
            }) : (
              <Box sx={{ width: '100%', height: '100%', bgcolor: 'grey.300', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="caption" color="text.secondary">Add 2+ names</Typography>
              </Box>
            )}
          </Box>
        </Box>

        <Button variant="contained" size="large" onClick={spin} disabled={spinning || entries.length < 2} sx={{ px: 5, borderRadius: 8 }}>
          {spinning ? 'Spinning...' : 'Spin the Wheel'}
        </Button>

        <Box sx={{ minHeight: 48, textAlign: 'center' }}>
          {winner && !spinning && (
            <Typography variant="h5" color="success.main" fontWeight="800">
              🏆 {winner}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

const NamePickerWheel = () => {
  const content = (
    <>
      <Typography variant="h2">How the Name Picker Wheel Works</Typography>
      <Typography variant="body1">
        Type a list of names, spin the wheel, and it randomly lands on one winner. Unlike a plain random
        picker, this wheel supports weighted entries — add &quot;×N&quot; after any name to give that person N
        times the chance of being picked, useful when some names should count more than once (for example,
        extra entries in a giveaway).
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Type each name on its own line in the text box.</li>
          <li>Optionally add &quot;×N&quot; after a name (e.g. &quot;Bob ×3&quot;) to weight it — a plain name without &quot;×N&quot; counts once.</li>
          <li>Click &quot;Spin the Wheel&quot; and watch it land on a randomly chosen name.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        With &quot;Alice ×2,&quot; &quot;Bob,&quot; &quot;Charlie,&quot; and &quot;Dana ×3&quot; entered, Alice
        has twice Bob or Charlie&apos;s chance of winning, and Dana has three times their chance — the wheel&apos;s
        slice sizes reflect these weights visually.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Picking a random winner from a giveaway where some entrants have earned extra entries.</li>
          <li>Randomly choosing who goes first, presents next, or gets picked in a group activity.</li>
          <li>Running a classroom raffle where certain names should have a higher chance based on participation.</li>
          <li>Deciding between weighted options, like giving a preferred choice more of a chance without guaranteeing it.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is this different from the Wheel Spinner?</Typography>
      <Typography variant="body1">
        The Wheel Spinner treats every entry equally, with each name getting the same size slice. This Name
        Picker Wheel adds support for weighted entries via the &quot;×N&quot; suffix, so you can give specific
        names a larger slice and a higher chance of winning — useful for giveaways and raffles with unequal
        entries.
      </Typography>
      <Typography variant="h3">What happens if I don&apos;t add a weight?</Typography>
      <Typography variant="body1">
        Any name without a &quot;×N&quot; suffix is treated as a normal, single entry (weight of 1), exactly
        like a standard random name picker.
      </Typography>
      <Typography variant="h3">Is the spin genuinely random?</Typography>
      <Typography variant="body1">
        Yes — the wheel lands on a random angle each spin, and each name&apos;s chance of winning is
        proportional to its slice size (which reflects its weight).
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/generators/name-picker-wheel" content={content}>
      <NamePickerWheelContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default NamePickerWheel;
