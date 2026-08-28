'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, CircularProgress } from '@mui/material';
import { PDFDocument } from '@cantoo/pdf-lib';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';

const DRAWING_NS = 'http://schemas.openxmlformats.org/drawingml/2006/main';
const REL_NS = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships';

function relsPathFor(partPath: string): string {
  const idx = partPath.lastIndexOf('/');
  const dir = partPath.slice(0, idx);
  const file = partPath.slice(idx + 1);
  return `${dir}/_rels/${file}.rels`;
}

function resolveRelPath(basePath: string, relTarget: string): string {
  const baseDir = basePath.slice(0, basePath.lastIndexOf('/'));
  const parts = `${baseDir}/${relTarget}`.split('/');
  const resolved: string[] = [];
  for (const part of parts) {
    if (part === '.' || part === '') continue;
    if (part === '..') resolved.pop();
    else resolved.push(part);
  }
  return resolved.join('/');
}

function parseRelMap(xml: string): Map<string, string> {
  const doc = new DOMParser().parseFromString(xml, 'application/xml');
  const map = new Map<string, string>();
  Array.from(doc.getElementsByTagNameNS(REL_NS, 'Relationship')).forEach((rel) => {
    const id = rel.getAttribute('Id');
    const target = rel.getAttribute('Target');
    if (id && target) map.set(id, target);
  });
  return map;
}

interface ExtractedImage {
  bytes: Uint8Array;
  ext: string;
}

const PowerpointToPdfContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState('');

  const handleConvert = async () => {
    setError('');
    setNotice('');
    if (!file) { setError('Choose a .pptx file first.'); return; }
    setBusy(true);
    setProgress('Reading presentation...');
    try {
      const bytes = await readFileAsArrayBuffer(file);
      type JSZipInstance = import('jszip');
      const JSZipModule: unknown = await import('jszip');
      const JSZipCtor = (JSZipModule as { default?: new () => JSZipInstance }).default ?? (JSZipModule as new () => JSZipInstance);
      const zip = await new JSZipCtor().loadAsync(bytes);

      const presentationXml = await zip.file('ppt/presentation.xml')?.async('string');
      const presentationRelsXml = await zip.file('ppt/_rels/presentation.xml.rels')?.async('string');
      if (!presentationXml || !presentationRelsXml) {
        throw new Error('Not a valid .pptx file.');
      }

      const presDoc = new DOMParser().parseFromString(presentationXml, 'application/xml');
      const presRelMap = parseRelMap(presentationRelsXml);

      const slideRIds: string[] = [];
      Array.from(presDoc.getElementsByTagName('p:sldId')).forEach((sldId) => {
        const rId = sldId.getAttributeNS(REL_NS, 'id') ?? sldId.getAttribute('r:id');
        if (rId) slideRIds.push(rId);
      });

      const images: ExtractedImage[] = [];
      let unsupportedCount = 0;

      for (let i = 0; i < slideRIds.length; i++) {
        setProgress(`Reading slide ${i + 1} of ${slideRIds.length}...`);
        const target = presRelMap.get(slideRIds[i]);
        if (!target) continue;
        const slidePath = `ppt/${target}`;
        const slideXml = await zip.file(slidePath)?.async('string');
        if (!slideXml) continue;

        const slideRelsXml = await zip.file(relsPathFor(slidePath))?.async('string');
        const slideRelMap = slideRelsXml ? parseRelMap(slideRelsXml) : new Map<string, string>();

        const slideDoc = new DOMParser().parseFromString(slideXml, 'application/xml');
        const blips = Array.from(slideDoc.getElementsByTagNameNS(DRAWING_NS, 'blip'));

        for (const blip of blips) {
          const embedId = blip.getAttributeNS(REL_NS, 'embed') ?? blip.getAttribute('r:embed');
          if (!embedId) continue;
          const mediaTarget = slideRelMap.get(embedId);
          if (!mediaTarget) continue;
          const mediaPath = resolveRelPath(slidePath, mediaTarget);
          const mediaFile = zip.file(mediaPath);
          if (!mediaFile) continue;

          const ext = (mediaPath.split('.').pop() || '').toLowerCase();
          if (ext !== 'png' && ext !== 'jpg' && ext !== 'jpeg') {
            unsupportedCount++;
            continue;
          }
          const mediaBytes = await mediaFile.async('uint8array');
          images.push({ bytes: mediaBytes, ext });
        }
      }

      if (images.length === 0) {
        setError('No embedded PNG or JPEG images were found in this presentation to convert.');
        return;
      }

      setProgress('Building PDF...');
      const doc = await PDFDocument.create();
      for (const img of images) {
        const embedded = img.ext === 'png' ? await doc.embedPng(img.bytes) : await doc.embedJpg(img.bytes);
        const page = doc.addPage([embedded.width, embedded.height]);
        page.drawImage(embedded, { x: 0, y: 0, width: embedded.width, height: embedded.height });
      }

      const output = await doc.save();
      downloadBytes(output, file.name.replace(/\.pptx$/i, '') + '.pdf');
      setNotice(
        `Converted ${images.length} embedded image${images.length !== 1 ? 's' : ''} into a ${images.length}-page PDF.` +
        (unsupportedCount > 0 ? ` ${unsupportedCount} image${unsupportedCount !== 1 ? 's' : ''} in an unsupported format (e.g. WMF/EMF vector graphics) could not be included.` : '')
      );
    } catch {
      setError('Could not convert this file. Make sure it is a valid, unencrypted .pptx file.');
    } finally {
      setBusy(false);
      setProgress('');
    }
  };

  return (
    <Box>
      <PdfFileDropzone
        onFilesSelected={(files) => { setFile(files[0] ?? null); setNotice(''); }}
        label="PowerPoint (.pptx) file"
        accept=".pptx,application/vnd.openxmlformats-officedocument.presentationml.presentation"
        selectedNames={file ? [file.name] : []}
      />

      <Alert severity="warning" sx={{ mt: 2 }}>
        This extracts only the <strong>embedded images</strong> from each slide — text boxes, shapes, and other
        slide layout elements are not rendered. See the FAQ below for details.
      </Alert>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      {notice && <Alert severity="success" sx={{ mt: 2 }}>{notice}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleConvert} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />{progress || 'Converting...'}</> : 'Convert to PDF'}
      </Button>
    </Box>
  );
};

const PowerpointToPdf = () => {
  const content = (
    <>
      <Typography variant="h2">How to Convert PowerPoint to PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the <code>.pptx</code> file you want to convert.</li>
          <li>Click <strong>Convert to PDF</strong> — the tool unpacks the presentation and pulls out every embedded image it can find.</li>
          <li>Download the resulting PDF, with one page per extracted image.</li>
        </ul>
      </Box>

      <Typography variant="h2">What this tool actually does</Typography>
      <Typography variant="body1">
        A <code>.pptx</code> file is a package of XML describing text boxes, shapes, positioning, and styling —
        faithfully rendering that layout into a pixel-perfect PDF requires a full presentation-rendering engine,
        which isn&apos;t something a static, client-side tool can provide. This tool instead unzips the presentation
        (a <code>.pptx</code> is a ZIP archive under the hood) and extracts every embedded raster image referenced
        by its slides — in PNG or JPEG format — building one PDF page per image, in slide order. It works well for
        presentations built from full-slide photos or scanned pages, but text typed directly into PowerPoint text
        boxes, shapes, and vector graphics are not part of this extraction and won&apos;t appear in the output.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A presentation made from 8 scanned pages, each inserted as a full-slide photo, converts cleanly into an
        8-page PDF that looks identical to the original slides. A presentation built with typed bullet points and
        shapes, on the other hand, would produce an empty or near-empty PDF, since there are no embedded images to
        extract.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Converting a photo- or scan-based presentation back into a PDF.</li>
          <li>Recovering image content from a <code>.pptx</code> file when PowerPoint isn&apos;t available.</li>
          <li>Pulling the visual assets out of a presentation for reuse elsewhere.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Will typed text and shapes appear in the PDF?</strong> No — only embedded raster images (PNG/JPEG) are extracted. Text boxes, shapes, charts, and vector graphics drawn directly in PowerPoint are not rendered.</li>
          <li><strong>What if a slide has multiple images?</strong> Each embedded image becomes its own PDF page — if a slide contains a background photo plus a separate logo image, that becomes two pages rather than one combined slide.</li>
          <li><strong>Why are some images missing from the output?</strong> Images in formats other than PNG or JPEG — such as WMF or EMF vector graphics, which PowerPoint sometimes uses for clip art or shapes — aren't currently supported and are skipped, with a note shown after conversion.</li>
          <li><strong>Does this work with .ppt (the older format)?</strong> No — only the modern <code>.pptx</code> (Open XML) format is supported, since it's a ZIP archive this tool can unpack. The legacy binary <code>.ppt</code> format isn't supported.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — everything happens entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/powerpoint-to-pdf" content={content}>
      <PowerpointToPdfContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PowerpointToPdf;
