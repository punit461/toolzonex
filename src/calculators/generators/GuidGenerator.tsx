'use client';

import { useState, useEffect } from 'react';
import { Box, Button, Typography, Paper, IconButton, TextField, FormControl, InputLabel, Select, MenuItem, Slider } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RefreshIcon from '@mui/icons-material/Refresh';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type BracesOption = 'with-braces' | 'without-braces' | 'both';
type CaseOption = 'lower' | 'upper';

const GuidGeneratorContent = () => {
  const [guids, setGuids] = useState<string[]>([]);
  const [count, setCount] = useState(5);
  const [braces, setBraces] = useState<BracesOption>('with-braces');
  const [caseOption, setCaseOption] = useState<CaseOption>('lower');
  const [copiedAll, setCopiedAll] = useState(false);

  const generateGuids = () => {
    const n = Math.min(Math.max(count, 1), 50);
    const result: string[] = [];
    for (let i = 0; i < n; i++) {
      let uuid = crypto.randomUUID();
      if (caseOption === 'upper') uuid = uuid.toUpperCase();
      if (braces === 'with-braces') uuid = `{${uuid}}`;
      else if (braces === 'without-braces') uuid = uuid;
      result.push(uuid);
    }
    setGuids(result);
    setCopiedAll(false);
  };

  useEffect(() => { generateGuids(); }, []);

  const copySingle = async (val: string) => {
    try { await navigator.clipboard.writeText(val); } catch {}
  };

  const copyAll = async () => {
    try {
      await navigator.clipboard.writeText(guids.join('\n'));
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch {}
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' }, gap: 2 }}>
        <TextField
          label="Count"
          type="number"
          value={count}
          onChange={(e) => setCount(parseInt(e.target.value) || 1)}
          InputProps={{ inputProps: { min: 1, max: 50 } }}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Braces</InputLabel>
          <Select value={braces} label="Braces" onChange={(e) => setBraces(e.target.value as BracesOption)}>
            <MenuItem value="with-braces">{'{with braces}'}</MenuItem>
            <MenuItem value="without-braces">Without braces</MenuItem>
            <MenuItem value="both">Show both</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Case</InputLabel>
          <Select value={caseOption} label="Case" onChange={(e) => setCaseOption(e.target.value as CaseOption)}>
            <MenuItem value="lower">Lowercase</MenuItem>
            <MenuItem value="upper">Uppercase</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Button variant="contained" onClick={generateGuids} size="large" startIcon={<RefreshIcon />}>
        Generate GUIDs
      </Button>

      {guids.length > 0 && (
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle1" fontWeight={600}>Generated GUIDs ({guids.length})</Typography>
            <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyAll}>
              {copiedAll ? 'Copied!' : 'Copy All'}
            </Button>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            {guids.map((g, i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography sx={{ fontFamily: 'monospace', fontSize: '0.9rem', flex: 1, overflow: 'auto' }}>{g}</Typography>
                <IconButton size="small" onClick={() => copySingle(g)}>
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>
        </Paper>
      )}
    </Box>
  );
};

const GuidGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">What is a GUID?</Typography>
      <Typography variant="body1">
        A GUID (Globally Unique Identifier) is a 128-bit number used to uniquely identify information in computer systems. This tool generates GUID/UUID v4 strings using the browser&apos;s cryptographically secure random number generator.
      </Typography>

      <Typography variant="h2">How to Use the GUID Generator</Typography>
      <Typography variant="body1">
        Choose the number of GUIDs to generate (up to 50), select your preferred format (with or without braces), and pick uppercase or lowercase. Click &quot;Generate&quot; and copy individual GUIDs or all at once.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A typical GUID looks like <code>{'{'}550e8400-e29b-41d4-a716-446655440000{'}'}</code> (with braces) or <code>550e8400-e29b-41d4-a716-446655440000</code> (without braces).
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Generating unique primary keys for database records.</li>
          <li>Creating unique identifiers for API requests or session tokens.</li>
          <li>Testing applications that require unique string identifiers.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Are generated GUIDs truly unique?</strong> UUID v4 uses 122 random bits, making collisions statistically impossible for any practical number of generated values.</li>
          <li><strong>What&apos;s the difference between GUID and UUID?</strong> They are the same thing. GUID is Microsoft&apos;s term; UUID is the general standard (RFC 4122).</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/guid-generator" content={content}>
      <GuidGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default GuidGenerator;
