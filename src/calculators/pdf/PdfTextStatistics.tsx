'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, Paper, CircularProgress } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { readFileAsArrayBuffer } from './pdfUtils';
import { loadPdfJsDocument } from './pdfThumbnails';

interface TextStats {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  avgWordsPerSentence: number;
  pages: number;
}

const PdfTextStatisticsContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<TextStats | null>(null);

  const handleAnalyze = async () => {
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
      const characters = fullText.length;
      const charactersNoSpaces = fullText.replace(/\s/g, '').length;
      const sentences = fullText ? fullText.split(/[.!?]+/).filter((s) => s.trim().length > 0).length : 0;
      const paragraphs = fullText ? fullText.split(/\n\s*\n|\n/).filter((p) => p.trim().length > 0).length : 0;
      const avgWordsPerSentence = sentences > 0 ? Math.round((words / sentences) * 10) / 10 : 0;

      setResult({
        words,
        characters,
        charactersNoSpaces,
        sentences,
        paragraphs,
        avgWordsPerSentence,
        pages: pdf.numPages,
      });
    } catch {
      setError('Could not read this file. Make sure it is a valid PDF.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box>
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setResult(null); }} label="PDF file" selectedNames={file ? [file.name] : []} />

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleAnalyze} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />Analyzing...</> : 'Analyze Text'}
      </Button>

      {result && (
        <Paper variant="outlined" sx={{ mt: 3, p: 2.5 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Text Statistics</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr 1fr' }, gap: 2 }}>
            {[
              { label: 'Words', value: result.words.toLocaleString() },
              { label: 'Characters', value: result.characters.toLocaleString() },
              { label: 'Characters (no spaces)', value: result.charactersNoSpaces.toLocaleString() },
              { label: 'Sentences', value: result.sentences.toLocaleString() },
              { label: 'Paragraphs', value: result.paragraphs.toLocaleString() },
              { label: 'Avg Words/Sentence', value: result.avgWordsPerSentence.toLocaleString() },
              { label: 'Pages', value: result.pages.toLocaleString() },
            ].map((stat) => (
              <Box key={stat.label}>
                <Typography variant="caption" color="text.secondary">{stat.label}</Typography>
                <Typography variant="h5">{stat.value}</Typography>
              </Box>
            ))}
          </Box>
        </Paper>
      )}
    </Box>
  );
};

const PdfTextStatistics = () => {
  const content = (
    <>
      <Typography variant="h2">How to Get PDF Text Statistics</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to analyze.</li>
          <li>Click <strong>Analyze Text</strong> to extract text from every page and compute statistics.</li>
          <li>View word count, character count, sentence count, paragraph count, and average words per sentence in the results panel.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 5-page research paper with 3,200 words and 180 sentences shows a word count of 3,200, sentence count of
        180, and an average of 17.8 words per sentence — useful for gauging readability at a glance.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Quickly checking the word count of a PDF report or article before submission.</li>
          <li>Analyzing text density across documents to compare brevity or verbosity.</li>
          <li>Estimating readability — shorter average sentence lengths tend to be easier to read.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does this count text in images or scanned pages?</strong> No — only the selectable text layer is extracted. Scanned PDFs without an OCR text layer will show zero words.</li>
          <li><strong>Are headers and footers included?</strong> Yes — every piece of selectable text on every page is counted.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — all analysis happens entirely in your browser; the PDF never leaves your device.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell
      url="/tools/pdf-text-statistics"
      content={content}
    >
      <PdfTextStatisticsContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfTextStatistics;
