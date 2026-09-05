'use client';

import { useMemo, useState } from 'react';
import { Box, Typography, TextField, Paper, Stack, Chip, Alert } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface ParsedContact {
  line: number;
  raw: string;
  name: string;
  phone: string;
  email: string;
}

function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, '');
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function parseContacts(text: string): ParsedContact[] {
  return text
    .split('\n')
    .map((raw, i) => ({ raw, i }))
    .filter(({ raw }) => raw.trim())
    .map(({ raw, i }) => {
      const parts = raw.split(',').map((p) => p.trim());
      const name = parts[0] || '';
      const phone = parts[1] || '';
      const email = parts[2] || '';
      return { line: i + 1, raw, name, phone, email };
    });
}

interface DuplicateGroup {
  field: 'phone' | 'email';
  value: string;
  contacts: ParsedContact[];
}

function findDuplicates(contacts: ParsedContact[]): DuplicateGroup[] {
  const phoneMap = new Map<string, ParsedContact[]>();
  const emailMap = new Map<string, ParsedContact[]>();

  contacts.forEach((c) => {
    const p = normalizePhone(c.phone);
    if (p) {
      if (!phoneMap.has(p)) phoneMap.set(p, []);
      phoneMap.get(p)!.push(c);
    }
    const e = normalizeEmail(c.email);
    if (e) {
      if (!emailMap.has(e)) emailMap.set(e, []);
      emailMap.get(e)!.push(c);
    }
  });

  const groups: DuplicateGroup[] = [];
  phoneMap.forEach((list, value) => {
    if (list.length > 1) groups.push({ field: 'phone', value, contacts: list });
  });
  emailMap.forEach((list, value) => {
    if (list.length > 1) groups.push({ field: 'email', value, contacts: list });
  });
  return groups;
}

const DEFAULT_INPUT = `John Smith, 555-123-4567, john@example.com
Jon Smith, (555) 123-4567, jon.smith@example.com
Sarah Lee, 555-999-0000, sarah@example.com
Sara Lee, 555-222-1111, sarah@example.com`;

const DuplicateContactFinderContent = () => {
  const [text, setText] = useState(DEFAULT_INPUT);

  const contacts = useMemo(() => parseContacts(text), [text]);
  const duplicates = useMemo(() => findDuplicates(contacts), [contacts]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={1}>
          Paste contacts (one per line: Name, Phone, Email)
        </Typography>
        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          fullWidth
          multiline
          minRows={10}
          placeholder="John Smith, 555-123-4567, john@example.com"
        />
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={1}>
          {duplicates.length > 0 ? `${duplicates.length} Possible Duplicate Group${duplicates.length === 1 ? '' : 's'}` : 'Results'}
        </Typography>

        {contacts.length === 0 && (
          <Typography variant="body2" color="text.secondary">Paste a contact list to check for duplicates.</Typography>
        )}

        {contacts.length > 0 && duplicates.length === 0 && (
          <Alert severity="success">No duplicate phone numbers or email addresses found.</Alert>
        )}

        <Stack spacing={2}>
          {duplicates.map((group, i) => (
            <Paper key={`${group.field}-${group.value}-${i}`} variant="outlined" sx={{ p: 2 }}>
              <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                <WarningAmberIcon color="warning" fontSize="small" />
                <Typography variant="body2" fontWeight={700}>
                  Same {group.field === 'phone' ? 'phone number' : 'email address'}
                </Typography>
                <Chip size="small" label={group.value} />
              </Stack>
              <Stack spacing={0.5}>
                {group.contacts.map((c) => (
                  <Typography key={c.line} variant="body2" color="text.secondary">
                    Line {c.line}: {c.raw}
                  </Typography>
                ))}
              </Stack>
            </Paper>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

const DuplicateContactFinder = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Duplicate Contact Finder</Typography>
      <Typography variant="body1">
        Paste your contact list, one contact per line, in the format &quot;Name, Phone, Email&quot; — phone
        and email are both optional per line. The tool parses each line and flags any contacts that share
        the exact same phone number (ignoring spaces, dashes, dots, and parentheses) or the exact same
        email address (case-insensitive), even if the names differ or are spelled slightly differently.
        Each duplicate group shows which specific lines matched and on which field.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        With &quot;John Smith, 555-123-4567, john@example.com&quot; and &quot;Jon Smith, (555)
        123-4567, jon.smith@example.com&quot; on separate lines, the tool flags them as duplicates on
        phone number — the digits match exactly (5551234567) even though the formatting and email address
        differ.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Cleaning up an exported contact list before importing it into a CRM or address book.</li>
          <li>Catching duplicate leads in a sales list where the same person was entered under slightly different names.</li>
          <li>Merging two separate contact exports and checking for overlapping people first.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does the tool catch duplicates with different name spellings?</strong> Yes — matching is based only on phone number and email address, not on the name, so &quot;Sara Lee&quot; and &quot;Sarah Lee&quot; sharing the same email will still be flagged as a likely duplicate.</li>
          <li><strong>How are phone numbers compared?</strong> All non-digit characters (spaces, dashes, dots, parentheses) are stripped before comparing, so &quot;555-123-4567&quot; and &quot;(555) 123-4567&quot; are correctly treated as the same number.</li>
          <li><strong>Is my contact list uploaded or saved anywhere?</strong> No — everything is processed entirely in your browser using client-side JavaScript, and nothing is sent to a server or saved beyond the current page session.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/duplicate-contact-finder" content={content}>
      <DuplicateContactFinderContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default DuplicateContactFinder;
