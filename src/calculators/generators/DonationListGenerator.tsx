'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, IconButton, Button, InputAdornment } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface Donation {
  id: number;
  description: string;
  value: string;
  category: string;
  date: string;
  organization: string;
}

let nextId = 1;

const DEFAULT_DONATIONS: Donation[] = [
  { id: nextId++, description: "Men's winter coat", value: '25', category: 'Clothing', date: '', organization: 'Goodwill' },
];

const DonationListGeneratorContent = () => {
  const [donations, setDonations] = useState<Donation[]>(DEFAULT_DONATIONS);

  const addDonation = () => setDonations((prev) => [...prev, { id: nextId++, description: '', value: '', category: '', date: '', organization: '' }]);
  const removeDonation = (id: number) => setDonations((prev) => prev.filter((d) => d.id !== id));
  const updateDonation = (id: number, patch: Partial<Donation>) =>
    setDonations((prev) => prev.map((d) => (d.id === id ? { ...d, ...patch } : d)));

  const validDonations = useMemo(() => donations.filter((d) => d.description.trim()), [donations]);

  const total = useMemo(
    () => validDonations.reduce((sum, d) => sum + (parseFloat(d.value) || 0), 0),
    [validDonations]
  );

  const copyList = async () => {
    const lines = validDonations.map((d) => {
      const value = parseFloat(d.value) || 0;
      const parts = [d.description.trim()];
      if (d.category.trim()) parts.push(`[${d.category.trim()}]`);
      parts.push(`$${value.toFixed(2)}`);
      if (d.date.trim()) parts.push(`— ${d.date.trim()}`);
      if (d.organization.trim()) parts.push(`— donated to ${d.organization.trim()}`);
      return `- ${parts.join(' ')}`;
    });
    lines.push('', `Total Estimated Value: $${total.toFixed(2)}`);
    try {
      await navigator.clipboard.writeText(lines.join('\n'));
    } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.4fr 1fr' }, gap: 4 }}>
      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Donated Items</Typography>
        <Stack spacing={2}>
          {donations.map((d) => (
            <Paper key={d.id} variant="outlined" sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
                <TextField size="small" fullWidth label="Item description" value={d.description} onChange={(e) => updateDonation(d.id, { description: e.target.value })} />
                <IconButton onClick={() => removeDonation(d.id)} disabled={donations.length <= 1} size="small">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
              <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                <TextField
                  size="small"
                  fullWidth
                  label="Estimated value"
                  value={d.value}
                  onChange={(e) => updateDonation(d.id, { value: e.target.value })}
                  InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                />
                <TextField size="small" fullWidth label="Category" value={d.category} onChange={(e) => updateDonation(d.id, { category: e.target.value })} placeholder="e.g. Clothing, Furniture" />
              </Stack>
              <Stack direction="row" spacing={1}>
                <TextField size="small" fullWidth type="date" label="Date donated" InputLabelProps={{ shrink: true }} value={d.date} onChange={(e) => updateDonation(d.id, { date: e.target.value })} />
                <TextField size="small" fullWidth label="Organization" value={d.organization} onChange={(e) => updateDonation(d.id, { organization: e.target.value })} />
              </Stack>
            </Paper>
          ))}
        </Stack>
        <Button startIcon={<AddIcon />} onClick={addDonation} sx={{ mt: 2 }}>
          Add Donated Item
        </Button>
      </Box>

      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle1" fontWeight={600}>Donation List</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyList} disabled={validDonations.length === 0}>
            Copy
          </Button>
        </Stack>
        <Paper variant="outlined" sx={{ p: 2, minHeight: 250 }}>
          {validDonations.length === 0 && (
            <Typography variant="body2" color="text.secondary">Add a donated item to build your list.</Typography>
          )}
          <ul style={{ marginTop: 0, paddingLeft: 20 }}>
            {validDonations.map((d) => {
              const value = parseFloat(d.value) || 0;
              return (
                <li key={d.id} style={{ marginBottom: 6 }}>
                  {d.description}
                  {d.category.trim() ? ` [${d.category.trim()}]` : ''} — ${value.toFixed(2)}
                  {d.date.trim() ? ` — ${d.date.trim()}` : ''}
                  {d.organization.trim() ? ` — donated to ${d.organization.trim()}` : ''}
                </li>
              );
            })}
          </ul>
          {validDonations.length > 0 && (
            <Typography variant="subtitle2" fontWeight={700} sx={{ mt: 1 }}>
              Total Estimated Value: ${total.toFixed(2)}
            </Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

const DonationListGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Donation List Generator</Typography>
      <Typography variant="body1">
        Add each item you&apos;ve donated along with its estimated value, a category, the date donated, and
        the organization you gave it to. The panel on the right builds an organized list with a running
        total estimated value that updates automatically as you add or edit items — handy for keeping your
        own personal record of charitable giving over the year.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Adding a men&apos;s winter coat valued at $25 donated to Goodwill, followed by a box of books valued
        at $15 donated to the same organization, produces a list showing both items with a running Total
        Estimated Value of $40.00.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Keeping a personal record of items donated to charity throughout the year.</li>
          <li>Tracking estimated values of clothing, furniture, and household items given away.</li>
          <li>Organizing donation history by organization ahead of tax season.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Can I use this list for official tax deduction documentation?</strong> This tool is meant for personal record-keeping only — consult a tax professional for the official documentation and valuation requirements needed to claim a charitable deduction.</li>
          <li><strong>How is the total estimated value calculated?</strong> It&apos;s simply the sum of the estimated value you enter for every item in your list, updated automatically as you add, edit, or remove items.</li>
          <li><strong>Is my donation list saved anywhere?</strong> No — everything is kept only in your browser for the current session and resets on reload, so copy the list before closing the tab if you want to keep it.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/donation-list-generator" content={content}>
      <DonationListGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default DonationListGenerator;
