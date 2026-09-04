'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { cssToTemplateLiteral } from './cssTransform';

const SAMPLE = '.card {\n  display: flex;\n  padding: 16px;\n  background-color: #3b82f6;\n  border-radius: 8px;\n  font-size: 14px;\n}';

const CssToTemplateLiteralContent = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      return;
    }
    setOutput(cssToTemplateLiteral(input));
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
          <Typography variant="subtitle1" fontWeight="600">styled-components Output</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          component="pre"
          sx={{ p: 2, minHeight: 395, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {output || 'Template literal output will appear here...'}
        </Paper>
      </Box>
    </Box>
  );
};

const CssToTemplateLiteral = () => {
  const content = (
    <>
      <Typography variant="h2">Free CSS to Template Literal Converter</Typography>
      <Typography variant="body1">
        Paste CSS to instantly convert each rule into a <code>styled-components</code> or Emotion-style tagged
        template literal. Unlike CSS-to-JS-objects, property names and values are kept exactly as raw CSS since
        template literals accept standard CSS syntax directly.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste a CSS stylesheet or snippet into the input box, or click &quot;Load Example&quot;. The tool parses
        each rule block and generates one <code>const Styled&lt;Name&gt; = styled.div\`...\`;</code> declaration
        per selector, with the component name derived from the selector in PascalCase.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        <code>{'.card { display: flex; padding: 16px; }'}</code> becomes a
        <code>{'const StyledCard = styled.div`\n  display: flex;\n  padding: 16px;\n`;'}</code> declaration you
        can rename and use as a JSX element.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Migrating an existing CSS file to <code>styled-components</code> or Emotion during a refactor.</li>
          <li>Bootstrapping styled component scaffolding from a designer&apos;s CSS handoff.</li>
          <li>Quickly wrapping a handful of one-off CSS rules as reusable styled components.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does this work with Emotion&apos;s <code>styled</code> too?</Typography>
      <Typography variant="body1">
        Yes — the generated syntax (<code>styled.div\`...\`</code>) is identical between
        <code>styled-components</code> and Emotion&apos;s <code>@emotion/styled</code> package, so the output
        works with either without changes.
      </Typography>
      <Typography variant="h3">Why use <code>div</code> as the base element?</Typography>
      <Typography variant="body1">
        <code>div</code> is a safe, generic default. Swap <code>styled.div</code> for whatever element the
        original selector actually targeted (<code>styled.button</code>, <code>styled.a</code>, and so on) once
        you paste the output into your project.
      </Typography>
      <Typography variant="h3">Is my CSS uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — parsing and conversion happen entirely client-side in your browser. Nothing you paste is sent to a
        server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/css-to-template-literal" content={content}>
      <CssToTemplateLiteralContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CssToTemplateLiteral;
