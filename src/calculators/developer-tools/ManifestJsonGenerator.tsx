'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Button, MenuItem } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const DISPLAY_MODES = ['standalone', 'fullscreen', 'minimal-ui', 'browser'] as const;

const ManifestJsonGeneratorContent = () => {
  const [name, setName] = useState('My Progressive Web App');
  const [shortName, setShortName] = useState('My App');
  const [description, setDescription] = useState('An installable web application.');
  const [startUrl, setStartUrl] = useState('/');
  const [display, setDisplay] = useState<(typeof DISPLAY_MODES)[number]>('standalone');
  const [themeColor, setThemeColor] = useState('#1976d2');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [icon192, setIcon192] = useState('/icon-192x192.png');
  const [icon512, setIcon512] = useState('/icon-512x512.png');
  const [copied, setCopied] = useState(false);

  const manifest = useMemo(() => {
    const obj = {
      name,
      short_name: shortName,
      description,
      start_url: startUrl,
      display,
      theme_color: themeColor,
      background_color: backgroundColor,
      icons: [
        { src: icon192, sizes: '192x192', type: 'image/png' },
        { src: icon512, sizes: '512x512', type: 'image/png' },
      ],
    };
    return JSON.stringify(obj, null, 2);
  }, [name, shortName, description, startUrl, display, themeColor, backgroundColor, icon192, icon512]);

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(manifest);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="App Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
        <TextField label="Short Name" value={shortName} onChange={(e) => setShortName(e.target.value)} fullWidth />
        <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} multiline rows={2} fullWidth />
        <TextField label="Start URL" value={startUrl} onChange={(e) => setStartUrl(e.target.value)} fullWidth />
        <TextField select label="Display Mode" value={display} onChange={(e) => setDisplay(e.target.value as typeof display)} fullWidth>
          {DISPLAY_MODES.map((m) => (
            <MenuItem key={m} value={m}>{m}</MenuItem>
          ))}
        </TextField>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField label="Theme Color" type="color" value={themeColor} onChange={(e) => setThemeColor(e.target.value)} sx={{ width: '50%' }} />
          <TextField label="Background Color" type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} sx={{ width: '50%' }} />
        </Box>
        <TextField label="Icon URL (192x192)" value={icon192} onChange={(e) => setIcon192(e.target.value)} fullWidth />
        <TextField label="Icon URL (512x512)" value={icon512} onChange={(e) => setIcon512(e.target.value)} fullWidth />
      </Box>

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" fontWeight="600">manifest.json:</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyResult}>
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </Box>
        <Paper variant="outlined" sx={{ p: 2, fontFamily: 'monospace', fontSize: '0.8rem', whiteSpace: 'pre-wrap', wordBreak: 'break-all', bgcolor: 'action.hover', minHeight: 300 }}>
          {manifest}
        </Paper>
      </Box>
    </Box>
  );
};

const ManifestJsonGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Manifest.json Generator</Typography>
      <Typography variant="body1">
        A web app manifest is a JSON file that tells browsers how your Progressive Web App (PWA) should behave
        when installed — its name, icons, colors, and display style. Fill in your app&apos;s name, short name,
        description, start URL, preferred display mode, theme and background colors, and icon URLs for the two
        most common sizes, then copy the generated JSON into a file named <code>manifest.json</code> at the root
        of your site, and link to it from your HTML with{' '}
        <code>{'<link rel="manifest" href="/manifest.json">'}</code>.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Setting display mode to <code>standalone</code> makes the installed app open in its own window without
        browser chrome (address bar, tabs), giving it a native-app-like feel on a phone&apos;s home screen.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Making a website installable as a Progressive Web App on mobile and desktop.</li>
          <li>Setting the icon, splash-screen colors, and app name shown when a user adds your site to their home screen.</li>
          <li>Passing PWA-related checks in Lighthouse or other site-quality audits.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What&apos;s the difference between name and short_name?</strong> <code>name</code> is the full app name shown on install prompts and app listings, while <code>short_name</code> is a shorter label used where space is limited, such as under a home-screen icon.</li>
          <li><strong>Which display mode should I pick?</strong> <code>standalone</code> is the most common choice for app-like experiences; <code>fullscreen</code> hides even the status bar for immersive apps like games; <code>minimal-ui</code> keeps a few browser controls; <code>browser</code> opens like a normal browser tab.</li>
          <li><strong>Do I need more icon sizes than 192x192 and 512x512?</strong> Those two cover the vast majority of PWA install and splash-screen requirements across platforms, though some platforms may use additional sizes or maskable icon variants for finer visual control.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/manifest-json-generator" content={content}>
      <ManifestJsonGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ManifestJsonGenerator;
