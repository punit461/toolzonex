'use client';

import { useMemo, useState } from 'react';
import { Box, Typography, Paper, TextField, Stack, Button, ToggleButton, ToggleButtonGroup, MenuItem, Select } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Mode = 'text' | 'preset';

interface TreeNode {
  name: string;
  isFolder: boolean;
  depth: number;
  children: TreeNode[];
}

const PRESETS: Record<string, string> = {
  'Node.js Project': `src/
  index.js
  routes/
    index.js
  controllers/
  models/
  middleware/
config/
  default.json
tests/
  index.test.js
.env
.gitignore
package.json
README.md`,
  'React Project': `public/
  index.html
  favicon.ico
src/
  components/
  pages/
  hooks/
  assets/
  App.jsx
  main.jsx
  index.css
.gitignore
package.json
vite.config.js
README.md`,
  'Python Project': `myproject/
  __init__.py
  main.py
  utils.py
tests/
  __init__.py
  test_main.py
.gitignore
requirements.txt
setup.py
README.md`,
};

function getIndentLevel(line: string): number {
  const match = line.match(/^[ \t]*/);
  const whitespace = match ? match[0] : '';
  let level = 0;
  for (const ch of whitespace) {
    level += ch === '\t' ? 1 : 0.5;
  }
  return Math.round(level);
}

function parseTree(text: string): TreeNode[] {
  const lines = text.split('\n').map((l) => l.replace(/\r$/, '')).filter((l) => l.trim().length > 0);
  const root: TreeNode[] = [];
  const stack: { node: TreeNode; depth: number }[] = [];

  lines.forEach((line) => {
    const depth = getIndentLevel(line);
    const trimmed = line.trim();
    const isFolder = trimmed.endsWith('/');
    const name = isFolder ? trimmed.slice(0, -1) : trimmed;
    if (!name) return;
    const node: TreeNode = { name, isFolder, depth, children: [] };

    while (stack.length > 0 && stack[stack.length - 1].depth >= depth) {
      stack.pop();
    }
    if (stack.length === 0) {
      root.push(node);
    } else {
      stack[stack.length - 1].node.children.push(node);
    }
    stack.push({ node, depth });
  });

  return root;
}

function renderAsciiTree(nodes: TreeNode[], prefix = ''): string[] {
  const lines: string[] = [];
  nodes.forEach((node, i) => {
    const isLast = i === nodes.length - 1;
    const connector = isLast ? '└── ' : '├── ';
    lines.push(`${prefix}${connector}${node.name}${node.isFolder ? '/' : ''}`);
    const childPrefix = prefix + (isLast ? '    ' : '│   ');
    lines.push(...renderAsciiTree(node.children, childPrefix));
  });
  return lines;
}

function collectPaths(nodes: TreeNode[], basePath = ''): { path: string; isFolder: boolean }[] {
  const result: { path: string; isFolder: boolean }[] = [];
  nodes.forEach((node) => {
    const path = basePath ? `${basePath}/${node.name}` : node.name;
    result.push({ path, isFolder: node.isFolder });
    if (node.children.length > 0) {
      result.push(...collectPaths(node.children, path));
    }
  });
  return result;
}

function buildShellScript(nodes: TreeNode[]): string {
  const paths = collectPaths(nodes);
  const lines: string[] = ['#!/bin/sh', ''];
  paths.forEach(({ path, isFolder }) => {
    if (isFolder) {
      lines.push(`mkdir -p "${path}"`);
    } else {
      const lastSlash = path.lastIndexOf('/');
      const dir = lastSlash >= 0 ? path.slice(0, lastSlash) : '';
      if (dir) lines.push(`mkdir -p "${dir}"`);
      lines.push(`touch "${path}"`);
    }
  });
  return lines.join('\n');
}

const DEFAULT_TEXT = `src/
  components/
    Header.jsx
    Footer.jsx
  utils/
    helpers.js
  App.jsx
  index.js
public/
  index.html
package.json
README.md`;

const FolderStructureGeneratorContent = () => {
  const [mode, setMode] = useState<Mode>('text');
  const [text, setText] = useState(DEFAULT_TEXT);
  const [preset, setPreset] = useState('Node.js Project');

  const activeText = mode === 'preset' ? PRESETS[preset] : text;
  const tree = useMemo(() => parseTree(activeText), [activeText]);
  const asciiTree = useMemo(() => renderAsciiTree(tree).join('\n'), [tree]);
  const shellScript = useMemo(() => buildShellScript(tree), [tree]);

  const copyTree = async () => { try { await navigator.clipboard.writeText(asciiTree); } catch {} };
  const copyScript = async () => { try { await navigator.clipboard.writeText(shellScript); } catch {} };

  return (
    <Box>
      <ToggleButtonGroup value={mode} exclusive onChange={(_, v) => v && setMode(v)} sx={{ mb: 2 }}>
        <ToggleButton value="text">Describe Structure</ToggleButton>
        <ToggleButton value="preset">Use a Preset</ToggleButton>
      </ToggleButtonGroup>

      {mode === 'text' ? (
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" fontWeight={600} mb={1}>
            Folder Structure (indent with spaces, end folders with &quot;/&quot;)
          </Typography>
          <TextField
            multiline
            minRows={12}
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
            sx={{ '& textarea': { fontFamily: 'monospace', fontSize: '0.85rem' } }}
          />
        </Box>
      ) : (
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" fontWeight={600} mb={1}>Project Type</Typography>
          <Select value={preset} onChange={(e) => setPreset(e.target.value)} sx={{ minWidth: 240 }}>
            {Object.keys(PRESETS).map((p) => <MenuItem key={p} value={p}>{p}</MenuItem>)}
          </Select>
        </Box>
      )}

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        <Box>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="subtitle1" fontWeight={600}>ASCII Tree</Typography>
            <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyTree}>Copy</Button>
          </Stack>
          <Paper variant="outlined" sx={{ p: 2, overflowX: 'auto' }}>
            <Typography component="pre" sx={{ whiteSpace: 'pre', fontFamily: 'monospace', fontSize: '0.85rem', m: 0 }}>
              {asciiTree || 'No structure entered yet.'}
            </Typography>
          </Paper>
        </Box>
        <Box>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="subtitle1" fontWeight={600}>Shell Script</Typography>
            <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyScript}>Copy</Button>
          </Stack>
          <Paper variant="outlined" sx={{ p: 2, overflowX: 'auto' }}>
            <Typography component="pre" sx={{ whiteSpace: 'pre', fontFamily: 'monospace', fontSize: '0.85rem', m: 0 }}>
              {shellScript}
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

const FolderStructureGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Folder Structure Generator</Typography>
      <Typography variant="body1">
        Choose &quot;Describe Structure&quot; and type your desired folder tree as indented text — one item per
        line, using leading spaces to show nesting depth, with a trailing &quot;/&quot; marking folders (leave
        it off for files). Or choose &quot;Use a Preset&quot; to start from a ready-made Node.js, React, or
        Python project layout. Either way, the tool generates two outputs: a visual ASCII tree using standard
        tree-drawing characters, and a copyable shell script using <code>mkdir -p</code> and <code>touch</code>{' '}
        that would actually create that structure on a real filesystem.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Typing <code>src/</code> on one line, then an indented <code>index.js</code> below it, produces an ASCII
        tree showing <code>src/</code> with <code>└── index.js</code> nested underneath, and a shell script
        containing <code>mkdir -p &quot;src&quot;</code> followed by <code>touch &quot;src/index.js&quot;</code>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Scaffolding a new project&apos;s folder layout with a single copy-pasted shell script.</li>
          <li>Documenting a project&apos;s directory structure visually in a README.</li>
          <li>Quickly starting from a standard Node.js, React, or Python layout instead of typing one from scratch.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How does the tool know if a line is a folder or a file?</strong> Any line ending in a forward slash (&quot;/&quot;) is treated as a folder; every other line is treated as a file. Nesting depth is determined by how many leading spaces or tabs a line has compared to the line above it.</li>
          <li><strong>Will the generated shell script actually work?</strong> Yes — it uses <code>mkdir -p</code> for every folder (which also creates any missing parent folders) and <code>touch</code> for every file, so pasting it into a terminal in your target directory recreates the exact structure.</li>
          <li><strong>Can I customize a preset after selecting it?</strong> Not directly in preset mode — switch to &quot;Describe Structure&quot; and paste in a preset&apos;s layout as a starting point, then edit the text freely from there.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/folder-structure-generator" content={content}>
      <FolderStructureGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default FolderStructureGenerator;
