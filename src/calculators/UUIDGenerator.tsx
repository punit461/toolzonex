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
    </>
  );

  return (
    <CalculatorShell
      title="UUID / GUID Generator"
      description="Generate cryptographically secure v4 UUIDs instantly online. Free bulk UUID generator."
      url="/tools/uuid-generator"
      content={content}
      category="Tools"
    >
      <UUIDGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default UUIDGenerator;
