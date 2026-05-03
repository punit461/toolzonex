'use client';

import { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Alert, Link as MuiLink } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../components/CalculatorShell';

const WhatsAppLinkGeneratorContent = () => {
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const generateLink = () => {
    setError('');
    const cleanPhone = phone.replace(/\D/g, '');
    
    if (cleanPhone.length < 10) {
      setError('Please enter a valid phone number with country code');
      return;
    }

    const encodedMessage = encodeURIComponent(message);
    const link = `https://wa.me/${cleanPhone}${message ? `?text=${encodedMessage}` : ''}`;
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
        <TextField
          label="Phone Number"
          placeholder="919876543210"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          helperText="Include country code (e.g., 91 for India)"
          fullWidth
        />
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
    </CalculatorShell>
  );
};

export default WhatsAppLinkGenerator;