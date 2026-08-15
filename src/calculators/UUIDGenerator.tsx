'use client';

import { useState, useEffect } from 'react';
import { Box, Button, Typography, Paper, IconButton, TextField, FormControlLabel, Checkbox } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RefreshIcon from '@mui/icons-material/Refresh';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const UUIDGeneratorContent = () => {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  const [uppercase, setUppercase] = useState(false);
  const [noHyphens, setNoHyphens] = useState(false);

  const generateUuids = () => {
    const amount = Math.min(Math.max(count, 1), 100); // Limit to 100 at a time
    const newUuids = [];
    
    for (let i = 0; i < amount; i++) {
      let uuid = crypto.randomUUID();
      
      if (uppercase) uuid = uuid.toUpperCase();
      if (noHyphens) uuid = uuid.replace(/-/g, '');
      
      newUuids.push(uuid);
    }
    
    setUuids(newUuids);
  };

  useEffect(() => {
    generateUuids();
  }, []);

  const copyAll = async () => {
    try {
      await navigator.clipboard.writeText(uuids.join('\n'));
    } catch (err) {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box>
        <TextField
          label="Number of UUIDs to generate"
          type="number"
          value={count}
          onChange={(e) => setCount(parseInt(e.target.value) || 1)}
          fullWidth
          sx={{ mb: 3 }}
          InputProps={{ inputProps: { min: 1, max: 100 } }}
        />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
          <FormControlLabel
            control={<Checkbox checked={uppercase} onChange={(e) => setUppercase(e.target.checked)} />}
            label="Uppercase"
          />
          <FormControlLabel
            control={<Checkbox checked={noHyphens} onChange={(e) => setNoHyphens(e.target.checked)} />}
            label="Remove Hyphens"
          />
        </Box>

        <Button variant="contained" onClick={generateUuids} fullWidth size="large" startIcon={<RefreshIcon />}>
          Generate UUID(s)
        </Button>
      </Box>

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" fontWeight="600">Generated UUIDs:</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyAll}>
            Copy All
          </Button>
        </Box>
        
        <TextField
          value={uuids.join('\n')}
          multiline
          rows={10}
          fullWidth
          InputProps={{ readOnly: true, sx: { fontFamily: 'monospace' } }}
        />
      </Box>
    </Box>
  );
};

const UUIDGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">What is a UUID?</Typography>
      <Typography variant="body1">
        UUID stands for Universally Unique Identifier (also known as GUID). It is a 128-bit label used for information in computer systems. Standard UUIDs (like Version 4 generated here) are randomly generated and have virtually zero chance of collision.
      </Typography>

      <Typography variant="h2">Secure Generation</Typography>
      <Typography variant="body1">
        This tool uses the browser's native `crypto.randomUUID()` method, which relies on a cryptographically secure pseudorandom number generator (CSPRNG). It conforms to RFC 4122.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Clicking generate produces a UUID like <code>3fa85f64-5717-4562-b3fc-2c963f66afa6</code>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Generating unique primary keys for database records.</li>
          <li>Creating unique identifiers for API requests, sessions, or tracing.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Can two generated UUIDs ever collide?</Typography>
      <Typography variant="body1">
        The probability is astronomically small — with 122 random bits, collisions are considered practically
        impossible even across billions of UUIDs.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="UUID / GUID Generator"
      description="Generate cryptographically secure v4 UUIDs instantly online. Free bulk UUID generator."
      url="/generators/uuid-generator"
      content={content}
      category="Generators"
    >
      <UUIDGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default UUIDGenerator;
