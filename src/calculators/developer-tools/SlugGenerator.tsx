'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Button, TextareaAutosize, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const toSlug = (input: string): string =>
  input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');

const SlugGenerator = () => {
  const [input, setInput] = useState<string>('My Awesome Blog Post Title!');

  const slug = useMemo(() => toSlug(input), [input]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(slug);
    } catch {
      // clipboard not available
    }
  };

  const content = (
    <>
      <Typography variant="h2">How It Works</Typography>
      <Typography variant="body1">
        Type or paste any text and it is instantly converted into a URL slug. The process lowercases the text,
        replaces spaces and special characters with hyphens, collapses multiple hyphens into one, and trims
        leading/trailing hyphens.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        &quot;How to Build a Website in 2026!&quot; becomes
        <strong> how-to-build-a-website-in-2026</strong>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Creating clean, SEO-friendly URLs for blog posts and pages.</li>
          <li>Generating tidy slugs for CMS content and database records.</li>
          <li>Normalizing filenames and route identifiers.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Are uppercase letters preserved?</Typography>
      <Typography variant="body1">
        No — all letters are converted to lowercase to keep slugs consistent and case-insensitive.
      </Typography>
      <Typography variant="h3">What about non-English characters?</Typography>
      <Typography variant="body1">
        This slug generator focuses on ASCII. Accented and non-Latin characters are stripped, so consider
        transliterating them beforehand if you need to keep them.
      </Typography>
      <Typography variant="h3">Is the conversion real-time?</Typography>
      <Typography variant="body1">
        Yes — the slug updates as you type, with no button to press.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/slug-generator" content={content}>
      <Box>
        <Typography gutterBottom>Your Text</Typography>
        <TextareaAutosize
          minRows={6}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            width: '100%',
            padding: 12,
            fontFamily: 'inherit',
            fontSize: '1rem',
            lineHeight: 1.5,
            border: '1px solid #E5E5E5',
            borderRadius: 8,
            resize: 'vertical',
            boxSizing: 'border-box',
          }}
        />

        <Box sx={{ mt: 4 }}>
          <Typography gutterBottom>Generated Slug</Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={slug}
            inputProps={{ readOnly: true }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <Button onClick={copyToClipboard} disabled={!slug}>Copy</Button>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default SlugGenerator;
