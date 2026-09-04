'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, ToggleButton, ToggleButtonGroup, Link as MuiLink, Switch, FormControlLabel } from '@mui/material';
import NextLink from 'next/link';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Layout = 'loop' | 'straight';

const FenceMaterialCalculator = () => {
  const [layout, setLayout] = useState<Layout>('loop');
  const [yardLength, setYardLength] = useState('100');
  const [yardWidth, setYardWidth] = useState('60');
  const [runLength, setRunLength] = useState('150');
  const [panelWidth, setPanelWidth] = useState('8');
  const [bagsPerPost, setBagsPerPost] = useState('2');
  const [railStyle, setRailStyle] = useState(false);
  const [railsPerSection, setRailsPerSection] = useState('3');
  const [fastenersPerPanel, setFastenersPerPanel] = useState('8');

  const result = useMemo(() => {
    const panel = parseFloat(panelWidth) || 0;
    const perimeter =
      layout === 'loop'
        ? 2 * ((parseFloat(yardLength) || 0) + (parseFloat(yardWidth) || 0))
        : parseFloat(runLength) || 0;

    if (panel <= 0 || perimeter <= 0) {
      return { perimeter, panels: 0, totalPosts: 0, fixedPosts: 0, linePosts: 0, concreteBags: 0, rails: 0, fasteners: 0 };
    }

    const panels = Math.ceil(perimeter / panel);
    const totalPosts = layout === 'loop' ? panels : panels + 1;
    const fixedPosts = layout === 'loop' ? 4 : 2;
    const linePosts = Math.max(0, totalPosts - fixedPosts);
    const concreteBags = totalPosts * (parseFloat(bagsPerPost) || 0);
    const rails = railStyle ? panels * (parseFloat(railsPerSection) || 0) : 0;
    const fasteners = panels * (parseFloat(fastenersPerPanel) || 0);

    return { perimeter, panels, totalPosts, fixedPosts, linePosts, concreteBags, rails, fasteners };
  }, [layout, yardLength, yardWidth, runLength, panelWidth, bagsPerPost, railStyle, railsPerSection, fastenersPerPanel]);

  const content = (
    <>
      <Typography variant="h2">The Fuller Fence Materials List</Typography>
      <Typography variant="body1">
        This is the fuller, shopping-list version of a fence estimate — it starts from the same panel and post
        counts as the simpler{' '}
        <MuiLink component={NextLink} href="/utilities/fence-calculator">Fence Calculator</MuiLink>, then goes
        further to estimate the concrete needed to set posts, the number of rails if you&apos;re building a
        rail-and-picket style fence rather than pre-made panels, and a rough fastener count. If you only need
        panel and post counts, the simpler calculator is faster to use.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Panels = ⌈Perimeter ÷ Panel Width⌉ &nbsp;|&nbsp; Concrete Bags = Total Posts × Bags per Post
        <br />
        Rails = Panels × Rails per Section &nbsp;|&nbsp; Fasteners = Panels × Fasteners per Panel
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A fully enclosed 100 ft × 60 ft yard has a 320 ft perimeter. With 8 ft panels, that&apos;s 40 panels and
        40 posts (4 corner, 36 line posts). At 2 bags of concrete per post, that&apos;s 80 bags. If building
        rail-and-picket style with 3 rails per section, you&apos;d need 120 rails, plus roughly 40 × 8 = 320
        fasteners at 8 per panel connection.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Building a complete shopping list for a fencing project, not just panel and post counts.</li>
          <li>Estimating concrete bags needed to set posts before a materials run.</li>
          <li>Planning rail and fastener quantities for a rail-and-picket style fence build.</li>
          <li>Budgeting the full materials cost of a fencing project, including hardware.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How many bags of concrete does a fence post really need?</Typography>
      <Typography variant="body1">
        It depends on post size and hole depth, but 2 bags of ready-mix concrete per post is a commonly used
        rule of thumb for typical residential fence posts. Larger posts, deeper frost-line holes, or gate posts
        carrying extra weight often need more — adjust the field to match your post size and local frost depth
        requirements.
      </Typography>
      <Typography variant="h3">What&apos;s the difference between this and the simpler Fence Calculator?</Typography>
      <Typography variant="body1">
        The Fence Calculator gives you just panel and post counts. This calculator adds the rest of a real
        shopping list on top of that — concrete for setting posts, rails if you&apos;re not using pre-made
        panels, and a rough fastener count — so you can order everything in one pass.
      </Typography>
      <Typography variant="h3">Should I round the fastener and rail estimates up?</Typography>
      <Typography variant="body1">
        Yes — these are rough estimates based on your per-panel inputs. Buy a small surplus of rails and
        fasteners, since running short mid-installation usually costs more in a second trip than a modest
        overage would have.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/fence-material-calculator" content={content}>
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
              <TextField label="Yard Length" type="number" value={yardLength} onChange={(e) => setYardLength(e.target.value)} onFocus={(e) => e.target.select()} slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }} fullWidth />
              <TextField label="Yard Width" type="number" value={yardWidth} onChange={(e) => setYardWidth(e.target.value)} onFocus={(e) => e.target.select()} slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }} fullWidth />
            </>
          ) : (
            <TextField label="Fence Run Length" type="number" value={runLength} onChange={(e) => setRunLength(e.target.value)} onFocus={(e) => e.target.select()} slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }} fullWidth />
          )}
          <TextField label="Panel Width" type="number" value={panelWidth} onChange={(e) => setPanelWidth(e.target.value)} onFocus={(e) => e.target.select()} slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }} fullWidth />
          <TextField label="Concrete Bags per Post" type="number" value={bagsPerPost} onChange={(e) => setBagsPerPost(e.target.value)} onFocus={(e) => e.target.select()} fullWidth />

          <FormControlLabel
            control={<Switch checked={railStyle} onChange={(e) => setRailStyle(e.target.checked)} />}
            label="Rail-and-picket style (count rails)"
          />
          {railStyle && (
            <TextField label="Rails per Section" type="number" value={railsPerSection} onChange={(e) => setRailsPerSection(e.target.value)} onFocus={(e) => e.target.select()} fullWidth />
          )}
          <TextField label="Fasteners per Panel" type="number" value={fastenersPerPanel} onChange={(e) => setFastenersPerPanel(e.target.value)} onFocus={(e) => e.target.select()} fullWidth />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Materials List</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Fence Panels Needed</Typography>
            <Typography variant="h3" fontWeight="bold">{result.panels.toLocaleString()}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Total Posts</Typography>
            <Typography fontWeight={600}>{result.totalPosts.toLocaleString()}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Concrete Bags</Typography>
            <Typography fontWeight={600}>{result.concreteBags.toLocaleString()}</Typography>
          </Paper>
          {railStyle && (
            <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Rails</Typography>
              <Typography fontWeight={600}>{result.rails.toLocaleString()}</Typography>
            </Paper>
          )}
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Fasteners / Screws</Typography>
            <Typography fontWeight={600}>{result.fasteners.toLocaleString()}</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default FenceMaterialCalculator;
