'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Chip, Button } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

const ExtractEmailAddressesContent = () => {
  const [text, setText] = useState('');

  const emails = useMemo(() => {
    const found = text.match(EMAIL_REGEX) ?? [];
    return [...new Set(found)];
  }, [text]);

  const copyAll = async () => {
    if (emails.length === 0) return;
    try {
      await navigator.clipboard.writeText(emails.join('\n'));
    } catch {}
  };

  const downloadAll = () => {
    if (emails.length === 0) return;
    const blob = new Blob([emails.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'extracted-emails.txt';
    a.click();
    URL.revokeObjectURL(url);
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

      {emails.length > 0 && (
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="600">
              Found {emails.length} email{emails.length === 1 ? '' : 's'}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyAll}>Copy All</Button>
              <Button size="small" startIcon={<DownloadIcon />} onClick={downloadAll}>Download</Button>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {emails.map((email, idx) => (
              <Chip
                key={idx}
                label={email}
                onClick={() => navigator.clipboard?.writeText(email)}
                sx={{ cursor: 'pointer', fontFamily: 'monospace' }}
              />
            ))}
          </Box>
        </Paper>
      )}
    </Box>
  );
};

const ExtractEmailAddresses = () => {
  const content = (
    <>
      <Typography variant="h2">How to extract email addresses from any text or document</Typography>
      <Typography variant="body1">
        Paste any block of text, a document, or a pasted webpage into the box above. Every email address is
        found automatically and listed below, updating live as you type — click any email to copy it, or copy
        or download the full list at once.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Pasting &quot;Contact us at sales@example.com or support@example.com&quot; extracts both addresses into
        a clean, de-duplicated list.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Pulling contact emails out of a pasted document or set of notes.</li>
          <li>Collecting email addresses scattered through meeting notes or a long email thread.</li>
          <li>Quickly building a list of addresses from mixed text content.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is this different from the Email Extractor under Tools?</Typography>
      <Typography variant="body1">
        This page lives under Text Tools and uses a simpler, always-live layout with no extract button — the
        list appears as soon as you paste — focused specifically on pulling emails out of text or document
        content you&apos;re working with.
      </Typography>
      <Typography variant="h3">Does it validate that the emails are real?</Typography>
      <Typography variant="body1">
        No — it extracts anything matching a valid email address pattern from the text; it doesn&apos;t check
        whether the address actually exists or can receive mail.
      </Typography>
      <Typography variant="h3">Does it remove duplicate email addresses?</Typography>
      <Typography variant="body1">
        Yes — only unique addresses are listed, even if the same email appears multiple times in the pasted
        text.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/extract-email-addresses" content={content}>
      <ExtractEmailAddressesContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ExtractEmailAddresses;
