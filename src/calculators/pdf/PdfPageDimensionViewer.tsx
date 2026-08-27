'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';

interface DimensionInfo {
  pageIndex: number;
  ptW: string;
  ptH: string;
  inW: string;
  inH: string;
  mmW: string;
  mmH: string;
  cmW: string;
  cmH: string;
}

const PdfPageDimensionViewerContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [pages, setPages] = useState<DimensionInfo[] | null>(null);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleCheck = async () => {
    setError('');
    setPages(null);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);
      const results: DimensionInfo[] = doc.getPages().map((page, i) => {
        const { width, height } = page.getSize();
        return {
          pageIndex: i + 1,
          ptW: width.toFixed(2),
          ptH: height.toFixed(2),
          inW: (width / 72).toFixed(2),
          inH: (height / 72).toFixed(2),
          mmW: (width * 25.4 / 72).toFixed(1),
          mmH: (height * 25.4 / 72).toFixed(1),
          cmW: (width * 2.54 / 72).toFixed(2),
          cmH: (height * 2.54 / 72).toFixed(2),
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
            {pages.length} page{pages.length !== 1 ? 's' : ''} — dimensions in four units
          </Typography>
          <Box sx={{ overflowX: 'auto' }}>
            <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
              <Box component="thead">
                <Box component="tr">
                  {['Page', 'Points (W × H)', 'Inches (W × H)', 'mm (W × H)', 'cm (W × H)'].map((h) => (
                    <Box key={h} component="th" sx={{ textAlign: 'left', pb: 1, borderBottom: '1px solid', borderColor: 'grey.300', fontWeight: 600, fontSize: '0.8rem', color: 'text.secondary', pr: 2 }}>{h}</Box>
                  ))}
                </Box>
              </Box>
              <Box component="tbody">
                {pages.map((p) => (
                  <Box key={p.pageIndex} component="tr" sx={{ '&:hover': { bgcolor: 'grey.50' } }}>
                    <Box component="td" sx={{ py: 1, pr: 2, fontSize: '0.9rem', fontWeight: 600 }}>{p.pageIndex}</Box>
                    <Box component="td" sx={{ py: 1, pr: 2, fontSize: '0.9rem', fontFamily: 'monospace' }}>{p.ptW} × {p.ptH}</Box>
                    <Box component="td" sx={{ py: 1, pr: 2, fontSize: '0.9rem', fontFamily: 'monospace' }}>{p.inW} × {p.inH}</Box>
                    <Box component="td" sx={{ py: 1, pr: 2, fontSize: '0.9rem', fontFamily: 'monospace' }}>{p.mmW} × {p.mmH}</Box>
                    <Box component="td" sx={{ py: 1, fontSize: '0.9rem', fontFamily: 'monospace' }}>{p.cmW} × {p.cmH}</Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      )}

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleCheck} disabled={busy || !file}>
        {busy ? 'Loading...' : 'View Dimensions'}
      </Button>
    </Box>
  );
};

const PdfPageDimensionViewer = () => {
  const content = (
    <>
      <Typography variant="h2">How to View PDF Page Dimensions</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to inspect.</li>
          <li>Click <strong>View Dimensions</strong> to see every page&apos;s width and height in four units: points, inches, millimetres, and centimetres.</li>
          <li>Compare dimensions across pages to spot inconsistent sizing.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A standard A4 page measures <strong>595.28 × 841.89</strong> points, which equals
        <strong> 8.27 × 11.69</strong> inches, <strong>210.0 × 297.0</strong> mm, or
        <strong> 21.00 × 29.70</strong> cm. US Letter shows <strong>612 × 792</strong> points
        (<strong>8.50 × 11.00</strong> inches).
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Getting exact page dimensions in the unit required by a printing service or design tool.</li>
          <li>Checking whether a PDF has mixed page sizes that could cause formatting issues.</li>
          <li>Verifying page dimensions before importing into layout or publishing software.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What is a PDF point?</strong> One PDF point equals 1/72 of an inch (approximately 0.353 mm). All standard page sizes in the PDF specification are defined in points.</li>
          <li><strong>Why are the dimensions in decimal form?</strong> PDF pages are defined in points, and converting to inches, mm, or cm inevitably produces fractional values — these are rounded to two decimal places.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — all processing happens entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-page-dimension-viewer" content={content}>
      <PdfPageDimensionViewerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfPageDimensionViewer;
