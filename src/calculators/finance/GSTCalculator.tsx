'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, ToggleButtonGroup, ToggleButton, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

// Slabs from 22 September 2025 (GST Council, 56th meeting): 5% and 18% main
// rates, 40% for sin/luxury goods, 3% for gold and silver. 12% and 28% were
// removed for most goods; "Other rate" covers older invoices and special rates.
const GST_RATES = [0, 3, 5, 18, 40];

const GSTCalculator = () => {
  const [amount, setAmount] = useState<number>(1000);
  const [gstRate, setGstRate] = useState<number>(18);
  const [customRate, setCustomRate] = useState<string>('');
  const [mode, setMode] = useState<'add' | 'remove'>('add');

  const { baseAmount, totalGst, cgst, sgst, totalAmount } = useMemo(() => {
    let base = 0;
    let gst = 0;
    let total = 0;

    if (mode === 'add') {
      base = amount;
      gst = (amount * gstRate) / 100;
      total = amount + gst;
    } else {
      total = amount;
      base = amount / (1 + gstRate / 100);
      gst = total - base;
    }

    return {
      baseAmount: Math.round(base * 100) / 100,
      totalGst: Math.round(gst * 100) / 100,
      cgst: Math.round((gst / 2) * 100) / 100,
      sgst: Math.round((gst / 2) * 100) / 100,
      totalAmount: Math.round(total * 100) / 100,
    };
  }, [amount, gstRate, mode]);

  const content = (
    <>
      <Typography variant="h2">How to Calculate GST?</Typography>
      <Typography variant="body1">
        <strong>Adding GST:</strong><br />
        GST Amount = (Original Cost x GST Rate) / 100<br />
        Net Price = Original Cost + GST Amount
      </Typography>
      <br />
      <Typography variant="body1">
        <strong>Removing GST:</strong><br />
        GST Amount = Original Cost - [Original Cost x {'{100 / (100 + GST Rate)}'}]<br />
        Net Price = Original Cost - GST Amount
      </Typography>

      <Typography variant="h2">GST Slabs in India (from 22 September 2025)</Typography>
      <Typography variant="body1">
        India moved to two main GST rates, 5% and 18%, with a 40% rate for luxury and sin goods, from
        22 September 2025. The earlier 12% and 28% slabs were removed for most goods. Examples:
      </Typography>
      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', my: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Slab</strong></TableCell>
              <TableCell><strong>Common Items</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow><TableCell>0% (exempt)</TableCell><TableCell>Fresh milk, eggs, fresh fruit and vegetables; individual life and health insurance premiums</TableCell></TableRow>
            <TableRow><TableCell>3%</TableCell><TableCell>Gold and silver, including jewellery</TableCell></TableRow>
            <TableRow><TableCell>5%</TableCell><TableCell>Toilet soap, shampoo, hair oil, toothpaste, bicycles</TableCell></TableRow>
            <TableRow><TableCell>18%</TableCell><TableCell>Mobile phones, cement, air conditioners, small cars, motorcycles up to 350cc, most services</TableCell></TableRow>
            <TableRow><TableCell>40%</TableCell><TableCell>Aerated and caffeinated drinks, pan masala, motorcycles above 350cc</TableCell></TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="body2" color="text.secondary">
        Rates depend on the exact item or service (its HSN or SAC code), and some products have special rates. Check the
        current rate on the official CBIC GST site (cbic-gst.gov.in) before issuing an invoice.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A product priced at ₹1,000 (before tax) with 18% GST costs ₹1,180 after tax — ₹180 is the GST amount.
        Working backwards, a ₹1,180 GST-inclusive price has a base price of ₹1,000.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Adding GST to a base price when creating an invoice.</li>
          <li>Extracting the GST amount from a GST-inclusive price on a receipt.</li>
          <li>Checking which GST slab applies to a product or service.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What happened to the 12% and 28% GST rates?</Typography>
      <Typography variant="body1">
        From 22 September 2025, most goods in the 12% slab moved to 5% and most in the 28% slab moved to 18%, while
        luxury and sin goods moved to 40%. Invoices dated before then used the old rates. To check one, enter the
        old rate under &quot;Other rate&quot;.
      </Typography>
      <Typography variant="h3">What&apos;s the difference between CGST, SGST, and IGST?</Typography>
      <Typography variant="body1">
        For sales within a state, GST splits equally into CGST (central) and SGST (state). For inter-state
        sales, IGST applies instead, going to the central government and then apportioned to the destination state.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      url="/finance/gst-calculator"
      content={content}
    >
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Calculation Mode</Typography>
            <ToggleButtonGroup
              color="primary"
              value={mode}
              exclusive
              onChange={(_, value) => { if (value) setMode(value); }}
              fullWidth
              sx={{ mt: 1 }}
            >
              <ToggleButton value="add" sx={{ fontWeight: 600 }}>Add GST</ToggleButton>
              <ToggleButton value="remove" sx={{ fontWeight: 600 }}>Remove GST</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Amount (₹)</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              onFocus={(e) => e.target.select()}
              value={Number.isNaN(amount) ? '' : amount}
              onChange={(e) => setAmount(e.target.value === '' ? NaN : Number(e.target.value))}
              slotProps={{ htmlInput: { 'aria-label': 'Amount (₹)' },
                input: {
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }
              }}
            />
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>GST Rate (%)</Typography>
            <ToggleButtonGroup
              color="primary"
              value={gstRate}
              exclusive
              onChange={(_, value) => { if (value !== null) { setGstRate(value); setCustomRate(''); } }}
              fullWidth
              sx={{ mt: 1, display: 'flex', flexWrap: 'wrap' }}
            >
              {GST_RATES.map((rate) => (
                <ToggleButton key={rate} value={rate} sx={{ flexGrow: 1, fontWeight: 600 }}>
                  {rate}%
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
            <TextField
              label="Other rate (%)"
              type="number"
              size="small"
              value={customRate}
              onChange={(e) => {
                setCustomRate(e.target.value);
                const n = Number(e.target.value);
                if (e.target.value !== '' && Number.isFinite(n) && n >= 0) setGstRate(n);
              }}
              helperText="For older invoices (12%, 28%) or special rates"
              sx={{ mt: 2 }}
            />
          </Box>
        </Box>

        <Box sx={{ order: { xs: -1, md: 0 }, mb: { xs: 4, md: 0 } }}>
          <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2, height: '100%' }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>Calculation Details</Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography>Initial Amount</Typography>
              <Typography sx={{ fontWeight: 500 }}>₹ {amount.toLocaleString('en-IN')}</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Base Amount (Excl. GST)</Typography>
              <Typography sx={{ fontWeight: 500 }}>₹ {baseAmount.toLocaleString('en-IN')}</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, color: 'text.secondary' }}>
              <Typography>CGST ({gstRate / 2}%)</Typography>
              <Typography>₹ {cgst.toLocaleString('en-IN')}</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, color: 'text.secondary' }}>
              <Typography>SGST ({gstRate / 2}%)</Typography>
              <Typography>₹ {sgst.toLocaleString('en-IN')}</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, pb: 2, borderBottom: '1px solid #E5E5E5' }}>
              <Typography>Total GST Amount</Typography>
              <Typography sx={{ fontWeight: 600 }}>₹ {totalGst.toLocaleString('en-IN')}</Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>Total Amount</Typography>
              <Typography variant="h5" color="primary.main" sx={{ fontWeight: 700 }}>₹ {totalAmount.toLocaleString('en-IN')}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default GSTCalculator;
