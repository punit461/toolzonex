'use client';

import { useState } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const XmlToJsonContent = () => {
  const [input, setInput] = useState('<users>\n  <user>\n    <id>1</id>\n    <name>John Doe</name>\n    <email>john@example.com</email>\n  </user>\n  <user>\n    <id>2</id>\n    <name>Jane Smith</name>\n    <email>jane@example.com</email>\n  </user>\n</users>');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  // A relatively simple recursive XML DOM to JSON object converter
  const xmlToJson = (xmlNode: any): any => {
    // Text node
    if (xmlNode.nodeType === 3) {
      return xmlNode.nodeValue.trim() ? xmlNode.nodeValue.trim() : null;
    }

    const obj: any = {};

    // Do attributes
    if (xmlNode.attributes && xmlNode.attributes.length > 0) {
      obj["@attributes"] = {};
      for (let j = 0; j < xmlNode.attributes.length; j++) {
        const attribute = xmlNode.attributes.item(j);
        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
      }
    }

    // Do children
    if (xmlNode.hasChildNodes()) {
      let textOnly = true;
      let textContent = '';

      for (let i = 0; i < xmlNode.childNodes.length; i++) {
        const item = xmlNode.childNodes.item(i);
        const nodeName = item.nodeName;

        if (item.nodeType === 3) { // Text node
          textContent += item.nodeValue.trim();
        } else if (item.nodeType === 1) { // Element node
          textOnly = false;
          if (typeof obj[nodeName] === "undefined") {
            obj[nodeName] = xmlToJson(item);
          } else {
            if (typeof obj[nodeName].push === "undefined") {
              const old = obj[nodeName];
              obj[nodeName] = [];
              obj[nodeName].push(old);
            }
            obj[nodeName].push(xmlToJson(item));
          }
        }
      }

      if (textOnly && textContent && !obj["@attributes"]) {
        // If it's purely a text node, return just the string
        return textContent;
      } else if (textOnly && textContent) {
        obj["#text"] = textContent;
      }
    }
    
    // Convert empty objects to empty strings if no attributes
    if (Object.keys(obj).length === 0 && !xmlNode.hasChildNodes()) {
      return "";
    }

    return obj;
  };

  const convertToJson = () => {
    setError('');
    setOutput('');
    
    if (!input.trim()) return;

    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(input, "text/xml");
      
      const parserError = xmlDoc.getElementsByTagName("parsererror");
      if (parserError.length > 0) {
        throw new Error("Invalid XML syntax.");
      }

      const result = xmlToJson(xmlDoc);
      // Remove the top-level '#document' wrapper that DOMParser adds
      const cleanResult = result['#document'] || result;
      
      setOutput(JSON.stringify(cleanResult, null, 2));
    } catch (err: any) {
      setError(err.message || "Failed to parse XML.");
    }
  };

  const copyToClipboard = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
    } catch (err) {}
  };

  const downloadJson = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'converted.json';
    link.click();
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      
      {/* Input Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" fontWeight="600">Input XML:</Typography>
        <TextField
          multiline
          rows={16}
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your XML here..."
          error={!!error}
          helperText={error}
          sx={{ '& .MuiInputBase-input': { fontFamily: 'monospace', fontSize: '0.9rem' } }}
        />
        <Button variant="contained" size="large" onClick={convertToJson} fullWidth>
          Convert to JSON
        </Button>
      </Box>

      {/* Output Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight="600">Output JSON:</Typography>
          <Box>
            <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output}>
              Copy
            </Button>
            <Button size="small" startIcon={<FileDownloadIcon />} onClick={downloadJson} disabled={!output}>
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
          placeholder="JSON output will appear here..."
          sx={{ '& .MuiInputBase-input': { fontFamily: 'monospace', fontSize: '0.9rem' } }}
        />
      </Box>

    </Box>
  );
};

const XmlToJsonConverter = () => {
  const content = (
    <>
      <Typography variant="h2">How to use the XML to JSON Converter?</Typography>
      <Typography variant="body1">
        Paste your XML data into the input box. The tool uses the native browser DOMParser to safely convert XML nodes and attributes into a structured JSON object. Repeated XML tags are automatically grouped into JSON arrays.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="XML to JSON Converter"
      description="Convert XML strings and files into formatted JSON instantly. Free online data converter."
      url="/tools/xml-to-json"
      content={content}
      category="Tools"
    >
      <XmlToJsonContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default XmlToJsonConverter;
