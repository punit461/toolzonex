'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, Paper, CircularProgress, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { readFileAsArrayBuffer } from './pdfUtils';
import { loadPdfJsDocument } from './pdfThumbnails';

interface PageResult {
  pageNumber: number;
  blank: boolean;
  reason: string;
}

const DetectBlankPagesContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [results, setResults] = useState<PageResult[] | null>(null);

  const handleAction = async () => {
    setError('');
    setResults(null);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const pdfDoc = await loadPdfJsDocument(bytes);
      const pageResults: PageResult[] = [];

      for (let i = 1; i <= pdfDoc.numPages; i++) {
        const page = await pdfDoc.getPage(i);
        const textContent = await page.getTextContent();
        const hasText = textContent.items.length > 0;

        let mostlyWhite = false;
        if (!hasText) {
          const viewport = page.getViewport({ scale: 0.5 });
          const canvas = document.createElement('canvas');
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            await page.render({ canvas, viewport }).promise;
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            let whitePixels = 0;
            const totalPixels = data.length / 4;
            for (let p = 0; p < data.length; p += 4) {
              if (data[p] > 240 && data[p + 1] > 240 && data[p + 2] > 240) whitePixels++;
            }
            if (whitePixels / totalPixels > 0.98) mostlyWhite = true;
          }
        }

        const blank = !hasText && mostlyWhite;
        let reason = 'Contains text and/or images';
        if (!hasText && !mostlyWhite) reason = 'Contains images but no text';
        if (!hasText && mostlyWhite) reason = 'No text, mostly white content';
        if (hasText && !blank) reason = 'Contains text content';

        pageResults.push({ pageNumber: i, blank, reason });
      }

      setResults(pageResults);
    } catch {
      setError('Could not process this file. Make sure it is a valid PDF.');
    } finally {
      setBusy(false);
    }
  };

  const blankCount = results?.filter((r) => r.blank).length ?? 0;
  const totalCount = results?.length ?? 0;

  return (
    <Box>
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setResults(null); }} label="PDF file" selectedNames={file ? [file.name] : []} />

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleAction} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />Analyzing...</> : 'Detect Blank Pages'}
      </Button>

      {results && (
        <Paper sx={{ mt: 3, p: 3 }}>
          <Alert severity={blankCount > 0 ? 'warning' : 'success'} sx={{ mb: 2 }}>
            {blankCount > 0
              ? `Found ${blankCount} blank page${blankCount !== 1 ? 's' : ''} out of ${totalCount} total.`
              : `No blank pages detected in ${totalCount} page${totalCount !== 1 ? 's' : ''}.`}
          </Alert>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Page</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Reason</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.map((r) => (
                  <TableRow key={r.pageNumber}>
                    <TableCell>{r.pageNumber}</TableCell>
                    <TableCell>
                      <Chip label={r.blank ? 'Blank' : 'Not Blank'} color={r.blank ? 'warning' : 'success'} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell>{r.reason}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Box>
  );
};

const DetectBlankPages = () => {
  const content = (
    <>
      <Typography variant="h2">How to Detect Blank Pages in a PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to analyse.</li>
          <li>Click <strong>Detect Blank Pages</strong> — every page is checked for text content and visual content.</li>
          <li>Review the results table showing each page&apos;s status (blank or not) and the reason.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 50-page scanned document is analysed and the tool identifies 3 blank separator pages. The results
        table shows page numbers, with &quot;Blank — No text, mostly white content&quot; for empty pages and
        &quot;Not Blank — Contains text content&quot; for pages with data. No file is modified.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Auditing a scanned document before processing to identify empty separator pages.</li>
          <li>Checking whether a PDF has hidden blank pages that waste paper when printing.</li>
          <li>Reviewing a converted document for unexpected blank pages after format conversion.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How does it define &quot;blank&quot;?</strong> A page is blank if it has no text content and the rendered image is more than 98% white pixels. Pages with images but no text are reported as &quot;not blank.&quot;</li>
          <li><strong>Does this modify my PDF?</strong> No — this is a read-only analysis tool. No changes are made to the file.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — analysis runs entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/detect-blank-pages" content={content}>
      <DetectBlankPagesContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default DetectBlankPages;
