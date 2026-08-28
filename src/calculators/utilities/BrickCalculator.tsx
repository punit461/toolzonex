'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const BRICK_LENGTH = 8; // inches
const BRICK_HEIGHT = 4; // inches

const BrickCalculatorContent = () => {
  const [length, setLength] = useState<string>('10');
  const [height, setHeight] = useState<string>('10');
  const [thickness, setThickness] = useState<string>('9');
  const [mortar, setMortar] = useState<string>('0.375');
  const [wastage, setWastage] = useState<string>('5');

  const wallLength = parseFloat(length) || 0;
  const wallHeight = parseFloat(height) || 0;
  const wallThickness = parseFloat(thickness) || 0;
  const mortarIn = parseFloat(mortar) || 0;
  const wastagePct = parseFloat(wastage) || 0;

  const wallAreaFt2 = wallLength * wallHeight;
  const wallVolFt3 = wallAreaFt2 * (wallThickness / 12);
  const mortarFt3 = wallVolFt3 * 0.7; // 30% of gross wall is mortar
  const brickUnitVolFt3 = ((BRICK_LENGTH + mortarIn) / 12) * ((BRICK_HEIGHT + mortarIn) / 12) * (wallThickness / 12);
  const bricksNoMortar = brickUnitVolFt3 > 0 ? wallVolFt3 / brickUnitVolFt3 : 0;
  const bricksWithWastage = bricksNoMortar * (1 + wastagePct / 100);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Wall Length (ft)"
          type="number"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          fullWidth
        />
        <TextField
          label="Wall Height (ft)"
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          fullWidth
        />
        <TextField
          label="Wall Thickness (inches)"
          type="number"
          value={thickness}
          onChange={(e) => setThickness(e.target.value)}
          fullWidth
        />
        <TextField
          label="Mortar Thickness (inches)"
          type="number"
          value={mortar}
          onChange={(e) => setMortar(e.target.value)}
          fullWidth
        />
        <TextField
          label="Wastage (%)"
          type="number"
          value={wastage}
          onChange={(e) => setWastage(e.target.value)}
          fullWidth
        />

        <Paper variant="outlined" sx={{ p: 2, bgcolor: 'action.hover' }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
            Bricks = Volume of Wall ÷ Volume per Brick (with mortar)
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace', mt: 0.5 }}>
            Wall volume = {wallAreaFt2.toFixed(2)} ft² × {wallThickness} in ÷ 12 = {wallVolFt3.toFixed(2)} ft³
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
            {Math.ceil(bricksWithWastage)} bricks
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            Total incl. wastage
          </Typography>
          <Box sx={{ mt: 3, width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>Bricks (no wastage)</Typography>
              <Typography variant="body2" fontWeight="bold">{Math.ceil(bricksNoMortar)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>Mortar Volume</Typography>
              <Typography variant="body2" fontWeight="bold">{mortarFt3.toFixed(2)} ft³</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>Wastage Added</Typography>
              <Typography variant="body2" fontWeight="bold">+{wastagePct}%</Typography>
            </Box>
          </Box>
        </Paper>

        <Paper variant="outlined" sx={{ mt: 3, p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Wall Area</Typography>
            <Typography variant="body2" fontWeight="bold">{wallAreaFt2.toFixed(2)} ft²</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Brick Size (with mortar)</Typography>
            <Typography variant="body2" fontWeight="bold">8.375 × 4.375 × {thickness} in</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">Mortar Volume</Typography>
            <Typography variant="body2" fontWeight="bold">{mortarFt3.toFixed(2)} ft³</Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

const BrickCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How Does the Brick Calculator Work?</Typography>
      <Typography variant="body1">
        This calculator assumes the standard Indian brick size of 8 in × 4 in × 2.5 in (approximately 190 mm ×
        90 mm × 90 mm), laid with a mortar joint. It finds the gross wall volume, subtracts the volume taken
        up by mortar (assumed at 30% of the gross wall), and divides by the volume of one brick including its
        mortar joint to get the number of bricks needed. A user-defined wastage percentage is then added for
        breakage and cutting losses.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        For a wall 10 ft long, 10 ft high, and 9 inches thick: the wall volume is 100 ft² × 0.75 ft = 75 ft³.
        With 30% mortar, brick volume is 75 × 0.70 = 52.5 ft³. Each brick with a 0.375-inch mortar joint takes
        (8.375 × 4.375 × 9) / 12³ = 0.19 ft³. So about 52.5 / 0.19 = 276 bricks are needed, or roughly 290
        bricks with a 5% wastage allowance.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating brick quantities for house walls and boundary walls in India.</li>
          <li>Planning material orders for single- or multi-storey construction.</li>
          <li>Comparing brick, sand, and cement needs for a masonry project.</li>
          <li>Rough cost estimation before finalising quotes with contractors.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why is the 8 in × 4 in × 2.5 in brick assumed?</Typography>
      <Typography variant="body1">
        This is the standard brick size used across India (approximately 190 mm × 90 mm × 90 mm), commonly
        known as the Indian standard brick. Regional sizes vary slightly, so results are an estimate rather
        than an exact count.
      </Typography>
      <Typography variant="h3">How much mortar does one cubic foot of wall need?</Typography>
      <Typography variant="body1">
        Roughly 30% of the gross wall volume is mortar for a typical 1:6 cement-sand mix. The calculator uses
        this assumption to give practical material quantities for planning.
      </Typography>
      <Typography variant="h3">Why add wastage?</Typography>
      <Typography variant="body1">
        Bricks break during transport, handling, and cutting at openings like doors and windows. A 5% wastage
        allowance is common; add more for complex layouts or rough transport conditions.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/brick-calculator" content={content}>
      <BrickCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BrickCalculator;