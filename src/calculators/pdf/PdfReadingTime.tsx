'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, Paper, CircularProgress } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { readFileAsArrayBuffer } from './pdfUtils';
import { loadPdfJsDocument } from './pdfThumbnails';

interface ReadingTimeResult {
  words: number;
  pages: number;
  minutes: number;
  hours: number;
  slowMinutes: number;
  fastMinutes: number;
}

const SLOW_WPM = 200;
const FAST_WPM = 250;

const PdfReadingTimeContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<ReadingTimeResult | null>(null);

  const handleCalculate = async () => {
    setError('');
    setResult(null);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const pdf = await loadPdfJsDocument(bytes);
      const allText: string[] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items
          .map((item) => ('str' in item ? item.str : ''))
          .join(' ');
        allText.push(pageText);
      }

      const fullText = allText.join(' ').replace(/\s+/g, ' ').trim();
      const words = fullText ? fullText.split(/\s+/).length : 0;

      const avgWpm = (SLOW_WPM + FAST_WPM) / 2;
      const minutes = Math.ceil(words / avgWpm);
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      const slowMinutes = Math.ceil(words / SLOW_WPM);
      const fastMinutes = Math.ceil(words / FAST_WPM);

      setResult({
        words,
        pages: pdf.numPages,
        minutes: remainingMinutes,
        hours,
        slowMinutes,
        fastMinutes,
      });
    } catch {
      setError('Could not read this file. Make sure it is a valid PDF.');
    } finally {
      setBusy(false);
    }
  };

  const formatTime = (mins: number, hrs: number) => {
    if (hrs === 0) return `${mins} min`;
    return `${hrs} hr ${mins} min`;
  };

  return (
    <Box>
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setResult(null); }} label="PDF file" selectedNames={file ? [file.name] : []} />

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleCalculate} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />Calculating...</> : 'Calculate Reading Time'}
      </Button>

      {result && (
        <Paper variant="outlined" sx={{ mt: 3, p: 2.5 }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography variant="caption" color="text.secondary">Estimated Reading Time</Typography>
            <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
              {result.hours > 0
                ? `${result.hours} hr ${result.minutes} min`
                : `${result.minutes} min`}
            </Typography>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr 1fr' }, gap: 2 }}>
            <Box>
              <Typography variant="caption" color="text.secondary">Total Words</Typography>
              <Typography variant="h6">{result.words.toLocaleString()}</Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">Total Pages</Typography>
              <Typography variant="h6">{result.pages}</Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">Reading Speed</Typography>
              <Typography variant="h6">{SLOW_WPM}–{FAST_WPM} wpm</Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">Slow Reader ({SLOW_WPM} wpm)</Typography>
              <Typography variant="h6">{formatTime(result.slowMinutes, Math.floor(result.slowMinutes / 60))}</Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">Average Reader ({Math.round((SLOW_WPM + FAST_WPM) / 2)} wpm)</Typography>
              <Typography variant="h6">{formatTime(result.minutes, result.hours)}</Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">Fast Reader ({FAST_WPM} wpm)</Typography>
              <Typography variant="h6">{formatTime(result.fastMinutes, Math.floor(result.fastMinutes / 60))}</Typography>
            </Box>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

const PdfReadingTime = () => {
  const content = (
    <>
      <Typography variant="h2">How to Calculate PDF Reading Time</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to time.</li>
          <li>Click <strong>Calculate Reading Time</strong> to extract text and estimate how long it takes to read.</li>
          <li>See your estimated reading time at three speeds: slow (200 wpm), average (225 wpm), and fast (250 wpm).</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 10,000-word whitepaper has roughly 44 minutes of average reading time — 50 minutes for a slow
        reader at 200 words per minute, and 40 minutes for a fast reader at 250 words per minute.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Deciding whether to read a PDF now or save it for later.</li>
          <li>Allocating time for required reading material before a meeting or class.</li>
          <li>Gauging how long a report or manual will take to review.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What words-per-minute speeds are used?</strong> Slow: 200 wpm, Average: 225 wpm, Fast: 250 wpm — based on typical adult reading speed research.</li>
          <li><strong>Does this include images and charts?</strong> No — only the text layer is counted. Time spent studying graphics or tables is not included.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — all calculation happens entirely in your browser; the PDF never leaves your device.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell
      url="/tools/pdf-reading-time"
      content={content}
    >
      <PdfReadingTimeContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfReadingTime;
