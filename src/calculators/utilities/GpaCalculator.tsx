'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Button, IconButton, Stack, Select, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const GRADE_POINTS: Record<string, number> = {
  'A': 4.0,
  'A-': 3.7,
  'B+': 3.3,
  'B': 3.0,
  'B-': 2.7,
  'C+': 2.3,
  'C': 2.0,
  'C-': 1.7,
  'D+': 1.3,
  'D': 1.0,
  'D-': 0.7,
  'F': 0.0,
};

const GRADE_OPTIONS = Object.keys(GRADE_POINTS);

interface Course {
  id: string;
  credits: number;
  grade: string;
}

let nextId = 4;

const GpaCalculator = () => {
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', credits: 3, grade: 'A' },
    { id: '2', credits: 4, grade: 'B+' },
    { id: '3', credits: 3, grade: 'A-' },
  ]);

  const addCourse = () => {
    setCourses([...courses, { id: String(nextId++), credits: 3, grade: 'A' }]);
  };

  const removeCourse = (id: string) => {
    setCourses(courses.filter((c) => c.id !== id));
  };

  const updateCourse = (id: string, field: 'credits' | 'grade', value: string | number) => {
    setCourses(courses.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  const { totalCredits, gpa } = useMemo(() => {
    let creditSum = 0;
    let weightedSum = 0;
    for (const c of courses) {
      const credits = Number.isNaN(c.credits) ? 0 : c.credits;
      const points = GRADE_POINTS[c.grade] ?? 0;
      creditSum += credits;
      weightedSum += credits * points;
    }
    return { totalCredits: creditSum, gpa: creditSum > 0 ? weightedSum / creditSum : 0 };
  }, [courses]);

  const content = (
    <>
      <Typography variant="h2">How to Calculate GPA (4.0 Scale)</Typography>
      <Typography variant="body1">
        GPA (Grade Point Average) on the standard US 4.0 scale is the credit-weighted average of the grade
        points earned in each course, where letter grades map to point values from 4.0 (A) down to 0.0 (F).
        Courses with more credit hours count more heavily toward your overall GPA.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        GPA = Σ(Credit Hours × Grade Points) ÷ Σ(Credit Hours)
      </Box>
      <Typography variant="body1">
        Add every course you&apos;re calculating for with its credit hours and the letter grade received, using
        the standard scale: A = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, B- = 2.7, C+ = 2.3, C = 2.0, C- = 1.7,
        D+ = 1.3, D = 1.0, D- = 0.7, F = 0.0.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A student takes a 3-credit course with an A (4.0), a 4-credit course with a B+ (3.3), and a 3-credit
        course with an A- (3.7). GPA = (3×4.0 + 4×3.3 + 3×3.7) ÷ (3+4+3) = 35.3 ÷ 10 = 3.53.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Calculating your semester or cumulative GPA for a US high school or college transcript.</li>
          <li>Checking whether your GPA meets a scholarship, honor roll, or graduate school cutoff.</li>
          <li>Estimating how a specific grade in an upcoming course would move your overall GPA.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does this handle plus/minus grades like A- and B+?</Typography>
      <Typography variant="body1">
        Yes — the calculator uses the standard plus/minus 4.0 scale (A- = 3.7, B+ = 3.3, and so on) used by most
        US colleges and high schools. Some institutions round or omit plus/minus grades, so double-check your
        school&apos;s exact scale if it differs.
      </Typography>
      <Typography variant="h3">What about weighted GPA for AP or honors classes?</Typography>
      <Typography variant="body1">
        This calculator computes standard unweighted GPA. Weighted GPA adds extra points (commonly 0.5 or 1.0)
        for AP, IB, or honors courses — check your school&apos;s specific weighting policy and add those points
        to the grade before entering it if you need a weighted figure.
      </Typography>
      <Typography variant="h3">Do pass/fail or audited courses count toward GPA?</Typography>
      <Typography variant="body1">
        Typically no — pass/fail and audited courses are usually excluded from GPA calculations entirely at most
        institutions, so leave them out of this calculator unless your school explicitly includes them.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/gpa-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>Courses</Typography>

          <Stack spacing={2}>
            {courses.map((course, index) => (
              <Stack key={course.id} direction="row" spacing={1.5} alignItems="center">
                <Typography sx={{ minWidth: 64, color: 'text.secondary' }}>#{index + 1}</Typography>
                <TextField
                  label="Credit Hours"
                  type="number"
                  size="small"
                  fullWidth
                  onFocus={(e) => e.target.select()}
                  value={Number.isNaN(course.credits) ? '' : course.credits}
                  onChange={(e) => updateCourse(course.id, 'credits', e.target.value === '' ? NaN : Number(e.target.value))}
                />
                <Select
                  size="small"
                  value={course.grade}
                  onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                  sx={{ minWidth: 90 }}
                >
                  {GRADE_OPTIONS.map((g) => (
                    <MenuItem key={g} value={g}>{g}</MenuItem>
                  ))}
                </Select>
                <IconButton color="error" size="small" onClick={() => removeCourse(course.id)} disabled={courses.length <= 1}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Stack>
            ))}
          </Stack>

          <Button startIcon={<AddIcon />} onClick={addCourse} sx={{ mt: 2 }}>
            Add Course
          </Button>
        </Box>

        <Box>
          <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2, textAlign: 'center', height: '100%' }}>
            <Typography variant="h6" color="text.secondary">Your GPA</Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 4, color: 'primary.main' }}>
              {gpa.toFixed(2)} <span style={{ fontSize: '1.2rem', fontWeight: 500 }}>/ 4.0</span>
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">Total Courses</Typography>
                <Typography variant="h6">{courses.length}</Typography>
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

export default GpaCalculator;
