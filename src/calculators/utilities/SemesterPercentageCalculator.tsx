'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Button, IconButton, Stack, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface Subject {
  id: string;
  name: string;
  obtained: number;
  max: number;
}

let nextId = 5;

const SemesterPercentageCalculator = () => {
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: '1', name: 'Mathematics', obtained: 78, max: 100 },
    { id: '2', name: 'Physics', obtained: 65, max: 100 },
    { id: '3', name: 'Chemistry', obtained: 82, max: 100 },
    { id: '4', name: 'English', obtained: 90, max: 100 },
  ]);

  const addSubject = () => {
    setSubjects([...subjects, { id: String(nextId++), name: `Subject ${subjects.length + 1}`, obtained: 0, max: 100 }]);
  };

  const removeSubject = (id: string) => {
    setSubjects(subjects.filter((s) => s.id !== id));
  };

  const updateSubject = (id: string, field: keyof Subject, value: string | number) => {
    setSubjects(subjects.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const { rows, totalObtained, totalMax, overallPercentage } = useMemo(() => {
    let obtSum = 0;
    let maxSum = 0;
    const rows = subjects.map((s) => {
      const obtained = Number.isNaN(s.obtained) ? 0 : s.obtained;
      const max = Number.isNaN(s.max) ? 0 : s.max;
      obtSum += obtained;
      maxSum += max;
      return { ...s, percentage: max > 0 ? (obtained / max) * 100 : 0 };
    });
    return {
      rows,
      totalObtained: obtSum,
      totalMax: maxSum,
      overallPercentage: maxSum > 0 ? (obtSum / maxSum) * 100 : 0,
    };
  }, [subjects]);

  const content = (
    <>
      <Typography variant="h2">How to Calculate Semester Percentage</Typography>
      <Typography variant="body1">
        A semester percentage aggregates marks obtained across every subject in that semester into a single
        overall figure. Add each subject with its marks obtained and maximum marks, and this calculator sums
        the totals across all subjects to compute your combined semester percentage — while also showing you
        exactly how each individual subject contributed to that total.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Semester Percentage = (Σ Marks Obtained ÷ Σ Maximum Marks) × 100
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A semester with Mathematics (78/100), Physics (65/100), Chemistry (82/100), and English (90/100) has a
        total obtained of 315 out of 400 maximum marks, giving an overall semester percentage of
        (315 ÷ 400) × 100 = 78.75%, even though individual subject percentages range from 65% to 90%.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Computing an overall semester or term percentage across every subject you took.</li>
          <li>Spotting which subjects pulled your overall percentage up or down with the per-subject breakdown.</li>
          <li>Aggregating subjects that have different maximum marks (e.g. a 50-mark elective alongside 100-mark core subjects).</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is this different from a single-subject percentage calculator?</Typography>
      <Typography variant="body1">
        This tool is built specifically around aggregating multiple subjects for a full semester: it tracks a
        name and marks for each subject, shows a per-subject percentage breakdown table alongside the combined
        result, and correctly weights subjects with different maximum marks rather than just averaging a single
        test&apos;s score.
      </Typography>
      <Typography variant="h3">Does this average each subject&apos;s percentage together?</Typography>
      <Typography variant="body1">
        No — it sums total marks obtained and total maximum marks across all subjects first, then divides.
        This weights subjects by their maximum marks rather than treating every subject&apos;s percentage
        equally, which is the standard way semester percentages are calculated on report cards.
      </Typography>
      <Typography variant="h3">Can I remove a subject I added by mistake?</Typography>
      <Typography variant="body1">
        Yes — click the delete icon next to any subject row to remove it from the calculation. The overall
        percentage and breakdown table update immediately to reflect the remaining subjects.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/semester-percentage-calculator" content={content}>
      <Stack spacing={2}>
        {subjects.map((subject) => (
          <Stack key={subject.id} direction="row" spacing={1.5} alignItems="center">
            <TextField
              label="Subject"
              size="small"
              sx={{ minWidth: 140 }}
              value={subject.name}
              onChange={(e) => updateSubject(subject.id, 'name', e.target.value)}
              onFocus={(e) => e.target.select()}
            />
            <TextField
              label="Marks Obtained"
              type="number"
              size="small"
              fullWidth
              onFocus={(e) => e.target.select()}
              value={Number.isNaN(subject.obtained) ? '' : subject.obtained}
              onChange={(e) => updateSubject(subject.id, 'obtained', e.target.value === '' ? NaN : Number(e.target.value))}
            />
            <TextField
              label="Max Marks"
              type="number"
              size="small"
              fullWidth
              onFocus={(e) => e.target.select()}
              value={Number.isNaN(subject.max) ? '' : subject.max}
              onChange={(e) => updateSubject(subject.id, 'max', e.target.value === '' ? NaN : Number(e.target.value))}
            />
            <IconButton color="error" size="small" onClick={() => removeSubject(subject.id)} disabled={subjects.length <= 1}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Stack>
        ))}

        <Button startIcon={<AddIcon />} onClick={addSubject} sx={{ alignSelf: 'flex-start' }}>
          Add Subject
        </Button>

        <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="body2">Overall Semester Percentage</Typography>
          <Typography variant="h3" fontWeight="bold">{overallPercentage.toFixed(2)}%</Typography>
          <Typography variant="body2" mt={1}>{totalObtained} / {totalMax} total marks</Typography>
        </Paper>

        <Typography variant="h6" sx={{ mt: 2 }}>Per-Subject Breakdown</Typography>
        <Paper variant="outlined" sx={{ overflowX: 'auto' }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Subject</TableCell>
                <TableCell align="right">Obtained</TableCell>
                <TableCell align="right">Max</TableCell>
                <TableCell align="right">Percentage</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name || 'Untitled'}</TableCell>
                  <TableCell align="right">{Number.isNaN(row.obtained) ? '-' : row.obtained}</TableCell>
                  <TableCell align="right">{Number.isNaN(row.max) ? '-' : row.max}</TableCell>
                  <TableCell align="right">{row.percentage.toFixed(2)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Stack>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default SemesterPercentageCalculator;
