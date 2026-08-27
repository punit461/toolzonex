'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, Chip } from '@mui/material';
import { PDFDocument, PDFName, PDFDict, PDFArray, PDFRef, PDFString, PDFHexString, PDFObject } from '@cantoo/pdf-lib';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';

interface OutlineItem {
  title: string;
  destPageIndex?: number;
  children: OutlineItem[];
}

function decodeString(obj: PDFObject | undefined): string {
  if (!obj) return '';
  if (obj instanceof PDFString || obj instanceof PDFHexString) return obj.decodeText();
  return String(obj);
}

function buildOutlineTree(parentDict: PDFDict, doc: PDFDocument): OutlineItem[] {
  const firstRef = parentDict.lookupMaybe(PDFName.of('First'), PDFRef);
  if (!firstRef) return [];
  const result: OutlineItem[] = [];
  let currentRef: PDFRef | undefined = firstRef;

  while (currentRef) {
    const itemDict: PDFDict | undefined = doc.context.lookupMaybe(currentRef, PDFDict);
    if (!itemDict) break;

    const title = decodeString(itemDict.lookup(PDFName.of('Title')));

    let destPageIndex: number | undefined;
    const dest = itemDict.lookup(PDFName.of('Dest'));
    const action = itemDict.lookup(PDFName.of('A'));

    let pageRef: PDFRef | undefined;
    if (dest instanceof PDFArray && dest.size() > 0) {
      const ref = dest.get(0);
      if (ref instanceof PDFRef) pageRef = ref;
    } else if (action instanceof PDFDict) {
      const goTo = action.lookupMaybe(PDFName.of('D'), PDFArray);
      if (goTo && goTo.size() > 0) {
        const ref = goTo.get(0);
        if (ref instanceof PDFRef) pageRef = ref;
      }
    }

    if (pageRef) {
      const idx = doc.getPages().findIndex((p) => p.ref === pageRef);
      destPageIndex = idx >= 0 ? idx : undefined;
    }

    const childRef = itemDict.lookupMaybe(PDFName.of('First'), PDFRef);
    const children = childRef ? buildOutlineTree(itemDict, doc) : [];

    result.push({ title, destPageIndex, children });

    const nextRef: PDFRef | undefined = itemDict.lookupMaybe(PDFName.of('Next'), PDFRef);
    currentRef = nextRef instanceof PDFRef ? nextRef : undefined;
  }

  return result;
}

function OutlineRow({ item, depth }: { item: OutlineItem; depth: number }) {
  const indent = depth * 24;
  return (
    <Box key={`${depth}-${item.title}`}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          py: 0.75,
          px: 2,
          pl: 2 + indent,
          borderBottom: '1px solid',
          borderColor: 'grey.100',
          '&:hover': { bgcolor: 'grey.50' },
        }}
      >
        <AccountTreeIcon fontSize="small" sx={{ color: depth === 0 ? 'primary.main' : 'grey.400', mr: 0.5 }} />
        <Typography
          variant="body2"
          fontWeight={depth === 0 ? 600 : 400}
          fontSize={depth === 0 ? '0.9rem' : depth === 1 ? '0.85rem' : '0.8rem'}
          sx={{ flex: 1 }}
        >
          {item.title || '(Untitled)'}
        </Typography>
        {item.destPageIndex !== undefined && (
          <Chip label={`p. ${item.destPageIndex + 1}`} size="small" variant="outlined" sx={{ height: 20, fontSize: '0.7rem' }} />
        )}
      </Box>
      {item.children.map((child, i) => (
        <OutlineRow key={i} item={child} depth={depth + 1} />
      ))}
    </Box>
  );
}

function countItems(items: OutlineItem[]): number {
  return items.reduce((sum, item) => sum + 1 + countItems(item.children), 0);
}

function maxDepth(items: OutlineItem[], d = 0): number {
  return items.reduce((m, item) => Math.max(m, d, maxDepth(item.children, d + 1)), d);
}

const PdfOutlineViewerContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [outline, setOutline] = useState<OutlineItem[] | null>(null);
  const [noOutline, setNoOutline] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleView = async () => {
    setError('');
    setOutline(null);
    setNoOutline(false);
    setPageCount(0);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);
      setPageCount(doc.getPageCount());

      const outlinesRef = doc.catalog.lookupMaybe(PDFName.of('Outlines'), PDFRef);
      if (!outlinesRef) { setNoOutline(true); return; }
      const outlinesDict = doc.context.lookupMaybe(outlinesRef, PDFDict);
      if (!outlinesDict) { setNoOutline(true); return; }

      const tree = buildOutlineTree(outlinesDict, doc);
      if (tree.length === 0) {
        setNoOutline(true);
      } else {
        setOutline(tree);
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
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setOutline(null); setNoOutline(false); }} label="PDF file" selectedNames={file ? [file.name] : []} />

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleView} disabled={busy || !file}>
        {busy ? 'Reading...' : 'View Outline'}
      </Button>

      {noOutline && (
        <Alert severity="info" sx={{ mt: 3 }}>
          This PDF has no document outline (structure / table of contents). Outlines are created by the PDF author to organize the document into logical sections.
        </Alert>
      )}

      {outline && outline.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
            <Chip label={`${countItems(outline)} items`} size="small" color="primary" variant="outlined" />
            <Chip label={`${maxDepth(outline)} levels deep`} size="small" color="secondary" variant="outlined" />
            <Chip label={`${pageCount} pages`} size="small" variant="outlined" />
          </Box>
          <Box sx={{ bgcolor: 'grey.50', borderRadius: 1, border: '1px solid', borderColor: 'grey.200', overflow: 'hidden' }}>
            {outline.map((item, i) => (
              <OutlineRow key={i} item={item} depth={0} />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

const PdfOutlineViewer = () => {
  const content = (
    <>
      <Typography variant="h2">How to View PDF Document Outline</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF whose structure you want to inspect.</li>
          <li>Click <strong>View Outline</strong> to extract the document outline tree.</li>
          <li>Browse the full heading hierarchy — each item shows its title and page number.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A technical manual might show an outline like: &quot;1. Introduction (p. 1)&quot; &gt; &quot;1.1 Background (p. 2)&quot; &gt; &quot;2. Installation (p. 8)&quot; &gt; &quot;3. Configuration (p. 15)&quot; — revealing the document&apos;s structural depth at a glance.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Assessing the navigability of a PDF before distributing it to a team.</li>
          <li>Verifying heading structure was exported correctly from a Word or LaTeX document.</li>
          <li>Previewing a long e-book or manual&apos;s chapter structure without scrolling through every page.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What is a PDF outline?</strong> The outline (also called document outline or bookmarks) is a tree of titled entries that many PDF viewers show in a sidebar, letting readers jump between sections.</li>
          <li><strong>Why is my outline empty?</strong> The PDF was probably saved without outline entries — this is common when exporting from basic tools or scanners. The outline must be explicitly created by the authoring software.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — outline extraction runs entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-outline-viewer" content={content}>
      <PdfOutlineViewerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfOutlineViewer;
