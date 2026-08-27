'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { PDFDocument, PDFName, PDFDict, PDFArray, PDFRef, PDFString, PDFHexString, PDFObject } from '@cantoo/pdf-lib';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
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

function flattenBookmarks(nodes: BookmarkNode[], depth = 0): string {
  let out = '';
  for (const node of nodes) {
    const indent = '  '.repeat(depth);
    const page = node.destPageIndex !== undefined ? ` [Page ${node.destPageIndex + 1}]` : '';
    out += `${indent}${node.title || '(Untitled)'}${page}\n`;
    if (node.children.length > 0) out += flattenBookmarks(node.children, depth + 1);
  }
  return out;
}

const ExtractPdfBookmarksContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [bookmarks, setBookmarks] = useState<BookmarkNode[] | null>(null);
  const [noBookmarks, setNoBookmarks] = useState(false);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleExtract = async () => {
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

  const handleDownloadJson = () => {
    if (!bookmarks || !file) return;
    const json = JSON.stringify(bookmarks, null, 2);
    const bytes = new TextEncoder().encode(json);
    downloadBytes(bytes, file.name.replace(/\.pdf$/i, '') + '-bookmarks.json', 'application/json');
  };

  const handleDownloadText = () => {
    if (!bookmarks || !file) return;
    const text = flattenBookmarks(bookmarks);
    const bytes = new TextEncoder().encode(text);
    downloadBytes(bytes, file.name.replace(/\.pdf$/i, '') + '-bookmarks.txt', 'text/plain');
  };

  return (
    <Box>
      {dialog}
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setBookmarks(null); setNoBookmarks(false); }} label="PDF file" selectedNames={file ? [file.name] : []} />

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleExtract} disabled={busy || !file}>
        {busy ? 'Extracting...' : 'Extract Bookmarks'}
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
          <Box sx={{ display: 'flex', gap: 2, mt: 2, flexWrap: 'wrap' }}>
            <Button variant="outlined" onClick={handleDownloadText}>Download as .txt</Button>
            <Button variant="outlined" onClick={handleDownloadJson}>Download as .json</Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

const ExtractPdfBookmarks = () => {
  const content = (
    <>
      <Typography variant="h2">How to Extract PDF Bookmarks</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF whose bookmarks you want to extract.</li>
          <li>Click <strong>Extract Bookmarks</strong> to pull the full bookmark tree from the file.</li>
          <li>Browse the hierarchical list and download as a text or JSON file.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 120-page technical manual has nested bookmarks like &quot;Chapter 1: Getting Started&quot; with sub-bookmarks
        for &quot;Installation&quot; and &quot;Configuration&quot;. This tool displays them all in a tree and lets you
        export them as structured data for documentation or navigation purposes.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Exporting a PDF&apos;s table of contents as a structured text or JSON file.</li>
          <li>Auditing bookmark quality and completeness in published documents.</li>
          <li>Copying bookmark data into a website sidebar, navigation menu, or documentation index.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What if no bookmarks are found?</strong> Not all PDFs include bookmarks — they must be manually added by the author or generated by the creating software.</li>
          <li><strong>Does this modify the PDF?</strong> No — extraction is read-only. Your original file is never changed.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — everything happens in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/extract-pdf-bookmarks" content={content}>
      <ExtractPdfBookmarksContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ExtractPdfBookmarks;
