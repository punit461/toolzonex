'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, Checkbox, FormControlLabel } from '@mui/material';
import { PDFDocument, PDFName, PDFDict, PDFRef, PDFString, PDFHexString } from '@cantoo/pdf-lib';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';

interface WatermarkCandidate {
  id: string;
  pageIndex: number;
  annotIndex: number;
  subtype: string;
  label: string;
}

function decodeText(obj: unknown): string {
  if (obj instanceof PDFString || obj instanceof PDFHexString) return obj.decodeText();
  return '';
}

function findWatermarkCandidates(doc: PDFDocument): WatermarkCandidate[] {
  const candidates: WatermarkCandidate[] = [];
  doc.getPages().forEach((page, pageIndex) => {
    const annots = page.node.Annots();
    if (!annots) return;
    for (let i = 0; i < annots.size(); i++) {
      const ref = annots.get(i);
      if (!(ref instanceof PDFRef)) continue;
      const annotDict = doc.context.lookupMaybe(ref, PDFDict);
      if (!annotDict) continue;
      const subTypeName = annotDict.lookupMaybe(PDFName.of('Subtype'), PDFName);
      const subtype = subTypeName ? String(subTypeName).replace('/', '') : '';
      if (subtype !== 'Watermark' && subtype !== 'Stamp') continue;

      const name = annotDict.lookupMaybe(PDFName.of('Name'), PDFName);
      const contents = annotDict.lookup(PDFName.of('Contents'));
      const label = name ? String(name).replace('/', '') : decodeText(contents) || `${subtype} annotation`;

      candidates.push({ id: `${pageIndex}-${i}`, pageIndex, annotIndex: i, subtype, label });
    }
  });
  return candidates;
}

const PdfWatermarkRemoverSimpleContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [doc, setDoc] = useState<PDFDocument | null>(null);
  const [candidates, setCandidates] = useState<WatermarkCandidate[] | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [removed, setRemoved] = useState<number | null>(null);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleScan = async () => {
    setError('');
    setCandidates(null);
    setRemoved(null);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const loaded = await unlock(bytes);
      const found = findWatermarkCandidates(loaded);
      setDoc(loaded);
      setCandidates(found);
      setSelected(new Set(found.map((c) => c.id)));
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) {
        setError('Could not read this file. Make sure it is a valid PDF.');
      }
    } finally { setBusy(false); }
  };

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const handleRemove = async () => {
    if (!doc || !candidates || !file) return;
    setBusy(true);
    setError('');
    try {
      const byPage = new Map<number, number[]>();
      for (const c of candidates) {
        if (!selected.has(c.id)) continue;
        const list = byPage.get(c.pageIndex) ?? [];
        list.push(c.annotIndex);
        byPage.set(c.pageIndex, list);
      }

      const pages = doc.getPages();
      let totalRemoved = 0;
      for (const [pageIndex, indices] of byPage) {
        const annots = pages[pageIndex].node.Annots();
        if (!annots) continue;
        const sorted = [...indices].sort((a, b) => b - a);
        for (const idx of sorted) {
          annots.remove(idx);
          totalRemoved++;
        }
      }

      setRemoved(totalRemoved);
      const output = await doc.save();
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-watermark-removed.pdf');
    } catch {
      setError('Could not remove the selected annotations.');
    } finally { setBusy(false); }
  };

  return (
    <Box>
      {dialog}
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setCandidates(null); setDoc(null); setRemoved(null); }} label="PDF file" selectedNames={file ? [file.name] : []} />

      <Alert severity="info" sx={{ mt: 2 }}>
        This tool only finds and removes watermarks added as PDF <strong>annotations</strong> (stamp/watermark
        overlays). It cannot detect or remove a watermark that was flattened into the page content itself or
        baked into a scanned image — see the FAQ below.
      </Alert>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      {!candidates && (
        <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleScan} disabled={busy || !file}>
          {busy ? 'Scanning...' : 'Scan for Watermark Annotations'}
        </Button>
      )}

      {candidates && candidates.length === 0 && (
        <Alert severity="warning" sx={{ mt: 3 }}>
          No watermark- or stamp-type annotations were found. If this PDF has a visible watermark, it is most
          likely baked into the page content or image rather than added as an annotation, and this tool can&apos;t
          remove it.
        </Alert>
      )}

      {candidates && candidates.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Found {candidates.length} candidate{candidates.length !== 1 ? 's' : ''} — uncheck any you want to keep
          </Typography>
          <Box sx={{ bgcolor: 'grey.50', borderRadius: 1, border: '1px solid', borderColor: 'grey.200', p: 1, mb: 2 }}>
            {candidates.map((c) => (
              <FormControlLabel
                key={c.id}
                sx={{ display: 'flex', px: 1 }}
                control={<Checkbox checked={selected.has(c.id)} onChange={() => toggle(c.id)} />}
                label={`Page ${c.pageIndex + 1} — ${c.subtype}: ${c.label}`}
              />
            ))}
          </Box>
          <Button variant="contained" size="large" fullWidth onClick={handleRemove} disabled={busy || selected.size === 0}>
            {busy ? 'Removing...' : `Remove ${selected.size} Selected`}
          </Button>
        </Box>
      )}

      {removed !== null && (
        <Alert severity="success" sx={{ mt: 3 }}>
          Removed {removed} annotation{removed !== 1 ? 's' : ''}.
        </Alert>
      )}
    </Box>
  );
};

const PdfWatermarkRemoverSimple = () => {
  const content = (
    <>
      <Typography variant="h2">What "(Simple)" Means for This Tool</Typography>
      <Box sx={{ typography: 'body1' }}>
        <p>
          Reliably detecting and erasing an arbitrary watermark from a PDF requires understanding what&apos;s
          actually drawn on the page — text, shapes, or pixels in a scanned image — which needs OCR and
          content-stream analysis well beyond what a static, browser-only tool can safely do. Overpromising here
          would mean either doing nothing while claiming success, or corrupting unrelated page content. Instead,
          this tool is scoped honestly to the one case it <em>can</em> handle reliably: watermarks added as PDF
          <strong> annotations</strong> — Stamp or Watermark objects layered on top of the page, which many
          "add watermark" tools (including simpler online tools) use instead of drawing directly into page
          content.
        </p>
      </Box>

      <Typography variant="h2">How to Use It</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF with the watermark you want to remove.</li>
          <li>Click <strong>Scan for Watermark Annotations</strong> — the tool lists every Stamp or Watermark annotation it finds, with a preview of which page it's on and its label.</li>
          <li>Uncheck anything you want to keep, then click <strong>Remove Selected</strong> to strip the rest and download the result.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A shared PDF that was watermarked with a "DRAFT" stamp annotation across all 10 pages shows up as 10
        candidates, one per page. Selecting all of them and removing them produces a clean copy with the
        stamps gone, while the underlying document text and images are untouched.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Removing a "DRAFT" or "SAMPLE" stamp that was added as an overlay annotation.</li>
          <li>Cleaning up review stamps before finalizing and distributing a document.</li>
          <li>Stripping approval or confidentiality stamps added by document-review software.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Will this remove a watermark that's part of a scanned image or baked into the page text/graphics?</strong> No — this tool only removes annotation-based overlays. A watermark drawn directly into the page content stream, or burned into a scanned image, cannot be detected or removed by this tool.</li>
          <li><strong>Why does it also list "Stamp" annotations, not just "Watermark"?</strong> Many watermarking tools use the general-purpose Stamp annotation type rather than the newer, less common Watermark subtype. Both are shown as candidates since either can carry a watermark-style overlay.</li>
          <li><strong>What if no candidates are found?</strong> That means the watermark most likely isn't an annotation — it's probably part of the page content itself, which this tool can't remove.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — everything happens entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-watermark-remover-simple" content={content}>
      <PdfWatermarkRemoverSimpleContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfWatermarkRemoverSimple;
