'use client';

import { useMemo, useState } from 'react';
import {
  Box, TextField, Typography, FormControl, InputLabel, Select, MenuItem,
  IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
} from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { type UnitCategory, convert } from './unitData';

function formatResult(value: number): string {
  if (!isFinite(value)) return '0';
  if (value === 0) return '0';
  const abs = Math.abs(value);
  if (abs >= 1e9 || abs < 1e-6) return value.toExponential(6);
  return parseFloat(value.toPrecision(10)).toLocaleString('en-US', { maximumFractionDigits: 10 });
}

const UnitConverterContent = ({ category }: { category: UnitCategory }) => {
  const [fromId, setFromId] = useState(category.units[0].id);
  const [toId, setToId] = useState(category.units[1].id);
  const [value, setValue] = useState<number>(1);

  const fromUnit = category.units.find((u) => u.id === fromId)!;
  const toUnit = category.units.find((u) => u.id === toId)!;

  const result = useMemo(() => convert(value, fromUnit, toUnit), [value, fromUnit, toUnit]);

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
              {category.units.map((u) => (
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
              {category.units.map((u) => (
                <MenuItem key={u.id} value={u.id}>{u.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
          {fromUnit.label} to other {category.name.toLowerCase()} units
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
              {category.units.filter((u) => u.id !== fromId).map((u) => (
                <TableRow key={u.id}>
                  <TableCell>{u.label}</TableCell>
                  <TableCell align="right">{formatResult(convert(value, fromUnit, u))}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

interface Props {
  category: UnitCategory;
}

const EXAMPLES: Record<string, { text: string }> = {
  length: { text: '5 feet is about 1.524 meters — useful when comparing a US height or distance to a metric spec sheet.' },
  area: { text: '1 acre is about 4,046.86 square meters — handy when comparing US real estate listings to metric land measurements.' },
  volume: { text: '1 US gallon is about 3.785 liters — useful for comparing US recipe or fuel-economy figures to metric units.' },
  weight: { text: '1 kilogram is about 2.205 pounds — useful for comparing a metric shipping weight to a US pounds-based scale.' },
  time: { text: '90 minutes is 1.5 hours, or 5,400 seconds — useful for converting between how a duration is described and how it needs to be entered into a form or script.' },
};

const USE_CASES: Record<string, string[]> = {
  length: ['DIY, construction, and furniture measurements.', 'Converting travel distances between miles and kilometers.', 'Comparing height or size specs across regions.'],
  area: ['Comparing real estate or land listings across countries.', 'Agricultural and gardening measurements.', 'Construction and flooring material estimates.'],
  volume: ['Converting recipe measurements between US and metric units.', 'Fuel economy and container capacity comparisons.', 'Shipping and packaging volume calculations.'],
  weight: ['Shipping and postage weight limits.', 'Nutrition and recipe measurements.', 'Fitness and body-weight tracking across unit systems.'],
  time: ['Converting between how long something takes and how it needs to be entered into a script, spreadsheet, or form.', 'Scientific and engineering calculations.', 'Comparing media or event durations.'],
};

const UnitConverter = ({ category }: Props) => {
  const example = EXAMPLES[category.slug];
  const useCases = USE_CASES[category.slug] ?? [];

  const content = (
    <>
      <Typography variant="h2">{category.name} Unit Converter</Typography>
      <Typography variant="body1">
        Convert between {category.units.length} {category.name.toLowerCase()} units instantly. Enter a value,
        choose your source and target units, and see the converted result along with a full comparison table
        against every other unit in this category.
      </Typography>

      <Typography variant="h2">How to Convert {category.name}</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Enter a value in the &quot;From&quot; field and choose its unit.</li>
          <li>Choose the target unit in the &quot;To&quot; field — the converted value updates instantly.</li>
          <li>Use the swap button to reverse the conversion direction.</li>
        </ul>
      </Box>

      {example && (
        <>
          <Typography variant="h2">Example</Typography>
          <Typography variant="body1">{example.text}</Typography>
        </>
      )}

      {useCases.length > 0 && (
        <>
          <Typography variant="h2">Common Use Cases</Typography>
          <Box sx={{ typography: 'body1' }}>
            <ul>
              {useCases.map((uc) => <li key={uc}>{uc}</li>)}
            </ul>
          </Box>
        </>
      )}

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How precise are these conversions?</strong> Conversion factors use standard, exact definitions (e.g. 1 inch = 2.54cm exactly) — results are rounded for display but calculated at full precision.</li>
          <li><strong>Can I convert in either direction?</strong> Yes, use the swap button between the From and To fields to instantly reverse the conversion.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell
      title={`${category.name} Converter`}
      description={`Free ${category.name.toLowerCase()} unit converter. Convert between ${category.units.map((u) => u.label.split(' (')[0]).join(', ')}.`}
      url={`/converters/${category.slug}-converter`}
      content={content}
      category="Converters"
    >
      <UnitConverterContent category={category} />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default UnitConverter;
