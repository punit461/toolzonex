'use client';

import { useMemo, useState } from 'react';
import { Box, Typography, Paper, TextField, Stack, Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
}

let nextId = 1;
const makeContact = (): Contact => ({ id: nextId++, name: '', phone: '', email: '', address: '' });

const ContactListFormatterContent = () => {
  const [contacts, setContacts] = useState<Contact[]>([makeContact(), makeContact()]);

  const addContact = () => setContacts((prev) => [...prev, makeContact()]);
  const removeContact = (id: number) => setContacts((prev) => prev.filter((c) => c.id !== id));
  const updateContact = (id: number, patch: Partial<Contact>) =>
    setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));

  const formatted = useMemo(() => {
    const blocks: string[] = [];
    contacts.forEach((c) => {
      const lines: string[] = [];
      if (c.name.trim()) lines.push(c.name.trim());
      if (c.phone.trim()) lines.push(`Phone: ${c.phone.trim()}`);
      if (c.email.trim()) lines.push(`Email: ${c.email.trim()}`);
      if (c.address.trim()) lines.push(`Address: ${c.address.trim()}`);
      if (lines.length > 0) blocks.push(lines.join('\n'));
    });
    return blocks.join('\n\n');
  }, [contacts]);

  const copyList = async () => {
    try { await navigator.clipboard.writeText(formatted); } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.3fr 1fr' }, gap: 4 }}>
      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Contacts</Typography>
        <Stack spacing={2}>
          {contacts.map((c) => (
            <Paper key={c.id} variant="outlined" sx={{ p: 2 }}>
              <Stack direction="row" justifyContent="flex-end">
                <IconButton size="small" onClick={() => removeContact(c.id)} disabled={contacts.length <= 1}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Stack>
              <Stack spacing={1.5}>
                <TextField size="small" label="Name" fullWidth value={c.name} onChange={(e) => updateContact(c.id, { name: e.target.value })} />
                <TextField size="small" label="Phone (optional)" fullWidth value={c.phone} onChange={(e) => updateContact(c.id, { phone: e.target.value })} />
                <TextField size="small" label="Email (optional)" fullWidth value={c.email} onChange={(e) => updateContact(c.id, { email: e.target.value })} />
                <TextField size="small" label="Address (optional)" fullWidth value={c.address} onChange={(e) => updateContact(c.id, { address: e.target.value })} />
              </Stack>
            </Paper>
          ))}
        </Stack>
        <Button startIcon={<AddIcon />} onClick={addContact} sx={{ mt: 2 }}>Add Contact</Button>
      </Box>

      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle1" fontWeight={600}>Formatted List</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyList} disabled={!formatted}>
            Copy
          </Button>
        </Stack>
        <Paper variant="outlined" sx={{ p: 2, minHeight: 300 }}>
          {formatted ? (
            <Typography component="pre" sx={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '0.85rem', m: 0 }}>
              {formatted}
            </Typography>
          ) : (
            <Typography variant="body2" color="text.secondary">Fill in at least a name for a contact to see the formatted output.</Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

const ContactListFormatter = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Contact List Formatter</Typography>
      <Typography variant="body1">
        Add a row for each contact and fill in whichever fields you have — name, phone, email, and address are
        all optional except that a contact needs at least a name to appear in the output. This single tool
        covers what would otherwise be three separate near-identical tools (a Contact List Formatter, an
        Address List Formatter, and a Phone List Formatter), since most people need some mix of all three
        fields rather than just one. The formatted panel on the right builds one clean, consistently aligned
        block per contact, automatically skipping any field you left blank.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Entering &quot;Jane Doe&quot; with a phone number but no email or address produces a two-line block —
        the name followed by &quot;Phone: ...&quot; — while a second contact with all four fields filled in
        produces a four-line block, each formatted the same consistent way.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Cleaning up a messy list of names, numbers, and emails into a consistent format.</li>
          <li>Building a printable contact sheet for a team, club, or family directory.</li>
          <li>Formatting just phone numbers or just addresses by leaving the other fields blank.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Do I have to fill in every field for each contact?</strong> No — only the name is effectively required for a contact to show up in the output. Phone, email, and address are all optional, and any left blank are simply skipped in that contact&apos;s formatted block.</li>
          <li><strong>Can I use this as just a phone list or just an address list?</strong> Yes — fill in only the phone field (or only the address field) across all your contacts, and the formatted output naturally becomes a phone-only or address-only list.</li>
          <li><strong>Is my contact list saved anywhere?</strong> No — everything is kept only in your browser for the current session and resets on reload, so copy the formatted list before you close the tab if you want to keep it.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/contact-list-formatter" content={content}>
      <ContactListFormatterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ContactListFormatter;
