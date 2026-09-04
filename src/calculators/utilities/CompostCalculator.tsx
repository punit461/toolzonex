'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type InputMode = 'volume' | 'dimensions';

const CompostCalculator = () => {
  const [mode, setMode] = useState<InputMode>('volume');
  const [volume, setVolume] = useState('27');
  const [length, setLength] = useState('3');
  const [width, setWidth] = useState('3');
  const [height, setHeight] = useState('3');
  const [brownRatio, setBrownRatio] = useState('3');
  const [greenRatio, setGreenRatio] = useState('1');

  const result = useMemo(() => {
    const totalVolume = mode === 'volume'
      ? parseFloat(volume) || 0
      : (parseFloat(length) || 0) * (parseFloat(width) || 0) * (parseFloat(height) || 0);

    const brown = parseFloat(brownRatio) || 0;
    const green = parseFloat(greenRatio) || 0;
    const totalRatio = brown + green;

    const brownVolume = totalRatio > 0 ? totalVolume * (brown / totalRatio) : 0;
    const greenVolume = totalRatio > 0 ? totalVolume * (green / totalRatio) : 0;

    return { totalVolume, brownVolume, greenVolume };
  }, [mode, volume, length, width, height, brownRatio, greenRatio]);

  const content = (
    <>
      <Typography variant="h2">How Compost Material Ratios Are Calculated</Typography>
      <Typography variant="body1">
        A healthy compost pile needs the right balance of &quot;brown&quot; (carbon-rich) materials like dry
        leaves, straw, and cardboard, and &quot;green&quot; (nitrogen-rich) materials like food scraps, grass
        clippings, and coffee grounds. A common starting guideline is a 3:1 ratio of brown to green material by
        volume, though this is adjustable — some composters prefer a 2:1 ratio for faster breakdown. Enter your
        bin or pile&apos;s total volume (directly, or from length × width × height), plus your target ratio, to
        see how much of each material type to add.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Brown Volume = Total Volume × [Brown ÷ (Brown + Green)]
        <br />
        Green Volume = Total Volume × [Green ÷ (Brown + Green)]
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 27 cubic foot bin (3 × 3 × 3 ft) at a 3:1 brown-to-green ratio needs 20.25 cubic feet of brown
        material (dry leaves, cardboard) and 6.75 cubic feet of green material (food scraps, grass clippings)
        to fill it at the target ratio.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Planning how much dry leaves or cardboard to stockpile alongside kitchen scraps.</li>
          <li>Balancing a compost pile that&apos;s too wet or smelly (usually too much green material).</li>
          <li>Sizing a new compost bin or pile before starting it.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What counts as &quot;brown&quot; versus &quot;green&quot; material?</Typography>
      <Typography variant="body1">
        Browns are dry, carbon-rich materials — dried leaves, straw, shredded cardboard, and wood chips. Greens
        are moist, nitrogen-rich materials — food scraps, fresh grass clippings, and coffee grounds. Browns
        provide energy for decomposer microbes; greens provide the nitrogen they need to grow and reproduce.
      </Typography>
      <Typography variant="h3">What happens if the ratio is off?</Typography>
      <Typography variant="body1">
        Too much green material tends to make a pile wet, compacted, and smelly (excess nitrogen breaking down
        anaerobically). Too much brown material slows decomposition way down since there isn&apos;t enough
        nitrogen to fuel the microbes. The 3:1 or 2:1 brown-to-green guideline by volume helps avoid both.
      </Typography>
      <Typography variant="h3">Is this ratio by volume or by weight?</Typography>
      <Typography variant="body1">
        By volume — this is the more common and practical way home composters measure materials, since it&apos;s
        much easier to eyeball a bucket or wheelbarrow load than to weigh compost ingredients.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/compost-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <ToggleButtonGroup value={mode} exclusive onChange={(_, v) => v && setMode(v)} fullWidth>
            <ToggleButton value="volume">Direct Volume</ToggleButton>
            <ToggleButton value="dimensions">L × W × H</ToggleButton>
          </ToggleButtonGroup>

          {mode === 'volume' ? (
            <TextField
              label="Bin/Pile Volume"
              type="number"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              fullWidth
              slotProps={{ input: { endAdornment: <InputAdornment position="end">cu ft</InputAdornment> } }}
            />
          ) : (
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2 }}>
              <TextField
                label="Length"
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }}
              />
              <TextField
                label="Width"
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }}
              />
              <TextField
                label="Height"
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }}
              />
            </Box>
          )}

          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <TextField
              label="Brown Ratio"
              type="number"
              value={brownRatio}
              onChange={(e) => setBrownRatio(e.target.value)}
            />
            <TextField
              label="Green Ratio"
              type="number"
              value={greenRatio}
              onChange={(e) => setGreenRatio(e.target.value)}
            />
          </Box>
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Total Volume</Typography>
            <Typography variant="h3" fontWeight="bold">{result.totalVolume.toFixed(1)} cu ft</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Brown Material Needed</Typography>
            <Typography fontWeight={600}>{result.brownVolume.toFixed(1)} cu ft</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Green Material Needed</Typography>
            <Typography fontWeight={600}>{result.greenVolume.toFixed(1)} cu ft</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CompostCalculator;
