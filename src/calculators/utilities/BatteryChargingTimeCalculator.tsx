'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, ToggleButton, ToggleButtonGroup, Paper } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type CapacityUnit = 'wh' | 'mah';
type ChargerUnit = 'watts' | 'amps';

const BatteryChargingTimeCalculator = () => {
  const [capacityUnit, setCapacityUnit] = useState<CapacityUnit>('wh');
  const [capacity, setCapacity] = useState<string>('50');
  const [voltage, setVoltage] = useState<string>('3.7');
  const [chargerUnit, setChargerUnit] = useState<ChargerUnit>('watts');
  const [chargerValue, setChargerValue] = useState<string>('10');
  const [chargerVoltage, setChargerVoltage] = useState<string>('5');
  const [currentCharge, setCurrentCharge] = useState<string>('20');
  const [efficiency, setEfficiency] = useState<string>('85');

  const result = useMemo(() => {
    const cap = parseFloat(capacity);
    const v = parseFloat(voltage);
    const charger = parseFloat(chargerValue);
    const chargerV = parseFloat(chargerVoltage);
    const startPct = parseFloat(currentCharge);
    const eff = parseFloat(efficiency);
    if ([cap, charger, startPct, eff].some((n) => Number.isNaN(n)) || cap <= 0 || charger <= 0 || eff <= 0) return null;
    if (capacityUnit === 'mah' && (Number.isNaN(v) || v <= 0)) return null;
    if (chargerUnit === 'amps' && (Number.isNaN(chargerV) || chargerV <= 0)) return null;

    const capacityWh = capacityUnit === 'wh' ? cap : (cap / 1000) * v;
    const chargerWatts = chargerUnit === 'watts' ? charger : charger * chargerV;
    const energyNeededWh = capacityWh * (1 - Math.max(0, Math.min(100, startPct)) / 100);
    const effectiveWatts = chargerWatts * (eff / 100);
    const hours = effectiveWatts > 0 ? energyNeededWh / effectiveWatts : NaN;

    return { hours, capacityWh, energyNeededWh, effectiveWatts };
  }, [capacity, capacityUnit, voltage, chargerUnit, chargerValue, chargerVoltage, currentCharge, efficiency]);

  const formatTime = (hours: number) => {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h ${m}m`;
  };

  const content = (
    <>
      <Typography variant="h2">How to Calculate Battery Charging Time</Typography>
      <Typography variant="body1">
        Charging time depends on how much energy the battery still needs and how quickly the charger can
        deliver it, minus losses from charging inefficiency. This calculator finds the remaining energy needed
        (capacity × the uncharged percentage), divides it by the charger&apos;s effective power output
        (charger wattage × efficiency), and returns the estimated time to reach a full charge.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Time (hours) = [Capacity (Wh) × (1 − Current Charge%)] ÷ [Charger Watts × Efficiency%]
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 50 Wh battery at 20% charge needs 50 × 0.8 = 40 Wh to reach full. A 10W charger running at 85%
        efficiency delivers 10 × 0.85 = 8.5 effective watts, so the estimated charging time is 40 ÷ 8.5 ≈ 4.7
        hours (about 4h 42m).
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating how long a phone, laptop, or power bank will take to charge from a given charger.</li>
          <li>Planning charging schedules for e-bikes, drones, or other portable battery-powered devices.</li>
          <li>Comparing how much faster a higher-wattage charger would charge the same battery.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why isn&apos;t charging 100% efficient?</Typography>
      <Typography variant="body1">
        Some energy is always lost as heat during charging, in the charger&apos;s power conversion circuitry and
        the battery&apos;s internal chemistry. A default of 85% efficiency is a reasonable general estimate for
        many consumer lithium-ion devices, though actual efficiency varies by charger and battery quality.
      </Typography>
      <Typography variant="h3">How do I convert mAh to Wh?</Typography>
      <Typography variant="body1">
        Watt-hours equal milliamp-hours divided by 1,000, multiplied by the battery&apos;s nominal voltage (Wh
        = mAh ÷ 1000 × V). This calculator does that conversion automatically when you select mAh as your
        capacity unit and provide the battery&apos;s voltage.
      </Typography>
      <Typography variant="h3">Why does real-world charging often take longer than this estimate?</Typography>
      <Typography variant="body1">
        Many devices use a tapering charge curve that slows down significantly above about 80-90% to protect
        battery health, so the last portion of a charge often takes proportionally longer than this calculator&apos;s
        constant-power estimate suggests.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/battery-charging-time-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box>
            <ToggleButtonGroup value={capacityUnit} exclusive onChange={(_, v) => v && setCapacityUnit(v)} size="small" fullWidth sx={{ mb: 1 }}>
              <ToggleButton value="wh">Capacity in Wh</ToggleButton>
              <ToggleButton value="mah">Capacity in mAh</ToggleButton>
            </ToggleButtonGroup>
            <TextField label={capacityUnit === 'wh' ? 'Battery Capacity (Wh)' : 'Battery Capacity (mAh)'} type="number" fullWidth value={capacity} onChange={(e) => setCapacity(e.target.value)} onFocus={(e) => e.target.select()} />
          </Box>
          {capacityUnit === 'mah' && (
            <TextField label="Battery Nominal Voltage (V)" type="number" fullWidth value={voltage} onChange={(e) => setVoltage(e.target.value)} onFocus={(e) => e.target.select()} />
          )}
          <Box>
            <ToggleButtonGroup value={chargerUnit} exclusive onChange={(_, v) => v && setChargerUnit(v)} size="small" fullWidth sx={{ mb: 1 }}>
              <ToggleButton value="watts">Charger in Watts</ToggleButton>
              <ToggleButton value="amps">Charger in Amps</ToggleButton>
            </ToggleButtonGroup>
            <TextField label={chargerUnit === 'watts' ? 'Charger Output (W)' : 'Charger Output (A)'} type="number" fullWidth value={chargerValue} onChange={(e) => setChargerValue(e.target.value)} onFocus={(e) => e.target.select()} />
          </Box>
          {chargerUnit === 'amps' && (
            <TextField label="Charger Voltage (V)" type="number" fullWidth value={chargerVoltage} onChange={(e) => setChargerVoltage(e.target.value)} onFocus={(e) => e.target.select()} />
          )}
          <TextField label="Current Charge (%)" type="number" fullWidth value={currentCharge} onChange={(e) => setCurrentCharge(e.target.value)} onFocus={(e) => e.target.select()} />
          <TextField label="Charger Efficiency (%)" type="number" fullWidth value={efficiency} onChange={(e) => setEfficiency(e.target.value)} onFocus={(e) => e.target.select()} />
        </Box>

        <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'action.hover', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {result && !Number.isNaN(result.hours) ? (
            <>
              <Typography variant="body2" color="text.secondary" gutterBottom>Estimated Time to Full Charge</Typography>
              <Typography variant="h3" fontWeight={800} color="primary.main">{formatTime(result.hours)}</Typography>
              <Typography variant="body2" color="text.secondary" mt={2}>
                Energy needed: {result.energyNeededWh.toFixed(2)} Wh at {result.effectiveWatts.toFixed(2)} effective W
              </Typography>
            </>
          ) : (
            <Typography variant="body1" color="text.secondary">Enter valid battery and charger values to calculate</Typography>
          )}
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BatteryChargingTimeCalculator;
