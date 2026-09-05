'use client';

import { useMemo, useState } from 'react';
import { Box, Typography, TextField, Paper, IconButton, Stack, Grid } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const DIRECTIVES = [
  { key: 'default-src', label: 'default-src' },
  { key: 'script-src', label: 'script-src' },
  { key: 'style-src', label: 'style-src' },
  { key: 'img-src', label: 'img-src' },
  { key: 'font-src', label: 'font-src' },
  { key: 'connect-src', label: 'connect-src' },
  { key: 'frame-src', label: 'frame-src' },
  { key: 'object-src', label: 'object-src' },
];

const CspGeneratorContent = () => {
  const [values, setValues] = useState<Record<string, string>>({ 'default-src': "'self'" });

  const header = useMemo(() => {
    return DIRECTIVES
      .filter((d) => values[d.key]?.trim())
      .map((d) => `${d.key} ${values[d.key].trim()};`)
      .join(' ');
  }, [values]);

  const copyHeader = async () => {
    if (!header) return;
    try { await navigator.clipboard.writeText(header); } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box>
        <Grid container spacing={2}>
          {DIRECTIVES.map((d) => (
            <Grid item xs={12} key={d.key}>
              <TextField
                label={d.label}
                value={values[d.key] || ''}
                onChange={(e) => setValues((prev) => ({ ...prev, [d.key]: e.target.value }))}
                fullWidth
                size="small"
                placeholder="'self' https://cdn.example.com"
              />
            </Grid>
          ))}
        </Grid>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          Common values: <code>&apos;self&apos;</code>, <code>&apos;none&apos;</code>, <code>&apos;unsafe-inline&apos;</code>, or a full origin like <code>https://cdn.example.com</code>. Only directives you fill in are included.
        </Typography>
      </Box>

      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle1" fontWeight={600}>Content-Security-Policy Header</Typography>
          <IconButton size="small" onClick={copyHeader} aria-label="Copy header">
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Stack>
        <Paper variant="outlined" sx={{ p: 2, minHeight: 120, fontFamily: 'monospace', wordBreak: 'break-word' }}>
          {header || <Typography color="text.secondary" component="span">Fill in at least one directive to build your header.</Typography>}
        </Paper>
      </Box>
    </Box>
  );
};

const CspGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the CSP Generator</Typography>
      <Typography variant="body1">
        A Content-Security-Policy (CSP) is an HTTP response header that tells the browser which sources of
        content — scripts, styles, images, fonts, and more — are allowed to load on your page, which helps
        prevent cross-site scripting (XSS) and other injection attacks. Fill in a space-separated list of
        allowed sources for whichever directives apply to your site; only directives you actually fill in are
        included in the final header. <code>default-src</code> sets the fallback policy for any resource type
        not covered by a more specific directive, <code>script-src</code> controls which sources JavaScript
        can be loaded from, and <code>img-src</code> controls where images may load from.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Setting <code>default-src</code> to <code>&apos;self&apos;</code> and <code>script-src</code> to
        <code> &apos;self&apos; https://cdn.example.com</code> produces:
        <br />
        <code>default-src &apos;self&apos;; script-src &apos;self&apos; https://cdn.example.com;</code>
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Building a starting CSP header for a new web application.</li>
          <li>Restricting which external domains can load scripts, styles, or images on a page.</li>
          <li>Documenting an existing security policy in a readable, editable format.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What does &apos;self&apos; mean?</strong> It restricts loading to the same origin (scheme, host, and port) as the page itself, which is the most common and safest baseline value for most directives.</li>
          <li><strong>What happens if I leave a directive blank?</strong> Blank directives are simply left out of the generated header entirely — the browser then falls back to whatever <code>default-src</code> specifies for that resource type, or allows it if no default is set.</li>
          <li><strong>Where do I put the generated header?</strong> Set it as the value of the <code>Content-Security-Policy</code> HTTP response header from your server, or as a <code>&lt;meta http-equiv=&quot;Content-Security-Policy&quot;&gt;</code> tag in your page&apos;s <code>&lt;head&gt;</code> if you can&apos;t control response headers directly.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/csp-generator" content={content}>
      <CspGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CspGenerator;
