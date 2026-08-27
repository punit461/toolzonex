'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';
import { PDFDocument, PDFName, PDFDict } from '@cantoo/pdf-lib';

const RemovePdfImagesContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [removedCount, setRemovedCount] = useState<number | null>(null);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleAction = async () => {
    setError('');
    setRemovedCount(null);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);

      let totalRemoved = 0;

      for (const page of doc.getPages()) {
        try {
          const resources = page.node.Resources();
          if (!resources) continue;

          const xObjectDict = resources.lookupMaybe(PDFName.of('XObject'), PDFDict);
          if (!xObjectDict) continue;

          const keysToRemove: string[] = [];
          for (const [key, value] of xObjectDict.entries()) {
            try {
              const resolved = doc.context.lookupMaybe(value, PDFDict);
              if (!resolved) continue;
              const subType = resolved.lookupMaybe(PDFName.of('Subtype'), PDFName);
              const typeName = subType ? String(subType) : '';
              if (typeName === '/Image' || typeName === 'Image') {
                keysToRemove.push(String(key));
              }
            } catch { /* skip unresolvable refs */ }
          }

          for (const key of keysToRemove) {
            try {
              xObjectDict.delete(PDFName.of(key.startsWith('/') ? key : `/${key}`));
              totalRemoved++;
            } catch { /* skip */ }
          }
        } catch { /* skip unreadable pages */ }
      }

      setRemovedCount(totalRemoved);
      const output = await doc.save();
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-no-images.pdf');
    } catch {
      if (!(error)) setError('Could not process this file. The PDF may use an unsupported format.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box>
      {dialog}
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setRemovedCount(null); }} label="PDF file" selectedNames={file ? [file.name] : []} />
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      {removedCount !== null && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {removedCount === 0 ? 'No images found — the PDF was downloaded as-is.' : `${removedCount} image(s) removed. The text-only PDF has been downloaded.`}
        </Alert>
      )}
      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleAction} disabled={busy || !file}>
        {busy ? 'Removing Images...' : 'Remove PDF Images'}
      </Button>
    </Box>
  );
};

const RemovePdfImages = () => {
  const content = (
    <>
      <Typography variant="h2">How to Remove Images from a PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to strip images from.</li>
          <li>Click <strong>Remove PDF Images</strong> — all embedded raster images are removed while text and vector content remain.</li>
          <li>Download the resulting image-free PDF automatically.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 10-page marketing brochure contains product photos and decorative graphics on every page. After
        removing images, the PDF retains all text, headings, and table formatting but drops every embedded
        raster image — shrinking the file size significantly.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Reducing the file size of image-heavy PDFs before emailing.</li>
          <li>Extracting only text content by stripping all visual elements.</li>
          <li>Cleaning up a PDF that contains unwanted watermarks or logos.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does this remove vector graphics too?</strong> No — only raster image XObjects are removed. Vector paths, lines, and text remain intact.</li>
          <li><strong>Will the layout change?</strong> Text positions are preserved, but areas previously occupied by images will appear blank.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — all processing happens in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/remove-pdf-images" content={content}>
      <RemovePdfImagesContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RemovePdfImages;
