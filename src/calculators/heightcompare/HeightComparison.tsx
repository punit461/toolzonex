'use client';

import { useState } from 'react';
import { Box, Typography, TextField, Button, IconButton, ToggleButtonGroup, ToggleButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const PRESETS = [
  { label: 'Average Adult Male (US)', cm: 175.3 },
  { label: 'Average Adult Female (US)', cm: 161.5 },
  { label: 'NBA Average Player', cm: 200 },
  { label: 'Double-Decker Bus (height)', cm: 439 },
  { label: 'Giraffe (avg.)', cm: 500 },
  { label: 'Red Telephone Box', cm: 274 },
];

interface Person {
  id: number;
  label: string;
  cm: number;
}

function cmToFeetInches(cm: number): string {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return `${feet}'${inches}"`;
}

const COLORS = ['#1a56db', '#e11d48', '#00b140', '#7c3aed', '#f97316', '#ec4899'];

let nextId = 3;

const HeightComparisonContent = () => {
  const [unit, setUnit] = useState<'cm' | 'ft'>('cm');
  const [people, setPeople] = useState<Person[]>([
    { id: 1, label: 'Person A', cm: 175 },
    { id: 2, label: 'Person B', cm: 160 },
  ]);

  const addPerson = () => setPeople((prev) => [...prev, { id: nextId++, label: `Person ${String.fromCharCode(65 + prev.length)}`, cm: 170 }]);
  const removePerson = (id: number) => setPeople((prev) => prev.filter((p) => p.id !== id));
  const updatePerson = (id: number, patch: Partial<Person>) => setPeople((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));

  const addPreset = (preset: (typeof PRESETS)[number]) => setPeople((prev) => [...prev, { id: nextId++, label: preset.label, cm: preset.cm }]);

  const maxHeight = Math.max(...people.map((p) => p.cm), 1);

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <ToggleButtonGroup value={unit} exclusive onChange={(_, v) => v && setUnit(v)} size="small">
          <ToggleButton value="cm">cm</ToggleButton>
          <ToggleButton value="ft">ft / in</ToggleButton>
        </ToggleButtonGroup>
        <Button startIcon={<AddIcon />} onClick={addPerson} variant="outlined" size="small">Add Person</Button>
      </Box>

      <Box sx={{ mb: 4 }}>
        {people.map((p, i) => (
          <Box key={p.id} sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
            <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: COLORS[i % COLORS.length], flexShrink: 0 }} />
            <TextField size="small" label="Label" value={p.label} onChange={(e) => updatePerson(p.id, { label: e.target.value })} sx={{ flex: 1, minWidth: 120 }} />
            <TextField
              size="small"
              type="number"
              label={unit === 'cm' ? 'Height (cm)' : 'Height (inches)'}
              value={unit === 'cm' ? p.cm : Math.round(p.cm / 2.54)}
              onFocus={(e) => e.target.select()}
              onChange={(e) => {
                const v = e.target.value === '' ? 0 : Number(e.target.value);
                updatePerson(p.id, { cm: unit === 'cm' ? v : v * 2.54 });
              }}
              sx={{ width: 140 }}
            />
            <IconButton onClick={() => removePerson(p.id)} disabled={people.length <= 1}><DeleteIcon fontSize="small" /></IconButton>
          </Box>
        ))}
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>Quick add a reference:</Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {PRESETS.map((preset) => (
            <Button key={preset.label} size="small" variant="text" onClick={() => addPreset(preset)}>
              + {preset.label}
            </Button>
          ))}
        </Box>
      </Box>

      <Box sx={{ p: 3, bgcolor: 'action.hover', borderRadius: 2, overflowX: 'auto' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 3, minHeight: 320, justifyContent: 'center', minWidth: people.length * 90 }}>
          {people.map((p, i) => {
            const barHeight = (p.cm / maxHeight) * 280;
            return (
              <Box key={p.id} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 70 }}>
                <Typography variant="caption" sx={{ mb: 0.5, fontWeight: 600 }}>
                  {unit === 'cm' ? `${p.cm.toFixed(0)} cm` : cmToFeetInches(p.cm)}
                </Typography>
                <Box
                  sx={{
                    width: 44,
                    height: Math.max(barHeight, 4),
                    bgcolor: COLORS[i % COLORS.length],
                    borderRadius: '8px 8px 0 0',
                  }}
                />
                <Typography variant="caption" sx={{ mt: 1, textAlign: 'center', wordBreak: 'break-word' }}>{p.label}</Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

const HeightComparison = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Height Comparison Tool</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Enter a label and height for each person (or thing) you want to compare.</li>
          <li>Add more entries with <strong>Add Person</strong>, or quick-add a reference height like an average adult or a double-decker bus.</li>
          <li>The bars below scale proportionally, so you can see the height difference at a glance.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Compare your own height (say, 5&apos;9&quot;) against the average adult male and female, or against a
        reference object like a double-decker bus, to get a visual sense of scale.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Comparing your height to friends, family, or public figures.</li>
          <li>Visualizing height differences for character design or storytelling.</li>
          <li>Understanding scale relative to everyday objects.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Can I add more than two people?</strong> Yes, add as many as you like with the Add Person button.</li>
          <li><strong>Where do the preset reference heights come from?</strong> They&apos;re commonly cited average/reference figures, included for quick comparisons -- not exact measurements of any specific individual.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell
      title="Height Comparison Tool"
      description="Compare heights side by side with proportional scaled bars. Free online height comparison tool."
      url="/tools/height-comparison"
      content={content}
      category="Tools"
    >
      <HeightComparisonContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default HeightComparison;
