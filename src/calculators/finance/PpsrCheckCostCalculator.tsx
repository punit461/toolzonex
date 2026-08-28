'use client';

import { useState, useMemo } from 'react';
import { Box, Typography, TextField, ToggleButton, ToggleButtonGroup, Paper, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type SearchMethod = 'SELF' | 'ASSISTED';

const SELF_SERVICE_FEE = 2;
const ASSISTED_FEE = 7;

const formatAud = (value: number) =>
  `$${value.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const PpsrCheckCostCalculatorContent = () => {
  const [vehicleCount, setVehicleCount] = useState<number>(1);
  const [method, setMethod] = useState<SearchMethod>('SELF');

  const feePerSearch = method === 'SELF' ? SELF_SERVICE_FEE : ASSISTED_FEE;
  const total = useMemo(() => {
    const count = Number.isFinite(vehicleCount) && vehicleCount > 0 ? vehicleCount : 0;
    return count * feePerSearch;
  }, [vehicleCount, feePerSearch]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
      <Box>
        <Box sx={{ mb: 3 }}>
          <Typography gutterBottom>Number of vehicles / items to check</Typography>
          <TextField
            fullWidth
            variant="outlined"
            type="number"
            onFocus={(e) => e.target.select()}
            value={Number.isNaN(vehicleCount) ? '' : vehicleCount}
            onChange={(e) => setVehicleCount(e.target.value === '' ? NaN : Number(e.target.value))}
            inputProps={{ min: 1 }}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography gutterBottom>Search method</Typography>
          <ToggleButtonGroup
            exclusive
            fullWidth
            value={method}
            onChange={(_, val) => val && setMethod(val)}
          >
            <ToggleButton value="SELF">Self-service online ($2)</ToggleButton>
            <ToggleButton value="ASSISTED">Assisted / contact centre ($7)</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Typography variant="body2" color="text.secondary">
          Based on official PPSR.gov.au search fees — $2 per self-service online search, or $7 per search via
          the assisted contact-centre service.
        </Typography>
      </Box>

      <Box>
        <Paper sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h6" color="text.secondary">Estimated total cost</Typography>
          <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main' }}>
            {formatAud(total)}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {feePerSearch === SELF_SERVICE_FEE ? '$2.00' : '$7.00'} × {Number.isNaN(vehicleCount) ? 0 : vehicleCount} search{vehicleCount === 1 ? '' : 'es'}
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

const PpsrCheckCostCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">What is a PPSR check?</Typography>
      <Typography variant="body1">
        A PPSR check searches Australia&apos;s Personal Property Securities Register — the national registry
        that records money owing (a &quot;security interest&quot;) on cars, boats, and other personal
        property. Searching before you buy a used vehicle or asset tells you whether it still has finance
        owing, has been reported stolen, or has been written off, so you don&apos;t unknowingly buy something
        that can later be repossessed by a lender even after you&apos;ve paid for it.
      </Typography>
      <Alert severity="info" sx={{ my: 2 }}>
        This calculator estimates the official government search fee — it does not perform the actual PPSR
        search. Run the real search at the official government site,{' '}
        <a href="https://www.ppsr.gov.au" target="_blank" rel="noopener noreferrer">ppsr.gov.au</a>, using
        the vehicle&apos;s VIN, chassis, or registration number.
      </Alert>

      <Typography variant="h2">How much does a PPSR check cost?</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>$2</strong> per self-service search on ppsr.gov.au — the official, cheapest option.</li>
          <li><strong>$7</strong> per search if you call the PPSR contact centre for an assisted search.</li>
          <li>Third-party checking services often charge <strong>$10–$35</strong> for the same search bundled with extra reporting — the underlying registry data is the same either way.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Checking 3 used cars you&apos;re considering buying, self-service, costs 3 × $2 = <strong>$6</strong>{' '}
        total — cheap insurance against buying a car that still has finance owing on it.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking a used car, motorbike, caravan, or boat for outstanding finance before buying privately.</li>
          <li>Confirming a vehicle hasn&apos;t been reported stolen or written off before a purchase.</li>
          <li>Businesses checking equipment, machinery, or stock for existing security interests before a purchase or lease.</li>
          <li>Budgeting the total search-fee cost when comparing several vehicles before deciding which to buy.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is a PPSR check free?</Typography>
      <Typography variant="body1">
        No — the official self-service search costs $2 per item through ppsr.gov.au. Some car history
        websites advertise a &quot;free&quot; check but typically bundle it with a separate paid report or
        different data source.
      </Typography>
      <Typography variant="h3">What do I need to run a PPSR search?</Typography>
      <Typography variant="body1">
        For a vehicle, you need the Vehicle Identification Number (VIN) or chassis number, which is the most
        reliable identifier. A registration number can also be used in some states, though VIN is preferred
        since registration plates can be reassigned.
      </Typography>
      <Typography variant="h3">What does a PPSR search actually show?</Typography>
      <Typography variant="body1">
        It shows whether the item has a registered security interest (money owing to a finance company),
        and — for vehicles — whether it&apos;s recorded as stolen or written off. It does not show mechanical
        condition, accident history details, or odometer readings; those require a separate vehicle history
        check.
      </Typography>
      <Typography variant="h3">Do I need to check every vehicle I&apos;m considering, or just the one I buy?</Typography>
      <Typography variant="body1">
        You only legally need to check before finalizing a purchase, but checking every vehicle you&apos;re
        seriously considering — at $2 each — is inexpensive compared to the risk of a vehicle being
        repossessed after you&apos;ve paid for it because the seller still owed money on it.
      </Typography>
      <Typography variant="h3">Does this tool run the actual PPSR search?</Typography>
      <Typography variant="body1">
        No — it only estimates the total fee based on how many searches you plan to run. Run the real search
        directly at{' '}
        <a href="https://www.ppsr.gov.au" target="_blank" rel="noopener noreferrer">ppsr.gov.au</a>, the
        official Australian government registry.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/ppsr-check-cost-calculator" content={content}>
      <PpsrCheckCostCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PpsrCheckCostCalculator;
