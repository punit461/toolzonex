'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Button, Paper, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const CHANGEFREQ_OPTIONS = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'];
const PRIORITY_OPTIONS = ['1.0', '0.9', '0.8', '0.7', '0.6', '0.5', '0.4', '0.3', '0.2', '0.1', '0.0'];

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildSitemap(urls: string[], changefreq: string, priority: string, includeLastmod: boolean): string {
  const lastmod = new Date().toISOString().slice(0, 10);
  const entries = urls
    .map((rawUrl) => {
      const url = rawUrl.trim();
      if (!url) return null;
      let entry = '  <url>\n';
      entry += `    <loc>${escapeXml(url)}</loc>\n`;
      if (includeLastmod) entry += `    <lastmod>${lastmod}</lastmod>\n`;
      if (changefreq) entry += `    <changefreq>${changefreq}</changefreq>\n`;
      if (priority) entry += `    <priority>${priority}</priority>\n`;
      entry += '  </url>';
      return entry;
    })
    .filter((e): e is string => e !== null)
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>`;
}

const SitemapGeneratorContent = () => {
  const [urlsText, setUrlsText] = useState('');
  const [changefreq, setChangefreq] = useState('weekly');
  const [priority, setPriority] = useState('0.8');
  const [includeLastmod, setIncludeLastmod] = useState(true);
  const [output, setOutput] = useState('');

  const generate = () => {
    const urls = urlsText.split('\n').map((u) => u.trim()).filter(Boolean);
    if (urls.length === 0) {
      setOutput('');
      return;
    }
    setOutput(buildSitemap(urls, changefreq, priority, includeLastmod));
  };

  const copyOutput = () => {
    if (output) navigator.clipboard.writeText(output);
  };

  const downloadOutput = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Alert severity="info">
        This tool builds a sitemap.xml from URLs you paste — it doesn't crawl your website automatically
        (that would require server access this static tool doesn't have). Paste your own list of page URLs
        below, one per line.
      </Alert>

      <TextField
        multiline
        rows={8}
        label="URLs (one per line)"
        value={urlsText}
        onChange={(e) => setUrlsText(e.target.value)}
        placeholder={'https://example.com/\nhttps://example.com/about\nhttps://example.com/blog/post-1'}
        fullWidth
        variant="outlined"
        sx={{ fontFamily: 'monospace' }}
      />

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' }, gap: 2, alignItems: 'center' }}>
        <FormControl fullWidth size="small">
          <InputLabel>Default Change Frequency</InputLabel>
          <Select value={changefreq} label="Default Change Frequency" onChange={(e) => setChangefreq(e.target.value)}>
            {CHANGEFREQ_OPTIONS.map((f) => <MenuItem key={f} value={f}>{f}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl fullWidth size="small">
          <InputLabel>Default Priority</InputLabel>
          <Select value={priority} label="Default Priority" onChange={(e) => setPriority(e.target.value)}>
            {PRIORITY_OPTIONS.map((p) => <MenuItem key={p} value={p}>{p}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControlLabel
          control={<Checkbox checked={includeLastmod} onChange={(e) => setIncludeLastmod(e.target.checked)} />}
          label="Include <lastmod> (today's date)"
        />
      </Box>

      <Button variant="contained" onClick={generate} size="large">Generate Sitemap</Button>

      {output && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle1" fontWeight="600">sitemap.xml</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button startIcon={<ContentCopyIcon />} onClick={copyOutput} size="small">Copy</Button>
              <Button startIcon={<DownloadIcon />} onClick={downloadOutput} size="small" variant="contained">Download</Button>
            </Box>
          </Box>
          <Paper
            variant="outlined"
            sx={{ p: 2, maxHeight: 400, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}
          >
            {output}
          </Paper>
        </Box>
      )}
    </Box>
  );
};

const SitemapGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">Free Sitemap.xml Generator</Typography>
      <Typography variant="body1">
        Paste a list of your page URLs and generate a valid <code>sitemap.xml</code> file — complete with
        <code>changefreq</code>, <code>priority</code>, and an optional <code>lastmod</code> date — ready to
        upload to your site's root or submit to Google Search Console.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste one URL per line into the textarea, choose a default change frequency and priority to apply to
        every URL, optionally include a <code>{'<lastmod>'}</code> tag with today's date, then click "Generate
        Sitemap." Copy the result or download it directly as a <code>sitemap.xml</code> file.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Pasting three URLs with "weekly" change frequency and priority "0.8" produces a sitemap where each
        page is wrapped in a <code>{'<url>'}</code> block with matching <code>{'<changefreq>'}</code> and
        <code>{'<priority>'}</code> tags, ready to drop onto your server.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Building a sitemap for a small static site or landing page without a build pipeline.</li>
          <li>Quickly regenerating a sitemap after adding a handful of new pages.</li>
          <li>Producing a valid sitemap.xml to submit to Google Search Console or Bing Webmaster Tools.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does this tool crawl my website automatically?</Typography>
      <Typography variant="body1">
        No — this tool doesn't crawl your site automatically. Browser-based tools can't fetch and follow links
        across an entire domain due to CORS restrictions and the lack of a backend crawler. Instead, paste
        your own list of page URLs and the tool builds a valid sitemap.xml from them.
      </Typography>
      <Typography variant="h3">Can each URL have a different priority or change frequency?</Typography>
      <Typography variant="body1">
        This version applies one chosen change frequency and priority to every URL in the list for simplicity.
        If you need different values per URL, generate separate batches and merge the resulting
        <code>{'<url>'}</code> blocks manually.
      </Typography>
      <Typography variant="h3">What does the priority value actually do?</Typography>
      <Typography variant="body1">
        Priority is a hint (0.0-1.0) to search engines about a page's relative importance within your own
        site — it doesn't affect ranking compared to other websites, and most search engines treat it as a
        weak signal at best.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/sitemap-generator" content={content}>
      <SitemapGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default SitemapGenerator;
