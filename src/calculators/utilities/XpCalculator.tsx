'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, ToggleButtonGroup, ToggleButton } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const XpCalculator = () => {
  const [mode, setMode] = useState<'linear' | 'exponential'>('linear');

  const [currentLevel, setCurrentLevel] = useState('5');
  const [currentXp, setCurrentXp] = useState('300');
  const [targetLevel, setTargetLevel] = useState('10');

  const [xpPerLevel, setXpPerLevel] = useState('1000');

  const [base, setBase] = useState('100');
  const [exponent, setExponent] = useState('1.5');

  const lvl = parseFloat(currentLevel);
  const xp = parseFloat(currentXp);
  const target = parseFloat(targetLevel);
  const validCore = !isNaN(lvl) && !isNaN(xp) && !isNaN(target) && lvl >= 0 && xp >= 0 && target > lvl;

  const perLevel = parseFloat(xpPerLevel);
  const b = parseFloat(base);
  const e = parseFloat(exponent);

  let totalXpToTarget = 0;
  let xpAlreadyEarned = 0;

  if (mode === 'linear' && validCore && !isNaN(perLevel) && perLevel > 0) {
    totalXpToTarget = perLevel * target;
    xpAlreadyEarned = perLevel * lvl + xp;
  } else if (mode === 'exponential' && validCore && !isNaN(b) && !isNaN(e) && b > 0) {
    // Total XP to reach level N = sum of XP required for each level from 1 to N,
    // where XP for level i = base * i^exponent
    let sumToTarget = 0;
    for (let i = 1; i <= target; i++) sumToTarget += b * Math.pow(i, e);
    let sumToCurrent = 0;
    for (let i = 1; i <= lvl; i++) sumToCurrent += b * Math.pow(i, e);
    totalXpToTarget = sumToTarget;
    xpAlreadyEarned = sumToCurrent + xp;
  }

  const validResult = totalXpToTarget > 0;
  const xpRemaining = validResult ? Math.max(0, totalXpToTarget - xpAlreadyEarned) : 0;

  const content = (
    <>
      <Typography variant="h2">How to Use the XP Calculator</Typography>
      <Typography variant="body1">
        Most games track progress with an experience point (XP) system. In Simple Linear mode — the
        default, and the most common setup — every level requires the same fixed amount of XP, so total XP
        needed scales directly with level. In Exponential mode, used by many RPGs where later levels take
        noticeably longer, the XP required for each level grows according to a base value and an exponent.
        Enter your current level and XP within that level, plus your target level, to see the total XP
        needed and how much further you have to go.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Linear: Total XP for Level N = XP per Level × N<br />
        Exponential: XP for Level N = Base × N^Exponent (summed across all levels up to N)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        In Simple Linear mode with 1000 XP per level, reaching level 10 requires 10,000 total XP. If
        you&apos;re currently level 5 with 300 XP already earned toward level 6 (5,300 XP total), you still
        need 4,700 more XP to hit level 10. In Exponential mode with a base of 100 and exponent of 1.5,
        the XP requirement per level rises faster the higher you climb, so later levels take substantially
        more XP than early ones.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating how much more grinding or playtime is needed to reach a target level in a game.</li>
          <li>Modeling a custom leveling curve for a game you&apos;re designing.</li>
          <li>Comparing how a linear leveling system feels versus an exponential one at higher levels.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Which mode should I use for my game?</strong> Start with Simple Linear mode — it fits many games where each level requires the same fixed XP amount. Switch to Exponential mode only if your specific game (many RPGs and MMOs) is known to require noticeably more XP at higher levels.</li>
          <li><strong>How do I find the right base and exponent for exponential mode?</strong> These values are game-specific and usually come from community-documented formulas, datamined game files, or your own game&apos;s design spec — there&apos;s no universal base/exponent that fits every game, so you&apos;ll need the specific values for the title (or design) you&apos;re calculating for.</li>
          <li><strong>Why does total XP in exponential mode sum every level instead of just using the target level&apos;s formula?</strong> Because the formula gives the XP needed to go from one specific level to the next, not the cumulative total — reaching level 10 means first passing through levels 1 through 9, so the calculator adds up the XP cost of every level along the way.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/xp-calculator" content={content}>
      <ToggleButtonGroup value={mode} exclusive onChange={(_, v) => v && setMode(v)} size="small" sx={{ mb: 3 }}>
        <ToggleButton value="linear">Simple Linear</ToggleButton>
        <ToggleButton value="exponential">Exponential (RPG-style)</ToggleButton>
      </ToggleButtonGroup>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Stack spacing={3}>
          <TextField label="Current Level" type="number" value={currentLevel} onChange={(e) => setCurrentLevel(e.target.value)} fullWidth />
          <TextField label="Current XP Within This Level" type="number" value={currentXp} onChange={(e) => setCurrentXp(e.target.value)} fullWidth />
          <TextField label="Target Level" type="number" value={targetLevel} onChange={(e) => setTargetLevel(e.target.value)} fullWidth />
          {mode === 'linear' ? (
            <TextField label="XP Required per Level" type="number" value={xpPerLevel} onChange={(e) => setXpPerLevel(e.target.value)} fullWidth />
          ) : (
            <>
              <TextField label="Base" type="number" value={base} onChange={(e) => setBase(e.target.value)} fullWidth />
              <TextField label="Exponent" type="number" value={exponent} onChange={(e) => setExponent(e.target.value)} fullWidth inputProps={{ step: '0.1' }} />
            </>
          )}
        </Stack>
        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">XP Remaining to Target Level</Typography>
            <Typography variant="h4" fontWeight="bold">{validResult ? Math.round(xpRemaining).toLocaleString() : '—'}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Total XP Needed for Target Level</Typography>
            <Typography fontWeight={600}>{validResult ? Math.round(totalXpToTarget).toLocaleString() : '—'}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>XP Already Earned</Typography>
            <Typography fontWeight={600}>{validResult ? Math.round(xpAlreadyEarned).toLocaleString() : '—'}</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default XpCalculator;
