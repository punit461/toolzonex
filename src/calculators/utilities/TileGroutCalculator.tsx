'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const WASTE_FACTOR = 1.1;
const LB_PER_CUBIC_INCH = 0.075;

const TileGroutCalculator = () => {
  const [area, setArea] = useState<string>('100');
  const [tileLength, setTileLength] = useState<string>('12');
  const [tileWidth, setTileWidth] = useState<string>('12');
  const [jointWidth, setJointWidth] = useState<string>('0.125');
  const [jointDepth, setJointDepth] = useState<string>('0.375');

  const result = useMemo(() => {
    const a = parseFloat(area);
    const tl = parseFloat(tileLength);
    const tw = parseFloat(tileWidth);
    const jw = parseFloat(jointWidth);
    const jd = parseFloat(jointDepth);
    if ([a, tl, tw, jw, jd].some((v) => Number.isNaN(v) || v <= 0)) return null;

    const volumeCubicIn = a * 144 * jw * jd * ((tl + tw) / (tl * tw));
    const weightLb = volumeCubicIn * LB_PER_CUBIC_INCH;
    const recommendedLb = weightLb * WASTE_FACTOR;
    return { volumeCubicIn, weightLb, recommendedLb };
  }, [area, tileLength, tileWidth, jointWidth, jointDepth]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Tile Grout Calculator</Typography>
      <Typography variant="body1">
        Enter the area you&apos;re tiling, your tile&apos;s length and width, and your grout joint&apos;s
        width and depth to estimate how much grout you&apos;ll need. This uses a standard simplified DIY
        approximation that scales grout volume with the ratio of joint length to tile area, then converts
        that volume to weight using a typical sanded-grout density, plus a 10% buffer for waste and
        inconsistent application.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.85rem' }}>
        Volume (in³) = Area(sqft) × 144 × Joint Width × Joint Depth × [(Tile L + Tile W) / (Tile L × Tile W)]
        <br />
        Weight (lb) = Volume × 0.075, then +10% for waste
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        For a 100 sq ft floor of 12&quot; × 12&quot; tiles with a 0.125&quot; (⅛&quot;) wide, 0.375&quot;
        (⅜&quot;) deep joint: Volume = 100 × 144 × 0.125 × 0.375 × (24 / 144) ≈ 112.5 in³. That&apos;s about
        112.5 × 0.075 ≈ 8.4 lb of grout, or roughly 9.3 lb recommended after adding the 10% waste buffer.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating how many bags or how much boxed grout to buy before starting a tiling job.</li>
          <li>Comparing grout needs between different tile sizes or joint widths before choosing a layout.</li>
          <li>Budgeting material costs for a bathroom, kitchen, or floor tiling project.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How accurate is this estimate?</strong> This is a simplified DIY approximation, not a precision spec sheet figure. Actual grout consumption varies by product density (sanded vs. unsanded, epoxy vs. cementitious), how tightly the grout is packed into the joints, and application technique, so treat the result as a helpful estimate rather than an exact requirement.</li>
          <li><strong>Should I round up when buying grout?</strong> Yes — always round up to the next full bag or box size. This calculator already adds a 10% buffer on top of the raw calculated weight, but running short mid-job is far more disruptive than having a small amount left over.</li>
          <li><strong>Does grout joint depth really matter that much?</strong> Yes — grout volume scales directly with joint depth, which typically equals your tile's thickness. A thicker tile with a deeper joint uses noticeably more grout than a thin tile with a shallow joint, even at the same joint width and floor area.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/tile-grout-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Area to Tile" type="number" value={area}
            onChange={(e) => setArea(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">sq ft</InputAdornment> } }}
          />
          <TextField
            label="Tile Length" type="number" value={tileLength}
            onChange={(e) => setTileLength(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">in</InputAdornment> } }}
          />
          <TextField
            label="Tile Width" type="number" value={tileWidth}
            onChange={(e) => setTileWidth(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">in</InputAdornment> } }}
          />
          <TextField
            label="Grout Joint Width" type="number" value={jointWidth}
            onChange={(e) => setJointWidth(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">in</InputAdornment> } }}
          />
          <TextField
            label="Joint Depth (Tile Thickness)" type="number" value={jointDepth}
            onChange={(e) => setJointDepth(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">in</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Recommended to Buy (with 10% waste)</Typography>
            <Typography variant="h3" fontWeight="bold">{result ? `${result.recommendedLb.toFixed(1)} lb` : '—'}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Estimated Grout Weight</Typography>
            <Typography fontWeight={600}>{result ? `${result.weightLb.toFixed(1)} lb` : '—'}</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TileGroutCalculator;
