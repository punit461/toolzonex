'use client';

import { useState } from 'react';
import { Box, Button, Typography, Paper, Chip, Alert, IconButton, Tooltip } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface PowerballTicket {
  whiteBalls: number[];
  powerball: number;
}

const generateTicket = (): PowerballTicket => {
  const pool = new Set<number>();
  while (pool.size < 5) {
    pool.add(Math.floor(Math.random() * 69) + 1);
  }
  const whiteBalls = Array.from(pool).sort((a, b) => a - b);
  const powerball = Math.floor(Math.random() * 26) + 1;
  return { whiteBalls, powerball };
};

const BallChip = ({ value, variant }: { value: number; variant: 'white' | 'red' }) => (
  <Box
    sx={{
      width: 44,
      height: 44,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 700,
      fontSize: '1.05rem',
      bgcolor: variant === 'white' ? 'background.paper' : 'error.main',
      color: variant === 'white' ? 'text.primary' : 'common.white',
      border: variant === 'white' ? '2px solid' : 'none',
      borderColor: 'divider',
      boxShadow: 1,
    }}
  >
    {value}
  </Box>
);

const PowerballNumberGeneratorContent = () => {
  const [tickets, setTickets] = useState<PowerballTicket[]>([generateTicket()]);
  const [ticketCount, setTicketCount] = useState(1);

  const generate = () => {
    const count = Math.min(Math.max(ticketCount, 1), 20);
    setTickets(Array.from({ length: count }, generateTicket));
  };

  const clear = () => setTickets([]);

  const copyAll = async () => {
    const text = tickets
      .map((t) => `${t.whiteBalls.join(', ')} | Powerball: ${t.powerball}`)
      .join('\n');
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // clipboard unavailable; silently ignore
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center', mb: 3 }}>
        <Chip
          label="1 ticket"
          onClick={() => { setTicketCount(1); }}
          color={ticketCount === 1 ? 'primary' : 'default'}
          variant={ticketCount === 1 ? 'filled' : 'outlined'}
        />
        <Chip
          label="5 tickets"
          onClick={() => { setTicketCount(5); }}
          color={ticketCount === 5 ? 'primary' : 'default'}
          variant={ticketCount === 5 ? 'filled' : 'outlined'}
        />
        <Chip
          label="10 tickets"
          onClick={() => { setTicketCount(10); }}
          color={ticketCount === 10 ? 'primary' : 'default'}
          variant={ticketCount === 10 ? 'filled' : 'outlined'}
        />
        <Button variant="contained" size="large" startIcon={<CasinoIcon />} onClick={generate}>
          Quick Pick
        </Button>
        {tickets.length > 0 && (
          <>
            <Tooltip title="Copy all tickets">
              <IconButton onClick={copyAll} size="small"><ContentCopyIcon fontSize="small" /></IconButton>
            </Tooltip>
            <Tooltip title="Clear tickets">
              <IconButton onClick={clear} size="small"><DeleteIcon fontSize="small" /></IconButton>
            </Tooltip>
          </>
        )}
      </Box>

      {tickets.length === 0 ? (
        <Typography color="text.secondary">Click &quot;Quick Pick&quot; to generate numbers.</Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {tickets.map((ticket, i) => (
            <Paper key={i} sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
              <Typography variant="body2" color="text.secondary" sx={{ minWidth: 24 }}>{i + 1}.</Typography>
              {ticket.whiteBalls.map((n) => <BallChip key={n} value={n} variant="white" />)}
              <Typography sx={{ mx: 0.5, color: 'text.secondary' }}>+</Typography>
              <BallChip value={ticket.powerball} variant="red" />
            </Paper>
          ))}
        </Box>
      )}

      <Alert severity="warning" sx={{ mt: 3 }}>
        For entertainment only. This tool has no connection to the Multi-State Lottery Association or any
        official Powerball drawing, cannot predict winning numbers, and every combination has exactly the same
        odds. Always check your state lottery&apos;s official rules before playing.
      </Alert>
    </Box>
  );
};

const PowerballNumberGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How this Powerball number generator works</Typography>
      <Typography variant="body1">
        This tool creates a random Powerball-style ticket the same way an official &quot;Quick Pick&quot;
        works: it randomly selects 5 unique white ball numbers from 1 to 69, plus 1 red Powerball number from
        1 to 26. Tap &quot;Quick Pick&quot; to generate a fresh set, or generate up to 20 tickets at once for
        a group play or office pool.
      </Typography>
      <Alert severity="info" sx={{ my: 2 }}>
        This is an independent random number generator for fun and planning purposes. It is not affiliated
        with, endorsed by, or connected to the Multi-State Lottery Association, Powerball, or any state
        lottery. It does not predict or influence real drawing results.
      </Alert>

      <Typography variant="h2">How Powerball numbers work</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>5 white balls are drawn from a drum of 69 numbered balls (1–69), with no repeats.</li>
          <li>1 red Powerball is drawn separately from a drum of 26 numbered balls (1–26).</li>
          <li>The white balls can appear in any order — only the set of 5 numbers matters.</li>
          <li>Every number and every combination has an equal, independent chance of being drawn.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A Quick Pick ticket might come out as: 7, 19, 24, 41, 58, and Powerball 12. Tap the button above to
        generate your own.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Generating a random Powerball ticket to play, alongside or instead of a store-bought Quick Pick.</li>
          <li>Picking numbers for an office pool or group play where several tickets are needed at once.</li>
          <li>Practicing or demonstrating how lottery-style random draws work for a class or presentation.</li>
          <li>Choosing random numbers for a raffle, sweepstake, or game night that uses a similar 5+1 format.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Are these real Powerball winning numbers?</Typography>
      <Typography variant="body1">
        No. These are randomly generated for entertainment and planning purposes only. Official Powerball
        winning numbers are drawn live by the Multi-State Lottery Association — check your state lottery&apos;s
        website for verified results.
      </Typography>
      <Typography variant="h3">How does the Powerball number range work?</Typography>
      <Typography variant="body1">
        White balls are chosen from 1 to 69 (5 unique numbers), and the red Powerball is chosen separately
        from 1 to 26. This generator uses those exact ranges.
      </Typography>
      <Typography variant="h3">Does picking my own numbers improve my odds?</Typography>
      <Typography variant="body1">
        No — every number and every combination in an official drawing has exactly the same probability,
        whether you pick numbers yourself or use a Quick Pick. This tool exists for convenience and fun, not
        to improve odds.
      </Typography>
      <Typography variant="h3">Can I generate multiple tickets at once?</Typography>
      <Typography variant="body1">
        Yes — choose 1, 5, or 10 tickets above (or generate again for up to 20) to quickly build numbers for a
        group play or pool.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/generators/powerball-number-generator" content={content}>
      <PowerballNumberGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PowerballNumberGenerator;
