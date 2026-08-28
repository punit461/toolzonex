'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, IconButton, Paper } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function htmlToMarkdown(html: string): string {
  let md = html;

  // Remove script and style blocks
  md = md.replace(/<script[\s\S]*?<\/script>/gi, '');
  md = md.replace(/<style[\s\S]*?<\/style>/gi, '');

  // Headings
  md = md.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '# $1\n\n');
  md = md.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '## $1\n\n');
  md = md.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '### $1\n\n');
  md = md.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, '#### $1\n\n');
  md = md.replace(/<h5[^>]*>([\s\S]*?)<\/h5>/gi, '##### $1\n\n');
  md = md.replace(/<h6[^>]*>([\s\S]*?)<\/h6>/gi, '###### $1\n\n');

  // Bold and italic
  md = md.replace(/<(strong|b)[^>]*>([\s\S]*?)<\/(strong|b)>/gi, '**$2**');
  md = md.replace(/<(em|i)[^>]*>([\s\S]*?)<\/(em|i)>/gi, '*$2*');

  // Links and images
  md = md.replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)');
  md = md.replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, '![$2]($1)');
  md = md.replace(/<img[^>]*alt="([^"]*)"[^>]*src="([^"]*)"[^>]*\/?>/gi, '![$1]($2)');
  md = md.replace(/<img[^>]*src="([^"]*)"[^>]*\/?>/gi, '![]($1)');

  // Inline code
  md = md.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, '`$1`');

  // Blockquote
  md = md.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (_m, p1) => {
    return p1.split('\n').map((line: string) => `> ${line}`).join('\n') + '\n';
  });

  // Unordered lists
  md = md.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (_m, p1) => {
    return p1.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '- $1\n') + '\n';
  });

  // Ordered lists
  md = md.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (_m, p1) => {
    let idx = 1;
    return p1.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, () => `${idx++}. `) + '\n';
  });

  // Paragraphs and breaks
  md = md.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '$1\n\n');
  md = md.replace(/<br\s*\/?>/gi, '\n');
  md = md.replace(/<hr\s*\/?>/gi, '\n---\n');

  // Remove remaining HTML tags
  md = md.replace(/<[^>]+>/g, '');

  // Decode common HTML entities
  md = md.replace(/&amp;/g, '&');
  md = md.replace(/&lt;/g, '<');
  md = md.replace(/&gt;/g, '>');
  md = md.replace(/&quot;/g, '"');
  md = md.replace(/&#39;/g, "'");
  md = md.replace(/&nbsp;/g, ' ');

  // Clean up multiple blank lines
  md = md.replace(/\n{3,}/g, '\n\n');

  return md.trim();
}

const HtmlToMarkdown = () => {
  const [input, setInput] = useState('<h1>Hello World</h1>\n<p>This is a <strong>bold</strong> and <em>italic</em> paragraph.</p>\n<ul>\n  <li>Item one</li>\n  <li>Item two</li>\n</ul>');

  const output = useMemo(() => {
    if (!input.trim()) return '';
    return htmlToMarkdown(input);
  }, [input]);

  const copyToClipboard = () => {
    if (output) navigator.clipboard.writeText(output);
  };

  const content = (
    <>
      <Typography variant="h2">How Does It Work?</Typography>
      <Typography variant="body1">
        This converter transforms HTML into clean Markdown by parsing common tags and replacing them with their Markdown equivalents.
        Headings become # symbols, bold/italic become ** and *, links become [text](url), lists become dashes or numbers, and all remaining HTML tags are stripped.
        The conversion runs in real time as you type.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Input: <code>&lt;h1&gt;Title&lt;/h1&gt;&lt;p&gt;Hello &lt;strong&gt;World&lt;/strong&gt;&lt;/p&gt;</code><br />
        Output:<br />
        # Title<br /><br />Hello **World**
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Converting email HTML to Markdown for README files or documentation.</li>
          <li>Transforming CMS or blog HTML content into Markdown-compatible format.</li>
          <li>Cleaning up copied web content for pasting into Markdown editors.</li>
          <li>Migrating HTML documentation to static-site generators that use Markdown.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does this handle all HTML tags?</Typography>
      <Typography variant="body1">
        It handles the most common structural tags (headings, bold, italic, links, images, lists, code, blockquotes). Complex or custom HTML tags are stripped to their text content.
      </Typography>
      <Typography variant="h3">Will the output be perfectly formatted?</Typography>
      <Typography variant="body1">
        For simple to moderately complex HTML, the output is clean and usable. For highly nested or complex HTML, you may need to manually adjust the Markdown formatting.
      </Typography>
      <Typography variant="h3">Does it preserve images?</Typography>
      <Typography variant="body1">
        Yes — img tags with src and alt attributes are converted to ![alt](src) Markdown syntax.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/html-to-markdown" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="subtitle1" fontWeight="600">HTML Input</Typography>
          <TextField
            multiline
            rows={15}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={'<h1>Hello</h1>\n<p>World</p>'}
            fullWidth
            variant="outlined"
            sx={{ fontFamily: 'monospace' }}
          />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle1" fontWeight="600">Markdown Output</Typography>
            <IconButton onClick={copyToClipboard} disabled={!output} size="small">
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Box>
          <Paper variant="outlined" sx={{ p: 2, minHeight: 390, fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-all', fontSize: '0.875rem', overflow: 'auto' }}>
            {output || <Typography color="text.secondary">Markdown output will appear here...</Typography>}
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default HtmlToMarkdown;
