'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, IconButton, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import GroupsIcon from '@mui/icons-material/Groups';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface FamilyMember {
  id: number;
  name: string;
  relationship: string;
  birthdate: string;
  contact: string;
}

let nextId = 1400;

const DEFAULT_MEMBERS: FamilyMember[] = [
  { id: 1, name: 'Jordan Lee', relationship: 'Mother', birthdate: '', contact: '' },
  { id: 2, name: 'Casey Lee', relationship: 'Brother', birthdate: '', contact: '' },
];

const FamilyMemberListGeneratorContent = () => {
  const [members, setMembers] = useState<FamilyMember[]>(DEFAULT_MEMBERS);

  const addMember = () => setMembers((prev) => [...prev, { id: nextId++, name: '', relationship: '', birthdate: '', contact: '' }]);
  const removeMember = (id: number) => setMembers((prev) => prev.filter((m) => m.id !== id));
  const updateMember = (id: number, patch: Partial<FamilyMember>) =>
    setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, ...patch } : m)));

  const validMembers = useMemo(() => members.filter((m) => m.name.trim()), [members]);

  const copyList = async () => {
    const lines = validMembers.map((m) => {
      const parts = [m.name];
      if (m.relationship) parts.push(`(${m.relationship})`);
      let line = parts.join(' ');
      if (m.birthdate) line += ` — Born: ${m.birthdate}`;
      if (m.contact) line += ` — ${m.contact}`;
      return `- ${line}`;
    });
    try { await navigator.clipboard.writeText(lines.join('\n')); } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.4fr 1fr' }, gap: 4 }}>
      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Family Members</Typography>
        <Stack spacing={2}>
          {members.map((m) => (
            <Paper key={m.id} variant="outlined" sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                <TextField size="small" label="Name" value={m.name} onChange={(e) => updateMember(m.id, { name: e.target.value })} sx={{ flex: 1.5, minWidth: 140 }} />
                <TextField size="small" label="Relationship to you" value={m.relationship} onChange={(e) => updateMember(m.id, { relationship: e.target.value })} sx={{ flex: 1, minWidth: 130 }} placeholder="e.g. Mother, Cousin" />
                <IconButton onClick={() => removeMember(m.id)} disabled={members.length <= 1} size="small">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
              <Stack direction="row" spacing={1}>
                <TextField size="small" fullWidth label="Birthdate (optional)" value={m.birthdate} onChange={(e) => updateMember(m.id, { birthdate: e.target.value })} />
                <TextField size="small" fullWidth label="Contact info (optional)" value={m.contact} onChange={(e) => updateMember(m.id, { contact: e.target.value })} />
              </Stack>
            </Paper>
          ))}
        </Stack>
        <Button startIcon={<AddIcon />} onClick={addMember} sx={{ mt: 2 }}>
          Add Family Member
        </Button>
      </Box>

      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle1" fontWeight={600}>Family Directory</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyList} disabled={validMembers.length === 0}>
            Copy
          </Button>
        </Stack>
        <Paper variant="outlined" sx={{ p: 2, minHeight: 200 }}>
          {validMembers.length === 0 && (
            <Typography variant="body2" color="text.secondary">Add a family member to build your directory.</Typography>
          )}
          <Stack spacing={1.5}>
            {validMembers.map((m) => (
              <Box key={m.id} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <GroupsIcon color="primary" fontSize="small" sx={{ mt: 0.3 }} />
                <Box>
                  <Typography fontWeight={600}>{m.name}{m.relationship ? ` (${m.relationship})` : ''}</Typography>
                  {m.birthdate && <Typography variant="body2" color="text.secondary">Born: {m.birthdate}</Typography>}
                  {m.contact && <Typography variant="body2" color="text.secondary">{m.contact}</Typography>}
                </Box>
              </Box>
            ))}
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};

const FamilyMemberListGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Family Member List Generator</Typography>
      <Typography variant="body1">
        Add each family member with their name and relationship to you — like &quot;Mother&quot;,
        &quot;Cousin&quot;, or &quot;Grandfather&quot; — plus an optional birthdate and contact info. The
        directory on the right builds a clean, organized list of everyone you&apos;ve added, ready to copy
        for a family reunion, holiday card list, or personal reference.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Adding &quot;Jordan Lee (Mother)&quot; and &quot;Casey Lee (Brother)&quot; produces a directory
        listing both, each showing their relationship beneath their name, along with any birthdate or
        contact info entered.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Building a quick family directory for a reunion, holiday card list, or emergency reference.</li>
          <li>Organizing extended family relationships and birthdates in one place.</li>
          <li>Keeping a simple family contact list handy without needing a dedicated address book app.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Do I need to fill in a birthdate or contact info for everyone?</strong> No — both fields are optional. Only the name is required for a family member to appear in the directory; birthdate and contact info simply won&apos;t show if left blank.</li>
          <li><strong>Can I organize a full extended family tree with this?</strong> This tool builds a flat directory list rather than a visual tree diagram — it&apos;s best for listing relationships in text form (e.g. &quot;Aunt&quot;, &quot;Second Cousin&quot;) rather than showing generational branching visually.</li>
          <li><strong>Is my family information saved anywhere?</strong> No — everything is kept only in your browser for the current session and resets when you reload, so copy your list before closing the tab if you want to keep it.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/family-member-list-generator" content={content}>
      <FamilyMemberListGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default FamilyMemberListGenerator;
