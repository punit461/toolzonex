'use client';

import { useState } from 'react';
import { Box, Typography, Button, Card, IconButton, Alert, CircularProgress, Tooltip } from '@mui/material';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import { PDFDocument, degrees } from '@cantoo/pdf-lib';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';
import { loadPdfJsDocument, renderPageThumbnail } from './pdfThumbnails';

const THUMB_WIDTH = 160;

interface PageEntry {
  pageIndex: number;
  thumbnailUrl: string;
  width: number;
  height: number;
  rotation: number;
}

const RotatePdfPagesContent = () => {
  const [fileName, setFileName] = useState('');
  const [sourceDoc, setSourceDoc] = useState<PDFDocument | null>(null);
  const [pages, setPages] = useState<PageEntry[]>([]);
  const [error, setError] = useState('');
  const [loadingMessage, setLoadingMessage] = useState('');
  const [exporting, setExporting] = useState(false);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleUpload = async (files: File[]) => {
    const file = files[0];
    if (!file) return;
    setError('');
    setSourceDoc(null);
    setPages([]);
    setLoadingMessage('Loading PDF...');
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);
      const pdfJsDoc = await loadPdfJsDocument(bytes);
      const pageCount = doc.getPageCount();
      const entries: PageEntry[] = [];
      for (let i = 0; i < pageCount; i++) {
        setLoadingMessage(`Rendering page ${i + 1} of ${pageCount}...`);
        const thumb = await renderPageThumbnail(pdfJsDoc, i + 1, THUMB_WIDTH);
        entries.push({ pageIndex: i, thumbnailUrl: thumb.url, width: thumb.width, height: thumb.height, rotation: 0 });
      }
      setFileName(file.name);
      setSourceDoc(doc);
      setPages(entries);
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) {
        setError('Could not open this file. Make sure it is a valid PDF.');
      }
    } finally {
      setLoadingMessage('');
    }
  };

  const rotatePage = (index: number, delta: number) => {
    setPages((prev) => prev.map((p, i) => (i === index ? { ...p, rotation: (p.rotation + delta + 360) % 360 } : p)));
  };

  const handleExport = async () => {
    setError('');
    if (!sourceDoc || pages.length === 0) { setError('Upload a PDF first.'); return; }
    setExporting(true);
    try {
      const output = await PDFDocument.create();
      const copied = await output.copyPages(sourceDoc, pages.map((p) => p.pageIndex));
      copied.forEach((page, i) => {
        const current = page.getRotation().angle;
        page.setRotation(degrees((current + pages[i].rotation) % 360));
        output.addPage(page);
      });
      const bytes = await output.save();
      downloadBytes(bytes, fileName.replace(/\.pdf$/i, '') + '-rotated-pages.pdf');
    } catch {
      setError('Could not export this PDF.');
    } finally {
      setExporting(false);
    }
  };

  const hasPages = pages.length > 0;
  const anyRotated = pages.some((p) => p.rotation !== 0);

  return (
    <Box>
      {dialog}

      {!hasPages && (
        <PdfFileDropzone onFilesSelected={handleUpload} label="PDF file" />
      )}

      {loadingMessage && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
          <CircularProgress size={20} />
          <Typography variant="body2" color="text.secondary">{loadingMessage}</Typography>
        </Box>
      )}

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      {hasPages && (
        <>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Rotate each page independently using its arrows, then download the result — pages you don&apos;t touch stay unchanged.
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: `repeat(auto-fill, minmax(${THUMB_WIDTH}px, 1fr))`,
              gap: 2,
              mb: 3,
            }}
          >
            {pages.map((entry, index) => (
              <Card key={entry.pageIndex} variant="outlined" sx={{ p: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Box
                  sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    aspectRatio: `${entry.width} / ${entry.height}`,
                    bgcolor: '#fff',
                    border: '1px solid',
                    borderColor: 'divider',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={entry.thumbnailUrl}
                    alt={`Page ${entry.pageIndex + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', transform: `rotate(${entry.rotation}deg)`, transition: 'transform 0.15s' }}
                  />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="caption" color="text.secondary">
                    Page {entry.pageIndex + 1}{entry.rotation !== 0 ? ` (${entry.rotation}°)` : ''}
                  </Typography>
                  <Box>
                    <Tooltip title="Rotate counter-clockwise 90°">
                      <IconButton size="small" onClick={() => rotatePage(index, -90)}>
                        <RotateLeftIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Rotate clockwise 90°">
                      <IconButton size="small" onClick={() => rotatePage(index, 90)}>
                        <RotateRightIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </Card>
            ))}
          </Box>

          <Button variant="contained" size="large" fullWidth onClick={handleExport} disabled={exporting || !anyRotated}>
            {exporting ? 'Preparing Download...' : 'Download PDF with Rotated Pages'}
          </Button>
        </>
      )}
    </Box>
  );
};

const RotatePdfPages = () => {
  const content = (
    <>
      <Typography variant="h2">How to Rotate Specific Pages in a PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF whose pages you want to rotate — every page appears as a thumbnail.</li>
          <li>Use the rotate-left / rotate-right buttons on each page to set its rotation independently, in 90&deg; steps.</li>
          <li>Click <strong>Download PDF with Rotated Pages</strong> — only the pages you rotated are changed; the rest stay as they were.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A scanned packet has pages 1&ndash;4 upright but page 5 (a landscape table) sideways — rotate only page 5
        by 90&deg; and leave the rest untouched, instead of rotating the entire document and turning the correctly
        oriented pages sideways.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Fixing a handful of sideways or upside-down pages in an otherwise correctly oriented scan.</li>
          <li>Rotating just a landscape chart or table page within a portrait report.</li>
          <li>Correcting individual pages after combining documents scanned in different orientations.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the regular Rotate PDF tool?</strong> Rotate PDF rotates every page in the document by the same angle. This tool lets you set a different rotation for each page individually, so you can fix just the pages that need it.</li>
          <li><strong>Can I rotate a page back to its original orientation?</strong> Yes — keep clicking rotate on that page until it reaches 0&deg; again, or refresh and re-upload the file.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — rotation happens entirely in your browser; the PDF is never sent to a server.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/rotate-pdf-pages" content={content}>
      <RotatePdfPagesContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RotatePdfPages;
