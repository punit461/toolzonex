'use client';

import { useMemo, useState } from 'react';
import { Box, Typography, TextField, Paper, IconButton, Stack, FormControlLabel, Checkbox, Grid } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const FaviconHtmlGeneratorContent = () => {
  const [basePath, setBasePath] = useState('/favicon');
  const [options, setOptions] = useState({
    ico: true,
    png16: true,
    png32: true,
    apple180: true,
    android192: false,
    android512: false,
    manifest: false,
    themeColor: false,
  });
  const [color, setColor] = useState('#1976d2');

  const toggle = (key: keyof typeof options) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const html = useMemo(() => {
    const lines: string[] = [];
    const p = basePath.trim() || '/favicon';
    if (options.ico) lines.push(`<link rel="icon" href="${p}.ico" sizes="any">`);
    if (options.png16) lines.push(`<link rel="icon" type="image/png" sizes="16x16" href="${p}-16x16.png">`);
    if (options.png32) lines.push(`<link rel="icon" type="image/png" sizes="32x32" href="${p}-32x32.png">`);
    if (options.apple180) lines.push(`<link rel="apple-touch-icon" sizes="180x180" href="${p}-apple-touch-icon.png">`);
    if (options.android192) lines.push(`<link rel="icon" type="image/png" sizes="192x192" href="${p}-android-chrome-192x192.png">`);
    if (options.android512) lines.push(`<link rel="icon" type="image/png" sizes="512x512" href="${p}-android-chrome-512x512.png">`);
    if (options.manifest) lines.push(`<link rel="manifest" href="/site.webmanifest">`);
    if (options.themeColor) lines.push(`<meta name="theme-color" content="${color}">`);
    return lines.join('\n');
  }, [basePath, options, color]);

  const copyHtml = async () => {
    if (!html) return;
    try { await navigator.clipboard.writeText(html); } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box>
        <TextField
          label="Base Path / Filename Prefix"
          value={basePath}
          onChange={(e) => setBasePath(e.target.value)}
          fullWidth
          sx={{ mb: 3 }}
          helperText="Where your favicon files live, e.g. /favicon"
        />
        <Grid container>
          <Grid item xs={12}><FormControlLabel control={<Checkbox checked={options.ico} onChange={() => toggle('ico')} />} label="favicon.ico" /></Grid>
          <Grid item xs={12}><FormControlLabel control={<Checkbox checked={options.png16} onChange={() => toggle('png16')} />} label="16×16 PNG" /></Grid>
          <Grid item xs={12}><FormControlLabel control={<Checkbox checked={options.png32} onChange={() => toggle('png32')} />} label="32×32 PNG" /></Grid>
          <Grid item xs={12}><FormControlLabel control={<Checkbox checked={options.apple180} onChange={() => toggle('apple180')} />} label="Apple Touch Icon (180×180)" /></Grid>
          <Grid item xs={12}><FormControlLabel control={<Checkbox checked={options.android192} onChange={() => toggle('android192')} />} label="Android Chrome (192×192)" /></Grid>
          <Grid item xs={12}><FormControlLabel control={<Checkbox checked={options.android512} onChange={() => toggle('android512')} />} label="Android Chrome (512×512)" /></Grid>
          <Grid item xs={12}><FormControlLabel control={<Checkbox checked={options.manifest} onChange={() => toggle('manifest')} />} label="site.webmanifest" /></Grid>
          <Grid item xs={12}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <FormControlLabel control={<Checkbox checked={options.themeColor} onChange={() => toggle('themeColor')} />} label="Theme Color meta tag" />
              {options.themeColor && (
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)} style={{ width: 36, height: 28, border: 'none', background: 'none' }} />
              )}
            </Stack>
          </Grid>
        </Grid>
      </Box>

      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle1" fontWeight={600}>HTML to Paste in &lt;head&gt;</Typography>
          <IconButton size="small" onClick={copyHtml} aria-label="Copy HTML">
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Stack>
        <Paper variant="outlined" sx={{ p: 2, minHeight: 200, fontFamily: 'monospace', fontSize: '0.85rem', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
          {html || 'Select at least one asset above.'}
        </Paper>
      </Box>
    </Box>
  );
};

const FaviconHtmlGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Favicon HTML Generator</Typography>
      <Typography variant="body1">
        Enter the base path where your favicon files are hosted (defaults to <code>/favicon</code>), then
        check off which icon assets you actually have — favicon.ico, 16×16 and 32×32 PNGs, an Apple touch
        icon, Android Chrome icons, a web manifest, and an optional theme-color meta tag. The tool builds the
        exact <code>&lt;link&gt;</code> and <code>&lt;meta&gt;</code> tags for the assets you selected, ready
        to copy directly into your page&apos;s <code>&lt;head&gt;</code>.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        With base path <code>/favicon</code> and only the 32×32 PNG and Apple touch icon checked, the tool
        outputs:
        <br />
        <code>&lt;link rel=&quot;icon&quot; type=&quot;image/png&quot; sizes=&quot;32x32&quot; href=&quot;/favicon-32x32.png&quot;&gt;</code>
        <br />
        <code>&lt;link rel=&quot;apple-touch-icon&quot; sizes=&quot;180x180&quot; href=&quot;/favicon-apple-touch-icon.png&quot;&gt;</code>
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Generating the correct favicon tags after creating a new set of icon assets.</li>
          <li>Making sure a site supports Apple touch icons and Android home-screen icons correctly.</li>
          <li>Quickly producing a theme-color meta tag to match a mobile browser&apos;s UI to your brand.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Do I need every icon size?</strong> No — modern browsers only need a handful (favicon.ico plus a couple of PNG sizes) to work well everywhere, but including Apple touch and Android icons improves how your site looks when added to a phone&apos;s home screen.</li>
          <li><strong>What is the theme-color meta tag for?</strong> It tells supporting mobile browsers (mainly Android Chrome) what color to use for UI elements like the browser toolbar when a user visits your site.</li>
          <li><strong>Do I still need to create the actual image files?</strong> Yes — this tool only generates the HTML tags that reference your files; you still need to create the actual .ico and .png files at the sizes and paths referenced (a tool like the Apple Touch Icon Generator can help produce one of them).</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/favicon-html-generator" content={content}>
      <FaviconHtmlGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default FaviconHtmlGenerator;
