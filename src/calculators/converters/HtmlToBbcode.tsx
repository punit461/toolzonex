'use client';

import { useMemo, useState } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const htmlToBbcode = (input: string): string => {
  if (!input) return '';
  let bb = input;

  bb = bb
    .replace(/<(strong|b)>([\s\S]*?)<\/\1>/gi, '[b]$2[/b]')
    .replace(/<(em|i)>([\s\S]*?)<\/\1>/gi, '[i]$2[/i]')
    .replace(/<u>([\s\S]*?)<\/u>/gi, '[u]$1[/u]')
    .replace(/<(s|strike|del)>([\s\S]*?)<\/\1>/gi, '[s]$2[/s]')
    .replace(/<a\s+[^>]*href=["'](.*?)["'][^>]*>([\s\S]*?)<\/a>/gi, '[url=$1]$2[/url]')
    .replace(/<img\s+[^>]*src=["'](.*?)["'][^>]*\/?>/gi, '[img]$1[/img]')
    .replace(/<blockquote>([\s\S]*?)<\/blockquote>/gi, '[quote]$1[/quote]')
    .replace(/<span\s+[^>]*style=["']color:\s*(.*?);?["'][^>]*>([\s\S]*?)<\/span>/gi, '[color=$1]$2[/color]')
    .replace(/<code>([\s\S]*?)<\/code>/gi, '[code]$1[/code]')
    .replace(/<ul>([\s\S]*?)<\/ul>/gi, (_m, inner) => {
      const items = (inner.match(/<li>([\s\S]*?)<\/li>/gi) || [])
        .map((li: string) => li.replace(/<\/?li>/gi, ''))
        .map((text: string) => `[*]${text}`)
        .join('\n');
      return `[list]\n${items}\n[/list]`;
    })
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>\s*<p>/gi, '\n\n')
    .replace(/<\/?p>/gi, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

  return bb.trim();
};

const HtmlToBbcodeContent = () => {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => htmlToBbcode(input), [input]);

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
        <Typography variant="subtitle1" fontWeight="600">HTML Input:</Typography>
        <TextField
          multiline
          rows={12}
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={'<strong>Bold</strong> and <em>italic</em> text with a <a href="https://example.com">link</a>.'}
          sx={{ '& .MuiInputBase-input': { fontFamily: 'monospace' } }}
        />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight="600">BBCode Output:</Typography>
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
          placeholder="BBCode output will appear here automatically..."
          sx={{ '& .MuiInputBase-input': { fontFamily: 'monospace' } }}
        />
      </Box>
    </Box>
  );
};

const HtmlToBbcode = () => {
  const content = (
    <>
      <Typography variant="h2">How to Convert HTML to BBCode</Typography>
      <Typography variant="body1">
        Paste HTML markup into the box above and it converts to equivalent BBCode instantly — the bracket-tag
        syntax used on forums like phpBB and vBulletin. Common tags including bold, italic, underline,
        strikethrough, links, images, quotes, lists, color, and code blocks are all supported.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        <code>&lt;strong&gt;Hello&lt;/strong&gt; &lt;em&gt;world&lt;/em&gt;</code> converts to{' '}
        <code>[b]Hello[/b] [i]world[/i]</code>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Migrating HTML content from a blog or CMS into a forum post written in BBCode.</li>
          <li>Converting rich text editor output into BBCode for platforms that don&apos;t support raw HTML.</li>
          <li>Reformatting HTML signatures or templates for use on a BBCode-based forum.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Which HTML tags are supported?</Typography>
      <Typography variant="body1">
        <code>&lt;strong&gt;</code>/<code>&lt;b&gt;</code>, <code>&lt;em&gt;</code>/<code>&lt;i&gt;</code>,{' '}
        <code>&lt;u&gt;</code>, <code>&lt;s&gt;</code>/<code>&lt;strike&gt;</code>, <code>&lt;a&gt;</code>,{' '}
        <code>&lt;img&gt;</code>, <code>&lt;blockquote&gt;</code>, <code>&lt;ul&gt;</code>/
        <code>&lt;li&gt;</code>, inline <code>color</code> styles, and <code>&lt;code&gt;</code> all convert to
        their BBCode equivalents.
      </Typography>
      <Typography variant="h3">Does this handle complex or deeply nested HTML?</Typography>
      <Typography variant="body1">
        Simple, common markup converts reliably, but complex HTML with extensive inline styles, classes, or
        deep nesting may not convert perfectly — check the BBCode output before posting it.
      </Typography>
      <Typography variant="h3">Does this tool also convert BBCode back to HTML?</Typography>
      <Typography variant="body1">
        This page converts HTML to BBCode only. Use our separate BBCode to HTML converter if you need to go the
        opposite direction.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/converters/html-to-bbcode" content={content}>
      <HtmlToBbcodeContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default HtmlToBbcode;
