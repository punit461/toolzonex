'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, IconButton, Button, InputAdornment } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface Component {
  id: number;
  name: string;
  weight: string;
}

const DEFAULT_COMPONENTS: Component[] = [
  { id: 1, name: 'Box', weight: '0.5' },
  { id: 2, name: 'Padding / Filler', weight: '0.2' },
  { id: 3, name: 'Tape', weight: '0.05' },
];

const PackagingWeightContent = () => {
  const [itemWeight, setItemWeight] = useState('1.5');
  const [quantity, setQuantity] = useState('4');
  const [components, setComponents] = useState<Component[]>(DEFAULT_COMPONENTS);
  const [nextId, setNextId] = useState(DEFAULT_COMPONENTS.length + 1);

  const addComponent = () => {
    setComponents([...components, { id: nextId, name: 'Component', weight: '0' }]);
    setNextId(nextId + 1);
  };
  const removeComponent = (id: number) => setComponents(components.filter((c) => c.id !== id));
  const updateComponent = (id: number, field: 'name' | 'weight', v: string) =>
    setComponents(components.map((c) => (c.id === id ? { ...c, [field]: v } : c)));

  const itemsWeightTotal = (parseFloat(itemWeight) || 0) * (parseFloat(quantity) || 0);
  const componentsWeightTotal = components.reduce((sum, c) => sum + (parseFloat(c.weight) || 0), 0);
  const totalWeight = itemsWeightTotal + componentsWeightTotal;

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '3fr 2fr' }, gap: 6 }}>
      <Box>
        <Stack spacing={2} sx={{ mb: 3 }}>
          <TextField
            label="Item Weight (lbs, per unit)"
            type="number"
            value={itemWeight}
            onChange={(e) => setItemWeight(e.target.value)}
            fullWidth
          />
          <TextField
            label="Quantity of Items per Package"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            fullWidth
          />
        </Stack>

        <Typography variant="h6" sx={{ mb: 2 }}>Packaging Components (lbs)</Typography>
        <Stack spacing={2}>
          {components.map((c) => (
            <Stack key={c.id} direction="row" spacing={1.5} alignItems="center">
              <TextField label="Component" size="small" fullWidth value={c.name} onChange={(e) => updateComponent(c.id, 'name', e.target.value)} />
              <TextField
                label="Weight" type="number" size="small" fullWidth
                value={c.weight}
                onChange={(e) => updateComponent(c.id, 'weight', e.target.value)}
                slotProps={{ input: { endAdornment: <InputAdornment position="end">lbs</InputAdornment> } }}
              />
              <IconButton color="error" size="small" onClick={() => removeComponent(c.id)} disabled={components.length <= 1}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Stack>
          ))}
        </Stack>
        <Button startIcon={<AddIcon />} onClick={addComponent} sx={{ mt: 2 }}>Add Component</Button>
      </Box>

      <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', height: 'fit-content' }}>
        <Typography variant="body2" color="text.secondary">Items Weight ({quantity || 0} × {itemWeight || 0} lbs)</Typography>
        <Typography variant="h6" fontWeight={600}>{itemsWeightTotal.toFixed(2)} lbs</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>Packaging Components Weight</Typography>
        <Typography variant="h6" fontWeight={600}>{componentsWeightTotal.toFixed(2)} lbs</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>Total Package Weight</Typography>
        <Typography variant="h3" color="primary" fontWeight={800}>{totalWeight.toFixed(2)} lbs</Typography>
      </Paper>
    </Box>
  );
};

const PackagingWeightCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Packaging Weight Calculator</Typography>
      <Typography variant="body1">
        Enter the weight of a single item and how many items go into one package, then list the weight of
        each packaging component — box, padding or filler, tape, and anything else — adding or removing rows
        as needed. The calculator multiplies item weight by quantity, adds up every packaging component&apos;s
        weight, and combines both into a total package weight.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Total Package Weight = (Item Weight × Quantity) + Σ Packaging Component Weights
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Four items at 1.5 lbs each total 6 lbs. Adding a 0.5 lb box, 0.2 lb of padding, and 0.05 lb of tape
        (0.75 lb of packaging total) brings the total package weight to 6.75 lbs.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Working out the actual shipping weight of a multi-item package before booking a carrier.</li>
          <li>Comparing how much different packaging materials add to a shipment&apos;s total weight.</li>
          <li>Getting a total weight figure to plug into a freight or shipping cost calculator.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Packaging Cost Calculator?</strong> The Packaging Cost Calculator adds up the dollar cost of materials, labor, and shipping per unit. This tool computes physical weight only — no cost figures at all — for when you need a total weight, not a total cost.</li>
          <li><strong>How does this relate to the Freight Cost Calculator?</strong> The Freight Cost Calculator bills a shipment based on whichever is greater between its actual weight and its volumetric (dimensional) weight. This tool helps you produce that actual total weight figure — item weight plus every packaging component — which you can then plug into the Freight Cost Calculator as the actual weight input.</li>
          <li><strong>Should I include the shipping label or documents in packaging weight?</strong> For most real-world purposes their weight is negligible, but if you want a precise total, add them as an extra component row with their approximate weight.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/finance/packaging-weight-calculator" content={content}>
      <PackagingWeightContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PackagingWeightCalculator;
