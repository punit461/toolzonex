'use client';

import { useMemo, useState } from 'react';
import { Box, Typography, Paper, Checkbox, FormControlLabel, Button, Stack, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const CATEGORIES = ['Gaming Setup', 'Streaming Setup'] as const;
type Category = (typeof CATEGORIES)[number];

const ITEMS: Record<Category, string[]> = {
  'Gaming Setup': ['Monitor/TV with low input lag', 'Controller / keyboard & mouse', 'Gaming headset', 'Comfortable chair', 'Good lighting'],
  'Streaming Setup': ['Webcam', 'External microphone', 'Ring light / key lighting', 'Capture card (if console streaming)', 'Streaming software configured', 'Stable internet connection tested'],
};

const GamingStreamingSetupChecklistContent = () => {
  const [category, setCategory] = useState<Category>('Gaming Setup');
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const key = (cat: Category, item: string) => `${cat}::${item}`;

  const toggle = (item: string) => {
    const k = key(category, item);
    setChecked((prev) => ({ ...prev, [k]: !prev[k] }));
  };

  const handleCategoryChange = (e: SelectChangeEvent) => setCategory(e.target.value as Category);

  const checklist = useMemo(() => ITEMS[category].filter((item) => checked[key(category, item)]), [category, checked]);

  const copyList = async () => {
    const lines = [`${category} Checklist:`, ...checklist.map((item) => `  - ${item}`)];
    try {
      await navigator.clipboard.writeText(lines.join('\n'));
    } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.4fr 1fr' }, gap: 4 }}>
      <Box>
        <FormControl size="small" sx={{ minWidth: 220, mb: 2 }}>
          <InputLabel>Category</InputLabel>
          <Select label="Category" value={category} onChange={handleCategoryChange}>
            {CATEGORIES.map((cat) => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>{category}</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {ITEMS[category].map((item) => (
              <FormControlLabel
                key={item}
                control={<Checkbox size="small" checked={!!checked[key(category, item)]} onChange={() => toggle(item)} />}
                label={<Typography variant="body2">{item}</Typography>}
              />
            ))}
          </Box>
        </Paper>
      </Box>

      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle1" fontWeight={600}>Your {category} Checklist</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyList} disabled={checklist.length === 0}>
            Copy
          </Button>
        </Stack>
        <Paper variant="outlined" sx={{ p: 2, minHeight: 250 }}>
          {checklist.length === 0 ? (
            <Typography variant="body2" color="text.secondary">Check items on the left to build your {category.toLowerCase()} checklist.</Typography>
          ) : (
            <ul style={{ marginTop: 0 }}>
              {checklist.map((item) => <li key={item}>{item}</li>)}
            </ul>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

const GamingStreamingSetupChecklist = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Gaming & Streaming Setup Checklist</Typography>
      <Typography variant="body1">
        Choose Gaming Setup or Streaming Setup from the category dropdown, then check off each item as you get
        it in place. Gaming Setup covers the essentials for a comfortable, responsive gaming station; Streaming
        Setup covers the audio, video, and connection basics for going live. The panel on the right shows your
        finished checklist, ready to copy.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Under Streaming Setup, checking &quot;Webcam&quot;, &quot;External microphone&quot;, and &quot;Stable
        internet connection tested&quot; produces a three-item checklist covering the core basics before your
        first stream.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Setting up a new gaming station and making sure input lag, comfort, and audio are covered.</li>
          <li>Preparing a streaming setup with the right camera, mic, and lighting before going live.</li>
          <li>Double-checking a console or PC streaming rig, including a capture card if needed.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Do Gaming Setup and Streaming Setup share checked items?</strong> No — each category keeps its own checked state, so switching between them doesn&apos;t affect your progress on the other.</li>
          <li><strong>Do I need a capture card for every streaming setup?</strong> No — a capture card is only needed if you&apos;re streaming footage from a console or a second PC; streaming directly from the same PC you&apos;re recording with doesn&apos;t require one.</li>
          <li><strong>Is my checklist saved anywhere?</strong> No — the checklist resets when you reload the page, since it&apos;s generated fresh in your browser each visit rather than stored anywhere.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/gaming-streaming-setup-checklist" content={content}>
      <GamingStreamingSetupChecklistContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default GamingStreamingSetupChecklist;
