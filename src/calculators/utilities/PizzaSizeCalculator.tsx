'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface PizzaRow {
  id: number;
  diameter: string;
  price: string;
}

let nextId = 3;

const PizzaSizeCalculator = () => {
  const [rows, setRows] = useState<PizzaRow[]>([
    { id: 1, diameter: '12', price: '10' },
    { id: 2, diameter: '16', price: '16' },
  ]);

  const addRow = () => {
    setRows((prev) => [...prev, { id: nextId++, diameter: '', price: '' }]);
  };

  const removeRow = (id: number) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  const updateRow = (id: number, field: 'diameter' | 'price', value: string) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  };

  const computed = useMemo(() => {
    const results = rows.map((r) => {
      const d = parseFloat(r.diameter) || 0;
      const p = parseFloat(r.price) || 0;
      const area = Math.PI * (d / 2) ** 2;
      const pricePerSqIn = area > 0 ? p / area : null;
      return { ...r, area, pricePerSqIn };
    });
    const valid = results.filter((r) => r.pricePerSqIn !== null && r.pricePerSqIn > 0);
    const bestId = valid.length > 0
      ? valid.reduce((best, r) => (r.pricePerSqIn! < best.pricePerSqIn! ? r : best)).id
      : null;
    return { results, bestId };
  }, [rows]);

  const content = (
    <>
      <Typography variant="h2">How Pizza Value Is Calculated</Typography>
      <Typography variant="body1">
        Add each pizza size you&apos;re comparing, with its diameter and price. The calculator finds each
        pizza&apos;s area using the standard circle area formula, then divides price by area to get a price per
        square inch — the lower that number, the better the value.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Area = π × (Diameter ÷ 2)²<br />
        Price per Sq. Inch = Price ÷ Area
      </Box>
      <Typography variant="body1">
        Pizza sizes are deceptive because area grows with the <em>square</em> of the diameter — a 16-inch pizza
        has almost twice the area of a 12-inch pizza, even though the diameter is only about 33% bigger.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 12-inch pizza for $10 has an area of π × 6² ≈ 113 sq in, or about $0.088/sq in. A 16-inch pizza for
        $16 has an area of π × 8² ≈ 201 sq in, or about $0.080/sq in — the larger pizza is the better value
        despite costing more, because you&apos;re getting nearly double the area for only 60% more money.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Deciding whether to order one large pizza or two medium pizzas.</li>
          <li>Comparing deals or promotions across different pizza sizes.</li>
          <li>Settling a friendly debate about which size is the better deal.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why is a bigger pizza almost always a better deal?</Typography>
      <Typography variant="body1">
        Because a circle&apos;s area scales with the square of its radius, while a pizzeria&apos;s price
        increase per size upgrade is usually much closer to linear — so larger pizzas typically deliver more
        area per dollar, even when the sticker price is higher.
      </Typography>
      <Typography variant="h3">Does this account for the crust or number of slices?</Typography>
      <Typography variant="body1">
        No — this calculator compares raw area for the price, which is a good proxy for overall value but
        doesn&apos;t account for crust-to-topping ratio, slice count, or how filling the crust itself is.
      </Typography>
      <Typography variant="h3">Can I compare more than two pizzas?</Typography>
      <Typography variant="body1">
        Yes — use the &quot;Add Pizza&quot; button to add as many sizes as you want to compare at once.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/pizza-size-calculator" content={content}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Diameter (in)</TableCell>
                <TableCell>Price</TableCell>
                <TableCell align="right">Area (sq in)</TableCell>
                <TableCell align="right">Price / Sq In</TableCell>
                <TableCell align="right" />
              </TableRow>
            </TableHead>
            <TableBody>
              {computed.results.map((r) => (
                <TableRow key={r.id} sx={{ bgcolor: r.id === computed.bestId ? 'success.light' : undefined }}>
                  <TableCell>
                    <TextField
                      type="number"
                      size="small"
                      value={r.diameter}
                      onChange={(e) => updateRow(r.id, 'diameter', e.target.value)}
                      onFocus={(e) => e.target.select()}
                      slotProps={{ input: { endAdornment: <InputAdornment position="end">in</InputAdornment> } }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      size="small"
                      value={r.price}
                      onChange={(e) => updateRow(r.id, 'price', e.target.value)}
                      onFocus={(e) => e.target.select()}
                      slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
                    />
                  </TableCell>
                  <TableCell align="right">{r.area > 0 ? r.area.toFixed(1) : '—'}</TableCell>
                  <TableCell align="right">
                    {r.pricePerSqIn !== null ? `$${r.pricePerSqIn.toFixed(3)}` : '—'}
                    {r.id === computed.bestId && ' 🏆'}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => removeRow(r.id)} disabled={rows.length <= 1} aria-label="Remove pizza">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box>
          <IconButton onClick={addRow} color="primary" aria-label="Add pizza">
            <AddIcon />
          </IconButton>
          <Typography component="span" sx={{ verticalAlign: 'middle', ml: 1 }}>Add Pizza</Typography>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PizzaSizeCalculator;
