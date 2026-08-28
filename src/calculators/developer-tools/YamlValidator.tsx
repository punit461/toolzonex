'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, Stack } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface ValidationError {
  line: number;
  message: string;
}

function validateYaml(input: string): ValidationError[] {
  const errors: ValidationError[] = [];
  const lines = input.split('\n');

  let inSingleQuote = false;
  let inDoubleQuote = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNum = i + 1;
    const trimmed = line;

    if (trimmed === '' || trimmed.startsWith('#')) continue;

    if (/\t/.test(line)) {
      errors.push({ line: lineNum, message: 'YAML does not allow tab characters for indentation. Use spaces instead.' });
      continue;
    }

    let quoteChar: '"' | "'" | null = null;
    for (let c = 0; c < trimmed.length; c++) {
      const ch = trimmed[c];
      if (ch === '\\' && (inSingleQuote || inDoubleQuote)) {
        c++;
        continue;
      }
      if (ch === "'" && !inDoubleQuote) {
        if (inSingleQuote) {
          inSingleQuote = false;
          quoteChar = null;
        } else {
          inSingleQuote = true;
          quoteChar = "'";
        }
      } else if (ch === '"' && !inSingleQuote) {
        if (inDoubleQuote) {
          inDoubleQuote = false;
          quoteChar = null;
        } else {
          inDoubleQuote = true;
          quoteChar = '"';
        }
      }
    }

    if (inSingleQuote || inDoubleQuote) {
      errors.push({ line: lineNum, message: `Unmatched ${quoteChar} quote. Missing closing ${quoteChar}.` });
    }

    const kvMatch = trimmed.match(/^(\s*)([\w][\w\s.-]*?)(\s*:\s*)(.*)/);
    if (kvMatch) {
      const key = kvMatch[2].trim();
      if (key.includes(' ') && !key.startsWith('"') && !key.startsWith("'")) {
        errors.push({ line: lineNum, message: `Key "${key}" contains spaces. Wrap it in quotes.` });
      }
    }

    const indent = line.length - line.trimStart().length;
    const nextLine = i + 1 < lines.length ? lines[i + 1] : null;
    if (nextLine !== null && nextLine.trim() !== '' && !nextLine.trim().startsWith('#')) {
      const nextIndent = nextLine.length - nextLine.trimStart().length;
      if (nextIndent > indent && nextIndent - indent !== 2 && indent === 0) {
        // Only flag clearly wrong indentation (not standard 2-space)
      }
    }
  }

  if (inSingleQuote || inDoubleQuote) {
    const quoteChar = inSingleQuote ? "'" : '"';
    if (!errors.some((e) => e.message.includes(`${quoteChar} quote`))) {
      errors.push({ line: lines.length, message: `Unmatched ${quoteChar} quote at end of input.` });
    }
  }

  return errors;
}

const YamlValidator = () => {
  const [input, setInput] = useState('');

  const validation = useMemo(() => {
    if (!input.trim()) return { valid: false, errors: [] as ValidationError[] };
    const errors = validateYaml(input);
    return { valid: errors.length === 0, errors };
  }, [input]);

  const content = (
    <>
      <Typography variant="h2">How Does the YAML Validator Work?</Typography>
      <Typography variant="body1">
        This tool checks your YAML input for common syntax errors including tab characters (YAML requires
        spaces), unmatched quotes, and invalid key formatting. Paste or type your YAML on the left and
        see validation results on the right in real time.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Valid YAML: <code>name: John{'\n'}age: 30</code> shows "Valid YAML ✓". Invalid YAML with tabs or
        unmatched quotes will display the error with its line number.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking YAML configuration files before committing or deploying them.</li>
          <li>Debugging Docker Compose, Kubernetes, or CI/CD pipeline configs that fail to parse.</li>
          <li>Learning YAML syntax by seeing what causes validation errors in real time.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does this replace a full YAML parser?</Typography>
      <Typography variant="body1">
        No — this is a lightweight syntax checker that catches common mistakes like tabs, unmatched quotes,
        and bad key formatting. For full structural validation, use a dedicated YAML library.
      </Typography>
      <Typography variant="h3">Why doesn't YAML allow tabs?</Typography>
      <Typography variant="body1">
        YAML uses indentation to define structure, and the spec requires spaces (typically 2) for
        indentation. Tabs are explicitly forbidden because they can be displayed at different widths
        across editors, leading to ambiguous parsing.
      </Typography>
      <Typography variant="h3">Is my data uploaded?</Typography>
      <Typography variant="body1">
        No — all validation happens entirely in your browser. Nothing you paste is sent to any server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/yaml-validator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, minHeight: 400 }}>
        <Box>
          <Typography variant="subtitle1" fontWeight="600" gutterBottom>YAML Input</Typography>
          <TextField
            multiline
            rows={16}
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={'name: example\nversion: 1.0\nvalues:\n  - item1\n  - item2'}
            variant="outlined"
            sx={{ fontFamily: 'monospace', '& .MuiInputBase-input': { fontFamily: 'monospace' } }}
          />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight="600" gutterBottom>Validation Result</Typography>
          <Paper
            variant="outlined"
            sx={{
              p: 3,
              minHeight: 490,
              bgcolor: !input.trim()
                ? 'action.hover'
                : validation.valid
                  ? '#e8f5e9'
                  : '#fdecea',
              borderColor: !input.trim()
                ? 'divider'
                : validation.valid
                  ? 'success.main'
                  : 'error.main',
            }}
          >
            {!input.trim() ? (
              <Typography variant="body1" color="text.secondary">
                Enter YAML on the left to validate.
              </Typography>
            ) : validation.valid ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircleIcon color="success" />
                <Typography variant="h6" color="success.main" fontWeight={600}>
                  Valid YAML ✓
                </Typography>
              </Box>
            ) : (
              <Stack spacing={1.5}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ErrorIcon color="error" />
                  <Typography variant="h6" color="error.main" fontWeight={600}>
                    {validation.errors.length} {validation.errors.length === 1 ? 'error' : 'errors'} found
                  </Typography>
                </Box>
                {validation.errors.map((err, idx) => (
                  <Paper key={idx} variant="outlined" sx={{ p: 1.5, bgcolor: '#fff', borderColor: 'error.light' }}>
                    <Typography variant="body2" fontWeight={600} color="error.main">
                      Line {err.line}
                    </Typography>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                      {err.message}
                    </Typography>
                  </Paper>
                ))}
              </Stack>
            )}
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default YamlValidator;
