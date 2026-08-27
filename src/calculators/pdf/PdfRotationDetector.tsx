'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, Chip } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';

interface RotationInfo {
  pageIndex: number;
  angle: number;
}

const ANGLE_COLORS: Record<number, 'success' | 'warning' | 'error' | 'info'> = {
  0: 'success',
  90: 'info',
  180: 'warning',
  270: 'error',
};

const ANGLE_LABELS: Record<number, string> = {
  0: '0\u00b0 (upright)',
  90: '90\u00b0 clockwise',
  180: '180\u00b0 (upside-down)',
  270: '270\u00b0 clockwise (90\u00b0 CCW)',
};

const PdfRotationDetectorContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [pages, setPages] = useState<RotationInfo[] | null>(null);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleDetect = async () => {
    setError('');
    setPages(null);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);
      const results: RotationInfo[] = doc.getPages().map((page, i) => ({
        pageIndex: i + 1,
        angle: page.getRotation().angle,
      }));
      setPages(results);
    } catch {
      setError('Could not read this file. Make sure it is a valid PDF.');
    } finally {
      setBusy(false);
    }
  };

  const grouped = pages
    ? pages.reduce<Record<number, number>>((acc, p) => { acc[p.angle] = (acc[p.angle] || 0) + 1; return acc; }, {})
    : {};

  return (
    <Box>
      {dialog}
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setPages(null); }} label="PDF file" selectedNames={file ? [file.name] : []} />

      {pages && (
        <Box sx={{ mt: 3 }}>
          <Box sx={{ display: 'flex', gap: 1.5, mb: 2, flexWrap: 'wrap' }}>
            <Chip label={`${pages.length} page${pages.length !== 1 ? 's' : ''}`} variant="outlined" />
            {Object.entries(grouped).map(([angle, count]) => (
              <Chip
                key={angle}
                label={`${count}x ${ANGLE_LABELS[Number(angle)] ?? angle + '\u00b0'}`}
                color={ANGLE_COLORS[Number(angle)] ?? 'default'}
                variant="outlined"
              />
            ))}
          </Box>

          <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse' }}>
            <Box component="thead">
              <Box component="tr">
                {['Page', 'Rotation Angle', 'Description'].map((h) => (
                  <Box key={h} component="th" sx={{ textAlign: 'left', pb: 1, borderBottom: '1px solid', borderColor: 'grey.300', fontWeight: 600, fontSize: '0.8rem', color: 'text.secondary' }}>{h}</Box>
                ))}
              </Box>
            </Box>
            <Box component="tbody">
              {pages.map((p) => (
                <Box key={p.pageIndex} component="tr" sx={{ '&:hover': { bgcolor: 'grey.50' } }}>
                  <Box component="td" sx={{ py: 1, pr: 2, fontSize: '0.9rem' }}>{p.pageIndex}</Box>
                  <Box component="td" sx={{ py: 1, pr: 2, fontSize: '0.9rem' }}>
                    <Chip
                      label={`${p.angle}\u00b0`}
                      size="small"
                      color={ANGLE_COLORS[p.angle] ?? 'default'}
                      variant="outlined"
                    />
                  </Box>
                  <Box component="td" sx={{ py: 1, fontSize: '0.9rem' }}>{ANGLE_LABELS[p.angle] ?? 'Unknown'}</Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      )}

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleDetect} disabled={busy || !file}>
        {busy ? 'Detecting...' : 'Detect Rotation'}
      </Button>
    </Box>
  );
};

const PdfRotationDetector = () => {
  const content = (
    <>
      <Typography variant="h2">How to Check PDF Page Rotation</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to inspect.</li>
          <li>Click <strong>Detect Rotation</strong> — each page&apos;s rotation angle (0&deg;, 90&deg;, 180&deg;, or 270&deg;) is shown, with a summary grouped by angle.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 6-page PDF where three pages were scanned sideways will show &quot;0&deg; (upright)&quot; for the
        normal pages and &quot;90&deg; clockwise&quot; for the scanned ones — making it easy to decide which
        pages need rotating before printing or sharing.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Finding which pages in a large PDF have unexpected rotations before printing.</li>
          <li>Checking rotation metadata in a PDF assembled from multiple scanned documents.</li>
          <li>Verifying that a PDF editing tool applied the intended rotation to each page.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What does a 0&deg; rotation mean?</strong> The page is displayed upright, in its original orientation as defined in the PDF.</li>
          <li><strong>What is the difference between 90&deg; and 270&deg;?</strong> 90&deg; means the page was rotated one quarter-turn clockwise; 270&deg; is equivalent to a 90&deg; counter-clockwise rotation.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — rotation detection happens entirely in your browser; the PDF is never sent to a server.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell
      url="/tools/pdf-rotation-detector"
      content={content}
    >
      <PdfRotationDetectorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfRotationDetector;
