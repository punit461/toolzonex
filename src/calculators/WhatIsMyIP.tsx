'use client';

import { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Paper, Alert, CircularProgress, Grid } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import RefreshIcon from '@mui/icons-material/Refresh';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

interface IPData {
  ip?: string;
  country?: string;
  region?: string;
  city?: string;
  isp?: string;
}

const WhatIsMyIPContent = () => {
  const [ip, setIp] = useState<string>('');
  const [ipData, setIpData] = useState<IPData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchIP();
  }, []);

  const fetchIP = async () => {
    setLoading(true);
    setError('');
    try {
      // Primary API
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch('https://ipapi.co/json/', { 
        signal: controller.signal 
      });
      clearTimeout(timeoutId);
      
      if (!response.ok) throw new Error('API error');
      const data = await response.json();
      
      setIp(data.ip);
      setIpData({
        ip: data.ip,
        country: data.country_name,
        region: data.region,
        city: data.city,
        isp: data.org,
      });
    } catch (err) {
      // Fallback API
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const response = await fetch('https://api.ipify.org?format=json', { 
          signal: controller.signal 
        });
        clearTimeout(timeoutId);
        
        if (!response.ok) throw new Error('API error');
        const data = await response.json();
        setIp(data.ip);
        setIpData({ ip: data.ip });
      } catch (fallbackErr) {
        setError('Unable to fetch your IP address. Please check your internet connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!ip) return;
    try {
      await navigator.clipboard.writeText(ip);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError('Failed to copy to clipboard');
    }
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
      <Box>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            {ip && !error && (
              <>
                <Paper sx={{ p: 4, mb: 2, textAlign: 'center', bgcolor: 'primary.light', color: 'primary.dark' }}>
                  <Typography variant="body2" color="inherit" sx={{ mb: 1, opacity: 0.9 }}>
                    Your Public IP Address
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700, fontFamily: 'monospace', mb: 2 }}>
                    {ip}
                  </Typography>
                  <Button 
                    size="small"
                    variant="contained"
                    startIcon={copied ? <CheckIcon /> : <ContentCopyIcon />}
                    onClick={copyToClipboard}
                    sx={{ color: 'inherit' }}
                  >
                    {copied ? 'Copied!' : 'Copy IP'}
                  </Button>
                </Paper>

                <Button 
                  variant="outlined" 
                  startIcon={<RefreshIcon />}
                  onClick={fetchIP}
                  fullWidth
                >
                  Refresh
                </Button>
              </>
            )}
          </>
        )}
      </Box>

      {ip && ipData && (
        <Box>
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Location Information
            </Typography>
            <Grid container spacing={2}>
              {ipData.country && (
                <>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" color="text.secondary">Country</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {ipData.country}
                    </Typography>
                  </Grid>
                </>
              )}
              {ipData.region && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" color="text.secondary">Region</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {ipData.region}
                  </Typography>
                </Grid>
              )}
              {ipData.city && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" color="text.secondary">City</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {ipData.city}
                  </Typography>
                </Grid>
              )}
              {ipData.isp && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" color="text.secondary">ISP</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {ipData.isp}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

const WhatIsMyIP = () => {
  const content = (
    <>
      <Typography variant="h2">What is a public IP address?</Typography>
      <Typography variant="body1">
        A public IP address is a unique identifier assigned to your device on the internet. 
        It's used to route data between your device and other computers online. This is different from 
        your private IP address, which is used within your local network (home or office).
      </Typography>

      <Typography variant="h2">What information can be determined from my IP?</Typography>
      <Typography variant="body1">
        Your IP address can reveal general location information (country, region, city), your Internet 
        Service Provider (ISP), and sometimes your approximate coordinates. However, it does not reveal your exact home address or personal identity.
      </Typography>

      <Typography variant="h2">Why check your IP address?</Typography>
      <Typography variant="body1">
        • Troubleshoot internet connectivity issues
        • Verify your VPN or proxy is working
        • Check if you're being blocked or banned from websites
        • Understand your network configuration
        • Monitor remote access to your devices
        • Verify you're connecting from the right location
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="What Is My IP Address"
      description="Check your public IP address instantly. Find your IP location and ISP information online."
      url="/tools/what-is-my-ip"
      content={content}
      category="Tools"
    >
      <WhatIsMyIPContent />

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default WhatIsMyIP;