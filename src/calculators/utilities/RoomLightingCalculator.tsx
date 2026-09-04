'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const ROOM_PRESETS: Record<string, number> = {
  'Living Room': 15,
  Bedroom: 15,
  Kitchen: 35,
  Bathroom: 40,
  'Home Office': 50,
  Garage: 50,
  Custom: 20,
};

const RoomLightingCalculatorContent = () => {
  const [length, setLength] = useState('12');
  const [width, setWidth] = useState('10');
  const [roomType, setRoomType] = useState('Living Room');
  const [footCandles, setFootCandles] = useState('15');
  const [lumensPerFixture, setLumensPerFixture] = useState('800');

  const handleRoomType = (e: SelectChangeEvent) => {
    const value = e.target.value;
    setRoomType(value);
    setFootCandles(String(ROOM_PRESETS[value]));
  };

  const result = useMemo(() => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const fc = parseFloat(footCandles) || 0;
    const perFixture = parseFloat(lumensPerFixture) || 0;

    const area = l * w;
    const totalLumens = area * fc;
    const fixtures = perFixture > 0 ? Math.ceil(totalLumens / perFixture) : 0;

    return { area, totalLumens, fixtures };
  }, [length, width, footCandles, lumensPerFixture]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <TextField
            label="Room Length" type="number" value={length}
            onChange={(e) => setLength(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }}
          />
          <TextField
            label="Room Width" type="number" value={width}
            onChange={(e) => setWidth(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }}
          />
        </Box>

        <FormControl fullWidth>
          <InputLabel id="room-type-label">Room Type</InputLabel>
          <Select labelId="room-type-label" label="Room Type" value={roomType} onChange={handleRoomType}>
            {Object.keys(ROOM_PRESETS).map((key) => (
              <MenuItem key={key} value={key}>{key}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Desired Light Level"
          type="number"
          value={footCandles}
          onChange={(e) => setFootCandles(e.target.value)}
          onFocus={(e) => e.target.select()}
          fullWidth
          slotProps={{ input: { endAdornment: <InputAdornment position="end">foot-candles</InputAdornment> } }}
        />

        <TextField
          label="Lumens Per Fixture"
          type="number"
          value={lumensPerFixture}
          onChange={(e) => setLumensPerFixture(e.target.value)}
          onFocus={(e) => e.target.select()}
          fullWidth
          helperText="Check the bulb or fixture packaging for its lumen output"
        />
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
        <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="body2">Recommended Fixtures</Typography>
          <Typography variant="h3" fontWeight="bold">{result.fixtures}</Typography>
        </Paper>
        <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Room Area</Typography>
          <Typography fontWeight={600}>{result.area.toFixed(0)} sq ft</Typography>
        </Paper>
        <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Total Lumens Needed</Typography>
          <Typography fontWeight={600}>{result.totalLumens.toLocaleString('en-US')} lm</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

const RoomLightingCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How the Room Lighting Calculator Works</Typography>
      <Typography variant="body1">
        Enter your room&apos;s length and width, and choose a room type preset (or a custom foot-candle level)
        for how brightly lit the space should be. One foot-candle equals one lumen per square foot, so
        multiplying the room&apos;s area by the desired foot-candle level gives the total lumens needed. Divide
        that by the lumen output of the fixtures or bulbs you plan to use to get a recommended fixture count.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Total Lumens = Room Area (sq ft) × Foot-Candles
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 12 ft × 10 ft living room (120 sq ft) lit to a typical 15 foot-candle level needs 120 × 15 = 1,800
        lumens total. With fixtures rated at 800 lumens each, that&apos;s 1,800 ÷ 800 = 2.25, rounded up to 3
        fixtures.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Planning how many ceiling fixtures or lamps a room needs during a renovation.</li>
          <li>Choosing the right bulb wattage/lumen output for a new light fixture.</li>
          <li>Comparing lighting needs between differently-sized rooms.</li>
          <li>Checking whether an existing lighting setup meets a recommended brightness level.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What foot-candle level should I use?</Typography>
      <Typography variant="body1">
        It depends on the room&apos;s purpose — relaxing spaces like living rooms and bedrooms typically use
        10-20 foot-candles, task-heavy spaces like kitchens and bathrooms use 30-40, and focused work areas
        like home offices often use 50 or more. The room type presets above set a reasonable starting point,
        which you can always adjust.
      </Typography>
      <Typography variant="h3">Should I count lumens or watts when shopping for bulbs?</Typography>
      <Typography variant="body1">
        Lumens measure actual brightness output, while watts measure energy consumption — modern LED bulbs
        produce far more lumens per watt than older incandescent bulbs. Always check the lumens figure on the
        packaging rather than assuming a wattage equivalent.
      </Typography>
      <Typography variant="h3">Does this account for natural light or room color?</Typography>
      <Typography variant="body1">
        No — this gives a baseline lumen target based on room size and desired brightness alone. Rooms with
        significant natural daylight or light-colored walls and ceilings that reflect more light may need
        slightly less artificial lighting than the calculated figure suggests.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/room-lighting-calculator" content={content}>
      <RoomLightingCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RoomLightingCalculator;
