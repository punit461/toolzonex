'use client';

import { useState, useMemo } from 'react';
import { Box, Typography, TextareaAutosize } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const escapeHtml = (str: string): string =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const escapeHtmlAttr = (str: string): string =>
  escapeHtml(str).replace(/"/g, '&quot;');

const renderInline = (text: string): string => {
  let out = escapeHtml(text);

  out = out
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(\*|_)(.+?)\1/g, '<em>$2</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(
      /\[([^\]]+)\]\(([^)\s]+)\)/g,
      (_, label: string, url: string) => `<a href="${escapeHtmlAttr(url)}" target="_blank" rel="noopener noreferrer">${label}</a>`
    );

  return out;
};

const renderMarkdown = (source: string): string => {
  const lines = source.replace(/\r\n/g, '\n').split('\n');
  let html = '';
  let inCodeBlock = false;
  let codeBuffer: string[] = [];
  let listOpen = false;
  let blockquoteOpen = false;
  let tableRows: string[] = [];

  const closeList = () => {
    if (listOpen) {
      html += '</ul>\n';
      listOpen = false;
    }
  };
  const closeBlockquote = () => {
    if (blockquoteOpen) {
      html += '</blockquote>\n';
      blockquoteOpen = false;
    }
  };
  const flushTable = () => {
    if (tableRows.length === 0) return;
    const header = tableRows[0].split('|').map((c) => c.trim()).filter(Boolean);
    const body = tableRows.slice(2);
    let table = '<table><thead><tr>';
    header.forEach((h) => {
      table += `<th>${renderInline(h)}</th>`;
    });
    table += '</tr></thead><tbody>';
    body.forEach((row) => {
      const cells = row.split('|').map((c) => c.trim()).filter(Boolean);
      table += '<tr>';
      cells.forEach((c) => {
        table += `<td>${renderInline(c)}</td>`;
      });
      table += '</tr>';
    });
    table += '</tbody></table>';
    html += table + '\n';
    tableRows = [];
  };

  const isTableRow = (line: string): boolean =>
    line.startsWith('|') && line.includes('|') && !line.includes('`');

  for (const rawLine of lines) {
    const line = rawLine;

    if (inCodeBlock) {
      if (line.trim().startsWith('```')) {
        inCodeBlock = false;
        html += `<pre><code>${escapeHtml(codeBuffer.join('\n'))}</code></pre>\n`;
        codeBuffer = [];
      } else {
        codeBuffer.push(line);
      }
      continue;
    }

    if (line.trim().startsWith('```')) {
      closeList();
      closeBlockquote();
      flushTable();
      inCodeBlock = true;
      codeBuffer = [];
      continue;
    }

    // Table rows
    if (isTableRow(line)) {
      closeList();
      closeBlockquote();
      tableRows.push(line);
      continue;
    }
    if (tableRows.length > 0) {
      flushTable();
    }

    // Headers
    const headerMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headerMatch) {
      closeList();
      closeBlockquote();
      const level = headerMatch[1].length;
      html += `<h${level}>${renderInline(headerMatch[2])}</h${level}>\n`;
      continue;
    }

    // Blockquote
    if (line.trim().startsWith('>')) {
      closeList();
      if (!blockquoteOpen) {
        html += '<blockquote>\n';
        blockquoteOpen = true;
      }
      html += `<p>${renderInline(line.replace(/^>\s?/, ''))}</p>\n`;
      continue;
    }
    if (blockquoteOpen) {
      closeBlockquote();
    }

    // Unordered list
    const listMatch = line.match(/^\s*[-*+]\s+(.*)$/);
    if (listMatch) {
      if (!listOpen) {
        html += '<ul>\n';
        listOpen = true;
      }
      html += `<li>${renderInline(listMatch[1])}</li>\n`;
      continue;
    }
    closeList();

    // Horizontal rule
    if (/^\s*([-*_])\1{2,}\s*$/.test(line)) {
      html += '<hr />\n';
      continue;
    }

    // Blank line
    if (line.trim() === '') {
      continue;
    }

    html += `<p>${renderInline(line)}</p>\n`;
  }

  if (inCodeBlock) {
    html += `<pre><code>${escapeHtml(codeBuffer.join('\n'))}</code></pre>\n`;
  }
  closeList();
  closeBlockquote();
  flushTable();

  return html;
};

const DEFAULT_MARKDOWN = `# Welcome to Markdown Preview

Type **Markdown** on the left and see the *rendered* HTML on the right.

## Headers

Start a line with \`#\` for h1, \`##\` for h2, and so on up to \`######\` for h6.

## Formatting

- **Bold** with \`**double asterisks**\`
- *Italic* with \`*single asterisk*\`
- \`Inline code\` with backticks

\`\`\`
// Fenced code block
function greet(name) {
  return "Hello, " + name;
}
\`\`\`

## Links

[Visit ToolZoneX](https://toolzonex.com)

## Blockquotes

> This is a blockquote.
> It can span multiple lines.

## Tables

| Name   | Role       |
|--------|------------|
| Alice  | Designer   |
| Bob    | Engineer   |
`;

const MarkdownPreview = () => {
  const [source, setSource] = useState<string>(DEFAULT_MARKDOWN);

  const html = useMemo(() => renderMarkdown(source), [source]);

  const content = (
    <>
      <Typography variant="h2">How It Works</Typography>
      <Typography variant="body1">
        Type Markdown in the left panel and the preview renders as HTML on the right in real time. Supported
        syntax includes #–###### headings, **bold**, *italic*, `inline code`, fenced code blocks, [links](url),
        - unordered lists, &gt; blockquotes, and | tables |.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Editing text with **bold**, a <code>inlineCode()</code> mention, or a
        [link](https://example.com) updates the rendered output as you type — no button to press.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Drafting README files and documentation with instant feedback.</li>
          <li>Previewing blog posts and forum replies before publishing.</li>
          <li>Learning Markdown by comparing source with rendered output.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is my text stored or sent anywhere?</Typography>
      <Typography variant="body1">
        No — everything is processed locally in your browser. Nothing is uploaded to a server.
      </Typography>
      <Typography variant="h3">Does it support every Markdown feature?</Typography>
      <Typography variant="body1">
        This lightweight preview supports the most common syntax (headings, bold, italic, code, links, lists,
        blockquotes, and tables). Extended features like footnotes or embedded HTML are not included.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/markdown-preview" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        <Box>
          <Typography gutterBottom>Markdown Input</Typography>
          <TextareaAutosize
            minRows={20}
            value={source}
            onChange={(e) => setSource(e.target.value)}
            style={{
              width: '100%',
              padding: 12,
              fontFamily: 'monospace',
              fontSize: '0.9rem',
              lineHeight: 1.5,
              border: '1px solid #E5E5E5',
              borderRadius: 8,
              resize: 'vertical',
              boxSizing: 'border-box',
            }}
          />
        </Box>

        <Box>
          <Typography gutterBottom>Rendered Preview</Typography>
          <Box
            sx={{
              border: '1px solid #E5E5E5',
              borderRadius: 2,
              padding: 3,
              minHeight: 400,
              overflow: 'auto',
              '& img': { maxWidth: '100%' },
              '& pre': { bgcolor: 'action.hover', p: 2, borderRadius: 2, overflow: 'auto' },
              '& code': { bgcolor: 'action.hover', px: 0.75, py: 0.25, borderRadius: 0.5, fontFamily: 'monospace' },
              '& pre code': { bgcolor: 'transparent', p: 0 },
              '& blockquote': { borderLeft: '4px solid #d1d5db', margin: 0, pl: 2, color: 'text.secondary' },
              '& a': { color: 'primary.main' },
              '& table': { borderCollapse: 'collapse', width: '100%', my: 1 },
              '& th, & td': { border: '1px solid #E5E5E5', padding: '6px 10px', textAlign: 'left' },
            }}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default MarkdownPreview;
