'use client';

import { useRef, useState } from 'react';
import { Box, Typography, Button, Card, IconButton, Alert, CircularProgress, Tooltip } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { PDFDocument } from '@cantoo/pdf-lib';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';
import { loadPdfJsDocument, renderPageThumbnail } from './pdfThumbnails';

const THUMB_WIDTH = 160;

interface PageEntry {
  id: string;
  pageIndex: number;
  thumbnailUrl: string;
  width: number;
  height: number;
}

let nextId = 1;

const ReorderPdfPagesContent = () => {
  const [fileName, setFileName] = useState('');
  const [sourceDoc, setSourceDoc] = useState<PDFDocument | null>(null);
  const [pages, setPages] = useState<PageEntry[]>([]);
  const [error, setError] = useState('');
  const [loadingMessage, setLoadingMessage] = useState('');
  const [exporting, setExporting] = useState(false);
  const dragIndexRef = useRef<number | null>(null);
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
        entries.push({ id: String(nextId++), pageIndex: i, thumbnailUrl: thumb.url, width: thumb.width, height: thumb.height });
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

  const moveTo = (from: number, to: number) => {
    if (to < 0 || to >= pages.length) return;
    setPages((prev) => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  };

  const handleDragStart = (index: number) => { dragIndexRef.current = index; };
  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); };
  const handleDrop = (index: number) => {
    const from = dragIndexRef.current;
    dragIndexRef.current = null;
    if (from === null || from === index) return;
    moveTo(from, index);
  };

  const handleExport = async () => {
    setError('');
    if (!sourceDoc || pages.length === 0) { setError('Upload a PDF first.'); return; }
    setExporting(true);
    try {
      const output = await PDFDocument.create();
      const copied = await output.copyPages(sourceDoc, pages.map((p) => p.pageIndex));
      copied.forEach((p) => output.addPage(p));
      const bytes = await output.save();
      downloadBytes(bytes, fileName.replace(/\.pdf$/i, '') + '-reordered.pdf');
    } catch {
      setError('Could not export this PDF.');
    } finally {
      setExporting(false);
    }
  };

  const hasPages = pages.length > 0;

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
            Drag a page to move it, or use the arrow buttons — then download the reordered PDF.
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
              <Card
                key={entry.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(index)}
                variant="outlined"
                sx={{ p: 1, cursor: 'grab', display: 'flex', flexDirection: 'column', gap: 0.5 }}
              >
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
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                  <DragIndicatorIcon sx={{ position: 'absolute', top: 4, right: 4, color: 'text.disabled' }} fontSize="small" />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="caption" color="text.secondary">
                    Position {index + 1} (was page {entry.pageIndex + 1})
                  </Typography>
                  <Box>
                    <Tooltip title="Move up">
                      <span>
                        <IconButton size="small" disabled={index === 0} onClick={() => moveTo(index, index - 1)}>
                          <ArrowUpwardIcon fontSize="small" />
                        </IconButton>
                      </span>
                    </Tooltip>
                    <Tooltip title="Move down">
                      <span>
                        <IconButton size="small" disabled={index === pages.length - 1} onClick={() => moveTo(index, index + 1)}>
                          <ArrowDownwardIcon fontSize="small" />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </Box>
                </Box>
              </Card>
            ))}
          </Box>

          <Button variant="contained" size="large" fullWidth onClick={handleExport} disabled={exporting}>
            {exporting ? 'Preparing Download...' : 'Download Reordered PDF'}
          </Button>
        </>
      )}
    </Box>
  );
};

const ReorderPdfPages = () => {
  const content = (
    <>
      <Typography variant="h2">How to Reorder PDF Pages</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF whose pages you want to rearrange — every page appears as a thumbnail.</li>
          <li>Drag a thumbnail to a new position, or use the up/down arrows on each page.</li>
          <li>Click <strong>Download Reordered PDF</strong> to save the result.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A scanned packet came out with its signature page first instead of last — drag that thumbnail to the
        end of the grid (or press the down arrow repeatedly) and download a copy with the pages back in the
        right order.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Moving a cover page, table of contents, or signature page into the correct spot.</li>
          <li>Fixing page order after a double-sided scan came out reversed.</li>
          <li>Rearranging slides or report sections before sharing a final PDF.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does this delete or rotate pages too?</strong> No — this tool only changes page order. For deleting, rotating, or combining pages, use the Delete PDF Pages, Rotate PDF, or PDF Editor tools.</li>
          <li><strong>Is there a page limit?</strong> No hard limit, but very large PDFs take longer to render thumbnails for since everything runs in your browser.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — reordering happens entirely in your browser; the PDF is never sent to a server.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell
      url="/tools/reorder-pdf-pages"
      content={content}
    >
      <ReorderPdfPagesContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ReorderPdfPages;
