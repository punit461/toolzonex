'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface ValidationResult {
  valid: boolean;
  error?: string;
  line?: number;
  elementCount?: number;
  attributeCount?: number;
  textNodeCount?: number;
}

function validateXml(xml: string): ValidationResult {
  if (!xml.trim()) {
    return { valid: false, error: 'Please enter some XML to validate.' };
  }

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, 'text/xml');
    const parseError = doc.querySelector('parsererror');

    if (parseError) {
      const errorText = parseError.textContent || 'Unknown parse error';
      const lineMatch = errorText.match(/line\s+(\d+)/i);
      return {
        valid: false,
        error: errorText,
        line: lineMatch ? parseInt(lineMatch[1], 10) : undefined,
      };
    }

    const elements = doc.getElementsByTagName('*');
    let attributeCount = 0;
    let textNodeCount = 0;

    for (let i = 0; i < elements.length; i++) {
      attributeCount += elements[i].attributes.length;
    }

    const walk = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent?.trim();
        if (text) textNodeCount++;
      }
      for (const child of Array.from(node.childNodes)) walk(child);
    };
    walk(doc);

    return {
      valid: true,
      elementCount: elements.length,
      attributeCount,
      textNodeCount,
    };
  } catch (e: any) {
    return { valid: false, error: e.message || 'Failed to parse XML.' };
  }
}

const XmlValidatorContent = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<ValidationResult | null>(null);

  const handleValidate = () => {
    setResult(validateXml(input));
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" fontWeight="600">XML Code</Typography>
        <TextField
          multiline
          rows={15}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='<root>\n  <item id="1">Hello</item>\n  <item id="2">World</item>\n</root>'
          fullWidth
          variant="outlined"
          sx={{ fontFamily: 'monospace' }}
        />
        <Button variant="contained" onClick={handleValidate} fullWidth>Validate XML</Button>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" fontWeight="600">Result</Typography>

        {!result && (
          <Paper variant="outlined" sx={{ p: 2, minHeight: 395, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography color="text.secondary">Click &quot;Validate XML&quot; to check your code...</Typography>
          </Paper>
        )}

        {result && result.valid && (
          <Paper variant="outlined" sx={{ p: 3, minHeight: 395 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <CheckCircleIcon color="success" />
              <Typography variant="h3" color="success.main">Valid XML</Typography>
            </Box>
            <Typography variant="body1" sx={{ mb: 1 }}>Your XML is well-formed and valid.</Typography>
            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography><strong>Elements:</strong> {result.elementCount}</Typography>
              <Typography><strong>Attributes:</strong> {result.attributeCount}</Typography>
              <Typography><strong>Text Nodes:</strong> {result.textNodeCount}</Typography>
            </Box>
          </Paper>
        )}

        {result && !result.valid && (
          <Paper variant="outlined" sx={{ p: 3, minHeight: 395 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <ErrorIcon color="error" />
              <Typography variant="h3" color="error.main">Invalid XML</Typography>
            </Box>
            <Alert severity="error" sx={{ mb: 2 }}>{result.error}</Alert>
            {result.line && (
              <Typography variant="body2" color="text.secondary">Error found near line {result.line}.</Typography>
            )}
          </Paper>
        )}
      </Box>
    </Box>
  );
};

const XmlValidator = () => {
  const content = (
    <>
      <Typography variant="h2">Free XML Validator &amp; Checker</Typography>
      <Typography variant="body1">
        Validate your XML code instantly. Paste your XML and get a clear pass/fail result with detailed error messages including the line number where the problem was found.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste your XML into the input panel and click &quot;Validate XML.&quot; The tool uses the browser&apos;s built-in DOMParser to check whether your XML is well-formed. If valid, it also counts elements, attributes, and text nodes. If invalid, it shows the error message and the line number.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Valid XML like <code>&lt;note&gt;&lt;to&gt;Alice&lt;/to&gt;&lt;/note&gt;</code> passes validation and shows a node count. An unclosed tag like <code>&lt;note&gt;&lt;to&gt;Alice&lt;/note&gt;</code> fails with an error indicating the expected closing tag.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking XML files before importing them into an application.</li>
          <li>Validating API responses that return XML.</li>
          <li>Debugging malformed XML generated by code or templates.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does this validate against an XSD or DTD?</Typography>
      <Typography variant="body1">
        No — this tool only checks whether the XML is well-formed (proper nesting, matching tags, valid structure). It does not validate against a schema or DTD.
      </Typography>
      <Typography variant="h3">Is my XML uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — parsing happens entirely in your browser using the native DOMParser API. No data leaves your device.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/xml-validator" content={content}>
      <XmlValidatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default XmlValidator;
