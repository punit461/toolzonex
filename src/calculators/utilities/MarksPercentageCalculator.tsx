'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Button, IconButton, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface Subject {
  id: string;
  obtained: number;
  max: number;
}

let nextId = 4;

function gradeBand(pct: number): string {
  if (pct >= 90) return 'A+';
  if (pct >= 80) return 'A';
  if (pct >= 70) return 'B+';
  if (pct >= 60) return 'B';
  if (pct >= 50) return 'C';
  if (pct >= 40) return 'D';
  return 'F';
}

const MarksPercentageCalculator = () => {
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: '1', obtained: 85, max: 100 },
    { id: '2', obtained: 72, max: 100 },
    { id: '3', obtained: 91, max: 100 },
  ]);

  const addSubject = () => {
    setSubjects([...subjects, { id: String(nextId++), obtained: 0, max: 100 }]);
  };

  const removeSubject = (id: string) => {
    setSubjects(subjects.filter((s) => s.id !== id));
  };

  const updateSubject = (id: string, field: 'obtained' | 'max', value: number) => {
    setSubjects(subjects.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const { totalObtained, totalMax, percentage } = useMemo(() => {
    let obtSum = 0;
    let maxSum = 0;
    for (const s of subjects) {
      obtSum += Number.isNaN(s.obtained) ? 0 : s.obtained;
      maxSum += Number.isNaN(s.max) ? 0 : s.max;
    }
    return { totalObtained: obtSum, totalMax: maxSum, percentage: maxSum > 0 ? (obtSum / maxSum) * 100 : 0 };
  }, [subjects]);

  const content = (
    <>
      <Typography variant="h2">How to Calculate Marks Percentage</Typography>
      <Typography variant="body1">
        To find your overall percentage across one or more subjects, add up the marks you obtained in every
        subject and divide by the total maximum marks possible, then multiply by 100. This works whether
        you&apos;re calculating a single test&apos;s percentage or a combined percentage across an entire report
        card.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Percentage = (Total Marks Obtained ÷ Total Maximum Marks) × 100
      </Box>
      <Typography variant="body1">
        Add a row for every subject with the marks you scored and the maximum marks for that subject, then read
        off your combined percentage and approximate grade band below.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A student scores 85/100 in one subject, 72/100 in another, and 91/100 in a third. Total obtained is 248
        out of a total maximum of 300, giving a percentage of (248 ÷ 300) × 100 = 82.67%.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Working out your overall report-card percentage across multiple subjects with different maximum marks.</li>
          <li>Checking a single test or exam score as a percentage.</li>
          <li>Estimating your grade band before official results are released.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is this the same as averaging each subject&apos;s percentage?</Typography>
      <Typography variant="body1">
        Only if every subject has the same maximum marks. When subjects have different maximum marks (e.g. one
        out of 100 and another out of 50), this calculator correctly weights by total marks rather than simply
        averaging each subject&apos;s individual percentage, which would distort the result.
      </Typography>
      <Typography variant="h3">What grading scale does the grade band use?</Typography>
      <Typography variant="body1">
        The grade band shown (A+ down to F) uses a common general-purpose scale: 90%+ is A+, 80-89% is A, 70-79%
        is B+, 60-69% is B, 50-59% is C, 40-49% is D, and below 40% is F. Your school or exam board may use a
        different scale, so treat this as a general reference rather than an official grade.
      </Typography>
      <Typography variant="h3">Can I use this for a single subject only?</Typography>
      <Typography variant="body1">
        Yes — remove the extra rows so only one remains, enter the marks obtained and maximum marks for that one
        subject, and the calculator will show that subject&apos;s individual percentage.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/marks-percentage-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>Subjects</Typography>

          <Stack spacing={2}>
            {subjects.map((subject, index) => (
              <Stack key={subject.id} direction="row" spacing={1.5} alignItems="center">
                <Typography sx={{ minWidth: 72, color: 'text.secondary' }}>Sub {index + 1}</Typography>
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
          </Stack>

          <Button startIcon={<AddIcon />} onClick={addSubject} sx={{ mt: 2 }}>
            Add Subject
          </Button>
        </Box>

        <Box>
          <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2, textAlign: 'center', height: '100%' }}>
            <Typography variant="h6" color="text.secondary">Overall Percentage</Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, color: 'primary.main' }}>
              {percentage.toFixed(2)}%
            </Typography>
            <Typography variant="subtitle2" sx={{ mb: 3 }}>Grade: {gradeBand(percentage)}</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">Total Obtained</Typography>
                <Typography variant="h6">{totalObtained}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Total Max Marks</Typography>
                <Typography variant="h6">{totalMax}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default MarksPercentageCalculator;
