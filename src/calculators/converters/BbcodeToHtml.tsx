'use client';

import { useMemo, useState } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const escapeHtml = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const bbcodeToHtml = (input: string): string => {
  if (!input) return '';
  let html = escapeHtml(input);

  html = html
    .replace(/\[b\]([\s\S]*?)\[\/b\]/gi, '<strong>$1</strong>')
    .replace(/\[i\]([\s\S]*?)\[\/i\]/gi, '<em>$1</em>')
    .replace(/\[u\]([\s\S]*?)\[\/u\]/gi, '<u>$1</u>')
    .replace(/\[s\]([\s\S]*?)\[\/s\]/gi, '<s>$1</s>')
    .replace(/\[url=(.*?)\]([\s\S]*?)\[\/url\]/gi, '<a href="$1">$2</a>')
    .replace(/\[url\]([\s\S]*?)\[\/url\]/gi, '<a href="$1">$1</a>')
    .replace(/\[img\]([\s\S]*?)\[\/img\]/gi, '<img src="$1" alt="" />')
    .replace(/\[quote\]([\s\S]*?)\[\/quote\]/gi, '<blockquote>$1</blockquote>')
    .replace(/\[color=(.*?)\]([\s\S]*?)\[\/color\]/gi, '<span style="color:$1">$2</span>')
    .replace(/\[size=(.*?)\]([\s\S]*?)\[\/size\]/gi, '<span style="font-size:$1px">$2</span>')
    .replace(/\[code\]([\s\S]*?)\[\/code\]/gi, '<code>$1</code>')
    .replace(/\[list\]([\s\S]*?)\[\/list\]/gi, (_m, inner) => {
      const items = inner
        .split(/\[\*\]/)
        .map((i: string) => i.trim())
        .filter((i: string) => i.length > 0)
        .map((i: string) => `<li>${i}</li>`)
        .join('');
      return `<ul>${items}</ul>`;
    })
    .replace(/\n/g, '<br />');

  return html;
};

const BbcodeToHtmlContent = () => {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => bbcodeToHtml(input), [input]);

  const copyToClipboard = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" fontWeight="600">BBCode Input:</Typography>
        <TextField
          multiline
          rows={12}
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={'[b]Bold[/b] and [i]italic[/i] text with a [url=https://example.com]link[/url].'}
          sx={{ '& .MuiInputBase-input': { fontFamily: 'monospace' } }}
        />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight="600">HTML Output:</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output}>
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </Box>
        <TextField
          multiline
          rows={12}
          fullWidth
          value={output}
          InputProps={{ readOnly: true }}
          placeholder="HTML output will appear here automatically..."
          sx={{ '& .MuiInputBase-input': { fontFamily: 'monospace' } }}
        />
      </Box>
    </Box>
  );
};

const BbcodeToHtml = () => {
  const content = (
    <>
      <Typography variant="h2">How to Convert BBCode to HTML</Typography>
      <Typography variant="body1">
        Paste BBCode markup — the bracket-tag syntax used on forums like phpBB and vBulletin — into the box
        above and it converts to equivalent HTML instantly. Common tags including bold, italic, underline,
        strikethrough, links, images, quotes, lists, color, size, and code blocks are all supported.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        <code>[b]Hello[/b] [i]world[/i]</code> converts to{' '}
        <code>&lt;strong&gt;Hello&lt;/strong&gt; &lt;em&gt;world&lt;/em&gt;</code>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Migrating old forum posts written in BBCode to a modern HTML-based CMS or blog.</li>
          <li>Previewing how BBCode-formatted text will render as HTML before posting.</li>
          <li>Converting BBCode signatures or templates for use outside a forum platform.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Which BBCode tags are supported?</Typography>
      <Typography variant="body1">
        <code>[b]</code>, <code>[i]</code>, <code>[u]</code>, <code>[s]</code>, <code>[url]</code>,{' '}
        <code>[img]</code>, <code>[quote]</code>, <code>[list]</code> with <code>[*]</code> items,{' '}
        <code>[color]</code>, <code>[size]</code>, and <code>[code]</code> are all converted to their HTML
        equivalents.
      </Typography>
      <Typography variant="h3">Does this handle nested tags?</Typography>
      <Typography variant="body1">
        Simple nesting such as bold text inside a quote generally works, but deeply nested or malformed BBCode
        may not convert perfectly — check the output before publishing it.
      </Typography>
      <Typography variant="h3">Does this tool also convert HTML back to BBCode?</Typography>
      <Typography variant="body1">
        This page converts BBCode to HTML only. Use our separate HTML to BBCode converter if you need to go the
        opposite direction.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/converters/bbcode-to-html" content={content}>
      <BbcodeToHtmlContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BbcodeToHtml;
