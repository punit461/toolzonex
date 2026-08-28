'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, TextField, MenuItem, CircularProgress } from '@mui/material';
import { PDFDocument, StandardFonts, rgb, degrees } from '@cantoo/pdf-lib';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer, parsePageRanges } from './pdfUtils';

type Op = 'Merge' | 'Compress' | 'Rotate' | 'Watermark' | 'Extract Pages';
const OPS: Op[] = ['Merge', 'Compress', 'Rotate', 'Watermark', 'Extract Pages'];

async function watermark(doc: PDFDocument): Promise<PDFDocument> {
  const font = await doc.embedFont(StandardFonts.HelveticaBold);
  const text = 'CONFIDENTIAL';
  doc.getPages().forEach((page) => {
    const { width, height } = page.getSize();
    const size = Math.min(width, height) / 8;
    const textWidth = font.widthOfTextAtSize(text, size);
    page.drawText(text, {
      x: width / 2 - textWidth / 2,
      y: height / 2,
      size,
      font,
      color: rgb(0.5, 0.5, 0.5),
      opacity: 0.25,
      rotate: degrees(45),
    });
  });
  return doc;
}

function rotate(doc: PDFDocument): PDFDocument {
  doc.getPages().forEach((page) => {
    const current = page.getRotation().angle;
    page.setRotation(degrees((current + 90) % 360));
  });
  return doc;
}

async function extractPages(doc: PDFDocument, pageRange: string): Promise<PDFDocument> {
  const pageCount = doc.getPageCount();
  const keep = parsePageRanges(pageRange, pageCount);
  if (keep.length === 0) throw new Error('Enter at least one valid page number to extract.');
  const output = await PDFDocument.create();
  const copied = await output.copyPages(doc, keep);
  copied.forEach((p) => output.addPage(p));
  return output;
}

async function mergeWithExtra(doc: PDFDocument, extraFile: File | null): Promise<PDFDocument> {
  const merged = await PDFDocument.create();
  const ownPages = await merged.copyPages(doc, doc.getPageIndices());
  ownPages.forEach((p) => merged.addPage(p));
  if (extraFile) {
    const bytes = await readFileAsArrayBuffer(extraFile);
    const otherDoc = await PDFDocument.load(bytes);
    const otherPages = await merged.copyPages(otherDoc, otherDoc.getPageIndices());
    otherPages.forEach((p) => merged.addPage(p));
  }
  return merged;
}

const PdfWorkflowContent = () => {
  const [step1Op, setStep1Op] = useState<Op>('Rotate');
  const [step2Op, setStep2Op] = useState<Op>('Compress');
  const [mergeFiles, setMergeFiles] = useState<File[]>([]);
  const [singleFile, setSingleFile] = useState<File | null>(null);
  const [step1Range, setStep1Range] = useState('');
  const [step2ExtraFile, setStep2ExtraFile] = useState<File | null>(null);
  const [step2Range, setStep2Range] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState('');

  const handleRun = async () => {
    setError('');
    setBusy(true);
    try {
      let doc: PDFDocument;

      setProgress(`Step 1: ${step1Op}...`);
      if (step1Op === 'Merge') {
        if (mergeFiles.length < 2) throw new Error('Add at least two PDF files to merge in Step 1.');
        doc = await PDFDocument.create();
        for (const f of mergeFiles) {
          const bytes = await readFileAsArrayBuffer(f);
          const src = await PDFDocument.load(bytes);
          const pages = await doc.copyPages(src, src.getPageIndices());
          pages.forEach((p) => doc.addPage(p));
        }
      } else {
        if (!singleFile) throw new Error('Choose a PDF file for Step 1.');
        const bytes = await readFileAsArrayBuffer(singleFile);
        doc = await PDFDocument.load(bytes);
        if (step1Op === 'Rotate') doc = rotate(doc);
        else if (step1Op === 'Watermark') doc = await watermark(doc);
        else if (step1Op === 'Extract Pages') doc = await extractPages(doc, step1Range);
        // 'Compress' needs no per-document change here; it's applied at save time.
      }

      setProgress(`Step 2: ${step2Op}...`);
      if (step2Op === 'Rotate') doc = rotate(doc);
      else if (step2Op === 'Watermark') doc = await watermark(doc);
      else if (step2Op === 'Extract Pages') doc = await extractPages(doc, step2Range);
      else if (step2Op === 'Merge') doc = await mergeWithExtra(doc, step2ExtraFile);
      // 'Compress' needs no per-document change here; it's applied at save time.

      setProgress('Saving...');
      const output = await doc.save({ useObjectStreams: true });
      downloadBytes(output, 'workflow-result.pdf');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not run this workflow. Make sure your files are valid PDFs.');
    } finally {
      setBusy(false);
      setProgress('');
    }
  };

  return (
    <Box>
      <Typography variant="h3" sx={{ fontSize: '1.1rem', mb: 1 }}>Step 1</Typography>
      <TextField select fullWidth label="Step 1 operation" value={step1Op} onChange={(e) => setStep1Op(e.target.value as Op)} sx={{ mb: 2 }}>
        {OPS.map((op) => <MenuItem key={op} value={op}>{op}</MenuItem>)}
      </TextField>

      {step1Op === 'Merge' ? (
        <PdfFileDropzone multiple onFilesSelected={setMergeFiles} label="PDF file" selectedNames={mergeFiles.map((f) => f.name)} />
      ) : (
        <PdfFileDropzone onFilesSelected={(files) => setSingleFile(files[0] ?? null)} label="PDF file" selectedNames={singleFile ? [singleFile.name] : []} />
      )}

      {step1Op === 'Extract Pages' && (
        <TextField
          fullWidth
          sx={{ mt: 2 }}
          label="Pages to keep (Step 1)"
          placeholder="e.g. 1, 3-5"
          value={step1Range}
          onChange={(e) => setStep1Range(e.target.value)}
          helperText="Comma-separated page numbers and/or ranges, 1-indexed."
        />
      )}

      <Typography variant="h3" sx={{ fontSize: '1.1rem', mt: 4, mb: 1 }}>Step 2 (applied to Step 1&apos;s result)</Typography>
      <TextField select fullWidth label="Step 2 operation" value={step2Op} onChange={(e) => setStep2Op(e.target.value as Op)} sx={{ mb: 2 }}>
        {OPS.map((op) => <MenuItem key={op} value={op}>{op}</MenuItem>)}
      </TextField>

      {step2Op === 'Merge' && (
        <PdfFileDropzone onFilesSelected={(files) => setStep2ExtraFile(files[0] ?? null)} label="PDF file to append" selectedNames={step2ExtraFile ? [step2ExtraFile.name] : []} />
      )}

      {step2Op === 'Extract Pages' && (
        <TextField
          fullWidth
          label="Pages to keep (Step 2)"
          placeholder="e.g. 1, 3-5"
          value={step2Range}
          onChange={(e) => setStep2Range(e.target.value)}
          helperText="Comma-separated page numbers and/or ranges, 1-indexed."
        />
      )}

      {error && <Alert severity="error" sx={{ mt: 3 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleRun} disabled={busy}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />{progress || 'Running...'}</> : `Run: ${step1Op} then ${step2Op}`}
      </Button>
    </Box>
  );
};

const PdfWorkflow = () => {
  const content = (
    <>
      <Typography variant="h2">How to Chain Two PDF Operations</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Pick a <strong>Step 1</strong> operation — Merge, Compress, Rotate, Watermark, or Extract Pages — and upload the file(s) it needs.</li>
          <li>Pick a <strong>Step 2</strong> operation, which runs on the result of Step 1 (an extra file input appears if Step 2 is Merge or Extract Pages).</li>
          <li>Click <strong>Run</strong> — Step 1 is applied first, producing an intermediate PDF, then Step 2 is applied to that result.</li>
          <li>Download the final PDF.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Choosing <strong>Merge</strong> for Step 1 with two uploaded PDFs, then <strong>Watermark</strong> for
        Step 2, combines both files into one document and stamps &quot;CONFIDENTIAL&quot; diagonally across
        every page of the result — two operations, one download, no intermediate file to manage yourself.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Merging two PDFs and immediately compressing the combined result.</li>
          <li>Extracting a page range and watermarking it in one pass.</li>
          <li>Rotating a scanned document and then shrinking its file size before sharing.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Can I chain more than two steps?</strong> Not in this tool — it&apos;s intentionally limited to a two-step chain. For longer chains, download the Step 1+2 result and run it through this tool (or another PDF tool) again.</li>
          <li><strong>What does Rotate do here?</strong> A fixed 90° clockwise rotation applied to every page, matching the default of the standalone Rotate PDF tool.</li>
          <li><strong>What does Watermark do here?</strong> It stamps the fixed text &quot;CONFIDENTIAL&quot; diagonally across every page — for custom watermark text, use the standalone Watermark PDF tool instead.</li>
          <li><strong>What does Compress do here?</strong> The same lossless, object-stream compression used by the standard mode of the Compress PDF tool — it re-packs the file's internal structure without changing how pages look.</li>
          <li><strong>Does this support password-protected PDFs?</strong> No — to keep the chained workflow simple, this tool expects unencrypted PDFs. Unlock a password-protected file with the Unlock PDF tool first.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — both steps run entirely in your browser; files are never sent to a server.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-workflow" content={content}>
      <PdfWorkflowContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfWorkflow;
