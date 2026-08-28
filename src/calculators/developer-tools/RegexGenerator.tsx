'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Button, Chip, Switch, FormControlLabel, FormGroup, IconButton, Paper } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface PatternOptions {
  digits: boolean;
  lowercase: boolean;
  uppercase: boolean;
  alphanumeric: boolean;
  whitespace: boolean;
  anchorStart: boolean;
  anchorEnd: boolean;
  quantifier: '+' | '*' | '{n,m}' | '';
  flagI: boolean;
  flagG: boolean;
  flagM: boolean;
}

const RegexGenerator = () => {
  const [sampleText, setSampleText] = useState('Hello World 123! test@example.com');
  const [options, setOptions] = useState<PatternOptions>({
    digits: false,
    lowercase: false,
    uppercase: false,
    alphanumeric: false,
    whitespace: false,
    anchorStart: false,
    anchorEnd: false,
    quantifier: '',
    flagI: false,
    flagG: true,
    flagM: false,
  });

  const toggle = (key: keyof PatternOptions) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const setQuantifier = (q: PatternOptions['quantifier']) => {
    setOptions((prev) => ({ ...prev, quantifier: prev.quantifier === q ? '' : q }));
  };

  const regex = useMemo(() => {
    let charClass = '';
    if (options.digits) charClass += '0-9';
    if (options.lowercase) charClass += 'a-z';
    if (options.uppercase) charClass += 'A-Z';
    if (options.alphanumeric) charClass += 'a-zA-Z0-9';
    if (options.whitespace) charClass += '\\s';

    if (!charClass) return '';

    let pattern = '';
    if (options.anchorStart) pattern += '^';
    pattern += `[${charClass}]`;
    switch (options.quantifier) {
      case '+': pattern += '+'; break;
      case '*': pattern += '*'; break;
      case '{n,m}': pattern += '{1,}'; break;
    }
    if (options.anchorEnd) pattern += '$';

    let flags = '';
    if (options.flagI) flags += 'i';
    if (options.flagG) flags += 'g';
    if (options.flagM) flags += 'm';

    return `/${pattern}/${flags}`;
  }, [options]);

  const matches = useMemo(() => {
    if (!regex || !sampleText) return [];
    try {
      const cleaned = regex.slice(1, regex.lastIndexOf('/'));
      const flags = regex.slice(regex.lastIndexOf('/') + 1);
      const re = new RegExp(cleaned, flags);
      const results: { text: string; index: number }[] = [];
      let m;
      if (flags.includes('g')) {
        while ((m = re.exec(sampleText)) !== null) {
          results.push({ text: m[0], index: m.index });
          if (m[0].length === 0) re.lastIndex++;
        }
      } else {
        m = re.exec(sampleText);
        if (m) results.push({ text: m[0], index: m.index });
      }
      return results;
    } catch {
      return [];
    }
  }, [regex, sampleText]);

  const highlighted = useMemo(() => {
    if (!sampleText || matches.length === 0) return null;
    const parts: { text: string; match: boolean }[] = [];
    let lastIdx = 0;
    const sorted = [...matches].sort((a, b) => a.index - b.index);
    for (const m of sorted) {
      if (m.index > lastIdx) parts.push({ text: sampleText.slice(lastIdx, m.index), match: false });
      parts.push({ text: m.text, match: true });
      lastIdx = m.index + m.text.length;
    }
    if (lastIdx < sampleText.length) parts.push({ text: sampleText.slice(lastIdx), match: false });
    return parts;
  }, [sampleText, matches]);

  const copyToClipboard = () => {
    if (regex) navigator.clipboard.writeText(regex);
  };

  const content = (
    <>
      <Typography variant="h2">How Does It Work?</Typography>
      <Typography variant="body1">
        Build a regular expression visually by toggling character classes (digits, letters, whitespace), anchors, and quantifiers.
        The tool assembles the regex pattern in real time and highlights all matches in your sample text, so you can verify the pattern works before using it in code.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Toggle &quot;lowercase&quot;, &quot;uppercase&quot;, and &quot;+&quot; quantifier to get <code>/[a-zA-Z]+/g</code>, which matches one or more consecutive letters.
        Against &quot;Hello World 123!&quot;, it highlights &quot;Hello&quot; and &quot;World&quot;.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Quickly generating regex patterns for form validation (emails, phone numbers, etc.).</li>
          <li>Learning how character classes, anchors, and quantifiers combine into patterns.</li>
          <li>Testing regex against sample data before integrating into JavaScript, Python, or other code.</li>
          <li>Building search-and-replace patterns for text editors and IDEs.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What regex flavor does this generate?</Typography>
      <Typography variant="body1">
        JavaScript (ECMAScript) regex syntax, which is compatible with most modern languages and tools including browsers, Node.js, Python, and many text editors.
      </Typography>
      <Typography variant="h3">How do I copy the regex?</Typography>
      <Typography variant="body1">
        Click the copy icon next to the generated regex string. It copies the full pattern including the delimiters and flags (e.g. /pattern/g).
      </Typography>
      <Typography variant="h3">Can I generate a regex for email validation?</Typography>
      <Typography variant="body1">
        Toggle lowercase, digits, and the + quantifier, then add your own custom characters. For robust email validation, a hand-crafted pattern or a dedicated library is recommended over a simple character class approach.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/regex-generator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Sample text to match"
            multiline
            rows={3}
            value={sampleText}
            onChange={(e) => setSampleText(e.target.value)}
            fullWidth
            size="small"
          />

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Character Classes</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {([
                ['digits', 'Digits [0-9]'],
                ['lowercase', 'Lowercase [a-z]'],
                ['uppercase', 'Uppercase [A-Z]'],
                ['alphanumeric', 'Alphanumeric'],
                ['whitespace', 'Whitespace [\\s]'],
              ] as const).map(([key, label]) => (
                <Chip key={key} label={label} onClick={() => toggle(key)} color={options[key] ? 'primary' : 'default'} variant={options[key] ? 'filled' : 'outlined'} />
              ))}
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Anchors</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Chip label="^ Start" onClick={() => toggle('anchorStart')} color={options.anchorStart ? 'primary' : 'default'} variant={options.anchorStart ? 'filled' : 'outlined'} />
              <Chip label="$ End" onClick={() => toggle('anchorEnd')} color={options.anchorEnd ? 'primary' : 'default'} variant={options.anchorEnd ? 'filled' : 'outlined'} />
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Quantifier</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {(['+', '*', '{n,m}'] as const).map((q) => (
                <Chip key={q} label={q} onClick={() => setQuantifier(q)} color={options.quantifier === q ? 'primary' : 'default'} variant={options.quantifier === q ? 'filled' : 'outlined'} />
              ))}
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Flags</Typography>
            <FormGroup row>
              <FormControlLabel control={<Switch checked={options.flagI} onChange={() => toggle('flagI')} size="small" />} label="i (case-insensitive)" />
              <FormControlLabel control={<Switch checked={options.flagG} onChange={() => toggle('flagG')} size="small" />} label="g (global)" />
              <FormControlLabel control={<Switch checked={options.flagM} onChange={() => toggle('flagM')} size="small" />} label="m (multiline)" />
            </FormGroup>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle1" fontWeight="600">Generated Regex</Typography>
            <IconButton onClick={copyToClipboard} disabled={!regex} size="small">
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Box>
          <Paper variant="outlined" sx={{ p: 2, fontFamily: 'monospace', fontSize: '1.1rem', wordBreak: 'break-all', bgcolor: 'action.hover' }}>
            {regex || <Typography color="text.secondary" component="span">Select at least one character class</Typography>}
          </Paper>

          <Typography variant="subtitle2">Live Preview</Typography>
          <Paper variant="outlined" sx={{ p: 2, minHeight: 80, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
            {highlighted ? (
              highlighted.map((part, i) =>
                part.match ? (
                  <Box key={i} component="span" sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', borderRadius: 0.5, px: 0.5 }}>
                    {part.text}
                  </Box>
                ) : (
                  <span key={i}>{part.text}</span>
                )
              )
            ) : (
              <Typography color="text.secondary">{sampleText || 'Enter sample text above...'}</Typography>
            )}
          </Paper>
          <Typography variant="caption" color="text.secondary">
            {matches.length} match{matches.length !== 1 ? 'es' : ''} found
          </Typography>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RegexGenerator;
