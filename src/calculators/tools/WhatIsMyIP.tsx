'use client';

import { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Paper, Alert, CircularProgress, Grid } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import RefreshIcon from '@mui/icons-material/Refresh';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import ResultCard from '../../components/ui/ResultCard';

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
                <ResultCard variant="mono" sx={{ mb: 2, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Your Public IP Address
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700, fontFamily: 'monospace', mb: 2, color: 'text.primary' }}>
                    {ip}
                  </Typography>
                  <Button 
                    size="small"
                    variant="contained"
                    startIcon={copied ? <CheckIcon /> : <ContentCopyIcon />}
                    onClick={copyToClipboard}
                  >
                    {copied ? 'Copied!' : 'Copy IP'}
                  </Button>
                </ResultCard>

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

      <Typography variant="h2">Why check your IP address? How it affects you day-to-day</Typography>
      <Typography variant="body1">
        It's easy to ignore your IP until something depends on it. A few places it actually matters:
      </Typography>
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
          <strong>Connectivity and troubleshooting</strong> — a wrong or blacklisted IP is often the first thing to rule out when a site won&apos;t load or a connection keeps dropping.
        </Typography>
        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
          <strong>Security and privacy</strong> — your IP exposes your rough location and ISP to any site you visit, which is worth knowing before logging into something sensitive on an unfamiliar network.
        </Typography>
        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
          <strong>Remote access and gaming</strong> — port forwarding, home server access, and some multiplayer setups need your current public IP to connect correctly.
        </Typography>
        <Typography component="li" variant="body1" sx={{ mb: 1 }}>
          <strong>Hosting and allowlisting</strong> — if you run a server or need to be added to an IP allowlist for a client firewall, office VPN, or admin panel, this is the address you&apos;d hand over.
        </Typography>
      </Box>

      <Typography variant="h2">Public IP vs. private IP — what's the difference?</Typography>
      <Typography variant="body1">
        The address shown above is your <strong>public IP</strong> — the one your router presents to the wider internet,
        assigned by your ISP. Every device inside your home or office network (phone, laptop, smart TV) instead gets
        a <strong>private IP</strong>, typically starting with 192.168.x.x or 10.x.x.x, which only works within that local
        network and is invisible from outside it. If you need a device&apos;s private IP — say, to set up a printer or
        reach your router&apos;s admin page — check that device&apos;s network settings instead, since this page always
        reports the public-facing address.
      </Typography>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Can this reveal my exact home address?</Typography>
      <Typography variant="body1">
        No — an IP address typically reveals only approximate location (city or region level) and your ISP,
        not a precise street address.
      </Typography>
      <Typography variant="h3">How do I find my IP address location?</Typography>
      <Typography variant="body1">
        This page detects it automatically — as soon as it loads, your public IP address and its approximate
        country, region, and city appear above, with no sign-up or extra steps required.
      </Typography>
      <Typography variant="h3">Why does my IP location show the wrong city?</Typography>
      <Typography variant="body1">
        IP geolocation is based on which ISP block your address falls in, not GPS. Mobile networks and VPNs
        often route traffic through a hub in a different city or region, so the result can be off by tens or
        hundreds of kilometers.
      </Typography>
      <Typography variant="h3">Should I change my public IP address?</Typography>
      <Typography variant="body1">
        Usually you don&apos;t need to — most home connections are already on a dynamic IP that changes on its own
        whenever your ISP reassigns addresses, such as after a router restart. You&apos;d deliberately change it to get
        a fresh address if your current one has been rate-limited or blocked by a site, to route around a
        region restriction, or for extra privacy on public Wi-Fi. That&apos;s typically done through a VPN, a proxy,
        or by asking your ISP for a new lease.
      </Typography>
      <Typography variant="h3">What's the difference between an IPv4 and IPv6 address?</Typography>
      <Typography variant="body1">
        IPv4 addresses look like 203.0.113.42 — four numbers separated by dots — and are the older, more limited
        format, with roughly 4.3 billion possible addresses, most of which are already allocated. IPv6 addresses
        look like 2001:db8::8a2e:370:7334 and use a far larger address space to keep pace with the number of
        internet-connected devices. Most home connections still get an IPv4 address by default, which is why
        that&apos;s typically what you see above; some ISPs and mobile carriers now assign IPv6 alongside or instead of it.
      </Typography>
      <Typography variant="h3">Where&apos;s my IP address and what&apos;s my current location?</Typography>
      <Typography variant="body1">
        Your public IP address and current location appear automatically above, with no need to search
        elsewhere — this page detects it live. If you&apos;re wondering where&apos;s my IP or where&apos;s my IP
        location, look at the IP box for the address itself and the Location Information panel just below it
        for your approximate country, region, and city.
      </Typography>
      <Typography variant="h3">How do I find my public IP address?</Typography>
      <Typography variant="body1">
        Just open this page — your public IP is found and displayed automatically, no sign-up or extra clicks
        required. If you&apos;ve changed networks or reconnected to Wi-Fi and want the very latest reading, click
        &quot;Refresh&quot; to find your public IP address again immediately.
      </Typography>
      <Typography variant="h3">How do I check my IP address and location together?</Typography>
      <Typography variant="body1">
        This page checks both at once: your public IP appears at the top, and the Location Information panel
        beneath it shows the country, region, city, and ISP tied to that address — so you don&apos;t need a
        separate lookup to check your IP location.
      </Typography>
      <Typography variant="h3">What is my public IP address right now?</Typography>
      <Typography variant="body1">
        The number shown at the top of this page under &quot;Your Public IP Address&quot; is your current public
        IP, detected the moment the page loads. It can change over time — most home connections are on a
        dynamic IP — so if you want to confirm what it is right now rather than an older cached result, hit
        Refresh.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Loading this page instantly displays your current public IP address along with its approximate country
        and city.
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