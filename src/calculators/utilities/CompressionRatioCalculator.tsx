'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const CompressionRatioCalculatorContent = () => {
  const [bore, setBore] = useState('4.0');
  const [stroke, setStroke] = useState('3.48');
  const [chamberVolume, setChamberVolume] = useState('10');

  const result = useMemo(() => {
    const b = parseFloat(bore) || 0;
    const s = parseFloat(stroke) || 0;
    const cc = parseFloat(chamberVolume) || 0;

    const radius = b / 2;
    const displacementCubicIn = Math.PI * radius * radius * s;
    const displacementCc = displacementCubicIn * 16.3871;
    const compressionRatio = cc > 0 ? (displacementCc + cc) / cc : 0;

    return { displacementCubicIn, displacementCc, compressionRatio };
  }, [bore, stroke, chamberVolume]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Cylinder Bore Diameter" type="number" value={bore}
          onChange={(e) => setBore(e.target.value)} onFocus={(e) => e.target.select()}
          fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">in</InputAdornment> } }}
        />
        <TextField
          label="Stroke Length" type="number" value={stroke}
          onChange={(e) => setStroke(e.target.value)} onFocus={(e) => e.target.select()}
          fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">in</InputAdornment> } }}
        />
        <TextField
          label="Combustion Chamber Volume" type="number" value={chamberVolume}
          onChange={(e) => setChamberVolume(e.target.value)} onFocus={(e) => e.target.select()}
          fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">cc</InputAdornment> } }}
        />
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
        <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="body2">Compression Ratio</Typography>
          <Typography variant="h3" fontWeight="bold">{result.compressionRatio.toFixed(2)}:1</Typography>
        </Paper>
        <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Displacement Per Cylinder</Typography>
          <Typography fontWeight={600}>{result.displacementCc.toFixed(1)} cc</Typography>
        </Paper>
        <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Displacement Per Cylinder</Typography>
          <Typography fontWeight={600}>{result.displacementCubicIn.toFixed(2)} cu in</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

const CompressionRatioCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How the Engine Compression Ratio Calculator Works</Typography>
      <Typography variant="body1">
        Enter the cylinder&apos;s bore diameter, stroke length, and combustion chamber volume. The calculator
        first finds the swept volume (displacement) of one cylinder using the standard cylinder-volume formula,
        then compares the total volume (displacement plus chamber volume, at the bottom of the stroke) to the
        chamber volume alone (at the top of the stroke) to get the compression ratio.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Displacement = π × (Bore ÷ 2)² × Stroke<br />
        Compression Ratio = (Displacement + Chamber Volume) ÷ Chamber Volume
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A cylinder with a 4.0-inch bore and 3.48-inch stroke has a displacement of π × 2² × 3.48 ≈ 43.73 cubic
        inches, or about 716.7 cc. With a 10 cc combustion chamber, the compression ratio is (716.7 + 10) ÷ 10
        ≈ 72.7:1 — note how sensitive the ratio is to a small chamber volume, which is why real engines
        typically pair this displacement with a much larger chamber (60-90cc) to land in a realistic 8-11:1
        range.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking an engine build&apos;s compression ratio before choosing fuel octane requirements.</li>
          <li>Comparing how a different piston, head gasket, or deck height changes compression.</li>
          <li>Estimating displacement per cylinder from bore and stroke specs.</li>
          <li>Verifying manufacturer-listed compression ratio specs against measured dimensions.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is a typical compression ratio for a road car?</Typography>
      <Typography variant="body1">
        Most modern naturally aspirated gasoline engines run somewhere around 9:1 to 13:1, while
        turbocharged/supercharged engines often run lower (around 8:1 to 10:1) to avoid knock under boost.
        Diesel engines run much higher, typically 14:1 to 23:1, since they rely on compression alone to ignite
        the fuel.
      </Typography>
      <Typography variant="h3">Does this include the head gasket&apos;s volume?</Typography>
      <Typography variant="body1">
        This calculator uses a single combined &quot;combustion chamber volume&quot; figure, which in a full
        engine-building context should include the cylinder head&apos;s chamber volume, the head gasket&apos;s
        compressed volume, and any piston dish or dome volume together — measure or sum all of these into the
        chamber volume field for an accurate result.
      </Typography>
      <Typography variant="h3">Why does a higher compression ratio need higher-octane fuel?</Typography>
      <Typography variant="body1">
        Higher compression raises the temperature and pressure of the air-fuel mixture before ignition, which
        increases the risk of the fuel igniting prematurely (knock) instead of igniting cleanly from the spark.
        Higher-octane fuel resists that premature ignition, which is why high-compression engines are usually
        designed around higher-octane fuel requirements.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/compression-ratio-calculator" content={content}>
      <CompressionRatioCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CompressionRatioCalculator;
