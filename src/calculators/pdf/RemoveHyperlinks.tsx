'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, CircularProgress } from '@mui/material';
import { PDFName, PDFDict, PDFArray } from '@cantoo/pdf-lib';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';

const RemoveHyperlinksContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [removed, setRemoved] = useState<number | null>(null);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleAction = async () => {
    setError('');
    setRemoved(null);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);
      let totalRemoved = 0;

      for (const page of doc.getPages()) {
        const annots = page.node.Annots();
        if (!annots || !(annots instanceof PDFArray)) continue;

        const kept: PDFArray = PDFArray.withContext(doc.context);
        for (let i = 0; i < annots.size(); i++) {
          const annotRef = annots.get(i);
          const annotDict = doc.context.lookupMaybe(annotRef, PDFDict);
          if (!annotDict) {
            kept.push(annotRef);
            continue;
          }

          const subType = annotDict.lookupMaybe(PDFName.of('Subtype'), PDFName);
          const typeName = subType ? String(subType) : '';
          const isLink = typeName === '/Link' || typeName === 'Link';

          if (isLink) {
            totalRemoved++;
          } else {
            kept.push(annotRef);
          }
        }

        if (kept.size() === 0) {
          page.node.delete(PDFName.of('Annots'));
        } else {
          page.node.set(PDFName.of('Annots'), kept);
        }
      }

      const output = await doc.save();
      setRemoved(totalRemoved);
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-no-links.pdf');
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) {
        setError('Could not process this file.');
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box>
      {dialog}
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setRemoved(null); }} label="PDF file" selectedNames={file ? [file.name] : []} />
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      {removed !== null && <Alert severity="success" sx={{ mt: 2 }}>Removed {removed} hyperlink{removed !== 1 ? 's' : ''} from the document.</Alert>}
      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleAction} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />Processing...</> : 'Remove Hyperlinks'}
      </Button>
    </Box>
  );
};

const RemoveHyperlinks = () => {
  const content = (
    <>
      <Typography variant="h2">How to Remove Hyperlinks from a PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF containing the hyperlinks you want to strip.</li>
          <li>Click <strong>Remove Hyperlinks</strong> — link annotations are filtered out of every page while the visible text stays intact.</li>
          <li>The link-free PDF downloads automatically.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A company report with dozens of clickable URLs scattered through the body text will be cleaned so the
        text still reads normally but the links are no longer active or highlighted.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Removing unwanted or distracting clickable links before sharing a PDF publicly.</li>
          <li>Stripping internal navigation links from a document that will be printed.</li>
          <li>Cleaning up a PDF received from a third party that contains tracking or affiliate links.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Will the visible text change?</strong> No — only the hyperlink annotations are removed. The text and its formatting are preserved.</li>
          <li><strong>Does this remove bookmarks or table-of-contents links?</strong> Bookmarks (outlines) are separate from page annotations and are not affected. Only link annotations on pages are removed.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — processing happens entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/remove-hyperlinks" content={content}>
      <RemoveHyperlinksContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RemoveHyperlinks;
