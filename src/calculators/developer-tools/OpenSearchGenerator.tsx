'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Button, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const OpenSearchGeneratorContent = () => {
  const [shortName, setShortName] = useState('My Site');
  const [description, setDescription] = useState('Search My Site');
  const [searchUrl, setSearchUrl] = useState('https://example.com/search?q={searchTerms}');
  const [faviconUrl, setFaviconUrl] = useState('https://example.com/favicon.ico');
  const [copied, setCopied] = useState(false);

  const hasSearchTerms = searchUrl.includes('{searchTerms}');

  const xml = useMemo(() => {
    if (!hasSearchTerms) return '';
    return `<?xml version="1.0" encoding="UTF-8"?>
<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/">
  <ShortName>${escapeXml(shortName)}</ShortName>
  <Description>${escapeXml(description)}</Description>
  <InputEncoding>UTF-8</InputEncoding>
  <Url type="text/html" template="${escapeXml(searchUrl)}"/>
  <Image height="16" width="16" type="image/x-icon">${escapeXml(faviconUrl)}</Image>
</OpenSearchDescription>`;
  }, [shortName, description, searchUrl, faviconUrl, hasSearchTerms]);

  const copyResult = async () => {
    if (!xml) return;
    try {
      await navigator.clipboard.writeText(xml);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Short Name" value={shortName} onChange={(e) => setShortName(e.target.value)} fullWidth />
        <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} fullWidth />
        <TextField
          label="Search URL Template"
          value={searchUrl}
          onChange={(e) => setSearchUrl(e.target.value)}
          helperText="Must contain the literal placeholder {searchTerms}"
          error={!hasSearchTerms}
          fullWidth
        />
        {!hasSearchTerms && (
          <Alert severity="error">The search URL template must include the placeholder <code>{'{searchTerms}'}</code> where the user&apos;s query goes.</Alert>
        )}
        <TextField label="Favicon URL" value={faviconUrl} onChange={(e) => setFaviconUrl(e.target.value)} fullWidth />
      </Box>

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" fontWeight="600">opensearch.xml:</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyResult} disabled={!xml}>
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </Box>
        <Paper variant="outlined" sx={{ p: 2, fontFamily: 'monospace', fontSize: '0.8rem', whiteSpace: 'pre-wrap', wordBreak: 'break-all', bgcolor: 'action.hover', minHeight: 200 }}>
          {xml || 'Fix the search URL template to generate output.'}
        </Paper>
      </Box>
    </Box>
  );
};

const OpenSearchGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the OpenSearch Generator</Typography>
      <Typography variant="body1">
        OpenSearch is a standard XML format that lets browsers offer your site&apos;s search as a custom search
        engine a visitor can add to their browser. Fill in a short name, description, the search URL your site
        uses (with <code>{'{searchTerms}'}</code> marking where the query text goes), and a favicon URL, then
        copy the generated <code>opensearch.xml</code> file. Host it on your site and reference it from your
        HTML <code>&lt;head&gt;</code> with{' '}
        <code>{'<link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title="Your Site">'}</code>.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A search URL template of <code>https://example.com/search?q={'{searchTerms}'}</code> tells the browser to
        replace <code>{'{searchTerms}'}</code> with the user&apos;s typed query and send them straight to your
        search results page.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Letting visitors add your site&apos;s internal search as a custom search engine in their browser.</li>
          <li>Meeting a checklist item for browser-integration or site-discoverability audits.</li>
          <li>Providing autodiscovery so browser address bars can suggest your site as a search shortcut.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What happens if my search URL doesn&apos;t contain {'{searchTerms}'}?</strong> The generator blocks output and shows an error, since a template without that placeholder gives the browser nowhere to insert the user&apos;s search query, making the description document useless.</li>
          <li><strong>Where do I host the generated file?</strong> Anywhere on your domain — commonly at the root, e.g. <code>/opensearch.xml</code> — then link to it from your page&apos;s <code>&lt;head&gt;</code> so browsers can discover it automatically.</li>
          <li><strong>Do all browsers support OpenSearch autodiscovery?</strong> Support varies by browser and has changed over time, so treat it as a nice-to-have enhancement for browsers that support it rather than a feature every visitor will see.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/opensearch-generator" content={content}>
      <OpenSearchGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default OpenSearchGenerator;
