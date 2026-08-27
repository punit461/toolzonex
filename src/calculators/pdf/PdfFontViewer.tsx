'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, Chip } from '@mui/material';
import { PDFDocument, PDFName, PDFDict, PDFRef } from '@cantoo/pdf-lib';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';

interface FontInfo {
  name: string;
  type: string;
  source: 'page' | 'form';
  pageIndex?: number;
}

function extractFonts(doc: PDFDocument): FontInfo[] {
  const fonts: FontInfo[] = [];
  const seen = new Set<string>();

  doc.getPages().forEach((page, pageIndex) => {
    try {
      const resources = page.node.Resources();
      if (!resources) return;
      const fontDict = resources.lookupMaybe(PDFName.of('Font'), PDFDict);
      if (!fontDict) return;

      const fontEntries = fontDict.entries();
      for (const [key, value] of fontEntries) {
        if (!(value instanceof PDFRef)) continue;
        const resolved = doc.context.lookupMaybe(value, PDFDict);
        if (!resolved) continue;

        let name = '';
        const baseFont = resolved.lookupMaybe(PDFName.of('BaseFont'), PDFDict);
        if (baseFont) {
          name = String(baseFont);
        } else {
          name = String(key);
        }
        if (name.startsWith('/')) name = name.slice(1);

        const subType = resolved.lookupMaybe(PDFName.of('Subtype'), PDFDict);
        const type = subType ? String(subType).replace('/', '') : 'Unknown';

        if (!seen.has(name)) {
          seen.add(name);
          fonts.push({ name, type, source: 'page', pageIndex });
        }
      }
    } catch {
      // Skip pages that can't be read
    }
  });

  try {
    const form = doc.getForm();
    const fields = form.getFields();
    if (fields.length > 0) {
      fonts.push({ name: `(${fields.length} form field${fields.length !== 1 ? 's' : ''} detected)`, type: 'Form', source: 'form' });
    }
  } catch {
    // No form / no fields
  }

  return fonts;
}

const PdfFontViewerContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [fonts, setFonts] = useState<FontInfo[] | null>(null);
  const [noFonts, setNoFonts] = useState(false);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleView = async () => {
    setError('');
    setFonts(null);
    setNoFonts(false);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);
      const result = extractFonts(doc);
      if (result.length === 0) {
        setNoFonts(true);
      } else {
        setFonts(result);
      }
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

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleView} disabled={busy || !file}>
        {busy ? 'Reading...' : 'View Fonts'}
      </Button>

      {noFonts && (
        <Alert severity="info" sx={{ mt: 3 }}>
          No font information could be found in this PDF. It may use embedded image text or a format that does not expose font data in the standard PDF structure.
        </Alert>
      )}

      {fonts && fonts.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            {fonts.filter((f) => f.source === 'page').length} font{fonts.filter((f) => f.source === 'page').length !== 1 ? 's' : ''} found
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
                    {font.type}{font.pageIndex !== undefined ? ` — first on page ${font.pageIndex + 1}` : ''}
                  </Typography>
                </Box>
                <Chip label={font.source} size="small" variant="outlined" sx={{ height: 20, fontSize: '0.65rem' }} />
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

const PdfFontViewer = () => {
  const content = (
    <>
      <Typography variant="h2">How to View PDF Fonts</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to inspect.</li>
          <li>Click <strong>View Fonts</strong> to list every font used in the document.</li>
          <li>See font names, subtypes, and where they come from — page resources or form fields.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A professionally typeset PDF might list fonts like &quot;Helvetica-Bold (Type1)&quot;, &quot;TimesNewRoman (TrueType)&quot;, and &quot;Symbol (Type1)&quot; — telling you exactly which typefaces the designer embedded.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Identifying fonts used in a design mockup or sample document.</li>
          <li>Checking whether a PDF embeds fonts correctly for archival or print.</li>
          <li>Reverse-engineering the typography of a well-designed report or brochure.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Will this show every font?</strong> It shows fonts declared in page resource dictionaries. Some PDFs embed fonts in non-standard ways that this tool may not detect.</li>
          <li><strong>What does &quot;TrueType&quot; vs &quot;Type1&quot; mean?</strong> TrueType and Type1 are two common outline font formats. TrueType was developed by Apple/Microsoft, Type1 by Adobe. Both produce high-quality text at any size.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — everything runs in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-font-viewer" content={content}>
      <PdfFontViewerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfFontViewer;
