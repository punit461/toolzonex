'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, Chip } from '@mui/material';
import { PDFDocument, PDFName, PDFDict, PDFRef, PDFArray } from '@cantoo/pdf-lib';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';

interface FontInfo {
  name: string;
  type: string;
  embedded: boolean;
  fileFormat: string;
  pageIndex: number;
}

function detectEmbedded(descriptor: PDFDict | undefined): { embedded: boolean; fileFormat: string } {
  if (!descriptor) return { embedded: false, fileFormat: '' };
  if (descriptor.lookupMaybe(PDFName.of('FontFile'), PDFDict)) return { embedded: true, fileFormat: 'Type1 (.pfb)' };
  if (descriptor.lookupMaybe(PDFName.of('FontFile2'), PDFDict)) return { embedded: true, fileFormat: 'TrueType (.ttf)' };
  if (descriptor.lookupMaybe(PDFName.of('FontFile3'), PDFDict)) return { embedded: true, fileFormat: 'CFF/OpenType (.otf)' };
  return { embedded: false, fileFormat: '' };
}

function extractFontInfo(doc: PDFDocument): FontInfo[] {
  const fonts: FontInfo[] = [];
  const seen = new Set<string>();

  doc.getPages().forEach((page, pageIndex) => {
    try {
      const resources = page.node.Resources();
      if (!resources) return;
      const fontDict = resources.lookupMaybe(PDFName.of('Font'), PDFDict);
      if (!fontDict) return;

      for (const [, value] of fontDict.entries()) {
        if (!(value instanceof PDFRef)) continue;
        const resolved = doc.context.lookupMaybe(value, PDFDict);
        if (!resolved) continue;

        let name = String(resolved.lookupMaybe(PDFName.of('BaseFont'), PDFName) ?? 'Unknown');
        if (name.startsWith('/')) name = name.slice(1);

        const subType = resolved.lookupMaybe(PDFName.of('Subtype'), PDFName);
        const type = subType ? String(subType).replace('/', '') : 'Unknown';

        let descriptor = resolved.lookupMaybe(PDFName.of('FontDescriptor'), PDFDict);
        if (!descriptor) {
          // Composite (Type0) fonts nest the descriptor inside a descendant CIDFont array.
          try {
            const descendantsArr = resolved.lookupMaybe(PDFName.of('DescendantFonts'), PDFArray);
            const first = descendantsArr?.lookupMaybe(0, PDFDict);
            descriptor = first?.lookupMaybe(PDFName.of('FontDescriptor'), PDFDict);
          } catch {
            // Not shaped as expected; leave descriptor undefined.
          }
        }

        const key = `${name}|${type}`;
        if (!seen.has(key)) {
          seen.add(key);
          const { embedded, fileFormat } = detectEmbedded(descriptor);
          fonts.push({ name, type, embedded, fileFormat, pageIndex });
        }
      }
    } catch {
      // Skip pages whose resources can't be read.
    }
  });

  return fonts;
}

const PdfFontExtractorContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [fonts, setFonts] = useState<FontInfo[] | null>(null);
  const [noFonts, setNoFonts] = useState(false);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleScan = async () => {
    setError('');
    setFonts(null);
    setNoFonts(false);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);
      const result = extractFontInfo(doc);
      if (result.length === 0) setNoFonts(true);
      else setFonts(result);
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) {
        setError('Could not read this file. Make sure it is a valid PDF.');
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box>
      {dialog}
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setFonts(null); setNoFonts(false); }} label="PDF file" selectedNames={file ? [file.name] : []} />

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleScan} disabled={busy || !file}>
        {busy ? 'Scanning...' : 'Scan Fonts'}
      </Button>

      {noFonts && (
        <Alert severity="info" sx={{ mt: 3 }}>
          No font information could be found in this PDF. It may consist entirely of scanned images or vector
          shapes with no text.
        </Alert>
      )}

      {fonts && fonts.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            {fonts.length} distinct font{fonts.length !== 1 ? 's' : ''} found
          </Typography>
          <Box sx={{ bgcolor: 'grey.50', borderRadius: 1, border: '1px solid', borderColor: 'grey.200', overflow: 'hidden' }}>
            {fonts.map((font, i) => (
              <Box
                key={i}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  py: 1.5,
                  px: 2,
                  borderBottom: i < fonts.length - 1 ? '1px solid' : 'none',
                  borderColor: 'grey.100',
                }}
              >
                <TextFieldsIcon fontSize="small" color="primary" />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" fontWeight={600}>{font.name}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {font.type} &middot; first seen on page {font.pageIndex + 1}
                    {font.embedded ? ` · ${font.fileFormat}` : ''}
                  </Typography>
                </Box>
                <Chip
                  icon={font.embedded ? <CheckCircleIcon /> : <CancelIcon />}
                  label={font.embedded ? 'Embedded' : 'Not embedded'}
                  size="small"
                  color={font.embedded ? 'success' : 'default'}
                  variant={font.embedded ? 'filled' : 'outlined'}
                />
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

const PdfFontExtractor = () => {
  const content = (
    <>
      <Typography variant="h2">What This Tool Actually Extracts</Typography>
      <Box sx={{ typography: 'body1' }}>
        <p>
          &quot;Font extractor&quot; could imply downloading the raw embedded font file. In practice, the public
          APIs available in the browser (both <code>pdfjs-dist</code> and <code>pdf-lib</code>) don&apos;t expose
          a reliable, well-supported way to pull out a clean, standalone <code>.ttf</code>/<code>.otf</code>/
          <code>.woff</code> file from a PDF&apos;s internal font program — the embedded data is often a subsetted,
          PDF-specific encoding of the font rather than a directly usable font file. Rather than ship an
          extraction feature that silently fails or produces broken files, this tool instead scopes itself to a
          reliable <strong>font information</strong> report: for every distinct font used in the document, it
          shows the font name, its subtype (Type1, TrueType, Type0/CID, etc.), and whether it is embedded in the
          PDF — plus the underlying embedded format (Type1, TrueType, or CFF/OpenType) when it is.
        </p>
      </Box>

      <Typography variant="h2">How to Use It</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to inspect.</li>
          <li>Click <strong>Scan Fonts</strong> to list every distinct font referenced across all pages.</li>
          <li>Each font shows its subtype, whether it&apos;s embedded, and the embedded file format if applicable.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A typeset report might list &quot;Calibri (TrueType) &mdash; Embedded &mdash; TrueType (.ttf)&quot; alongside
        &quot;Arial (TrueType) &mdash; Not embedded&quot;, telling you the report will render correctly everywhere
        for Calibri text, but Arial text relies on the viewer having that font installed.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking whether a PDF is safe to send for professional printing, where all fonts should be embedded.</li>
          <li>Diagnosing why a PDF looks different on another computer (likely a non-embedded font being substituted).</li>
          <li>Auditing the fonts used across a batch of generated documents for consistency.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Can I download the actual font file?</strong> No — this tool reports font information only. See the explanation above for why raw font-file extraction isn&apos;t offered.</li>
          <li><strong>What does "not embedded" mean?</strong> The PDF references a font by name (e.g. "Arial") without including its outline data. The viewer substitutes a locally installed font with that name, which can look different across devices.</li>
          <li><strong>Will this find every font?</strong> It reads fonts declared in each page's resource dictionary, including composite (Type0/CID) fonts. Fonts referenced in non-standard ways may not be detected.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — everything runs entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-font-extractor" content={content}>
      <PdfFontExtractorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfFontExtractor;
