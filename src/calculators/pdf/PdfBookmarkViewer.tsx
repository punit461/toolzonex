'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { PDFDocument, PDFName, PDFDict, PDFArray, PDFRef, PDFString, PDFHexString, PDFObject } from '@cantoo/pdf-lib';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';

interface BookmarkNode {
  title: string;
  destPageIndex?: number;
  children: BookmarkNode[];
}

function decodeString(obj: PDFObject | undefined): string {
  if (!obj) return '';
  if (obj instanceof PDFString || obj instanceof PDFHexString) return obj.decodeText();
  return String(obj);
}

function buildBookmarkTree(outlinesDict: PDFDict, doc: PDFDocument): BookmarkNode[] {
  const firstRef = outlinesDict.lookupMaybe(PDFName.of('First'), PDFRef);
  if (!firstRef) return [];
  const result: BookmarkNode[] = [];
  let currentRef: PDFRef | undefined = firstRef;

  while (currentRef) {
    const nodeDict: PDFDict | undefined = doc.context.lookupMaybe(currentRef, PDFDict);
    if (!nodeDict) break;

    const title = decodeString(nodeDict.lookup(PDFName.of('Title')));

    let destPageIndex: number | undefined;
    const dest = nodeDict.lookup(PDFName.of('Dest'));
    const action = nodeDict.lookup(PDFName.of('A'));

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
      const pages = doc.getPages();
      const idx = pages.findIndex((p) => p.ref === pageRef);
      destPageIndex = idx >= 0 ? idx : undefined;
    }

    const childRef = nodeDict.lookupMaybe(PDFName.of('First'), PDFRef);
    const children = childRef ? buildBookmarkTree(nodeDict, doc) : [];

    result.push({ title, destPageIndex, children });

    const nextRef: PDFRef | undefined = nodeDict.lookupMaybe(PDFName.of('Next'), PDFRef);
    currentRef = nextRef instanceof PDFRef ? nextRef : undefined;
  }

  return result;
}

function BookmarkItem({ node, depth }: { node: BookmarkNode; depth: number }) {
  return (
    <>
      <ListItem sx={{ pl: 1 + depth * 2 }}>
        <ListItemIcon sx={{ minWidth: 32 }}>
          <InsertDriveFileIcon fontSize="small" color={node.children.length > 0 ? 'primary' : 'disabled'} />
        </ListItemIcon>
        <ListItemText
          primary={node.title || '(Untitled)'}
          secondary={node.destPageIndex !== undefined ? `Page ${node.destPageIndex + 1}` : undefined}
          primaryTypographyProps={{ fontSize: depth === 0 ? '0.95rem' : '0.85rem', fontWeight: depth === 0 ? 600 : 400 }}
        />
        {node.children.length > 0 && <ChevronRightIcon fontSize="small" sx={{ ml: 'auto', opacity: 0.5 }} />}
      </ListItem>
      {node.children.map((child, i) => (
        <BookmarkItem key={`${depth}-${i}`} node={child} depth={depth + 1} />
      ))}
    </>
  );
}

const PdfBookmarkViewerContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [bookmarks, setBookmarks] = useState<BookmarkNode[] | null>(null);
  const [noBookmarks, setNoBookmarks] = useState(false);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleView = async () => {
    setError('');
    setBookmarks(null);
    setNoBookmarks(false);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);

      const outlinesRef = doc.catalog.lookupMaybe(PDFName.of('Outlines'), PDFRef);
      if (!outlinesRef) { setNoBookmarks(true); return; }
      const outlinesDict = doc.context.lookupMaybe(outlinesRef, PDFDict);
      if (!outlinesDict) { setNoBookmarks(true); return; }

      const tree = buildBookmarkTree(outlinesDict, doc);
      if (tree.length === 0) {
        setNoBookmarks(true);
      } else {
        setBookmarks(tree);
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
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setBookmarks(null); setNoBookmarks(false); }} label="PDF file" selectedNames={file ? [file.name] : []} />

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleView} disabled={busy || !file}>
        {busy ? 'Reading...' : 'View Bookmarks'}
      </Button>

      {noBookmarks && (
        <Alert severity="info" sx={{ mt: 3 }}>
          This PDF has no bookmarks (table of contents). Bookmarks are added by the PDF creator to help readers navigate the document.
        </Alert>
      )}

      {bookmarks && bookmarks.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            {bookmarks.reduce((count, node) => {
              const countChildren = (n: BookmarkNode): number => n.children.reduce((s, c) => s + 1 + countChildren(c), 0);
              return count + 1 + countChildren(node);
            }, 0)} bookmark{bookmarks.length !== 1 ? 's' : ''} found
          </Typography>
          <List dense sx={{ bgcolor: 'grey.50', borderRadius: 1, border: '1px solid', borderColor: 'grey.200' }}>
            {bookmarks.map((node, i) => (
              <BookmarkItem key={i} node={node} depth={0} />
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

const PdfBookmarkViewer = () => {
  const content = (
    <>
      <Typography variant="h2">How to View PDF Bookmarks</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to inspect.</li>
          <li>Click <strong>View Bookmarks</strong> to extract the bookmark tree.</li>
          <li>Browse the full hierarchical list of bookmarks with their page references.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 50-page company report might have bookmarks like &quot;Executive Summary (Page 1)&quot;, &quot;Financials (Page 12)&quot;, and &quot;Appendix (Page 45)&quot; — this tool shows all of them in a navigable tree structure.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking whether a PDF has bookmarks before sharing it with others.</li>
          <li>Previewing the table of contents of a long document or e-book.</li>
          <li>Auditing bookmark quality in professionally produced PDFs.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why does it say no bookmarks?</strong> Not all PDFs include bookmarks. They must be manually added by the PDF creator or generated by the authoring tool.</li>
          <li><strong>Does this modify my PDF?</strong> No — this is a read-only viewer. Your original file is never changed or uploaded.</li>
          <li><strong>What if the PDF is password-protected?</strong> You will be prompted to enter the password. Everything runs in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-bookmark-viewer" content={content}>
      <PdfBookmarkViewerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfBookmarkViewer;
