'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface ExtInfo {
  typeName: string;
  mimeType: string;
  category: string;
}

const EXTENSIONS: Record<string, ExtInfo> = {
  txt: { typeName: 'Plain Text File', mimeType: 'text/plain', category: 'Document' },
  rtf: { typeName: 'Rich Text Format', mimeType: 'application/rtf', category: 'Document' },
  doc: { typeName: 'Microsoft Word Document (Legacy)', mimeType: 'application/msword', category: 'Document' },
  docx: { typeName: 'Microsoft Word Document', mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', category: 'Document' },
  pdf: { typeName: 'Portable Document Format', mimeType: 'application/pdf', category: 'Document' },
  odt: { typeName: 'OpenDocument Text', mimeType: 'application/vnd.oasis.opendocument.text', category: 'Document' },
  md: { typeName: 'Markdown File', mimeType: 'text/markdown', category: 'Document' },
  epub: { typeName: 'Electronic Publication (eBook)', mimeType: 'application/epub+zip', category: 'Document' },
  xls: { typeName: 'Microsoft Excel Spreadsheet (Legacy)', mimeType: 'application/vnd.ms-excel', category: 'Spreadsheet' },
  xlsx: { typeName: 'Microsoft Excel Spreadsheet', mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', category: 'Spreadsheet' },
  csv: { typeName: 'Comma-Separated Values', mimeType: 'text/csv', category: 'Spreadsheet' },
  ods: { typeName: 'OpenDocument Spreadsheet', mimeType: 'application/vnd.oasis.opendocument.spreadsheet', category: 'Spreadsheet' },
  ppt: { typeName: 'Microsoft PowerPoint Presentation (Legacy)', mimeType: 'application/vnd.ms-powerpoint', category: 'Presentation' },
  pptx: { typeName: 'Microsoft PowerPoint Presentation', mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation', category: 'Presentation' },
  odp: { typeName: 'OpenDocument Presentation', mimeType: 'application/vnd.oasis.opendocument.presentation', category: 'Presentation' },
  zip: { typeName: 'ZIP Compressed Archive', mimeType: 'application/zip', category: 'Archive' },
  rar: { typeName: 'RAR Compressed Archive', mimeType: 'application/vnd.rar', category: 'Archive' },
  '7z': { typeName: '7-Zip Compressed Archive', mimeType: 'application/x-7z-compressed', category: 'Archive' },
  tar: { typeName: 'Tape Archive', mimeType: 'application/x-tar', category: 'Archive' },
  gz: { typeName: 'Gzip Compressed File', mimeType: 'application/gzip', category: 'Archive' },
  iso: { typeName: 'Disc Image File', mimeType: 'application/x-iso9660-image', category: 'Archive' },
  bin: { typeName: 'Binary Data File', mimeType: 'application/octet-stream', category: 'Archive' },
  vmdk: { typeName: 'Virtual Machine Disk', mimeType: 'application/x-vmdk', category: 'Archive' },
  torrent: { typeName: 'BitTorrent Metadata File', mimeType: 'application/x-bittorrent', category: 'Archive' },
  jpg: { typeName: 'JPEG Image', mimeType: 'image/jpeg', category: 'Image' },
  jpeg: { typeName: 'JPEG Image', mimeType: 'image/jpeg', category: 'Image' },
  png: { typeName: 'PNG Image', mimeType: 'image/png', category: 'Image' },
  gif: { typeName: 'GIF Image', mimeType: 'image/gif', category: 'Image' },
  bmp: { typeName: 'Bitmap Image', mimeType: 'image/bmp', category: 'Image' },
  svg: { typeName: 'Scalable Vector Graphics', mimeType: 'image/svg+xml', category: 'Image' },
  webp: { typeName: 'WebP Image', mimeType: 'image/webp', category: 'Image' },
  ico: { typeName: 'Icon File', mimeType: 'image/vnd.microsoft.icon', category: 'Image' },
  tiff: { typeName: 'Tagged Image File Format', mimeType: 'image/tiff', category: 'Image' },
  psd: { typeName: 'Adobe Photoshop Document', mimeType: 'image/vnd.adobe.photoshop', category: 'Image' },
  ai: { typeName: 'Adobe Illustrator File', mimeType: 'application/postscript', category: 'Image' },
  heic: { typeName: 'High Efficiency Image File', mimeType: 'image/heic', category: 'Image' },
  mp3: { typeName: 'MP3 Audio', mimeType: 'audio/mpeg', category: 'Audio' },
  wav: { typeName: 'Waveform Audio', mimeType: 'audio/wav', category: 'Audio' },
  flac: { typeName: 'Free Lossless Audio Codec', mimeType: 'audio/flac', category: 'Audio' },
  aac: { typeName: 'Advanced Audio Coding', mimeType: 'audio/aac', category: 'Audio' },
  ogg: { typeName: 'Ogg Vorbis Audio', mimeType: 'audio/ogg', category: 'Audio' },
  m4a: { typeName: 'MPEG-4 Audio', mimeType: 'audio/mp4', category: 'Audio' },
  mp4: { typeName: 'MPEG-4 Video', mimeType: 'video/mp4', category: 'Video' },
  mov: { typeName: 'QuickTime Video', mimeType: 'video/quicktime', category: 'Video' },
  avi: { typeName: 'Audio Video Interleave', mimeType: 'video/x-msvideo', category: 'Video' },
  mkv: { typeName: 'Matroska Video', mimeType: 'video/x-matroska', category: 'Video' },
  wmv: { typeName: 'Windows Media Video', mimeType: 'video/x-ms-wmv', category: 'Video' },
  webm: { typeName: 'WebM Video', mimeType: 'video/webm', category: 'Video' },
  flv: { typeName: 'Flash Video', mimeType: 'video/x-flv', category: 'Video' },
  html: { typeName: 'HTML Web Page', mimeType: 'text/html', category: 'Code' },
  htm: { typeName: 'HTML Web Page', mimeType: 'text/html', category: 'Code' },
  css: { typeName: 'Cascading Style Sheet', mimeType: 'text/css', category: 'Code' },
  js: { typeName: 'JavaScript File', mimeType: 'text/javascript', category: 'Code' },
  ts: { typeName: 'TypeScript File', mimeType: 'text/typescript', category: 'Code' },
  jsx: { typeName: 'React JSX File', mimeType: 'text/jsx', category: 'Code' },
  tsx: { typeName: 'React TSX File', mimeType: 'text/tsx', category: 'Code' },
  py: { typeName: 'Python Script', mimeType: 'text/x-python', category: 'Code' },
  java: { typeName: 'Java Source File', mimeType: 'text/x-java-source', category: 'Code' },
  c: { typeName: 'C Source File', mimeType: 'text/x-c', category: 'Code' },
  cpp: { typeName: 'C++ Source File', mimeType: 'text/x-c++', category: 'Code' },
  php: { typeName: 'PHP Script', mimeType: 'application/x-httpd-php', category: 'Code' },
  rb: { typeName: 'Ruby Script', mimeType: 'text/x-ruby', category: 'Code' },
  go: { typeName: 'Go Source File', mimeType: 'text/x-go', category: 'Code' },
  sh: { typeName: 'Shell Script', mimeType: 'application/x-sh', category: 'Code' },
  bat: { typeName: 'Windows Batch File', mimeType: 'application/bat', category: 'Code' },
  sql: { typeName: 'SQL Database Script', mimeType: 'application/sql', category: 'Code' },
  json: { typeName: 'JSON Data File', mimeType: 'application/json', category: 'Code' },
  xml: { typeName: 'XML Data File', mimeType: 'application/xml', category: 'Code' },
  yaml: { typeName: 'YAML Configuration File', mimeType: 'application/x-yaml', category: 'Code' },
  yml: { typeName: 'YAML Configuration File', mimeType: 'application/x-yaml', category: 'Code' },
  env: { typeName: 'Environment Variables File', mimeType: 'text/plain', category: 'Code' },
  log: { typeName: 'Log File', mimeType: 'text/plain', category: 'Code' },
  ini: { typeName: 'Configuration File', mimeType: 'text/plain', category: 'Code' },
  exe: { typeName: 'Windows Executable', mimeType: 'application/x-msdownload', category: 'Executable' },
  dll: { typeName: 'Dynamic Link Library', mimeType: 'application/x-msdownload', category: 'Executable' },
  apk: { typeName: 'Android App Package', mimeType: 'application/vnd.android.package-archive', category: 'Executable' },
  dmg: { typeName: 'macOS Disk Image', mimeType: 'application/x-apple-diskimage', category: 'Executable' },
  msi: { typeName: 'Windows Installer Package', mimeType: 'application/x-msi', category: 'Executable' },
  app: { typeName: 'macOS Application Bundle', mimeType: 'application/octet-stream', category: 'Executable' },
  jar: { typeName: 'Java Archive', mimeType: 'application/java-archive', category: 'Executable' },
  ttf: { typeName: 'TrueType Font', mimeType: 'font/ttf', category: 'Font' },
  otf: { typeName: 'OpenType Font', mimeType: 'font/otf', category: 'Font' },
  woff: { typeName: 'Web Open Font Format', mimeType: 'font/woff', category: 'Font' },
  woff2: { typeName: 'Web Open Font Format 2', mimeType: 'font/woff2', category: 'Font' },
  bak: { typeName: 'Backup File', mimeType: 'application/octet-stream', category: 'Other' },
};

const FileExtensionFinderContent = () => {
  const [query, setQuery] = useState('');

  const cleaned = query.trim().replace(/^\./, '').toLowerCase();
  const match = useMemo(() => (cleaned ? EXTENSIONS[cleaned] : undefined), [cleaned]);

  return (
    <Box sx={{ maxWidth: 560, mx: 'auto' }}>
      <TextField
        label="File Extension"
        placeholder="e.g. docx, .mp3, PDF"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        fullWidth
        sx={{ mb: 3 }}
      />

      {cleaned && (
        match ? (
          <Paper variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h5" fontWeight={700} gutterBottom>.{cleaned}</Typography>
            <Typography variant="body1" sx={{ mb: 1 }}><strong>Type:</strong> {match.typeName}</Typography>
            <Typography variant="body1" sx={{ mb: 1 }}><strong>MIME Type:</strong> <code>{match.mimeType}</code></Typography>
            <Typography variant="body1"><strong>Category:</strong> {match.category}</Typography>
          </Paper>
        ) : (
          <Alert severity="info">&quot;.{cleaned}&quot; wasn&apos;t found in our list. Try another extension, or check its type manually.</Alert>
        )
      )}
    </Box>
  );
};

const FileExtensionFinder = () => {
  const content = (
    <>
      <Typography variant="h2">How the File Extension Finder Works</Typography>
      <Typography variant="body1">
        Type a file extension — with or without the leading dot — and the tool looks it up in a curated list
        of common file types, showing its full type name, MIME type, and general category (Document, Image,
        Audio, Video, Archive, Code, Executable, or Font). This is a name-based reference lookup, not an
        inspection of an actual file.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Typing <code>docx</code> (or <code>.docx</code>) shows &quot;Microsoft Word Document&quot;, MIME type{' '}
        <code>application/vnd.openxmlformats-officedocument.wordprocessingml.document</code>, in the
        &quot;Document&quot; category.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Quickly checking what an unfamiliar file extension means before opening it.</li>
          <li>Finding the correct MIME type for a file extension when configuring a server or upload form.</li>
          <li>Learning which general category (image, document, archive, etc.) an extension belongs to.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does this tool inspect an actual file?</strong> No — this is purely a name-based reference lookup against a curated list of extensions. If you want to identify a file by its actual byte content (which works even with the wrong or missing extension), use our File Type Identifier tool instead.</li>
          <li><strong>What if my extension isn't listed?</strong> The list covers around 80 of the most common file extensions. Very obscure or proprietary formats may not be included — a friendly "not found" message appears in that case.</li>
          <li><strong>Can one extension have more than one possible file type?</strong> In the real world, yes, occasionally — but this tool shows the single most common interpretation of each extension for simplicity.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/file-extension-finder" content={content}>
      <FileExtensionFinderContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default FileExtensionFinder;
