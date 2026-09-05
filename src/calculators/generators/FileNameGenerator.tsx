'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, Button, ToggleButton, ToggleButtonGroup } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type DatePosition = 'none' | 'prefix' | 'suffix';
type Separator = '-' | '_';
type CaseStyle = 'lowercase' | 'kebab' | 'snake';

function todayIso() {
  const d = new Date();
  const y = d.getFullYear();
  const m = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function applyCaseStyle(text: string, style: CaseStyle, separator: Separator): string {
  const words = text
    .trim()
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((w) => w.toLowerCase());

  if (style === 'lowercase') {
    return words.join(separator);
  }
  if (style === 'kebab') {
    return words.join('-');
  }
  // snake
  return words.join('_');
}

const FileNameGeneratorContent = () => {
  const [title, setTitle] = useState('Project Report');
  const [datePosition, setDatePosition] = useState<DatePosition>('prefix');
  const [dateValue, setDateValue] = useState(todayIso());
  const [separator, setSeparator] = useState<Separator>('-');
  const [caseStyle, setCaseStyle] = useState<CaseStyle>('kebab');
  const [version, setVersion] = useState('');
  const [extension, setExtension] = useState('');

  const generatedName = useMemo(() => {
    const base = applyCaseStyle(title, caseStyle, separator);
    if (!base) return '';

    const effectiveSep = caseStyle === 'snake' ? '_' : caseStyle === 'kebab' ? '-' : separator;

    const parts: string[] = [];
    if (datePosition === 'prefix' && dateValue) parts.push(dateValue);
    parts.push(base);
    if (version.trim()) {
      const v = version.trim().replace(/^v/i, '');
      parts.push(`v${v}`);
    }
    if (datePosition === 'suffix' && dateValue) parts.push(dateValue);

    let name = parts.join(effectiveSep);
    if (extension.trim()) {
      const ext = extension.trim().replace(/^\./, '');
      name = `${name}.${ext}`;
    }
    return name;
  }, [title, datePosition, dateValue, separator, caseStyle, version, extension]);

  const copyName = async () => {
    try {
      await navigator.clipboard.writeText(generatedName);
    } catch {
      // ignore clipboard errors
    }
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Stack spacing={3}>
        <TextField
          label="Base Title / Description"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />

        <Box>
          <Typography variant="body2" color="text.secondary" mb={1}>Date Format</Typography>
          <ToggleButtonGroup
            exclusive
            value={datePosition}
            onChange={(_, v) => v && setDatePosition(v)}
            size="small"
          >
            <ToggleButton value="none">None</ToggleButton>
            <ToggleButton value="prefix">Prepend</ToggleButton>
            <ToggleButton value="suffix">Append</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {datePosition !== 'none' && (
          <TextField
            label="Date (YYYY-MM-DD)"
            type="date"
            value={dateValue}
            onChange={(e) => setDateValue(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ maxWidth: 220 }}
          />
        )}

        <Box>
          <Typography variant="body2" color="text.secondary" mb={1}>Case Style</Typography>
          <ToggleButtonGroup
            exclusive
            value={caseStyle}
            onChange={(_, v) => v && setCaseStyle(v)}
            size="small"
          >
            <ToggleButton value="lowercase">lowercase</ToggleButton>
            <ToggleButton value="kebab">kebab-case</ToggleButton>
            <ToggleButton value="snake">snake_case</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {caseStyle === 'lowercase' && (
          <Box>
            <Typography variant="body2" color="text.secondary" mb={1}>Separator</Typography>
            <ToggleButtonGroup
              exclusive
              value={separator}
              onChange={(_, v) => v && setSeparator(v)}
              size="small"
            >
              <ToggleButton value="-">Hyphen (-)</ToggleButton>
              <ToggleButton value="_">Underscore (_)</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        )}

        <Stack direction="row" spacing={2}>
          <TextField
            label="Version / Sequence (optional)"
            placeholder="e.g. 2"
            value={version}
            onChange={(e) => setVersion(e.target.value)}
            fullWidth
          />
          <TextField
            label="Extension (optional)"
            placeholder="e.g. pdf"
            value={extension}
            onChange={(e) => setExtension(e.target.value)}
            fullWidth
          />
        </Stack>
      </Stack>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Generated File Name</Typography>
        <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white', mb: 2 }}>
          <Typography variant="h6" fontWeight={700} sx={{ wordBreak: 'break-all' }}>
            {generatedName || '—'}
          </Typography>
        </Paper>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<ContentCopyIcon />}
          onClick={copyName}
          disabled={!generatedName}
        >
          Copy File Name
        </Button>
      </Box>
    </Box>
  );
};

const FileNameGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the File Name Generator</Typography>
      <Typography variant="body1">
        Type your base title or description, then choose whether to prepend or append a date, pick a
        separator (hyphen or underscore), and choose a case style — plain lowercase with your chosen
        separator, kebab-case (always hyphens), or snake_case (always underscores). Optionally add a version
        or sequence number and a file extension. The tool combines all of these into a single clean,
        consistently formatted file name you can copy with one click.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A title of &quot;Project Report&quot;, date prepended as <code>2026-09-05</code>, kebab-case, version
        &quot;2&quot;, and extension &quot;pdf&quot; generates:
        <br />
        <code>2026-09-05-project-report-v2.pdf</code>
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Creating consistent, sortable file names for documents, reports, and exports.</li>
          <li>Standardizing file naming across a team so files sort chronologically by date.</li>
          <li>Generating versioned file names for drafts that go through multiple revisions.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why does the separator option disappear for kebab-case and snake_case?</strong> Those two case styles always use a fixed separator by definition — hyphens for kebab-case, underscores for snake_case — so the separator toggle only applies to the plain lowercase style, where you can choose either.</li>
          <li><strong>Does this rename an actual file on my computer?</strong> No — this tool only generates a suggested file name as text for you to copy and use when saving or renaming a file yourself; it doesn&apos;t touch any files directly.</li>
          <li><strong>What if I don&apos;t need a version number or extension?</strong> Both are optional — leave them blank and the generated name will simply omit that part, combining only the title and date (if chosen).</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/file-name-generator" content={content}>
      <FileNameGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default FileNameGenerator;
