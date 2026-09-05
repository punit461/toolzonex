'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, IconButton, Button, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent, ToggleButtonGroup, ToggleButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const CATEGORIES = ['Staff', 'Customer', 'Supplier', 'Vendor'] as const;
type Category = (typeof CATEGORIES)[number];

interface DirectoryEntry {
  id: number;
  category: Category;
  name: string;
  company: string;
  role: string;
  phone: string;
  email: string;
}

let nextId = 1;

const DEFAULT_ENTRIES: DirectoryEntry[] = [
  { id: nextId++, category: 'Staff', name: 'Alex Johnson', company: 'Acme Corp', role: 'Office Manager', phone: '555-0101', email: 'alex@acme.com' },
  { id: nextId++, category: 'Supplier', name: 'Priya Patel', company: 'Northwind Supplies', role: 'Account Rep', phone: '555-0102', email: 'priya@northwind.com' },
];

const BusinessDirectoryGeneratorContent = () => {
  const [entries, setEntries] = useState<DirectoryEntry[]>(DEFAULT_ENTRIES);
  const [newCategory, setNewCategory] = useState<Category>('Staff');
  const [filter, setFilter] = useState<Category | 'All'>('All');

  const addEntry = () => setEntries((prev) => [...prev, { id: nextId++, category: newCategory, name: '', company: '', role: '', phone: '', email: '' }]);
  const removeEntry = (id: number) => setEntries((prev) => prev.filter((e) => e.id !== id));
  const updateEntry = (id: number, patch: Partial<DirectoryEntry>) =>
    setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e)));

  const validEntries = useMemo(() => entries.filter((e) => e.name.trim()), [entries]);

  const grouped = useMemo(() => {
    const groups: Record<string, DirectoryEntry[]> = {};
    CATEGORIES.forEach((cat) => {
      if (filter !== 'All' && filter !== cat) return;
      const picked = validEntries.filter((e) => e.category === cat);
      if (picked.length > 0) groups[cat] = picked;
    });
    return groups;
  }, [validEntries, filter]);

  const copyDirectory = async () => {
    const lines: string[] = [];
    Object.entries(grouped).forEach(([cat, es]) => {
      lines.push(`${cat}:`);
      es.forEach((e) => {
        const parts = [e.name.trim()];
        if (e.company.trim()) parts.push(`(${e.company.trim()})`);
        if (e.role.trim()) parts.push(`— ${e.role.trim()}`);
        if (e.phone.trim()) parts.push(`— ${e.phone.trim()}`);
        if (e.email.trim()) parts.push(`— ${e.email.trim()}`);
        lines.push(`  - ${parts.join(' ')}`);
      });
    });
    try {
      await navigator.clipboard.writeText(lines.join('\n'));
    } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.4fr 1fr' }, gap: 4 }}>
      <Box>
        <Stack direction="row" spacing={1} alignItems="center" mb={2}>
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>New entry category</InputLabel>
            <Select label="New entry category" value={newCategory} onChange={(e: SelectChangeEvent) => setNewCategory(e.target.value as Category)}>
              {CATEGORIES.map((cat) => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
            </Select>
          </FormControl>
          <Button startIcon={<AddIcon />} onClick={addEntry}>
            Add Entry
          </Button>
        </Stack>

        <Typography variant="subtitle1" fontWeight={600} mb={2}>Directory Entries</Typography>
        <Stack spacing={2}>
          {entries.map((e) => (
            <Paper key={e.id} variant="outlined" sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                <FormControl size="small" sx={{ minWidth: 130 }}>
                  <InputLabel>Category</InputLabel>
                  <Select label="Category" value={e.category} onChange={(ev: SelectChangeEvent) => updateEntry(e.id, { category: ev.target.value as Category })}>
                    {CATEGORIES.map((cat) => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
                  </Select>
                </FormControl>
                <TextField size="small" label="Name" value={e.name} onChange={(ev) => updateEntry(e.id, { name: ev.target.value })} sx={{ flex: 1, minWidth: 130 }} />
                <IconButton onClick={() => removeEntry(e.id)} disabled={entries.length <= 1} size="small">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
              <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                <TextField size="small" fullWidth label="Company" value={e.company} onChange={(ev) => updateEntry(e.id, { company: ev.target.value })} />
                <TextField size="small" fullWidth label="Role / title" value={e.role} onChange={(ev) => updateEntry(e.id, { role: ev.target.value })} />
              </Stack>
              <Stack direction="row" spacing={1}>
                <TextField size="small" fullWidth label="Phone" value={e.phone} onChange={(ev) => updateEntry(e.id, { phone: ev.target.value })} />
                <TextField size="small" fullWidth label="Email" value={e.email} onChange={(ev) => updateEntry(e.id, { email: ev.target.value })} />
              </Stack>
            </Paper>
          ))}
        </Stack>
      </Box>

      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1} flexWrap="wrap" gap={1}>
          <Typography variant="subtitle1" fontWeight={600}>Business Directory</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyDirectory} disabled={validEntries.length === 0}>
            Copy
          </Button>
        </Stack>
        <ToggleButtonGroup size="small" value={filter} exclusive onChange={(_, v) => v && setFilter(v)} sx={{ mb: 2, flexWrap: 'wrap' }}>
          <ToggleButton value="All">All</ToggleButton>
          {CATEGORIES.map((cat) => <ToggleButton key={cat} value={cat}>{cat}</ToggleButton>)}
        </ToggleButtonGroup>
        <Paper variant="outlined" sx={{ p: 2, minHeight: 250 }}>
          {Object.keys(grouped).length === 0 && (
            <Typography variant="body2" color="text.secondary">Add an entry to build your directory.</Typography>
          )}
          {Object.entries(grouped).map(([cat, es]) => (
            <Box key={cat} sx={{ mb: 2 }}>
              <Typography variant="subtitle2" fontWeight={700}>{cat}</Typography>
              <ul style={{ marginTop: 4 }}>
                {es.map((e) => (
                  <li key={e.id}>
                    {e.name}
                    {e.company.trim() ? ` (${e.company.trim()})` : ''}
                    {e.role.trim() ? ` — ${e.role.trim()}` : ''}
                    {e.phone.trim() ? ` — ${e.phone.trim()}` : ''}
                    {e.email.trim() ? ` — ${e.email.trim()}` : ''}
                  </li>
                ))}
              </ul>
            </Box>
          ))}
        </Paper>
      </Box>
    </Box>
  );
};

const BusinessDirectoryGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Business Directory Generator</Typography>
      <Typography variant="body1">
        Pick a category — Staff, Customer, Supplier, or Vendor — for each new entry, then add their name,
        company, role or title, phone, and email. Use the filter toggle to view your directory as a single
        combined list or filtered down to just one category. The panel on the right groups your directory
        by category automatically, ready to copy for a shared team reference document.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Adding Alex Johnson as Staff at Acme Corp and Priya Patel as a Supplier at Northwind Supplies
        produces a directory with a Staff section listing Alex and a separate Supplier section listing
        Priya, each with their company, role, phone, and email.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Building a staff contact directory for internal team reference.</li>
          <li>Organizing supplier and vendor contacts for a small business.</li>
          <li>Keeping a categorized customer contact list separate from internal staff and vendor contacts.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Contact List Formatter?</strong> The Contact List Formatter is for a personal contact list of name, phone, email, and address. This tool is for business relationship directories with company, role, and category fields — a different use case suited to staff, customer, supplier, and vendor relationships.</li>
          <li><strong>Can I filter the directory to show only one category?</strong> Yes — use the filter toggle above the directory panel to show All entries or just Staff, Customer, Supplier, or Vendor entries.</li>
          <li><strong>Is my directory saved anywhere?</strong> No — everything is kept only in your browser for the current session and resets on reload, so copy the directory before closing the tab if you want to keep it.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/business-directory-generator" content={content}>
      <BusinessDirectoryGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BusinessDirectoryGenerator;
