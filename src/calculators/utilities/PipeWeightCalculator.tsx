'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Select, MenuItem, FormControl, InputLabel, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const MATERIALS = [
  { label: 'Steel (7850 kg/m³)', density: 7850 },
  { label: 'Carbon Steel', density: 7850 },
  { label: 'Aluminum (2700 kg/m³)', density: 2700 },
  { label: 'PVC (1400 kg/m³)', density: 1400 },
  { label: 'Copper (8940 kg/m³)', density: 8940 },
  { label: 'Stainless Steel (8000 kg/m³)', density: 8000 },
];

const PipeWeightCalculatorContent = () => {
  const [outerDia, setOuterDia] = useState<string>('4');
  const [wall, setWall] = useState<string>('0.25');
  const [length, setLength] = useState<string>('10');
  const [materialIdx, setMaterialIdx] = useState<number>(0);

  const od = parseFloat(outerDia) || 0;
  const wt = parseFloat(wall) || 0;
  const len = parseFloat(length) || 0;
  const material = MATERIALS[materialIdx];

  const odM = od * 0.0254;
  const idM = (od - 2 * wt) * 0.0254;
  const lenM = len * 0.3048;

  const crossSectionalAreaM2 = (Math.PI / 4) * (odM * odM - idM * idM);
  const volumeM3 = crossSectionalAreaM2 * lenM;
  const weightKg = volumeM3 * material.density;
  const weightLbs = weightKg * 2.20462;
  const weightPerFoot = weightKg / len;
  const internalAreaM2 = (Math.PI / 4) * idM * idM;
  const waterVolumeM3 = internalAreaM2 * lenM;
  const waterWeightKg = waterVolumeM3 * 1000;
  const waterFilledKg = weightKg + waterWeightKg;

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Outer Diameter (inches)"
          type="number"
          value={outerDia}
          onChange={(e) => setOuterDia(e.target.value)}
          fullWidth
        />
        <TextField
          label="Wall Thickness (inches)"
          type="number"
          value={wall}
          onChange={(e) => setWall(e.target.value)}
          fullWidth
        />
        <TextField
          label="Length (ft)"
          type="number"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Material</InputLabel>
          <Select value={materialIdx} label="Material" onChange={(e) => setMaterialIdx(Number(e.target.value))}>
            {MATERIALS.map((m, i) => (
              <MenuItem key={i} value={i}>{m.label}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Paper variant="outlined" sx={{ p: 2, bgcolor: 'action.hover' }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
            Weight = Cross-sectional Wall Area × Length × Density
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace', mt: 0.5 }}>
            (π/4)({odM.toFixed(4)}² − {idM.toFixed(4)}²) × {lenM.toFixed(3)} × {material.density} kg/m³
          </Typography>
        </Paper>
      </Box>

      <Box>
        <Paper
          sx={{
            p: 4,
            bgcolor: 'primary.main',
            color: 'white',
            borderRadius: 4,
            minHeight: 200,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h3" fontWeight="bold">
            {weightKg.toFixed(2)} kg
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            {weightLbs.toFixed(2)} lbs
          </Typography>
          <Box sx={{ mt: 3, width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>Weight per Foot</Typography>
              <Typography variant="body2" fontWeight="bold">{weightPerFoot.toFixed(3)} kg/ft</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>Internal Water</Typography>
              <Typography variant="body2" fontWeight="bold">{waterWeightKg.toFixed(2)} kg</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>Filled (Pipe + Water)</Typography>
              <Typography variant="body2" fontWeight="bold">{waterFilledKg.toFixed(2)} kg</Typography>
            </Box>
          </Box>
        </Paper>

        <Paper variant="outlined" sx={{ mt: 3, p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Wall Cross-Sectional Area</Typography>
            <Typography variant="body2" fontWeight="bold">{crossSectionalAreaM2.toFixed(5)} m²</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Pipe Material Volume</Typography>
            <Typography variant="body2" fontWeight="bold">{volumeM3.toFixed(5)} m³</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">Internal Water Volume</Typography>
            <Typography variant="body2" fontWeight="bold">{waterVolumeM3.toFixed(5)} m³</Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

const PipeWeightCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How Does the Pipe Weight Calculator Work?</Typography>
      <Typography variant="body1">
        Enter the outer diameter, wall thickness, length, and material. The calculator finds the inner
        diameter, computes the cross-sectional area of the pipe wall as (π/4) × (OD² − ID²), multiplies it by
        the length to get material volume, and then by the material density to get weight. It also reports the
        weight per foot and the additional weight of water held in the pipe's interior.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        For a 10 ft steel pipe with a 4-inch outer diameter and 0.25-inch wall: OD = 0.1016 m, ID = 0.0889 m.
        Wall area = (π/4)(0.1016² − 0.0889²) = 0.0019 m². Material volume = 0.0019 × 3.048 = 0.0058 m³. At 7850
        kg/m³, the pipe weighs about 45.6 kg (100.5 lbs), roughly 4.56 kg per foot. Filled with water, it holds
        about 18.9 kg more.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating transport and lifting loads for pipe installations.</li>
          <li>Calculating structural load on supports, hangers, and brackets.</li>
          <li>Comparing weight between steel, aluminum, copper, and PVC options.</li>
          <li>Sizing pipe for water-filled service in plumbing and sprinkler systems.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is the difference between carbon steel and steel?</Typography>
      <Typography variant="body1">
        Carbon steel is the most common form of steel used in pipes, with a density very close to 7850 kg/m³ —
        the same value this calculator uses for both options. Stainless steel is slightly denser at about 8000
        kg/m³.
      </Typography>
      <Typography variant="h3">Does this include the weight of fittings and flanges?</Typography>
      <Typography variant="body1">
        No. The calculator estimates the bare pipe body only. Couplings, flanges, elbows, and valves add extra
        weight and should be accounted for separately in project planning.
      </Typography>
      <Typography variant="h3">Why does the water-filled weight matter?</Typography>
      <Typography variant="body1">
        A buried or supported pipe must carry not only its own weight but also the weight of the liquid inside.
        The water-filled value gives the realistic load for support and foundation design.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/pipe-weight-calculator" content={content}>
      <PipeWeightCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PipeWeightCalculator;