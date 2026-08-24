'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Alert, Paper, Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const JsonValidatorContent = () => {
  const [input, setInput] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!input.trim()) {
      setIsValid(null);
      setError(null);
      return;
    }
    try {
      JSON.parse(input);
      setIsValid(true);
      setError(null);
    } catch (e) {
      setIsValid(false);
      setError(e instanceof Error ? e.message : 'Invalid JSON');
    }
  }, [input]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="subtitle1" fontWeight="600">Paste JSON to Validate</Typography>
        {isValid !== null && (
          <Chip
            icon={isValid ? <CheckCircleIcon /> : <ErrorIcon />}
            label={isValid ? 'Valid JSON' : 'Invalid JSON'}
            color={isValid ? 'success' : 'error'}
            sx={{ fontWeight: 600 }}
          />
        )}
      </Box>
      <TextField
        multiline
        rows={16}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='{"example": "data"}'
        fullWidth
        variant="outlined"
        sx={{ fontFamily: 'monospace' }}
      />

      {isValid === true && (
        <Alert severity="success">This JSON is syntactically valid.</Alert>
      )}

      {isValid === false && error && (
        <Paper variant="outlined" sx={{ p: 2, bgcolor: '#fdecea', borderColor: 'error.main' }}>
          <Typography variant="subtitle2" color="error.main" fontWeight="600" gutterBottom>
            Syntax Error
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
            {error}
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

const JsonValidator = () => {
  const content = (
    <>
      <Typography variant="h2">Free JSON Validator — Check JSON Syntax Online</Typography>
      <Typography variant="body1">
        Paste any JSON string to instantly check whether it's syntactically valid. If it isn't, the exact
        error message from the parser is shown so you can find and fix the problem quickly.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste your JSON into the box above. Validation happens live as you type or paste — a green "Valid
        JSON" badge means the syntax checks out, while a red "Invalid JSON" badge shows the specific parser
        error message beneath the editor.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Pasting <code>{'{'}"name": "Alice", "age": 30{'}'}</code> shows a "Valid JSON" badge. Removing the closing
        brace or leaving a trailing comma instead produces an "Invalid JSON" badge along with the browser's
        exact syntax error message, such as "Unexpected end of JSON input".
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking whether an API response or request body is well-formed before debugging further.</li>
          <li>Validating a config file or `.json` snippet before committing it.</li>
          <li>Quickly confirming JSON pasted from a chat, email, or log file isn't corrupted.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does it tell me the exact line or column of the error?</Typography>
      <Typography variant="body1">
        The tool displays the exact error message your browser's JSON parser produces, as-is. Modern browsers
        often include a position (and sometimes a line/column) directly in that message — but this isn't
        guaranteed for every syntax error, since JavaScript's built-in JSON parser doesn't formally expose
        structured line/column data.
      </Typography>
      <Typography variant="h3">What counts as "invalid" JSON?</Typography>
      <Typography variant="body1">
        Anything that fails strict JSON syntax — trailing commas, single quotes instead of double quotes,
        unquoted keys, comments, or missing brackets/braces are all common causes, since JSON is stricter than
        JavaScript object literal syntax.
      </Typography>
      <Typography variant="h3">Is my data uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — validation runs entirely in your browser using the built-in JSON parser. Nothing you paste is
        sent to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/json-validator" content={content}>
      <JsonValidatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default JsonValidator;
