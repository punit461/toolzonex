'use client';

import { useState } from 'react';
import { Box, Button, Typography, Paper, ToggleButton, ToggleButtonGroup, IconButton } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightlightIcon from '@mui/icons-material/Nightlight';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const MORNING_MESSAGES = [
  'Good morning! Today is a fresh start — make it count.',
  "Rise and shine! Whatever today brings, you've got what it takes to handle it.",
  'Good morning! May your coffee be strong and your day be even stronger.',
  "A new day, a new chance to chase what matters to you. Good morning!",
  "Good morning! Take a deep breath and start today with a little more patience for yourself.",
  'The sun is up and so are you — good morning, make it a great one.',
  "Good morning! Small steps today add up to big progress over time.",
  "Wishing you a calm, clear-headed start to your morning. You've got this.",
  'Good morning! Let today be the day you give yourself a little more credit.',
  "Here's to a productive, peaceful morning ahead. Good morning!",
  'Good morning! Every sunrise is a reminder that you get to begin again.',
  "Wake up and be great today. Good morning!",
];

const NIGHT_MESSAGES = [
  'Good night! Rest well — tomorrow will still be there when you wake up.',
  "Whatever today held, it's over now. Get some good rest. Good night.",
  'Good night! May your sleep be deep and your dreams be kind.',
  "You made it through today — that counts for something. Sleep well.",
  'Good night! Let go of today and let your mind rest.',
  "Sweet dreams. Tomorrow is a brand new page. Good night.",
  'Good night! Rest up, you have earned it.',
  "Close your eyes and let today's worries wait until morning. Good night.",
  'Good night! Sleep tight and wake up ready for whatever comes next.',
  "Hope your night is peaceful and your rest is deep. Good night.",
  'Good night! May you wake up feeling lighter than you went to bed.',
  "Time to rest. You did enough today. Good night.",
];

const GoodMorningNightMessageGeneratorContent = () => {
  const [mode, setMode] = useState<'AM' | 'PM'>('AM');
  const [message, setMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const list = mode === 'AM' ? MORNING_MESSAGES : NIGHT_MESSAGES;
    setMessage(list[Math.floor(Math.random() * list.length)]);
  };

  const copyMessage = async () => {
    if (!message) return;
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable — ignore
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <ToggleButtonGroup
        exclusive
        value={mode}
        onChange={(_, val) => {
          if (val) {
            setMode(val);
            setMessage(null);
          }
        }}
      >
        <ToggleButton value="AM" sx={{ textTransform: 'none', gap: 1 }}>
          <WbSunnyIcon fontSize="small" /> Good Morning
        </ToggleButton>
        <ToggleButton value="PM" sx={{ textTransform: 'none', gap: 1 }}>
          <NightlightIcon fontSize="small" /> Good Night
        </ToggleButton>
      </ToggleButtonGroup>

      <Button
        variant="contained"
        size="large"
        startIcon={mode === 'AM' ? <WbSunnyIcon /> : <NightlightIcon />}
        onClick={generate}
      >
        Generate Message
      </Button>

      {message && (
        <Paper variant="outlined" sx={{ p: 3, maxWidth: 560, width: '100%', position: 'relative' }}>
          <Typography variant="body1" sx={{ pr: 4, fontStyle: 'italic' }}>
            {message}
          </Typography>
          <IconButton
            size="small"
            onClick={copyMessage}
            aria-label="Copy message"
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            <ContentCopyIcon fontSize="small" />
          </IconButton>
          {copied && (
            <Typography variant="caption" color="success.main" sx={{ display: 'block', mt: 1 }}>
              Copied!
            </Typography>
          )}
        </Paper>
      )}
    </Box>
  );
};

const GoodMorningNightMessageGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Good Morning/Good Night Message Generator</Typography>
      <Typography variant="body1">
        Toggle between &quot;Good Morning&quot; and &quot;Good Night&quot; and click &quot;Generate
        Message&quot; for a thoughtful message or quote drawn from a hand-written collection written
        specifically for that time of day. Click again for a different one any time.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Choosing Good Morning might generate &quot;Good morning! Today is a fresh start — make it
        count.&quot;, while Good Night might generate &quot;Good night! Rest well — tomorrow will still be
        there when you wake up.&quot;
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Sending a thoughtful good morning text to start someone&apos;s day on a positive note.</li>
          <li>Finding a genuine good night message for a partner, friend, or family member.</li>
          <li>Adding a caption to a sunrise or bedtime social media post.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>
            <strong>Does this replace two separate generators?</strong> Yes — this single tool covers both
            a Good Morning Message Generator and a Good Night Message Generator, switchable with one toggle.
          </li>
          <li>
            <strong>How many messages does each mode draw from?</strong> Each mode — morning and night —
            has its own hand-written collection of 12 messages, so there is plenty of variety.
          </li>
          <li>
            <strong>Can I personalize the message with a name?</strong> Not directly in this tool, but you
            can copy the generated message and add a name yourself before sending it.
          </li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/good-morning-night-message-generator" content={content}>
      <GoodMorningNightMessageGeneratorContent />
      <Box sx={{ mt: 4 }}>
        <AdSenseUnit />
      </Box>
    </CalculatorShell>
  );
};

export default GoodMorningNightMessageGenerator;
