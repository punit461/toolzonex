'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, Link as MuiLink } from '@mui/material';
import NextLink from 'next/link';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const DeckMaterialCalculatorContent = () => {
  const [length, setLength] = useState('16');
  const [width, setWidth] = useState('12');
  const [boardWidth, setBoardWidth] = useState('5.5');
  const [gap, setGap] = useState('0.25');
  const [joistSpacing, setJoistSpacing] = useState('16');
  const [screwsPerBoardPerJoist, setScrewsPerBoardPerJoist] = useState('2');

  const result = useMemo(() => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const bwIn = parseFloat(boardWidth) || 0;
    const gapIn = parseFloat(gap) || 0;
    const spacingIn = parseFloat(joistSpacing) || 0;
    const screwsPerCrossing = parseFloat(screwsPerBoardPerJoist) || 0;

    const deckArea = l * w;
    const effectiveWidthFt = (bwIn + gapIn) / 12;
    const numBoards = effectiveWidthFt > 0 ? Math.ceil(w / effectiveWidthFt) : 0;
    const totalLinearFeet = numBoards * l;

    // Joists run across the deck's width, spaced along its length (plus one to close the run).
    const joistCount = spacingIn > 0 ? Math.floor((l * 12) / spacingIn) + 1 : 0;
    const fasteners = numBoards * joistCount * screwsPerCrossing;

    return { deckArea, numBoards, totalLinearFeet, joistCount, fasteners };
  }, [length, width, boardWidth, gap, joistSpacing, screwsPerBoardPerJoist]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <TextField
            label="Deck Length" type="number" value={length}
            onChange={(e) => setLength(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }}
          />
          <TextField
            label="Deck Width" type="number" value={width}
            onChange={(e) => setWidth(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }}
          />
        </Box>
        <TextField
          label="Board Width" type="number" value={boardWidth}
          onChange={(e) => setBoardWidth(e.target.value)} onFocus={(e) => e.target.select()}
          fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">in</InputAdornment> } }}
        />
        <TextField
          label="Gap Between Boards" type="number" value={gap}
          onChange={(e) => setGap(e.target.value)} onFocus={(e) => e.target.select()}
          fullWidth
          helperText="Common gap is about 1/4 inch for drainage and expansion"
          slotProps={{ input: { endAdornment: <InputAdornment position="end">in</InputAdornment> } }}
        />
        <TextField
          label="Joist Spacing (On-Center)" type="number" value={joistSpacing}
          onChange={(e) => setJoistSpacing(e.target.value)} onFocus={(e) => e.target.select()}
          fullWidth
          helperText="Commonly 16 in for residential decks"
          slotProps={{ input: { endAdornment: <InputAdornment position="end">in</InputAdornment> } }}
        />
        <TextField
          label="Screws per Board-Joist Crossing" type="number" value={screwsPerBoardPerJoist}
          onChange={(e) => setScrewsPerBoardPerJoist(e.target.value)} onFocus={(e) => e.target.select()}
          fullWidth
        />
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Full Materials List</Typography>
        <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="body2">Deck Boards Needed</Typography>
          <Typography variant="h3" fontWeight="bold">{result.numBoards}</Typography>
        </Paper>
        <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Deck Area</Typography>
          <Typography fontWeight={600}>{result.deckArea.toFixed(0)} sq ft</Typography>
        </Paper>
        <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Total Linear Footage</Typography>
          <Typography fontWeight={600}>{result.totalLinearFeet.toFixed(0)} ft</Typography>
        </Paper>
        <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Joists Needed</Typography>
          <Typography fontWeight={600}>{result.joistCount.toLocaleString()}</Typography>
        </Paper>
        <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Fasteners / Screws</Typography>
          <Typography fontWeight={600}>{result.fasteners.toLocaleString()}</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

const DeckMaterialCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">The Fuller Deck Materials List</Typography>
      <Typography variant="body1">
        This is the fuller, shopping-list version of a deck estimate — it starts from the same board-count math
        as the simpler{' '}
        <MuiLink component={NextLink} href="/utilities/deck-board-calculator">Deck Board Calculator</MuiLink>,
        then adds the joist count (based on your deck&apos;s width divided by your joist spacing, commonly 16
        inches on-center) and a rough fastener count for attaching boards to joists. If you only need a board
        count, the simpler calculator is faster to use.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Boards Needed = Deck Width ÷ ((Board Width + Gap) ÷ 12)
        <br />
        Joists Needed = ⌊(Deck Length × 12) ÷ Joist Spacing⌋ + 1
        <br />
        Fasteners = Boards × Joists × Screws per Crossing
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 16 ft × 12 ft deck using 5.5-inch-wide boards with a 0.25-inch gap needs about 25 boards, each 16 ft
        long. With joists spaced 16 inches on-center along the 16 ft length, that&apos;s ⌊(16 × 12) ÷ 16⌋ + 1 =
        13 joists. At 2 screws per board-joist crossing, that&apos;s 25 × 13 × 2 = 650 screws.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Building a complete shopping list for a deck build, not just a board count.</li>
          <li>Estimating joist quantity and spacing before framing a deck.</li>
          <li>Planning fastener/screw quantities to avoid running short mid-installation.</li>
          <li>Budgeting the full materials cost of a deck project.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What joist spacing should I use?</Typography>
      <Typography variant="body1">
        16 inches on-center is the most common residential joist spacing, though some decking materials
        (especially composite boards installed at an angle) require tighter 12-inch spacing — check your
        decking manufacturer&apos;s span rating before finalizing spacing.
      </Typography>
      <Typography variant="h3">How is this different from the simpler Deck Board Calculator?</Typography>
      <Typography variant="body1">
        The Deck Board Calculator gives you just the board count and linear footage. This calculator adds the
        rest of a real materials list on top of that — joist count based on your spacing, and a rough fastener
        estimate — so you can shop for framing lumber and hardware in the same pass.
      </Typography>
      <Typography variant="h3">Should I add extra for waste on top of these numbers?</Typography>
      <Typography variant="body1">
        Yes — as with the simpler board calculator, add 10-15% extra boards for cutting waste and staggered
        joints, and buy a modest surplus of joists and fasteners rather than the exact calculated amount.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/deck-material-calculator" content={content}>
      <DeckMaterialCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default DeckMaterialCalculator;
