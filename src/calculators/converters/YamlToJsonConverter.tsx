'use client';

import { useState } from 'react';
import { Box, Typography, Button, TextField, Paper } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import yaml from 'js-yaml';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const YamlToJsonConverterContent = () => {
  const [yamlInput, setYamlInput] = useState<string>('name: John Doe\nage: 30\nskills:\n  - React\n  - Next.js');
  const [jsonOutput, setJsonOutput] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const convert = () => {
    try {
      setError('');
      if (!yamlInput.trim()) {
        setJsonOutput('');
        return;
      }
      const parsed = yaml.load(yamlInput);
      setJsonOutput(JSON.stringify(parsed, null, 2));
    } catch (err: any) {
      setError(err.message || 'Invalid YAML');
      setJsonOutput('');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr auto 1fr' }, gap: 3, alignItems: 'stretch' }}>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="subtitle2" fontWeight="bold">YAML Input</Typography>
          <TextField
            multiline
            rows={15}
            value={yamlInput}
            onChange={(e) => setYamlInput(e.target.value)}
            fullWidth
            placeholder="Paste YAML here..."
            InputProps={{ sx: { fontFamily: 'monospace', fontSize: '0.9rem' } }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={convert}
            sx={{ minWidth: { md: 100 }, height: { xs: 48, md: 64 }, borderRadius: 2 }}
          >
            <Box sx={{ display: 'flex', flexDirection: { xs: 'row', md: 'column' }, alignItems: 'center', gap: 1 }}>
              <Typography variant="button">Convert</Typography>
              <SwapHorizIcon />
            </Box>
          </Button>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle2" fontWeight="bold">JSON Output</Typography>
            <Button 
              size="small" 
              startIcon={<ContentCopyIcon />} 
              onClick={handleCopy}
              disabled={!jsonOutput}
              color={copied ? "success" : "primary"}
            >
              {copied ? 'Copied' : 'Copy'}
            </Button>
          </Box>
          <TextField
            multiline
            rows={15}
            value={error ? error : jsonOutput}
            fullWidth
            InputProps={{ 
              readOnly: true, 
              sx: { 
                fontFamily: 'monospace', 
                fontSize: '0.9rem',
                bgcolor: error ? '#fef2f2' : '#f8fafc',
                color: error ? 'error.main' : 'text.primary'
              } 
            }}
          />
        </Box>

      </Box>

    </Box>
  );
};

const YamlToJsonConverter = () => {
  const content = (
    <>
      <Typography variant="h2">YAML to JSON Converter</Typography>
      <Typography variant="body1">
        Instantly convert YAML configurations into valid JSON format. Useful for developers working with Docker, Kubernetes, or CI/CD pipelines who need to translate YAML files into JSON for APIs or scripting.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste your YAML into the input box and the equivalent JSON output appears instantly, ready to copy.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A YAML snippet like <code>name: app</code> and <code>port: 8080</code> converts to
        <code>{'{"name":"app","port":8080}'}</code>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Converting a Kubernetes or Docker Compose YAML config to JSON for scripting.</li>
          <li>Translating YAML configuration files for use with JSON-only tooling.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does this support nested YAML structures?</Typography>
      <Typography variant="body1">
        Yes — nested objects, arrays, and lists in YAML are converted into their equivalent nested JSON
        structures.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="YAML to JSON Converter - Free Developer Tool"
      description="Convert YAML configurations to JSON format instantly online. Free developer utility."
      url="/converters/yaml-to-json-converter"
      content={content}
      category="Converters"
    >
      <YamlToJsonConverterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default YamlToJsonConverter;
