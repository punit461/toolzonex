'use client';

import { useMemo, useState } from 'react';
import { Box, Typography, Paper, Checkbox, FormControlLabel, Button, TextField, Stack, Chip, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddIcon from '@mui/icons-material/Add';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const CONTEXTS = ['Vehicle', 'Travel'] as const;
type Context = (typeof CONTEXTS)[number];

const ITEMS: Record<Context, string[]> = {
  Vehicle: ['Vehicle registration', 'Insurance card', "Driver's license", 'Inspection sticker / emissions certificate'],
  Travel: ['Passport', 'Visa', 'Boarding passes / tickets', 'Hotel confirmations', 'Travel insurance documents', "Driver's license / ID"],
};

const DocumentChecklistGeneratorContent = () => {
  const [context, setContext] = useState<Context>('Vehicle');
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [customItem, setCustomItem] = useState('');
  const [customItems, setCustomItems] = useState<Record<Context, string[]>>({ Vehicle: [], Travel: [] });

  const key = (ctx: Context, item: string) => `${ctx}::${item}`;

  const toggle = (ctx: Context, item: string) => {
    const k = key(ctx, item);
    setChecked((prev) => ({ ...prev, [k]: !prev[k] }));
  };

  const handleContextChange = (e: SelectChangeEvent) => setContext(e.target.value as Context);

  const addCustomItem = () => {
    const trimmed = customItem.trim();
    if (!trimmed) return;
    setCustomItems((prev) => ({ ...prev, [context]: [...prev[context], trimmed] }));
    setChecked((prev) => ({ ...prev, [key(context, trimmed)]: true }));
    setCustomItem('');
  };

  const allItems = useMemo(() => [...ITEMS[context], ...customItems[context]], [context, customItems]);

  const checklist = useMemo(() => allItems.filter((item) => checked[key(context, item)]), [allItems, checked, context]);

  const copyList = async () => {
    const lines = [`${context} Document Checklist:`, ...checklist.map((item) => `  - ${item}`)];
    try {
      await navigator.clipboard.writeText(lines.join('\n'));
    } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.4fr 1fr' }, gap: 4 }}>
      <Box>
        <FormControl size="small" sx={{ minWidth: 220, mb: 2 }}>
          <InputLabel>Context</InputLabel>
          <Select label="Context" value={context} onChange={handleContextChange}>
            {CONTEXTS.map((ctx) => (
              <MenuItem key={ctx} value={ctx}>{ctx}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>{context} Documents</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {ITEMS[context].map((item) => (
              <FormControlLabel
                key={item}
                control={<Checkbox size="small" checked={!!checked[key(context, item)]} onChange={() => toggle(context, item)} />}
                label={<Typography variant="body2">{item}</Typography>}
              />
            ))}
          </Box>
          {customItems[context].length > 0 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', mt: 1, borderTop: '1px solid', borderColor: 'divider', pt: 1 }}>
              {customItems[context].map((item) => (
                <FormControlLabel
                  key={item}
                  control={<Checkbox size="small" checked={!!checked[key(context, item)]} onChange={() => toggle(context, item)} />}
                  label={<Typography variant="body2">{item}</Typography>}
                />
              ))}
            </Box>
          )}
        </Paper>

        <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>Add Custom Item</Typography>
          <Stack direction="row" spacing={1}>
            <TextField
              size="small"
              fullWidth
              value={customItem}
              onChange={(e) => setCustomItem(e.target.value)}
              placeholder="e.g. Roadside assistance card"
              onKeyDown={(e) => { if (e.key === 'Enter') addCustomItem(); }}
            />
            <Button variant="contained" startIcon={<AddIcon />} onClick={addCustomItem}>Add</Button>
          </Stack>
        </Paper>
      </Box>

      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle1" fontWeight={600}>Your {context} Checklist</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyList} disabled={checklist.length === 0}>
            Copy
          </Button>
        </Stack>
        <Paper variant="outlined" sx={{ p: 2, minHeight: 250 }}>
          {checklist.length === 0 ? (
            <Typography variant="body2" color="text.secondary">Check items on the left to build your {context.toLowerCase()} document checklist.</Typography>
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

const DocumentChecklistGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Document Checklist Generator</Typography>
      <Typography variant="body1">
        Choose a context — Vehicle or Travel — and check off the documents you need for that situation. Vehicle
        covers registration, insurance, license, and inspection paperwork; Travel covers passports, visas,
        tickets, hotel confirmations, and travel insurance. Use the &quot;Add Custom Item&quot; field for
        anything specific to your trip or vehicle, and the panel on the right shows your final checklist ready
        to copy.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Switching to Travel and checking &quot;Passport&quot;, &quot;Boarding passes / tickets&quot;, and
        &quot;Hotel confirmations&quot; produces a checklist with exactly those three items, ready to review
        before heading to the airport.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Double-checking you have every vehicle document before a road trip or registration renewal.</li>
          <li>Making sure passports, visas, and travel insurance are packed before an international trip.</li>
          <li>Building a repeatable pre-trip or pre-drive document checklist you can copy each time.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Do Vehicle and Travel checklists share the same checked items?</strong> No — each context keeps its own checked state and custom items, so switching between Vehicle and Travel doesn&apos;t mix up your progress on either.</li>
          <li><strong>Can I add documents that aren&apos;t on the default list?</strong> Yes — use the &quot;Add Custom Item&quot; field, and it appears as a checkbox under the current context&apos;s document list.</li>
          <li><strong>Is my checklist saved anywhere?</strong> No — the checklist resets when you reload the page, since it&apos;s generated fresh in your browser each visit rather than stored anywhere.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/document-checklist-generator" content={content}>
      <DocumentChecklistGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default DocumentChecklistGenerator;
