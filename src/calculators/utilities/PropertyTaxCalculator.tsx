'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const fmt = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

const PropertyTaxCalculator = () => {
  const [propertyValue, setPropertyValue] = useState('350000');
  const [inputMode, setInputMode] = useState<'mill' | 'effective'>('mill');
  const [millRate, setMillRate] = useState('15');
  const [effRate, setEffRate] = useState('1.5');
  const [countyPct, setCountyPct] = useState('45');
  const [schoolPct, setSchoolPct] = useState('35');
  const [localPct, setLocalPct] = useState('20');

  const result = useMemo(() => {
    const value = parseFloat(propertyValue) || 0;
    const mill = parseFloat(millRate) || 0;
    const eff = (parseFloat(effRate) || 0) / 100;

    const annualTax = inputMode === 'mill' ? (value / 1000) * mill : value * eff;
    const monthlyTax = annualTax / 12;
    const effectiveRatePct = inputMode === 'mill' ? mill / 10 : parseFloat(effRate) || 0;

    const cp = Math.max(0, Math.min(100, parseFloat(countyPct) || 0));
    const sp = Math.max(0, Math.min(100 - cp, parseFloat(schoolPct) || 0));
    const lp = Math.max(0, Math.min(100 - cp - sp, parseFloat(localPct) || 0));

    return { annualTax, monthlyTax, effectiveRatePct, county: annualTax * cp / 100, school: annualTax * sp / 100, local: annualTax * lp / 100, cp, sp, lp };
  }, [propertyValue, inputMode, millRate, effRate, countyPct, schoolPct, localPct]);

  const content = (
    <>
      <Typography variant="h2">How is Property Tax Calculated?</Typography>
      <Typography variant="body1">
        Property tax is calculated by multiplying the assessed value of your property by the local tax rate. The rate is often expressed as a mill rate (tax per $1,000 of assessed value) or an effective percentage rate.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Mill Rate Method: Tax = (Property Value / 1,000) × Mill Rate<br />
        Effective Rate Method: Tax = Property Value × Effective Rate (%)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A $350,000 home with a mill rate of 15 results in annual property tax of $5,250 — or about $437.50 per month. The effective tax rate in this case would be 1.5%.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating annual and monthly property tax before buying a home.</li>
          <li>Comparing property tax costs across different neighborhoods or cities.</li>
          <li>Understanding how your tax bill is divided between county, school, and local government.</li>
          <li>Budgeting for homeownership expenses beyond the mortgage payment.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is a mill rate?</Typography>
      <Typography variant="body1">
        A mill rate is the amount of tax payable per $1,000 of assessed property value. For example, a mill rate of 15 means you pay $15 in tax for every $1,000 of your property's value, or 1.5%.
      </Typography>
      <Typography variant="h3">Why does property tax vary so much by location?</Typography>
      <Typography variant="body1">
        Property tax rates are set by local governments (counties, cities, school districts) based on their budget needs and the total assessed value of properties in the area. Areas with higher services or lower property values tend to have higher mill rates.
      </Typography>
      <Typography variant="h3">Can I appeal my property tax assessment?</Typography>
      <Typography variant="body1">
        Yes — most jurisdictions allow you to appeal if you believe your property has been assessed above its market value. Check your local tax assessor's office for the appeals process and deadlines.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/property-tax-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField label="Property Value" type="number" value={propertyValue} onChange={(e) => setPropertyValue(e.target.value)} slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }} fullWidth />
          <Box>
            <Typography variant="body2" color="text.secondary" mb={1}>Tax Rate Method</Typography>
            <ToggleButtonGroup value={inputMode} exclusive onChange={(_, v) => v && setInputMode(v)} fullWidth>
              <ToggleButton value="mill">Mill Rate</ToggleButton>
              <ToggleButton value="effective">Effective %</ToggleButton>
            </ToggleButtonGroup>
          </Box>
          {inputMode === 'mill' ? (
            <TextField label="Mill Rate (per $1,000)" type="number" value={millRate} onChange={(e) => setMillRate(e.target.value)} fullWidth />
          ) : (
            <TextField label="Effective Tax Rate" type="number" value={effRate} onChange={(e) => setEffRate(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }} fullWidth />
          )}

          <Typography variant="body2" color="text.secondary" mt={1}>Breakdown by Jurisdiction (approximate %)</Typography>
          <TextField label="County" type="number" value={countyPct} onChange={(e) => setCountyPct(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }} fullWidth />
          <TextField label="School District" type="number" value={schoolPct} onChange={(e) => setSchoolPct(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }} fullWidth />
          <TextField label="Local / Municipal" type="number" value={localPct} onChange={(e) => setLocalPct(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }} fullWidth />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Annual Property Tax</Typography>
            <Typography variant="h3" fontWeight="bold">{fmt(result.annualTax)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Monthly Equivalent</Typography>
            <Typography fontWeight={600}>{fmt(result.monthlyTax)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Effective Tax Rate</Typography>
            <Typography fontWeight={600}>{result.effectiveRatePct.toFixed(2)}%</Typography>
          </Paper>

          <Typography variant="subtitle2" fontWeight={600} mb={1}>Tax Breakdown</Typography>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5, borderBottom: '1px solid', borderColor: 'divider' }}>
              <Typography variant="body2">County ({result.cp}%)</Typography>
              <Typography variant="body2" fontWeight={600}>{fmt(result.county)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5, borderBottom: '1px solid', borderColor: 'divider' }}>
              <Typography variant="body2">School ({result.sp}%)</Typography>
              <Typography variant="body2" fontWeight={600}>{fmt(result.school)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5 }}>
              <Typography variant="body2">Local ({result.lp}%)</Typography>
              <Typography variant="body2" fontWeight={600}>{fmt(result.local)}</Typography>
            </Box>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}>
        <AdSenseUnit />
      </Box>
    </CalculatorShell>
  );
};

export default PropertyTaxCalculator;
