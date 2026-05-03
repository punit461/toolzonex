'use client';

import { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Alert, Grid, Chip } from '@mui/material';
import { UAParser } from 'ua-parser-js';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import ComputerIcon from '@mui/icons-material/Computer';
import PublicIcon from '@mui/icons-material/Public';
import CalculatorShell from '../components/CalculatorShell';

const UserAgentParserContent = () => {
  const [ua, setUa] = useState('');
  const [result, setResult] = useState<{
    browser: { name?: string; version?: string };
    os: { name?: string; version?: string };
    device: { type?: string; vendor?: string; model?: string };
    engine: { name?: string; version?: string };
  } | null>(null);
  const [error, setError] = useState('');

  const parseUA = () => {
    setError('');
    
    if (!ua.trim() && typeof navigator !== 'undefined') {
      setUa(navigator.userAgent);
    }

    if (!ua.trim()) {
      setError('Please enter a user agent string');
      return;
    }

    try {
      const parser = new UAParser(ua);
      const parsed = parser.getResult();
      setResult({
        browser: {
          name: parsed.browser.name,
          version: parsed.browser.version,
        },
        os: {
          name: parsed.os.name,
          version: parsed.os.version,
        },
        device: {
          type: parsed.device.type || undefined,
          vendor: parsed.device.vendor,
          model: parsed.device.model,
        },
        engine: {
          name: parsed.engine.name,
          version: parsed.engine.version,
        },
      });
    } catch (err) {
      setError('Failed to parse user agent string');
    }
  };

  const useMyUA = () => {
    if (typeof navigator !== 'undefined') {
      setUa(navigator.userAgent);
    }
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
      <Box>
        <TextField
          label="User Agent String"
          placeholder="Paste a user agent string here..."
          value={ua}
          onChange={(e) => setUa(e.target.value)}
          multiline
          rows={4}
          fullWidth
          sx={{ mb: 2 }}
        />

        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Button variant="contained" onClick={parseUA} sx={{ flex: 1 }}>
            Parse
          </Button>
          <Button variant="outlined" onClick={useMyUA}>
            Use My Browser
          </Button>
        </Box>

        {error && <Alert severity="error">{error}</Alert>}
      </Box>

      {result && (
        <Box>
          <Paper sx={{ p: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <ComputerIcon color="primary" />
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Browser</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">Name</Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
                  {result.browser.name || 'Unknown'}
                </Typography>
                <Typography variant="body2" color="text.secondary">Version</Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {result.browser.version || 'Unknown'}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <PublicIcon color="primary" />
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Operating System</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">Name</Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
                  {result.os.name || 'Unknown'}
                </Typography>
                <Typography variant="body2" color="text.secondary">Version</Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {result.os.version || 'Unknown'}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <SmartphoneIcon color="primary" />
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Device</Typography>
                </Box>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">Type</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {result.device.type || 'Desktop'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">Vendor</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {result.device.vendor || 'N/A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">Model</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {result.device.model || 'N/A'}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">Rendering Engine</Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {result.engine.name || 'Unknown'} {result.engine.version && `v${result.engine.version}`}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

const UserAgentParser = () => {
  const content = (
    <>
      <Typography variant="h2">What is a User Agent string?</Typography>
      <Typography variant="body1">
        A User Agent is a string of text that your browser sends to websites identifying your browser, 
        operating system, device type, and other details. Websites use this information to optimize content for your device.
      </Typography>

      <Typography variant="h2">How to parse a User Agent?</Typography>
      <Typography variant="body1">
        Paste a User Agent string into the input field and click "Parse" to see detailed information about 
        the browser, operating system, device, and rendering engine. Click "Use My Browser" to analyze your current browser's User Agent.
      </Typography>

      <Typography variant="h2">Why analyze User Agents?</Typography>
      <Typography variant="body1">
        • Debugging website compatibility issues
        • Understanding device and browser detection
        • Analytics and traffic analysis
        • Testing responsive design implementations
        • Troubleshooting browser-specific problems
        • Understanding visitor technology stack
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="User Agent Parser"
      description="Parse and analyze user agent strings. Identify browser, OS, device, and engine information."
      url="/tools/user-agent-parser"
      content={content}
      category="Tools"
    >
      <UserAgentParserContent />
    </CalculatorShell>
  );
};

export default UserAgentParser;