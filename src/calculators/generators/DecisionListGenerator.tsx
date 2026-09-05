'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, IconButton, MenuItem, Select, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface WeightedReason {
  id: number;
  reason: string;
  weight: number;
}

let nextId = 100;

const WEIGHT_OPTIONS = [1, 2, 3, 4, 5];

const DecisionListGeneratorContent = () => {
  const [decision, setDecision] = useState('Should I take the new job offer?');
  const [pros, setPros] = useState<WeightedReason[]>([
    { id: nextId++, reason: 'Higher salary', weight: 5 },
    { id: nextId++, reason: 'Better growth opportunities', weight: 4 },
  ]);
  const [cons, setCons] = useState<WeightedReason[]>([
    { id: nextId++, reason: 'Longer commute', weight: 3 },
    { id: nextId++, reason: 'Leaving a great team', weight: 4 },
  ]);

  const addRow = (list: 'pros' | 'cons') => {
    const setter = list === 'pros' ? setPros : setCons;
    setter((prev) => [...prev, { id: nextId++, reason: '', weight: 3 }]);
  };
  const removeRow = (list: 'pros' | 'cons', id: number) => {
    const setter = list === 'pros' ? setPros : setCons;
    setter((prev) => prev.filter((r) => r.id !== id));
  };
  const updateRow = (list: 'pros' | 'cons', id: number, patch: Partial<WeightedReason>) => {
    const setter = list === 'pros' ? setPros : setCons;
    setter((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  const { prosTotal, consTotal, winner, diff } = useMemo(() => {
    const prosTotal = pros.filter((p) => p.reason.trim()).reduce((sum, p) => sum + p.weight, 0);
    const consTotal = cons.filter((c) => c.reason.trim()).reduce((sum, c) => sum + c.weight, 0);
    const diff = Math.abs(prosTotal - consTotal);
    const winner = prosTotal === consTotal ? 'Tie' : prosTotal > consTotal ? 'Pros' : 'Cons';
    return { prosTotal, consTotal, winner, diff };
  }, [pros, cons]);

  const renderList = (list: 'pros' | 'cons', rows: WeightedReason[]) => (
    <Box>
      <Typography variant="subtitle1" fontWeight={600} color={list === 'pros' ? 'success.main' : 'error.main'} mb={1}>
        {list === 'pros' ? 'Pros' : 'Cons'}
      </Typography>
      <Stack spacing={1.5}>
        {rows.map((r) => (
          <Box key={r.id} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <TextField
              size="small"
              fullWidth
              placeholder={list === 'pros' ? 'Reason in favor' : 'Reason against'}
              value={r.reason}
              onChange={(e) => updateRow(list, r.id, { reason: e.target.value })}
            />
            <Select
              size="small"
              value={r.weight}
              onChange={(e) => updateRow(list, r.id, { weight: Number(e.target.value) })}
              sx={{ minWidth: 90 }}
            >
              {WEIGHT_OPTIONS.map((w) => (
                <MenuItem key={w} value={w}>Weight {w}</MenuItem>
              ))}
            </Select>
            <IconButton onClick={() => removeRow(list, r.id)} disabled={rows.length <= 1} size="small">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
      </Stack>
      <Button startIcon={<AddIcon />} onClick={() => addRow(list)} sx={{ mt: 1.5 }} size="small">
        Add {list === 'pros' ? 'Pro' : 'Con'}
      </Button>
    </Box>
  );

  return (
    <Box>
      <TextField
        label="Decision Being Considered"
        value={decision}
        onChange={(e) => setDecision(e.target.value)}
        fullWidth
        sx={{ mb: 3 }}
      />

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, mb: 3 }}>
        {renderList('pros', pros)}
        {renderList('cons', cons)}
      </Box>

      <Paper variant="outlined" sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">{decision || 'Your decision'}</Typography>
        <Typography variant="h4" fontWeight={800} color={winner === 'Pros' ? 'success.main' : winner === 'Cons' ? 'error.main' : 'text.primary'} sx={{ my: 1 }}>
          {winner === 'Tie' ? "It's a Tie" : `${winner} Win`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Pros total: {prosTotal} &nbsp;|&nbsp; Cons total: {consTotal} &nbsp;|&nbsp; Margin: {diff}
        </Typography>
      </Paper>
    </Box>
  );
};

const DecisionListGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Decision List Generator</Typography>
      <Typography variant="body1">
        Describe the decision you&apos;re weighing, then list your reasons for and against it. Give each reason
        an importance weight from 1 (barely matters) to 5 (matters a lot) instead of treating every reason
        equally. The tool adds up the weights on each side and tells you which way the weighted evidence leans
        — Pros, Cons, or a Tie — along with the raw totals and the margin between them.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Weighing a job offer with pros &quot;Higher salary&quot; (weight 5) and &quot;Better growth
        opportunities&quot; (weight 4) against cons &quot;Longer commute&quot; (weight 3) and &quot;Leaving a
        great team&quot; (weight 4) gives Pros a total of 9 and Cons a total of 7 — Pros win by a margin of 2.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Deciding between two job offers, apartments, or major purchases with a structured comparison.</li>
          <li>Working through a hard personal decision where some factors matter more than others.</li>
          <li>Sharing a transparent, weighted rationale with a partner, friend, or mentor before committing.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How should I choose a weight for each reason?</strong> Use 5 for reasons that would almost single-handedly decide the outcome, and 1 for minor factors that barely tip the scale — the exact numbers matter less than being consistent between your pros and cons.</li>
          <li><strong>What happens with a Tie?</strong> A tie means your weighted pros and cons are exactly balanced, which usually signals that the decision comes down to a factor you haven&apos;t weighted yet, or that either choice is reasonably fine.</li>
          <li><strong>Can I add more than two pros or cons?</strong> Yes — use the Add Pro or Add Con button as many times as you need; there&apos;s no limit on how many weighted reasons you can list on either side.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/decision-list-generator" content={content}>
      <DecisionListGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default DecisionListGenerator;
