'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const TileCalculator = () => {
  const [unit, setUnit] = useState<'ft' | 'm'>('ft');
  const [roomLength, setRoomLength] = useState<string>('12');
  const [roomWidth, setRoomWidth] = useState<string>('10');
  const [tileLength, setTileLength] = useState<string>('12');
  const [tileWidth, setTileWidth] = useState<string>('12');
  const [wastePct, setWastePct] = useState<string>('10');

  const handleUnitChange = (newUnit: 'ft' | 'm') => {
    setUnit(newUnit);
    if (newUnit === 'm') {
      setTileLength('0.3');
      setTileWidth('0.3');
    } else {
      setTileLength('12');
      setTileWidth('12');
    }
  };

  const { roomArea, tileArea, tilesNeeded, tilesWithWaste } = useMemo(() => {
    const rl = parseFloat(roomLength);
    const rw = parseFloat(roomWidth);
    const tl = parseFloat(tileLength);
    const tw = parseFloat(tileWidth);
    const waste = parseFloat(wastePct) || 0;

    if ([rl, rw, tl, tw].some((v) => isNaN(v) || v <= 0)) {
      return { roomArea: 0, tileArea: 0, tilesNeeded: 0, tilesWithWaste: 0 };
    }

    const tileDivisor = unit === 'ft' ? 144 : 1;
    const rArea = rl * rw;
    const tArea = (tl * tw) / tileDivisor;
    const needed = tArea > 0 ? rArea / tArea : 0;
    const withWaste = needed * (1 + waste / 100);
    return { roomArea: rArea, tileArea: tArea, tilesNeeded: needed, tilesWithWaste: withWaste };
  }, [roomLength, roomWidth, tileLength, tileWidth, wastePct, unit]);

  const areaUnit = unit === 'ft' ? 'sq ft' : 'm²';
  const dimUnit = unit === 'ft' ? 'in' : 'm';

  const content = (
    <>
      <Typography variant="h2">How to Calculate the Number of Tiles Needed</Typography>
      <Typography variant="body1">
        Enter your room&apos;s length and width to get its total area, then enter a single tile&apos;s
        dimensions to find its area. Dividing room area by tile area gives the raw tile count — add a waste
        percentage on top to account for cuts, breakage, and pattern-matching, since tiling almost always uses
        more material than the bare minimum.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Tiles Needed = (Room Area / Tile Area) × (1 + Waste %)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 12×10 ft room has an area of 120 sq ft. Using 12×12 inch tiles (1 sq ft each), you&apos;d need 120
        tiles at minimum. Adding a standard 10% waste allowance for cuts and breakage brings the total to 132
        tiles to buy.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating how many floor or wall tiles to purchase for a renovation.</li>
          <li>Budgeting a tiling project by knowing the exact quantity of material needed.</li>
          <li>Comparing material needs between different tile sizes for the same room.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why add a waste percentage?</Typography>
      <Typography variant="body1">
        Tiles get cut to fit room edges, corners, and around fixtures, and some break during installation.
        A 10% waste allowance is a common default for straightforward layouts — diagonal patterns, intricate
        layouts, or rooms with many cuts may need 15% or more.
      </Typography>
      <Typography variant="h3">Should I round the result up?</Typography>
      <Typography variant="body1">
        Yes — always round up to the next whole tile (and often to the next full box, since tiles are typically
        sold by the box), since you can&apos;t buy a fraction of a tile.
      </Typography>
      <Typography variant="h3">Does this account for grout lines?</Typography>
      <Typography variant="body1">
        No — grout line width is small enough relative to typical tile sizes that it&apos;s usually absorbed
        into the waste percentage rather than calculated separately.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/tile-calculator" content={content}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <ToggleButtonGroup value={unit} exclusive onChange={(_, v) => v && handleUnitChange(v)} size="small">
          <ToggleButton value="ft">Feet / Inches</ToggleButton>
          <ToggleButton value="m">Meters</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">Room Dimensions ({unit})</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="Length" type="number" fullWidth value={roomLength} onChange={(e) => setRoomLength(e.target.value)} onFocus={(e) => e.target.select()} />
            <TextField label="Width" type="number" fullWidth value={roomWidth} onChange={(e) => setRoomWidth(e.target.value)} onFocus={(e) => e.target.select()} />
          </Box>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>Tile Size ({dimUnit})</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="Length" type="number" fullWidth value={tileLength} onChange={(e) => setTileLength(e.target.value)} onFocus={(e) => e.target.select()} />
            <TextField label="Width" type="number" fullWidth value={tileWidth} onChange={(e) => setTileWidth(e.target.value)} onFocus={(e) => e.target.select()} />
          </Box>
          <TextField label="Waste / Breakage (%)" type="number" fullWidth value={wastePct} onChange={(e) => setWastePct(e.target.value)} onFocus={(e) => e.target.select()} sx={{ mt: 1 }} />
        </Box>

        <Paper variant="outlined" sx={{ p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2 }}>
          <Box textAlign="center">
            <Typography variant="body2" color="text.secondary">Room Area</Typography>
            <Typography variant="h6" fontWeight={700}>{roomArea.toLocaleString(undefined, { maximumFractionDigits: 2 })} {areaUnit}</Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="body2" color="text.secondary">Tiles Needed (with waste)</Typography>
            <Typography variant="h3" color="primary" fontWeight={800}>
              {Math.ceil(tilesWithWaste)}
            </Typography>
            <Typography variant="caption" color="text.secondary">{Math.ceil(tilesNeeded)} tiles without waste allowance</Typography>
          </Box>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TileCalculator;
