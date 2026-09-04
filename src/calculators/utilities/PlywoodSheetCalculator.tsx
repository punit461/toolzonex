'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const PlywoodSheetCalculator = () => {
  const [area, setArea] = useState<string>('320');
  const [sheetLength, setSheetLength] = useState<string>('8');
  const [sheetWidth, setSheetWidth] = useState<string>('4');
  const [wastePct, setWastePct] = useState<string>('10');

  const result = useMemo(() => {
    const a = parseFloat(area);
    const sl = parseFloat(sheetLength);
    const sw = parseFloat(sheetWidth);
    const waste = parseFloat(wastePct);
    if ([a, sl, sw].some((v) => Number.isNaN(v) || v <= 0) || Number.isNaN(waste) || waste < 0) return null;

    const sheetArea = sl * sw;
    const areaWithWaste = a * (1 + waste / 100);
    const sheetsNeeded = Math.ceil(areaWithWaste / sheetArea);
    return { sheetArea, areaWithWaste, sheetsNeeded };
  }, [area, sheetLength, sheetWidth, wastePct]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Plywood Sheet Calculator</Typography>
      <Typography variant="body1">
        Enter the total area you need to cover and your plywood sheet size (the standard is 4 ft × 8 ft, or
        32 sq ft, but you can override this for other standard sizes). Add a waste percentage to account for
        offcuts and mistakes — a default of 10% is applied before rounding up to the next whole sheet, since
        suppliers only sell in full sheets.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Sheets Needed = ⌈(Area × (1 + Waste %)) ÷ Sheet Area⌉
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Covering 320 sq ft with standard 4 ft × 8 ft (32 sq ft) sheets and a 10% waste allowance needs
        320 × 1.10 = 352 sq ft of material, so ⌈352 ÷ 32⌉ = 11 sheets — one more than the 10 sheets a
        no-waste calculation would suggest.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Ordering the right number of plywood sheets for subflooring, sheathing, or roof decking.</li>
          <li>Estimating material costs for a shed, deck, or renovation project before buying.</li>
          <li>Comparing sheet counts needed for different standard sheet sizes (4×8, 4×10, 5×5, etc).</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why should I add a waste percentage?</strong> Real-world cuts rarely use 100% of a sheet — layout constraints, damaged edges, and cutting around obstacles all create offcuts that can't be reused. A 10% allowance is a common starting point for straightforward rectangular layouts; more complex layouts with lots of cuts may need 15-20%.</li>
          <li><strong>Can I use this for other sheet materials like OSB or drywall?</strong> Yes — the calculation only depends on your sheet's length and width, so it works for any full-sheet building material sold in standard rectangular sizes, not just plywood. Just enter that material's sheet dimensions.</li>
          <li><strong>Why does the result always round up to a whole sheet?</strong> Suppliers sell plywood in whole sheets, not fractional pieces, so the calculator always rounds up (ceiling) rather than rounding to the nearest whole number — you can't buy 10.3 sheets, so it rounds to 11.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/plywood-sheet-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Area to Cover" type="number" value={area}
            onChange={(e) => setArea(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">sq ft</InputAdornment> } }}
          />
          <TextField
            label="Sheet Length" type="number" value={sheetLength}
            onChange={(e) => setSheetLength(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }}
          />
          <TextField
            label="Sheet Width" type="number" value={sheetWidth}
            onChange={(e) => setSheetWidth(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }}
          />
          <TextField
            label="Waste Allowance" type="number" value={wastePct}
            onChange={(e) => setWastePct(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
            helperText="Extra material to account for offcuts and mistakes (default 10%)"
          />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Sheets Needed</Typography>
            <Typography variant="h3" fontWeight="bold">{result ? result.sheetsNeeded : '—'}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Sheet Area</Typography>
            <Typography fontWeight={600}>{result ? `${result.sheetArea.toFixed(1)} sq ft` : '—'}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Area with Waste</Typography>
            <Typography fontWeight={600}>{result ? `${result.areaWithWaste.toFixed(1)} sq ft` : '—'}</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PlywoodSheetCalculator;
