'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface ExamRow {
  id: number;
  name: string;
  obtained: string;
  total: string;
  weight: string;
}

const ExamScoreCalculator = () => {
  const [rows, setRows] = useState<ExamRow[]>([
    { id: 1, name: 'Midterm', obtained: '78', total: '100', weight: '30' },
    { id: 2, name: 'Final Exam', obtained: '85', total: '100', weight: '50' },
    { id: 3, name: 'Assignments', obtained: '45', total: '50', weight: '20' },
  ]);
  const [nextId, setNextId] = useState(4);

  const addRow = () => {
    setRows([...rows, { id: nextId, name: `Exam ${nextId}`, obtained: '', total: '100', weight: '10' }]);
    setNextId(nextId + 1);
  };
  const removeRow = (id: number) => setRows(rows.filter((r) => r.id !== id));
  const updateRow = (id: number, field: keyof ExamRow, value: string) => {
    setRows(rows.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  };

  const { perRow, overallPercent, weightedAverage, totalObtained, totalMarks } = useMemo(() => {
    const per = rows.map((r) => {
      const o = parseFloat(r.obtained);
      const t = parseFloat(r.total);
      const w = parseFloat(r.weight);
      const pct = !isNaN(o) && !isNaN(t) && t > 0 ? (o / t) * 100 : null;
      return { ...r, pct, weightNum: isNaN(w) ? 0 : w };
    });

    const validForOverall = per.filter((r) => r.pct !== null && !isNaN(parseFloat(r.obtained)) && !isNaN(parseFloat(r.total)));
    const sumObtained = validForOverall.reduce((s, r) => s + parseFloat(r.obtained), 0);
    const sumTotal = validForOverall.reduce((s, r) => s + parseFloat(r.total), 0);
    const overall = sumTotal > 0 ? (sumObtained / sumTotal) * 100 : null;

    const weightedRows = per.filter((r) => r.pct !== null && r.weightNum > 0);
    const sumWeights = weightedRows.reduce((s, r) => s + r.weightNum, 0);
    const weighted = sumWeights > 0
      ? weightedRows.reduce((s, r) => s + (r.pct as number) * r.weightNum, 0) / sumWeights
      : null;

    return { perRow: per, overallPercent: overall, weightedAverage: weighted, totalObtained: sumObtained, totalMarks: sumTotal };
  }, [rows]);

  const content = (
    <>
      <Typography variant="h2">How to Calculate Your Overall Exam Score</Typography>
      <Typography variant="body1">
        Add each exam or section with the marks you obtained and the total marks available, plus an optional
        weight (like a percentage of your final grade). The calculator shows your <strong>overall percentage</strong>
        {' '}(total marks obtained across all rows divided by total marks possible) and, when weights are set, a
        {' '}<strong>weighted average</strong> that reflects how much each section actually counts toward your
        final grade.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Overall % = Σ(Obtained) / Σ(Total) × 100 &nbsp;|&nbsp; Weighted Avg = Σ(% × Weight) / Σ(Weight)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A midterm worth 30% scoring 78/100 (78%), a final exam worth 50% scoring 85/100 (85%), and assignments
        worth 20% scoring 45/50 (90%) give a weighted average of (78×30 + 85×50 + 90×20) / 100 = 83.9%.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Combining multiple exams or assignments into one overall course grade.</li>
          <li>Checking your current standing partway through a course with weighted components.</li>
          <li>Comparing raw percentage against a weighted grade when components carry different importance.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What&apos;s the difference between overall percentage and weighted average?</Typography>
      <Typography variant="body1">
        Overall percentage simply adds up all marks obtained and divides by all marks possible, treating every
        mark equally. Weighted average instead uses each row&apos;s percentage score combined according to its
        assigned weight — the number that typically matches your syllabus grading scheme.
      </Typography>
      <Typography variant="h3">Do the weights need to add up to 100?</Typography>
      <Typography variant="body1">
        No — the formula divides by the sum of the weights you enter, so it works correctly even if your
        weights don&apos;t total exactly 100 (for example, if you leave out unfinished components).
      </Typography>
      <Typography variant="h3">What if I don&apos;t care about weighting?</Typography>
      <Typography variant="body1">
        Just ignore the weight field or set all weights equal — the &quot;Overall Percentage&quot; result
        already gives you a straightforward, unweighted combined score across every row.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/exam-score-calculator" content={content}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {perRow.map((r) => (
          <Box key={r.id} sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
            <TextField label="Name" size="small" value={r.name} onChange={(e) => updateRow(r.id, 'name', e.target.value)} sx={{ flex: 2, minWidth: 120 }} />
            <TextField label="Obtained" type="number" size="small" value={r.obtained} onChange={(e) => updateRow(r.id, 'obtained', e.target.value)} onFocus={(e) => e.target.select()} sx={{ flex: 1, minWidth: 90 }} />
            <TextField label="Total" type="number" size="small" value={r.total} onChange={(e) => updateRow(r.id, 'total', e.target.value)} onFocus={(e) => e.target.select()} sx={{ flex: 1, minWidth: 90 }} />
            <TextField label="Weight %" type="number" size="small" value={r.weight} onChange={(e) => updateRow(r.id, 'weight', e.target.value)} onFocus={(e) => e.target.select()} sx={{ flex: 1, minWidth: 90 }} />
            <Typography variant="body2" sx={{ minWidth: 60, textAlign: 'right' }}>{r.pct !== null ? `${r.pct.toFixed(1)}%` : '—'}</Typography>
            <IconButton onClick={() => removeRow(r.id)} size="small" aria-label="Remove row">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
        <Button startIcon={<AddIcon />} onClick={addRow} variant="outlined" size="small" sx={{ alignSelf: 'flex-start' }}>
          Add Exam/Section
        </Button>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mt: 2 }}>
          <Paper variant="outlined" sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">Overall Percentage</Typography>
            <Typography variant="h4" color="primary" fontWeight={700}>
              {overallPercent !== null ? `${overallPercent.toFixed(2)}%` : '—'}
            </Typography>
            <Typography variant="caption" color="text.secondary">{totalObtained} / {totalMarks} marks</Typography>
          </Paper>
          <Paper variant="outlined" sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">Weighted Average</Typography>
            <Typography variant="h4" color="primary" fontWeight={700}>
              {weightedAverage !== null ? `${weightedAverage.toFixed(2)}%` : '—'}
            </Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ExamScoreCalculator;
