'use client';

import { useMemo, useState } from 'react';
import { Box, Typography, Paper, Stack, TextField, IconButton, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PrintIcon from '@mui/icons-material/Print';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Section = 'Morning' | 'Afternoon' | 'Evening';
const SECTIONS: Section[] = ['Morning', 'Afternoon', 'Evening'];

let nextId = 1;
const makeItem = (text = '') => ({ id: nextId++, text });

const DEFAULTS: Record<Section, { id: number; text: string }[]> = {
  Morning: [makeItem('Wake up & make bed'), makeItem('Stretch or exercise'), makeItem('Eat breakfast')],
  Afternoon: [makeItem('Lunch break'), makeItem('Focused work block')],
  Evening: [makeItem('Prepare dinner'), makeItem('Wind down / read'), makeItem('Set out clothes for tomorrow')],
};

const DailyRoutineGeneratorContent = () => {
  const [routine, setRoutine] = useState(DEFAULTS);

  const addItem = (section: Section) =>
    setRoutine((prev) => ({ ...prev, [section]: [...prev[section], makeItem()] }));

  const removeItem = (section: Section, id: number) =>
    setRoutine((prev) => ({ ...prev, [section]: prev[section].filter((i) => i.id !== id) }));

  const updateItem = (section: Section, id: number, text: string) =>
    setRoutine((prev) => ({ ...prev, [section]: prev[section].map((i) => (i.id === id ? { ...i, text } : i)) }));

  const plainText = useMemo(() => {
    const lines: string[] = ['MY DAILY ROUTINE', ''];
    SECTIONS.forEach((section) => {
      lines.push(section.toUpperCase());
      const items = routine[section].filter((i) => i.text.trim());
      if (items.length === 0) {
        lines.push('  (nothing planned)');
      } else {
        items.forEach((i) => lines.push(`  - ${i.text}`));
      }
      lines.push('');
    });
    return lines.join('\n');
  }, [routine]);

  const copyText = async () => {
    try { await navigator.clipboard.writeText(plainText); } catch {}
  };

  const printRoutine = () => window.print();

  return (
    <Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2, mb: 3 }}>
        {SECTIONS.map((section) => (
          <Paper key={section} variant="outlined" sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} mb={1}>{section}</Typography>
            <Stack spacing={1}>
              {routine[section].map((item) => (
                <Box key={item.id} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <TextField
                    size="small"
                    fullWidth
                    value={item.text}
                    placeholder="Routine item"
                    onChange={(e) => updateItem(section, item.id, e.target.value)}
                  />
                  <IconButton size="small" onClick={() => removeItem(section, item.id)} disabled={routine[section].length <= 1}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Stack>
            <Button size="small" startIcon={<AddIcon />} onClick={() => addItem(section)} sx={{ mt: 1 }}>
              Add Item
            </Button>
          </Paper>
        ))}
      </Box>

      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography variant="subtitle1" fontWeight={600}>Printable Preview</Typography>
        <Stack direction="row" spacing={1}>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyText}>Copy</Button>
          <Button size="small" startIcon={<PrintIcon />} onClick={printRoutine}>Print</Button>
        </Stack>
      </Stack>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography component="pre" sx={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '0.85rem', m: 0 }}>
          {plainText}
        </Typography>
      </Paper>
    </Box>
  );
};

const DailyRoutineGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Daily Routine Generator</Typography>
      <Typography variant="body1">
        Fill in your own routine items under Morning, Afternoon, and Evening — add as many rows as you need in
        each section, and remove any you don&apos;t. This single template covers a full day in one place,
        rather than needing separate morning-only or evening-only routine builders. As you type, the printable
        preview below builds itself into a clean, plain-text daily routine you can copy or print and follow.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Adding &quot;Wake up & make bed&quot; and &quot;Eat breakfast&quot; under Morning, &quot;Focused work
        block&quot; under Afternoon, and &quot;Wind down / read&quot; under Evening produces a three-section
        daily routine listing each item under its correct time of day in the preview.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Building a personal daily structure to improve consistency and habits.</li>
          <li>Planning a family or kids&apos; daily schedule split by time of day.</li>
          <li>Printing a routine card to keep on the fridge or at a desk.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why is this one tool instead of separate morning and evening routine builders?</strong> Structuring Morning, Afternoon, and Evening into a single page lets you see and plan your whole day at once, rather than jumping between three separate near-identical tools.</li>
          <li><strong>Is my routine saved between visits?</strong> No — it&apos;s generated fresh in your browser each time and resets on reload, so copy or print it if you want to keep a lasting copy.</li>
          <li><strong>Can I have more than three items in a section?</strong> Yes — click Add Item as many times as you like in any section; there&apos;s no fixed limit on how many routine items each time of day can hold.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/daily-routine-generator" content={content}>
      <DailyRoutineGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default DailyRoutineGenerator;
