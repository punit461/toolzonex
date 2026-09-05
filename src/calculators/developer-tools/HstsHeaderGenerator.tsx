'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, FormControlLabel, Checkbox, Button, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const HstsHeaderGeneratorContent = () => {
  const [maxAge, setMaxAge] = useState('63072000');
  const [includeSubDomains, setIncludeSubDomains] = useState(true);
  const [preload, setPreload] = useState(false);
  const [copied, setCopied] = useState(false);

  const header = useMemo(() => {
    const age = parseInt(maxAge, 10);
    const safeAge = isNaN(age) || age < 0 ? 0 : age;
    const parts = [`max-age=${safeAge}`];
    if (includeSubDomains) parts.push('includeSubDomains');
    if (preload) parts.push('preload');
    return `Strict-Transport-Security: ${parts.join('; ')}`;
  }, [maxAge, includeSubDomains, preload]);

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(header);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="max-age (seconds)"
          type="number"
          value={maxAge}
          onChange={(e) => setMaxAge(e.target.value)}
          helperText="63072000 = 2 years, a commonly recommended value"
          fullWidth
        />
        <FormControlLabel
          control={<Checkbox checked={includeSubDomains} onChange={(e) => setIncludeSubDomains(e.target.checked)} />}
          label="includeSubDomains — also apply HSTS to all subdomains"
        />
        <FormControlLabel
          control={<Checkbox checked={preload} onChange={(e) => setPreload(e.target.checked)} />}
          label="preload — request inclusion in the browser HSTS preload list"
        />
        {preload && (
          <Alert severity="warning">
            Submitting to the HSTS preload list is a serious, hard-to-reverse commitment — only enable this once
            your entire site (and all subdomains) is fully HTTPS-ready, since removal from the preload list can
            take months to propagate to browsers.
          </Alert>
        )}
      </Box>

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" fontWeight="600">Header:</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyResult}>
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </Box>
        <Paper variant="outlined" sx={{ p: 2, fontFamily: 'monospace', fontSize: '0.9rem', wordBreak: 'break-all', bgcolor: 'action.hover' }}>
          {header}
        </Paper>
      </Box>
    </Box>
  );
};

const HstsHeaderGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the HSTS Header Generator</Typography>
      <Typography variant="body1">
        HTTP Strict Transport Security (HSTS) is a response header that tells browsers to only ever connect to
        your site over HTTPS, never plain HTTP, for the duration you specify — even if a user types
        &quot;http://&quot; or clicks an old HTTP link. Set a max-age in seconds (two years, 63072000, is a
        commonly recommended value), decide whether it should also apply to all subdomains, and optionally flag
        the header for preload submission. Copy the assembled header and set it as the value of the
        <code> Strict-Transport-Security</code> response header from your web server or CDN.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A max-age of 63072000 with includeSubDomains and preload both enabled produces:
        <br />
        <code>Strict-Transport-Security: max-age=63072000; includeSubDomains; preload</code>
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Preventing man-in-the-middle downgrade attacks that try to force a visitor onto plain HTTP.</li>
          <li>Ensuring every subdomain of a site is also forced onto HTTPS automatically.</li>
          <li>Preparing the exact header value needed before applying to the Chromium HSTS preload list.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What does HSTS actually protect against?</strong> It stops browsers from ever making a plain HTTP request to your domain once the header has been seen, closing the window an attacker could otherwise use to intercept an initial unencrypted request and redirect or downgrade it.</li>
          <li><strong>Is submitting to the preload list reversible?</strong> Not easily — the list ships baked into browser binaries, so removing a domain can take months to reach users, and it should only be done once your entire site (including every subdomain, if includeSubDomains is set) is fully and permanently HTTPS-ready.</li>
          <li><strong>What max-age should I start with?</strong> Many sites start with a shorter value (like a few minutes or hours) to confirm HTTPS is working correctly everywhere, then increase it to a long duration such as one or two years once confident.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/hsts-header-generator" content={content}>
      <HstsHeaderGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default HstsHeaderGenerator;
