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

const SgpaCalculator = () => {
  const [scale, setScale] = useState<number>(10);
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: '1', credits: 4, gradePoint: 8 },
    { id: '2', credits: 3, gradePoint: 9 },
    { id: '3', credits: 4, gradePoint: 7 },
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

  const { totalCredits, sgpa } = useMemo(() => {
    let creditSum = 0;
    let weightedSum = 0;
    for (const s of subjects) {
      const c = Number.isNaN(s.credits) ? 0 : s.credits;
      const g = Number.isNaN(s.gradePoint) ? 0 : s.gradePoint;
      creditSum += c;
      weightedSum += c * g;
    }
    return { totalCredits: creditSum, sgpa: creditSum > 0 ? weightedSum / creditSum : 0 };
  }, [subjects]);

  const content = (
    <>
      <Typography variant="h2">How to Calculate SGPA</Typography>
      <Typography variant="body1">
        SGPA (Semester Grade Point Average) measures your academic performance for a single semester. It is the
        credit-weighted average of the grade points you scored in each subject taken that semester — a subject
        worth more credit hours pulls your SGPA more than a lighter subject.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        SGPA = Σ(Credits × Grade Point) ÷ Σ(Credits)
      </Box>
      <Typography variant="body1">
        Enter each subject from the current semester with its credit hours and the grade point earned. Add rows
        for every subject and remove any entered by mistake with the trash icon — your SGPA updates instantly.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        In one semester, a student scores 8 grade points in a 4-credit subject, 9 in a 3-credit subject, and 7 in
        another 4-credit subject. SGPA = (4×8 + 3×9 + 4×7) ÷ (4+3+4) = 87 ÷ 11 = 7.91 out of 10.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking your performance for the semester right after results are declared.</li>
          <li>Estimating a semester&apos;s SGPA before results come out, using expected grades.</li>
          <li>Working out how each semester&apos;s SGPA feeds into your overall CGPA.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is SGPA the same as CGPA?</Typography>
      <Typography variant="body1">
        No — SGPA covers only one semester&apos;s subjects, while CGPA is the cumulative, credit-weighted average
        across all semesters completed so far. Use the CGPA Calculator once you have SGPA figures for multiple
        semesters.
      </Typography>
      <Typography variant="h3">Does a low SGPA in one semester ruin my CGPA?</Typography>
      <Typography variant="body1">
        It lowers your CGPA proportionally to that semester&apos;s total credits relative to your overall
        credits, but it doesn&apos;t solely determine it — strong SGPAs in other semesters, especially
        higher-credit ones, can offset a single weak semester over time.
      </Typography>
      <Typography variant="h3">Why is my SGPA weighted by credits instead of a simple average?</Typography>
      <Typography variant="body1">
        Credit hours reflect how much coursework and classroom time a subject represents, so a 4-credit subject
        is meant to count more toward your overall performance than a 1-credit subject — a simple, unweighted
        average would treat them as equally important.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/sgpa-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">This Semester&apos;s Subjects</Typography>
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
            <Typography variant="h6" color="text.secondary">Your SGPA</Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 4, color: 'primary.main' }}>
              {sgpa.toFixed(2)} <span style={{ fontSize: '1.2rem', fontWeight: 500 }}>/ {scale}</span>
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

export default SgpaCalculator;
