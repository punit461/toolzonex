'use client';

import { useMemo, useState } from 'react';
import { Box, Typography, TextField, Paper, ToggleButtonGroup, ToggleButton, Stack } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface Entry {
  term: string;
  note: string;
}

const PREFIXES: Entry[] = [
  { term: 'Mr.', note: 'For an adult man, regardless of marital status.' },
  { term: 'Mrs.', note: 'For a married adult woman.' },
  { term: 'Ms.', note: 'For an adult woman when marital status is unknown or irrelevant.' },
  { term: 'Miss', note: 'For an unmarried woman or young girl.' },
  { term: 'Mx.', note: 'A gender-neutral title used instead of Mr./Ms./Mrs.' },
  { term: 'Dr.', note: 'For someone holding a doctoral degree (PhD, MD, etc.) or a practicing physician.' },
  { term: 'Prof.', note: 'For a university professor, used in academic contexts rather than for medical doctors.' },
  { term: 'Rev.', note: 'For an ordained member of the clergy, such as a minister or pastor.' },
  { term: 'Fr.', note: 'For a Catholic or Orthodox priest ("Father").' },
  { term: 'Sr.', note: 'For a Catholic nun ("Sister"), placed before her name.' },
  { term: 'Hon.', note: 'For a judge, elected official, or other dignitary ("The Honorable").' },
  { term: 'Sir', note: 'For a knighted man in the UK, or as a general respectful address.' },
  { term: 'Dame', note: 'For a knighted woman in the UK (the female equivalent of Sir).' },
  { term: 'Capt.', note: 'For a military or ship captain.' },
  { term: 'Col.', note: 'For a military colonel.' },
  { term: 'Gen.', note: 'For a military general.' },
  { term: 'Lt.', note: 'For a lieutenant in the military or police.' },
  { term: 'Sgt.', note: 'For a sergeant in the military or police.' },
  { term: 'Maj.', note: 'For a military major.' },
  { term: 'Adm.', note: 'For a naval admiral.' },
  { term: 'Judge', note: 'Used before the name of a sitting judge in less formal contexts than "Hon."' },
  { term: 'Coach', note: 'Common informal title for a sports coach, especially in school settings.' },
  { term: 'Chief', note: 'Common title for a fire chief, police chief, or tribal leader.' },
  { term: 'Pastor', note: 'For a Protestant church leader, similar in use to Rev.' },
  { term: 'Rabbi', note: 'For an ordained Jewish religious leader.' },
  { term: 'Imam', note: 'For a Muslim worship leader.' },
];

const SUFFIXES: Entry[] = [
  { term: 'Jr.', note: 'For a son sharing the exact same name as his father.' },
  { term: 'Sr.', note: 'For the father, when his son shares his exact name (paired with "Jr.").' },
  { term: 'II', note: 'For the second person in a family to share a name, not necessarily father-son.' },
  { term: 'III', note: 'For the third person in a family line to share the same name.' },
  { term: 'IV', note: 'For the fourth person in a family line to share the same name.' },
  { term: 'V', note: 'For the fifth person in a family line to share the same name.' },
  { term: 'PhD', note: 'Indicates a Doctor of Philosophy degree, the highest common academic doctorate.' },
  { term: 'MD', note: 'Indicates a Doctor of Medicine degree, for a licensed physician.' },
  { term: 'DDS', note: 'Indicates a Doctor of Dental Surgery degree, for a dentist.' },
  { term: 'DVM', note: 'Indicates a Doctor of Veterinary Medicine degree, for a veterinarian.' },
  { term: 'JD', note: 'Indicates a Juris Doctor degree, held by many lawyers (though "Esq." is used professionally).' },
  { term: 'Esq.', note: 'Used after a practicing attorney’s name in the US, in place of Mr./Ms.' },
  { term: 'MBA', note: 'Indicates a Master of Business Administration degree.' },
  { term: 'MA', note: 'Indicates a Master of Arts degree.' },
  { term: 'MS', note: 'Indicates a Master of Science degree.' },
  { term: 'BA', note: 'Indicates a Bachelor of Arts degree.' },
  { term: 'BS', note: 'Indicates a Bachelor of Science degree.' },
  { term: 'RN', note: 'Indicates a Registered Nurse.' },
  { term: 'CPA', note: 'Indicates a Certified Public Accountant.' },
  { term: 'CFA', note: 'Indicates a Chartered Financial Analyst.' },
  { term: 'PE', note: 'Indicates a licensed Professional Engineer.' },
  { term: 'Ret.', note: 'Indicates a retired military officer, placed after a rank and name.' },
  { term: 'Emeritus', note: 'Indicates a retired professor or official who retains an honorary title.' },
  { term: 'OBE', note: 'Indicates an Officer of the Order of the British Empire, a UK honor.' },
];

type Mode = 'prefix' | 'suffix';

const NamePrefixSuffixPickerContent = () => {
  const [mode, setMode] = useState<Mode>('prefix');
  const [search, setSearch] = useState('');

  const list = mode === 'prefix' ? PREFIXES : SUFFIXES;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return list;
    return list.filter((e) => e.term.toLowerCase().includes(q) || e.note.toLowerCase().includes(q));
  }, [list, search]);

  return (
    <Box sx={{ maxWidth: 720, mx: 'auto' }}>
      <Stack direction="row" spacing={2} sx={{ mb: 3 }} alignItems="center" flexWrap="wrap">
        <ToggleButtonGroup size="small" value={mode} exclusive onChange={(_, v) => v && setMode(v)}>
          <ToggleButton value="prefix">Prefixes / Titles</ToggleButton>
          <ToggleButton value="suffix">Suffixes</ToggleButton>
        </ToggleButtonGroup>
        <TextField
          size="small"
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flex: 1, minWidth: 180 }}
        />
      </Stack>

      <Stack spacing={1.5}>
        {filtered.map((e) => (
          <Paper key={e.term} variant="outlined" sx={{ p: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
            <Typography variant="h6" fontWeight={800} sx={{ minWidth: 90 }}>{e.term}</Typography>
            <Typography variant="body2" color="text.secondary">{e.note}</Typography>
          </Paper>
        ))}
        {filtered.length === 0 && (
          <Typography color="text.secondary">No matches — try a different search term.</Typography>
        )}
      </Stack>
    </Box>
  );
};

const NamePrefixSuffixPicker = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Name Prefix & Suffix Picker</Typography>
      <Typography variant="body1">
        Switch between Prefixes/Titles and Suffixes using the toggle, then browse or search the list. Each
        entry shows the common abbreviation or term alongside a brief usage note explaining when it applies
        — for example, when to use &quot;Dr.&quot; versus &quot;Prof.&quot;, or the difference between
        &quot;Jr.&quot; and &quot;II&quot;.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Searching &quot;doc&quot; while in Prefixes mode surfaces &quot;Dr.&quot; with the note that it applies
        to anyone holding a doctoral degree or a practicing physician, helping you decide whether &quot;Dr.&quot;
        or &quot;Prof.&quot; fits a given person&apos;s title.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Choosing the correct title when addressing formal correspondence or an invitation.</li>
          <li>Understanding what a name suffix like &quot;Esq.&quot; or &quot;PhD&quot; actually signifies.</li>
          <li>Deciding between similar titles, like &quot;Rev.&quot; versus &quot;Pastor&quot;, for a specific context.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>When should I use &quot;Dr.&quot; versus &quot;Prof.&quot;?</strong> Use &quot;Dr.&quot; for anyone holding a doctoral degree or a practicing physician; use &quot;Prof.&quot; specifically for a university professor in an academic context, even if they also hold a doctorate — many professors are addressed as either, but &quot;Prof.&quot; is more precise in a teaching setting.</li>
          <li><strong>What&apos;s the difference between &quot;Jr.&quot; and &quot;II&quot;?</strong> &quot;Jr.&quot; specifically means a son who shares his father&apos;s exact full name, while &quot;II&quot; simply means the second person in a family line to carry that name, which doesn&apos;t have to be a direct father-son relationship.</li>
          <li><strong>Can a name have both a prefix and a suffix?</strong> Yes — for example, &quot;Dr. Jane Smith, PhD&quot; combines a professional prefix with an academic suffix, though repeating both a title and its corresponding degree suffix (like &quot;Dr.&quot; and &quot;MD&quot; together) is sometimes considered redundant in strict style guides.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/name-prefix-suffix-picker" content={content}>
      <NamePrefixSuffixPickerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default NamePrefixSuffixPicker;
