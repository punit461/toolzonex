'use client';

import { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Alert, Link as MuiLink, Grid } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CalculatorShell from '../components/CalculatorShell';

const MailtoLinkGeneratorContent = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [cc, setCc] = useState('');
  const [bcc, setBcc] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [error, setError] = useState('');

  const generateLink = () => {
    setError('');
    
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    const params = new URLSearchParams();
    if (subject) params.append('subject', subject);
    if (body) params.append('body', body);
    if (cc) params.append('cc', cc);
    if (bcc) params.append('bcc', bcc);

    const link = `mailto:${email}${params.toString() ? `?${params.toString()}` : ''}`;
    setGeneratedLink(link);
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="To (Email)"
          placeholder="recipient@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
        />
        
        <TextField
          label="Subject"
          placeholder="Hello from ToolZoneX"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          fullWidth
        />
        
        <TextField
          label="Body"
          placeholder="Write your message here..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          multiline
          rows={4}
          fullWidth
        />
        
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="CC (Optional)"
              placeholder="cc@example.com"
              value={cc}
              onChange={(e) => setCc(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="BCC (Optional)"
              placeholder="bcc@example.com"
              value={bcc}
              onChange={(e) => setBcc(e.target.value)}
              fullWidth
            />
          </Grid>
        </Grid>

        <Button variant="contained" onClick={generateLink} fullWidth>
          Generate Link
        </Button>

        {error && <Alert severity="error">{error}</Alert>}
      </Box>

      {generatedLink && (
        <Box>
          <Paper sx={{ p: 2, bgcolor: 'primary.light', color: 'primary.dark' }}>
            <Typography variant="subtitle2" gutterBottom>
              Your Mailto Link:
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', mb: 2 }}>
              <Typography 
                component={MuiLink} 
                href={generatedLink} 
                sx={{ wordBreak: 'break-all', flex: 1, fontSize: '0.875rem', color: 'inherit' }}
              >
                {generatedLink}
              </Typography>
            </Box>
            <Button 
              size="small" 
              variant="outlined" 
              startIcon={<OpenInNewIcon />}
              component="a"
              href={generatedLink}
              fullWidth
            >
              Open in Email Client
            </Button>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

const MailtoLinkGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">What is a mailto link?</Typography>
      <Typography variant="body1">
        A mailto link is a special HTML link that opens the user's default email client when clicked. 
        It can pre-fill recipient email, subject line, body text, CC, and BCC fields automatically.
      </Typography>

      <Typography variant="h2">How to generate a mailto link?</Typography>
      <Typography variant="body1">
        Enter the recipient's email address and optionally add subject, body, CC, and BCC fields. 
        Click "Generate Link" to create your mailto link. You can then copy the link and use it in your website or documents.
      </Typography>

      <Typography variant="h2">Use cases for mailto links</Typography>
      <Typography variant="body1">
        • Contact forms with pre-filled email subjects
        • Website "Contact Us" buttons
        • Feedback request links
        • Support or inquiry links with pre-written subjects
        • Newsletter signup confirmations
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Mailto Link Generator"
      description="Generate mailto links with pre-filled subject, body, CC, and BCC. Free tool for creating email links."
      url="/tools/mailto-link-generator"
      content={content}
      category="Tools"
    >
      <MailtoLinkGeneratorContent />
    </CalculatorShell>
  );
};

export default MailtoLinkGenerator;