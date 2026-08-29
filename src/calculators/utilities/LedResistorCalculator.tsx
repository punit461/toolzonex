'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const E12_SERIES = [1.0, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2];

function nearestStandardResistor(value: number): number {
  if (value <= 0) return 0;
  const exponent = Math.floor(Math.log10(value));
  let best = E12_SERIES[0] * 10 ** exponent;
  let bestDiff = Math.abs(value - best);
  for (const exp of [exponent - 1, exponent, exponent + 1]) {
    for (const base of E12_SERIES) {
      const candidate = base * 10 ** exp;
      const diff = Math.abs(value - candidate);
      if (diff < bestDiff) {
        bestDiff = diff;
        best = candidate;
      }
    }
  }
  return best;
}

const LedResistorCalculator = () => {
  const [supplyVoltage, setSupplyVoltage] = useState<string>('9');
  const [ledVoltage, setLedVoltage] = useState<string>('2');
  const [ledCurrent, setLedCurrent] = useState<string>('20');

  const result = useMemo(() => {
    const vs = parseFloat(supplyVoltage);
    const vf = parseFloat(ledVoltage);
    const iMa = parseFloat(ledCurrent);
    if ([vs, vf, iMa].some((n) => Number.isNaN(n)) || iMa <= 0) return null;
    if (vs <= vf) return { error: 'Supply voltage must be greater than the LED forward voltage' };

    const iA = iMa / 1000;
    const resistance = (vs - vf) / iA;
    const nearest = nearestStandardResistor(resistance);
    const powerW = iA * iA * resistance;
    const nearestPowerW = iA * iA * nearest;

    return { resistance, nearest, powerW, nearestPowerW };
  }, [supplyVoltage, ledVoltage, ledCurrent]);

  const content = (
    <>
      <Typography variant="h2">How to Calculate an LED Current-Limiting Resistor</Typography>
      <Typography variant="body1">
        LEDs need a series resistor to limit current to a safe level, since they don&apos;t have significant
        internal resistance of their own. Using Ohm&apos;s Law, the required resistance is the voltage dropped
        across the resistor (supply voltage minus the LED&apos;s forward voltage) divided by the desired
        forward current. The calculator then rounds to the closest standard E12-series resistor value, the
        common set of resistor values manufacturers actually produce.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        R = (V_supply − V_LED) ÷ I_LED &nbsp;|&nbsp; Power = I² × R
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 9V supply driving an LED with a 2V forward voltage at 20 mA needs R = (9 − 2) ÷ 0.02 = 350 Ω. The
        nearest standard E12 resistor value is 330 Ω, which would give a slightly higher current, or 390 Ω for
        a slightly lower, safer current — either is a reasonable practical choice.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Choosing a resistor value for an LED in a hobby electronics or Arduino project.</li>
          <li>Verifying that an existing circuit&apos;s resistor is appropriately sized for the LED used.</li>
          <li>Learning how Ohm&apos;s Law applies to simple current-limiting circuits.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What forward voltage should I use for my LED?</Typography>
      <Typography variant="body1">
        Forward voltage varies by LED color and type: roughly 1.8-2.2V for red/yellow, 3.0-3.4V for green/blue/white
        LEDs. Check your LED&apos;s datasheet for the exact value, since using an incorrect forward voltage will
        throw off the resistor calculation.
      </Typography>
      <Typography variant="h3">What is the E12 series, and why round to it?</Typography>
      <Typography variant="body1">
        The E12 series is a standardized set of 12 resistor values per decade (1.0, 1.2, 1.5, 1.8, 2.2, 2.7,
        3.3, 3.9, 4.7, 5.6, 6.8, 8.2, and their multiples of 10) that resistor manufacturers actually stock, so
        rounding your calculated value to the nearest E12 value gives you a resistor you can realistically buy.
      </Typography>
      <Typography variant="h3">What wattage rating does the resistor need?</Typography>
      <Typography variant="body1">
        Power dissipated is I² × R. Most small-signal LED circuits need well under a quarter watt, so a
        standard 1/4W resistor is usually sufficient, but always check the calculated power against your
        resistor&apos;s rated wattage, especially at higher currents.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/led-resistor-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField label="Supply Voltage (V)" type="number" fullWidth value={supplyVoltage} onChange={(e) => setSupplyVoltage(e.target.value)} onFocus={(e) => e.target.select()} />
          <TextField label="LED Forward Voltage (V)" type="number" fullWidth value={ledVoltage} onChange={(e) => setLedVoltage(e.target.value)} onFocus={(e) => e.target.select()} />
          <TextField label="LED Forward Current (mA)" type="number" fullWidth value={ledCurrent} onChange={(e) => setLedCurrent(e.target.value)} onFocus={(e) => e.target.select()} />
        </Box>

        <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'action.hover', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {result ? (
            'error' in result ? (
              <Typography variant="body1" color="error">{result.error}</Typography>
            ) : (
              <>
                <Typography variant="body2" color="text.secondary">Required Resistance</Typography>
                <Typography variant="h4" fontWeight={800} color="primary.main">{result.resistance.toFixed(1)} Ω</Typography>
                <Typography variant="body2" color="text.secondary" mt={2}>Nearest Standard Value</Typography>
                <Typography variant="h5" fontWeight={700}>{result.nearest} Ω</Typography>
                <Typography variant="body2" color="text.secondary" mt={2}>
                  Power dissipation: {result.powerW.toFixed(3)} W (calculated) / {result.nearestPowerW.toFixed(3)} W (nearest value)
                </Typography>
              </>
            )
          ) : (
            <Typography variant="body1" color="text.secondary">Enter valid voltages and current to calculate</Typography>
          )}
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default LedResistorCalculator;
