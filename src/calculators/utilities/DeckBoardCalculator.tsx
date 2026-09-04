'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const DeckBoardCalculatorContent = () => {
  const [length, setLength] = useState('16');
  const [width, setWidth] = useState('12');
  const [boardWidth, setBoardWidth] = useState('5.5');
  const [gap, setGap] = useState('0.25');

  const result = useMemo(() => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const bwIn = parseFloat(boardWidth) || 0;
    const gapIn = parseFloat(gap) || 0;

    const deckArea = l * w;
    const effectiveWidthFt = (bwIn + gapIn) / 12;
    // Boards run across the deck's width, laid end-to-end along its length.
    const numBoards = effectiveWidthFt > 0 ? Math.ceil(w / effectiveWidthFt) : 0;
    const totalLinearFeet = numBoards * l;

    return { deckArea, numBoards, totalLinearFeet };
  }, [length, width, boardWidth, gap]);

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
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
        <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="body2">Deck Boards Needed</Typography>
          <Typography variant="h3" fontWeight="bold">{result.numBoards}</Typography>
        </Paper>
        <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Deck Area</Typography>
          <Typography fontWeight={600}>{result.deckArea.toFixed(0)} sq ft</Typography>
        </Paper>
        <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Total Linear Footage</Typography>
          <Typography fontWeight={600}>{result.totalLinearFeet.toFixed(0)} ft</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

const DeckBoardCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How the Deck Board Calculator Works</Typography>
      <Typography variant="body1">
        Enter your deck&apos;s length and width, the width of the decking boards you plan to use, and the gap
        you&apos;ll leave between boards (commonly about 1/4 inch for drainage and seasonal expansion). Each
        board plus its gap takes up a fixed &quot;effective width&quot; across the deck, so dividing the
        deck&apos;s width by that effective width gives the number of boards needed to span it, running the
        full length of the deck.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Boards Needed = Deck Width ÷ ((Board Width + Gap) ÷ 12)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 16 ft × 12 ft deck using 5.5-inch-wide boards with a 0.25-inch gap has an effective board width of
        5.75 inches (about 0.479 ft). Dividing the 12 ft deck width by 0.479 gives about 25 boards, each 16 ft
        long — for a total of 25 × 16 = 400 linear feet of decking.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating how many deck boards to order before starting a build.</li>
          <li>Budgeting total linear footage of decking material and its cost.</li>
          <li>Comparing material needs between different board widths.</li>
          <li>Planning board layout direction and spacing before installation.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Should I add extra boards for waste and cuts?</Typography>
      <Typography variant="body1">
        Yes — this calculator gives the baseline number of boards to fully cover the deck&apos;s width. Most
        builders add 10-15% extra to account for cutting waste, mistakes, and staggered end joints, especially
        if boards don&apos;t come in exactly your deck&apos;s length.
      </Typography>
      <Typography variant="h3">Why leave a gap between boards at all?</Typography>
      <Typography variant="body1">
        Gaps allow water to drain through the deck surface instead of pooling, and give the boards room to
        expand and contract with temperature and humidity changes without buckling or splitting.
      </Typography>
      <Typography variant="h3">What if my boards don&apos;t span the full deck length in one piece?</Typography>
      <Typography variant="body1">
        If your deck is longer than the boards you&apos;re using, you&apos;ll need to join boards end-to-end
        over a joist, which uses more total linear footage than this calculator&apos;s simple length ×
        board-count figure. Account for extra material and staggered seams in that case.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/deck-board-calculator" content={content}>
      <DeckBoardCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default DeckBoardCalculator;
