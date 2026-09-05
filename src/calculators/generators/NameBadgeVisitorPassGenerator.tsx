'use client';

import { useState } from 'react';
import { Box, Typography, TextField, Paper, Stack, ToggleButtonGroup, ToggleButton, Divider } from '@mui/material';
import BadgeIcon from '@mui/icons-material/Badge';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Mode = 'badge' | 'pass';

const NameBadgeVisitorPassGeneratorContent = () => {
  const [mode, setMode] = useState<Mode>('badge');

  // Name Badge fields
  const [name, setName] = useState('Jordan Lee');
  const [title, setTitle] = useState('Marketing Manager');
  const [company, setCompany] = useState('Acme Corp');

  // Visitor Pass fields
  const [visitorName, setVisitorName] = useState('Jamie Rivera');
  const [hostName, setHostName] = useState('Taylor Kim');
  const [visitorCompany, setVisitorCompany] = useState('Beacon Supplies');
  const [visitDate, setVisitDate] = useState('2026-09-05');
  const [purpose, setPurpose] = useState('Vendor meeting');

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box>
        <ToggleButtonGroup size="small" value={mode} exclusive onChange={(_, v) => v && setMode(v)} sx={{ mb: 3 }}>
          <ToggleButton value="badge">Name Badge</ToggleButton>
          <ToggleButton value="pass">Visitor Pass</ToggleButton>
        </ToggleButtonGroup>

        {mode === 'badge' ? (
          <Stack spacing={2}>
            <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
            <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth />
            <TextField label="Company" value={company} onChange={(e) => setCompany(e.target.value)} fullWidth />
          </Stack>
        ) : (
          <Stack spacing={2}>
            <TextField label="Visitor name" value={visitorName} onChange={(e) => setVisitorName(e.target.value)} fullWidth />
            <TextField label="Host name" value={hostName} onChange={(e) => setHostName(e.target.value)} fullWidth />
            <TextField label="Company" value={visitorCompany} onChange={(e) => setVisitorCompany(e.target.value)} fullWidth />
            <Stack direction="row" spacing={2}>
              <TextField label="Date" value={visitDate} onChange={(e) => setVisitDate(e.target.value)} fullWidth />
              <TextField label="Purpose of visit" value={purpose} onChange={(e) => setPurpose(e.target.value)} fullWidth />
            </Stack>
          </Stack>
        )}
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
        <Paper
          variant="outlined"
          sx={{
            width: 320,
            p: 3,
            textAlign: 'center',
            border: '2px solid',
            borderColor: 'primary.main',
            borderRadius: 2,
          }}
        >
          <BadgeIcon color="primary" sx={{ fontSize: 36, mb: 1 }} />
          {mode === 'badge' ? (
            <>
              <Typography variant="overline" color="text.secondary">HELLO, MY NAME IS</Typography>
              <Typography variant="h5" fontWeight={800} sx={{ mb: 0.5 }}>{name || 'Your Name'}</Typography>
              {title && <Typography variant="body1">{title}</Typography>}
              {company && <Typography variant="body2" color="text.secondary">{company}</Typography>}
            </>
          ) : (
            <>
              <Typography variant="overline" color="text.secondary">VISITOR</Typography>
              <Typography variant="h5" fontWeight={800} sx={{ mb: 0.5 }}>{visitorName || 'Visitor Name'}</Typography>
              {visitorCompany && <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{visitorCompany}</Typography>}
              <Divider sx={{ my: 1 }} />
              {hostName && <Typography variant="body2">Visiting: {hostName}</Typography>}
              {purpose && <Typography variant="body2">Purpose: {purpose}</Typography>}
              {visitDate && <Typography variant="body2" color="text.secondary">{visitDate}</Typography>}
            </>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

const NameBadgeVisitorPassGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Name Badge/Visitor Pass Generator</Typography>
      <Typography variant="body1">
        Choose whether you need a Name Badge or a Visitor Pass using the toggle. A Name Badge takes a name,
        title, and company and displays a classic &quot;Hello, my name is&quot; layout. A Visitor Pass instead
        takes the visitor&apos;s name, the host they&apos;re visiting, their company, the date, and the
        purpose of the visit, producing a formatted pass suitable for printing at a front desk or event
        check-in.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        In Visitor Pass mode, entering visitor &quot;Jamie Rivera&quot; from &quot;Beacon Supplies&quot;,
        visiting host &quot;Taylor Kim&quot; on 2026-09-05 for a &quot;Vendor meeting&quot; produces a pass
        showing the visitor&apos;s name and company at the top, followed by the host, purpose, and date.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Printing name badges for a conference, networking event, or office onboarding day.</li>
          <li>Issuing a quick visitor pass for guests checking in at a front desk or reception area.</li>
          <li>Creating consistent, professional-looking badges without needing dedicated badge software.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What&apos;s the difference between a Name Badge and a Visitor Pass here?</strong> A Name Badge is meant for someone who belongs to an organization (name, title, company), while a Visitor Pass is meant for an outside guest and includes who they&apos;re visiting, the date, and the purpose of their visit — different fields suited to each use case.</li>
          <li><strong>Can I print multiple badges at once?</strong> This tool generates one badge or pass preview at a time — for bulk printing, fill in and print each one individually, or use your browser&apos;s print function on each generated preview.</li>
          <li><strong>Is the information I enter saved anywhere?</strong> No — everything is generated live in your browser only and isn&apos;t stored, so print or screenshot the badge before navigating away.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/name-badge-visitor-pass-generator" content={content}>
      <NameBadgeVisitorPassGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default NameBadgeVisitorPassGenerator;
