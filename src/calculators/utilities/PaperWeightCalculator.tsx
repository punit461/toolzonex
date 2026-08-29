'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const PRESETS: Record<string, { label: string; widthMm: number; heightMm: number }> = {
  a4: { label: 'A4 (210 × 297 mm)', widthMm: 210, heightMm: 297 },
  a3: { label: 'A3 (297 × 420 mm)', widthMm: 297, heightMm: 420 },
  a5: { label: 'A5 (148 × 210 mm)', widthMm: 148, heightMm: 210 },
  letter: { label: 'US Letter (215.9 × 279.4 mm)', widthMm: 215.9, heightMm: 279.4 },
  legal: { label: 'US Legal (215.9 × 355.6 mm)', widthMm: 215.9, heightMm: 355.6 },
  custom: { label: 'Custom', widthMm: 210, heightMm: 297 },
};

const PaperWeightCalculator = () => {
  const [preset, setPreset] = useState<string>('a4');
  const [widthMm, setWidthMm] = useState<string>('210');
  const [heightMm, setHeightMm] = useState<string>('297');
  const [gsm, setGsm] = useState<string>('80');
  const [sheets, setSheets] = useState<string>('500');

  const handlePresetChange = (key: string) => {
    setPreset(key);
    if (key !== 'custom') {
      setWidthMm(PRESETS[key].widthMm.toString());
      setHeightMm(PRESETS[key].heightMm.toString());
    }
  };

  const { totalGrams, totalKg, totalLb, perSheetGrams } = useMemo(() => {
    const w = parseFloat(widthMm);
    const h = parseFloat(heightMm);
    const g = parseFloat(gsm);
    const n = parseFloat(sheets);
    if ([w, h, g, n].some((x) => isNaN(x) || x <= 0)) {
      return { totalGrams: 0, totalKg: 0, totalLb: 0, perSheetGrams: 0 };
    }
    const areaM2 = (w / 1000) * (h / 1000);
    const perSheet = g * areaM2;
    const total = perSheet * n;
    return { totalGrams: total, totalKg: total / 1000, totalLb: (total / 1000) * 2.20462, perSheetGrams: perSheet };
  }, [widthMm, heightMm, gsm, sheets]);

  const content = (
    <>
      <Typography variant="h2">How to Calculate Paper Weight</Typography>
      <Typography variant="body1">
        GSM (grams per square meter) tells you the weight of a single square meter of paper, regardless of
        sheet size. To find the total weight of a stack, multiply the GSM by the paper&apos;s area in square
        meters to get the weight of one sheet, then multiply by the number of sheets.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Total Weight (g) = GSM × Area (m²) × Number of Sheets
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A ream of 500 sheets of A4 paper (210 × 297 mm, area 0.0623 m²) at 80 GSM weighs 80 × 0.0623 × 500 ≈
        2,494 grams, or about 2.49 kg — close to the roughly 2.5 kg you&apos;d expect from a typical office
        paper ream.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating shipping weight for a box of printed documents or paper stock.</li>
          <li>Comparing the weight of different paper sizes or GSM grades for a print job.</li>
          <li>Checking postage costs based on the total weight of a paper document or booklet.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What GSM should I use for typical office paper?</Typography>
      <Typography variant="body1">
        Standard copy/printer paper is usually 70-90 GSM. Cardstock and cover stock run from around 150 to 300+
        GSM, while lightweight paper like newsprint can be as low as 45-52 GSM.
      </Typography>
      <Typography variant="h3">Why does paper size matter if GSM already measures weight?</Typography>
      <Typography variant="body1">
        GSM is a weight-per-area measure, not a fixed sheet weight — a larger sheet at the same GSM weighs more
        because it has more area. That&apos;s why this calculator needs both the GSM and the exact paper
        dimensions to compute the actual weight of each sheet.
      </Typography>
      <Typography variant="h3">Can I use this for non-standard paper sizes?</Typography>
      <Typography variant="body1">
        Yes — select &quot;Custom&quot; from the size dropdown and enter your own width and height in
        millimeters; the same GSM formula applies to any rectangular sheet size.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/paper-weight-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Paper Size</InputLabel>
            <Select value={preset} label="Paper Size" onChange={(e) => handlePresetChange(e.target.value)}>
              {Object.entries(PRESETS).map(([key, p]) => (
                <MenuItem key={key} value={key}>{p.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Width (mm)"
              type="number"
              fullWidth
              value={widthMm}
              onChange={(e) => { setWidthMm(e.target.value); setPreset('custom'); }}
              onFocus={(e) => e.target.select()}
            />
            <TextField
              label="Height (mm)"
              type="number"
              fullWidth
              value={heightMm}
              onChange={(e) => { setHeightMm(e.target.value); setPreset('custom'); }}
              onFocus={(e) => e.target.select()}
            />
          </Box>
          <TextField label="GSM (g/m²)" type="number" fullWidth value={gsm} onChange={(e) => setGsm(e.target.value)} onFocus={(e) => e.target.select()} />
          <TextField label="Number of Sheets" type="number" fullWidth value={sheets} onChange={(e) => setSheets(e.target.value)} onFocus={(e) => e.target.select()} />
        </Box>

        <Paper variant="outlined" sx={{ p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2 }}>
          <Box textAlign="center">
            <Typography variant="body2" color="text.secondary">Weight per Sheet</Typography>
            <Typography variant="h6" fontWeight={700}>{perSheetGrams.toLocaleString(undefined, { maximumFractionDigits: 3 })} g</Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="body2" color="text.secondary">Total Weight</Typography>
            <Typography variant="h3" color="primary" fontWeight={800}>
              {totalGrams.toLocaleString(undefined, { maximumFractionDigits: 1 })} g
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              {totalKg.toLocaleString(undefined, { maximumFractionDigits: 3 })} kg &nbsp;|&nbsp; {totalLb.toLocaleString(undefined, { maximumFractionDigits: 3 })} lb
            </Typography>
          </Box>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PaperWeightCalculator;
