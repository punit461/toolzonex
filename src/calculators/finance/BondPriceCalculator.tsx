'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

const BondPriceCalculator = () => {
  const [faceValue, setFaceValue] = useState('1000');
  const [couponRate, setCouponRate] = useState('5');
  const [marketRate, setMarketRate] = useState('6');
  const [years, setYears] = useState('10');

  const result = useMemo(() => {
    const F = parseFloat(faceValue) || 0;
    const c = (parseFloat(couponRate) || 0) / 100;
    const r = (parseFloat(marketRate) || 0) / 100;
    const n = parseFloat(years) || 0;
    const coupon = F * c;

    const rows: { year: number; coupon: number; pv: number }[] = [];
    let pvCoupons = 0;
    const maxRows = Math.min(n, 50);
    for (let t = 1; t <= maxRows; t++) {
      const pv = r > 0 ? coupon / Math.pow(1 + r, t) : coupon;
      pvCoupons += pv;
      rows.push({ year: t, coupon, pv });
    }
    if (n > maxRows && r > 0) {
      for (let t = maxRows + 1; t <= n; t++) {
        pvCoupons += coupon / Math.pow(1 + r, t);
      }
    } else if (n > maxRows) {
      pvCoupons += coupon * (n - maxRows);
    }

    const pvFace = r > 0 ? F / Math.pow(1 + r, n) : F;
    const price = pvCoupons + pvFace;
    const premiumDiscount = price - F;

    return { price, pvCoupons, pvFace, premiumDiscount, coupon, rows };
  }, [faceValue, couponRate, marketRate, years]);

  const content = (
    <>
      <Typography variant="h2">How Bond Price Is Calculated</Typography>
      <Typography variant="body1">
        A bond&apos;s price is the present value of all the cash flows it pays: the periodic coupon
        payments plus the face value returned at maturity, each discounted back to today using the
        market (yield) rate. When the coupon rate matches the market rate, the bond prices at par —
        equal to its face value. When the market rate is higher than the coupon rate, the bond trades
        at a discount; when it&apos;s lower, the bond trades at a premium.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Price = Σ [Coupon / (1 + r)^t] + Face Value / (1 + r)^n
        <br />
        Where r = market discount rate, n = years to maturity
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A $1,000 face-value bond with a 5% annual coupon and 10 years to maturity, discounted at a 6%
        market rate, prices at roughly $926 — a discount to face value, because the market demands a
        higher yield than the bond&apos;s stated coupon offers. If the market rate instead fell to 4%,
        the same bond would price above $1,000, at a premium.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating what a bond is worth today given current market interest rates.</li>
          <li>Understanding why bond prices move inversely to interest rates.</li>
          <li>Comparing bonds with different coupon rates and maturities on a like-for-like basis.</li>
          <li>Evaluating whether a bond is trading at a premium, discount, or par.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why do bond prices fall when interest rates rise?</Typography>
      <Typography variant="body1">
        A bond&apos;s coupon payments are fixed once issued. When market rates rise, new bonds offer
        higher coupons, so existing bonds with lower fixed coupons become less attractive and must
        trade at a lower price to offer a competitive yield.
      </Typography>
      <Typography variant="h3">What does trading at a premium or discount mean?</Typography>
      <Typography variant="body1">
        A bond trades at a premium when its price is above face value (coupon rate higher than market
        rate) and at a discount when its price is below face value (coupon rate lower than market
        rate). At par, the coupon rate equals the market rate exactly.
      </Typography>
      <Typography variant="h3">Does this assume annual coupon payments?</Typography>
      <Typography variant="body1">
        Yes, this calculator assumes one coupon payment per year for simplicity. Many bonds pay
        semi-annually, which slightly changes the exact price but follows the same discounting
        principle applied to each smaller, more frequent payment.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/bond-price-calculator" content={content}>
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
            label="Annual Coupon Rate"
            type="number"
            value={couponRate}
            onChange={(e) => setCouponRate(e.target.value)}
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
          />
          <TextField
            label="Market (Discount) Rate"
            type="number"
            value={marketRate}
            onChange={(e) => setMarketRate(e.target.value)}
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
          />
          <TextField
            label="Years to Maturity"
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            fullWidth
          />
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Bond Price</Typography>
            <Typography variant="h3" fontWeight="bold">{fmt(result.price)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>PV of Coupons</Typography>
            <Typography fontWeight={600}>{fmt(result.pvCoupons)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>PV of Face Value</Typography>
            <Typography fontWeight={600}>{fmt(result.pvFace)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Premium / (Discount)</Typography>
            <Typography fontWeight={600} color={result.premiumDiscount >= 0 ? 'success.main' : 'error.main'}>
              {fmt(result.premiumDiscount)}
            </Typography>
          </Paper>
        </Box>
      </Box>

      {result.rows.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" fontWeight={600} mb={1}>Coupon Schedule (Present Value)</Typography>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Year</TableCell>
                  <TableCell align="right">Coupon Payment</TableCell>
                  <TableCell align="right">Present Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {result.rows.map((row) => (
                  <TableRow key={row.year}>
                    <TableCell>{row.year}</TableCell>
                    <TableCell align="right">{fmt(row.coupon)}</TableCell>
                    <TableCell align="right">{fmt(row.pv)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BondPriceCalculator;
