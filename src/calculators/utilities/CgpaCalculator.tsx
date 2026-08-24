'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Button, IconButton, Stack, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface Subject {
  id: string;
  credits: number;
  gradePoint: number;
}

let nextId = 4;

const CgpaCalculator = () => {
  const [scale, setScale] = useState<number>(10);
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: '1', credits: 4, gradePoint: 8 },
    { id: '2', credits: 3, gradePoint: 7.5 },
    { id: '3', credits: 4, gradePoint: 9 },
  ]);

  const addSubject = () => {
    setSubjects([...subjects, { id: String(nextId++), credits: 0, gradePoint: 0 }]);
  };

  const removeSubject = (id: string) => {
    setSubjects(subjects.filter((s) => s.id !== id));
  };

  const updateSubject = (id: string, field: 'credits' | 'gradePoint', value: number) => {
    setSubjects(subjects.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const { totalCredits, cgpa } = useMemo(() => {
    let creditSum = 0;
    let weightedSum = 0;
    for (const s of subjects) {
      const c = Number.isNaN(s.credits) ? 0 : s.credits;
      const g = Number.isNaN(s.gradePoint) ? 0 : s.gradePoint;
      creditSum += c;
      weightedSum += c * g;
    }
    return { totalCredits: creditSum, cgpa: creditSum > 0 ? weightedSum / creditSum : 0 };
  }, [subjects]);

  const content = (
    <>
      <Typography variant="h2">How to Calculate CGPA</Typography>
      <Typography variant="body1">
        CGPA (Cumulative Grade Point Average) is the credit-weighted average of the grade points you&apos;ve
        earned across all subjects and semesters completed so far. Unlike a simple average, each subject&apos;s
        grade point is weighted by its credit hours, so a 4-credit subject affects your CGPA more than a
        1-credit subject.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        CGPA = Σ(Credits × Grade Point) ÷ Σ(Credits)
      </Box>
      <Typography variant="body1">
        Add every subject you&apos;ve taken so far with its credit hours and the grade point you scored (on your
        institution&apos;s scale — usually out of 10 or out of 4). Use the &quot;Add Subject&quot; button for
        more rows, and the trash icon to remove one entered by mistake.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A student scores 8 grade points in a 4-credit subject, 7.5 in a 3-credit subject, and 9 in another
        4-credit subject. The CGPA is (4×8 + 3×7.5 + 4×9) ÷ (4+3+4) = 85.5 ÷ 11 = 7.77 out of 10.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Tracking your cumulative academic performance across multiple semesters.</li>
          <li>Estimating your final CGPA before it&apos;s officially published.</li>
          <li>Converting a 10-point CGPA to a rough percentage for job or higher-education applications.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What&apos;s the difference between CGPA and SGPA?</Typography>
      <Typography variant="body1">
        SGPA (Semester Grade Point Average) covers only the subjects in a single semester, while CGPA is the
        cumulative, credit-weighted average across all semesters completed so far. Once you have every
        semester&apos;s SGPA, CGPA is the credit-weighted average of those semesters.
      </Typography>
      <Typography variant="h3">How do I convert CGPA to a percentage?</Typography>
      <Typography variant="body1">
        Most Indian universities on a 10-point scale use the approximation Percentage = CGPA × 9.5, though the
        exact multiplier varies by institution — check your university&apos;s official conversion formula before
        relying on it for anything official.
      </Typography>
      <Typography variant="h3">Can I use this if my institution uses a 4-point scale?</Typography>
      <Typography variant="body1">
        Yes — just enter each subject&apos;s grade point on your institution&apos;s actual scale (e.g. out of 4
        instead of out of 10) and select the matching scale above; the weighted-average formula works the same
        regardless of the maximum scale.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/cgpa-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Subjects</Typography>
            <FormControl size="small" sx={{ minWidth: 130 }}>
              <InputLabel>Scale</InputLabel>
              <Select value={scale} label="Scale" onChange={(e) => setScale(Number(e.target.value))}>
                <MenuItem value={10}>Out of 10</MenuItem>
                <MenuItem value={4}>Out of 4</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Stack spacing={2}>
            {subjects.map((subject, index) => (
              <Stack key={subject.id} direction="row" spacing={1.5} alignItems="center">
                <Typography sx={{ minWidth: 72, color: 'text.secondary' }}>Sub {index + 1}</Typography>
                <TextField
                  label="Credits"
                  type="number"
                  size="small"
                  fullWidth
                  onFocus={(e) => e.target.select()}
                  value={Number.isNaN(subject.credits) ? '' : subject.credits}
                  onChange={(e) => updateSubject(subject.id, 'credits', e.target.value === '' ? NaN : Number(e.target.value))}
                />
                <TextField
                  label={`Grade Point (/${scale})`}
                  type="number"
                  size="small"
                  fullWidth
                  onFocus={(e) => e.target.select()}
                  value={Number.isNaN(subject.gradePoint) ? '' : subject.gradePoint}
                  onChange={(e) => updateSubject(subject.id, 'gradePoint', e.target.value === '' ? NaN : Number(e.target.value))}
                />
                <IconButton color="error" size="small" onClick={() => removeSubject(subject.id)} disabled={subjects.length <= 1}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Stack>
            ))}
          </Stack>

          <Button startIcon={<AddIcon />} onClick={addSubject} sx={{ mt: 2 }}>
            Add Subject
          </Button>
        </Box>

        <Box>
          <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2, textAlign: 'center', height: '100%' }}>
            <Typography variant="h6" color="text.secondary">Your CGPA</Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 4, color: 'primary.main' }}>
              {cgpa.toFixed(2)} <span style={{ fontSize: '1.2rem', fontWeight: 500 }}>/ {scale}</span>
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">Total Subjects</Typography>
                <Typography variant="h6">{subjects.length}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Total Credits</Typography>
                <Typography variant="h6">{totalCredits}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CgpaCalculator;
