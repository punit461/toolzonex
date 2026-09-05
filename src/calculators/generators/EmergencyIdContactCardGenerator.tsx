'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, IconButton, Button, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface Contact {
  id: number;
  name: string;
  relationship: string;
  phone: string;
}

let nextId = 1000;

const DEFAULT_CONTACTS: Contact[] = [
  { id: 1, name: '', relationship: 'Spouse', phone: '' },
  { id: 2, name: '', relationship: 'Parent', phone: '' },
];

const EmergencyIdContactCardGeneratorContent = () => {
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [medicalInfo, setMedicalInfo] = useState('');
  const [contacts, setContacts] = useState<Contact[]>(DEFAULT_CONTACTS);

  const addContact = () => setContacts((prev) => [...prev, { id: nextId++, name: '', relationship: '', phone: '' }]);
  const removeContact = (id: number) => setContacts((prev) => prev.filter((c) => c.id !== id));
  const updateContact = (id: number, patch: Partial<Contact>) =>
    setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));

  const validContacts = useMemo(() => contacts.filter((c) => c.name.trim() || c.phone.trim()), [contacts]);

  const copyCard = async () => {
    const lines: string[] = ['IN CASE OF EMERGENCY'];
    if (fullName) lines.push(`Name: ${fullName}`);
    if (dob) lines.push(`Date of Birth: ${dob}`);
    if (bloodType) lines.push(`Blood Type: ${bloodType}`);
    if (medicalInfo) lines.push(`Allergies/Conditions: ${medicalInfo}`);
    if (validContacts.length > 0) {
      lines.push('');
      lines.push('Emergency Contacts:');
      validContacts.forEach((c) => {
        lines.push(`- ${c.name}${c.relationship ? ` (${c.relationship})` : ''}${c.phone ? `: ${c.phone}` : ''}`);
      });
    }
    try { await navigator.clipboard.writeText(lines.join('\n')); } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.2fr 1fr' }, gap: 4 }}>
      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Personal Information</Typography>
        <Stack spacing={2} sx={{ mb: 3 }}>
          <TextField size="small" label="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} fullWidth />
          <Stack direction="row" spacing={2}>
            <TextField size="small" label="Date of birth" value={dob} onChange={(e) => setDob(e.target.value)} fullWidth placeholder="MM/DD/YYYY" />
            <TextField size="small" label="Blood type" value={bloodType} onChange={(e) => setBloodType(e.target.value)} fullWidth placeholder="e.g. O+" />
          </Stack>
          <TextField
            size="small"
            label="Allergies / medical conditions"
            value={medicalInfo}
            onChange={(e) => setMedicalInfo(e.target.value)}
            fullWidth
            multiline
            minRows={2}
            placeholder="e.g. Penicillin allergy, Type 1 diabetes"
          />
        </Stack>

        <Typography variant="subtitle1" fontWeight={600} mb={2}>Emergency Contacts</Typography>
        <Stack spacing={2}>
          {contacts.map((c) => (
            <Paper key={c.id} variant="outlined" sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                <TextField size="small" label="Name" value={c.name} onChange={(e) => updateContact(c.id, { name: e.target.value })} sx={{ flex: 1.5, minWidth: 130 }} />
                <TextField size="small" label="Relationship" value={c.relationship} onChange={(e) => updateContact(c.id, { relationship: e.target.value })} sx={{ flex: 1, minWidth: 110 }} />
                <TextField size="small" label="Phone" value={c.phone} onChange={(e) => updateContact(c.id, { phone: e.target.value })} sx={{ flex: 1, minWidth: 120 }} />
                <IconButton onClick={() => removeContact(c.id)} disabled={contacts.length <= 1} size="small">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Paper>
          ))}
        </Stack>
        <Button startIcon={<AddIcon />} onClick={addContact} sx={{ mt: 2 }}>
          Add Contact
        </Button>
      </Box>

      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle1" fontWeight={600}>ICE Card Preview</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyCard}>Copy</Button>
        </Stack>
        <Paper
          variant="outlined"
          sx={{
            p: 2.5,
            maxWidth: 340,
            border: '2px solid',
            borderColor: 'error.main',
            borderRadius: 2,
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
            <LocalHospitalIcon color="error" />
            <Typography variant="subtitle2" fontWeight={800} color="error.main">IN CASE OF EMERGENCY</Typography>
          </Stack>
          <Divider sx={{ mb: 1.5 }} />
          <Typography variant="body1" fontWeight={700}>{fullName || 'Full Name'}</Typography>
          {dob && <Typography variant="body2">DOB: {dob}</Typography>}
          {bloodType && <Typography variant="body2">Blood Type: {bloodType}</Typography>}
          {medicalInfo && <Typography variant="body2" sx={{ mt: 0.5 }}>Allergies/Conditions: {medicalInfo}</Typography>}

          {validContacts.length > 0 && (
            <>
              <Divider sx={{ my: 1.5 }} />
              <Typography variant="body2" fontWeight={700} gutterBottom>Emergency Contacts</Typography>
              <Stack spacing={0.5}>
                {validContacts.map((c) => (
                  <Typography key={c.id} variant="body2">
                    {c.name}{c.relationship ? ` (${c.relationship})` : ''}{c.phone ? ` — ${c.phone}` : ''}
                  </Typography>
                ))}
              </Stack>
            </>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

const EmergencyIdContactCardGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Emergency/ID Contact Card Generator</Typography>
      <Typography variant="body1">
        Fill in your personal details — name, date of birth, blood type, and any allergies or medical
        conditions — then add one or more emergency contacts with their name, relationship, and phone
        number. The preview on the right builds a formatted, wallet-card-sized &quot;In Case of Emergency&quot;
        (ICE) card that you can copy as text or print, ready to keep in a wallet, bag, or glovebox.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        With name &quot;Jordan Lee&quot;, blood type &quot;O+&quot;, an allergy note of &quot;Penicillin
        allergy&quot;, and an emergency contact &quot;Alex Lee (Spouse) — 555-0134&quot;, the card shows all
        that information in a clean, labeled layout under an &quot;IN CASE OF EMERGENCY&quot; header.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Creating a printable ICE card to carry in a wallet, backpack, or car.</li>
          <li>Preparing a personal information card for a child, elderly parent, or someone with a medical condition.</li>
          <li>Sharing key medical and emergency contact details quickly with a school, coach, or travel companion.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Is my personal and medical information saved anywhere?</strong> No — everything you type stays in your browser only for the current session and is never saved to a server or database. It resets when you reload the page, so copy or print your card before closing the tab.</li>
          <li><strong>Can I add more than one emergency contact?</strong> Yes — use the &quot;Add Contact&quot; button to add as many emergency contacts as you need, each with their own name, relationship, and phone number.</li>
          <li><strong>Should I carry a physical copy of this card?</strong> Yes, that&apos;s the intended use — copy the text or print the card and keep it somewhere accessible, like a wallet or phone case, so first responders or others can find it quickly in an emergency.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/emergency-id-contact-card-generator" content={content}>
      <EmergencyIdContactCardGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default EmergencyIdContactCardGenerator;
