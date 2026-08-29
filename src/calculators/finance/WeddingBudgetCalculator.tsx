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
  { id: 1, category: 'Venue & Catering', pct: '45' },
  { id: 2, category: 'Photography & Video', pct: '12' },
  { id: 3, category: 'Attire & Beauty', pct: '10' },
  { id: 4, category: 'Flowers & Decor', pct: '8' },
  { id: 5, category: 'Entertainment & Music', pct: '8' },
  { id: 6, category: 'Rings', pct: '6' },
  { id: 7, category: 'Invitations & Stationery', pct: '3' },
  { id: 8, category: 'Miscellaneous / Buffer', pct: '8' },
];

const COLORS = ['#1a56db', '#0d9488', '#e11d48', '#eab308', '#7e3af2', '#dc2626', '#0284c7', '#c27803'];

const WeddingBudgetCalculatorContent = () => {
  const [budget, setBudget] = useState('30000');
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
          label="Total Wedding Budget"
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

const WeddingBudgetCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How Does the Wedding Budget Calculator Work?</Typography>
      <Typography variant="body1">
        Enter your total wedding budget, then adjust the percentage allocated to each category —
        venue and catering, photography, attire, flowers, entertainment, rings, stationery, and a
        miscellaneous buffer. The calculator starts you off with commonly recommended default
        percentages and instantly converts each one into a dollar amount as you type, while keeping a
        running total so you can see whether your allocations add up to your full budget.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        With a $30,000 budget using the default allocations, venue and catering at 45% comes to
        $13,500, photography and video at 12% comes to $3,600, and the remaining categories split the
        rest — all six figures update together the moment you change the total budget or any single
        percentage.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Setting realistic per-vendor spending limits before requesting quotes.</li>
          <li>Deciding where to cut back when a favorite venue costs more than the default allocation.</li>
          <li>Comparing how shifting money from one category (like flowers) into another (like photography) affects the plan.</li>
          <li>Keeping a shared, editable reference for both partners and family members contributing to the budget.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why don&apos;t the default percentages add up exactly the way I want?</Typography>
      <Typography variant="body1">
        The defaults are a common starting template, not a rule — every wedding is different. Increase
        the percentage for what matters most to you (like photography or venue) and reduce others, just
        keep an eye on the &quot;Allocated&quot; total so your percentages still sum to 100%.
      </Typography>
      <Typography variant="h3">What should go in the miscellaneous category?</Typography>
      <Typography variant="body1">
        Use it as a buffer for gratuities, transportation, favors, unexpected vendor fees, and
        last-minute additions. Weddings routinely run over their planned categories, so keeping 5-10%
        unallocated as a cushion is a common safeguard.
      </Typography>
      <Typography variant="h3">Should the guest count change these percentages?</Typography>
      <Typography variant="body1">
        Guest count mainly affects the total budget itself (catering and venue costs scale with
        headcount) more than the percentage split — a larger guest list usually means increasing your
        total budget input rather than reallocating the percentages.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/wedding-budget-calculator" content={content}>
      <WeddingBudgetCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default WeddingBudgetCalculator;
