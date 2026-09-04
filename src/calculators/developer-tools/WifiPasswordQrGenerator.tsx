'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Encryption = 'WPA' | 'WEP' | 'nopass';

function escapeWifiSpecial(str: string): string {
  return str.replace(/([\\;,:".])/g, '\\$1');
}

function buildWifiString(ssid: string, password: string, encryption: Encryption): string {
  const p = encryption === 'nopass' ? '' : `P:${escapeWifiSpecial(password)};`;
  return `WIFI:T:${encryption};S:${escapeWifiSpecial(ssid)};${p};`;
}

const WifiPasswordQrGeneratorContent = () => {
  const [ssid, setSsid] = useState('MyHomeWiFi');
  const [password, setPassword] = useState('');
  const [encryption, setEncryption] = useState<Encryption>('WPA');

  const qrContainerRef = useRef<HTMLDivElement>(null);
  const qrInstance = useRef<any>(null);

  const wifiString = buildWifiString(ssid, password, encryption);

  useEffect(() => {
    if (typeof window === 'undefined' || !ssid) return;

    const renderQR = async () => {
      const QRCodeStyling = (await import('qr-code-styling')).default;
      const options: any = {
        width: 280,
        height: 280,
        margin: 10,
        data: wifiString,
        type: 'svg',
        dotsOptions: { color: '#000000', type: 'square' },
        backgroundOptions: { color: '#ffffff' },
        qrOptions: { errorCorrectionLevel: 'M' },
      };

      if (qrInstance.current) {
        qrInstance.current.update(options);
      } else {
        qrInstance.current = new QRCodeStyling(options);
        if (qrContainerRef.current) {
          qrContainerRef.current.innerHTML = '';
          qrInstance.current.append(qrContainerRef.current);
        }
      }
    };

    renderQR();
  }, [wifiString, ssid]);

  const downloadPNG = useCallback(() => {
    if (!qrInstance.current) return;
    qrInstance.current.download({ name: 'wifi-qr-code', extension: 'png' });
  }, []);

  const downloadSVG = useCallback(() => {
    if (!qrInstance.current) return;
    qrInstance.current.download({ name: 'wifi-qr-code', extension: 'svg' });
  }, []);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Network Name (SSID)" value={ssid} onChange={(e) => setSsid(e.target.value)} fullWidth required />
        <FormControl fullWidth>
          <InputLabel>Encryption</InputLabel>
          <Select value={encryption} label="Encryption" onChange={(e) => setEncryption(e.target.value as Encryption)}>
            <MenuItem value="WPA">WPA/WPA2</MenuItem>
            <MenuItem value="WEP">WEP</MenuItem>
            <MenuItem value="nopass">None (Open Network)</MenuItem>
          </Select>
        </FormControl>
        {encryption !== 'nopass' && (
          <TextField label="Password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth />
        )}
        <Typography variant="caption" color="text.secondary">
          Scan the QR code with a phone camera to join this network automatically — no typing required.
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
        <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, border: '1px solid', borderColor: 'divider' }}>
          <Typography variant="subtitle2" color="text.secondary">Live Preview</Typography>
          <Box
            ref={qrContainerRef}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 200, minWidth: 200, '& canvas, & svg': { maxWidth: '100%', height: 'auto' } }}
          />
        </Paper>
        <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
          <Button variant="contained" startIcon={<DownloadIcon />} onClick={downloadPNG} sx={{ flex: 1 }} disabled={!ssid}>PNG</Button>
          <Button variant="outlined" startIcon={<DownloadIcon />} onClick={downloadSVG} sx={{ flex: 1 }} disabled={!ssid}>SVG</Button>
        </Box>
      </Box>
    </Box>
  );
};

const WifiPasswordQrGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">Free WiFi Password QR Code Generator</Typography>
      <Typography variant="body1">
        Turn your WiFi network name and password into a scannable QR code so guests can join instantly with a
        phone camera — no typing a long, fiddly password by hand.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Enter your network name (SSID) and password, and choose the encryption type your router uses (WPA/WPA2
        is standard on most modern routers). The QR code updates instantly — download it as a PNG or SVG and
        print it or display it for guests to scan.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Entering the SSID "MyHomeWiFi" with a WPA password generates a QR code that, when scanned by a phone's
        camera app, prompts the phone to join that network automatically using the embedded credentials.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Printing a WiFi QR code on a card for guests, Airbnb visitors, or hotel rooms.</li>
          <li>Displaying a scannable network sign at a cafe, office, or event.</li>
          <li>Sharing WiFi access with visitors without reading a password aloud or typing it for them.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Which phones can scan a WiFi QR code?</Typography>
      <Typography variant="body1">
        Most modern iPhones (iOS 11+) and Android phones (Android 10+) can scan a WiFi QR code directly from the
        built-in camera app and join the network automatically, without installing a separate scanner app.
      </Typography>
      <Typography variant="h3">What encryption type should I choose?</Typography>
      <Typography variant="body1">
        Choose WPA/WPA2 for almost every modern home or office router — it's the current standard. Only choose
        WEP if your router specifically uses that older, less secure protocol, and choose "None" for an open
        network with no password.
      </Typography>
      <Typography variant="h3">Is my WiFi password uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — the QR code is generated entirely client-side in your browser. Your network name and password are
        never sent to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/wifi-password-qr-generator" content={content}>
      <WifiPasswordQrGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default WifiPasswordQrGenerator;
