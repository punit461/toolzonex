'use client';

import { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Alert, Link as MuiLink, Grid, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const countryCodes = [
  { code: '91', name: 'India (+91)' },
  { code: '1', name: 'USA (+1)' },
  { code: '44', name: 'UK (+44)' },
  { code: '61', name: 'Australia (+61)' },
  { code: '971', name: 'UAE (+971)' },
  { code: '65', name: 'Singapore (+65)' },
  { code: '86', name: 'China (+86)' },
  { code: '81', name: 'Japan (+81)' },
  { code: '49', name: 'Germany (+49)' },
  { code: '33', name: 'France (+33)' },
  { code: '966', name: 'Saudi Arabia (+966)' },
  { code: '92', name: 'Pakistan (+92)' },
  { code: '880', name: 'Bangladesh (+880)' },
  { code: '94', name: 'Sri Lanka (+94)' },
  { code: '60', name: 'Malaysia (+60)' },
  { code: '62', name: 'Indonesia (+62)' },
  { code: '63', name: 'Philippines (+63)' },
  { code: '66', name: 'Thailand (+66)' },
  { code: '84', name: 'Vietnam (+84)' },
  { code: '55', name: 'Brazil (+55)' },
  { code: '52', name: 'Mexico (+52)' },
  { code: '27', name: 'South Africa (+27)' },
  { code: '234', name: 'Nigeria (+234)' },
  { code: '82', name: 'South Korea (+82)' },
  { code: '7', name: 'Russia (+7)' },
  { code: '39', name: 'Italy (+39)' },
  { code: '34', name: 'Spain (+34)' },
  { code: '20', name: 'Egypt (+20)' },
  { code: '64', name: 'New Zealand (+64)' },
  { code: '1', name: 'Canada (+1)' },
];

const WhatsAppLinkGeneratorContent = () => {
  const [countryCode, setCountryCode] = useState('91');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const generateLink = () => {
    setError('');
    const cleanPhone = phone.replace(/\D/g, '');
    
    if (cleanPhone.length < 7) {
      setError('Please enter a valid phone number');
      return;
    }

    const fullPhone = countryCode + cleanPhone;
    const encodedMessage = encodeURIComponent(message);
    const link = `https://wa.me/${fullPhone}${message ? `?text=${encodedMessage}` : ''}`;
    setGeneratedLink(link);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError('Failed to copy to clipboard');
    }
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Country</InputLabel>
            <Select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              label="Country"
            >
              {countryCodes.map((c) => (
                <MenuItem key={c.code} value={c.code}>{c.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Phone Number"
            placeholder="9876543210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
          />
        </Box>
        <TextField
          label="Message (Optional)"
          placeholder="Hello! I wanted to reach out..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          multiline
          rows={3}
          fullWidth
        />
        <Button variant="contained" onClick={generateLink} fullWidth>
          Generate Link
        </Button>

        {error && <Alert severity="error">{error}</Alert>}
      </Box>

      {generatedLink && (
        <Box>
          <Paper sx={{ p: 2, bgcolor: 'success.light', color: 'success.dark' }}>
            <Typography variant="subtitle2" gutterBottom>
              Your WhatsApp Link:
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', mb: 2 }}>
              <Typography 
                component={MuiLink} 
                href={generatedLink} 
                target="_blank" 
                rel="noopener"
                sx={{ wordBreak: 'break-all', flex: 1, color: 'inherit', fontSize: '0.875rem' }}
              >
                {generatedLink}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button 
                size="small" 
                variant="outlined" 
                startIcon={copied ? undefined : <ContentCopyIcon />}
                onClick={copyToClipboard}
                fullWidth
              >
                {copied ? 'Copied!' : 'Copy Link'}
              </Button>
              <Button 
                size="small" 
                variant="contained" 
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

const WhatsAppLinkGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">What is a WhatsApp click-to-chat link?</Typography>
      <Typography variant="body1">
        A WhatsApp click-to-chat link (wa.me link) allows people to start a WhatsApp conversation with you 
        without needing to know your phone number. The link can include a pre-written message that will appear when the chat opens.
      </Typography>

      <Typography variant="h2">How to generate a WhatsApp link?</Typography>
      <Typography variant="body1">
        Enter your phone number with country code (e.g., 919876543210 for India), optionally add a message, 
        and click "Generate Link". Copy the link and share it anywhere - on your website, social media, emails, or other platforms.
      </Typography>

      <Typography variant="h2">Use cases for WhatsApp links</Typography>
      <Typography variant="body1">
        • Add WhatsApp contact button to your website
        • Create WhatsApp links for business inquiries
        • Share pre-written customer support messages
        • Enable customer feedback and reviews via WhatsApp
        • Business appointment booking links
        • Support and helpline links
        • Marketing and outreach campaigns
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="WhatsApp Link Generator"
      description="Generate WhatsApp click-to-chat links with pre-filled messages. Free WhatsApp link creator tool."
      url="/tools/whatsapp-link-generator"
      content={content}
      category="Tools"
    >
      <WhatsAppLinkGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default WhatsAppLinkGenerator;