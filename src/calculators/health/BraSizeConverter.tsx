'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Region = 'us' | 'uk' | 'eu' | 'intl';

const CUP_LETTERS_US = ['AA', 'A', 'B', 'C', 'D', 'DD', 'DDD', 'G', 'H', 'I', 'J'];
const CUP_LETTERS_UK = ['AA', 'A', 'B', 'C', 'D', 'DD', 'E', 'F', 'FF', 'G', 'H'];
const CUP_LETTERS_EU = ['AA', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];

const US_BANDS = [28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48];

function usBandToEu(usBand: number) {
  return Math.round((2.5 * usBand - 10) / 5) * 5;
}

function euBandToUs(euBand: number) {
  return Math.round((euBand + 10) / 2.5 / 2) * 2;
}

const BraSizeConverter = () => {
  const [region, setRegion] = useState<Region>('us');
  const [band, setBand] = useState<string>('34');
  const [cupIndex, setCupIndex] = useState<number>(2);

  const result = useMemo(() => {
    const enteredBand = parseFloat(band) || 0;
    if (enteredBand <= 0) return null;

    let usBand: number;
    if (region === 'us' || region === 'uk') {
      usBand = enteredBand;
    } else {
      usBand = euBandToUs(enteredBand);
    }

    const euBand = usBandToEu(usBand);

    return {
      us: { band: usBand, cup: CUP_LETTERS_US[cupIndex] ?? '' },
      uk: { band: usBand, cup: CUP_LETTERS_UK[cupIndex] ?? '' },
      eu: { band: euBand, cup: CUP_LETTERS_EU[cupIndex] ?? '' },
      intl: { band: euBand, cup: CUP_LETTERS_EU[cupIndex] ?? '' },
    };
  }, [region, band, cupIndex]);

  const cupLettersForRegion = region === 'us' ? CUP_LETTERS_US : region === 'uk' ? CUP_LETTERS_UK : CUP_LETTERS_EU;

  const content = (
    <>
      <Typography variant="h2">How to Use the Bra Size Converter</Typography>
      <Typography variant="body1">
        Select your region (US, UK, EU, or International), then choose your band size and cup letter. The
        converter shows the equivalent size across all four regions at once, using standard band-size and
        cup-letter conversion conventions.
      </Typography>

      <Typography variant="h2">How Band and Cup Conversions Work</Typography>
      <Typography variant="body1">
        <strong>Band size</strong> converts using a standard offset formula: European and International band
        sizes are measured in centimeters, so a US/UK band size (measured in inches) of 34 becomes roughly
        75 in EU/International sizing. <strong>Cup letters</strong> shift between regions too — a US cup letter
        typically corresponds to the same UK letter for most sizes, but shifts one letter higher in EU/
        International sizing (for example, a US B cup is roughly a EU C cup).
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A US 34B converts to approximately a UK 34B, and a EU/International 75C.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Shopping from an international lingerie retailer that lists sizes in a different region's system.</li>
          <li>Understanding how your usual size translates while traveling or ordering from abroad.</li>
          <li>Comparing sizing conventions between US/UK and Continental European brands.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Are bra size conversions exact across brands?</Typography>
      <Typography variant="body1">
        No — bra sizing conventions vary meaningfully between manufacturers and even between styles from the
        same brand, since there's no single global sizing standard enforced across the industry. This converter
        applies widely used standard conversion rules as a reliable starting point, but the best way to confirm
        fit is always to try the garment on or check the specific brand's own size chart.
      </Typography>
      <Typography variant="h3">Why do band sizes look so different between US and EU?</Typography>
      <Typography variant="body1">
        US and UK band sizes are based on an inch measurement (with an offset), while EU and International band
        sizes are based directly on the underbust measurement in centimeters, which is why the numbers look
        very different (like 34 vs. 75) even though they describe the same fit.
      </Typography>
      <Typography variant="h3">Why does the cup letter change between regions for the same fit?</Typography>
      <Typography variant="body1">
        Different regions historically developed their own cup-lettering conventions, so the same physical cup
        volume can carry a different letter depending on the sizing system — EU/International sizing generally
        runs one cup letter higher than the equivalent US letter.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/health/bra-size-converter" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <FormControl fullWidth>
            <InputLabel id="bra-region">Region</InputLabel>
            <Select labelId="bra-region" label="Region" value={region} onChange={(e) => setRegion(e.target.value as Region)}>
              <MenuItem value="us">US</MenuItem>
              <MenuItem value="uk">UK</MenuItem>
              <MenuItem value="eu">EU</MenuItem>
              <MenuItem value="intl">International</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Band Size"
            fullWidth
            type="number"
            onFocus={(e) => e.target.select()}
            value={band}
            onChange={(e) => setBand(e.target.value)}
          />

          <FormControl fullWidth>
            <InputLabel id="bra-cup">Cup</InputLabel>
            <Select
              labelId="bra-cup"
              label="Cup"
              value={cupIndex}
              onChange={(e) => setCupIndex(Number(e.target.value))}
            >
              {cupLettersForRegion.map((letter, idx) => (
                <MenuItem key={letter} value={idx}>{letter}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {(region === 'us' || region === 'uk') && (
            <FormControl fullWidth>
              <InputLabel id="bra-band-preset">Common Band Sizes</InputLabel>
              <Select
                labelId="bra-band-preset"
                label="Common Band Sizes"
                value=""
                onChange={(e) => setBand(String(e.target.value))}
                displayEmpty
              >
                <MenuItem value="" disabled>Quick pick…</MenuItem>
                {US_BANDS.map((b) => (
                  <MenuItem key={b} value={String(b)}>{b}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight="600" mb={2}>Converted Sizes</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {(['us', 'uk', 'eu', 'intl'] as Region[]).map((key) => (
              <Paper
                key={key}
                sx={{
                  p: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  bgcolor: key === region ? 'primary.main' : 'background.paper',
                  color: key === region ? 'white' : 'text.primary',
                }}
              >
                <Typography variant="h6">
                  {key === 'us' ? 'US' : key === 'uk' ? 'UK' : key === 'eu' ? 'EU' : 'International'}
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {result ? `${result[key].band}${result[key].cup}` : '—'}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BraSizeConverter;
