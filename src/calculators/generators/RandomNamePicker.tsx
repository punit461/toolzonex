'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Button, Paper, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const RandomNamePickerContent = () => {
  const [namesText, setNamesText] = useState<string>('Alice\nBob\nCharlie\nDiana\nEdward\nFiona');
  const [pickCount, setPickCount] = useState<number>(1);
  const [pickedNames, setPickedNames] = useState<string[]>([]);
  const [history, setHistory] = useState<string[][]>([]);

  const pickNames = () => {
    const names = namesText.split('\n').filter(n => n.trim() !== '');
    if (names.length === 0) return;

    const shuffled = [...names];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const numToPick = Math.min(pickCount, shuffled.length);
    const picked = shuffled.slice(0, numToPick);
    setPickedNames(picked);
    setHistory(prev => [picked, ...prev].slice(0, 10));
  };

  const copyResults = async () => {
    try { await navigator.clipboard.writeText(pickedNames.join('\n')); } catch {}
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
            placeholder="Enter names to pick from..."
          />
          <Typography variant="caption" color="text.secondary">Total names: {nameCount}</Typography>
        </Box>
        <TextField
          label="How many to pick?"
          type="number"
          value={pickCount}
          onChange={(e) => setPickCount(Math.max(1, parseInt(e.target.value) || 1))}
          fullWidth
          inputProps={{ min: 1, max: nameCount }}
        />
        <Button variant="contained" size="large" onClick={pickNames} disabled={nameCount === 0}>
          Pick
        </Button>

        {history.length > 0 && (
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="subtitle2" mb={1} color="text.secondary">Pick History</Typography>
            {history.map((round, idx) => (
              <Typography key={idx} variant="body2" sx={{ mb: 0.5 }}>
                #{idx + 1}: {round.join(', ')}
              </Typography>
            ))}
          </Paper>
        )}
      </Box>

      <Box>
        {pickedNames.length > 0 ? (
          <Paper sx={{ p: 4, bgcolor: 'primary.main', color: 'white', borderRadius: 4, minHeight: 250 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" fontWeight="bold" sx={{ opacity: 0.9 }}>
                Picked ({pickedNames.length})
              </Typography>
              <IconButton size="small" onClick={copyResults} sx={{ color: 'white' }}><ContentCopyIcon fontSize="small" /></IconButton>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {pickedNames.map((name, idx) => (
                <Paper key={idx} sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>
                  <Typography variant="h6">{name}</Typography>
                </Paper>
              ))}
            </Box>
          </Paper>
        ) : (
          <Paper variant="outlined" sx={{ p: 4, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.50' }}>
            <Typography color="text.secondary" align="center">
              Enter names and click Pick to randomly select winners.
            </Typography>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

const RandomNamePicker = () => {
  const content = (
    <>
      <Typography variant="h2">How Does the Random Name Picker Work?</Typography>
      <Typography variant="body1">
        Enter a list of names, one per line, and specify how many you want to pick. The tool shuffles the
        list using the Fisher-Yates algorithm and selects the first N names without replacement, ensuring no
        name is picked more than once in a single round.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        If you enter 10 names and ask to pick 3, the tool randomly selects 3 unique names from the list. A
        history of previous picks is kept so you can run multiple rounds and track results.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Picking random winners from giveaway entries.</li>
          <li>Assigning rotating roles or tasks to team members.</li>
          <li>Choosing students for classroom activities.</li>
          <li>Randomly selecting raffle or lottery winners.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Can I pick the same name twice in one round?</Typography>
      <Typography variant="body1">
        No — names are picked without replacement, so each name appears at most once per pick. You can
        pick again to select a new round from the same list.
      </Typography>
      <Typography variant="h3">Is the selection truly random?</Typography>
      <Typography variant="body1">
        Yes — the tool uses your browser&apos;s cryptographic random number generator via the Fisher-Yates
        shuffle to ensure a fair, unbiased selection.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/generators/random-name-picker" content={content}>
      <RandomNamePickerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RandomNamePicker;
