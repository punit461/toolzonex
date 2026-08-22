'use client';

import { useMemo, useState } from 'react';
import {
  Box, TextField, Typography, FormControl, InputLabel, Select, MenuItem,
  IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
} from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { TEMPERATURE_UNITS, convertTemperature, type TemperatureUnit } from './unitData';

function formatResult(value: number): string {
  return parseFloat(value.toFixed(4)).toString();
}

const TemperatureConverterContent = () => {
  const [fromId, setFromId] = useState<TemperatureUnit>('celsius');
  const [toId, setToId] = useState<TemperatureUnit>('fahrenheit');
  const [value, setValue] = useState<number>(0);

  const result = useMemo(() => convertTemperature(value, fromId, toId), [value, fromId, toId]);

  const swap = () => {
    setFromId(toId);
    setToId(fromId);
  };

  return (
    <Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr auto 1fr' }, gap: 2, alignItems: 'end' }}>
        <Box sx={{ minWidth: 0 }}>
          <Typography gutterBottom>From</Typography>
          <TextField
            fullWidth
            type="number"
            value={value}
            onFocus={(e) => e.target.select()}
            onChange={(e) => setValue(e.target.value === '' ? 0 : Number(e.target.value))}
            sx={{ mb: 1.5 }}
          />
          <FormControl fullWidth>
            <InputLabel>Unit</InputLabel>
            <Select value={fromId} label="Unit" onChange={(e) => setFromId(e.target.value as TemperatureUnit)}>
              {TEMPERATURE_UNITS.map((u) => (
                <MenuItem key={u.id} value={u.id}>{u.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <IconButton onClick={swap} sx={{ justifySelf: 'center', mb: { xs: 0, md: 1.5 } }} aria-label="Swap units">
          <SwapHorizIcon sx={{ transform: { xs: 'rotate(90deg)', md: 'none' } }} />
        </IconButton>

        <Box sx={{ minWidth: 0 }}>
          <Typography gutterBottom>To</Typography>
          <TextField
            fullWidth
            value={formatResult(result)}
            InputProps={{ readOnly: true }}
            sx={{ mb: 1.5 }}
          />
          <FormControl fullWidth>
            <InputLabel>Unit</InputLabel>
            <Select value={toId} label="Unit" onChange={(e) => setToId(e.target.value as TemperatureUnit)}>
              {TEMPERATURE_UNITS.map((u) => (
                <MenuItem key={u.id} value={u.id}>{u.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>Common Temperature Reference Points</Typography>
        <TableContainer component={Paper} variant="outlined">
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: 'action.hover' }}>
                <TableCell>Description</TableCell>
                <TableCell align="right">Celsius</TableCell>
                <TableCell align="right">Fahrenheit</TableCell>
                <TableCell align="right">Kelvin</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[
                { label: 'Absolute Zero', c: -273.15 },
                { label: 'Water Freezes', c: 0 },
                { label: 'Room Temperature', c: 20 },
                { label: 'Body Temperature', c: 37 },
                { label: 'Water Boils', c: 100 },
              ].map((row) => (
                <TableRow key={row.label}>
                  <TableCell>{row.label}</TableCell>
                  <TableCell align="right">{formatResult(row.c)}</TableCell>
                  <TableCell align="right">{formatResult(convertTemperature(row.c, 'celsius', 'fahrenheit'))}</TableCell>
                  <TableCell align="right">{formatResult(convertTemperature(row.c, 'celsius', 'kelvin'))}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

const TemperatureConverter = () => {
  const content = (
    <>
      <Typography variant="h2">Temperature Converter</Typography>
      <Typography variant="body1">
        Convert between Celsius, Fahrenheit, and Kelvin instantly. Enter a value, choose your source and target
        units, and see the converted result — plus a quick reference table of common temperature points.
      </Typography>

      <Typography variant="h2">How to Convert Temperature</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Enter a value in the &quot;From&quot; field and choose Celsius, Fahrenheit, or Kelvin.</li>
          <li>Choose the target unit in the &quot;To&quot; field — the converted value updates instantly.</li>
          <li>Use the swap button to reverse the conversion direction.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Body temperature of 37&deg;C converts to 98.6&deg;F, or 310.15K — useful when comparing a US weather
        forecast or oven temperature to a metric one.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Converting weather forecasts between Celsius and Fahrenheit.</li>
          <li>Cooking and oven temperature conversions.</li>
          <li>Scientific calculations that require Kelvin.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why does Kelvin have no negative values below absolute zero?</strong> Kelvin is an absolute scale starting at absolute zero (-273.15&deg;C), the coldest theoretically possible temperature — it can&apos;t go negative.</li>
          <li><strong>What temperature is the same in Celsius and Fahrenheit?</strong> -40&deg; — it&apos;s the one point where both scales read the same number.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell
      url="/converters/temperature-converter"
      content={content}
    >
      <TemperatureConverterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TemperatureConverter;
