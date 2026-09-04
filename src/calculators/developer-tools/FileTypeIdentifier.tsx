'use client';

import { useState } from 'react';
import { Box, Typography, Paper, Button, Alert } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface Signature {
  bytes: number[];
  offset?: number;
  typeName: string;
  extension: string;
}

const SIGNATURES: Signature[] = [
  { bytes: [0x89, 0x50, 0x4e, 0x47], typeName: 'PNG Image', extension: '.png' },
  { bytes: [0xff, 0xd8, 0xff], typeName: 'JPEG Image', extension: '.jpg / .jpeg' },
  { bytes: [0x47, 0x49, 0x46, 0x38], typeName: 'GIF Image', extension: '.gif' },
  { bytes: [0x25, 0x50, 0x44, 0x46], typeName: 'PDF Document', extension: '.pdf' },
  { bytes: [0x50, 0x4b, 0x03, 0x04], typeName: 'ZIP Archive (also DOCX, XLSX, JAR)', extension: '.zip / .docx / .xlsx / .jar' },
  { bytes: [0x1f, 0x8b], typeName: 'GZIP Compressed File', extension: '.gz' },
  { bytes: [0x52, 0x49, 0x46, 0x46], typeName: 'RIFF Container (WAV or AVI)', extension: '.wav / .avi' },
  { bytes: [0x7f, 0x45, 0x4c, 0x46], typeName: 'ELF Executable (Linux)', extension: '(none) / .so / .elf' },
  { bytes: [0x4d, 0x5a], typeName: 'Windows Executable or DLL', extension: '.exe / .dll' },
  { bytes: [0x42, 0x4d], typeName: 'Bitmap Image', extension: '.bmp' },
  { bytes: [0x49, 0x44, 0x33], typeName: 'MP3 Audio (with ID3 tag)', extension: '.mp3' },
  { bytes: [0x00, 0x00, 0x01, 0x00], typeName: 'Icon File', extension: '.ico' },
  { bytes: [0x66, 0x74, 0x79, 0x70], offset: 4, typeName: 'MP4 / QuickTime Video', extension: '.mp4 / .mov' },
  { bytes: [0x52, 0x61, 0x72, 0x21], typeName: 'RAR Archive', extension: '.rar' },
  { bytes: [0x37, 0x7a, 0xbc, 0xaf], typeName: '7-Zip Archive', extension: '.7z' },
];

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes).map((b) => b.toString(16).toUpperCase().padStart(2, '0')).join(' ');
}

function matchSignature(bytes: Uint8Array): Signature | null {
  for (const sig of SIGNATURES) {
    const offset = sig.offset ?? 0;
    const slice = bytes.slice(offset, offset + sig.bytes.length);
    if (slice.length !== sig.bytes.length) continue;
    const isMatch = sig.bytes.every((b, i) => slice[i] === b);
    if (isMatch) return sig;
  }
  return null;
}

const FileTypeIdentifierContent = () => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [hexPreview, setHexPreview] = useState('');
  const [match, setMatch] = useState<Signature | null | undefined>(undefined);

  const handleFile = (file: File) => {
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const buffer = e.target?.result as ArrayBuffer;
      const bytes = new Uint8Array(buffer);
      setHexPreview(bytesToHex(bytes));
      setMatch(matchSignature(bytes));
    };
    reader.readAsArrayBuffer(file.slice(0, 16));
  };

  return (
    <Box sx={{ maxWidth: 640, mx: 'auto' }}>
      <Button component="label" variant="contained" size="large" startIcon={<UploadFileIcon />} fullWidth sx={{ mb: 3 }}>
        Choose a File
        <input
          type="file"
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
      </Button>

      {fileName && (
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>File name: {fileName}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontFamily: 'monospace', wordBreak: 'break-all' }}>
            First bytes: {hexPreview || '—'}
          </Typography>
          {match ? (
            <>
              <Typography variant="h5" fontWeight={700} gutterBottom>{match.typeName}</Typography>
              <Typography variant="body1">Typical extension: <code>{match.extension}</code></Typography>
            </>
          ) : (
            <Alert severity="info">No known signature matched the first bytes of this file. It may be a text-based, uncommon, or proprietary format.</Alert>
          )}
        </Paper>
      )}
    </Box>
  );
};

const FileTypeIdentifier = () => {
  const content = (
    <>
      <Typography variant="h2">How the File Type Identifier Works</Typography>
      <Typography variant="body1">
        Choose a file and the tool reads its first 16 bytes directly using your browser&apos;s FileReader API,
        then compares them against a table of known &quot;magic number&quot; signatures — fixed byte
        patterns that most file formats begin with, such as PNG&apos;s <code>89 50 4E 47</code>, PDF&apos;s{' '}
        <code>25 50 44 46</code>, or a Windows executable&apos;s <code>4D 5A</code>. Because it inspects
        actual file content rather than the file name, it correctly identifies a file&apos;s real type even
        if its extension is wrong, missing, or was changed on purpose.
      </Typography>
      <Typography variant="body1">
        The file is read entirely in your browser using local JavaScript — nothing is ever uploaded to a
        server.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A file renamed from <code>photo.png</code> to <code>photo.txt</code> will still show its first bytes
        as <code>89 50 4E 47</code> and be correctly identified as a PNG Image, regardless of the misleading
        <code>.txt</code> extension.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Verifying what a downloaded file actually is before opening it, especially if its extension looks suspicious.</li>
          <li>Recovering the real type of a file that lost or never had a proper extension.</li>
          <li>Confirming a file wasn&apos;t corrupted or mislabeled during a transfer or export.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the File Extension Finder?</strong> The File Extension Finder is a static name-to-type lookup table — you type an extension like ".docx" and get its description. This File Type Identifier actually inspects the real bytes of an uploaded file, so it works correctly even when the extension is wrong, missing, or was deliberately changed.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — the file is read entirely client-side in your browser using the FileReader API. Nothing is sent to a server at any point.</li>
          <li><strong>Why did my file show "no known signature matched"?</strong> Some file types (like plain text, CSV, or certain proprietary formats) don&apos;t start with a distinctive byte pattern, or use a signature not included in this tool&apos;s reference table.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/file-type-identifier" content={content}>
      <FileTypeIdentifierContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default FileTypeIdentifier;
