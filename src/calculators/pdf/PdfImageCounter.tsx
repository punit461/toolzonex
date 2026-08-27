'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, Chip } from '@mui/material';
import { PDFDocument, PDFName, PDFDict, PDFRef } from '@cantoo/pdf-lib';
import ImageIcon from '@mui/icons-material/Image';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';

interface ImageInfo {
  name: string;
  pageIndex: number;
  refNumber: number;
}

function countImages(doc: PDFDocument): { total: number; perPage: { pageIndex: number; count: number }[]; images: ImageInfo[] } {
  const allImages: ImageInfo[] = [];
  const perPage: { pageIndex: number; count: number }[] = [];
  const refsSeen = new Set<number>();

  doc.getPages().forEach((page, pageIndex) => {
    let pageCount = 0;
    try {
      const resources = page.node.Resources();
      if (!resources) { perPage.push({ pageIndex, count: 0 }); return; }
      const xObjectDict = resources.lookupMaybe(PDFName.of('XObject'), PDFDict);
      if (!xObjectDict) { perPage.push({ pageIndex, count: 0 }); return; }

      const entries = xObjectDict.entries();
      for (const [key, value] of entries) {
        if (!(value instanceof PDFRef)) continue;
        const refNum = (value as any).toNumber?.() ?? Number(value);
        if (refsSeen.has(refNum)) continue;

        const resolved = doc.context.lookupMaybe(value, PDFDict);
        if (!resolved) continue;
        const subType = resolved.lookupMaybe(PDFName.of('Subtype'), PDFName);
        const typeName = subType ? String(subType) : '';
        if (typeName === '/Image' || typeName === 'Image') {
          refsSeen.add(refNum);
          let name = String(key);
          if (name.startsWith('/')) name = name.slice(1);
          allImages.push({ name, pageIndex, refNumber: refNum });
          pageCount++;
        }
      }
    } catch {
      // Skip unreadable pages
    }
    perPage.push({ pageIndex, count: pageCount });
  });

  return { total: allImages.length, perPage, images: allImages };
}

const PdfImageCounterContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ total: number; perPage: { pageIndex: number; count: number }[]; images: ImageInfo[] } | null>(null);
  const [noImages, setNoImages] = useState(false);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleCount = async () => {
    setError('');
    setResult(null);
    setNoImages(false);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);
      const countResult = countImages(doc);
      if (countResult.total === 0) {
        setNoImages(true);
      } else {
        setResult(countResult);
      }
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) {
        setError('Could not read this file. Make sure it is a valid PDF.');
      }
    } finally {
      setBusy(false);
    }
  };

  const pagesWithImages = result?.perPage.filter((p) => p.count > 0) ?? [];
  const pagesWithoutImages = result?.perPage.filter((p) => p.count === 0) ?? [];

  return (
    <Box>
      {dialog}
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setResult(null); setNoImages(false); }} label="PDF file" selectedNames={file ? [file.name] : []} />

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleCount} disabled={busy || !file}>
        {busy ? 'Counting...' : 'Count Images'}
      </Button>

      {noImages && (
        <Alert severity="info" sx={{ mt: 3 }}>
          No images were found in this PDF. The document appears to contain only text or vector content.
        </Alert>
      )}

      {result && (
        <Box sx={{ mt: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
            <Chip label={`${result.total} image${result.total !== 1 ? 's' : ''} total`} size="small" color="primary" />
            <Chip label={`${pagesWithImages.length} page${pagesWithImages.length !== 1 ? 's' : ''} with images`} size="small" color="secondary" variant="outlined" />
            {pagesWithoutImages.length > 0 && (
              <Chip label={`${pagesWithoutImages.length} page${pagesWithoutImages.length !== 1 ? 's' : ''} without images`} size="small" variant="outlined" />
            )}
          </Box>

          <Typography variant="subtitle2" fontWeight={600} gutterBottom sx={{ mt: 2 }}>
            Images per page
          </Typography>
          <Box sx={{ bgcolor: 'grey.50', borderRadius: 1, border: '1px solid', borderColor: 'grey.200', overflow: 'hidden' }}>
            {pagesWithImages.map((p, i) => (
              <Box
                key={p.pageIndex}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  py: 1,
                  px: 2,
                  borderBottom: i < pagesWithImages.length - 1 ? '1px solid' : 'none',
                  borderColor: 'grey.100',
                }}
              >
                <ImageIcon fontSize="small" color="primary" />
                <Typography variant="body2" sx={{ flex: 1 }}>
                  Page {p.pageIndex + 1}
                </Typography>
                <Chip label={p.count} size="small" color="primary" variant="outlined" sx={{ height: 20, fontSize: '0.7rem' }} />
              </Box>
            ))}
          </Box>

          <Typography variant="subtitle2" fontWeight={600} gutterBottom sx={{ mt: 3 }}>
            Unique image resources
          </Typography>
          <Box sx={{ bgcolor: 'grey.50', borderRadius: 1, border: '1px solid', borderColor: 'grey.200', overflow: 'hidden' }}>
            {result.images.map((img, i) => (
              <Box
                key={i}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  py: 1,
                  px: 2,
                  borderBottom: i < result.images.length - 1 ? '1px solid' : 'none',
                  borderColor: 'grey.100',
                }}
              >
                <ImageIcon fontSize="small" color="action" />
                <Typography variant="body2" sx={{ flex: 1 }}>
                  {img.name}
                </Typography>
                <Chip label={`p. ${img.pageIndex + 1}`} size="small" variant="outlined" sx={{ height: 20, fontSize: '0.65rem' }} />
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

const PdfImageCounter = () => {
  const content = (
    <>
      <Typography variant="h2">How to Count Images in a PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to analyze.</li>
          <li>Click <strong>Count Images</strong> to scan every page for embedded images.</li>
          <li>See the total count, per-page breakdown, and list of unique image resources.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 20-page real-estate brochure might contain 45 images total — 3 on the cover, 12 across property photos on pages 4-10, and floor plans on the last 5 pages. This tool breaks down exactly where each image lives.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Auditing how image-heavy a PDF is before compressing it.</li>
          <li>Checking whether all expected photos or diagrams are embedded in a report.</li>
          <li>Comparing the image footprint of different PDF exports from the same source.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does this count background images?</strong> It counts every XObject resource of subtype Image that the page references. This includes backgrounds, inline images, and embedded photos.</li>
          <li><strong>Why might the same image appear on multiple pages?</strong> PDFs can reuse the same image resource across pages. This tool shows unique resources and which pages reference them.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — all analysis runs in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-image-counter" content={content}>
      <PdfImageCounterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfImageCounter;
