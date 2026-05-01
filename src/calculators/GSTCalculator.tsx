'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, ToggleButtonGroup, ToggleButton, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import CalculatorShell from '../components/CalculatorShell';

const GST_RATES = [0, 5, 12, 18, 28];

const GSTCalculator = () => {
  const [amount, setAmount] = useState<number>(1000);
  const [gstRate, setGstRate] = useState<number>(18);
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

      <Typography variant="h2">GST Slabs in India</Typography>
      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #E5E5E5', my: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Slab</strong></TableCell>
              <TableCell><strong>Common Items</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow><TableCell>0%</TableCell><TableCell>Milk, eggs, fresh vegetables, unbranded wheat</TableCell></TableRow>
            <TableRow><TableCell>5%</TableCell><TableCell>Sugar, tea, coffee, edible oil, spices</TableCell></TableRow>
            <TableRow><TableCell>12%</TableCell><TableCell>Mobile phones, computers, processed food</TableCell></TableRow>
            <TableRow><TableCell>18%</TableCell><TableCell>Financial services, IT services, branded garments</TableCell></TableRow>
            <TableRow><TableCell>28%</TableCell><TableCell>Automobiles, luxury items, aerated drinks</TableCell></TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );

  return (
    <CalculatorShell
      title="GST Calculator"
      description="Add or remove Goods and Services Tax (GST) from any amount instantly."
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
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              slotProps={{
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
              onChange={(_, value) => { if (value !== null) setGstRate(value); }}
              fullWidth
              sx={{ mt: 1, display: 'flex', flexWrap: 'wrap' }}
            >
              {GST_RATES.map((rate) => (
                <ToggleButton key={rate} value={rate} sx={{ flexGrow: 1, fontWeight: 600 }}>
                  {rate}%
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>
        </Box>

        <Box>
          <Box sx={{ p: 4, bgcolor: '#f9f9f9', borderRadius: 2, height: '100%' }}>
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
    </CalculatorShell>
  );
};

export default GSTCalculator;
