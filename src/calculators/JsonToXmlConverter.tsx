'use client';

import { useState } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const JsonToXmlContent = () => {
  const [input, setInput] = useState('{\n  "users": {\n    "user": [\n      {\n        "id": 1,\n        "name": "John Doe",\n        "email": "john@example.com"\n      },\n      {\n        "id": 2,\n        "name": "Jane Smith",\n        "email": "jane@example.com"\n      }\n    ]\n  }\n}');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  // Recursive function to convert JSON object to XML string
  const jsonToXml = (obj: any, indent = 0): string => {
    let xml = '';
    const indentation = '  '.repeat(indent);

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const val = obj[key];

        if (Array.isArray(val)) {
          // Arrays mean repeated tags of the same key
          val.forEach(item => {
            xml += `${indentation}<${key}>\n`;
            if (typeof item === 'object' && item !== null) {
              xml += jsonToXml(item, indent + 1);
            } else {
              xml += `${indentation}  ${item}\n`;
            }
            xml += `${indentation}</${key}>\n`;
          });
        } else if (typeof val === 'object' && val !== null) {
          // Nested object
          xml += `${indentation}<${key}>\n`;
          xml += jsonToXml(val, indent + 1);
          xml += `${indentation}</${key}>\n`;
        } else {
          // Primitive value
          xml += `${indentation}<${key}>${val}</${key}>\n`;
        }
      }
    }
    return xml;
  };

  const convertToXml = () => {
    setError('');
    setOutput('');
    
    if (!input.trim()) return;

    try {
      const parsed = JSON.parse(input);
      let xmlOutput = '<?xml version="1.0" encoding="UTF-8" ?>\n';
      
      // XML needs a single root element
      if (Array.isArray(parsed) || Object.keys(parsed).length !== 1) {
        xmlOutput += `<root>\n${jsonToXml(parsed, 1)}</root>`;
      } else {
        xmlOutput += jsonToXml(parsed, 0);
      }
      
      setOutput(xmlOutput);
    } catch (err: any) {
      setError(`Invalid JSON: ${err.message}`);
    }
  };

  const copyToClipboard = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
    } catch (err) {}
  };

  const downloadXml = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'application/xml' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'converted.xml';
    link.click();
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      
      {/* Input Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" fontWeight="600">Input JSON:</Typography>
        <TextField
          multiline
          rows={16}
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your JSON here..."
          error={!!error}
          helperText={error}
          sx={{ '& .MuiInputBase-input': { fontFamily: 'monospace', fontSize: '0.9rem' } }}
        />
        <Button variant="contained" size="large" onClick={convertToXml} fullWidth>
          Convert to XML
        </Button>
      </Box>

      {/* Output Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight="600">Output XML:</Typography>
          <Box>
            <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output}>
              Copy
            </Button>
            <Button size="small" startIcon={<FileDownloadIcon />} onClick={downloadXml} disabled={!output}>
              Download
            </Button>
          </Box>
        </Box>
        <TextField
          multiline
          rows={16}
          fullWidth
          value={output}
          InputProps={{ readOnly: true }}
          placeholder="XML output will appear here..."
          sx={{ '& .MuiInputBase-input': { fontFamily: 'monospace', fontSize: '0.9rem' } }}
        />
      </Box>

    </Box>
  );
};

const JsonToXmlConverter = () => {
  const content = (
    <>
      <Typography variant="h2">How to use the JSON to XML Converter?</Typography>
      <Typography variant="body1">
        Paste your JSON data into the input box. The tool parses your JSON and maps keys to XML tags. If your JSON has multiple root keys or is an array, it automatically wraps the output in a `&lt;root&gt;` tag to ensure valid XML.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="JSON to XML Converter"
      description="Convert JSON strings and files into formatted XML instantly. Free online data converter."
      url="/tools/json-to-xml"
      content={content}
      category="Tools"
    >
      <JsonToXmlContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default JsonToXmlConverter;
