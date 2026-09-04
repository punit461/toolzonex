'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const MAX_DIAMETER = 50;

/**
 * Standard 8-way symmetric midpoint circle algorithm. Returns the set of
 * (x, y) offsets from center that fall on the circle's outline for the
 * given integer radius — this avoids the gaps a naive sin/cos rounding
 * approach produces.
 */
function midpointCircle(radius: number): Set<string> {
  const points = new Set<string>();
  const add = (x: number, y: number) => points.add(`${x},${y}`);

  let x = radius;
  let y = 0;
  let err = 0;

  while (x >= y) {
    add(x, y);
    add(y, x);
    add(-y, x);
    add(-x, y);
    add(-x, -y);
    add(-y, -x);
    add(y, -x);
    add(x, -y);

    y += 1;
    if (err <= 0) {
      err += 2 * y + 1;
    }
    if (err > 0) {
      x -= 1;
      err -= 2 * x + 1;
    }
  }

  return points;
}

const MinecraftCircleCalculator = () => {
  const [diameter, setDiameter] = useState('16');

  const d = Math.round(parseFloat(diameter));
  const valid = !isNaN(d) && d >= 2 && d <= MAX_DIAMETER;
  const radius = valid ? Math.round(d / 2) : 0;

  const { grid, blockCount } = useMemo(() => {
    if (!valid) return { grid: [] as boolean[][], blockCount: 0 };
    const circlePoints = midpointCircle(radius);
    const size = radius * 2 + 1;
    const g: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false));
    let count = 0;
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        const x = col - radius;
        const y = row - radius;
        if (circlePoints.has(`${x},${y}`)) {
          g[row][col] = true;
          count++;
        }
      }
    }
    return { grid: g, blockCount: count };
  }, [radius, valid]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Minecraft Circle Calculator</Typography>
      <Typography variant="body1">
        Building a smooth-looking circle out of square blocks isn&apos;t as simple as placing blocks along a
        rough approximation of a curve — naively rounding sine and cosine values leaves visible gaps in the
        outline. This tool uses the standard midpoint (Bresenham) circle algorithm — the same technique used
        in computer graphics to draw pixel circles — to determine exactly which grid cells fall on the
        circle&apos;s outline for your chosen diameter, then renders it as a block grid you can follow directly
        in-game.
      </Typography>
      <Typography variant="body1">
        Enter your desired circle diameter in blocks (up to {MAX_DIAMETER} for render performance) to see the
        exact outline pattern.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 16-block diameter circle uses a radius of 8. The midpoint algorithm walks around one-eighth of the
        circle and mirrors each point across all 8 symmetric octants, producing a continuous, gap-free
        outline — shown below as a grid of filled cells representing the blocks to place.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Planning a circular tower base, dome ring, or garden bed footprint before placing blocks.</li>
          <li>Getting a gap-free circle outline instead of guessing block placement with trial and error.</li>
          <li>Sharing a consistent, repeatable block layout with a build team on a multiplayer server.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why not just use Math.round(radius × sin/cos) for each angle?</strong> That naive approach samples the circle at fixed angle steps and rounds each point independently, which frequently produces small gaps or duplicate blocks in the outline where the rounding jumps unevenly. The midpoint algorithm instead walks pixel-by-pixel and mathematically guarantees a continuous 8-way symmetric outline with no gaps.</li>
          <li><strong>Why is the diameter capped at {MAX_DIAMETER} blocks?</strong> Larger circles produce a much bigger grid to render in the browser, and in practice most in-game circular builds (towers, rings, pools) fall well within this range — for bigger builds, calculate and place several concentric rings.</li>
          <li><strong>Does this work for building spheres too?</strong> Not directly — a sphere is built from multiple circles of different radii stacked and layered vertically. You can use this calculator to generate the outline for each individual horizontal ring of a sphere at its corresponding radius.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/minecraft-circle-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '320px 1fr' }, gap: 4 }}>
        <Stack spacing={3}>
          <TextField
            label="Circle Diameter (blocks)"
            type="number"
            value={diameter}
            onChange={(e) => setDiameter(e.target.value)}
            fullWidth
            helperText={`Enter a value from 2 to ${MAX_DIAMETER}`}
          />
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Blocks in Outline</Typography>
            <Typography fontWeight={600}>{valid ? blockCount : '—'}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Radius</Typography>
            <Typography fontWeight={600}>{valid ? radius : '—'}</Typography>
          </Paper>
        </Stack>
        <Box sx={{ overflowX: 'auto' }}>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Block Grid Preview</Typography>
          {valid ? (
            <Box
              sx={{
                display: 'inline-grid',
                gridTemplateColumns: `repeat(${radius * 2 + 1}, 14px)`,
                gap: '1px',
                bgcolor: 'divider',
                p: '1px',
              }}
            >
              {grid.map((row, rowIdx) =>
                row.map((filled, colIdx) => (
                  <Box
                    key={`${rowIdx}-${colIdx}`}
                    sx={{
                      width: 14,
                      height: 14,
                      bgcolor: filled ? 'primary.main' : 'background.paper',
                    }}
                  />
                ))
              )}
            </Box>
          ) : (
            <Typography color="text.secondary">Enter a diameter between 2 and {MAX_DIAMETER} to see the grid.</Typography>
          )}
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default MinecraftCircleCalculator;
