'use client';

import { useRef, useState } from 'react';
import {
  Box, Typography, Button, Card, IconButton, Alert, Snackbar, Popover, TextField, Slider,
  Tooltip, CircularProgress,
} from '@mui/material';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { PDFDocument, StandardFonts, rgb, degrees } from '@cantoo/pdf-lib';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';
import { loadPdfJsDocument, renderPageThumbnail } from './pdfThumbnails';

const THUMB_WIDTH = 180;
const DEFAULT_PAGE_SIZE = { width: 595, height: 842 }; // A4 in points, used only if a blank page has no neighbor to match

interface SourceDoc {
  id: number;
  pdfLibDoc: PDFDocument;
}

interface PageEntry {
  id: string;
  kind: 'page' | 'blank';
  sourceDocId?: number;
  pageIndex?: number;
  rotation: number;
  thumbnailUrl?: string;
  size: { width: number; height: number };
}

interface Watermark {
  enabled: boolean;
  text: string;
  opacity: number;
}

let nextId = 1;
const newId = () => String(nextId++);

const PdfEditorContent = () => {
  const [sourceDocs, setSourceDocs] = useState<SourceDoc[]>([]);
  const [pageEntries, setPageEntries] = useState<PageEntry[]>([]);
  const [error, setError] = useState('');
  const [loadingMessage, setLoadingMessage] = useState('');
  const [exporting, setExporting] = useState(false);
  const [undoSnack, setUndoSnack] = useState<{ entry: PageEntry; index: number } | null>(null);
  const [watermark, setWatermark] = useState<Watermark>({ enabled: false, text: 'CONFIDENTIAL', opacity: 0.25 });
  const [watermarkAnchor, setWatermarkAnchor] = useState<HTMLElement | null>(null);
  const dragIndexRef = useRef<number | null>(null);
  const mergeInputRef = useRef<HTMLInputElement>(null);

  const { unlock, dialog } = usePdfPasswordUnlock();

  const loadFileIntoEntries = async (file: File): Promise<PageEntry[]> => {
    const bytes = await readFileAsArrayBuffer(file);
    const pdfLibDoc = await unlock(bytes);
    const pdfJsDoc = await loadPdfJsDocument(bytes);
    const sourceDocId = nextId++;
    setSourceDocs((prev) => [...prev, { id: sourceDocId, pdfLibDoc }]);

    const entries: PageEntry[] = [];
    const pageCount = pdfLibDoc.getPageCount();
    for (let i = 0; i < pageCount; i++) {
      setLoadingMessage(`Rendering page ${i + 1} of ${pageCount}...`);
      const thumb = await renderPageThumbnail(pdfJsDoc, i + 1, THUMB_WIDTH);
      entries.push({
        id: newId(),
        kind: 'page',
        sourceDocId,
        pageIndex: i,
        rotation: 0,
        thumbnailUrl: thumb.url,
        size: { width: thumb.width, height: thumb.height },
      });
    }
    return entries;
  };

  const handleUpload = async (files: File[]) => {
    const file = files[0];
    if (!file) return;
    setError('');
    setLoadingMessage('Loading PDF...');
    try {
      const entries = await loadFileIntoEntries(file);
      setPageEntries(entries);
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) {
        setError('Could not open this file. Make sure it is a valid PDF.');
      }
    } finally {
      setLoadingMessage('');
    }
  };

  const handleMergeFiles = async (files: File[]) => {
    const file = files[0];
    if (!file) return;
    setError('');
    setLoadingMessage('Loading PDF to merge...');
    try {
      const entries = await loadFileIntoEntries(file);
      setPageEntries((prev) => [...prev, ...entries]);
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) {
        setError('Could not open the file to merge. Make sure it is a valid PDF.');
      }
    } finally {
      setLoadingMessage('');
    }
  };

  const rotatePage = (id: string) => {
    setPageEntries((prev) => prev.map((entry) => (
      entry.id === id ? { ...entry, rotation: (entry.rotation + 90) % 360 } : entry
    )));
  };

  const deletePage = (id: string) => {
    setPageEntries((prev) => {
      const index = prev.findIndex((entry) => entry.id === id);
      if (index === -1) return prev;
      setUndoSnack({ entry: prev[index], index });
      return prev.filter((entry) => entry.id !== id);
    });
  };

  const undoDelete = () => {
    if (!undoSnack) return;
    setPageEntries((prev) => {
      const next = [...prev];
      next.splice(undoSnack.index, 0, undoSnack.entry);
      return next;
    });
    setUndoSnack(null);
  };

  const insertBlankAfter = (afterId: string) => {
    setPageEntries((prev) => {
      const index = prev.findIndex((entry) => entry.id === afterId);
      const neighbor = prev[index];
      const size = neighbor ? { width: neighbor.size.width, height: neighbor.size.height } : DEFAULT_PAGE_SIZE;
      const blank: PageEntry = { id: newId(), kind: 'blank', rotation: 0, size };
      const next = [...prev];
      next.splice(index + 1, 0, blank);
      return next;
    });
  };

  const handleDragStart = (index: number) => { dragIndexRef.current = index; };
  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); };
  const handleDrop = (index: number) => {
    const from = dragIndexRef.current;
    dragIndexRef.current = null;
    if (from === null || from === index) return;
    setPageEntries((prev) => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(index, 0, moved);
      return next;
    });
  };

  const handleExport = async () => {
    setError('');
    if (pageEntries.length === 0) { setError('Add at least one page before exporting.'); return; }
    setExporting(true);
    try {
      const output = await PDFDocument.create();
      for (const entry of pageEntries) {
        if (entry.kind === 'blank') {
          output.addPage([entry.size.width, entry.size.height]);
        } else {
          const source = sourceDocs.find((d) => d.id === entry.sourceDocId);
          if (!source || entry.pageIndex === undefined) continue;
          const [copied] = await output.copyPages(source.pdfLibDoc, [entry.pageIndex]);
          if (entry.rotation) {
            copied.setRotation(degrees((copied.getRotation().angle + entry.rotation) % 360));
          }
          output.addPage(copied);
        }
      }

      if (watermark.enabled && watermark.text.trim()) {
        const font = await output.embedFont(StandardFonts.HelveticaBold);
        output.getPages().forEach((page) => {
          const { width, height } = page.getSize();
          const size = Math.min(width, height) / 8;
          const textWidth = font.widthOfTextAtSize(watermark.text, size);
          page.drawText(watermark.text, {
            x: width / 2 - textWidth / 2,
            y: height / 2,
            size,
            font,
            color: rgb(0.5, 0.5, 0.5),
            opacity: watermark.opacity,
            rotate: degrees(45),
          });
        });
      }

      const bytes = await output.save();
      downloadBytes(bytes, 'edited.pdf');
    } catch {
      setError('Could not export this PDF.');
    } finally {
      setExporting(false);
    }
  };

  const hasPages = pageEntries.length > 0;

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
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center', mb: 3, mt: hasPages ? 0 : 2 }}>
            <Button startIcon={<UploadFileIcon />} variant="outlined" onClick={() => mergeInputRef.current?.click()}>
              Merge Another PDF
            </Button>
            <input
              ref={mergeInputRef}
              type="file"
              accept="application/pdf"
              hidden
              onChange={(e) => { const f = Array.from(e.target.files ?? []); handleMergeFiles(f); e.target.value = ''; }}
            />
            <Button
              startIcon={<BrandingWatermarkIcon />}
              variant={watermark.enabled ? 'contained' : 'outlined'}
              onClick={(e) => setWatermarkAnchor(e.currentTarget)}
            >
              {watermark.enabled ? 'Watermark On' : 'Add Watermark'}
            </Button>
            <Box sx={{ flex: 1 }} />
            <Button
              startIcon={exporting ? <CircularProgress size={18} color="inherit" /> : <FileDownloadIcon />}
              variant="contained"
              size="large"
              disabled={exporting}
              onClick={handleExport}
            >
              {exporting ? 'Exporting...' : 'Export PDF'}
            </Button>
          </Box>

          <Popover
            open={!!watermarkAnchor}
            anchorEl={watermarkAnchor}
            onClose={() => setWatermarkAnchor(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          >
            <Box sx={{ p: 3, width: 280 }}>
              <TextField
                fullWidth
                label="Watermark text"
                value={watermark.text}
                onChange={(e) => setWatermark((w) => ({ ...w, text: e.target.value, enabled: true }))}
                sx={{ mb: 2 }}
              />
              <Typography gutterBottom variant="body2">Opacity: {Math.round(watermark.opacity * 100)}%</Typography>
              <Slider
                value={watermark.opacity}
                min={0.05}
                max={0.6}
                step={0.05}
                onChange={(_, v) => setWatermark((w) => ({ ...w, opacity: v as number }))}
              />
              <Button
                fullWidth
                sx={{ mt: 1 }}
                color={watermark.enabled ? 'error' : 'primary'}
                onClick={() => setWatermark((w) => ({ ...w, enabled: !w.enabled }))}
              >
                {watermark.enabled ? 'Remove Watermark' : 'Apply Watermark'}
              </Button>
            </Box>
          </Popover>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: `repeat(auto-fill, minmax(${THUMB_WIDTH}px, 1fr))`,
              gap: 2,
            }}
          >
            {pageEntries.map((entry, index) => (
              <Card
                key={entry.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(index)}
                variant="outlined"
                sx={{ p: 1, cursor: 'grab', position: 'relative', display: 'flex', flexDirection: 'column', gap: 0.5 }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    aspectRatio: `${entry.size.width} / ${entry.size.height}`,
                    bgcolor: '#fff',
                    border: '1px solid',
                    borderColor: 'divider',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {entry.kind === 'page' ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={entry.thumbnailUrl}
                      alt={`Page ${index + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'contain', transform: `rotate(${entry.rotation}deg)` }}
                    />
                  ) : (
                    <Typography variant="caption" color="text.secondary">Blank Page</Typography>
                  )}

                  {watermark.enabled && watermark.text.trim() && (
                    <Typography
                      sx={{
                        position: 'absolute',
                        color: 'rgba(128,128,128,1)',
                        opacity: watermark.opacity,
                        transform: 'rotate(-45deg)',
                        fontWeight: 'bold',
                        whiteSpace: 'nowrap',
                        pointerEvents: 'none',
                      }}
                    >
                      {watermark.text}
                    </Typography>
                  )}
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="caption" color="text.secondary">{index + 1}</Typography>
                  <Box>
                    {entry.kind === 'page' && (
                      <Tooltip title="Rotate">
                        <IconButton size="small" onClick={() => rotatePage(entry.id)}><RotateRightIcon fontSize="small" /></IconButton>
                      </Tooltip>
                    )}
                    <Tooltip title="Insert blank page after">
                      <IconButton size="small" onClick={() => insertBlankAfter(entry.id)}><AddBoxIcon fontSize="small" /></IconButton>
                    </Tooltip>
                    <Tooltip title="Delete page">
                      <IconButton size="small" onClick={() => deletePage(entry.id)}><DeleteIcon fontSize="small" /></IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </Card>
            ))}
          </Box>
        </>
      )}

      <Snackbar
        open={!!undoSnack}
        autoHideDuration={5000}
        onClose={() => setUndoSnack(null)}
        message="Page deleted"
        action={<Button color="inherit" size="small" onClick={undoDelete}>UNDO</Button>}
      />
    </Box>
  );
};

const PdfEditor = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the PDF Editor</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload a PDF to see every page as a thumbnail.</li>
          <li>Hover any page for its controls: <strong>rotate</strong>, <strong>delete</strong>, or <strong>insert a blank page</strong> right after it. Drag a page to reorder it.</li>
          <li>Use <strong>Merge Another PDF</strong> to append a second file&apos;s pages to the end.</li>
          <li>Use <strong>Add Watermark</strong> to stamp text diagonally across every page — the preview updates live.</li>
          <li>Click <strong>Export PDF</strong> to download the result.</li>
        </ul>
      </Box>

      <Typography variant="h2">Password-Protected PDFs</Typography>
      <Typography variant="body1">
        If you upload a locked PDF, you&apos;ll be prompted for its password before it opens. The password is
        only used in your browser to decrypt the file — it&apos;s never sent anywhere.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Upload a 5-page scanned form, rotate page 3 which came out sideways, delete a blank page 4, insert a
        blank cover page at the front by dragging it up, and export — all without leaving the page.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Cleaning up a scanned document: fixing rotation, removing blank pages, reordering.</li>
          <li>Combining two PDFs and marking the result &quot;DRAFT&quot; or &quot;CONFIDENTIAL&quot; in one pass.</li>
          <li>Unlocking a password-protected PDF you need to edit.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Is my file uploaded anywhere?</strong> No — everything, including password decryption, happens locally in your browser.</li>
          <li><strong>Can I undo a page deletion?</strong> Yes, an &quot;Undo&quot; option appears briefly after deleting a page.</li>
          <li><strong>What size is an inserted blank page?</strong> It matches the page right before it, so the document stays consistent.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell
      url="/tools/pdf-editor"
      content={content}
    >
      <PdfEditorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfEditor;
