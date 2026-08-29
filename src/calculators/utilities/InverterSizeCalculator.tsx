'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Button, IconButton, Stack, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface Appliance {
  id: string;
  name: string;
  watts: number;
}

let nextId = 4;

const InverterSizeCalculator = () => {
  const [appliances, setAppliances] = useState<Appliance[]>([
    { id: '1', name: 'Refrigerator', watts: 200 },
    { id: '2', name: 'LED Lights', watts: 100 },
    { id: '3', name: 'TV', watts: 150 },
  ]);
  const [margin, setMargin] = useState<string>('25');

  const addAppliance = () => setAppliances([...appliances, { id: String(nextId++), name: '', watts: 0 }]);
  const removeAppliance = (id: string) => setAppliances(appliances.filter((a) => a.id !== id));
  const updateAppliance = (id: string, field: 'name' | 'watts', val: string | number) => {
    setAppliances(appliances.map((a) => (a.id === id ? { ...a, [field]: val } : a)));
  };

  const totalLoad = useMemo(
    () => appliances.reduce((sum, a) => sum + (Number.isNaN(a.watts) ? 0 : a.watts), 0),
    [appliances]
  );

  const marginPct = parseFloat(margin);
  const validMargin = !isNaN(marginPct) && marginPct >= 0;
  const recommendedSize = validMargin ? totalLoad * (1 + marginPct / 100) : totalLoad;

  const content = (
    <>
      <Typography variant="h2">How to Size an Inverter for Your Appliances</Typography>
      <Typography variant="body1">
        List every appliance you plan to run at the same time along with its running wattage, then add a safety
        margin to cover startup surges and inverter efficiency losses. The result is the minimum inverter
        capacity (in watts / VA) recommended for that combined load.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Recommended Size = Total Load × (1 + Safety Margin %)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A refrigerator (200W), LED lights (100W), and a TV (150W) add up to a 450W total load. With a 25% safety
        margin, the recommended inverter size is 450 × 1.25 = 562.5W — round up to a common inverter size like
        600W or 800VA.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Sizing a solar power system&apos;s inverter for expected household loads.</li>
          <li>Choosing a home backup UPS or inverter for essential appliances during an outage.</li>
          <li>Planning power needs for an off-grid cabin or RV setup.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why add a safety margin on top of the running wattage?</Typography>
      <Typography variant="body1">
        Motors and compressors (like those in refrigerators, pumps, and air conditioners) draw a surge of
        current well above their steady running wattage when they first start up. The safety margin buffers for
        that startup surge plus normal inverter efficiency losses, so the inverter doesn&apos;t get overwhelmed
        the moment a motor-driven appliance kicks on.
      </Typography>
      <Typography variant="h3">What&apos;s the difference between watts and VA?</Typography>
      <Typography variant="body1">
        For purely resistive loads (like incandescent lights or heaters), watts and volt-amps (VA) are roughly
        equal. Inductive loads with motors have a power factor below 1, meaning their VA requirement is higher
        than their wattage — treat the wattage total here as a starting point and lean toward a larger margin
        for motor-heavy loads.
      </Typography>
      <Typography variant="h3">Should I add up every appliance in the house?</Typography>
      <Typography variant="body1">
        No — only include appliances you realistically expect to run at the same time. Very few households run
        every appliance simultaneously, so sizing for your actual expected simultaneous load (not the sum of
        everything you own) gives a more realistic and cost-effective inverter size.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/inverter-size-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>Appliances</Typography>
          <Stack spacing={2}>
            {appliances.map((a, index) => (
              <Stack key={a.id} direction="row" spacing={1.5} alignItems="center">
                <Typography sx={{ minWidth: 24, color: 'text.secondary' }}>#{index + 1}</Typography>
                <TextField
                  label="Appliance" size="small" fullWidth
                  value={a.name}
                  onChange={(e) => updateAppliance(a.id, 'name', e.target.value)}
                />
                <TextField
                  label="Watts" type="number" size="small" fullWidth
                  onFocus={(e) => e.target.select()}
                  value={Number.isNaN(a.watts) ? '' : a.watts}
                  onChange={(e) => updateAppliance(a.id, 'watts', e.target.value === '' ? NaN : Number(e.target.value))}
                />
                <IconButton color="error" size="small" onClick={() => removeAppliance(a.id)} disabled={appliances.length <= 1}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Stack>
            ))}
          </Stack>
          <Button startIcon={<AddIcon />} onClick={addAppliance} sx={{ mt: 2 }}>Add Appliance</Button>

          <TextField
            label="Safety Margin (%)" type="number" fullWidth sx={{ mt: 3 }}
            value={margin} onChange={(e) => setMargin(e.target.value)} onFocus={(e) => e.target.select()}
            helperText="Typically 20-25% to cover startup surge and efficiency loss"
          />
        </Box>

        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', height: 'fit-content' }}>
          <Typography variant="body2" color="text.secondary">Recommended Inverter Size</Typography>
          <Typography variant="h3" color="primary" fontWeight={800}>{recommendedSize.toFixed(0)} W</Typography>
          <Typography variant="caption" color="text.secondary">Total load: {totalLoad.toFixed(0)} W</Typography>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default InverterSizeCalculator;
