'use client';

import { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Alert, Grid, Chip } from '@mui/material';
import { parsePhoneNumber, isValidPhoneNumber, CountryCode, getCountryCallingCode } from 'libphonenumber-js';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const PhoneValidatorContent = () => {
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState<CountryCode>('IN');
  const [result, setResult] = useState<{
    isValid: boolean;
    formatted?: string;
    country?: string;
    location?: string;
    type?: string;
  } | null>(null);
  const [error, setError] = useState('');

  const validatePhone = () => {
    setError('');
    setResult(null);

    if (!phone.trim()) {
      setError('Please enter a phone number');
      return;
    }

    try {
      const phoneNumber = parsePhoneNumber(phone, country);
      
      if (!phoneNumber) {
        setError('Could not parse phone number. Please check the format.');
        return;
      }

      setResult({
        isValid: isValidPhoneNumber(phone, country),
        formatted: phoneNumber.formatInternational(),
        country: phoneNumber.country || undefined,
        location: phoneNumber.countryCallingCode ? `+${phoneNumber.countryCallingCode}` : undefined,
        type: phoneNumber.getType(),
      });
    } catch (err) {
      setError('Invalid phone number format');
    }
  };

  const countries: CountryCode[] = [
    'IN', 'US', 'GB', 'CA', 'AU', 'DE', 'FR', 'JP', 'SG', 'AE',
    'CN', 'KR', 'IT', 'ES', 'MX', 'BR', 'ZA', 'NG', 'EG', 'TH',
    'VN', 'MY', 'ID', 'PH', 'NZ', 'RU', 'SE', 'NO', 'DK', 'FI',
    'NL', 'BE', 'CH', 'AT', 'PL', 'TR', 'IL', 'PK', 'BD', 'LK',
    'AR', 'CL', 'CO', 'PE', 'VE', 'SA', 'AE', 'KW', 'QA', 'BH', 'OM'
  ];

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          select
          label="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value as CountryCode)}
          SelectProps={{ native: true }}
          fullWidth
        >
          {countries.map((c) => (
            <option key={c} value={c}>
              {c} (+{getCountryCallingCode(c)})
            </option>
          ))}
        </TextField>

        <TextField
          label="Phone Number"
          placeholder="9876543210"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
        />

        <Button variant="contained" onClick={validatePhone} fullWidth>
          Validate
        </Button>

        {error && <Alert severity="error">{error}</Alert>}
      </Box>

      {result && (
        <Box>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              {result.isValid ? (
                <Chip 
                  icon={<CheckCircleIcon />} 
                  label="Valid Phone Number" 
                  color="success" 
                  sx={{ fontWeight: 600 }}
                />
              ) : (
                <Chip 
                  icon={<CancelIcon />} 
                  label="Invalid Phone Number" 
                  color="error" 
                  sx={{ fontWeight: 600 }}
                />
              )}
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary">
                  Formatted Number
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {result.formatted || 'N/A'}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary">
                  Country Code
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {result.country || 'N/A'}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary">
                  Calling Code
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {result.location || 'N/A'}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary">
                  Number Type
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {result.type || 'N/A'}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

const PhoneValidator = () => {
  const content = (
    <>
      <Typography variant="h2">What is phone validation?</Typography>
      <Typography variant="body1">
        Phone number validation checks if a phone number is formatted correctly and valid for the selected country. 
        This tool verifies the structure, length, and format of phone numbers.
      </Typography>

      <Typography variant="h2">How to validate a phone number?</Typography>
      <Typography variant="body1">
        Select your country from the dropdown, enter the phone number, and click "Validate". 
        The tool will display the formatted number, country code, calling code, and number type.
      </Typography>

      <Typography variant="h2">Why validate phone numbers?</Typography>
      <Typography variant="body1">
        Phone validation helps ensure that contact information is correct before storing or using it. 
        It's essential for form validation, contact verification, and preventing invalid data entry.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Phone Number Validator"
      description="Validate phone numbers and check format. Supports multiple countries with instant validation."
      url="/tools/phone-validator"
      content={content}
      category="Tools"
    >
      <PhoneValidatorContent />

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PhoneValidator;