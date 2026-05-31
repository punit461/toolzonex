'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Alert, Divider } from '@mui/material';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const JwtDecoderContent = () => {
  const [token, setToken] = useState<string>('');
  
  let header = null;
  let payload = null;
  let error = null;

  try {
    if (token.trim()) {
      const parts = token.split('.');
      if (parts.length === 3) {
        // Parse Header
        const base64UrlHeader = parts[0];
        const base64Header = base64UrlHeader.replace(/-/g, '+').replace(/_/g, '/');
        const jsonHeader = decodeURIComponent(atob(base64Header).split('').map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
        header = JSON.parse(jsonHeader);

        // Parse Payload
        const base64UrlPayload = parts[1];
        const base64Payload = base64UrlPayload.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64Payload).split('').map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
        payload = JSON.parse(jsonPayload);
      } else {
        error = "Invalid JWT structure (must contain 3 parts separated by dots).";
      }
    }
  } catch (e: any) {
    error = "Failed to decode JWT. It might be malformed.";
  }

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      
      {/* Input Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" fontWeight="600">Encoded JWT</Typography>
        <TextField
          multiline
          rows={15}
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI..."
          fullWidth
          variant="outlined"
          sx={{ fontFamily: 'monospace' }}
        />
        {error && (
          <Alert severity="error">{error}</Alert>
        )}
      </Box>

      {/* Output Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" fontWeight="600">Decoded Token Data</Typography>
        
        <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.50', display: 'flex', flexDirection: 'column', gap: 2, height: '100%', minHeight: 380 }}>
          {header || payload ? (
            <>
              <Box>
                <Typography variant="subtitle2" color="error.main" fontWeight="bold">HEADER (Algorithm & Token Type)</Typography>
                <pre style={{ margin: 0, fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                  {JSON.stringify(header, null, 2)}
                </pre>
              </Box>
              <Divider />
              <Box>
                <Typography variant="subtitle2" color="secondary.main" fontWeight="bold">PAYLOAD (Data)</Typography>
                <pre style={{ margin: 0, fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                  {JSON.stringify(payload, null, 2)}
                </pre>
              </Box>
            </>
          ) : (
            <Typography color="text.secondary">Paste a JWT token on the left to see the decoded header and payload.</Typography>
          )}
        </Paper>
      </Box>

    </Box>
  );
};

const JwtDecoder = () => {
  const content = (
    <>
      <Typography variant="h2">Free JWT Decoder</Typography>
      <Typography variant="body1">
        JSON Web Tokens (JWT) are an open standard used to share security information between two parties. This free online tool allows you to decode JWTs securely entirely within your browser. **Your token is never sent to any server.**
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="JWT Decoder"
      description="Decode JSON Web Tokens (JWT) safely and securely in your browser. Free online developer tool with no server-side tracking."
      url="/tools/jwt-decoder"
      content={content}
      category="Tools"
    >
      <JwtDecoderContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default JwtDecoder;
