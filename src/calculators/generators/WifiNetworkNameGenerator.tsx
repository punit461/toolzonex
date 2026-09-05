'use client';

import { useState } from 'react';
import { Box, Button, Typography, Paper, Stack } from '@mui/material';
import WifiIcon from '@mui/icons-material/Wifi';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const WIFI_NAMES = [
  'Pretty Fly for a WiFi', 'The LAN Before Time', "Drop It Like It's Hotspot", 'Bill Wi the Science Fi',
  'It Hurts When IP', 'No More Mister WiFi Guy', 'Get Off My LAN', 'Wu Tang LAN', 'Winternet Is Coming',
  'The Password Is Password', 'Loading... Please Wait', 'FBI Surveillance Van 4', 'Abraham Linksys',
  'Router? I Hardly Know Her', 'The Promised LAN', 'Wi Believe I Can Fi', 'Silence of the LANs',
  'Two Girls One Router', 'Yell "Halt" to My Router and I Shall Ping Thee', 'Access Denied',
  'Life in the Fast LAN', 'Hide Yo Kids Hide Yo WiFi', 'Girls Girls Girls', 'Mom Click Here for Internet',
  'You Shall Not Pass(word)', 'The Wifi Is Lava', 'Router, I Barely Know Her', 'Ping Me Maybe',
  'It Burns When IP', 'Definitely Not a Virus', "I'm Not a Robot", 'Network Unavailable', 'One Ring to Rule Them All',
  'Skynet Global Defense Network', 'Loading Bar of Dreams', 'The Cloud Is a Lie', 'Not the WiFi You Are Looking For',
  'This Is Not Free WiFi', 'Constant Sorrow', 'Nacho WiFi', 'Wu-Tang LAN Ain’t Nuthing ta F Wit', 'HAL 9000',
  'Bandwidth Solo', 'Router of the North', 'Panic! At the Router', 'It’s Britney Bandwidth', 'Anthony Wienernet',
  'Cache Me Outside', 'Tell My WiFi Love Her', 'The Internet Is Down', 'Ye Olde WiFi', 'The Router Formerly Known as Prince',
  'Wireless Mike', 'A Van Down by the River', 'IP Man', 'CIA Surveillance Van', 'Wi-Fight the Feeling',
  'Router McRouterface', 'Not Suspicious at All', 'Area 51 Test Network',
];

const WifiNetworkNameGeneratorContent = () => {
  const [names, setNames] = useState<string[]>([]);

  const generate = () => {
    const pool = [...WIFI_NAMES];
    const picks: string[] = [];
    while (picks.length < 3 && pool.length > 0) {
      const idx = Math.floor(Math.random() * pool.length);
      picks.push(pool.splice(idx, 1)[0]);
    }
    setNames(picks);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <Button variant="contained" size="large" startIcon={<WifiIcon />} onClick={generate}>
        {names.length === 0 ? 'Generate WiFi Names' : 'Regenerate'}
      </Button>

      {names.length > 0 && (
        <Stack spacing={1.5} sx={{ width: '100%', maxWidth: 480 }}>
          {names.map((n) => (
            <Paper key={n} variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6" fontWeight={700}>
                {n}
              </Typography>
            </Paper>
          ))}
        </Stack>
      )}
    </Box>
  );
};

const WifiNetworkNameGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the WiFi Network Name Generator</Typography>
      <Typography variant="body1">
        Click &quot;Generate WiFi Names&quot; for 3 punny, creative suggestions for your home or office
        WiFi network name (SSID), drawn from a hand-picked list of over 60 options. Click
        &quot;Regenerate&quot; for a fresh set any time.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        One click might suggest &quot;Pretty Fly for a WiFi&quot;, &quot;The LAN Before Time&quot;, and
        &quot;Drop It Like It&apos;s Hotspot&quot; — three classic router-naming puns to choose from.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Picking a funnier name than &quot;Netgear123&quot; for a new home router.</li>
          <li>Refreshing a shared office or apartment WiFi name with something more memorable.</li>
          <li>Finding inspiration for a guest network name that gets a laugh.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>
            <strong>Do I need to change any settings to use these?</strong> No — this tool only generates
            name ideas. To actually rename your network, log into your router&apos;s admin settings (usually
            through a browser at its local IP address) and update the SSID field there.
          </li>
          <li>
            <strong>Will changing my WiFi name disconnect my devices?</strong> Yes, typically — devices
            connected to the old network name will need to reconnect to the new name and re-enter the
            password once you save the change on your router.
          </li>
          <li>
            <strong>How many names does this generator draw from?</strong> Over 60 hand-picked options,
            with 3 shown at random on each click.
          </li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/wifi-network-name-generator" content={content}>
      <WifiNetworkNameGeneratorContent />
      <Box sx={{ mt: 4 }}>
        <AdSenseUnit />
      </Box>
    </CalculatorShell>
  );
};

export default WifiNetworkNameGenerator;
