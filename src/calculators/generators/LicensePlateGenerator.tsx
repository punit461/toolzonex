'use client';

import { useState } from 'react';
import { Box, Button, Typography, Paper, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Format = 'us' | 'uk' | 'generic';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const DIGITS = '0123456789';

function randomChar(pool: string): string {
  return pool[Math.floor(Math.random() * pool.length)];
}

function randomString(pool: string, length: number): string {
  return Array.from({ length }, () => randomChar(pool)).join('');
}

function generatePlate(format: Format): string {
  if (format === 'us') {
    return `${randomString(LETTERS, 3)}-${randomString(DIGITS, 4)}`;
  }
  if (format === 'uk') {
    return `${randomString(LETTERS, 2)}${randomString(DIGITS, 2)} ${randomString(LETTERS, 3)}`;
  }
  // Generic international-style: 2 letters, 3 digits, 2 letters.
  return `${randomString(LETTERS, 2)}-${randomString(DIGITS, 3)}-${randomString(LETTERS, 2)}`;
}

const FORMAT_LABELS: Record<Format, string> = {
  us: 'US-style (ABC-1234)',
  uk: 'UK-style (AB12 CDE)',
  generic: 'Generic (AB-123-CD)',
};

const LicensePlateGeneratorContent = () => {
  const [format, setFormat] = useState<Format>('us');
  const [plates, setPlates] = useState<string[]>([]);

  const generate = () => {
    setPlates(Array.from({ length: 5 }, () => generatePlate(format)));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <Box>
        <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 1.5, textAlign: 'center' }}>Format</Typography>
        <ToggleButtonGroup exclusive value={format} onChange={(_, v) => v && setFormat(v)} sx={{ flexWrap: 'wrap' }}>
          {(Object.keys(FORMAT_LABELS) as Format[]).map((f) => (
            <ToggleButton key={f} value={f} sx={{ textTransform: 'none' }}>{FORMAT_LABELS[f]}</ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      <Button variant="contained" size="large" startIcon={<CasinoIcon />} onClick={generate}>
        {plates.length === 0 ? 'Generate Plates' : 'Regenerate'}
      </Button>

      {plates.length > 0 && (
        <Stack spacing={1.5} sx={{ width: '100%', maxWidth: 400 }}>
          {plates.map((p, i) => (
            <Paper key={i} variant="outlined" sx={{ p: 2, textAlign: 'center', fontFamily: 'monospace', fontSize: '1.5rem', fontWeight: 700, letterSpacing: 2, bgcolor: 'action.hover' }}>
              {p}
            </Paper>
          ))}
        </Stack>
      )}
    </Box>
  );
};

const LicensePlateGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How the License Plate Generator Works</Typography>
      <Typography variant="body1">
        Choose a plate format — US-style (3 letters + 4 digits, like <code>ABC-1234</code>), UK-style (2
        letters, 2 digits, then 3 letters, like <code>AB12 CDE</code>), or a generic international pattern —
        then click &quot;Generate Plates&quot; to get 5 randomly generated plate numbers in that format.
        Click &quot;Regenerate&quot; for a fresh batch.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Selecting &quot;US-style&quot; might generate plates like <code>QXR-7291</code>,{' '}
        <code>MDK-0357</code>, and <code>ZLT-6820</code> — five random fictional combinations in that format.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Generating realistic-looking placeholder license plates for UI mockups or app screenshots.</li>
          <li>Creating sample data for testing forms, databases, or license-plate recognition software.</li>
          <li>Producing fictional plates for creative writing, games, or design projects.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Are these real, registered license plates?</strong> No — every plate is randomly generated fictional text for mockups, testing, or creative use. They are not checked against, and have no connection to, any real vehicle registration database.</li>
          <li><strong>Can I use these plates in a design project or app?</strong> Yes, that's exactly what they're for — but don't present a generated plate as belonging to a real vehicle or use it in any way that could imply a real association.</li>
          <li><strong>Could a generated plate accidentally match a real one?</strong> It's possible by pure chance, the same way any random string generator could coincidentally match something real. These plates are not sourced from or checked against any registry, so any resemblance is coincidental.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/license-plate-generator" content={content}>
      <LicensePlateGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default LicensePlateGenerator;
