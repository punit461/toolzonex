'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Button, Stack, Chip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface TabEntry {
  url: string;
  domain: string | null;
}

function parseDomain(rawUrl: string): string | null {
  try {
    const withProtocol = /^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(rawUrl) ? rawUrl : `https://${rawUrl}`;
    return new URL(withProtocol).hostname;
  } catch {
    return null;
  }
}

const DEFAULT_INPUT = 'https://www.wikipedia.org/wiki/Web_browser\nhttps://github.com/explore\nhttps://news.ycombinator.com/';

const BrowserTabListGeneratorContent = () => {
  const [raw, setRaw] = useState(DEFAULT_INPUT);

  const tabs: TabEntry[] = useMemo(() => {
    return raw
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0)
      .map((url) => ({ url, domain: parseDomain(url) }));
  }, [raw]);

  const validCount = tabs.filter((t) => t.domain).length;

  const formattedList = useMemo(
    () => tabs.map((t) => (t.domain ? `${t.domain} — ${t.url}` : `(invalid URL) — ${t.url}`)).join('\n'),
    [tabs]
  );

  const copyList = async () => {
    try {
      await navigator.clipboard.writeText(formattedList);
    } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box>
        <TextField
          label="Tab URLs (one per line)"
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          multiline
          rows={10}
          fullWidth
          placeholder="Paste URLs copied from your browser's tabs..."
        />
      </Box>

      <Box sx={{ order: { xs: -1, md: 0 }, mb: { xs: 4, md: 0 } }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle1" fontWeight={600}>{validCount} Tab{validCount === 1 ? '' : 's'} Organized</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyList} disabled={tabs.length === 0}>
            Copy
          </Button>
        </Stack>
        <Paper variant="outlined" sx={{ p: 2, maxHeight: 350, overflowY: 'auto' }}>
          {tabs.length === 0 ? (
            <Typography variant="body2" color="text.secondary">Paste tab URLs to see them organized by domain.</Typography>
          ) : (
            <Stack spacing={1.5}>
              {tabs.map((t, idx) => (
                <Box key={idx}>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.25 }}>
                    <Chip
                      label={t.domain ?? 'invalid URL'}
                      size="small"
                      color={t.domain ? 'primary' : 'default'}
                      variant={t.domain ? 'filled' : 'outlined'}
                    />
                  </Stack>
                  <Typography variant="body2" sx={{ wordBreak: 'break-all', fontFamily: 'monospace' }}>{t.url}</Typography>
                </Box>
              ))}
            </Stack>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

const BrowserTabListGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Browser Tab List Generator</Typography>
      <Typography variant="body1">
        Paste a list of URLs, one per line — for example, copied from your browser&apos;s &quot;copy all tab
        URLs&quot; feature or collected manually. For each URL, the tool extracts the domain name using the
        browser&apos;s built-in URL parser and displays it as a readable label alongside the full address,
        producing an organized, formatted list you can save or share.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Pasting <code>https://www.wikipedia.org/wiki/Web_browser</code> and{' '}
        <code>https://github.com/explore</code> produces two entries labeled &quot;www.wikipedia.org&quot; and
        &quot;github.com&quot;, each shown alongside its full URL.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Saving a snapshot of your current browser tabs as a simple text list before closing them.</li>
          <li>Sharing a research session or reading list of links with a colleague in an organized format.</li>
          <li>Reviewing a long list of URLs by domain to spot duplicates or unrelated sites at a glance.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What happens if a line isn&apos;t a valid URL?</strong> It&apos;s shown labeled &quot;invalid URL&quot; instead of a domain, so you can spot and fix malformed entries in your pasted list.</li>
          <li><strong>Do I need to include "https://" for every URL?</strong> No — if a line is missing a protocol, the tool assumes "https://" automatically before extracting the domain, so plain addresses like "example.com/page" still work.</li>
          <li><strong>Does this tool actually open or close browser tabs?</strong> No — it only reformats a pasted list of URLs into an organized text list; it has no access to your actual browser tabs.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/browser-tab-list-generator" content={content}>
      <BrowserTabListGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BrowserTabListGenerator;
