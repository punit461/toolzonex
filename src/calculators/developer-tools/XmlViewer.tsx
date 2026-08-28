'use client';

import { useState, useCallback } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert, IconButton, Chip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ExpandIcon from '@mui/icons-material/Expand';
import CompressIcon from '@mui/icons-material/Compress';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface XmlNode {
  tag: string;
  attributes: { name: string; value: string }[];
  textContent: string;
  children: XmlNode[];
  isSelfClosing: boolean;
}

function parseXmlNode(xml: string): XmlNode | null {
  const trimmed = xml.trim();
  if (!trimmed) return null;

  const tagMatch = trimmed.match(/^<(\w[\w:.-]*)([^>]*)>([\s\S]*)<\/\1\s*>$/);
  if (!tagMatch) {
    const selfClose = trimmed.match(/^<(\w[\w:.-]*)([^>]*)\s*\/?>$/);
    if (selfClose) {
      return { tag: selfClose[1], attributes: parseAttrs(selfClose[2]), textContent: '', children: [], isSelfClosing: true };
    }
    return { tag: '', attributes: [], textContent: trimmed, children: [], isSelfClosing: false };
  }

  const inner = tagMatch[3].trim();
  const children: XmlNode[] = [];

  let cursor = 0;
  const innerTrimmed = inner;
  while (cursor < innerTrimmed.length) {
    if (innerTrimmed[cursor] === '<') {
      const endOpen = innerTrimmed.indexOf('>', cursor);
      if (endOpen === -1) break;
      const openTag = innerTrimmed.substring(cursor, endOpen + 1);
      const tagName = openTag.match(/^<(\w[\w:.-]*)/)?.[1];
      if (tagName) {
        const closeTag = `</${tagName}>`;
        const closeIdx = innerTrimmed.indexOf(closeTag, endOpen + 1);
        if (closeIdx !== -1) {
          const childXml = innerTrimmed.substring(cursor, closeIdx + closeTag.length);
          const child = parseXmlNode(childXml);
          if (child) children.push(child);
          cursor = closeIdx + closeTag.length;
        } else {
          children.push({ tag: tagName, attributes: parseAttrs(openTag), textContent: '', children: [], isSelfClosing: true });
          cursor = endOpen + 1;
        }
      } else {
        cursor = endOpen + 1;
      }
    } else {
      let nextTag = innerTrimmed.indexOf('<', cursor);
      if (nextTag === -1) nextTag = innerTrimmed.length;
      const text = innerTrimmed.substring(cursor, nextTag).trim();
      if (text) {
        children.push({ tag: '', attributes: [], textContent: text, children: [], isSelfClosing: false });
      }
      cursor = nextTag;
    }
  }

  if (children.length === 0 && inner) {
    return { tag: tagMatch[1], attributes: parseAttrs(tagMatch[2]), textContent: inner, children: [], isSelfClosing: false };
  }

  return { tag: tagMatch[1], attributes: parseAttrs(tagMatch[2]), textContent: '', children, isSelfClosing: false };
}

function parseAttrs(raw: string): { name: string; value: string }[] {
  const attrs: { name: string; value: string }[] = [];
  const re = /(\w[\w:.-]*)="([^"]*)"/g;
  let m;
  while ((m = re.exec(raw)) !== null) {
    attrs.push({ name: m[1], value: m[2] });
  }
  return attrs;
}

function highlightXml(xml: string): string {
  return xml
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/(&lt;\/?)([\w:.-]+)/g, '$1<span style="color:#1565c0;font-weight:600">$2</span>')
    .replace(/([\w:.-]+)(=")/g, '<span style="color:#2e7d32">$1</span>$2')
    .match(/="([^"]*)"/g)
    ? xml
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/(&lt;\/?)([\w:.-]+)/g, '$1<span style="color:#1565c0;font-weight:600">$2</span>')
        .replace(/([\w:.-]+)(=)(&quot;|")/g, '<span style="color:#2e7d32">$1</span>$2$3')
        .replace(/(&quot;|")([^"&]*?)(&quot;|")/g, '<span style="color:#e65100">$1$2$3</span>')
    : xml
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/(&lt;\/?)([\w:.-]+)/g, '$1<span style="color:#1565c0;font-weight:600">$2</span>');
}

function XmlTreeView({ node, depth, allExpanded }: { node: XmlNode; depth: number; allExpanded: boolean }) {
  const [expanded, setExpanded] = useState(allExpanded);

  if (!node) return null;

  if (node.textContent && node.children.length === 0) {
    return (
      <Box sx={{ ml: depth * 2, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        {node.tag ? (
          <>
            <Box component="span" sx={{ color: '#1565c0', fontWeight: 600 }}>&lt;{node.tag}</Box>
            {node.attributes.map((a) => (
              <Box key={a.name} component="span">
                {' '}<Box component="span" sx={{ color: '#2e7d32' }}>{a.name}</Box>
                =<Box component="span" sx={{ color: '#e65100' }}>&quot;{a.value}&quot;</Box>
              </Box>
            ))}
            <Box component="span" sx={{ color: '#1565c0', fontWeight: 600 }}>&gt;</Box>
            <Box component="span" sx={{ color: '#212121' }}>{node.textContent}</Box>
            <Box component="span" sx={{ color: '#1565c0', fontWeight: 600 }}>&lt;/{node.tag}&gt;</Box>
          </>
        ) : (
          <Box component="span" sx={{ color: '#212121' }}>{node.textContent}</Box>
        )}
      </Box>
    );
  }

  const hasChildren = node.children.length > 0;
  const isOpen = expanded || !hasChildren;

  return (
    <Box sx={{ ml: depth * 2 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          fontFamily: 'monospace',
          fontSize: '0.9rem',
          cursor: hasChildren ? 'pointer' : 'default',
          '&:hover': hasChildren ? { bgcolor: 'action.hover' } : {},
          borderRadius: 0.5,
          px: 0.5,
        }}
        onClick={() => hasChildren && setExpanded(!expanded)}
      >
        {hasChildren && (
          <Box component="span" sx={{ mr: 0.5, fontSize: '0.75rem', color: 'text.secondary', userSelect: 'none' }}>
            {expanded ? '▼' : '▶'}
          </Box>
        )}
        <Box component="span" sx={{ color: '#1565c0', fontWeight: 600 }}>&lt;{node.tag}</Box>
        {node.attributes.map((a) => (
          <Box key={a.name} component="span">
            {' '}<Box component="span" sx={{ color: '#2e7d32' }}>{a.name}</Box>
            =<Box component="span" sx={{ color: '#e65100' }}>&quot;{a.value}&quot;</Box>
          </Box>
        ))}
        <Box component="span" sx={{ color: '#1565c0', fontWeight: 600 }}>
          {hasChildren ? (node.isSelfClosing ? ' /&gt;' : '&gt;') : (node.isSelfClosing ? ' /&gt;' : '&gt;')}
        </Box>
        {!hasChildren && node.isSelfClosing && (
          <Box component="span" sx={{ color: '#1565c0', fontWeight: 600 }}>&lt;/{node.tag}&gt;</Box>
        )}
      </Box>
      {isOpen && node.children.map((child, i) => (
        <XmlTreeView key={i} node={child} depth={depth + 1} allExpanded={allExpanded} />
      ))}
      {hasChildren && !expanded && (
        <Box sx={{ ml: (depth + 1) * 2, fontFamily: 'monospace', fontSize: '0.8rem', color: 'text.secondary' }}>
          ...
        </Box>
      )}
      {hasChildren && (
        <Box sx={{ ml: depth * 2, fontFamily: 'monospace', fontSize: '0.9rem' }}>
          <Box component="span" sx={{ color: '#1565c0', fontWeight: 600 }}>&lt;/{node.tag}&gt;</Box>
        </Box>
      )}
    </Box>
  );
}

function formatXml(xml: string): string {
  const PAD = '  ';
  let formatted = '';
  let pad = 0;
  const trimmed = xml.replace(/>\s*</g, '><').trim();
  const nodes = trimmed.split(/(?=<)/g).filter((n) => n.trim().length > 0);
  nodes.forEach((rawNode) => {
    const node = rawNode.trim();
    const isClosing = /^<\//.test(node);
    const isSelfClosing = /\/>\s*$/.test(node) || /^<\?/.test(node);
    const isComment = /^<!--/.test(node);
    const isOpenAndClose = /^<([\w:.-]+)[^>]*>.*<\/\1\s*>$/.test(node);
    if (isClosing) pad = Math.max(0, pad - 1);
    formatted += PAD.repeat(pad) + node + '\n';
    if (!isClosing && !isSelfClosing && !isComment && !isOpenAndClose) pad += 1;
  });
  return formatted.trim();
}

const SAMPLE = '<catalog>\n  <book id="1" lang="en">\n    <title>The Great Gatsby</title>\n    <author>F. Scott Fitzgerald</author>\n    <price currency="USD">10.99</price>\n  </book>\n  <book id="2" lang="en">\n    <title>1984</title>\n    <author>George Orwell</author>\n    <price currency="USD">8.99</price>\n  </book>\n</catalog>';

const XmlViewerContent = () => {
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'tree' | 'raw'>('tree');
  const [allExpanded, setAllExpanded] = useState(true);
  const [copied, setCopied] = useState(false);

  const parsed = input.trim() ? parseXmlNode(input) : null;
  const formatted = input.trim() ? formatXml(input) : '';

  const handleLoadSample = () => {
    setInput(SAMPLE);
    setError(null);
    setViewMode('tree');
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TextField
        label="Paste XML"
        multiline
        rows={8}
        value={input}
        onChange={(e) => { setInput(e.target.value); setError(null); }}
        fullWidth
        variant="outlined"
        sx={{ fontFamily: 'monospace' }}
        placeholder={SAMPLE}
      />
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button variant="contained" onClick={() => setViewMode(viewMode === 'tree' ? 'raw' : 'tree')} fullWidth>
          {viewMode === 'tree' ? 'Show Raw Formatted' : 'Show Tree View'}
        </Button>
        {viewMode === 'tree' && (
          <Button variant="outlined" onClick={() => setAllExpanded(!allExpanded)} fullWidth startIcon={allExpanded ? <CompressIcon /> : <ExpandIcon />}>
            {allExpanded ? 'Collapse All' : 'Expand All'}
          </Button>
        )}
        <Button variant="outlined" onClick={handleLoadSample} fullWidth>Load Sample</Button>
      </Box>
      {error && <Alert severity="error">{error}</Alert>}
      {input.trim() && (
        <Paper variant="outlined" sx={{ p: 2, minHeight: 200, maxHeight: 500, overflow: 'auto', bgcolor: 'grey.50' }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
            <IconButton size="small" onClick={handleCopy} title="Copy formatted XML">
              <ContentCopyIcon fontSize="small" />
            </IconButton>
            {copied && <Typography variant="caption" color="primary" sx={{ alignSelf: 'center', mr: 1 }}>Copied!</Typography>}
          </Box>
          {viewMode === 'tree' && parsed ? (
            <XmlTreeView node={parsed} depth={0} allExpanded={allExpanded} />
          ) : (
            <Typography
              component="pre"
              sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-all', fontSize: '0.85rem' }}
              dangerouslySetInnerHTML={{ __html: highlightXml(formatted) }}
            />
          )}
        </Paper>
      )}
    </Box>
  );
};

const XmlViewer = () => {
  const content = (
    <>
      <Typography variant="h2">Free XML Viewer &amp; Formatter</Typography>
      <Typography variant="body1">
        Paste your XML and instantly view it with syntax highlighting and a collapsible tree structure.
        Tags are colored blue, attributes green, and string values orange for quick scanning. Toggle between
        tree view and raw formatted output.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste XML into the input box. The tree view renders immediately — click any tag node to expand or
        collapse its children. Use &quot;Expand All&quot; / &quot;Collapse All&quot; for bulk control, or switch
        to &quot;Show Raw Formatted&quot; for color-highlighted indented text. Click the copy icon to grab the
        formatted output.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Pasting a catalog of books renders each <code>&lt;book&gt;</code> as a collapsible node, with its <code>id</code> and
        <code>lang</code> attributes in green and nested <code>&lt;title&gt;</code>, <code>&lt;author&gt;</code>, and
        <code>&lt;price&gt;</code> children visible beneath.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Debugging XML API responses or SOAP payloads during development.</li>
          <li>Reviewing large XML config files (Maven POM, Android manifest, etc.).</li>
          <li>Quickly copying formatted XML for documentation or bug reports.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is my XML data uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — all parsing and formatting happens client-side in your browser. Nothing you paste is sent to a server.
      </Typography>
      <Typography variant="h3">What if my XML is malformed?</Typography>
      <Typography variant="body1">
        The tree view may not render correctly if tags are mismatched. Switch to raw formatted view to inspect the
        indentation and spot where the structure breaks.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/xml-viewer" content={content}>
      <XmlViewerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default XmlViewer;
