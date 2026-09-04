'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { cssToTailwind } from './cssTransform';

const SAMPLE = '.card {\n  display: flex;\n  padding: 16px;\n  border-radius: 8px;\n  background: linear-gradient(to right, #3b82f6, #8b5cf6);\n  color: #ffffff;\n  text-align: center;\n}';

const CssToTailwindcssContent = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [unmapped, setUnmapped] = useState<string[]>([]);

  useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      setUnmapped([]);
      return;
    }
    const result = cssToTailwind(input);
    setOutput(result.output);
    setUnmapped(result.unmapped);
  }, [input]);

  const copyToClipboard = async () => {
    if (output) await navigator.clipboard.writeText(output);
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" fontWeight="600">Paste CSS</Typography>
        <TextField
          multiline
          rows={16}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={SAMPLE}
          fullWidth
          variant="outlined"
          sx={{ fontFamily: 'monospace' }}
        />
        <Button variant="outlined" size="small" onClick={() => setInput(SAMPLE)} sx={{ alignSelf: 'flex-start' }}>
          Load Example
        </Button>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight="600">Tailwind Classes</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          component="pre"
          sx={{ p: 2, minHeight: 200, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {output || 'Tailwind classes will appear here...'}
        </Paper>

        {unmapped.length > 0 && (
          <Alert severity="warning">
            <Typography variant="subtitle2" fontWeight="600" sx={{ mb: 1 }}>
              Not auto-converted — handle these manually:
            </Typography>
            <Box component="ul" sx={{ m: 0, pl: 2, fontFamily: 'monospace', fontSize: '0.85rem' }}>
              {unmapped.map((decl, i) => (
                <li key={i}>{decl}</li>
              ))}
            </Box>
          </Alert>
        )}
      </Box>
    </Box>
  );
};

const CssToTailwindcss = () => {
  const content = (
    <>
      <Typography variant="h2">Free CSS to Tailwind CSS Converter (Best-Effort)</Typography>
      <Typography variant="body1">
        Paste CSS to get a best-effort conversion into Tailwind utility classes. Common layout, spacing,
        typography, and color declarations are mapped against Tailwind&apos;s default theme; anything the tool
        can&apos;t confidently map is listed separately under &quot;Not auto-converted&quot; so you know exactly
        what still needs manual attention.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste a CSS rule or stylesheet into the input box, or click &quot;Load Example&quot;. The tool parses
        each declaration and checks it against small built-in lookup tables — Tailwind&apos;s default spacing
        scale, a subset of the default color palette (nearest-color matching by hex distance), and direct
        mappings for common properties like <code>display</code>, <code>position</code>, and
        <code>text-align</code>. Matched declarations become a class string; unmatched ones are listed as a
        warning below the output.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        <code>display: flex; padding: 16px;</code> maps cleanly to <code>flex p-4</code>, while something like
        <code>background: linear-gradient(...)</code> has no safe direct Tailwind utility equivalent and is
        listed under &quot;Not auto-converted&quot; instead of being guessed incorrectly.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Getting a rough first pass when migrating a component&apos;s CSS to Tailwind utility classes.</li>
          <li>Spot-checking which of your CSS declarations have obvious Tailwind equivalents.</li>
          <li>Learning Tailwind&apos;s naming conventions by comparing them against familiar CSS.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How accurate is this conversion?</Typography>
      <Typography variant="body1">
        This is explicitly a best-effort tool. It only recognizes a common default-theme subset — a standard
        spacing scale, a small set of named palette colors, and common layout/typography properties — and has no
        awareness of any custom <code>tailwind.config.js</code> theme extensions your project might use.
        Arbitrary or complex values (gradients, custom shadows, unusual color values, calc() expressions, and
        so on) are not guessed; they&apos;re listed as unmapped so you can convert them by hand or express them
        with Tailwind&apos;s arbitrary-value syntax, e.g. <code>{'bg-[#1a2b3c]'}</code> or
        <code>{'p-[18px]'}</code>.
      </Typography>
      <Typography variant="h3">Why are some colors matched to the wrong Tailwind shade?</Typography>
      <Typography variant="body1">
        Color matching only compares against the &quot;500&quot; shade of each named Tailwind color (plus
        black/white/transparent) using nearest-hex-distance, so an exact match isn&apos;t guaranteed — treat the
        suggested class as a starting point and adjust the shade number to match your design.
      </Typography>
      <Typography variant="h3">Is my CSS uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — parsing and conversion happen entirely client-side in your browser. Nothing you paste is sent to a
        server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/css-to-tailwindcss" content={content}>
      <CssToTailwindcssContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CssToTailwindcss;
