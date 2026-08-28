'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function parseMarkdown(md: string): string {
  let html = md;

  // Code blocks ```...```
  html = html.replace(/```([\s\S]*?)```/g, (_m, code) => `<pre><code>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`);

  // Inline code `...`
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Headings
  html = html.replace(/^###### (.+)$/gm, '<h6>$1</h6>');
  html = html.replace(/^##### (.+)$/gm, '<h5>$1</h5>');
  html = html.replace(/^#### (.+)$/gm, '<h4>$1</h4>');
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

  // Bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  // Images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2" style="max-width:100%" />');

  // Blockquotes
  html = html.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');

  // Unordered lists
  html = html.replace(/^[\-\*] (.+)$/gm, '<li>$1</li>');
  html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>');

  // Horizontal rule
  html = html.replace(/^---$/gm, '<hr />');

  // Paragraphs: wrap remaining lines that aren't already wrapped in block elements
  const lines = html.split('\n');
  const result: string[] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (
      trimmed &&
      !trimmed.startsWith('<h') &&
      !trimmed.startsWith('<pre') &&
      !trimmed.startsWith('<ul') &&
      !trimmed.startsWith('<li') &&
      !trimmed.startsWith('<blockquote') &&
      !trimmed.startsWith('<hr') &&
      !trimmed.startsWith('<img') &&
      !trimmed.startsWith('</') &&
      !trimmed.startsWith('<a ')
    ) {
      result.push(`<p>${trimmed}</p>`);
    } else {
      result.push(line);
    }
  }

  return result.join('\n');
}

const SAMPLE = `# Hello World

This is a **markdown editor** with *live preview*.

## Features

- Bold text with **double asterisks**
- Italic with *single asterisks*
- [Links](https://example.com) with square brackets
- \`Inline code\` with backticks

### Code Block

\`\`\`
const x = 42;
console.log(x);
\`\`\`

> Blockquotes work too!

---

Enjoy writing!`;

const MarkdownEditorContent = () => {
  const [markdown, setMarkdown] = useState(SAMPLE);
  const html = useMemo(() => parseMarkdown(markdown), [markdown]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant="subtitle1" fontWeight="600">Markdown</Typography>
        <TextField
          multiline
          minRows={20}
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          fullWidth
          variant="outlined"
          sx={{ fontFamily: 'monospace', '& .MuiInputBase-input': { fontFamily: 'monospace', fontSize: '0.9rem' } }}
        />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant="subtitle1" fontWeight="600">Preview</Typography>
        <Paper variant="outlined" sx={{ p: 2, minHeight: 498, overflow: 'auto', '& h1': { fontSize: '1.8rem', mt: 1 }, '& h2': { fontSize: '1.4rem', mt: 1.5 }, '& h3': { fontSize: '1.15rem', mt: 1 }, '& pre': { bgcolor: 'grey.100', p: 1.5, borderRadius: 1, overflow: 'auto' }, '& code': { bgcolor: 'grey.100', px: 0.5, borderRadius: 0.5 }, '& pre code': { bgcolor: 'transparent', px: 0 }, '& blockquote': { borderLeft: '3px solid', borderColor: 'primary.main', pl: 2, color: 'text.secondary', my: 1 }, '& a': { color: 'primary.main' }, '& hr': { border: 'none', borderTop: '1px solid', borderColor: 'divider', my: 2 }, '& ul': { pl: 3 }, '& p': { my: 0.5 } }}>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </Paper>
      </Box>
    </Box>
  );
};

const MarkdownEditor = () => {
  const content = (
    <>
      <Typography variant="h2">Free Online Markdown Editor with Live Preview</Typography>
      <Typography variant="body1">
        Write markdown on the left and see the rendered HTML preview on the right in real time. No sign-up, no server — everything runs in your browser.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Type or paste your markdown in the left panel. The right panel updates instantly with the rendered output. The editor supports headings, bold, italic, links, images, lists, code blocks, blockquotes, and horizontal rules.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Typing <code># Hello</code> renders as a large heading. <code>**bold**</code> becomes <strong>bold</strong>, and <code>*italic*</code> becomes <em>italic</em>. Code wrapped in backticks appears in a monospace font with a light background.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Drafting README files for GitHub repositories.</li>
          <li>Writing documentation or blog posts in markdown.</li>
          <li>Quickly previewing how markdown text will render before publishing.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What markdown syntax is supported?</Typography>
      <Typography variant="body1">
        Headings (h1–h6), bold, italic, bold-italic, inline code, fenced code blocks, links, images, blockquotes, unordered lists, and horizontal rules. This is a lightweight parser — advanced features like tables and footnotes are not included.
      </Typography>
      <Typography variant="h3">Is my text stored anywhere?</Typography>
      <Typography variant="body1">
        No — everything stays in your browser. No data is sent to any server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/markdown-editor" content={content}>
      <MarkdownEditorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default MarkdownEditor;
