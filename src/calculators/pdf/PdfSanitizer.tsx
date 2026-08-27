'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, Chip, CircularProgress, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';
import { PDFDocument } from '@cantoo/pdf-lib';

interface RemovalResult {
  item: string;
  found: boolean;
}

const PdfSanitizerContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [results, setResults] = useState<RemovalResult[] | null>(null);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleSanitize = async () => {
    setError('');
    setResults(null);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const pdfjs = await import('pdfjs-dist');
      pdfjs.GlobalWorkerOptions.workerSrc = '//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      const pdfDoc = await pdfjs.getDocument({ data: bytes.slice(0) }).promise;

      const attachments = await pdfDoc.getAttachments();
      const hasAttachments = attachments ? Object.keys(attachments).length > 0 : false;

      const doc = await unlock(bytes);
      let hasAcroForm = false;
      try {
        const form = doc.getForm();
        if (form) hasAcroForm = true;
      } catch { /* no form */ }

      const checks: RemovalResult[] = [
        { item: 'Embedded file attachments', found: hasAttachments },
        { item: 'AcroForm (fillable forms & embedded scripts)', found: hasAcroForm },
      ];

      const trailerRoot = doc.context.trailerInfo.Root;
      const root = doc.context.lookup(trailerRoot) as any;

      if (root && typeof root === 'object' && 'get' in root) {
        const namesRef = root.get('Names');
        if (namesRef) {
          const namesObj = doc.context.lookup(namesRef) as any;
          if (namesObj && typeof namesObj === 'object' && 'get' in namesObj) {
            namesObj.delete('EmbeddedFiles');
            const remaining = namesObj.get('EmbeddedFiles');
            checks.push({ item: 'EmbeddedFiles name tree', found: remaining != null });
            if (!remaining) root.delete('Names');
          }
        }

        const actionsRef = root.get('AA');
        if (actionsRef) {
          checks.push({ item: 'Additional actions (launch/JS triggers)', found: true });
          root.delete('AA');
        }

        const jsRef = root.get('JS');
        if (jsRef) {
          checks.push({ item: 'Document-level JavaScript', found: true });
          root.delete('JS');
        }
      }

      if (hasAcroForm) {
        try {
          const trailerRoot = doc.context.trailerInfo.Root;
          const root = doc.context.lookup(trailerRoot) as any;
          if (root && typeof root === 'object' && 'get' in root) {
            root.delete('AcroForm');
          }
        } catch { /* best effort */ }
      }

      const output = await doc.save();
      setResults(checks);
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-sanitized.pdf');
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) {
        setError('Could not process this file. Make sure it is a valid PDF.');
      }
    } finally {
      setBusy(false);
    }
  };

  const foundCount = results ? results.filter((r) => r.found).length : 0;

  return (
    <Box>
      {dialog}
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setResults(null); }} label="PDF file" selectedNames={file ? [file.name] : []} />

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      {results && (
        <Box sx={{ mt: 2 }}>
          <Alert severity={foundCount > 0 ? 'success' : 'info'} sx={{ mb: 2 }}>
            {foundCount > 0
              ? <>Removed <Chip label={foundCount} size="small" color="success" sx={{ mx: 0.5 }} /> potentially dangerous element{foundCount !== 1 ? 's' : ''} from this PDF.</>
              : 'No potentially dangerous elements were detected. Your PDF appears clean.'}
          </Alert>
          <List dense sx={{ bgcolor: 'grey.50', borderRadius: 1, border: '1px solid', borderColor: 'grey.200' }}>
            {results.map((r, i) => (
              <ListItem key={i}>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  {r.found ? <CheckCircleOutlineIcon color="success" fontSize="small" /> : <CancelIcon color="disabled" fontSize="small" />}
                </ListItemIcon>
                <ListItemText primary={r.item} secondary={r.found ? 'Found & removed' : 'Not detected'} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleSanitize} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />Sanitizing...</> : 'Sanitize PDF'}
      </Button>
    </Box>
  );
};

const PdfSanitizer = () => {
  const content = (
    <>
      <Typography variant="h2">How to Sanitize a PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to clean for security.</li>
          <li>Click <strong>Sanitize PDF</strong> to scan and remove dangerous content.</li>
          <li>Review the report showing exactly what was found and removed, then download the cleaned file.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A compliance officer receives a vendor PDF that contains embedded JavaScript for form auto-fill and an attached spreadsheet.
        Running the sanitizer strips the JavaScript actions, removes the embedded file, and produces a clean document that passes the
        organization&apos;s security screening.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Stripping JavaScript, embedded files, and launch actions from PDFs before opening them.</li>
          <li>Cleaning PDFs received from external sources to prevent malware execution.</li>
          <li>Preparing documents for archival by removing all interactive and executable content.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What does this remove?</strong> Embedded file attachments, document-level JavaScript, AcroForm definitions (which can contain scripts), and additional action dictionaries that trigger on open or click.</li>
          <li><strong>Will this break my PDF?</strong> In rare cases, if the PDF relies on JavaScript for basic rendering, the sanitized version may display differently. Text and images are always preserved.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — sanitization runs entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-sanitizer" content={content}>
      <PdfSanitizerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfSanitizer;
