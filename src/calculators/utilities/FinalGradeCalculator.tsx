'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const FinalGradeCalculator = () => {
  const [currentGrade, setCurrentGrade] = useState<string>('82');
  const [finalWeight, setFinalWeight] = useState<string>('30');
  const [desiredGrade, setDesiredGrade] = useState<string>('90');

  const result = useMemo(() => {
    const current = parseFloat(currentGrade);
    const weightPct = parseFloat(finalWeight);
    const desired = parseFloat(desiredGrade);
    if (isNaN(current) || isNaN(weightPct) || isNaN(desired) || weightPct <= 0 || weightPct > 100) return null;
    const w = weightPct / 100;
    const required = (desired - current * (1 - w)) / w;
    return required;
  }, [currentGrade, finalWeight, desiredGrade]);

  const content = (
    <>
      <Typography variant="h2">How to Calculate the Grade You Need on Your Final</Typography>
      <Typography variant="body1">
        Enter your current grade (before the final), the weight of the remaining assignment or final exam as a
        percentage of your overall grade, and the overall grade you&apos;re aiming for. The calculator works
        backward to tell you exactly what score you need on the remaining work to hit that target.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Required Score = (Desired − Current × (1 − Weight)) / Weight
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        You currently have an 82% average, and the final exam is worth 30% of your overall grade. To reach a 90%
        overall, you need: (90 − 82 × 0.7) / 0.3 = (90 − 57.4) / 0.3 = 108.7%. That&apos;s above 100%, meaning a
        90% overall isn&apos;t achievable in this scenario — you&apos;d need extra credit or a lower target.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Figuring out what score you need on a final exam to reach a target course grade.</li>
          <li>Deciding how much a remaining assignment matters to your overall outcome.</li>
          <li>Checking whether a desired grade is still mathematically possible before the final.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What does it mean if the required score is over 100%?</Typography>
      <Typography variant="body1">
        It means your desired overall grade isn&apos;t achievable with a normal final exam score — you&apos;d
        need extra credit, or you should adjust your target to something realistically reachable.
      </Typography>
      <Typography variant="h3">What if the required score is negative?</Typography>
      <Typography variant="body1">
        A negative required score means you&apos;ve already secured your target grade even with a zero on the
        remaining work — your current grade alone is high enough given the final&apos;s weight.
      </Typography>
      <Typography variant="h3">How do I find the weight of my final exam?</Typography>
      <Typography variant="body1">
        Check your course syllabus — instructors typically state each component&apos;s weight (like
        &quot;Final Exam: 30% of grade&quot;) up front. If several items remain, add up their combined weight
        and treat that as one combined &quot;remaining work&quot; percentage.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/final-grade-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, alignItems: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Current Grade (%)" type="number" fullWidth value={currentGrade} onChange={(e) => setCurrentGrade(e.target.value)} onFocus={(e) => e.target.select()} />
          <TextField label="Weight of Remaining Work (%)" type="number" fullWidth value={finalWeight} onChange={(e) => setFinalWeight(e.target.value)} onFocus={(e) => e.target.select()} />
          <TextField label="Desired Overall Grade (%)" type="number" fullWidth value={desiredGrade} onChange={(e) => setDesiredGrade(e.target.value)} onFocus={(e) => e.target.select()} />
        </Box>

        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">Required Score</Typography>
          <Typography variant="h3" color="primary" fontWeight={800}>
            {result !== null ? `${result.toFixed(2)}%` : '—'}
          </Typography>
          {result !== null && result > 100 && (
            <Alert severity="warning" sx={{ mt: 2, textAlign: 'left' }}>Your target grade may not be achievable — required score exceeds 100%.</Alert>
          )}
          {result !== null && result < 0 && (
            <Alert severity="success" sx={{ mt: 2, textAlign: 'left' }}>You&apos;ve already secured this grade regardless of your remaining score.</Alert>
          )}
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default FinalGradeCalculator;
