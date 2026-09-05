'use client';

import { useMemo, useState } from 'react';
import { Box, Button, Typography, TextField, ToggleButton, ToggleButtonGroup, Paper, Stack } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type SourceType = 'book' | 'website' | 'journal';

interface Fields {
  author: string;
  title: string;
  year: string;
  publisher: string;
  url: string;
  accessDate: string;
}

function buildApa(type: SourceType, f: Fields): string {
  const { author, title, year, publisher, url, accessDate } = f;
  if (type === 'book') return `${author} (${year}). ${title}. ${publisher}.`;
  if (type === 'website') return `${author} (${year}). ${title}. ${publisher}. ${url}`;
  return `${author} (${year}). ${title}. ${publisher}.`;
}

function buildMla(type: SourceType, f: Fields): string {
  const { author, title, year, publisher, url, accessDate } = f;
  if (type === 'book') return `${author}. ${title}. ${publisher}, ${year}.`;
  if (type === 'website')
    return `${author}. "${title}." ${publisher}, ${year}, ${url}. Accessed ${accessDate}.`;
  return `${author}. "${title}." ${publisher}, ${year}.`;
}

function buildChicago(type: SourceType, f: Fields): string {
  const { author, title, year, publisher, url, accessDate } = f;
  if (type === 'book') return `${author}. ${title}. ${publisher}, ${year}.`;
  if (type === 'website')
    return `${author}. "${title}." ${publisher}. Accessed ${accessDate}. ${url}.`;
  return `${author}. "${title}." ${publisher} (${year}).`;
}

const SOURCE_TYPES: { value: SourceType; label: string }[] = [
  { value: 'book', label: 'Book' },
  { value: 'website', label: 'Website' },
  { value: 'journal', label: 'Journal Article' },
];

const CitationFormatterContent = () => {
  const [type, setType] = useState<SourceType>('book');
  const [fields, setFields] = useState<Fields>({
    author: '',
    title: '',
    year: '',
    publisher: '',
    url: '',
    accessDate: '',
  });
  const [copied, setCopied] = useState<string | null>(null);

  const update = (key: keyof Fields, value: string) => setFields((prev) => ({ ...prev, [key]: value }));

  const hasEnough = fields.author.trim() && fields.title.trim();

  const apa = useMemo(() => (hasEnough ? buildApa(type, fields) : ''), [type, fields, hasEnough]);
  const mla = useMemo(() => (hasEnough ? buildMla(type, fields) : ''), [type, fields, hasEnough]);
  const chicago = useMemo(() => (hasEnough ? buildChicago(type, fields) : ''), [type, fields, hasEnough]);

  const copyStyle = async (label: string, value: string) => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      setTimeout(() => setCopied(null), 1500);
    } catch {}
  };

  const publisherLabel = type === 'website' ? 'Website Name' : type === 'journal' ? 'Journal Name' : 'Publisher';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>Source type:</Typography>
        <ToggleButtonGroup
          value={type}
          exclusive
          onChange={(_, v) => v && setType(v)}
          sx={{ flexWrap: 'wrap', gap: 1, '& .MuiToggleButtonGroup-grouped': { border: '1px solid', borderColor: 'divider !important', borderRadius: '4px !important' } }}
        >
          {SOURCE_TYPES.map((t) => (
            <ToggleButton key={t.value} value={t.value} size="small">{t.label}</ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
        <TextField label="Author Name(s)" value={fields.author} onChange={(e) => update('author', e.target.value)} placeholder="e.g. Jane Doe" fullWidth />
        <TextField label="Title" value={fields.title} onChange={(e) => update('title', e.target.value)} fullWidth />
        <TextField label="Publication Year" value={fields.year} onChange={(e) => update('year', e.target.value)} fullWidth />
        <TextField label={publisherLabel} value={fields.publisher} onChange={(e) => update('publisher', e.target.value)} fullWidth />
        {type === 'website' && (
          <>
            <TextField label="URL" value={fields.url} onChange={(e) => update('url', e.target.value)} fullWidth />
            <TextField label="Access Date" value={fields.accessDate} onChange={(e) => update('accessDate', e.target.value)} placeholder="e.g. September 5, 2026" fullWidth />
          </>
        )}
      </Box>

      <Stack spacing={2}>
        {[
          { label: 'APA', value: apa },
          { label: 'MLA', value: mla },
          { label: 'Chicago', value: chicago },
        ].map((style) => (
          <Paper key={style.label} variant="outlined" sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="subtitle2" fontWeight={600}>{style.label}</Typography>
              <Button size="small" startIcon={<ContentCopyIcon />} onClick={() => copyStyle(style.label, style.value)} disabled={!style.value}>
                {copied === style.label ? 'Copied!' : 'Copy'}
              </Button>
            </Box>
            <Typography variant="body2" sx={{ fontStyle: style.value ? 'normal' : 'italic', color: style.value ? 'text.primary' : 'text.secondary' }}>
              {style.value || 'Fill in at least author and title to generate a citation.'}
            </Typography>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
};

const CitationFormatter = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Citation Formatter</Typography>
      <Typography variant="body1">
        Choose a source type — Book, Website, or Journal Article — then fill in the author, title, year, and
        publisher (or website/journal name). Website sources also ask for a URL and access date. The tool
        instantly builds a properly formatted citation in APA, MLA, and Chicago style side by side, so you can
        copy whichever your assignment or publication requires.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A book by <code>Jane Doe</code> titled <code>Learning to Code</code>, published by{' '}
        <code>Tech Press</code> in <code>2022</code>, generates the APA citation{' '}
        <code>Jane Doe (2022). Learning to Code. Tech Press.</code> and the corresponding MLA and Chicago
        versions automatically.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Building a quick citation for a school essay or research paper without opening a style manual.</li>
          <li>Comparing how the same source is cited differently across APA, MLA, and Chicago style.</li>
          <li>Generating a website citation with a URL and access date for an online source.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Are these citations guaranteed to be perfectly correct?</strong> They follow standard formatting conventions for the common cases of books, websites, and journal articles, but full citation style rules have many real-world edge cases — such as multiple authors, missing dates, or edited volumes. Always verify against an official style guide (APA, MLA, or Chicago manual) for unusual sources.</li>
          <li><strong>Why do I only see URL and access date fields for websites?</strong> Books and journal articles are traditionally cited without a URL or access date in these three styles, since they're treated as stable, permanently published sources rather than pages that can change or disappear.</li>
          <li><strong>How should I format multiple authors?</strong> Type them into the Author Name(s) field the way your chosen style requires (for example, &quot;Doe, J., &amp; Smith, A.&quot;) — the tool inserts your text as-is rather than reformatting author name order or punctuation.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/citation-formatter" content={content}>
      <CitationFormatterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CitationFormatter;
