'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, Paper, CircularProgress, Chip } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { readFileAsArrayBuffer } from './pdfUtils';
import { loadPossiblyEncrypted } from './pdfEncryption';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';

interface FileInfo {
  fileName: string;
  fileSize: string;
  pdfVersion: string;
  encrypted: boolean;
  pageCount: number | null;
  title: string;
  author: string;
  subject: string;
  creator: string;
  producer: string;
  creationDate: string;
  modificationDate: string;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

const PdfFileInformationViewerContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [info, setInfo] = useState<FileInfo | null>(null);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleView = async () => {
    setError('');
    setInfo(null);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const headerStr = new TextDecoder().decode(new Uint8Array(bytes.slice(0, 20)));
      const versionMatch = headerStr.match(/%PDF-(\d+\.\d+)/);
      if (!versionMatch) {
        setError('This file does not appear to be a valid PDF.');
        setBusy(false);
        return;
      }

      const probe = await loadPossiblyEncrypted(bytes);
      const encrypted = 'needsPassword' in probe;

      try {
        const doc = await unlock(bytes);
        setInfo({
          fileName: file.name,
          fileSize: formatFileSize(file.size),
          pdfVersion: versionMatch[1],
          encrypted,
          pageCount: doc.getPageCount(),
          title: doc.getTitle() || '(Not set)',
          author: doc.getAuthor() || '(Not set)',
          subject: doc.getSubject() || '(Not set)',
          creator: doc.getCreator() || '(Not set)',
          producer: doc.getProducer() || '(Not set)',
          creationDate: doc.getCreationDate()?.toLocaleString() || '(Not set)',
          modificationDate: doc.getModificationDate()?.toLocaleString() || '(Not set)',
        });
      } catch (e) {
        if (e instanceof Error && e.message.includes('cancelled') && encrypted) {
          setInfo({
            fileName: file.name,
            fileSize: formatFileSize(file.size),
            pdfVersion: versionMatch[1],
            encrypted: true,
            pageCount: null,
            title: '(Password required)',
            author: '(Password required)',
            subject: '(Password required)',
            creator: '(Password required)',
            producer: '(Password required)',
            creationDate: '(Password required)',
            modificationDate: '(Password required)',
          });
        } else {
          throw e;
        }
      }
    } catch {
      setError('Could not read this file. Make sure it is a valid PDF.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box>
      {dialog}
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setInfo(null); }} label="PDF file" selectedNames={file ? [file.name] : []} />

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleView} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />Reading...</> : 'View File Information'}
      </Button>

      {info && (
        <Paper variant="outlined" sx={{ mt: 3, p: 2.5 }}>
          <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
            <Chip label={`Version ${info.pdfVersion}`} size="small" />
            <Chip label={info.fileSize} size="small" />
            <Chip label={info.pageCount !== null ? `${info.pageCount} page${info.pageCount !== 1 ? 's' : ''}` : 'Pages unknown'} size="small" />
            <Chip label={info.encrypted ? 'Encrypted' : 'Not encrypted'} size="small" color={info.encrypted ? 'warning' : 'success'} />
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
            {[
              ['Title', info.title],
              ['Author', info.author],
              ['Subject', info.subject],
              ['Creator', info.creator],
              ['Producer', info.producer],
              ['Created', info.creationDate],
              ['Modified', info.modificationDate],
            ].map(([label, value]) => (
              <Box key={label}>
                <Typography variant="caption" color="text.secondary">{label}</Typography>
                <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>{value}</Typography>
              </Box>
            ))}
          </Box>
        </Paper>
      )}
    </Box>
  );
};

const PdfFileInformationViewer = () => {
  const content = (
    <>
      <Typography variant="h2">How to View PDF File Information</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to inspect.</li>
          <li>Click <strong>View File Information</strong> to read its file size, page count, PDF version,
            encryption status, and embedded document properties.</li>
          <li>If the file is password-protected, you&apos;ll be prompted for the password to see its full details.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 2.3 MB, 14-page contract might show PDF version 1.7, not encrypted, author &quot;Legal Dept&quot;, and
        a creation date of January 2025 — everything needed for a quick document audit without opening the file
        in a separate PDF reader.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Quickly checking a PDF&apos;s size and page count before uploading it elsewhere.</li>
          <li>Verifying whether a received PDF is password-protected before sharing it further.</li>
          <li>Confirming the software (producer/creator) used to generate a document.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What if I can&apos;t enter the password?</strong> You&apos;ll still see the file size, PDF version, and encryption status — page count and document properties require the password since those are stored inside the encrypted content.</li>
          <li><strong>Does this modify my PDF?</strong> No — this is a read-only viewer. Your original file stays exactly as it is.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — everything is read entirely in your browser; the PDF is never sent to a server.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-file-information-viewer" content={content}>
      <PdfFileInformationViewerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfFileInformationViewer;
