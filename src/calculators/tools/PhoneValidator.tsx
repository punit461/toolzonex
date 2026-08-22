'use client';

import { useState, Fragment } from 'react';
import { Box, TextField, Button, Typography, Paper, Alert, Grid, Chip } from '@mui/material';
import { parsePhoneNumber, isValidPhoneNumber, CountryCode, getCountryCallingCode, getCountries } from 'libphonenumber-js';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
const countryName = (code: string) => regionNames.of(code) || code;

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

  const countries = getCountries();

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
              {countryName(c)} ({c}, +{getCountryCallingCode(c)})
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
                  Country
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {result.country ? `${countryName(result.country)} (${result.country})` : 'N/A'}
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

const faqs = [
  {
    question: 'Is this a phone number verification tool?',
    answer: 'It\'s a validator, not a verification tool in the SMS/OTP sense — it checks that a number is correctly formatted and structurally valid for its country, instantly and for free, using the same logic phone networks use to route calls. It does not confirm the number is currently active or reachable; that requires actually sending it an SMS or call, which real phone number verification tools do but this one intentionally does not (so nothing is sent, logged, or charged).',
  },
  {
    question: 'Does this confirm the number is active or reachable?',
    answer: 'No — this checks formatting and structure only, not whether the number is currently in service. To confirm a number is reachable you\'d need to actually send it an SMS or call, which this tool does not do.',
  },
  {
    question: 'What makes this a good phone number validator?',
    answer: 'It validates every country and territory in the international numbering plan, runs the check instantly in your browser using libphonenumber-js — the same phone-formatting library Google uses internally — and it\'s free with no sign-up, rate limit, or data sent to a server. That combination of accuracy, speed, and privacy is what to look for in a phone number validator.',
  },
  {
    question: 'Can I use this as a cell phone validator or only for landlines?',
    answer: 'Both. Enter any number and the tool validates it regardless of type, then reports back whether it\'s a mobile (cell) number, a fixed line, VOIP, toll-free, or premium rate number based on that country\'s numbering plan — so it works equally well as a cell phone validator or a general telephone number validator.',
  },
  {
    question: 'What phone number formats does it accept?',
    answer: 'You can type a local number (e.g. "9876543210") with the matching country selected from the dropdown, or an international number starting with "+" and the country code (e.g. "+91 9876543210") — the "+" prefix is recognized automatically regardless of which country is selected.',
  },
  {
    question: 'Is my phone number sent to a server or stored anywhere?',
    answer: 'No. Validation runs entirely in your browser using the open-source libphonenumber-js library — the same number-formatting logic Google uses internally. Nothing you type is transmitted, logged, or stored.',
  },
  {
    question: 'What do the "Mobile", "Fixed Line", and "VOIP" number types mean?',
    answer: 'The number type is inferred from the numbering plan for that country: Mobile means a cellular number, Fixed Line means a landline, and VOIP/Toll-Free/Premium Rate cover internet-based or special-service numbers. Some countries share overlapping ranges, so this is shown as "unknown" when it can\'t be determined precisely.',
  },
  {
    question: 'Why does a number that looks correct show as invalid?',
    answer: 'The most common causes are: the wrong country selected in the dropdown, a missing or extra digit for that country\'s expected length, or a leading "0" that should be dropped when dialing internationally. Try re-entering the number in full international format with a "+" instead.',
  },
  {
    question: 'Can I validate a number without knowing which country it belongs to?',
    answer: 'Yes — type the number with its "+" country code prefix (e.g. "+44 20 7946 0958") and the tool will parse and validate it correctly no matter which country is selected in the dropdown.',
  },
];

const PhoneValidator = () => {
  const content = (
    <>
      <Typography variant="h2">What is phone validation?</Typography>
      <Typography variant="body1">
        Phone number validation checks if a phone number is formatted correctly and valid for the selected country.
        This tool verifies the structure, length, and format of phone numbers using libphonenumber-js — the same
        parsing library behind Google's own phone number formatting — entirely in your browser.
      </Typography>

      <Typography variant="h2">How to validate a phone number?</Typography>
      <Typography variant="body1">
        Select your country from the dropdown, enter the phone number, and click "Validate".
        The tool will display the formatted number, country code, calling code, and number type.
      </Typography>

      <Typography variant="h2">Why validate phone numbers?</Typography>
      <Typography variant="body1">
        Phone validation helps ensure that contact information is correct before storing or using it.
        It's essential for form validation, contact verification, and preventing invalid data entry —
        catching typos and malformed numbers before they reach your database or trigger a failed SMS/OTP send.
      </Typography>

      <Typography variant="h2">Supported countries and number types</Typography>
      <Typography variant="body1">
        The validator covers every country and territory in the international numbering plan (ITU-T E.164),
        from the country dropdown. For each valid number it also detects the likely number type — mobile,
        fixed line, VOIP, toll-free, or premium rate — based on that country's numbering ranges.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Selecting "United States" and entering "2025551234" confirms it as a valid 10-digit US number and shows
        its formatted version (+1 202-555-1234), country code (US), and calling code (+1).
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Validating phone numbers in a signup or checkout form before submission.</li>
          <li>Cleaning up a contact list or CRM export by checking number formatting per country.</li>
          <li>QA-testing how a phone input field handles different country formats.</li>
          <li>Sanity-checking a customer's number before triggering an SMS or WhatsApp OTP send.</li>
          <li>Normalizing user-entered numbers into a consistent international format for storage.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      {faqs.map((f) => (
        <Fragment key={f.question}>
          <Typography variant="h3">{f.question}</Typography>
          <Typography variant="body1">{f.answer}</Typography>
        </Fragment>
      ))}
    </>
  );

  return (
    <CalculatorShell
      url="/tools/phone-validator"
      content={content}
    >
      <PhoneValidatorContent />

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PhoneValidator;