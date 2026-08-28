'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Button, Paper, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const SecretSantaGeneratorContent = () => {
  const [namesText, setNamesText] = useState<string>('Alice\nBob\nCharlie\nDiana\nEdward');
  const [pairs, setPairs] = useState<{ from: string; to: string }[]>([]);

  const generatePairs = () => {
    const names = namesText.split('\n').filter(n => n.trim() !== '');
    if (names.length < 2) return;

    const shuffled = [...names];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const newPairs = shuffled.map((name, idx) => ({
      from: name,
      to: shuffled[(idx + 1) % shuffled.length],
    }));
    setPairs(newPairs);
  };

  const copyPairs = async () => {
    const text = pairs.map(p => `${p.from} → ${p.to}`).join('\n');
    try { await navigator.clipboard.writeText(text); } catch {}
  };

  const nameCount = namesText.split('\n').filter(n => n.trim() !== '').length;

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box>
          <Typography variant="subtitle2" mb={1} color="text.secondary">Enter names (one per line):</Typography>
          <TextField
            multiline
            rows={8}
            value={namesText}
            onChange={(e) => setNamesText(e.target.value)}
            fullWidth
            placeholder="Enter participant names..."
          />
          <Typography variant="caption" color="text.secondary">Total names: {nameCount}</Typography>
        </Box>
        <Button variant="contained" size="large" onClick={generatePairs} disabled={nameCount < 2}>
          Generate Pairs
        </Button>
      </Box>

      <Box>
        {pairs.length > 0 ? (
          <Paper sx={{ p: 4, bgcolor: 'primary.main', color: 'white', borderRadius: 4, minHeight: 250 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" fontWeight="bold" sx={{ opacity: 0.9 }}>Secret Santa Pairs</Typography>
              <IconButton size="small" onClick={copyPairs} sx={{ color: 'white' }}><ContentCopyIcon fontSize="small" /></IconButton>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {pairs.map((pair, idx) => (
                <Paper key={idx} sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>
                  <Typography variant="body1">
                    <strong>{pair.from}</strong> → <strong>{pair.to}</strong>
                  </Typography>
                </Paper>
              ))}
            </Box>
          </Paper>
        ) : (
          <Paper variant="outlined" sx={{ p: 4, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.50' }}>
            <Typography color="text.secondary" align="center">
              Enter at least 2 names and click Generate to create Secret Santa pairs.
            </Typography>
          </Paper>
        )}
        {pairs.length > 0 && (
          <Button variant="outlined" size="large" onClick={generatePairs} fullWidth sx={{ mt: 2 }}>
            Regenerate
          </Button>
        )}
      </Box>
    </Box>
  );
};

const SecretSantaGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How Does the Secret Santa Generator Work?</Typography>
      <Typography variant="body1">
        Enter the names of all participants, one per line. The generator shuffles the names using the
        Fisher-Yates algorithm and assigns each person the next person in the shuffled list as their gift
        recipient, creating a circular chain where the last person gives to the first.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        With 5 participants — Alice, Bob, Charlie, Diana, and Edward — after shuffling you might get pairs
        like: Alice gives to Charlie, Charlie gives to Edward, Edward gives to Bob, Bob gives to Diana, and
        Diana gives to Alice. Everyone gets exactly one person to gift.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Office holiday party gift exchanges.</li>
          <li>Family gatherings where everyone wants to give a gift without buying for the whole group.</li>
          <li>Friend group gift swaps or Secret Santa events.</li>
          <li>Team-building activities and social club events.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Can someone end up being assigned themselves?</Typography>
      <Typography variant="body1">
        No — the circular assignment ensures that each person is assigned to a different person. No one will
        ever draw their own name.
      </Typography>
      <Typography variant="h3">How many names can I enter?</Typography>
      <Typography variant="body1">
        There is no limit, but you need at least 2 participants. For very large groups, the tool will still
        work efficiently since all processing happens in your browser.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/generators/secret-santa-generator" content={content}>
      <SecretSantaGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default SecretSantaGenerator;
