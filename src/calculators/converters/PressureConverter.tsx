'use client';

import { useMemo, useState } from 'react';
import {
  Box, TextField, Typography, FormControl, InputLabel, Select, MenuItem,
  IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
} from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const PRESSURE_UNITS: { id: string; label: string; toBase: number }[] = [
  { id: 'pa', label: 'Pascal (Pa)', toBase: 1 },
  { id: 'kpa', label: 'Kilopascal (kPa)', toBase: 1_000 },
  { id: 'mpa', label: 'Megapascal (MPa)', toBase: 1_000_000 },
  { id: 'bar', label: 'Bar', toBase: 100_000 },
  { id: 'psi', label: 'Pound per sq inch (psi)', toBase: 6_894.757293168361 },
  { id: 'atm', label: 'Atmosphere (atm)', toBase: 101_325 },
  { id: 'mmhg', label: 'Millimeter mercury (mmHg)', toBase: 133.322387415 },
  { id: 'kgcm2', label: 'Kilogram per sq cm (kg/cm²)', toBase: 98_066.5 },
];

function formatResult(value: number): string {
  if (!isFinite(value)) return '0';
  if (value === 0) return '0';
  const abs = Math.abs(value);
  if (abs >= 1e9 || abs < 1e-6) return value.toExponential(6);
  return parseFloat(value.toPrecision(10)).toLocaleString('en-US', { maximumFractionDigits: 10 });
}

const PressureConverterContent = () => {
  const [fromId, setFromId] = useState('pa');
  const [toId, setToId] = useState('bar');
  const [value, setValue] = useState<number>(1);

  const fromUnit = PRESSURE_UNITS.find((u) => u.id === fromId)!;
  const toUnit = PRESSURE_UNITS.find((u) => u.id === toId)!;

  const result = useMemo(
    () => (value * fromUnit.toBase) / toUnit.toBase,
    [value, fromUnit, toUnit],
  );

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
            <Select value={fromId} label="Unit" onChange={(e) => setFromId(e.target.value)}>
              {PRESSURE_UNITS.map((u) => (
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
            <Select value={toId} label="Unit" onChange={(e) => setToId(e.target.value)}>
              {PRESSURE_UNITS.map((u) => (
                <MenuItem key={u.id} value={u.id}>{u.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
          {fromUnit.label} to other pressure units
        </Typography>
        <TableContainer component={Paper} variant="outlined">
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: 'action.hover' }}>
                <TableCell>Unit</TableCell>
                <TableCell align="right">Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {PRESSURE_UNITS.filter((u) => u.id !== fromId).map((u) => (
                <TableRow key={u.id}>
                  <TableCell>{u.label}</TableCell>
                  <TableCell align="right">{formatResult((value * fromUnit.toBase) / u.toBase)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

const PRESSURE_FACTORS = [
  { unit: '1 Pa', pa: '1', psi: '0.000145', atm: '0.00000987' },
  { unit: '1 kPa', pa: '1,000', psi: '0.145', atm: '0.00987' },
  { unit: '1 MPa', pa: '1,000,000', psi: '145.038', atm: '9.869' },
  { unit: '1 bar', pa: '100,000', psi: '14.504', atm: '0.987' },
  { unit: '1 psi', pa: '6,894.76', psi: '1', atm: '0.068' },
  { unit: '1 atm', pa: '101,325', psi: '14.696', atm: '1' },
  { unit: '1 mmHg', pa: '133.322', psi: '0.0193', atm: '0.00132' },
  { unit: '1 kg/cm²', pa: '98,066.5', psi: '14.223', atm: '0.968' },
];

const PressureConverter = () => {
  const content = (
    <>
      <Typography variant="h2">How Does the Pressure Converter Work?</Typography>
      <Typography variant="body1">
        Enter a value and choose your source and target pressure units. The converter uses exact conversion
        factors (e.g. 1 atm = 101,325 Pa, 1 psi = 6,894.76 Pa) to compute the result instantly. Use the swap
        button to reverse the conversion, and the table below the fields converts your value to every other
        supported unit at once.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Tire pressures are often quoted in psi. If a gauge reads 32 psi, that is 32 × 6,894.76 = 220,632 Pa,
        or about 2.21 bar. Converting the other way, 1 bar is roughly 14.5 psi.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Reading tire or air-line pressures between psi and bar.</li>
          <li>Converting lab measurements between Pa, kPa, and mmHg.</li>
          <li>Engineering design across SI and Imperial pressure units.</li>
          <li>Comparing weather, scuba, and hydraulic pressure readings.</li>
        </ul>
      </Box>

      <Typography variant="h2">Conversion Factors</Typography>
      <TableContainer component={Paper} variant="outlined" sx={{ mt: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: 'action.hover' }}>
              <TableCell>Unit</TableCell>
              <TableCell align="right">Pascal (Pa)</TableCell>
              <TableCell align="right">psi</TableCell>
              <TableCell align="right">atm</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {PRESSURE_FACTORS.map((f) => (
              <TableRow key={f.unit}>
                <TableCell>{f.unit}</TableCell>
                <TableCell align="right">{f.pa}</TableCell>
                <TableCell align="right">{f.psi}</TableCell>
                <TableCell align="right">{f.atm}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Are these conversions exact?</Typography>
      <Typography variant="body1">
        The factors are based on standard definitions and are exact to high precision (e.g. 1 atm = 101,325
        Pa exactly). Results are rounded for display but calculated at full precision.
      </Typography>
      <Typography variant="h3">What is a mmHg and where is it used?</Typography>
      <Typography variant="body1">
        mmHg (millimeters of mercury), also called torr, measures pressure by the height of a mercury column.
        It is commonly used in medicine for blood pressure and in vacuum and weather measurements.
      </Typography>
      <Typography variant="h3">What is the difference between gauge and absolute pressure?</Typography>
      <Typography variant="body1">
        This converter handles absolute pressure values. Gauge pressure measures pressure relative to the
        surrounding atmosphere, so it excludes the ~1 atm that is always present. Always make sure you know
        which scale you are working with.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/converters/pressure-converter" content={content}>
      <PressureConverterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PressureConverter;
