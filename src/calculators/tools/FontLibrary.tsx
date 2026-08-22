'use client';

import { useEffect, useMemo, useState } from 'react';
import { Box, Typography, Paper, TextField, Chip, IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type FontCategory = 'Sans-serif' | 'Serif' | 'Display' | 'Handwriting' | 'Monospace';

interface FontEntry {
  name: string;
  category: FontCategory;
}

const FONTS: FontEntry[] = [
  { name: 'Roboto', category: 'Sans-serif' },
  { name: 'Open Sans', category: 'Sans-serif' },
  { name: 'Lato', category: 'Sans-serif' },
  { name: 'Montserrat', category: 'Sans-serif' },
  { name: 'Poppins', category: 'Sans-serif' },
  { name: 'DM Sans', category: 'Sans-serif' },
  { name: 'Nunito', category: 'Sans-serif' },
  { name: 'Work Sans', category: 'Sans-serif' },
  { name: 'Rubik', category: 'Sans-serif' },
  { name: 'Manrope', category: 'Sans-serif' },
  { name: 'Playfair Display', category: 'Serif' },
  { name: 'Merriweather', category: 'Serif' },
  { name: 'Lora', category: 'Serif' },
  { name: 'PT Serif', category: 'Serif' },
  { name: 'Source Serif 4', category: 'Serif' },
  { name: 'Crimson Text', category: 'Serif' },
  { name: 'Libre Baskerville', category: 'Serif' },
  { name: 'Bebas Neue', category: 'Display' },
  { name: 'Oswald', category: 'Display' },
  { name: 'Abril Fatface', category: 'Display' },
  { name: 'Anton', category: 'Display' },
  { name: 'Righteous', category: 'Display' },
  { name: 'Archivo Black', category: 'Display' },
  { name: 'Pacifico', category: 'Handwriting' },
  { name: 'Dancing Script', category: 'Handwriting' },
  { name: 'Caveat', category: 'Handwriting' },
  { name: 'Great Vibes', category: 'Handwriting' },
  { name: 'Sacramento', category: 'Handwriting' },
  { name: 'Satisfy', category: 'Handwriting' },
  { name: 'Roboto Mono', category: 'Monospace' },
  { name: 'Source Code Pro', category: 'Monospace' },
  { name: 'JetBrains Mono', category: 'Monospace' },
  { name: 'Space Mono', category: 'Monospace' },
  { name: 'IBM Plex Mono', category: 'Monospace' },
  { name: 'Fira Code', category: 'Monospace' },
];

const CATEGORIES: FontCategory[] = ['Sans-serif', 'Serif', 'Display', 'Handwriting', 'Monospace'];

const GOOGLE_FONTS_HREF = `https://fonts.googleapis.com/css2?${FONTS.map(
  (f) => `family=${f.name.replace(/ /g, '+')}:wght@400;700`
).join('&')}&display=swap`;

const FontLibraryContent = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<FontCategory | null>(null);
  const [sampleText, setSampleText] = useState('The quick brown fox jumps over the lazy dog');
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    if (document.getElementById('font-library-stylesheet')) return;
    const link = document.createElement('link');
    link.id = 'font-library-stylesheet';
    link.rel = 'stylesheet';
    link.href = GOOGLE_FONTS_HREF;
    document.head.appendChild(link);
  }, []);

  const filtered = useMemo(() => {
    return FONTS.filter((f) => {
      const matchesQuery = f.name.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = !category || f.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  const handleCopy = (name: string) => {
    const css = `font-family: '${name}', ${FONTS.find((f) => f.name === name)?.category === 'Monospace' ? 'monospace' : FONTS.find((f) => f.name === name)?.category === 'Serif' ? 'serif' : 'sans-serif'};`;
    navigator.clipboard.writeText(css);
    setCopied(name);
    setTimeout(() => setCopied(null), 1200);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
        <TextField
          placeholder="Search fonts…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          fullWidth
          size="small"
          InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }}
        />
        <TextField
          placeholder="Type your own preview text…"
          value={sampleText}
          onChange={(e) => setSampleText(e.target.value)}
          fullWidth
          size="small"
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        <Chip label="All" color={category === null ? 'primary' : 'default'} variant={category === null ? 'filled' : 'outlined'} onClick={() => setCategory(null)} />
        {CATEGORIES.map((c) => (
          <Chip key={c} label={c} color={category === c ? 'primary' : 'default'} variant={category === c ? 'filled' : 'outlined'} onClick={() => setCategory(c)} />
        ))}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {filtered.map((f) => (
          <Paper key={f.name} variant="outlined" sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography variant="caption" color="text.secondary">{f.name} · {f.category}</Typography>
              <Typography
                sx={{
                  fontFamily: `'${f.name}', ${f.category === 'Monospace' ? 'monospace' : f.category === 'Serif' ? 'serif' : 'sans-serif'}`,
                  fontSize: '1.5rem',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {sampleText || 'The quick brown fox jumps over the lazy dog'}
              </Typography>
            </Box>
            <IconButton onClick={() => handleCopy(f.name)} size="small" title="Copy CSS">
              <ContentCopyIcon fontSize="small" />
            </IconButton>
            {copied === f.name && <Typography variant="caption" color="success.main">Copied!</Typography>}
          </Paper>
        ))}
        {filtered.length === 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
            No fonts match your search.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

const FontLibrary = () => {
  const content = (
    <>
      <Typography variant="h2">Font Library</Typography>
      <Typography variant="body1">
        Browse a curated library of Google Fonts across Sans-serif, Serif, Display, Handwriting, and
        Monospace categories. Preview each one with your own text and copy the CSS to use it instantly.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Search by name or filter by category, then type your own text into the preview box to see how
        every font renders it. Click the copy icon next to a font to grab its <code>font-family</code>{' '}
        CSS declaration.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Typing your brand name into the preview box and filtering to &quot;Display&quot; lets you
        quickly compare bold headline fonts like Bebas Neue, Anton, and Archivo Black side by side.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Choosing a heading and body font pairing for a website.</li>
          <li>Previewing how a logotype or brand name looks in different typefaces.</li>
          <li>Finding a free Google Font as an alternative to a paid typeface.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Are these fonts free to use?</Typography>
      <Typography variant="body1">
        Yes — every font listed here is hosted on Google Fonts and free for personal and commercial use.
      </Typography>
      <Typography variant="h3">How do I actually add a font to my website?</Typography>
      <Typography variant="body1">
        Copy the <code>font-family</code> CSS from this tool, then include the matching Google Fonts{' '}
        <code>&lt;link&gt;</code> tag (from fonts.google.com) in your page&apos;s <code>&lt;head&gt;</code>{' '}
        so the browser loads the font file.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      url="/tools/font-library"
      content={content}
    >
      <FontLibraryContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default FontLibrary;
