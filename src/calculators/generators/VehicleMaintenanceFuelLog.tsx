'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, IconButton, Button, InputAdornment, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface ServiceRecord {
  id: number;
  date: string;
  mileage: string;
  service: string;
  cost: string;
  shop: string;
}

interface FuelRecord {
  id: number;
  date: string;
  mileage: string;
  amount: string;
  cost: string;
}

let nextServiceId = 1;
let nextFuelId = 1;

const DEFAULT_SERVICE: ServiceRecord[] = [
  { id: nextServiceId++, date: '', mileage: '45000', service: 'Oil change', cost: '55', shop: 'QuickLube' },
];

const DEFAULT_FUEL: FuelRecord[] = [
  { id: nextFuelId++, date: '', mileage: '45000', amount: '12', cost: '42' },
];

const VehicleMaintenanceFuelLogContent = () => {
  const [service, setService] = useState<ServiceRecord[]>(DEFAULT_SERVICE);
  const [fuel, setFuel] = useState<FuelRecord[]>(DEFAULT_FUEL);

  const addService = () => setService((prev) => [...prev, { id: nextServiceId++, date: '', mileage: '', service: '', cost: '', shop: '' }]);
  const removeService = (id: number) => setService((prev) => prev.filter((s) => s.id !== id));
  const updateService = (id: number, patch: Partial<ServiceRecord>) =>
    setService((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));

  const addFuel = () => setFuel((prev) => [...prev, { id: nextFuelId++, date: '', mileage: '', amount: '', cost: '' }]);
  const removeFuel = (id: number) => setFuel((prev) => prev.filter((f) => f.id !== id));
  const updateFuel = (id: number, patch: Partial<FuelRecord>) =>
    setFuel((prev) => prev.map((f) => (f.id === id ? { ...f, ...patch } : f)));

  const validService = useMemo(() => service.filter((s) => s.service.trim()), [service]);
  const validFuel = useMemo(() => fuel.filter((f) => f.amount.trim() && f.cost.trim()), [fuel]);

  const pricePerUnit = (f: FuelRecord) => {
    const amt = parseFloat(f.amount) || 0;
    const cost = parseFloat(f.cost) || 0;
    return amt > 0 ? cost / amt : 0;
  };

  const copyAll = async () => {
    const lines: string[] = ['Maintenance / Service Records:'];
    validService.forEach((s) => {
      lines.push(`  - ${s.date || 'no date'} @ ${s.mileage || '?'} mi — ${s.service} — $${(parseFloat(s.cost) || 0).toFixed(2)}${s.shop.trim() ? ` (${s.shop.trim()})` : ''}`);
    });
    lines.push('', 'Fuel Log:');
    validFuel.forEach((f) => {
      lines.push(`  - ${f.date || 'no date'} @ ${f.mileage || '?'} mi — ${f.amount} gal/L — $${(parseFloat(f.cost) || 0).toFixed(2)} ($${pricePerUnit(f).toFixed(3)}/unit)`);
    });
    try {
      await navigator.clipboard.writeText(lines.join('\n'));
    } catch {}
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="flex-end" mb={2}>
        <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyAll} disabled={validService.length === 0 && validFuel.length === 0}>
          Copy Full Log
        </Button>
      </Stack>

      <Typography variant="subtitle1" fontWeight={600} mb={2}>Maintenance / Service Records</Typography>
      <Stack spacing={2} mb={2}>
        {service.map((s) => (
          <Paper key={s.id} variant="outlined" sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
              <TextField size="small" type="date" label="Date" InputLabelProps={{ shrink: true }} value={s.date} onChange={(e) => updateService(s.id, { date: e.target.value })} sx={{ flex: 1, minWidth: 140 }} />
              <TextField size="small" label="Mileage" value={s.mileage} onChange={(e) => updateService(s.id, { mileage: e.target.value })} sx={{ flex: 1, minWidth: 100 }} />
              <IconButton onClick={() => removeService(s.id)} disabled={service.length <= 1} size="small">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
            <Stack direction="row" spacing={1}>
              <TextField size="small" fullWidth label="Service performed" value={s.service} onChange={(e) => updateService(s.id, { service: e.target.value })} />
              <TextField size="small" label="Cost" value={s.cost} onChange={(e) => updateService(s.id, { cost: e.target.value })} InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }} sx={{ minWidth: 110 }} />
              <TextField size="small" label="Shop/location" value={s.shop} onChange={(e) => updateService(s.id, { shop: e.target.value })} sx={{ minWidth: 140 }} />
            </Stack>
          </Paper>
        ))}
      </Stack>
      <Button startIcon={<AddIcon />} onClick={addService} sx={{ mb: 4 }}>
        Add Service Record
      </Button>

      <Divider sx={{ mb: 3 }} />

      <Typography variant="subtitle1" fontWeight={600} mb={2}>Fuel Log</Typography>
      <Stack spacing={2} mb={2}>
        {fuel.map((f) => (
          <Paper key={f.id} variant="outlined" sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap', alignItems: 'center' }}>
              <TextField size="small" type="date" label="Date" InputLabelProps={{ shrink: true }} value={f.date} onChange={(e) => updateFuel(f.id, { date: e.target.value })} sx={{ flex: 1, minWidth: 140 }} />
              <TextField size="small" label="Mileage" value={f.mileage} onChange={(e) => updateFuel(f.id, { mileage: e.target.value })} sx={{ flex: 1, minWidth: 100 }} />
              <IconButton onClick={() => removeFuel(f.id)} disabled={fuel.length <= 1} size="small">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
            <Stack direction="row" spacing={1} alignItems="center">
              <TextField size="small" label="Gallons/Liters" value={f.amount} onChange={(e) => updateFuel(f.id, { amount: e.target.value })} sx={{ minWidth: 130 }} />
              <TextField size="small" label="Total cost" value={f.cost} onChange={(e) => updateFuel(f.id, { cost: e.target.value })} InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }} sx={{ minWidth: 110 }} />
              <Typography variant="body2" color="text.secondary">
                ${pricePerUnit(f).toFixed(3)}/unit
              </Typography>
            </Stack>
          </Paper>
        ))}
      </Stack>
      <Button startIcon={<AddIcon />} onClick={addFuel}>
        Add Fuel Entry
      </Button>
    </Box>
  );
};

const VehicleMaintenanceFuelLog = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Vehicle Maintenance & Fuel Log</Typography>
      <Typography variant="body1">
        Use the Maintenance / Service Records section to log each service visit — date, mileage, service
        performed, cost, and shop — building a running service history for your vehicle. Use the Fuel Log
        section to record each fill-up&apos;s date, mileage, gallons or liters, and total cost; the price
        per gallon or liter is calculated automatically from the amount and cost you enter. Click &quot;Copy
        Full Log&quot; to grab both sections as plain text.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Logging an oil change at 45,000 miles for $55 at QuickLube in the service section, and a 12-gallon
        fill-up for $42 at the same mileage in the fuel section, shows the service record with its cost and
        shop, and the fuel entry automatically showing a price of $3.500 per gallon.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Keeping a full service history for a vehicle ahead of resale or trade-in.</li>
          <li>Tracking fuel costs and efficiency trends over time by mileage.</li>
          <li>Maintaining maintenance records for multiple vehicles by copying separate logs for each.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is the price per gallon/liter calculated?</strong> It divides the total cost you enter by the gallons or liters you enter for that fill-up, updating instantly as you type.</li>
          <li><strong>Can I track more than one vehicle?</strong> This tool tracks one log at a time — for multiple vehicles, copy and save each vehicle&apos;s log separately before starting a new one.</li>
          <li><strong>Is my maintenance and fuel data saved anywhere?</strong> No — everything is kept only in your browser for the current session and resets on reload, so copy the log before closing the tab if you want to keep it.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/vehicle-maintenance-fuel-log" content={content}>
      <VehicleMaintenanceFuelLogContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default VehicleMaintenanceFuelLog;
