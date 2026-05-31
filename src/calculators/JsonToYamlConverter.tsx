'use client';

import { useState } from 'react';
import { Box, Typography, Button, TextField, Paper } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import yaml from 'js-yaml';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const JsonToYamlConverterContent = () => {
  const [jsonInput, setJsonInput] = useState<string>('{\n  "name": "John Doe",\n  "age": 30,\n  "skills": [\n    "React",\n    "Next.js"\n  ]\n}');
  const [yamlOutput, setYamlOutput] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const convert = () => {
    try {
      setError('');
      if (!jsonInput.trim()) {
        setYamlOutput('');
        return;
      }
      const parsed = JSON.parse(jsonInput);
      setYamlOutput(yaml.dump(parsed));
    } catch (err: any) {
      setError(err.message || 'Invalid JSON');
      setYamlOutput('');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(yamlOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr auto 1fr' }, gap: 3, alignItems: 'stretch' }}>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="subtitle2" fontWeight="bold">JSON Input</Typography>
          <TextField
            multiline
            rows={15}
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            fullWidth
            placeholder="Paste JSON here..."
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
            <Typography variant="subtitle2" fontWeight="bold">YAML Output</Typography>
            <Button 
              size="small" 
              startIcon={<ContentCopyIcon />} 
              onClick={handleCopy}
              disabled={!yamlOutput}
              color={copied ? "success" : "primary"}
            >
              {copied ? 'Copied' : 'Copy'}
            </Button>
          </Box>
          <TextField
            multiline
            rows={15}
            value={error ? error : yamlOutput}
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

const JsonToYamlConverter = () => {
  const content = (
    <>
      <Typography variant="h2">JSON to YAML Converter</Typography>
      <Typography variant="body1">
        Instantly convert JSON objects and arrays into human-readable YAML format. Perfect for creating Docker Compose, Kubernetes, and GitHub Actions configurations from existing JSON API responses.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="JSON to YAML Converter - Free Developer Tool"
      description="Convert JSON to YAML format instantly online. Free developer utility for configs."
      url="/tools/json-to-yaml-converter"
      content={content}
      category="Converters"
    >
      <JsonToYamlConverterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default JsonToYamlConverter;
