'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Button, IconButton, Stack, Paper, ToggleButton, ToggleButtonGroup } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Unit = 'kg' | 'lb';

interface Bag {
  id: string;
  name: string;
  weight: string;
}

let nextId = 3;

const KG_TO_LB = 2.20462;

const LuggageWeightCalculator = () => {
  const [unit, setUnit] = useState<Unit>('kg');
  const [limit, setLimit] = useState('23');
  const [bags, setBags] = useState<Bag[]>([
    { id: '1', name: 'Checked Bag 1', weight: '21' },
    { id: '2', name: 'Checked Bag 2', weight: '24.5' },
  ]);

  const addBag = () => setBags([...bags, { id: String(nextId++), name: `Bag ${bags.length + 1}`, weight: '' }]);
  const removeBag = (id: string) => setBags(bags.filter((b) => b.id !== id));
  const updateBag = (id: string, field: 'name' | 'weight', val: string) => {
    setBags(bags.map((b) => (b.id === id ? { ...b, [field]: val } : b)));
  };

  const handleUnitChange = (_: React.MouseEvent<HTMLElement>, val: Unit | null) => {
    if (!val || val === unit) return;
    const factor = val === 'lb' ? KG_TO_LB : 1 / KG_TO_LB;
    setLimit((prev) => {
      const n = parseFloat(prev);
      return Number.isNaN(n) ? prev : (n * factor).toFixed(1);
    });
    setBags((prev) =>
      prev.map((b) => {
        const n = parseFloat(b.weight);
        return Number.isNaN(n) ? b : { ...b, weight: (n * factor).toFixed(1) };
      })
    );
    setUnit(val);
  };

  const { rows, totalWeight, limitNum, overCount } = useMemo(() => {
    const limitNum = parseFloat(limit) || 0;
    const rows = bags.map((b) => {
      const weight = parseFloat(b.weight) || 0;
      return { ...b, weightNum: weight, pass: limitNum <= 0 ? true : weight <= limitNum };
    });
    const totalWeight = rows.reduce((sum, r) => sum + r.weightNum, 0);
    const overCount = rows.filter((r) => !r.pass).length;
    return { rows, totalWeight, limitNum, overCount };
  }, [bags, limit]);

  const content = (
    <>
      <Typography variant="h2">How to Check Your Luggage Against an Airline Weight Limit</Typography>
      <Typography variant="body1">
        Add each bag you&apos;re bringing along with its weight, enter your airline&apos;s per-bag weight
        limit, and this calculator flags any bag that&apos;s over the limit while keeping a running total of
        your combined luggage weight. Switch between kilograms and pounds depending on how your airline states
        its limit.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        With a 23 kg per-bag limit, a bag weighing 21 kg passes while a second bag at 24.5 kg is flagged as
        1.5 kg over — even though the combined 45.5 kg total might be within an overall trip allowance, many
        airlines enforce the limit per individual bag, not just on the total.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking checked bags against an airline&apos;s weight limit before heading to the airport.</li>
          <li>Deciding which bag to shift items into when one bag is over the limit.</li>
          <li>Planning packing for a multi-bag trip with several travelers.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is the weight limit always per bag, or can it be a combined total?</Typography>
      <Typography variant="body1">
        It depends on the airline and fare class — most economy fares enforce a strict per-bag limit (commonly
        23 kg / 50 lb), while some premium fares or specific airlines allow a combined weight across multiple
        bags. Check your airline&apos;s specific baggage policy, since this varies significantly.
      </Typography>
      <Typography variant="h3">Do carry-on bags use the same limit?</Typography>
      <Typography variant="body1">
        No — carry-on weight limits are usually much lower than checked bag limits and are enforced separately.
        Run this calculator once for your checked bags and, if needed, again with your carry-on allowance.
      </Typography>
      <Typography variant="h3">What happens if a bag is over the limit?</Typography>
      <Typography variant="body1">
        Airlines typically charge an overweight baggage fee, which can be significant. It&apos;s usually
        cheaper to redistribute weight between bags (if you have room in another bag) than to pay the fee at
        check-in.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/luggage-weight-calculator" content={content}>
      <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
        <ToggleButtonGroup value={unit} exclusive onChange={handleUnitChange}>
          <ToggleButton value="kg">kg</ToggleButton>
          <ToggleButton value="lb">lb</ToggleButton>
        </ToggleButtonGroup>
        <TextField
          label={`Per-Bag Weight Limit (${unit})`}
          type="number"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          size="small"
          sx={{ minWidth: 220 }}
        />
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '3fr 2fr' }, gap: 6 }}>
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>Bags</Typography>
          <Stack spacing={2}>
            {rows.map((b, index) => (
              <Stack key={b.id} direction="row" spacing={1.5} alignItems="center">
                <Typography sx={{ minWidth: 24, color: 'text.secondary' }}>#{index + 1}</Typography>
                <TextField
                  label="Bag Name" size="small" fullWidth
                  value={b.name}
                  onChange={(e) => updateBag(b.id, 'name', e.target.value)}
                />
                <TextField
                  label={`Weight (${unit})`} type="number" size="small" fullWidth
                  onFocus={(e) => e.target.select()}
                  value={b.weight}
                  onChange={(e) => updateBag(b.id, 'weight', e.target.value)}
                />
                {b.pass ? <CheckCircleIcon color="success" fontSize="small" /> : <CancelIcon color="error" fontSize="small" />}
                <IconButton color="error" size="small" onClick={() => removeBag(b.id)} disabled={bags.length <= 1}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Stack>
            ))}
          </Stack>
          <Button startIcon={<AddIcon />} onClick={addBag} sx={{ mt: 2 }}>Add Bag</Button>
        </Box>

        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', height: 'fit-content' }}>
          <Typography variant="body2" color="text.secondary">Total Combined Weight</Typography>
          <Typography variant="h3" color="primary" fontWeight={800}>{totalWeight.toFixed(1)} {unit}</Typography>
          <Typography variant="body2" color={overCount > 0 ? 'error.main' : 'success.main'} sx={{ mt: 2 }}>
            {overCount > 0
              ? `${overCount} bag${overCount > 1 ? 's' : ''} over the ${limitNum} ${unit} limit`
              : 'All bags within the limit'}
          </Typography>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default LuggageWeightCalculator;
