'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Tabs, Tab, Paper } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Mode = 'single' | 'both' | 'atLeastOne';

const ProbabilityCalculator = () => {
  const [mode, setMode] = useState<Mode>('single');
  const [favorable, setFavorable] = useState<string>('1');
  const [total, setTotal] = useState<string>('6');
  const [p1, setP1] = useState<string>('0.5');
  const [p2, setP2] = useState<string>('0.3');

  const singleResult = useMemo(() => {
    const f = parseFloat(favorable);
    const t = parseFloat(total);
    if (Number.isNaN(f) || Number.isNaN(t) || t <= 0 || f < 0 || f > t) return null;
    return f / t;
  }, [favorable, total]);

  const compoundResult = useMemo(() => {
    const a = parseFloat(p1);
    const b = parseFloat(p2);
    if (Number.isNaN(a) || Number.isNaN(b) || a < 0 || a > 1 || b < 0 || b > 1) return null;
    if (mode === 'both') return a * b;
    if (mode === 'atLeastOne') return 1 - (1 - a) * (1 - b);
    return null;
  }, [mode, p1, p2]);

  const content = (
    <>
      <Typography variant="h2">How to Calculate Probability</Typography>
      <Typography variant="body1">
        This calculator covers three common probability scenarios. A single event&apos;s probability is
        favorable outcomes divided by total possible outcomes. For two independent events (where one
        doesn&apos;t affect the other), the probability that both happen is found by multiplying their
        individual probabilities. The probability that at least one of two independent events happens is 1
        minus the probability that neither happens.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        P(single) = Favorable ÷ Total &nbsp;|&nbsp; P(A and B) = P(A) × P(B) &nbsp;|&nbsp; P(A or B) = 1 − (1 − P(A))(1 − P(B))
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Rolling a 6-sided die and wanting a specific number gives P = 1 ÷ 6 ≈ 0.167. If you flip a coin (P =
        0.5) and roll a die and want heads (P = 0.5), the probability both happen is 0.5 × 0.5 = 0.25. The
        probability of getting heads OR rolling that number is 1 − (1 − 0.5)(1 − 0.167) ≈ 0.583.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Calculating odds for dice games, card draws, or lottery-style probability questions.</li>
          <li>Combining the probability of two independent events for statistics coursework.</li>
          <li>Estimating the chance that at least one of several independent risks or events occurs.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What does &quot;independent events&quot; mean?</Typography>
      <Typography variant="body1">
        Two events are independent if the outcome of one has no effect on the outcome of the other, like
        flipping a coin twice or rolling two separate dice. The multiplication and &quot;at least one&quot;
        formulas here only apply to independent events — dependent events require conditional probability
        instead.
      </Typography>
      <Typography variant="h3">Why isn&apos;t P(A or B) just P(A) + P(B)?</Typography>
      <Typography variant="body1">
        Simply adding the probabilities would double-count the case where both events happen. The formula 1 −
        (1 − P(A))(1 − P(B)) correctly accounts for this by first finding the probability that neither event
        happens, then subtracting that from 1.
      </Typography>
      <Typography variant="h3">Can probability be greater than 1 or less than 0?</Typography>
      <Typography variant="body1">
        No — probability is always between 0 (impossible) and 1 (certain), inclusive. This calculator expects
        inputs within that valid range for the compound event modes.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/probability-calculator" content={content}>
      <Tabs value={mode} onChange={(_, v) => setMode(v)} sx={{ mb: 3 }} variant="scrollable" scrollButtons="auto">
        <Tab label="Single Event" value="single" />
        <Tab label="Both Events Happen" value="both" />
        <Tab label="At Least One Happens" value="atLeastOne" />
      </Tabs>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {mode === 'single' ? (
            <>
              <TextField label="Favorable Outcomes" type="number" fullWidth value={favorable} onChange={(e) => setFavorable(e.target.value)} onFocus={(e) => e.target.select()} />
              <TextField label="Total Possible Outcomes" type="number" fullWidth value={total} onChange={(e) => setTotal(e.target.value)} onFocus={(e) => e.target.select()} />
            </>
          ) : (
            <>
              <TextField label="P(Event A) — between 0 and 1" type="number" fullWidth value={p1} onChange={(e) => setP1(e.target.value)} onFocus={(e) => e.target.select()} />
              <TextField label="P(Event B) — between 0 and 1" type="number" fullWidth value={p2} onChange={(e) => setP2(e.target.value)} onFocus={(e) => e.target.select()} />
            </>
          )}
        </Box>

        <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'action.hover', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {mode === 'single' ? (
            singleResult !== null ? (
              <>
                <Typography variant="body2" color="text.secondary">Probability</Typography>
                <Typography variant="h3" fontWeight={800} color="primary.main">{singleResult.toFixed(4)}</Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>{(singleResult * 100).toFixed(2)}%</Typography>
              </>
            ) : (
              <Typography variant="body1" color="text.secondary">Enter valid favorable and total outcomes</Typography>
            )
          ) : compoundResult !== null ? (
            <>
              <Typography variant="body2" color="text.secondary">
                {mode === 'both' ? 'P(A and B)' : 'P(A or B)'}
              </Typography>
              <Typography variant="h3" fontWeight={800} color="primary.main">{compoundResult.toFixed(4)}</Typography>
              <Typography variant="body2" color="text.secondary" mt={1}>{(compoundResult * 100).toFixed(2)}%</Typography>
            </>
          ) : (
            <Typography variant="body1" color="text.secondary">Enter probabilities between 0 and 1</Typography>
          )}
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ProbabilityCalculator;
