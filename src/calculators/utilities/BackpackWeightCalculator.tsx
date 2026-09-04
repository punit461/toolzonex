'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Button, IconButton, Stack, Paper, ToggleButton, ToggleButtonGroup } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Unit = 'kg' | 'lb';

interface GearItem {
  id: string;
  name: string;
  weight: string;
}

let nextId = 5;

const KG_TO_LB = 2.20462;

const BackpackWeightCalculator = () => {
  const [unit, setUnit] = useState<Unit>('lb');
  const [bodyWeight, setBodyWeight] = useState('160');
  const [threshold, setThreshold] = useState('20');
  const [items, setItems] = useState<GearItem[]>([
    { id: '1', name: 'Backpack (empty)', weight: '3.5' },
    { id: '2', name: 'Tent', weight: '4' },
    { id: '3', name: 'Sleeping Bag', weight: '2.5' },
    { id: '4', name: 'Food & Water', weight: '8' },
  ]);

  const addItem = () => setItems([...items, { id: String(nextId++), name: `Item ${items.length + 1}`, weight: '' }]);
  const removeItem = (id: string) => setItems(items.filter((i) => i.id !== id));
  const updateItem = (id: string, field: 'name' | 'weight', val: string) => {
    setItems(items.map((i) => (i.id === id ? { ...i, [field]: val } : i)));
  };

  const handleUnitChange = (_: React.MouseEvent<HTMLElement>, val: Unit | null) => {
    if (!val || val === unit) return;
    const factor = val === 'lb' ? KG_TO_LB : 1 / KG_TO_LB;
    setBodyWeight((prev) => {
      const n = parseFloat(prev);
      return Number.isNaN(n) ? prev : (n * factor).toFixed(1);
    });
    setItems((prev) =>
      prev.map((i) => {
        const n = parseFloat(i.weight);
        return Number.isNaN(n) ? i : { ...i, weight: (n * factor).toFixed(1) };
      })
    );
    setUnit(val);
  };

  const { totalWeight, bodyWeightNum, percentOfBody, thresholdNum, overThreshold } = useMemo(() => {
    const totalWeight = items.reduce((sum, i) => sum + (parseFloat(i.weight) || 0), 0);
    const bodyWeightNum = parseFloat(bodyWeight) || 0;
    const thresholdNum = parseFloat(threshold) || 0;
    const percentOfBody = bodyWeightNum > 0 ? (totalWeight / bodyWeightNum) * 100 : 0;
    return { totalWeight, bodyWeightNum, percentOfBody, thresholdNum, overThreshold: percentOfBody > thresholdNum };
  }, [items, bodyWeight, threshold]);

  const content = (
    <>
      <Typography variant="h2">How to Calculate Backpack (Pack) Weight</Typography>
      <Typography variant="body1">
        Add every piece of gear you plan to carry — pack, tent, sleeping bag, food, water, and everything else —
        along with your body weight, and this calculator totals your pack weight and expresses it as a
        percentage of your body weight. That percentage is the number most hikers actually care about, since
        the same pack weight feels very different on a 120 lb hiker versus a 220 lb hiker.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Pack Weight % of Body Weight = (Total Gear Weight ÷ Body Weight) × 100
      </Box>
      <Typography variant="body2" color="text.secondary">
        It&apos;s commonly recommended to keep total pack weight under about 20% of body weight for comfortable
        multi-day hiking, though this is a guideline, not a hard rule — fitness level, trip length, and terrain
        all shift what feels sustainable. Adjust the threshold field to match a target that suits you.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 160 lb hiker carrying 18 lb of gear is at 18 ÷ 160 × 100 = 11.25% of body weight — comfortably under
        the common 20% guideline. The same 18 lb pack on a 90 lb hiker would be 20% of body weight, right at
        the upper end of what&apos;s typically recommended.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking a backpacking or hiking pack load against a comfort guideline before a trip.</li>
          <li>Deciding which gear to cut or swap for something lighter to hit a target pack weight.</li>
          <li>Comparing pack weight across different trip lengths or gear setups.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Where does the 20% guideline come from?</Typography>
      <Typography variant="body1">
        It&apos;s a widely cited rule of thumb among hikers and backpacking guides rather than a strict medical
        or scientific threshold. Ultralight backpackers often aim well below it (10-15%), while some
        expedition-style trips with heavy technical gear may exceed it out of necessity.
      </Typography>
      <Typography variant="h3">Should I include water and food weight?</Typography>
      <Typography variant="body1">
        Yes — include the full weight of food and water you&apos;ll be carrying at the start of a leg, since
        that&apos;s when your pack is heaviest. Water in particular adds up fast at roughly 2.2 lb (1 kg) per
        liter.
      </Typography>
      <Typography variant="h3">Does this account for base weight versus total weight?</Typography>
      <Typography variant="body1">
        No — this calculator totals everything you enter as one figure. If you want to track &quot;base
        weight&quot; (gear excluding consumables like food, water, and fuel) separately, list those items in a
        second pass without your consumables.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/backpack-weight-calculator" content={content}>
      <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
        <ToggleButtonGroup value={unit} exclusive onChange={handleUnitChange}>
          <ToggleButton value="lb">lb</ToggleButton>
          <ToggleButton value="kg">kg</ToggleButton>
        </ToggleButtonGroup>
        <TextField
          label={`Body Weight (${unit})`}
          type="number"
          value={bodyWeight}
          onChange={(e) => setBodyWeight(e.target.value)}
          size="small"
          onFocus={(e) => e.target.select()}
          sx={{ minWidth: 180 }}
        />
        <TextField
          label="Guideline Threshold (%)"
          type="number"
          value={threshold}
          onChange={(e) => setThreshold(e.target.value)}
          size="small"
          onFocus={(e) => e.target.select()}
          sx={{ minWidth: 200 }}
        />
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '3fr 2fr' }, gap: 6 }}>
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>Gear Items</Typography>
          <Stack spacing={2}>
            {items.map((i, index) => (
              <Stack key={i.id} direction="row" spacing={1.5} alignItems="center">
                <Typography sx={{ minWidth: 24, color: 'text.secondary' }}>#{index + 1}</Typography>
                <TextField
                  label="Item Name" size="small" fullWidth
                  value={i.name}
                  onChange={(e) => updateItem(i.id, 'name', e.target.value)}
                />
                <TextField
                  label={`Weight (${unit})`} type="number" size="small" fullWidth
                  onFocus={(e) => e.target.select()}
                  value={i.weight}
                  onChange={(e) => updateItem(i.id, 'weight', e.target.value)}
                />
                <IconButton color="error" size="small" onClick={() => removeItem(i.id)} disabled={items.length <= 1}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Stack>
            ))}
          </Stack>
          <Button startIcon={<AddIcon />} onClick={addItem} sx={{ mt: 2 }}>Add Gear Item</Button>
        </Box>

        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', height: 'fit-content' }}>
          <Typography variant="body2" color="text.secondary">Total Pack Weight</Typography>
          <Typography variant="h3" color="primary" fontWeight={800}>{totalWeight.toFixed(1)} {unit}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>% of Body Weight</Typography>
          <Typography variant="h5" fontWeight={700}>{bodyWeightNum > 0 ? `${percentOfBody.toFixed(1)}%` : '—'}</Typography>
          {bodyWeightNum > 0 && (
            <Typography variant="body2" color={overThreshold ? 'error.main' : 'success.main'} sx={{ mt: 2 }}>
              {overThreshold
                ? `Above your ${thresholdNum}% guideline`
                : `Within your ${thresholdNum}% guideline`}
            </Typography>
          )}
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BackpackWeightCalculator;
