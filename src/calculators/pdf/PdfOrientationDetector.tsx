'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, Chip } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';

interface OrientationInfo {
  pageIndex: number;
  width: number;
  height: number;
  orientation: 'Portrait' | 'Landscape';
}

const PdfOrientationDetectorContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [pages, setPages] = useState<OrientationInfo[] | null>(null);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleDetect = async () => {
    setError('');
    setPages(null);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);
      const results: OrientationInfo[] = doc.getPages().map((page, i) => {
        const { width, height } = page.getSize();
        return {
          pageIndex: i + 1,
          width: Math.round(width * 100) / 100,
          height: Math.round(height * 100) / 100,
          orientation: width > height ? 'Landscape' : 'Portrait',
        };
      });
      setPages(results);
    } catch {
      setError('Could not read this file. Make sure it is a valid PDF.');
    } finally {
      setBusy(false);
    }
  };

  const portraitCount = pages?.filter((p) => p.orientation === 'Portrait').length ?? 0;
  const landscapeCount = pages?.filter((p) => p.orientation === 'Landscape').length ?? 0;

  return (
    <Box>
      {dialog}
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setPages(null); }} label="PDF file" selectedNames={file ? [file.name] : []} />

      {pages && (
        <Box sx={{ mt: 3 }}>
          <Box sx={{ display: 'flex', gap: 1.5, mb: 2, flexWrap: 'wrap' }}>
            <Chip label={`${pages.length} page${pages.length !== 1 ? 's' : ''}`} variant="outlined" />
            {portraitCount > 0 && <Chip label={`${portraitCount} Portrait`} color="primary" variant="outlined" />}
            {landscapeCount > 0 && <Chip label={`${landscapeCount} Landscape`} color="secondary" variant="outlined" />}
          </Box>

          <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse' }}>
            <Box component="thead">
              <Box component="tr">
                {['Page', 'Width (pt)', 'Height (pt)', 'Orientation'].map((h) => (
                  <Box key={h} component="th" sx={{ textAlign: 'left', pb: 1, borderBottom: '1px solid', borderColor: 'grey.300', fontWeight: 600, fontSize: '0.8rem', color: 'text.secondary' }}>{h}</Box>
                ))}
              </Box>
            </Box>
            <Box component="tbody">
              {pages.map((p) => (
                <Box key={p.pageIndex} component="tr" sx={{ '&:hover': { bgcolor: 'grey.50' } }}>
                  <Box component="td" sx={{ py: 1, pr: 2, fontSize: '0.9rem' }}>{p.pageIndex}</Box>
                  <Box component="td" sx={{ py: 1, pr: 2, fontSize: '0.9rem', fontFamily: 'monospace' }}>{p.width}</Box>
                  <Box component="td" sx={{ py: 1, pr: 2, fontSize: '0.9rem', fontFamily: 'monospace' }}>{p.height}</Box>
                  <Box component="td" sx={{ py: 1, fontSize: '0.9rem' }}>
                    <Chip
                      label={p.orientation}
                      size="small"
                      color={p.orientation === 'Portrait' ? 'primary' : 'secondary'}
                      variant="outlined"
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      )}

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleDetect} disabled={busy || !file}>
        {busy ? 'Detecting...' : 'Detect Orientation'}
      </Button>
    </Box>
  );
};

const PdfOrientationDetector = () => {
  const content = (
    <>
      <Typography variant="h2">How to Check if a PDF is Portrait or Landscape</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to inspect.</li>
          <li>Click <strong>Detect Orientation</strong> — each page is labelled as <strong>Portrait</strong> (taller than wide) or <strong>Landscape</strong> (wider than tall), with a summary of how many pages fall into each category.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 10-page PDF where pages 1-8 are Letter-sized in portrait orientation and pages 9-10 contain
        wide landscape charts will show &quot;8 Portrait, 2 Landscape&quot; in the summary — with each
        page listed individually so you can pinpoint exactly which pages differ.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Identifying landscape pages in a mostly-portrait document before bulk printing.</li>
          <li>Spotting orientation inconsistencies in a PDF assembled from multiple sources.</li>
          <li>Planning which pages to rotate before sending a document to a print shop.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What if width equals height?</strong> A perfectly square page (e.g. 500 x 500 pt) is classified as <strong>Portrait</strong> since it is not wider than it is tall.</li>
          <li><strong>Does this account for rotation?</strong> This tool checks the page&apos;s intrinsic dimensions, not any rotation metadata. If you need to check applied rotations, use the Rotation Detector instead.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — detection happens entirely in your browser; the PDF is never sent to a server.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell
      url="/tools/pdf-orientation-detector"
      content={content}
    >
      <PdfOrientationDetectorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfOrientationDetector;
