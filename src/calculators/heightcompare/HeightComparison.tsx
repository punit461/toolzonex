'use client';

import { useMemo, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
  Tooltip,
  Popover,
  Chip,
  InputAdornment,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';
import SearchIcon from '@mui/icons-material/Search';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Unit = 'cm' | 'ft' | 'in';
type PresetCategory = 'people' | 'animals' | 'vehicles' | 'objects';

interface Preset {
  label: string;
  cm: number;
  category: PresetCategory;
}

const PRESETS: Preset[] = [
  // People
  { label: 'Newborn Baby (avg.)', cm: 50, category: 'people' },
  { label: 'Toddler, 2 yrs (avg.)', cm: 86, category: 'people' },
  { label: 'Child, 6 yrs (avg.)', cm: 116, category: 'people' },
  { label: 'Preteen, 10 yrs (avg.)', cm: 140, category: 'people' },
  { label: 'Teenager, 15 yrs (avg.)', cm: 165, category: 'people' },
  { label: 'Average Adult Female (US)', cm: 161.5, category: 'people' },
  { label: 'Average Adult Male (US)', cm: 175.3, category: 'people' },
  { label: 'Average Adult Female (World)', cm: 159.5, category: 'people' },
  { label: 'Average Adult Male (World)', cm: 171, category: 'people' },
  { label: 'Average Adult Male (Netherlands)', cm: 183.8, category: 'people' },
  { label: 'NBA Average Player', cm: 200, category: 'people' },
  { label: 'NFL Average Player', cm: 188, category: 'people' },

  // Animals
  { label: 'House Cat (avg.)', cm: 25, category: 'animals' },
  { label: 'Labrador Retriever (avg.)', cm: 57, category: 'animals' },
  { label: 'Adult Horse (at shoulder)', cm: 160, category: 'animals' },
  { label: 'Red Kangaroo (standing)', cm: 180, category: 'animals' },
  { label: 'Ostrich (avg.)', cm: 230, category: 'animals' },
  { label: 'Grizzly Bear (standing)', cm: 213, category: 'animals' },
  { label: 'Polar Bear (standing)', cm: 270, category: 'animals' },
  { label: 'Emperor Penguin (avg.)', cm: 115, category: 'animals' },
  { label: 'African Elephant (at shoulder)', cm: 320, category: 'animals' },
  { label: 'Giraffe (avg.)', cm: 500, category: 'animals' },

  // Vehicles
  { label: 'Sedan Car (height)', cm: 145, category: 'vehicles' },
  { label: 'SUV (height, avg.)', cm: 180, category: 'vehicles' },
  { label: 'Motorcycle (avg.)', cm: 120, category: 'vehicles' },
  { label: 'London Black Cab (height)', cm: 175, category: 'vehicles' },
  { label: 'School Bus (height)', cm: 320, category: 'vehicles' },
  { label: 'Semi-Truck Trailer (height)', cm: 410, category: 'vehicles' },
  { label: 'Double-Decker Bus (height)', cm: 439, category: 'vehicles' },

  // Objects & Landmarks
  { label: 'Standard Interior Door', cm: 203, category: 'objects' },
  { label: 'Refrigerator (avg.)', cm: 180, category: 'objects' },
  { label: 'Red Telephone Box', cm: 274, category: 'objects' },
  { label: 'Basketball Hoop (rim height)', cm: 305, category: 'objects' },
  { label: 'Traffic Light Pole (avg.)', cm: 300, category: 'objects' },
  { label: 'Statue of Liberty (with pedestal)', cm: 9300, category: 'objects' },
  { label: 'Great Pyramid of Giza', cm: 13800, category: 'objects' },
  { label: 'Eiffel Tower', cm: 33000, category: 'objects' },
];

const CATEGORY_LABELS: Record<'all' | PresetCategory, string> = {
  all: 'All',
  people: 'People',
  animals: 'Animals',
  vehicles: 'Vehicles',
  objects: 'Objects',
};

interface Person {
  id: number;
  label: string;
  cm: number;
  color: string;
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

const COLORS = ['#1a56db', '#e11d48', '#00b140', '#7c3aed', '#f97316', '#ec4899', '#0891b2', '#65a30d', '#ca8a04', '#64748b'];

const STAGE_HEIGHT = 260;
const TOP_PAD = 28;
const TICK_COUNT = 5;
const COLUMN_WIDTH = 104;
const LEFT_AXIS_WIDTH = 44;
const RIGHT_AXIS_WIDTH = 64;

let nextId = 3;

const HeightComparisonContent = () => {
  const [unit, setUnit] = useState<Unit>('cm');
  const [people, setPeople] = useState<Person[]>([
    { id: 1, label: 'Person A', cm: 175, color: COLORS[0] },
    { id: 2, label: 'Person B', cm: 160, color: COLORS[1] },
  ]);
  const [presetQuery, setPresetQuery] = useState('');
  const [presetCategory, setPresetCategory] = useState<'all' | PresetCategory>('all');
  const [colorAnchor, setColorAnchor] = useState<HTMLElement | null>(null);
  const [colorPersonId, setColorPersonId] = useState<number | null>(null);
  const [exporting, setExporting] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  const addPerson = () =>
    setPeople((prev) => [...prev, { id: nextId++, label: `Person ${String.fromCharCode(65 + prev.length)}`, cm: 170, color: COLORS[prev.length % COLORS.length] }]);
  const removePerson = (id: number) => setPeople((prev) => prev.filter((p) => p.id !== id));
  const updatePerson = (id: number, patch: Partial<Person>) => setPeople((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));

  const addPreset = (preset: Preset) =>
    setPeople((prev) => [...prev, { id: nextId++, label: preset.label, cm: preset.cm, color: COLORS[prev.length % COLORS.length] }]);

  const maxHeight = Math.max(...people.map((p) => p.cm), 1);
  const tickFractions = Array.from({ length: TICK_COUNT + 1 }, (_, i) => i / TICK_COUNT);

  const filteredPresets = useMemo(() => {
    const q = presetQuery.trim().toLowerCase();
    return PRESETS.filter((p) => (presetCategory === 'all' || p.category === presetCategory) && (q === '' || p.label.toLowerCase().includes(q)));
  }, [presetQuery, presetCategory]);

  const handleDownload = async () => {
    if (!chartRef.current) return;
    setExporting(true);
    try {
      const bg = getComputedStyle(chartRef.current).backgroundColor;
      const canvas = await html2canvas(chartRef.current, { backgroundColor: bg, scale: 2 });
      const link = document.createElement('a');
      link.download = 'height-comparison.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } finally {
      setExporting(false);
    }
  };

  const colorPickerPerson = people.find((p) => p.id === colorPersonId) ?? null;

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
        {people.map((p) => {
          const { feet, inches } = cmToFeetAndInches(p.cm);
          return (
            <Box key={p.id} sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center', flexWrap: 'wrap' }}>
              <Box
                component="button"
                type="button"
                onClick={(e) => {
                  setColorAnchor(e.currentTarget);
                  setColorPersonId(p.id);
                }}
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  bgcolor: p.color,
                  flexShrink: 0,
                  border: '1px solid rgba(0,0,0,0.15)',
                  cursor: 'pointer',
                  p: 0,
                }}
                aria-label={`Change color for ${p.label}`}
              />
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

      <Popover
        open={Boolean(colorAnchor)}
        anchorEl={colorAnchor}
        onClose={() => setColorAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box sx={{ p: 2, width: 200 }}>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>Choose a color</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1.5 }}>
            {COLORS.map((c) => (
              <Box
                key={c}
                component="button"
                type="button"
                onClick={() => {
                  if (colorPersonId !== null) updatePerson(colorPersonId, { color: c });
                  setColorAnchor(null);
                }}
                sx={{
                  width: 26,
                  height: 26,
                  borderRadius: '50%',
                  bgcolor: c,
                  border: colorPickerPerson?.color === c ? '2px solid' : '1px solid rgba(0,0,0,0.15)',
                  borderColor: colorPickerPerson?.color === c ? 'text.primary' : undefined,
                  cursor: 'pointer',
                  p: 0,
                }}
                aria-label={`Set color ${c}`}
              />
            ))}
          </Box>
          <TextField
            size="small"
            type="color"
            label="Custom"
            value={colorPickerPerson?.color ?? '#000000'}
            onChange={(e) => {
              if (colorPersonId !== null) updatePerson(colorPersonId, { color: e.target.value });
            }}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Box>
      </Popover>

      <Box sx={{ mb: 4 }}>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>Quick add a reference:</Typography>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1.5 }}>
          <TextField
            size="small"
            placeholder="Search presets…"
            value={presetQuery}
            onChange={(e) => setPresetQuery(e.target.value)}
            sx={{ minWidth: 200 }}
            InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }}
          />
          {(Object.keys(CATEGORY_LABELS) as ('all' | PresetCategory)[]).map((cat) => (
            <Chip
              key={cat}
              label={CATEGORY_LABELS[cat]}
              size="small"
              onClick={() => setPresetCategory(cat)}
              color={presetCategory === cat ? 'primary' : 'default'}
              variant={presetCategory === cat ? 'filled' : 'outlined'}
            />
          ))}
        </Box>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', maxHeight: 220, overflowY: 'auto', pr: 1 }}>
          {filteredPresets.length === 0 && (
            <Typography variant="caption" color="text.secondary">No presets match &quot;{presetQuery}&quot;.</Typography>
          )}
          {filteredPresets.map((preset) => (
            <Button key={preset.label} size="small" variant="text" onClick={() => addPreset(preset)}>
              + {preset.label}
            </Button>
          ))}
        </Box>
      </Box>

      <Box sx={{ mb: 1.5, display: 'flex', justifyContent: 'flex-end' }}>
        <Button size="small" variant="outlined" startIcon={<DownloadIcon />} onClick={handleDownload} disabled={exporting}>
          {exporting ? 'Preparing…' : 'Download PNG'}
        </Button>
      </Box>

      <Box ref={chartRef} sx={{ p: 3, bgcolor: 'action.hover', borderRadius: 2, overflowX: 'auto' }}>
        <Box sx={{ display: 'flex', minWidth: people.length * COLUMN_WIDTH + LEFT_AXIS_WIDTH + RIGHT_AXIS_WIDTH }}>
          {/* Left Y axis: cm */}
          <Box sx={{ width: LEFT_AXIS_WIDTH, flexShrink: 0, position: 'relative', height: STAGE_HEIGHT + TOP_PAD }}>
            <Typography variant="caption" sx={{ position: 'absolute', top: 0, left: 0, color: 'text.secondary', fontWeight: 600, fontSize: 11 }}>cm</Typography>
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
                {Math.round(maxHeight * f)}
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
              {people.map((p) => {
                const barHeight = Math.max((p.cm / maxHeight) * STAGE_HEIGHT, 4);
                return (
                  <Box key={p.id} sx={{ position: 'relative', width: 56, flexShrink: 0, display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="caption" noWrap sx={{ position: 'absolute', bottom: barHeight + 4, fontWeight: 600 }}>
                      {formatHeight(p.cm, unit)}
                    </Typography>
                    <Box sx={{ width: 44, height: barHeight, bgcolor: p.color, borderRadius: '6px 6px 0 0' }} />
                  </Box>
                );
              })}
            </Box>
          </Box>

          {/* Right Y axis: ft/in */}
          <Box sx={{ width: RIGHT_AXIS_WIDTH, flexShrink: 0, position: 'relative', height: STAGE_HEIGHT + TOP_PAD }}>
            <Typography variant="caption" sx={{ position: 'absolute', top: 0, right: 0, color: 'text.secondary', fontWeight: 600, fontSize: 11 }}>ft</Typography>
            {tickFractions.map((f) => (
              <Typography
                key={f}
                variant="caption"
                sx={{
                  position: 'absolute',
                  left: 8,
                  bottom: `${f * STAGE_HEIGHT - 7}px`,
                  color: 'text.secondary',
                  fontSize: 11,
                  whiteSpace: 'nowrap',
                }}
              >
                {formatFeetInches(maxHeight * f)}
              </Typography>
            ))}
          </Box>
        </Box>

        {/* X axis labels */}
        <Box sx={{ display: 'flex', minWidth: people.length * COLUMN_WIDTH + LEFT_AXIS_WIDTH + RIGHT_AXIS_WIDTH }}>
          <Box sx={{ width: LEFT_AXIS_WIDTH, flexShrink: 0 }} />
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
          <Box sx={{ width: RIGHT_AXIS_WIDTH, flexShrink: 0 }} />
        </Box>
      </Box>
    </Box>
  );
};

const HeightComparison = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Height Comparison Tool</Typography>
      <Typography variant="body1">
        This tool is built to be quick to pick up: no sign-up, no complicated settings, just add
        entries and read the chart. Here&apos;s the whole workflow in three steps.
      </Typography>
      <Typography variant="h3" sx={{ mt: 2 }}>Step 1: Add your people or reference objects</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Click <strong>Add Person</strong> to create a blank entry, then fill in a label and a height.</li>
          <li>Or skip typing altogether: search or browse the <strong>People / Animals / Vehicles / Objects</strong> preset library below the entry list and click any result to drop it straight onto the chart.</li>
          <li>There&apos;s no cap on how many entries you can compare at once -- line up as many people, animals, vehicles, or landmarks as you want.</li>
        </ul>
      </Box>
      <Typography variant="h3" sx={{ mt: 2 }}>Step 2: Enter measurements in whichever unit you think in</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Switch the toggle at the top between <strong>cm</strong>, <strong>ft + in</strong>, and <strong>in</strong> -- each mode gives you the matching input fields, so ft + in mode means typing feet and inches separately rather than converting in your head.</li>
          <li>Click the color dot next to any entry to recolor it from the swatch palette, or pick a custom color.</li>
          <li>Rename, edit, or delete any entry at any time -- the chart updates instantly.</li>
        </ul>
      </Box>
      <Typography variant="h3" sx={{ mt: 2 }}>Step 3: Compare and save</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>The chart shows a shared <strong>cm axis on the left and a ft/in axis on the right</strong> at the same time, so you can read either unit without switching modes.</li>
          <li>Bars are scaled proportionally to each other, so the visual gap matches the real-world difference.</li>
          <li>Use <strong>Download PNG</strong> to save the chart as an image you can drop into a doc, chat, or slideshow.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Compare your own height (say, 5&apos;9&quot;) against the average adult male and female, or against a
        reference object like a double-decker bus, to get a visual sense of scale. Or go further: add a
        giraffe, a house cat, and the Eiffel Tower to the same chart -- the tool handles anything from a
        few centimeters to hundreds of meters without breaking the scale.
      </Typography>

      <Typography variant="h2">Key Features</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Dual-axis chart:</strong> cm and ft/in are both shown on the chart at once, so you never have to mentally convert.</li>
          <li><strong>Three input modes:</strong> cm, feet + inches, or inches-only -- each one gives you real fields for that unit instead of converting through inches under the hood.</li>
          <li><strong>Custom colors:</strong> pick any entry&apos;s color from a palette or set a custom hex value.</li>
          <li><strong>Searchable preset library:</strong> dozens of curated reference heights across People, Animals, Vehicles, and Objects &amp; Landmarks, filterable by category or free-text search.</li>
          <li><strong>Unlimited entries:</strong> compare two people or twenty -- there&apos;s no fixed limit.</li>
          <li><strong>Download as PNG:</strong> export the finished chart as an image to share or save.</li>
          <li><strong>No sign-up, works in your browser:</strong> nothing you enter is sent anywhere or saved to an account -- it lives in the page until you close it.</li>
          <li><strong>Free, mobile and desktop friendly:</strong> works on phones, tablets, and desktops with no app install.</li>
        </ul>
      </Box>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Comparing heights:</strong> friends, family, or a wedding party lineup -- gather everyone&apos;s height and see it laid out side by side.</li>
          <li><strong>Home and furniture planning:</strong> check a couch, fridge, or door frame's height against the space you're moving it into.</li>
          <li><strong>Character design and storytelling:</strong> visualize height differences between fictional characters, creatures, or a cast of characters relative to an average adult.</li>
          <li><strong>Sports curiosity:</strong> see how your own height stacks up against an NBA or NFL average player.</li>
          <li><strong>Education:</strong> classroom or homework visuals for child growth stages, animal sizes, or unit conversion between cm, feet, and inches.</li>
          <li><strong>Everyday scale checks:</strong> settle a debate about how tall a giraffe, a double-decker bus, or a telephone box really is next to a person.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Can I add more than two people?</strong> Yes, add as many as you like with the Add Person button -- there&apos;s no limit on entries.</li>
          <li><strong>Where do the preset reference heights come from?</strong> They&apos;re commonly cited average/reference figures, included for quick comparisons -- not exact measurements of any specific individual.</li>
          <li><strong>Can I see centimeters and feet/inches at the same time?</strong> Yes -- the chart always shows both a cm axis and a ft/in axis together, regardless of which unit you&apos;re typing values in.</li>
          <li><strong>Can I customize the color of each entry?</strong> Yes, click the color dot next to any entry to choose from the palette or set a custom color.</li>
          <li><strong>Can I save or share my comparison?</strong> Yes, use the Download PNG button to export the chart as an image you can save or share anywhere.</li>
          <li><strong>Do I need to create an account?</strong> No. The tool is free and works entirely in your browser -- nothing is saved or uploaded unless you choose to download the PNG.</li>
          <li><strong>Is there a limit to how tall or short something can be?</strong> No hard limit -- the chart scales to whatever you add, from a house cat to a skyscraper.</li>
          <li><strong>Does it work on mobile?</strong> Yes, the tool is fully responsive and works on phones, tablets, and desktops.</li>
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
