'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const SCALE: { min: number; grade: string }[] = [
  { min: 97, grade: 'A+' },
  { min: 93, grade: 'A' },
  { min: 90, grade: 'A-' },
  { min: 87, grade: 'B+' },
  { min: 83, grade: 'B' },
  { min: 80, grade: 'B-' },
  { min: 77, grade: 'C+' },
  { min: 73, grade: 'C' },
  { min: 70, grade: 'C-' },
  { min: 67, grade: 'D+' },
  { min: 63, grade: 'D' },
  { min: 60, grade: 'D-' },
  { min: -Infinity, grade: 'F' },
];

function scoreToGrade(pct: number): string {
  for (const row of SCALE) {
    if (pct >= row.min) return row.grade;
  }
  return 'F';
}

const SchoolGradeCalculator = () => {
  const [score, setScore] = useState('88');

  const grade = useMemo(() => {
    const pct = parseFloat(score);
    if (Number.isNaN(pct)) return null;
    return scoreToGrade(pct);
  }, [score]);

  const content = (
    <>
      <Typography variant="h2">How the Percentage-to-Letter Grade Lookup Works</Typography>
      <Typography variant="body1">
        Enter a percentage score, and this calculator looks up the corresponding letter grade using a standard
        US grading scale. This is a simple lookup tool — if you instead want to know what score you need on an
        upcoming exam to reach a target overall grade, see our{' '}
        <a href="/utilities/final-grade-calculator">Final Grade Calculator</a>, which solves that algebra
        problem for you.
      </Typography>

      <Typography variant="h2">Standard Grading Scale</Typography>
      <TableContainer component={Paper} variant="outlined" sx={{ my: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: 'action.hover' }}>
              <TableCell>Percentage</TableCell>
              <TableCell>Letter Grade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow><TableCell>97-100%</TableCell><TableCell>A+</TableCell></TableRow>
            <TableRow><TableCell>93-96%</TableCell><TableCell>A</TableCell></TableRow>
            <TableRow><TableCell>90-92%</TableCell><TableCell>A-</TableCell></TableRow>
            <TableRow><TableCell>87-89%</TableCell><TableCell>B+</TableCell></TableRow>
            <TableRow><TableCell>83-86%</TableCell><TableCell>B</TableCell></TableRow>
            <TableRow><TableCell>80-82%</TableCell><TableCell>B-</TableCell></TableRow>
            <TableRow><TableCell>77-79%</TableCell><TableCell>C+</TableCell></TableRow>
            <TableRow><TableCell>73-76%</TableCell><TableCell>C</TableCell></TableRow>
            <TableRow><TableCell>70-72%</TableCell><TableCell>C-</TableCell></TableRow>
            <TableRow><TableCell>67-69%</TableCell><TableCell>D+</TableCell></TableRow>
            <TableRow><TableCell>63-66%</TableCell><TableCell>D</TableCell></TableRow>
            <TableRow><TableCell>60-62%</TableCell><TableCell>D-</TableCell></TableRow>
            <TableRow><TableCell>Below 60%</TableCell><TableCell>F</TableCell></TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A score of 88% falls in the 87-89% range, which corresponds to a B+. A score of 91% falls in the
        90-92% range, corresponding to an A-.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Quickly converting a graded assignment or test percentage into a letter grade.</li>
          <li>Checking how a specific score translates on a standard scale.</li>
          <li>Understanding the typical boundaries between adjacent letter grades.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does every school use this exact scale?</Typography>
      <Typography variant="body1">
        No — this reflects a commonly used standard US grading scale, but individual schools, districts,
        universities, and countries often use their own variations (some don&apos;t use +/- grades at all,
        some shift the cutoffs by a few points). Always check your specific school or instructor&apos;s
        syllabus for the scale that actually applies to you.
      </Typography>
      <Typography variant="h3">How is this different from the Final Grade Calculator?</Typography>
      <Typography variant="body1">
        This tool is a straightforward lookup — you already have a percentage and just want the matching letter
        grade. The Final Grade Calculator works backward, solving algebraically for the score you&apos;d need
        on a remaining assignment or exam to hit a target overall grade.
      </Typography>
      <Typography variant="h3">Do other countries use letter grades the same way?</Typography>
      <Typography variant="body1">
        No — many countries use entirely different scales, such as numeric grades out of 10 or 20, GPA-only
        systems, or pass/fail marks. This tool follows the common US-style A-F letter grade convention.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/school-grade-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, alignItems: 'center' }}>
        <TextField
          label="Percentage Score"
          type="number"
          fullWidth
          value={score}
          onChange={(e) => setScore(e.target.value)}
          onFocus={(e) => e.target.select()}
          slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
        />
        <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="body2">Letter Grade</Typography>
          <Typography variant="h2" fontWeight="bold">{grade ?? '—'}</Typography>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default SchoolGradeCalculator;
