'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, ToggleButton, ToggleButtonGroup, Grid } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Unit = 'cm' | 'in';

function letterSize(cm: number): string {
  if (cm < 53) return 'XXS';
  if (cm < 55) return 'XS';
  if (cm < 57) return 'S';
  if (cm < 59) return 'M';
  if (cm < 61) return 'L';
  if (cm < 63) return 'XL';
  return 'XXL';
}

const HatSizeConverter = () => {
  const [value, setValue] = useState('58');
  const [unit, setUnit] = useState<Unit>('cm');

  const result = useMemo(() => {
    const raw = parseFloat(value);
    if (isNaN(raw) || raw <= 0) return null;

    const cm = unit === 'cm' ? raw : raw * 2.54;
    const inches = cm / 2.54;

    // US/UK hat size: circumference in inches divided by pi, rounded to nearest 1/8.
    const usRaw = inches / Math.PI;
    const usRounded = Math.round(usRaw * 8) / 8;

    return {
      cm: cm.toFixed(1),
      inches: inches.toFixed(2),
      us: usRounded.toFixed(3).replace(/0+$/, '').replace(/\.$/, ''),
      uk: usRounded.toFixed(3).replace(/0+$/, '').replace(/\.$/, ''),
      letter: letterSize(cm),
    };
  }, [value, unit]);

  const content = (
    <>
      <Typography variant="h2">How the Hat Size Converter Works</Typography>
      <Typography variant="body1">
        Measure your head circumference (wrap a soft tape measure around the widest part of your head, just
        above the ears and eyebrows) and enter it in centimeters or inches. The converter gives you your US
        hat size, UK hat size, and an international letter size (XS through XXL), all at once.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        US Hat Size = (Circumference in inches ÷ π), rounded to nearest ⅛
      </Box>
      <Typography variant="body1">
        UK hat sizing uses the same numeric scale as US sizing in practice — a US 7¼ and a UK 7¼ describe the
        same head circumference, so both are shown as the same figure here. International letter sizes are
        based on standard published bands: roughly XS (53–54cm), S (55–56cm), M (57–58cm), L (59–60cm), XL
        (61–62cm), and XXL (63cm+), though exact bands can vary slightly by brand.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 58cm head circumference converts to about 22.83 inches, which divided by π gives a US/UK hat size
        of roughly 7¼, and falls in the &quot;M&quot; international letter size band.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Finding your correct hat size before ordering online from a US, UK, or European retailer.</li>
          <li>Converting a hat size you know from one sizing system to another.</li>
          <li>Buying a hat as a gift when you only have the recipient&apos;s head circumference measurement.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How do I measure my head circumference accurately?</strong> Wrap a soft measuring tape around your head about 1–2cm above your eyebrows and ears, at the widest point, keeping the tape snug but not tight.</li>
          <li><strong>Are US and UK hat sizes really the same number?</strong> In practical terms, yes — both traditionally use the same inches-based sizing scale (like 7, 7⅛, 7¼), so a given head circumference produces the same numeric size in each system. What differs more is letter-size bands used by different international brands.</li>
          <li><strong>Why do letter sizes sometimes not match my numeric size exactly?</strong> Letter-size bands (XS–XXL) are approximate ranges set by each hat maker, so borderline measurements can round differently between brands. Use the numeric size for the most precise fit when available.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/hat-size-converter" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Head Circumference"
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            fullWidth
          />
          <ToggleButtonGroup exclusive value={unit} onChange={(_, v) => v && setUnit(v)}>
            <ToggleButton value="cm">Centimeters</ToggleButton>
            <ToggleButton value="in">Inches</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box>
          {result ? (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">US Hat Size</Typography>
                  <Typography variant="h5" fontWeight={700}>{result.us}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">UK Hat Size</Typography>
                  <Typography variant="h5" fontWeight={700}>{result.uk}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">International Size</Typography>
                  <Typography variant="h5" fontWeight={700}>{result.letter}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">Circumference</Typography>
                  <Typography variant="h6" fontWeight={700}>{result.cm} cm / {result.inches} in</Typography>
                </Paper>
              </Grid>
            </Grid>
          ) : (
            <Typography color="text.secondary">Enter a valid head circumference.</Typography>
          )}
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default HatSizeConverter;
