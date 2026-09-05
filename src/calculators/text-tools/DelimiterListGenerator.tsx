'use client';

import { useMemo, useState } from 'react';
import { Box, Button, Typography, TextField, ToggleButton, ToggleButtonGroup, FormControlLabel, Switch } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Delimiter = 'comma' | 'pipe' | 'semicolon' | 'custom';
type Direction = 'join' | 'split';

const DELIMITER_CHARS: Record<Exclude<Delimiter, 'custom'>, string> = {
  comma: ',',
  pipe: '|',
  semicolon: ';',
};

const DELIMITERS: { value: Delimiter; label: string }[] = [
  { value: 'comma', label: 'Comma' },
  { value: 'pipe', label: 'Pipe ( | )' },
  { value: 'semicolon', label: 'Semicolon' },
  { value: 'custom', label: 'Custom' },
];

const DelimiterListGeneratorContent = () => {
  const [direction, setDirection] = useState<Direction>('join');
  const [delimiter, setDelimiter] = useState<Delimiter>('comma');
  const [customDelimiter, setCustomDelimiter] = useState(',');
  const [addSpace, setAddSpace] = useState(true);
  const [inputList, setInputList] = useState('');
  const [inputDelimited, setInputDelimited] = useState('');
  const [copied, setCopied] = useState(false);

  const activeDelimiter = delimiter === 'custom' ? customDelimiter || ',' : DELIMITER_CHARS[delimiter];

  const joined = useMemo(() => {
    const items = inputList.split('\n').map((l) => l.trim()).filter(Boolean);
    const sep = addSpace ? `${activeDelimiter} ` : activeDelimiter;
    return items.join(sep);
  }, [inputList, activeDelimiter, addSpace]);

  const split = useMemo(() => {
    if (!inputDelimited.trim()) return '';
    const escaped = activeDelimiter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return inputDelimited
      .split(new RegExp(escaped))
      .map((s) => s.trim())
      .filter(Boolean)
      .join('\n');
  }, [inputDelimited, activeDelimiter]);

  const output = direction === 'join' ? joined : split;

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
      <ToggleButtonGroup
        value={direction}
        exclusive
        onChange={(_, v) => v && setDirection(v)}
        sx={{ '& .MuiToggleButtonGroup-grouped': { border: '1px solid', borderColor: 'divider !important', borderRadius: '4px !important' } }}
      >
        <ToggleButton value="join" size="small">List → Delimited String</ToggleButton>
        <ToggleButton value="split" size="small">Delimited String → List</ToggleButton>
      </ToggleButtonGroup>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
        <ToggleButtonGroup
          value={delimiter}
          exclusive
          onChange={(_, v) => v && setDelimiter(v)}
          sx={{ flexWrap: 'wrap', gap: 1, '& .MuiToggleButtonGroup-grouped': { border: '1px solid', borderColor: 'divider !important', borderRadius: '4px !important' } }}
        >
          {DELIMITERS.map((d) => (
            <ToggleButton key={d.value} value={d.value} size="small">{d.label}</ToggleButton>
          ))}
        </ToggleButtonGroup>
        {delimiter === 'custom' && (
          <TextField
            label="Custom Delimiter"
            value={customDelimiter}
            onChange={(e) => setCustomDelimiter(e.target.value)}
            sx={{ width: 160 }}
          />
        )}
        {direction === 'join' && (
          <FormControlLabel
            control={<Switch checked={addSpace} onChange={(e) => setAddSpace(e.target.checked)} />}
            label="Add space after delimiter"
          />
        )}
      </Box>

      {direction === 'join' ? (
        <TextField
          label="Items (one per line)"
          placeholder={'Enter one item per line, e.g.\nred\ngreen\nblue'}
          value={inputList}
          onChange={(e) => setInputList(e.target.value)}
          multiline
          rows={6}
          fullWidth
        />
      ) : (
        <TextField
          label="Delimited String"
          placeholder="e.g. red, green, blue"
          value={inputDelimited}
          onChange={(e) => setInputDelimited(e.target.value)}
          multiline
          rows={3}
          fullWidth
        />
      )}

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
          rows={direction === 'join' ? 3 : 6}
          fullWidth
          InputProps={{ readOnly: true }}
          placeholder="Result will appear here..."
        />
      </Box>
    </Box>
  );
};

const DelimiterListGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Delimiter List Generator</Typography>
      <Typography variant="body1">
        Choose a direction: &quot;List → Delimited String&quot; takes a multi-line list, one item per line, and
        joins it into a single line using your chosen delimiter — comma, pipe, semicolon, or a custom character —
        with an optional space after each delimiter. &quot;Delimited String → List&quot; does the reverse: paste
        a delimited string and split it back into one item per line. This covers comma-separated lists,
        pipe-separated lists, and semicolon-separated lists all in one tool.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Entering <code>red</code>, <code>green</code>, and <code>blue</code> (one per line) with the Comma
        delimiter and &quot;Add space after delimiter&quot; on produces <code>red, green, blue</code>. Pasting
        that same string into Split mode with the same delimiter breaks it back into three separate lines.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Turning a column of spreadsheet values into a comma-separated list for a CSV field or SQL query.</li>
          <li>Building a pipe-separated or semicolon-separated string for a config file or data import.</li>
          <li>Splitting a delimited string pasted from another tool back into one item per line for editing.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Can I use a delimiter that isn&apos;t comma, pipe, or semicolon?</strong> Yes — select Custom and type any character or short string, such as a tab or a double colon, to use as the delimiter.</li>
          <li><strong>Does the Split direction handle extra spaces around items?</strong> Yes — each resulting item is trimmed of leading and trailing whitespace, so <code>red, green,blue</code> splits cleanly into three items regardless of inconsistent spacing.</li>
          <li><strong>What happens to empty lines or empty items?</strong> They're automatically filtered out in both directions, so blank lines in your list and empty items from consecutive delimiters don&apos;t appear in the result.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/delimiter-list-generator" content={content}>
      <DelimiterListGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default DelimiterListGenerator;
