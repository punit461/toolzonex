'use client';

import { useState } from 'react';
import { Box, Typography, TextField, Button, IconButton, ToggleButtonGroup, ToggleButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Unit = 'cm' | 'ft' | 'in';

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

function cmToFeetAndInches(cm: number): { feet: number; inches: number } {
  const totalInches = cm / 2.54;
  let feet = Math.floor(totalInches / 12);
  let inches = Math.round(totalInches - feet * 12);
  if (inches === 12) {
    inches = 0;
    feet += 1;
  }
  return { feet, inches };
}

function feetInchesToCm(feet: number, inches: number): number {
  return (feet * 12 + inches) * 2.54;
}

function formatFeetInches(cm: number): string {
  const { feet, inches } = cmToFeetAndInches(cm);
  return `${feet}'${inches}"`;
}

function formatHeight(cm: number, unit: Unit): string {
  if (unit === 'cm') return `${cm.toFixed(0)} cm`;
  if (unit === 'in') return `${Math.round(cm / 2.54)} in`;
  return formatFeetInches(cm);
}

const COLORS = ['#1a56db', '#e11d48', '#00b140', '#7c3aed', '#f97316', '#ec4899'];

const STAGE_HEIGHT = 260;
const TOP_PAD = 28;
const TICK_COUNT = 5;
const COLUMN_WIDTH = 104;

let nextId = 3;

const HeightComparisonContent = () => {
  const [unit, setUnit] = useState<Unit>('cm');
  const [people, setPeople] = useState<Person[]>([
    { id: 1, label: 'Person A', cm: 175 },
    { id: 2, label: 'Person B', cm: 160 },
  ]);

  const addPerson = () => setPeople((prev) => [...prev, { id: nextId++, label: `Person ${String.fromCharCode(65 + prev.length)}`, cm: 170 }]);
  const removePerson = (id: number) => setPeople((prev) => prev.filter((p) => p.id !== id));
  const updatePerson = (id: number, patch: Partial<Person>) => setPeople((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));

  const addPreset = (preset: (typeof PRESETS)[number]) => setPeople((prev) => [...prev, { id: nextId++, label: preset.label, cm: preset.cm }]);

  const maxHeight = Math.max(...people.map((p) => p.cm), 1);
  const tickFractions = Array.from({ length: TICK_COUNT + 1 }, (_, i) => i / TICK_COUNT);

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <ToggleButtonGroup value={unit} exclusive onChange={(_, v) => v && setUnit(v)} size="small">
          <ToggleButton value="cm">cm</ToggleButton>
          <ToggleButton value="ft">ft + in</ToggleButton>
          <ToggleButton value="in">in</ToggleButton>
        </ToggleButtonGroup>
        <Button startIcon={<AddIcon />} onClick={addPerson} variant="outlined" size="small">Add Person</Button>
      </Box>

      <Box sx={{ mb: 4 }}>
        {people.map((p, i) => {
          const { feet, inches } = cmToFeetAndInches(p.cm);
          return (
            <Box key={p.id} sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center', flexWrap: 'wrap' }}>
              <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: COLORS[i % COLORS.length], flexShrink: 0 }} />
              <TextField size="small" label="Label" value={p.label} onChange={(e) => updatePerson(p.id, { label: e.target.value })} sx={{ flex: 1, minWidth: 120 }} />

              {unit === 'cm' && (
                <TextField
                  size="small"
                  type="number"
                  label="Height (cm)"
                  value={p.cm}
                  onFocus={(e) => e.target.select()}
                  onChange={(e) => updatePerson(p.id, { cm: e.target.value === '' ? 0 : Number(e.target.value) })}
                  sx={{ width: 140 }}
                />
              )}

              {unit === 'ft' && (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    size="small"
                    type="number"
                    label="ft"
                    value={feet}
                    onFocus={(e) => e.target.select()}
                    onChange={(e) => {
                      const f = e.target.value === '' ? 0 : Number(e.target.value);
                      updatePerson(p.id, { cm: feetInchesToCm(f, inches) });
                    }}
                    sx={{ width: 70 }}
                  />
                  <TextField
                    size="small"
                    type="number"
                    label="in"
                    value={inches}
                    onFocus={(e) => e.target.select()}
                    onChange={(e) => {
                      const inch = e.target.value === '' ? 0 : Number(e.target.value);
                      updatePerson(p.id, { cm: feetInchesToCm(feet, inch) });
                    }}
                    sx={{ width: 70 }}
                  />
                </Box>
              )}

              {unit === 'in' && (
                <TextField
                  size="small"
                  type="number"
                  label="Height (in)"
                  value={Math.round(p.cm / 2.54)}
                  onFocus={(e) => e.target.select()}
                  onChange={(e) => {
                    const v = e.target.value === '' ? 0 : Number(e.target.value);
                    updatePerson(p.id, { cm: v * 2.54 });
                  }}
                  sx={{ width: 140 }}
                />
              )}

              <IconButton onClick={() => removePerson(p.id)} disabled={people.length <= 1}><DeleteIcon fontSize="small" /></IconButton>
            </Box>
          );
        })}
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
        <Box sx={{ display: 'flex', minWidth: people.length * COLUMN_WIDTH + 48 }}>
          {/* Y axis */}
          <Box sx={{ width: 48, flexShrink: 0, position: 'relative', height: STAGE_HEIGHT + TOP_PAD }}>
            {tickFractions.map((f) => (
              <Typography
                key={f}
                variant="caption"
                sx={{
                  position: 'absolute',
                  right: 8,
                  bottom: `${f * STAGE_HEIGHT - 7}px`,
                  color: 'text.secondary',
                  fontSize: 11,
                  whiteSpace: 'nowrap',
                }}
              >
                {formatHeight(maxHeight * f, unit).replace(' cm', '').replace(' in', '')}
              </Typography>
            ))}
          </Box>

          {/* Chart area: gridlines + bars */}
          <Box sx={{ position: 'relative', flex: 1, height: STAGE_HEIGHT + TOP_PAD }}>
            {tickFractions.map((f) => (
              <Box
                key={f}
                sx={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: `${f * STAGE_HEIGHT}px`,
                  borderTop: '1px solid',
                  borderColor: 'divider',
                }}
              />
            ))}
            <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 3 }}>
              {people.map((p, i) => {
                const barHeight = Math.max((p.cm / maxHeight) * STAGE_HEIGHT, 4);
                const color = COLORS[i % COLORS.length];
                return (
                  <Box key={p.id} sx={{ position: 'relative', width: 56, flexShrink: 0, display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="caption" noWrap sx={{ position: 'absolute', bottom: barHeight + 4, fontWeight: 600 }}>
                      {formatHeight(p.cm, unit)}
                    </Typography>
                    <Box sx={{ width: 44, height: barHeight, bgcolor: color, borderRadius: '6px 6px 0 0' }} />
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>

        {/* X axis labels */}
        <Box sx={{ display: 'flex', minWidth: people.length * COLUMN_WIDTH + 48 }}>
          <Box sx={{ width: 48, flexShrink: 0 }} />
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', gap: 3 }}>
            {people.map((p) => (
              <Tooltip key={p.id} title={p.label}>
                <Typography
                  variant="caption"
                  sx={{
                    width: 56,
                    mt: 1,
                    textAlign: 'center',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    minHeight: '2.6em',
                    lineHeight: 1.3,
                    wordBreak: 'break-word',
                  }}
                >
                  {p.label}
                </Typography>
              </Tooltip>
            ))}
          </Box>
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
