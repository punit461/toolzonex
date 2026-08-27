'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, Paper, TextField, CircularProgress } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { readFileAsArrayBuffer } from './pdfUtils';
import { loadPdfJsDocument } from './pdfThumbnails';

interface KeywordResult {
  keyword: string;
  count: number;
  frequency: string;
}

const PdfKeywordFrequencyContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [keywords, setKeywords] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [results, setResults] = useState<KeywordResult[] | null>(null);

  const handleAnalyze = async () => {
    setError('');
    setResults(null);
    if (!file) { setError('Choose a PDF file first.'); return; }
    const keywordList = keywords.split(',').map((k) => k.trim()).filter(Boolean);
    if (keywordList.length === 0) { setError('Enter at least one keyword, separated by commas.'); return; }
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
      const totalWords = fullText ? fullText.split(/\s+/).length : 0;
      const lowerText = fullText.toLowerCase();

      const keywordResults: KeywordResult[] = keywordList.map((kw) => {
        const lowerKw = kw.toLowerCase();
        const words = lowerText.split(/\s+/);
        let count = 0;
        for (let i = 0; i <= words.length - lowerKw.split(/\s+/).length; i++) {
          const slice = words.slice(i, i + lowerKw.split(/\s+/).length).join(' ');
          if (slice === lowerKw) count++;
        }
        const frequency = totalWords > 0 ? ((count / totalWords) * 100).toFixed(3) : '0.000';
        return { keyword: kw, count, frequency: `${frequency}%` };
      });

      setResults(keywordResults);
    } catch {
      setError('Could not read this file. Make sure it is a valid PDF.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box>
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setResults(null); }} label="PDF file" selectedNames={file ? [file.name] : []} />

      <TextField
        fullWidth
        label="Keywords (comma-separated)"
        placeholder="e.g. revenue, growth, Q3 2024"
        value={keywords}
        onChange={(e) => { setKeywords(e.target.value); setResults(null); }}
        sx={{ mt: 3 }}
      />

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleAnalyze} disabled={busy || !file || !keywords.trim()}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />Searching...</> : 'Find Keyword Frequency'}
      </Button>

      {results && (
        <Paper variant="outlined" sx={{ mt: 3, p: 2.5 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Keyword Results</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' }, gap: 2 }}>
            {results.map((r) => (
              <Box key={r.keyword}>
                <Typography variant="caption" color="text.secondary">Keyword</Typography>
                <Typography variant="body1" fontWeight="bold">"{r.keyword}"</Typography>
                <Typography variant="caption" color="text.secondary">Occurrences</Typography>
                <Typography variant="h6">{r.count.toLocaleString()}</Typography>
                <Typography variant="caption" color="text.secondary">Frequency</Typography>
                <Typography variant="body2" color="text.secondary">{r.frequency}</Typography>
              </Box>
            ))}
          </Box>
        </Paper>
      )}
    </Box>
  );
};

const PdfKeywordFrequency = () => {
  const content = (
    <>
      <Typography variant="h2">How to Find Keyword Frequency in a PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to search.</li>
          <li>Enter one or more keywords, separated by commas.</li>
          <li>Click <strong>Find Keyword Frequency</strong> to count how often each keyword appears in the document.</li>
          <li>See the count and percentage of total words for each keyword in the results panel.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 5,000-word annual report where &quot;revenue&quot; appears 24 times gives a frequency of 0.480%. Searching
        for &quot;revenue, profit, loss&quot; shows each word&apos;s count and frequency side by side for quick comparison.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking how often a specific term appears in a contract or legal document.</li>
          <li>Analyzing keyword density for SEO-related content review.</li>
          <li>Finding how frequently a topic is mentioned across a report or whitepaper.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Is the search case-insensitive?</strong> Yes — &quot;Revenue&quot;, &quot;revenue&quot;, and &quot;REVENUE&quot; are all counted together.</li>
          <li><strong>Does it match partial words?</strong> No — keyword matching is by whole word. Searching for &quot;profit&quot; will not match &quot;profitable&quot;.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — all analysis happens entirely in your browser; the PDF never leaves your device.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell
      url="/tools/pdf-keyword-frequency"
      content={content}
    >
      <PdfKeywordFrequencyContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfKeywordFrequency;
