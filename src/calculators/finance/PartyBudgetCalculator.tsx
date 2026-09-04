'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, LinearProgress } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) =>
  `$${v.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

interface CategoryRow {
  id: number;
  category: string;
  pct: string;
}

const DEFAULT_ROWS: CategoryRow[] = [
  { id: 1, category: 'Venue', pct: '20' },
  { id: 2, category: 'Food & Drinks', pct: '35' },
  { id: 3, category: 'Decorations', pct: '15' },
  { id: 4, category: 'Entertainment', pct: '20' },
  { id: 5, category: 'Favors', pct: '10' },
];

const COLORS = ['#1a56db', '#0d9488', '#e11d48', '#eab308', '#7e3af2'];

const PartyBudgetCalculatorContent = () => {
  const [budget, setBudget] = useState('1000');
  const [rows, setRows] = useState<CategoryRow[]>(DEFAULT_ROWS);

  const updatePct = (id: number, pct: string) =>
    setRows(rows.map((r) => (r.id === id ? { ...r, pct } : r)));

  const { total, totalPct, breakdown, remaining } = useMemo(() => {
    const b = parseFloat(budget) || 0;
    const pctSum = rows.reduce((sum, r) => sum + (parseFloat(r.pct) || 0), 0);
    const bd = rows.map((r) => {
      const pct = parseFloat(r.pct) || 0;
      return { category: r.category, pct, amount: (b * pct) / 100 };
    });
    const allocated = bd.reduce((sum, r) => sum + r.amount, 0);
    return { total: allocated, totalPct: pctSum, breakdown: bd, remaining: b - allocated };
  }, [budget, rows]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Total Party Budget"
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          fullWidth
          slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
        />

        <Typography variant="subtitle1" fontWeight={600}>Category Allocations</Typography>
        {rows.map((r) => (
          <Box key={r.id} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Typography sx={{ flex: 2 }} variant="body2">{r.category}</Typography>
            <TextField
              type="number"
              value={r.pct}
              onChange={(e) => updatePct(r.id, e.target.value)}
              size="small"
              sx={{ flex: 1 }}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
            />
          </Box>
        ))}
        <Typography variant="body2" color={totalPct === 100 ? 'success.main' : 'warning.main'} fontWeight={600}>
          Allocated: {totalPct.toFixed(1)}% {totalPct !== 100 && '(adjust so this totals 100%)'}
        </Typography>
      </Box>

      <Box>
        <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: remaining >= 0 ? 'primary.main' : 'error.main', color: 'white' }}>
          <Typography variant="body2">{remaining >= 0 ? 'Unallocated Budget' : 'Over Budget By'}</Typography>
          <Typography variant="h3" fontWeight="bold">{money(Math.abs(remaining))}</Typography>
        </Paper>
        <Paper sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Total Allocated</Typography>
          <Typography fontWeight={600}>{money(total)} of {money(parseFloat(budget) || 0)}</Typography>
        </Paper>

        <Typography variant="subtitle2" color="text.secondary" mb={1}>Per-Category Amounts</Typography>
        {breakdown.map((b, i) => (
          <Box key={b.category} sx={{ mb: 1.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="body2">{b.category}</Typography>
              <Typography variant="body2" fontWeight={600}>{money(b.amount)}</Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={Math.min(b.pct, 100)}
              sx={{ height: 8, borderRadius: 4, bgcolor: 'action.hover', '& .MuiLinearProgress-bar': { bgcolor: COLORS[i % COLORS.length] } }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const PartyBudgetCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How Does the Party Budget Calculator Work?</Typography>
      <Typography variant="body1">
        Enter your total party budget, then adjust the percentage allocated to each category — venue, food and
        drinks, decorations, entertainment, and favors. The calculator starts you off with commonly suggested
        default percentages for a birthday or family celebration and instantly converts each one into a dollar
        amount as you type, while keeping a running total so you can see whether your allocations add up to
        your full budget.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        With a $1,000 budget using the default allocations, food and drinks at 35% comes to $350, venue at 20%
        comes to $200, and entertainment at 20% comes to another $200 — all figures update together the moment
        you change the total budget or any single percentage.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Planning a birthday party, graduation party, or family get-together on a set budget.</li>
          <li>Deciding where to cut back when catering or a venue costs more than the default allocation.</li>
          <li>Keeping a quick, shareable spending plan for a smaller, casual celebration.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is this different from the Event Cost Calculator?</Typography>
      <Typography variant="body1">
        This calculator splits one overall budget into percentages across a handful of broad categories — a
        quick, casual approach that suits birthdays and family celebrations. The Event Cost Calculator instead
        adds up individual, itemized line items (like a specific catering headcount or an AV rental quote) and
        is better suited to larger, more formal events where you already have detailed vendor costs to enter.
      </Typography>
      <Typography variant="h3">Why don&apos;t the default percentages add up exactly the way I want?</Typography>
      <Typography variant="body1">
        The defaults are a common starting template, not a rule — every celebration is different. Increase the
        percentage for what matters most (like food or entertainment) and reduce others, just keep an eye on
        the &quot;Allocated&quot; total so your percentages still sum to 100%.
      </Typography>
      <Typography variant="h3">What should I do if I go over budget?</Typography>
      <Typography variant="body1">
        Try lowering the percentage on a lower-priority category like decorations or favors first, since these
        are usually easier to scale back than food or venue costs without significantly changing the party.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/party-budget-calculator" content={content}>
      <PartyBudgetCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PartyBudgetCalculator;
