'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const TABLE_SIZES = [8, 10, 12];

const WeddingSeatingCalculator = () => {
  const [guests, setGuests] = useState('120');

  const results = useMemo(() => {
    const g = parseFloat(guests) || 0;
    return TABLE_SIZES.map((seats) => ({
      seats,
      tables: g > 0 ? Math.ceil(g / seats) : 0,
    }));
  }, [guests]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Wedding Seating Calculator</Typography>
      <Typography variant="body1">
        Enter your total guest count and the calculator shows how many round tables you&apos;d need across a
        few common table sizes — 8, 10, and 12 seats per table — side by side. This makes it easy to compare
        the tradeoffs: more, smaller tables give guests more personal space and room-layout flexibility, while
        fewer, larger tables reduce the total table and linen count.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Tables Needed = ROUND UP(Guests / Seats per Table)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        For 120 guests: at 8 seats per table you need 15 tables (120 / 8 = 15 exactly), at 10 seats per table
        you need 12 tables, and at 12 seats per table you need 10 tables — fewer, larger tables reduce the
        table count but seat more people together.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Comparing table-count options before booking a venue or rental company.</li>
          <li>Planning room layout and walkway space based on how many tables will be needed.</li>
          <li>Estimating linen, centerpiece, and place-setting quantities for a reception.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why does the calculator round up the table count?</strong> You can&apos;t book a partial table — if 120 guests need 15.4 tables at some seat count, you still need a full 16th table to seat everyone, even if it isn&apos;t completely full.</li>
          <li><strong>Which table size should I choose?</strong> It depends on your venue&apos;s floor plan and desired atmosphere — smaller tables (8 seats) tend to encourage more intimate conversation, while larger tables (12 seats) fit more guests into a smaller footprint but can make cross-table conversation harder.</li>
          <li><strong>Does this account for a head table or sweetheart table?</strong> No — this calculates seating for your general guest count only. Subtract the head table, sweetheart table, or kids&apos; table guest count from your total first if you&apos;re seating those separately.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/wedding-seating-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box>
          <TextField label="Total Guest Count" type="number" value={guests} onChange={(e) => setGuests(e.target.value)} onFocus={(e) => e.target.select()} fullWidth />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Tables Needed</Typography>
          {results.map((r) => (
            <Paper key={r.seats} sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
              <Typography>{r.seats}-Seat Tables</Typography>
              <Typography fontWeight={600}>{r.tables} tables</Typography>
            </Paper>
          ))}
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default WeddingSeatingCalculator;
