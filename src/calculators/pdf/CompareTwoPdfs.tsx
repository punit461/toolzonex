'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, CircularProgress, Paper, LinearProgress } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { readFileAsArrayBuffer } from './pdfUtils';
import { loadPdfJsDocument } from './pdfThumbnails';

interface ComparisonResult {
  pagesA: number;
  pagesB: number;
  similarity: number;
  differences: string[];
}

const CompareTwoPdfsContent = () => {
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<ComparisonResult | null>(null);

  const extractAllText = async (bytes: ArrayBuffer) => {
    const pdfDoc = await loadPdfJsDocument(bytes);
    const pages: string[] = [];
    for (let i = 1; i <= pdfDoc.numPages; i++) {
      const page = await pdfDoc.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items
        .map((item) => ('str' in item ? item.str : ''))
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim();
      pages.push(pageText);
    }
    return pages;
  };

  const handleCompare = async () => {
    setError('');
    setResult(null);
    if (!file1 || !file2) { setError('Upload both PDF files to compare.'); return; }
    setBusy(true);
    try {
      const [bytes1, bytes2] = await Promise.all([
        readFileAsArrayBuffer(file1),
        readFileAsArrayBuffer(file2),
      ]);
      const [pagesA, pagesB] = await Promise.all([
        extractAllText(bytes1),
        extractAllText(bytes2),
      ]);

      const textA = pagesA.join('\n');
      const textB = pagesB.join('\n');

      let matchCount = 0;
      const totalWords = Math.max(textA.split(/\s+/).length, textB.split(/\s+/).length, 1);
      const wordsA = textA.split(/\s+/);
      const wordsB = textB.split(/\s+/);
      const shorter = Math.min(wordsA.length, wordsB.length);
      for (let i = 0; i < shorter; i++) {
        if (wordsA[i] === wordsB[i]) matchCount++;
      }
      const similarity = totalWords > 0 ? Math.round((matchCount / totalWords) * 100) : 0;

      const differences: string[] = [];
      if (pagesA.length !== pagesB.length) {
        differences.push(`Page count differs: ${pagesA.length} vs ${pagesB.length}`);
      }
      for (let i = 0; i < Math.min(pagesA.length, pagesB.length); i++) {
        if (pagesA[i] !== pagesB[i]) {
          differences.push(`Page ${i + 1}: text content differs`);
        }
      }
      if (differences.length === 0) {
        differences.push('No text differences found across all pages.');
      }

      setResult({
        pagesA: pagesA.length,
        pagesB: pagesB.length,
        similarity: Math.min(similarity, 100),
        differences,
      });
    } catch {
      setError('Could not process one or both files. Make sure they are valid PDFs.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle2" gutterBottom>Original PDF</Typography>
          <PdfFileDropzone onFilesSelected={(files) => { setFile1(files[0] ?? null); setResult(null); }} label="First PDF" selectedNames={file1 ? [file1.name] : []} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle2" gutterBottom>Modified PDF</Typography>
          <PdfFileDropzone onFilesSelected={(files) => { setFile2(files[0] ?? null); setResult(null); }} label="Second PDF" selectedNames={file2 ? [file2.name] : []} />
        </Box>
      </Box>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleCompare} disabled={busy || !file1 || !file2}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />Comparing...</> : 'Compare PDFs'}
      </Button>

      {result && (
        <Paper sx={{ mt: 3, p: 3 }}>
          <Typography variant="h3" gutterBottom>Comparison Results</Typography>
          <Box sx={{ display: 'flex', gap: 4, mb: 3, flexWrap: 'wrap' }}>
            <Box>
              <Typography variant="body2" color="text.secondary">Original Pages</Typography>
              <Typography variant="h4">{result.pagesA}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">Modified Pages</Typography>
              <Typography variant="h4">{result.pagesB}</Typography>
            </Box>
            <Box sx={{ minWidth: 150 }}>
              <Typography variant="body2" color="text.secondary">Text Similarity</Typography>
              <Typography variant="h4">{result.similarity}%</Typography>
              <LinearProgress variant="determinate" value={result.similarity} sx={{ mt: 0.5 }} color={result.similarity > 80 ? 'success' : result.similarity > 50 ? 'warning' : 'error'} />
            </Box>
          </Box>
          <Typography variant="subtitle2" gutterBottom>Differences</Typography>
          <Box sx={{ typography: 'body1' }}>
            <ul>
              {result.differences.map((diff, i) => <li key={i}>{diff}</li>)}
            </ul>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

const CompareTwoPdfs = () => {
  const content = (
    <>
      <Typography variant="h2">How to Compare Two PDFs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the original PDF and the modified version side by side.</li>
          <li>Click <strong>Compare PDFs</strong> — the tool extracts text from both and analyses differences.</li>
          <li>Review the side-by-side page counts, text similarity score, and a list of page-level differences.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Uploading a contract draft and its revised version reveals which pages changed, how similar the text is overall,
        and whether the page count was altered — useful for spotting edits without manual side-by-side reading.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Verifying that only the expected sections were edited in a revised document.</li>
          <li>Spotting differences between two versions of a report or proposal before signing.</li>
          <li>Auditing changes across revisions of legal, academic, or financial documents.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does this compare images or formatting?</strong> No — the comparison is based on the text layer only. Visual differences (fonts, images, layout) are not detected.</li>
          <li><strong>How is similarity calculated?</strong> Word-by-word matching across both files produces a percentage of matching words relative to the total word count of both documents.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — both files are processed entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/compare-two-pdfs" content={content}>
      <CompareTwoPdfsContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CompareTwoPdfs;
