'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Button, IconButton, Stack, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface Category {
  id: string;
  name: string;
  grade: number;
  weight: number;
}

let nextId = 4;

const WeightedGradeCalculator = () => {
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Homework', grade: 90, weight: 30 },
    { id: '2', name: 'Midterm', grade: 80, weight: 30 },
    { id: '3', name: 'Final Exam', grade: 70, weight: 40 },
  ]);

  const addCategory = () => setCategories([...categories, { id: String(nextId++), name: '', grade: 0, weight: 0 }]);
  const removeCategory = (id: string) => setCategories(categories.filter((c) => c.id !== id));
  const updateCategory = (id: string, field: 'name' | 'grade' | 'weight', val: string | number) => {
    setCategories(categories.map((c) => (c.id === id ? { ...c, [field]: val } : c)));
  };

  const { overallGrade, totalWeight } = useMemo(() => {
    let weightSum = 0;
    let weightedSum = 0;
    for (const c of categories) {
      const grade = Number.isNaN(c.grade) ? 0 : c.grade;
      const weight = Number.isNaN(c.weight) ? 0 : c.weight;
      weightSum += weight;
      weightedSum += grade * weight;
    }
    return { overallGrade: weightSum > 0 ? weightedSum / weightSum : 0, totalWeight: weightSum };
  }, [categories]);

  const content = (
    <>
      <Typography variant="h2">How to Calculate Your Overall Weighted Grade</Typography>
      <Typography variant="body1">
        Add each grading category from your syllabus — homework, quizzes, midterms, a final exam, and so on —
        along with your grade in that category and the weight it carries toward your overall course grade. This
        calculates your current overall grade as a weighted average of everything entered so far.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Overall Grade = Σ(Category Grade × Category Weight) ÷ Σ(Category Weight)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Homework at 90% (weight 30), a midterm at 80% (weight 30), and a final exam at 70% (weight 40) combine
        to an overall grade of (90×30 + 80×30 + 70×40) ÷ (30+30+40) = 7,900 ÷ 100 = 79%.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Calculating your current overall course grade from the category weights in your syllabus.</li>
          <li>Checking your standing partway through a semester before all grades are in.</li>
          <li>Verifying an instructor-reported grade matches your own category-by-category math.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is this different from a &quot;final grade calculator&quot;?</Typography>
      <Typography variant="body1">
        This tool computes your current overall grade from category grades and weights you already have. It
        doesn&apos;t solve for a future required score — for that (figuring out what you need on an upcoming
        final to hit a target grade), use our dedicated Final Grade Calculator instead.
      </Typography>
      <Typography variant="h3">What if my weights don&apos;t add up to 100%?</Typography>
      <Typography variant="body1">
        The formula divides by the total weight you&apos;ve entered, so it still produces a correct proportional
        average even if your weights sum to less than 100% (for categories not yet graded) or don&apos;t exactly
        total 100 — though it&apos;s clearest to interpret when your entered weights represent the full course.
      </Typography>
      <Typography variant="h3">Can I include a category with 0% weight?</Typography>
      <Typography variant="body1">
        Yes — it stays in your list but contributes nothing to the overall average, since multiplying by a
        weight of zero zeroes out that category&apos;s effect on the result.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/weighted-grade-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>Grading Categories</Typography>
          <Stack spacing={2}>
            {categories.map((c, index) => (
              <Stack key={c.id} direction="row" spacing={1.5} alignItems="center">
                <Typography sx={{ minWidth: 24, color: 'text.secondary' }}>#{index + 1}</Typography>
                <TextField
                  label="Category" size="small" fullWidth
                  value={c.name}
                  onChange={(e) => updateCategory(c.id, 'name', e.target.value)}
                />
                <TextField
                  label="Grade %" type="number" size="small" fullWidth
                  onFocus={(e) => e.target.select()}
                  value={Number.isNaN(c.grade) ? '' : c.grade}
                  onChange={(e) => updateCategory(c.id, 'grade', e.target.value === '' ? NaN : Number(e.target.value))}
                />
                <TextField
                  label="Weight %" type="number" size="small" fullWidth
                  onFocus={(e) => e.target.select()}
                  value={Number.isNaN(c.weight) ? '' : c.weight}
                  onChange={(e) => updateCategory(c.id, 'weight', e.target.value === '' ? NaN : Number(e.target.value))}
                />
                <IconButton color="error" size="small" onClick={() => removeCategory(c.id)} disabled={categories.length <= 1}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Stack>
            ))}
          </Stack>
          <Button startIcon={<AddIcon />} onClick={addCategory} sx={{ mt: 2 }}>Add Category</Button>
        </Box>

        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', height: 'fit-content' }}>
          <Typography variant="body2" color="text.secondary">Overall Grade</Typography>
          <Typography variant="h3" color="primary" fontWeight={800}>{overallGrade.toFixed(2)}%</Typography>
          <Typography variant="caption" color="text.secondary">Total weight entered: {totalWeight}%</Typography>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default WeightedGradeCalculator;
