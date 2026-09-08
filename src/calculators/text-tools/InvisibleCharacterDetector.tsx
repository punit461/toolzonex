'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, Chip, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface InvisibleCharDef {
  code: number;
  name: string;
  abbr: string;
}

const INVISIBLE_CHARS: InvisibleCharDef[] = [
  { code: 0x200b, name: 'Zero-Width Space', abbr: 'ZWSP' },
  { code: 0x200c, name: 'Zero-Width Non-Joiner', abbr: 'ZWNJ' },
  { code: 0x200d, name: 'Zero-Width Joiner', abbr: 'ZWJ' },
  { code: 0x00a0, name: 'Non-Breaking Space', abbr: 'NBSP' },
  { code: 0xfeff, name: 'Zero-Width No-Break Space (BOM)', abbr: 'BOM' },
  { code: 0x00ad, name: 'Soft Hyphen', abbr: 'SHY' },
  { code: 0x2060, name: 'Word Joiner', abbr: 'WJ' },
];

const CHAR_MAP = new Map(INVISIBLE_CHARS.map((c) => [c.code, c]));

const DEFAULT_TEXT = 'This looks normal but has a zero​width space and a soft­hyphen hidden inside.';

const InvisibleCharacterDetectorContent = () => {
  const [text, setText] = useState(DEFAULT_TEXT);

  const { counts, segments } = useMemo(() => {
    const countMap = new Map<number, number>();
    const parts: { text: string; hit?: InvisibleCharDef }[] = [];
    let buffer = '';

    for (const ch of text) {
      const code = ch.codePointAt(0) ?? 0;
      const def = CHAR_MAP.get(code);
      if (def) {
        if (buffer) {
          parts.push({ text: buffer });
          buffer = '';
        }
        parts.push({ text: ch, hit: def });
        countMap.set(def.code, (countMap.get(def.code) ?? 0) + 1);
      } else {
        buffer += ch;
      }
    }
    if (buffer) parts.push({ text: buffer });

    return { counts: countMap, segments: parts };
  }, [text]);

  const totalFound = useMemo(() => Array.from(counts.values()).reduce((a, b) => a + b, 0), [counts]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box>
        <TextField
          label="Text to Scan"
          value={text}
          onChange={(e) => setText(e.target.value)}
          multiline
          rows={10}
          fullWidth
          sx={{ mb: 2 }}
        />

        <Typography variant="subtitle1" fontWeight={600} mb={1}>
          {totalFound > 0 ? `${totalFound} Invisible Character${totalFound === 1 ? '' : 's'} Found` : 'No Invisible Characters Found'}
        </Typography>
        {totalFound === 0 ? (
          <Alert severity="success">No exotic invisible Unicode characters detected in this text.</Alert>
        ) : (
          <Stack spacing={1}>
            {INVISIBLE_CHARS.filter((def) => counts.has(def.code)).map((def) => (
              <Box key={def.code} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">
                  {def.name} <Typography component="span" variant="caption" color="text.secondary">(U+{def.code.toString(16).toUpperCase().padStart(4, '0')})</Typography>
                </Typography>
                <Chip label={`× ${counts.get(def.code)}`} size="small" color="warning" />
              </Box>
            ))}
          </Stack>
        )}
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={1}>Highlighted Text</Typography>
        <Paper
          variant="outlined"
          sx={{ p: 2, minHeight: 250, fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
        >
          {segments.length === 0 && <Typography variant="body2" color="text.secondary">Type or paste text to scan it.</Typography>}
          {segments.map((seg, idx) =>
            seg.hit ? (
              <mark
                key={idx}
                title={`${seg.hit.name} (U+${seg.hit.code.toString(16).toUpperCase().padStart(4, '0')}) at position ${idx}`}
                style={{ backgroundColor: '#ffcc80', borderRadius: 3, padding: '0 2px', fontSize: '0.7rem', fontWeight: 700 }}
              >
                [{seg.hit.abbr}]
              </mark>
            ) : (
              <span key={idx}>{seg.text}</span>
            )
          )}
        </Paper>
      </Box>
    </Box>
  );
};

const InvisibleCharacterDetector = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Invisible Character Detector</Typography>
      <Typography variant="body1">
        Paste or type text into the input field. The tool scans every character for a set of exotic invisible
        Unicode characters — zero-width space, zero-width joiner, zero-width non-joiner, non-breaking space,
        the byte order mark (BOM), soft hyphen, and word joiner — that don&apos;t render visibly but can still
        cause problems in code, URLs, or form inputs. Any match is shown inline as a highlighted marker in the
        read-only text panel, with a count of each type found on the left.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Pasting text that looks normal but contains a hidden non-breaking space, a zero-width space, and a soft
        hyphen shows all three highlighted inline in the text panel, with counts of 1 for each type listed on
        the left.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Debugging why a pasted URL or code snippet fails to work despite looking correct.</li>
          <li>Checking text copied from a PDF or webpage for hidden characters before using it in code.</li>
          <li>Auditing form input or CMS content for invisible characters that could break downstream processing.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Whitespace Cleaner?</strong> The Whitespace Cleaner targets ordinary spaces, tabs, and empty lines — the whitespace you can usually see or expect. This tool detects exotic invisible Unicode characters, like zero-width spaces and the byte order mark, that are often invisible even when copy-pasted and can cause subtle bugs in URLs, code, or form inputs that regular whitespace cleaning won&apos;t catch.</li>
          <li><strong>Does this tool remove the invisible characters it finds?</strong> No — this tool only detects and highlights them for review without changing your text. Use the Unicode Space Remover to actually strip them out.</li>
          <li><strong>Why would invisible characters cause bugs?</strong> Characters like zero-width spaces or the BOM can silently break string comparisons, URL parsing, form validation, or code that expects plain ASCII, even though the text looks completely normal on screen.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/invisible-character-detector" content={content}>
      <InvisibleCharacterDetectorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default InvisibleCharacterDetector;
