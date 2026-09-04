'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Button, FormControlLabel, Checkbox, FormGroup } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const TRACKING_PARAMS = [
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
  'gclid', 'fbclid', 'msclkid', 'mc_cid', 'mc_eid', 'igshid', 'ref', 'yclid',
];

const CanonicalUrlGeneratorContent = () => {
  const [urlInput, setUrlInput] = useState('https://example.com/blog/my-post?utm_source=newsletter&utm_medium=email&id=42');
  const [baseOverride, setBaseOverride] = useState('');
  const [checked, setChecked] = useState<Record<string, boolean>>(
    Object.fromEntries(TRACKING_PARAMS.map((p) => [p, true]))
  );

  const toggle = (param: string) => setChecked((prev) => ({ ...prev, [param]: !prev[param] }));

  const result = useMemo(() => {
    try {
      const url = new URL(urlInput.trim());
      TRACKING_PARAMS.forEach((param) => {
        if (checked[param]) url.searchParams.delete(param);
      });
      url.hash = '';

      let finalUrl = url.toString();
      if (baseOverride.trim()) {
        try {
          const override = new URL(baseOverride.trim());
          finalUrl = `${override.origin}${url.pathname}${url.search}`;
        } catch {
          // ignore invalid override, fall back to parsed URL
        }
      }

      return { url: finalUrl, error: null as string | null };
    } catch {
      return { url: '', error: 'Enter a valid, complete URL (including https://).' };
    }
  }, [urlInput, baseOverride, checked]);

  const tag = result.url ? `<link rel="canonical" href="${result.url}" />` : '';

  const copy = (value: string) => value && navigator.clipboard.writeText(value);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TextField
        label="Full URL (with query parameters)"
        value={urlInput}
        onChange={(e) => setUrlInput(e.target.value)}
        fullWidth
        placeholder="https://example.com/page?utm_source=..."
      />
      <TextField
        label="Override Base URL (optional)"
        value={baseOverride}
        onChange={(e) => setBaseOverride(e.target.value)}
        fullWidth
        helperText="If set, replaces the scheme + domain of the URL above (path and remaining query are kept)."
        placeholder="https://www.example.com"
      />

      <Box>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
          Strip these tracking parameters
        </Typography>
        <FormGroup sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr 1fr' } }}>
          {TRACKING_PARAMS.map((param) => (
            <FormControlLabel
              key={param}
              control={<Checkbox checked={checked[param]} onChange={() => toggle(param)} size="small" />}
              label={param}
            />
          ))}
        </FormGroup>
      </Box>

      {result.error ? (
        <Typography color="error">{result.error}</Typography>
      ) : (
        <>
          <Paper variant="outlined" sx={{ p: 2, position: 'relative', wordBreak: 'break-all' }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>Cleaned Canonical URL</Typography>
            <Typography fontFamily="monospace">{result.url}</Typography>
            <Button size="small" startIcon={<ContentCopyIcon />} onClick={() => copy(result.url)} sx={{ position: 'absolute', top: 8, right: 8 }}>
              Copy
            </Button>
          </Paper>
          <Paper variant="outlined" sx={{ p: 2, position: 'relative', bgcolor: 'grey.900', color: '#10b981', fontFamily: 'monospace', wordBreak: 'break-all' }}>
            {tag}
            <Button size="small" variant="contained" startIcon={<ContentCopyIcon />} onClick={() => copy(tag)} sx={{ position: 'absolute', top: 8, right: 8 }}>
              Copy
            </Button>
          </Paper>
        </>
      )}
    </Box>
  );
};

const CanonicalUrlGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How the Canonical URL Generator Works</Typography>
      <Typography variant="body1">
        Paste a full URL — including any query parameters or tracking codes — and choose which common tracking
        parameters to strip (utm_* campaign tags, fbclid, gclid, and others). The tool outputs a cleaned
        canonical URL plus a ready-to-paste <code>&lt;link rel=&quot;canonical&quot;&gt;</code> tag for your
        page&apos;s <code>&lt;head&gt;</code>.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        <code>https://example.com/blog/my-post?utm_source=newsletter&amp;utm_medium=email&amp;id=42</code> with
        the utm_* boxes checked becomes <code>https://example.com/blog/my-post?id=42</code>, along with the
        matching canonical tag ready to paste into your page.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Generating a canonical tag for a page that&apos;s shared with tracking parameters attached.</li>
          <li>Cleaning marketing campaign URLs before treating them as the page&apos;s canonical address.</li>
          <li>Standardizing a page&apos;s canonical URL to a preferred domain using the base URL override.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why does a canonical tag matter for SEO?</Typography>
      <Typography variant="body1">
        A canonical tag tells search engines which URL is the authoritative version of a page when the same
        content is reachable through multiple URLs (with different tracking parameters, for example). Without
        it, search engines may split ranking signals across several near-duplicate URLs instead of consolidating
        them onto one.
      </Typography>
      <Typography variant="h3">Should I strip every query parameter, not just tracking ones?</Typography>
      <Typography variant="body1">
        Not necessarily — parameters that change the actual page content (like a product ID or search query)
        usually should stay in the canonical URL, while tracking parameters that don&apos;t affect the content
        (like utm_* tags) are the ones typically safe to strip.
      </Typography>
      <Typography variant="h3">What does the base URL override field do?</Typography>
      <Typography variant="body1">
        It lets you swap the scheme and domain of the cleaned URL — useful if your page is reachable on multiple
        domains or subdomains but you want the canonical tag to always point at one preferred domain, while
        keeping the same path and cleaned query string.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/canonical-url-generator" content={content}>
      <CanonicalUrlGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CanonicalUrlGenerator;
