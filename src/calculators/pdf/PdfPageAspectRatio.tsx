'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';

interface AspectRatioInfo {
  pageIndex: number;
  widthPt: number;
  heightPt: number;
  ratio: string;
  ratioNum: number;
  standardName: string;
  orientation: string;
}

const STANDARDS: { name: string; w: number; h: number }[] = [
  { name: 'A4', w: 595.28, h: 841.89 },
  { name: 'A3', w: 841.89, h: 1190.55 },
  { name: 'A5', w: 419.53, h: 595.28 },
  { name: 'Letter', w: 612, h: 792 },
  { name: 'Legal', w: 612, h: 1008 },
  { name: 'Tabloid', w: 792, h: 1224 },
  { name: 'Executive', w: 522, h: 756 },
  { name: 'B5 (JIS)', w: 516, h: 729 },
  { name: '16:9 (Widescreen)', w: 1344, h: 756 },
];

function matchStandard(w: number, h: number): string {
  for (const s of STANDARDS) {
    if (
      (Math.abs(w - s.w) < 3 && Math.abs(h - s.h) < 3) ||
      (Math.abs(w - s.h) < 3 && Math.abs(h - s.w) < 3)
    ) return s.name;
  }
  return 'Custom';
}

function gcd(a: number, b: number): number {
  a = Math.round(a * 100);
  b = Math.round(b * 100);
  while (b) { [a, b] = [b, a % b]; }
  return a;
}

const PdfPageAspectRatioContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [pages, setPages] = useState<AspectRatioInfo[] | null>(null);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleCheck = async () => {
    setError('');
    setPages(null);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);
      const results: AspectRatioInfo[] = doc.getPages().map((page, i) => {
        const { width, height } = page.getSize();
        const w = Math.min(width, height);
        const h = Math.max(width, height);
        const g = gcd(w, h);
        const ratioW = Math.round(w / g);
        const ratioH = Math.round(h / g);
        const isLandscape = width > height;
        return {
          pageIndex: i + 1,
          widthPt: Math.round(width * 100) / 100,
          heightPt: Math.round(height * 100) / 100,
          ratio: `${ratioW}:${ratioH}`,
          ratioNum: Math.round((width / height) * 1000) / 1000,
          standardName: matchStandard(width, height),
          orientation: isLandscape ? 'Landscape' : 'Portrait',
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
            {pages.length} page{pages.length !== 1 ? 's' : ''} analysed
          </Typography>
          <Box sx={{ overflowX: 'auto' }}>
            <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', minWidth: 500 }}>
              <Box component="thead">
                <Box component="tr">
                  {['Page', 'Width (pt)', 'Height (pt)', 'Aspect Ratio', 'Orientation', 'Standard'].map((h) => (
                    <Box key={h} component="th" sx={{ textAlign: 'left', pb: 1, borderBottom: '1px solid', borderColor: 'grey.300', fontWeight: 600, fontSize: '0.8rem', color: 'text.secondary', pr: 2 }}>{h}</Box>
                  ))}
                </Box>
              </Box>
              <Box component="tbody">
                {pages.map((p) => (
                  <Box key={p.pageIndex} component="tr" sx={{ '&:hover': { bgcolor: 'grey.50' } }}>
                    <Box component="td" sx={{ py: 1, pr: 2, fontSize: '0.9rem' }}>{p.pageIndex}</Box>
                    <Box component="td" sx={{ py: 1, pr: 2, fontSize: '0.9rem', fontFamily: 'monospace' }}>{p.widthPt}</Box>
                    <Box component="td" sx={{ py: 1, pr: 2, fontSize: '0.9rem', fontFamily: 'monospace' }}>{p.heightPt}</Box>
                    <Box component="td" sx={{ py: 1, pr: 2, fontSize: '0.9rem', fontFamily: 'monospace', fontWeight: 600 }}>{p.ratio}</Box>
                    <Box component="td" sx={{ py: 1, pr: 2, fontSize: '0.9rem' }}>{p.orientation}</Box>
                    <Box component="td" sx={{ py: 1, fontSize: '0.9rem' }}>{p.standardName}</Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      )}

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleCheck} disabled={busy || !file}>
        {busy ? 'Analysing...' : 'Check Aspect Ratios'}
      </Button>
    </Box>
  );
};

const PdfPageAspectRatio = () => {
  const content = (
    <>
      <Typography variant="h2">How to Check PDF Page Aspect Ratios</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to inspect.</li>
          <li>Click <strong>Check Aspect Ratios</strong> to see the width-to-height ratio for every page.</li>
          <li>Pages are also matched to standard sizes (A4, Letter, etc.) and labelled as portrait or landscape.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A standard A4 page has an aspect ratio of <strong>1:1.414</strong> (portrait), while US Letter is
        <strong> 1:1.294</strong>. A widescreen presentation PDF might show <strong>16:9</strong> — helpful to know
        before printing or importing into design software.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Confirming whether a PDF uses A4 or Letter before printing in a different region.</li>
          <li>Detecting mixed page sizes in a batch-scanned document.</li>
          <li>Verifying aspect ratios before importing into presentation or layout software.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why does a page show as &quot;Custom&quot;?</strong> If the dimensions don&apos;t match any built-in standard (A4, A3, A5, Letter, Legal, Tabloid, etc.) within a few points, the page is labelled &quot;Custom&quot;.</li>
          <li><strong>What is the gcd-based ratio?</strong> The tool simplifies the width-to-height relationship to the smallest whole-number ratio (e.g. 1:1.414 becomes 1:1.414 as a decimal, or simplified to 707:1000).</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — all analysis happens entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-page-aspect-ratio" content={content}>
      <PdfPageAspectRatioContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfPageAspectRatio;
