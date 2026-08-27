'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, Chip } from '@mui/material';
import { PDFDocument, PDFName, PDFDict, PDFArray, PDFRef, PDFString, PDFHexString, PDFObject } from '@cantoo/pdf-lib';
import LinkIcon from '@mui/icons-material/Link';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';

interface LinkInfo {
  uri: string;
  pageIndex: number;
}

function decodeUri(obj: PDFObject | undefined): string {
  if (!obj) return '';
  if (obj instanceof PDFString || obj instanceof PDFHexString) return obj.decodeText();
  return String(obj);
}

function extractLinks(doc: PDFDocument): { total: number; perPage: { pageIndex: number; count: number }[]; links: LinkInfo[] } {
  const allLinks: LinkInfo[] = [];
  const perPage: { pageIndex: number; count: number }[] = [];

  doc.getPages().forEach((page, pageIndex) => {
    let pageCount = 0;
    try {
      const annots = page.node.Annots();
      if (!annots || !(annots instanceof PDFArray)) { perPage.push({ pageIndex, count: 0 }); return; }

      for (let i = 0; i < annots.size(); i++) {
        const annotRef = annots.get(i);
        if (!(annotRef instanceof PDFRef)) continue;

        const annotDict = doc.context.lookupMaybe(annotRef, PDFDict);
        if (!annotDict) continue;

        const subType = annotDict.lookupMaybe(PDFName.of('Subtype'), PDFName);
        const typeName = subType ? String(subType) : '';
        if (typeName !== '/Link' && typeName !== 'Link') continue;

        let uri = '';
        const action = annotDict.lookupMaybe(PDFName.of('A'), PDFDict);
        if (action) {
          const s = action.lookupMaybe(PDFName.of('S'), PDFName);
          const sName = s ? String(s) : '';
          if (sName === '/URI' || sName === 'URI') {
            uri = decodeUri(action.lookup(PDFName.of('URI')));
          }
        }

        if (!uri) {
          const dest = annotDict.lookup(PDFName.of('Dest'));
          if (dest instanceof PDFArray && dest.size() > 0) {
            uri = 'Page reference (local)';
          } else if (dest) {
            uri = `Destination: ${decodeUri(dest)}`;
          }
        }

        if (!uri) {
          const aDict = annotDict.lookupMaybe(PDFName.of('A'), PDFDict);
          if (aDict) {
            const actionStr = aDict.lookupMaybe(PDFName.of('S'), PDFName);
            if (actionStr) {
              uri = `Action: ${String(actionStr)}`;
            }
          }
        }

        allLinks.push({ uri: uri || '(No URI)', pageIndex });
        pageCount++;
      }
    } catch {
      // Skip unreadable pages
    }
    perPage.push({ pageIndex, count: pageCount });
  });

  return { total: allLinks.length, perPage, links: allLinks };
}

const PdfLinkCounterContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ total: number; perPage: { pageIndex: number; count: number }[]; links: LinkInfo[] } | null>(null);
  const [noLinks, setNoLinks] = useState(false);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleCount = async () => {
    setError('');
    setResult(null);
    setNoLinks(false);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);
      const countResult = extractLinks(doc);
      if (countResult.total === 0) {
        setNoLinks(true);
      } else {
        setResult(countResult);
      }
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) {
        setError('Could not read this file. Make sure it is a valid PDF.');
      }
    } finally {
      setBusy(false);
    }
  };

  const pagesWithLinks = result?.perPage.filter((p) => p.count > 0) ?? [];

  return (
    <Box>
      {dialog}
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setResult(null); setNoLinks(false); }} label="PDF file" selectedNames={file ? [file.name] : []} />

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleCount} disabled={busy || !file}>
        {busy ? 'Counting...' : 'Count Links'}
      </Button>

      {noLinks && (
        <Alert severity="info" sx={{ mt: 3 }}>
          No hyperlinks were found in this PDF. The document may be a scanned image or plain text without any linked URLs.
        </Alert>
      )}

      {result && (
        <Box sx={{ mt: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
            <Chip label={`${result.total} link${result.total !== 1 ? 's' : ''} total`} size="small" color="primary" />
            <Chip label={`${pagesWithLinks.length} page${pagesWithLinks.length !== 1 ? 's' : ''} with links`} size="small" color="secondary" variant="outlined" />
          </Box>

          <Typography variant="subtitle2" fontWeight={600} gutterBottom>
            Links per page
          </Typography>
          <Box sx={{ bgcolor: 'grey.50', borderRadius: 1, border: '1px solid', borderColor: 'grey.200', overflow: 'hidden' }}>
            {pagesWithLinks.map((p, i) => (
              <Box
                key={p.pageIndex}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  py: 1,
                  px: 2,
                  borderBottom: i < pagesWithLinks.length - 1 ? '1px solid' : 'none',
                  borderColor: 'grey.100',
                }}
              >
                <LinkIcon fontSize="small" color="primary" />
                <Typography variant="body2" sx={{ flex: 1 }}>
                  Page {p.pageIndex + 1}
                </Typography>
                <Chip label={p.count} size="small" color="primary" variant="outlined" sx={{ height: 20, fontSize: '0.7rem' }} />
              </Box>
            ))}
          </Box>

          <Typography variant="subtitle2" fontWeight={600} gutterBottom sx={{ mt: 3 }}>
            All links
          </Typography>
          <Box sx={{ bgcolor: 'grey.50', borderRadius: 1, border: '1px solid', borderColor: 'grey.200', overflow: 'hidden', maxHeight: 300, overflowY: 'auto' }}>
            {result.links.map((link, i) => (
              <Box
                key={i}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  py: 1,
                  px: 2,
                  borderBottom: i < result.links.length - 1 ? '1px solid' : 'none',
                  borderColor: 'grey.100',
                }}
              >
                <LinkIcon fontSize="small" color="action" />
                <Typography
                  variant="body2"
                  sx={{
                    flex: 1,
                    fontFamily: 'monospace',
                    fontSize: '0.78rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                  title={link.uri}
                >
                  {link.uri}
                </Typography>
                <Chip label={`p. ${link.pageIndex + 1}`} size="small" variant="outlined" sx={{ height: 20, fontSize: '0.65rem', flexShrink: 0 }} />
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

const PdfLinkCounter = () => {
  const content = (
    <>
      <Typography variant="h2">How to Count Links in a PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to analyze.</li>
          <li>Click <strong>Count Links</strong> to scan every page for hyperlink annotations.</li>
          <li>See the total link count, per-page breakdown, and a full list of all URIs.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 30-page marketing PDF might contain 22 links — 5 in the footer across all pages, 10 to product pages in the body, and 7 social media links on the contact page. This tool shows exactly which links exist and where.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Auditing all hyperlinks in a PDF before publishing or sharing it.</li>
          <li>Checking whether a PDF has broken or outdated links.</li>
          <li>Inventorying all URLs referenced in a legal or compliance document.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does this check if links are working?</strong> No — this tool only lists the URIs found in the PDF. It does not verify whether the URLs are live or broken.</li>
          <li><strong>What about links to other pages within the same PDF?</strong> Internal page destination links are counted but shown as &quot;Page reference (local)&quot; since they do not have a web URI.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — all analysis runs in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-link-counter" content={content}>
      <PdfLinkCounterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfLinkCounter;
