'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Layout = 'loop' | 'straight';

const FenceCalculator = () => {
  const [layout, setLayout] = useState<Layout>('loop');
  const [yardLength, setYardLength] = useState('100');
  const [yardWidth, setYardWidth] = useState('60');
  const [runLength, setRunLength] = useState('150');
  const [panelWidth, setPanelWidth] = useState('8');

  const result = useMemo(() => {
    const panel = parseFloat(panelWidth) || 0;
    const perimeter =
      layout === 'loop'
        ? 2 * ((parseFloat(yardLength) || 0) + (parseFloat(yardWidth) || 0))
        : parseFloat(runLength) || 0;

    if (panel <= 0 || perimeter <= 0) return { perimeter, panels: 0, totalPosts: 0, fixedPosts: 0, linePosts: 0 };

    const panels = Math.ceil(perimeter / panel);
    const totalPosts = layout === 'loop' ? panels : panels + 1;
    const fixedPosts = layout === 'loop' ? 4 : 2;
    const linePosts = Math.max(0, totalPosts - fixedPosts);

    return { perimeter, panels, totalPosts, fixedPosts, linePosts };
  }, [layout, yardLength, yardWidth, runLength, panelWidth]);

  const content = (
    <>
      <Typography variant="h2">How to Calculate Fence Panels and Posts</Typography>
      <Typography variant="body1">
        Enter your fence&apos;s total length — either as a length × width for a fully enclosed rectangular
        yard, or as a single straight run for an open fence line — along with your fence panel width, and this
        calculator works out how many panels you need and how many posts to buy, counting corner or end posts
        separately from the line posts in between.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Panels = ⌈Perimeter ÷ Panel Width⌉ &nbsp;|&nbsp; Posts (loop) = Panels &nbsp;|&nbsp; Posts (straight) = Panels + 1
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A fully enclosed 100 ft × 60 ft yard has a perimeter of 320 ft. With 8 ft panels, that&apos;s 40 panels
        and 40 posts total — 4 corner posts and 36 line posts. A straight 150 ft fence run with the same 8 ft
        panels needs 19 panels and 20 posts total — 2 end posts and 18 line posts.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Getting a materials list together before ordering fence panels and posts.</li>
          <li>Comparing total post and panel counts across different panel widths.</li>
          <li>Budgeting a fencing project for a backyard, dog run, or property line.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why does a fully enclosed layout need fewer posts per panel?</Typography>
      <Typography variant="body1">
        In a closed loop, every post is shared between two adjacent panels, so the number of posts equals the
        number of panels. In an open, straight run, the two ends aren&apos;t shared with another panel, so you
        need one extra post beyond the panel count.
      </Typography>
      <Typography variant="h3">Does this account for gates?</Typography>
      <Typography variant="body1">
        No — gate openings typically use different hardware and post spacing than standard panels. Subtract the
        gate width from your total perimeter before entering it here, and add gate posts and the gate itself
        separately.
      </Typography>
      <Typography variant="h3">What panel width should I use?</Typography>
      <Typography variant="body1">
        Most residential wood and vinyl fence panels come in standard 6 ft or 8 ft widths, though chain-link and
        some metal fencing use different post spacing — check your chosen fencing product&apos;s spec sheet for
        the exact panel or spacing width.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/fence-calculator" content={content}>
      <Box sx={{ mb: 3 }}>
        <ToggleButtonGroup
          value={layout}
          exclusive
          fullWidth
          onChange={(_, val: Layout | null) => { if (val) setLayout(val); }}
        >
          <ToggleButton value="loop">Enclosed Yard (Loop)</ToggleButton>
          <ToggleButton value="straight">Straight Run</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {layout === 'loop' ? (
            <>
              <TextField label="Yard Length" type="number" value={yardLength} onChange={(e) => setYardLength(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }} fullWidth />
              <TextField label="Yard Width" type="number" value={yardWidth} onChange={(e) => setYardWidth(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }} fullWidth />
            </>
          ) : (
            <TextField label="Fence Run Length" type="number" value={runLength} onChange={(e) => setRunLength(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }} fullWidth />
          )}
          <TextField label="Panel Width" type="number" value={panelWidth} onChange={(e) => setPanelWidth(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }} fullWidth />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Fence Panels Needed</Typography>
            <Typography variant="h3" fontWeight="bold">{result.panels.toLocaleString()}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Total Perimeter / Length</Typography>
            <Typography fontWeight={600}>{result.perimeter.toFixed(1)} ft</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Total Posts</Typography>
            <Typography fontWeight={600}>{result.totalPosts.toLocaleString()}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>{layout === 'loop' ? 'Corner Posts' : 'End Posts'}</Typography>
            <Typography fontWeight={600}>{result.fixedPosts}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Line Posts</Typography>
            <Typography fontWeight={600}>{result.linePosts.toLocaleString()}</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default FenceCalculator;
