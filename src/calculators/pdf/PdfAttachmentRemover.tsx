'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, Chip, CircularProgress } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';
import { PDFDocument } from '@cantoo/pdf-lib';

const PdfAttachmentRemoverContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [removedCount, setRemovedCount] = useState<number | null>(null);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleRemove = async () => {
    setError('');
    setRemovedCount(null);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const pdfjs = await import('pdfjs-dist');
      pdfjs.GlobalWorkerOptions.workerSrc = '//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      const pdfDoc = await pdfjs.getDocument({ data: bytes.slice(0) }).promise;
      const attachments = await pdfDoc.getAttachments();
      const attachmentCount = attachments ? Object.keys(attachments).length : 0;

      if (attachmentCount === 0) {
        setError('This PDF does not contain any embedded file attachments.');
        setBusy(false);
        return;
      }

      const doc = await unlock(bytes);
      const trailerRoot = doc.context.trailerInfo.Root;
      const root = doc.context.lookup(trailerRoot);
      if (root && typeof root === 'object' && 'get' in root) {
        const namesRef = (root as any).get('Names');
        if (namesRef) {
          const namesObj = doc.context.lookup(namesRef);
          if (namesObj && typeof namesObj === 'object' && 'get' in namesObj) {
            (namesObj as any).delete('EmbeddedFiles');
            const remaining = (namesObj as any).get('EmbeddedFiles');
            if (!remaining || (typeof remaining === 'object' && Object.keys(remaining as any).length === 0)) {
              (root as any).delete('Names');
            }
          }
        }
      }

      const output = await doc.save();
      setRemovedCount(attachmentCount);
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-no-attachments.pdf');
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) {
        setError('Could not process this file. Make sure it is a valid PDF.');
      }
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
        <Alert severity="success" icon={<CheckCircleOutlineIcon />} sx={{ mt: 2 }}>
          Removed <Chip label={removedCount} size="small" color="success" sx={{ mx: 0.5 }} /> embedded attachment{removedCount !== 1 ? 's' : ''}. Download your cleaned PDF below.
        </Alert>
      )}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleRemove} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />Processing...</> : 'Remove Attachments'}
      </Button>
    </Box>
  );
};

const PdfAttachmentRemover = () => {
  const content = (
    <>
      <Typography variant="h2">How to Remove Attachments from a PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF that contains embedded file attachments.</li>
          <li>Click <strong>Remove Attachments</strong> to strip every embedded file.</li>
          <li>Download the cleaned PDF with all attachments removed.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A contract submission bundles a 2 MB spreadsheet and a 500 KB image as embedded attachments. Running this tool removes both files from the document,
        shrinking the PDF back to only its page content while leaving text and formatting completely untouched.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Reducing file size by stripping bundled spreadsheets, images, or data files from a report.</li>
          <li>Cleaning a PDF before sharing it externally so recipients only see page content.</li>
          <li>Preparing documents for upload where embedded files are not permitted.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does this affect the page content?</strong> No — only embedded file attachments are removed. All text, images, and formatting on each page remain unchanged.</li>
          <li><strong>Can I save the attachments first?</strong> Yes — use the PDF Attachment Extractor to download the embedded files before removing them here.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — the entire process runs in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-attachment-remover" content={content}>
      <PdfAttachmentRemoverContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfAttachmentRemover;
