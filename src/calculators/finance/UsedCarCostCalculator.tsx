'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) =>
  `$${v.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

const UsedCarCostCalculator = () => {
  const [purchasePrice, setPurchasePrice] = useState('15000');
  const [insurance, setInsurance] = useState('1400');
  const [maintenance, setMaintenance] = useState('1200');
  const [registration, setRegistration] = useState('400');
  const [fuel, setFuel] = useState('1800');
  const [years, setYears] = useState('5');

  const result = useMemo(() => {
    const price = parseFloat(purchasePrice) || 0;
    const ann =
      (parseFloat(insurance) || 0) +
      (parseFloat(maintenance) || 0) +
      (parseFloat(registration) || 0) +
      (parseFloat(fuel) || 0);
    const yrs = parseFloat(years) || 0;

    const totalRunningCost = ann * yrs;
    const totalCost = price + totalRunningCost;
    const costPerYear = yrs > 0 ? totalCost / yrs : 0;
    const costPerMonth = costPerYear / 12;

    return { annualCost: ann, totalRunningCost, totalCost, costPerYear, costPerMonth };
  }, [purchasePrice, insurance, maintenance, registration, fuel, years]);

  const content = (
    <>
      <Typography variant="h2">How to Calculate the True Cost of Owning a Used Car</Typography>
      <Typography variant="body1">
        The purchase price is only part of what a used car costs. This calculator adds the purchase price to
        your estimated annual insurance, maintenance and repairs, registration and taxes, and fuel costs over
        your expected ownership period — used cars typically run higher on maintenance than new ones, so it
        pays to estimate that realistically — then shows the total cost of ownership, plus a cost per year and
        per month.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Total Cost = Purchase Price + (Annual Costs × Ownership Years)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A $15,000 used car with $1,400/year insurance, $1,200/year maintenance, $400/year registration, and
        $1,800/year fuel — $4,800 combined annual cost — owned for 5 years comes to a total cost of ownership
        of $15,000 + ($4,800 × 5) = $39,000, or $7,800 per year and $650 per month.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Comparing the true multi-year cost of two different used cars, not just their sticker prices.</li>
          <li>Deciding whether a cheaper used car with higher running costs actually costs less than a pricier one.</li>
          <li>Comparing buying used against buying new once ongoing costs are factored in.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why do used cars typically have higher maintenance costs?</Typography>
      <Typography variant="body1">
        Older vehicles are more likely to need wear-item replacements (brakes, tires, belts, batteries) and
        unexpected repairs, and they usually aren&apos;t covered by a full manufacturer warranty anymore, so
        it&apos;s realistic to budget noticeably more for maintenance than you would for a new car.
      </Typography>
      <Typography variant="h3">Does this include depreciation?</Typography>
      <Typography variant="body1">
        No — this calculator treats the purchase price as a fixed cost and doesn&apos;t estimate resale value
        at the end of ownership. If you plan to sell the car afterward, subtract your expected resale value
        from the total cost of ownership to get a more complete picture.
      </Typography>
      <Typography variant="h3">How can I use this to compare against a different vehicle?</Typography>
      <Typography variant="body1">
        Run the calculator once per vehicle with each car&apos;s own purchase price and estimated annual costs,
        then compare the total cost of ownership or cost-per-year figures side by side — the cheaper purchase
        price doesn&apos;t always win once running costs are included.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/used-car-cost-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField label="Purchase Price" type="number" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }} />
          <Typography variant="subtitle1" fontWeight={600}>Estimated Annual Costs</Typography>
          <TextField label="Insurance" type="number" value={insurance} onChange={(e) => setInsurance(e.target.value)} fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment>, endAdornment: <InputAdornment position="end">/ yr</InputAdornment> } }} />
          <TextField label="Maintenance & Repairs" type="number" value={maintenance} onChange={(e) => setMaintenance(e.target.value)} fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment>, endAdornment: <InputAdornment position="end">/ yr</InputAdornment> } }} />
          <TextField label="Registration & Taxes" type="number" value={registration} onChange={(e) => setRegistration(e.target.value)} fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment>, endAdornment: <InputAdornment position="end">/ yr</InputAdornment> } }} />
          <TextField label="Fuel" type="number" value={fuel} onChange={(e) => setFuel(e.target.value)} fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment>, endAdornment: <InputAdornment position="end">/ yr</InputAdornment> } }} />
          <TextField label="Expected Ownership Period" type="number" value={years} onChange={(e) => setYears(e.target.value)} fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">years</InputAdornment> } }} />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Total Cost of Ownership</Typography>
            <Typography variant="h3" fontWeight="bold">{money(result.totalCost)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Combined Annual Running Cost</Typography>
            <Typography fontWeight={600}>{money(result.annualCost)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Total Running Cost (over period)</Typography>
            <Typography fontWeight={600}>{money(result.totalRunningCost)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Cost Per Year</Typography>
            <Typography fontWeight={600}>{money(result.costPerYear)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Cost Per Month</Typography>
            <Typography fontWeight={600}>{money(result.costPerMonth)}</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default UsedCarCostCalculator;
