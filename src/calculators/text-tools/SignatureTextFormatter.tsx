'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, ToggleButton, ToggleButtonGroup, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Style = 'Compact' | 'Full';

function buildSignature(
  style: Style,
  name: string,
  title: string,
  company: string,
  phone: string,
  email: string,
  website: string
): string {
  const parts = { name: name.trim(), title: title.trim(), company: company.trim(), phone: phone.trim(), email: email.trim(), website: website.trim() };

  if (style === 'Full') {
    return [parts.name, parts.title, parts.company, parts.phone, parts.email, parts.website]
      .filter(Boolean)
      .join('\n');
  }

  // Compact: name on its own line (with title/company joined by a separator), then contact info on one line.
  const lines: string[] = [];
  const line1 = [parts.name, [parts.title, parts.company].filter(Boolean).join(', ')].filter(Boolean).join(' | ');
  if (line1) lines.push(line1);
  const line2 = [parts.phone, parts.email, parts.website].filter(Boolean).join(' | ');
  if (line2) lines.push(line2);
  return lines.join('\n');
}

const SignatureTextFormatterContent = () => {
  const [style, setStyle] = useState<Style>('Full');
  const [name, setName] = useState('Jordan Lee');
  const [title, setTitle] = useState('Marketing Manager');
  const [company, setCompany] = useState('Acme Corp');
  const [phone, setPhone] = useState('+1 (555) 123-4567');
  const [email, setEmail] = useState('jordan.lee@example.com');
  const [website, setWebsite] = useState('www.example.com');
  const [copied, setCopied] = useState(false);

  const signature = useMemo(
    () => buildSignature(style, name, title, company, phone, email, website),
    [style, name, title, company, phone, email, website]
  );

  const copySignature = async () => {
    if (!signature) return;
    try {
      await navigator.clipboard.writeText(signature);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable — ignore
    }
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Stack spacing={2.5}>
        <ToggleButtonGroup
          exclusive
          value={style}
          onChange={(_, val) => val && setStyle(val)}
        >
          <ToggleButton value="Compact" sx={{ textTransform: 'none' }}>Compact</ToggleButton>
          <ToggleButton value="Full" sx={{ textTransform: 'none' }}>Full</ToggleButton>
        </ToggleButtonGroup>

        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
        <TextField label="Job Title" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth />
        <TextField label="Company" value={company} onChange={(e) => setCompany(e.target.value)} fullWidth />
        <TextField label="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} fullWidth />
        <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
        <TextField label="Website" value={website} onChange={(e) => setWebsite(e.target.value)} fullWidth />
      </Stack>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>
          Generated Signature
        </Typography>
        <Paper variant="outlined" sx={{ p: 3, position: 'relative', minHeight: 140 }}>
          <Typography variant="body1" component="pre" sx={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', m: 0, pr: 4 }}>
            {signature || 'Fill in at least one field to preview your signature.'}
          </Typography>
          <IconButton
            size="small"
            onClick={copySignature}
            disabled={!signature}
            aria-label="Copy signature"
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Paper>
        {copied && (
          <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
            Copied to clipboard!
          </Typography>
        )}
      </Box>
    </Box>
  );
};

const SignatureTextFormatter = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Signature Text Formatter</Typography>
      <Typography variant="body1">
        Fill in any of the optional fields — name, job title, company, phone number, email, and website —
        and choose a layout style. &quot;Compact&quot; packs everything onto fewer lines using separators,
        while &quot;Full&quot; puts each field on its own line. Copy the result with one click and paste it
        into your email client&apos;s signature settings.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        With name &quot;Jordan Lee&quot;, title &quot;Marketing Manager&quot;, and company &quot;Acme
        Corp&quot;, the Full style produces each field on its own line, while the Compact style produces
        &quot;Jordan Lee | Marketing Manager, Acme Corp&quot; on one line followed by contact details on a
        second line.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Creating a clean, consistent plain-text email signature for a new job or role.</li>
          <li>Quickly generating a compact signature block for messaging apps with limited space.</li>
          <li>Standardizing signature formatting across a small team before pasting into each person&apos;s email client.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>
            <strong>Does this create an HTML signature with logos or images?</strong> No — this tool
            generates plain text only. For a signature with logos, colors, or clickable links, you&apos;ll
            need to add that formatting separately inside your email client&apos;s signature editor.
          </li>
          <li>
            <strong>Do I have to fill in every field?</strong> No — every field is optional. Any field left
            blank is automatically skipped, so the signature only includes the information you actually
            provide.
          </li>
          <li>
            <strong>What&apos;s the difference between Compact and Full styles?</strong> Full puts every
            field on its own line for a traditional, spaced-out look. Compact condenses the same information
            onto fewer lines using separators, which works well for signatures with tighter space constraints.
          </li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/signature-text-formatter" content={content}>
      <SignatureTextFormatterContent />
      <Box sx={{ mt: 4 }}>
        <AdSenseUnit />
      </Box>
    </CalculatorShell>
  );
};

export default SignatureTextFormatter;
