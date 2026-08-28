'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, Paper } from '@mui/material';
import { PDFDocument, PDFName, PDFDict, PDFArray, PDFRef } from '@cantoo/pdf-lib';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';

interface ObjectCounts {
  pages: number;
  images: number;
  fonts: number;
  annotations: number;
  links: number;
  indirectObjects: number;
}

function countAll(doc: PDFDocument): ObjectCounts {
  const imageRefs = new Set<number>();
  const fontKeys = new Set<string>();
  let annotations = 0;
  let links = 0;

  doc.getPages().forEach((page) => {
    try {
      const resources = page.node.Resources();
      if (resources) {
        const xObjectDict = resources.lookupMaybe(PDFName.of('XObject'), PDFDict);
        if (xObjectDict) {
          for (const [, value] of xObjectDict.entries()) {
            if (!(value instanceof PDFRef)) continue;
            const resolved = doc.context.lookupMaybe(value, PDFDict);
            const subType = resolved?.lookupMaybe(PDFName.of('Subtype'), PDFName);
            if (subType && String(subType).replace('/', '') === 'Image') {
              imageRefs.add(value.objectNumber);
            }
          }
        }
        const fontDict = resources.lookupMaybe(PDFName.of('Font'), PDFDict);
        if (fontDict) {
          for (const [key] of fontDict.entries()) fontKeys.add(String(key));
        }
      }
    } catch {
      // Skip unreadable page resources.
    }

    try {
      const annots = page.node.Annots();
      if (annots instanceof PDFArray) {
        annotations += annots.size();
        for (let i = 0; i < annots.size(); i++) {
          const ref = annots.get(i);
          if (!(ref instanceof PDFRef)) continue;
          const annotDict = doc.context.lookupMaybe(ref, PDFDict);
          const subType = annotDict?.lookupMaybe(PDFName.of('Subtype'), PDFName);
          if (subType && String(subType).replace('/', '') === 'Link') links++;
        }
      }
    } catch {
      // Skip unreadable annotations.
    }
  });

  return {
    pages: doc.getPageCount(),
    images: imageRefs.size,
    fonts: fontKeys.size,
    annotations,
    links,
    indirectObjects: doc.context.enumerateIndirectObjects().length,
  };
}

const PdfObjectCounterContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [counts, setCounts] = useState<ObjectCounts | null>(null);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleCount = async () => {
    setError('');
    setCounts(null);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);
      setCounts(countAll(doc));
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) {
        setError('Could not read this file. Make sure it is a valid PDF.');
      }
    } finally { setBusy(false); }
  };

  const rows = counts ? [
    { label: 'Pages', value: counts.pages },
    { label: 'Embedded images', value: counts.images },
    { label: 'Distinct fonts (per page resources)', value: counts.fonts },
    { label: 'Annotations (all types)', value: counts.annotations },
    { label: 'Link annotations', value: counts.links },
    { label: 'Total indirect PDF objects', value: counts.indirectObjects },
  ] : [];

  return (
    <Box>
      {dialog}
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setCounts(null); }} label="PDF file" selectedNames={file ? [file.name] : []} />

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleCount} disabled={busy || !file}>
        {busy ? 'Counting...' : 'Count Objects'}
      </Button>

      {counts && (
        <Paper variant="outlined" sx={{ mt: 3, p: 0, overflow: 'hidden' }}>
          {rows.map((row, i) => (
            <Box
              key={row.label}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                py: 1.5,
                px: 2.5,
                borderBottom: i < rows.length - 1 ? '1px solid' : 'none',
                borderColor: 'grey.100',
              }}
            >
              <Typography variant="body2">{row.label}</Typography>
              <Typography variant="body1" fontWeight={700}>{row.value.toLocaleString()}</Typography>
            </Box>
          ))}
        </Paper>
      )}
    </Box>
  );
};

const PdfObjectCounter = () => {
  const content = (
    <>
      <Typography variant="h2">What Gets Counted</Typography>
      <Box sx={{ typography: 'body1' }}>
        <p>
          A PDF is built from many internal objects, and not every count is equally easy to compute reliably in a
          browser. This tool reports the counts that <code>@cantoo/pdf-lib</code>&apos;s public API exposes
          reliably: the number of <strong>pages</strong>, unique <strong>embedded images</strong> referenced across
          all pages, distinct <strong>fonts</strong> declared in page resource dictionaries, all <strong>annotations</strong>
          (comments, stamps, links, form widgets, etc.), the subset of those that are <strong>link annotations</strong>,
          and the <strong>total number of indirect objects</strong> in the file — every object the PDF assigns its
          own object number, via <code>context.enumerateIndirectObjects()</code>. This last count is a good rough
          proxy for how structurally complex a PDF is internally.
        </p>
      </Box>

      <Typography variant="h2">How to Use It</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to analyze.</li>
          <li>Click <strong>Count Objects</strong> to scan the entire document.</li>
          <li>Review the breakdown of pages, images, fonts, annotations, links, and total indirect objects.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 15-page report might show 15 pages, 8 embedded images, 3 distinct fonts, 22 annotations (mostly links
        in a table of contents), 20 of which are links, and 340 total indirect objects — giving a quick sense of
        how much internal structure the file carries beyond just its visible page count.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Getting a quick structural fingerprint of a PDF before deciding whether to compress or optimize it.</li>
          <li>Sanity-checking that a generated PDF contains the expected number of images or fonts.</li>
          <li>Estimating how "heavy" or complex a PDF is internally relative to its visible page count.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why might the image or font count seem low?</strong> Counts are based on unique resources referenced in page resource dictionaries. Reused images or fonts across many pages are only counted once, and non-standard embeddings may not be detected.</li>
          <li><strong>What does "total indirect PDF objects" mean?</strong> Every object in a PDF that's referenced by number (rather than embedded inline) counts as one indirect object — this includes pages, fonts, images, annotations, and many internal dictionaries and streams, so it's typically much larger than any individual count above.</li>
          <li><strong>Does this include vector graphics or text runs?</strong> No — those live inside content streams rather than as separate countable objects with their own type, so they aren't broken out individually.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — everything runs entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-object-counter" content={content}>
      <PdfObjectCounterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfObjectCounter;
