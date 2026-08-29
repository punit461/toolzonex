'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(n);

const BondYieldCalculator = () => {
  const [faceValue, setFaceValue] = useState('1000');
  const [couponRate, setCouponRate] = useState('5');
  const [price, setPrice] = useState('950');
  const [yearsToMaturity, setYearsToMaturity] = useState('10');

  const { annualCoupon, currentYield, ytm } = useMemo(() => {
    const fv = parseFloat(faceValue) || 0;
    const cr = parseFloat(couponRate) || 0;
    const p = parseFloat(price) || 0;
    const n = parseFloat(yearsToMaturity) || 0;

    const coupon = fv * (cr / 100);
    const cy = p > 0 ? (coupon / p) * 100 : 0;

    let ytmApprox = 0;
    if (n > 0 && (fv + p) > 0) {
      ytmApprox = ((coupon + (fv - p) / n) / ((fv + p) / 2)) * 100;
    }

    return { annualCoupon: coupon, currentYield: cy, ytm: ytmApprox };
  }, [faceValue, couponRate, price, yearsToMaturity]);

  const content = (
    <>
      <Typography variant="h2">How Bond Yield Is Calculated</Typography>
      <Typography variant="body1">
        Enter a bond&apos;s face value, coupon rate, current market price, and years remaining to maturity to
        see its current yield and an approximate yield to maturity (YTM). Current yield only looks at the
        income relative to what you&apos;d pay today, while YTM approximates the total return if the bond is
        held until it matures, including the gain or loss from buying below or above face value.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Current Yield = Annual Coupon ÷ Current Price
        <br />
        Approx. YTM = [Coupon + (Face Value − Price) ÷ Years] ÷ [(Face Value + Price) ÷ 2]
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A bond with a $1,000 face value, 5% coupon rate, trading at $950, with 10 years to maturity pays a
        $50 annual coupon. Current yield = 50 ÷ 950 = 5.26%. The approximate YTM, which also accounts for the
        $50 capital gain earned by maturity, comes out to roughly 5.64%.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Comparing income return across bonds trading at different prices.</li>
          <li>Estimating total expected return if a bond is held to maturity.</li>
          <li>Deciding whether a discounted or premium bond offers better value.</li>
          <li>Screening fixed-income investments before deeper due diligence.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why is current yield different from the coupon rate?</Typography>
      <Typography variant="body1">
        The coupon rate is fixed against the bond&apos;s face value, but current yield is based on the price
        you actually pay. If a bond trades below face value, its current yield is higher than the coupon
        rate, and vice versa for a bond trading above face value.
      </Typography>
      <Typography variant="h3">Is the YTM approximation exact?</Typography>
      <Typography variant="body1">
        No — it&apos;s a widely used simplified formula. The precise YTM requires solving for the discount
        rate that equates the bond&apos;s price to the present value of all future cash flows, which normally
        needs iterative calculation or financial software.
      </Typography>
      <Typography variant="h3">What does it mean if a bond trades at a discount?</Typography>
      <Typography variant="body1">
        A bond trading below its face value (a discount) will return the face value at maturity, adding a
        capital gain on top of coupon payments — which is why its YTM is higher than its current yield.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/bond-yield-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Face Value"
            type="number"
            value={faceValue}
            onChange={(e) => setFaceValue(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Coupon Rate"
            type="number"
            value={couponRate}
            onChange={(e) => setCouponRate(e.target.value)}
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
          />
          <TextField
            label="Current Market Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Years to Maturity"
            type="number"
            value={yearsToMaturity}
            onChange={(e) => setYearsToMaturity(e.target.value)}
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">Yr</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Current Yield</Typography>
            <Typography variant="h3" fontWeight="bold">{currentYield.toFixed(2)}%</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 2, textAlign: 'center', bgcolor: 'secondary.main', color: 'white' }}>
            <Typography variant="body2">Approx. Yield to Maturity</Typography>
            <Typography variant="h5" fontWeight="bold">{ytm.toFixed(2)}%</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Annual Coupon Payment</Typography>
            <Typography fontWeight={600}>{fmt(annualCoupon)}</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BondYieldCalculator;
