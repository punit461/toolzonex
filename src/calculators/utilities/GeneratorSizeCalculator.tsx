'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Button, IconButton, Stack, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface Appliance {
  id: string;
  name: string;
  runningWatts: number;
  surgeWatts: number;
}

let nextId = 4;

const GeneratorSizeCalculatorContent = () => {
  const [appliances, setAppliances] = useState<Appliance[]>([
    { id: '1', name: 'Refrigerator', runningWatts: 200, surgeWatts: 800 },
    { id: '2', name: 'Sump Pump', runningWatts: 800, surgeWatts: 2000 },
    { id: '3', name: 'LED Lights', runningWatts: 100, surgeWatts: 100 },
  ]);
  const [margin, setMargin] = useState('20');

  const addAppliance = () => setAppliances([...appliances, { id: String(nextId++), name: '', runningWatts: 0, surgeWatts: 0 }]);
  const removeAppliance = (id: string) => setAppliances(appliances.filter((a) => a.id !== id));
  const updateAppliance = (id: string, field: 'name' | 'runningWatts' | 'surgeWatts', val: string | number) => {
    setAppliances(appliances.map((a) => (a.id === id ? { ...a, [field]: val } : a)));
  };

  const result = useMemo(() => {
    const validAppliances = appliances.map((a) => ({
      ...a,
      runningWatts: Number.isNaN(a.runningWatts) ? 0 : a.runningWatts,
      surgeWatts: Number.isNaN(a.surgeWatts) ? 0 : a.surgeWatts,
    }));

    const totalRunning = validAppliances.reduce((sum, a) => sum + a.runningWatts, 0);

    // Only the single highest-surge appliance needs its extra surge headroom covered at once --
    // every other appliance is assumed to already be running steadily when that one motor starts.
    let worstCaseSurge = 0;
    for (const a of validAppliances) {
      const othersRunning = totalRunning - a.runningWatts;
      const caseTotal = othersRunning + Math.max(a.surgeWatts, a.runningWatts);
      if (caseTotal > worstCaseSurge) worstCaseSurge = caseTotal;
    }

    const marginPct = parseFloat(margin) || 0;
    const runningWithMargin = totalRunning * (1 + marginPct / 100);
    const recommendedSize = Math.max(runningWithMargin, worstCaseSurge);

    return { totalRunning, worstCaseSurge, recommendedSize };
  }, [appliances, margin]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>Appliances / Circuits</Typography>
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
                label="Running W" type="number" size="small" fullWidth
                onFocus={(e) => e.target.select()}
                value={Number.isNaN(a.runningWatts) ? '' : a.runningWatts}
                onChange={(e) => updateAppliance(a.id, 'runningWatts', e.target.value === '' ? NaN : Number(e.target.value))}
              />
              <TextField
                label="Surge W" type="number" size="small" fullWidth
                onFocus={(e) => e.target.select()}
                value={Number.isNaN(a.surgeWatts) ? '' : a.surgeWatts}
                onChange={(e) => updateAppliance(a.id, 'surgeWatts', e.target.value === '' ? NaN : Number(e.target.value))}
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
          helperText="Typically ~20% headroom on top of total running watts"
        />
      </Box>

      <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', height: 'fit-content' }}>
        <Typography variant="body2" color="text.secondary">Recommended Generator Size</Typography>
        <Typography variant="h3" color="primary" fontWeight={800}>{Math.round(result.recommendedSize).toLocaleString('en-US')} W</Typography>
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
          Total running load: {result.totalRunning.toFixed(0)} W
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block">
          Worst-case with one motor starting: {result.worstCaseSurge.toFixed(0)} W
        </Typography>
      </Paper>
    </Box>
  );
};

const GeneratorSizeCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Size a Backup Generator</Typography>
      <Typography variant="body1">
        List every appliance or circuit you want the generator to power, along with each one&apos;s running
        watts (steady-state power draw) and starting/surge watts (the brief extra power a motor draws when it
        first kicks on). A fuel-powered generator needs to be sized for the total steady load plus a safety
        margin, or for the moment any single motor-driven appliance starts up — whichever is higher.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Recommended Size = max(Total Running × (1 + Margin), Highest Single Surge + Other Running Watts)
      </Box>
      <Typography variant="body1">
        This is different from sizing a battery inverter or UPS-style backup — see our separate Inverter Size
        Calculator for that. A fuel generator&apos;s surge capacity only needs to cover one motor starting at a
        time (since appliances rarely all start simultaneously), which this calculator accounts for by testing
        each appliance&apos;s surge against the others&apos; steady running load, rather than summing every
        appliance&apos;s surge watts together.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A refrigerator (200W running / 800W surge), a sump pump (800W running / 2,000W surge), and LED lights
        (100W running) total 1,100W running. With a 20% margin, that&apos;s 1,320W. But if the sump pump starts
        while the fridge and lights are already running, the load spikes to 2,000 + 200 + 100 = 2,300W — higher
        than the margin-based figure, so 2,300W is the recommended generator size.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Choosing a portable or standby generator for home backup power during outages.</li>
          <li>Sizing a generator for a job site, RV, or off-grid cabin.</li>
          <li>Checking whether an existing generator can safely handle a new appliance.</li>
          <li>Planning which circuits to prioritize if a smaller generator is preferred.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why doesn&apos;t this add up every appliance&apos;s surge watts?</Typography>
      <Typography variant="body1">
        In practice, appliances rarely start at the exact same instant, and most generator sizing guidance
        assumes only one motor-driven appliance is starting up at any given moment while the others are
        already running steadily. Summing every appliance&apos;s peak surge watts together would significantly
        oversize (and overspend on) the generator.
      </Typography>
      <Typography variant="h3">How is this different from sizing a battery inverter?</Typography>
      <Typography variant="body1">
        A battery inverter or UPS-style backup draws from stored battery energy and is typically sized for a
        specific, often smaller, set of essential loads with attention to how long the battery will last. A
        fuel-powered generator burns fuel continuously and is generally sized around surge/running wattage
        rather than a battery runtime budget — use our separate Inverter Size Calculator if you&apos;re sizing
        a battery-based backup instead.
      </Typography>
      <Typography variant="h3">What if I don&apos;t know an appliance&apos;s surge watts?</Typography>
      <Typography variant="body1">
        Check the appliance&apos;s nameplate or manual — motor-driven appliances (refrigerators, pumps, air
        conditioners, power tools) usually list a starting or locked-rotor amperage you can convert to watts.
        As a rough estimate, surge watts are often 2-3x running watts for motor-driven appliances, while
        non-motor loads like lights and electronics have little to no surge.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/generator-size-calculator" content={content}>
      <GeneratorSizeCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default GeneratorSizeCalculator;
