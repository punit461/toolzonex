'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { svgToReactNative } from './domTransform';

const SAMPLE = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2z" stroke-width="1.5" class="icon-path"/>\n</svg>';

const SvgToReactNativeContent = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }
    const result = svgToReactNative(input, 'Icon');
    setOutput(result.output);
    setError(result.error ?? null);
  }, [input]);

  const copyToClipboard = async () => {
    if (output) await navigator.clipboard.writeText(output);
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" fontWeight="600">Paste SVG Markup</Typography>
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
        {error && <Alert severity="error">{error}</Alert>}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight="600">React Native Component</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper
          variant="outlined"
          component="pre"
          sx={{ p: 2, minHeight: 395, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', m: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {output || 'React Native component will appear here...'}
        </Paper>
      </Box>
    </Box>
  );
};

const SvgToReactNative = () => {
  const content = (
    <>
      <Typography variant="h2">Free SVG to React Native SVG Converter</Typography>
      <Typography variant="body1">
        Paste raw SVG markup to instantly convert it into a <code>react-native-svg</code> component. Tag names
        like <code>{'<path>'}</code>, <code>{'<circle>'}</code>, and <code>{'<g>'}</code> are renamed to their
        capitalized <code>react-native-svg</code> equivalents (<code>Path</code>, <code>Circle</code>,
        <code>G</code>), with attributes camelCased the same way as the SVG-to-JSX converter.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste any SVG markup into the input box, or click &quot;Load Example&quot;. The tool parses the markup,
        walks the element tree, and renames every tag to its <code>react-native-svg</code> component name —
        <code>svg</code> becomes <code>Svg</code>, <code>text</code> becomes <code>SvgText</code> (since
        <code>Text</code> is already a core React Native component), and so on. The generated code includes a
        comment listing exactly which components to import.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        <code>{'<svg viewBox="0 0 24 24">'}</code> becomes <code>{'<Svg {...props} viewBox="0 0 24 24">'}</code>,
        and a nested <code>{'<path fill-rule="evenodd" .../>'}</code> becomes
        <code>{'<Path fillRule="evenodd" .../>'}</code> — ready to render on iOS and Android.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Porting a web icon set into a React Native mobile app.</li>
          <li>Converting a designer&apos;s exported SVG illustration for use in Expo or bare React Native projects.</li>
          <li>Avoiding manual tag-renaming errors when moving SVG assets between web and mobile codebases.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Do I need any extra packages to use the output?</Typography>
      <Typography variant="body1">
        Yes — the generated component imports from <code>react-native-svg</code>, which is not part of core
        React Native. Install it in your target project with <code>npm install react-native-svg</code> (and run
        <code>pod install</code> for iOS on bare React Native) before using the generated component.
      </Typography>
      <Typography variant="h3">Which tags get renamed?</Typography>
      <Typography variant="body1">
        Common SVG elements — <code>svg</code>, <code>path</code>, <code>circle</code>, <code>rect</code>,
        <code>g</code>, <code>line</code>, <code>polygon</code>, <code>polyline</code>, <code>ellipse</code>,
        <code>defs</code>, <code>linearGradient</code>, <code>radialGradient</code>, <code>stop</code>,
        <code>text</code>, <code>tspan</code>, <code>clipPath</code>, and <code>mask</code> — are mapped to their
        <code>react-native-svg</code> component names. The tool also lists exactly which of these your snippet
        used, so you know what to import.
      </Typography>
      <Typography variant="h3">Is my SVG uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — parsing and conversion happen entirely client-side in your browser. Nothing you paste is sent to a
        server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/svg-to-react-native" content={content}>
      <SvgToReactNativeContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default SvgToReactNative;
