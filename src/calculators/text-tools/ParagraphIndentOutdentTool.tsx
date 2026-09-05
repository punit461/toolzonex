'use client';

import { useMemo, useState } from 'react';
import { Box, Button, Typography, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Unit = 'spaces' | 'tabs';
type Mode = 'indent' | 'outdent';

function indentOutdent(text: string, unit: Unit, width: number, mode: Mode): string {
  const unitChar = unit === 'spaces' ? ' ' : '\t';
  const lines = text.split('\n');

  if (mode === 'indent') {
    const prefix = unitChar.repeat(width);
    return lines.map((line) => (line.length === 0 ? line : prefix + line)).join('\n');
  }

  const regex = new RegExp(`^${unitChar === ' ' ? ' ' : '\\t'}{0,${width}}`);
  return lines.map((line) => line.replace(regex, '')).join('\n');
}

const ParagraphIndentOutdentToolContent = () => {
  const [input, setInput] = useState('');
  const [unit, setUnit] = useState<Unit>('spaces');
  const [width, setWidth] = useState('4');
  const [mode, setMode] = useState<Mode>('indent');
  const [copied, setCopied] = useState(false);

  const widthNum = Math.max(1, Math.min(16, parseInt(width, 10) || 4));
  const output = useMemo(() => indentOutdent(input, unit, widthNum, mode), [input, unit, widthNum, mode]);

  const copyResult = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TextField
        label="Text"
        placeholder="Type or paste multi-line text here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        multiline
        rows={7}
        fullWidth
      />

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={(_, v) => v && setMode(v)}
          sx={{ '& .MuiToggleButtonGroup-grouped': { border: '1px solid', borderColor: 'divider !important', borderRadius: '4px !important' } }}
        >
          <ToggleButton value="indent" size="small">Indent</ToggleButton>
          <ToggleButton value="outdent" size="small">Outdent</ToggleButton>
        </ToggleButtonGroup>

        <ToggleButtonGroup
          value={unit}
          exclusive
          onChange={(_, v) => v && setUnit(v)}
          sx={{ '& .MuiToggleButtonGroup-grouped': { border: '1px solid', borderColor: 'divider !important', borderRadius: '4px !important' } }}
        >
          <ToggleButton value="spaces" size="small">Spaces</ToggleButton>
          <ToggleButton value="tabs" size="small">Tabs</ToggleButton>
        </ToggleButtonGroup>

        <TextField
          label="Width"
          type="number"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          sx={{ width: 120 }}
          inputProps={{ min: 1, max: 16 }}
        />
      </Box>

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" fontWeight="600">Result:</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyResult} disabled={!output}>
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </Box>
        <TextField
          value={output}
          multiline
          rows={7}
          fullWidth
          InputProps={{ readOnly: true, sx: { fontFamily: 'monospace' } }}
          placeholder="Result will appear here..."
        />
      </Box>
    </Box>
  );
};

const ParagraphIndentOutdentTool = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Paragraph Indent/Outdent Tool</Typography>
      <Typography variant="body1">
        Paste multi-line text, choose whether to use spaces or tabs, set the width (how many characters per
        indent level), and pick Indent or Outdent. Indent mode adds the specified leading whitespace to every
        non-empty line. Outdent mode removes up to that much existing leading whitespace from every line, without
        ever going negative — a line with less indentation than the requested amount is simply left flush.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Indenting the two lines <code>Line one</code> and <code>Line two</code> with a width of 4 spaces produces
        <code>&nbsp;&nbsp;&nbsp;&nbsp;Line one</code> and <code>&nbsp;&nbsp;&nbsp;&nbsp;Line two</code>. Running
        Outdent on that result with the same width removes the leading spaces again, restoring the original text.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Indenting a block of code or text pasted into a document that doesn&apos;t auto-indent.</li>
          <li>Outdenting a block of over-indented text copied from a nested list or code editor.</li>
          <li>Standardizing indentation width (for example, converting a 2-space habit to 4 spaces) before pasting into a shared document.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What is the difference between this tool and a plain "indenter" or "outdenter"?</strong> Nothing — this single tool covers both jobs. The mode toggle switches between adding indentation (indenting) and removing it (outdenting), so there&apos;s no need for two separate tools.</li>
          <li><strong>What happens if a line has less indentation than the outdent width?</strong> Outdent removes only as much whitespace as actually exists at the start of that line — it never removes non-whitespace characters or pushes the line into negative indentation.</li>
          <li><strong>Are blank lines affected?</strong> Indent mode skips empty lines so it doesn&apos;t add trailing whitespace-only lines; Outdent mode leaves empty lines as empty since there's no leading whitespace to remove.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/paragraph-indent-outdent-tool" content={content}>
      <ParagraphIndentOutdentToolContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ParagraphIndentOutdentTool;
