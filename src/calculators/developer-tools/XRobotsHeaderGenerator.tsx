'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, FormControlLabel, Checkbox, Button, FormGroup } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const DIRECTIVES = ['noindex', 'nofollow', 'noarchive', 'nosnippet', 'noimageindex', 'none', 'all'] as const;
type Directive = (typeof DIRECTIVES)[number];

const XRobotsHeaderGeneratorContent = () => {
  const [selected, setSelected] = useState<Record<Directive, boolean>>({
    noindex: true,
    nofollow: false,
    noarchive: false,
    nosnippet: false,
    noimageindex: false,
    none: false,
    all: false,
  });
  const [userAgent, setUserAgent] = useState('');
  const [copied, setCopied] = useState(false);

  const toggle = (d: Directive) => {
    setSelected((prev) => ({ ...prev, [d]: !prev[d] }));
  };

  const header = useMemo(() => {
    const active = DIRECTIVES.filter((d) => selected[d]);
    if (active.length === 0) return '';
    const value = userAgent.trim() ? `${userAgent.trim()}: ${active.join(', ')}` : active.join(', ');
    return `X-Robots-Tag: ${value}`;
  }, [selected, userAgent]);

  const copyResult = async () => {
    if (!header) return;
    try {
      await navigator.clipboard.writeText(header);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle2" color="text.secondary">Directives</Typography>
        <FormGroup>
          {DIRECTIVES.map((d) => (
            <FormControlLabel
              key={d}
              control={<Checkbox checked={selected[d]} onChange={() => toggle(d)} />}
              label={d}
            />
          ))}
        </FormGroup>
        <TextField
          label="Target user-agent (optional)"
          placeholder="e.g. googlebot"
          value={userAgent}
          onChange={(e) => setUserAgent(e.target.value)}
          helperText="Leave blank to apply the directives to all crawlers"
          fullWidth
        />
      </Box>

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" fontWeight="600">Header:</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyResult} disabled={!header}>
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </Box>
        <Paper variant="outlined" sx={{ p: 2, fontFamily: 'monospace', fontSize: '0.9rem', wordBreak: 'break-all', bgcolor: 'action.hover', minHeight: 48 }}>
          {header || 'Select at least one directive above.'}
        </Paper>
      </Box>
    </Box>
  );
};

const XRobotsHeaderGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the X-Robots Header Generator</Typography>
      <Typography variant="body1">
        Tick the indexing directives you want to apply — such as <code>noindex</code> or{' '}
        <code>nofollow</code> — and optionally target a specific crawler by name (e.g.{' '}
        <code>googlebot</code>). The tool assembles the resulting <code>X-Robots-Tag</code> HTTP response header
        for you to add to your server or CDN configuration for the resource in question.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Checking <code>noindex</code> and <code>nofollow</code> with no target user-agent produces:
        <br />
        <code>X-Robots-Tag: noindex, nofollow</code>
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Blocking a PDF, image, or other non-HTML file from being indexed, since it can&apos;t carry a meta robots tag.</li>
          <li>Applying different indexing rules to a specific crawler (e.g. blocking one bot but not others).</li>
          <li>Deindexing a whole class of resources (like generated thumbnails) at the server-config level instead of editing every file.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Robots.txt Generator?</strong> Robots.txt is a text file that controls CRAWLING at the site or path level, and it can only stop a crawler from fetching a URL — it can&apos;t deindex a URL search engines already know about. X-Robots-Tag is an HTTP response HEADER applied per-resource that gives page-level INDEXING control, and it&apos;s the only option for non-HTML files like PDFs or images, which can&apos;t carry a meta robots tag at all.</li>
          <li><strong>What does the &quot;none&quot; directive do?</strong> It&apos;s shorthand equivalent to combining <code>noindex</code> and <code>nofollow</code> in a single directive.</li>
          <li><strong>When should I target a specific user-agent?</strong> Use it when you want different crawlers to receive different instructions for the same resource — for example, allowing a general search engine to index a page while blocking a specific bot by name.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/x-robots-header-generator" content={content}>
      <XRobotsHeaderGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default XRobotsHeaderGenerator;
