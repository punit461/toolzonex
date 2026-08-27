'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, Dialog, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';
import { loadPdfJsDocument, renderPageThumbnail } from './pdfThumbnails';

interface Thumb {
  url: string;
  width: number;
  height: number;
  page: number;
}

const PdfPreviewGeneratorContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [thumbnails, setThumbnails] = useState<Thumb[]>([]);
  const [selected, setSelected] = useState<Thumb | null>(null);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleAction = async () => {
    setError('');
    setThumbnails([]);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      await unlock(bytes);
      const pdf = await loadPdfJsDocument(new Uint8Array(bytes));
      const count = pdf.numPages;
      const thumbs: Thumb[] = [];
      for (let i = 1; i <= count; i++) {
        const thumb = await renderPageThumbnail(pdf, i, 200);
        thumbs.push({ ...thumb, page: i });
      }
      setThumbnails(thumbs);
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) {
        setError('Could not process this file.');
      }
    } finally { setBusy(false); }
  };

  return (
    <Box>
      {dialog}
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setThumbnails([]); }} label="PDF file" selectedNames={file ? [file.name] : []} />

      {thumbnails.length > 0 && (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 2, mt: 3 }}>
          {thumbnails.map((t) => (
            <Box key={t.page} sx={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => setSelected(t)}>
              <img src={t.url} alt={`Page ${t.page}`} style={{ maxWidth: '100%', border: '1px solid #ddd', borderRadius: 4 }} />
              <Typography variant="caption">Page {t.page}</Typography>
            </Box>
          ))}
        </Box>
      )}

      <Dialog open={!!selected} onClose={() => setSelected(null)} maxWidth="lg" fullWidth>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
          <IconButton onClick={() => setSelected(null)}><CloseIcon /></IconButton>
        </Box>
        {selected && (
          <Box sx={{ textAlign: 'center', p: 2 }}>
            <img src={selected.url} alt={`Page ${selected.page}`} style={{ maxWidth: '100%', maxHeight: '70vh' }} />
            <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>Page {selected.page}</Typography>
          </Box>
        )}
      </Dialog>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleAction} disabled={busy || !file}>
        {busy ? 'Generating...' : 'Generate Preview'}
      </Button>
    </Box>
  );
};

const PdfPreviewGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Preview a PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload any PDF file using the dropzone above.</li>
          <li>Click <strong>Generate Preview</strong> — every page is rendered as a thumbnail image.</li>
          <li>Browse the grid of thumbnails to quickly scan through the document.</li>
          <li>Click any thumbnail to open a larger, full-page preview in a lightbox.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        You receive a 50-page contract and need to check if the right sections are included before printing.
        Instead of scrolling through the entire document, this tool lays out every page as a small thumbnail so
        you can visually identify the content of each page in seconds. Click any page to zoom in for detail.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Quickly scanning a multi-page document to find a specific section or image.</li>
          <li>Previewing a presentation or report before sharing it with others.</li>
          <li>Verifying that all pages render correctly after converting from another format.</li>
          <li>Getting a visual overview of a PDF without opening a dedicated PDF reader.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Is my PDF uploaded to a server?</strong> No, the preview is generated entirely in your browser. The file never leaves your device.</li>
          <li><strong>Can I download individual pages?</strong> Yes, right-click any thumbnail to save it as an image.</li>
          <li><strong>Does it work with large PDFs?</strong> Yes, though very large documents with hundreds of pages may take longer to render all thumbnails.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-preview-generator" content={content}>
      <PdfPreviewGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfPreviewGenerator;
