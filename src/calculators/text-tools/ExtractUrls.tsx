'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, Button, Link as MuiLink } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const URL_REGEX = /https?:\/\/[^\s<>"{}|\\^`[\]]+|www\.[^\s<>"{}|\\^`[\]]+/gi;

const ExtractUrlsContent = () => {
  const [text, setText] = useState('');

  const urls = useMemo(() => {
    const found = text.match(URL_REGEX) ?? [];
    return [...new Set(found)];
  }, [text]);

  const copyAll = async () => {
    if (urls.length === 0) return;
    try {
      await navigator.clipboard.writeText(urls.join('\n'));
    } catch {}
  };

  const downloadAll = () => {
    if (urls.length === 0) return;
    const blob = new Blob([urls.join('\n')], { type: 'text/plain' });
    const link = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = link;
    a.download = 'extracted-urls.txt';
    a.click();
    URL.revokeObjectURL(link);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <TextField
        label="Paste any text or document content here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        multiline
        rows={10}
        fullWidth
      />

      {urls.length > 0 && (
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="600">
              Found {urls.length} URL{urls.length === 1 ? '' : 's'}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyAll}>Copy All</Button>
              <Button size="small" startIcon={<DownloadIcon />} onClick={downloadAll}>Download</Button>
            </Box>
          </Box>
          <Stack spacing={1}>
            {urls.map((url, idx) => (
              <MuiLink
                key={idx}
                href={url.startsWith('http') ? url : `https://${url}`}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ wordBreak: 'break-all', fontFamily: 'monospace', fontSize: '0.875rem' }}
              >
                {url}
              </MuiLink>
            ))}
          </Stack>
        </Paper>
      )}
    </Box>
  );
};

const ExtractUrls = () => {
  const content = (
    <>
      <Typography variant="h2">How to extract URLs from any text or document</Typography>
      <Typography variant="body1">
        Paste any block of text, an email, an article, or content copied from a document into the box above.
        Every web link — starting with http, https, or www — is found automatically and listed below as a
        clickable link, updating live as you type.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Pasting &quot;Visit https://example.com or www.example.org for details&quot; extracts both links into a
        clean, de-duplicated, clickable list.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Pulling every link out of a pasted document, article, or email signature.</li>
          <li>Collecting reference URLs from research notes or a long document.</li>
          <li>Quickly compiling a list of links from mixed content for further review.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is this different from the URL Extractor under Tools?</Typography>
      <Typography variant="body1">
        This page lives under Text Tools and is built around a simpler, always-live workflow with no extract
        button — just paste and the list appears — aimed specifically at pulling links out of text or document
        content you&apos;re working with, rather than a general-purpose extraction utility.
      </Typography>
      <Typography variant="h3">Does it remove duplicate URLs?</Typography>
      <Typography variant="body1">
        Yes — only unique URLs are listed, even if the same link appears multiple times in the text.
      </Typography>
      <Typography variant="h3">Does it catch links without &quot;http://&quot;?</Typography>
      <Typography variant="body1">
        Yes — links starting with &quot;www.&quot; are also detected. When you click one, it opens with
        &quot;https://&quot; added automatically.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/extract-urls" content={content}>
      <ExtractUrlsContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ExtractUrls;
