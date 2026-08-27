'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';

interface PageSizeInfo {
  pageIndex: number;
  widthPt: number;
  heightPt: number;
  widthIn: string;
  heightIn: string;
  widthMm: string;
  heightMm: string;
  standardName: string;
}

const STANDARDS: { name: string; wPt: number; hPt: number }[] = [
  { name: 'Letter', wPt: 612, hPt: 792 },
  { name: 'Legal', wPt: 612, hPt: 1008 },
  { name: 'Tabloid', wPt: 792, hPt: 1224 },
  { name: 'A4', wPt: 595, hPt: 842 },
  { name: 'A3', wPt: 842, hPt: 1190 },
  { name: 'A5', wPt: 420, hPt: 595 },
];

function matchStandard(wPt: number, hPt: number): string {
  for (const s of STANDARDS) {
    if (
      (Math.abs(wPt - s.wPt) < 2 && Math.abs(hPt - s.hPt) < 2) ||
      (Math.abs(wPt - s.hPt) < 2 && Math.abs(hPt - s.wPt) < 2)
    ) return s.name;
  }
  return 'Custom';
}

const PdfPageSizeDetectorContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [pages, setPages] = useState<PageSizeInfo[] | null>(null);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleDetect = async () => {
    setError('');
    setPages(null);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);
      const results: PageSizeInfo[] = doc.getPages().map((page, i) => {
        const { width, height } = page.getSize();
        return {
          pageIndex: i + 1,
          widthPt: Math.round(width * 100) / 100,
          heightPt: Math.round(height * 100) / 100,
          widthIn: (width / 72).toFixed(2),
          heightIn: (height / 72).toFixed(2),
          widthMm: (width * 25.4 / 72).toFixed(1),
          heightMm: (height * 25.4 / 72).toFixed(1),
          standardName: matchStandard(width, height),
        };
      });
      setPages(results);
    } catch {
      setError('Could not read this file. Make sure it is a valid PDF.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box>
      {dialog}
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setPages(null); }} label="PDF file" selectedNames={file ? [file.name] : []} />

      {pages && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {pages.length} page{pages.length !== 1 ? 's' : ''} detected
          </Typography>
          <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse' }}>
            <Box component="thead">
              <Box component="tr">
                {['Page', 'Points', 'Inches', 'mm', 'Standard'].map((h) => (
                  <Box key={h} component="th" sx={{ textAlign: 'left', pb: 1, borderBottom: '1px solid', borderColor: 'grey.300', fontWeight: 600, fontSize: '0.8rem', color: 'text.secondary' }}>{h}</Box>
                ))}
              </Box>
            </Box>
            <Box component="tbody">
              {pages.map((p) => (
                <Box key={p.pageIndex} component="tr" sx={{ '&:hover': { bgcolor: 'grey.50' } }}>
                  <Box component="td" sx={{ py: 1, pr: 2, fontSize: '0.9rem' }}>{p.pageIndex}</Box>
                  <Box component="td" sx={{ py: 1, pr: 2, fontSize: '0.9rem', fontFamily: 'monospace' }}>{p.widthPt} x {p.heightPt}</Box>
                  <Box component="td" sx={{ py: 1, pr: 2, fontSize: '0.9rem', fontFamily: 'monospace' }}>{p.widthIn} x {p.heightIn}</Box>
                  <Box component="td" sx={{ py: 1, pr: 2, fontSize: '0.9rem', fontFamily: 'monospace' }}>{p.widthMm} x {p.heightMm}</Box>
                  <Box component="td" sx={{ py: 1, fontSize: '0.9rem' }}>{p.standardName}</Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      )}

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleDetect} disabled={busy || !file}>
        {busy ? 'Detecting...' : 'Detect Page Sizes'}
      </Button>
    </Box>
  );
};

const PdfPageSizeDetector = () => {
  const content = (
    <>
      <Typography variant="h2">How to Check PDF Page Dimensions</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to inspect.</li>
          <li>Click <strong>Detect Page Sizes</strong> to see each page&apos;s width and height in points, inches, and millimetres, along with the closest standard size name (A4, Letter, etc.).</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A standard A4 document will show <code>595.28 x 841.89</code> points, which equals <code>8.27 x 11.69</code> inches
        or <code>210.0 x 297.0</code> mm — matched to the <strong>A4</strong> standard.
        A US Letter page will show <code>612 x 792</code> points (<code>8.50 x 11.00</code> inches) — matched to <strong>Letter</strong>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Confirming whether a PDF is A4 or Letter before sending it to a printer in a different region.</li>
          <li>Checking whether a batch of PDFs has mixed page sizes that could cause formatting issues.</li>
          <li>Verifying page dimensions before importing a PDF into design or publishing software.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What are PDF points?</strong> One PDF point equals 1/72 of an inch. Most standard page sizes are defined in points in the PDF specification.</li>
          <li><strong>Why does a page show as &quot;Custom&quot;?</strong> If the page dimensions don&apos;t match any of the built-in standards (A4, A3, A5, Letter, Legal, Tabloid) within 2 points, it is labelled &quot;Custom&quot;.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — size detection happens entirely in your browser; the PDF is never sent to a server.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell
      url="/tools/pdf-page-size-detector"
      content={content}
    >
      <PdfPageSizeDetectorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfPageSizeDetector;
