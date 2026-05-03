'use client';

import { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Alert, Link as MuiLink, ToggleButtonGroup, ToggleButton } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CalculatorShell from '../components/CalculatorShell';

const PayPalLinkGeneratorContent = () => {
  const [username, setUsername] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [linkType, setLinkType] = useState<'me' | 'pay'>('me');
  const [generatedLink, setGeneratedLink] = useState('');
  const [error, setError] = useState('');

  const generateLink = () => {
    setError('');
    
    if (linkType === 'me') {
      if (!username || username.length < 3) {
        setError('Please enter a valid PayPal username or email');
        return;
      }
      const link = `https://paypal.me/${username}${amount ? `/${amount}` : ''}`;
      setGeneratedLink(link);
    } else {
      if (!amount || parseFloat(amount) <= 0) {
        setError('Please enter a valid amount');
        return;
      }
      const link = `https://www.paypal.com/paypalme/${username}/${amount}?currency_code=${currency}`;
      setGeneratedLink(link);
    }
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <ToggleButtonGroup
          value={linkType}
          exclusive
          onChange={(_, value) => value && setLinkType(value)}
          fullWidth
        >
          <ToggleButton value="me">PayPal.me (Personal)</ToggleButton>
          <ToggleButton value="pay">PayPal Payment</ToggleButton>
        </ToggleButtonGroup>

        <TextField
          label={linkType === 'me' ? 'PayPal.me Username or Email' : 'PayPal Email or ID'}
          placeholder={linkType === 'me' ? 'johndoe' : 'your@email.com'}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
        />

        <TextField
          label="Amount (Optional)"
          type="number"
          placeholder="10.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
        />

        {linkType === 'pay' && (
          <TextField
            select
            label="Currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            SelectProps={{ native: true }}
            fullWidth
          >
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound</option>
            <option value="INR">INR - Indian Rupee</option>
            <option value="CAD">CAD - Canadian Dollar</option>
            <option value="AUD">AUD - Australian Dollar</option>
          </TextField>
        )}

        <Button variant="contained" onClick={generateLink} fullWidth>
          Generate Link
        </Button>

        {error && <Alert severity="error">{error}</Alert>}
      </Box>

      {generatedLink && (
        <Box>
          <Paper sx={{ p: 2, bgcolor: 'primary.light', color: 'primary.dark' }}>
            <Typography variant="subtitle2" gutterBottom>
              Your PayPal Link:
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', mb: 2 }}>
              <Typography 
                component={MuiLink} 
                href={generatedLink} 
                target="_blank" 
                rel="noopener"
                sx={{ wordBreak: 'break-all', flex: 1, color: 'inherit' }}
              >
                {generatedLink}
              </Typography>
              <Button 
                size="small" 
                variant="outlined" 
                startIcon={<OpenInNewIcon />}
                component="a"
                href={generatedLink}
                target="_blank"
              >
                Open
              </Button>
            </Box>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

const PayPalLinkGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">What is PayPal.me?</Typography>
      <Typography variant="body1">
        PayPal.me is a simple URL-based way to request and receive money. Share your unique link, 
        and anyone can send you money with a single click without needing to know your email or account details.
      </Typography>

      <Typography variant="h2">How to generate a PayPal link?</Typography>
      <Typography variant="body1">
        Choose between PayPal.me (personal payments) or PayPal Payment (business). Enter your PayPal 
        username or email, optionally add an amount, select currency if needed, and click "Generate Link". 
        Copy the link and share it to start receiving payments.
      </Typography>

      <Typography variant="h2">Use cases for PayPal links</Typography>
      <Typography variant="body1">
        • Freelancer invoicing and payment collection
        • Small business payment requests
        • Donation links for charities and causes
        • Tip jars for content creators
        • Splitting bills and group expenses
        • Payment links in emails and messages
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="PayPal Link Generator"
      description="Generate PayPal payment links easily. Create PayPal.me or payment links for receiving money online."
      url="/tools/paypal-link-generator"
      content={content}
      category="Tools"
    >
      <PayPalLinkGeneratorContent />
    </CalculatorShell>
  );
};

export default PayPalLinkGenerator;