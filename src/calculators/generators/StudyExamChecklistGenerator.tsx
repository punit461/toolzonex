'use client';

import { useMemo, useState } from 'react';
import { Box, Typography, Paper, Checkbox, FormControlLabel, Button, TextField, Stack, IconButton, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const GENERAL_TASKS = [
  'Review class notes for every topic',
  'Complete practice problems / past exam questions',
  'Review past papers and mark scheme feedback',
  'Get adequate sleep the night before',
  'Prepare materials needed for exam day (ID, pens, calculator)',
  'Eat a proper meal before the exam',
  'Know the exam location and start time in advance',
];

let nextId = 1;

const StudyExamChecklistGeneratorContent = () => {
  const [subjects, setSubjects] = useState<{ id: number; name: string; reviewed: boolean }[]>([
    { id: nextId++, name: '', reviewed: false },
    { id: nextId++, name: '', reviewed: false },
  ]);
  const [generalChecked, setGeneralChecked] = useState<Record<string, boolean>>({});

  const addSubject = () => setSubjects((prev) => [...prev, { id: nextId++, name: '', reviewed: false }]);
  const removeSubject = (id: number) => setSubjects((prev) => prev.filter((s) => s.id !== id));
  const updateSubjectName = (id: number, name: string) => setSubjects((prev) => prev.map((s) => (s.id === id ? { ...s, name } : s)));
  const toggleSubjectReviewed = (id: number) => setSubjects((prev) => prev.map((s) => (s.id === id ? { ...s, reviewed: !s.reviewed } : s)));

  const toggleGeneral = (task: string) => setGeneralChecked((prev) => ({ ...prev, [task]: !prev[task] }));

  const validSubjects = useMemo(() => subjects.filter((s) => s.name.trim()), [subjects]);

  const copyChecklist = async () => {
    const lines: string[] = ['STUDY / EXAM CHECKLIST', '', 'Subjects / Topics:'];
    validSubjects.forEach((s) => lines.push(`  [${s.reviewed ? 'x' : ' '}] ${s.name}`));
    lines.push('', 'General Exam Prep:');
    GENERAL_TASKS.forEach((t) => lines.push(`  [${generalChecked[t] ? 'x' : ' '}] ${t}`));
    try { await navigator.clipboard.writeText(lines.join('\n')); } catch {}
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" fontWeight={600} mb={1}>Subjects / Topics to Cover</Typography>
          <Stack spacing={1}>
            {subjects.map((s) => (
              <Box key={s.id} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Checkbox checked={s.reviewed} onChange={() => toggleSubjectReviewed(s.id)} size="small" />
                <TextField
                  size="small"
                  fullWidth
                  value={s.name}
                  placeholder="e.g. Organic Chemistry - Ch. 4"
                  onChange={(e) => updateSubjectName(s.id, e.target.value)}
                  sx={{ textDecoration: s.reviewed ? 'line-through' : 'none' }}
                />
                <IconButton size="small" onClick={() => removeSubject(s.id)} disabled={subjects.length <= 1}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Stack>
          <Button startIcon={<AddIcon />} onClick={addSubject} sx={{ mt: 1 }}>Add Subject / Topic</Button>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" fontWeight={600} mb={1}>General Exam Prep</Typography>
          <Paper variant="outlined" sx={{ p: 2 }}>
            {GENERAL_TASKS.map((task) => (
              <FormControlLabel
                key={task}
                control={<Checkbox size="small" checked={!!generalChecked[task]} onChange={() => toggleGeneral(task)} />}
                label={<Typography variant="body2">{task}</Typography>}
                sx={{ display: 'flex' }}
              />
            ))}
          </Paper>
        </Grid>
      </Grid>

      <Stack direction="row" justifyContent="space-between" alignItems="center" mt={3} mb={1}>
        <Typography variant="subtitle1" fontWeight={600}>Checklist Summary</Typography>
        <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyChecklist}>Copy</Button>
      </Stack>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="body2">
          {validSubjects.filter((s) => s.reviewed).length} of {validSubjects.length} subjects reviewed &middot;{' '}
          {Object.values(generalChecked).filter(Boolean).length} of {GENERAL_TASKS.length} general tasks done
        </Typography>
      </Paper>
    </Box>
  );
};

const StudyExamChecklistGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Study/Exam Checklist Generator</Typography>
      <Typography variant="body1">
        Add every subject or topic you need to cover before your exam in the left column, checking each one off
        as you finish reviewing it. On the right, work through a general, pre-populated exam-prep checklist
        covering the practical side of exam readiness — reviewing notes, practicing past papers, sleeping well,
        and having your materials ready. This single tool combines subject-specific tracking with general exam
        prep, so you don&apos;t need two separate checklists.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Adding &quot;Organic Chemistry - Ch. 4&quot; and &quot;World History - WWI&quot; as subjects, checking
        one off as reviewed, while also ticking &quot;Get adequate sleep the night before&quot; and &quot;Prepare
        materials needed for exam day&quot; in the general list, gives a clear summary of how much subject
        content and general prep is still outstanding.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Tracking topic-by-topic revision progress in the run-up to a big exam.</li>
          <li>Making sure practical exam-day logistics aren&apos;t overlooked in favor of just studying content.</li>
          <li>Managing revision across multiple subjects for students juggling several exams at once.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why combine subject tracking and general prep in one tool?</strong> Exam readiness has two sides — knowing the material and being logistically prepared — so this tool covers both a Study Checklist and an Exam Revision Checklist in a single page rather than two near-identical ones.</li>
          <li><strong>Can I track as many subjects as I need?</strong> Yes — click Add Subject / Topic as many times as you like; there&apos;s no fixed limit on how many rows you can add.</li>
          <li><strong>Is my progress saved between visits?</strong> No — it resets on reload since everything is generated fresh in your browser, so copy your summary if you want to track progress across study sessions.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/study-exam-checklist-generator" content={content}>
      <StudyExamChecklistGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default StudyExamChecklistGenerator;
